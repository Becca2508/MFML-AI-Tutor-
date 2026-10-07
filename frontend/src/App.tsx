import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

type currentStudyMode = "Notes" | "Guided Walkthrough" | "Practice"

export default function App() {
  //Choose one of the modes listed only, defaults to the notes section
  const [currentMode, setMode] = useState<currentStudyMode>("Notes");

  return (
    <main className = "app">
      <header>
        <h1> MFML AI Tutor</h1>
        <p> Gain a better understanding of (MFML) Topics through notes, guided examples and practice problems!</p>
      </header>

      <nav aria-label="Study Sections">
        <button 
          aria-pressed={currentMode === "Notes"}
          onClick={() => setMode("Notes")}>
            Study Notes
        </button>

        <button
          aria-pressed={currentMode === "Guided Walkthrough"}
          onClick={() => setMode("Guided Walkthrough")}>
            Guided Walkthrough
          </button>

        <button 
          aria-pressed={currentMode === "Practice"}
          onClick={() => setMode("Practice")}>
            Practice Problems
        </button>
      </nav>

      {currentMode === "Notes" && <section> study Notes will be added soon.</section>}
      {currentMode === "Guided Walkthrough" && <section>SVD walkthroughs will be added soon.</section>}
      {currentMode === "Practice" && <section>Practice Problems to be added.</section>}

    </main>
  );
}
