import { summarizeText } from "../memory/summarizer";

export async function respond(input: { text: string }) {
  const summary = summarizeText(input.text);
  return { reply: summary };
}
