const pendingCounts = new Map<string, number>();

export function registerNewMemories(userId: string, count: number) {
  const current = pendingCounts.get(userId) ?? 0;
  pendingCounts.set(userId, current + count);
}

export function shouldUpdateSummary(userId: string): boolean {
  return (pendingCounts.get(userId) ?? 0) >= 5;
}

export function resetSummaryCounter(userId: string) {
  pendingCounts.delete(userId);
}
