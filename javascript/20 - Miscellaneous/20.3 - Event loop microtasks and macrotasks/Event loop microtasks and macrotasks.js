/*

Loop de eventos: microtarefas e macrotarefas
O fluxo de execução do JavaScript do navegador, assim como no Node.js, é baseado em um loop de eventos .

Compreender como o loop de eventos funciona é importante para otimizações e, às vezes, para a arquitetura certa.

Neste capítulo, primeiro cobrimos detalhes teóricos sobre como as coisas funcionam e, em seguida, vemos as aplicações práticas desse conhecimento.

Loop de eventos
O conceito de loop de eventos é muito simples. Há um loop infinito, onde o mecanismo JavaScript espera por tarefas, as executa e depois dorme, esperando por mais tarefas.

O algoritmo geral do motor:

Enquanto houver tarefas:
executá-los, começando com a tarefa mais antiga.
Durma até que uma tarefa apareça, então vá para 1.
Essa é uma formalização do que vemos ao navegar em uma página. O mecanismo JavaScript não faz nada na maioria das vezes, ele só é executado se um script/manipulador/evento for ativado.

Exemplos de tarefas:

Quando um script externo é <script src="...">carregado, a tarefa é executá-lo.
Quando um usuário move o mouse, a tarefa é despachar mousemoveeventos e executar manipuladores.
Quando chega a hora de um agendado setTimeout, a tarefa deve executar seu retorno de chamada.
…e assim por diante.
As tarefas são definidas - o mecanismo as manipula - e aguarda mais tarefas (enquanto dorme e consome quase zero CPU).

Pode acontecer que uma tarefa chegue enquanto o motor está ocupado, então ela é enfileirada.

As tarefas formam uma fila, denominada “fila de macrotarefas” (termo v8):


Por exemplo, enquanto o motor está ocupado executando um script, um usuário pode mover o mouse causando mousemove, e setTimeoutpode ser devido e assim por diante, essas tarefas formam uma fila, conforme ilustrado na figura acima.

As tarefas da fila são processadas na base do “primeiro a chegar – primeiro a ser servido”. Quando o navegador do mecanismo termina com o script, ele manipula o mousemoveevento, depois o setTimeoutmanipulador e assim por diante.

Até aí, bem simples, certo?

Mais dois detalhes:

A renderização nunca acontece enquanto o mecanismo executa uma tarefa. Não importa se a tarefa leva muito tempo. As alterações no DOM são pintadas somente após a conclusão da tarefa.
Se uma tarefa demorar muito, o navegador não poderá realizar outras tarefas, como processar eventos do usuário. Então, depois de um tempo, ele gera um alerta como “Página sem resposta”, sugerindo encerrar a tarefa com a página inteira. Isso acontece quando há muitos cálculos complexos ou um erro de programação levando a um loop infinito.
Essa era a teoria. Agora vamos ver como podemos aplicar esse conhecimento.

Caso de uso 1: divisão de tarefas que consomem muita CPU
Digamos que temos uma tarefa com muita CPU.

Por exemplo, realce de sintaxe (usado para colorir exemplos de código nesta página) é bastante pesado para a CPU. Para destacar o código, ele realiza a análise, cria muitos elementos coloridos, adiciona-os ao documento – para uma grande quantidade de texto que leva muito tempo.

Enquanto o mecanismo está ocupado com realce de sintaxe, ele não pode fazer outras coisas relacionadas ao DOM, processar eventos do usuário etc.

Podemos evitar problemas dividindo a grande tarefa em partes. Destaque as primeiras 100 linhas, depois agende setTimeout(com atraso zero) para as próximas 100 linhas e assim por diante.

Para demonstrar essa abordagem, para simplificar, em vez de realçar o texto, vamos usar uma função que conta de 1até 1000000000.

Se você executar o código abaixo, o mecanismo irá “travar” por algum tempo. Para JS do lado do servidor, isso é claramente perceptível e, se você estiver executando no navegador, tente clicar em outros botões na página - você verá que nenhum outro evento será tratado até que a contagem termine.

*/

let i = 0;

let start = Date.now();

function count() {

   // do a heavy job
   for (let j = 0; j < 1e9; j++) {
      i++;
   }
   alert("Done in " + (Date.now() - start) + 'ms');
}

count();

/*

O navegador pode até mostrar um aviso “o script demora muito”.

Vamos dividir o trabalho usando setTimeoutchamadas aninhadas:

*/

let i2 = 0;

let start2 = Date.now();

function count() {

  // do a piece of the heavy job (*)
  do {
    i2++;
  } while (i2 % 1e6 != 0);

  if (i2 == 1e9) {
    alert("Done in " + (Date.now() - start2) + 'ms');
  } else {
    setTimeout(count); // schedule the new call (**)
  }

}

count();

/*

Agora a interface do navegador está totalmente funcional durante o processo de “contagem”.

Uma única execução de countfaz uma parte do trabalho (*)e, em seguida, reprograma-se, (**)se necessário:

A primeira corrida conta: i=1...1000000.
A segunda corrida conta: i=1000001..2000000.
…e assim por diante.
Agora, se uma nova tarefa secundária (por exemplo onclick, evento) aparecer enquanto o mecanismo estiver ocupado executando a parte 1, ela será enfileirada e executada quando a parte 1 terminar, antes da próxima parte. Os retornos periódicos ao loop de eventos entre as countexecuções fornecem “ar” suficiente para o mecanismo JavaScript fazer outra coisa, para reagir a outras ações do usuário.

O notável é que ambas as variantes – com e sem divisão do trabalho setTimeout– são comparáveis ​​em velocidade. Não há muita diferença no tempo total de contagem.

Para aproximá-los, vamos fazer uma melhoria.

Vamos mover o agendamento para o início do count():

*/

let i3 = 0;

let start3 = Date.now();

function count() {

  // move the scheduling to the beginning
  if (i3 < 1e9 - 1e6) {
    setTimeout(count); // schedule the new call
  }

  do {
    timerId3++;
  } while (i % 1e6 != 0);

  if (i3 == 1e9) {
    alert("Done in " + (Date.now() - start3) + 'ms');
  }

}

count();

/*

Agora, quando começamos count()e vemos que precisaremos de count()mais, agendamos isso imediatamente, antes de fazer o trabalho.

Se você executá-lo, é fácil perceber que leva muito menos tempo.

Porque?

É simples: como você se lembra, há um atraso mínimo no navegador de 4 ms para muitas setTimeoutchamadas aninhadas. Mesmo se definirmos 0, é 4ms(ou um pouco mais). Portanto, quanto mais cedo agendarmos, mais rápido ele será executado.

Por fim, dividimos uma tarefa que exige muita CPU em partes – agora ela não bloqueia a interface do usuário. E seu tempo de execução geral não é muito maior.

Caso de uso 2: indicação de progresso
Outro benefício de dividir tarefas pesadas para scripts de navegador é que podemos mostrar a indicação de progresso.

Conforme mencionado anteriormente, as alterações no DOM são pintadas somente após a conclusão da tarefa em execução no momento, independentemente de quanto tempo demore.

Por um lado, isso é ótimo, porque nossa função pode criar muitos elementos, adicioná-los um a um ao documento e alterar seus estilos – o visitante não verá nenhum estado “intermediário” inacabado. Uma coisa importante, certo?

Aqui está a demonstração, as alterações em inão aparecerão até que a função termine, então veremos apenas o último valor:

<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
…Mas também podemos querer mostrar algo durante a tarefa, por exemplo, uma barra de progresso.

Se dividirmos a tarefa pesada em partes usando setTimeout, as alterações serão pintadas entre elas.

Este fica mais bonito:

<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // do a piece of the heavy job (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }

  }

  count();
</script>
Agora o <div>mostra valores crescentes de i, uma espécie de barra de progresso.

Caso de uso 3: fazer algo depois do evento
Em um manipulador de eventos, podemos decidir adiar algumas ações até que o evento surja e seja tratado em todos os níveis. Podemos fazer isso envolvendo o código em atraso zero setTimeout.

No capítulo Despachando eventos customizados vimos um exemplo: o evento customizado menu-opené despachado em setTimeout, para que ocorra após o evento “click” ser totalmente tratado.

menu.onclick = function() {
  // ...

  // create a custom event with the clicked menu item data
  let customEvent = new CustomEvent("menu-open", {
    bubbles: true
  });

  // dispatch the custom event asynchronously
  setTimeout(() => menu.dispatchEvent(customEvent));
};

Macrotarefas e Microtarefas
Junto com as macrotarefas , descritas neste capítulo, existem as microtarefas , mencionadas no capítulo Microtarefas .

As microtarefas vêm exclusivamente do nosso código. Eles geralmente são criados por promessas: uma execução do .then/catch/finallymanipulador se torna uma microtarefa. As microtarefas também são usadas “por baixo da capa” await, pois é outra forma de lidar com promessas.

Há também uma função especial queueMicrotask(func)que enfileira funcpara execução na fila de microtarefas.

Imediatamente após cada macrotarefa , o mecanismo executa todas as tarefas da fila de microtarefas , antes de executar qualquer outra macrotarefa ou renderização ou qualquer outra coisa.

Por exemplo, dê uma olhada:

setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
Qual vai ser a ordem aqui?

codemostra primeiro, porque é uma chamada síncrona regular.
promisemostra o segundo, porque .thenpassa pela fila de microtarefas e é executado após o código atual.
timeoutmostra por último, porque é uma macrotarefa.
A imagem do loop de eventos mais rica se parece com isso (a ordem é de cima para baixo, ou seja: o script primeiro, depois as microtarefas, a renderização e assim por diante):


Todas as microtarefas são concluídas antes que qualquer outra manipulação ou renderização de evento ou qualquer outra macrotarefa ocorra.

Isso é importante, pois garante que o ambiente do aplicativo seja basicamente o mesmo (sem alterações nas coordenadas do mouse, sem novos dados de rede etc.) entre as microtarefas.

Se quisermos executar uma função de forma assíncrona (após o código atual), mas antes que as alterações sejam renderizadas ou novos eventos tratados, podemos agendá-la com queueMicrotask.

Aqui está um exemplo com “barra de progresso de contagem”, semelhante ao mostrado anteriormente, mas queueMicrotaské usado em vez de setTimeout. Você pode ver que ele renderiza bem no final. Assim como o código síncrono:

<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // do a piece of the heavy job (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
      queueMicrotask(count);
    }

  }

  count();
</script>
Resumo
Um algoritmo de loop de eventos mais detalhado (embora ainda simplificado em comparação com a especificação ):

Retire da fila e execute a tarefa mais antiga da fila de macrotarefas (por exemplo, “script”).
Execute todas as microtarefas :
Enquanto a fila de microtask não estiver vazia:
Remova a fila e execute a microtarefa mais antiga.
Renderize as alterações, se houver.
Se a fila de macrotarefas estiver vazia, aguarde até que apareça uma macrotarefa.
Vá para a etapa 1.
Para agendar uma nova macrotarefa :

Use zero atrasado setTimeout(f).
Isso pode ser usado para dividir uma grande tarefa pesada de cálculo em partes, para que o navegador seja capaz de reagir aos eventos do usuário e mostrar o progresso entre eles.

Além disso, usado em manipuladores de eventos para agendar uma ação após o evento ser totalmente manipulado (bubbling concluído).

Para agendar uma nova microtarefa

Use queueMicrotask(f).
Prometa também que os manipuladores passam pela fila de microtarefas.
Não há interface do usuário ou manipulação de eventos de rede entre as microtarefas: elas são executadas imediatamente uma após a outra.

Portanto, pode-se desejar queueMicrotaskexecutar uma função de forma assíncrona, mas dentro do estado do ambiente.

Trabalhadores da Web
Para cálculos longos e pesados ​​que não devem bloquear o loop de eventos, podemos usar Web Workers .

Essa é uma maneira de executar o código em outro thread paralelo.

Os Web Workers podem trocar mensagens com o processo principal, mas eles têm suas próprias variáveis ​​e seu próprio loop de eventos.

Os Web Workers não têm acesso ao DOM, portanto são úteis, principalmente, para cálculos, para usar vários núcleos de CPU simultaneamente.

*/