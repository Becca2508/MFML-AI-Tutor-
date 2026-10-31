import { useState } from 'react'
import Home from "./Home";
import {NotesPanel} from "./components/notesSection.tsx"
import {svdNotes} from "./data/mfmlNotes.ts"
import type { StudyMode } from "./types/study";
import "./App.css";
import { GuidePanel } from "./guide/GuidePanel";
import { svdGuide } from "./data/svdGuide";

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

  function updatePracticeProgress(next: PracticeProgress) {
    // Update the interface.
    setPracticeProgress(next);

    // Save results for the next visit.
    const saved = savePracticeProgress(
      svdPractice.topicId,
      next
    );

    setStorageFailed(!saved);
  }

  // Show the homepage first.
  if (screen === "home") {
    return <Home onOpen={openStudy} />;
  }

  return (
    <main className="app">
      <button onClick={() => setScreen("home")}>
        ← Back to home
      </button>

      <header>
        <h1> MFML AI Tutor</h1>
        <p> Gain a better understanding of (MFML) Topics through notes, guided examples and practice problems!</p>
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

      {currentMode === "Notes" && (
        <NotesPanel notes={svdNotes} 
        onGuide={() => setMode("Guided Walkthrough")} />
  
      )}

      {currentMode === "Guided Walkthrough" && (
        <GuidePanel script={svdGuide} 
        onPractice={() => setMode("Practice")}
        />
      )}

    {currentMode === "Practice" && (
      <>
        <p className="progress-status">
          {storageFailed
            ? "Browser storage is unavailable. Progress will remain for this session only."
            : "Practice progress is saved in this browser."}
        </p>

        <PracticePanel
          practiceSet={svdPractice}
          progress={practiceProgress}
          onProgress={updatePracticeProgress}
          onGuide={() => setMode("Guided Walkthrough")}
        />
      </>
    )}
    </main>
  );
}
