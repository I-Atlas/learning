const vasya = { name: "Вася", age: 25 }
const petya = { name: "Петя", age: 30 }
const masha = { name: "Маша", age: 28 }

const users = [ vasya, petya, masha ]

const names = users.map(item => item.name)

console.log(names)