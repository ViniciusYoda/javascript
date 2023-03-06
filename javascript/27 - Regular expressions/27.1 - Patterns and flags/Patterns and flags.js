/*

Padrões e sinalizadores
As expressões regulares são padrões que fornecem uma maneira poderosa de pesquisar e substituir no texto.

Em JavaScript, eles estão disponíveis através do objeto RegExp , além de serem integrados em métodos de strings.

Expressões regulares
Uma expressão regular (também “regexp” ou apenas “reg”) consiste em um padrão e sinalizadores opcionais .

Existem duas sintaxes que podem ser usadas para criar um objeto de expressão regular.

A sintaxe “longa”:

regexp = new RegExp("pattern", "flags");
E o “curto”, usando barras "/":

regexp = /pattern/; // no flags
regexp = /pattern/gmi; // with flags g,m and i (to be covered soon)
As barras /.../informam ao JavaScript que estamos criando uma expressão regular. Eles desempenham o mesmo papel que aspas para strings.

Em ambos os casos, regexptorna-se uma instância da classe interna RegExp.

A principal diferença entre essas duas sintaxes é que o padrão usando barras /.../não permite a inserção de expressões (como literais de modelo de string com ${...}). Eles são totalmente estáticos.

As barras são usadas quando conhecemos a expressão regular na hora de escrever o código – e essa é a situação mais comum. Embora new RegExpseja usado com mais frequência quando precisamos criar um regexp “on the fly” a partir de uma string gerada dinamicamente. Por exemplo:

let tag = prompt("What tag do you want to find?", "h2");

let regexp = new RegExp(`<${tag}>`); // same as /<h2>/ if answered "h2" in the prompt above
Bandeiras
As expressões regulares podem ter sinalizadores que afetam a pesquisa.

Existem apenas 6 deles em JavaScript:

i
Com este sinalizador, a pesquisa não diferencia maiúsculas de minúsculas: não há diferença entre Ae a(veja o exemplo abaixo).
g
Com esse sinalizador, a pesquisa procura todas as correspondências, sem ele – apenas a primeira correspondência é retornada.
m
Modo multilinha (abordado no capítulo Modo multilinha de âncoras ^ $, sinalizador "m" ).
s
Ativa o modo “dotall”, que permite que um ponto .corresponda ao caractere de nova linha \n(abordado no capítulo Classes de caracteres ).
u
Habilita o suporte completo a Unicode. O sinalizador permite o processamento correto de pares substitutos. Mais sobre isso no capítulo Unicode: flag "u" and class \p{...} .
y
Modo “Sticky”: busca na posição exata no texto (abordado no capítulo Sticky flag "y", busca na posição )
cores
A partir daqui, o esquema de cores é:

regexp -red
string (onde buscamos) –blue
resultado –green
Pesquisando: str.match
Conforme mencionado anteriormente, as expressões regulares são integradas aos métodos de string.

O método str.match(regexp)encontra todas as correspondências de regexpna string str.

Possui 3 modos de funcionamento:

Se a expressão regular tiver flag g, ela retornará uma matriz de todas as correspondências:

let str = "We will, we will rock you";

alert( str.match(/we/gi) ); // We,we (an array of 2 substrings that match)
Observe que ambos Wee wesão encontrados, porque o sinalizador itorna a expressão regular insensível a maiúsculas e minúsculas.

Se não houver tal sinalizador, ele retornará apenas a primeira correspondência na forma de uma matriz, com a correspondência completa no índice 0e alguns detalhes adicionais nas propriedades:

let str = "We will, we will rock you";

let result = str.match(/we/i); // without flag g

alert( result[0] );     // We (1st match)
alert( result.length ); // 1

// Details:
alert( result.index );  // 0 (position of the match)
alert( result.input );  // We will, we will rock you (source string)
A matriz pode ter outros índices, exceto 0se uma parte da expressão regular estiver entre parênteses. Abordaremos isso no capítulo Capturando grupos .

E, finalmente, se não houver correspondências, nullé retornado (não importa se há flag gou não).

Esta é uma nuance muito importante. Se não houver correspondências, não recebemos uma matriz vazia, mas, em vez disso, recebemos null. Esquecer disso pode levar a erros, por exemplo:

let matches = "JavaScript".match(/HTML/); // = null

if (!matches.length) { // Error: Cannot read property 'length' of null
  alert("Error in the line above");
}
Se quisermos que o resultado seja sempre um array, podemos escrevê-lo desta forma:

let matches = "JavaScript".match(/HTML/) || [];

if (!matches.length) {
  alert("No matches"); // now it works
}
Substituindo: str.replace
O método str.replace(regexp, replacement)substitui as correspondências encontradas usando regexpin string strpor replacement(todas as correspondências se houver flag g, caso contrário, apenas a primeira).

Por exemplo:

// no flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// with flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
O segundo argumento é a replacementstring. Podemos usar combinações de caracteres especiais nele para inserir fragmentos da correspondência:

Símbolos	Ação na string de substituição
$&	insere a partida inteira
$`	insere uma parte da string antes da correspondência
$'	insere uma parte da string após a correspondência
$n	se nfor um número de 1-2 dígitos, então ele insere o conteúdo do n-ésimo parênteses, mais sobre isso no capítulo Capturando grupos
$<name>	insere o conteúdo dos parênteses com o dado name, mais sobre isso no capítulo Capturando grupos
$$	insere caractere$
Um exemplo com $&:

alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
Teste: regexp.test
O método regexp.test(str)procura pelo menos uma correspondência, se encontrada, retorna true, caso contrário false.

let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
Mais adiante neste capítulo, estudaremos mais expressões regulares, percorreremos mais exemplos e também conheceremos outros métodos.

Informações completas sobre os métodos são fornecidas no artigo Métodos de RegExp e String .

Resumo
Uma expressão regular consiste em um padrão e sinalizadores opcionais: g, i, m, u, s, y.
Sem sinalizadores e símbolos especiais (que estudaremos mais adiante), a busca por uma regexp é igual a uma busca por substring.
O método str.match(regexp)procura correspondências: todas se houver gflag, caso contrário, apenas a primeira.
O método str.replace(regexp, replacement)substitui as correspondências encontradas usando regexpcom replacement: todas se houver sinalizador g, caso contrário, apenas o primeiro.
O método regexp.test(str)retorna truese houver pelo menos uma correspondência, caso contrário, ele retorna false.

*/