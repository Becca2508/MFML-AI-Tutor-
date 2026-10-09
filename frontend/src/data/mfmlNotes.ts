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
            example: 'Given the matrix A = [1 3 \\ 2 4],  A^T = [1 2 \\ 3 4]'
        },
        {
            term: 'Orthonormal Vectors',
            definition: 'Two vectors x and y are orthonormal vectors, is they are orthogonal (dot product between x and y is 0) and both are unit vectors (length is 1)'
        },
        {
            term: 'Orthogonal Matrix',
            definition: 'A matrix whose columns are made up of orthonormal vectors',
            example: '[1 0 \\ 0 1]'
        }
    ]

};