/*

Mixins
Em JavaScript, só podemos herdar de um único objeto. Só pode haver um [[Prototype]]para um objeto. E uma classe pode estender apenas uma outra classe.

Mas às vezes isso parece limitante. Por exemplo, temos uma classe StreetSweepere uma classe Bicyclee queremos fazer a mistura deles: a StreetSweepingBicycle.

Ou temos uma classe Usere uma classe EventEmitterque implementa a geração de eventos e gostaríamos de adicionar a funcionalidade de EventEmittera User, para que nossos usuários possam emitir eventos.

Existe um conceito que pode ajudar aqui, chamado “mixins”.

Conforme definido na Wikipedia, um mixin é uma classe contendo métodos que podem ser usados ​​por outras classes sem a necessidade de herdar dela.

Em outras palavras, um mixin fornece métodos que implementam um determinado comportamento, mas não o usamos sozinho, usamos para adicionar o comportamento a outras classes.

Um exemplo de mixagem
A maneira mais simples de implementar um mixin em JavaScript é criar um objeto com métodos úteis, para que possamos mesclá-los facilmente em um protótipo de qualquer classe.

Por exemplo, aqui o mixin sayHiMixiné usado para adicionar alguma “fala” para User:

*/

// mixin
let sayHiMixin = {
   sayHi() {
      alert(`Hello ${this.name}`);
   },
   sayBye() {
      alert(`Bye ${this.name}`);
   }
};

// usage:
class User {
   constructor(name) {
      this.name = name;
   }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!

/*

Não há herança, mas uma cópia simples do método. Então Userpode herdar de outra classe e também incluir o mixin para “misturar” os métodos adicionais, assim:

class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
Mixins podem fazer uso de herança dentro de si mesmos.

Por exemplo, here sayHiMixinherda de sayMixin:

*/

let sayMixin2 = {
   say(phrase) {
      alert(phrase);
   }
};

let sayHiMixin2 = {
   __proto__: sayMixin2, // (or we could use Object.setPrototypeOf to set the prototype here)

   sayHi() {
      // call parent method
      super.say(`Hello ${this.name}`); // (*)
   },
   sayBye() {
      super.say(`Bye ${this.name}`); // (*)
   }
};

class User {
   constructor(name) {
      this.name = name;
   }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!

/*

Observe que a chamada para o método pai super.say()de sayHiMixin(nas linhas rotuladas com (*)) procura o método no protótipo desse mixin, não a classe.

Aqui está o diagrama (veja a parte direita):

Isso porque os métodos sayHie sayByeforam inicialmente criados em sayHiMixin. Portanto, mesmo que tenham sido copiados, suas [[HomeObject]]referências de propriedade internas sayHiMixin, conforme mostrado na figura acima.

Como superprocura métodos pai em [[HomeObject]].[[Prototype]], isso significa que ele pesquisa sayHiMixin.[[Prototype]].

EventMixin
Agora vamos fazer um mixin para a vida real.

Uma característica importante de muitos objetos de navegador (por exemplo) é que eles podem gerar eventos. Os eventos são uma ótima maneira de “transmitir informações” para quem quiser. Então, vamos fazer um mixin que nos permita adicionar facilmente funções relacionadas a eventos a qualquer classe/objeto.

O mixin fornecerá um método .trigger(name, [...data])para “gerar um evento” quando algo importante acontecer com ele. O nameargumento é um nome do evento, opcionalmente seguido por argumentos adicionais com dados do evento.
Também o método .on(name, handler)que adiciona handlerfunção como ouvinte para eventos com o nome fornecido. Ele será chamado quando um evento com os namegatilhos fornecidos e obter os argumentos da .triggerchamada.
…E o método .off(name, handler)que remove o handlerouvinte.
Depois de adicionar o mixin, um objeto userserá capaz de gerar um evento "login"quando o visitante fizer login. E outro objeto, digamos, calendarpode querer ouvir tais eventos para carregar o calendário para a pessoa conectada.

Ou, um menupode gerar o evento "select"quando um item de menu é selecionado e outros objetos podem atribuir manipuladores para reagir a esse evento. E assim por diante.

Aqui está o código:

*/

let eventMixin = {
   /**
   * Subscribe to event, usage:
   *  menu.on('select', function(item) { ... }
   */
   on(eventName, handler) {
      if (!this._eventHandlers) this._eventHandlers = {};
      if (!this._eventHandlers[eventName]) {
         this._eventHandlers[eventName] = [];
      }
      this._eventHandlers[eventName
      ].push(handler);
   },

   /**
   * Cancel the subscription, usage:
   *  menu.off('select', handler)
   */
   off(eventName, handler) {
      let handlers = this._eventHandlers?.[eventName];
      if (!handlers) return;
      for (let i = 0; i < handlers.length; i++) {
         if (handlers[i] === handler) {
            handlers.splice(i--, 1);
         }
      }
   },

   /**
    * Generate an event with the given name and data
    *  this.trigger('select', data1, data2);
    */
   trigger(eventName, ...args) {
      if (!this._eventHandlers?.[eventName]) {
         return; // no handlers for that event name
      }

      // call the handlers
      this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
   }
};

/*

.on(eventName, handler)– atribui a função handlerpara executar quando o evento com esse nome ocorrer. Tecnicamente, há uma _eventHandlerspropriedade que armazena uma matriz de manipuladores para cada nome de evento e apenas o adiciona à lista.
.off(eventName, handler)– remove a função da lista de manipuladores.
.trigger(eventName, ...args)– gera o evento: todos os manipuladores de _eventHandlers[eventName]são chamados, com uma lista de argumentos ...args.
Uso:

*/

// Make a class
class Menu {
   choose(value) {
      this.trigger("select", value);
   }
}
// Add the mixin with event-related methods
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// add a handler, to be called on selection:
menu.on("select", value => alert(`Value selected: ${value}`));

// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123");

/*

Agora, se quisermos que algum código reaja a uma seleção de menu, podemos ouvi-lo com menu.on(...).

E eventMixino mixin torna fácil adicionar tal comportamento a quantas classes quisermos, sem interferir na cadeia de herança.

Resumo
Mixin – é um termo genérico de programação orientada a objetos: uma classe que contém métodos para outras classes.

Algumas outras linguagens permitem herança múltipla. JavaScript não suporta herança múltipla, mas mixins podem ser implementados copiando métodos para o protótipo.

Podemos usar mixins como uma forma de aumentar uma classe adicionando vários comportamentos, como manipulação de eventos, como vimos acima.

Mixins may become a point of conflict if they accidentally overwrite existing class methods. So generally one should think well about the naming methods of a mixin, to minimize the probability of that happening.

*/

