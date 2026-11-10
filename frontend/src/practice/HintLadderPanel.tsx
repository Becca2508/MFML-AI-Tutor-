import { useState } from 'react';
import { nextHintLevel } from './hintLadder';

type Props = {
  hints: string[];
  onAssistance: () => void;
  allowed?: boolean;
  attempts?: number;
};

export function HintLadderPanel({
  hints,
  onAssistance,
  allowed = false,
  attempts,
}: Props) {
  const [level, setLevel] = useState(0);
  if (!hints.length) return null;

  const waitingForAttempt = attempts !== undefined && attempts <= level;
  const allShown = level === hints.length;

  return (
    <aside className="hint-panel" aria-label="Step hints">
      <button
        type="button"
        disabled={!allowed || waitingForAttempt || allShown}
        onClick={() => {
          setLevel(nextHintLevel(level, hints.length));
          onAssistance();
        }}
      >
        {level ? 'Give me another hint' : 'Give me a hint'}
      </button>
      {!allowed && <p className="subtle">Submit an answer first to unlock a small hint.</p>}
      {allowed && waitingForAttempt && !allShown && (
        <p className="subtle">Try a different answer using this hint before requesting another.</p>
      )}
      <p className="subtle">{level}/{hints.length} hints shown</p>
      <ol aria-live="polite">
        {hints.slice(0, level).map(hint => <li key={hint}>{hint}</li>)}
      </ol>
    </aside>
  );
}
