export type RedisConfig = {
  url: string;
};

export function getRedisConfig(): RedisConfig {
  const url = process.env.REDIS_URL;
  if (!url) throw new Error("REDIS_URL is required");
  return { url };
}
