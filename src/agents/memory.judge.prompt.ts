import { runLLM } from "./llm.agent";

export const MEMORY_JUDGE_PROMPT = `
Você decide se uma informação deve ser armazenada como memória de longo prazo.

Critérios para salvar:
- Preferências duradouras
- Fatos pessoais relevantes
- Informações reutilizáveis no futuro
- Eventos importantes
- Datas importantes

NÃO salve:
- Frases triviais
- Cumprimentos

Retorne apenas:
true ou false
`;

export async function shouldStoreMemory(text: string) {
  const prompt = `
${MEMORY_JUDGE_PROMPT}

Texto:
"${text}"
`;

  const result = await runLLM(prompt);
  return result.toLowerCase().includes("true");
}
