Array = [
    { number: 80 },
    { number: 270 },
    { number: 60 },
    { number: 50 },
    { number: 20 },
    { number: 10 },
    { number: 45 },
]

const filter = []
for (let i = 0; i < Array.length; i++) {
    if (Array[i].number <= 45) {
        filter. push(Array[i])
    }
}

console.log(filter)


let reduce = 0
for (let i = 0; i < Array.length; i++) {
    reduce += Array[i].number
}

console.log(reduce)

function map (Array, f) {
    const result = []
    Array.forEach((v, i) => {
        result.push(f(v, i));
    })
    return result
}


const filter = () => {

}

filter([1,2,3,4], (el) => el % 2 == 0) // [2,4]