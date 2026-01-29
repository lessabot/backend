export type QdrantConfig = {
  url: string;
  apiKey?: string;
};

export function getQdrantConfig(): QdrantConfig {
  const url = process.env.QDRANT_URL;
  if (!url) throw new Error("QDRANT_URL is required");
  const apiKey = process.env.QDRANT_API_KEY;
  return { url, apiKey };
}
