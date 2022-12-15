function readNumber() {
    let num;

    do {
        num = prompt("Escreva um numero: ", 0);
    } while ( !isFinite(num) );

    if (num === null || num === '') return null;

    return +num;
}

alert(`Read: ${readNumber()}`);

/*

A solução é um pouco mais complexa do que poderia ser porque precisamos lidar com null/empty lines.

Então, na verdade, aceitamos a entrada até que seja um “número regular”. Tanto null(cancelar) quanto linha vazia também se enquadram nessa condição, pois na forma numérica são 0.

Depois que paramos, precisamos tratar uma nulllinha vazia especialmente (return null), pois convertê-las em um número retornaria 0.

*/