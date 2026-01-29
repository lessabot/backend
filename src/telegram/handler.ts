import { runBrain } from "../agents/brain.agent";
import { saveProfile } from "../memory/profile.store";
import { saveMemories } from "../memory/vector.store";
import { sendTelegramMessage } from "./send";
import { executeTool } from "../tools/tool.executor";
import { logBrainTrace } from "../observability/brain.logger";

import {
  setPendingAction,
  getPendingAction,
  clearPendingAction,
} from "../state/pending-actions";

import { isConfirmation, isRejection } from "../utils/is-confirmation";
import { judgeConfirmation } from "../agents/confirmation.agent";

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

  /* ===========================
     🟡 1️⃣ CONFIRMAÇÃO PENDENTE?
  ============================ */
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
      // segue fluxo normal (brain)
    }
  }

  /* ===========================
     🧠 2️⃣ BRAIN (LLM ÚNICO)
  ============================ */
  const start = Date.now();

  const brain = await runBrain(text);

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
     🛠️ 4️⃣ TOOL AGENT
  ============================ */
  if (brain.tool?.name) {
    logBrainTrace({
      userId,
      message: text,
      brainOutput: brain,
      tookMs,
      usedTool: brain.tool?.name ?? null,
      requiresConfirmation: true,
      createdAt: new Date().toISOString(),
    });

    if (brain.tool.requiresConfirmation) {
      setPendingAction(userId, {
        toolName: brain.tool.name,
        originalUserMessage: text,
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
     💬 5️⃣ RESPOSTA NORMAL
  ============================ */
  if (brain.reply) {
    logBrainTrace({
      userId,
      message: text,
      brainOutput: brain,
      tookMs,
      usedTool: null,
      requiresConfirmation: false,
      createdAt: new Date().toISOString(),
    });
    await sendTelegramMessage(chatId, brain.reply);
  }
}
