import { PersonalityState } from "./personality.types";

const personalityStore = new Map<string, PersonalityState>();

export function getPersonality(userId: string): PersonalityState {
  return (
    personalityStore.get(userId) ?? {
      formality: 0.3,
      verbosity: 0.4,
      curiosity: 0.5,
      intimacy: 0.1,
    }
  );
}

export function savePersonality(userId: string, state: PersonalityState) {
  personalityStore.set(userId, state);
}
