import { extractMemory } from "../agents/memory.extractor";
import { saveProfile } from "../memory/profile.store";
import { saveMemories } from "../memory/vector.store";
import { recallMemories } from "../memory/recall";
import { SYSTEM_PROMPT } from "../agents/system.prompt";
import { runLLM } from "../agents/llm.agent";
import { sendTelegramMessage } from "./send";

export async function handleIncomingMessage(msg: any) {
  const userId = String(msg.from.id);
  const text = msg.text ?? "";

  const memory = await extractMemory(text);

  await saveProfile(userId, memory.profile);
  await saveMemories(userId, [...memory.preferences, ...memory.facts]);

  const pastMemories = await recallMemories(userId);

  const prompt = `
${SYSTEM_PROMPT}

Memórias conhecidas do usuário:
${pastMemories.join("\n") || "Nenhuma ainda."}

Mensagem atual:
"${text}"

Responda de forma personalizada:
`;

  const reply = await runLLM(prompt);

  await sendTelegramMessage(msg.chat.id, reply);
}
