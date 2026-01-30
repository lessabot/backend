import { runLLM } from "./llm.agent";

export async function summarizeConversation(input: {
  turns: { role: "user" | "assistant"; text: string }[];
  userId: string;
}) {
  const transcript = input.turns
    .map((t) => `${t.role === "user" ? "Usuário" : "Assistente"}: ${t.text}`)
    .join("\n");

  const raw = await runLLM(`
Você é um sistema de compressão de memória de um assistente pessoal.

Abaixo está uma conversa recente.
Sua tarefa é gerar um RESUMO ÚTIL para memória de longo prazo.

REGRAS:
- NÃO repetir frases literais
- NÃO fazer resumo genérico
- EXTRAIR:
  - fatos importantes
  - estado emocional
  - preferências
  - contexto pessoal
- Escrever em frases curtas e objetivas
- Máximo 6 bullets

Formato JSON estrito:
{
  "memories": string[],
  "emotional_state": string | null
}

Conversa:
${transcript}
`);

  return JSON.parse(raw);
}
