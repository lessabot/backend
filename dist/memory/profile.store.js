"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileStore = void 0;
class ProfileStore {
    byUserId = new Map();
    get(userId) {
        return this.byUserId.get(userId) ?? null;
    }
    upsert(profile) {
        this.byUserId.set(profile.userId, profile);
    }
}
exports.profileStore = new ProfileStore();
