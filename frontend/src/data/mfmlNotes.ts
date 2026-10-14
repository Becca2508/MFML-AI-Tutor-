import type {sectionNotes} from "../types/notesTemplate.ts";

export const svdNotes: sectionNotes = {
    topic: 'Singular Value Decomposition (SVD)',
    objective: 'Given a matrix A, to understand how to decompose it into the three matrices U, V and \u03a3',
    vocabulary: [
        {
            term: 'Singular Value',
            definition: 'Square root of a non-negative eigenvalue of the matrix A^TA',
            example: 'Given the two eigenvalues a = 16 and b = 4, the corresponding singular values will be 4 and 2'
        }, 
        {
            term: 'Tranpose of a Matrix (A^T)',
            definition: 'The matrix obtained by making the columns of the matrix A, the rows of the Matrix A^T and vice versa',
            example: 'Given the matrix A = [1  3]    \n[2  4]\n\n, A^T = [1  2] \n [3  4]'
        },
        {
            term: 'Orthonormal Vectors',
            definition: 'Two vectors x and y are orthonormal vectors, is they are orthogonal (dot product between x and y is 0) and both are unit vectors (length is 1)',
            example: '(1, 1)/√2 and (−1, 1)/√2 both have length 1 and their dot product is 0.',
        },
        {
            term: 'Orthogonal Matrix',
            definition: 'A matrix whose columns are made up of orthonormal vectors',
            example: 'I = [1  0]\n    [0  1]'
        },
        {
        term: 'Right singular vectors',
        definition: 'Orthonormal eigenvectors of AᵀA, arranged as the columns of V.',
        example: 'The product uses Vᵀ, the transpose of V.',
        },
        {
        term: 'Left singular vectors',
        definition: 'For positive σᵢ, compute uᵢ = Avᵢ/σᵢ. These vectors form columns of U.',
        example: 'For zero singular values, use orthonormal completion rather than division by zero.',
        },
        {
        term: 'Rank',
        definition: 'The number of independent columns, equal to the number of positive singular values.',
        example: 'A = [1  2]\n    [2  4]\n\nThe second column is twice the first. Rank(A) = 1.',
        }
    ],
    formulas: [
        { expression: 'A = UΣVᵀ', explanation: 'Read right to left: change coordinates, scale, then map into the output space.' },
        { expression: 'σᵢ = √λᵢ', explanation: 'Here λᵢ is an eigenvalue of AᵀA. Order singular values from largest to smallest.' },
        { expression: 'uᵢ = Avᵢ/σᵢ  (σᵢ > 0)', explanation: 'Each right singular vector maps to its corresponding scaled left singular vector.' },
        { expression: 'UᵀU = I and VᵀV = I', explanation: 'Make sure that both the vectors making up matrix U and V are orthonormal' },
    ],
    commonPitfalls: [
        'Putting eigenvalues in Σ instead of their square roots.',
        'Forgetting to normalize the singular vectors.',
        'Reordering singular values without their matching columns.',
        'Dividing by a zero singular value.',
        'Using V rather than Vᵀ during reconstruction.',
    ]

};