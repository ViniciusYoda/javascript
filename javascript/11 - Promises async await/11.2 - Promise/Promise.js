/*

Promessa
Imagine que você é um cantor de sucesso e os fãs perguntam dia e noite pela sua próxima música.

Para obter algum alívio, você promete enviar a eles quando for publicado. Você dá uma lista aos seus fãs. Eles podem preencher seus endereços de e-mail, para que, quando a música estiver disponível, todos os inscritos a recebam instantaneamente. E mesmo que algo dê muito errado, digamos, um incêndio no estúdio, de modo que você não possa publicar a música, eles ainda serão notificados.

Todos estão felizes: você, porque o povo não te lota mais, e os fãs, porque não vão perder a música.

Esta é uma analogia da vida real para coisas que frequentemente temos na programação:

1. Um “código de produção” que faz algo e leva tempo. Por exemplo, algum código que carrega os dados em uma rede. Isso é um “cantor”.
2. Um “código consumidor” que quer o resultado do “código produtor” quando estiver pronto. Muitas funções podem precisar desse resultado. Esses são os “fãs”.
3. Uma promessa é um objeto JavaScript especial que vincula o “código de produção” e o “código de consumo”. Em termos de nossa analogia: esta é a “lista de assinaturas”. O “código de produção” leva o tempo necessário para produzir o resultado prometido, e a “promessa” torna esse resultado disponível para todo o código assinado quando estiver pronto.

A analogia não é muito precisa, porque as promessas do JavaScript são mais complexas do que uma simples lista de assinaturas: elas têm recursos e limitações adicionais. Mas tudo bem para começar.

A sintaxe do construtor para um objeto de promessa é:

let promise = new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
});
A função passada new Promiseé chamada de executor . Quando new Promiseé criado, o executor é executado automaticamente. Ele contém o código de produção que deve eventualmente produzir o resultado. Nos termos da analogia acima: o executor é o “cantor”.

Seus argumentos resolvee rejectcallbacks são fornecidos pelo próprio JavaScript. Nosso código está apenas dentro do executor.

Quando o executor obtiver o resultado, seja cedo ou tarde, não importa, ele deve chamar um destes callbacks:

resolve(value)— se o trabalho for concluído com sucesso, com resultado value.
reject(error)— se ocorreu um erro, erroré o objeto de erro.
Então, para resumir: o executor é executado automaticamente e tenta executar um trabalho. Ao terminar a tentativa, chama resolvese foi bem sucedida ou rejectse houve algum erro.

O promiseobjeto retornado pelo new Promiseconstrutor possui estas propriedades internas:

state— inicialmente "pending", então muda para "fulfilled"quando resolveé chamado ou "rejected"quando rejecté chamado.
result— inicialmente undefined, então muda para valuequando resolve(value)é chamado ou errorquando reject(error)é chamado.
Assim, o executor eventualmente se move promisepara um destes estados:

Mais tarde veremos como os “fãs” podem subscrever estas mudanças.

Aqui está um exemplo de um construtor de promessa e uma função de executor simples com “produção de código” que leva tempo (via setTimeout):

*/

let promise = new Promise(function (resolve, reject) {
   // the function is executed automatically when the promise is constructed

   // after 1 second signal that the job is done with the result "done"
   setTimeout(() => resolve("done"), 1000);
});

/*

Podemos ver duas coisas executando o código acima:

1. O executor é chamado automaticamente e imediatamente (por new Promise).

2. O executor recebe dois argumentos: resolvee reject. Essas funções são pré-definidas pelo mecanismo JavaScript, portanto não precisamos criá-las. Devemos chamar apenas um deles quando estiver pronto.

Após um segundo de “processamento”, o executor chama resolve("done")para produzir o resultado. Isso altera o estado do promiseobjeto:


Esse foi um exemplo de conclusão de trabalho bem-sucedida, uma “promessa cumprida”.

E agora um exemplo do executor rejeitando a promessa com um erro:

let promise = new Promise(function(resolve, reject) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

Para resumir, o executor deve executar um trabalho (geralmente algo que leva tempo) e então chamar resolveou rejectalterar o estado do objeto de promessa correspondente.

Uma promessa que é resolvida ou rejeitada é chamada de “liquidada”, em oposição a uma promessa inicialmente “pendente”.

Pode haver apenas um único resultado ou um erro
O executor deve chamar apenas um resolveou um reject. Qualquer mudança de estado é final.

Todas as outras chamadas de resolvee rejectsão ignoradas:

let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // ignored
  setTimeout(() => resolve("…")); // ignored
});
A ideia é que um trabalho feito pelo executor possa ter apenas um resultado ou um erro.

Além disso, resolve/ rejectespera apenas um argumento (ou nenhum) e irá ignorar argumentos adicionais.

Rejeitar com Errorobjetos
Caso algo dê errado, o executor deve chamar reject. Isso pode ser feito com qualquer tipo de argumento (assim como resolve). Mas é recomendado usar Errorobjetos (ou objetos que herdam de Error). A razão para isso logo se tornará aparente.

Chamando imediatamente resolve/reject
Na prática, um executor geralmente faz algo de forma assíncrona e chama resolve/ rejectdepois de algum tempo, mas não precisa. Também podemos ligar resolveou rejectimediatamente, assim:

let promise = new Promise(function(resolve, reject) {
  // not taking our time to do the job
  resolve(123); // immediately give the result: 123
});
Por exemplo, isso pode acontecer quando começamos a fazer um trabalho, mas vemos que tudo já foi concluído e armazenado em cache.

Isso é bom. Imediatamente temos uma promessa resolvida.

O statee resultsão internos
As propriedades statee resultdo objeto Promise são internas. Não podemos acessá-los diretamente. Podemos usar os métodos .then// .catchpara .finallyisso. Eles são descritos abaixo.

Consumidores: então, pegue
Um objeto Promise serve como um link entre o executor (o “código produtor” ou “cantor”) e as funções consumidoras (os “fãs”), que receberão o resultado ou erro. As funções de consumo podem ser registradas (assinadas) usando os métodos .thene .catch.

então
O mais importante e fundamental é .then.

A sintaxe é:

promise.then(
  function(result) { /* handle a successful result */  /* }, 
function(error) { */ /* handle an error */ /* }
); 

O primeiro argumento de .thené uma função que é executada quando a promessa é resolvida e recebe o resultado.

O segundo argumento de .thené uma função que é executada quando a promessa é rejeitada e recebe o erro.

Por exemplo, aqui está uma reação a uma promessa resolvida com sucesso:

*/

let promise2 = new Promise(function (resolve, reject) {
   setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function is .then
promise2.then(
   result => alert(result), // showns "done" after 1 second
   error => alert(error) // doesn't run
)

/*

A primeira função foi executada.

E no caso de rejeição, a segunda:

*/

let promise3 = new Promise(function (resolve, reject) {
   setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function is .then
promise3.then(
   result => alert(result), // doesn't run
   error => alert(error) // shows "Error: Whoops!" after 1 second
);

// Se estivermos interessados ​​apenas em conclusões bem-sucedidas, podemos fornecer apenas um argumento de função para .then:

let promise4 = new Promise(resolve => {
   setTimeout(() => resolve("done!"), 1000);
});

promise4.then(alert); // shows "done!" after 1 second

/*

apanhar
Se estivermos interessados ​​apenas em erros, podemos usar nullcomo primeiro argumento: .then(null, errorHandlingFunction). Ou podemos usar .catch(errorHandlingFunction), que é exatamente o mesmo:

*/

let promise5 = new Promise((resolve, reject) => {
   setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second

/*

A chamada .catch(f)é um análogo completo de .then(null, f), é apenas uma abreviação.

Limpeza: finalmente
Assim como há uma finallycláusula em um try {...} catch {...}, há finallyem promessas.

A chamada .finally(f)é semelhante .then(f, f)no sentido que fcorre sempre, quando a promessa é cumprida: seja ela resolvida ou rejeitada.

A ideia finallyé configurar um manipulador para executar a limpeza/finalização após a conclusão das operações anteriores.

Por exemplo, parando indicadores de carregamento, fechando conexões desnecessárias, etc.

Pense nisso como um finalizador de festa. Não importa se a festa foi boa ou ruim, quantos amigos estavam nela, ainda precisamos (ou pelo menos deveríamos) fazer uma limpeza depois dela.

O código pode ficar assim:

new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve or maybe reject */
// })
// runs when the promise is settled, doesn't matter successfully or not
// .finally(() => stop loading indicator)
// so the loading indicator is always stopped before we go on
// .then(result => show result, err => show error)

/*

Por favor, note que finally(f)não é exatamente um alias de then(f,f)though.

Existem diferenças importantes:

1. Um finally manipulador não tem argumentos. finallyNão sabemos se a promessa é bem-sucedida ou não . Tudo bem, pois nossa tarefa geralmente é realizar procedimentos de finalização “gerais”.

Por favor, dê uma olhada no exemplo acima: como você pode ver, o finallymanipulador não tem argumentos e o resultado da promessa é tratado pelo próximo manipulador.

2. Um finally manipulador “passa” o resultado ou erro para o próximo manipulador adequado.

Por exemplo, aqui o resultado é passado finallypara then:

*/

new Promise((resolve, reject) => {
   setTimeout(() => resolve("value"), 2000);
})
   .finally(() => alert("Promise ready")) // triggers first
   .then(result => alert(result)); // <-- .then shows "value"

/*

Como você pode ver, o valueretornado pela primeira promessa é passado finallypara a próxima then.

Isso é muito conveniente, porque finallynão se destina a processar um resultado de promessa. Como dito, é um lugar para fazer uma limpeza genérica, não importa qual seja o resultado.

E aqui está um exemplo de erro, para vermos como é passado finallypara catch:

*/

new Promise((resolve, reject) => {
   throw new Error("error");
})
   .finally(() => alert("Promise ready")) // triggers first
   .catch(err => alert(err));  // <-- .catch shows the error

/*
Um finallymanipulador também não deve retornar nada. Em caso afirmativo, o valor retornado é silenciosamente ignorado.

A única exceção a essa regra é quando um finallymanipulador gera um erro. Em seguida, esse erro vai para o próximo manipulador, em vez de qualquer resultado anterior.

Para resumir:

Um finallymanipulador não obtém o resultado do manipulador anterior (não possui argumentos). Em vez disso, esse resultado é passado para o próximo manipulador adequado.
Se um finallymanipulador retornar algo, ele será ignorado.
Quando finallylança um erro, a execução vai para o manipulador de erros mais próximo.

Esses recursos são úteis e fazem as coisas funcionarem da maneira certa se usarmos finallycomo deve ser usado: para procedimentos de limpeza genéricos.

Podemos anexar manipuladores a promessas estabelecidas
Se uma promessa estiver pendente, os .then/catch/finallymanipuladores aguardam seu resultado.

Às vezes, pode ser que uma promessa já esteja estabelecida quando adicionamos um manipulador a ela.

Nesse caso, esses manipuladores são executados imediatamente:

*/

// the promise becomes resolved immediately upon creation
let promise6 = new Promise(resolve => resolve("done!"));

promise6.then(alert); // done! (shows up right now)

/*

Observe que isso torna as promessas mais poderosas do que o cenário de “lista de assinaturas” da vida real. Se o cantor já lançou sua música e então uma pessoa se inscreve na lista de assinaturas, provavelmente não receberá aquela música. As inscrições na vida real devem ser feitas antes do evento.

As promessas são mais flexíveis. Podemos adicionar manipuladores a qualquer momento: se o resultado já estiver lá, eles apenas executam.

Exemplo: loadScript
A seguir, veremos exemplos mais práticos de como as promessas podem nos ajudar a escrever código assíncrono.

Temos a loadScriptfunção para carregar um script do capítulo anterior.

Aqui está a variante baseada em retorno de chamada, apenas para nos lembrar disso:

*/

function loadScript(src, callback) {
   let script = document.createElement('script');
   script.src = src;

   script.onload = () => callback(null, script);
   script.onerror = () => callback(new Error(`Script load error for ${src}`));

   document.head.append(script);
}

/*

Vamos reescrevê-lo usando Promises.

A nova função loadScriptnão exigirá um retorno de chamada. Em vez disso, ele criará e retornará um objeto Promise que será resolvido quando o carregamento for concluído. O código externo pode adicionar manipuladores (funções de inscrição) a ele usando .then:

*/

function loadScript(src) {
   return new Promise(function (resolve, reject) {
      let script = document.createElement('script');
      script.src = src;

      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Script load error for ${src}`));

      document.head.append(script);
   });
}

// Uso:

let promise7 = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise7.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise7.then(script => alert('Another handler...'));

/*

Podemos ver imediatamente alguns benefícios sobre o padrão baseado em callback:

Promessas	Chamadas de retorno
As promessas nos permitem fazer as coisas na ordem natural. Primeiro, executamos loadScript(script)e .thenescrevemos o que fazer com o resultado.	Devemos ter uma callbackfunção à nossa disposição ao chamar loadScript(script, callback). Em outras palavras, devemos saber o que fazer com o resultado antes loadScript de ser chamado.
Podemos invocar .thenuma Promessa quantas vezes quisermos. A cada vez, adicionamos um novo “fã”, uma nova função de assinatura, à “lista de assinaturas”. Mais sobre isso no próximo capítulo: Encadeamento de promessas .	Só pode haver um retorno de chamada.
Portanto, as promessas nos fornecem melhor fluxo de código e flexibilidade. Mas há mais. Veremos isso nos próximos capítulos.

*/


