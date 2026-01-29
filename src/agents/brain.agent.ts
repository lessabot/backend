import { runLLM } from "./llm.agent";
import { BRAIN_PROMPT } from "./brain.prompt";
import { extractJson } from "../utils/safe-json";

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function runBrain(text: string) {
  let lastError: any;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const raw = await runLLM(`
${BRAIN_PROMPT}

Mensagem do usuário:
"${text}"
`);
      return extractJson(raw);
    } catch (err: any) {
      lastError = err;
      if (err?.status === 503) {
        await sleep(400 * attempt); // backoff simples
        continue;
      }
      throw err;
    }
  }

  // fallback humano (degradação graciosa)
  return {
    mode: "reply",
    reply: "Tô aqui 🙂 só tive um pequeno engasgo agora. Continua.",
    storeMemory: false,
    memories: [],
    profile: {},
  };
}
