/*

encadeamento de promessas
Vamos voltar ao problema mencionado no capítulo Introdução: callbacks : temos uma sequência de tarefas assíncronas a serem executadas uma após a outra — por exemplo, carregar scripts. Como podemos codificá-lo bem?

As promessas fornecem algumas receitas para fazer isso.

Neste capítulo, abordamos o encadeamento de promessas.

Se parece com isso:

*/

new Promise(function (resolve, reject) {

   setTimeout(() => resolve(1), 1000); // (*)

}).then(function (result) { // (**)

   alert(result); // 1
   return result * 2;

}).then(function (result) { // (***)

   alert(result); // 2
   return result * 2;

}).then(function (result) {

   alert(result); // 4
   return result * 2;

});

/*

A ideia é que o resultado seja passado pela cadeia de .thenmanipuladores.

Aqui o fluxo é:

1. A promessa inicial resolve em 1 segundo (*),
2. Em seguida, o .thenmanipulador é chamado (**), que por sua vez cria uma nova promessa (resolvida com 2valor).
3. O próximo then (***)pega o resultado do anterior, processa (dobra) e passa para o próximo manipulador.
4. …e assim por diante.

À medida que o resultado é passado pela cadeia de manipuladores, podemos ver uma sequência de alertchamadas: 1→ 2→ 4.

A coisa toda funciona, porque cada chamada para a .thenretorna uma nova promessa, para que possamos chamar a próxima .thennela.

Quando um manipulador retorna um valor, ele se torna o resultado dessa promessa, então o próximo .thené chamado com ele.

Um erro clássico de novato: tecnicamente, também podemos adicionar muitos .thena uma única promessa. Isso não é encadeamento.

Por exemplo:

*/

let promise = new Promise(function (resolve, reject) {
   setTimeout(() => resolve(1), 1000);
});

promise.then(function (result) {
   alert(result); // 1
   return result * 2;
});

promise.then(function (result) {
   alert(result); // 1
   return result * 2;
});

promise.then(function (result) {
   alert(result); // 1
   return result * 2;
});

/*

O que fizemos aqui são apenas vários manipuladores para uma promessa. Eles não passam o resultado um para o outro; em vez disso, eles o processam independentemente.

Aqui está a imagem (compare com o encadeamento acima):

Todos .thenna mesma promessa obtêm o mesmo resultado – o resultado dessa promessa. Portanto, no código acima alert, mostre o mesmo: 1.

Na prática, raramente precisamos de vários manipuladores para uma promessa. O encadeamento é usado com muito mais frequência.

Devolvendo promessas
Um manipulador, usado em .then(handler)pode criar e retornar uma promessa.

Nesse caso, outros manipuladores esperam até que ele se estabilize e obtenham seu resultado.

Por exemplo:

*/

new Promise(function (resolve, reject) {

   setTimeout(() => resolve(1), 1000);

}).then(function (result) {

   alert(result); // 1

   return new Promise((resolve, reject) => { // (*)
      setTimeout(() => resolve(result * 2), 1000);
   });

}).then(function (result) { // (**)

   alert(result); // 2

   return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
   });

}).then(function (result) {

   alert(result); // 4

});

/*

Aqui o primeiro .thenmostra 1e retorna new Promise(…)na linha (*). Após um segundo, ele é resolvido e o resultado (o argumento de resolve, aqui está result * 2) é passado para o manipulador do segundo .then. Esse manipulador está na linha (**), ele mostra 2e faz a mesma coisa.

Portanto, a saída é a mesma do exemplo anterior: 1 → 2 → 4, mas agora com 1 segundo de atraso entre alertas chamadas.

Retornar promessas nos permite construir cadeias de ações assíncronas.

Exemplo: loadScript
Vamos usar esse recurso com o promisified loadScript, definido no capítulo anterior , para carregar os scripts um a um, na sequência:

*/

loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // use functions declared in scripts
    // to show that they indeed loaded
    one();
    two();
    three();
  });

// Este código pode ser um pouco mais curto com funções de seta:

loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // scripts are loaded, we can use functions declared there
    one();
    two();
    three();
  });

/*

Aqui, cada loadScriptchamada retorna uma promessa e a próxima .thené executada quando ela é resolvida. Em seguida, inicia o carregamento do próximo script. Portanto, os scripts são carregados um após o outro.

Podemos adicionar mais ações assíncronas à cadeia. Observe que o código ainda é "plano" - ele cresce para baixo, não para a direita. Não há sinais da “pirâmide da desgraça”.

Tecnicamente, poderíamos adicionar .thendiretamente a cada um loadScript, assim:

*/

loadScript("/article/promise-chaining/one.js").then(script1 => {
   loadScript("/article/promise-chaining/two.js").then(script2 => {
     loadScript("/article/promise-chaining/three.js").then(script3 => {
       // this function has access to variables script1, script2 and script3
       one();
       two();
       three();
     });
   });
 });

/*

Este código faz o mesmo: carrega 3 scripts em sequência. Mas “cresce para a direita”. Portanto, temos o mesmo problema dos retornos de chamada.

As pessoas que começam a usar promessas às vezes não sabem nada sobre encadeamento, então escrevem dessa forma. Geralmente, o encadeamento é preferido.

Às vezes, não há problema em escrever .thendiretamente, porque a função aninhada tem acesso ao escopo externo. No exemplo acima, o callback mais aninhado tem acesso a todas as variáveis script1​​, script2, script3. Mas isso é uma exceção e não uma regra.

Thenables
Para ser preciso, um manipulador pode retornar não exatamente uma promessa, mas um chamado objeto “thenable” – um objeto arbitrário que possui um método .then. Será tratado da mesma forma que uma promessa.

A ideia é que as bibliotecas de terceiros possam implementar seus próprios objetos "compatíveis com a promessa". Eles podem ter um conjunto estendido de métodos, mas também ser compatíveis com as promessas nativas, porque implementam .then.

Aqui está um exemplo de um objeto entável:

*/

class Thenable {
   constructor(num) {
      this.num = num;
   }
   then(resolve, reject) {
      alert(resolve); // function() { native code }
      // resolve with this.num*2 after the 1 second
      setTimeout(() => resolve(this.num * 2), 1000); // (**)
   }
}

new Promise(resolve => resolve(1))
   .then(result => {
      return new Thenable(result); // (*)
   })
   .then(alert); // show 2 after  1000ms

/*

O JavaScript verifica o objeto retornado pelo .thenmanipulador na linha (*): se ele tiver um método chamável chamado then, ele chama esse método fornecendo funções nativas resolve, rejectcomo argumentos (semelhantes a um executor) e espera até que um deles seja chamado. No exemplo acima resolve(2)é chamado após 1 segundo (**). Em seguida, o resultado é passado adiante na cadeia.

Esse recurso nos permite integrar objetos personalizados com cadeias de promessa sem ter que herdar de Promise.

Exemplo maior: buscar
Na programação front-end, as promessas costumam ser usadas para solicitações de rede. Então, vamos ver um exemplo estendido disso.

Usaremos o método fetch para carregar as informações sobre o usuário do servidor remoto. Ele tem muitos parâmetros opcionais abordados em capítulos separados , mas a sintaxe básica é bastante simples:

let promise = fetch(url);
Isso faz uma solicitação de rede para o urle retorna uma promessa. A promessa é resolvida com um responseobjeto quando o servidor remoto responde com cabeçalhos, mas antes que a resposta completa seja baixada .

Para ler a resposta completa, devemos chamar o método response.text(): ele retorna uma promessa que resolve quando o texto completo é baixado do servidor remoto, com esse texto como resultado.

O código abaixo faz uma requisição user.jsone carrega seu texto do servidor:

*/

fetch('/article/promise-chaining/user.json')
  // .then below runs when the remote server responds
  .then(function(response) {
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function(text) {
    // ...and here's the content of the remote file
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });

/*

O responseobjeto retornado fetchtambém inclui o método response.json()que lê os dados remotos e os analisa como JSON. No nosso caso, isso é ainda mais conveniente, então vamos mudar para ele.

Também usaremos funções de seta para abreviar:

*/

// same as above, but response.json() parses the remote content as JSON
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan, got user name

/*

Agora vamos fazer algo com o usuário carregado.

Por exemplo, podemos fazer mais uma solicitação ao GitHub, carregar o perfil do usuário e mostrar o avatar:

*/

// Make a request for user.json
fetch('/article/promise-chaining/user.json')
  // Load it as json
  .then(response => response.json())
  // Make a request to GitHub
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Load the response as json
  .then(response => response.json())
  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });

/*

O código funciona; ver comentários sobre os detalhes. No entanto, há um problema potencial nisso, um erro típico de quem começa a usar promessas.

Olhe para a linha (*): como podemos fazer algo depois que o avatar terminou de aparecer e foi removido? Por exemplo, gostaríamos de mostrar um formulário para editar esse usuário ou outra coisa. Por enquanto não tem como.

Para tornar a cadeia extensível, precisamos retornar uma promessa que seja resolvida quando o avatar terminar de ser exibido.

Assim:

*/

fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser); // (**)
    }, 3000);
  }))
  // triggers after 3 seconds
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));

/*

Ou seja, o .thenhandler in line (*)agora retorna new Promise, que só é liquidado após a chamada de resolve(githubUser)in setTimeout (**). O próximo .thenna cadeia esperará por isso.

Como boa prática, uma ação assíncrona sempre deve retornar uma promessa. Isso possibilita planejar ações a partir dele; mesmo que não planejemos estender a cadeia agora, podemos precisar dela mais tarde.

Finalmente, podemos dividir o código em funções reutilizáveis:

*/

function loadJson(url) {
   return fetch(url).then(response => response.json());
}

function loadGithubUser(name) {
   return loadJson(`https://api.github.com/users/${name}`)
}

function showAvatar(githubUser) {
   return new Promise(function(resolve, reject) {
      let img = document.createElement('img')
      img.src = githubUser.avatar_url
      img.className = "promise-avatar-example";
      document.body.append(img);

      setTimeout(() => {
         img.remove();
         resolve(githubUser);
      }, 3000);
   });
}

function loadJson(url) {
   return fetch(url)
     .then(response => response.json());
 }
 
 function loadGithubUser(name) {
   return loadJson(`https://api.github.com/users/${name}`);
 }
 
 function showAvatar(githubUser) {
   return new Promise(function(resolve, reject) {
     let img = document.createElement('img');
     img.src = githubUser.avatar_url;
     img.className = "promise-avatar-example";
     document.body.append(img);
 
     setTimeout(() => {
       img.remove();
       resolve(githubUser);
     }, 3000);
   });
 }
 
 // Use them:
 loadJson('/article/promise-chaining/user.json')
   .then(user => loadGithubUser(user.name))
   .then(showAvatar)
   .then(githubUser => alert(`Finished showing ${githubUser.name}`));
   // ...

/*

Resumo
Se um manipulador .then(ou catch/finally, não importa) retornar uma promessa, o resto da cadeia espera até que seja resolvido. Quando isso acontece, seu resultado (ou erro) é passado adiante.

Aqui está uma foto completa:

*/

