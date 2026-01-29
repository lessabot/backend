import { FastifyInstance } from "fastify";
import health from "./routes/health";
import webhook from "./routes/webhook";

export function buildApp(app: FastifyInstance) {
  app.register(health, { prefix: "/health" });
  app.register(webhook, { prefix: "/webhook" });
}
