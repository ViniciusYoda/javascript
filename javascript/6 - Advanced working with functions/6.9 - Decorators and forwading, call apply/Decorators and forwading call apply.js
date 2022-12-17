/*

Decoradores e encaminhamentos, ligue/candidate-se
O JavaScript oferece flexibilidade excepcional ao lidar com funções. Eles podem ser passados, usados ​​como objetos, e agora veremos como encaminhar chamadas entre eles e decorá -los.

Cache transparente
Digamos que temos uma função slow(x)que é pesada em CPU, mas seus resultados são estáveis. Ou seja, para o mesmo xsempre retorna o mesmo resultado.

Se a função for chamada com frequência, podemos armazenar em cache (lembrar) os resultados para evitar gastar tempo extra com recálculos.

Mas, em vez de adicionar essa funcionalidade slow(), criaremos uma função wrapper, que adiciona cache. Como veremos, há muitos benefícios em fazer isso.

Aqui está o código e as explicações a seguir:

*/

function slow(x) {
   // there can be a heavy CPU-intensive job here
   alert(`Called with ${x}`);
   return x;
}

function cachingDecorator(func) {
   let cache = new Map();

   return function (x) {
      if (cache.has(x)) { // if there´s such key in cache
         return cache.get(x); // read the result from it
      }

      let result = func(x); // otherwise call func

      cache.set(x, result); // and cache (remember) the result
      return result;
   };
}

slow = cachingDecorator(slow);

alert(slow(1)); // slow(1) is cached and the result returned
alert("Again: " + slow(1)); // slow(1) result returned from cache

alert(slow(2)); // slow(2) is cached and the result returned
alert("Again: " + slow(2)); // slow(2) result returned from cache

/*

No código acima cachingDecoratorestá um decorador : uma função especial que pega outra função e altera seu comportamento.

A ideia é que podemos chamar cachingDecoratorqualquer função e ela retornará o wrapper de cache. Isso é ótimo, porque podemos ter muitas funções que podem usar esse recurso, e tudo o que precisamos fazer é aplicá cachingDecorator-las.

Ao separar o cache do código da função principal, também mantemos o código principal mais simples.

O resultado de cachingDecorator(func)é um “wrapper”: function(x)que “embrulha” a chamada de func(x)na lógica de cache:


De um código externo, a slowfunção agrupada ainda faz o mesmo. Ele acabou de adicionar um aspecto de cache ao seu comportamento.

Para resumir, há vários benefícios em usar um código separado cachingDecoratorem vez de alterar o slowpróprio código:

O cachingDecoratoré reutilizável. Podemos aplicá-lo a outra função.
A lógica de cache é separada, não aumentou a complexidade de slowsi mesma (se houver).
Podemos combinar vários decoradores, se necessário (outros decoradores se seguirão).

Usando “func.call” para o contexto
O decorador de cache mencionado acima não é adequado para trabalhar com métodos de objeto.

Por exemplo, no código abaixo worker.slow()para de funcionar após a decoração:

*/

// we'll make worker.slow caching
let worker = {
   someMethod() {
      return 1;
   },

   slow(x) {
      // scary CPU-heavy task here
      alert("Called with: " + x);
      return x * this.someMethod(); // (*)
   }
};

// same code as before
function cachingDecorator(func) {
   let cache = new Map();
   return function (x) {
      if (cache.has(x)) {
         return cache.get(x);
      }
      let result = func(x); // (**)
      cache.set(x, result);
      return result;
   };
}

alert(worker.slow(1)); // the original method works

worker.slow = cachingDecorator(worker.slow); // now make it caching

alert(worker.slow(2)); // Whoops! Error: Cannot read property 'someMethod' of undefined

/*

O erro ocorre na linha (*)que tenta acessar this.someMethode falha. Você pode ver por quê?

A razão é que o wrapper chama a função original como func(x)na linha (**). E, quando chamada assim, a função recebe this = undefined.

Observaríamos um sintoma semelhante se tentássemos executar:

let func = worker.slow;
func(2);
Assim, o wrapper passa a chamada para o método original, mas sem o contexto this. Daí o erro.

Vamos consertar isso.

Há um método de função interno especial func.call(context, …args) que permite chamar uma função configurando explicitamente this.

A sintaxe é:

func.call(context, arg1, arg2, ...)
Ele é executado funcfornecendo o primeiro argumento como this, e o próximo como os argumentos.

Simplificando, essas duas chamadas fazem quase o mesmo:

func(1, 2, 3);
func.call(obj, 1, 2, 3)
Ambos chamam funccom argumentos 1, 2e 3. A única diferença é que também func.calldefine .thisobj

Como exemplo, no código abaixo, chamamos sayHino contexto de diferentes objetos: sayHi.call(user)executa sayHifornecendo this=user, e a próxima linha define this=admin:

*/

function sayHi() {
   alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use call to pass different objects as "this"
sayHi.call(user); // John
sayHi.call(admin); // Admin

// E aqui usamos callpara chamar saycom o contexto e frase fornecidos:

function say(phrase) {
   alert(this.name + ': ' + phrase);
}

let user1 = { name: "John" };

// user becomes this, and "Hello" becomes the first argument
say.call(user, "Hello"); // John: Hello

// No nosso caso, podemos usar callno wrapper para passar o contexto para a função original:

let worker = {
   someMethod() {
      return 1;
   },

   slow(x) {
      alert("Called with " + x);
      return x * this.someMethod(); // (*)
   }
};

function cachingDecorator(func) {
   let cache = new Map();
   return function (x) {
      if (cache.has(x)) {
         return cache.get(x);
      }
      let result = func.call(this, x); // "this" is passed correctly now
      cache.set(x, result);
      return result;
   };
}

worker.slow = cachingDecorator(worker.slow); // now make it caching

alert(worker.slow(2)); // works
alert(worker.slow(2)); // works, doesn't call the original (cached)

/*

Agora está tudo bem.

Para deixar tudo mais claro, vamos ver mais a fundo como thisé repassado:

1. Após a decoração worker.slowé agora o invólucro function (x) { ... }.
2. Então, quando worker.slow(2)é executado, o wrapper recebe 2como argumento e this=worker(é o objeto antes do ponto).
3. Dentro do wrapper, assumindo que o resultado ainda não foi armazenado em cache, func.call(this, x)passa o atual this( =worker) e o argumento atual ( =2) para o método original.

Indo para vários argumentos
Agora vamos tornar cachingDecoratorainda mais universal. Até agora, estava trabalhando apenas com funções de argumento único.

Agora, como armazenar em cache o método de vários argumentos worker.slow?

let worker = {
  slow(min, max) {
    return min + max; // scary CPU-hogger is assumed
  }
};

// should remember same-argument calls
worker.slow = cachingDecorator(worker.slow);
Anteriormente, para um único argumento x, podíamos apenas cache.set(x, result)salvar o resultado e cache.get(x)recuperá-lo. Mas agora precisamos lembrar o resultado de uma combinação de argumentos (min,max) . O nativo Mapusa um valor único apenas como a chave.

Existem muitas soluções possíveis:

1. mplemente uma nova (ou use uma estrutura de dados semelhante a um mapa de terceiros) que seja mais versátil e permita multichaves.
2. Use mapas aninhados: cache.set(min)será um Mapque armazena o par (max, result). Então podemos obter resultcomo cache.get(min).get(max).
3. Junte dois valores em um. Em nosso caso particular, podemos usar apenas uma string "min,max"como Mapchave. Para flexibilidade, podemos fornecer uma função hash para o decorador, que sabe como fazer um valor de muitos.

Para muitas aplicações práticas, a 3ª variante é boa o suficiente, então vamos nos ater a ela.

Também precisamos passar não apenas x, mas todos os argumentos em func.call. Lembremos que em a function()podemos obter um pseudo-array de seus argumentos como arguments, então func.call(this, x)deve ser substituído por func.call(this, ...arguments).

Aqui está um mais poderoso cachingDecorator:

*/

let worker = {
   slow(min, max) {
      alert(`Called with ${min},${max}`);
      return min + max;
   }
};

function cachingDecorator(func, hash) {
   let cache = new Map();
   return function () {
      let key = hash(arguments); // (*)
      if (cache.has(key)) {
         return cache.get(key);
      }

      let result = func.call(this, ...arguments); // (**)

      cache.set(key, result);
      return result;
   };
}

function hash(args) {
   return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert(worker.slow(3, 5)); // works
alert("Again " + worker.slow(3, 5)); // same (cached)

/*

Agora ele funciona com qualquer número de argumentos (embora a função hash também precise ser ajustada para permitir qualquer número de argumentos. Uma maneira interessante de lidar com isso será abordada abaixo).

Há duas mudanças:

Na linha (*), ele chama hashpara criar uma única chave de arguments. Aqui usamos uma função simples de “união” que transforma argumentos (3, 5)na chave "3,5". Casos mais complexos podem exigir outras funções de hash.
Then (**)usa func.call(this, ...arguments)para passar o contexto e todos os argumentos que o wrapper obteve (não apenas o primeiro) para a função original.
func.apply
Em vez de func.call(this, ...arguments)poderíamos usar func.apply(this, arguments).

A sintaxe do método integrado func.apply é:

func.apply(context, args)
Ele executa a funcconfiguração this=contexte usa um objeto semelhante a uma matriz argscomo a lista de argumentos.

A única diferença de sintaxe entre calle applyé que callespera uma lista de argumentos, enquanto applyleva um objeto semelhante a uma matriz com eles.

Portanto, essas duas chamadas são quase equivalentes:

func.call(context, ...args);
func.apply(context, args);
Eles executam a mesma chamada de funccom contexto e argumentos fornecidos.

Há apenas uma diferença sutil em relação a args:

A sintaxe de propagação ...permite passar iterável args como a lista para call.
O applyaceita apenas arquivos args .
…E para objetos que são iteráveis ​​e semelhantes a arrays, como um array real, podemos usar qualquer um deles, mas applyprovavelmente será mais rápido, porque a maioria dos mecanismos JavaScript o otimizam internamente melhor.

Passar todos os argumentos junto com o contexto para outra função é chamado de encaminhamento de chamada .

Essa é a forma mais simples disso:

let wrapper = function() {
  return func.apply(this, arguments);
};
Quando um código externo chama tal wrapper, é indistinguível da chamada da função original func.

Emprestando um método
Agora vamos fazer mais uma pequena melhoria na função hash:

function hash(args) {
  return args[0] + ',' + args[1];
}
A partir de agora, funciona apenas em dois argumentos. Seria melhor se pudesse colar qualquer número de arquivos args.

A solução natural seria usar o método arr.join :

function hash(args) {
  return args.join();
}
…Infelizmente, isso não vai funcionar. Porque estamos chamando hash(arguments), e argumentso objeto é iterável e semelhante a um array, mas não um array real.

Portanto, chamá join-lo falharia, como podemos ver abaixo:

*/

function hash() {
   alert( arguments.join() ); // Error: arguments.join is not a function
} 

hash(1, 2);

// Ainda assim, há uma maneira fácil de usar o array join:

function hash() {
   alert( [].join.call(arguments) ); // 1,2
}
 
hash(1, 2);

/*

O truque é chamado de empréstimo de método .

Pegamos (pegamos emprestado) um método join de um array regular ( [].join) e usamos [].join.callpara executá-lo no contexto de arguments.

Por que funciona?

Isso porque o algoritmo interno do método nativo arr.join(glue)é muito simples.

Retirado da especificação quase “como está”:

1. Seja glueo primeiro argumento ou, se não houver argumentos, uma vírgula ",".
2. Seja resultuma string vazia.
3. Anexar this[0]a result.
4. Anexar gluee this[1].
5. Anexar gluee this[2].
6. …Faça isso até que os this.lengthitens estejam colados.
7. Retornar result.

Então, tecnicamente, ele pega thise junta this[0], this[1]etc. É intencionalmente escrito de uma forma que permite qualquer tipo de array this(não é uma coincidência, muitos métodos seguem esta prática). É por isso que também funciona com this=arguments.

Decoradores e propriedades de função
Geralmente é seguro substituir uma função ou um método por um decorado, exceto por uma pequena coisa. Se a função original contiver propriedades, como func.calledCountou o que for, então a função decorada não as fornecerá. Porque isso é um invólucro. Portanto, é preciso ter cuidado ao usá-los.

Por exemplo, no exemplo acima, se a slowfunção tiver quaisquer propriedades nela, então cachingDecorator(slow)é um wrapper sem elas.

Alguns decoradores podem fornecer suas próprias propriedades. Por exemplo, um decorador pode contar quantas vezes uma função foi invocada e quanto tempo levou, e expor essas informações por meio de propriedades do wrapper.

Existe uma maneira de criar decoradores que mantêm o acesso às propriedades da função, mas isso requer o uso de um Proxyobjeto especial para agrupar uma função. Discutiremos isso mais tarde no artigo Proxy e Reflect .

Resumo

Decorator é um wrapper em torno de uma função que altera seu comportamento. O trabalho principal ainda é realizado pela função.

Os decoradores podem ser vistos como “recursos” ou “aspectos” que podem ser adicionados a uma função. Podemos adicionar um ou adicionar muitos. E tudo isso sem alterar seu código!

Para implementar cachingDecorator, estudamos métodos:

func.call(context, arg1, arg2…) – chamadas func com contexto e argumentos fornecidos.
func.apply(context, args) – chama a func passagem context como this e como uma matriz args para uma lista de argumentos.
O encaminhamento de chamadas genérico geralmente é feito com apply:

let wrapper = function() {
  return original.apply(this, arguments);
};
Também vimos um exemplo de empréstimo de método quando pegamos um método de um objeto e callo colocamos no contexto de outro objeto. É bastante comum pegar métodos de array e aplicá-los a arquivos arguments. A alternativa é usar o objeto rest parameters que é um array real.

Existem muitos decoradores lá na natureza. Verifique o quão bem você os obteve resolvendo as tarefas deste capítulo.

*/