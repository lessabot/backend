export type UserProfile = {
  userId: string;
  traits: Record<string, unknown>;
  updatedAt: Date;
};

class ProfileStore {
  private readonly byUserId = new Map<string, UserProfile>();

  get(userId: string) {
    return this.byUserId.get(userId) ?? null;
  }

  upsert(profile: UserProfile) {
    this.byUserId.set(profile.userId, profile);
  }
}

export const profileStore = new ProfileStore();
