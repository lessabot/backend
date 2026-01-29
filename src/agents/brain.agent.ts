import { runLLM } from "./llm.agent";
import { extractJson } from "../utils/safe-json";
import { BRAIN_PROMPT } from "./brain.prompt";

export async function runBrain(text: string) {
  const raw = await runLLM(`
${BRAIN_PROMPT}

Mensagem do usuário:
"${text}"
`);

  return extractJson(raw);
}
