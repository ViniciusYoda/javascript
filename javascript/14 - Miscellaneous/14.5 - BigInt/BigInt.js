/*

BigInt
Uma adição recente
Esta é uma adição recente à linguagem. Você pode encontrar o estado atual do suporte em https://caniuse.com/#feat=bigint .
BigInté um tipo numérico especial que fornece suporte para números inteiros de comprimento arbitrário.

Um bigint é criado anexando nao final de um literal inteiro ou chamando a função BigIntque cria bigints de strings, números etc.

BigInt
Uma adição recente
Esta é uma adição recente à linguagem. Você pode encontrar o estado atual do suporte em https://caniuse.com/#feat=bigint .
BigInté um tipo numérico especial que fornece suporte para números inteiros de comprimento arbitrário.

Um bigint é criado anexando nao final de um literal inteiro ou chamando a função BigIntque cria bigints de strings, números etc.
operadores matemáticos
BigIntpode ser usado principalmente como um número regular, por exemplo:

*/

alert(1n + 2n); // 3

alert(5n / 2n); // 2

/*

Atenção: a divisão 5/2retorna o resultado arredondado para zero, sem a parte decimal. Todas as operações em bigints retornam bigints.

Não podemos misturar bigints e números regulares:

*/

alert(1n + 2); // Error: Cannot mix BigInt and other types

//Devemos convertê-los explicitamente, se necessário: usando ou BigInt()ou Number(), assim:

let bigint = 1n;
let number = 2;

// number to bigint
alert(bigint + BigInt(number)); // 3

// bigint to number
alert(Number(bigint) + number); // 3

/*

As operações de conversão são sempre silenciosas, nunca dão erros, mas se o bigint for muito grande e não couber no tipo de número, então os bits extras serão cortados, então devemos ter cuidado ao fazer essa conversão.

O plus unário não é suportado em bigints
O operador unário mais +valueé uma maneira bem conhecida de converter valueem um número.

Para evitar confusão, não é suportado em bigints:

*/

let bigint2 = 1n;

alert( +bigint2 ); // error

/*

Portanto, devemos usar Number()para converter um bigint em um número.

Comparações
Comparações, como <, >funcionam bem com bigints e números:

*/

alert( 2n > 1n ); // true

alert( 2n > 1 ); // true

// Observe, porém, como números e bigints pertencem a tipos diferentes, eles podem ser iguais ==, mas não estritamente iguais ===:

alert( 1 == 1n ); // true

alert( 1 === 1n ); // false

/*

operações booleanas
Quando dentro ifou em outras operações booleanas, os bigints se comportam como números.

Por exemplo, em if, bigint 0né false, outros valores são true:

*/

if (0n) {
   // never executes
}

// Operadores booleanos, como ||, &&e outros também trabalham com bigints semelhantes a números:

alert( 1n || 2 ); // 1 (1n is considered truthy)

alert( 0n || 2 ); // 2 (0n is considered falsy)

/*

Polyfills
Polyfilling bigints é complicado. O motivo é que muitos operadores JavaScript, como +, -e assim por diante, se comportam de maneira diferente com bigints em comparação com números regulares.

Por exemplo, a divisão de bigints sempre retorna um bigint (arredondado se necessário).

Para emular tal comportamento, um polyfill precisaria analisar o código e substituir todos esses operadores por suas funções. Mas fazer isso é complicado e custaria muito desempenho.

Portanto, não há nenhum polyfill bom e conhecido.

Embora, o contrário seja proposto pelos desenvolvedores da biblioteca JSBI .

Esta biblioteca implementa grandes números usando seus próprios métodos. Podemos usá-los em vez de bigints nativos:


Operação	nativoBigInt	JSBI
Criação a partir do número	a = BigInt(789)	a = JSBI.BigInt(789)
Adição	c = a + b	c = JSBI.add(a, b)
Subtração	c = a - b	c = JSBI.subtract(a, b)
…	…	…
…E, em seguida, use o polyfill (plug-in Babel) para converter chamadas JSBI em bigints nativos para os navegadores que os suportam.

Em outras palavras, essa abordagem sugere que escrevamos código em JSBI em vez de bigints nativos. Mas JSBI trabalha com números como com bigints internamente, emula-os de perto seguindo a especificação, então o código estará “pronto para bigint”.

Podemos usar esse código JSBI “como está” para mecanismos que não suportam bigints e para aqueles que suportam – o polyfill converterá as chamadas em bigints nativos.

*/

