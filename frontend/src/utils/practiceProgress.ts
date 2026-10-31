import type { PracticeProgress } from "../practice/types";

import {
  browserStorage,
  readStored,
  writeStored,
  stringIds,
  booleanMap,
} from "./storage.ts";

const VERSION = "v1";

// Separate from walkthrough storage, even for the same topic.
function storageKey(topicId: string): string {
  return `mfml.practice.${VERSION}.${topicId}`;
}

// Starting state for a topic with no saved practice.
export function emptyPracticeProgress(): PracticeProgress {
  return {
    stage: "warmup",
    warmupDone: false,
    practiceAttempted: {},
    practiceCorrect: {},
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
  const saved = readStored(storageKey(topicId), storage);

  return sanitizePracticeProgress(saved);
}

// Return whether saving succeeded.
export function savePracticeProgress(
  topicId: string,
  progress: PracticeProgress,
  storage: Storage | null = browserStorage()
): boolean {
  return writeStored(
    storageKey(topicId),
    progress,
    storage
  );
}