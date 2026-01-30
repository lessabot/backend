import { Mood } from "./mood.types";

export function detectMood(text: string): Mood {
  const t = text.toLowerCase();

  if (/morri|odeio|minha vida|triste|depress/i.test(t)) return "sad";
  if (/raiva|ódio|puta|krl|caralho/i.test(t)) return "irritated";
  if (/kk|haha|😂|😄|rsrs/i.test(t)) return "playful";
  if (/cansado|estress|cheio|pqp/i.test(t)) return "stressed";
  if (/amo|feliz|ótimo|bom demais/i.test(t)) return "positive";

  return "neutral";
}
