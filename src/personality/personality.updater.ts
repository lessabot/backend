import { PersonalityState } from "./personality.types";

export function updatePersonality(
  current: PersonalityState,
  userMessage: string,
): PersonalityState {
  let next = { ...current };

  if (/kk|haha|😂|😄/i.test(userMessage)) {
    next.formality -= 0.05;
    next.intimacy += 0.05;
  }

  if (userMessage.length > 80) {
    next.verbosity += 0.05;
  }

  if (/obrigado|valeu|vlw/i.test(userMessage)) {
    next.intimacy += 0.03;
  }

  // clamp
  for (const k in next) {
    next[k as keyof PersonalityState] = Math.max(
      0,
      Math.min(1, next[k as keyof PersonalityState]),
    );
  }

  return next;
}
