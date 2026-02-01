import { db } from "../infra/postgres";

export async function saveProfile(
  userId: string,
  profile: Record<string, { value: string; confidence?: number }>,
) {
  for (const [key, entry] of Object.entries(profile)) {
    await db.query(
      `
  INSERT INTO public.user_profile (user_id, key, value, confidence)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (user_id, key)
  DO UPDATE SET
    value = EXCLUDED.value,
    confidence = EXCLUDED.confidence,
    updated_at = NOW()
  `,
      [userId, key, entry.value, entry.confidence ?? 1],
    );
  }
}
