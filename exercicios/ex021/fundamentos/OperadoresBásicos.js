//Operadores básicos, matemática

//Conhecemos muitos operadores da escola. São coisas como adição +, multiplicação *, subtração -e assim por diante.

//Neste capítulo, começaremos com operadores simples, depois nos concentraremos em aspectos específicos do JavaScript, não cobertos pela aritmética escolar.

//Termos: “unário”, “binário”, “operando”

//Antes de prosseguirmos, vamos entender algumas terminologias comuns.

//Um operando – é o que os operadores são aplicados. Por exemplo, na multiplicação de 5 * 2existem dois operandos: o operando esquerdo é 5e o operando direito é 2. Às vezes, as pessoas chamam esses “argumentos” em vez de “operandos”.

//Um operador é unário se tiver um único operando. Por exemplo, a negação unária -inverte o sinal de um número:

let x = 1;

x = -x;
alert( x ); // -1, unary negation was applied

//Um operador é binário se tiver dois operandos. O mesmo menos também existe na forma binária:

let xx = 1, y = 3;
alert( y - xx ); // 2, binary minus subtracts values

//Formalmente, nos exemplos acima temos dois operadores diferentes que compartilham o mesmo símbolo: o operador de negação, um operador unário que inverte o sinal, e o operador de subtração, um operador binário que subtrai um número de outro.

//Matemáticas

//As seguintes operações matemáticas são suportadas:

//Adição +,
//Subtração -,
//Multiplicação *,
//Divisão /,
//Restante %,
//Exponenciação **.

//Os quatro primeiros são simples, enquanto % e **precisam de algumas palavras sobre eles.

//% restante

//O operador resto %, apesar de sua aparência, não está relacionado a porcentagens.

//O resultado de a % bé o resto da divisão inteira de apor b.

//Por exemplo:

alert( 5 % 2 );// 1, a remainder of 5 divided by 2
alert( 8 % 3 );// 2, a remainder of 8 divided by 3

//Exponenciação **

//O operador de exponenciação a ** beleva aà potência de b.

//Na matemática escolar, escrevemos isso como um b .

//Por exemplo:

alert(2**2); // 2² = 4
alert(2**3); // 2³ = 8
alert(2**4);// 2⁴ = 16

//Assim como na matemática, o operador de exponenciação também é definido para números não inteiros.

//Por exemplo, uma raiz quadrada é uma exponenciação por ½:

alert(4**(1/2)); // 2 (power of 1/2 is the same as a square root)
alert(8**(1/3)); // 2 (power of 1/3 is the same as a cubic root)

//Concatenação de strings com binário +

//Vamos conhecer os recursos dos operadores JavaScript que estão além da aritmética escolar.

//Normalmente, o operador mais +soma os números.

//Mas, se o binário +for aplicado a strings, ele as mescla (concatena):

let s = "my" + "string";
alert(s); // mystring

//Observe que, se algum dos operandos for uma string, o outro também será convertido em uma string.

//Por exemplo:

alert('1'+2);// "12"
alert(2+'1');// "21"

//Veja, não importa se o primeiro operando é uma string ou o segundo.

//Aqui está um exemplo mais complexo:
alert(2 + 2 + '1'); // "41" and not "221"

//Aqui, os operadores trabalham um após o outro. O primeiro +soma dois números, então ele retorna 4, então o próximo +adiciona a string 1a ele, então é como 4 + '1' = '41'.

alert('1' + 2 + 2); // "122" and not "14"

//Aqui, o primeiro operando é uma string, o compilador trata os outros dois operandos como strings também. O 2é concatenado a '1', então é como '1' + 2 = "12"e "12" + 2 = "122".

//O binário +é o único operador que suporta strings dessa forma. Outros operadores aritméticos trabalham apenas com números e sempre convertem seus operandos em números.

//Aqui está a demonstração para subtração e divisão:

alert( 6 - '2'); // 4, converts '2' to a number
alert('6'/'2'); //3, converts both operands to numbers

//Conversão numérica, unário +

//O plus +existe em duas formas: a forma binária que usamos acima e a forma unária.

//O mais unário ou, em outras palavras, o operador de mais +aplicado a um único valor, não faz nada com os números. Mas se o operando não for um número, o mais unário o converte em um número.

//por exemplo:

//No effect on numbers
let a = 1;
alert( +a); // 1

let b = -2;
alert( +b); // -2

// Converts non-numbers
alert( +true ); // 1
alert( +""); // 0

//Na verdade, ele faz a mesma coisa que Number(...), mas é mais curto.

//A necessidade de converter strings em números surge com muita frequência. Por exemplo, se estamos obtendo valores de campos de formulário HTML, eles geralmente são strings. E se quisermos resumi-los?

//O binário plus os adicionaria como strings:

let apples = "2";
let oranges = "3";

alert( apples + oranges); // "23", the binary plus concatenates strings

//Se quisermos tratá-los como números, precisamos convertê-los e somá-los:

let Apples = "2";
let Oranges = "3";

// both values converted to numbers before the binary plus
alert( +Apples + +Oranges); //5

// the longer variant
// alert( Number(Apples) + Number(Oranges) ); // 5

//Do ponto de vista de um matemático, a abundância de vantagens pode parecer estranha. Mas do ponto de vista de um programador, não há nada de especial: os mais unários são aplicados primeiro, convertem strings em números e, em seguida, o mais binário os soma.

//Por que as vantagens unárias são aplicadas a valores antes dos binários? Como veremos, isso se deve à sua maior precedência .

// Operador precedente 

//Se uma expressão possui mais de um operador, a ordem de execução é definida por sua precedência , ou seja, a ordem de prioridade padrão dos operadores.

//Desde a escola, todos sabemos que a multiplicação na expressão 1 + 2 * 2deve ser calculada antes da adição. Essa é exatamente a coisa da precedência. Diz-se que a multiplicação tem precedência maior do que a adição.

//Os parênteses substituem qualquer precedência, portanto, se não estivermos satisfeitos com a ordem padrão, podemos usá-los para alterá-la. Por exemplo, escreva (1 + 2) * 2.

//Existem muitos operadores em JavaScript. Cada operador tem um número de precedência correspondente. Aquele com o maior número executa primeiro. Se a precedência for a mesma, a ordem de execução é da esquerda para a direita.

//Aqui está um extrato da tabela de precedência (você não precisa se lembrar disso, mas observe que os operadores unários são maiores que os binários correspondentes):


//Precedência	Nome	Sinal
//…	         …	         …
//15	mais unário	     +
//15	negação unária	 -
//14	exponenciação	 **
//13	multiplicação	 *
//13	divisão	         /
//12	Adição	         +
//12	subtração	     -
//…	         …	         …
//2	atribuição	         =
//…	         …	         …

//Como podemos ver, o “mais unário” tem uma prioridade 15maior que a 12de “adição” (mais binário). É por isso que, na expressão "+apples + +oranges", os mais unários funcionam antes da adição.

//Atribuição

//Observemos que uma atribuição =também é um operador. Ele está listado na tabela de precedência com a prioridade muito baixa de 2.

//Por isso, quando atribuímos uma variável, como x = 2 * 2 + 1, os cálculos são feitos primeiro e depois o =é avaliado, armazenando o resultado em x.

let c = 2 * 2 + 1;

alert(c); // 5

//Atribuição = retorna um valor

//O fato de = ser um operador, não uma construção de linguagem “mágica” tem uma implicação interessante.

//Todos os operadores em JavaScript retornam um valor. Isso é óbvio para +e -, mas também é verdade para =.

//A chamada x = valuegrava o valueinto x e o retorna .

//Aqui está uma demonstração que usa uma atribuição como parte de uma expressão mais complexa:

let d = 1;
let e = 2;

let f = 3 - (d = e + 1)

alert(d); // 3
alert(f); // 0

//No exemplo acima, o resultado da expressão (a = b + 1)é o valor que foi atribuído a(ou seja, 3). Em seguida, é usado para outras avaliações.

//Código engraçado, não é? Devemos entender como funciona, porque às vezes vemos isso em bibliotecas JavaScript.

//Embora, por favor, não escreva o código assim. Esses truques definitivamente não tornam o código mais claro ou legível.

//Atribuições de encadeamento

//Outro recurso interessante é a capacidade de encadear atribuições:

let g, h, i;

g = h = i = 2 + 2;

alert(g); // 4
alert(h); // 4
alert(i); // 4

//As atribuições encadeadas são avaliadas da direita para a esquerda. Primeiro, a expressão mais à direita 2 + 2 é avaliada e, em seguida, atribuída às variáveis ​​à esquerda: c, b e a. No final, todas as variáveis ​​compartilham um único valor.

//Mais uma vez, para fins de legibilidade, é melhor dividir esse código em poucas linhas:

i = 2 + 2;
h = i;
g = i;

//Isso é mais fácil de ler, especialmente ao examinar o código rapidamente.

//Modificar no local

//Muitas vezes precisamos aplicar um operador a uma variável e armazenar o novo resultado nessa mesma variável.

//Por exemplo:

let j = 2;
j = j + 5;
j = j * 2;

//Esta notação pode ser encurtada usando os operadores +=e *=:

let k = 2;
k += 5; // now k = 7 (same as k = k + 5)
k *= 2; // non k = 14 (same as k = k * 2)

//Existem operadores curtos de “modificar e atribuir” para todos os operadores aritméticos e bit a bit: /=, -=, etc.

//Esses operadores têm a mesma precedência de uma atribuição normal, portanto, são executados após a maioria dos outros cálculos:

let l = 2;
l *= 3 + 5

alert(l); // 16 (right part evaluated first, same as n *= 8)

//Incrementar/diminuir

//Aumentar ou diminuir um número em um está entre as operações numéricas mais comuns.

//Então, existem operadores especiais para isso:

//Incrementar ++ aumenta uma variável em 1:

let counter = 2;
counter++; // works the same as counter = counter + 1; but is shorter
alert( counter ); // 3

//Decrement -- diminui uma variável em 1:

let counter2 = 2;
counter2--; // works the same as counter = counter - 1; but is shorter
alert( counter2 );// 1

//Importante:
//O incremento/decremento só pode ser aplicado a variáveis. Tentar usá-lo em um valor como 5++dará um erro.

//Os operadores ++e --podem ser colocados antes ou depois de uma variável.

//.Quando o operador vai atrás da variável, fica em “forma postfix”: counter++.

//.A “forma de prefixo” é quando o operador vai antes da variável: ++counter.

//Ambas as declarações fazem a mesma coisa: aumente counterem 1.

//Existe alguma diferença? Sim, mas só podemos ver se usarmos o valor retornado de ++/--.

//Vamos esclarecer. Como sabemos, todos os operadores retornam um valor. Incrementar/diminuir não é exceção. A forma de prefixo retorna o novo valor enquanto a forma de postfix retorna o valor antigo (antes de incrementar/diminuir).

//Para ver a diferença, aqui está um exemplo:

let m = 1;
let n = ++m; // (*)

alert(n); // 2

//Na linha (*), o formulário de prefixo++counter é incrementado countere retorna o novo valor, 2. Então, os alertshows 2.

//Agora, vamos usar o formulário postfix:

let o = 1;
let p = o++; // (*) changed ++o to o++

alert(p); // 1

//Na linha (*), o formulário postfixcounter++ também incrementa , countermas retorna o valor antigo (antes do incremento). Então, os alertshows 1.

//Para resumir:

//Se o resultado de incremento/decremento não for usado, não há diferença em qual forma usar:

let q = 0;
q++;
++q;
alert(q); // 2, the lines above did the same

// Se quisermos aumentar um valor e usar imediatamente o resultado do operador, precisamos da forma de prefixo:

let r = 0;
alert( ++r ); // 1

// Se quisermos incrementar um valor, mas usar seu valor anterior, precisamos da forma postfix:

let s = 0;
alert( s++ ); // 0

//Incrementar/diminuir entre outros operadores

//Os operadores ++/--também podem ser usados ​​dentro de expressões. Sua precedência é maior do que a maioria das outras operações aritméticas.

//Por exemplo:

let t = 1;
alert( 2 * ++t ); // 4

//Compare com:

let u = 1;
alert( 2 * u++); // 2, because u++ returns the "old" value

//Embora tecnicamente correta, essa notação geralmente torna o código menos legível. Uma linha faz várias coisas – não é bom.

//Durante a leitura do código, uma rápida varredura ocular “vertical” pode facilmente perder algo como counter++e não será óbvio que a variável aumentou.

//Aconselhamos um estilo de “uma linha – uma ação”:

let v = 1;
alert( 2 * v);
v++;

//Operadores bit a bit

//Os operadores bit a bit tratam os argumentos como números inteiros de 32 bits e trabalham no nível de sua representação binária.

//Esses operadores não são específicos de JavaScript. Eles são suportados na maioria das linguagens de programação.

//A lista de operadores:

//E ( &)
//OU ( |)
//XOR ( ^)
//NÃO ( ~)
//DESLOCAMENTO PARA A ESQUERDA ( <<)
//MUDANÇA DIREITA ( >>)
//DESLOCAMENTO DE ZERO PREENCHIMENTO À DIREITA ( >>>)
//Esses operadores são usados ​​muito raramente, quando precisamos mexer com números no nível mais baixo (bit a bit). Não precisaremos desses operadores tão cedo, pois o desenvolvimento web tem pouco uso deles, mas em algumas áreas especiais, como criptografia, eles são úteis. Você pode ler o capítulo sobre Operadores Bitwise no MDN quando houver necessidade.

//Vírgula

//O operador vírgula ,é um dos operadores mais raros e incomuns. Às vezes, é usado para escrever código mais curto, então precisamos conhecê-lo para entender o que está acontecendo.

//O operador vírgula permite avaliar várias expressões, dividindo-as com uma vírgula ,. Cada um deles é avaliado, mas apenas o resultado do último é retornado.

//Por exemplo:

let w = (1 + 2, 3 + 4);

alert(w); // 7 (the result of 3 + 4)

//Aqui, a primeira expressão 1 + 2é avaliada e seu resultado é descartado. Em seguida, 3 + 4é avaliado e retornado como resultado.

//A vírgula tem uma precedência muito baixa

//Observe que o operador vírgula tem precedência muito baixa, menor que =, portanto, os parênteses são importantes no exemplo acima.

//Sem eles: a = 1 + 2, 3 + 4avalia +primeiro, somando os números em a = 3, 7, depois o operador de atribuição =atribui a = 3e o restante é ignorado. É como (a = 1 + 2), 3 + 4.

//Por que precisamos de um operador que jogue fora tudo, exceto a última expressão?

//Às vezes, as pessoas o usam em construções mais complexas para colocar várias ações em uma linha.

//Por exemplo:

// three operations in one line
for (a = 1, b = 3, c = a * b; a < 10; a++){

}

// Esses truques são usados ​​em muitos frameworks JavaScript. É por isso que os estamos mencionando. Mas geralmente eles não melhoram a legibilidade do código, então devemos pensar bem antes de usá-los.