/*

Quantificadores +, *, ? e n}
Digamos que temos uma string como +7(903)-123-45-67e queremos encontrar todos os números nela. Mas, ao contrário de antes, não estamos interessados ​​em dígitos únicos, mas em números completos: 7, 903, 123, 45, 67.

Um número é uma sequência de 1 ou mais dígitos \d. Para marcar quantos precisamos, podemos acrescentar um quantificador .

Quantidade {n}
O quantificador mais simples é um número entre chaves: {n}.

Um quantificador é anexado a um caractere (ou uma classe de caracteres, ou um [...]conjunto, etc.) e especifica quantos precisamos.

Possui alguns formulários avançados, vejamos exemplos:

A contagem exata:{5}
\d{5}denota exatamente 5 dígitos, o mesmo que \d\d\d\d\d.

O exemplo abaixo procura um número de 5 dígitos:

alert( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"
Podemos adicionar \bpara excluir números mais longos: \b\d{5}\b.

O intervalo: {3,5}, combine 3-5 vezes
Para encontrar números de 3 a 5 dígitos, podemos colocar os limites entre chaves:\d{3,5}

alert( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"
Podemos omitir o limite superior.

Em seguida, um regexp \d{3,}procura sequências de dígitos de comprimento 3ou mais:

alert( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"
Voltemos à string +7(903)-123-45-67.

Um número é uma sequência de um ou mais dígitos em uma linha. Então a regexp é \d{1,}:

let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
Taquigrafias
Existem abreviações para os quantificadores mais usados:

+
Significa “um ou mais”, o mesmo que {1,}.

Por exemplo, \d+procura por números:

let str = "+7(903)-123-45-67";

alert( str.match(/\d+/g) ); // 7,903,123,45,67
?
Significa “zero ou um”, o mesmo que {0,1}. Em outras palavras, torna o símbolo opcional.

Por exemplo, o padrão ou?rprocura oseguido de zero ou um ue, em seguida r, .

Então, colou?rencontre ambos colore colour:

let str = "Should I write color or colour?";

alert( str.match(/colou?r/g) ); // color, colour
*
Significa “zero ou mais”, o mesmo que {0,}. Ou seja, o personagem pode repetir a qualquer momento ou estar ausente.

Por exemplo, \d0*procura um dígito seguido por qualquer número de zeros (pode ser muitos ou nenhum):

alert( "100 10 1".match(/\d0*//*g) ); // 100, 10, 1
Compare com +(um ou mais):

alert( "100 10 1".match(/\d0+/g) ); // 100, 10
// 1 not matched, as 0+ requires at least one zero
Mais exemplos
Quantificadores são usados ​​com muita frequência. Eles servem como o principal “bloco de construção” de expressões regulares complexas, então vamos ver mais exemplos.

Regexp para frações decimais (um número com ponto flutuante):\d+\.\d+

Em ação:

alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
Regexp para uma “tag HTML de abertura sem atributos”, como <span>ou <p>.

O mais simples:/<[a-z]+>/i

alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
A regexp procura o caractere '<'seguido por uma ou mais letras latinas e, em seguida '>', .

Melhorou:/<[a-z][a-z0-9]*>/i

De acordo com o padrão, o nome da tag HTML pode ter um dígito em qualquer posição, exceto na primeira, como <h1>.

alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
Regexp “abrindo ou fechando HTML-tag sem atributos”:/<\/?[a-z][a-z0-9]*>/i

Adicionamos uma barra opcional /?perto do início do padrão. Tive que escapar com uma barra invertida, caso contrário, o JavaScript pensaria que é o fim do padrão.

alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
Para tornar um regexp mais preciso, geralmente precisamos torná-lo mais complexo
Podemos ver uma regra comum nesses exemplos: quanto mais precisa for a expressão regular, mais longa e complexa ela será.

Por exemplo, para tags HTML, poderíamos usar um regexp mais simples: <\w+>. Mas como o HTML tem restrições mais rígidas para um nome de tag, <[a-z][a-z0-9]*>é mais confiável.

Podemos usar <\w+>ou precisamos <[a-z][a-z0-9]*>?

Na vida real, ambas as variantes são aceitáveis. Depende de quão tolerantes podemos ser com partidas “extras” e se é difícil ou não removê-las do resultado por outros meios.

*/