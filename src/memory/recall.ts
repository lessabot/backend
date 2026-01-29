import { qdrant } from "../infra/qdrant";
import { embed } from "../infra/embeddings";

export type RecalledMemory = {
  text: string;
  score: number;
};

export async function recallMemories(
  userId: string,
  query: string,
): Promise<RecalledMemory[]> {
  const vector = await embed(query);

  const res = await qdrant.search("memory", {
    vector,
    limit: 10,
    score_threshold: 0.25,
    filter: {
      must: [
        {
          key: "userId",
          match: { value: userId },
        },
      ],
    },
  });

  return res
    .map((r) => ({
      text: String(r.payload?.text ?? ""),
      score: r.score ?? 0,
    }))
    .filter((m) => m.text.length > 0);
}
