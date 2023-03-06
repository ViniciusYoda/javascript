/*

Escapar, caracteres especiais
Como vimos, uma barra invertida \é usada para denotar classes de caracteres, por exemplo \d, . Portanto, é um caractere especial em regexps (assim como em strings regulares).

Existem outros caracteres especiais também, que têm um significado especial em um regexp, como [ ] { } ( ) \ ^ $ . | ? * +. Eles são usados ​​para fazer pesquisas mais poderosas.

Não tente se lembrar da lista – em breve trataremos de cada um deles, e você os saberá de cor automaticamente.

escapando
Digamos que queremos encontrar literalmente um ponto. Não “qualquer caractere”, mas apenas um ponto.

Para usar um caractere especial como regular, coloque uma barra invertida antes dele: \..

Isso também é chamado de “escapar um personagem”.

Por exemplo:

alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (match!)
alert( "Chapter 511".match(/\d\.\d/) ); // null (looking for a real dot \.)
Parênteses também são caracteres especiais, portanto, se quisermos, devemos usar \(. O exemplo abaixo procura por uma string "g()":

alert( "function g()".match(/g\(\)/) ); // "g()"
Se estivermos procurando por uma barra invertida \, é um caractere especial em strings regulares e regexps, então devemos duplicá-lo.

alert( "1\\2".match(/\\/) ); // '\'
uma barra
Um símbolo de barra '/'não é um caractere especial, mas em JavaScript é usado para abrir e fechar o regexp: /...pattern.../, então devemos escapá-lo também.

Aqui está a '/'aparência de uma pesquisa por uma barra:

alert( "/".match(/\//) ); // '/'
Por outro lado, se não estivermos usando /.../, mas criarmos um regexp usando new RegExp, não precisamos escapar dele:

alert( "/".match(new RegExp("/")) ); // finds /
novo RegExp
Se estivermos criando uma expressão regular com new RegExp, não precisamos escapar /, mas precisamos fazer algum outro escape.

Por exemplo, considere isto:

let regexp = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(regexp) ); // null
A pesquisa semelhante em um dos exemplos anteriores funcionou com /\d\.\d/, mas new RegExp("\d\.\d")não funciona, por quê?

A razão é que as barras invertidas são “consumidas” por uma string. Como podemos lembrar, as strings regulares têm seus próprios caracteres especiais, como \n, e uma barra invertida é usada para escapar.

Veja como “\d.\d” é percebido:

alert("\d\.\d"); // d.d
As aspas de string “consomem” as barras invertidas e as interpretam por conta própria, por exemplo:

\n– torna-se um caractere de nova linha,
\u1234– torna-se o caractere Unicode com tal código,
…E quando não há nenhum significado especial: como \dou \z, a barra invertida é simplesmente removida.
Portanto, new RegExpobtém uma string sem barras invertidas. É por isso que a pesquisa não funciona!

Para corrigi-lo, precisamos dobrar as barras invertidas, porque as aspas de string se transformam \\em \:

let regStr = "\\d\\.\\d";
alert(regStr); // \d\.\d (correct now)

let regexp = new RegExp(regStr);

alert( "Chapter 5.1".match(regexp) ); // 5.1
Resumo
Para procurar caracteres especiais [ \ ^ $ . | ? * + ( )literalmente, precisamos antecipá-los com uma barra invertida \(“escape deles”).
Também precisamos escapar /se estivermos dentro /.../(mas não dentro new RegExp).
Ao passar uma string para new RegExp, precisamos dobrar as barras invertidas \\, pois as aspas de string consomem uma delas.

*/