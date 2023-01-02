/*

Microtarefas
Manipuladores de promessa .then/ .catch/ .finallysão sempre assíncronos.

Mesmo quando uma promessa é resolvida imediatamente , o código nas linhas abaixo .then // ainda será executado antes desses manipuladores..catch.finally

Aqui está uma demonstração:

*/

let promise = Promise.resolve();

promise.then(() => alert("promise done!"));

alert("code finished"); // this alert show first

/*

Se você executá-lo, verá code finishedprimeiro e depois promise done!.

Isso é estranho, porque a promessa é definitivamente feita desde o início.

Por que o .thengatilho depois? O que está acontecendo?

fila de microtarefas
Tarefas assíncronas precisam de gerenciamento adequado. Para isso, o padrão ECMA especifica uma fila interna PromiseJobs, mais frequentemente chamada de “fila de microtarefas” (termo V8).

Conforme indicado na especificação :

A fila é primeiro a entrar, primeiro a sair: as tarefas enfileiradas primeiro são executadas primeiro.
A execução de uma tarefa é iniciada apenas quando nada mais está em execução.
Ou, para simplificar, quando uma promessa está pronta, seus .then/catch/finallymanipuladores são colocados na fila; eles ainda não foram executados. Quando o mecanismo JavaScript fica livre do código atual, ele pega uma tarefa da fila e a executa.

É por isso que “código finalizado” no exemplo acima aparece primeiro.

Os manipuladores de promessa sempre passam por essa fila interna.

Se houver uma cadeia com vários .then/catch/finally, cada um deles será executado de forma assíncrona. Ou seja, ele primeiro é colocado na fila e, em seguida, executado quando o código atual é concluído e os manipuladores enfileirados anteriormente são concluídos.

E se o pedido for importante para nós? Como podemos fazer code finishedaparecer depois promise done?

Fácil, basta colocá-lo na fila com .then:

*/

Promise.resolve()
   .then(() => alert("promise done!"))
   .then(() => alert("code finished"));

/*

Agora a ordem é como pretendida.

Rejeição não tratada
Lembre-se do unhandledrejectionevento do artigo Tratamento de erros com promessas ?

Agora podemos ver exatamente como o JavaScript descobre que houve uma rejeição não tratada.

Uma “rejeição não tratada” ocorre quando um erro de promessa não é tratado no final da fila de microtarefas.

Normalmente, se esperamos um erro, adicionamos .catchà cadeia de promessas para tratá-lo:

*/

let promise2 = Promise.reject(new Error("Promise Failed!"));
promise2.catch(err => alert('caught'));

// doesn't run: error handled
window.addEventListener('unhandledrejection', event => alert(event.reason));

// Mas se esquecermos de adicionar .catch, então, depois que a fila de microtask estiver vazia, o mecanismo acionará o evento:

let promise3 = Promise.reject(new Error("Promise Failed!"));

// Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));

// E se lidarmos com o erro mais tarde? Assim:

let promise4 = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise.catch(err => alert('caught')), 1000);

// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));

/*

Agora, se executarmos, veremos Promise Failed!primeiro e depois caught.

Se não soubéssemos da fila de microtasks, poderíamos nos perguntar: “Por que o unhandledrejectionhandler foi executado? Nós detectamos e lidamos com o erro!”

Mas agora entendemos que unhandledrejectioné gerado quando a fila de microtask é concluída: o mecanismo examina as promessas e, se alguma delas estiver no estado “rejeitado”, o evento é acionado.

No exemplo acima, .catchadicionado por setTimeouttambém gatilhos. Mas o faz depois, depois unhandledrejectionque já ocorreu, então não muda nada.

Resumo
A manipulação de promessas é sempre assíncrona, pois todas as ações de promessa passam pela fila interna de “tarefas de promessa”, também chamada de “fila de microtarefas” (termo V8).

Portanto .then/catch/finally, os manipuladores são sempre chamados após o término do código atual.

Se precisarmos garantir que um trecho de código seja executado após .then/catch/finally, podemos adicioná-lo a uma .thenchamada encadeada.

Na maioria dos mecanismos Javascript, incluindo navegadores e Node.js, o conceito de microtarefas está intimamente ligado ao “loop de eventos” e às “macrotarefas”. Como elas não têm relação direta com as promessas, elas são abordadas em outra parte do tutorial, no artigo Event loop: microtasks and macrotasks .

*/