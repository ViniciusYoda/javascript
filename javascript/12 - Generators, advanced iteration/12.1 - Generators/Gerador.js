function* genRandom(max) {
   console.log(yield)
}

const gen100 = genRandom(100)
console.log(gen100.next(1));
console.log(gen100.next(2));