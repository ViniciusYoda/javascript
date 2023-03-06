/*

Unicode: sinalizador "u" e classe \p{...}
JavaScript usa codificação Unicode para strings. A maioria dos caracteres são codificados com 2 bytes, mas isso permite representar no máximo 65536 caracteres.

Esse intervalo não é grande o suficiente para codificar todos os caracteres possíveis, por isso alguns caracteres raros são codificados com 4 bytes, por exemplo, como 𝒳(X matemático) ou 😄(um sorriso), alguns hieróglifos e assim por diante.

Aqui estão os valores Unicode de alguns caracteres:

Personagem	Unicode	Contagem de bytes em Unicode
a	0x0061	2
≈	0x2248	2
𝒳	0x1d4b3	4
𝒴	0x1d4b4	4
😄	0x1f604	4
Assim, caracteres como ae ≈ocupam 2 bytes, enquanto os códigos para 𝒳, 𝒴e 😄são mais longos, possuem 4 bytes.

Há muito tempo, quando a linguagem JavaScript foi criada, a codificação Unicode era mais simples: não havia caracteres de 4 bytes. Portanto, alguns recursos de linguagem ainda os manipulam incorretamente.

Por exemplo, lengthpensa que aqui estão dois personagens:

alert('😄'.length); // 2
alert('𝒳'.length); // 2
…Mas a gente vê que só tem um, né? O ponto é que lengthtrata 4 bytes como dois caracteres de 2 bytes. Isso é incorreto, porque eles devem ser considerados apenas juntos (os chamados “par substituto”, você pode ler sobre eles no artigo Strings ).

Por padrão, as expressões regulares também tratam “caracteres longos” de 4 bytes como um par de caracteres de 2 bytes. E, como acontece com as cordas, isso pode levar a resultados estranhos. Veremos isso um pouco mais adiante, no artigo Conjuntos e intervalos [...] .

Ao contrário das strings, as expressões regulares possuem sinalizadores uque corrigem esses problemas. Com esse sinalizador, um regexp lida com caracteres de 4 bytes corretamente. E também a pesquisa de propriedade Unicode se torna disponível, veremos a seguir.

Propriedades Unicode \p{…}
Cada caractere em Unicode tem muitas propriedades. Eles descrevem a que “categoria” o personagem pertence, contêm diversas informações sobre ele.

Por exemplo, se um caractere possui Letterpropriedade, significa que o caractere pertence a um alfabeto (de qualquer idioma). E Numberpropriedade significa que é um dígito: talvez árabe ou chinês, e assim por diante.

Podemos procurar caracteres com uma propriedade, escrita como \p{…}. Para usar \p{…}, uma expressão regular deve ter flag u.

Por exemplo, \p{Letter}denota uma letra em qualquer idioma. Também podemos usar \p{L}, pois Lé um alias de Letter. Existem aliases mais curtos para quase todas as propriedades.

No exemplo abaixo serão encontrados três tipos de letras: inglês, georgiano e coreano.

let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (no matches, \p doesn't work without the flag "u")
Aqui estão as principais categorias de personagens e suas subcategorias:

Carta L:
minúsculasLl
modificador Lm,
caixa de título Lt,
maiúsculo Lu,
outro Lo.
Número N:
dígito decimal Nd,
número da letra Nl,
outro No.
Pontuação P:
conector Pc,
travessão Pd,
citação inicial Pi,
citação final Pf,
aberto Ps,
fechar Pe,
outro Po.
Marca M(acentos etc):
combinação de espaçamento Mc,
encerrando Me,
sem espaçamento Mn.
Símbolo S:
moeda Sc,
modificador Sk,
matemática Sm,
outro So.
Separador Z:
linha Zl,
parágrafo Zp,
espaço Zs.
Outro C:
controle Cc,
formato Cf,
não atribuído Cn,
uso privado Co,
substituto Cs.
Assim, por exemplo, se precisarmos de letras minúsculas, podemos escrever \p{Ll}, sinais de pontuação: \p{P}e assim por diante.

Existem também outras categorias derivadas, como:

Alphabetic( Alpha), inclui letras L, mais números de letras Nl(por exemplo, Ⅻ – um caractere para o número romano 12), mais alguns outros símbolos Other_Alphabetic( OAlpha).
Hex_Digitinclui dígitos hexadecimais: 0-9, a-f.
…E assim por diante.
O Unicode suporta muitas propriedades diferentes, sua lista completa exigiria muito espaço, então aqui estão as referências:

Liste todas as propriedades por um caractere: https://unicode.org/cldr/utility/character.jsp .
Liste todos os caracteres por uma propriedade: https://unicode.org/cldr/utility/list-unicodeset.jsp .
Aliases curtos para propriedades: https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt .
Uma base completa de caracteres Unicode em formato de texto, com todas as propriedades, está aqui: https://www.unicode.org/Public/UCD/latest/ucd/ .
Exemplo: números hexadecimais
Por exemplo, vamos procurar por números hexadecimais, escritos como xFF, onde Fé um dígito hexadecimal (0…9 ou A…F).

Um dígito hexadecimal pode ser denotado como \p{Hex_Digit}:

let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

alert("number: xAF".match(regexp)); // xAF
Exemplo: hieróglifos chineses
Vamos procurar hieróglifos chineses.

Existe uma propriedade Unicode Script(um sistema de escrita), que pode ter um valor: Cyrillic, Greek, Arabic, Han(chinês) e assim por diante, aqui está a lista completa .

Para procurar caracteres em um determinado sistema de escrita, devemos usar Script=<value>, por exemplo, para letras cirílicas: \p{sc=Cyrillic}, para hieróglifos chineses: \p{sc=Han}, e assim por diante:

let regexp = /\p{sc=Han}/gu; // returns Chinese hieroglyphs

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
Exemplo: moeda
Os caracteres que denotam uma moeda, como $, €, ¥, têm a propriedade Unicode \p{Currency_Symbol}, o alias curto: \p{Sc}.

Vamos usá-lo para procurar preços no formato “moeda, seguido de um dígito”:

let regexp = /\p{Sc}\d/gu;

let str = `Prices: $2, €1, ¥9`;

alert( str.match(regexp) ); // $2,€1,¥9
Mais adiante, no artigo Quantificadores +, *, ? e {n} veremos como procurar números que contenham muitos dígitos.

Resumo
Flag uhabilita o suporte de Unicode em expressões regulares.

Isso significa duas coisas:

Caracteres de 4 bytes são tratados corretamente: como um único caractere, não dois caracteres de 2 bytes.
As propriedades Unicode podem ser usadas na pesquisa: \p{…}.
Com as propriedades Unicode, podemos procurar palavras em determinados idiomas, caracteres especiais (aspas, moedas) e assim por diante.

*/