export function redactSecrets<T extends Record<string, unknown>>(input: T) {
  const clone: Record<string, unknown> = { ...input };

  for (const key of Object.keys(clone)) {
    if (/token|secret|password|api[_-]?key/i.test(key)) clone[key] = "[REDACTED]";
  }

  return clone as T;
}
