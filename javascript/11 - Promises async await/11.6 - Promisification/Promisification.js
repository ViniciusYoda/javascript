/*

promessa
“Promisificação” é uma palavra longa para uma transformação simples. É a conversão de uma função que aceita um callback em uma função que retorna uma promessa.

Essas transformações geralmente são necessárias na vida real, pois muitas funções e bibliotecas são baseadas em callback. Mas as promessas são mais convenientes, então faz sentido prometê-las.

Para melhor entendimento, vejamos um exemplo.

Por exemplo, temos loadScript(src, callback)no capítulo Introdução: callbacks .

*/

function loadScript(src, callback) {
   let script = document.createElement('script')
   script.src = src;

   script.onload = () => callback(null, script);
   script.onerror = () => callback(new Error(`Script load for ${src}`));

   document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})

/*

A função carrega um script com o dado srce, em seguida, chama callback(err)em caso de erro ou callback(null, script)em caso de carregamento bem-sucedido. Esse é um acordo generalizado para o uso de callbacks, já vimos isso antes.

Vamos prometer isso.

Faremos uma nova função loadScriptPromise(src), que faz o mesmo (carrega o script), mas retorna uma promessa em vez de usar callbacks.

Em outras palavras, passamos apenas src(no callback) e recebemos uma promessa em retorno, que resolve com scriptquando o carregamento é bem-sucedido e rejeita com o erro caso contrário.

Aqui está:

*/

let loadScriptPromise  = function(src) {
   return new Promise((resolve, reject) => {
      loadScript(src, (err, script) => {
         if (err) reject(err);
         else resolve(script);
      });
   });
};

// usage:
// loadScriptPromise('path/script.js').then(...)

/*

Como podemos ver, a nova função é um wrapper em torno da loadScriptfunção original. Ele o chama fornecendo seu próprio retorno de chamada que se traduz em promessa resolve/reject.

Agora loadScriptPromisese encaixa bem em código baseado em promessa. Se gostarmos mais de promessas do que de retornos de chamada (e em breve veremos mais razões para isso), usaremos em seu lugar.

Na prática, podemos precisar prometer mais de uma função, então faz sentido usar um auxiliar.

Vamos chamá-lo de promisify(f): ele aceita uma função to-promisify fe retorna uma função wrapper.

*/

function promisify(f) {
   return function (...args) { // return a wrapper-function (*)
      return new Promise((resolve, reject) => {
         function callback(err, result) { // our custom callback for f (**)
            if (err) {
               reject(err);
            } else {
               resolve(result);
            }
         }

         args.push(callback); // append our custom callback to the end of f arguments

         f.call(this, ...args); // call the original function
      });
   };
}

// usage:
// let loadScriptPromise = promisify(loadScript);
// loadScriptPromise(...).then(...);

/*

O código pode parecer um pouco complexo, mas é essencialmente o mesmo que escrevemos acima, enquanto promete loadScriptfunção.

Uma chamada para promisify(f)retorna um wrapper em torno f (*)de . Esse wrapper retorna uma promessa e encaminha a chamada para o original f, rastreando o resultado no retorno de chamada personalizado (**).

Aqui, promisifyassume que a função original espera um retorno de chamada com exatamente dois argumentos (err, result). Isso é o que encontramos com mais frequência. Então, nosso retorno de chamada personalizado está exatamente no formato correto e promisifyfunciona muito bem para esse caso.

Mas e se o original fesperar um callback com mais argumentos callback(err, res1, res2, ...)?

Podemos melhorar nosso ajudante. Vamos fazer uma versão mais avançada do promisify.

Quando chamado promisify(f), deve funcionar de maneira semelhante à versão acima.
Quando chamado como promisify(f, true), ele deve retornar a promessa que resolve com o array de resultados de retorno de chamada. Isso é exatamente para callbacks com muitos argumentos.

// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);

Como você pode ver, é essencialmente o mesmo que acima, mas resolveé chamado com apenas um ou todos os argumentos, dependendo se manyArgsé verdadeiro.

Para formatos de retorno de chamada mais exóticos, como aqueles sem errnada: callback(result), podemos prometer tais funções manualmente sem usar o auxiliar.

Existem também módulos com funções de promisificação um pouco mais flexíveis, por exemplo, es6-promisify . No Node.js, há uma util.promisifyfunção integrada para isso.

Observe:
Promisificação é uma ótima abordagem, especialmente quando você usa async/await(abordado posteriormente no capítulo Async/await ), mas não é um substituto total para callbacks.

Lembre-se, uma promessa pode ter apenas um resultado, mas um retorno de chamada pode tecnicamente ser chamado várias vezes.

Portanto, a promisificação destina-se apenas a funções que chamam o retorno de chamada uma vez. Novas chamadas serão ignoradas.

*/



