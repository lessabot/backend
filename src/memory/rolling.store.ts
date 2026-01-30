type Turn = {
  role: "user" | "assistant";
  text: string;
  ts: number;
};

const memory = new Map<string, Turn[]>();

export function addTurn(userId: string, turn: Turn) {
  const turns = memory.get(userId) ?? [];
  turns.push(turn);

  // mantém só os últimos 6 turnos
  memory.set(userId, turns.slice(-6));
}

export function getRecentTurns(userId: string): Turn[] {
  return memory.get(userId) ?? [];
}
