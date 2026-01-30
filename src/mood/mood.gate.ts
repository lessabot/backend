export function shouldAnalyzeMood(text: string): boolean {
  if (text.length < 5) return false;
  if (text.length > 200) return true;

  return /!|\?|…|\.{2,}|😢|😡|😂|kk/i.test(text);
}
