/*

Protótipos nativos
A "prototype"propriedade é amplamente utilizada pelo núcleo do próprio JavaScript. Todas as funções internas do construtor o utilizam.

Primeiro, veremos os detalhes e, em seguida, como usá-lo para adicionar novos recursos a objetos integrados.

Objeto.protótipo
Digamos que produzimos um objeto vazio:

*/

let obj = {};
alert(obj); // "[object Object]" ?

/*

Onde está o código que gera a string "[object Object]"? Esse é um toStringmétodo embutido, mas onde está? O objestá vazio!

…Mas a notação curta obj = {}é a mesma que obj = new Object(), onde Objecté uma função construtora de objeto incorporada, com sua própria prototypereferência a um objeto enorme com toStringe outros métodos.

Aqui está o que está acontecendo:


Quando new Object()é chamado (ou um objeto literal {...}é criado), o [[Prototype]]dele é definido de Object.prototypeacordo com a regra que discutimos no capítulo anterior:

Então, quando obj.toString()é chamado, o método é retirado de Object.prototype.

Podemos verificar assim:

*/

let obj2 = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true

// Por favor, note que não há mais [[Prototype]]na cadeia acima Object.prototype:

alert(Object.prototype.__proto__); // null

/*


Outros protótipos integrados
Outros objetos internos como Array, Datee Functionoutros também mantêm métodos em protótipos.

Por exemplo, quando criamos um array [1, 2, 3], o construtor padrão new Array()é usado internamente. Então Array.prototypese torna seu protótipo e fornece métodos. Isso é muito eficiente em termos de memória.

Por especificação, todos os protótipos integrados têm Object.prototypeno topo. É por isso que algumas pessoas dizem que “tudo herda dos objetos”.

Aqui está a imagem geral (para 3 built-ins para caber):


Vamos verificar os protótipos manualmente:

*/

let arr = [1, 2, 3];

// it inherits from Array.prototype?
alert(arr.__proto__ === Array.prototype); // true

// then from Object.prototype?
alert(arr.__proto__.__proto__ === Object.prototype); // true

// and null on the top.
alert(arr.__proto__.__proto__.__proto__); // null

// Alguns métodos em protótipos podem se sobrepor, por exemplo, Array.prototypetem seu próprio toStringque lista elementos delimitados por vírgula:

let arr2 = [1, 2, 3]
alert(arr2); // 1,2,3 <-- the result of Array.prototype.toString

/*

Como vimos antes, também Object.prototypetem toString, mas Array.prototypeestá mais próximo na cadeia, então a variante de array é usada.

As ferramentas do navegador, como o console do desenvolvedor do Chrome, também mostram herança ( console.dirpode ser necessário usar para objetos integrados):

Outros objetos internos também funcionam da mesma maneira. Funções pares – elas são objetos de um Functionconstrutor embutido, e seus métodos ( call/ applye outros) são retirados de Function.prototype. As funções também têm as suas próprias toString.

*/

function f() { }

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true, inherit from objects

/*

Primitivos
A coisa mais complicada acontece com strings, números e booleanos.

Como nos lembramos, eles não são objetos. Mas se tentarmos acessar suas propriedades, os objetos wrapper temporários serão criados usando construtores Stringintegrados Numbere Boolean. Eles fornecem os métodos e desaparecem.

Esses objetos são criados de forma invisível para nós e a maioria dos mecanismos os otimiza, mas a especificação descreve exatamente dessa maneira. Os métodos desses objetos também residem em protótipos, disponíveis como String.prototype, Number.prototypee Boolean.prototype.

Valores nulle undefinednão têm wrappers de objeto
Valores especiais nulle undefineddiferenciados. Eles não têm wrappers de objeto, portanto, métodos e propriedades não estão disponíveis para eles. E também não há protótipos correspondentes.

Alterando protótipos nativos
Protótipos nativos podem ser modificados. Por exemplo, se adicionarmos um método a String.prototype, ele ficará disponível para todas as strings:

*/

String.prototype.show = function () {
   alert(this);
};

"BOOM!".show(); // BOOM!

/*

Durante o processo de desenvolvimento, podemos ter ideias para novos métodos integrados que gostaríamos de ter e podemos ficar tentados a adicioná-los a protótipos nativos. Mas isso geralmente é uma má ideia.

Importante:
Os protótipos são globais, então é fácil entrar em conflito. Se duas bibliotecas adicionarem um método String.prototype.show, uma delas substituirá o método da outra.

Então, geralmente, modificar um protótipo nativo é considerado uma má ideia.

Na programação moderna, há apenas um caso em que a modificação de protótipos nativos é aprovada. Isso é polipreenchimento.

Polyfilling é um termo para fazer um substituto para um método que existe na especificação JavaScript, mas ainda não é suportado por um mecanismo JavaScript específico.

Podemos então implementá-lo manualmente e preencher o protótipo integrado com ele.

Por exemplo:

*/

if (!String.prototype.repeat) { // if there's no such method
   // add it to the prototype

   String.prototype.repeat = function (n) {
      // repeat the string n times

      // actually, the code should be a little bit more complex than that
      // (the full algorithm is in the specification)
      // but even an imperfect polyfill is often considered good enough
      return new Array(n + 1).join(this);
   };
}

alert("La".repeat(3)); // LaLaLa

/*

Empréstimo de protótipos
No capítulo Decorators e encaminhamentos, call/apply falamos sobre empréstimo de métodos.

É quando pegamos um método de um objeto e o copiamos para outro.

Alguns métodos de protótipos nativos são frequentemente emprestados.

Por exemplo, se estivermos criando um objeto semelhante a um array, podemos querer copiar alguns Arraymétodos para ele.

E.g.

*/

let obj3 = {
   0: "Hello",
   1: "World",
   length: 2,
};

obj3.join = Array.prototype.join;

alert( obj3.join(',') ); // Hello,world!

/*

Funciona porque o algoritmo interno do joinmétodo interno se preocupa apenas com os índices corretos e a lengthpropriedade. Ele não verifica se o objeto é realmente um array. Muitos métodos integrados são assim.

Outra possibilidade é herdar definindo obj.__proto__como Array.prototype, para que todos os Arraymétodos estejam automaticamente disponíveis em obj.

Mas isso é impossível se objjá herdar de outro objeto. Lembre-se, só podemos herdar de um objeto por vez.

Os métodos de empréstimo são flexíveis, permitem misturar funcionalidades de diferentes objetos, se necessário.

Resumo
Todos os objetos integrados seguem o mesmo padrão:
Os métodos são armazenados no protótipo ( Array.prototype, Object.prototype, Date.prototype, etc.)
O próprio objeto armazena apenas os dados (itens da matriz, propriedades do objeto, a data)
Primitivos também armazenam métodos em protótipos de objetos wrapper: Number.prototype, String.prototypee Boolean.prototype. Apenas undefinede nullnão tem objetos wrapper
Os protótipos integrados podem ser modificados ou preenchidos com novos métodos. Mas não é recomendado trocá-los. O único caso permitido é provavelmente quando adicionamos um novo padrão, mas ainda não é suportado pelo mecanismo JavaScript

*/


