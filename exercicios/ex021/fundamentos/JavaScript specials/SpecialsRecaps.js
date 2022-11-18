/*

Especiais JavaScript

Este capítulo recapitula brevemente os recursos do JavaScript que aprendemos até agora, prestando atenção especial aos momentos sutis.

Estrutura do código

As instruções são delimitadas por um ponto e vírgula:

*/

alert('Hello'); alert('World');

// Normalmente, uma quebra de linha também é tratada como um delimitador, então isso também funcionaria:

alert('Hello')
alert('World')

// Isso é chamado de “inserção automática de ponto e vírgula”. Às vezes não funciona, por exemplo:

alert("There will be an error after this message")

[1, 2].forEach(alert)

/*

A maioria dos guias de estilo de código concorda que devemos colocar um ponto e vírgula após cada declaração.

Os pontos e vírgulas não são necessários após blocos de código {...}e construções de sintaxe com eles como loops:

*/

funcition f() {
    // no semicolon needed after function declaration
}

for(;;) {
    // no semicolon needed after the loop
}

/*

…Mas mesmo que possamos colocar um ponto-e-vírgula “extra” em algum lugar, isso não é um erro. Será ignorado.

Mais em: Estrutura de código .

Modo estrito

Para habilitar totalmente todos os recursos do JavaScript moderno, devemos iniciar os scripts com "use strict".

*/

'use strict';

...

/*

A diretiva deve estar no início de um script ou no início de um corpo de função.

Sem "use strict", tudo ainda funciona, mas alguns recursos se comportam de maneira antiquada, “compatível”. Geralmente preferimos o comportamento moderno.

Alguns recursos modernos da linguagem (como classes que estudaremos no futuro) habilitam o modo estrito implicitamente.

Variáveis

Pode ser declarado usando:

. let
. const(constante, não pode ser alterado)
. var(à moda antiga, veremos mais tarde)

Um nome de variável pode incluir:

. Letras e dígitos, mas o primeiro caractere não pode ser um dígito.
. Caracteres $e _são normais, a par das letras.
. Alfabetos e hieróglifos não latinos também são permitidos, mas geralmente não são usados.

As variáveis ​​são tipadas dinamicamente. Eles podem armazenar qualquer valor:

*/

let x = 5;
x = "John";

/*

Existem 8 tipos de dados:

. number para números de ponto flutuante e inteiros,
. bigint para números inteiros de comprimento arbitrário,
. stringpara cordas,
. boolean para valores lógicos: true/false,
. null– um tipo com um único valor null, significando “vazio” ou “não existe”,
. undefined– um tipo com um único valor undefined, significando “não atribuído”,
. objecte symbol– para estruturas de dados complexas e identificadores exclusivos, ainda não os aprendemos.

O typeof operador retorna o tipo de um valor, com duas exceções:

*/

typeof null == "object" // error in the language
typeof function(){} == "function" // functions are treated specially

/*

Interação

Estamos usando um navegador como ambiente de trabalho, portanto, as funções básicas da interface do usuário serão:

prompt(question, [default])

Pergunte a um questione retorne o que o visitante digitou ou nullse clicou em “cancelar”.

confirm(question)

Pergunte a questione sugira escolher entre Ok e Cancelar. A escolha é retornada como true/false.

alert(message)

Saída um message.

Todas essas funções são modais , pausam a execução do código e impedem que o visitante interaja com a página até que ele responda.

Por exemplo:

*/

let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert("Visitor: " + userName); // Alice
alert("Tea wanted: " + isTeaWanted); // true

/*

Operadores

JavaScript suporta os seguintes operadores:

Aritmética
Regular: * + - /, também %para o resto e **para a potência de um número.

O binário plus +concatena strings. E se algum dos operandos for uma string, o outro também será convertido em string:

*/

alert('1' + 2); // '12', string
alert(1 + '2'); // '12', string

/*

atribuições

Há uma atribuição simples: a = be combinadas como a *= 2.

Bit a bit

Os operadores bit a bit trabalham com inteiros de 32 bits no nível de bits mais baixo: consulte os documentos quando forem necessários.

Condicional

O único operador com três parâmetros: cond ? resultA : resultB. Se condfor verdadeiro, retorna resultA, caso contrário resultB.

Operadores lógicos

&&AND e OR lógicos ||realizam avaliação de curto-circuito e, em seguida, retornam o valor onde parou (não é necessário true/ false). O NOT lógico !converte o operando para o tipo booleano e retorna o valor inverso.

Operador de coalescência nulo

O ?? operador fornece uma maneira de escolher um valor definido em uma lista de variáveis. O resultado de a ?? bé aa menos que seja null/undefined, então b.

Comparações

A verificação de igualdade ==para valores de tipos diferentes os converte em um número (exceto nulle undefinedque são iguais entre si e nada mais), então são iguais:

*/

alert(0==false); // true
alert(0==''); // true

/*

Outras comparações também são convertidas em um número.

O operador de igualdade estrita ===não faz a conversão: tipos diferentes sempre significam valores diferentes para ele.

Valores nulle undefinedsão especiais: eles se igualam ==e não se igualam a mais nada.

Comparações maiores/menos comparam strings caractere por caractere, outros tipos são convertidos em um número.

Outros operadores
Existem poucos outros, como um operador de vírgula.

rotações

. Cobrimos 3 tipos de loops:

*/

// 1
while (condition) {
    ...
}

// 2
do {
    ...
} while (condition);

// 3
for(let i = 0; i < 10; i++){
    ...
}

/*

. A variável declarada em for(let...)loop é visível apenas dentro do loop. Mas também podemos omitir lete reutilizar uma variável existente.

. As diretivas break/continuepermitem sair de toda a iteração de loop/corrente. Use rótulos para quebrar loops aninhados.

A construção “interruptor”

A construção “switch” pode substituir várias ifverificações. Ele usa ===(igualdade estrita) para comparações.

Por exemplo:

*/

let age = prompt('Your age?', 18);

switch (age) {
    case 18:
        alert("Won´t work"); // the result of prompt is a string, not a number
        break;

    case "18":
        alert("Thid works!");
        break;

    default:
        alert("Any value not equal to one above");
        break;
}

/*

Funções

Cobrimos três maneiras de criar uma função em JavaScript:

1. Declaração de função: a função no fluxo de código principal

*/

function sum(a, b) {
    let result = a + b;

    return result;
}

// 2. Expressão de função: a função no contexto de uma expressão

let sum = function(a, b) {
    let result = a + b;

    return result;
};

// 3. Funções da seta:

// expression on the right side
let sum = (a, b) => a + b;

// or multi-line syntax with { ... }, need return here:
let sum = (a, b) => {
    // ...
    return a + b;
}

// withou arguments
let sayHi = () => alert("Hello");

// with a single argument
let double = n => n * 2;

/*

. As funções podem ter variáveis ​​locais: aquelas declaradas dentro de seu corpo ou de sua lista de parâmetros. Tais variáveis ​​são visíveis apenas dentro da função.
. Os parâmetros podem ter valores padrão: function sum(a = 1, b = 2) {...}.
. As funções sempre retornam algo. Se não houver nenhuma returninstrução, o resultado será undefined.

*/
