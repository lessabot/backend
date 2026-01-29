import { extractMemory } from "../agents/memory.extractor";

import { planNextAction } from "../agents/planner.agent";
import { runLLM } from "../agents/llm.agent";
import { SYSTEM_PROMPT } from "../agents/system.prompt";

import { saveProfile } from "../memory/profile.store";
import { saveMemories } from "../memory/vector.store";
import { recallMemories } from "../memory/recall";

import { sendTelegramMessage } from "./send";
import { shouldStoreMemory } from "../agents/memory.judge.prompt";

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

  const extracted = await extractMemory(text);

  if (extracted.profile) {
    await saveProfile(userId, extracted.profile);
  }

  if (await shouldStoreMemory(text)) {
    const memoriesToSave = [
      ...(extracted.preferences ?? []),
      ...(extracted.facts ?? []),
    ];

    if (memoriesToSave.length) {
      await saveMemories(userId, memoriesToSave);
    }
  }

  const memories = await recallMemories(userId, text);

  const relevantMemories = memories.filter((m) => m.score >= 0.35).slice(0, 5);

  const memoryContext = relevantMemories.map((m) => `- ${m.text}`).join("\n");

  const plan = await planNextAction(
    text,
    relevantMemories.map((m) => m.text),
  );

  let reply: string | null = null;

  switch (plan.action) {
    case "ask_question": {
      reply = await runLLM(`
${SYSTEM_PROMPT}

Contexto:
O usuário enviou uma mensagem curta ou inicial.

Mensagem:
"${text}"

Faça UMA pergunta natural, curta e amigável para avançar a conversa.
`);
      break;
    }

    case "use_memory": {
      reply = await runLLM(`
${SYSTEM_PROMPT}

Memórias relevantes do usuário:
${memoryContext || "Nenhuma relevante."}

Mensagem atual:
"${text}"

Responda de forma personalizada, usando as memórias se fizer sentido.
`);
      break;
    }

    case "store_memory": {
      reply = await runLLM(`
${SYSTEM_PROMPT}

Mensagem:
"${text}"

Responda normalmente, de forma natural.
`);
      break;
    }

    case "do_nothing":
      return;

    case "chat":
    default: {
      reply = await runLLM(`
${SYSTEM_PROMPT}

Mensagem:
"${text}"

Responda de forma natural e amigável.
`);
      break;
    }
  }

  if (reply) {
    await sendTelegramMessage(chatId, reply);
  }
}
