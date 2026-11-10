import { useState } from 'react';
import type { ReactNode } from 'react';

type Props = {
  allowed: boolean;
  children: ReactNode;
  label?: string;
  lockedMessage?: string;
  onReveal?: () => void;
};

export function AnswerReveal({
  allowed, children, label = 'worked solution',
  lockedMessage = 'Try another answer or attempting the question again, before you can review the explanation.',
  onReveal,
}: Props) {
  const [confirming, setConfirming] = useState(false);
  const [revealed, setRevealed] = useState(false);
  return <div className="answer-reveal">
    <button type="button" disabled={!allowed} aria-expanded={revealed || confirming} onClick={() => {
      if (revealed) setRevealed(false);
      else setConfirming(true);
    }}>{revealed ? 'Hide ' + label : 'Review ' + label}</button>
    {!allowed && <p className="subtle">{lockedMessage}</p>}
    {confirming && allowed && <div className="reveal-confirmation">
      <p>Ready to compare? You can keep trying before opening the {label}. </p>
      <div className="question-actions">
        <button type="button" onClick={() => { setRevealed(true); setConfirming(false); onReveal?.(); }}>Reveal {label}</button>
        <button type="button" onClick={() => setConfirming(false)}>Keep trying</button>
      </div>
    </div>}
    {revealed && allowed && <div className="revealed-content">{children}</div>}
  </div>;
}