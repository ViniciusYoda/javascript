/*

Expressões de função

Em JavaScript, uma função não é uma "estrutura de linguagem mágica", msa um tipo especial de valor.

A sintaxe que usamos antes é chamada de Declaração de Função:

*/

function sayHi() {
    alert("Hello");
}

/*

Há outra sintaxe para criar uma função que é chamada de Expressão de Função.

ELe nos permite criar uma nova função no meio de qualquer expressão.

Por exemplo:

*/

let sayHi = function(){
    alert("Hello");
};

/*

Aqui podemos ver uma variável sayHi recebendo um valor, a nova função, criada como function() { alert("Hello"); }.

Como a criação da função acontece no contexto da expressão de atribuição (ao lado direito de =), esta é uma Expressão de Função.

Observe que não há nome após a palavra-chave function. A omissão de um nome é permitida para Expressões de Função.

Aqui nós a atribuímos imediatamente à variável, então o significado desses exemplos de código é o mesmo: "criar uma função e colocá-la na variável sayHi".

Em situações mais avançadas, que veremos mais adiante, uma função pode ser criada e imediatamente chamada ou agendada para uma execução posterior, não armazenada em nenhum lugar, permanecendo assim anônima.

Função é um valor

amos reiterar: não importa como a função é criada, uma função é um valor. Ambos os exemplos acima armazenam uma função na variável sayHi.

Podemos até imprimir esse valor usando alert:

*/

function sayHi() {
    alert("Hello");
}

alert(sayHi);

/*

Observe que a última linha não executa a função, porque não há parênteses após sayHi. Existem linguagens de programação onde qualquer menção a um nome de função causa sua execução, mas JavaScript não é assim.

Em JavaScript, uma função é um valor, então podemos tratá-la como um valor. O código acima mostra sua representação em string, que é o código-fonte.

Certamente, uma função é um valor especial, no sentido de que podemos chamá-la como sayHi().

Mas ainda é um valor. Então podemos trabalhar com isso como com outros tipos de valores.

Podemos copiar uma função para outra variável:

*/

function sayHi() { // (1) create
    alert("Hello");
}

let func = sayHi; //(2) copy

func(); //Hello // (3) run the copy (it works)!
sayHi(); //Hello // this still works too (why wouldn´t it)

/*

Aqui está o que acontece acima em detalhes:

1. A Declaração de Função (1)cria a função e a coloca na variável chamada sayHi.
2. A linha (2)copia para a variável func. Observe novamente: não há parênteses após sayHi. Se houvesse, então func = sayHi()escreveria o resultado da chamada sayHi() em func, não na função sayHi em si.
3. Agora a função pode ser chamada como sayHi()e func().

Também poderíamos ter usado uma Function Expression para declarar sayHi, na primeira linha:

*/

let sayHi = function() { // (1) create
    alert("Hello");
};

let func = sayHi;
// ...

/*

Tudo funcionaria igual.

Por que há um ponto e vírgula no final?

Você pode se perguntar, por que as expressões de função têm um ponto e vírgula ;no final, mas as declarações de função não:

*/

function sayHi() {
    //...
}

let sayHi = function() {
    // ...
};

/*

A resposta é simples: uma Expressão de Função é criada aqui como function(…) {…}dentro da instrução de atribuição: let sayHi = …;. O ponto e vírgula ;é recomendado no final da instrução, não faz parte da sintaxe da função.

O ponto e vírgula estaria lá para uma atribuição mais simples, como let sayHi = 5;, e também está lá para uma atribuição de função.

Funções de retorno de chamada
Vejamos mais exemplos de passagem de funções como valores e uso de expressões de função.

Vamos escrever uma função ask(question, yes, no)com três parâmetros:

question
Texto da pergunta
yes
Função a ser executada se a resposta for “Sim”
no
Função a ser executada se a resposta for “Não”
A função deve perguntar ao questione, dependendo da resposta do usuário, ligar yes()ou no():

*/

function ask(question, yes, no){
    if(confirm(question)) yes()
    else no();
}

function showOk() {
    alert("You agreed.");
}

function showCancel() {
    alert("You canceled the execution.");
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agrre?", showOk, showCancel);

/*

Na prática, essas funções são bastante úteis. A principal diferença entre a vida real aske o exemplo acima é que as funções da vida real usam formas mais complexas de interagir com o usuário do que um simples arquivo confirm. No navegador, essas funções geralmente desenham uma janela de perguntas bonita. Mas isso é outra história.

Os argumentos showOke showCancelde asksão chamados de funções de retorno de chamada ou apenas retornos de chamada .

A ideia é que passamos uma função e esperamos que ela seja “chamada de volta” mais tarde, se necessário. No nosso caso, showOktorna-se o callback para resposta “sim” e showCancelpara resposta “não”.

Podemos usar expressões de função para escrever uma função equivalente e mais curta:

*/

function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
}

ask{
    "Do you agree?",
    function() { alert("You agreed."); },
    function() { alert("You canceled the execution."); }
};

/*

Aqui, as funções são declaradas dentro da chamada ask(...). Eles não têm nome e, portanto, são chamados de anônimos . Essas funções não são acessíveis fora ask(porque não são atribuídas a variáveis), mas é exatamente isso que queremos aqui.

Esse código aparece em nossos scripts com muita naturalidade, está no espírito do JavaScript.

Uma função é um valor que representa uma “ação”

Valores regulares como strings ou números representam os dados .

Uma função pode ser percebida como uma ação .

Podemos passá-lo entre variáveis ​​e executar quando quisermos.

Expressão de Função vs Declaração de Função

Vamos formular as principais diferenças entre Declarações de Função e Expressões.

Primeiro, a sintaxe: como diferenciá-los no código.

. Declaração de função: uma função, declarada como uma instrução separada, no fluxo de código principal:

*/

// Function Declaration
function sum(a, b) {
    return a + b;
}

// . Expressão de Função: uma função, criada dentro de uma expressão ou dentro de outra construção de sintaxe. Aqui, a função é criada no lado direito da “expressão de atribuição” =:

// Function Expression
let sum = function(a, b) {
    return a + b;
};

/*

A diferença mais sutil é quando uma função é criada pelo mecanismo JavaScript.

Uma Expressão de Função é criada quando a execução a atinge e é utilizável somente a partir desse momento.

Uma vez que o fluxo de execução passa para o lado direito da atribuição let sum = function…– aqui vamos nós, a função é criada e pode ser usada (atribuída, chamada, etc.) a partir de agora.

Declarações de função são diferentes.

Uma Declaração de Função pode ser chamada antes de ser definida.

Por exemplo, uma Declaração de Função global é visível em todo o script, não importa onde esteja.

Isso é devido a algoritmos internos. Quando o JavaScript se prepara para executar o script, ele primeiro procura por declarações de função globais e cria as funções. Podemos pensar nisso como uma “etapa de inicialização”.

E depois que todas as Declarações de Função são processadas, o código é executado. Portanto, ele tem acesso a essas funções.

Por exemplo, isso funciona:

*/

sayHi("John"); // Hello, John

function sayHi(name) {
    alert(`Hello, ${name}`);
}

/*

A Declaração de Função sayHié criada quando o JavaScript está se preparando para iniciar o script e é visível em todos os lugares nele.

…Se fosse uma Expressão de Função, então não funcionaria:

*/

sayHi("John"); // error!

let sayHi = function(name) { // (*) no magic anu more
    alert(`Hello, ${name}`);
};

/*

As Expressões de Função são criadas quando a execução as atinge. Isso aconteceria apenas na linha (*). Tarde demais.

Outra característica especial das Declarações de Função é seu escopo de bloco.

No modo estrito, quando uma Declaração de Função está dentro de um bloco de código, ela fica visível em todos os lugares dentro desse bloco. Mas não fora dela.

Por exemplo, vamos imaginar que precisamos declarar uma função welcome()dependendo da agevariável que obtemos durante o tempo de execução. E então planejamos usá-lo algum tempo depois.

Se usarmos a Declaração de Função, ela não funcionará como pretendido:

*/

let age = prompt("What is you age?", 18);

// conditionally declare a function
if (age < 18) {

    function welcome() {
        alert("Hello!");
    }
} else {

    function welcome() {
        alert("Greetings!");
    }
}

// ...use it later
welcome(); // Error: welcome is not defined

/*

Isso porque uma Declaração de Função só é visível dentro do bloco de código em que reside.

Aqui está outro exemplo:

*/

let age = 16; // take 16 as an example

if (age < 18) {
    welcome(); // \ (runs)

    function welcome() {
        alert("Hello!"); // | Function Declaration is available
    }                    // | everywhere in the block where it´s declared
    welcome(); // / (runs)
} else {

    function welcome() {
        alert("Greetings!");
    }
}

// Here we´re out of curly braces,
// so we can not see Function Declarations made inside of them.

welcome(); // Error: welcome is not defined.

/*

O que podemos fazer para tornar welcomevisível fora if?

A abordagem correta seria usar uma expressão de função e atribuir welcomeà variável que é declarada fora ife tem a visibilidade adequada.

Este código funciona como pretendido:

*/

let age = prompt("Whar is your age?", 18);

let welcome;

if (age < 18) {

    welcome = function() {
        alert("Hello!");
    };
} else {

    welcome = function() {
        alert("Greetings!");
    };
}

welcome(); // ok now

// Ou podemos simplificar ainda mais usando um operador de ponto de interrogação ?:

let age = prompt("What is your age?", 18);

let welcome = (age < 18) ? function() {alert("Hello!");} : function() {alert("Greetings!");};

welcome(); // ok now

/*

Quando escolher Declaração de Função versus Expressão de Função?
Como regra geral, quando precisamos declarar uma função, a primeira coisa a considerar é a sintaxe da Declaração de Função. Dá mais liberdade na forma de organizar nosso código, pois podemos chamar tais funções antes de serem declaradas.

Isso também é melhor para legibilidade, pois é mais fácil procurar function f(…) {…}no código do que let f = function(…) {…};. Declarações de função são mais “atraentes”.

…Mas se uma Declaração de Função não nos convém por algum motivo, ou precisamos de uma declaração condicional (acabamos de ver um exemplo), então a Expressão de Função deve ser usada.

Resumo

. Funções são valores. Eles podem ser atribuídos, copiados ou declarados em qualquer lugar do código.
. Se a função for declarada como uma instrução separada no fluxo de código principal, isso é chamado de “Declaração de Função”.
. Se a função for criada como parte de uma expressão, ela é chamada de “Expressão de Função”.
. As declarações de função são processadas antes que o bloco de código seja executado. Eles são visíveis em todos os lugares do bloco.
. As Expressões de Função são criadas quando o fluxo de execução as atinge.

Na maioria dos casos, quando precisamos declarar uma função, uma Declaração de Função é preferível, porque é visível antes da declaração em si. Isso nos dá mais flexibilidade na organização do código e geralmente é mais legível.

Portanto, devemos usar uma Expressão de Função somente quando uma Declaração de Função não for adequada para a tarefa. Vimos alguns exemplos disso neste capítulo e veremos mais no futuro.

*/

