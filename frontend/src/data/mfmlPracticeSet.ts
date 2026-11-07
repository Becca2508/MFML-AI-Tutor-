import type { PracticeSet } from "../practice/types";

export const svdPractice: PracticeSet = {
  topicId: "svd",
  title: "Singular Value Decomposition",
  
  warmup: [
    { 
        id: 'card-eigenvalues', 
        front: 'How do eigenvalues of AᵀA give singular values?', 
        back: 'Take the nonnegative square roots, then order from largest to smallest.' 
    },
    { 
        id: 'card-v', 
        front: 'Where do the columns of V come from?', 
        back: 'Orthonormal eigenvectors of AᵀA, paired with the corresponding singular values.' 
    },
    { 
        id: 'card-u', 
        front: 'How do you calculate uᵢ for σᵢ > 0?', 
        back: 'Use uᵢ = Avᵢ/σᵢ. Do not use this formula when σᵢ = 0.' 
    },
    { 
        id: 'card-check',
        front: 'How can you check if you computed the SVD correctly?',
        back: 'Verify orthogonality and multiply UΣVᵀ and make sure that it is equal to A.' 
    },
  ],

  practice: [ 
    {
      id: 'practice-factor', 
      kind: 'mcq', 
      prompt: 'Which factor contains the singular values?',
      choices: ['U', 'Σ', 'Vᵀ'], 
      answerIndex: 1,
      explanation: 'Σ has the nonnegative singular values on its diagonal.',
    },
    {
      id: 'practice-diagonal',
      kind: 'numeric',
      prompt: 'For A = [2 0; 0 1], what is the largest singular value?', 
      answer: 2,
      explanation: 'AᵀA = diag(4, 1), so the singular values are 2 and 1.',

      mistakes: [
      {
        value: 4,
        feedback:
          "4 is the largest eigenvalue of AᵀA. Take its nonnegative square root."
      },
      {
        value: 1,
        feedback:
          "1 is the smaller singular value. The question asks for the largest."
      },
      {
        value: -2,
        feedback:
          "Singular values must be nonnegative."
      }
    ]

    },
    {
      id: 'practice-normalization', 
      kind: 'numeric', 
      prompt: 'What is the length of the vector (3/5 4/5)?',
      answer: 1, 
      explanation: '√((3/5)² + (4/5)²) = √1 = 1, so the vector is already normalized',

      mistakes: [
      {
        value: 1.4,
        feedback:
          "You added the components. For length, square each component, add, then take the square root."
      },
      {
        value: 0.2,
        feedback:
          "The difference between the components is not the length. Use √(x² + y²)."
      }
    ]
    },

  ],

  challenge: [
    {
      id: 'challenge-values', 
      checkpoints: [
  {
    "id": "rank-gram",
    "title": "Compute AᵀA",
    "instructions": "Calculate all four entries on paper, then check one entry.",
    "question": {
      "kind": "numeric",
      "id": "rank-gram-check",
      "prompt": "What is the top-right entry of AᵀA?",
      "answer": 10,
      "tolerance": 0,
      "explanation": "The two columns have dot product 1×2 + 2×4 = 10."
    },
    "hints": [
      "Use the dot product of the first and second columns of A.",
      "Multiply corresponding column entries, then add the products."
    ]
  },
  {
    "id": "rank-eigenvalue",
    "title": "Find the largest eigenvalue",
    "instructions": "Form the characteristic polynomial of your Gram matrix.",
    "question": {
      "kind": "numeric",
      "id": "rank-eigenvalue-check",
      "prompt": "What is the largest eigenvalue of AᵀA?",
      "answer": 25,
      "tolerance": 0,
      "explanation": "The characteristic polynomial is λ(λ − 25), so its roots are 0 and 25."
    },
    "hints": [
      "The columns of A are dependent. What does this tell you about a zero eigenvalue?",
      "The eigenvalues sum to the trace. Calculate the sum of the diagonal entries."
    ]
  },
  {
    "id": "rank-value",
    "title": "Convert to a singular value",
    "instructions": "Use the relationship between the eigenvalues and singular values.",
    "question": {
      "kind": "numeric",
      "id": "rank-value-check",
      "prompt": "What is the largest singular value of A?",
      "answer": 5,
      "tolerance": 0,
      "explanation": "The nonnegative square root of the largest eigenvalue is √25 = 5."
    },
    "hints": [
      "A singular value squared equals its corresponding Gram eigenvalue.",
      "Choose the nonnegative root."
    ]
  }
], 
      prompt: 'For A = [1 2; 2 4], find the largest singular value.',
      solution: '5',
      explanation: "AᵀA = [5 10; 10 20] has eigenvalues 25 and 0. The singular values are √25 = 5 and √0 = 0, " + "so the largest singular value is 5.",
      rubric: "Calculate AᵀA correctly, find its largest eigenvalue and take its nonnegative square root.",
    },
    {
        id: 'svd-full-challenge',
      checkpoints: [
  {
    "id": "full-gram",
    "title": "Compute AᵀA",
    "instructions": "Write the full product on paper and check the off-diagonal entry.",
    "question": {
      "kind": "numeric",
      "id": "full-gram-check",
      "prompt": "What is the top-right entry of AᵀA?",
      "answer": 4,
      "tolerance": 0,
      "explanation": "The column dot product is 2×1 + 1×2 = 4."
    },
    "hints": [
      "Pair the first column with the second column.",
      "Add the products of matching entries."
    ]
  },
  {
    "id": "full-eigenvalue",
    "title": "Solve the characteristic equation",
    "instructions": "Find both eigenvalues and write them in descending order.",
    "question": {
      "kind": "numeric",
      "id": "full-eigenvalue-check",
      "prompt": "What is the larger eigenvalue of AᵀA?",
      "answer": 9,
      "tolerance": 0,
      "explanation": "The equation (5 − λ)² − 16 = 0 has roots 9 and 1."
    },
    "hints": [
      "Subtract λ from both diagonal entries before finding the determinant.",
      "For a matrix [a b; b a], the determinant of the shifted matrix is (a − λ)² − b²."
    ]
  },
  {
    "id": "full-value",
    "title": "Construct Σ",
    "instructions": "Take square roots of both eigenvalues and place them on the diagonal.",
    "question": {
      "kind": "numeric",
      "id": "full-value-check",
      "prompt": "What is the first diagonal entry of Σ?",
      "answer": 3,
      "tolerance": 0,
      "explanation": "The larger singular value is √9 = 3. The second is 1."
    },
    "hints": [
      "Use descending order.",
      "Take the nonnegative square root of the larger eigenvalue."
    ]
  },
  {
    "id": "full-v",
    "title": "Find and normalize the columns of V",
    "instructions": "Solve for both eigenvectors. Choose v₁ with positive first component and v₂ with negative first component, then normalize each.",
    "question": {
      "kind": "numeric",
      "id": "full-v-check",
      "prompt": "What is the first component of v₁, rounded to three decimals?",
      "answer": 0.7071067811865476,
      "tolerance": 0.0005,
      "explanation": "For λ = 9, y = x. Normalizing (1, 1) gives first component 1/√2 ≈ 0.707."
    },
    "hints": [
      "Substitute your larger eigenvalue in (AᵀA − λI)v = 0 and find the relation between x and y.",
      "Divide each component of your nonzero vector by its Euclidean length."
    ]
  },
  {
    "id": "full-u",
    "title": "Construct U",
    "instructions": "Calculate both columns using uᵢ = Avᵢ/σᵢ. Keep the signs paired with your chosen V.",
    "question": {
      "kind": "numeric",
      "id": "full-u-check",
      "prompt": "Using v₂ = (−1, 1)/√2, what is the first component of u₂ to three decimals?",
      "answer": -0.7071067811865476,
      "tolerance": 0.0005,
      "explanation": "Av₂ = (−1, 1)/√2 and σ₂ = 1, so the first component of u₂ is approximately −0.707."
    },
    "hints": [
      "Multiply the first row of A by the chosen v₂.",
      "Divide that component by the second singular value and keep its sign."
    ]
  },
  {
    "id": "full-verify",
    "title": "Verify your decomposition",
    "instructions": "Check UᵀU = I and VᵀV = I. Multiply your factors in the order UΣVᵀ.",
    "question": {
      "kind": "numeric",
      "id": "full-verify-check",
      "prompt": "What is the top-right entry of your reconstructed UΣVᵀ?",
      "answer": 1,
      "tolerance": 0.001,
      "explanation": "The product reconstructs [2 1; 1 2], including top-right entry 1."
    },
    "hints": [
      "Transpose V before multiplying.",
      "Use the first row of UΣ and the second column of Vᵀ, including the normalization factors."
    ]
  }
],
        prompt: "Find an SVD of A = [2 1; 1 2]. Calculate AᵀA, find its eigenvalues and normalized eigenvectors. Construct V, Σ, and U, then verify A = UΣVᵀ.",

    solution: 
        "1. Calculate AᵀA:\n" +
        "AᵀA = [5 4; 4 5].\n\n" +

        "2. Find the eigenvalues:\n" +
        "det(AᵀA − λI) = (5 − λ)² − 16 = 0.\n" +
        "Therefore λ₁ = 9 and λ₂ = 1.\n" +
        "The singular values are σ₁ = 3 and σ₂ = 1.\n\n" +

        "3. Find and normalize the eigenvectors:\n" +
        "Write an unknown eigenvector as the column vector v = (x, y)ᵀ.\n" +
        "For λ₁ = 9, −4x + 4y= 0, so y = x.\n" +
        "Choose (1, 1) and divide by its length √2:\n" +
        "v₁ = (1, 1)/√2.\n\n" +

        "For λ₂ = 1, 4x + 4y = 0, so y = −x.\n" +
        "Choose (−1, 1) and divide by its length √2:\n" +
        "v₂ = (−1, 1)/√2.\n\n" +

        "4. Construct V and Σ:\n" +
        "V = (1/√2)[1 −1; 1 1].\n" +
        "Σ = [3 0; 0 1].\n\n" +

        "5. Calculate the columns of U:\n" +
        "Av₁ = (3, 3)/√2, so u₁ = Av₁/3 = (1, 1)/√2.\n" +
        "Av₂ = (−1, 1)/√2, so u₂ = Av₂/1 = (−1, 1)/√2.\n" +
        "Therefore U = (1/√2)[1 −1; 1 1].\n\n" +

        "6. Verify the decomposition:\n" +
        "UᵀU = I and VᵀV = I.\n" +
        "UΣVᵀ = (1/2)[3 −1; 3 1][1 1; −1 1]\n" +
        "       = [2 1; 1 2] = A.",
    rubric:  "Check that your solution:\n" +
    "- Calculates AᵀA correctly.\n" +
    "- Finds eigenvalues 9 and 1.\n" +
    "- Obtains singular values 3 and 1.\n" +
    "- Derives and normalizes the eigenvectors.\n" +
    "- Calculates U using uᵢ = Avᵢ/σᵢ.\n" +
    "- Verifies orthogonality and reconstruction.\n" + "- Accept consistent paired sign changes in the columns of U and V." 
    }
  ],
};
