import { FastifyInstance } from "fastify";
import { handleIncomingMessage } from "../telegram/handler";

export default async function telegramWebhook(app: FastifyInstance) {
  app.post("/telegram", async (req, reply) => {
    const update = req.body as any;

    reply.code(200).send({ ok: true });

    if (update.message) {
      handleIncomingMessage(update.message).catch((err) =>
        console.error("Handler error:", err),
      );
    }
  });
}
