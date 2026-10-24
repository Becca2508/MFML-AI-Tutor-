import { useState } from "react";
import type { Flashcard as FlashcardData } from "./types";

type Props = {
  card: FlashcardData;
};

export function Flashcard({ card }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <article className="practice-card">
      <h3>{card.front}</h3>

      <button
        aria-expanded={revealed}
        onClick={() => setRevealed(!revealed)}
      >
        {revealed ? "Hide answer" : "Show answer"}
      </button>

      {revealed && (
        <p className="practice-feedback">{card.back}</p>
      )}
    </article>
  );
}