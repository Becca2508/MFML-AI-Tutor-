import { useState } from 'react'
import Home from "./Home";
import {NotesPanel} from "./components/notesSection.tsx"
import {svdNotes} from "./data/mfmlNotes.ts"
import type { StudyMode } from "./types/study";
import "./App.css";
import { GuidePanel } from "./guide/GuidePanel";
import { svdGuide } from "./data/svdGuide";

import type { GuideProgress } from "./types/guide";
import {
  emptyGuideProgress,
  loadGuideProgress,
  saveGuideProgress,
} from "./utils/guideProgress";

import { PracticePanel } from "./practice/practicePanel";
import { svdPractice } from "./data/mfmlPracticeSet";
import type { PracticeProgress } from "./practice/types";

import {
  emptyPracticeProgress,
  loadPracticeProgress,
  savePracticeProgress,
} from "./utils/practiceProgress";

type CurrentStudyMode = "Notes" | "Guided Walkthrough" | "Practice";

export default function App() {
  const [screen, setScreen] = useState<"home" | "study">("home");

  const [currentMode, setMode] =
    useState<CurrentStudyMode>("Notes");

  const [practiceProgress, setPracticeProgress] =
    useState(() => loadPracticeProgress(svdPractice.topicId));

  const [guideProgress, setGuideProgress] =
    useState(() => loadGuideProgress(svdGuide.topicId));

  const [storageFailed, setStorageFailed] = useState(false);

  const [showResetConfirmation, setShowResetConfirmation] =
    useState(false);

  const [resetMessage, setResetMessage] = useState("");

  const [resetVersion, setResetVersion] = useState(0);

  function openStudy(mode: StudyMode) {
    const matchingMode: Record<StudyMode, CurrentStudyMode> = {
      notes: "Notes",
      guide: "Guided Walkthrough",
      practice: "Practice",
    };

    setMode(matchingMode[mode]);
    setScreen("study");
  }

  function returnHome() {
    setScreen("home");
      
    setShowResetConfirmation(false);
    setResetMessage("");

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }

  function updatePracticeProgress(next: PracticeProgress) {
    // Update the interface.
    setPracticeProgress(next);

    // Save results for the next visit.
    const saved = savePracticeProgress(
      svdPractice.topicId,
      next
    );

    if (!saved) {
      setStorageFailed(true);
    }

    setResetMessage("");
  }

  function updateGuideProgress(next: GuideProgress) {
    setGuideProgress(next);

    const saved = saveGuideProgress(
      svdGuide.topicId,
      next
    );

    if (!saved) {
      setStorageFailed(true);
    }

    setResetMessage("");
  }

    function resetSvdProgress() {
    const freshGuide = emptyGuideProgress();
    const freshPractice = emptyPracticeProgress();

    const guideSaved = saveGuideProgress(
      svdGuide.topicId,
      freshGuide
    );

    const practiceSaved = savePracticeProgress(
      svdPractice.topicId,
      freshPractice
    );

    setGuideProgress(freshGuide);
    setPracticeProgress(freshPractice);

    const saved = guideSaved && practiceSaved;
    setStorageFailed(!saved);

    setResetVersion(previous => previous + 1);
    setShowResetConfirmation(false);

    setResetMessage(
      saved
        ? "SVD progress reset. You can begin again."
        : "Progress reset for this session, but the browser could not save the reset."
    );

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }

  // Show the homepage first.
  if (screen === "home") {
    return <Home onOpen={openStudy} />;
  }

  return (
    <main className="app">
    <div className="study-toolbar">
      <button
        className="back-home-button"
        type="button"
        onClick={returnHome}
      >
        ← Back to home
      </button>

      <span className="demo-label">
        Guided learning demo</span>
    </div>

    <header className="study-heading">
      <h1>MFML AI Tutor</h1>
      <p>
        Explore MFML topics through study notes, guided
        examples, and practice problems.
      </p>
    </header>


      <div className="study-selector">
        <label htmlFor="study-mode">Choose a study section</label>

        <select
          id="study-mode"
          value={currentMode}
          onChange={event =>
            setMode(event.target.value as CurrentStudyMode)
          }
        >
          <option value="Notes">Study Notes</option>
          <option value="Guided Walkthrough">
            Guided Walkthrough
          </option>
          <option value="Practice">Practice Problems</option>
        </select>
    </div>

      {currentMode !== "Notes" && (
        <p className="progress-status" role="status">
          {storageFailed
            ? "Browser storage is unavailable. Current progress is kept for this session."
            : "Progress is saved in this browser."}
        </p>
      )}

      {currentMode === "Notes" && (
        <NotesPanel notes={svdNotes} 
        onGuide={() => setMode("Guided Walkthrough")} />
  
      )}

      {currentMode === "Guided Walkthrough" && (
        <GuidePanel 
        key={`guide-${resetVersion}`}
        script={svdGuide}
        progress={guideProgress}
        onProgress={updateGuideProgress}
        onPractice={() => setMode("Practice")}
        onNotes={() => setMode("Notes")}
        />
      )}

    {currentMode === "Practice" && (
        <PracticePanel
          key={`practice-${resetVersion}`}
          practiceSet={svdPractice}
          progress={practiceProgress}
          onProgress={updatePracticeProgress}
          onGuide={() => setMode("Guided Walkthrough")}
        />
    )}
    {currentMode !== "Notes" && (
        <div className="reset-section">
        <button
          type="button"
          className="reset-button"
          aria-expanded={showResetConfirmation}
          onClick={() => {
            setShowResetConfirmation(previous => !previous);
            setResetMessage("");
          }}
        >
          Reset SVD progress
        </button>

        {showResetConfirmation && (
          <div className="reset-confirmation">
            <p>
              Start SVD again? This clears your saved
              walkthrough completion and practice progress.
            </p>

            <div className="reset-actions">
              <button
                type="button"
                onClick={() =>
                  setShowResetConfirmation(false)
                }
              >
                Keep my progress
              </button>

              <button
                type="button"
                className="reset-confirm-button"
                onClick={resetSvdProgress}
              >
                Reset progress
              </button>
            </div>
          </div>
        )}
        </div>
    )}

        <p className="reset-status" role="status">
          {resetMessage}
        </p>

      </main>
  );
}
