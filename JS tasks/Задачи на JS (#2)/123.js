const arr = [1,2,3,4];

const r1 = arr.reduce((acc, el) => {
    if (el % 2 == 0) {
        acc.push(el);
    }
    return acc;
}, [])


const r2 = arr.reduce((acc, el) => {
    if (el % 2 == 0) {
        acc += el
    }
    return acc;
}, 0);


console.log('r1:', r1);
console.log('r2:', r2);


function map (arr, f) {
    const result = []
    arr.forEach((v, i) => {
        result.push(f(v, i));
    })
    return result
}

console.log(map([1,3,4,5], (el) => el*2));


console.log('qweqwe');

setTimeout(() => {
    console.log('qqw1111');
    
}, 2000)


const fs = require('fs');

fs.readFile('numberToText.js', (err, data) => {
    if (err) {
        console.log('err', err);
        return
    }
    console.log('data', data);
    
})