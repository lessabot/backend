"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const app_1 = require("./app");
const server = (0, fastify_1.default)({ logger: true });
(0, app_1.buildApp)(server);
server.listen({ port: 3000, host: "0.0.0.0" });
