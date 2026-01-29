export type VectorRecord = {
  id: string;
  vector: number[];
  payload?: Record<string, unknown>;
};

class VectorStore {
  private readonly byId = new Map<string, VectorRecord>();

  upsert(record: VectorRecord) {
    this.byId.set(record.id, record);
  }

  get(id: string) {
    return this.byId.get(id) ?? null;
  }
}

export const vectorStore = new VectorStore();
