/*

Construtor, operador "novo"

A sintaxe regular {...}nos permite criar um objeto. Mas muitas vezes precisamos criar muitos objetos semelhantes, como vários usuários ou itens de menu e assim por diante.

Isso pode ser feito usando funções construtoras e o "new"operador.

Função construtora
Funções construtoras tecnicamente são funções regulares. Porém, existem duas convenções:

1. Eles são nomeados com letra maiúscula primeiro.
2. Eles devem ser executados apenas com "new"operador.
Por exemplo:

*/

function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");

alert(user.name); // Jack
alert(user.isAdmin); // false

/*

Quando uma função é executada com new, ela executa os seguintes passos:

1. Um novo objeto vazio é criado e atribuído a this.
2. O corpo da função é executado. Normalmente ele modifica this, adiciona novas propriedades a ele.
3. O valor de thisé retornado.

Em outras palavras, new User(...)faz algo como:

*/

function User(name) {
    // this = {}; (implicitly)

    // add properties to this
    this.name = name;
    this.isAdmin = false;

    // return this; (implicitly)
}

// Então let user = new User("Jack")dá o mesmo resultado que:

let user = {
    name: "Jack",
    isAdmin: false
};

/*

Agora, se quisermos criar outros usuários, podemos chamar new User("Ann"), new User("Alice")e assim por diante. Muito mais curto do que usar literais todas as vezes e também fácil de ler.

Esse é o principal objetivo dos construtores – implementar código de criação de objetos reutilizáveis.

Vamos observar mais uma vez – tecnicamente, qualquer função (exceto funções de seta, pois elas não possuem this) pode ser usada como construtor. Ele pode ser executado com new, e executará o algoritmo acima. A “letra maiúscula primeiro” é um acordo comum, para deixar claro que uma função deve ser executada com new.

nova função() { … }
Se tivermos muitas linhas de código sobre a criação de um único objeto complexo, podemos envolvê-las em uma função construtora imediatamente chamada, assim:

*/

// create a function and imediately call it with new
let user = new function () {
    this.name = "John";
    this.isAdmin = false;

    // ...other code for user creation
    // maybe complex logic and statements
    // local variables etc
}

/*

Este construtor não pode ser chamado novamente, porque ele não é salvo em nenhum lugar, apenas criado e chamado. Portanto, esse truque visa encapsular o código que constrói o objeto único, sem reutilização futura.

Teste do modo construtor: new.target

Coisas avançadas
A sintaxe desta seção raramente é usada, pule-a a menos que você queira saber tudo.

Dentro de uma função, podemos verificar se ela foi chamada com newou sem ela, usando uma new.targetpropriedade especial.

É indefinido para chamadas regulares e é igual à função se chamada com new:

*/

function User() {
    alert(new.target);
}

// without "new":
User(); // undefined

// with "new":
new User(); // function User { ... }

/*

Isso pode ser usado dentro da função para saber se foi chamada com new, “no modo construtor”, ou sem ela, “no modo regular”.

Também podemos fazer newchamadas regulares para fazer o mesmo, assim:

*/

function User(name) {
    if (!new.target) { // if you run me without new
        return new User(name); // ...I will add new for you
    }

    this.name = name;
}

let john = User("John"); // redirects call to new User
alert(john.name); // John

/*

Essa abordagem às vezes é usada em bibliotecas para tornar a sintaxe mais flexível. Para que as pessoas possam chamar a função com ou sem new, e ela ainda funciona.

Provavelmente não é uma boa coisa para usar em todos os lugares, porque omitir newtorna um pouco menos óbvio o que está acontecendo. Com newtodos nós sabemos que o novo objeto está sendo criado.

Retorno dos construtores
Normalmente, os construtores não têm uma returninstrução. Sua tarefa é escrever todas as coisas necessárias em this, e isso automaticamente se torna o resultado.

Mas se houver uma returndeclaração, a regra é simples:

Se returnfor chamado com um objeto, o objeto será retornado em vez de this.
Se returnfor chamado com uma primitiva, será ignorado.
Em outras palavras, returncom um objeto retorna esse objeto, em todos os outros casos thisé retornado.

Por exemplo, aqui returnsubstitui thisretornando um objeto:

*/

function BigUser() {

    this.name = "John";

    return { name: "Godzilla" }; // <-- returns this object
}

alert( new BigUser().name ); // Godzilla, got that object

// E aqui está um exemplo com um vazio return(ou podemos colocar um primitivo depois dele, não importa):

function SmallUser() {

    this.name = "John";

    return; // <-- returns this
}

alert( new SmallUser().name ); // John

/*

Normalmente, os construtores não têm uma returninstrução. Aqui mencionamos o comportamento especial com o retorno de objetos principalmente para fins de completude.

Omitindo parênteses
A propósito, podemos omitir parênteses após new, se não tiver argumentos:

*/

let user = new User; // <-- no parentheses 
// same as
let user = new User();

/*

Omitir parênteses aqui não é considerado um “bom estilo”, mas a sintaxe é permitida por especificação.

Métodos no construtor
O uso de funções construtoras para criar objetos oferece muita flexibilidade. A função construtora pode ter parâmetros que definem como construir o objeto e o que colocar nele.

Claro, podemos adicionar thisnão apenas propriedades, mas também métodos.

Por exemplo, new User(name)abaixo cria um objeto com o dado namee o método sayHi:

*/

function User(name) {
    this.name = name;

    this.sayHi = function() {
        alert( "My name is: " + this.name );
    };
}

let john = new User("John");

john.sayHi(); // My name is: John

/*
john = {
    name: "John",
    sayHi: function() { ... }
}
*/

/*

Para criar objetos complexos, há uma sintaxe mais avançada, classes , que abordaremos mais tarde.

Resumo
Funções construtoras ou, resumidamente, construtores, são funções regulares, mas há um acordo comum para nomeá-las primeiro com letras maiúsculas.
Funções construtoras só devem ser chamadas usando new. Tal chamada implica a criação de vazio thisno início e retornando o preenchido no final.
Podemos usar funções construtoras para criar vários objetos semelhantes.

JavaScript fornece funções construtoras para muitos objetos de linguagem integrados: como Datedatas, Setconjuntos e outros que planejamos estudar.

Objetos, voltaremos!
Neste capítulo, cobrimos apenas o básico sobre objetos e construtores. Eles são essenciais para aprender mais sobre tipos de dados e funções nos próximos capítulos.

Depois que aprendemos isso, voltamos aos objetos e os abordamos em profundidade nos capítulos Protótipos, herança e Classes .

*/

