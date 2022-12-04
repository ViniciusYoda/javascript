/*

Por definição, um fatorial n!pode ser escrito como n * (n-1)!.

Em outras palavras, o resultado de factorial(n)pode ser calculado nmultiplicado pelo resultado de factorial(n-1). E a chamada para n-1pode descer recursivamente cada vez mais baixo, até 1.

*/

function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
}

console.log(factorial(5));

// A base da recursão é o valor 1. Também podemos fazer 0a base aqui, não importa muito, mas dá mais um passo recursivo:

function factorial2(n) {
    return n ? n * factorial2(n - 1) : 1;
}

console.log(factorial2(8));