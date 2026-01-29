import Fastify from "fastify";
import { buildApp } from "./app";
import { qdrant } from "./infra/qdrant";

const server = Fastify({ logger: true });

// async function ensureCollection() {
//   try {
//     await qdrant.getCollection("memory");
//   } catch {
//     await qdrant.createCollection("memory", {
//       vectors: { size: 768, distance: "Cosine" },
//     });
//   }
// }

buildApp(server);

server
  .listen({
    port: Number(process.env.PORT) || 3000,
    host: "0.0.0.0",
  })
  .then(async () => {
    // await ensureCollection();
    // await qdrant.deleteCollection("memory");

    // await qdrant.createCollection("memory", {
    //   vectors: {
    //     size: 768,
    //     distance: "Cosine",
    //   },
    // });

    console.log("Server is running");
  });
