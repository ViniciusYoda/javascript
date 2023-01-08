/*

Unicode, strings internas
Conhecimento avançado
A seção se aprofunda nos componentes internos das strings. Esse conhecimento será útil se você planeja lidar com emojis, caracteres matemáticos ou hieroglíficos raros ou outros símbolos raros.

Como já sabemos, as strings JavaScript são baseadas em Unicode : cada caractere é representado por uma sequência de bytes de 1 a 4 bytes.

O JavaScript nos permite inserir um caractere em uma string especificando seu código Unicode hexadecimal com uma destas três notações:

\xXX

XXdeve ter dois dígitos hexadecimais com um valor entre 00e FF, então \xXXé o caractere cujo código Unicode é XX.

Como a \xXXnotação suporta apenas dois dígitos hexadecimais, ela pode ser usada apenas para os primeiros 256 caracteres Unicode.

Esses primeiros 256 caracteres incluem o alfabeto latino, a maioria dos caracteres de sintaxe básica e alguns outros. Por exemplo, "\x7A"é o mesmo que "z"(Unicode U+007A).

*/

alert( "\x7A" ); // x
alert( "\xA9" ); // ©, the copyright symbol

/*

\uXXXX XXXXdeve ter exatamente 4 dígitos hexadecimais com o valor entre 0000e FFFF, então \uXXXXé o caractere cujo código Unicode é XXXX.

Caracteres com valores Unicode maiores que U+FFFFtambém podem ser representados com esta notação, mas, neste caso, precisaremos usar o chamado par substituto (falaremos sobre pares substitutos mais adiante neste capítulo).

*/

alert( "\u00A9" ); // ©, the same as \xA9, using the 4-digit hex notation
alert( "\u044F" ); // я, the Cyrillic alphabet letter
alert( "\u2191" ); // ↑, the arrow up symbol

/*

\u{X…XXXXXX}

X…XXXXXXdeve ser um valor hexadecimal de 1 a 6 bytes entre 0e 10FFFF(o ponto de código mais alto definido por Unicode). Essa notação nos permite representar facilmente todos os caracteres Unicode existentes.

*/

alert( "\u{20331}" ); // 佫, a rare Chinese character (long Unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)

/*

Pares substitutos
Todos os caracteres usados ​​com frequência possuem códigos de 2 bytes (4 dígitos hexadecimais). Letras na maioria dos idiomas europeus, números e os conjuntos ideográficos CJK unificados básicos (CJK – dos sistemas de escrita chinês, japonês e coreano) têm uma representação de 2 bytes.

Inicialmente, o JavaScript era baseado na codificação UTF-16 que permitia apenas 2 bytes por caractere. Mas 2 bytes permitem apenas 65536 combinações e isso não é suficiente para todos os símbolos possíveis do Unicode.

Assim, símbolos raros que requerem mais de 2 bytes são codificados com um par de caracteres de 2 bytes chamados “um par substituto”.

Como efeito colateral, o comprimento de tais símbolos é 2:

*/

alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese character

/*

Isso ocorre porque os pares substitutos não existiam no momento em que o JavaScript foi criado e, portanto, não são processados ​​corretamente pela linguagem!

Na verdade, temos um único símbolo em cada uma das strings acima, mas a lengthpropriedade mostra um comprimento de 2.

Obter um símbolo também pode ser complicado, porque a maioria dos recursos de linguagem trata pares substitutos como dois caracteres.

Por exemplo, aqui podemos ver dois caracteres ímpares na saída:

*/

alert( '𝒳'[0] ); // shows strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair

/*

Pedaços de um par substituto não têm significado um sem o outro. Assim, os alertas no exemplo acima, na verdade, exibem lixo.

Tecnicamente, os pares substitutos também são detectáveis ​​por seus códigos: se um caractere tem o código no intervalo de 0xd800..0xdbff, então é a primeira parte do par substituto. O próximo caractere (segunda parte) deve ter o código em interval 0xdc00..0xdfff. Esses intervalos são reservados exclusivamente para pares substitutos pelo padrão.

Assim, os métodos String.fromCodePoint e str.codePointAt foram adicionados em JavaScript para lidar com pares substitutos.

Eles são essencialmente os mesmos que String.fromCharCode e str.charCodeAt , mas tratam pares substitutos corretamente.

Pode-se ver a diferença aqui:

*/

// charCodeAt is not surrogate-pair aware, so it gives codes for the 1st part of 𝒳:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt is surrogate-pair aware
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, reads both parts of the surrogate pair

// Dito isso, se pegarmos da posição 1 (e isso é bastante incorreto aqui), ambos retornam apenas a 2ª parte do par:

alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// meaningless 2nd half of the pair

/*

Você encontrará mais maneiras de lidar com pares substitutos posteriormente no capítulo Iteráveis . Provavelmente existem bibliotecas especiais para isso também, mas nada famoso o suficiente para sugerir aqui.

Conclusão: dividir strings em um ponto arbitrário é perigoso
Não podemos simplesmente dividir uma string em uma posição arbitrária, por exemplo, pegar str.slice(0, 4)e esperar que seja uma string válida, por exemplo:

*/

alert( 'hi 😂'.slice(0, 4) ); //  hi [?]

/*

Aqui podemos ver um caractere de lixo (primeira metade do par substituto smile) na saída.

Esteja ciente disso se você pretende trabalhar de forma confiável com pares substitutos. Pode não ser um grande problema, mas pelo menos você deve entender o que acontece.

Marcas diacríticas e normalização
Em muitos idiomas, existem símbolos compostos pelo caractere base com uma marca acima/abaixo dele.

Por exemplo, a letra apode ser o caractere base para estes caracteres: àáâäãåā.

Os caracteres “compostos” mais comuns têm seu próprio código na tabela Unicode. Mas não todos, porque há muitas combinações possíveis.

Para suportar composições arbitrárias, o padrão Unicode nos permite usar vários caracteres Unicode: o caractere base seguido por um ou vários caracteres “marca” que o “decoram”.

Por exemplo, se tivermos Sseguido pelo caractere especial “ponto acima” (código \u0307), ele é mostrado como Ṡ.

*/

alert( 'S\u0307' ); // Ṡ

/*

Se precisarmos de uma marca adicional acima da letra (ou abaixo dela) – não há problema, basta adicionar o caractere de marca necessário.

Por exemplo, se acrescentarmos um caractere “ponto abaixo” (código \u0323), teremos “S com pontos acima e abaixo”: Ṩ.

Por exemplo:

*/

alert( 'S\u0307\u0323' ); // Ṩ

/*

Isso fornece grande flexibilidade, mas também um problema interessante: dois caracteres podem parecer visualmente iguais, mas serem representados com diferentes composições Unicode.

Por exemplo:

*/

let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)

/*

Para resolver isso, existe um algoritmo de “normalização Unicode” que traz cada string para a forma “normal” única.

Ele é implementado por str.normalize() .

*/

alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true

// É engraçado que na nossa situação normalize()na verdade reúne uma sequência de 3 caracteres para um: \u1e68(S com dois pontos).

alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true

/*

Na realidade, nem sempre é esse o caso. A razão é que o símbolo Ṩé “comum o suficiente”, então os criadores do Unicode o incluíram na tabela principal e forneceram o código.

Se você quiser aprender mais sobre regras e variantes de normalização – elas são descritas no apêndice do padrão Unicode: Unicode Normalization Forms , mas para fins mais práticos, as informações desta seção são suficientes.

*/

