/*

Métodos de matriz
Arrays fornecem muitos métodos. Para facilitar as coisas, neste capítulo eles são divididos em grupos.

Adicionar/remover itens
Já conhecemos métodos que adicionam e removem itens do início ou do fim:

arr.push(...items)– adiciona itens ao final,
arr.pop()– extrai um item do final,
arr.shift()– extrai um item desde o início,
arr.unshift(...items)– adiciona itens ao início.
Aqui estão alguns outros.

emendar

Como excluir um elemento do array?

Os arrays são objetos, então podemos tentar usar delete:

*/

let arr ["I", "go", "home"];

delete arr[1]; // remove "go"

alert( arr[1] ); // undefined

// now arr = ["I", , "home"];
alert( arr.length ); // 3

/*

O elemento foi removido, mas o array ainda possui 3 elementos, podemos ver que arr.length == 3.

Isso é natural, porque delete obj.keyremove um valor pelo key. É tudo o que faz. Ótimo para objetos. Mas para arrays geralmente queremos que o resto dos elementos se desloque e ocupe o lugar liberado. Esperamos ter uma matriz mais curta agora.

Portanto, métodos especiais devem ser usados.

O método arr.splice é um canivete suíço para matrizes. Ele pode fazer tudo: inserir, remover e substituir elementos.

A sintaxe é:

*/

arr.splice(start[, deleteCount, elem1, ...arr, elemN])

/*

Ele modifica arra partir do índice start: remove os deleteCountelementos e depois os insere elem1, ..., elemNem seu lugar. Retorna o array de elementos removidos.

Este método é fácil de entender por exemplos.

Vamos começar com a exclusão:

*/

let arr = ["I", "study", "JavaScript"];

arr.splice(1, 1); // from index 1 remvoe 1 element

alert( arr ); // ["I", "JavaScript"]

/*

Fácil, certo? A partir do índice 1, removeu o 1elemento.

No próximo exemplo, removemos 3 elementos e os substituímos pelos outros dois:

*/

let arr = ["I", "study", "JavaScript", "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let´s", "dance");

alert( arr ) // nore ["Let´s", "dance", "right", "now"]

// Aqui podemos ver que spliceretorna o array de elementos removidos:

let arr = ["I", "study", "JavaScript", "right", "now"];

// remove 2 first elements
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- array of removed elements

// O splice método também é capaz de inserir os elementos sem remoções. Para isso, precisamos definir deleteCountpara 0:

let arr = ["I", "study", "JavaScript"];

// from index 2
// delete 0
// then insert "complex" and "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"

/*

Índices negativos permitidos
Aqui e em outros métodos de array, índices negativos são permitidos. Eles especificam a posição do final da matriz, como aqui:

*/

let arr = [1, 2, 5];

// from index -1 (one step from the end)
// delete 0 elements,
// ten insert 3 and 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5

/*

fatiar
O método arr.slice é muito mais simples que o arr.splice.

A sintaxe é:

*/

arr.slice([start], [end])

/*

Ele retorna um novo array copiando todos os itens do índice startpara end(não incluindo end). Ambos starte endpodem ser negativos, nesse caso a posição do final da matriz é assumida.

É semelhante a um método de string str.slice, mas em vez de substrings ele cria subarrays.

Por exemplo:

*/

let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (copy from 1 to 3)

alert( arr.slice(-2) );  // s,t (copy from -2 till the end)

/*

Também podemos chamá-lo sem argumentos: arr.slice()cria uma cópia de arr. Isso geralmente é usado para obter uma cópia para outras transformações que não devem afetar a matriz original.

concatenar
O método arr.concat cria um novo array que inclui valores de outros arrays e itens adicionais.

A sintaxe é:

*/

arr.concat(arg1, arg2...)

/*

Ele aceita qualquer número de argumentos – arrays ou valores.

O resultado é um novo array contendo itens de arr, then arg1, arg2etc.

Se um argumento argNfor uma matriz, todos os seus elementos serão copiados. Caso contrário, o próprio argumento é copiado.

Por exemplo:

*/

let arr = [1, 2];

// create an array from: arr and [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// create an array from: arr and [3,4] and [5,6]
alert( arr.concat([3,4], [5,6]) ); // 1,2,3,4,5,6

// create an array from arr and [3,4], then add values 5 and 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6

// Normalmente, ele copia apenas elementos de arrays. Outros objetos, mesmo que pareçam arrays, são adicionados como um todo:

let arr = [1, 2];

let arrayLike = {
    0: "something",
    length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]

// …Mas se um objeto do tipo array tem uma Symbol.isConcatSpreadablepropriedade especial, então ele é tratado como um array por concat: seus elementos são adicionados ao invés:

let arr = [1, 2];

let arrayLike = {
    0: "something",
    1: "else",
    [Symbol.isConcatSpreadable]: true,
    length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else

/*

Iterar: forEach
O método arr.forEach permite executar uma função para cada elemento do array.

A sintaxe:

*/

arr.forEach(function(item, index, array) {
    // ... do somethinf with item
});

// Por exemplo, isso mostra cada elemento da matriz:

// for each element call alert
["Bilbo", "Gandalf", "Nazgui"].forEach(alert);

// E este código é mais elaborado sobre suas posições na matriz de destino:

["Bilbo", "Gandalf", "Nazgui"].forEach((item, index, array) => {
    alert(`${item} is at index ${index} in ${array}`);
});

/* O resultado da função (se retornar algum) é descartado e ignorado.

Pesquisando na matriz
Agora vamos abordar os métodos que pesquisam em uma matriz.

indexOf/lastIndexOf e inclui
Os métodos arr.indexOf e arr.includes têm a sintaxe semelhante e fazem essencialmente o mesmo que suas contrapartes de string, mas operam em itens em vez de caracteres:

arr.indexOf(item, from)– procura iteminiciar a partir de index frome retorna o índice onde foi encontrado, caso contrário -1.
arr.includes(item, from)– procura a itempartir de index from, retorna truese encontrado.
Geralmente esses métodos são usados ​​com apenas um argumento: o itemto search. Por padrão, a pesquisa é desde o início.

Por exemplo:

*/

let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true

/*

Observe que indexOfusa a igualdade estrita ===para comparação. Então, se procurarmos por false, ele encontra exatamente falsee não o zero.

Se queremos verificar se itemexiste no array, e não precisamos do índice exato, então arr.includesé preferível.

O método arr.lastIndexOf é o mesmo que indexOf, mas procura da direita para a esquerda.

*/

let fruits = ['Apple', 'Orange', 'Apple']

alert( fruits.indexOf('Apple') ); // 0 (first Apple)
alert( fruits.lastIndexOf('Apple') ); // 2 (last Apple)

/*

O includesmétodo trata NaNcorretamente
Um recurso menor, mas digno de nota, includesé que ele lida corretamente com NaN, ao contrário de indexOf:

*/

const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (wrong, should be 0)
alert( arr.includes(NaN) ); // true (correct)

/*

Isso porque includesfoi adicionado ao JavaScript muito mais tarde e usa o algoritmo de comparação mais atualizado internamente.

encontre e encontreIndex/findLastIndex
Imagine que temos uma matriz de objetos. Como encontramos um objeto com a condição específica?

Aqui o método arr.find(fn) é útil.

A sintaxe é:

*/

let result = arr.find(function(item, index, array) {
    // if true is returned, item is returned and iteration is stopped
    // for falsy scenario returns undefined
});

/*

A função é chamada para elementos do array, um após o outro:

itemé o elemento.
indexé o seu índice.
arrayé a própria matriz.
Se retornar true, a pesquisa é interrompida, o itemé retornado. Se nada for encontrado, undefinedé retornado.

Por exemplo, temos uma matriz de usuários, cada um com os campos ide name. Vamos encontrar aquele com id == 1:

*/

let users =  [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
];

let user = user.find(item => item.id == 1);

alert(user.name); // John

/*

Na vida real, arrays de objetos são uma coisa comum, então o findmétodo é muito útil.

Observe que no exemplo fornecemos à findfunção item => item.id == 1um argumento. Isso é típico, outros argumentos desta função raramente são usados.

O método arr.findIndex tem a mesma sintaxe, mas retorna o índice onde o elemento foi encontrado em vez do próprio elemento. O valor de -1é retornado se nada for encontrado.

O método arr.findLastIndex é como findIndex, mas pesquisa da direita para a esquerda, semelhante a lastIndexOf.

Aqui está um exemplo:

*/

let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"},
    {id: 4, name: "John"}
];

// Find the index of the first John
alert(users.findIndex(user => user.name == 'John')); // 0

// Find the index of the last John
alert(users.findLastIndex(user => user.name == 'John')); // 3

/*

filtro
O findmétodo procura um único (primeiro) elemento que faça a função retornar true.

Se houver muitos, podemos usar arr.filter(fn) .

A sintaxe é semelhante a find, mas filterretorna uma matriz de todos os elementos correspondentes:

*/

let results = arr.filter(function(item, index, array) {
    // if true item is pushed to results and the iteration continues
    // returns empty array if nothing found
})

// Por exemplo:

let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
];

// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2

/*

Transforme uma matriz
Vamos passar para os métodos que transformam e reordenam um array.

mapa
O método arr.map é um dos mais úteis e frequentemente usados.

Ele chama a função para cada elemento do array e retorna o array de resultados.

A sintaxe é:

*/

let result = arr.map(function(item, index, array) {
    // returns the new value instead of item
});

// Por exemplo, aqui transformamos cada elemento em seu comprimento:

let lengths = ["Bilbo", "Gandalf", "Nazgui"].map(item => item.length);
alert(lengths); // 5,7,6

/*

preto (fn)
A chamada para arr.sort() classifica o array no lugar , alterando a ordem de seus elementos.

Ele também retorna o array ordenado, mas o valor retornado geralmente é ignorado, pois arrele mesmo é modificado.

Por exemplo:

*/

let arr = [ 1, 2, 15 ];

// the method reorders the content of arr
arr.sort();

alert( arr ); // 1, 15, 2

/*

Você notou algo estranho no resultado?

A ordem tornou-se 1, 15, 2. Incorreta. Mas por que?

Os itens são classificados como strings por padrão.

Literalmente, todos os elementos são convertidos em strings para comparações. Para strings, a ordenação lexicográfica é aplicada e, de fato, "2" > "15".

Para usar nossa própria ordem de classificação, precisamos fornecer uma função como argumento de arr.sort().

A função deve comparar dois valores arbitrários e retornar:

*/

function compare(a, b) {
    if (a > b) return 1; // if the first value is greater than the second
    if (a == b) return 0; // if values are equal
    if (a < b); return -1; // if the first value is less than the second
}

// Por exemplo, para classificar como números:

function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

arr.sort(compareNumeric);

alert(arr); // 1, 2, 15

/*

Agora funciona como pretendido.

Vamos dar um passo para o lado e pensar no que está acontecendo. A arrmatriz pode ser de qualquer coisa, certo? Pode conter números ou strings ou objetos ou qualquer outra coisa. Temos um conjunto de alguns itens . Para classificá-lo, precisamos de uma função de ordenação que saiba comparar seus elementos. O padrão é uma ordem de string.

O arr.sort(fn)método implementa um algoritmo de ordenação genérico. Não precisamos nos preocupar com o funcionamento interno (um quicksort otimizado ou Timsort na maioria das vezes). Ele percorrerá o array, comparará seus elementos usando a função fornecida e os reordenará, tudo o que precisamos é fornecer o fnque faz a comparação.

Aliás, se algum dia quisermos saber quais elementos são comparados – nada impede de alertá-los:

*/

[1, -2, 15, 2, 0, 8].sort(function(a, b) {
    alert( a + " <> " + b);
    return a - b;
});

/*
O algoritmo pode comparar um elemento com vários outros no processo, mas tenta fazer o mínimo de comparações possível.

Uma função de comparação pode retornar qualquer número
Na verdade, uma função de comparação só é necessária para retornar um número positivo para dizer “maior” e um número negativo para dizer “menor”.

Isso permite escrever funções mais curtas:

*/

let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr); // 1, 2, 15

/*

Funções de seta para o melhor
Lembre -se das funções de seta ? Podemos usá-los aqui para uma classificação mais organizada:

*/

arr.sort( (a, b) => a - b );

/*

Isso funciona exatamente da mesma forma que a versão mais longa acima.

Use localeComparepara cordas
Lembre -se do algoritmo de comparação de strings ? Ele compara letras por seus códigos por padrão.

Para muitos alfabetos, é melhor usar o str.localeComparemétodo para classificar corretamente as letras, como Ö.

Por exemplo, vamos classificar alguns países em alemão:

*/

let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)

/*

marcha ré
O método arr.reverse inverte a ordem dos elementos emarr .

Por exemplo:

*/

let arr = [1,2,3,4,5];
arr.reverse();

alert( arr ); // 5,4,3,2,1

/*

marcha ré
O método arr.reverse inverte a ordem dos elementos emarr .

Por exemplo:

*/

let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
    alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}

// O split método tem um segundo argumento numérico opcional – um limite no comprimento do array. Se for fornecido, os elementos extras serão ignorados. Na prática, raramente é usado:

let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf

/*

Dividir em letras
A chamada para split(s)com um vazio sdividiria a string em uma matriz de letras:

*/

let str = "test";

alert( str.split('') ); // t,e,s,t

/*

A chamada arr.join(glue) faz o inverso de split. Ele cria uma sequência de arritens unidos glueentre eles.

Por exemplo:

*/

let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // glue the array into a string using ;

alert( str ); // Bilbo;Gandalf;Nazgul

/*

reduzir/reduzirDireita
Quando precisamos iterar sobre um array – podemos usar forEach, forou for..of.

Quando precisamos iterar e retornar os dados para cada elemento – podemos usar map.

Os métodos arr.reduce e arr.reduceRight também pertencem a essa raça, mas são um pouco mais complexos. Eles são usados ​​para calcular um único valor com base na matriz.

A sintaxe é:

*/

let value = arr.reduce(function(accumulator, item, index, array ) {
    // ...
}, [initial]);

/*

A função é aplicada a todos os elementos do array um após o outro e “continua” seu resultado para a próxima chamada.

Argumentos:

accumulator– é o resultado da chamada de função anterior, igual initialà primeira vez (se initialfornecido).
item– é o item da matriz atual.
index– é a sua posição.
array– é a matriz.
À medida que a função é aplicada, o resultado da chamada de função anterior é passado para a próxima como o primeiro argumento.

Assim, o primeiro argumento é essencialmente o acumulador que armazena o resultado combinado de todas as execuções anteriores. E no final torna-se o resultado de reduce.

Parece complicado?

A maneira mais fácil de entender isso é pelo exemplo.

Aqui nós obtemos uma soma de uma matriz em uma linha:

*/

let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current, 0) => sum + current, 0);

alert(result); // 15

/*

A função passada para reduceusa apenas 2 argumentos, o que normalmente é suficiente.

Vamos ver os detalhes do que está acontecendo.

1. Na primeira execução, sumé o initialvalor (o último argumento de reduce), equals 0, e currenté o primeiro elemento da matriz, equals 1. Então o resultado da função é 1.
2. Na segunda execução, sum = 1, adicionamos o segundo elemento de array ( 2) a ele e retornamos.
3. Na 3ª execução, sum = 3e adicionamos mais um elemento a ele, e assim por diante…

O fluxo de cálculo:

Ou na forma de uma tabela, onde cada linha representa uma chamada de função no próximo elemento do array:

sum	current	resultado
a primeira chamada	0	1	1
a segunda chamada	1	2	3
a terceira chamada	3	3	6
a quarta chamada	6	4	10
a quinta chamada	10	5	15
Aqui podemos ver claramente como o resultado da chamada anterior se torna o primeiro argumento da próxima.

Também podemos omitir o valor inicial:

*/

let arr = [1, 2, 3, 4, 5];

// removed initial value from reduce (no 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15

/*

O resultado é o mesmo. Isso porque se não houver inicial, entãoreduce pega o primeiro elemento da matriz como o valor inicial e inicia a iteração a partir do 2º elemento.

A tabela de cálculo é a mesma acima, menos a primeira linha.

Mas tal uso requer um cuidado extremo. Se a matriz estiver vazia, a reducechamada sem valor inicial gera um erro.

Aqui está um exemplo:

*/

let arr = [];

// Error: Reduce of empty array with no initial value
// if the initial value existed, reduce would return it for the empty arr.
arr.reduce((sum, current) => sum + current);

/*

Portanto, é aconselhável sempre especificar o valor inicial.

O método arr.reduceRight faz o mesmo, mas vai da direita para a esquerda.

Array.isArray
Matrizes não formam um tipo de idioma separado. Eles são baseados em objetos.

Portanto typeof, não ajuda a distinguir um objeto simples de uma matriz:

*/

alert(typeof {}); // object
alert(typeof []); // object (same)

// …Mas arrays são usados ​​com tanta frequência que existe um método especial para isso: Array.isArray(value) . Ele retorna truese valuefor um array e falsecaso contrário.

alert(Array.isArray({})); // false

alert(Array.isArray([])); // true

/*

A maioria dos métodos suporta “thisArg”
Quase todos os métodos de array que chamam funções – como find, filter, map, com uma notável exceção de sort, aceitam um parâmetro adicional opcional thisArg.

Esse parâmetro não é explicado nas seções acima, porque raramente é usado. Mas, para ser completo, temos que cobri-lo.

Aqui está a sintaxe completa desses métodos:

*/

arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg is the optional last argument

/*

O valor do thisArgparâmetro se torna thispara func.

Por exemplo, aqui usamos um método de armyobjeto como filtro e passamos thisArgo contexto:

*/

let army = {
    minAge: 18,
    maxAge: 27,
    canJoin(user) {
        return user.age >= this.minAge && user.age < this.maxAge;
    }
};

let users = [
    {age: 16},
    {age: 20},
    {age: 23},
    {age: 30}
];

// find users, for whoe army.canJoin returns true
let soldiers = users.filter(army.canJoin, army);

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23

/*

Se no exemplo acima usamos users.filter(army.canJoin), então army.canJoinseria chamado como uma função autônoma, com this=undefined, levando a um erro instantâneo.

Uma chamada para users.filter(army.canJoin, army)pode ser substituída por users.filter(user => army.canJoin(user)), que faz o mesmo. Este último é usado com mais frequência, pois é um pouco mais fácil de entender para a maioria das pessoas.

Resumo
Uma folha de dicas de métodos de matriz:

Para adicionar/remover elementos:

push(...items)– adiciona itens ao final,
pop()– extrai um item do final,
shift()– extrai um item desde o início,
unshift(...items)– adiciona itens ao início.
splice(pos, deleteCount, ...items)– at index posexclui deleteCountelementos e insere items.
slice(start, end)– cria um novo array, copia os elementos do índice startaté end(não inclusivo) nele.
concat(...items)– retorna um novo array: copia todos os membros do atual e adiciona itemsa ele. Se qualquer itemsum for uma matriz, seus elementos serão usados.
Para pesquisar entre os elementos:

indexOf/lastIndexOf(item, pos)– procure iteminiciar da posição pos, retorne o índice ou -1se não for encontrado.
includes(value)– retorna truese o array tiver value, caso contrário false.
find/filter(func)– filtrar elementos através da função, retornar primeiro/todos os valores que a fazem retornar true.
findIndexé como find, mas retorna o índice em vez de um valor.
Para iterar sobre os elementos:

forEach(func)– chama funcpara cada elemento, não retorna nada.
Para transformar a matriz:

map(func)– cria um novo array a partir dos resultados da chamada funcpara cada elemento.
sort(func)– classifica a matriz no local e a retorna.
reverse()– inverte a matriz no local e a retorna.
split/join– converter uma string em array e vice-versa.
reduce/reduceRight(func, initial)– calcule um único valor no array chamando funccada elemento e passando um resultado intermediário entre as chamadas.
Adicionalmente:

Array.isArray(value)verifica valuese é um array, se sim retorna true, caso contrário false.

Observe que os métodos e sortmodifiquem o próprio array.reversesplice

Esses métodos são os mais usados, cobrem 99% dos casos de uso. Mas há alguns outros:

arr.some(fn) / arr.every(fn) verifique a matriz.

A função fné chamada em cada elemento da matriz semelhante a map. Se algum/todos os resultados forem true, retorna true, caso contrário false.

Esses métodos se comportam como operadores ||e : se retorna um valor verdadeiro, retorna imediatamente e para de iterar sobre o restante dos itens; se retorna um valor falso, retorna imediatamente e para de iterar sobre o restante dos itens também.&&fnarr.some()truefnarr.every()false

Podemos usar everypara comparar arrays:

*/

function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

alert( arraysEqual([1, 2], [1, 2])); // true

/*

arr.fill(valor, início, fim) – preenche a matriz com repetição valuede índice startpara end.

arr.copyWithin(target, start, end) – copia seus elementos da posição startaté a posição endem si mesmo , na posição target(sobrescreve os existentes).

arr.flat(profundidade) / arr.flatMap(fn) cria uma nova matriz plana a partir de uma matriz multidimensional.

Para a lista completa, consulte o manual .

À primeira vista, pode parecer que existem tantos métodos, bastante difíceis de lembrar. Mas na verdade isso é muito mais fácil.

Olhe através da folha de dicas apenas para estar ciente deles. Em seguida, resolva as tarefas deste capítulo para praticar, para que você tenha experiência com métodos de matriz.

Depois, sempre que você precisar fazer algo com um array e não souber como – venha aqui, olhe a folha de dicas e encontre o método correto. Exemplos irão ajudá-lo a escrevê-lo corretamente. Em breve você se lembrará automaticamente dos métodos, sem esforços específicos de sua parte.

*/