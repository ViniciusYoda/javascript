/*

Tipo de símbolo
Por especificação, apenas dois tipos primitivos podem servir como chaves de propriedade do objeto:

tipo de string ou
tipo de símbolo.
Caso contrário, se alguém usar outro tipo, como número, ele será convertido automaticamente em string. Então isso obj[1]é o mesmo que obj["1"], e obj[true]é o mesmo que obj["true"].

Até agora estamos usando apenas strings.

Agora vamos explorar os símbolos, ver o que eles podem fazer por nós.

Símbolos
Um “símbolo” representa um identificador único.

Um valor desse tipo pode ser criado usando Symbol():

*/

let id = Symbol();

// Após a criação, podemos dar aos símbolos uma descrição (também chamada de nome de símbolo), útil principalmente para fins de depuração:

// id is a symbol with the description "id"
let id = Symbol("id");

/*

Os símbolos são garantidos como únicos. Mesmo que criemos muitos símbolos com exatamente a mesma descrição, eles são valores diferentes. A descrição é apenas um rótulo que não afeta nada.

Por exemplo, aqui estão dois símbolos com a mesma descrição – eles não são iguais:

*/

let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false

/*

Se você estiver familiarizado com Ruby ou outra linguagem que também tenha algum tipo de “símbolos” – por favor, não se engane. Os símbolos JavaScript são diferentes.

Então, para resumir, um símbolo é um “valor único primitivo” com uma descrição opcional. Vamos ver onde podemos usá-los.

Símbolos não se convertem automaticamente em uma string
A maioria dos valores em JavaScript oferece suporte à conversão implícita em uma string. Por exemplo, podemos alertquase qualquer valor, e funcionará. Os símbolos são especiais. Eles não se convertem automaticamente.

Por exemplo, isso alertmostrará um erro:

*/

let id = Symbol("id");
alert(id); // TypeError: Cannot convert a Symbol value to a string

/*

Isso é uma “proteção de linguagem” contra confusão, porque strings e símbolos são fundamentalmente diferentes e não devem se converter acidentalmente um no outro.

Se realmente queremos mostrar um símbolo, precisamos chamá .toString()-lo explicitamente, como aqui:

*/

let id = Symbol("id");
alert(id.toString()); // Symbol(id), now it works

// Ou obtenha symbol.descriptiona propriedade para mostrar apenas a descrição:

let id = Symbol("id");
alert(id.description); // id

/*

Propriedades “ocultas”
Os símbolos nos permitem criar propriedades “ocultas” de um objeto, que nenhuma outra parte do código pode acessar ou substituir acidentalmente.

Por exemplo, se estivermos trabalhando com userobjetos, que pertencem a um código de terceiros. Gostaríamos de adicionar identificadores a eles.

Vamos usar uma chave de símbolo para isso:

*/

let user = { // belongs to another code
    name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // we can access the data using the symbol as the key

/*

Qual é o benefício de usar Symbol("id")sobre uma string "id"?

Como useros objetos pertencem a outra base de código, não é seguro adicionar campos a eles, pois podemos afetar o comportamento predefinido nessa outra base de código. No entanto, os símbolos não podem ser acessados ​​acidentalmente. O código de terceiros não estará ciente dos símbolos recém-definidos, portanto, é seguro adicionar símbolos aos userobjetos.

Além disso, imagine que outro script queira ter seu próprio identificador dentro userde , para seus próprios propósitos.

Então esse script pode criar seu próprio Symbol("id"), assim:

*/

// ...
let id = Symbol("id");

user[id] = "Their id value";

/*

Não haverá conflito entre nossos e seus identificadores, pois os símbolos são sempre diferentes, mesmo que tenham o mesmo nome.

…Mas se usássemos uma string "id"em vez de um símbolo para o mesmo propósito, haveria um conflito:

*/

let user = { name: "John" };

// Our script uses "id" property
user.id = "Our id value";

// ...Another script also wants "id" for its purposes...

user.id = "Their id value"
// Boom! everwritten by another script

/*

Símbolos em um literal de objeto
Se quisermos usar um símbolo em um literal de objeto {...}, precisamos de colchetes ao redor dele.

Assim:

*/

let id = Symbol("id");

let user = {
    name: "John",
    [id]: 123 // not "id": 123
};

/*

Isso porque precisamos do valor da variável idcomo chave, não da string “id”.

Os símbolos são ignorados por… em
Propriedades simbólicas não participam de for..inloop.

Por exemplo:

*/

let id = Symbol("id");
let user = {
    name: "John",
    age: 30,
    [id]: 123
};

for (let key in user) alert(key); // name, age (no symbols)

// the direct access by the symbol works
alert( "Direct: " + user[id] ); // Direct> 123

/*

Object.keys(user) também os ignora. Isso faz parte do princípio geral de “ocultar propriedades simbólicas”. Se outro script ou biblioteca fizer um loop sobre nosso objeto, ele não acessará inesperadamente uma propriedade simbólica.

Em contraste, Object.assign copia as propriedades de string e símbolo:

*/

let id = Symbol("id");
let user = {
    [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123

/*

Não há paradoxo aqui. Isso é por design. A ideia é que quando clonamos um objeto ou mesclamos objetos, geralmente queremos que todas as propriedades sejam copiadas (incluindo símbolos como id).

Símbolos globais
Como vimos, geralmente todos os símbolos são diferentes, mesmo que tenham o mesmo nome. Mas às vezes queremos que os símbolos com o mesmo nome sejam as mesmas entidades. Por exemplo, diferentes partes do nosso aplicativo desejam acessar o símbolo "id"que significa exatamente a mesma propriedade.

Para isso, existe um registro global de símbolos . Podemos criar símbolos nele e acessá-los posteriormente, e isso garante que acessos repetidos pelo mesmo nome retornem exatamente o mesmo símbolo.

Para ler (criar se ausente) um símbolo do registro, use Symbol.for(key).

Essa chamada verifica o registro global e, se houver um símbolo descrito como key, o retorna, caso contrário, cria um novo símbolo Symbol(key)e o armazena no registro pelo determinadokey .

Por exemplo:

*/

// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true

/*

Os símbolos dentro do registro são chamados de símbolos globais . Se queremos um símbolo para todo o aplicativo, acessível em qualquer lugar no código – é para isso que eles servem.

Isso soa como Ruby
Em algumas linguagens de programação, como Ruby, há um único símbolo por nome.

Em JavaScript, como podemos ver, isso é verdade para símbolos globais.

Symbol.keyFor
Vimos que para símbolos globais, Symbol.for(key)retorna um símbolo pelo nome. Para fazer o contrário – retornar um nome pelo símbolo global – podemos usar: Symbol.keyFor(sym):

Por exemplo:

*/

// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id

/*

O Symbol.keyForinternamente usa o registro de símbolo global para procurar a chave para o símbolo. Portanto, não funciona para símbolos não globais. Se o símbolo não for global, ele não poderá encontrá-lo e retornará undefined.

Dito isto, todos os símbolos têm a descriptionpropriedade.

Por exemplo:

*/

let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); /// name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name

/*

Símbolos do sistema
Existem muitos símbolos de “sistema” que o JavaScript usa internamente e podemos usá-los para ajustar vários aspectos de nossos objetos.

Eles estão listados na especificação na tabela de símbolos conhecidos :

Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.iterator
Symbol.toPrimitive
…e assim por diante.
Por exemplo, Symbol.toPrimitivenos permite descrever objeto para conversão primitiva. Veremos seu uso muito em breve.

Outros símbolos também se tornarão familiares quando estudarmos os recursos de linguagem correspondentes.

Resumo
Symbolé um tipo primitivo para identificadores exclusivos.

Os símbolos são criados com Symbol()chamada com uma descrição opcional (nome).

Os símbolos são sempre valores diferentes, mesmo que tenham o mesmo nome. Se quisermos que os símbolos de mesmo nome sejam iguais, devemos usar o registro global: Symbol.for(key)retorna (cria se necessário) um símbolo global com keyo nome. Várias chamadas de Symbol.forcom o mesmo keyretornam exatamente o mesmo símbolo.

Os símbolos têm dois casos de uso principais:

Propriedades do objeto “oculto”.

Se quisermos adicionar uma propriedade em um objeto que “pertence” a outro script ou biblioteca, podemos criar um símbolo e usá-lo como chave de propriedade. Uma propriedade simbólica não aparece em for..in, portanto, não será processada acidentalmente junto com outras propriedades. Também não será acessado diretamente, pois outro script não possui nosso símbolo. Assim, a propriedade estará protegida contra uso acidental ou substituição.

Assim, podemos esconder “dissimuladamente” algo em objetos que precisamos, mas outros não devem ver, usando propriedades simbólicas.

Existem muitos símbolos de sistema usados ​​pelo JavaScript que são acessíveis como arquivos Symbol.*. Podemos usá-los para alterar alguns comportamentos internos. Por exemplo, mais adiante no tutorial usaremos Symbol.iteratorpara iterables , Symbol.toPrimitivepara configurar a conversão de objeto para primitivo e assim por diante.

Tecnicamente, os símbolos não estão 100% ocultos. Existe um método embutido Object.getOwnPropertySymbols(obj) que nos permite obter todos os símbolos. Também existe um método chamado Reflect.ownKeys(obj) que retorna todas as chaves de um objeto incluindo as simbólicas. Mas a maioria das bibliotecas, funções internas e construções de sintaxe não usam esses métodos.

*/

