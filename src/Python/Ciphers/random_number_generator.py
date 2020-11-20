import random
import matplotlib.pyplot as plt
import numpy.random as rando

array_of_random_numbers = []
array_of_cores = []


def random_core(number_of_cores):
  while len(array_of_cores) < number_of_cores:
    core = rando.randint(1000, 9999)
    if core % 2 != 0:
      array_of_cores.append(core)


def main(min_number, max_number, numbers):
    counter = 3729
    for i in range(int(numbers)):
      random_core = random.choice(array_of_cores)
      multiplicator = int(random_core * counter)
      multiplicator = str(multiplicator)
      multiplicator = int(multiplicator[4:])
      number = rando.uniform(float(min_number), float(max_number))
      # number = round(number * (int(multiplicator)/10000), 4)
      if (number > 0.0) and (number < 0.18):
          array_of_random_numbers.append(1)
      elif (number > 0.18) and (number < 0.24):
          array_of_random_numbers.append(2)
      elif (number > 0.24) and (number < 0.36):
          array_of_random_numbers.append(5)
      elif (number > 0.36) and (number < 0.58):
          array_of_random_numbers.append(6)
      elif (number > 0.58) and (number < 0.9):
          array_of_random_numbers.append(8)
      elif (number > 0.9) and (number < 1):
          array_of_random_numbers.append(11)
      counter = (random_core * multiplicator)
      # array_of_random_numbers.append(round(number, 4))
    print(array_of_random_numbers)
    print(f"Количество элементов в массиве: {len(array_of_random_numbers)}")
    print(f"Количество элементов в массиве ядер: {len(array_of_cores)}")
    plt.hist(array_of_random_numbers)
    plt.show()


if __name__ == '__main__':
    min_number = input("Введите минимальное число: ")
    max_number = input("Введите максимальное число: ")
    numbers = input("Введите количество генерируемых чисел: ")
    number_of_cores = 6
    random_core(number_of_cores)
    main(min_number, max_number, numbers)