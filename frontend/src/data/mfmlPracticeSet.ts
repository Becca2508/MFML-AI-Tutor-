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

    },
    {
      id: 'practice-normalization', 
      kind: 'numeric', 
      prompt: 'What is the length of the vector (3/5 4/5)?',
      answer: 1, 
      explanation: '√((3/5)² + (4/5)²) = √1 = 1, so the vector is already normalized',
    },

  ],

  challenge: [
    {
      id: 'challenge-values', 
      prompt: 'For A = [1 2; 2 4], find the largest singular value.',
      solution: '5',
      explanation: "AᵀA = [5 10; 10 20] has eigenvalues 25 and 0. The singular values are √25 = 5 and √0 = 0, " + "so the largest singular value is 5.",
      rubric: "Calculate AᵀA correctly, find its largest eigenvalue and take its nonnegative square root.",
    },
    {
        id: 'svd-full-challenge',
        prompt: "Find an SVD of A = [2 1; 1 2]. Calculate AᵀA, find its eigenvalues and normalized eigenvectors. Construct V, Σ, and U, then verify A = UΣVᵀ.",

    solution: 
        "1. Calculate AᵀA:\n" +
        "AᵀA = [5 4; 4 5].\n\n" +

        "2. Find the eigenvalues:\n" +
        "det(AᵀA − λI) = (5 − λ)² − 16 = 0.\n" +
        "Therefore λ₁ = 9 and λ₂ = 1.\n" +
        "The singular values are σ₁ = 3 and σ₂ = 1.\n\n" +

        "3. Find and normalize the eigenvectors:\n" +
        "Write one unknown eigenvector column vectors be v = (x, y)ᵀ.\n" +
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
    "- Verifies orthogonality and reconstruction.\n" 
    }
  ],
};
