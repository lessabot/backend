export type ChatTurn = {
  role: "user" | "assistant";
  text: string;
  timestamp: number;
};
