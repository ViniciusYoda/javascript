alert( alert(1) || 2 || alert(3) )

/*

A reposta: primeiro 1, depois 2.

A chamada para alert não retorna um valor. Ou, em outras palavras, ele retorna undefinde.

1. O primeiro OR || avalia seu operando esquerdo alert(1). Isso mostra a primeira mensagem com 1.

2. O alert retorna undefined, então OR segue para o segundo operando procurando por um valor verdadeiro.

3. O segundo operando 2 é verdadeiro, então a execução é interrompida, 2 é retornada e então mostrada pelo alerta externo.

Não haverá 3, porque a avaliação não chega alert(3).