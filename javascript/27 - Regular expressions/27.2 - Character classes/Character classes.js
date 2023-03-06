/*

classes de personagens
Considere uma tarefa prática – temos um número de telefone como "+7(903)-123-45-67", e precisamos transformá-lo em números puros: 79031234567.

Para fazer isso, podemos encontrar e remover qualquer coisa que não seja um número. As classes de personagens podem ajudar nisso.

Uma classe de caracteres é uma notação especial que corresponde a qualquer símbolo de um determinado conjunto.

Para começar, vamos explorar a classe “dígito”. É escrito como \de corresponde a “qualquer único dígito”.

Por exemplo, vamos encontrar o primeiro dígito no número de telefone:

let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
Sem o sinalizador g, a expressão regular procura apenas a primeira correspondência, ou seja, o primeiro dígito \d.

Vamos adicionar o gsinalizador para encontrar todos os dígitos:

let str = "+7(903)-123-45-67";

let regexp = /\d/g;

alert( str.match(regexp) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

// let's make the digits-only phone number of them:
alert( str.match(regexp).join('') ); // 79031234567
Essa foi uma classe de caracteres para dígitos. Existem outras classes de personagens também.

Os mais usados ​​são:

\d(“d” é de “dígito”)
Um dígito: um caractere de 0a 9.
\s(“s” é de “espaço”)
Um símbolo de espaço: inclui espaços, tabulações \t, novas linhas \ne alguns outros caracteres raros, como \v, \fe \r.
\w(“w” vem de “palavra”)
Um caractere “verbal”: uma letra do alfabeto latino ou um dígito ou um sublinhado _. Letras não latinas (como cirílico ou hindi) não pertencem a \w.
Por exemplo, \d\s\wsignifica um “dígito” seguido por um “caractere de espaço” seguido por um “caractere verbal”, como 1 a.

Um regexp pode conter símbolos regulares e classes de caracteres.

Por exemplo, CSS\dcorresponde a uma string CSScom um dígito após ela:

let str = "Is there CSS4?";
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
Também podemos usar muitas classes de personagens:

alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
A correspondência (cada classe de caractere regexp tem o caractere de resultado correspondente):


classes inversas
Para cada classe de caracteres existe uma “classe inversa”, denotada com a mesma letra, mas em caixa alta.

O “inverso” significa que corresponde a todos os outros caracteres, por exemplo:

\D
Não dígito: qualquer caractere exceto \d, por exemplo, uma letra.
\S
Sem espaço: qualquer caractere exceto \s, por exemplo, uma letra.
\W
Caractere não verbal: qualquer coisa menos \w, por exemplo, uma letra não latina ou um espaço.
No início do capítulo, vimos como criar um número de telefone somente numérico a partir de uma string como +7(903)-123-45-67: encontre todos os dígitos e junte-os.

let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
Uma maneira alternativa e mais curta é encontrar não dígitos \De removê-los da string:

let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
Um ponto é “qualquer caractere”
Um ponto .é uma classe de caractere especial que corresponde a “qualquer caractere, exceto uma nova linha”.

Por exemplo:

alert( "Z".match(/./) ); // Z
Ou no meio de um regexp:

let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
alert( "CS 4".match(regexp) ); // CS 4 (space is also a character)
Observe que um ponto significa “qualquer caractere”, mas não a “ausência de um caractere”. Deve haver um caractere correspondente:

alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot
Ponto como literalmente qualquer caractere com sinalizador “s”
Por padrão, um ponto não corresponde ao caractere de nova linha \n.

Por exemplo, o regexp A.Bcorresponde a A, e então Bcom qualquer caractere entre eles, exceto uma nova linha \n:

alert( "A\nB".match(/A.B/) ); // null (no match)
Há muitas situações em que gostaríamos que um ponto significasse literalmente “qualquer caractere”, incluindo a quebra de linha.

Isso é o que a bandeira sfaz. Se um regexp o tiver, um ponto .corresponde literalmente a qualquer caractere:

alert( "A\nB".match(/A.B/s) ); // A\nB (match!)
Não suportado no IE
A sbandeira não é suportada no IE.

Felizmente, existe uma alternativa que funciona em qualquer lugar. Podemos usar um regexp como [\s\S]para corresponder a “qualquer caractere” (esse padrão será abordado no artigo Conjuntos e intervalos [...] ).

alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (match!)
O padrão [\s\S]diz literalmente: “um caractere de espaço OU não um caractere de espaço”. Em outras palavras, “qualquer coisa”. Poderíamos usar outro par de classes complementares, como [\d\D], isso não importa. Ou mesmo o [^]- como significa corresponder a qualquer caractere, exceto nada.

Também podemos usar esse truque se quisermos os dois tipos de “pontos” no mesmo padrão: o ponto real .se comportando da maneira normal (“sem incluir uma nova linha”) e também uma maneira de combinar “qualquer caractere” com [\s\S]ou semelhante.

Preste atenção aos espaços
Normalmente damos pouca atenção aos espaços. Para nós, strings 1-5e 1 - 5são quase idênticos.

Mas se um regexp não levar em conta os espaços, pode não funcionar.

Vamos tentar encontrar dígitos separados por um hífen:

alert( "1 - 5".match(/\d-\d/) ); // null, no match!
Vamos corrigi-lo adicionando espaços no regexp \d - \d:

alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
// or we can use \s class:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, also works
Um espaço é um caractere. Igual em importância a qualquer outro personagem.

Não podemos adicionar ou remover espaços de uma expressão regular e esperar que funcione da mesma forma.

Em outras palavras, em uma expressão regular, todos os caracteres são importantes, espaços também.

Resumo
Existem as seguintes classes de personagens:

\d– dígitos.
\D– não dígitos.
\s– símbolos de espaço, tabulações, novas linhas.
\S– todos menos \s.
\w– Letras latinas, dígitos, sublinhado '_'.
\W– todos menos \w.
.– qualquer caractere se com o 's'sinalizador regexp, caso contrário, qualquer, exceto uma nova linha \n.
…Mas isso não é tudo!

A codificação Unicode, usada pelo JavaScript para strings, fornece muitas propriedades para os caracteres, como: a qual idioma a letra pertence (se for uma letra), é um sinal de pontuação, etc.

Podemos pesquisar por essas propriedades também. Isso requer flag u, abordado no próximo artigo.

*/