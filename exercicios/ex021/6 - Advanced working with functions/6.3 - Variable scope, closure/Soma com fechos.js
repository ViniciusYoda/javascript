function sum(a) {

    return function(b) {
        return a + b; // takes "a" from the outer lexical environment
    };

}

console.log( sum(1)(2) ); // 3
console.log( sum(5)(-1) ); // 4