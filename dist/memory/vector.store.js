"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vectorStore = void 0;
class VectorStore {
    byId = new Map();
    upsert(record) {
        this.byId.set(record.id, record);
    }
    get(id) {
        return this.byId.get(id) ?? null;
    }
}
exports.vectorStore = new VectorStore();
