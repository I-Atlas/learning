# Даны матрицы Х(6, 10), Y(10, 8) действительных чисел. Найти сумму и
# количество элементов, удовлетворяющих условию 0 <= X(i,j) <=1, 0 <= Y(i,j) <=1.
# Для вычислений использовать подпрограмму.

from random import randint

X = [[randint(0, 10) for j in range(10)] for i in range(6)]

Y = [[randint(0, 10) for j in range(8)] for i in range(10)]


def count_up(matrix):
    matrix_sum = 0
    count_of_elements = 0
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if 1 >= matrix[i][j] >= 0:
                matrix_sum += matrix[i][j]
                count_of_elements += 1
    print('Первая матрица X, вторая матрица Y')
    print('Сумма элементов матрицы по условию: ', matrix_sum, '\n', 'Количество элементов матрицы по условию: ',
          count_of_elements, '\n')


def print_matrix(matrix):
    print('Матрица: ')
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            print("{:4d}".format(matrix[i][j]), end="")
        print()


if __name__ == '__main__':
    count_up(X)
    count_up(Y)
    print_matrix(X)
    print_matrix(Y)
