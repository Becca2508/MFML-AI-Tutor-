import { useState } from "react";
import "./Practice.css";

import type {
  PracticeSet,
  PracticeProgress,
  Stage,
} from "./types";

import { Flashcard } from "./Flashcard";
import { McqQuestion } from "./McqQuestions";
import { NumericQuestion } from "./NumericQuestions";
import { ChallengePanel } from "./ChallengePanel";
import { StageStepper } from "./StageStepper";

import { addUnique } from "../utils/storage";
import "./Practice.css";

type PracticePanelProps = {
  practiceSet: PracticeSet;
  progress: PracticeProgress;
  onProgress: (progress: PracticeProgress) => void;
  onGuide: () => void;
};

export function PracticePanel({
  practiceSet,
  progress,
  onProgress,
  onGuide,
}: PracticePanelProps) {
  const [index, setIndex] = useState(0);

  const stage = progress.stage;

  // Get the activity at the current position.
  const card = practiceSet.warmup[index];
  const question = practiceSet.practice[index];
  const challenge = practiceSet.challenge[index];

  const total =
    stage === "warmup"
      ? practiceSet.warmup.length
      : stage === "practice"
        ? practiceSet.practice.length
        : practiceSet.challenge.length;

  const correctCount = practiceSet.practice.filter(
    item => progress.practiceCorrect[item.id]
  ).length;

  const reviewedCount = practiceSet.challenge.filter(
    item => progress.challengeReviewed.includes(item.id)
  ).length;

  function changeStage(nextStage: Stage) {
    setIndex(0);

    onProgress({
      ...progress,
      stage: nextStage,
    });
  }

  function recordResult(id: string, correct: boolean) {
    onProgress({
      ...progress,

      practiceAttempted: {
        ...progress.practiceAttempted,
        [id]: true,
      },

      // Preserve a previous correct result.
      practiceCorrect: {
        ...progress.practiceCorrect,
        [id]: progress.practiceCorrect[id] === true || correct,
      },
    });
  }

  function finishWarmup() {
    setIndex(0);

    onProgress({
      ...progress,
      warmupDone: true,
      stage: "practice",
    });
  }

  function markChallengeReviewed(id: string) {
    onProgress({
      ...progress,
      challengeReviewed: addUnique(
        progress.challengeReviewed,
        id
      ),
    });
  }

  return (
    <section className="practice-panel">
      <h2>{practiceSet.title}: Practice</h2>

      <p>
        Review the essentials, answer short questions, then
        try an independent challenge.
      </p>

      {/* Progress summaries */}
      <p>
        {correctCount}/{practiceSet.practice.length} practice
        questions answered correctly at least once.
      </p>

      <p>
        {reviewedCount}/{practiceSet.challenge.length} challenges
        reviewed. Reviews are not correctness grades.
      </p>

      {/* Stage navigation */}
      <StageStepper
        stage={stage}
        onSelect={changeStage}
      />

      {total === 0 ? (
        <p>Activities for this stage are coming soon.</p>
      ) : (
        <>
          <p>
            Activity {index + 1} of {total}
          </p>

          {/* Warm-up flashcards */}
          {stage === "warmup" && card && (
            <Flashcard
              key={card.id}
              card={card}
            />
          )}

          {/* Automatically checked practice questions */}
          {stage === "practice" && question && (
            <div key={question.id}>
              {question.kind === "mcq" ? (
                <McqQuestion
                  question={question}
                  onResult={recordResult}
                />
              ) : (
                <NumericQuestion
                  question={question}
                  onResult={recordResult}
                />
              )}

              {progress.practiceCorrect[question.id] && (
                <p className="completion-note">
                  ✓ Answered correctly
                </p>
              )}
            </div>
          )}

          {/* Independent challenge and self-review */}
          {stage === "challenge" && challenge && (
            <ChallengePanel
              key={challenge.id}
              challenge={challenge}
              reviewed={
                progress.challengeReviewed.includes(challenge.id)
              }
              onReview={() =>
                markChallengeReviewed(challenge.id)
              }
            />
          )}

          {/* Activity navigation */}
          <div className="practice-navigation">
            <button
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              ← Previous
            </button>

            {index < total - 1 ? (
              <button onClick={() => setIndex(index + 1)}>
                Next →
              </button>
            ) : stage === "warmup" ? (
              <button onClick={finishWarmup}>
                Finish warm-up →
              </button>
            ) : stage === "practice" ? (
              <button onClick={() => changeStage("challenge")}>
                Try the challenges →
              </button>
            ) : (
              <span>End of challenge set</span>
            )}
          </div>
        </>
      )}

      {progress.warmupDone && (
        <p className="completion-note">
          ✓ Warm-up reviewed
        </p>
      )}

      <button onClick={onGuide}>
        Review the walkthrough
      </button>
    </section>
  );
}