import type { GuideProgress } from "../types/guide";

import {
  browserStorage,
  readStored,
  writeStored,
  stringIds,
} from "./storage.ts";

const VERSION = "v1";

// Each topic has its own saved walkthrough progress.
function storageKey(topicId: string): string {
  return `mfml.guide.${VERSION}.${topicId}`;
}

//Initial state there is no saved progress
export function emptyGuideProgress(): GuideProgress {
  return {
    currentStepId: null,
    completedStepIds: [],
    assistedStepIds: [],
  };
}

// Check saved data before giving it to React.
export function sanitizeGuideProgress(
  value: unknown
): GuideProgress {
  if (!value || typeof value !== "object") {
    return emptyGuideProgress();
  }

  const saved = value as Record<string, unknown>;

  return {
    currentStepId:
      typeof saved.currentStepId === "string"
        ? saved.currentStepId
        : null,

    completedStepIds: stringIds(saved.completedStepIds),

    assistedStepIds: stringIds(saved.assistedStepIds),
  };
}

// Read and validate progress for the selected topic.
export function loadGuideProgress(
  topicId: string,
  storage: Storage | null = browserStorage()
): GuideProgress {
  const saved = readStored(storageKey(topicId), storage);

  return sanitizeGuideProgress(saved);
}

export function saveGuideProgress(
  topicId: string,
  progress: GuideProgress,
  storage: Storage | null = browserStorage()
): boolean {
  return writeStored(
    storageKey(topicId),
    progress,
    storage
  );
}