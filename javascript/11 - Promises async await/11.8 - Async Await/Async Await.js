/*

Assíncrono/aguardando
Existe uma sintaxe especial para trabalhar com promessas de forma mais confortável, chamada “async/await”. É surpreendentemente fácil de entender e usar.

funções assíncronas
Vamos começar com a palavra- asyncchave. Ele pode ser colocado antes de uma função, assim:

async function f() {
  return 1;
}
A palavra “assíncrono” antes de uma função significa uma coisa simples: uma função sempre retorna uma promessa. Outros valores são agrupados em uma promessa resolvida automaticamente.

Por exemplo, esta função retorna uma promessa resolvida com o resultado de 1;

vamos testar:

*/

async function f() {
   return 1;
}

f().then(alert); // 1

// …Poderíamos retornar explicitamente uma promessa, que seria a mesma:

async function f() {
   return Promise.resolve(1);
}

f().then(alert); // 1

/*

Portanto, asyncgarante que a função retorne uma promessa e envolva não-promessas nela. Bastante simples, certo? Mas não só isso. Há outra palavra-chave, await, que funciona apenas dentro asyncde funções, e é bem legal.

Aguardam
A sintaxe:

// works only inside async functions
let value = await promise;
A palavra-chave awaitfaz o JavaScript esperar até que a promessa seja estabelecida e retorne seu resultado.

Aqui está um exemplo com uma promessa que resolve em 1 segundo:

*/

async function f() {

   let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
   });

   let result = await promise; // wait until the promise resolves (*)

   alert(result); // "done!"
}

f();

/*

A execução da função “pausa” na linha (*)e recomeça quando a promessa se estabelece, resulttornando-se seu resultado. Portanto, o código acima mostra “pronto!” em um segundo.

Vamos enfatizar: awaitliteralmente suspende a execução da função até que a promessa se estabeleça, e então a retoma com o resultado da promessa. Isso não custa nenhum recurso da CPU, porque o mecanismo JavaScript pode fazer outras tarefas enquanto isso: executar outros scripts, manipular eventos, etc.

É apenas uma sintaxe mais elegante para obter o resultado da promessa do que promise.then. E, é mais fácil de ler e escrever.

Não pode usar awaitem funções regulares
Se tentarmos usar awaitem uma função não assíncrona, haverá um erro de sintaxe:

function f() {
   let promise = Promise.resolve(1);
   let result = await promise; // Syntax error
}

Podemos receber esse erro se esquecermos de colocar asyncantes de uma função. Como dito anteriormente, awaitsó funciona dentro de uma asyncfunção.

Vamos pegar o showAvatar()exemplo do capítulo Encadeamento de promessas e reescrevê-lo usando async/await:

1. Precisamos substituir .thenas chamadas por await.
2. Também devemos fazer a função asyncpara que funcionem.

*/

async function showAvatar() {

   // read our JSON
   let response = await fetch('/article/promise-chaining/user.json');
   let user = await response.json();

   // read github user
   let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
   let githubUser = await githubResponse.json();

   // show the avatar
   let img = document.createElement('img');
   img.src = githubUser.avatar_url;
   img.className = "promise-avatar-example";
   document.body.append(img);

   // wait 3 seconds
   await new Promise((resolve, reject) => setTimeout(resolve, 3000));

   img.remove();

   return githubResponse;
}

showAvatar();

/*

Bastante limpo e fácil de ler, certo? Muito melhor do que antes.

Navegadores modernos permitem awaitmódulos de nível superior
Em navegadores modernos, awaitno nível superior funciona muito bem, quando estamos dentro de um módulo. Abordaremos os módulos no artigo Módulos, introdução .

Por exemplo:

*/

// we assume this code runs at top level, inside a module
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);

/*

Se não estivermos usando módulos, ou navegadores mais antigos devem ser suportados, há uma receita universal: agrupar em uma função assíncrona anônima.

Assim:

(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();

awaitaceita “thenables”
Assim como promise.then, awaitnos permite usar objetos theable (aqueles com um thenmétodo callable). A ideia é que um objeto de terceiros pode não ser uma promessa, mas compatível com a promessa: se ele suporta .then, é o suficiente para usá-lo com await.

Aqui está uma Thenableaula de demonstração; o awaitabaixo aceita suas instâncias:

*/

class Thenable {
   constructor(num) {
      this.num = num;
   }
   then(resolve, reject) {
      alert(resolve)
      // resolve with this.num*2 after 1000ms
      setTimeout(() => resolve(this.num * 2), 1000); // (*)
   }
}

async function f() {
   // waits for 1 second, then result becomes 2
   let result = await new Thenable(1);
   alert(result);
}

f();

/*

Se awaitobtém um objeto não prometido com .then, ele chama esse método fornecendo as funções internas resolvee rejectcomo argumentos (da mesma forma que faz para um Promiseexecutor regular). Então awaitespera até que um deles seja chamado (no exemplo acima acontece na linha (*)) e então prossegue com o resultado.

Métodos de classe assíncronos
Para declarar um método de classe assíncrono, basta anexá-lo com async:

*/

class Waiter {
   async wait() {
      return await Promise.resolve(1);
   }
}

new Waiter()
   .wait()
   .then(alert); // 1 (this is the same as (result => alert(result)))

/*

O significado é o mesmo: garante que o valor retornado seja uma promessa e habilita await.

Manipulação de erros
Se uma promessa for resolvida normalmente, await promiseretorna o resultado. Mas no caso de uma rejeição, ele lança o erro, como se houvesse uma throwdeclaração naquela linha.

Este código:

async function f() {
  await Promise.reject(new Error("Whoops!"));
}
…é o mesmo que isto:

async function f() {
  throw new Error("Whoops!");
}
Em situações reais, a promessa pode levar algum tempo antes de ser rejeitada. Nesse caso, haverá um atraso antes awaitde lançar um erro.

Podemos capturar esse erro usando try..catch, da mesma forma que um normal throw:

*/

async function f() {

   try {
      let response = await fetch('http://no-such-url');
   } catch (err) {
      alert(err); // TypeError: failed to fetch
   }
}

f();

// Em caso de erro, o controle salta para o catchbloco. Também podemos agrupar várias linhas:

async function f() {

   try {
      let response = await fetch('/no-user-here');
      let user = await response.json();
   } catch (err) {
      // catches errors both in fetch and response.json
      alert(err);
   }
}

f();

// Se não tivermos try..catch, a promessa gerada pela chamada da função assíncrona f()será rejeitada. Podemos anexar .catchpara lidar com isso:

async function f() {
   let response = await fetch('http://no-such-url');
}

// f() becomes a rejected promise
f().catch(alert); // TypeError: failed to fetch // (*)

/*

Se esquecermos de adicionar .catchlá, obteremos um erro de promessa não tratado (visualizável no console). Podemos detectar esses erros usando um unhandledrejectionmanipulador de eventos global, conforme descrito no capítulo Tratamento de erros com promessas .

async/awaitepromise.then/catch
Quando usamos async/await, raramente precisamos .thende , porque awaitlida com a espera por nós. E podemos usar um regular try..catchem vez de .catch. Isso é geralmente (mas nem sempre) mais conveniente.

Mas no nível superior do código, quando estamos fora de qualquer asyncfunção, somos sintaticamente incapazes de usar await, então é uma prática normal adicionar .then/catchpara lidar com o resultado final ou erro de falha, como na linha (*)do exemplo acima.

async/awaitfunciona bem comPromise.all
Quando precisamos esperar por várias promessas, podemos envolvê-las Promise.alle então await:

// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);

No caso de um erro, ele se propaga como de costume, da promessa com falha para Promise.all, e então se torna uma exceção que podemos capturar usando try..catchem torno da chamada.

Resumo
A asyncpalavra-chave antes de uma função tem dois efeitos:

1. Faz com que sempre retorne uma promessa.
2.Permite awaitser usado nele.
A awaitpalavra-chave antes de uma promessa faz com que o JavaScript espere até que a promessa seja estabelecida e, então:

1. Se for um erro, uma exceção é gerada — como se throw errorfosse chamado naquele mesmo local.
2. Caso contrário, retorna o resultado.

Juntos, eles fornecem uma ótima estrutura para escrever código assíncrono que é fácil de ler e escrever.

Com async/awaitraramente precisamos escrever promise.then/catch, mas ainda não devemos esquecer que eles são baseados em promessas, porque às vezes (por exemplo, no escopo externo) temos que usar esses métodos. Também Promise.allé bom quando estamos esperando por muitas tarefas simultaneamente.

*/

