import { classifyIntent } from "../agents/router.agent";
import { runLLM } from "../agents/llm.agent";
import { SYSTEM_PROMPT } from "../agents/system.prompt";

export async function handleIncomingMessage(msg: any) {
  const userId = String(msg.from.id);
  const text = msg.text ?? "";

  const intent = classifyIntent(text);

  const prompt = `
${SYSTEM_PROMPT}

Usuário disse:
"${text}"

Intenção detectada: ${intent}

Responda de forma adequada:
`;

  const reply = await runLLM(prompt);

  console.log("Resposta Gemini:", reply);

  // próximo passo: enviar ao Telegram
}
