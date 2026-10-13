import { useState } from "react";
import type { StudyMode } from './types/study';
import './Home.css';

type HomeProps = {
  onOpen: (mode: StudyMode) => void;
  completed: number;
};

export default function Home({ onOpen, completed }: HomeProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <main className="mf-home">
      <div className="mf-home-inner">

        <div className="mf-symbols" aria-hidden="true">
          <span>Σ</span>
          <span>λ</span>
          <span>∫</span>
          <span>Av</span>
        </div>

        <div className="mf-wrap">
          {/* HERO */}
          <section className="mf-hero">
            <div className="mf-hero-copy">
              <span className="mf-eyebrow">
                YOUR MFML STUDY SPACE
              </span>

              <h1>
                Understand the math.
                <br />
                <span className="mf-highlight">
                  Build the intuition.
                </span>
              </h1>

              <p className="mf-description">
                Explore mathematical foundations through
                clear notes, guided examples, and practice
                that helps you understand each step.
              </p>

              <div className="mf-actions">
                <button
                  className="mf-button"
                  onClick={() => onOpen("guide")}
                >
                  {completed > 0
                    ? "Continue the walkthrough"
                    : "Start learning"}
                  <span aria-hidden="true"> →</span>
                </button>

                <button
                  className="mf-button-secondary"
                  onClick={() => onOpen("notes")}
                >
                  Review the notes
                </button>
              </div>

              <p className="mf-progress">
                {completed}/6 SVD checkpoints completed
              </p>
            </div>

            {/* COLLAGE */}
            <div className="mf-collage">
              <figure className="mf-card mf-matrix-card">
                <span className="mf-card-label">
                  START WITH A MATRIX
                </span>

                <pre>
                  {"A = [3  1]\n    [1  3]"}
                </pre>

                <figcaption>
                  What can this matrix tell us?
                </figcaption>
              </figure>

              <article className="mf-card mf-topic-card">
                <span className="mf-card-label">
                  THE SVD ROUTE
                </span>

                <ul>
                  <li>Build AᵀA</li>
                  <li>Find singular values</li>
                  <li>Construct U and V</li>
                  <li>Check the decomposition</li>
                </ul>
              </article>

              <article className="mf-card mf-question-card">
                <span className="mf-card-label">
                  A MOMENT TO THINK
                </span>

                <h2>
                  If λ = 16, what is the singular value?
                </h2>

                <button
                  className="mf-button-secondary"
                  aria-expanded={showAnswer}
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  {showAnswer ? "Hide explanation" : "Show explanation"}
                </button>

                {showAnswer && (
                  <p role="status">
                    Take the nonnegative square root:
                    σ = √16 = 4.
                  </p>
                )}
              </article>

              <article className="mf-card mf-formula-card">
                <span className="mf-card-label">
                  THE MAIN IDEA
                </span>

                <strong>A = UΣVᵀ</strong>
                <p>Change coordinates. Scale. Map back.</p>
              </article>
            </div>
          </section>

          {/* LEARNING SEQUENCE */}
          <section
            className="mf-method"
            aria-labelledby="method-title"
          >
            <div className="mf-method-copy">
              <span className="mf-eyebrow">
                HOW TO USE THE TUTOR
              </span>

              <h2 id="method-title">
                Move from a formula
                <br />
                to an explanation.
              </h2>

              <p>
                Start with the essentials, work through a
                calculation, and check whether you can apply
                the method independently.
              </p>
            </div>

            <div className="mf-method-steps">
              <article>
                <span className="mf-card-label">
                  STEP 01 · REVIEW
                </span>
                <h3>Understand the concepts</h3>
                <p>
                  Review definitions, formulas, and examples.
                </p>
              </article>

              <article>
                <span className="mf-card-label">
                  STEP 02 · FOLLOW
                </span>
                <h3>Work through the example</h3>
                <p>
                  Try checkpoints and use hints when needed.
                </p>
              </article>

              <article>
                <span className="mf-card-label">
                  STEP 03 · APPLY
                </span>
                <h3>Try a different problem</h3>
                <p>
                  Practice the method with another matrix.
                </p>
              </article>
            </div>
          </section>

          {/* STUDY TOOLS */}
          <section
            className="mf-tools"
            aria-labelledby="tools-title"
          >
            <div className="mf-section-heading">
              <h2 id="tools-title">Choose how to study.</h2>
              <p>Three connected ways to explore SVD.</p>
            </div>

            <div className="mf-tools-grid">
              <button
                className="mf-tool"
                onClick={() => onOpen("notes")}
              >
                <span className="mf-tool-number">01</span>
                <strong>Study notes</strong>
                <span>
                  Refresh the vocabulary and formulas.
                </span>
                <span className="mf-tool-link">
                  Open notes →
                </span>
              </button>

              <button
                className="mf-tool"
                onClick={() => onOpen("guide")}
              >
                <span className="mf-tool-number">02</span>
                <strong>Guided walkthrough</strong>
                <span>
                  Build an SVD one calculation at a time.
                </span>
                <span className="mf-tool-link">
                  Begin walkthrough →
                </span>
              </button>

              <button
                className="mf-tool"
                onClick={() => onOpen("practice")}
              >
                <span className="mf-tool-number">03</span>
                <strong>Practice problems</strong>
                <span>
                  Test your understanding with feedback.
                </span>
                <span className="mf-tool-link">
                  Try practice →
                </span>
              </button>
            </div>
          </section>

          {/* PREPARATION SECTION */}
          <section className="mf-preparation">
            <div>
              <span className="mf-eyebrow">
                BEFORE YOUR NEXT PROBLEM
              </span>

              <h2>Can you explain why it works?</h2>

              <p>
                Aim to understand the choices behind the
                calculation, not just the final answer.
              </p>

              <button
                className="mf-button"
                onClick={() => onOpen("practice")}
              >
                Check your understanding →
              </button>
            </div>

            <aside className="mf-review-card">
              <h3>Questions to ask yourself</h3>
              <ul>
                <li>Why do we calculate AᵀA?</li>
                <li>Why do we normalize eigenvectors?</li>
                <li>How do we verify the factors?</li>
              </ul>
            </aside>
          </section>

        </div>
      </div>
    </main>
  );
}