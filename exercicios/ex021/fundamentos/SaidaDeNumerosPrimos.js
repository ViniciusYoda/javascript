let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // for each i...

    for (let j = 2; j < i; j++) { // look for a divirso...
        if (i % j == 0) continue nextPrime; // not a prime, go next
    }
    console.log(i); // a prime
}

/*

Há muito espaço para otimizá-lo. Por exemplo, podemos procurar os divisores de 2até a raiz quadrada de i. Mas de qualquer forma, se quisermos ser realmente eficientes para grandes intervalos, precisamos mudar a abordagem e contar com matemática avançada e algoritmos complexos como peneira quadrática , peneira geral de campo numérico etc.

*/