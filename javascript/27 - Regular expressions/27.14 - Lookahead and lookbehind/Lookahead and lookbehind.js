/*

Olhe para a frente e olhe para trás
Às vezes, precisamos encontrar apenas as correspondências para um padrão que são seguidas ou precedidas por outro padrão.

Existe uma sintaxe especial para isso, chamada “lookahead” e “lookbehind”, juntas chamadas de “lookaround”.

Para começar, vamos encontrar o preço da string como 1 turkey costs 30€. Ou seja: um número, seguido de €um sinal.

Olhe para frente
A sintaxe é: X(?=Y), significa "procure por X, mas corresponda somente se for seguido por Y". Pode haver qualquer padrão em vez de Xe Y.

Para um número inteiro seguido por €, o regexp será \d+(?=€):

let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=€)/) ); // 30, the number 1 is ignored, as it's not followed by €
Observação: o lookahead é apenas um teste, o conteúdo dos parênteses (?=...)não é incluído no resultado 30.

Quando procuramos por X(?=Y), o mecanismo de expressão regular localiza Xe verifica se há Yimediatamente depois dele. Caso contrário, a possível correspondência será ignorada e a pesquisa continuará.

Testes mais complexos são possíveis, por exemplo, X(?=Y)(?=Z)meios:

Encontre X.
Verifique se Yé imediatamente depois X(pule se não for).
Verifique se Ztambém está imediatamente depois X(pule se não estiver).
Se ambos os testes forem aprovados, então Xé uma correspondência, caso contrário, continue procurando.
Em outras palavras, tal padrão significa que estamos procurando Xseguidos por Ye Zao mesmo tempo.

Isso só é possível se os padrões Ye Znão forem mutuamente exclusivos.

Por exemplo, \d+(?=\s)(?=.*30)procura \d+que é seguido por um espaço (?=\s)e há 30algum lugar depois dele (?=.*30):

let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
Em nossa string que corresponde exatamente ao número 1.

antecipação negativa
Digamos que queremos uma quantidade, não um preço da mesma string. Isso é um número \d+, NÃO seguido por €.

Para isso, um lookahead negativo pode ser aplicado.

A sintaxe é: X(?!Y), significa "pesquisar X, mas somente se não for seguido por Y".

let str = "2 turkeys cost 60€";

alert( str.match(/\d+\b(?!€)/g) ); // 2 (the price is not matched)
Olhar para trás
Lookbehind compatibilidade do navegador
Observação: Lookbehind não é compatível com navegadores não V8, como Safari, Internet Explorer.

Lookahead permite adicionar uma condição para “o que se segue”.

Lookbehind é semelhante, mas olha para trás. Ou seja, permite casar um padrão apenas se houver algo antes dele.

A sintaxe é:

Lookbehind positivo: (?<=Y)X, corresponde a X, mas somente se houver Yantes dele.
Negative lookbehind: (?<!Y)X, corresponde a X, mas somente se não houver nenhum Yantes dele.
Por exemplo, vamos alterar o preço para dólares americanos. O cifrão geralmente vem antes do número, então para procurar $30vamos usar (?<=\$)\d+– um valor precedido por $:

let str = "1 turkey costs $30";

// the dollar sign is escaped \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (skipped the sole number)
E, se precisarmos da quantidade – um número, não precedido por $, podemos usar um lookbehind negativo (?<!\$)\d+:

let str = "2 turkeys cost $60";

alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (the price is not matched)
Capturando grupos
Geralmente, o conteúdo dentro dos parênteses de visualização não se torna parte do resultado.

Por exemplo, no padrão \d+(?=€), o €sinal não é capturado como parte da correspondência. Isso é natural: procuramos um número \d+, while (?=€)é apenas um teste que deve ser seguido por €.

Mas, em algumas situações, podemos querer capturar também a expressão de lookaround, ou parte dela. Isso é possível. Apenas envolva essa parte em parênteses adicionais.

No exemplo abaixo, o símbolo da moeda (€|kr)é capturado, juntamente com o valor:

let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // extra parentheses around €|kr

alert( str.match(regexp) ); // 30, €
E aqui está o mesmo para lookbehind:

let str = "1 turkey costs $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
Resumo
Lookahead e lookbehind (comumente chamados de “lookaround”) são úteis quando queremos corresponder algo dependendo do contexto antes/depois dele.

Para regexps simples, podemos fazer algo semelhante manualmente. Ou seja: combine tudo, em qualquer contexto, e depois filtre por contexto no loop.

Lembre-se, str.match(sem sinalizador g) e str.matchAll(sempre) retorne correspondências como arrays com indexpropriedade, para que saibamos exatamente onde está no texto e possamos verificar o contexto.

Mas geralmente olhar ao redor é mais conveniente.

Tipos de lookaround:

Padrão	tipo	partidas
X(?=Y)	antecipação positiva	Xse seguido porY
X(?!Y)	antecipação negativa	Xse não for seguido porY
(?<=Y)X	olhar para trás positivo	Xse depoisY
(?<!Y)X	lookbehind negativo	Xse não depoisY

*/