export function isConfirmation(text: string): boolean {
  return /^(sim|pode|ok|claro|isso|confirmo|manda|vai)$/i.test(text.trim());
}

export function isRejection(text: string): boolean {
  return /^(não|nao|deixa|melhor não|cancela)$/i.test(text.trim());
}
