import { runLLM } from "./llm.agent";
import { PLANNER_PROMPT } from "./planner.prompt";

export async function planNextAction(message: string, memoryContext: string[]) {
  const prompt = `
${PLANNER_PROMPT}

Memórias relevantes:
${memoryContext.join("\n") || "Nenhuma"}

Mensagem do usuário:
"${message}"
`;

  const raw = await runLLM(prompt);

  try {
    return JSON.parse(raw);
  } catch {
    return { action: "chat", reason: "fallback" };
  }
}
