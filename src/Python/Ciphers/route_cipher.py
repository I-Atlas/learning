import math
import sys

grid = []


def main():
    """
    Принимает вводимые пользователем данные для определения размера маршрута / пути записи и чтения.
    Берет сообщения, которые пользователь хочет зашифровать, и передает нужной функции.
    """

    while True:
        route_size = int(input("Пожалуйста, введите размер таблицы маршрутов: "))
        if route_size <= 3:
            print('Пожалуйста, укажите размер таблицы маршрутов больше 3.')
        elif route_size > 3:
            break

    print(
        "Способ 1 использует маршрут, который начинается справа снизу и идет вверх, потом влево.\n"
        "Путь маршрута будет иметь форму спирали.\n")
    users_choice = int(input("Пожалуйста, введите 1 для способа №1: "))
    plain_message = input("\nПожалуйста, введите слово, которое хотите зашифровать: ")

    for number_of_rows in range(math.ceil(len(plain_message) / route_size)):
        grid_rows = []
        for index in range(route_size):
            if number_of_rows * route_size + index < len(plain_message):
                grid_rows.append(plain_message[number_of_rows * route_size + index])
            else:
                grid_rows.append("-")

        grid.append(grid_rows)

    if users_choice == 1:
        path_one()
    else:
        print("Выберите способ №1.")
        sys.exit()


def path_one():
    """
    Он принимает в качестве входных данных plain_message и записывает текст в сетку в обратном порядке и шифрует по
    часовой стрелке.
    """
    encrypted_message = ""
    index = 0
    decrypted_message = ""

    grid_width = len(grid[0])
    grid_height = len(grid)

    if grid_width < grid_height:
        allowed_depth = grid_width // 2
    else:
        allowed_depth = grid_height // 2

    grid.reverse()
    for step_size in range(allowed_depth):

        for right_side in range(step_size, grid_height - step_size - 1):
            encrypted_message += grid[right_side][grid_width - step_size - 1]

        for bottom_side in range(grid_width - step_size - 1, step_size, -1):
            encrypted_message += grid[grid_height - step_size - 1][bottom_side]

        for left_side in range(grid_height - step_size - 1, step_size, -1):
            encrypted_message += grid[left_side][step_size]

        for top_row in range(step_size, grid_width - step_size - 1):
            encrypted_message += grid[step_size][top_row]

    print('Зашифрованное сообщение:', encrypted_message)

    blank_grid = [[0 for rows in range(grid_width)] for cols in range(grid_height)]
    for step_size in range(allowed_depth):
        for right_side in range(step_size, grid_height - step_size - 1):
            blank_grid[right_side][grid_width - step_size - 1] = encrypted_message[index]
            index += 1

        for bottom_side in range(grid_width - step_size - 1, step_size, -1):
            blank_grid[grid_height - step_size - 1][bottom_side] = encrypted_message[index]
            index += 1

        for left_side in range(grid_height - step_size - 1, step_size, -1):
            blank_grid[left_side][step_size] = encrypted_message[index]
            index += 1

        for top_row in range(step_size, grid_width - step_size - 1):
            blank_grid[step_size][top_row] = encrypted_message[index]
            index += 1

    blank_grid.reverse()

    for cols in range(grid_height):
        for rows in range(grid_width):
            decrypted_message += str(blank_grid[cols][rows])

    print('Расшифрованное сообщение:', decrypted_message)


if __name__ == "__main__":
    main()
