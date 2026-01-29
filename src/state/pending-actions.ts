type PendingAction = {
  toolName: string;
  args: any;
  originalUserMessage: string;
  createdAt: number;
};

const pendingActions = new Map<string, PendingAction>();

export function setPendingAction(userId: string, action: PendingAction) {
  pendingActions.set(userId, action);
}

export function getPendingAction(userId: string) {
  return pendingActions.get(userId);
}

export function clearPendingAction(userId: string) {
  pendingActions.delete(userId);
}
