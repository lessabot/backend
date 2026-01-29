import { qdrant } from "../infra/qdrant";
import { randomUUID } from "crypto";

export async function saveMemories(userId: string, memories: string[]) {
  for (const memory of memories) {
    await qdrant.upsert("memory", {
      points: [
        {
          id: randomUUID(),
          payload: {
            userId,
            text: memory,
            createdAt: Date.now(),
          },
          vector: [], // embedding será automático depois
        },
      ],
    });
  }
}
