/*

Herança de classe
A herança de classe é uma maneira de uma classe estender outra classe.

Assim, podemos criar novas funcionalidades em cima das existentes.

A palavra-chave “estende”
Digamos que temos classe Animal:

class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}

let animal = new Animal("My animal");

Veja como podemos representar animalobjeto e Animalclasse graficamente:


…E gostaríamos de criar outro class Rabbit.

Como os coelhos são animais, Rabbita classe deve ser baseada em Animal, ter acesso aos métodos animais, para que os coelhos possam fazer o que os animais “genéricos” podem fazer.

A sintaxe para estender outra classe é: class Child extends Parent.

Vamos criar class Rabbitque herda de Animal:

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!

O objeto da Rabbitclasse tem acesso tanto a Rabbitmétodos, como rabbit.hide(), quanto a Animalmétodos, como rabbit.run().

Internamente, a palavra- extendschave funciona usando a boa e velha mecânica de protótipo. Ele define Rabbit.prototype.[[Prototype]]como Animal.prototype. Portanto, se um método não for encontrado em Rabbit.prototype, o JavaScript o pegará de Animal.prototype.

Por exemplo, para encontrar rabbit.runo método, o mecanismo verifica (de baixo para cima na imagem):

1. O rabbit objeto (não tem run).
Seu protótipo, isto é Rabbit.prototype(tem hide, mas não run).
2. Seu protótipo, ou seja (devido a extends) Animal.prototype, que finalmente possui o runmétodo.

Como podemos lembrar do capítulo Protótipos nativos , o próprio JavaScript usa herança prototípica para objetos integrados. Ex.: Date.prototype.[[Prototype]]é Object.prototype. É por isso que as datas têm acesso a métodos de objetos genéricos.

Qualquer expressão é permitida apósextends
A sintaxe de classe permite especificar não apenas uma classe, mas qualquer expressão após extends.

Por exemplo, uma chamada de função que gera a classe pai:

*/

function f(phrase) {
   return class {
      sayHi() { alert(phrase); }
   };
}

class User extends f("Hello") { }

new User().sayHi(); // Hello

/*

Aqui class Userherda do resultado de f("Hello").

Isso pode ser útil para padrões de programação avançados quando usamos funções para gerar classes dependendo de muitas condições e podemos herdar delas.

Substituindo um método
Agora vamos avançar e sobrescrever um método. Por padrão, todos os métodos que não são especificados em class Rabbitsão obtidos diretamente “como estão” de class Animal.

Mas se especificarmos nosso próprio método em Rabbit, como stop()então ele será usado:

class Rabbit extends Animal {
  stop() {
    // ...now this will be used for rabbit.stop()
    // instead of stop() from class Animal
  }
}
Normalmente, no entanto, não queremos substituir totalmente um método pai, mas sim construir sobre ele para ajustar ou estender sua funcionalidade. Fazemos algo em nosso método, mas chamamos o método pai antes/depois dele ou no processo.

As classes fornecem "super"palavras-chave para isso.

super.method(...)para chamar um método pai.
super(...)para chamar um construtor pai (somente dentro do nosso construtor).
Por exemplo, deixe nosso coelho se esconder automaticamente quando parado:

*/

class Animal {

   constructor(name) {
      this.speed = 0;
      this.name = name;
   }

   run(speed) {
      this.speed = speed;
      alert(`${this.name} runs with speed ${this.speed}.`);
   }

   stop() {
      this.speed = 0;
      alert(`${this.name} stands still.`);
   }

}

class Rabbit extends Animal {
   hide() {
      alert(`${this.name} hides!`);
   }

   stop() {
      super.stop(); // call parent stop
      this.hide(); // and then hide
   }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White Rabbit hides!

/*

Agora Rabbittem o stopmétodo que chama o pai super.stop()no processo.

As funções de seta não têmsuper
Como foi mencionado no capítulo Funções de seta revisitadas , as funções de seta não possuem super.

Se acessado, é retirado da função externa. Por exemplo:

class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
  }
}
A superfunção in the arrow é a mesma que em stop(), então funciona conforme o esperado. Se especificássemos uma função “regular” aqui, haveria um erro:

// Unexpected super
setTimeout(function() { super.stop() }, 1000);

Substituindo o construtor
Com construtores fica um pouco complicado.

Até agora, Rabbitnão tinha o seu próprio constructor.

De acordo com a especificação , se uma classe estende outra classe e não possui constructor, então o seguinte “vazio” constructoré gerado:

class Rabbit extends Animal {
  // generated for extending classes without own constructors
  constructor(...args) {
    super(...args);
  }
}
Como podemos ver, basicamente chama o pai constructorpassando todos os argumentos. Isso acontece se não escrevermos um construtor próprio.

Agora vamos adicionar um construtor personalizado ao Rabbit. Ele irá especificar o earLengthalém de name:

*/

class Animal {
   constructor(name) {
      this.speed = 0;
      this.name = name;
   }
   // ...
}

class Rabbit extends Animal {

   constructor(name, earLength) {
      this.speed = 0;
      this.name = name;
      this.earLength = earLength;
   }

   // ...
}

// Doesn't work!
let rabbit2 = new Rabbit("White Rabbit", 10);  // Error: this is not defined.

/*

Opa! Temos um erro. Agora não podemos criar coelhos. O que deu errado?

A resposta curta é:

Construtores em classes herdadas devem chamar super(...), e (!) antes de usar this.
…Mas por que? O que está acontecendo aqui? De fato, a exigência parece estranha.

Claro, há uma explicação. Vamos entrar em detalhes, para que você realmente entenda o que está acontecendo.

Em JavaScript, há uma distinção entre uma função construtora de uma classe herdada (o chamado “construtor derivado”) e outras funções. Um construtor derivado tem uma propriedade interna especial [[ConstructorKind]]:"derived". Essa é uma etiqueta interna especial.

Esse rótulo afeta seu comportamento com new.

Quando uma função regular é executada com new, ela cria um objeto vazio e o atribui a this.
Mas quando um construtor derivado é executado, ele não faz isso. Ele espera que o construtor pai faça esse trabalho.
Portanto, um construtor derivado deve chamar superpara executar seu construtor pai (base), caso contrário, o objeto para thisnão será criado. E teremos um erro.

Para o Rabbitconstrutor funcionar, ele precisa chamar super()antes de usar this, como aqui:

*/

class Animal {

   constructor(name) {
      this.speed = 0;
      this.name = name;
   }

   // ...
}

// now fine
let rabbit3 = new Rabbit("White Rabbit", 10);
alert(rabbit3.name); // White Rabbit
alert(rabbit3.earLength); // 10

/*

Substituindo campos de classe: uma nota complicada
Nota avançada
Esta nota pressupõe que você tenha uma certa experiência com classes, talvez em outras linguagens de programação.

Ele fornece uma visão melhor da linguagem e também explica o comportamento que pode ser uma fonte de bugs (mas não com muita frequência).

Se você achar difícil de entender, continue, continue lendo e volte a ele algum tempo depois.

Podemos substituir não apenas métodos, mas também campos de classe.

Porém, há um comportamento complicado quando acessamos um campo substituído no construtor pai, bem diferente da maioria das outras linguagens de programação.

Considere este exemplo:

*/

class Animal {
   name = 'animal';

   constructor() {
      alert(this.name); // (*)
   }
}

class Rabbit extends Animal {
   name = 'rabbit';
}

new Animal(); // animal
new Rabbit(); // animal

/*

Aqui, a classe Rabbitestende Animale substitui o namecampo com seu próprio valor.

Não há um construtor próprio em Rabbit, então o Animalconstrutor é chamado.

O interessante é que em ambos os casos: new Animal()e new Rabbit(), o alertna linha (*)mostra animal.

Em outras palavras, o construtor pai sempre usa seu próprio valor de campo, não o substituído.

O que há de estranho nisso?

Se ainda não estiver claro, compare com os métodos.

Aqui está o mesmo código, mas em vez do this.namecampo, chamamos o this.showName()método:

*/

class Animal {
   showName() { // instead of this.name = 'animal'
      alert('animal');
   }

   constructor() {
      this.showName(); // instead of alert(this.name);
   }
}

class Rabbit extends Animal {
   showName() {
      alert('rabbit');
   }
}

new Animal(); // animal
new Rabbit(); // rabbit

/*

Observe: agora a saída é diferente.

E é isso que naturalmente esperamos. Quando o construtor pai é chamado na classe derivada, ele usa o método substituído.

…Mas para campos de classe não é assim. Como dito, o construtor pai sempre usa o campo pai.

Por que há uma diferença?

Bem, o motivo é a ordem de inicialização do campo. O campo de classe é inicializado:

Antes do construtor da classe base (que não estende nada),
Imediatamente depois super()para a classe derivada.
No nosso caso, Rabbité a classe derivada. Não há nada constructor()nisso. Como dito anteriormente, é o mesmo que se houvesse um construtor vazio com apenas super(...args).

Então, new Rabbit()chama super(), executando assim o construtor pai, e (de acordo com a regra para classes derivadas) somente depois que seus campos de classe são inicializados. No momento da execução do construtor pai, ainda não há Rabbitcampos de classe, por isso os Animalcampos são usados.

Essa diferença sutil entre campos e métodos é específica do JavaScript.

Felizmente, esse comportamento só se revela se um campo substituído for usado no construtor pai. Então pode ser difícil entender o que está acontecendo, então estamos explicando aqui.

Se isso se tornar um problema, pode-se corrigi-lo usando métodos ou getters/setters em vez de campos.

Super: internos, [[HomeObject]]
Informações avançadas
Se você estiver lendo o tutorial pela primeira vez – esta seção pode ser ignorada.

É sobre os mecanismos internos por trás da herança e super.

Vamos nos aprofundar um pouco mais sob o capô do super. Veremos algumas coisas interessantes ao longo do caminho.

Em primeiro lugar, de tudo o que aprendemos até agora, é impossível supertrabalhar!

Sim, de fato, vamos nos perguntar, como isso deveria funcionar tecnicamente? Quando um método de objeto é executado, ele obtém o objeto atual como this. Se chamarmos super.method()then, o mecanismo precisa obter o methoddo protótipo do objeto atual. Mas como?

A tarefa pode parecer simples, mas não é. O mecanismo conhece o objeto atual this, portanto, pode obter o pai methodcomo this.__proto__.method. Infelizmente, essa solução “ingênua” não funcionará.

Vamos demonstrar o problema. Sem classes, usando objetos simples para simplificar.

Você pode pular esta parte e ir para a [[HomeObject]]subseção abaixo se não quiser saber os detalhes. Isso não vai prejudicar. Ou continue lendo se estiver interessado em entender as coisas em profundidade.

No exemplo abaixo, rabbit.__proto__ = animal. Agora vamos tentar: em rabbit.eat()vamos chamar animal.eat(), usando this.__proto__:

*/

let animal2 = {
   name: "Animal",
   eat() {
      alert(`${this.name} eats.`);
   }
};

let rabbit4 = {
   __proto__: animal,
   name: "Rabbit",
   eat() {
      // that's how super.eat() could presumably work
      this.__proto__.eat.call(this); // (*)
   }
};

rabbit.eat(); // Rabbit eats.

/*

Na linha (*)que pegamos eatdo protótipo ( animal) e o chamamos no contexto do objeto atual. Observe que isso é importante aqui, porque um pai .call(this)simples executaria no contexto do protótipo, não no objeto atual.this.__proto__.eat()eat

E no código acima, ele realmente funciona como pretendido: temos o arquivo alert.

Agora vamos adicionar mais um objeto à cadeia. Veremos como as coisas se quebram:

*/

let animal = {
   name: "Animal",
   eat() {
      alert(`${this.name} eats.`);
   }
};

let rabbit5 = {
   __proto__: animal,
   eat() {
      // ...bounce around rabbit-style and call parent (animal) method
      this.__proto__.eat.call(this); // (*)
   }
};

let longEar = {
   __proto__: rabbit5,
   eat() {
      // ...do something with long ears and call parent (rabbit) method
      this.__proto__.eat.call(this); // (**)
   }
};

longEar.eat(); // Error: Maximum call stack size exceeded

/*

O código não funciona mais! Podemos ver o erro ao tentar chamar longEar.eat().

Pode não ser tão óbvio, mas se rastrearmos longEar.eat()a chamada, podemos ver o porquê. Em ambas as linhas (*)e (**)o valor de thisé o objeto atual ( longEar). Isso é essencial: todos os métodos de objeto obtêm o objeto atual como this, não um protótipo ou algo assim.

Então, nas duas linhas (*)e (**)o valor de this.__proto__é exatamente o mesmo: rabbit. Ambos pagam rabbit.eatsem subir a cadeia no loop infinito.

Aqui está a imagem do que acontece:

1. No interior longEar.eat(), a linha (**)chama rabbit.eatfornecendo-lhe this=longEar.

// inside longEar.eat() we have this = longEar
this.__proto__.eat.call(this) // (**)
// becomes
longEar.__proto__.eat.call(this)
// that is
rabbit.eat.call(this);

2. Então, na linha (*)de rabbit.eat, gostaríamos de passar a chamada ainda mais alto na cadeia, mas this=longEar, também this.__proto__.eaté rabbit.eat!

// inside rabbit.eat() we also have this = longEar
this.__proto__.eat.call(this) // (*)
// becomes
longEar.__proto__.eat.call(this)
// or (again)
rabbit.eat.call(this);

3. …Então rabbit.eatchama a si mesmo no loop infinito, porque não pode subir mais.

O problema não pode ser resolvido usando this sozinho.

[[HomeObject]]
Para fornecer a solução, o JavaScript adiciona mais uma propriedade interna especial para funções: [[HomeObject]].

Quando uma função é especificada como uma classe ou método de objeto, sua [[HomeObject]]propriedade torna-se esse objeto.

Em seguida super, usa-o para resolver o protótipo pai e seus métodos.

Vamos ver como funciona, primeiro com objetos simples:

*/

let animal3 = {
   name: "Animal",
   eat() {         // animal.eat.[[HomeObject]] == animal
      alert(`${this.name} eats.`);
   }
};

let rabbit6 = {
   __proto__: animal3,
   name: "Rabbit",
   eat() {         // rabbit.eat.[[HomeObject]] == rabbit
      super.eat();
   }
};

let longEar2 = {
   __proto__: rabbit6,
   name: "Long Ear",
   eat() {         // longEar.eat.[[HomeObject]] == longEar
      super.eat();
   }
};

// works correctly
longEar2.eat();  // Long Ear eats.

/*

Funciona como pretendido, devido à [[HomeObject]]mecânica. Um método, como longEar.eat, conhece [[HomeObject]]e pega o método pai de seu protótipo. Sem qualquer uso de this.

Métodos não são “gratuitos”
Como sabemos antes, geralmente as funções são “livres”, não vinculadas a objetos em JavaScript. Assim, eles podem ser copiados entre objetos e chamados com outro this.

A própria existência de [[HomeObject]]viola esse princípio, porque os métodos se lembram de seus objetos. [[HomeObject]]não pode ser mudado, então esse vínculo é para sempre.

O único lugar no idioma onde [[HomeObject]]é usado – é super. Portanto, se um método não usa super, ainda podemos considerá-lo livre e copiá-lo entre os objetos. Mas com superas coisas podem dar errado.

Aqui está a demonstração de um superresultado errado após a cópia:

*/

let animal4 = {
   sayHi() {
      alert(`I'm an animal`);
   }
};

// rabbit inherits from animal
let rabbit7 = {
   __proto__: animal4,
   sayHi() {
      super.sayHi();
   }
};

let plant = {
   sayHi() {
      alert("I'm a plant");
   }
};

// tree inherits from plant
let tree = {
   __proto__: plant,
   sayHi: rabbit7.sayHi // (*)
};

tree.sayHi();  // I'm an animal (?!?)

/*

Uma chamada para tree.sayHi()mostra “eu sou um animal”. Definitivamente errado.

A razão é simples:

Na linha (*), o método tree.sayHifoi copiado de rabbit. Talvez só quiséssemos evitar a duplicação de código?
É , como [[HomeObject]]foi rabbitcriado em rabbit. Não tem como mudar [[HomeObject]].
O código de tree.sayHi()tem super.sayHi()dentro. Ele sobe de rabbite pega o método de animal.
Aqui está o diagrama do que acontece:

Métodos, não propriedades de função
[[HomeObject]]é definido para métodos em classes e em objetos simples. Mas para objetos, os métodos devem ser especificados exatamente como method(), não como "method: function()".

A diferença pode não ser essencial para nós, mas é importante para o JavaScript.

No exemplo abaixo, uma sintaxe não-método é usada para comparação. [[HomeObject]]propriedade não está definida e a herança não funciona:

*/

let animal5 = {
   eat: function() {// intentionally writing like this instead of eat() {...
      // ...
   }
};

let rabbit8 = {
   __proto__: animal,
   eat: function() {
      super.eat();
   }
};

rabbit.eat();  // Error calling super (because there's no [[HomeObject]])

/*

Resumo

1. Para estender uma classe: class Child extends Parent:
Isso significa Child.prototype.__proto__que será Parent.prototype, então os métodos são herdados.

2. Ao substituir um construtor:
Devemos chamar o construtor pai como super()no Childconstrutor antes de usar this.

3. Ao substituir outro método:
Podemos usar super.method()em um Childmétodo para chamar o Parentmétodo.

4. Internos:
Os métodos lembram sua classe/objeto na [[HomeObject]]propriedade interna. É assim que superresolve os métodos pais.
Portanto, não é seguro copiar um método superde um objeto para outro.

Além disso:

As funções de seta não têm seu próprio thisou super, então elas se encaixam de forma transparente no contexto circundante.

*/

