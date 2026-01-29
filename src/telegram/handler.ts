import { extractMemory } from "../agents/memory.extractor";
import { saveProfile } from "../memory/profile.store";
import { saveMemories } from "../memory/vector.store";
import { recallMemories } from "../memory/recall";
import { SYSTEM_PROMPT } from "../agents/system.prompt";
import { runLLM } from "../agents/llm.agent";
import { sendTelegramMessage } from "./send";
import { shouldStoreMemory } from "../agents/memory.judge.prompt";

export async function handleIncomingMessage(msg: any) {
  const userId = String(msg.from.id);
  const text = msg.text ?? "";

  const memory = await extractMemory(text);

  await saveProfile(userId, memory.profile);

  if (await shouldStoreMemory(text)) {
    await saveMemories(userId, [...memory.preferences, ...memory.facts]);
  }

  const memories = await recallMemories(userId, text);

  const memoryContext = memories
    .filter((m) => m.score > 0.35)
    .slice(0, 5)
    .map((m) => `- ${m.text}`)
    .join("\n");

  const prompt = `
${SYSTEM_PROMPT}

Memórias relevantes do usuário:
${memoryContext || "Nenhuma relevante no momento."}

Mensagem atual:
"${text}"

Responda de forma personalizada, usando as memórias se fizer sentido.
`;

  const reply = await runLLM(prompt);

  await sendTelegramMessage(msg.chat.id, reply);
}
