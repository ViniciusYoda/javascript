/*

Mapear e definir
Até agora, aprendemos sobre as seguintes estruturas de dados complexas:

Os objetos são usados ​​para armazenar coleções com chave.
Arrays são usados ​​para armazenar coleções ordenadas.
Mas isso não é suficiente para a vida real. Por isso Mape Settambém existem.

Mapa
Map é uma coleção de itens de dados com chave, assim como um arquivo Object. Mas a principal diferença é que Mappermite chaves de qualquer tipo.

Os métodos e propriedades são:

new Map()– cria o mapa.
map.set(key, value)– armazena o valor pela chave.
map.get(key)– retorna o valor pela chave, undefinedcaso keynão exista no mapa.
map.has(key)– retorna truese keyexistir, falsecaso contrário.
map.delete(key)– remove o valor pela chave.
map.clear()– remove tudo do mapa.
map.size– retorna a contagem de elementos atual.
Por exemplo:

*/

let map = new Map();

map.set('1', 'str1'); // a string key
map.set(1, 'num1'); // a numeric key
map.set(true, 'bool1'); // a boolean key 

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
alert( map.get(1) ); // 'num1'
alert( map.get('1') );  // 'str1'

alert( map.size ); // 3

/*

Como podemos ver, diferentemente dos objetos, as chaves não são convertidas em strings. Qualquer tipo de chave é possível.

map[key]não é a maneira correta de usar umMap
Embora map[key]também funcione, por exemplo, podemos definir map[key] = 2, isso está sendo tratado mapcomo um objeto JavaScript simples, portanto, implica todas as limitações correspondentes (somente chaves de string/símbolo e assim por diante).

Portanto, devemos usar mapmétodos: set, gete assim por diante.

Map também pode usar objetos como chaves.

Por exemplo:

*/

let john = { name: "John" };

// for every user, let´s store their visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123

/*

Usar objetos como chaves é um dos recursos mais notáveis ​​e importantes Map. O mesmo não conta Object. String como chave Objecté bom, mas não podemos usar outra Objectcomo chave em Object.

Vamos tentar:

*/

let john = { name: "John" }; 
let ben = { name: "Ben" };

let visitsCountObj = {}; // try to use an object

visitsCountObj[ben] = 234; // try to use ben object as the key
visitsCountObj[john] = 123; // try to use john object as the key, ben object will get replaced

// That's what got written!
alert( visitsCountObj["[object Object]"] ); // 123

/*

Como visitsCountObjé um objeto, ele converte todas as Objectchaves, como johne benacima, para a mesma string "[object Object]". Definitivamente não é o que queremos.

Como Mapcompara as chaves
Para testar a equivalência de chaves, Mapuse o algoritmo SameValueZero . É aproximadamente o mesmo que igualdade estrita ===, mas a diferença é que NaNé considerado igual a NaN. Então NaNpode ser usado como a chave também.

Este algoritmo não pode ser alterado ou personalizado.

Encadeamento
Cada map.setchamada retorna o próprio mapa, então podemos “encadear” as chamadas:

*/

map.set('1', 'str1').set(1, 'num1').set(true, 'bool1');

/*

Iteração sobre o mapa
Para fazer um loop sobre um map, existem 3 métodos:

map.keys()– retorna um iterável para chaves,
map.values()– retorna um iterável para valores,
map.entries()– retorna um iterável para entradas [key, value], é usado por padrão em for..of.
Por exemplo:

*/

let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion', 50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
    alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
    alert(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
    alert(entry);  // cucumber,500 (and so on)
}

/*

O pedido de inserção é usado
A iteração segue na mesma ordem em que os valores foram inseridos. Map preserva essa ordem, ao contrário de um arquivo Object.

Além disso, Map possui um forEachmétodo embutido, semelhante a Array:

*/

// runs the function for each (key, value) pair
recipeMap.forEach( (value, key, map) => {
    alert(`${key}: ${value}`); // cucumber: 500 etc
});

/*

Object.entries: Mapa do Objeto

Quando a Map é criado, podemos passar um array (ou outro iterável) com pares chave/valor para inicialização, assim:

*/

// array of [key, value] pairs
let map = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
]);

alert( map.get('1') ); // str1

/*

Se tivermos um objeto simples e quisermos criar um a Mappartir dele, podemos usar o método interno Object.entries(obj) que retorna uma matriz de pares chave/valor para um objeto exatamente nesse formato.

Assim, podemos criar um mapa a partir de um objeto como este:

*/

let obj = {
    name: "John",
    age: 30
};

let map = new Map(Object.entries(obj));

alert( map.get('name') ); // john

/*

Aqui, Object.entriesretorna a matriz de pares chave/valor: [ ["name","John"], ["age", 30] ]. Isso é o que Mapprecisa.

Object.fromEntries: Objeto do Mapa
Acabamos de ver como criar a Mappartir de um objeto simples com Object.entries(obj).

Existe um Object.fromEntriesmétodo que faz o inverso: dado um array de [key, value]pares, ele cria um objeto a partir deles:

*/

let prices = Object.fromEntries([
    ['banana', 1],
    ['orange', 2],
    ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2

/*

Podemos usar Object.fromEntriespara obter um objeto simples de Map.

Por exemplo, armazenamos os dados em um Map, mas precisamos passá-los para um código de terceiros que espera um objeto simples.

Aqui vamos nós:

*/

let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries());  // make a plain object (*)

// done!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2

/*

Uma chamada para map.entries()retorna um iterável de pares chave/valor, exatamente no formato correto para Object.fromEntries.

Também poderíamos (*)encurtar a linha:

*/

let obj = Object.fromEntries(map); // omit .entries()

/*

Isso é o mesmo, porque Object.fromEntriesespera um objeto iterável como argumento. Não necessariamente uma matriz. E a iteração padrão para mapretorna os mesmos pares de chave/valor que map.entries(). Então, obtemos um objeto simples com a mesma chave/valores que o map.

Definir
A Seté uma coleção de tipo especial – “conjunto de valores” (sem chaves), onde cada valor pode ocorrer apenas uma vez.

Seus principais métodos são:

new Set(iterable)– cria o conjunto e, se iterablefor fornecido um objeto (geralmente um array), copia os valores dele para o conjunto.
set.add(value)– adiciona um valor, retorna o próprio conjunto.
set.delete(value)– remove o valor, retorna truese valueexistia no momento da chamada, caso contrário false.
set.has(value)– retorna truese o valor existe no conjunto, caso contrário false.
set.clear()– remove tudo do conjunto.
set.size– é a contagem de elementos.
A principal característica é que chamadas repetidas de set.add(value)com o mesmo valor não fazem nada. Essa é a razão pela qual cada valor aparece em Setapenas uma vez.

Por exemplo, temos visitantes chegando e gostaríamos de lembrar de todos. Mas visitas repetidas não devem levar a duplicatas. Um visitante deve ser “contado” apenas uma vez.

Set é a coisa certa para isso:

*/

let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" }; 

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only uniques values
alert( set.size ); // 3

for (let user of set) {
    alert(user.name); // John (then Pete and Mary)
}

/*

A alternativa para Setpoderia ser uma matriz de usuários e o código para verificar se há duplicatas em cada inserção usando arr.find . Mas o desempenho seria muito pior, pois esse método percorre todo o array verificando cada elemento. Seté muito melhor otimizado internamente para verificações de exclusividade.

Iteração sobre o conjunto
Podemos fazer um loop sobre um conjunto com for..ofou usando forEach:

*/

let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
    alert(value);
});

/*

Observe o engraçado. A função de retorno de chamada passada forEachtem 3 argumentos: a value, depois o mesmo valor valueAgain e depois o objeto de destino. De fato, o mesmo valor aparece nos argumentos duas vezes.

Isso é para compatibilidade com Maponde o retorno de chamada passado forEachtem três argumentos. Parece um pouco estranho, com certeza. Mas isso pode ajudar a substituir em certos casos Mapcom Setfacilidade e vice-versa.

Os mesmos métodos Mappara iteradores também são suportados:

set.keys()– retorna um objeto iterável para valores,
set.values()– igual a set.keys(), para compatibilidade com Map,
set.entries()– retorna um objeto iterável para entradas [value, value], existe para compatibilidade com Map.

Resumo
Map– é uma coleção de valores chaveados.

Métodos e propriedades:

new Map([iterable])– cria o mapa, com opcional iterable(por exemplo, array) de [key,value]pares para inicialização.
map.set(key, value)– armazena o valor pela chave, retorna o próprio mapa.
map.get(key)– retorna o valor pela chave, undefinedcaso keynão exista no mapa.
map.has(key)– retorna truese keyexistir, falsecaso contrário.
map.delete(key)– remove o valor pela chave, retorna truese keyexistia no momento da chamada, caso contrário false.
map.clear()– remove tudo do mapa.
map.size– retorna a contagem de elementos atual.
As diferenças de um regular Object:

Quaisquer chaves, objetos podem ser chaves.
Métodos convenientes adicionais, a sizepropriedade.
Set– é uma coleção de valores únicos.

Métodos e propriedades:

new Set([iterable])– cria o conjunto, com opcional iterable(por exemplo, array) de valores para inicialização.
set.add(value)– adiciona um valor (não faz nada se valueexistir), retorna o próprio conjunto.
set.delete(value)– remove o valor, retorna truese valueexistia no momento da chamada, caso contrário false.
set.has(value)– retorna truese o valor existe no conjunto, caso contrário false.
set.clear()– remove tudo do conjunto.
set.size– é a contagem de elementos.
A iteração termina Mape Setestá sempre na ordem de inserção, portanto, não podemos dizer que essas coleções não são ordenadas, mas não podemos reordenar elementos ou obter diretamente um elemento por seu número.

*/





