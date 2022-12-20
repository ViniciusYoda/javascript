/*

F. protótipo
Lembre-se, novos objetos podem ser criados com uma função construtora, como new F().

Se F.prototypefor um objeto, o newoperador o usará para definir [[Prototype]]o novo objeto.

Observe:
JavaScript teve herança prototípica desde o início. Era uma das principais características da linguagem.

Mas antigamente não havia acesso direto a ele. A única coisa que funcionou de forma confiável foi uma "prototype"propriedade da função construtora, descrita neste capítulo. Portanto, existem muitos scripts que ainda o usam.

Por favor, note que F.prototypeaqui significa uma propriedade regular nomeada "prototype"em F. Parece algo semelhante ao termo “protótipo”, mas aqui realmente queremos dizer uma propriedade regular com esse nome.

Aqui está o exemplo:

*/

let animal = {
   eats: true
};

function Rabbit(name) {
   this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); // rabbit.__proto__ == animal

alert( rabbit.eats ); // true

/*

A configuração Rabbit.prototype = animalafirma literalmente o seguinte: "Quando um new Rabbitfor criado, atribua-o [[Prototype]]a animal".

Essa é a imagem resultante:

Na figura, "prototype"há uma seta horizontal, significando uma propriedade regular, e [[Prototype]]vertical, significando a herança de rabbitfrom animal

F.prototypeusado apenas na new Fhora
F.prototypepropriedade só é usada quando new Fé chamada, atribui [[Prototype]]do novo objeto.

Se, após a criação, a F.prototypepropriedade mudar ( F.prototype = <another object>), então novos objetos criados por new Fterão outro objeto como [[Prototype]], mas objetos já existentes manterão o antigo.

F.prototype padrão, propriedade do construtor
Toda função tem a "prototype"propriedade, mesmo que não a forneçamos.

O padrão "prototype"é um objeto com a única propriedade constructorque aponta para a própria função.

Assim:

function Rabbit() {}

/* default prototype
Rabbit.prototype = { constructor: Rabbit };
*/

// Podemos verificar:

function Rabbit() {}
// by default:
// Rabbit.prototype = { constructor: Rabbit }

alert( Rabbit.prototype.constructor == Rabbit ); // true

// Naturalmente, se não fizermos nada, a constructorpropriedade estará disponível para todos os coelhos através de [[Prototype]]:

function Rabbit() {}
// by default:
// Rabbit.prototype = { constructor: Rabbit }

let rabbit1 = new Rabbit();  // inherits from {constructor: Rabbit}

alert(rabbit.constructor == Rabbit); // true (from prototype)

/*

Naturalmente, se não fizermos nada, a constructorpropriedade estará disponível para todos os coelhos através de [[Prototype]]:

*/

function Rabbit(name) {
   this.name = name;
   alert(name);
}

let rabbit2 = new Rabbit("White Rabbit");

let rabbit3 = new rabbit.constructor("Black Rabbit");

/*

Isso é útil quando temos um objeto, não sabemos qual construtor foi usado para ele (por exemplo, vem de uma biblioteca de terceiros) e precisamos criar outro do mesmo tipo.

Mas provavelmente a coisa mais importante "constructor"é que…

…JavaScript em si não garante o "constructor"valor correto.

Sim, existe no padrão "prototype"para funções, mas isso é tudo. O que acontece com ele depois – é totalmente por nossa conta.

Em particular, se substituirmos o protótipo padrão como um todo, não haverá "constructor"nele.

Por exemplo:

*/

function Rabbit() {}
Rabbit.prototype = {
   jumps: true
};

let rabbit4 = new Rabbit();
alert(rabbit.constructor === Rabbit); // false

/*

Assim, para manter o direito "constructor", podemos optar por adicionar/remover propriedades ao padrão "prototype"em vez de sobrescrevê-lo como um todo:

function Rabbit() {}

// Not overwrite Rabbit.prototype totally
// just add to it
Rabbit.prototype.jumps = true
// the default Rabbit.prototype.constructor is preserved
Ou, como alternativa, recrie a constructorpropriedade manualmente:

Rabbit.prototype = {
  jumps: true,
  constructor: Rabbit
};

// now constructor is also correct, because we added it

Resumo
Neste capítulo, descrevemos brevemente a maneira de definir a [[Prototype]]para objetos criados por meio de uma função construtora. Mais adiante veremos padrões de programação mais avançados que dependem dele.

Tudo é bastante simples, apenas algumas notas para esclarecer as coisas:

A F.prototypepropriedade (não confunda com [[Prototype]]) conjuntos [[Prototype]]de novos objetos quando new F()é chamada.
O valor de F.prototypedeve ser um objeto ou null: outros valores não funcionarão.
A "prototype"propriedade só tem esse efeito especial quando definida em uma função construtora e invocada com new.
Em objetos regulares, prototypenão há nada de especial:

let user = {
  name: "John",
  prototype: "Bla-bla" // no magic at all
};
Por padrão todas as funções possuem F.prototype = { constructor: F }, então podemos obter o construtor de um objeto acessando sua "constructor"propriedade.

*/



