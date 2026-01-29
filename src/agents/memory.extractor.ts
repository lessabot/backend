import { runLLM } from "./llm.agent";
import { MEMORY_EXTRACTOR_PROMPT } from "./memory.extractor.prompt";

export async function extractMemory(text: string) {
  const prompt = `
${MEMORY_EXTRACTOR_PROMPT}

Mensagem do usuário:
"${text}"
`;

  const raw = await runLLM(prompt);

  try {
    return JSON.parse(raw);
  } catch {
    return {
      profile: {},
      preferences: [],
      facts: [],
    };
  }
}
