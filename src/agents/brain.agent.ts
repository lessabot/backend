import { runLLM } from "./llm.agent";
import { BRAIN_PROMPT } from "./brain.prompt";
import { extractJson } from "../utils/safe-json";
import { getPersonality } from "../personality/personality.store";
import { getMemorySummary } from "../memory/summary.store";
import { getRecentTurns } from "../memory/rolling.store";
import { getMood } from "../mood/mood.store";

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function runBrain(userId: string, text: string) {
  const personality = getPersonality(userId);
  const recent = getRecentTurns(userId);
  const mood = getMood(userId);

  let lastError: any;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const raw = await runLLM(`
        

${BRAIN_PROMPT}

Mensagem do usuário:
"${text}"

Últimas mensagens da conversa (para continuidade):
Use esse histórico APENAS para manter continuidade.
Não trate isso como memória permanente.
${
  recent
    .map((t) => `${t.role === "user" ? "Usuário" : "Lessa"}: ${t.text}`)
    .join("\n") || "Nenhuma"
}


Resumo persistente do usuário:
${getMemorySummary(userId) ?? "Ainda não disponível"}


Estilo de conversa da Lessa com este usuário:
- Formalidade: ${personality.formality}
- Verbosidade: ${personality.verbosity}
- Curiosidade: ${personality.curiosity}
- Intimidade: ${personality.intimacy}


Estado emocional atual do usuário: ${mood}
Regras:
- Se mood = sad → seja empático, calmo, não brincalhão
- Se mood = irritated → seja direto, sem ironia
- Se mood = playful → pode usar humor leve
- Se mood = stressed → respostas curtas e tranquilizadoras
- Se mood = positive → pode ser mais expansivo


Instruções:
- Ajuste o tom de resposta com base nesses valores
- Valores baixos = casual / curto
- Valores altos = mais elaborado

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
