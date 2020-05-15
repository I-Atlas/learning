def selectionSort(array):
    for fillslot in range(len(array) - 1, 0, -1):
        positionOfMax = 0
        for location in range(1, fillslot + 1):
            if array[location] > array[positionOfMax]:
                positionOfMax = location

        temp = array[fillslot]
        array[fillslot] = array[positionOfMax]
        array[positionOfMax] = temp


array = [54, 26, 93, 17, 77, 31, 44, 55, 20]
selectionSort(array)
print(array)

if __name__ == "__main__":
    selectionSort(array)