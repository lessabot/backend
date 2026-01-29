export function summarizeText(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return trimmed.length <= 160 ? trimmed : `${trimmed.slice(0, 157)}...`;
}
