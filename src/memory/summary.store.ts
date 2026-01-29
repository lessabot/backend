import { UserMemorySummary } from "./summary.types";

const summaries = new Map<string, UserMemorySummary>();

export function getMemorySummary(userId: string): string | null {
  return summaries.get(userId)?.summary ?? null;
}

export function saveMemorySummary(userId: string, summary: string) {
  summaries.set(userId, {
    userId,
    summary,
    updatedAt: Date.now(),
  });
}
