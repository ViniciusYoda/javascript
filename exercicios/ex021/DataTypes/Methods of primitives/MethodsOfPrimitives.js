/*

Métodos de primitivos
JavaScript nos permite trabalhar com primitivos (strings, números, etc.) como se fossem objetos. Eles também fornecem métodos para chamar como tal. Vamos estudá-los em breve, mas primeiro veremos como funciona porque, é claro, primitivos não são objetos (e aqui vamos deixar ainda mais claro).

Vejamos as principais distinções entre primitivos e objetos.

Um primitivo

É um valor de um tipo primitivo.
Existem 7 tipos primitivos: string, number, bigint, boolean, symbol, null e undefined.
Um objeto

É capaz de armazenar vários valores como propriedades.
Pode ser criado com {}, por exemplo: {name: "John", age: 30}. Existem outros tipos de objetos em JavaScript: funções, por exemplo, são objetos.
Uma das melhores coisas sobre objetos é que podemos armazenar uma função como uma de suas propriedades.

*/

let john = {
    name: "John",
    sayHi: function() {
        alert("Hi buddy!");
    }
};

john.sayHi(); // Hi buddy!

/*

Então aqui nós criamos um objeto johncom o método sayHi.

Muitos objetos internos já existem, como aqueles que trabalham com datas, erros, elementos HTML, etc. Eles possuem propriedades e métodos diferentes.

Mas, esses recursos têm um custo!

Os objetos são “mais pesados” que os primitivos. Eles exigem recursos adicionais para dar suporte ao maquinário interno.

Um primitivo como um objeto
Aqui está o paradoxo enfrentado pelo criador do JavaScript:

Há muitas coisas que se deseja fazer com um primitivo, como uma string ou um número. Seria ótimo acessá-los usando métodos.
Os primitivos devem ser tão rápidos e leves quanto possível.

A solução parece um pouco estranha, mas aqui está:

1. Os primitivos ainda são primitivos. Um único valor, conforme desejado.
2. A linguagem permite o acesso a métodos e propriedades de strings, números, booleanos e símbolos.
3. Para que isso funcione, um “object wrapper” especial que fornece a funcionalidade extra é criado e depois destruído.

Os “object wrappers” são diferentes para cada tipo primitivo e são chamados : String, Number, Booleane . Assim, eles fornecem diferentes conjuntos de métodos.SymbolBigInt

Por exemplo, existe um método de string str.toUpperCase() que retorna um str.

Veja como funciona:

*/

let str = "Hello";

alert( str.toUpperCase() ); // HELLO

/*

Simples, certo? Veja o que realmente acontece em str.toUpperCase():

1. A string str é uma primitiva. Assim, no momento de acessar sua propriedade, é criado um objeto especial que conhece o valor da string e possui métodos úteis, como toUpperCase().
2. Esse método é executado e retorna uma nova string (mostrada por alert).
3. O objeto especial é destruído, deixando o primitivo em str paz.

Portanto, os primitivos podem fornecer métodos, mas ainda permanecem leves.

O mecanismo JavaScript otimiza muito esse processo. Pode até pular a criação do objeto extra. Mas ainda deve aderir à especificação e se comportar como se criasse uma.

Um número tem métodos próprios, por exemplo, toFixed(n) arredonda o número para a precisão fornecida:

*/

let n = 1.23456;

alert( n.toFixed(2) ); // 1.23

/*

Veremos métodos mais específicos nos capítulos Numbers and Strings .

Construtores String/Number/Boolean são apenas para uso interno
Algumas linguagens como Java nos permitem criar explicitamente “objetos wrapper” para primitivos usando uma sintaxe como new Number(1)ou new Boolean(false).

Em JavaScript, isso também é possível por motivos históricos, mas altamente não recomendado . As coisas vão enlouquecer em vários lugares.

Por exemplo:

*/

alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!

// Os objetos são sempre verdadeiros em if, então aqui o alerta aparecerá:

let zero = new Number(0);

if (zero) { // zero is true, because it´s an object
    alert("zero is truthy!?!" );
}

/*

Por outro lado, usar as mesmas funções String/Number/Boolean sem new é algo totalmente bom e útil. Eles convertem um valor para o tipo correspondente: para uma string, um número ou um booleano (primitivo).

Por exemplo, isso é totalmente válido:

*/

let num = Number("123"); // convert a string to number

/*

null/undefined não tem métodos
As primitivas especiais nulle undefinedsão exceções. Eles não têm “objetos wrapper” correspondentes e não fornecem métodos. Em certo sentido, eles são “os mais primitivos”.

Uma tentativa de acessar uma propriedade de tal valor daria o erro:

*/

alert(null.test); // error

/*

Resumo
Primitivos exceto nulle undefinedfornecem muitos métodos úteis. Vamos estudá-los nos próximos capítulos.
Formalmente, esses métodos funcionam por meio de objetos temporários, mas os mecanismos JavaScript são bem ajustados para otimizar isso internamente, portanto, não são caros de chamar.

*/