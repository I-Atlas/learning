from DecisionMaker import DecisionMaker
import sys


def main():
    # Вариант №3

    # Ввод размерности массива m,n
    print("Введите размерность матрицы n,m")
    n, m = map(int, input().split())

    # матрица значений
    # matrix = [
    #     [7, 3, 2, 4, 5],
    #     [2, 4, 3, 2, 8],
    #     [1, 0, 4, 8, 6],
    #     [10, 5, 8, 4, 3],
    # ]
    print("Введите матрицу")
    matrix = list(list(map(int, input().split())) for _ in range(n))

    # коэффициент пессимизма
    # alpha = 0.4
    print("Введите коэффициент пессимизма alpha")
    alpha = float(input())

    # массив вероятностей
    # p = [0.25, 0.2, 0.1, 0.3, 0.15]
    print("Введите массив вероятностей p")
    p = list(map(float, input().split()))

    # счетчик (индекс) для массива вероятностей (p[j])
    j = 0

    # коэффициент достоверности информации о типах угроз
    # u = 0.9
    print("Введите коэффициент достоверности информации о типах угроз u")
    u = float(input())

    if (alpha or u) < 0 or (alpha or u) > 1:
        print("Коэффициенты alpha и u дожны быть больше 0 и меньше 1")
        sys.exit()

    for row in matrix:
        print(row)

    # Задание №3
    print("Максиминный критерий Вальда: ", DecisionMaker.Wald(matrix.copy()))
    print("Минимаксный критерий Сэвиджа: ", DecisionMaker.Savage(DecisionMaker.compute_risk_matrix(matrix.copy())))
    print("Критерий оптимизма-пессемизма Гурвица: ", DecisionMaker.Hurwitz(matrix.copy(), alpha))
    print("Критерий оптимизма (азартного игрока): ", DecisionMaker.Gambler(matrix.copy()))

    # Задание №4
    print("Критерий Байеса (максимальный): ", DecisionMaker.BayesMax(matrix.copy(), p, j))
    print("Критерий Байеса (минимальный): ",
          DecisionMaker.BayesMin(DecisionMaker.compute_risk_matrix(matrix.copy()), p, j))
    print("Критерий недостаточного основания Лапласа: ", DecisionMaker.Laplace(matrix.copy()))
    print("Критерий Ходжа-Лемана: ", DecisionMaker.HodgesLehmann(matrix.copy(), u, p, j))


if __name__ == "__main__":
    main()
