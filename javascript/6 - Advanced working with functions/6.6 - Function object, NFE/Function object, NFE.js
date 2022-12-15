/*

Objeto de função, NFE
Como já sabemos, uma função em JavaScript é um valor.

Todo valor em JavaScript tem um tipo. Que tipo é uma função?

Em JavaScript, as funções são objetos.

Uma boa maneira de imaginar funções é como “objetos de ação” que podem ser chamados. Podemos não apenas chamá-los, mas também tratá-los como objetos: adicionar/remover propriedades, passar por referência etc.

A propriedade "nome"
Objetos de função contêm algumas propriedades utilizáveis.

Por exemplo, o nome de uma função é acessível como a propriedade “name”:

*/

function sayHi() {
   alert("Hi");
}

alert(sayHi.name); // sayHi

// O que é engraçado, a lógica de atribuição de nomes é inteligente. Ele também atribui o nome correto a uma função, mesmo que seja criada sem um e imediatamente atribuída:

let sayHi = function () {
   alert("Hi");
};

alert(sayHi.name); // sayHi (there's a name!)

// Também funciona se a atribuição for feita por meio de um valor padrão:

function f(sayHi = function () { }) {
   alert(sayHi.name); // sayHi (works!)
}

f();

/*

Na especificação, esse recurso é chamado de “nome contextual”. Se a função não fornecer um, então, em uma atribuição, ele será descoberto a partir do contexto.

Os métodos de objeto também têm nomes:

*/

let user = {

   sayHi() {
      // ...
   },

   sayBye: function () {
      // ...
   }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye

// Não há mágica embora. Há casos em que não há como descobrir o nome certo. Nesse caso, a propriedade name está vazia, como aqui:

// function created inside array
let arr = [function () { }];

alert(arr[0].name); // <empty string>
// the engine has no way to set up the right name, so there is none

/*

Na prática, porém, a maioria das funções tem um nome.

A propriedade “comprimento”
Existe outra propriedade interna “comprimento” que retorna o número de parâmetros da função, por exemplo:

*/

function f1(a) { }
function f2(a, b) { }
function many(a, b, ...more) { }

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2

/*

Aqui podemos ver que os parâmetros de descanso não são contados.

A lengthpropriedade às vezes é usada para introspecção em funções que operam em outras funções.

Por exemplo, no código abaixo, a askfunção aceita um questionpara perguntar e um número arbitrário de handlerfunções para chamar.

Depois que um usuário fornece sua resposta, a função chama os manipuladores. Podemos passar dois tipos de manipuladores:

Uma função de argumento zero, que só é chamada quando o usuário dá uma resposta positiva.
Uma função com argumentos, que é chamada em ambos os casos e retorna uma resposta.
Para chamar handlero caminho certo, examinamos a handler.lengthpropriedade.

A ideia é que temos uma sintaxe de manipulador simples e sem argumentos para casos positivos (variante mais frequente), mas também somos capazes de suportar manipuladores universais:

*/

function ask(question, ...handlers) {
   let isYes = confim(question);

   for (let handler of handlers) {
      if (handler.length == 0) {
         if (isYes) handler();
      } else {
         handler(isYes);
      }
   }
}

// for positive answer, both handlers are called
// for negative answer, only the second one

ask("Question?", () => alert('You said yes'), result => alert(result));

/*

Este é um caso particular do chamado polimorfismo – tratando os argumentos de forma diferente, dependendo do seu tipo ou, no nosso caso, dependendo do length. A ideia tem um uso em bibliotecas JavaScript.

Propriedades personalizadas
Também podemos adicionar propriedades próprias.

Aqui adicionamos a counterpropriedade para rastrear a contagem total de chamadas:

*/

function sayHi() {
   alert("Hi");

   // let's count how many times we run
   sayHi.counter++;
}
sayHi.counter = 0; // initial value

sayHi(); // Hi
sayHi(); // Hi

alert(`Called ${sayHi
   .counter} times`); // Called 2 times

/*

Uma propriedade não é uma variável
Uma propriedade atribuída a uma função como sayHi.counter = 0não define uma variável local counterdentro dela. Em outras palavras, uma propriedade countere uma variável let countersão duas coisas não relacionadas.

Podemos tratar uma função como um objeto, armazenar propriedades nela, mas isso não tem efeito na sua execução. Variáveis ​​não são propriedades de funções e vice-versa. Estes são apenas mundos paralelos.

As propriedades da função podem substituir os fechamentos às vezes. Por exemplo, podemos reescrever o exemplo da função contadora do capítulo Escopo variável, fechamento para usar uma propriedade de função:

*/

function makeCounter() {
   // instead of:
   // let count = 0

   function counter() {
      return counter.count++;
   };

   counter.count = 0;

   return counter;
}

let counter = makeCounter();
alert(counter()); // 0
alert(counter()); // 1

/*

O countagora é armazenado diretamente na função, não em seu ambiente lexical externo.

É melhor ou pior do que usar um encerramento?

A principal diferença é que, se o valor de countestiver em uma variável externa, o código externo não poderá acessá-lo. Somente funções aninhadas podem modificá-lo. E se estiver vinculado a uma função, isso é possível:

*/

function makeCounter() {

   function counter() {
      return counter.count++;
   };

   counter.count = 0;

   return counter;
}

let counter2 = makeCounter();

counter2.count = 10;
alert(counter()); // 10

/*

Portanto, a escolha da implementação depende de nossos objetivos.

Expressão de Função Nomeada
Expressão de Função Nomeada, ou NFE, é um termo para Expressões de Função que possuem um nome.

Por exemplo, vamos pegar uma expressão de função comum:

*/

let sayHi = function (who) {
   alert(`Hello, ${who}`);
};

// E adicione um nome a ele:

let sayHi = function func(who) {
   alert(`Hello, ${who}`);
};

/*

Conseguimos alguma coisa aqui? Qual é o propósito desse "func"nome adicional?

Primeiro, vamos observar que ainda temos uma expressão de função. Adicionar o nome "func"depois functionnão o tornou uma declaração de função, porque ele ainda é criado como parte de uma expressão de atribuição.

Adicionar esse nome também não quebrou nada.

A função ainda está disponível como sayHi():

*/

let sayHi = function func(who) {
   alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John

/*

Há duas coisas especiais sobre o nome func, que são as razões para isso:

1. Ele permite que a função faça referência a si mesma internamente.
2. Não é visível fora da função.

Por exemplo, a função sayHiabaixo se chama novamente com "Guest"if no whofor fornecido:

*/

let sayHi = function func(who) {
   if (who) {
      alert(`Hello, ${who}`);
   } else {
      func("Guest"); // use func to re-call itself
   }
};

sayHi(); // Hello, Guest

// But this won't work:
func(); // Error, func is not defined (not visible outside of the function)

/*

Por que usamos func? Talvez apenas use sayHipara a chamada aninhada?

Na verdade, na maioria dos casos, podemos:

*/

let sayHi = function (who) {
   if (who) {
      alert(`Hello, ${who}`);
   } else {
      sayHi("Guest");
   }
};

// O problema com esse código é que sayHipode mudar no código externo. Se a função for atribuída a outra variável, o código começará a apresentar erros:

let sayHi = function (who) {
   if (who) {
      alert(`Hello, ${who}`);
   } else {
      sayHi("Guest"); // Error: sayHi is not a function
   }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, the nested sayHi call doesn't work any more!

/*

Isso acontece porque a função retira sayHide seu ambiente lexical externo. Não há local sayHi, então a variável externa é usada. E no momento da chamada esse exterior sayHié null.

O nome opcional que podemos colocar na expressão da função destina-se a resolver exatamente esses tipos de problemas.

Vamos usá-lo para corrigir nosso código:

*/

let sayHi = function func(who) {
   if (who) {
      alert(`Hello, ${who}`);
   } else {
      func("Guest"); // Now all fine
   }
};

let welcome1 = sayHi;
sayHi = null;

welcome(); // Hello, Guest (nested call works)

/*

Agora funciona, porque o nome "func"é function-local. Não é tirado de fora (e não é visível lá). A especificação garante que sempre referenciará a função atual.

O código externo ainda tem sua variável sayHiou welcome. E funcé um “nome de função interna”, a maneira pela qual a função pode chamar a si mesma de forma confiável.

Não existe tal coisa para declaração de função
O recurso “nome interno” descrito aqui está disponível apenas para Expressões de Função, não para Declarações de Função. Para Declarações de Função, não há sintaxe para adicionar um nome “interno”.

Às vezes, quando precisamos de um nome interno confiável, esse é o motivo para reescrever uma declaração de função para o formulário de expressão de função nomeada.

Resumo
Funções são objetos.

Aqui cobrimos suas propriedades:

name– o nome da função. Normalmente retirado da definição da função, mas se não houver nenhum, o JavaScript tenta adivinhar a partir do contexto (por exemplo, uma atribuição).
length– o número de argumentos na definição da função. Parâmetros de descanso não são contados.
Se a função for declarada como uma expressão de função (não no fluxo de código principal) e tiver o nome, ela será chamada de expressão de função nomeada. O nome pode ser usado dentro para se referir a si mesmo, para chamadas recursivas ou algo assim.

Além disso, as funções podem ter propriedades adicionais. Muitas bibliotecas JavaScript conhecidas fazem ótimo uso desse recurso.

Eles criam uma função “principal” e anexam muitas outras funções “auxiliares” a ela. Por exemplo, a biblioteca jQuery cria uma função chamada $. A biblioteca lodash cria uma função _e, em seguida _.clone, adiciona _.keyBye outras propriedades a ela (consulte os documentos quando quiser aprender mais sobre eles). Na verdade, eles fazem isso para diminuir a poluição do espaço global, de modo que uma única biblioteca forneça apenas uma variável global. Isso reduz a possibilidade de nomear conflitos.

Portanto, uma função pode fazer um trabalho útil por si só e também carregar várias outras funcionalidades nas propriedades.

*/

