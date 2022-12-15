/*

Ligação de função
Ao passar métodos de objeto como retornos de chamada, por exemplo, para setTimeout, há um problema conhecido: "perda this".

Neste capítulo, veremos as maneiras de corrigi-lo.

Perder “isso”
Já vimos exemplos de perder this. Uma vez que um método é passado em algum lugar separado do objeto – thisé perdido.

Veja como isso pode acontecer com setTimeout:

*/

let user = {
   firstName: "John",
   sayHi() {
      alert(`Hello, ${this.firstName}!`);
   }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!

/*

Como podemos ver, a saída mostra não “John” como this.firstName, mas undefined!

Isso porque setTimeouttem a função user.sayHiseparada do objeto. A última linha pode ser reescrita como:

let f = user.sayHi;
setTimeout(f, 1000); // lost user context
O método setTimeoutin-browser é um pouco especial: ele define this=windowpara a chamada de função (para Node.js, thistorna-se o objeto timer, mas realmente não importa aqui). Então, para this.firstNameele tenta obter window.firstName, que não existe. Em outros casos semelhantes, geralmente thisse torna apenas undefined.

A tarefa é bastante típica – queremos passar um método de objeto em algum outro lugar (aqui – para o escalonador) onde ele será chamado. Como ter certeza de que será chamado no contexto certo?

Solução 1: um invólucro
A solução mais simples é usar uma função de empacotamento:

*/

let user2 = {
   firstName: "John",
   sayHi() {
      alert(`Hello, ${this.firstName}!`);
   }
};

setTimeout(function () {
   user.sayHi(); // Hello, John
}, 1000);

/*

Agora funciona, pois recebe userdo ambiente lexical externo, e depois chama o método normalmente.

O mesmo, mas mais curto:

setTimeout(() => user.sayHi(), 1000); // Hello, John!
Parece bom, mas uma pequena vulnerabilidade aparece em nossa estrutura de código.

E se antes setTimeoutdos gatilhos (há um atraso de um segundo!) usermudar de valor? Então, de repente, chamará o objeto errado!

*/

let user3 = {
   firstName: "John",
   sayHi() {
      alert(`Hello, ${this.firstName}!`);
   }
};

setTimeout(() => user3.sayHi(), 1000);

// ...the value of user changes within 1 second
user3 = {
   sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!

/*

A próxima solução garante que tal coisa não aconteça.

Solução 2: vincular
As funções fornecem um vínculo de método integrado que permite corrigir arquivos this.

A sintaxe básica é:

// more complex syntax will come a little later
let boundFunc = func.bind(context);
O resultado de func.bind(context)é um “objeto exótico” semelhante a uma função especial, que pode ser chamado como função e passa de forma transparente a chamada para funcsetting this=context.

Em outras palavras, chamar boundFuncé como funccom fixed this.

Por exemplo, aqui funcUserpassa uma chamada para funccom this=user:

*/

let user4 = {
   firstName: "John"
};

function func() {
   alert(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // John

/*

Aqui func.bind(user)como uma “variante vinculada” de func, com this=user.

Todos os argumentos são passados ​​para o original func“como está”, por exemplo:

*/

let user5 = {
   firstName: "John"
};

function func(phrase) {
   alert(phrase + ', ' + this.firstName);
}

// bind this to user
let funcUser2 = func.bind(user5);

funcUser2("Hello"); // Hello, John (argument "Hello" is passed, and this=user)

// Agora vamos tentar com um método de objeto:

let user6 = {
   firstName: "John",
   sayHi() {
      alert(`Hello, ${this.firstName}!`);
   }
};

let sayHi = user6.sayHi.bind(user); // (*)

// can run it without an object
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
user = {
   sayHi() { alert("Another user in setTimeout!"); }
};

/*

Na linha (*), pegamos o método user.sayHie o vinculamos a user. O sayHié uma função “ligada”, que pode ser chamada sozinha ou passada para setTimeout– não importa, o contexto estará certo.

Aqui podemos ver que os argumentos são passados ​​“como estão”, apenas thiscorrigidos por bind:

*/

let user7 = {
   firstName: "John",
   say(phrase) {
      alert(`${phrase}, ${this.firstName}!`);
   }
};

let say = user.say.bind(user7);

say("Hello"); // Hello, John! ("Hello" argument is passed to say)
say("Bye"); // Bye, John! ("Bye" is passed to say)

/*

Método de conveniência:bindAll
Se um objeto tiver muitos métodos e planejamos passá-lo ativamente, podemos vinculá-los todos em um loop:

for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
As bibliotecas JavaScript também fornecem funções para ligações em massa convenientes, por exemplo, _.bindAll(object, methodNames) em lodash.

funções parciais
Até agora, falamos apenas sobre encadernação this. Vamos dar um passo adiante.

Podemos vincular não apenas this, mas também argumentos. Isso raramente é feito, mas às vezes pode ser útil.

A sintaxe completa de bind:

let bound = func.bind(context, [arg1], [arg2], ...);

Permite vincular contexto como thisargumentos iniciais da função.

Por exemplo, temos uma função de multiplicação mul(a, b):

function mul(a, b) {
  return a * b;
}
Vamos usar bindpara criar uma função doubleem sua base:

*/

function mul(a, b) {
   return a * b;
}

let double = mul.bind(null, 2);

alert(double(3)); // = mul(2, 3) = 6
alert(double(4)); // = mul(2, 4) = 8
alert(double(5)); // = mul(2, 5) = 10

/*

A chamada para mul.bind(null, 2)cria uma nova função doubleque passa chamadas para mul, fixando nullcomo contexto e 2como primeiro argumento. Outros argumentos são passados ​​“como estão”.

Isso é chamado de aplicação de função parcial – criamos uma nova função fixando alguns parâmetros da função existente.

Observe que, na verdade, não usamos thisaqui. Mas bindrequer isso, então devemos colocar algo como null.

A função tripleno código abaixo triplica o valor:

*/

function mul(a, b) {
   return a * b;
}

let triple = mul.bind(null, 3);

alert(triple(3)); // = mul(3, 3) = 9
alert(triple(4)); // = mul(3, 4) = 12
alert(triple(5)); // = mul(3, 5) = 15

/*

Por que geralmente fazemos uma função parcial?

A vantagem é que podemos criar uma função independente com um nome legível ( double, triple). Podemos usá-lo e não fornecer o primeiro argumento todas as vezes, pois é corrigido com bind.

Em outros casos, a aplicação parcial é útil quando temos uma função muito genérica e queremos uma variante menos universal dela por conveniência.

Por exemplo, temos uma função send(from, to, text). Então, dentro de um userobjeto podemos querer usar uma variante parcial dele: sendTo(to, text)que envia do usuário atual.

Indo parcial sem contexto
E se quisermos corrigir alguns argumentos, mas não o contexto this? Por exemplo, para um método de objeto.

O nativo bindnão permite isso. Não podemos simplesmente omitir o contexto e pular para os argumentos.

Felizmente, uma função partialpara vincular apenas argumentos pode ser facilmente implementada.

Assim:

*/

function partial(func, ...argsBound) {
   return function(...args) { // (*)
      return func.call(this, ...argsBound, ...args);
   }
}

// Usage: 
let user8 = {
   firstName: "John",
   say(time, phrase) {
      alert(`[${time}] ${this.firstName}: ${phrase}!`);
   }
};

// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!

/*

O resultado da partial(func[, arg1, arg2...])chamada é um wrapper (*)que chama funccom:

O mesmo thisque fica (para user.sayNowligar é user)
Então dá ...argsBound– argumentos da partialchamada ( "10:00")
Em seguida, dá ...args- argumentos dados ao wrapper ( "Hello")
Tão fácil fazer isso com a sintaxe de propagação, certo?

Também há uma implementação _.partial pronta da biblioteca lodash.

Resumo
O método func.bind(context, ...args)retorna uma “variante vinculada” da função funcque corrige o contexto thise os primeiros argumentos, se fornecidos.

Normalmente aplicamos bindo fix thispara um método de objeto, para que possamos passá-lo em algum lugar. Por exemplo, para setTimeout.

Quando fixamos alguns argumentos de uma função existente, a função resultante (menos universal) é chamada parcialmente aplicada ou parcial .

Parciais são convenientes quando não queremos repetir o mesmo argumento indefinidamente. Como se tivéssemos uma send(from, to)função, e fromdevesse ser sempre a mesma para nossa tarefa, podemos obter uma parcial e continuar com ela.

*/

