import { Mood } from "./mood.types";

const moodStore = new Map<string, Mood>();

export function getMood(userId: string): Mood {
  return moodStore.get(userId) ?? "neutral";
}

export function setMood(userId: string, mood: Mood) {
  moodStore.set(userId, mood);
}
