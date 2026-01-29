import { runLLM } from "./llm.agent";
import { extractJson } from "../utils/safe-json";

export async function summarizeMemories(input: {
  currentSummary: string | null;
  newMemories: string[];
}) {
  const raw = await runLLM(`
Você resume informações sobre um usuário.

Resumo atual:
${input.currentSummary ?? "Nenhum"}

Novas memórias:
${input.newMemories.map((m) => `- ${m}`).join("\n")}

Crie um NOVO resumo curto (5 a 8 linhas) que represente
quem é o usuário, seus gostos, estilo e fatos importantes.

Retorne APENAS JSON:
{
  "summary": string
}
`);

  return extractJson(raw).summary as string;
}
