/*

Object.keys, valores, entradas
Vamos nos afastar das estruturas de dados individuais e falar sobre as iterações sobre elas.

No capítulo anterior vimos métodos map.keys(), map.values(), map.entries().

Esses métodos são genéricos, há um acordo comum para usá-los para estruturas de dados. Se algum dia criarmos uma estrutura de dados própria, devemos implementá-la também.

Eles são suportados para:

Map
Set
Array
Objetos simples também suportam métodos semelhantes, mas a sintaxe é um pouco diferente.

Object.keys, valores, entradas
Para objetos simples, os seguintes métodos estão disponíveis:

Object.keys(obj) – retorna uma matriz de chaves.
Object.values(obj) – retorna uma matriz de valores.
Object.entries(obj) – retorna um array de [key, value]pares.
Observe as distinções (em comparação com o mapa, por exemplo):

Mapa	Objeto
Sintaxe de chamada	map.keys()	Object.keys(obj), mas nãoobj.keys()
Devoluções	iterável	Matriz “real”
A primeira diferença é que temos que chamar Object.keys(obj), e não obj.keys().

Por quê então? A principal razão é a flexibilidade. Lembre-se, os objetos são a base de todas as estruturas complexas em JavaScript. Portanto, podemos ter um objeto próprio dataque implementa seu próprio data.values()método. E ainda podemos chamá Object.values(data)-lo.

A segunda diferença é que Object.*os métodos retornam objetos de array “reais”, não apenas um iterável. Isso é principalmente por razões históricas.

Por exemplo:

*/

let user = {
    name: "John",
    age: 30
};

/*

Object.keys(user) = ["name", "age"]
Object.values(user) = ["John", 30]
Object.entries(user) = [ ["name","John"], ["age",30] ]
Aqui está um exemplo de uso Object.valuespara fazer um loop sobre valores de propriedade:

*/

// loop over values
for (let value of Object.values(user)) {
    alert(value); // John, then 30
}

/*

Object.keys/values/entries ignora propriedades simbólicas
Assim como um for..inloop, esses métodos ignoram propriedades que usam Symbol(...)como chaves.

Geralmente isso é conveniente. Mas se também queremos chaves simbólicas, há um método separado Object.getOwnPropertySymbols que retorna uma matriz apenas de chaves simbólicas. Além disso, existe um método Reflect.ownKeys(obj) que retorna todas as chaves.

Transformando objetos
Os objetos carecem de muitos métodos que existem para arrays, por exemplo map, filtere outros.

Se quisermos aplicá-los, podemos usar Object.entriesseguido por Object.fromEntries:

1 Use Object.entries(obj)para obter uma matriz de pares chave/valor de obj.
2 Use métodos de array nesse array, por exemplo map, para transformar esses pares chave/valor.
3 Use Object.fromEntries(array)na matriz resultante para transformá-la novamente em um objeto.
Por exemplo, temos um objeto com preços e gostaríamos de dobrá-los:

*/

let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries(
    // convert prices to array, map each key/value pair into another pair
    // and then fromEntries gives back the object
    Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);

alert(doublePrices.meat); // 8

/*

Pode parecer difícil à primeira vista, mas torna-se fácil de entender depois de usá-lo uma ou duas vezes. Podemos fazer poderosas cadeias de transformações dessa maneira.

*/

