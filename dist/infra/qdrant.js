"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQdrantConfig = getQdrantConfig;
function getQdrantConfig() {
    const url = process.env.QDRANT_URL;
    if (!url)
        throw new Error("QDRANT_URL is required");
    const apiKey = process.env.QDRANT_API_KEY;
    return { url, apiKey };
}
