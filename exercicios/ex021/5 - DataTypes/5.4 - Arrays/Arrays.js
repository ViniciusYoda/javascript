/*

Matrizes
Os objetos permitem que você armazene coleções de valores com chave. Isso é bom.

Mas muitas vezes descobrimos que precisamos de uma coleção ordenada , onde temos um 1º, um 2º, um 3º elemento e assim por diante. Por exemplo, precisamos disso para armazenar uma lista de algo: usuários, mercadorias, elementos HTML etc.

Não é conveniente usar um objeto aqui, porque ele não fornece métodos para gerenciar a ordem dos elementos. Não podemos inserir uma nova propriedade “entre” as já existentes. Objetos simplesmente não são feitos para tal uso.

Existe uma estrutura de dados especial chamada Array, para armazenar coleções ordenadas.

Declaração
Existem duas sintaxes para criar uma matriz vazia:

*/

let arr = new Array();
let arr = [];

// Quase o tempo todo, a segunda sintaxe é usada. Podemos fornecer elementos iniciais entre colchetes:

let fruits = ["Apple", "Orange", "Plum"];

/*

Os elementos da matriz são numerados, começando com zero.

Podemos obter um elemento pelo seu número entre colchetes:

*/

let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum

// Podemos substituir um elemento:

fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]

//...Ou adicione um novo ao array:

fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]

// A contagem total dos elementos na matriz é sua length:

let fruits = ["Apple", "Orange", "Plum"];

alert( fruits.length ); // 3

// Também podemos usar alertpara mostrar todo o array.

let fruits = ["Apple", "Orange", "Plum"]

alert( fruits ); // Apple,Orange,Plum

/*

Um array pode armazenar elementos de qualquer tipo.

Por exemplo:

*/

// mix of values
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); }]

// get the object at index 1 and then show its name
alert( arr[1].name ); // John

// get the function at index 3 and run it
arr[3](); // hello

/*

Vírgula à direita
Um array, assim como um objeto, pode terminar com uma vírgula:

*/

let fruits = [
    "Apple",
    "Orange",
    "Plum",
];

/*

O estilo “vírgula à direita” facilita a inserção/remoção de itens, pois todas as linhas se tornam iguais.

Obtenha os últimos elementos com “at”

Uma adição recente
Esta é uma adição recente à linguagem. Navegadores antigos podem precisar de polyfills .

Digamos que queremos o último elemento do array.

Algumas linguagens de programação permitem usar índices negativos para o mesmo propósito, como fruits[-1].

Embora, em JavaScript, não funcione. O resultado será undefined, porque o índice entre colchetes é tratado literalmente.

Podemos calcular explicitamente o índice do último elemento e acessá-lo: fruits[fruits.length - 1].

*/

let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[fruits.length-1] ); // Plum

/*

Um pouco trabalhoso, não é? Precisamos escrever o nome da variável duas vezes.

Felizmente, há uma sintaxe mais curta: fruits.at(-1):

*/

let fruits = ["Apple", "Orange", "Plun"];

// same as fruits[fruits.length-1]
alert( fruits.at(-1) ); // Plum

/*

Em outras palavras, arr.at(i):

é exatamente o mesmo que arr[i], se i >= 0.
para valores negativos de i, ele recua do final da matriz.

Métodos pop/push, shift/unshift
Uma fila é um dos usos mais comuns de uma matriz. Na ciência da computação, isso significa uma coleção ordenada de elementos que suporta duas operações:

push acrescenta um elemento ao final.
shift obter um elemento desde o início, avançando a fila, de modo que o 2º elemento se torne o 1º. 

Os arrays suportam ambas as operações.

Na prática, precisamos disso com muita frequência. Por exemplo, uma fila de mensagens que precisam ser mostradas na tela.

Há outro caso de uso para arrays – a estrutura de dados chamada stack .

Ele suporta duas operações:

pushadiciona um elemento ao final.
poppega um elemento do final.
Assim, novos elementos são adicionados ou retirados sempre do “fim”.

Uma pilha é geralmente ilustrada como um baralho de cartas: novas cartas são adicionadas ao topo ou retiradas do topo:

Para pilhas, o último item enviado é recebido primeiro, também chamado de princípio LIFO (Last-In-First-Out). Para filas, temos FIFO (First-In-First-Out).

Arrays em JavaScript podem funcionar tanto como uma fila quanto como uma pilha. Eles permitem adicionar/remover elementos, tanto no início quanto no final.

Em ciência da computação, a estrutura de dados que permite isso é chamada deque .

Métodos que funcionam com o final do array:

pop
Extrai o último elemento do array e o retorna:

*/

let fruits = ["Apple", "Orange", "Pear"];

alert( fruits.pop() ); // remove "Pear" and alert it

alert( fruits ); // Apple, Orange

/*

Ambos fruits.pop()e fruits.at(-1)retornam o último elemento do array, mas fruits.pop()também modifica o array removendo-o.

push
Anexe o elemento ao final do array:

*/

let fruits = ["Apple", "Orange"];

fruits.push("Pear");

alert( fruits ); // Apple, Orange, Pear

/*

A chamada fruits.push(...)é igual a fruits[fruits.length] = ....

Métodos que funcionam com o início do array:

shift
Extrai o primeiro elemento do array e o retorna:

*/

let fruits = ["Apple", "Orange", "Pear"];

alert( fruits.shift() ); // remove Apple and alert it

alert( fruits ); // Orange, Pear

/*

unshift
Adicione o elemento ao início do array:

*/

let fruits = ["Orange", "Pear"];

fruits.unshift('Apple');

alert( fruits ); // Apple, Orange, Pear

// Métodos pushe unshiftpode adicionar vários elementos de uma só vez:

let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );

/*

Internos
Um array é um tipo especial de objeto. Os colchetes usados ​​para acessar uma propriedade arr[0], na verdade, vêm da sintaxe do objeto. Isso é essencialmente o mesmo que obj[key], onde arrestá o objeto, enquanto os números são usados ​​como chaves.

Eles estendem objetos fornecendo métodos especiais para trabalhar com coleções ordenadas de dados e também com a lengthpropriedade. Mas no fundo ainda é um objeto.

Lembre-se, existem apenas oito tipos de dados básicos em JavaScript (consulte o capítulo Tipos de dados para obter mais informações). Array é um objeto e, portanto, se comporta como um objeto.

Por exemplo, é copiado por referência:

*/

let fruits = ["Banana"]

let arr = fruits; // copy by reference (two variables reference the same array)

alert( arr === fruits ); // true

arr.push("Pear"); // modify the array by reference

alert( fruits ); // Banana, Pear - 2 items now

/*

…Mas o que torna os arrays realmente especiais é sua representação interna. O mecanismo tenta armazenar seus elementos na área de memória contígua, um após o outro, exatamente como mostrado nas ilustrações deste capítulo, e existem outras otimizações também, para que os arrays funcionem muito rápido.

Mas todos eles quebram se pararmos de trabalhar com um array como com uma “coleção ordenada” e começarmos a trabalhar com ele como se fosse um objeto regular.

Por exemplo, tecnicamente podemos fazer isso:

*/

let fruits = []; // make an array

fruits[99999] = 5; // assign a property with the index far greater than its length

fruits.age = 25; // create a property with an arbitrary name

/*

Isso é possível, porque arrays são objetos em sua base. Podemos adicionar quaisquer propriedades a eles.

Mas o mecanismo verá que estamos trabalhando com o array como com um objeto regular. As otimizações específicas de array não são adequadas para esses casos e serão desativadas, seus benefícios desaparecem.

As maneiras de usar indevidamente uma matriz:

Adicione uma propriedade não numérica como arr.test = 5.
Faça furos, como: adicione arr[0]e depois arr[1000](e nada entre eles).
Preencha a matriz na ordem inversa, como arr[1000]e arr[999]assim por diante.
Por favor, pense nos arrays como estruturas especiais para trabalhar com os dados ordenados . Eles fornecem métodos especiais para isso. Arrays são cuidadosamente ajustados dentro de mecanismos JavaScript para trabalhar com dados ordenados contíguos, por favor, use-os desta forma. E se você precisar de chaves arbitrárias, as chances são altas de que você realmente precise de um objeto regular {}.

atuação
Os métodos push/popsão rápidos, enquanto shift/unshiftsão lentos.

Por que é mais rápido trabalhar com o fim de um array do que com seu início? Vamos ver o que acontece durante a execução:

*/

fruits.shift(); // take 1 element from the start

/*

Não basta pegar e remover o elemento com o índice 0. Outros elementos também precisam ser renumerados.

A shiftoperação deve fazer 3 coisas:

Remova o elemento com o índice 0.
Mova todos os elementos para a esquerda, renumere-os do índice 1para 0, de 2para 1e assim por diante.
Atualize a lengthpropriedade.

Quanto mais elementos na matriz, mais tempo para movê-los, mais operações na memória.

Algo semelhante acontece com unshift: para adicionar um elemento ao início do array, precisamos primeiro mover os elementos existentes para a direita, aumentando seus índices.

E com o quê push/pop? Eles não precisam mover nada. Para extrair um elemento do final, o popmétodo limpa o índice e encurta length.

As ações para a pop operação:

*/

fruits.pop(); // take 1 element from the end

/*

O pop método não precisa mover nada, pois outros elementos mantêm seus índices. É por isso que é incrivelmente rápido.

A mesma coisa com o push método.

rotações
Uma das maneiras mais antigas de alternar itens de matriz é o forloop sobre índices:

*/

let arr = ["Apple", "Orange", "Pear"];

for (let i = 0; i < arr.length; i++) {
    alert( arr[i] );
}

// Mas para arrays existe outra forma de loop, for..of:

let fruits  = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
    alert( fruit );
}

/*

O for..of não dá acesso ao número do elemento atual, apenas seu valor, mas na maioria dos casos isso é suficiente. E é mais curto.

Tecnicamente, como arrays são objetos, também é possível usar for..in:

*/

let arr = ["Apple", "Orange", "Pear"];

for (let key in arr) {
    alert( arr[key] ); // Apple, Orange, Pear
}

/*

Mas isso é realmente uma má ideia. Existem possíveis problemas com isso:

O loop for..initera sobre todas as propriedades , não apenas as numéricas.

1 Existem objetos chamados “array-like” no navegador e em outros ambientes, que se parecem com arrays . Ou seja, eles têm lengthpropriedades e índices, mas também podem ter outras propriedades e métodos não numéricos, dos quais geralmente não precisamos. O for..inloop irá listá-los. Portanto, se precisarmos trabalhar com objetos do tipo array, essas propriedades “extras” podem se tornar um problema.

2 O for..in loop é otimizado para objetos genéricos, não arrays e, portanto, é 10 a 100 vezes mais lento. Claro, ainda é muito rápido. A aceleração só pode importar em gargalos. Mas ainda assim devemos estar cientes da diferença.

Geralmente, não devemos usar for..inpara arrays.

Uma palavra sobre “comprimento”
A length propriedade é atualizada automaticamente quando modificamos a matriz. Para ser preciso, na verdade não é a contagem de valores na matriz, mas o maior índice numérico mais um.

Por exemplo, um único elemento com um índice grande fornece um comprimento grande:

*/

let fruits = [];
fruits[123] = "Apple";

alert( fruis.length ); // 124

/*

Observe que geralmente não usamos arrays assim.

Outra coisa interessante sobre a lengthpropriedade é que é gravável.

Se aumentarmos manualmente, nada de interessante acontece. Mas se diminuirmos, a matriz será truncada. O processo é irreversível, aqui está o exemplo:

*/

let arr = [1, 2, 3, 4, 5];

arr.length = 2; // truncate to 2 elements
alert( arr ); // [1, 2]

arr.length = 5; // return length back
alert( arr[3] ); // undefined: the values do not return

/*

Portanto, a maneira mais simples de limpar a matriz é: arr.length = 0;.

nova Matriz()
Há mais uma sintaxe para criar um array:

*/

let arr = new Array("Apple", "Pear", "etc");

/*

Raramente é usado, porque colchetes []são mais curtos. Além disso, há um recurso complicado com ele.

Se new Arrayfor chamado com um único argumento que é um número, ele cria um array sem itens, mas com o comprimento fornecido .

Vamos ver como se pode dar um tiro no pé:

*/

let arr = new Array(2); // will it create an array of [2] ?

alert( arr[0] ); // undefined! no elements.

alert( arr.length ); // length 2

/*

Para evitar tais surpresas, geralmente usamos colchetes, a menos que realmente saibamos o que estamos fazendo.

Matrizes multidimensionais
Arrays podem ter itens que também são arrays. Podemos usá-lo para arrays multidimensionais, por exemplo, para armazenar matrizes:

*/

let matrix = [
    [1, 2, 3],
    [3, 5, 5],
    [7, 8, 9]
];

alert( matrix[1][1] ); // 5, the central element

/*

Arrays têm sua própria implementação de toStringmétodo que retorna uma lista de elementos separados por vírgulas.

Por exemplo:

*/

let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true

// Além disso, vamos tentar isso:

alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"

/*

Arrays não tem Symbol.toPrimitive, nem um viável valueOf, eles implementam apenas toStringconversão, então aqui []se torna uma string vazia, [1]se torna "1"e [1,2]se torna "1,2".

Quando o operador binário plus "+"adiciona algo a uma string, ele também a converte em uma string, então a próxima etapa se parece com isso:

*/

alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"

/*

Não compare arrays com ==
Arrays em JavaScript, ao contrário de outras linguagens de programação, não devem ser comparados com o operador ==.

Este operador não tem tratamento especial para arrays, ele trabalha com eles como com qualquer objeto.

Vamos relembrar as regras:

Dois objetos são iguais ==somente se forem referências ao mesmo objeto.
Se um dos argumentos de ==for um objeto e o outro for um primitivo, então o objeto será convertido para primitivo, conforme explicado no capítulo Conversão de objeto para primitivo .
…Com exceção de nulle undefinedque se igualam ==e nada mais.
A comparação estrita ===é ainda mais simples, pois não converte tipos.

Portanto, se compararmos arrays com ==, eles nunca serão iguais, a menos que comparemos duas variáveis ​​que referenciam exatamente o mesmo array.

Por exemplo:

*/

alert( [] == [] ); // false
alert( [0] == [0] ); // false

/*

Essas matrizes são objetos tecnicamente diferentes. Então eles não são iguais. O ==operador não faz comparação item por item.

A comparação com primitivos também pode dar resultados aparentemente estranhos:

*/

alert( 0 == [] ); // true

alert('0' == [] ); // false

/*

Aqui, em ambos os casos, comparamos uma primitiva com um objeto array. Assim, o array []é convertido em primitivo para fins de comparação e se torna uma string vazia ''.

Em seguida, o processo de comparação continua com as primitivas, conforme descrito no capítulo Conversões de Tipo :

*/

// after [] was converted to ''
alert( 0 == '' ); // true, as '' becomes converted to number 0

alert('0' == '' ); // false, no type conversion, different strings

/*

Então, como comparar matrizes?

Isso é simples: não use o ==operador. Em vez disso, compare-os item por item em um loop ou usando métodos de iteração explicados no próximo capítulo.

Resumo

Array é um tipo especial de objeto, adequado para armazenar e gerenciar itens de dados ordenados.

A declaração:

*/

// square brackets (usual)
let arr = [item1, item2...];

// new Array (exceptionally rare)
let arr = new Array(item1, item2...);

/*

A chamada para new Array(number)cria um array com o comprimento dado, mas sem elementos.

A lengthpropriedade é o comprimento do array ou, para ser mais preciso, seu último índice numérico mais um. É ajustado automaticamente por métodos de matriz.
Se encurtarmos lengthmanualmente, a matriz será truncada.

Obtendo os elementos:

podemos obter o elemento pelo seu índice, comoarr[0]
também podemos usar at(i)o método que permite índices negativos. Para valores negativos de i, ele recua do final da matriz. Se i >= 0, funciona da mesma forma que arr[i].
Podemos usar um array como um deque com as seguintes operações:

push(...items)acrescenta itemsao final.
pop()remove o elemento do final e o retorna.
shift()remove o elemento do início e o retorna.
unshift(...items)acrescenta itemsao início.
Para fazer um loop sobre os elementos do array:

for (let i=0; i<arr.length; i++)– funciona mais rápido, compatível com navegadores antigos.
for (let item of arr)– a sintaxe moderna apenas para itens,
for (let i in arr)- nunca use.

Para comparar arrays, não use o ==operador (assim como >, <e outros), pois eles não possuem tratamento especial para arrays. Eles os tratam como qualquer objeto, e não é o que normalmente queremos.

Em vez disso, você pode usar for..ofo loop para comparar os arrays item por item.

Continuaremos com arrays e estudaremos mais métodos para adicionar, remover, extrair elementos e ordenar arrays no próximo capítulo Métodos de array .

*/


