import { FastifyInstance } from "fastify";
import health from "./routes/health";
import webhook from "./routes/webhook";
import telegramWebhook from "./routes/telegram.webhook";

export function buildApp(app: FastifyInstance) {
  app.register(health, { prefix: "/health" });
  app.register(webhook, { prefix: "/webhook" });
  app.register(telegramWebhook, { prefix: "/webhook" });
}
