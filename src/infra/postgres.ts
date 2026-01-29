export type PostgresConfig = {
  url: string;
};

export function getPostgresConfig(): PostgresConfig {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error("POSTGRES_URL is required");
  return { url };
}
