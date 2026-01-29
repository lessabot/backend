import { BrainTrace } from "./brain.trace";

export function logBrainTrace(trace: BrainTrace) {
  console.log(
    JSON.stringify({
      level: "brain_trace",
      ...trace,
    }),
  );
}
