import { db } from "../infra/postgres";

export async function saveProfile(userId: string, profile: any) {
  for (const [key, value] of Object.entries(profile)) {
    if (!value) continue;

    await db.query(
      `
      INSERT INTO user_profile (user_id, key, value)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, key)
      DO UPDATE SET value = EXCLUDED.value, updated_at = now()
      `,
      [userId, key, String(value)],
    );
  }
}
