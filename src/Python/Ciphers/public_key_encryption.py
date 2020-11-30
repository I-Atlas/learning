import random
import itertools
import numpy as np

## Генерация ключа

# Рандомная генерация последовательности
r = random.randint(3, 10)
a = [1]
for i in range(1, r):
    a.append(random.randint(1, 20))
    for i in range(1, len(a)):
        while a[i] <= np.sum(a[:i]):
            a[i] = np.sum(a[:i + 1])
print('Закрытый ключ: ', a)

# Генерация модуля (необходимо, если последовательность генерируется рандомно)
lst = []
# Модуль m (некоторое целое число, которое должно быть больше суммы всех чисел последовательности закрытого ключа)
m = random.randint(np.sum(a) + 1, 10000)
for i in range(2, m):
    if m % i != 0:
        lst.append(i)

lst1 = []
for i in lst:
    i1 = i
    m1 = m
    while m1 > i1 and (m1 - i1) >= 0:
        m1 -= i1
        while m1 < i1 and (i1 - m1) >= 0:
            i1 -= m1
    if i1 == 1 and m1 == 1:
        lst1.append(i)
    else:
        continue

# Множитель p (взаимно простое число с модулем m)
p = lst1[0]

# Последовательность вводится с клавиатуры
# r = int(input("Введите множитель разбивки последовательности r: "))
# a = list(map(int, input("Введите закрытый ключ: ").split()))
# p = int(input("Введите множитель p: "))
# m = int(input("Введите модуль m: "))

# Последовательность задается статически
# r = 8
# a = [2, 3, 6, 13, 27, 52, 105, 210]
# p = 31
# m = 420

# Создание открытого ключа по формуле (k[i] * p) mod m
b = []
for i in range(len(a)):
    b.append((a[i] * p) % m)
print('Открытый ключ: ', b)
print('Секретные ключи: p = ', p, ', m = ', m)

## Алгоритм шифрования

# Последовательность вводится с клавиатуры
open_text = list(input('Введите двоичную последовательность (на основе количества элементов в закрытом ключе): \n'))

# Последовательность задается статически
# open_text = [1, 0, 1, 0, 0, 1, 0, 1]

for i in range(len(open_text)):
    open_text[i] = int(open_text[i])

# Лямбда функция разбивки
split = lambda x, r: x if not x else [x[:r]] + [split([] if not -(len(x) - r) else x[-(len(x) - r):], r)][0]
blocks = split(open_text, r)
print('Разбивка последовательности на блоки: ', blocks)

## Подсчет максимального веса укладки

normal_blocks = []
for i in range(len(blocks)):
    if len(blocks[i]) == r:
        normal_blocks.append(blocks[i])
    else:
        continue

for i in range(len(normal_blocks)):
    # Содаем массив из разбитых элементов массива a
    a1 = np.array(a)
    # Создаем массив из разбитых элементов последовательности
    b1 = np.array(normal_blocks[i])
    # Суммирование массива
    normal_blocks[i] = np.sum(a1 * b1)
    if ValueError:
        continue
normal_blocks_array = normal_blocks

## Алгоритм дешифрования

# Расшифровка закрытого ключа
a_find = []
for i in range(len(b)):
    a_find.append(int(((p ** -1) * b[i]) % m))
print("Расшифрованный закрытый ключ: ", a_find)

# Подсчет массы вещей в рюкзаке
mass_array = []
for i in range(len(normal_blocks_array)):
    mass_array.append(int((p ** -1) * normal_blocks_array[i]))
print("Масса вещей в рюкзаке: ", mass_array)

# Подсчет наличия элементов в рюкзаке
# Наличие элементов в рюкзаке определяется с помощью расшифованного закрытого ключа
block_open_text = []
# Создание таблицы двоичных чисел от 1 до 0 с учетом длинны массива элементов расшифрованного закрытого ключа
combo = list(itertools.product([1, 0], repeat=len(a_find)))
for i in range(len(mass_array)):
    for tuple in combo:
        if np.sum(np.array(tuple) * np.array(a_find)) == mass_array[i]:
            block_open_text.append(tuple)
if not block_open_text:
    print("Максимальный вес укладки: ", normal_blocks_array)
    print("Невозможно произвести укладку.")
else:
    print("Максимальный вес укладки: ", normal_blocks_array)
    print('Наличие вещей в рюкзаке: ', block_open_text)
