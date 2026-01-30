import { runLLM } from "./llm.agent";
import { extractJson } from "../utils/safe-json";
import { Mood } from "../mood/mood.types";

export async function analyzeMood(input: {
  message: string;
  recentContext?: string[];
}): Promise<Mood> {
  const raw = await runLLM(`
Você analisa o estado emocional implícito de uma mensagem humana.

Mensagem atual:
"${input.message}"

Contexto recente:
${input.recentContext?.join("\n") ?? "Nenhum"}

Classifique o estado emocional predominante.

Opções válidas:
neutral, positive, sad, stressed, playful, irritated

Regras:
- Se for ambíguo → neutral
- Não invente emoções
- Retorne APENAS JSON válido

Formato:
{
  "mood": "neutral" | "positive" | "sad" | "stressed" | "playful" | "irritated"
}
`);

  const parsed = extractJson(raw);
  return parsed.mood as Mood;
}
