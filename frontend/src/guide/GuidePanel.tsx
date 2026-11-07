import { useState } from "react";
import type { GuideScript, GuideProgress, Matrix} from "../types/guide";
import "./GuidePanel.css";

type GuidePanelProps = {
  script: GuideScript;
  progress: GuideProgress;
  onProgress: (next: GuideProgress) => void;
  onPractice?: () => void;
  onNotes: () => void;
};

// Reusable display for the starting and intermediate matrices.
function MatrixDisplay({
  matrix,
  label,
}: {
  matrix: Matrix;
  label: string;
}) {
  return (
    <div className="guide-matrix">
      <table>
        <caption>{label}</caption>

        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, columnIndex) => (
                <td key={columnIndex}>
                  {Number(value.toFixed(3))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GuidePanel({ script, progress,
  onProgress, onPractice, onNotes}: GuidePanelProps) {
  
  const savedIndex = script.steps.findIndex(
    item => item.id === progress.currentStepId
  );

  const stepIndex = savedIndex >= 0 ? savedIndex : 0;

  const step = script.steps[stepIndex];

  function goToStep(index: number) {
    const nextStep = script.steps[index];

    if (!nextStep) {
      return;
    }

    onProgress({
      ...progress,
      currentStepId: nextStep.id,
    });
  }

  if (!step) {
    return <p>No walkthrough steps are available yet.</p>;
  }

  return (
    <section className="guide-panel">
      {/* Overall lesson heading */}
      <header className="guide-heading">
        <h2>{script.title}</h2>
        <p>Follow the calculation and the reasoning behind it.</p>
      </header>

      {/* Original matrix */}
      <div className="guide-starting-matrix">
        <h3>Our starting matrix</h3>
        <MatrixDisplay matrix={script.matrix} label="A" />
      </div>

      {/* Direct navigation between steps */}
      <nav className="guide-step-buttons" aria-label="Walkthrough steps">
        {script.steps.map((item, index) => (
          <button
            key={item.id}
            aria-current={index === stepIndex ? "step" : undefined}
            onClick={() => goToStep(index)}
          >
            {index + 1}. {item.label}
          </button>
        ))}
      </nav>

      {/* Current step content */}
      <article className="guide-step">
        <p className="guide-step-count">
          Step {stepIndex + 1} of {script.steps.length}
        </p>

        <h3>{step.title}</h3>
        <p>{step.body}</p>

        <div className="guide-calculation">
          <h4>Calculation</h4>
          <pre>{step.equation}</pre>
        </div>

        {step.matrix && (
          <MatrixDisplay
            matrix={step.matrix}
            label={step.matrixLabel ?? "Result"}
          />
        )}

        <aside className="guide-insight">
          <h4>Why this matters</h4>
          <p>{step.insight}</p>
        </aside>
      </article>

      {/* Sequential navigation */}
      <div className="guide-navigation">
        <button
          disabled={stepIndex === 0}
          onClick={() => goToStep(stepIndex - 1)}
        >
          ← Previous
        </button>

        <button type="button" onClick={onNotes}>
          Review the notes
        </button>

        <span>
          {stepIndex + 1} / {script.steps.length}
        </span>

        <button
          type="button"
          disabled={stepIndex === script.steps.length - 1}
          onClick={() => goToStep(stepIndex + 1)}
        >
          Next →
        </button>
      </div>

      {stepIndex === script.steps.length - 1 && onPractice && (
        <button onClick={onPractice}>
          Continue to practice →
        </button>
      )}

    </section>
  );
}