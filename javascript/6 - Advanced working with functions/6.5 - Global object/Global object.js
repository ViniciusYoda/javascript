/*

objeto global
O objeto global fornece variáveis ​​e funções que estão disponíveis em qualquer lugar. Por padrão, aqueles que estão embutidos na linguagem ou no ambiente.

Em um navegador é nomeado window, para Node.js é global, para outros ambientes pode ter outro nome.

Recentemente, globalThisfoi adicionado à linguagem, como um nome padronizado para um objeto global, que deve ser suportado em todos os ambientes. É compatível com todos os principais navegadores.

Usaremos windowaqui, assumindo que nosso ambiente é um navegador. Se o seu script puder ser executado em outros ambientes, é melhor usá -lo globalThis.

Todas as propriedades do objeto global podem ser acessadas diretamente:

*/

alert("Hello");
// is the same as
window.alert("Hello");

// Em um navegador, funções e variáveis ​​globais declaradas com var(não let/const!) tornam-se propriedade do objeto global:

var gVar = 5;

alert(window.gVar); // 5 (became a property of the global object)

/*

As declarações de função têm o mesmo efeito (declarações com palavra- functionchave no fluxo de código principal, não expressões de função).

Por favor, não confie nisso! Esse comportamento existe por motivos de compatibilidade. Os scripts modernos usam módulos JavaScript onde isso não acontece.

Se usássemos letem vez disso, tal coisa não aconteceria:

*/

let gLet = 5;

alert(window.gLet); // undefined (doesn't become a property of the global object)

// Se um valor for tão importante que você gostaria de disponibilizá-lo globalmente, escreva-o diretamente como uma propriedade:

// make current user information global, to let all scripts access it
window.currentUser = {
   name: "John"
};

// somewhere else in code
alert(currentUser.name);  // John

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
alert(window.currentUser.name); // John

/*

Dito isso, o uso de variáveis ​​globais geralmente é desencorajado. Deve haver o mínimo possível de variáveis ​​globais. O design do código em que uma função obtém variáveis ​​de “entrada” e produz determinado “resultado” é mais claro, menos propenso a erros e mais fácil de testar do que se usar variáveis ​​externas ou globais.

Usando para polyfills
Usamos o objeto global para testar o suporte de recursos de linguagem moderna.

Por exemplo, teste se existe um Promiseobjeto embutido (não existe em navegadores realmente antigos):

*/

if (!window.Promise) {
   alert("Your browser is really old");
}

// Se não houver nenhum (digamos, estamos em um navegador antigo), podemos criar “polyfills”: adicionar funções que não são suportadas pelo ambiente, mas existem no padrão moderno.

if (!window.Promise) {
   window.Promise = '...' // custom implementation of the modern language feature
}

/*

Resumo
O objeto global contém variáveis ​​que devem estar disponíveis em todos os lugares.

Isso inclui JavaScript embutido, como Arraye valores específicos do ambiente, como window.innerHeight– a altura da janela no navegador.

O objeto global tem um nome universal globalThis.

…Mas, com mais frequência, é referido por nomes específicos de ambiente "velha escola", como window(navegador) e global(Node.js).

Devemos armazenar valores no objeto global somente se eles forem realmente globais para nosso projeto. E mantenha seu número no mínimo.

No navegador, a menos que estejamos usando módulos , funções globais e variáveis ​​declaradas com vartornam-se uma propriedade do objeto global.

Para tornar nosso código à prova de futuro e mais fácil de entender, devemos acessar as propriedades do objeto global diretamente, como window.x.

*/

