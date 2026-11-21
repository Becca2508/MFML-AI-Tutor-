import { useState } from 'react';
import { nextHintLevel } from './hintLadder';

type Props = {
  hints: string[];
  onAssistance: () => void;
  allowed?: boolean;
  attempts?: number;
  onHintLevelChange?: (level: number) => void;
};

export function HintLadderPanel({
  hints,
  onAssistance,
  allowed = false,
  attempts,
  onHintLevelChange,
}: Props) {
  const [level, setLevel] = useState(0);
  const [attemptsAtLastHint, setAttemptsAtLastHint] =
    useState(0);

  if (!hints.length) return null;
  
  const waitingForAttempt = attempts !== undefined && attempts <= attemptsAtLastHint;
  const allShown = level >= hints.length;

  return (
    <aside className="hint-panel" aria-label="Step hints">
      <button
        type="button"
        disabled={!allowed || waitingForAttempt || allShown}
        onClick={() => {
            const nextLevel = nextHintLevel(
            level,
            hints.length
          );

            setLevel(nextLevel);
            setAttemptsAtLastHint(attempts ?? 0);
            onAssistance();
            onHintLevelChange?.(nextLevel);
        }}
      >
        {allShown
          ? "All hints shown"
          : level > 0
            ? "Show the next hint"
            : "Show a hint"}
      </button>
      {!allowed && <p className="subtle">Submit an answer first to unlock a small hint.</p>}
      {allowed && waitingForAttempt && !allShown && (
        <p className="subtle">Try a different answer using this hint before requesting another.</p>
      )}
      <ol aria-live="polite">
        {hints.slice(0, level).map(hint => <li key={hint}>{hint}</li>)}
      </ol>
    </aside>
  );
}
