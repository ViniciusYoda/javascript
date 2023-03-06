/*

Âncoras: string start ^ e end $
Os caracteres circunflexo ^e dólar $têm um significado especial em um regexp. Eles são chamados de “âncoras”.

O acento circunflexo ^corresponde ao início do texto e o dólar $– ao final.

Por exemplo, vamos testar se o texto começa com Mary:

let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // true
O padrão ^Marysignifica: “string start and then Mary”.

Semelhante a isso, podemos testar se a string termina com snowusing snow$:

let str1 = "its fleece was white as snow";
alert( /snow$/.test(str1) ); // true
Nesses casos particulares, poderíamos usar métodos de string startsWith/endsWith. Expressões regulares devem ser usadas para testes mais complexos.

Testando uma partida completa
Ambas as âncoras juntas ^...$costumam ser usadas para testar se uma string corresponde ou não ao padrão. Por exemplo, para verificar se a entrada do usuário está no formato correto.

Vamos verificar se uma string é ou não uma hora no 12:34formato. Ou seja: dois dígitos, depois dois pontos e depois outros dois dígitos.

Na linguagem de expressões regulares, isso é \d\d:\d\d:

let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false
Aqui, a correspondência para \d\d:\d\ddeve começar exatamente após o início do texto ^e o final $deve seguir imediatamente.

A string inteira deve estar exatamente neste formato. Se houver algum desvio ou um caractere extra, o resultado é false.

As âncoras se comportam de maneira diferente se o sinalizador mestiver presente. Veremos isso no próximo artigo.

Âncoras têm “largura zero”
Âncoras ^e $são testes. Eles têm largura zero.

Em outras palavras, eles não correspondem a um caractere, mas forçam o mecanismo regexp a verificar a condição (início/fim do texto).

*/