export type Matrix = number[][];

export interface GuideStep {
  id: string;
  label: string;
  title: string;
  body: string;
  equation: string;
  matrix?: Matrix;
  matrixLabel?: string;
  insight: string;
}

export interface GuideScript {
  topicId: string;
  title: string;
  matrix: Matrix;
  steps: GuideStep[];
}
