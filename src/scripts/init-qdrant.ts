import { qdrant } from "../infra/qdrant";

async function init() {
  const collections = await qdrant.getCollections();
  const exists = collections.collections.find((c) => c.name === "memory");

  if (exists) {
    console.log("Collection 'memory' já existe.");
    return;
  }

  await qdrant.createCollection("memory", {
    vectors: {
      size: 768,
      distance: "Cosine",
    },
  });

  console.log("Collection 'memory' criada com sucesso.");
}

init()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
