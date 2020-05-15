const countingSort = (array, minimumValue, maximumValue) => {
    let z = 0;
    let count = [];
    for (let i = minimumValue; i <= maximumValue; i++) {
        count[i] = 0;
    }
    for (let i = 0; i < array.length; i++) {
        count[array[i]] += 1;
    }
    for (let i = minimumValue; i <= maximumValue; i++) {
        while (count[i]-- > 0) {
            array[z] = i;
            z++;
        }
    }
    return array;
};

const countingSort2 = (array, minimumValue, maximumValue) => {
    const count = new Array(maximumValue - minimumValue + 1).fill(0);
    const indexBalancer = Math.abs(minimumValue);
    const sortedArray = [];
    for (let number of array) {
        count[number + indexBalancer]++
    }
    for (let i = minimumValue; i <= maximumValue; i++) {
        let tally = count[i + indexBalancer];

        while(tally > 0) {
            sortedArray.push(i);
            tally--;
        }
    }
    return sortedArray;
};

console.log('Первая имплементация: ', countingSort([3,4,5,2,1,1,0,-1], -1, 5))

console.log('Вторая имплементация: ', countingSort2([3,4,5,2,1,1,0,-1,-5], -5, 5))