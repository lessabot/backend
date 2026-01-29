import { qdrant } from "../infra/qdrant";
import { randomUUID } from "crypto";
import { embed } from "../infra/embeddings";

export async function saveMemories(userId: string, memories: string[]) {
  for (const memory of memories) {
    const vector = await embed(memory);

    await qdrant.upsert("memory", {
      points: [
        {
          id: randomUUID(),
          vector,
          payload: {
            userId,
            text: memory,
            createdAt: Date.now(),
          },
        },
      ],
    });
  }
}
