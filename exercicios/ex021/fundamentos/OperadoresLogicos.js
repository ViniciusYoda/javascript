/*

Operadores lógicos

Existem quatro operadores lógicos em JavaScript: ||(OR), &&(AND), !(NOT), ??(NUllish Coalescing). AQui cobrimos os três primeiros, o operador ?? está no próximo artigo.

Apesar de serem chamados de "lógicos", eles podem ser aplicados a valores de qualquer tipo, não apenas booleanos. Seu resultado também pode ser de qualquer tipo.

Vamos ver os detalhes.

|| (OU)

O operador "OR" é representado com dois símbolos de linha vertical:

*/

result = a || b;

/*

Na programação clássica, o lógico OR serve apenas para manipular valores booleanos. Se algum de seus argumentos for true, ele retorna true, caso contrário ele retorna false.

Em JavaScript, o operador é um pouco mais complicado e mais poderoso. Mas primeiro, vamos ver o que acontece com os valores booleanos.

Existem quatro combinações lógicas possíveis:

*/

alert( true || true ); // true
alert( false || true ); // true
alert( true || false ); // true
alert( false || false ); // false

/*

Como podemos ver, o resultado é sempre, true, exceto no caso em que ambos os operandos são false.

Se um operando não for booleano, ele será convertido em booleano para avaliação.

Por exemplo, o número 1 é tratado como true, o número 0 como false:

*/

if (1 || 0) { // works just like( true || false )
    alert( 'truthy!' );
}

/*

Na maioria das vezes, OR || é usado em uma instrução if para testar se alguma das condições fornecidas é true.

Por exemplo:

*/

let hour = 9

if (hour < 10 || hour > 18){
    alert( 'The office is closed.' );
}

// Podemos passar mais condições:

let nHour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
    alert( 'The office is closed.' ); // it is the weekend
}

/*

OU "||" encontra o primeiro valor verdaeiro

A lógica descrita aciam é um tanto clássica. Agora, vamos trazer os recursos "extras" do JavaScript.

O algoritmo estendido funciona da seguinte maneira.

Dado vários valores OR:

*/

results = value1 || value2 || value3;

/*

|| O operador OR faz o seguinte:

. Avalia operandos da esquerda para  a direita.
. Para cada operando, converte-o em booleano. Se o resultado for true, para e retorna o valor original desse operando.
. Se todos os operandos foram avaliados (ou seja, todos foram false), retorna o último operando.

Um valor é retornado em sua forma original, sem a conversão.

Em outras palavras,  uma cadeia de OR || retorna o primeiro valor verdeiro ou o último se nenhum valor verdadeiro for encontrado.

Por exemplo:

*/

alert( 1 || 0 ); // 1 (1 is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)

alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)

/*

Isso leva a um uso interessante em comparação com um "OR puro, clássico e somente booleano".

1. Obtendo o primeiro valor verdadeiro de uma lista de variáveis ou expressões.

Por exemplo, temos firstName, lastName e nickName variáveis, todas opcionais (ou seja, podem ser indefinidas ou ter valores falsos).

Vamos usar OR || para escolher aquele que tem os dados e mostrá-lo (ou "Anonymous" se nada definido);

*/

let firstName = "";
let lastName = "";
let nickName = "SuperCoder";

alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder

/*

Se todas as variáveis fossem falsas, "Anonymous" apareceria.

2. Avaliação de curto-circuito.

Outra característica do operador OR || é a chamada avaliação de "curto-circuito".

Significa que || processa seus argumentos até que o primeiro valor verdadeiro seja alcançado, e então o valor é retornado imediatamente, sem sequer tocar no outro argumento.

A importância desse recurso se torna óbvia se um operando não for apenas um valor, mas uma expressão com um efeito colateral, como uma atribuição de variável ou uma chamada de função.

No exemplo abaixo, apenas a segunda mensagem é impressa:

*/

true || alert("not printed");
false || alert("printed");

/*

Na primeira linha, o || operador OR interrompe a avaliação imediatamente ao ver true, para que alert não seja executado.

Às vezes, as pessoas usam esse recurso para executar comandos apenas se a condição na parte esquerda for falsa.

&& (E)

O operador AND é representado com dois ampersands &&:

*/

resultado = a ** b;

// Na programação clássica, AND retorna true se ambos os operandos forem verdadeiros e false caso contrário>

alert( true && true ); // true
alert( false && true ); // false
alert( true && false ); // false
alert( false && false ); // false

// Um exemplo com if:

let hora = 12;
let minuto = 30;

if (hora == 12 && minuto == 30) {
    alert( 'The time is 12:30' );
}

// Assim como com OR, qualquer valor é permitido como operando de AND:

if (1 && 0) { // evaluated as true && false
    alert( "won´t work, because the result is falsy" );
}

/*

E "&&" encontra o primeiro valor falso

Dados vários a=valores AND´ed:

*/

resultados = value1 && value2 && value3;

/*

&& O operador AND faz o seguinte:

. Avalia operandos da esquerda para a direita.
. Para cada operando, converte-o em um booleano. Se o resultado for false, para e retorna o valor original desse operando.
. Se todos os operandos foram avaliados (ou seja, todos foram verdadeiros), retorna o último operando.

Em outras palavras, AND retorna o primeiro valor falso ou o último valor se nenhum for encontrado.

As regras acima são semelhantes a OR. A diferença é que AND retorna o primeiro valor falso enquanto OR retorna o primeiro valor verdadeiro.

Exemplo:

*/

// if the first operand is truthy,
// AND returns the second operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0

// Também podemos passar vários valores em uma linha. Veja como o primeiro falso é retornado:

alert( 1 && 2 && null && 3 ); // null

// Quando todos os valores são verdadeiros, o último valor é retornado:

alert( 1 && 2 && 3 ); // 3, the last one

/*

A precedência de AND && é maior que OR ||

&& A precedência do operador AND é maior que OR ||.

Portanto, o código a && b || c && d é essencialmente o mesmo como se as && expressões estivessem entre parênteses: (a && b) || (c && d).

Não substitua if por || ou &&

&& Às vezes, as pessoas usam o operador AND como uma "maneira mais curta de escrever if". 

Por exemplo:

*/

let x = 1;

(x > 0) && alert( 'Greater than zero!' );

/*

A ação na parte direita de && executaria somente se a avaliação a alcançasse. Ou seja, somente se (x > 0) for verdade.

Então, basicamente, temos um análogo para:

*/

let y = 1;

if (y > 0) alert( 'Greater than zero! ');

// No entanto, a variante com && parece mais curta, if é mais óbvia e tende a ser um pouco mais legíve. Portanto, recomendamos usar cada construção para seu propósito: use if se quisermos if e use && se quisermos AND.

/*

! (NÃO)

O operador booleano NOT é representado com um sinalde exclamação !.

A sintaze é bem simples:

*/

resposta = !value;

/*

O operador aceita um único argumento e faz o seguinte:

1. Converte o operando para o tipo booleano: true/false.
2. Retorna o valor inverso.

Por exemplo:

*/

alert( !true ); // false
alert( !0 ); // true

// Um duplo NOT !! às vezes é usado para converter um valor para o tipo booleano:

alert( !!"non-empty string" ); // true
alert( !!null ); // false

/*

Ou seja, o primeiro NOT converte o valor para booleano e retorna o inverso, e o seguinte NOT o inverte pnovamente. No final, temos uam conversão simples de valor para booleano.

Há uma maneira um pouco mais detalhada de fazer a mesma coisa- uma Boolean função interna:

*/

alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false

// A precedência de NOT ! é a mais alta de todos os operadores lógicos, então ele sempre executa primeir, antes && ou ||.