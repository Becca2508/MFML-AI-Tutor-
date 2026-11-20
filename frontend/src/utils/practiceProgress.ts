import type { PracticeProgress } from "../practice/types";

import {
  browserStorage,
  readStored,
  writeStored,
  stringIds,
  booleanMap,
} from "./storage.ts";


// Starting state for a topic with no saved practice.
export function emptyPracticeProgress(): PracticeProgress {
  return {
    stage: "warmup",
    warmupDone: false,
    practiceAttempted: {},
    practiceCorrect: {},
    challengeAttempted: [],
    challengeReviewed: [],
  };
}

// Check saved data and replace invalid fields with defaults.
export function sanitizePracticeProgress(
  value: unknown
): PracticeProgress {
  if (!value || typeof value !== "object") {
    return emptyPracticeProgress();
  }

  const saved = value as Record<string, unknown>;

  return {
    stage:
      saved.stage === "practice" ||
      saved.stage === "challenge"
        ? saved.stage
        : "warmup",

    warmupDone: saved.warmupDone === true,

    practiceAttempted: booleanMap(
      saved.practiceAttempted
    ),

    practiceCorrect: booleanMap(
      saved.practiceCorrect
    ),

    challengeAttempted: stringIds(saved.challengeAttempted),

    challengeReviewed: stringIds(
      saved.challengeReviewed
    ),
  };
}

// Read and validate practice progress for the selected topic.
export function loadPracticeProgress(
  topicId: string,
  storage: Storage | null = browserStorage()
): PracticeProgress {

  return sanitizePracticeProgress(readStored(`mfml.practice.v1.${topicId}`, storage));
}

// Return whether saving succeeded.
export function savePracticeProgress(
  topicId: string,
  progress: PracticeProgress,
  storage = browserStorage()
): boolean {
  return writeStored(
    `mfml.practice.v1.${topicId}`,
    progress,
    storage
  );
}