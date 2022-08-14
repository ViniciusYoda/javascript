/*

Números
No JavaScript moderno, existem dois tipos de números:

Números regulares em JavaScript são armazenados no formato de 64 bits IEEE-754 , também conhecido como “números de ponto flutuante de precisão dupla”. Esses são os números que estamos usando na maioria das vezes, e falaremos sobre eles neste capítulo.

Os números BigInt representam inteiros de comprimento arbitrário. Às vezes, eles são necessários porque um número inteiro regular não pode exceder ou ser menor que , como mencionamos anteriormente no capítulo Tipos de dados . Como bigints são usados ​​em poucas áreas especiais, dedicamos a eles um capítulo especial BigInt .(253-1)-(253-1)

Então aqui vamos falar sobre números regulares. Vamos expandir nosso conhecimento sobre eles.

Mais maneiras de escrever um número
Imagine que precisamos escrever 1 bilhão. A maneira óbvia é:

*/

let billion = 1000000000;

// Também podemos usar sublinhado _como separador:

let billion = 1_000_000_000;

/*

Aqui o sublinhado _faz o papel do “ açúcar sintático ”, torna o número mais legível. O mecanismo JavaScript simplesmente ignora _entre os dígitos, então é exatamente o mesmo bilhão acima.

Na vida real, porém, tentamos evitar escrever longas sequências de zeros. Somos muito preguiçosos para isso. Tentaremos escrever algo como "1bn"um bilhão ou "7.3bn"7 bilhões e 300 milhões. O mesmo vale para a maioria dos números grandes.

Em JavaScript, podemos encurtar um número anexando a letra "e"a ele e especificando a contagem de zeros:

*/

let billion = 1e9; // 1 billion, literally: 1 and 9 zeroes

alert( 7.3e9 ); // 7.3 billion (same as 7300000000 or 7_300_000_000)

// Em outras palavras, emultiplica o número por 1com a contagem de zeros fornecida.

1e2 === 1 * 1000; // e3 means *1000;
1.23e6 === 1.23 * 1000000; // e6 means *1000000

// Em outras palavras, emultiplica o número por 1com a contagem de zeros fornecida.

let mcs = 0.000001;

// Assim como antes, o uso "e"pode ajudar. Se quisermos evitar escrever os zeros explicitamente, poderíamos escrever o mesmo que:

let mcs = 1e-6; // five zeroes to the left from 1

/*

Se contarmos os zeros em 0.000001, há 6 deles. Então naturalmente é 1e-6.

Em outras palavras, um número negativo depois "e"significa uma divisão por 1 com o número dado de zeros:

*/

// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001

// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times

/*

Números hexadecimais, binários e octais
Os números hexadecimais são amplamente usados ​​em JavaScript para representar cores, codificar caracteres e muitas outras coisas. Então, naturalmente, existe uma maneira mais curta de escrevê-los: 0xe depois o número.

Por exemplo:

*/

alert( 0xff ); // 255
alert( 0xFF ); // 255 (the same, case doesn´t matter)

// Os sistemas de numeração binário e octal raramente são usados, mas também são suportados usando os prefixos 0be :0o

let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of 255

alert( a == b ); // true, the same number 255 at both sides

/*

Existem apenas 3 sistemas numéricos com esse suporte. Para outros sistemas de numeração, devemos usar a função parseInt(que veremos mais adiante neste capítulo).