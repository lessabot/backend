import { runLLM } from "./llm.agent";
import { extractJson } from "../utils/safe-json";

export async function judgeConfirmation(input: {
  pendingMessage: string;
  userMessage: string;
}) {
  const raw = await runLLM(`
Você decide se a mensagem atual do usuário ainda se refere
a uma ação pendente anterior.

Mensagem original que gerou a ação:
"${input.pendingMessage}"

Mensagem atual do usuário:
"${input.userMessage}"

Retorne APENAS JSON:

{
  "decision": "confirm" | "reject" | "cancel" | "unrelated"
}

Regras:
- "confirm": usuário quer seguir com a ação
- "reject": usuário claramente recusou
- "cancel": usuário mudou de ideia ou assunto
- "unrelated": não tem relação com a ação pendente
`);

  return extractJson(raw);
}
