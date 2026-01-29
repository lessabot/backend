import { classifyIntent } from "../agents/router.agent";

export async function handleIncomingMessage(msg: any) {
  const userId = String(msg.from.id);
  const text = msg.text ?? "";

  const intent = classifyIntent(text);

  console.log({ userId, text, intent });

  // Próximo passo: memória + resposta
}
