/*

Atribuição de desestruturação
As duas estruturas de dados mais usadas em JavaScript são Objecte Array.

Objetos nos permitem criar uma única entidade que armazena itens de dados por chave.
Arrays nos permitem reunir itens de dados em uma lista ordenada.
Embora, quando os passamos para uma função, pode não ser um objeto/array como um todo. Pode precisar de peças individuais.

A atribuição de desestruturação é uma sintaxe especial que nos permite “descompactar” arrays ou objetos em um monte de variáveis, pois às vezes isso é mais conveniente.

A desestruturação também funciona muito bem com funções complexas que têm muitos parâmetros, valores padrão e assim por diante. Em breve veremos isso.

Desestruturação de matriz
Aqui está um exemplo de como um array é desestruturado em variáveis:

*/

// we have an array with the name and surname
let arr = ["John", "Smith"]

// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName1, surname1] = arr;

alert(firstName); // John
alert(surname);  // Smith

/*

Agora podemos trabalhar com variáveis ​​em vez de membros de array.

Parece ótimo quando combinado com splitou outros métodos de retorno de matriz:

*/

let [firstName2, surname2] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith

/*

Como você pode ver, a sintaxe é simples. Existem vários detalhes peculiares embora. Vamos ver mais exemplos, para entender melhor.

“Desestruturar” não significa “destruir”.
É chamado de “atribuição desestruturante”, porque “desestrutura” copiando itens em variáveis. Mas a matriz em si não é modificada.

É apenas uma maneira mais curta de escrever:

*/

// let [firstName, surname] = arr;
let firstName3 = arr[0];
let surname3 = arr[1];

/*

Ignorar elementos usando vírgulas
Elementos indesejados da matriz também podem ser descartados por meio de uma vírgula extra:

*/

// second element is not needed
let [firstName4, , title4] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert( title ); // Consul

/*

No código acima, o segundo elemento da matriz é ignorado, o terceiro é atribuído a title, e o restante dos itens da matriz também é ignorado (já que não há variáveis ​​para eles).

Funciona com qualquer iterável no lado direito
…Na verdade, podemos usá-lo com qualquer iterável, não apenas arrays:

*/

let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

/*

Isso funciona, porque internamente uma atribuição de desestruturação funciona iterando sobre o valor correto. É um tipo de açúcar de sintaxe para chamar for..ofo valor à direita =e atribuir os valores.

Atribuir a qualquer coisa no lado esquerdo
Podemos usar quaisquer “atribuíveis” no lado esquerdo.

Por exemplo, uma propriedade de objeto:
*/

let user5 = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith

/*

Fazendo um loop com .entries()
No capítulo anterior vimos o método Object.entries(obj) .

Podemos usá-lo com desestruturação para fazer um loop sobre chaves e valores de um objeto:

*/

let user6 = {
    name: "John",
    age: 30
};

// loop over keys-and-values
for (let [key, value] of Object.entries(user)) {
    alert(`${key}:${value}`);// name:John, then age:30
}

// O código semelhante para a Mapé mais simples, pois é iterável:

let user = new Map();
user.set("name", "John");
user.set("age", "30");

// Map iterates as [key, value] pairs, very convenient for destructurin
for (let [key, value] of user) {
    alert(`${key}:${value}`);// name:John, then age:30
}

/*

Truque de troca de variáveis
Existe um truque bem conhecido para trocar valores de duas variáveis ​​usando uma atribuição de desestruturação:

*/

let guest = "Jane";
let admin = "Pete";

// Let's swap the values: make guest=Pete, admin=Jane
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)

/*

Aqui criamos um array temporário de duas variáveis ​​e imediatamente o desestruturamos na ordem trocada.

Podemos trocar mais de duas variáveis ​​dessa maneira.

O resto '…'
Normalmente, se a matriz for maior que a lista à esquerda, os itens “extras” serão omitidos.

Por exemplo, aqui apenas dois itens são retirados, e o resto é simplesmente ignorado:

*/

let [name17, name27] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];


alert(name1); // Julius
alert(name2); // Caesar
// Further items aren't assigned anywhere

// Se também quisermos reunir tudo o que segue – podemos adicionar mais um parâmetro que obtém “o resto” usando três pontos "...":

let [name18, name28, ...rest8] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// rest is array of items, starting from the 3rd one
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2

/*

O valor de resté a matriz dos elementos restantes da matriz.

Podemos usar qualquer outro nome de variável no lugar de rest, apenas certifique-se de que ele tenha três pontos antes e seja o último na atribuição de desestruturação.

*/

let [name1, name2, ...titles] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]

/*

Valores padrão
Se a matriz for menor que a lista de variáveis ​​à esquerda, não haverá erros. Os valores ausentes são considerados indefinidos:

*/

let [firstName, surname9] = []

alert(firstName); // undefined
alert(surname); // undefined

// Se quisermos que um valor “padrão” substitua o que falta, podemos fornecê-lo usando =:

// default values
let [name10 = "Guest", surname10 = "Anonymous"] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // Anonymous (default used)

/*

Os valores padrão podem ser expressões mais complexas ou até mesmo chamadas de função. Eles são avaliados apenas se o valor não for fornecido.

Por exemplo, aqui usamos a promptfunção para dois padrões:

*/

// runs onlu prompt for surname
let [name = prompt('name?'), surname = prompt('surname')] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // whatever prompt gets

/*

Observe: o promptserá executado apenas para o valor ausente ( surname).

Desestruturação de objetos
A atribuição de desestruturação também funciona com objetos.

A sintaxe básica é:

*/

let {var1, var2} = {var1:..., var2:...}

/*

Devemos ter um objeto existente no lado direito, que queremos dividir em variáveis. O lado esquerdo contém um “padrão” semelhante a um objeto para as propriedades correspondentes. No caso mais simples, é uma lista de nomes de variáveis ​​em {...}.

Por exemplo:

*/

let options11 = {
    title: "Menu",
    width: 100,
    height: 200
};

let {title, width, height} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200

/*

Propriedades options.titlee são atribuídas options.widthàs options.heightvariáveis ​​correspondentes.

A ordem não importa. Isso também funciona:

*/

// changed the order in let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }

/*

O padrão do lado esquerdo pode ser mais complexo e especificar o mapeamento entre propriedades e variáveis.

Se quisermos atribuir uma propriedade a uma variável com outro nome, por exemplo, options.widthvá para a variável chamada w, então podemos definir o nome da variável usando dois pontos:

*/

let options = {
    title: "Menu",
    width: 100,
    height: 200
};
  
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
  
// width -> w
// height -> h
// title -> title
  
alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200

/*

Os dois pontos mostram “o que: vai para onde”. No exemplo acima, a propriedade widthvai para w, a propriedade heightvai para h, e titleé atribuída ao mesmo nome.

Para propriedades potencialmente ausentes, podemos definir valores padrão usando "=", assim:

*/


let options = {
    title: "Menu"
};
  
let {width = 100, height = 200, title} =options;
  
alert(title);  // Menu
alert(width);  // 100
alert(height); // 200

/*

Assim como com arrays ou parâmetros de função, os valores padrão podem ser quaisquer expressões ou até mesmo chamadas de função. Eles serão avaliados caso o valor não seja fornecido.

No código abaixo promptpede width, mas não para title:

*/

let options = {
    title: "Menu"
  ;
}
  
let {width = prompt("width?"), title = prompt("title?")} = options;
  
alert(title);  // Menu
alert(width);  // (whatever the result of prompt is)

// Também podemos combinar os dois pontos e a igualdade:

let options = {
    title: "Menu"
};
  
let {width: w = 100, height: h = 200, title} = options;
  
alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200

// Se tivermos um objeto complexo com muitas propriedades, podemos extrair apenas o que precisamos:

let options = {
    title: "Menu",
    width: 100,
    height: 200
};
  
// only extract title as a variable
let { title } = options;
  
alert(title); // Menu

/*

O padrão de descanso “…”
E se o objeto tiver mais propriedades do que variáveis? Podemos pegar alguns e depois atribuir o “resto” em algum lugar?

Podemos usar o padrão de descanso, assim como fizemos com os arrays. Não é suportado por alguns navegadores mais antigos (IE, use o Babel para preencher o polyfill), mas funciona nos modernos.

Se parece com isso:

*/

let options = {
    title: "Menu",
    height: 200,
    width: 100
};

// title = property named title
// rest = object with the rest of properties
let {title, ...rest} = options;

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100

/*

Peguei se não houverlet
Nos exemplos acima as variáveis ​​foram declaradas logo na atribuição: let {…} = {…}. Claro, poderíamos usar variáveis ​​existentes também, sem let. Mas há um problema.

Isso não vai funcionar:

*/

let title, width, height;

// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};

// O problema é que o JavaScript trata {...}o fluxo de código principal (não dentro de outra expressão) como um bloco de código. Esses blocos de código podem ser usados ​​para agrupar instruções, como esta:

{
    // a code block
    let message = "Hello";
    // ...
    alert( message );

}

/*

Então aqui o JavaScript assume que temos um bloco de código, é por isso que há um erro. Em vez disso, queremos a desestruturação.

Para mostrar ao JavaScript que não é um bloco de código, podemos colocar a expressão entre parênteses (...):

*/

let title, width, height;

// okay now
({title, width, height} = {title: "Menu", width: 200, height: 100});

alert( title ); // Menu

/*

Desestruturação aninhada
Se um objeto ou uma matriz contiver outros objetos e matrizes aninhados, podemos usar padrões do lado esquerdo mais complexos para extrair partes mais profundas.

No código abaixo optionstem outro objeto na propriedade sizee um array na propriedade items. O padrão do lado esquerdo da atribuição tem a mesma estrutura para extrair valores deles:

*/

let options = {
    size: {
        width: 100,
        height: 200
    },
    items: ["Cake", "Donut"],
    extra: true
};

// destructuring assignment split in multiple lines for clarity
let {
    size: { // put size here
        width,
        height
    },
    items: [item1, item2], // assign items here
    title = "Menu" // not present in the object (default value is used)
} = options


alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut

/*

Todas as propriedades do optionsobjeto, exceto extraa que está ausente na parte esquerda, são atribuídas às variáveis ​​correspondentes:


Por fim, temos width, height, item1, item2e titledo valor padrão.

Observe que não há variáveis ​​para sizee items, pois, em vez disso, consideramos seu conteúdo.

Parâmetros de funções inteligentes
Há momentos em que uma função tem muitos parâmetros, a maioria dos quais são opcionais. Isso é especialmente verdadeiro para interfaces de usuário. Imagine uma função que cria um menu. Pode ter largura, altura, título, lista de itens e assim por diante.

Aqui está uma maneira ruim de escrever tal função:

*/

function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
    // ...
}

/*

Na vida real, o problema é como lembrar a ordem dos argumentos. Normalmente os IDEs tentam nos ajudar, especialmente se o código estiver bem documentado, mas ainda assim... Outro problema é como chamar uma função quando a maioria dos parâmetros está ok por padrão.

Assim?

*/

// undefined where default values are fine
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])

/*

Isso é feio. E se torna ilegível quando lidamos com mais parâmetros.

A desestruturação vem em socorro!

Podemos passar parâmetros como um objeto, e a função imediatamente os desestrutura em variáveis:

*/

// we pass object to function
let options = {
    title: "My menu",
    items: ["Item1", "Item2"]
};

// ...and it immediately expands it to variables
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
    // title, items – taken from options,
    // width, height – defaults used
    alert( `${title} ${width} ${height}` ); // My Menu 200 100
    alert( items ); // Item1, Item2
}
  
showMenu(options);

// Também podemos usar uma desestruturação mais complexa com objetos aninhados e mapeamentos de dois pontos:

let options = {
    title: "My menu",
    items: ["Item1", "Item2"]
};
  
function showMenu({
    title = "Untitled",
    width: w = 100,  // width goes to w
    height: h = 200, // height goes to h
    items: [item1, item2] // items first element goes to item1, second to item2
}) {
    alert( `${title} ${w} ${h}` ); // My Menu 100 200
    alert( item1 ); // Item1
    alert( item2 ); // Item2
}
  
showMenu(options);

// A sintaxe completa é a mesma de uma atribuição de desestruturação:

function({
    incomingProperty: varName = defaultValue
    ...
})

/*

Então, para um objeto de parâmetros, haverá uma variável varNamepara propriedade incomingProperty, com defaultValuepor padrão.

Por favor, note que tal desestruturação assume que showMenu()tem um argumento. Se quisermos todos os valores por padrão, devemos especificar um objeto vazio:

*/

showMenu({}); // ok, all values are default

showMenu(); // this would give an error

// Podemos corrigir isso tornando {}o valor padrão para todo o objeto de parâmetros:

function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
    alert( `${title} ${width} ${height}` );
}
  
showMenu(); // Menu 100 200

/*

No código acima, o objeto de argumentos inteiro é {}o padrão, então sempre há algo para desestruturar.

Resumo
A atribuição de desestruturação permite mapear instantaneamente um objeto ou array em muitas variáveis.

A sintaxe completa do objeto:

*/

let {prop: varName = default, ...rest} = object

/*

Isso significa que a propriedade propd eve entrar na variável var Name e, se essa propriedade não existir, o default valor deve ser usado.

As propriedades do objeto que não têm mapeamento são copiadas para o restobjeto.

A sintaxe completa do array:

*/

let [item1 = default, item2, ...rest] = array

/*

O primeiro item vai para item1; o segundo entra item2, todo o resto faz o array rest.

É possível extrair dados de arrays/objetos aninhados, para isso o lado esquerdo deve ter a mesma estrutura do lado direito.

*/


