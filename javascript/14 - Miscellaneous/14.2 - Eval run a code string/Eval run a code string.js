/*

Eval: executa uma string de código
A evalfunção interna permite executar uma string de código.

A sintaxe é:

let result = eval(code);
Por exemplo:

let code = 'alert("Hello")';
eval(code); // Hello
Uma string de código pode ser longa, conter quebras de linha, declarações de função, variáveis ​​e assim por diante.

O resultado de evalé o resultado da última instrução.

Por exemplo:

*/

let value = eval('1+1');
alert(value); // 2

let value2 = eval('let i = 0; ++i');
alert(value); // 1

// O código avaliado é executado no ambiente léxico atual, para que possa ver as variáveis ​​externas:

let a = 1;

function f() {
   let a = 2;

   eval('alert(a)'); // 2
}

f();

// Ele também pode alterar as variáveis ​​externas:

let x = 5;
eval("x = 10");
alert(x); // 10, value modified

// No modo estrito, evalpossui seu próprio ambiente léxico. Portanto funções e variáveis, declaradas dentro de eval, não são visíveis fora:

// reminder: 'use strict' is enabled in runnable examples by default

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (no such variable)
// function f is also not visible

/*

Sem use strict, evalnão tem seu próprio ambiente lexical, então veríamos xe ffora.

Usando “avaliação”
Na programação moderna evalé usado com muita parcimônia. Costuma-se dizer que “eval é mau”.

A razão é simples: muito, muito tempo atrás, o JavaScript era uma linguagem muito mais fraca, muitas coisas só podiam ser feitas com eval. Mas esse tempo passou há uma década.

No momento, quase não há razão para usar eval. Se alguém o estiver usando, há uma boa chance de substituí-lo por uma construção de linguagem moderna ou um módulo JavaScript .

Observe que sua capacidade de acessar variáveis ​​externas tem efeitos colaterais.

Os minificadores de código (ferramentas usadas antes do JS chegar à produção, para comprimi-lo) renomeiam as variáveis ​​locais para outras mais curtas (como a, betc) para tornar o código menor. Isso geralmente é seguro, mas não se evalfor usado, pois as variáveis ​​locais podem ser acessadas a partir da string de código avaliada. Portanto, os minificadores não fazem essa renomeação para todas as variáveis ​​potencialmente visíveis de eval. Isso afeta negativamente a taxa de compactação de código.

Usar variáveis ​​locais externas evaltambém é considerado uma prática de programação ruim, pois torna a manutenção do código mais difícil.

Existem duas maneiras de estar totalmente seguro de tais problemas.

Se o código avaliado não usar variáveis ​​externas, chame evalcomo window.eval(...):

Desta forma o código é executado no escopo global:

*/

let y = 1;
{
   let y = 5;
   window.eval('alert(y)'); // 1 (gloval variable)
}

// Se o código avaliado precisar de variáveis ​​locais, altere eval-as new Functione passe-as como argumentos:

let f = new Function('a', 'alert(a)');

f(5); // 5

/*

A new Functionconstrução é explicada no capítulo A sintaxe da "nova função" . Ele cria uma função a partir de uma string, também no escopo global. Portanto, não pode ver variáveis ​​locais. Mas é muito mais claro passá-los explicitamente como argumentos, como no exemplo acima.

Resumo
Uma chamada para eval(code)executa a string de código e retorna o resultado da última instrução.

Raramente usado em JavaScript moderno, pois geralmente não há necessidade.
Pode acessar variáveis ​​locais externas. Isso é considerado uma prática ruim.
Em vez disso, para evalo código no escopo global, use window.eval(code).
Ou, se seu código precisar de alguns dados do escopo externo, use new Functione passe-os como argumentos.

*/

