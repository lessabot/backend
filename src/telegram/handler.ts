import { runLLM } from "../agents/llm.agent";
import { classifyIntent } from "../agents/router.agent";
import { SYSTEM_PROMPT } from "../agents/system.prompt";
import { sendTelegramMessage } from "./send";

const processedUpdates = new Set<number>();

export async function handleIncomingMessage(msg: any) {
  const updateId = msg.update_id;

  if (processedUpdates.has(updateId)) return;

  processedUpdates.add(updateId);
  setTimeout(() => processedUpdates.delete(updateId), 60_000);

  const userId = String(msg.from.id);
  const text = msg.text ?? "";

  const intent = classifyIntent(text);

  const prompt = `
${SYSTEM_PROMPT}

Usuário:
- ID: ${userId}

Mensagem:
"${text}"

Intenção detectada: ${intent}

Responda de forma adequada:
`;

  const reply = await runLLM(prompt);

  await sendTelegramMessage(msg.chat.id, reply);
}
