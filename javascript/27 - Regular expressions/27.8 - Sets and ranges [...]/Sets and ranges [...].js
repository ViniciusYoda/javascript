/*

Conjuntos e intervalos [...]
Vários caracteres ou classes de caracteres entre colchetes […]significam “procurar qualquer caractere entre os dados”.

Conjuntos
Por exemplo, [eao]significa qualquer um dos 3 caracteres: 'a', 'e', ou 'o'.

Isso é chamado de conjunto . Os conjuntos podem ser usados ​​em um regexp junto com caracteres regulares:

// find [t or m], and then "op"
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
Observe que, embora haja vários caracteres no conjunto, eles correspondem a exatamente um personagem na correspondência.

Portanto, o exemplo abaixo não fornece correspondências:

// find "V", then [o or i], then "la"
alert( "Voila".match(/V[oi]la/) ); // null, no matches
O padrão procura por:

V,
então uma das letras [oi],
então la.
Portanto, haveria uma correspondência para Volaou Vila.

Gamas
Colchetes também podem conter intervalos de caracteres .

Por exemplo, [a-z]é um caractere no intervalo de aa z, e [0-5]é um dígito de 0a 5.

No exemplo abaixo, estamos procurando "x"seguido por dois dígitos ou letras de Aa F:

alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
Aqui [0-9A-F]tem dois intervalos: procura por um caractere que seja um dígito de 0a 9ou uma letra de Aa F.

Se também quisermos procurar letras minúsculas, podemos adicionar o intervalo a-f: [0-9A-Fa-f]. Ou adicione a bandeira i.

Também podemos usar classes de caracteres dentro de […].

Por exemplo, se quisermos procurar um caractere de palavras \wou um hífen -, o conjunto será [\w-].

A combinação de várias classes também é possível, por exemplo, [\s\d]significa “um caractere de espaço ou um dígito”.

Classes de caracteres são abreviações para certos conjuntos de caracteres
Por exemplo:

\d – é o mesmo que [0-9],
\w – é o mesmo que [a-zA-Z0-9_],
\s – é o mesmo que [\t\n\v\f\r ], mais alguns outros caracteres de espaço Unicode raros.
Exemplo: multilíngue \w
Como a classe de caracteres \wé uma abreviação de [a-zA-Z0-9_], ela não consegue encontrar hieróglifos chineses, letras cirílicas, etc.

Podemos escrever um padrão mais universal, que procura por caracteres verbais em qualquer idioma. Isso é fácil com propriedades Unicode: [\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}].

Vamos decifrá-lo. Semelhante a \w, estamos fazendo um conjunto próprio que inclui caracteres com as seguintes propriedades Unicode:

Alphabetic( Alpha) – para letras,
Mark( M) – para acentos,
Decimal_Number( Nd) – para dígitos,
Connector_Punctuation( Pc) – para o sublinhado '_'e caracteres semelhantes,
Join_Control( Join_C) – dois códigos especiais 200ce 200d, usados ​​em ligaduras, por exemplo, em árabe.
Um exemplo de uso:

let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let str = `Hi 你好 12`;

// finds all letters and digits:
alert( str.match(regexp) ); // H,i,你,好,1,2
Claro, podemos editar esse padrão: adicionar propriedades Unicode ou removê-las. As propriedades Unicode são abordadas com mais detalhes no artigo Unicode: flag "u" and class \p{...} .

Propriedades Unicode não são suportadas no IE
Propriedades Unicode p{…}não são implementadas no IE. Se realmente precisarmos deles, podemos usar a biblioteca XRegExp .

Ou apenas use intervalos de caracteres em um idioma que nos interesse, por exemplo, [а-я]para letras cirílicas.

Excluindo intervalos
Além dos intervalos normais, existem intervalos “excluindo” que se parecem com [^…].

Eles são indicados por um caractere circunflexo ^no início e correspondem a qualquer caractere, exceto os dados .

Por exemplo:

[^aeyo]– qualquer caractere exceto 'a', 'e', 'y'ou 'o'.
[^0-9]– qualquer caractere exceto um dígito, o mesmo que \D.
[^\s]– qualquer caractere que não seja espaço, igual a \S.
O exemplo abaixo procura quaisquer caracteres, exceto letras, dígitos e espaços:

alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ and .
Fuga em […]
Normalmente, quando queremos encontrar exatamente um caractere especial, precisamos escapá-lo como \.. E se precisarmos de uma barra invertida, usamos \\, e assim por diante.

Entre colchetes podemos usar a grande maioria dos caracteres especiais sem escape:

Símbolos . + ( )nunca precisam escapar.
Um hífen -não é escapado no início ou no final (onde não define um intervalo).
Um acento circunflexo ^só é escapado no começo (onde significa exclusão).
O colchete de fechamento ]é sempre escapado (se precisarmos procurar por esse símbolo).
Em outras palavras, todos os caracteres especiais são permitidos sem escape, exceto quando significam algo entre colchetes.

Um ponto .entre colchetes significa apenas um ponto. O padrão [.,]procuraria um dos caracteres: um ponto ou uma vírgula.

No exemplo abaixo a regexp [-().^+]procura por um dos caracteres -().^+:

// No need to escape
let regexp = /[-().^+]/g;

alert( "1 + 2 - 3".match(regexp) ); // Matches +, -
…Mas se você decidir escapar deles “por via das dúvidas”, então não haverá mal algum:

// Escaped everything
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // also works: +, -
Intervalos e sinalizador “u”
Se houver pares substitutos no conjunto, o sinalizador userá necessário para que funcionem corretamente.

Por exemplo, vamos procurar [𝒳𝒴]na string 𝒳:

alert( '𝒳'.match(/[𝒳𝒴]/) ); // shows a strange character, like [?]
// (the search was performed incorrectly, half-character returned)
O resultado está incorreto porque, por padrão, as expressões regulares “não sabem” sobre pares substitutos.

O mecanismo de expressão regular pensa que [𝒳𝒴]– não são dois, mas quatro caracteres:

metade esquerda de 𝒳 (1),
metade direita de 𝒳 (2),
metade esquerda de 𝒴 (3),
metade direita de 𝒴 (4).
Podemos ver seus códigos assim:

for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
Portanto, o exemplo acima localiza e mostra a metade esquerda de 𝒳.

Se adicionarmos flag u, o comportamento será correto:

alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
A situação semelhante ocorre ao procurar um intervalo, como [𝒳-𝒴].

Se esquecermos de adicionar flag u, haverá um erro:

'𝒳'.match(/[𝒳-𝒴]/); // Error: Invalid regular expression
O motivo é que, sem sinalizador, uos pares substitutos são percebidos como dois caracteres, portanto [𝒳-𝒴], são interpretados como [<55349><56499>-<55349><56500>](cada par substituto é substituído por seus códigos). Agora é fácil ver que o intervalo 56499-55349é inválido: seu código inicial 56499é maior que o final 55349. Essa é a razão formal do erro.

Com a bandeira uo padrão funciona corretamente:

// look for characters from 𝒳 to 𝒵
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴

*/

