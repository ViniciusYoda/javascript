/*

A tarefa demostra como os formulários postfix/prefix podem levar a resultados diferentes quando usados em comparações.

1.

De 1 a 4

*/

let i = 0;
while(++i < 5) alert(i);

/*

O primeiro valor é i - 1, porque ++i primeiro incrementa i e depois retorna o novo valor. Então a primeira comparação é 1 < 5 e os alert mostra 1.

Então siga 2, 3, 4...-os valores aparecem um após o outro. A comparação sempre usa o valor incrementado, pois ++ está da variável.

Finalmetnte, i = 4 é incrementado para 5, a comparação while(5 < 5) falha e o loop é interrompido. Então 5 naõ é mostrado.

2.

De 1 a 5

*/

let j = 0;
while(j++ < 5) alert(j);

/*

O primeiro valor é novamente i = 1. A forma postfix de i++incrementos ie, em seguida, retorna o valor antigo , então a comparação i++ < 5usará i = 0(ao contrário de ++i < 5).

Mas a alertligação é separada. É outra instrução que é executada após o incremento e a comparação. Então ele pega a corrente i = 1.

Então siga2, 3, 4…

Vamos parar i = 4. A forma de prefixo ++io incrementaria e usaria 5na comparação. Mas aqui temos a forma postfix i++. Portanto, ele é incrementado ipara 5, mas retorna o valor antigo. Portanto, a comparação é realmente while(4 < 5)– verdadeira, e o controle passa para alert.

O valor i = 5é o último, pois na próxima etapa while(5 < 5)é false.

*/