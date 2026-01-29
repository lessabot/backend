export function extractFacts(text: string) {
  const facts = [];

  if (text.toLowerCase().includes("gosto de")) {
    facts.push({ type: "preference", value: text });
  }

  return facts;
}
