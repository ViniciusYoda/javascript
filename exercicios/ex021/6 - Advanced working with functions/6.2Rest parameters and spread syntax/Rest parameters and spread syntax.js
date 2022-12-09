/*

Parâmetros de descanso e sintaxe de propagação
Muitas funções integradas do JavaScript suportam um número arbitrário de argumentos.

Por exemplo:

Math.max(arg1, arg2, ..., argN)– retorna o maior dos argumentos.
Object.assign(dest, src1, ..., srcN)– copia as propriedades de src1..Ndentro do arquivo dest.
…e assim por diante.
Neste capítulo, aprenderemos como fazer o mesmo. E também, como passar arrays para tais funções como parâmetros.

Parâmetros de descanso...
Uma função pode ser chamada com qualquer número de argumentos, independentemente de como ela é definida.

Como aqui:

*/

function sum(a, b) {
    return a + b;
}

alert( sum(1, 2, 3, 4, 5) );

/*

Não haverá erro por causa de argumentos “excessivos”. Mas é claro que no resultado serão contabilizados apenas os dois primeiros, então o resultado no código acima é 3.

O restante dos parâmetros pode ser incluído na definição da função usando três pontos ...seguidos do nome da matriz que os conterá. Os pontos significam literalmente “reúna os parâmetros restantes em uma matriz”.

Por exemplo, para reunir todos os argumentos em array args:

*/

function sumAll(...args) { // args is the name for the array
    let sum = 0;

    for (let arg of args) sum += arg;

    return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6

/*

Podemos optar por obter os primeiros parâmetros como variáveis ​​e reunir apenas o restante.

Aqui os dois primeiros argumentos vão para variáveis ​​e o resto vai para titlesarray:

*/

function showName(firstName, lastName, ...titiles) {
    alert( firstName + ' ' + lastName ); // Julius Caesar

    // the rest go into titles array
    // i.e. titles = ["Consul", "Imperator"]
    alert( titles[0] ); // Consul
    alert( titles[1] ); // Imperator
    alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");

/*

Os parâmetros restantes devem estar no final
Os parâmetros rest reúnem todos os argumentos restantes, então o seguinte não faz sentido e causa um erro:

function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}

O ...rest deve ser sempre o último,

function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}

A variável “argumentos”
Há também um objeto especial semelhante a uma matriz chamado argumentsque contém todos os argumentos por seu índice.

Por exemplo:

*/

function showName2() {
    alert( arguments.length );
    alert( arguments[0] );
    alert( arguments[1] );

    // it's iterable
    // for(let arg of arguments) alert(arg);
}

// shows: 2, Julius, Caesar
showName2("Julius", "Caesar");

// shows: 1, Ilya, undefined (no second argument)
showName2("Ilya");


/*

Antigamente, parâmetros rest não existiam na linguagem, e usar argumentsera a única forma de obter todos os argumentos da função. E ainda funciona, podemos encontrá-lo no código antigo.

Mas a desvantagem é que, embora argumentsseja semelhante a um array e iterável, não é um array. Ele não suporta métodos de array, então não podemos chamar arguments.map(...)por exemplo.

Além disso, ele sempre contém todos os argumentos. Não podemos capturá-los parcialmente, como fizemos com os parâmetros de repouso.

Portanto, quando precisamos desses recursos, os parâmetros de descanso são os preferidos.

Antigamente, parâmetros rest não existiam na linguagem, e usar argumentsera a única forma de obter todos os argumentos da função. E ainda funciona, podemos encontrá-lo no código antigo.

Mas a desvantagem é que, embora argumentsseja semelhante a um array e iterável, não é um array. Ele não suporta métodos de array, então não podemos chamar arguments.map(...)por exemplo.

Além disso, ele sempre contém todos os argumentos. Não podemos capturá-los parcialmente, como fizemos com os parâmetros de repouso.

Portanto, quando precisamos desses recursos, os parâmetros de descanso são os preferidos.

*/

function f() {
    let showArg = () => alert(arguments[0]);
    showArg();
}

f(1) // 1

/*

Como lembramos, as funções de seta não têm seus próprios arquivos this. Agora sabemos que eles também não têm o argumentsobjeto especial.

Sintaxe de propagação
Acabamos de ver como obter um array da lista de parâmetros.

Mas às vezes precisamos fazer exatamente o contrário.

Por exemplo, há uma função interna Math.max que retorna o maior número de uma lista:

*/

alert( Math.max(3, 5, 1) ); // 5

/*

Agora digamos que temos um array [3, 5, 1]. Como chamamos Math.maxcom ele?

Passá-lo “como está” não funcionará, porque Math.maxespera uma lista de argumentos numéricos, não um único array:

*/

let arr = [3, 5, 1];

alert( Math.max(arr) ); // NaN

/*

E certamente não podemos listar manualmente os itens no código Math.max(arr[0], arr[1], arr[2]), porque podemos não ter certeza de quantos existem. À medida que nosso script é executado, pode haver muitos ou nenhum. E isso ficaria feio.

Espalhe a sintaxe para o resgate! Parece semelhante aos parâmetros de descanso, também usando ..., mas faz exatamente o oposto.

Quando ...arré usado na chamada de função, ele “expande” um objeto iterável arrna lista de argumentos.

Para Math.max:

*/

let arr2 = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)

// Também podemos passar vários iteráveis ​​desta maneira:

let arr3 = [1, -2, 3, 4];
let arr4 = [8, 3, -8, 1];

alert( Math.max(...arr3, ...arr4) ); // 8

// Podemos até combinar a sintaxe de propagação com valores normais:

let arr5 = [1, -2, 3, 4];
let arr6 = [8, 3, -8, 1];

alert( Math.max(1, ...arr5, 2, ...arr6, 25) ); // 25

// Além disso, a sintaxe de propagação pode ser usada para mesclar arrays:

let arr7 = [3, 5, 1];
let arr8 = [8, 9, 15]

let merged = [0, ...arr7, 2, ...arr8];

alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr7, then 2, then arr8)

/*

Nos exemplos acima, usamos um array para demonstrar a sintaxe de propagação, mas qualquer iterável serve.

Por exemplo, aqui usamos a sintaxe de propagação para transformar a string em um array de caracteres:

*/

let str = "Hello";

alert( [...str] ); // H,e,l,l,o

/*

A sintaxe de propagação usa internamente iteradores para reunir elementos, da mesma forma que for..offaz.

Portanto, para uma string, for..ofretorna caracteres e ...strse torna "H","e","l","l","o". A lista de caracteres é passada para o inicializador de array [...str].

Para esta tarefa em particular, também poderíamos usar Array.from, porque ele converte um iterável (como uma string) em um array:

*/

let str2 = "Hello";

// Array.from converts an iterable into an array
alert( Array.from(str2) ); // H,e,l,l,o

/*

O resultado é o mesmo que [...str].

Mas há uma diferença sutil entre Array.from(obj)e [...obj]:

Array.fromopera em arrays semelhantes e iteráveis.
A sintaxe de propagação funciona apenas com iteráveis.
Assim, pois a tarefa de transformar algo em array, Array.fromtende a ser mais universal.

Copiar um array/objeto
Lembra quando conversamos Object.assign() no passado ?

É possível fazer o mesmo com a sintaxe de propagação.

*/

let arr9 = [1, 2, 3];

let arrCopy = [...arr9]// spread the array into a list of parameters
// then put the result into a new array

// do the arrays have the same contents?
alert(JSON.stringify(arr9) === JSON.stringify(arrCopy));// true

// are the arrays equal?
alert(arr9 === arrCopy);// false (not same reference)

// modifying our initial array does not modify the copy:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3

// Observe que é possível fazer a mesma coisa para fazer uma cópia de um objeto:

let obj = { a: 1, b: 2, c: 3 };

let objCopy = { ...obj }; // spread the object into a list of parameters
// then return the result in a new object

// do the objects have the same contents?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// are the objects equal?
alert(obj === objCopy); // false (not same reference)

// modifying our initial object does not modify the copy:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}

/* Essa forma de copiar um objeto é muito mais curta do que let objCopy = Object.assign({}, obj)ou para um array let arrCopy = Object.assign([], arr), então preferimos usá-la sempre que possível.

Resumo
Quando vemos "..."no código, são os parâmetros rest ou a sintaxe de propagação.

Há uma maneira fácil de distinguir entre eles:

Quando ...está no final dos parâmetros da função, é “parâmetros restantes” e reúne o restante da lista de argumentos em um array.
Quando ...ocorre em uma chamada de função ou similar, é chamado de “sintaxe de propagação” e expande uma matriz em uma lista.
Usar padrões:

Parâmetros Rest são usados ​​para criar funções que aceitam qualquer número de argumentos.
A sintaxe spread é usada para passar um array para funções que normalmente requerem uma lista de muitos argumentos.
Juntos, eles ajudam a viajar entre uma lista e uma matriz de parâmetros com facilidade.

Todos os argumentos de uma chamada de função também estão disponíveis no “estilo antigo” arguments: objeto iterável semelhante a uma matriz.

*/