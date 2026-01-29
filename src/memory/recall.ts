import { qdrant } from "../infra/qdrant";

export async function recallMemories(userId: string) {
  const res = await qdrant.scroll("memory", {
    filter: {
      must: [
        {
          key: "userId",
          match: { value: userId },
        },
      ],
    },
    limit: 5,
  });

  return res.points.map((p) => p.payload?.text);
}
