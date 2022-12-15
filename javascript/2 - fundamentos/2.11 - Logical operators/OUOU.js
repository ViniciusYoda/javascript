alert( null || 2 && 3 || 4 );

// A resposta: 3.

alert( null || 2 && 3 || 4 );

/*

A precedência de AND && é maior que ||, então ele é executado primeiro.

O resultado de 2 && 3 - 3, então a expressão se torna:

null || 3 || 4

Agora o resultado é o primeiro valor verdaeiro: 3.

