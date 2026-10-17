import type {
  McqQuestion,
  NumericQuestion,
} from "./types";

export function gradeMcq(
  question: McqQuestion,
  selectedIndex: number
): boolean {
  return selectedIndex === question.answerIndex;
}

export function parseNumericAnswer(input: string): number {
  const parts = input.trim().split("/");

  const numberPattern =
    /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;

  if (
    parts.length > 2 ||
    !parts.every(part => numberPattern.test(part.trim()))
  ) {
    return NaN;
  }

  const numerator = Number(parts[0]);

  if (parts.length === 1) {
    return numerator;
  }

  const denominator = Number(parts[1]);

  return denominator === 0
    ? NaN
    : numerator / denominator;
}

export function gradeNumeric(
  question: NumericQuestion,
  value: number
): boolean {
  const tolerance = question.tolerance ?? 0.001;

  return (
    Number.isFinite(value) &&
    Math.abs(value - question.answer) <= tolerance
  );
}