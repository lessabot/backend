"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const health_1 = __importDefault(require("./routes/health"));
const webhook_1 = __importDefault(require("./routes/webhook"));
function buildApp(app) {
    app.register(health_1.default, { prefix: "/health" });
    app.register(webhook_1.default, { prefix: "/webhook" });
}
