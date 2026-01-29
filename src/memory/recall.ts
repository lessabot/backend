import { qdrant } from "../infra/qdrant";
import { embed } from "../infra/embeddings";

export async function recallMemories(userId: string, query: string) {
  const vector = await embed(query);

  const res = await qdrant.search("memory", {
    vector,
    limit: 5,
    filter: {
      must: [
        {
          key: "userId",
          match: { value: userId },
        },
      ],
    },
  });

  return res.map((r) => r.payload?.text);
}
