import { useState } from "react";
import type { ChallengeProblem } from "./types";

type ChallengePanelProps = {
  challenge: ChallengeProblem;
  reviewed: boolean;
  onReview: () => void;
};

export function ChallengePanel({
  challenge,
  reviewed,
  onReview,
}: ChallengePanelProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <article className="challenge-panel">
      <header>
        <h3>Try it independently</h3>
        <p>{challenge.prompt}</p>
      </header>

      <aside className="challenge-instructions">
        <strong>Before revealing the solution</strong>
        <p>
          Work through the problem on paper. Write down
          your calculations and explain why each step works.
        </p>
      </aside>

      <button
        aria-expanded={showSolution}
        onClick={() => setShowSolution(!showSolution)}
      >
        {showSolution
          ? "Hide worked solution"
          : "Compare with the worked solution"}
      </button>

      {showSolution && (
        <div className="challenge-solution">
          <h4>Worked solution</h4>
          <pre>{challenge.solution}</pre>

          {challenge.explanation && (
            <p>{challenge.explanation}</p>
          )}

          <h4>Check your reasoning</h4>
          <pre>{challenge.rubric}</pre>

          <div className="challenge-reflection">
            <h4>Before moving on</h4>

            <ul>
              <li>Where did your approach match the solution?</li>
              <li>Which step would you change?</li>
              <li>Could you explain the method without looking?</li>
            </ul>
          </div>

          <button
            disabled={reviewed}
            onClick={onReview}
          >
            {reviewed
              ? "Reviewed"
              : "Mark as reviewed"}
          </button>

        </div>
      )}

      <p role="status">
        {reviewed && "✓ You marked this challenge as reviewed."}
      </p>
    </article>
  );
}