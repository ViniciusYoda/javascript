/*

Métodos de objeto, "this"

Os objetos geralmente são criados para representar entidades do mundo real, como usuários, pedidos e assim por diante:

*/

let user = {
    name: "John",
    age: 30
};

/*

E, no mundo real, um usuário pode agir : selecionar algo do carrinho de compras, fazer login, sair etc.

As ações são representadas em JavaScript por funções nas propriedades.

Exemplos de métodos

Para começar, vamos ensinar a userdizer olá:

*/

let user = {
    name: "John",
    age: 30
};

user.sayHi = function() {
    alert("Hello!");
};

user.sayHi(); // Hello!

/*

Aqui acabamos de usar uma Function Expression para criar uma função e atribuí-la à propriedade user.sayHido objeto.

Então podemos chamá-lo como user.sayHi(). O usuário agora pode falar!

Uma função que é uma propriedade de um objeto é chamada de seu método .

Então, aqui temos um método sayHido objeto user.

Claro, poderíamos usar uma função pré-declarada como um método, assim:

*/

let user = {
    // ...
};

// first, declare
function sayHi() {
    alert("Hello!");
}

// then add as a method
user.sayHi = sayHi;

user.sayHi(); // Hello!

/*

Programação orientada a objetos
Quando escrevemos nosso código usando objetos para representar entidades, isso é chamado de programação orientada a objetos , resumindo: “OOP”.

OOP é uma coisa grande, uma ciência interessante por si só. Como escolher as entidades certas? Como organizar a interação entre eles? Isso é arquitetura, e existem ótimos livros sobre esse assunto, como "Padrões de design: elementos de software orientado a objetos reutilizáveis" de E. Gamma, R. Helm, R. Johnson, J. Vissides ou "Análise e design orientado a objetos com Applications” por G. Booch, e muito mais.

Abreviação do método

Existe uma sintaxe mais curta para métodos em um literal de objeto:

*/

// these objects do the same

user = {
    sayHi: function() {
        alert("Hello");
    }
};

// method shorthad looks better, right?
user = {
    sayHi() { // same as "sayHi: function(){...}"
    alert("Hello");
    }
};

/*

Conforme demonstrado, podemos omitir "function"e apenas escrever sayHi().

Para dizer a verdade, as notações não são totalmente idênticas. Existem diferenças sutis relacionadas à herança de objetos (a serem abordadas posteriormente), mas por enquanto elas não importam. Em quase todos os casos, a sintaxe mais curta é preferida.

“isto” em métodos
É comum que um método de objeto precise acessar as informações armazenadas no objeto para fazer seu trabalho.

Por exemplo, o código interno user.sayHi()pode precisar do nome do arquivo user.

Para acessar o objeto, um método pode usar a palavra- thischave.

O valor de thisé o objeto “antes do ponto”, aquele usado para chamar o método.

Por exemplo:

*/

let user = {
    name: "John",
    age: 30,

    sayHi() {
        // "this" is the "current object"
        alert(this.name);
    }
};

user.sayHi(); // John

/*

Aqui durante a execução de user.sayHi(), o valor de thisserá user.

Tecnicamente, também é possível acessar o objeto sem this, referenciando-o por meio da variável externa:

*/

let user = {
    name: "John",
    age: 30,

    sayHi() {
        alert(user.name); // "user" instead of "this"
    }
};

/*

…Mas esse código não é confiável. Se decidirmos copiar userpara outra variável, por exemplo, admin = usere sobrescrever usercom outra variável, ela acessará o objeto errado.

Isso é demonstrado abaixo:

*/

let user = {
    name: "John",
    age: 30,

    sayHi() {
        alert( user.name ); // leads to an error
    }
};

let admin = user;
user = null; // overwrite to make things obvioud

admin.sayHi(); // TypeError: Cannot read property 'name' of null

/*

Se usássemos this.nameem vez de user.namedentro do alert, o código funcionaria.

“isto” não está vinculado

Em JavaScript, a palavra-chave thisse comporta de maneira diferente da maioria das outras linguagens de programação. Ele pode ser usado em qualquer função, mesmo que não seja um método de um objeto.

Não há erro de sintaxe no exemplo a seguir:

*/

function sayHi() {
    alert( this.name );
}

/*

O valor de thisé avaliado durante o tempo de execução, dependendo do contexto.

Por exemplo, aqui a mesma função é atribuída a dois objetos diferentes e tem um “this” diferente nas chamadas:

*/

let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
    alert( this.name );
}

// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John (this == user)
admin.f(); // Admin (this == admin)

admin['f'](); // Admin (dot or square brackets acess the method - doesn´t matter )

/*

A regra é simples: se obj.f()é chamado, então thisé objdurante a chamada de f. Então é ou userou adminno exemplo acima.

Chamando sem um objeto:this == undefined

Podemos até chamar a função sem nenhum objeto:

*/

function sayHi() {
    alert(this);
}

sayHi(); // undefined

/*

Neste caso thisestá undefinedem modo estrito. Se tentarmos acessar this.name, ocorrerá um erro.

No modo não estrito, o valor de thisnesse caso será o objeto global ( windowem um navegador, chegaremos a ele mais tarde no capítulo Objeto global ). Este é um comportamento histórico que "use strict"corrige.

Normalmente essa chamada é um erro de programação. Se houver thisdentro de uma função, ela espera ser chamada em um contexto de objeto.

As consequências do desvinculado this

Se você vem de outra linguagem de programação, provavelmente está acostumado com a ideia de um "bound this", onde os métodos definidos em um objeto sempre fazem thisreferência a esse objeto.

Em JavaScript thisé “livre”, seu valor é avaliado na hora da chamada e não depende de onde o método foi declarado, mas sim de qual objeto está “antes do ponto”.

O conceito de tempo de execução avaliado thistem vantagens e desvantagens. Por um lado, uma função pode ser reutilizada para diferentes objetos. Por outro lado, a maior flexibilidade cria mais possibilidades de erros.

Aqui nossa posição não é julgar se essa decisão de design de linguagem é boa ou ruim. Vamos entender como trabalhar com isso, como obter benefícios e evitar problemas.

As funções de seta não têm “isto”

As funções de seta são especiais: elas não têm o seu “próprio” this. Se fizermos referência thisde tal função, ela será retirada da função “normal” externa.

Por exemplo, aqui arrow()usa thisdo método externo user.sayHi():

*/

let user = {
    firstName: "Ilya",
    sayHi() {
        let arrow = () => alert(this.firstName);
        arrow();
    }
};

user.sayHi(); // Ilya

/*

Esse é um recurso especial das funções de seta, é útil quando na verdade não queremos ter um separado this, mas sim retirá-lo do contexto externo. Mais adiante no capítulo Funções de seta revisitadas , iremos mais profundamente nas funções de seta.

Resumo
As funções que são armazenadas nas propriedades do objeto são chamadas de “métodos”.
Os métodos permitem que os objetos “atuem” como object.doSomething().
Os métodos podem referenciar o objeto como this.
O valor de thisé definido em tempo de execução.

Quando uma função é declarada, ela pode usar this, mas isso thisnão tem valor até que a função seja chamada.
Uma função pode ser copiada entre objetos.
Quando uma função é chamada na sintaxe do “método”: object.method(), o valor de thisdurante a chamada é object.
Observe que as funções de seta são especiais: elas não têm this. Quando thisé acessado dentro de uma função de seta, ele é obtido de fora.

*/