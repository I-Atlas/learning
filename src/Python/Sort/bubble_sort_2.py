# Короткая пузырьковая сортировка
def bubbleSort2(array):
    exchanges = True
    passnum = len(array) - 1
    while passnum > 0 and exchanges:
        exchanges = False
        for i in range(passnum):
            if array[i] > array[i + 1]:
                exchanges = True
                temp = array[i]
                array[i] = array[i + 1]
                array[i + 1] = temp
        passnum = passnum - 1


array = [5, 1, 4, 4, 3]
bubbleSort2(array)
print(array)

if __name__ == "__main__":
    bubbleSort2(array)
