"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRoutes = void 0;
const webhookRoutes = async (app) => {
    app.post("/", async (request) => {
        return { received: true, timestamp: Date.now() };
    });
};
exports.webhookRoutes = webhookRoutes;
