export type Intent = "onboarding" | "bored" | "chat" | "command";

export function classifyIntent(text: string): Intent {
  const t = text.toLowerCase();

  if (t.includes("entedi")) return "bored";
  if (t.startsWith("/")) return "command";

  return "chat";
}
