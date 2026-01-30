import { ChatTurn } from "./rolling.types";

const store = new Map<string, ChatTurn[]>();
const MAX_TURNS = 10;

export function addTurn(userId: string, turn: ChatTurn) {
  const history = store.get(userId) ?? [];
  const updated = [...history, turn].slice(-MAX_TURNS);
  store.set(userId, updated);
}

export function getRecentTurns(userId: string): ChatTurn[] {
  return store.get(userId) ?? [];
}

export function clearRecentTurns(userId: string) {
  store.delete(userId);
}
