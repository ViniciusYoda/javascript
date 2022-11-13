/*

WeakMap e WeakSet
Como sabemos do capítulo Coleta de lixo , o mecanismo JavaScript mantém um valor na memória enquanto está “alcançável” e pode potencialmente ser usado.

Por exemplo:

*/

let john = { name: "John" };

// the object can be accessed, john is the reference to it

// overwrite the reference
john = null;

// the object will be removed from memory

/*

Normalmente, as propriedades de um objeto ou elementos de uma matriz ou outra estrutura de dados são consideradas alcançáveis ​​e mantidas na memória enquanto essa estrutura de dados está na memória.

Por exemplo, se colocarmos um objeto em uma matriz, enquanto a matriz estiver ativa, o objeto também estará ativo, mesmo que não haja outras referências a ele.

Assim:

*/

let john = { name: "John" };

let array = [ john ];

john = null; // overwrite the reference

// the object previously referenced by john is stored inside the array
// therefore it won't be garbage-collected
// we can get it as array[0]

/*

Semelhante a isso, se usarmos um objeto como chave em um regular Map, enquanto o Mapexistir, esse objeto também existirá. Ele ocupa memória e não pode ser coletado como lixo.

Por exemplo:

*/

let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overwrite the reference

// john is stored inside the map,
// we can get it by using map.keys()

/*

WeakMapé fundamentalmente diferente neste aspecto. Ele não impede a coleta de lixo de objetos-chave.

Vamos ver o que isso significa em exemplos.

Mapa fraco
A primeira diferença entre Mape WeakMapé que as chaves devem ser objetos, não valores primitivos:

*/

let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // works fine (object key)

// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object

// Agora, se usarmos um objeto como chave nele, e não houver outras referências a esse objeto - ele será removido da memória (e do mapa) automaticamente.

let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // overwrite the reference

// john is removed from memory!

/*

Compare-o com o exemplo normal Mapacima. Agora, se johnexistir apenas como a chave de WeakMap– ela será excluída automaticamente do mapa (e da memória).

WeakMapnão suporta iteração e métodos keys(), values(), entries(), então não há como obter todas as chaves ou valores dele.

WeakMaptem apenas os seguintes métodos:

weakMap.set(key, value)
weakMap.get(key)
weakMap.delete(key)
weakMap.has(key)
Por que tal limitação? Isso por razões técnicas. Se um objeto perdeu todas as outras referências (como johnno código acima), ele deve ser coletado como lixo automaticamente. Mas tecnicamente não é exatamente especificado quando a limpeza acontece .

O mecanismo JavaScript decide isso. Ele pode optar por realizar a limpeza de memória imediatamente ou aguardar e fazer a limpeza posteriormente quando ocorrerem mais exclusões. Portanto, tecnicamente, a contagem atual de elementos de a WeakMapnão é conhecida. O motor pode ter limpado ou não, ou o fez parcialmente. Por esse motivo, os métodos que acessam todas as chaves/valores não são suportados.

Agora, onde precisamos de tal estrutura de dados?

Caso de uso: dados adicionais
A principal área de aplicação WeakMapé um armazenamento de dados adicional .

Se estivermos trabalhando com um objeto que “pertence” a outro código, talvez até uma biblioteca de terceiros, e gostaríamos de armazenar alguns dados associados a ele, isso deve existir apenas enquanto o objeto estiver vivo – então WeakMapé exatamente o que é necessário .

Colocamos os dados em um WeakMap, usando o objeto como chave, e quando o objeto é coletado como lixo, esses dados também desaparecem automaticamente.

*/

weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically

/*

Vejamos um exemplo.

Por exemplo, temos um código que mantém uma contagem de visitas para os usuários. As informações são armazenadas em um mapa: um objeto de usuário é a chave e a contagem de visitas é o valor. Quando um usuário sai (seu objeto é coletado como lixo), não queremos mais armazenar sua contagem de visitas.

Aqui está um exemplo de uma função de contagem com Map:

*/

// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// increase the visits count
function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}

// E aqui está outra parte do código, talvez outro arquivo usando:

// 📁 main.js
let john = { name: "John" };

countUser(john); // count his visits

// later jogn leaves us
john = null;

/*

Agora, johno objeto deve ser coletado como lixo, mas permanece na memória, pois é uma chave no visitsCountMap.

Precisamos limpar visitsCountMapquando removemos usuários, caso contrário, ele crescerá na memória indefinidamente. Essa limpeza pode se tornar uma tarefa tediosa em arquiteturas complexas.

Podemos evitá-lo mudando para WeakMap:

*/

// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count


// increase the visits count
function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}

/*

Agora não temos que limpar visitsCountMap. Depois johnque o objeto se torna inacessível, por todos os meios, exceto como uma chave de WeakMap, ele é removido da memória, juntamente com as informações dessa chave de WeakMap.

Caso de uso: cache
Outro exemplo comum é o cache. Podemos armazenar (“cache”) os resultados de uma função, para que chamadas futuras no mesmo objeto possam reutilizá-lo.

Para conseguir isso, podemos usar Map(cenário não ideal):

*/

// 📁 cache.js
let cache = new Map();

// calculate and remember the result
function process(obj) {
    if (!cache.has(obj)) {
        let result = /* calculations of the result for */ obj;

        cache.set(obj, result);
        return result;
    }

    return cache.get(obj);
}

// Now we use process() in another file:

// 📁 main.js
let obj = {/* let´s say we have an object */};

let result1 = process(obj); // calculated

// ...later, from another place of the code...
let result2 = process(obj); // remembered result taken from cache

// ...later, when the object is not needed any more:
obj = null;

alert(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)

/*

Para várias chamadas de process(obj)com o mesmo objeto, ele calcula apenas o resultado na primeira vez e, em seguida, apenas o obtém de cache. A desvantagem é que precisamos limpar cachequando o objeto não é mais necessário.

Se substituirmos Mappor WeakMap, esse problema desaparecerá. O resultado armazenado em cache será removido da memória automaticamente depois que o objeto for coletado como lixo.

*/

// 📁 cache.js
let cache = new WeakMap();

// calculate and remember the result
function process(obj) {
    if (!cache.has(obj)) {
        let result = /* calculate the result for */ obj;

        cache.set(obj, result);
        return result
    }

    return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well

/*

Conjunto fraco
WeakSetse comporta da mesma forma:

É análogo a Set, mas só podemos adicionar objetos a WeakSet(não a primitivos).
Um objeto existe no conjunto enquanto é alcançável de outro lugar.
Como Set, ele suporta add, hase delete, mas não size, keys()e nenhuma iteração.
Sendo “fraco”, também serve como armazenamento adicional. Mas não para dados arbitrários, mas sim para fatos “sim/não”. Uma associação em WeakSetpode significar algo sobre o objeto.

Por exemplo, podemos adicionar usuários a WeakSetpara acompanhar quem visitou nosso site:

*/

let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

// visitedSet has 2 users now

// check if John visited?
alert(visitedSet.has(john)); // true

// check if Mary visited?
alert(visitedSet.has(mary)); false

john = null;

// visitedSet will be cleaned automatically

/*

A limitação mais notável de WeakMape WeakSeté a ausência de iterações e a incapacidade de obter todo o conteúdo atual. Isso pode parecer inconveniente, mas não impede WeakMap/WeakSetde fazer seu trabalho principal – ser um armazenamento “adicional” de dados para objetos que são armazenados/gerenciados em outro local.

Resumo
WeakMapé Map-like coleção que permite apenas objetos como chaves e os remove junto com o valor associado, uma vez que eles se tornam inacessíveis por outros meios.

WeakSeté Set-como uma coleção que armazena apenas objetos e os remove quando eles se tornam inacessíveis por outros meios.

Suas principais vantagens são que eles têm fraca referência a objetos, de modo que podem ser facilmente removidos pelo coletor de lixo.

Isso vem ao custo de não ter suporte para clear, size, keys, values…

WeakMape WeakSetsão usados ​​como estruturas de dados “secundárias”, além do armazenamento de objetos “primário”. Depois que o objeto for removido do armazenamento primário, se ele for encontrado apenas como a chave de WeakMapou em um WeakSet, ele será limpo automaticamente.

*/

