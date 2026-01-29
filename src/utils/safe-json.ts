export function extractJson(raw: string): any {
  // remove blocos ```json ``` ou ```
  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}
