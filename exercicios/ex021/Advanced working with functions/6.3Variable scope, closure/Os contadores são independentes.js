function makeCounter() {
    let count = 0;

    return function() {
        return count++;
    };
}

let counter = makeCounter();
let counter2 = makeCounter();

console.log( counter() ); 
console.log( counter() );

console.log( counter2() );
console.log( counter2() );