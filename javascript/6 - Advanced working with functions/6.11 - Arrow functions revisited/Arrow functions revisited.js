/*

Funções de seta revisitadas
Vamos revisitar as funções de seta.

As funções de seta não são apenas uma “taquigrafia” para escrever coisas pequenas. Eles têm alguns recursos muito específicos e úteis.

O JavaScript está cheio de situações em que precisamos escrever uma pequena função que é executada em outro lugar.

Por exemplo:

arr.forEach(func)– funcé executado por forEachpara cada item do array.
setTimeout(func)– funcé executado pelo agendador integrado.
…há mais.
Faz parte do espírito do JavaScript criar uma função e passá-la para algum lugar.

E em tais funções geralmente não queremos sair do contexto atual. É aí que as funções de seta são úteis.

As funções de seta não têm “isto”
Como lembramos do capítulo Métodos de objeto, "this" , as funções de seta não possuem this. Se thisfor acessado, é retirado do lado de fora.

Por exemplo, podemos usá-lo para iterar dentro de um método de objeto:

*/

let group = {
   title: "Our Group",
   students: ["John", "Pete", "Alice"],

   showList() {
      this.students.forEach(
         student => alert(this.title + ': ' + student)
      );
   }
};

group.showList();

/*

Aqui em forEach, a função de seta é usada, portanto this.title, é exatamente igual ao método externo showList. Ou seja: group.title.

Se usássemos uma função “regular”, haveria um erro:

*/

let group2 = {
   title: "Our Group",
   students: ["John", "Pete", "Alice"],

   showList() {
      this.students.forEach(function (student) {
         // Error: Cannot read property 'title' of undefined
         alert(this.title + ': ' + student);
      });
   }
};

group2.showList();

/*

O erro ocorre porque forEachexecuta funções com this=undefinedpor padrão, então a tentativa de acesso undefined.titleé feita.

Isso não afeta as funções de seta, porque elas simplesmente não têm this.

As funções de seta não podem ser executadas comnew
Não ter thisnaturalmente significa outra limitação: as funções de seta não podem ser usadas como construtoras. Eles não podem ser chamados com new.

Funções de seta VS vincular
Há uma diferença sutil entre uma função de seta =>e uma função regular chamada com .bind(this):

.bind(this)cria uma “versão vinculada” da função.
A seta =>não cria nenhuma ligação. A função simplesmente não tem this. A pesquisa de thisé feita exatamente da mesma forma que uma pesquisa de variável regular: no ambiente lexical externo.

As setas não têm “argumentos”
As funções de seta também não têm argumentsvariáveis.

Isso é ótimo para decoradores, quando precisamos encaminhar uma chamada com o atual thise arguments.

Por exemplo, defer(f, ms)obtém uma função e retorna um wrapper em torno dela que atrasa a chamada em msmilissegundos:

*/

function defer(f, ms) {
   return function() {
      setTimeout(() => f.apply(this, arguments), ms);
   };
}

function sayHi(who) {
   alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John after 2 seconds

/*

O mesmo sem uma função de seta ficaria assim:

function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}

Aqui tivemos que criar variáveis ​​adicionais argse ctxpara que a função dentro setTimeoutdelas pudesse assumi-las.

Resumo
Funções de seta:

Não temthis
Não temarguments
Não pode ser chamado comnew
Eles também não têm super, mas ainda não estudamos. Iremos no capítulo Herança de classe

Isso porque eles são destinados a pequenos trechos de código que não possuem seu próprio “contexto”, mas funcionam no atual. E eles realmente brilham nesse caso de uso.

*/

