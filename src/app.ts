import { FastifyInstance } from "fastify";
import health from "./routes/health";
import telegramWebhook from "./routes/telegram.webhook";

export function buildApp(app: FastifyInstance) {
  app.register(health, { prefix: "/health" });
  app.register(telegramWebhook, { prefix: "/webhook" });
}
