let meuSet = new Set([1,2,3,3,2]);
let meuMap = new Map();

meuMap.set('1', 'Vermelho')
meuMap.set('2', 'Verde')
meuMap.set('3', 'Azul')

meuSet.add(4)
meuSet.add(5)
meuSet.add(6)

console.log(meuSet.size)
console.log('------');

for(n of meuSet) {
    console.log(n)
}