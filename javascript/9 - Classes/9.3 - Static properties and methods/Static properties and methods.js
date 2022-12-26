/*

Propriedades e métodos estáticos
Também podemos atribuir um método à classe como um todo. Esses métodos são chamados de estáticos .

Em uma declaração de classe, eles são precedidos por staticpalavra-chave, assim:

*/

class User {
   static staticMethod() {
      alert(this === User);
   }
}

User.staticMethod(); // true

// Na verdade, isso faz o mesmo que atribuí-lo como uma propriedade diretamente:

class User { }

User.staticMethod = function() {
   alert(this === User);
};

User.staticMethod(); // true

/*

O valor de thisin User.staticMethod()call é o próprio construtor da classe User(a regra do “objeto antes do ponto”).

Normalmente, métodos estáticos são usados ​​para implementar funções que pertencem à classe como um todo, mas não a nenhum objeto específico dela.

Por exemplo, temos Articleobjetos e precisamos de uma função para compará-los.

Uma solução natural seria adicionar o Article.comparemétodo estático:

*/

class Article {
   constructor(title, date) {
      this.title = title;
      this.date = date;
   }

   static compare(articleA, articleB) {
      return articleA.date - articleB.date;
   }
}

// usage
let articles = [
   new Article("HTML", new Date(2019, 1, 1)),
   new Article("CSS", new Date(2019, 0, 1)),
   new Article("JavaScript", new Date(2019, 11, 1))
];

articles.sort(Article.compare);

alert( articles[0].title ); // CSS

/*

Aqui Article.compareo método está “acima” dos artigos, como forma de compará-los. Não é um método de um artigo, mas sim de toda a turma.

Outro exemplo seria o chamado método de “fábrica”.

Digamos que precisamos de várias maneiras de criar um artigo:

1. Crie por parâmetros fornecidos ( title, dateetc).
2. Crie um artigo vazio com a data de hoje.
3. …ou então de alguma forma.

A primeira forma pode ser implementada pelo construtor. E para o segundo podemos fazer um método estático da classe.

Como Article.createTodays()aqui:

*/

class Article {
   constructor(title, date) {
      this.title = title;
      this.date = date;
   }

   static createTodays() {
      // remember, this = Article
      return new this("Today's digest", new Date());
   }
}

let article = Article.createTodays();

alert( article.title ); // Today's digest

/*

Agora, toda vez que precisarmos criar um resumo de hoje, podemos chamar Article.createTodays(). Mais uma vez, esse não é um método de um artigo, mas um método de toda a classe.

Métodos estáticos também são usados ​​em classes relacionadas ao banco de dados para pesquisar/salvar/remover entradas do banco de dados, assim:

// assuming Article is a special class for managing articles
// static method to remove the article by id:
Article.remove({id: 12345});

// assuming Article is a special class for managing articles
// static method to remove the article by id:
Article.remove({id: 12345});

Propriedades estáticas
Uma adição recente
Esta é uma adição recente à linguagem. Os exemplos funcionam no Chrome recente.
Propriedades estáticas também são possíveis, elas se parecem com propriedades de classe regulares, mas precedidas por static:

*/

class Article {
   static publisher = "Ilya Kantor";
}

alert( Article.publisher ); //Ilya Kantor

/*

Isso é o mesmo que uma atribuição direta para Article:

Article.publisher = "Ilya Kantor";
Herança de propriedades e métodos estáticos
Propriedades e métodos estáticos são herdados.

Por exemplo, Animal.comparee Animal.planetno código abaixo são herdados e acessíveis como Rabbit.comparee Rabbit.planet:

*/

class Animal {
   static planet = "Earth";

   constructor(name, speed) {
      this.speed = speed;
      this.name = name;
   }

   run(speed = 0) {
      this.speed += speed;
      alert(`${this.name} runs with speed ${this.speed}.`);
   }

   static compare(animalA, animalB) {
      return animalA.speed - animalB.speed;
   }

}

// Inherit from Animal
class Rabbit extends Animal {
   hide() {
      alert(`${this.name} hides!`);
   }
}

let rabbits = [
   new Rabbit("White Rabbit", 10),
   new Rabbit("Black Rabbit", 5)
];

rabbits.sort(Rabbit.compare);

rabbits[0].run(); // Black Rabbit runs with speed 5.

alert(Rabbit.planet); // Earth

/*

Agora, quando chamarmos Rabbit.compare, o herdado Animal.compareserá chamado.

Como funciona? Mais uma vez, usando protótipos. Como você já deve ter adivinhado, extendsdá Rabbita [[Prototype]]referência a Animal.


Então, Rabbit extends Animalcria duas [[Prototype]]referências:

1. Rabbit a função prototipicamente herda da Animalfunção.
2. Rabbit.prototypeprototipicamente herda de Animal.prototype.

Como resultado, a herança funciona tanto para métodos regulares quanto para métodos estáticos.

Aqui, vamos verificar isso por código:

*/

class Animal {}
class Rabbit extends Animal {}

// for statics
alert(Rabbit.__proto__ === Animal); // true

// for regular methods
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true

/*

Resumo
Os métodos estáticos são usados ​​para a funcionalidade que pertence à classe “como um todo”. Não se relaciona a uma instância de classe concreta.

Por exemplo, um método de comparação Article.compare(article1, article2)ou um método de fábrica Article.createTodays().

Eles são rotulados pela palavra staticna declaração de classe.

As propriedades estáticas são usadas quando queremos armazenar dados em nível de classe, também não vinculados a uma instância.

A sintaxe é:

class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
Tecnicamente, a declaração estática é o mesmo que atribuir à própria classe:

MyClass.property = ...
MyClass.method = ...
Propriedades e métodos estáticos são herdados.

Pois class B extends Ao protótipo da própria classe Baponta para A: B.[[Prototype]] = A. Portanto, se um campo não for encontrado em B, a pesquisa continua em A.

*/

