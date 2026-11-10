export function nextHintLevel(current: number, count: number): number {
  return Math.min(Math.max(0, current) + 1, count);
}