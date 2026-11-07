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
  loadGuideProgress,
  saveGuideProgress,
} from "./utils/guideProgress";

import { PracticePanel } from "./practice/practicePanel";
import { svdPractice } from "./data/mfmlPracticeSet";
import type { PracticeProgress } from "./practice/types";

import {
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
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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


      <nav className="study-navigation" aria-label="Study Sections">
        <button
          aria-pressed={currentMode === "Notes"}
          onClick={() => setMode("Notes")}
        >
          Study Notes
        </button>

        <button
          aria-pressed={currentMode === "Guided Walkthrough"}
          onClick={() => setMode("Guided Walkthrough")}
        >
          Guided Walkthrough
        </button>

        <button
          aria-pressed={currentMode === "Practice"}
          onClick={() => setMode("Practice")}
        >
          Practice Problems
        </button>
      </nav>

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
        <GuidePanel script={svdGuide} 
        progress={guideProgress}
        onProgress={updateGuideProgress}
        onPractice={() => setMode("Practice")}
        onNotes={() => setMode("Notes")}
        />
      )}

    {currentMode === "Practice" && (
        <PracticePanel
          practiceSet={svdPractice}
          progress={practiceProgress}
          onProgress={updatePracticeProgress}
          onGuide={() => setMode("Guided Walkthrough")}
        />
    )}
    </main>
  );
}
