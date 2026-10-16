export type StudyMode = 'notes' | 'guide' | 'practice';

export const studyModes: { id: StudyMode; label: string; description: string }[] = [
  { id: 'notes', label: 'Study notes', description: 'Definitions, formulas, and the ideas to keep.' },
  { id: 'guide', label: 'Guided walkthrough', description: 'Build a decomposition one step at a time.' },
  { id: 'practice', label: 'Practice', description: 'Recall the method and try it independently.' },
];
