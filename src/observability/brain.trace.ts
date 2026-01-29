export type BrainTrace = {
  userId: string;
  message: string;
  brainOutput: any;
  tookMs: number;
  usedTool: string | null;
  requiresConfirmation: boolean;
  error?: string;
  createdAt: string;
};
