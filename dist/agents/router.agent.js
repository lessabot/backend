"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeAgent = routeAgent;
function routeAgent(input) {
    if (!input.intent.trim())
        return { ok: false, error: "intent_required" };
    return { ok: true, value: { agent: "response" } };
}
