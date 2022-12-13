/*

Agendamento: setTimeout e setInterval
Podemos decidir executar uma função não agora, mas em um determinado momento mais tarde. Isso é chamado de “agendar uma chamada”.

Existem dois métodos para isso:

setTimeoutnos permite executar uma função uma vez após o intervalo de tempo.
setIntervalnos permite executar uma função repetidamente, começando após o intervalo de tempo e repetindo continuamente nesse intervalo.
Esses métodos não fazem parte da especificação do JavaScript. Mas a maioria dos ambientes possui o agendador interno e fornece esses métodos. Em particular, eles são suportados em todos os navegadores e Node.js.

setTimeout
A sintaxe:

let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

Parâmetros:

func|code
Função ou uma string de código a ser executada. Normalmente, isso é uma função. Por razões históricas, uma string de código pode ser passada, mas isso não é recomendado.
delay
O atraso antes da execução, em milissegundos (1000 ms = 1 segundo), por padrão 0.
arg1, arg2…
Argumentos para a função
Por exemplo, este código chama sayHi()após um segundo:

*/

function sayHi() {
   alert('Hello');
}

setTimeout(sayHi, 1000);

// Com argumentos:

function sayHi(phrase, who) {
   alert( phrase + ', ' + who );
}

setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John

/*

Se o primeiro argumento for uma string, o JavaScript criará uma função a partir dela.

Então, isso também funcionará:

*/

setTimeout("alert('Hello')", 1000);

// Mas usar strings não é recomendado, use funções de seta ao invés delas, assim:

setTimeout(() => alert('Hello'), 1000);

/*

Passe uma função, mas não a execute
Os desenvolvedores novatos às vezes cometem um erro adicionando colchetes ()após a função:

// wrong!
setTimeout(sayHi(), 1000);
Isso não funciona, porque setTimeoutespera uma referência a uma função. E aqui sayHi()executa a função, e o resultado de sua execução é passado para setTimeout. No nosso caso, o resultado de sayHi()é undefined(a função não retorna nada), então nada é agendado.

Cancelando com clearTimeout
Uma chamada para setTimeoutretorna um “identificador de timer” timerIdque podemos usar para cancelar a execução.

A sintaxe para cancelar:

let timerId = setTimeout(...);
clearTimeout(timerId);
No código abaixo, agendamos a função e depois cancelamos (mudamos de ideia). Como resultado, nada acontece:

*/

let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // timer identifier

clearTimeout(timerId);
alert(timerId); // same identifier (doesn't become null after canceling)

/*

Como podemos ver na alertsaída, em um navegador, o identificador do timer é um número. Em outros ambientes, isso pode ser outra coisa. Por exemplo, Node.js retorna um objeto timer com métodos adicionais.

Novamente, não há especificação universal para esses métodos, então tudo bem.

Para navegadores, os cronômetros são descritos na seção de cronômetros do HTML Living Standard.

setInterval
O setIntervalmétodo tem a mesma sintaxe que setTimeout:

let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
Todos os argumentos têm o mesmo significado. Mas, ao contrário, setTimeoutexecuta a função não apenas uma vez, mas regularmente após um determinado intervalo de tempo.

Para interromper novas chamadas, devemos chamar clearInterval(timerId).

O exemplo a seguir mostrará a mensagem a cada 2 segundos. Após 5 segundos, a saída é interrompida:

*/

// repeat with the interval of 2 seconds
let timerId2 = setInterval(() => alert('tick'), 2000);

// after 5 seconds stop
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);

/*

O tempo passa enquanto alerté mostrado
Na maioria dos navegadores, incluindo Chrome e Firefox, o cronômetro interno continua “marcando” enquanto exibe alert/confirm/prompt.

Portanto, se você executar o código acima e não fechar a alertjanela por algum tempo, a próxima alertserá exibida imediatamente quando você fizer isso. O intervalo real entre os alertas será menor que 2 segundos.

SetTimeout aninhado
Existem duas maneiras de executar algo regularmente.

Um é setInterval. O outro é um nested setTimeout, assim:

*/

/** instead of:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId3 = setTimeout(function tick() {
   alert('tick');
   timerId3 = setTimeout(tick, 2000); // (*)
}, 2000)

/*

O setTimeoutacima agenda a próxima chamada logo no final da atual (*).

O aninhado setTimeouté um método mais flexível do que setInterval. Desta forma, a próxima chamada pode ser agendada de forma diferente, dependendo dos resultados da atual.

Por exemplo, precisamos escrever um serviço que envie uma requisição ao servidor a cada 5 segundos solicitando dados, mas caso o servidor esteja sobrecarregado deve aumentar o intervalo para 10, 20, 40 segundos…

Aqui está o pseudocódigo:

let delay = 5000;

let timerId = setTimeout(function request() {
  ...send request...

  if (request failed due to server overload) {
    // increase the interval to the next run
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
E se as funções que estamos agendando consomem muita CPU, podemos medir o tempo gasto pela execução e planejar a próxima chamada mais cedo ou mais tarde.

Nested setTimeoutpermite definir o atraso entre as execuções com mais precisão do que setInterval.

Vamos comparar dois fragmentos de código. A primeira usa setInterval:

*/

let i = 1;
setInterval(function() {
  func(i++);
}, 100);

// O segundo usa aninhado setTimeout:

let j = 1;
setTimeout(function run() {
  func(j++);
  setTimeout(run, 100);
}, 100);

/*

Para setIntervalo agendador interno será executado func(i++)a cada 100ms:


Você notou?

O atraso real entre funcas chamadas setIntervalé menor do que no código!

Isso é normal, pois o tempo de funcexecução de 'consome' parte do intervalo.

É possível que funca execução de seja mais longa do que esperávamos e leve mais de 100ms.

Neste caso, o mecanismo aguarda funca conclusão, verifica o agendador e, se o tempo acabar, executa-o novamente imediatamente .

No caso extremo, se a função sempre for executada por mais tempo do que delayms, as chamadas acontecerão sem nenhuma pausa.

E aqui está a imagem para o aninhado setTimeout:

O aninhado setTimeoutgarante o atraso fixo (aqui 100ms).

Isso porque uma nova ligação está prevista ao final da anterior.

Coleta de lixo e callback setInterval/setTimeout
Quando uma função é passada em setInterval/setTimeout, uma referência interna é criada para ela e salva no agendador. Isso evita que a função seja coletada como lixo, mesmo que não haja outras referências a ela.

// the function stays in memory until the scheduler calls it
setTimeout(function() {...}, 100);
Pois setIntervala função fica na memória até clearIntervalser chamada.

Há um efeito colateral. Uma função faz referência ao ambiente lexical externo, portanto, enquanto ela existir, as variáveis ​​externas também existirão. Eles podem ocupar muito mais memória do que a função em si. Então, quando não precisarmos mais da função agendada, é melhor cancelá-la, mesmo que seja muito pequena.

Zero atraso setTimeout
Há um caso de uso especial: setTimeout(func, 0), ou apenas setTimeout(func).

Isso agenda a execução funco mais rápido possível. Mas o planejador o invocará somente após a conclusão do script em execução no momento.

Portanto, a função está programada para ser executada “logo após” o script atual.

Por exemplo, isso gera “Olá” e imediatamente “Mundo”:

*/

setTimeout(() => alert("World"));

alert("Hello");

/*

A primeira linha “coloca a chamada no calendário após 0ms”. Mas o agendador só irá “verificar o calendário” depois que o script atual for concluído, então "Hello"é primeiro e "World"– depois dele.

Há também casos de uso avançados relacionados ao navegador de tempo limite de atraso zero, que discutiremos no capítulo Loop de eventos: microtarefas e macrotarefas .

O atraso zero não é de fato zero (em um navegador)
No navegador, há uma limitação de quantas vezes os temporizadores aninhados podem ser executados. O HTML Living Standard diz: “após cinco temporizadores aninhados, o intervalo é forçado a ser de pelo menos 4 milissegundos.”.

Vamos demonstrar o que significa com o exemplo abaixo. A setTimeoutchamada nele se reagenda com atraso zero. Cada chamada lembra o tempo real da anterior na timesmatriz. Como são os verdadeiros atrasos? Vamos ver:

*/

let start = Date.now();
let times = [];

setTimeout(function run() {
   times.push(Date.now() - start); // remember delay from the previous call

   if (start + 100 < Date.now()) alert(times); // show the delays after 100ms
   else setTimeout(run); // else re-schedule
});

// an example of the output:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100

/*

Os primeiros temporizadores são executados imediatamente (exatamente como está escrito na especificação) e, em seguida, vemos 9, 15, 20, 24.... O atraso obrigatório de 4+ ms entre invocações entra em ação.

A mesma coisa acontece se usarmos setIntervalem vez de setTimeout: setInterval(f)executa falgumas vezes com atraso zero e depois com atraso de 4+ ms.

Essa limitação vem desde os tempos antigos e muitos scripts dependem dela, por isso existe por razões históricas.

Para JavaScript do lado do servidor, essa limitação não existe e existem outras maneiras de agendar uma tarefa assíncrona imediata, como setImmediate para Node.js. Portanto, esta nota é específica do navegador.

Resumo
Métodos setTimeout(func, delay, ...args)e setInterval(func, delay, ...args)nos permitem executar uma funcvez/regularmente após delaymilissegundos.
Para cancelar a execução, devemos chamar clearTimeout/clearIntervalcom o valor retornado por setTimeout/setInterval.
As chamadas aninhadas setTimeoutsão uma alternativa mais flexível para setInterval, permitindo definir o tempo entre as execuções com mais precisão.
O agendamento de atraso zero com setTimeout(func, 0)(o mesmo que setTimeout(func)) é usado para agendar a chamada “o mais rápido possível, mas após a conclusão do script atual”.
O navegador limita o atraso mínimo para cinco ou mais chamadas aninhadas de setTimeoutou para setInterval(após a 5ª chamada) a 4ms. Isso por razões históricas.
Observe que todos os métodos de agendamento não garantem o atraso exato.

Por exemplo, o cronômetro do navegador pode ficar lento por vários motivos:

A CPU está sobrecarregada.
A guia do navegador está no modo de segundo plano.
O laptop está no modo de economia de bateria.

Tudo isso pode aumentar a resolução mínima do timer (o atraso mínimo) para 300 ms ou até 1000 ms, dependendo do navegador e das configurações de desempenho no nível do sistema operacional.

*/

