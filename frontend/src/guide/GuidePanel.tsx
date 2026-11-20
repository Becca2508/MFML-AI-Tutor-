import { useState } from "react";
import type { GuideScript, GuideProgress, GuideStep} from "../types/guide";
import { MatrixDisplay } from '../components/MatrixDisplay';
import { AnswerReveal } from '../components/AnswerReveal';
import { NumericQuestion } from '../practice/NumericQuestions';
import { HintLadderPanel } from '../practice/HintLadderPanel';
import { addUnique } from '../utils/storage';
import { canUseHints, canRevealSolution } from '../utils/learningPolicy';
import "./GuidePanel.css";

type GuidePanelProps = {
  script: GuideScript;
  progress: GuideProgress;
  onProgress: (next: GuideProgress) => void;
  onPractice?: () => void;
  onNotes: () => void;
};

type GuideActivityProps = {
  step: GuideStep;
  completed: boolean;
  onComplete: () => void;
  onAssistance: () => void;
};

function GuideActivity({step, completed, onComplete, onAssistance, }: GuideActivityProps) {
  const [attempts, setAttempts] = useState(0);
  const helpAllowed = !step.checkpoint || completed || canUseHints(attempts);
  const workAllowed = !step.checkpoint || canRevealSolution(attempts, completed);
  return (
    <article className="guide-step">
      <header className="guide-step-heading">
        <h3>{step.title}</h3>
        <p>{step.body}</p>
      </header>

      {step.checkpoint && (
        <section className="guide-question"> 
        <NumericQuestion 
          question={step.checkpoint}
          showWorkedFeedback={false} 
          onAttempt={setAttempts} 
          onResult={(_, correct) => { if (correct) onComplete(); 
          }
        }
      />
      </section> 
    )}

    {(step.hints?.length ?? 0) > 0 && (
      <details className="guide-help">
        <summary>Need a hint?</summary>


        <HintLadderPanel 
        hints={step.hints || []} 
        allowed={helpAllowed} 
        attempts={completed || !step.checkpoint
        ? undefined : attempts} 
        
        onAssistance={onAssistance} 
      />
    </details>
)}

  {step.id !== "svd-dimensions"  && workAllowed && (
        <section className="guide-comparison">
          <AnswerReveal
            allowed={workAllowed}
            label="worked calculation"
            onReveal={onAssistance}
          >
            <div className="guide-calculation">
              <h4>Worked calculation</h4>
              <pre>{step.equation}</pre>

              {step.matrix && (
                <MatrixDisplay
                  matrix={step.matrix}
                  label={step.matrixLabel ?? "Result"}
                />
              )}

              <div className="guide-reasoning">
                <h4>Why this step matters</h4>
                <p>{step.insight}</p>
              </div>
            </div>
          </AnswerReveal>
        </section>
      )}
    </article>
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
      <p className="guide-step-count">
        Step {stepIndex + 1} of {script.steps.length}
      </p>

      <GuideActivity
        key={step.id}
        step={step}
        completed={progress.completedStepIds.includes(step.id)}
        onComplete={() =>
          onProgress({
            ...progress,
            completedStepIds: addUnique(
              progress.completedStepIds,
              step.id
            ),
          })
        }
        onAssistance={() =>
          onProgress({
            ...progress,
            assistedStepIds: addUnique(
              progress.assistedStepIds,
              step.id
            ),
          })
        }
      />

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

        {stepIndex < script.steps.length - 1 ? (
        <button
          type="button"
          className="primary"
          onClick={() => goToStep(stepIndex + 1)}
        >
          Next →
        </button>
      
        ) : (
          onPractice && (
        <button 
          type="button"
          className="primary"
          onClick={onPractice}>
          Continue to practice →
        </button>
          )
      )}

    </div>
  </section>
  );
}
