import sys
import numpy as np


class Matrix:
    def __init__(self):
        '''
        Initialization of a matrix for a zero matrix of a given shape and its inverse to the identity matrix
        '''
        self.matrix_dimension = int(input("Enter the dimension of a square matrix:\n"))
        self.original_matrix = np.zeros((self.matrix_dimension, self.matrix_dimension))
        self.inverse_matrix = np.eye(self.matrix_dimension)

    def set_matrix(self):
        '''
        Setting the matrix from the keyboard
        '''
        print("\nEnter matrix data: \nFor a 2x2 matrix, the input format will be as follows:\n1 2\n4 3\n")
        for i in range(self.matrix_dimension):
            self.original_matrix[i] = [int(j) for j in input().split()]

    def transform_to_row_echelon_form(self):
        '''
        Convert to a stepped matrix
		'''
        for i in range(self.matrix_dimension):
            pivot = self.original_matrix[i][i]
            if pivot == 0:
                print("The given inversion does not exist.")
                sys.exit()
            else:
                transformation_matrix = np.eye(self.matrix_dimension)
                transformation_matrix[i][i] = self.inverse_matrix[i][i] / pivot
                self.original_matrix = np.matmul(transformation_matrix, self.original_matrix)
                self.inverse_matrix = np.matmul(transformation_matrix, self.inverse_matrix)

            for j in range(i + 1, self.matrix_dimension):
                transformation_matrix = np.eye(self.matrix_dimension)
                transformation_matrix[j][i] = - self.original_matrix[j][i]
                self.inverse_matrix = np.matmul(transformation_matrix, self.inverse_matrix)
                self.original_matrix = np.matmul(transformation_matrix, self.original_matrix)

    def transform_to_reduced_row_echelon_form(self):
        '''
        Converting to a reduced stepped matrix view
        '''
        for i in range(1, self.matrix_dimension):
            for j in range(self.matrix_dimension - i):
                transformation_matrix = np.eye(self.matrix_dimension)
                transformation_matrix[j][-i] = - self.original_matrix[j][-i]
                self.inverse_matrix = np.matmul(transformation_matrix, self.inverse_matrix)
                self.original_matrix = np.matmul(transformation_matrix, self.original_matrix)

    def inverse(self):
        self.transform_to_row_echelon_form()
        self.transform_to_reduced_row_echelon_form()


def main():
    matrix = Matrix()
    matrix.set_matrix()
    matrix.transform_to_row_echelon_form()
    matrix.transform_to_reduced_row_echelon_form()
    print("\nInverse matrix:\n{}".format(matrix.inverse_matrix))


if __name__ == "__main__":
    main()
