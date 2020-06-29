const pow = (x, n) => {
    return n == 1 ? x : x * pow(x, n - 1)
}

console.log(pow(10, 2))