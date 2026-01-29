import { profileStore } from "../memory/profile.store";
import { type Context } from "../types/context";

export async function upsertProfile(ctx: Context, profile: { userId: string; traits?: Record<string, unknown> }) {
  profileStore.upsert({ userId: profile.userId, traits: profile.traits ?? {}, updatedAt: new Date() });
  return { ok: true as const };
}
