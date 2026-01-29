export function getEnv(name: string) {
  const value = process.env[name];
  return value ?? null;
}
