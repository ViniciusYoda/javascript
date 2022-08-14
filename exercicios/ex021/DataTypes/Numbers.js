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

toString(base)
O método num.toString(base)retorna uma representação de string numno sistema numérico com o dado base.

Por exemplo:

*/

let num = 255;

alert( num.toString(16) ); // ff
alert( num.toString(2) ); // 11111111

/*

O basepode variar de 2a 36. Por padrão é 10.

Casos de uso comuns para isso são:

base=16 é usado para cores hexadecimais, codificações de caracteres etc., os dígitos podem ser 0..9ou A..F.

base=2 é principalmente para depurar operações bit a bit, os dígitos podem ser 0ou 1.

base=36 é o máximo, os dígitos podem ser 0..9ou A..Z. Todo o alfabeto latino é usado para representar um número. Um caso engraçado, mas útil, 36é quando precisamos transformar um identificador numérico longo em algo mais curto, por exemplo, para criar um URL curto. Pode simplesmente representá-lo no sistema numérico com base 36:

*/

alert( 123456..toString(36) ); // 2n9c

/*

Dois pontos para chamar um método
Observe que dois pontos 123456..toString(36)não são um erro de digitação. Se quisermos chamar um método diretamente em um número, como toStringno exemplo acima, precisamos colocar dois pontos ..depois dele.

Se colocássemos um único ponto: 123456.toString(36), haveria um erro, porque a sintaxe JavaScript implica a parte decimal após o primeiro ponto. E se colocarmos mais um ponto, o JavaScript sabe que a parte decimal está vazia e agora vai o método.

Também poderia escrever (123456).toString(36).

Arredondamento
Uma das operações mais utilizadas ao trabalhar com números é o arredondamento.

Existem várias funções internas para arredondamento:

Math.floor
Arredonda para baixo: 3.1torna -se 3, e -1.1torna -se -2.
Math.ceil
Arredonda para cima: 3.1torna -se 4, e -1.1torna -se -1.
Math.round
Arredonda para o inteiro mais próximo: 3.1torna -se 3, 3.6torna -se 4, o caso do meio: 3.5arredonda para cima 4também.
Math.trunc(não suportado pelo Internet Explorer)
Remove qualquer coisa após o ponto decimal sem arredondamento: 3.1torna -se 3, -1.1torna -se -1.
Aqui está a tabela para resumir as diferenças entre eles:

	Math.floor	Math.ceil	Math.round	Math.trunc
3.1	3	4	3	3
3.6	3	4	4	3
-1.1	-2	-1	-1	-1
-1.6	-2	-1	-2	-1

Essas funções cobrem todas as maneiras possíveis de lidar com a parte decimal de um número. Mas e se quisermos arredondar o número para o n-thdígito após o decimal?

Por exemplo, temos 1.2345e queremos arredondar para 2 dígitos, obtendo apenas 1.23.

Existem duas maneiras de fazê-lo:

1. Multiplicar e dividir.

Por exemplo, para arredondar o número para o 2º dígito após o decimal, podemos multiplicar o número por 100, chamar a função de arredondamento e depois dividi-lo de volta.

*/

let num = 1.23456;

alert( Math.round(num * 100) / 100);  // 1.23456 -> 123.456 -> 123 -> 1.23

// 2. O método toFixed(n) arredonda o número para ndígitos após o ponto e retorna uma representação de string do resultado.

let num = 12.34; 
alert( num.toFixed(1) ); // "12.3"

// Isso arredonda para cima ou para baixo para o valor mais próximo, semelhante a Math.round:

let num = 12.36;
alert( num.toFixed(1) ); // "12.4"

// Observe que o resultado de toFixedé uma string. Se a parte decimal for menor do que o necessário, serão acrescentados zeros ao final:

let num = 12.34;
alert( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits

/*

Podemos convertê-lo em um número usando o mais unário ou uma Number()chamada, por exemplo, escreva +num.toFixed(5).

Cálculos imprecisos
Internamente, um número é representado no formato de 64 bits IEEE-754 , portanto, existem exatamente 64 bits para armazenar um número: 52 deles são usados ​​para armazenar os dígitos, 11 deles armazenam a posição do ponto decimal e 1 bit é para o sinal.

Se um número for muito grande, ele pode estourar o armazenamento de 64 bits e se tornar um valor numérico especial Infinity:

*/

alert( 1e500 ); // Infinity

/*

O que pode ser um pouco menos óbvio, mas acontece com bastante frequência, é a perda de precisão.

Considere este (falso!) teste de igualdade:

*/

alert( 0.1 + 0.2 == -0.3); // false

/*

Isso mesmo, se verificarmos se a soma de 0.1e 0.2é 0.3, obtemos false.

Estranho! O que é então se não 0.3?

*/

alert( 0.1 + 0.2 ); // 0.30000000000000004

/*

Ai! Imagine que você está criando um site de compras eletrônicas e o visitante coloca $0.10mercadorias $0.20no carrinho. O total do pedido será $0.30000000000000004. Isso surpreenderia qualquer um.

Mas por que isso acontece?

Um número é armazenado na memória em sua forma binária, uma sequência de bits – uns e zeros. Mas frações como 0.1, 0.2que parecem simples no sistema numérico decimal são, na verdade, frações sem fim em sua forma binária.

O que é 0.1? É um dividido por dez 1/10, um décimo. No sistema de numeração decimal, esses números são facilmente representáveis. Compare com um terço: 1/3. Torna-se uma fração infinita 0.33333(3).

Portanto, é garantido que a divisão por potências 10funcione bem no sistema decimal, mas a divisão por 3não. Pela mesma razão, no sistema de numeração binário, a divisão por potências de 2é garantida para funcionar, mas 1/10se torna uma fração binária infinita.

Não há como armazenar exatamente 0,1 ou exatamente 0,2 usando o sistema binário, assim como não há como armazenar um terço como fração decimal.

O formato numérico IEEE-754 resolve isso arredondando para o número mais próximo possível. Essas regras de arredondamento normalmente não nos permitem ver essa “pequena perda de precisão”, mas ela existe.

Podemos ver isso em ação:

*/

alert( 0.1.toFixed(20) ); // 0.10000000000000000555

/*

E quando somamos dois números, suas “perdas de precisão” se somam.

Por isso 0.1 + 0.2não é exatamente 0.3.

Não apenas JavaScript
O mesmo problema existe em muitas outras linguagens de programação.

PHP, Java, C, Perl, Ruby dão exatamente o mesmo resultado, pois são baseados no mesmo formato numérico.

Podemos contornar o problema? Claro, o método mais confiável é arredondar o resultado com a ajuda de um método toFixed(n) :

*/

let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"

// Observe que toFixedsempre retorna uma string. Ele garante que tenha 2 dígitos após o ponto decimal. Isso é realmente conveniente se tivermos um e-shopping e precisarmos mostrar $0.30. Para outros casos, podemos usar o mais unário para forçá-lo a um número:

let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3

// Também podemos multiplicar temporariamente os números por 100 (ou um número maior) para transformá-los em números inteiros, fazer as contas e depois dividir de volta. Então, como estamos fazendo contas com números inteiros, o erro diminui um pouco, mas ainda temos na divisão:

alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100 ); // 0.4200000000000001

/*

Portanto, a abordagem de multiplicar/dividir reduz o erro, mas não o remove totalmente.

Às vezes, podemos tentar evitar frações. Como se estivéssemos lidando com uma loja, podemos armazenar os preços em centavos em vez de dólares. Mas e se aplicarmos um desconto de 30%? Na prática, frações totalmente evasivas raramente são possíveis. Basta arredondar para cortar “caudas” quando necessário.

A coisa engraçada
Tente executar isso:

*/

// Hello! I'm a self-increasing number!
alert( 9999999999999999 ); // shows 10000000000000000

/*

Isso sofre do mesmo problema: uma perda de precisão. Existem 64 bits para o número, 52 deles podem ser usados ​​para armazenar dígitos, mas isso não é suficiente. Assim, os dígitos menos significativos desaparecem.

JavaScript não aciona um erro em tais eventos. Ele faz o possível para encaixar o número no formato desejado, mas, infelizmente, esse formato não é grande o suficiente.

Testes: isFinite e isNaN
Lembre-se desses dois valores numéricos especiais?

Infinity(e -Infinity) é um valor numérico especial que é maior (menor) que qualquer coisa.
NaNrepresenta um erro.
Eles pertencem ao tipo number, mas não são números “normais”, então existem funções especiais para verificá-los:

isNaN(value)converte seu argumento em um número e, em seguida, testa-o para ser NaN:

*/

alert( isNaN(NaN) ); // true
alert( isNaN("str") ); // true

// Mas precisamos dessa função? Não podemos simplesmente usar a comparação === NaN? Infelizmente não. O valor NaNé único, pois não é igual a nada, incluindo a si mesmo:

alert( NaN === NaN ); // false

// isFinite(value)converte seu argumento em um número e retorna truese for um número regular, não NaN/Infinity/-Infinity:

alert( isFinite("15") ); // true
alert( isFinite("str") ); // false, because a special value: NaN
alert( isFinite(Infinity) );  // false, because a special value: Infinity

// Às vezes isFiniteé usado para validar se um valor de string é um número regular:

let num = +prompt("Enter a number", '');

// will be true unless you enter Infinity, -Infinity or not a number
alert( isFinite(num) );

/*

Observe que uma string vazia ou apenas com espaço é tratada como 0em todas as funções numéricas, incluindo isFinite.

Number.isNaNeNumber.isFinite
Os métodos Number.isNaN e Number.isFiniteisNaN são as versões e isFinitefunções mais “estritas” . Eles não convertem automaticamente seu argumento em um número, mas verificam se ele pertence ao numbertipo.

Number.isNaN(value)retorna truese o argumento pertence ao numbertipo e é NaN. Em qualquer outro caso, ele retorna false.

*/

alert( Number.isNaN(NaN) ); // true
alert( Number.isNaN("str" / 2) ); // true

// Note the difference:
alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
alert( isNaN("str") );  // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion

// Number.isFinite(value)retorna truese o argumento pertence ao numbertipo e não é NaN/Infinity/-Infinity. Em qualquer outro caso, ele retorna false.

alert( Number.isFinite(123) ); // true
alert( Number.isFinite(Infinity) ); //false
alert( Number.isFinite(2 / 0) ); / false

// Note the difference:
alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
alert( isFinite("123") ); // true, because isFinite converts string "123" into a number 123

/*

De certa forma, Number.isNaNe Number.isFinitesão mais simples e diretas que as funções isNaNe isFinite. Na prática, porém, isNaNe isFinitesão mais usados, pois são mais curtos para escrever.

Comparação comObject.is
Existe um método interno especial Object.isque compara valores como ===, mas é mais confiável para dois casos extremos:

1. Funciona com NaN: Object.is(NaN, NaN) === true, isso é bom.
2. Os valores 0e -0são diferentes: Object.is(0, -0) === false, tecnicamente isso é verdade, porque internamente o número tem um bit de sinal que pode ser diferente mesmo que todos os outros bits sejam zeros.

Em todos os outros casos, Object.is(a, b)é o mesmo que a === b.

Mencionamos Object.isaqui, porque é frequentemente usado na especificação de JavaScript. Quando um algoritmo interno precisa comparar dois valores por serem exatamente iguais, ele usa Object.is(denominado internamente SameValue ).

parseInt e parseFloat
A conversão numérica usando um sinal de mais +ou Number()é estrita. Se um valor não for exatamente um número, ele falhará:

*/

alert( +"100px" ); // NaN

/*

A única exceção são os espaços no início ou no final da string, pois são ignorados.

Mas na vida real muitas vezes temos valores em unidades, como "100px"ou "12pt"em CSS. Além disso, em muitos países, o símbolo da moeda vem depois do valor, então temos "19€"e gostaríamos de extrair um valor numérico disso.

É para isso parseInte parseFloatservem.

Eles “leem” um número de uma string até não conseguirem mais. Em caso de erro, o número coletado é retornado. A função parseIntretorna um inteiro, enquanto parseFloatretornará um número de ponto flutuante:

*/

alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, only the integer part is returned
alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading

// Há situações em parseInt/parseFloatque retornará NaN. Isso acontece quando nenhum dígito pode ser lido:

alert( parseInt('a123') ); // NaN, the first symbol stops the process

/*

O segundo argumento deparseInt(str, radix)
A parseInt()função tem um segundo parâmetro opcional. Ele especifica a base do sistema numérico, portanto, parseInttambém pode analisar strings de números hexadecimais, números binários e assim por diante:

*/

alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, without 0x also works

alert( parseInt('2n9c', 36) ); // 12345

/*

Outras funções matemáticas
JavaScript tem um objeto Math embutido que contém uma pequena biblioteca de funções matemáticas e constantes.

Alguns exemplos:

Math.random()
Retorna um número aleatório de 0 a 1 (sem incluir 1).

*/

alert( Math.random() ); // 0.1234567894322
alert( Math.random() ); // 0.5435252343232
alert( Math.random() ); // ... (any random numbers)

/*

Math.max(a, b, c...)eMath.min(a, b, c...)
Retorna o maior e o menor do número arbitrário de argumentos.

*/

alert( Math.max(3, 5, -10, 0, 1) ); // 5
alert( Math.min(1, 2) ); // 1

/*

Math.pow(n, power)
Retorna nelevado à potência dada.

*/

alert( Math.pow(2, 10) ); // 2 in power 10 = 1024

/*

Existem mais funções e constantes no Mathobjeto, incluindo trigonometria, que você pode encontrar nos documentos do objeto Math .

Resumo
Para escrever números com muitos zeros:

Acrescente "e"com a contagem de zeros ao número. Como: 123e6é o mesmo que 123com 6 zeros 123000000.
Um número negativo depois "e"faz com que o número seja dividido por 1 com zeros dados. Por exemplo 123e-6, significa 0.000123( 123milionésimos).
Para diferentes sistemas numéricos:

Pode escrever números diretamente em sistemas hex ( 0x), octal ( 0o) e binário ( 0b).
parseInt(str, base)analisa a string strem um inteiro no sistema numérico com dado base, 2 ≤ base ≤ 36.
num.toString(base)converte um número em uma string no sistema numérico com o dado base.
Para testes regulares de números:

isNaN(value)converte seu argumento em um número e então o testa para serNaN
Number.isNaN(value)verifica se seu argumento pertence ao numbertipo e, em caso afirmativo, testa-o para serNaN
isFinite(value)converte seu argumento em um número e então o testa para não serNaN/Infinity/-Infinity
Number.isFinite(value)verifica se seu argumento pertence ao numbertipo e, em caso afirmativo, testa-o para não serNaN/Infinity/-Infinity
Para converter valores como 12pte 100pxpara um número:

Use parseInt/parseFloatpara a conversão “soft”, que lê um número de uma string e, em seguida, retorna o valor que poderia ler antes do erro.
Para frações:

Arredonde usando Math.floor, Math.ceil, Math.truncou .Math.roundnum.toFixed(precision)
Certifique-se de lembrar que há uma perda de precisão ao trabalhar com frações.
Mais funções matemáticas:

Veja o objeto Math quando precisar deles. A biblioteca é muito pequena, mas pode cobrir as necessidades básicas.

*/
