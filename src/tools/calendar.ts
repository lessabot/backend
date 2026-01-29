export async function createReminder(args: { text: string; when?: string }) {
  // aqui depois entra Google Calendar / DB / etc
  return {
    success: true,
    message: "Beleza 🙂 lembrete criado.",
  };
}
