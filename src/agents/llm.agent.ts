import { geminiModel } from "../infra/gemini";

export async function runLLM(prompt: string) {
  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
