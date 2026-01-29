import Fastify from "fastify";
import { buildApp } from "./app";

const server = Fastify({ logger: true });

buildApp(server);

server.listen({ port: 3000, host: "0.0.0.0" });
