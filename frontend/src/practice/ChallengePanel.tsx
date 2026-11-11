import { useState } from "react";
import type { ChallengeProblem, ChallengeCheckpoint } from "./types";
import { parseNumericAnswer } from "./grading";
import { gradeChallengeAnswer } from "./challengeGrading";
import { HintLadderPanel } from '../practice/HintLadderPanel';
import { NumericQuestion } from '../practice/NumericQuestions';
import { AnswerReveal } from '../components/AnswerReveal';

type ChallengePanelProps = {
  challenge: ChallengeProblem;
  reviewed: boolean;
  onAttempt: () => void;
  onReview: () => void;
};


type SupportStepProps = {
  checkpoint: ChallengeCheckpoint;
  completed: boolean;
  onComplete: () => void;
};

// One optional checkpoint for checking intermediate work.
function SupportStep({
  checkpoint,
  completed,
  onComplete,
}: SupportStepProps) {
  const [attempts, setAttempts] = useState(0);

  return (
    <section className="challenge-checkpoint">
      <h4>{checkpoint.title}</h4>
      <p>{checkpoint.instructions}</p>

      <NumericQuestion
        question={checkpoint.question}
        showWorkedFeedback={false}
        onAttempt={setAttempts}
        onResult={(_, correct) => {
          if (correct) {
            onComplete();
          }
        }}
      />

      <HintLadderPanel
        hints={checkpoint.hints.slice(0, 2)}
        allowed={completed || attempts > 0}
        attempts={completed ? undefined : attempts}
        onAssistance={() => {}}
      />

      {completed && (
        <p className="completion-note">
          ✓ Intermediate calculation checked
        </p>
      )}
    </section>
  );
}

const factorLabels = ["U", "Σ", "V"];

export function ChallengePanel({
  challenge, reviewed, onAttempt, onReview,
}: ChallengePanelProps) {

    const [entries, setEntries] = useState<string[]>(() =>
    Array(
      challenge.finalAnswer.kind === "numeric" ? 1 : 12
    ).fill("")
  );

  const [attempts, setAttempts] = useState<string[]>([]);

  const [sectionIndex, setSectionIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const checkpoints = challenge.checkpoints ?? [];
  const current = checkpoints[sectionIndex];

  const [feedback, setFeedback] = useState("");
  const [solved, setSolved] = useState(false);

  const [hasIncorrectAttempt, setHasIncorrectAttempt] =
    useState(false);

  const [showCheckpoints, setShowCheckpoints] = useState(false);

  function updateEntry(index: number, value: string) {
    setEntries(previous =>
      previous.map((entry, i) =>
        i === index ? value : entry
      )
    );

    setFeedback("");
  }

  function submitFinalAnswer() {
    const values = entries.map(parseNumericAnswer);

    if (!values.every(Number.isFinite)) {
      setFeedback(
        "Complete every entry using numbers or fractions."
      );
      return;
    }

    // Equivalent fractions and decimals count as one submission.
    const signature = JSON.stringify(values);

    setAttempts(previous =>
      previous.includes(signature)
        ? previous
        : [...previous, signature]
    );

    onAttempt();

    const correct = gradeChallengeAnswer(
      challenge.finalAnswer,
      values
    );

    setSolved(previous => previous || correct);

    if (correct) {
      setFeedback(
        "Correct! Compare your reasoning with the worked solution."
      );
      setShowCheckpoints(false);
    } else {
      setHasIncorrectAttempt(true);
      setFeedback(
        "Not quite. Revise your answer, request a hint, or check your intermediate steps."
      );
    }
  }

  function completeSection(id: string) {
    setCompletedIds(previous =>
      previous.includes(id) ? previous : [...previous, id]
    );
  }
  
  const comparisonAllowed = solved || attempts.length >= 2;

  return (
    <article className="challenge-panel">
      <header>
        <h3>Try it independently</h3>
        <p>{challenge.prompt}</p>
      </header>

      <form
        onSubmit={event => {
          event.preventDefault();
          submitFinalAnswer();
        }}
      >
        {challenge.finalAnswer.kind === "numeric" ? (
          <label className="challenge-final-value">
            <span>Your final answer</span>

            <input
              value={entries[0]}
              onChange={event =>
                updateEntry(0, event.target.value)
              }
              placeholder="Number or fraction"
              required
            />
          </label>
        ) : (
          <>
            <p>
              Enter U, Σ, and V. Enter V before transposing
              it. Use at least four decimal places for
              rounded vector components, such as 0.7071.
            </p>

            <div className="challenge-factors">
              {factorLabels.map((label, factorIndex) => (
                <fieldset key={label}>
                  <legend>{label}</legend>

                  <div className="matrix-input-grid">
                    {[0, 1, 2, 3].map(cell => {
                      const index = factorIndex * 4 + cell;
                      const row = Math.floor(cell / 2) + 1;
                      const column = (cell % 2) + 1;

                      return (
                        <input
                          key={cell}
                          aria-label={
                            `${label} row ${row} column ${column}`
                          }
                          value={entries[index]}
                          onChange={event =>
                            updateEntry(
                              index,
                              event.target.value
                            )
                          }
                          placeholder="0"
                          required
                        />
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </>
        )}

        <button type="submit" className="primary">
          Check final answer
        </button>
      </form>

      <p className="practice-feedback" role="status">
        {feedback}
      </p>

      {/* Up to two challenge-level hints */}
      <HintLadderPanel
        hints={challenge.hints.slice(0, 2)}
        allowed={attempts.length > 0}
        attempts={solved ? undefined : attempts.length}
        onAssistance={() => {}}
      />

      {/* Optional support after an incorrect final answer */}
      {hasIncorrectAttempt &&
        !solved &&
        checkpoints.length > 0 && (
          <button
            type="button"
            className="checkpoint-toggle"
            aria-expanded={showCheckpoints}
            onClick={() =>
              setShowCheckpoints(previous => !previous)
            }
          >
            {showCheckpoints
              ? "Hide step checks"
              : "Help me check my steps"}
          </button>
        )}

      {showCheckpoints && current && (
        <section className="challenge-support">
          <h4>Check your intermediate work</h4>

          <p>
            Use these checks to locate a mistake, then
            revise your final answer above.
          </p>

          <p>
            Check {sectionIndex + 1} of {checkpoints.length}
          </p>

          <SupportStep
            key={current.id}
            checkpoint={current}
            completed={completedIds.includes(
              current.id
            )}
            onComplete={() =>
              completeSection(current.id)
            }
          />

          <div className="practice-navigation">
            <button
              type="button"
              disabled={sectionIndex === 0}
              onClick={() =>
                setSectionIndex(index => index - 1)
              }
            >
              ← Previous check
            </button>

            <button
              type="button"
              disabled={
                sectionIndex === checkpoints.length - 1
              }
              onClick={() =>
                setSectionIndex(index => index + 1)
              }
            >
              Next check →
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowCheckpoints(false)}
          >
            Return to my final answer
          </button>
        </section>
      )}

      {/* Solution comparison after success or two distinct submissions */}
      {comparisonAllowed && (
        <AnswerReveal allowed label="worked solution">
          <div className="challenge-solution">
            <h4>Worked solution</h4>
            <pre>{challenge.solution}</pre>

            {challenge.explanation && (
              <p>{challenge.explanation}</p>
            )}

            <h4>Check your reasoning</h4>
            <pre>{challenge.rubric}</pre>

            <button
              type="button"
              disabled={reviewed}
              onClick={onReview}
            >
              {reviewed ? "Reviewed" : "Mark as reviewed"}
            </button>
          </div>
        </AnswerReveal>
      )}
    </article>
  );
}