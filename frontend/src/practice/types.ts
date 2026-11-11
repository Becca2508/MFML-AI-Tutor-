export type Tier =
  | "not_started"
  | "familiar"
  | "proficient"
  | "mastered";

export type Stage = "warmup" | "practice" | "challenge";

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface McqQuestion {
  kind: "mcq";
  id: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

export interface NumericQuestion {
  kind: "numeric";
  id: string;
  prompt: string;
  answer: number;
  explanation: string;
  tolerance?: number;

  mistakes?: {
  value: number;
  feedback: string;
  }[];
}

/** Formats supported by the practice interface. */
export type PracticeQuestion =
  | McqQuestion
  | NumericQuestion;

  export type ChallengeAnswer =
  | {
      kind: "numeric";
      answer: number;
      tolerance?: number;
    }
  | {
      kind: "svd";
      matrix: number[][];
      tolerance?: number;
    };

export interface ChallengeCheckpoint {
  id: string;
  title: string;
  instructions: string;
  question: NumericQuestion;
  hints: string[];
}

/** Longer problem with a worked solution and review criteria. */
export interface ChallengeProblem {
  id: string;
  prompt: string;
  finalAnswer: ChallengeAnswer;
  hints: string[];
  checkpoints?: ChallengeCheckpoint[];
  solution: string;
  explanation?: string;
  rubric: string
}

export interface PracticeSet {
  topicId: string;
  title: string;
  warmup: Flashcard[];
  practice: PracticeQuestion[];
  challenge: ChallengeProblem[];
}

export interface PracticeProgress {
  stage: Stage;
  warmupDone: boolean;
  practiceAttempted: Record<string, boolean>;
  practiceCorrect: Record<string, boolean>;
  challengeAttempted: string[];
  challengeReviewed: string[];
}