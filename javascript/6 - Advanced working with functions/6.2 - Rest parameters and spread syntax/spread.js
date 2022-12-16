const primeiro = [1,2,3]
const segundo = [4,5,6]

const combinado = [...primeiro,"a",...segundo,"b"]
console.log(combinado)

const clonado = [...combinado];

console.log(clonado)

console.log(combinado === clonado)