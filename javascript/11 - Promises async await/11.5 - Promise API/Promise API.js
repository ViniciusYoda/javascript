/*

API de promessa
Existem 6 métodos estáticos na Promiseclasse. Abordaremos rapidamente seus casos de uso aqui.

Promise.all
Digamos que queremos que muitas promessas sejam executadas em paralelo e esperar até que todas estejam prontas.

Por exemplo, baixe vários URLs em paralelo e processe o conteúdo assim que terminar.

É para isso que Promise.allserve.

A sintaxe é:

let promise = Promise.all(iterable);

Promise.allpega um iterável (geralmente, uma matriz de promessas) e retorna uma nova promessa.

A nova promessa é resolvida quando todas as promessas listadas são resolvidas e a matriz de seus resultados se torna seu resultado.

Por exemplo, o Promise.allabaixo se estabelece após 3 segundos e, em seguida, seu resultado é um array [1, 2, 3]:

*/

Promise.all([
   new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3

/*

Observe que a ordem dos membros da matriz resultante é a mesma das promessas de origem. Mesmo que a primeira promessa leve mais tempo para ser resolvida, ela ainda é a primeira na lista de resultados.

Um truque comum é mapear uma matriz de dados de trabalho em uma matriz de promessas e, em seguida, agrupar isso em arquivos Promise.all.

Por exemplo, se tivermos uma matriz de URLs, podemos buscá-los todos assim:

*/

let urls = [
   'https://api.github.com/users/iliakan',
   'https://api.github.com/users/remy',
   'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
   .then(responses => responses.forEach(
      response => alert(`${response.url}: ${response.status}`)
   ));

// Um exemplo maior com a busca de informações do usuário para uma matriz de usuários do GitHub por seus nomes (poderíamos buscar uma matriz de mercadorias por seus IDs, a lógica é idêntica):

let names = ['iliakan', 'remy', 'jeresig'];

let requests2 = names.map(name => fetcch(`https://api.github.com/users/${name}`));

Promise.all(requests2)
   .then(responses => {
      // all responses are resolved successfully
      for(let response of responses) {
         alert(`${response.url}: ${response.status}`); // shows 200 for every url
      }

      return responses;
   })
    // map array of responses into an array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));

/*

Se alguma das promessas for rejeitada, a promessa retornada por Promise.allrejeita imediatamente com esse erro.

Por exemplo:

*/

Promise.all([
   new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
 ]).catch(alert); // Error: Whoops!

/*

Aqui a segunda promessa rejeita em dois segundos. Isso leva a uma rejeição imediata de Promise.all, então .catchexecuta: o erro de rejeição torna-se o resultado de todo Promise.all.

Em caso de erro, outras promessas são ignoradas
Se uma promessa rejeita, Promise.allrejeita imediatamente, esquecendo-se completamente das outras da lista. Seus resultados são ignorados.

Por exemplo, se houver várias fetchchamadas, como no exemplo acima, e uma falhar, as outras ainda continuarão em execução, mas Promise.allnão as assistirão mais. Eles provavelmente irão resolver, mas seus resultados serão ignorados.

Promise.allnão faz nada para cancelá-los, pois não há conceito de “cancelamento” nas promessas. Em outro capítulo , abordaremos AbortControllero que pode ajudar com isso, mas não faz parte da API do Promise.

Promise.all(iterable)permite valores "regulares" não promissores emiterable
Normalmente, Promise.all(...)aceita um iterável (na maioria dos casos, um array) de promessas. Mas se algum desses objetos não for uma promessa, ele será passado para o array resultante “como está”.

Por exemplo, aqui os resultados são [1, 2, 3]:

*/

Promise.all([
   new Promise((resolve, reject) => {
     setTimeout(() => resolve(1), 1000)
   }),
   2,
   3
 ]).then(alert); // 1, 2, 3

/*

Assim, podemos passar valores prontos para Promise.allonde for conveniente.

Promise.allResolvido
Uma adição recente
Esta é uma adição recente à linguagem. Navegadores antigos podem precisar de polyfills .
Promise.allrejeita como um todo se alguma promessa rejeitar. Isso é bom para casos de “tudo ou nada”, quando precisamos de todos os resultados bem-sucedidos para prosseguir:

*/

Promise.all([
   fetch('/template.html'),
   fetch('/style.css'),
   fetch('/data.json')
 ]).then(render); // render method needs results of all fetches

/*

Promise.allSettledapenas espera que todas as promessas sejam liquidadas, independentemente do resultado. A matriz resultante tem:

{status:"fulfilled", value:result}para respostas bem-sucedidas,
{status:"rejected", reason:error}por erros.
Por exemplo, gostaríamos de buscar as informações sobre vários usuários. Mesmo que um pedido falhe, ainda estamos interessados ​​nos outros.

Vamos usar Promise.allSettled:

*/

let urls2 = [
   'https://api.github.com/users/iliakan',
   'https://api.github.com/users/remy',
   'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
   .then(results => { // (*)
      results.forEach((result, num) => {
         if (result.status == "fulfilled") {
            alert(`${urls[num]}: ${result.value.status}`);
         }
         if (result.status == "rejected") {
            alert(`${urls[num]}: ${result.reason}`);
         }
      });
   });

/*

O resultsna linha (*)acima será:

[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
Portanto, para cada promessa, obtemos seu status e value/error.

Polyfill
Se o navegador não suportar Promise.allSettled, é fácil fazer o polyfill:

*/

if (!Promise.allSettled) {
   const rejectHandler = reason => ({ status: 'rejected', reason });
 
   const resolveHandler = value => ({ status: 'fulfilled', value });
 
   Promise.allSettled = function (promises) {
     const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
     return Promise.all(convertedPromises);
   };
}

/*

Nesse código, promises.mappega os valores de entrada, transforma-os em promessas (apenas no caso de uma não-promessa ter sido passada) com p => Promise.resolve(p)e, em seguida, adiciona o .thenmanipulador a cada um.

Esse manipulador transforma um resultado bem-sucedido valueem {status:'fulfilled', value}, e um erro reasonem {status:'rejected', reason}. Esse é exatamente o formato de Promise.allSettled.

Agora podemos usar Promise.allSettledpara obter os resultados de todas as promessas dadas, mesmo que algumas delas rejeitem.

Promise.race
Semelhante a Promise.all, mas espera apenas pela primeira promessa estabelecida e obtém seu resultado (ou erro).

A sintaxe é:

let promise = Promise.race(iterable);
Por exemplo, aqui o resultado será 1:

*/

Promise.race([
   new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
 ]).then(alert); // 1

/*

A primeira promessa aqui foi mais rápida, então se tornou o resultado. Após a primeira promessa estabelecida “ganha a corrida”, todos os resultados/erros posteriores são ignorados.

Promise.any
Semelhante a Promise.race, mas espera apenas pela primeira promessa cumprida e obtém seu resultado. Se todas as promessas fornecidas forem rejeitadas, a promessa retornada será rejeitada com AggregateError– um objeto de erro especial que armazena todos os erros de promessa em sua errorspropriedade.

A sintaxe é:

let promise = Promise.any(iterable);
Por exemplo, aqui o resultado será 1:

*/

Promise.any([
   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
   new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
 ]).then(alert); // 1

/*

A primeira promessa aqui foi mais rápida, mas foi rejeitada, então a segunda promessa se tornou o resultado. Após a primeira promessa cumprida “ganha a corrida”, todos os resultados posteriores são ignorados.

Aqui está um exemplo quando todas as promessas falham:

*/

Promise.any([
   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
 ]).catch(error => {
   console.log(error.constructor.name); // AggregateError
   console.log(error.errors[0]); // Error: Ouch!
   console.log(error.errors[1]); // Error: Error!
 });

/*

Como você pode ver, os objetos de erro para promessas com falha estão disponíveis na errorspropriedade do AggregateErrorobjeto.

Prometer.resolver/rejeitar
Métodos Promise.resolvee Promise.rejectraramente são necessários no código moderno, porque a async/awaitsintaxe (abordaremos isso um pouco mais tarde ) os torna um tanto obsoletos.

Nós os cobrimos aqui para completude e para aqueles que não podem usar async/awaitpor algum motivo.

Promete.resolve
Promise.resolve(value)cria uma promessa resolvida com o resultado value.

Igual a:

let promise = new Promise(resolve => resolve(value));
O método é usado para compatibilidade, quando se espera que uma função retorne uma promessa.

Por exemplo, a loadCachedfunção abaixo busca uma URL e lembra (armazena em cache) seu conteúdo. Para chamadas futuras com a mesma URL, ele obtém imediatamente o conteúdo anterior do cache, mas usa Promise.resolvepara fazer uma promessa, portanto, o valor retornado é sempre uma promessa:

*/

let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}

/*

Podemos escrever loadCached(url).then(…), porque é garantido que a função retornará uma promessa. Sempre podemos usar .thendepois loadCached. Esse é o propósito da Promise.resolvelinha (*).

Prometer.rejeitar
Promise.reject(error)cria uma promessa rejeitada com error.

Igual a:

let promise = new Promise((resolve, reject) => reject(error));

Na prática, esse método quase nunca é usado.

Resumo
Existem 6 métodos estáticos de Promiseclasse:

1. Promise.all(promises)– espera que todas as promessas sejam resolvidas e retorna uma matriz de seus resultados. Se alguma das promessas dadas for rejeitada, torna-se o erro de Promise.all, e todos os outros resultados são ignorados.

2. Promise.allSettled(promises)(método adicionado recentemente) – espera que todas as promessas sejam resolvidas e retorna seus resultados como uma matriz de objetos com:
status: "fulfilled"ou"rejected"
value(se cumprido) ou reason(se rejeitado).

3. Promise.race(promises)– espera que a primeira promessa seja liquidada e seu resultado/erro se torna o resultado.

4. Promise.race(promises)– espera que a primeira promessa seja liquidada e seu resultado/erro se torna o resultado.

5. Promise.resolve(value)– faz uma promessa resolvida com o valor dado.

6. Promise.reject(error)– faz uma promessa rejeitada com o erro dado.

De todos estes, Promise.allé provavelmente o mais comum na prática.

*/

