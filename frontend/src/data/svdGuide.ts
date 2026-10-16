import type { GuideScript } from "../types/guide";

// 1/√2, used for normalized singular vectors.
const c = Math.SQRT1_2;

export const svdGuide: GuideScript = {
  topicId: "svd",
  title: "Build an SVD, one step at a time",

  matrix: [
    [3, 1],
    [1, 3]
  ],

  steps: [
    {
      id: "svd-dimensions",
      label: "The goal",
      title: "Meet the matrix",

      body:
        "We want to write A = UΣVᵀ. Read the transformations from right to left: change input coordinates, scale directions, then map into the output space.",

      equation: "A = UΣVᵀ",

      matrix: [
        [3, 1],
        [1, 3]
      ],
      matrixLabel: "A",

      insight:
        "A is 2 × 2. For a full SVD, U, Σ, and Vᵀ are also 2 × 2."
    },

    {
      id: "svd-matrix",
      label: "AᵀA",
      title: "Build the symmetric matrix",

      body:
        "Multiply Aᵀ by A. Each entry is a dot product between columns of A. This example is symmetric, so Aᵀ = A.",

      equation:
        "Top-left: 3×3 + 1×1 = 10\n" +
        "Top-right: 3×1 + 1×3 = 6\n" +
        "Bottom-left: 1×3 + 3×1 = 6\n" +
        "Bottom-right: 1×1 + 3×3 = 10",

      matrix: [
        [10, 6],
        [6, 10]
      ],
      matrixLabel: "AᵀA",

      insight:
        "AᵀA is symmetric. Matching off-diagonal entries provide a useful arithmetic check."
    },

    {
      id: "svd-values",
      label: "Singular values",
      title: "Find the eigenvalues and singular values",

      body:
        "Solve det(AᵀA − λI) = 0. Then take the nonnegative square roots of the eigenvalues to obtain the singular values.",

      equation:
        "(10 − λ)² − 36 = 0\n" +
        "λ₁ = 16, λ₂ = 4\n\n" +
        "σ₁ = √16 = 4\n" +
        "σ₂ = √4 = 2",

      insight:
        "Singular values are nonnegative and are conventionally arranged from largest to smallest."
    },

    {
      id: "svd-vectors",
      label: "Build V",
      title: "Normalize the input directions",

      body:
        "For λ₁ = 16, the eigenvector equation gives y = x. Normalize (1, 1) by its length √2. For λ₂ = 4, choose the orthogonal direction (−1, 1) and normalize it.",

      equation:
        "v₁ = (1, 1)/√2\n" +
        "v₂ = (−1, 1)/√2\n\n" +
        "V = [v₁  v₂]",

      matrix: [
        [c, -c],
        [c, c]
      ],
      matrixLabel: "V",

      insight:
        "The columns of V have unit length and dot product zero. Flipping the signs of both vᵢ and uᵢ gives another valid SVD."
    },

    {
      id: "svd-output",
      label: "U and Σ",
      title: "Recover the output directions",

      body:
        "For each positive singular value, calculate uᵢ = Avᵢ/σᵢ. Here Av₁ = 4v₁ and Av₂ = 2v₂, so U equals V for our chosen vectors. Place the singular values on the diagonal of Σ.",

      equation:
        "u₁ = Av₁/4 = (1, 1)/√2\n" +
        "u₂ = Av₂/2 = (−1, 1)/√2\n\n" +
        "U = (1/√2)[1  −1; 1  1]\n" +
        "Σ = diag(4, 2)",

      matrix: [
        [4, 0],
        [0, 2]
      ],
      matrixLabel: "Σ",

      insight:
        "Both singular values are positive, so rank(A) = 2. If a singular value is zero, do not divide by it; complete U with an orthonormal basis."
    },

    {
      id: "svd-verify",
      label: "Verify",
      title: "Multiply it back",

      body:
        "Check UᵀU = I and VᵀV = I, then multiply UΣVᵀ. The result should match the original matrix A.",

      equation:
        "U = V = (1/√2)[1  −1; 1  1]\n" +
        "Σ = [4  0; 0  2]\n\n" +
        "UΣVᵀ = [3  1; 1  3] = A",

      matrix: [
        [3, 1],
        [1, 3]
      ],
      matrixLabel: "UΣVᵀ",

      insight:
        "Use Vᵀ during reconstruction. Displayed decimals are rounded, so use full precision or exact expressions when checking the product."
    }
  ]
};