import type { Stage } from './types';

const stages: { id: Stage; label: string }[] = [
  { id: 'warmup', label: 'Warm-up' },
  { id: 'practice', label: 'Practice' },
  { id: 'challenge', label: 'Challenge' },
];

export function StageStepper({ stage, onSelect }: { stage: Stage; onSelect: (stage: Stage) => void }) {
  return <nav className="practice-stage-buttons" aria-label="Practice stages">
    {stages.map(item => <button key={item.id} aria-pressed={stage === item.id} onClick={() => onSelect(item.id)}>{item.label}</button>)}
  </nav>;
}