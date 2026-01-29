import { FastifyInstance } from "fastify";
import { classifyIntent } from "../agents/router.agent";

export default async function (app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const body = req.body as any;
    const message = body?.message?.text || "";

    const intent = classifyIntent(message);

    return {
      ok: true,
      intent,
    };
  });
}
