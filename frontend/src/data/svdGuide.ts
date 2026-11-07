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
        "A is 2 × 2. For a full SVD, U, Σ, and Vᵀ are also 2 × 2.",
      
      hints: ['Count across one row.', 'The number of columns is the number of input coordinates.'],
      checkpoint: {
        id: 'check-dimensions', kind: 'numeric', prompt: 'How many columns does A have?',
        answer: 2, 
        tolerance: 0, 
        explanation: 'A has two columns and takes two-dimensional input vectors.',
      },

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
        "AᵀA is symmetric. Matching off-diagonal entries provide a useful arithmetic check.",
      
      hints: ['Use column 1 dotted with column 2.', 'Multiply corresponding entries: 3×1 + 1×3.', 'Check that you used different columns for an off-diagonal entry.'],
      checkpoint: {
        id: 'check-gram', kind: 'numeric', prompt: 'What is the top-right entry of AᵀA?',
        answer: 6, tolerance: 0, explanation: '3×1 + 1×3 = 6.',
        mistakes: [{ value: 10, feedback: '10 is a diagonal entry. Use the dot product of two different columns.' }],
      },
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
        "Singular values are nonnegative and are conventionally arranged from largest to smallest. Eigenvalues and singular values are not the same values.",
      
      hints: ['Solve (10−λ)² = 36.', 'Take both roots of the squared expression, then solve each equation for λ.', 'Take the nonnegative square root of the larger eigenvalue.'],
      checkpoint: {
        id: 'check-value', kind: 'numeric', prompt: 'What is the largest singular value?',
        answer: 4, explanation: 'The largest eigenvalue is 16, so σ₁ = √16 = 4.',
        mistakes: [
          { value: 16, feedback: 'That is the eigenvalue. Take its nonnegative square root.' },
          { value: 2, feedback: '2 is the smaller singular value. We asked for the largest.' },
          { value: -4, feedback: 'Singular values must be nonnegative.' },
        ],
      },
    },

    {
      id: "svd-vectors",
      label: "Build V",
      title: "Normalize the input directions",

      body:
        "'Write an unknown eigenvector as v = (x, y)ᵀ. For each eigenvalue, solve (AᵀA − λI)v = 0, choose a nonzero solution, and normalize it.",

      equation:
        'For λ₁ = 16:\n[-6  6; 6  -6][x; y] = [0; 0]\n−6x + 6y = 0 → y = x\nChoose (1, 1). Its length is √2.\nv₁ = (1, 1)/√2\n\nFor λ₂ = 4:\n[6  6; 6  6][x; y] = [0; 0]\n6x + 6y = 0 → y = −x\nChoose (−1, 1). Its length is √2.\nv₂ = (−1, 1)/√2\n\nV = [v₁ v₂] = (1/√2)[1 −1; 1 1]',

      matrix: [
        [c, -c],
        [c, c]
      ],
      matrixLabel: "V",

      insight:
        "The columns of V have unit length and dot product zero. Flipping the signs of both vᵢ and uᵢ gives another valid SVD.",
            hints: ['For λ₁ = 16, choose a vector with equal components.', 'Normalize (1, 1) by dividing by √2.', 'Check that the sum of the squared normalized components is one.'],
      checkpoint: {
        id: 'check-vector', kind: 'numeric', prompt: 'Using v₁ = (1, 1)/√2, enter its first component to three decimals.',
        answer: c, tolerance: .0005, explanation: '1/√2 ≈ 0.707. This makes the vector a unit vector.',
        mistakes: [{ value: 1, feedback: '1 is the unnormalized component. Divide by the length √2.' }],
      },

    },

    {
      id: "svd-output",
      label: "U and Σ",
      title: "Calculate the output directions",

      body:
        'For σᵢ > 0, calculate uᵢ = Avᵢ/σᵢ. Put the singular values on the diagonal of Σ in the same order as the vectors.',

      equation:
        'Av₁ = (1/√2)[3×1+1×1; 1×1+3×1]\n    = (4, 4)/√2\nu₁ = Av₁/4 = (1, 1)/√2\n\nAv₂ = (1/√2)[3×(−1)+1×1; 1×(−1)+3×1]\n    = (−2, 2)/√2\nu₂ = Av₂/2 = (−1, 1)/√2\n\nU = (1/√2)[1 −1; 1 1]\nΣ = [4 0; 0 2]',

      matrix: [
        [4, 0],
        [0, 2]
      ],
      matrixLabel: "Σ",

      insight:
        "Both singular values are positive, so rank(A) = 2. If a singular value is zero, do not divide by it; complete U with an orthonormal basis.",
      
      hints: ['The second column of U uses v₂ and σ₂.', 'Multiply A by (−1, 1)/√2, then divide by 2.', 'Check the sign of your row-vector product before normalizing.'],
      checkpoint: {
        id: 'check-output', kind: 'numeric', prompt: 'Using the chosen v₂, enter the first component of u₂ to three decimals.',
        answer: -c, tolerance: .0005, explanation: 'Av₂/2 = (−1, 1)/√2, so the first component is approximately −0.707.',
      },
    },

    {
      id: "svd-verify",
      label: "Verify",
      title: "Check orthogonality and reconstruct A",

      body:
        'Verify UᵀU = I and VᵀV = I, then multiply UΣVᵀ. Here U = V, so the same orthogonality calculation checks both.',

      equation:
        'Vᵀ = (1/√2)[1 1; −1 1]\nVᵀV = (1/2)[1 1; −1 1][1 −1; 1 1]\n     = (1/2)[2 0; 0 2] = I\nUᵀU = I as well.\n\nUΣ = (1/√2)[4 −2; 4 2]\nUΣVᵀ = (1/2)[4 −2; 4 2][1 1; −1 1]\n       = (1/2)[6 2; 2 6]\n       = [3 1; 1 3] = A',

      matrix: [
        [3, 1],
        [1, 3]
      ],
      matrixLabel: "UΣVᵀ",

      insight:
        "The rightmost factor must be Vᵀ. Use Vᵀ during reconstruction. Displayed decimals are rounded, so use full precision or exact expressions when checking the product.",
      
      hints: ['Use the top row of UΣ and first column of Vᵀ.', 'The numerator is 4×1 + (−2)×(−1).', 'Divide that result by 2.'],
      checkpoint: {
        id: 'check-verify', kind: 'numeric', prompt: 'What is the top-left entry of UΣVᵀ?',
        answer: 3, explanation: '(4 + 2)/2 = 3, matching the original matrix.',
      },
    }
  ]
};