const nullValue = null;
const emptyText = "";
const someNumber = 42;
const nada = NaN
const indefiinido = undefined

const valA = nullValue ?? "A"
const valB = emptyText ?? "B"
const valC = someNumber ?? 0;
const valD = nada ?? "Algo?"
const valE = indefiinido ?? "Definido"

console.log(valA);
console.log(valB);
console.log(valC);
console.log(valD);
console.log(valE);