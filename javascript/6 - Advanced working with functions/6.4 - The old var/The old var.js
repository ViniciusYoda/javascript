/*

O velho "var"
Este artigo é para entender scripts antigos
As informações neste artigo são úteis para entender scripts antigos.

Não é assim que escrevemos um novo código.

Logo no primeiro capítulo sobre variáveis , mencionamos três formas de declaração de variáveis:

let
const
var
A vardeclaração é semelhante a let. Na maioria das vezes, podemos substituir letpor varou vice-versa e esperar que as coisas funcionem:

*/

var message = "Hi";
alert(message); // Hi

/*

Mas internamente varé uma besta muito diferente, que vem de tempos muito antigos. Geralmente não é usado em scripts modernos, mas ainda se esconde nos antigos.

Se você não planeja encontrar tais scripts, você pode pular este capítulo ou adiá-lo.

Por outro lado, é importante entender as diferenças ao migrar scripts antigos de varpara let, para evitar erros estranhos.

“var” não tem escopo de bloco
As variáveis, declaradas com var, têm escopo de função ou escopo global. Eles são visíveis através de blocos.

Por exemplo:

*/

if (true) {
    var test = true; // use "var" instead of "let"
}

alert(test); // true, the variable livevs after if

/*

Como var ignora blocos de código, temos uma variável global test.

Se usássemos let testem vez de var test, a variável só seria visível dentro de if:

*/

if (true) {
    let test = true; // use "let"
}

alert(test); // ReferenceError: test is not defined

// A mesma coisa para loops: varnão pode ser block- ou loop-local:

for (var i = 0; i < 10; i++) {
    var one = 1;
    // ...
}

alert(i);   // 10, "i" is visible after loop, it's a global variable
alert(one); // 1, "one" is visible after loop, it's a global variable

// Se um bloco de código estiver dentro de uma função, ele varse tornará uma variável de nível de função:

function sayHi() {
    if (true) {
        var phrase = "Hello";
    }

    alert(phrase); // works
}

sayHi();
alert(phrase); // ReferenceError: phrase is not defined

/*

Como podemos ver, varatravessa if, forou outros blocos de código. Isso porque, há muito tempo, no JavaScript, os blocos não tinham ambientes léxicos e varsão remanescentes disso.

“var” tolera redeclarações
Se declararmos a mesma variável com letduas vezes no mesmo escopo, isso é um erro:

let user;
let user; // SyntaxError: 'user' has already been declared

Com var, podemos redeclarar uma variável quantas vezes quiser. Se usarmos varcom uma variável já declarada, ela é simplesmente ignorada:

*/

var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John

/*

Variáveis ​​“var” podem ser declaradas abaixo de seu uso
varas declarações são processadas quando a função é iniciada (ou o script é iniciado para globais).

Em outras palavras, varas variáveis ​​são definidas desde o início da função, não importa onde esteja a definição (supondo que a definição não esteja na função aninhada).

Então esse código:

*/

function sayHi() {
    phrase = "Hello";

    alert(phrase);

    var phrase;
}
sayHi();

// …É tecnicamente o mesmo que este (movido var phraseacima):

function sayHi() {
    var phrase;

    phrase = "Hello";

    alert(phrase);
}
sayHi();

// …Ou ainda assim (lembre-se, os blocos de código são ignorados):

function sayHi() {
    phrase = "Hello"; // (*)
  
    if (false) {
      var phrase;
    }
  
    alert(phrase);
}
sayHi();

/*

As pessoas também chamam esse comportamento de “hoisting” (levantar), porque todos varsão “içados” (elevados) ao topo da função.

Portanto, no exemplo acima, o if (false)branch nunca é executado, mas isso não importa. O varinterior é processado no início da função, portanto no momento em que (*)a variável existe.

As declarações são suspensas, mas as atribuições não.

Isso é melhor demonstrado com um exemplo:

*/

function sayHi() {
    alert(phrase);
  
    var phrase = "Hello";
}
  
sayHi();

/*

A linha var phrase = "Hello"tem duas ações nela:

1. Declaração de variávelvar
2. Atribuição variável =.

A declaração é processada no início da execução da função (“hoisted”), mas a atribuição sempre funciona no local onde aparece. Então o código funciona basicamente assim:

*/

function sayHi() {
    var phrase; // declaration works at the start...
  
    alert(phrase); // undefined
  
    phrase = "Hello"; // ...assignment - when the execution reaches it.
}
  
sayHi();

/*

Como todas as vardeclarações são processadas no início da função, podemos referenciá-las em qualquer lugar. Mas as variáveis ​​são indefinidas até as atribuições.

Nos dois exemplos acima, alertroda sem erro, pois a variável phraseexiste. Mas seu valor ainda não foi atribuído, então ele mostra undefined.

IIFE
No passado, como havia apenas var, e não tinha visibilidade em nível de bloco, os programadores inventaram uma maneira de imitá-lo. O que eles fizeram foi chamado de “expressões de função invocadas imediatamente” (abreviado como IIFE).

Isso não é algo que devemos usar hoje em dia, mas você pode encontrá-los em scripts antigos.

Um IIFE se parece com isso:

*/

(function() {

    var message = "Hello";

    alert(message); // Hello
})();

/*

Aqui, uma expressão de função é criada e chamada imediatamente. Portanto, o código é executado imediatamente e possui suas próprias variáveis ​​privadas.

A expressão da função é agrupada entre parênteses (function {...}), porque quando o mecanismo JavaScript encontra "function"o código principal, ele o entende como o início de uma declaração de função. Mas uma declaração de função deve ter um nome, então esse tipo de código dará um erro:

*/

// Tries to declare and immediately call a function
function() { // <-- SyntaxError: Function statements require a function name

    var message = "Hello";
  
    alert(message); // Hello
  
}();

// Mesmo se dissermos: “ok, vamos adicionar um nome”, isso não funcionará, pois o JavaScript não permite que as Declarações de Função sejam chamadas imediatamente:

// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately

/*

Portanto, os parênteses em torno da função são um truque para mostrar ao JavaScript que a função é criada no contexto de outra expressão e, portanto, é uma expressão de função: não precisa de nome e pode ser chamada imediatamente.

Existem outras maneiras além dos parênteses para dizer ao JavaScript que queremos dizer uma expressão de função:

*/

// Ways to create IIFE

(function() {
    alert("Parentheses around the function");
})();
  
(function() {
    alert("Parentheses around the whole thing");
}());
  
!function() {
    alert("Bitwise NOT operator starts the expression");
}();
  
+function() {
    alert("Unary plus starts the expression");
}();

/*

Em todos os casos acima, declaramos uma Expressão de Função e a executamos imediatamente. Observemos novamente: hoje em dia não há razão para escrever tal código.

Em todos os casos acima, declaramos uma Expressão de Função e a executamos imediatamente. Observemos novamente: hoje em dia não há razão para escrever tal código.

Resumo
Existem duas diferenças principais em var relação a let/const:

1. var as variáveis ​​não têm escopo de bloco, sua visibilidade tem como escopo a função atual ou global, se declarada fora da função.
2. var as declarações são processadas no início da função (início do script para globais).

Há mais uma pequena diferença relacionada ao objeto global, que abordaremos no próximo capítulo.

Essas diferenças tornam varpior do que letna maioria das vezes. As variáveis ​​de nível de bloco são ótimas. É por isso que letfoi introduzido no padrão há muito tempo e agora é uma maneira importante (junto com const) de declarar uma variável.

*/