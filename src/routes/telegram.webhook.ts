import { FastifyInstance } from "fastify";
import { handleIncomingMessage } from "../telegram/handler";

export default async function (app: FastifyInstance) {
  app.post("/telegram", async (req, res) => {
    const update = req.body as any;

    if (update.message) {
      await handleIncomingMessage(update.message);
    }

    return { ok: true };
  });
}
