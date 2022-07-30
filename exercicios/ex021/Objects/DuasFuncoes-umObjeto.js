//É possível criar funções Ae Bassim new A() == new B()?

function A() {}
function B() {}

var a = new A();
var b = new B();

console.log( a == b );

/*

Sim é possivel.

Se uma função retornar um objeto, newele o retornará em vez de this.

Assim, eles podem, por exemplo, retornar o mesmo objeto definido externamente obj:

*/

var obj = {};

function A() { return obj; }

function B() { return obj; }

console.log( new A() == new B() ); // true