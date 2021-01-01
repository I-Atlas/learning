class DecisionMaker:

    # Рассчет матрицы рисков
    @staticmethod
    def compute_risk_matrix(matrix):
        max_col = []

        for i in range(len(matrix[0])):
            temp = []
            for j in range(len(matrix)):
                temp.append(matrix[j][i])
            max_col.append(max(temp))

        for i in range(len(matrix[0])):
            for j in range(len(matrix)):
                matrix[j][i] = max_col[i] - matrix[j][i]

        return matrix

    # Критерий Вальда
    @staticmethod
    def Wald(matrix):
        values = []

        for row in matrix:
            values.append(min(row))

        return values.index(max(values))

    # Критерий Сэвиджа
    @staticmethod
    def Savage(matrix):
        values = []

        for row in matrix:
            values.append(max(row))

        return values.index(min(values))

    # Критерий Гурвица
    @staticmethod
    def Hurwitz(matrix, alpha):
        min_max = []

        for row in matrix:
            min_max.append((min(row), max(row)))

        values = []
        for pair in min_max:
            values.append(alpha * pair[1] + (1 - alpha) * pair[0])

        return values.index(max(values))

    # Критерий азартного игрока
    @staticmethod
    def Gambler(matrix):
        values = []

        for row in matrix:
            values.append(max(row))
        print(values)

        return values.index(max(values)), values.index(min(values))

    # Максимальный критерий Байеса
    @staticmethod
    def BayesMax(matrix, p, j):
        values = []

        for row in matrix:
            values.append(sum(row) * p[j])
            j += 1
        return values.index(max(values))

    # Минимальный критерий Байеса
    @staticmethod
    def BayesMin(matrix, p, j):
        values = []

        for row in matrix:
            values.append(sum(row) * p[j])
            j += 1

        return values.index(min(values))

    # Критерий Лапласа
    @staticmethod
    def Laplace(matrix):
        values = []

        for row in matrix:
            values.append(sum(row) / len(row))

        return values.index(min(values))

    # Критерий Ходжа-Лемана
    @staticmethod
    def HodgesLehmann(matrix, u, p, j):
        sums = []
        minimum_values = []

        for row in matrix:
            sums.append(u * sum(row) * p[j])
            minimum_values.append((1 - u) * min(row))
            j += 1

        values = sums + minimum_values

        return values
