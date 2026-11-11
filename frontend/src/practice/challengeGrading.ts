import type { ChallengeAnswer } from "./types";

type Matrix = number[][];

function transpose(matrix: Matrix): Matrix {
  return [
    [matrix[0][0], matrix[1][0]],
    [matrix[0][1], matrix[1][1]],
  ];
}

function multiply(a: Matrix, b: Matrix): Matrix {
  return a.map(row =>
    [0, 1].map(column =>
      row[0] * b[0][column] + row[1] * b[1][column]
    )
  );
}

function isMatrix2(matrix: Matrix): boolean {
  return (
    matrix.length === 2 &&
    matrix.every(
      row => row.length === 2 && row.every(Number.isFinite)
    )
  );
}

function closeMatrices(
  actual: Matrix,
  expected: Matrix,
  tolerance: number
): boolean {
  return actual.every((row, i) =>
    row.every(
      (value, j) =>
        Math.abs(value - expected[i][j]) <= tolerance
    )
  );
}

function gradeSvd2(
  values: number[],
  target: Matrix,
  tolerance: number
): boolean {
  const u = [
    values.slice(0, 2),
    values.slice(2, 4),
  ];

  const sigma = [
    values.slice(4, 6),
    values.slice(6, 8),
  ];

  const v = [
    values.slice(8, 10),
    values.slice(10, 12),
  ];

  if (![u, sigma, v, target].every(isMatrix2)) {
    return false;
  }

  const identity = [
    [1, 0],
    [0, 1],
  ];

  const orthogonal =
    closeMatrices(
      multiply(transpose(u), u),
      identity,
      tolerance
    ) &&
    closeMatrices(
      multiply(transpose(v), v),
      identity,
      tolerance
    );

  const validSigma =
    Math.abs(sigma[0][1]) <= tolerance &&
    Math.abs(sigma[1][0]) <= tolerance &&
    sigma[0][0] >= 0 &&
    sigma[1][1] >= 0 &&
    sigma[0][0] >= sigma[1][1];

  const reconstructed = multiply(
    multiply(u, sigma),
    transpose(v)
  );

  const scale = Math.max(
    1,
    ...target.flat().map(value => Math.abs(value))
  );

  return (
    orthogonal &&
    validSigma &&
    closeMatrices(
      reconstructed,
      target,
      tolerance * scale
    )
  );
}

export function gradeChallengeAnswer(
  expected: ChallengeAnswer,
  values: number[]
): boolean {
  if (!values.every(Number.isFinite)) {
    return false;
  }

  if (expected.kind === "numeric") {
    return (
      values.length === 1 &&
      Math.abs(values[0] - expected.answer) <=
        (expected.tolerance ?? 0.001)
    );
  }

  return (
    values.length === 12 &&
    gradeSvd2(
      values,
      expected.matrix,
      expected.tolerance ?? 0.005
    )
  );
}