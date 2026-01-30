import { runBrain } from "../agents/brain.agent";
import { judgeConfirmation } from "../agents/confirmation.agent";

import { saveProfile } from "../memory/profile.store";
import { saveMemories } from "../memory/vector.store";
import { sendTelegramMessage } from "./send";
import { executeTool } from "../tools/tool.executor";
import { logBrainTrace } from "../observability/brain.logger";
import { setMood, getMood } from "../mood/mood.store";
import { analyzeMood } from "../agents/mood.agent";
import { shouldAnalyzeMood } from "../mood/mood.gate";
import { getRecentTurns } from "../memory/rolling.store";

import {
  setPendingAction,
  getPendingAction,
  clearPendingAction,
} from "../state/pending-actions";

import {
  getPersonality,
  savePersonality,
} from "../personality/personality.store";
import { updatePersonality } from "../personality/personality.updater";
import { addTurn } from "../memory/rolling.store";

// Deduplicação simples (RAM)
const processedMessages = new Set<string>();

export async function handleIncomingMessage(msg: any) {
  const userId = String(msg.from.id);
  const chatId = msg.chat.id;
  const text: string = msg.text ?? "";

  if (!text.trim()) return;

  const dedupKey = `${msg.message_id}-${userId}`;
  if (processedMessages.has(dedupKey)) return;
  processedMessages.add(dedupKey);
  setTimeout(() => processedMessages.delete(dedupKey), 60_000);

  addTurn(userId, { role: "user", text, ts: Date.now() });

  const pending = getPendingAction(userId);

  if (pending) {
    const judgment = await judgeConfirmation({
      pendingMessage: pending.originalUserMessage,
      userMessage: text,
    });

    if (judgment.decision === "confirm") {
      const result = await executeTool(pending.toolName, pending.args);
      clearPendingAction(userId);
      await sendTelegramMessage(chatId, result.message);
      return;
    }

    if (judgment.decision === "reject") {
      clearPendingAction(userId);
      await sendTelegramMessage(chatId, "Beleza 🙂 não fiz nada.");
      return;
    }

    if (judgment.decision === "cancel" || judgment.decision === "unrelated") {
      clearPendingAction(userId);
    }
  }

  let mood = getMood(userId);

  if (shouldAnalyzeMood(text)) {
    mood = await analyzeMood({
      message: text,
      recentContext: getRecentTurns(userId).map((t) => t.text),
    });
    setMood(userId, mood);
  }

  /* ===========================
     🧠 2️⃣ BRAIN (LLM ÚNICO)
  ============================ */
  const start = Date.now();
  const brain = await runBrain(userId, text);
  const tookMs = Date.now() - start;

  /* ===========================
     💾 3️⃣ MEMÓRIA / PERFIL
  ============================ */
  if (brain.profile && Object.keys(brain.profile).length > 0) {
    await saveProfile(userId, brain.profile);
  }

  if (brain.storeMemory && brain.memories?.length) {
    await saveMemories(userId, brain.memories);
  }

  /* ===========================
     🧠 4️⃣ PERSONALIDADE
  ============================ */
  const currentPersonality = getPersonality(userId);
  const updatedPersonality = updatePersonality(currentPersonality, text);
  savePersonality(userId, updatedPersonality);

  /* ===========================
     🛠️ 5️⃣ TOOL AGENT
  ============================ */
  if (brain.tool?.name) {
    logBrainTrace({
      userId,
      message: text,
      brainOutput: brain,
      tookMs,
      usedTool: brain.tool.name,
      requiresConfirmation: brain.tool.requiresConfirmation,
      createdAt: new Date().toISOString(),
    });

    if (brain.tool.requiresConfirmation) {
      setPendingAction(userId, {
        toolName: brain.tool.name,
        originalUserMessage: text,
        explanation: brain.reply ?? "aquilo que comentei",
        args: brain.tool.arguments ?? {},
        createdAt: Date.now(),
      });

      await sendTelegramMessage(chatId, "Posso fazer isso pra você?");
      return;
    }

    const result = await executeTool(
      brain.tool.name,
      brain.tool.arguments ?? {},
    );

    await sendTelegramMessage(chatId, result.message);
    return;
  }

  /* ===========================
     💬 6️⃣ RESPOSTA NORMAL
  ============================ */
  logBrainTrace({
    userId,
    message: text,
    brainOutput: brain,
    tookMs,
    usedTool: null,
    requiresConfirmation: false,
    createdAt: new Date().toISOString(),
  });

  if (brain.reply) {
    addTurn(userId, { role: "assistant", text: brain.reply, ts: Date.now() });

    await sendTelegramMessage(chatId, brain.reply);
  }
}
