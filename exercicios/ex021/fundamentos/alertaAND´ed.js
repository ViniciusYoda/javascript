alert( alert(1) && alert(2) );

/*

A resposta: 1, então undefined.

A chamada para alert retorna undefined (só mostra uma mensagem, então não há retorno significativo).

Por isso, && avalia o operando esquerdo (outputs 1), e para imediatamente, pois undefined é um valor falso. E && procura um valor falso e o retorna, então está feito.

