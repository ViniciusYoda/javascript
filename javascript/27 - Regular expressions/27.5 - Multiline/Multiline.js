/*

Modo multilinha de âncoras ^ $, sinalizador "m"
O modo multilinha é habilitado pelo sinalizador m.

Ela afeta apenas o comportamento de ^e $.

No modo multilinha, eles correspondem não apenas no início e no final da string, mas também no início/fim da linha.

Pesquisando no início da linha ^
No exemplo abaixo o texto tem várias linhas. O padrão /^\d/gmleva um dígito desde o início de cada linha:

let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

console.log( str.match(/^\d/gm) ); // 1, 2, 3
Sem o sinalizador, mapenas o primeiro dígito é correspondido:

let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

console.log( str.match(/^\d/g) ); // 1
Isso ocorre porque, por padrão, um cursor ^corresponde apenas ao início do texto e, no modo multilinha, ao início de qualquer linha.

Observe:
“Início de uma linha” significa formalmente “imediatamente após uma quebra de linha”: o teste ^no modo multilinha corresponde a todas as posições precedidas por um caractere de nova linha \n.

E no início do texto.

Pesquisando no final da linha $
O cifrão $se comporta de maneira semelhante.

A expressão regular \d$localiza o último dígito em cada linha

let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d$/gm) ); // 1,2,3
Sem o sinalizador m, o dólar $corresponderia apenas ao final de todo o texto, portanto, apenas o último dígito seria encontrado.

Observe:
“Fim de uma linha” significa formalmente “imediatamente antes de uma quebra de linha”: o teste $no modo multilinha corresponde a todas as posições seguidas por um caractere de nova linha \n.

E no final do texto.

Procurando por \n em vez de ^ $
Para encontrar uma nova linha, podemos usar não apenas âncoras ^e $, mas também o caractere de nova linha \n.

Qual é a diferença? Vejamos um exemplo.

Aqui procuramos \d\nem vez de \d$:

let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d\n/g) ); // 1\n,2\n
Como podemos ver, existem 2 correspondências em vez de 3.

Isso ocorre porque não há nova linha depois 3(há text end, portanto, corresponde a $).

Outra diferença: agora cada correspondência inclui um caractere de nova linha \n. Ao contrário das âncoras ^ $, que apenas testam a condição (início/fim de uma linha), \né um caractere, portanto passa a fazer parte do resultado.

Portanto, a \nno padrão é usado quando precisamos de caracteres de nova linha no resultado, enquanto as âncoras são usadas para encontrar algo no início/fim de uma linha.

*/