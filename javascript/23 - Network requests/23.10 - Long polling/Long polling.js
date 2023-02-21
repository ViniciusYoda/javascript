/*

Pesquisa longa
Long polling é a maneira mais simples de ter conexão persistente com o servidor, que não usa nenhum protocolo específico como WebSocket ou Server Sent Events.

Sendo muito fácil de implementar, também é bom o suficiente em muitos casos.

Votação regular
A maneira mais simples de obter novas informações do servidor é o polling periódico. Ou seja, solicitações regulares ao servidor: “Olá, estou aqui, você tem alguma informação para mim?”. Por exemplo, uma vez a cada 10 segundos.

Em resposta, o servidor primeiro avisa a si mesmo que o cliente está online e, em segundo lugar, envia um pacote de mensagens recebidas até aquele momento.

Isso funciona, mas há desvantagens:

As mensagens são passadas com um atraso de até 10 segundos (entre solicitações).
Mesmo que não haja mensagens, o servidor é bombardeado com solicitações a cada 10 segundos, mesmo que o usuário tenha mudado para outro lugar ou esteja dormindo. É uma carga e tanto para lidar, falando em termos de desempenho.
Então, se estamos falando de um serviço muito pequeno, a abordagem pode até ser viável, mas no geral, precisa ser melhorada.

Pesquisa longa
A chamada “polling longa” é uma maneira muito melhor de pesquisar o servidor.

Também é muito fácil de implementar e entrega mensagens sem atrasos.

O fluxo:

Uma solicitação é enviada ao servidor.
O servidor não fecha a conexão até que tenha uma mensagem para enviar.
Quando uma mensagem aparece – o servidor responde à solicitação com ela.
O navegador faz uma nova solicitação imediatamente.
Essa situação, em que o navegador enviou uma solicitação e mantém uma conexão pendente com o servidor, é padrão para esse método. Somente quando uma mensagem é entregue, a conexão é fechada e restabelecida.


Se a conexão for perdida devido, digamos, a um erro de rede, o navegador enviará imediatamente uma nova solicitação.

Um esboço da subscribefunção do lado do cliente que faz solicitações longas:

async function subscribe() {
  let response = await fetch("/subscribe");

  if (response.status == 502) {
    // Status 502 is a connection timeout error,
    // may happen when the connection was pending for too long,
    // and the remote server or a proxy closed it
    // let's reconnect
    await subscribe();
  } else if (response.status != 200) {
    // An error - let's show it
    showMessage(response.statusText);
    // Reconnect in one second
    await new Promise(resolve => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    // Get and show the message
    let message = await response.text();
    showMessage(message);
    // Call subscribe() again to get the next message
    await subscribe();
  }
}

subscribe();
Como você pode ver, subscribea função faz uma busca, depois espera pela resposta, manipula-a e chama a si mesma novamente.

O servidor deve estar ok com muitas conexões pendentes
A arquitetura do servidor deve ser capaz de trabalhar com muitas conexões pendentes.

Certas arquiteturas de servidor executam um processo por conexão, resultando em tantos processos quanto conexões, enquanto cada processo consome bastante memória. Portanto, muitas conexões consumirão tudo.

Geralmente, esse é o caso de back-ends escritos em linguagens como PHP e Ruby.

Servidores escritos usando Node.js geralmente não têm tais problemas.

Dito isto, não é um problema de linguagem de programação. A maioria das linguagens modernas, incluindo PHP e Ruby, permite implementar um back-end adequado. Apenas certifique-se de que a arquitetura do seu servidor funcione bem com muitas conexões simultâneas.

Demonstração: um bate-papo
Aqui está um chat de demonstração, você também pode baixá-lo e executá-lo localmente (se você estiver familiarizado com Node.js e puder instalar módulos):

Resultadonavegador.jsserver.jsindex.html

O código do navegador está em browser.js.

Área de uso
A votação longa funciona muito bem em situações em que as mensagens são raras.

Se as mensagens chegarem com muita frequência, o gráfico de solicitação-recebimento de mensagens, pintado acima, torna-se semelhante a uma serra.

Cada mensagem é uma solicitação separada, fornecida com cabeçalhos, sobrecarga de autenticação e assim por diante.

Portanto, neste caso, outro método é preferido, como Websocket ou Server Sent Events .

*/