import { useState } from 'react'
import Home from "./Home";
import {NotesPanel} from "./components/notesSection.tsx"
import {svdNotes} from "./data/mfmlNotes.ts"
import type { StudyMode } from "./types/study";
import "./App.css";

type CurrentStudyMode = "Notes" | "Guided Walkthrough" | "Practice"

export default function App() {
  const [screen, setScreen] = useState<"home" | "study">("home");

  const [currentMode, setMode] =
    useState<CurrentStudyMode>("Notes");

  function openStudy(mode: StudyMode) {
    const matchingMode: Record<StudyMode, CurrentStudyMode> = {
      notes: "Notes",
      guide: "Guided Walkthrough",
      practice: "Practice",
    };

    setMode(matchingMode[mode]);
    setScreen("study");
  }

  // Show the homepage first.
  if (screen === "home") {
    return <Home onOpen={openStudy} completed={0} />;
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

      <nav aria-label="Study Sections">
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
        <section>SVD walkthroughs will be added soon.</section>
      )}

      {currentMode === "Practice" && (
        <section>Practice problems to be added.</section>
      )}
    </main>
  );
}
