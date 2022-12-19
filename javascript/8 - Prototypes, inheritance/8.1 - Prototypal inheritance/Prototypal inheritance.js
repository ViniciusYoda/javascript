/*

herança prototípica
Na programação, geralmente queremos pegar algo e estendê-lo.

Por exemplo, temos um userobjeto com suas propriedades e métodos e queremos criar variantes ligeiramente modificadas dele admin. guestGostaríamos de reutilizar o que temos em user, não copiar/reimplementar seus métodos, apenas construir um novo objeto sobre ele.

A herança prototípica é um recurso de linguagem que ajuda nisso.

[[Protótipo]]
Em JavaScript, os objetos têm uma propriedade oculta especial [[Prototype]](conforme nomeada na especificação), que é nullou faz referência a outro objeto. Esse objeto é chamado de “um protótipo”:


Quando lemos uma propriedade de object, e ela está faltando, o JavaScript a pega automaticamente do protótipo. Na programação, isso é chamado de “herança prototípica”. E em breve estudaremos muitos exemplos dessa herança, bem como recursos de linguagem mais interessantes construídos sobre ela.

A propriedade [[Prototype]]é interna e oculta, mas há muitas maneiras de defini-la.

Uma delas é usar o nome especial __proto__, assim:

*/

let animal = {
   eats: true
};
let rabbit = {
   jumps: true
};

rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal

/*

Agora, se lermos uma propriedade de rabbit, e ela estiver ausente, o JavaScript a retirará automaticamente de animal.

Por exemplo:

let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // (*)

// we can find both properties in rabbit now:
alert( rabbit.eats ); // true (**)
alert( rabbit.jumps ); // true

Aqui a linha se (*)configura animalcomo o protótipo do rabbit.

Então, quando alerttenta ler a propriedade rabbit.eats (**), ela não está em rabbit, então o JavaScript segue a [[Prototype]]referência e a encontra em animal(olhe de baixo para cima):


Aqui podemos dizer que " animalé o protótipo de rabbit" ou " rabbitherda prototipicamente de animal".

Portanto, se animalhouver muitas propriedades e métodos úteis, eles se tornarão automaticamente disponíveis no rabbit. Tais propriedades são chamadas de “herdadas”.

Se tivermos um método em animal, ele pode ser chamado em rabbit:

*/

let animal2 = {
   eats: true,
   walk() {
      alert("Animal walk");
   }
};

let rabbit = {
   jumps: true,
   __proto__: animal2
};

// walk is taken from the prototype
rabbit.walk(); // Animal walk

/*

O método é retirado automaticamente do protótipo, assim:


A cadeia de protótipos pode ser mais longa:

*/

let animal3 = {
   eats: true,
   walk() {
      alert("Animal walk");
   }
};

let rabbit = {
   jumps: true,
   __proto__: animal3
};

let longEar = {
   earLength: 10,
   __proto__: rabbit
};

// walk is taken from the prototype chain
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (from rabbit)

/*

Agora, se lermos algo de longEar, e estiver faltando, o JavaScript irá procurá-lo em rabbit, e depois em animal.

Existem apenas duas limitações:

1. As referências não podem andar em círculos. O JavaScript lançará um erro se tentarmos atribuir __proto__em um círculo.
2. O valor de __proto__pode ser um objeto ou null. Outros tipos são ignorados.

Também pode ser óbvio, mas ainda assim: só pode haver um arquivo [[Prototype]]. Um objeto não pode herdar de dois outros.

__proto__é um getter/setter histórico para[[Prototype]]
É um erro comum de desenvolvedores novatos não saber a diferença entre esses dois.

Por favor, note que não __proto__é o mesmo que a propriedade interna [[Prototype]]. É um getter/setter para [[Prototype]]. Mais tarde, veremos situações em que isso importa, por enquanto, vamos apenas manter isso em mente, enquanto construímos nosso entendimento da linguagem JavaScript.

A __proto__propriedade está um pouco desatualizada. Ele existe por razões históricas, o JavaScript moderno sugere que devemos usar Object.getPrototypeOf/Object.setPrototypeOffunções que obtêm/configuram o protótipo. Também abordaremos essas funções mais tarde.

Pela especificação, __proto__deve ser suportado apenas por navegadores. Na verdade, porém, todos os ambientes, incluindo suporte do lado do servidor __proto__, estamos bastante seguros ao usá-lo.

Como a __proto__notação é um pouco mais óbvia intuitivamente, nós a usamos nos exemplos.

Escrever não usa protótipo
O protótipo é usado apenas para propriedades de leitura.

As operações de gravação/exclusão funcionam diretamente com o objeto.

No exemplo abaixo, atribuímos seu próprio walkmétodo a rabbit:

*/

let animal4 = {
   eats: true,
   walk() {
      /* this method won-t be used by rabbit */
   }
};

let rabbit = {
   __proto__: animal4
};

rabbit.walk = function() {
   alert("Rabbit! Bounce-bounce");
};

rabbit.walk(); // Rabbit! Bounce-bounce!

/*

A partir de agora, rabbit.walk()call encontra o método imediatamente no objeto e o executa, sem usar o protótipo:


As propriedades do acessador são uma exceção, pois a atribuição é tratada por uma função setter. Portanto, escrever em tal propriedade é, na verdade, o mesmo que chamar uma função.

Por esse motivo admin.fullNamefunciona corretamente no código abaixo:

*/

let user = {
   name: "John",
   surname: "Smith",

   set fullName(value) {
      [this.name, this.surname] = value.split(" ");
   },

   get fullName() {
      return `${this.name} ${this.surname}`;
   }
};

let admin = {
   __proto__: user,
   isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)

alert(admin.fullName); // Alice Cooper, state of admin modified
alert(user.fullName); // John Smith, state of user protected

/*

Aqui na linha (*)a propriedade admin.fullNametem um getter no protótipo user, por isso é chamado. E na linha (**)a propriedade tem um setter no protótipo, por isso é chamado.

O valor de “isso”
Uma questão interessante pode surgir no exemplo acima: qual é o valor de thisinside set fullName(value)? Onde estão as propriedades this.namee this.surnameescritas: into userou admin?

A resposta é simples: thisnão é afetado por protótipos.

Não importa onde o método se encontre: em um objeto ou em seu protótipo. Em uma chamada de método, thisé sempre o objeto antes do ponto.

Portanto, a chamada do setter admin.fullName=usa adminas this, não user.

Na verdade, isso é superimportante, porque podemos ter um objeto grande com muitos métodos e objetos que herdam dele. E quando os objetos herdados executarem os métodos herdados, eles modificarão apenas seus próprios estados, não o estado do objeto grande.

Por exemplo, aqui animalrepresenta um “método de armazenamento” e rabbitfaz uso dele.

A chamada rabbit.sleep()define this.isSleepingno rabbitobjeto:

*/

// animal has methods 
let animal5 = {
   walk() {
      if (!this.isSleeping) {
         alert(`I walk`);
      }
   },
   sleep() {
      this.isSleeping = true;
   }
};

let rabbit = {
   name: "White Rabbit",
   __proto__: animal5
};

// modifies rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype)

/*

A imagem resultante:


Se tivéssemos outros objetos, como bird, snake, etc., herdados de animal, eles também teriam acesso aos métodos de animal. Mas thisem cada chamada de método estaria o objeto correspondente, avaliado no momento da chamada (antes do ponto), não animal. Portanto, quando escrevemos dados em this, eles são armazenados nesses objetos.

Como resultado, os métodos são compartilhados, mas o estado do objeto não.

para... em loop
O for..inloop itera sobre as propriedades herdadas também.

Por exemplo:

*/

let animal6 = {
   eats: true
};

let rabbit = {
   jumps: true,
   __proto__: animal6
};

// Object.keys only returns own keys
alert(Object.keys(rabbit)); // jumps

// for..in loops over both own and inherited keys
for(let prop in rabbit) alert(prop); // jumps, then eats

/*

Se não for isso que queremos e gostaríamos de excluir as propriedades herdadas, existe um método interno obj.hasOwnProperty(key) : ele retorna truese objtiver sua própria propriedade (não herdada) chamada key.

Assim, podemos filtrar as propriedades herdadas (ou fazer outra coisa com elas):

*/

let animal7 = {
   eats: true
};

let rabbit = {
   jumps: true,
   __proto__: animal7
};

for(let prop in rabbit) {
   let isOwn = rabbit.hasOwnProperty(prop);

   if (isOwn) {
      alert(`Our: ${prop}`); // Our: jumps
   } else {
      alert(`Inherited: ${prop}`); // Inherited: eats
   }
}

/*

Aqui temos a seguinte cadeia de herança: rabbitherda de animal, que herda de Object.prototype(porque animalé um objeto literal {...}, então é por padrão), e nullacima dele:


Note, há uma coisa engraçada. De onde vem o método rabbit.hasOwnProperty? Nós não definimos isso. Olhando para a cadeia, podemos ver que o método é fornecido por Object.prototype.hasOwnProperty. Em outras palavras, é herdado.

Aqui temos a seguinte cadeia de herança: rabbitherda de animal, que herda de Object.prototype(porque animalé um objeto literal {...}, então é por padrão), e nullacima dele:


Note, há uma coisa engraçada. De onde vem o método rabbit.hasOwnProperty? Nós não definimos isso. Olhando para a cadeia, podemos ver que o método é fornecido por Object.prototype.hasOwnProperty. Em outras palavras, é herdado.

Quase todos os outros métodos de obtenção de chave/valor ignoram as propriedades herdadas
Quase todos os outros métodos de obtenção de chave/valor, como Object.keys, Object.valuese assim por diante, ignoram as propriedades herdadas.

Eles operam apenas no próprio objeto. As propriedades do protótipo não são levadas em consideração.

Resumo
Em JavaScript, todos os objetos têm uma propriedade oculta [[Prototype]]que é outro objeto ou null.
Podemos usar obj.__proto__para acessá-lo (um getter/setter histórico, existem outras maneiras, a serem abordadas em breve).
O objeto referenciado por [[Prototype]]é chamado de “protótipo”.
Se quisermos ler uma propriedade objou chamar um método e ele não existir, o JavaScript tentará encontrá-lo no protótipo.
As operações de gravação/exclusão agem diretamente no objeto, não usam o protótipo (supondo que seja uma propriedade de dados, não um setter).
Se chamarmos obj.method(), e methodfor retirado do protótipo, thisainda referenciará obj. Portanto, os métodos sempre funcionam com o objeto atual, mesmo que sejam herdados.
O for..inloop itera sobre suas próprias propriedades e herdadas. Todos os outros métodos de obtenção de chave/valor operam apenas no próprio objeto.

*/

