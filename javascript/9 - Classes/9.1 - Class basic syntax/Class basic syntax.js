/*

Sintaxe básica da classe
Na programação orientada a objetos, uma classe é um modelo de código de programa extensível para criar objetos, fornecendo valores iniciais para estado (variáveis ​​de membro) e implementações de comportamento (funções ou métodos de membro).

Wikipédia
Na prática, muitas vezes precisamos criar muitos objetos do mesmo tipo, como usuários, bens ou o que quer que seja.

Como já sabemos no capítulo Construtor, o operador "new" , new functionpode ajudar nisso.

Mas no JavaScript moderno, há uma construção de “classe” mais avançada, que apresenta novos recursos excelentes que são úteis para programação orientada a objetos.

A sintaxe da “classe”
A sintaxe básica é:

class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
Em seguida, use new MyClass()para criar um novo objeto com todos os métodos listados.

O constructor()método é chamado automaticamente por new, então podemos inicializar o objeto lá.

Por exemplo:

*/

class User {

   constructor(name) {
      this.name = name;
   }

   sayHi() {
      alert(this.name);
   }

}

// Usage:
let user = new User("John");
user.sayHi();

/*

Quando new User("John")é chamado:

1. Um novo objeto é criado.
2. O constructoré executado com o argumento fornecido e o atribui a this.name.

…Em seguida, podemos chamar métodos de objeto, como user.sayHi().

Sem vírgula entre os métodos de classe
Uma armadilha comum para desenvolvedores novatos é colocar uma vírgula entre os métodos de classe, o que resultaria em um erro de sintaxe.

A notação aqui não deve ser confundida com objetos literais. Dentro da classe, nenhuma vírgula é necessária.

O que é uma aula?
Então, o que exatamente é um class? Essa não é uma entidade totalmente nova em nível de linguagem, como se poderia pensar.

Vamos desvendar qualquer mágica e ver o que realmente é uma aula. Isso ajudará na compreensão de muitos aspectos complexos.

Em JavaScript, uma classe é um tipo de função.

Aqui, dê uma olhada:

*/

class User {
   constructor(name) { this.name = name; }
   sayHi() { alert(this.name); }
}

// proof: User is a function
alert(typeof User); // function

/*

O que class User {...}a construção realmente faz é:

1. Cria uma função chamada User, que se torna o resultado da declaração da classe. O código da função é retirado do constructormétodo (assumido vazio se não escrevermos tal método).
2. Armazena métodos de classe, como sayHi, em User.prototype.

Após new Usera criação do objeto, quando chamamos seu método, ele é retirado do protótipo, conforme descrito no capítulo F.prototype . Portanto, o objeto tem acesso aos métodos da classe.

Podemos ilustrar o resultado da class Userdeclaração como:


Aqui está o código para introspecção:

*/

class User {
   constructor(name) { this.name = name; }
   sayHi() { alert(this.name); }
}

// class is a function
alert(typeof User); // function

// ...or, more precisely, the constructor method
alert(User === User.prototype.constructor); // true

// The methods are in User.prototype, e.g:
alert(User.prototype.sayHi); // the code of the sayHi method

// there are exactly two methods in the prototype
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

/*

Não apenas um açúcar sintático
Às vezes as pessoas dizem que classé um “açúcar sintático” (sintaxe que é projetada para tornar as coisas mais fáceis de ler, mas não introduz nada de novo), porque na verdade poderíamos declarar a mesma coisa sem usar a classpalavra-chave:

*/

// rewriting class User in pure functions

// 1. Create constructor function
function User(name) {
   this.name = name;;
}
// a function prototype has "constructor" property by default,
// so we don't need to create it

// 2. Add the method to prototype
User.prototype.sayHi = function() {
   alert(this.name);
};

// Usage:
let user2 = new User("John");
user2.sayHi();

/*

O resultado desta definição é aproximadamente o mesmo. Portanto, existem de fato razões pelas quais classpode ser considerado um açúcar sintático para definir um construtor junto com seus métodos de protótipo.

Ainda assim, existem diferenças importantes.

1. Primeiro, uma função criada por classé rotulada por uma propriedade interna especial [[IsClassConstructor]]: true. Portanto, não é exatamente o mesmo que criá-lo manualmente.

O idioma verifica essa propriedade em vários lugares. Por exemplo, ao contrário de uma função regular, ela deve ser chamada com new:

*/

class User {
   constructor() {}
}

alert(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'

// Além disso, uma representação de string de um construtor de classe na maioria dos mecanismos JavaScript começa com a “classe…”

class User {
   constructor() {}
}
 
alert(User); // class User { ... }

/*

Existem outras diferenças, veremos em breve.

2. Os métodos de classe não são enumeráveis. Uma definição de classe define enumerablesinalizador falsepara todos os métodos no arquivo "prototype".

Isso é bom porque, se for..insobrecarregarmos um objeto, geralmente não queremos seus métodos de classe.

3. Aulas sempre use strict. Todo o código dentro da construção da classe está automaticamente no modo estrito.

Além disso, classa sintaxe traz muitos outros recursos que exploraremos mais adiante.

Expressão de classe
Assim como as funções, as classes podem ser definidas dentro de outra expressão, passadas, retornadas, atribuídas, etc.

Aqui está um exemplo de uma expressão de classe:

let User = class {
  sayHi() {
    alert("Hello");
  }
};

Semelhante às expressões de função nomeada, as expressões de classe podem ter um nome.

Se uma expressão de classe tiver um nome, ele ficará visível apenas dentro da classe:

*/

// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User = class MyClass {
   sayHi() {
     alert(MyClass); // MyClass name is visible only inside the class
   }
};
 
new User().sayHi(); // works, shows MyClass definition
 
alert(MyClass); // error, MyClass name isn't visible outside of the class

// Podemos até fazer classes dinamicamente “sob demanda”, assim:

function makeClass(phrase) {
   // declare a class and return it
   return class {
      sayHi() {
         alert(phrase);
      }
   };
}

// Create a new class
let User = makeClass("Hello");

new User().sayHi(); // Hello

/*

Getters/setters
Assim como os objetos literais, as classes podem incluir getters/setters, propriedades calculadas, etc.

Aqui está um exemplo para user.nameimplementar usando get/set:

*/

class User {

   constructor(name) {
      // invokes the setter
      this.name = name;
   }

   get name() {
      return this._name;
   }

   set name(value) {
      if (value.length < 4) {
         alert("Name is too short.");
         return;
      }
      this._name = value;
   }

}

let user3 = new User("John");
alert(user3.name); // John

user3 = new User(""); // Name is too short.

/*

Tecnicamente, essa declaração de classe funciona criando getters e setters em User.prototype.

Nomes computados […]
Aqui está um exemplo com um nome de método computado usando colchetes [...]:

*/

class User {

   ['say' + "Hi"]() {
      alert("Hello");
   }

}

new User().sayHi();

/*

Tais recursos são fáceis de lembrar, pois se assemelham aos de objetos literais.

Campos de classe

Navegadores antigos podem precisar de um polyfill
Os campos de classe são uma adição recente à linguagem.

Anteriormente, nossas classes tinham apenas métodos.

“Campos de classe” é uma sintaxe que permite adicionar quaisquer propriedades.

Por exemplo, vamos adicionar namepropriedade a class User:

*/

class User {
   name = "John";

   sayHi() {
      alert(`Hello, ${this.name}!`);
   }
}

new User().sayHi(); // Hello, John;

/*

Então, nós apenas escrevemos " = " na declaração, e é isso.

A diferença importante dos campos de classe é que eles são definidos em objetos individuais, não User.prototype:

*/

class User {
   name = "John";
}

let user4 = new User();
alert(user4.name); // John
alert(User.prototype.name); // undefined

// Também podemos atribuir valores usando expressões mais complexas e chamadas de função:

class User {
   name = prompt("Name, please?", "John");
}

let user5 =  new User();
alert(user5.name); // John

/*

Fazendo métodos vinculados com campos de classe
Conforme demonstrado no capítulo Function binding , as funções em JavaScript têm um arquivo this. Depende do contexto da chamada.

Portanto, se um método de objeto for passado e chamado em outro contexto, thisnão será mais uma referência ao seu objeto.

Por exemplo, este código mostrará undefined:

*/

class Button {
   constructor(value) {
      this.value = value;
   }

   click() {
      alert(this.value);
   }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefined

/*

O problema é chamado de "perder this".

Existem duas abordagens para corrigi-lo, conforme discutido no capítulo Ligação de função :

1. Passe uma função wrapper, como setTimeout(() => button.click(), 1000).
2. Vincule o método ao objeto, por exemplo, no construtor.

Os campos de classe fornecem outra sintaxe bastante elegante:

*/

class Button {
   constructor(value) {
      this.value = value;
   }
   click = () => {
      alert(this.value);
   }
}

let button3 = new Button("hello");

setTimeout(button3.click, 1000); // hello

/* 

O campo de classe click = () => {...}é criado por objeto, há uma função separada para cada Buttonobjeto, thisdentro dele referenciando esse objeto. Podemos passar button.clickpor qualquer lugar, e o valor de thisestará sempre correto.

Isso é especialmente útil no ambiente do navegador, para ouvintes de eventos.

Resumo
A sintaxe básica da classe se parece com isso:

class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}
MyClass é tecnicamente uma função (aquela que fornecemos como constructor), enquanto métodos, getters e setters são gravados em MyClass.prototype.

Nos próximos capítulos aprenderemos mais sobre classes, incluindo herança e outros recursos.

*/

