# Обычная пузырьковая сортировка
def bubbleSort(array):
    for passnum in range(len(array) - 1, 0, -1):
        for i in range(passnum):
            if array[i] > array[i + 1]:
                temp = array[i]
                array[i] = array[i + 1]
                array[i + 1] = temp


array = [5, 1, 4, 4, 3]
bubbleSort(array)
print(array)

if __name__ == "__main__":
    bubbleSort(array)