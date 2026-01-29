"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertProfile = upsertProfile;
const profile_store_1 = require("../memory/profile.store");
async function upsertProfile(ctx, profile) {
    profile_store_1.profileStore.upsert({ userId: profile.userId, traits: profile.traits ?? {}, updatedAt: new Date() });
    return { ok: true };
}
