for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );

/*

A resposta: de 0para 4em ambos os casos.

Isso pode ser facilmente deduzido do algoritmo de for:

Execute uma vez i = 0antes de tudo (começar).
Verifique a condiçãoi < 5
If true– executa o corpo do loop alert(i)e, em seguida,i++
O incremento i++é separado da verificação de condição (2). Isso é apenas mais uma afirmação.

O valor retornado pelo incremento não é usado aqui, portanto, não há diferença entre i++e ++i.

*/