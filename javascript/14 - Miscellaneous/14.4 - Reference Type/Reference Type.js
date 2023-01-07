/*

Tipo de referência
Recurso de linguagem aprofundada
Este artigo cobre um tópico avançado, para entender melhor certos casos extremos.

Não é importante. Muitos desenvolvedores experientes vivem bem sem saber. Continue lendo se quiser saber como as coisas funcionam sob o capô.

Uma chamada de método avaliada dinamicamente pode perder this.

Por exemplo:

*/

let user = {
   name: "John",
   hi() { alert(this.name); },
   bye() { alert("Bye"); }
};

user.hi(); // works

// now let's call user.hi or user.bye depending on the name
(user.name == "John" ? user.hi : user.bye)(); // Error!

/*

Na última linha há um operador condicional que escolhe user.hiou user.bye. Neste caso o resultado é user.hi.

Em seguida, o método é chamado imediatamente entre parênteses (). Mas não funciona direito!

Como você pode ver, a chamada resulta em erro, porque o valor de "this"dentro da chamada se torna undefined.

Isso funciona (método de ponto do objeto):

user.hi();
Isso não (método avaliado):

(user.name == "John" ? user.hi : user.bye)(); // Error!

Porque? Se quisermos entender por que isso acontece, vamos entender como a obj.method()chamada funciona.

Tipo de referência explicado
Olhando de perto, podemos notar duas operações no comando obj.method():

1. Primeiro, o ponto '.'recupera a propriedade obj.method.
2. Em seguida, os parênteses ()o executam.

Então, como as informações sobre thissão passadas da primeira parte para a segunda?

Se colocarmos essas operações em linhas separadas, thiscertamente serão perdidas:

*/

let user2 = {
   name: "John",
   hi() { alert(this.name); }
};

// split getting and calling the method in two lines
let hi = user2.hi;
hi(); // Error, because this is undefined

/*

Aqui hi = user.hicoloca a função na variável e, na última linha, ela é completamente autônoma e, portanto, não há this.

Para fazer as user.hi()chamadas funcionarem, o JavaScript usa um truque – o ponto '.'não retorna uma função, mas um valor do tipo de referência especial .

O tipo de referência é um “tipo de especificação”. Não podemos usá-lo explicitamente, mas é usado internamente pela linguagem.

O valor de Reference Type é uma combinação de três valores (base, name, strict), onde:

baseé o objeto.
nameé o nome da propriedade.
stricté verdadeiro se use strictestiver em vigor.
O resultado de um acesso à propriedade user.hinão é uma função, mas sim um valor de Tipo de Referência. Pois user.hino modo estrito é:

// Reference Type value
(user, "hi", true)
Quando os parênteses ()são chamados no Tipo de Referência, eles recebem as informações completas sobre o objeto e seu método, podendo definir o correto this( userneste caso).

O tipo de referência é um tipo interno “intermediário” especial, com o objetivo de passar informações de ponto .para parênteses de chamada ().

Qualquer outra operação como atribuição hi = user.hidescarta o tipo de referência como um todo, pega o valor de user.hi(uma função) e o passa adiante. Portanto, qualquer outra operação “perde” this.

Assim, como resultado, o valor de thissó é passado da maneira certa se a função for chamada diretamente usando uma sintaxe de ponto obj.method()ou colchetes (eles fazem o mesmo aqui). obj['method']()Existem várias maneiras de resolver esse problema, como func.bind() .

Resumo
O tipo de referência é um tipo interno da linguagem.

A leitura de uma propriedade, como com dot .in, obj.method()retorna não exatamente o valor da propriedade, mas um valor especial de “tipo de referência” que armazena o valor da propriedade e o objeto do qual foi obtido.

Isso é para a chamada de método subsequente ()para obter o objeto e definir thispara ele.

Para todas as outras operações, o tipo de referência torna-se automaticamente o valor da propriedade (uma função no nosso caso).

Toda a mecânica está escondida de nossos olhos. Só importa em casos sutis, como quando um método é obtido dinamicamente do objeto, usando uma expressão.

*/

