const swap = (arr, first, second) => {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
};

const bubbleSort1 = (array) => {
  let check = false;
  for(let i = 0; i < array.length; i++) {
      if (array[i + 1] < array[i]) {
          swap(array, i, i + 1)
          check = true
      }
  }
  if (!check) {
      return array
  } else {
     return bubbleSort1(array);
  }
};

const bubbleSort2 = (array) => {
  for (let i = 0; i < array.length; i++) {
      for (let j = 0, stop = array.length - i; j < stop; j++) {
          if (array[j] > array[j + 1]){
              swap(array, j, j + 1);
          }
      }
  }
  return array;
};

const array1 = [6,7,8,8,1];
console.log('Рекурсивная пузырьковая сортировка: ', bubbleSort1(array1));

const array2 = [5,1,4,4,3];
console.log('Итеративная пузырьковая сортировка: ', bubbleSort2(array2));