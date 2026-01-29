type PendingAction = {
  toolName: string;
  args: any;
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
