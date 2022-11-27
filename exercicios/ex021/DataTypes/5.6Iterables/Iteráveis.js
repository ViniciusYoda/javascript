/*

Iteráveis
Objetos iteráveis ​​são uma generalização de arrays. Esse é um conceito que nos permite tornar qualquer objeto utilizável em um for..ofloop.

Claro, Arrays são iteráveis. Mas existem muitos outros objetos internos, que também são iteráveis. Por exemplo, strings também são iteráveis.

Se um objeto não é tecnicamente um array, mas representa uma coleção (lista, conjunto) de algo, então for..ofé uma ótima sintaxe para fazer um loop sobre ele, então vamos ver como fazê-lo funcionar.

Símbolo.iterador
Podemos facilmente compreender o conceito de iteráveis ​​fazendo um dos nossos.

Por exemplo, temos um objeto que não é um array, mas parece adequado para for..of.

Como um rangeobjeto que representa um intervalo de números:

*/

let range = {
    from: 1,
    to: 5
};

// We want the for..of to work:
// for (let num of range) ... num=1,2,3,4,5

/*

Para tornar o rangeobjeto iterável (e assim deixar for..offuncionar), precisamos adicionar um método ao objeto nomeado Symbol.iterator(um símbolo embutido especial apenas para isso).

1. Quando for..ofinicia, ele chama esse método uma vez (ou erros se não forem encontrados). O método deve retornar um iterador – um objeto com o método next.
2. Em diante , for..offunciona apenas com esse objeto retornado .
3. Quando for..ofquer o próximo valor, ele chama next()esse objeto.
4. O resultado de next()deve ter a forma {done: Boolean, value: any}, onde done=truesignifica que o loop foi finalizado, caso contrário valueé o próximo valor.

Aqui está a implementação completa para rangecom observações

*/

let range = {
    from: 1,
    to: 5
};

// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {

    // ...it returns the iterator object
    // 2. Onward, for..of works only with the iterator object below, asking it for next values
    return {
        current: this.from,
        last: this.to,

        // 3. next() is called on each iteration by the for..of loop
        next() {
            // 4. it should return the value as an object {done:.., value :...} 
            if (this.current <= this.last) {
                return { done: false, value: this.current++};
            } else {
                return { done: true };
            }
        }
    }
};

// now it works!
for (let num of range) {
    alert(num);  // 1, then 2, 3, 4, 5
}

/*

Observe o recurso principal dos iteráveis: separação de interesses.

O rangepróprio não tem o next()método.
Em vez disso, outro objeto, o chamado “iterador”, é criado pela chamada para range[Symbol.iterator]()e next()gera valores para a iteração.
Portanto, o objeto iterador é separado do objeto sobre o qual ele itera.

Tecnicamente, podemos mesclá-los e usar rangea si mesmo como o iterador para tornar o código mais simples.

Assim:

*/

let range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ };
        } else {
            return { done: true };
        }
    }
};

for (let num of range) {
    alert(num); // 1, then 2, 3, 4, 5
}

/*

Agora range[Symbol.iterator]()retorna o rangepróprio objeto: ele tem o next()método necessário e lembra o progresso da iteração atual em this.current. Mais curta? Sim. E às vezes tudo bem também.

A desvantagem é que agora é impossível ter dois for..ofloops rodando sobre o objeto simultaneamente: eles compartilharão o estado de iteração, porque há apenas um iterador – o próprio objeto. Mas dois for-ofs paralelos são uma coisa rara, mesmo em cenários assíncronos.

Iteradores infinitos
Iteradores infinitos também são possíveis. Por exemplo, o rangetorna-se infinito para range.to = Infinity. Ou podemos fazer um objeto iterável que gera uma sequência infinita de números pseudoaleatórios. Também pode ser útil.

Não há limitações em next, ele pode retornar mais e mais valores, isso é normal.

Claro, o for..ofloop sobre tal iterável seria interminável. Mas sempre podemos pará-lo usando break.

A string é iterável
Arrays e strings são os iteráveis ​​internos mais usados.

Para uma string, faz um for..ofloop sobre seus caracteres:

*/

for (let char of "test") {
    // triggers 4 times: once for each character
    alert( char ); // t, then e, then, s, then t
}

// E funciona corretamente com pares substitutos!

let str = '𝒳😂';
for (let char of str){
    alert(char); // 𝒳, and then 😂
}

/*

Chamando um iterador explicitamente
Para uma compreensão mais profunda, vamos ver como usar um iterador explicitamente.

Iremos iterar sobre uma string exatamente da mesma maneira que for..of, mas com chamadas diretas. Este código cria um iterador de string e obtém valores dele “manualmente”:

*/

let str = "Hello";

// does the same as
// for (let char of str) alerr);

let iterator = str[Symbol.iterator]();

while (true) {
    let result = iterator.next();
    if(result.done) break;
    alert(result.value); // outputs characters one by one
}
/*

Isso raramente é necessário, mas nos dá mais controle sobre o processo do que o for..of. Por exemplo, podemos dividir o processo de iteração: iterar um pouco, depois parar, fazer outra coisa e retomar mais tarde.

Iterables e array-likes
Dois termos oficiais parecem semelhantes, mas são muito diferentes. Certifique-se de entendê-los bem para evitar confusão.

Iterables são objetos que implementam o Symbol.iteratormétodo, conforme descrito acima.
Array-likes são objetos que possuem índices e length, então eles se parecem com arrays.
Quando usamos JavaScript para tarefas práticas em um navegador ou qualquer outro ambiente, podemos encontrar objetos que são iteráveis ​​ou do tipo array, ou ambos.

Por exemplo, strings são iteráveis ​​( for..offunciona nelas) e tipo array (elas têm índices numéricos e length).

Mas um iterável pode não ser do tipo array. E vice-versa, um array-like pode não ser iterável.

Por exemplo, o rangeno exemplo acima é iterável, mas não semelhante a um array, porque não possui propriedades indexadas e length.

E aqui está o objeto que é semelhante a um array, mas não iterável:

*/

let arrayLike = { // has indexes and length => array-like
    0: "Hello",
    1: "World",
    length: 2
};

// Error (no.Symbol.iterator)
for (let item of arrayLike) {}

/*

Tanto os iteráveis ​​quanto os array-likes geralmente não são arrays , eles não têm push, popetc. Isso é bastante inconveniente se tivermos tal objeto e quisermos trabalhar com ele como se fosse um array. Por exemplo, gostaríamos de trabalhar com o rangeuso de métodos de matriz. Como conseguir isso?

Matriz.de
Existe um método universal Array.from que pega um valor iterável ou tipo array e faz Arraydele um “real”. Então podemos chamar métodos de array nele.

Por exemplo:

*/

let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};

let arr = Array.from(arrayLike); // (*)
alert(arr.pop()); // World (method works)

/*

Array.fromna linha (*)pega o objeto, examina-o por ser iterável ou semelhante a um array, então cria um novo array e copia todos os itens para ele.

O mesmo acontece para um iterável:

*/

// assuming that range is taken from the example above
let arr = Array.from(range);
alert(arr); // 1, 2,3,4,5 (array toString conversion works)

// A sinraxe completa para Array.from também nos permite fornecer uma função opcional de "mapeamento":

Array.from(obj[, mapFn, thisArg])

/*

O segundo argumento opcional mapFnpode ser uma função que será aplicada a cada elemento antes de adicioná-lo ao array e thisArgnos permite definir thispara ele.

Por exemplo:

*/

// assuming that range is taken from the example above

// square each number
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25

// Aqui usamos Array.from para transformar uma string em um array de caracteres:

let str = '𝒳😂';

// splits str into array of characters
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]);  // 😂
alert(chars.length); // 2

/*

Ao contrário str.splitde , ele depende da natureza iterável da string e, assim como for..of, funciona corretamente com pares substitutos.

Tecnicamente aqui faz o mesmo que:

*/

let str = '𝒳😂';

let chars = []; // Array.from internaly does the same loop
for(let char of str) {
    chars.push(char);
}

alert(chars);

/*

…Mas é mais curto.

Podemos até construir um substituto slicepara ele:

*/

function slice(str, start, end){
    return Array.from(str).slice(start, end).join('';)
}

function slice(str, start, end) {
    return Array.from(str).slice(start, end).join('');
  }
  
  let str = '𝒳😂𩷶';

  alert( slice(str, 1, 3) ); // 😂𩷶

  // the native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)

/*

Resumo
Objetos que podem ser usados for..of​​são chamados de iteráveis .

Tecnicamente, os iteráveis ​​devem implementar o método chamado Symbol.iterator.
O resultado de obj[Symbol.iterator]()é chamado de iterador . Ele lida com o processo de iteração adicional.
Um iterador deve ter o método nomeado next()que retorna um objeto {done: Boolean, value: any}, aqui done:truedenota o fim do processo de iteração, caso contrário valueé o próximo valor.
O Symbol.iteratormétodo é chamado automaticamente por for..of, mas também podemos fazê-lo diretamente.
Iteráveis ​​internos, como strings ou arrays, também implementam Symbol.iterator.
O iterador de string conhece os pares substitutos.
Objetos que possuem propriedades indexadas e lengthsão chamados de array-like . Esses objetos também podem ter outras propriedades e métodos, mas não possuem os métodos internos dos arrays.

Se olharmos dentro da especificação – veremos que a maioria dos métodos embutidos assumem que eles trabalham com iteráveis ​​ou arrays em vez de arrays “reais”, porque isso é mais abstrato.

Array.from(obj[, mapFn, thisArg])faz um real a Arraypartir de um iterável ou tipo array obj, e podemos então usar métodos de array nele. Os argumentos opcionais mapFne thisArgnos permitem aplicar uma função a cada item.

*/