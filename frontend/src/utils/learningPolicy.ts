export function recordDistinctAttempt(previous: number[], value: number): number[] {
  return !Number.isFinite(value) || previous.includes(value) ? previous : [...previous, value];
}
export function canUseHints(attempts: number): boolean {
  return attempts >= 1;
}
export function canRevealSolution(attempts: number, solved: boolean): boolean {
  return solved || attempts >= 2;
}
