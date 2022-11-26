/*

Funções de seta, o básico

Há outra sintaxe muito simples e concisa para criar funções, que geralmente é melhor do que Expressões de Função.

É chamado de “funções de seta”, porque se parece com isso:

*/

let func = (arg1, arg2, ..., argN) => expression;

/*

Isso cria uma função funcque aceita argumentos arg1..argN, então avalia o expressiondo lado direito com seu uso e retorna seu resultado.

Em outras palavras, é a versão mais curta de:

*/

let func = function(arg1, arg2, ..., argN) {
    return expression;
};

// Vejamos um exemplo concreto:

let sum = (a, b) => a + b;

/* This arrow function is a shorter form of:

let sum = function(a, b) {
    return a + b;
}
*/

alert(sum(1,2)); // 3

/*

Como você pode ver, (a, b) => a + bsignifica uma função que aceita dois argumentos chamados ae b. Após a execução, ele avalia a expressão a + be retorna o resultado.

. Se tivermos apenas um argumento, os parênteses em torno dos parâmetros podem ser omitidos, tornando-o ainda mais curto.

Por exemplo:

*/

let double = n => n * 2;
// roughly the same as: let double = function(n) { return n * 2 }

alert(double(3)); // 6

// . Se não houver argumentos, os parênteses estão vazios, mas devem estar presentes:

let sayHi = () => alert("Hello!");

sayHi()

/*

As funções de seta podem ser usadas da mesma maneira que as expressões de função.

Por exemplo, para criar dinamicamente uma função:

*/

let age = prompt("What is your age?", 18);

let welcome = (age < 18) ? () => alert('Hello!') : () => alert("Greetings!");

welcome();

/*

As funções de seta podem parecer estranhas e não muito legíveis no início, mas isso muda rapidamente à medida que os olhos se acostumam com a estrutura.

Eles são muito convenientes para ações simples de uma linha, quando estamos com preguiça de escrever muitas palavras.

Funções de seta multilinha

As funções de seta que vimos até agora eram muito simples. Eles pegaram argumentos da esquerda de =>, avaliaram e retornaram a expressão do lado direito com eles.

Às vezes, precisamos de uma função mais complexa, com várias expressões e declarações. Nesse caso, podemos colocá-los entre chaves. A principal diferença é que as chaves exigem um returndentro delas para retornar um valor (assim como uma função regular faz).

Assim:

*/

let sum = (a, b) => { // the curly brace opens a multiline function 
    let result = a + b;
    return result; // if we use curly braces, then we need an explicit "return"
};

alert(sum(1,2)); // 3

/*

Mais por vir

Aqui elogiamos as funções de seta pela brevidade. Mas isso não é tudo!

As funções de seta têm outros recursos interessantes.

Para estudá-los em profundidade, primeiro precisamos conhecer alguns outros aspectos do JavaScript, então retornaremos às funções de seta mais tarde no capítulo Funções de seta revisitadas .

Por enquanto, já podemos usar funções de seta para ações de uma linha e retornos de chamada.

Resumo

As funções de seta são úteis para ações simples, especialmente para frases curtas. Eles vêm em dois sabores:

1. Sem chaves: (...args) => expression– o lado direito é uma expressão: a função avalia e retorna o resultado. Os parênteses podem ser omitidos, se houver apenas um único argumento, por exemplo n => n*2.

2. Com chaves: (...args) => { body }– colchetes nos permitem escrever várias instruções dentro da função, mas precisamos de um explícito returnpara retornar algo

*/.