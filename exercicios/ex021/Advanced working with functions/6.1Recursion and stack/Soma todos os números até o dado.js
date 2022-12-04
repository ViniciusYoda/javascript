// A solução usando um loop:

function loop(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

console.log(`Solução com loop ${loop(100)}`);

// A solução usando recursão:

function recursão(n) {
    if (n == 1) return 1;
    return n + recursão(n - 1);
}

console.log(`Solução com recursão ${recursão(100)}`);

// A solução usando a fórmula: sumTo(n) = n*(n+1)/2:

function sumTo(n) {
    return n * (n + 1) / 2;
}

console.log(`Solução usando a fórmula ${sumTo(100)}`);

/*

PS Naturalmente, a fórmula é a solução mais rápida. Ele usa apenas 3 operações para qualquer número n. A matemática ajuda!

A variante de loop é a segunda em termos de velocidade. Tanto na variante recursiva quanto na variante de loop, somamos os mesmos números. Mas a recursão envolve chamadas aninhadas e gerenciamento de pilha de execução. Isso também consome recursos, por isso é mais lento.

PPS Alguns mecanismos suportam a otimização de “chamada final”: se uma chamada recursiva for a última da função, sem nenhum outro cálculo realizado, a função externa não precisará retomar a execução, portanto, o mecanismo não precisará lembre-se de seu contexto de execução. Isso remove o fardo da memória. Mas se o mecanismo JavaScript não oferecer suporte à otimização de chamada final (a maioria deles não), haverá um erro: tamanho máximo da pilha excedido, porque geralmente há uma limitação no tamanho total da pilha.

*/