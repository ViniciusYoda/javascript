/*

String

Em JavaScript, os dados textuais são armazenados como strings. Não há tipo separado para um único caractere.

O formato interno para strings é sempre UTF-16 , não está vinculado à codificação da página.

Citações
Vamos relembrar os tipos de citações.

As strings podem ser colocadas entre aspas simples, aspas duplas ou acentos graves:

*/

let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`

// Aspas simples e duplas são essencialmente as mesmas. Backticks, no entanto, nos permitem incorporar qualquer expressão na string, envolvendo-a em ${…}:

function sum(a, b){
    return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.

// Outra vantagem de usar backticks é que eles permitem que uma string se estenda por várias linhas:

let guestList = `Guests:
    * John
    * Pete
    * Mary
`;

alert(guestList); // a list of guests, multiple lines

/*

Parece natural, certo? Mas aspas simples ou duplas não funcionam dessa maneira.

Se os usarmos e tentarmos usar várias linhas, ocorrerá um erro:

*/

let guestList = "Guest: // Error: Unexpected token ILLEGAL
    * John";

/*

Aspas simples e duplas vêm desde os tempos antigos da criação de idiomas, quando a necessidade de strings de várias linhas não era levada em consideração. Backticks apareceram muito mais tarde e, portanto, são mais versáteis.

Os acentos graves também nos permitem especificar uma “função de modelo” antes do primeiro acento grave. A sintaxe é: func`string`. A função funcé chamada automaticamente, recebe a string e as expressões incorporadas e pode processá-las. Isso é chamado de “modelos marcados”. Esse recurso facilita a implementação de modelos personalizados, mas raramente é usado na prática. Você pode ler mais sobre isso no manual .

Caracteres especiais

Ainda é possível criar strings de várias linhas com aspas simples e duplas usando o chamado “caracter de nova linha”, escrito como \n, que denota uma quebra de linha:

*/

let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // a multiline list of guests 

// Por exemplo, essas duas linhas são iguais, apenas escritas de forma diferente:

let str1 = "Hello\nWorld"; // two lines using a "newline symbol"

// two lines using a normal newline and backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true

/*

Existem outros caracteres “especiais” menos comuns.

Aqui está a lista completa:

Personagem	Descrição
\n	Nova linha
\r	Nos arquivos de texto do Windows, uma combinação de dois caracteres \r\nrepresenta uma nova quebra, enquanto no sistema operacional não Windows é apenas \n. Isso é por razões históricas, a maioria dos softwares Windows também entende \n.
\', \"	Citações
\\	Barra invertida
\t	Aba
\b, \f, \v	Backspace, Form Feed, Vertical Tab – mantidos para compatibilidade, não são usados ​​hoje em dia.
\xXX	Caractere Unicode com o Unicode hexadecimal fornecido XX, por exemplo, '\x7A'é o mesmo que 'z'.
\uXXXX	Um símbolo Unicode com o código hexadecimal XXXXna codificação UTF-16, por exemplo \u00A9– é um Unicode para o símbolo de copyright ©. Deve ter exatamente 4 dígitos hexadecimais.
\u{X…XXXXXX}(1 a 6 caracteres hexadecimais)	Um símbolo Unicode com a codificação UTF-32 fornecida. Alguns caracteres raros são codificados com dois símbolos Unicode, ocupando 4 bytes. Desta forma podemos inserir códigos longos.
Exemplos com Unicode:

*/

alert( "\U00a9" ); // ©
alert( "\u{20331}" ); // 佫, a rare Chinese hieroglyph (long Unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)

/*

Todos os caracteres especiais começam com um caractere de barra invertida \. Também é chamado de “personagem de fuga”.

Também podemos usá-lo se quisermos inserir uma citação na string.

Por exemplo:

*/

alert( 'I\´m the the Walrus!' ); // I´m the Walrus!

/*

Como você pode ver, temos que preceder a aspa interna com a barra invertida \', pois caso contrário isso indicaria o final da string.

Obviamente, apenas as aspas que são as mesmas que as anexas precisam ser ignoradas. Então, como uma solução mais elegante, poderíamos mudar para aspas duplas ou acentos graves:

*/

alert( `i´m the Walrus!` ); // I´m the Walrus!

/*

Observe que a barra invertida \serve para a leitura correta da string por JavaScript, depois desaparece. A string na memória não tem \. Você pode ver isso claramente nos alertexemplos acima.

Mas e se precisarmos mostrar uma barra invertida real \dentro da string?

Isso é possível, mas precisamos dobrá-lo como \\:

*/

alert( `The backslash: \\` ); // The backslash: \

/*

Comprimento da string
A lengthpropriedade tem o comprimento da string:

*/

alert( `My\n`.length ); // 3

/*

Observe que \né um único caractere “especial”, portanto, o comprimento é de fato 3.

lengthé uma propriedade
Pessoas com experiência em alguns outros idiomas às vezes digitam incorretamente chamando str.length()em vez de apenas str.length. Isso não funciona.

Observe que str.lengthé uma propriedade numérica, não uma função. Não há necessidade de adicionar parênteses depois dele.

Acessando caracteres
Para obter um caractere em position pos, use colchetes [pos]ou chame o método str.charAt(pos) . O primeiro caractere começa na posição zero:

*/

let str = `Hello`;

// the first character
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// the last character
alert( str[str.length - 1] ); // 0

/*

Os colchetes são uma maneira moderna de obter um personagem, embora charAtexistam principalmente por razões históricas.

A única diferença entre eles é que se nenhum caractere for encontrado, []retorna undefinede charAtretorna uma string vazia:

*/

let str = `Hello`; 

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (an empty string)

// Também podemos iterar sobre caracteres usando for..of:

for (let char of "Hello") {
    alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
}

/*

Strings são imutáveis
Strings não podem ser alteradas em JavaScript. É impossível mudar um personagem.

Vamos tentar para mostrar que não funciona:

*/

let str = 'Hi';

str[0] = 'h'; // error
alert( str[0] ); // doesn´t work

/*

A solução usual é criar uma string totalmente nova e atribuí-la em strvez da antiga.

Por exemplo:

*/

let str = 'Hi';

str = 'h' + str[1]; // replace the string

alert( str ); // hi

/*

Nas seções a seguir, veremos mais exemplos disso.

Mudando o caso
Os métodos toLowerCase() e toUpperCase() alteram o caso:

*/

alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface

// Ou, se quisermos um único caractere em minúsculas:

alert( 'Interface'[0].toLoweCase() ); // 'i'

/*

Procurando uma substring
Existem várias maneiras de procurar uma substring dentro de uma string.

str.indexOf
O primeiro método é str.indexOf(substr, pos) .

Ele procura o substrin str, a partir da posição especificada pos, e retorna a posição em que a correspondência foi encontrada ou -1se nada pode ser encontrado.

Por exemplo:

*/

let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning
alert( str.indexOf('widget') ); // -1, not found, the search is case-sensitive

alert( str.indexOf("id") ); // 1, "id" is found at the position 1 (..idget with id)

/*

O segundo parâmetro opcional nos permite iniciar a busca a partir de uma determinada posição.

Por exemplo, a primeira ocorrência de "id"está na posição 1. Para procurar a próxima ocorrência, vamos iniciar a pesquisa a partir de position 2:

*/

let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12

// Se estivermos interessados ​​em todas as ocorrências, podemos executar indexOfem um loop. Cada nova chamada é feita com a posição após a partida anterior:

let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // let´s look for it

let pos = 0;
while (true) {
    let foundPos = str.indexOf(target, pos);
    if (foundPos == -1) break;

    alert( `Found at ${foundPos}`);
    pos = foundPos + 1; // continue the search from the next position
}

// O mesmo algoritmo pode ser apresentado mais curto:

let str = "As sly as a fox, as strong as an ox";
let target = "as";

let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
    alert( pos );
}

/*

str.lastIndexOf(substr, position)
Há também um método semelhante str.lastIndexOf(substr, position) que pesquisa do final de uma string até seu início.

Ele listaria as ocorrências na ordem inversa.

Há um pequeno inconveniente indexOfno ifteste. Não podemos colocar ifassim:

*/

let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // doesn´t work!
}

/*

O alertno exemplo acima não aparece porque str.indexOf("Widget")retorna 0(o que significa que encontrou a correspondência na posição inicial). Certo, mas ifconsidera 0ser false.

Então, devemos realmente verificar -1, assim:

*/

let str = "Widget with id";

if (str.indexOf("Widget") != -1) {
    alert("We found it"); // works now!
}

/*

O truque NÃO bit a bit
Um dos truques antigos usados ​​aqui é o operador NOT bit a bit. ~Ele converte o número em um inteiro de 32 bits (remove a parte decimal se existir) e depois inverte todos os bits em sua representação binária.

Na prática, isso significa uma coisa simples: para inteiros de 32 bits ~né igual a -(n+1).

Por exemplo:

*/

alert( ~2 ); // -3, the same as -(2+1)
alert( ~1 ); // -2, the same as -(1+1)
alert( ~0 ); // -1, the same as -(0+1)
alert( ~-1 ); // 0, the same as -(-1+1)

/*

Como podemos ver, ~né zero somente se n == -1(isso é para qualquer inteiro com sinal de 32 bits n).

Portanto, o teste if ( ~str.indexOf("...") )é verdadeiro somente se o resultado de indexOfnão for -1. Em outras palavras, quando há uma correspondência.

As pessoas o usam para encurtar indexOfcheques:

*/

let str = "Widget";

if (~str.indexOF("Widget")) {
    alert( 'Found it!' ); works
}

/*

Geralmente não é recomendado usar recursos de linguagem de uma maneira não óbvia, mas esse truque em particular é amplamente usado em código antigo, então devemos entendê-lo.

Apenas lembre-se: if (~str.indexOf(...))lê como “se encontrado”.

Para ser preciso, porém, como os números grandes são truncados para 32 bits pelo ~operador, existem outros números que dão 0, o menor é ~4294967295=0. Isso torna essa verificação correta apenas se uma string não for tão longa.

No momento, podemos ver esse truque apenas no código antigo, pois o JavaScript moderno fornece o .includesmétodo (veja abaixo).

inclui, começa com, termina com
O método mais moderno str.includes(substr, pos) retorna true/falsedependendo se strcontém substrdentro.

É a escolha certa se precisamos testar para a partida, mas não precisamos de sua posição:

*/

alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false

// O segundo argumento opcional de str.includesé a posição para iniciar a pesquisa:

alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"

// Os métodos str.startsWith e str.endsWith fazem exatamente o que dizem:

alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"

/*

Obtendo uma substring
Existem 3 métodos em JavaScript para obter uma substring: substring, substre slice.

str.slice(start [, end])
Retorna a parte da string de startto (mas não incluindo) end.

Por exemplo:

*/

let str = "stringify";
alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0

// Se não houver um segundo argumento, então slicevai até o final da string:

let str = "stringify";
alert( str.slice(2) ); // 'ringify', from the 2nd position till the end

// Valores negativos para start/endtambém são possíveis. Eles significam que a posição é contada a partir do final da string:

let str = "stringify";

// start at the 4th position from the right, end at the 1st from the right
alert( str.slice(-4, -1) ); // 'gif'

/*

str.substring(start [, end])
Retorna a parte da string entre start e end.

Isso é quase o mesmo que slice, mas permite startser maior que end.

Por exemplo:

*/

let str = "stringify";

// these are same for substring
alert( str.substring(2, 6) ); // "ring"
alert( str.substring(6, 2) ); // "ring"

// ...but not for slice:
alert( str.slice(2, 6) ); // "ring" (the same)
alert( str.slice(6, 2) ); // "" (an empty string)

/*

Argumentos negativos (ao contrário de slice) não são suportados, eles são tratados como 0.

str.substr(start [, length])
Retorna a parte da string de start, com o dado length.

Em contraste com os métodos anteriores, este nos permite especificar a lengthposição final em vez da:

*/

let str = "stringify";
alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters

// O primeiro argumento pode ser negativo, para contar a partir do final:

let str = "stringify";
alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters

/*

Este método encontra-se no Anexo B da especificação da linguagem. Isso significa que apenas os mecanismos Javascript hospedados no navegador devem suportá-lo e não é recomendado usá-lo. Na prática, é suportado em todos os lugares.

Vamos recapitular esses métodos para evitar qualquer confusão:

método	Selecione% s…	negativos
slice(start, end)	de startpara end(não incluindo end)	permite negativos
substring(start, end)	entre starteend	valores negativos significam0
substr(start, length)	de startobter lengthpersonagens	permite negativostart
Qual escolher?
Todos eles podem fazer o trabalho. Formalmente, substrtem uma pequena desvantagem: é descrito não na especificação principal do JavaScript, mas no Anexo B, que abrange recursos somente do navegador que existem principalmente por razões históricas. Portanto, ambientes sem navegador podem não oferecer suporte a ele. Mas, na prática, funciona em todos os lugares.

Das outras duas variantes, sliceé um pouco mais flexível, permite argumentos negativos e mais curto para escrever. Então, basta lembrar apenas slicedesses três métodos.

Comparando strings
Como sabemos do capítulo Comparações , as strings são comparadas caractere por caractere em ordem alfabética.

Embora, existem algumas esquisitices.

1. Uma letra minúscula é sempre maior que a maiúscula:

*/

alert( 'a' > 'Z' ); // true

// 2. Letras com sinais diacríticos estão “fora de ordem”:

alert(  'Österreich' > 'Zealand' ); // true

/*

Isso pode levar a resultados estranhos se classificarmos esses nomes de países. Normalmente as pessoas esperariam Zealandvir depois Österreichna lista.

Para entender o que acontece, vamos revisar a representação interna de strings em JavaScript.

Todas as strings são codificadas usando UTF-16 . Ou seja: cada caractere possui um código numérico correspondente. Existem métodos especiais que permitem obter o caractere para o código e voltar.

str.codePointAt(pos)
Retorna o código do caractere na posição pos:

*/

// different case letter have different codes
alert( "z".codePointAt(0) ); // 122
alert( "Z".codePointAt(0) ); // 90

/*

String.fromCodePoint(code)
Cria um caractere por seu numéricocode

*/

alert( String.fromCodePoint(90) ); // Z

/*

Também podemos adicionar caracteres Unicode por seus códigos usando \useguido do código hexadecimal:

*/

// 90 is 5a in hecadecimal system
alert( '\u005a' ); // Z

// Agora vamos ver os caracteres com códigos 65..220(o alfabeto latino e um pouco mais) fazendo uma string deles:

let str = '';

for (let i = 65; i <= 220; i++) {
    str += String.fromCodePoint(i);
}
alert( str ); 
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ

/*

Ver? Os caracteres maiúsculos vão primeiro, depois alguns especiais, depois os caracteres minúsculos e Öperto do final da saída.

Agora fica óbvio o porquê a > Z.

Os caracteres são comparados por seu código numérico. O código maior significa que o caractere é maior. O código para a(97) é maior que o código para Z(90).

Todas as letras minúsculas seguem as letras maiúsculas porque seus códigos são maiores.
Algumas letras como Öse destacam do alfabeto principal. Aqui, seu código é maior do que qualquer coisa ade z.

Comparações corretas
O algoritmo “certo” para fazer comparações de strings é mais complexo do que parece, porque os alfabetos são diferentes para diferentes idiomas.

Portanto, o navegador precisa conhecer o idioma para comparar.

Felizmente, todos os navegadores modernos (IE10- requer a biblioteca adicional Intl.js ) suportam o padrão de internacionalização ECMA-402 .

Ele fornece um método especial para comparar strings em diferentes idiomas, seguindo suas regras.

A chamada str.localeCompare(str2) retorna um inteiro indicando se stré menor, igual ou maior que de str2acordo com as regras do idioma:

Retorna um número negativo se strfor menor que str2.
Retorna um número positivo se strfor maior que str2.
Retorna 0se forem equivalentes.
Por exemplo:

*/

alert( 'Österreich'.localeCompare('Zealand') ); // -1

/*

Este método na verdade tem dois argumentos adicionais especificados na documentação , o que permite especificar o idioma (por padrão retirado do ambiente, a ordem das letras depende do idioma) e configurar regras adicionais como diferenciação de maiúsculas e minúsculas ou devem "a"e devem "á"ser tratados como o mesmo etc. .

Internos, Unicode
Conhecimento avançado
A seção se aprofunda nas partes internas das strings. Esse conhecimento será útil se você planeja lidar com emoji, caracteres matemáticos ou hieroglíficos raros ou outros símbolos raros.

Você pode pular a seção se não planeja apoiá-los.

Pares substitutos
Todos os caracteres usados ​​com frequência têm códigos de 2 bytes. Letras na maioria dos idiomas europeus, números e até mesmo na maioria dos hieróglifos têm uma representação de 2 bytes.

Mas 2 bytes permitem apenas 65536 combinações e isso não é suficiente para todos os símbolos possíveis. Assim, símbolos raros são codificados com um par de caracteres de 2 bytes chamados “par substituto”.

O comprimento de tais símbolos é 2:

*/

alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese hieroglyph

/*

Observe que os pares substitutos não existiam no momento em que o JavaScript foi criado e, portanto, não são processados ​​corretamente pela linguagem!

Na verdade, temos um único símbolo em cada uma das strings acima, mas lengthmostra um comprimento de 2.

String.fromCodePointe str.codePointAtsão poucos os métodos raros que lidam com pares substitutos corretamente. Eles apareceram recentemente no idioma. Antes deles, havia apenas String.fromCharCode e str.charCodeAt . Esses métodos são realmente os mesmos que fromCodePoint/codePointAt, mas não funcionam com pares substitutos.

Obter um símbolo pode ser complicado, porque os pares substitutos são tratados como dois caracteres:

*/

alert( '𝒳'[0] ); // strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair

/*

Observe que as peças do par substituto não têm significado uma sem a outra. Portanto, os alertas no exemplo acima exibem lixo.

Tecnicamente, pares substitutos também são detectáveis ​​por seus códigos: se um caractere tem o código no intervalo de 0xd800..0xdbff, então é a primeira parte do par substituto. O próximo caractere (segunda parte) deve ter o código em interval 0xdc00..0xdfff. Esses intervalos são reservados exclusivamente para pares substitutos pelo padrão.

No caso acima:

*/

// charCodeAt is not surrogate-pair aware, so it gives codes for parts


alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, between 0xd800 and 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, between 0xdc00 and 0xdfff

/*

Você encontrará mais maneiras de lidar com pares substitutos posteriormente no capítulo Iterables . Provavelmente existem bibliotecas especiais para isso também, mas nada famoso o suficiente para sugerir aqui.

Marcas diacríticas e normalização
Em muitos idiomas, existem símbolos compostos pelo caractere base com uma marca acima/abaixo.

Por exemplo, a letra apode ser o caractere base para: àáâäãåā. Os caracteres “compostos” mais comuns têm seu próprio código na tabela UTF-16. Mas não todos eles, porque há muitas combinações possíveis.

Para suportar composições arbitrárias, UTF-16 nos permite usar vários caracteres Unicode: o caractere base seguido por um ou vários caracteres de “marca” que o “decoram”.

Por exemplo, se tivermos Sseguido do caractere especial “ponto acima” (código \u0307), ele será mostrado como Ṡ.

*/

alert( 'S\u0307' ); // Ṡ

/*

Se precisarmos de uma marca adicional acima da letra (ou abaixo dela) – não há problema, basta adicionar o caractere de marca necessário.

Por exemplo, se anexarmos um caractere “ponto abaixo” (código \u0323), teremos “S com pontos acima e abaixo”: Ṩ.

Por exemplo:

*/

let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)

/*

Para resolver isso, existe um algoritmo de “normalização Unicode” que traz cada string para a única forma “normal”.

Ele é implementado por str.normalize() .

*/

alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true

// É engraçado que na nossa situação normalize()realmente reúne uma sequência de 3 caracteres para um: \u1e68(S com dois pontos).

alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true

/*

Na realidade, nem sempre é assim. A razão é que o símbolo Ṩé “comum o suficiente”, então os criadores do UTF-16 o incluíram na tabela principal e deram o código.

Se você quiser aprender mais sobre regras e variantes de normalização – elas são descritas no apêndice do padrão Unicode: Unicode Normalization Forms , mas para a maioria dos propósitos práticos as informações desta seção são suficientes.

Resumo
Existem 3 tipos de cotações. Os acentos graves permitem que uma string abranja várias linhas e incorpore expressões ${…}.
Strings em JavaScript são codificadas usando UTF-16.
Podemos usar caracteres especiais como \ne inserir letras pelo Unicode usando \u....
Para obter um caractere, use: [].
Para obter uma substring, use: sliceou substring.
Para minúsculas/maiúsculas uma string, use: toLowerCase/toUpperCase.
Para procurar uma substring, use: indexOf, ou includes/startsWith/endsWithpara verificações simples.
Para comparar strings de acordo com o idioma, use: localeCompare, caso contrário, eles são comparados por códigos de caracteres.
Existem vários outros métodos úteis em strings:

str.trim()– remove os espaços (“apara”) do início e do fim da string.
str.repeat(n)– repete os tempos das cordas n.
…e muito mais pode ser encontrado no manual .
Strings também possuem métodos para pesquisar/substituir com expressões regulares. Mas esse é um grande tópico, então é explicado em uma seção separada do tutorial Expressões regulares .

*/

