/*

Verificação de classe: "instanceof"
O instanceofoperador permite verificar se um objeto pertence a uma determinada classe. Também leva em consideração a herança.

Tal verificação pode ser necessária em muitos casos. Por exemplo, pode ser usado para construir uma função polimórfica , aquela que trata os argumentos de forma diferente dependendo do seu tipo.

A instância do operador
A sintaxe é:

obj instanceof Class
Ele retorna truese objpertence ao Classou uma classe herdada dele.

Por exemplo:

*/

class Rabbit {}
let rabbit = new Rabbit();

// is it an object of Rabbit class?
alert( rabbit instanceof Rabbit ); // true

// Também funciona com funções construtoras:

// instead of class
function Rabbit() {}

alert( new Rabbit() instanceof Rabbit ); // true

// …E com classes integradas como Array:

let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true

/*

Por favor, note que arrtambém pertence à Objectclasse. Isso ocorre porque Arrayprototipicamente herda de Object.

Normalmente, instanceofexamina a cadeia de protótipos para a verificação. Também podemos definir uma lógica personalizada no método estático Symbol.hasInstance.

O algoritmo de obj instanceof Classfunciona mais ou menos assim:

1. Se houver um método estático Symbol.hasInstance, basta chamá-lo: Class[Symbol.hasInstance](obj). Ele deve retornar trueou false, e terminamos. É assim que podemos personalizar o comportamento do instanceof.

Por exemplo:

*/

// setup instanceOf check that assumes that
// anything with canEat property is an animal
class Animal {
   static [Symbol.hasInstance](obj) {
      if (obj.canEat) return true;
   }
}

let obj = { canEat: true };

alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called

/*

2. A maioria das classes não tem Symbol.hasInstance. Nesse caso, a lógica padrão é usada: obj instanceOf Classverifica se Class.prototypeé igual a um dos protótipos da objcadeia de protótipos.

Em outras palavras, compare um após o outro:

obj.__proto__ === Class.prototype?
obj.__proto__.__proto__ === Class.prototype?
obj.__proto__.__proto__.__proto__ === Class.prototype?
...
// if any answer is true, return true
// otherwise, if we reached the end of the chain, return false

No exemplo acima rabbit.__proto__ === Rabbit.prototype, so that dá a resposta imediatamente.

No caso de herança, a correspondência será na segunda etapa:

*/

class Animal {}
class Rabbit extends Animal {}

let rabbit2 = new Rabbit();
alert(rabbit instanceof Animal); // true

// rabbit.__proto__ === Animal.prototype (no match)
// rabbit.__proto__.__proto__ === Animal.prototype (match!)

/*

A propósito, há também um método objA.isPrototypeOf(objB) , que retorna truese objAestiver em algum lugar na cadeia de protótipos para objB. Portanto, o teste de obj instanceof Classpode ser reformulado como Class.prototype.isPrototypeOf(obj).

É engraçado, mas o Classpróprio construtor não participa da verificação! Apenas a cadeia de protótipos e Class.prototypequestões.

Isso pode levar a consequências interessantes quando uma prototypepropriedade é alterada após a criação do objeto.

Como aqui:

*/

function Rabbit() {}
let rabbit3 = new Rabbit();

// changed the prototype
Rabbit.prototype = {};

// ...not a rabbit any more!
alert( rabbit instanceof Rabbit ); // false

/*

Bônus: Object.prototype.toString para o tipo
Já sabemos que objetos simples são convertidos em string como [object Object]:

*/

let obj2 = {};

alert(obj); // [object Object]
alert(obj.toString()); // the same

/*

Essa é a implementação do toString. Mas há um recurso oculto que o torna toStringmuito mais poderoso do que isso. Podemos usá-lo como uma extensão typeofe uma alternativa para instanceof.

Soa estranho? De fato. Vamos desmistificar.

Pela especificação , o built-in toStringpode ser extraído do objeto e executado no contexto de qualquer outro valor. E seu resultado depende desse valor.

Para um número, será[object Number]
Para um booleano, será[object Boolean]
Para null:[object Null]
Para undefined:[object Undefined]
Para matrizes:[object Array]
… etc (personalizável).

Vamos demonstrar:

*/

// copy toString method into a variable for convenience
let objectToString = Object.prototype.toString;

// what type is this?
let arr2 = [];

alert( objectToString.call(arr) ); // [object Array]

/*

Aqui usamos call conforme descrito no capítulo Decorators e forwarding, call/apply para executar a função objectToStringno contexto this=arr.

Internamente, o toStringalgoritmo examina thise retorna o resultado correspondente. Mais exemplos:

*/

let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]

/*

Symbol.toStringTag
O comportamento de Object toStringpode ser customizado usando uma propriedade especial de objeto Symbol.toStringTag.

Por exemplo:

*/

let user = {
   [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]

// Para a maioria dos objetos específicos do ambiente, existe essa propriedade. Aqui estão alguns exemplos específicos do navegador:

// toStringTag for the environment-specific object and class:
alert( window[Symbol.toStringTag]); // Window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]

/*

Como você pode ver, o resultado é exatamente Symbol.toStringTag(se existir), agrupado em [object ...].

No final, temos o “typeof on steroids” que não só funciona para tipos de dados primitivos, mas também para objetos embutidos e até pode ser personalizado.

Podemos usar {}.toString.callem vez de instanceofpara objetos internos quando queremos obter o tipo como uma string em vez de apenas verificar.

Resumo
Vamos resumir os métodos de verificação de tipo que conhecemos:

trabalha para	retorna
typeof	primitivos	fragmento
{}.toString	primitivos, objetos embutidos, objetos comSymbol.toStringTag	fragmento
instanceof	objetos	verdadeiro falso
Como podemos ver, {}.toStringé tecnicamente um “mais avançado” typeof.

E instanceofo operador realmente brilha quando estamos trabalhando com uma hierarquia de classes e queremos verificar a classe levando em consideração a herança.

*/

