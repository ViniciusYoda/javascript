/*

Tratamento de erros com promessas
As cadeias de promessa são ótimas para lidar com erros. Quando uma promessa é rejeitada, o controle pula para o manipulador de rejeição mais próximo. Isso é muito conveniente na prática.

Por exemplo, no código abaixo, a URL para fetchestá errada (sem esse site) e .catchlida com o erro:

*/

fetch('https://no-such-server.blabla') // rejects
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)

/*

Como você pode ver, o .catchnão precisa ser imediato. Pode aparecer depois de um ou talvez vários .then.

Ou talvez esteja tudo bem com o site, mas a resposta não é um JSON válido. A maneira mais fácil de detectar todos os erros é anexar .catchao final da cadeia:

*/

fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => alert(error.message));

/*

Normalmente, isso .catchnão é acionado. Mas se qualquer uma das promessas acima rejeitar (um problema de rede ou json inválido ou qualquer outro), ele será detectado.

Tentativa implícita... captura
O código de um executor de promessa e manipuladores de promessa tem um "invisível try..catch" em torno dele. Se ocorrer uma exceção, ela será capturada e tratada como uma rejeição.

Por exemplo, este código:

*/

new Promise((resolve, reject) => {
   throw new Error("Whoops!");
 }).catch(alert); // Error: Whoops!

// …Funciona exatamente da mesma forma:

new Promise((resolve, reject) => {
   reject(new Error("Whoops!"));
 }).catch(alert); // Error: Whoops!

/*

O "invisível try..catch" em torno do executor detecta automaticamente o erro e o transforma em promessa rejeitada.

Isso acontece não apenas na função executora, mas também em seus manipuladores. Se estivermos throwdentro de um .thenmanipulador, isso significa uma promessa rejeitada, então o controle pula para o manipulador de erro mais próximo.

Aqui está um exemplo:

*/

new Promise((resolve, reject) => {
   resolve("ok");
 }).then((result) => {
   throw new Error("Whoops!"); // rejects the promise
 }).catch(alert); // Error: Whoops!

// Isso acontece para todos os erros, não apenas para aqueles causados ​​pela throwinstrução. Por exemplo, um erro de programação:

new Promise((resolve, reject) => {
   resolve("ok");
 }).then((result) => {
   blabla(); // no such function
 }).catch(alert); // ReferenceError: blabla is not defined

/*

O final .catchnão apenas detecta rejeições explícitas, mas também erros acidentais nos manipuladores acima.

Relançando
Como já notamos, .catchno final da cadeia é semelhante a try..catch. Podemos ter quantos .thenmanipuladores quisermos e, em seguida, usar um único .catchno final para lidar com erros em todos eles.

O final .catchnão apenas detecta rejeições explícitas, mas também erros acidentais nos manipuladores acima.

Relançando
Como já notamos, .catchno final da cadeia é semelhante a try..catch. Podemos ter quantos .thenmanipuladores quisermos e, em seguida, usar um único .catchno final para lidar com erros em todos eles.

*/

// the execution: catch => then
new Promise((resolve, reject) => {

   throw new Error("Whoops!");

}).catch(function(error) {

   alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));

/*

Aqui o .catchbloco termina normalmente. Portanto, o próximo .thenmanipulador bem-sucedido é chamado.

No exemplo abaixo vemos a outra situação com .catch. O manipulador (*)detecta o erro e simplesmente não consegue tratá-lo (por exemplo, ele só sabe como manipular URIError), então ele o lança novamente:

*/

// the execution: catch -> catch
new Promise((resolve, reject) => {

   throw new Error("Whoops!");
 
 }).catch(function(error) { // (*)
 
   if (error instanceof URIError) {
     // handle it
   } else {
     alert("Can't handle such error");
 
     throw error; // throwing this or another error jumps to the next catch
   }
 
 }).then(function() {
   /* doesn't run here */
 }).catch(error => { // (**)
 
   alert(`The unknown error has occurred: ${error}`);
   // don't return anything => execution goes the normal way
 
 });

/*

A execução salta do primeiro .catch (*)para o próximo (**)na cadeia.

Rejeições não tratadas
O que acontece quando um erro não é tratado? Por exemplo, esquecemos de anexar .catchao final da cadeia, como aqui:

*/

new Promise(function() {
   noSuchFunction(); // Error here (no such function)
 })
   .then(() => {
     // successful promise handlers, one or more
   }); // without .catch at the end!

/*

Em caso de erro, a promessa é rejeitada e a execução deve pular para o manipulador de rejeição mais próximo. Mas não há nenhum. Assim, o erro fica "preso". Não há código para lidar com isso.

Na prática, assim como acontece com erros regulares não tratados no código, isso significa que algo deu muito errado.

O que acontece quando ocorre um erro regular e não é detectado pelo try..catch? O script morre com uma mensagem no console. Uma coisa semelhante acontece com rejeições de promessa não tratadas.

O mecanismo JavaScript rastreia essas rejeições e gera um erro global nesse caso. Você pode vê-lo no console se executar o exemplo acima.

No navegador, podemos detectar esses erros usando o evento unhandledrejection:

*/

window.addEventListener('unhandledrejection', function(event) {
   // the event object has two special properties:
   alert(event.promise); // [object Promise] - the promise that generated the error
   alert(event.reason); // Error: Whoops! - the unhandled error object
 });
 
 new Promise(function() {
   throw new Error("Whoops!");
 }); // no catch to handle the error

/*

O evento faz parte do padrão HTML .

Se ocorrer um erro e não houver .catch, o unhandledrejectionmanipulador dispara e obtém o eventobjeto com as informações sobre o erro, para que possamos fazer algo.

Normalmente, tais erros são irrecuperáveis, portanto, nossa melhor saída é informar o usuário sobre o problema e provavelmente relatar o incidente ao servidor.

Em ambientes sem navegador, como o Node.js, existem outras maneiras de rastrear erros não tratados.

Resumo

.catchlida com erros em promessas de todos os tipos: seja uma reject()chamada ou um erro lançado em um manipulador.
.thentambém detecta erros da mesma maneira, se receber o segundo argumento (que é o manipulador de erros).
Devemos colocar .catchexatamente nos lugares onde queremos lidar com erros e saber como lidar com eles. O manipulador deve analisar os erros (ajuda de classes de erro personalizadas) e relançar os desconhecidos (talvez sejam erros de programação).
Tudo bem não usar .catchde jeito nenhum, se não houver como se recuperar de um erro.
De qualquer forma, devemos ter o unhandledrejectionmanipulador de eventos (para navegadores e análogos para outros ambientes) para rastrear erros não tratados e informar o usuário (e provavelmente nosso servidor) sobre eles, para que nosso aplicativo nunca “simplesmente morra”.

*/