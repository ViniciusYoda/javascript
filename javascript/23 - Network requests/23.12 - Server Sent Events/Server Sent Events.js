/*

Eventos enviados pelo servidor
A especificação Server-Sent Events descreve uma classe interna EventSource, que mantém a conexão com o servidor e permite receber eventos dele.

Semelhante a WebSocket, a conexão é persistente.

Mas há várias diferenças importantes:

WebSocket	EventSource
Bidirecional: tanto o cliente quanto o servidor podem trocar mensagens	Unidirecional: apenas o servidor envia dados
Dados binários e de texto	Somente texto
Protocolo WebSocket	HTTP normal
EventSourceé uma maneira menos poderosa de se comunicar com o servidor do que WebSocket.

Por que alguém deveria usá-lo?

O principal motivo: é mais simples. Em muitas aplicações, o poder de WebSocketé um pouco demais.

Precisamos receber um fluxo de dados do servidor: talvez mensagens de bate-papo ou preços de mercado, ou qualquer outra coisa. Isso é o que EventSourceé bom. Também oferece suporte à reconexão automática, algo que precisamos implementar manualmente com WebSocket. Além disso, é um HTTP simples e antigo, não um novo protocolo.

Recebendo mensagens
Para começar a receber mensagens, basta criar um arquivo new EventSource(url).

O navegador se conectará urle manterá a conexão aberta, aguardando eventos.

O servidor deve responder com o status 200 e o header Content-Type: text/event-stream, então manter a conexão e escrever mensagens nela no formato especial, assim:

data: Message 1

data: Message 2

data: Message 3
data: of two lines
Um texto de mensagem vai depois de data:, o espaço após os dois pontos é opcional.
As mensagens são delimitadas com quebras de linha duplas \n\n.
Para enviar uma quebra de linha \n, podemos enviar imediatamente mais uma data:(3ª mensagem acima).
Na prática, mensagens complexas geralmente são enviadas codificadas em JSON. As quebras de linha são codificadas como \ndentro delas, portanto data:mensagens multilinhas não são necessárias.

Por exemplo:

data: {"user":"John","message":"First line\n Second line"}
…Portanto, podemos assumir que um data:contém exatamente uma mensagem.

Para cada uma dessas mensagens, o messageevento é gerado:

let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("New message", event.data);
  // will log 3 times for the data stream above
};

// or eventSource.addEventListener('message', ...)
Solicitações de origem cruzada
EventSourceoferece suporte a solicitações de origem cruzada, como fetche quaisquer outros métodos de rede. Podemos usar qualquer URL:

let source = new EventSource("https://another-site.com/events");
O servidor remoto obterá o Origincabeçalho e deverá responder com Access-Control-Allow-Originpara continuar.

Para passar credenciais, devemos definir a opção adicional withCredentials, assim:

let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
Consulte o capítulo Buscar: Solicitações de origem cruzada para obter mais detalhes sobre cabeçalhos de origem cruzada.

Reconexão
Após a criação, new EventSourceconecta-se ao servidor e, se a conexão for interrompida, reconecta.

Isso é muito conveniente, pois não precisamos nos preocupar com isso.

Há um pequeno atraso entre as reconexões, alguns segundos por padrão.

O servidor pode definir o atraso recomendado usando retry:em resposta (em milissegundos):

retry: 15000
data: Hello, I set the reconnection delay to 15 seconds
O retry:pode vir junto com alguns dados ou como uma mensagem autônoma.

O navegador deve esperar muitos milissegundos antes de se reconectar. Ou mais, por exemplo, se o navegador souber (pelo sistema operacional) que não há conexão de rede no momento, ele pode esperar até que a conexão apareça e tente novamente.

Se o servidor quiser que o navegador pare de se reconectar, ele deve responder com o status HTTP 204.
Se o navegador quiser fechar a conexão, ele deve chamar eventSource.close():
let eventSource = new EventSource(...);

eventSource.close();
Além disso, não haverá reconexão se a resposta for incorreta Content-Typeou seu status HTTP for diferente de 301, 307, 200 e 204. Nesses casos, o "error"evento será emitido e o navegador não reconectará.

Observe:
Quando uma conexão é finalmente fechada, não há como “reabri-la”. Se quisermos nos conectar novamente, basta criar um novo arquivo EventSource.

ID da mensagem
Quando uma conexão é interrompida devido a problemas de rede, nenhum dos lados pode ter certeza de quais mensagens foram recebidas e quais não foram.

Para retomar corretamente a conexão, cada mensagem deve ter um idcampo, como este:

data: Message 1
id: 1

data: Message 2
id: 2

data: Message 3
data: of two lines
id: 3
Quando uma mensagem com id:é recebida, o navegador:

Define a propriedade eventSource.lastEventIdpara seu valor.
Ao reconectar, envia o cabeçalho Last-Event-IDcom esse id, para que o servidor possa reenviar as mensagens a seguir.
colocar id:depoisdata:
Observação: a idmensagem é anexada abaixo datapelo servidor, para garantir que lastEventIdseja atualizada após o recebimento da mensagem.

Status da conexão: readyState
O EventSourceobjeto tem readyStatepropriedade, que tem um dos três valores:

EventSource.CONNECTING = 0; // connecting or reconnecting
EventSource.OPEN = 1;       // connected
EventSource.CLOSED = 2;     // connection closed
Quando um objeto é criado ou a conexão é inativa, é sempre EventSource.CONNECTING(igual a 0).

Podemos consultar essa propriedade para saber o estado de EventSource.

Tipos de evento
Por padrão, EventSourceo objeto gera três eventos:

message– uma mensagem recebida, disponível como event.data.
open– a conexão está aberta.
error– a conexão não pôde ser estabelecida, por exemplo, o servidor retornou o status HTTP 500.
O servidor pode especificar outro tipo de evento no event: ...início do evento.

Por exemplo:

event: join
data: Bob

data: Hello

event: leave
data: Bob
Para lidar com eventos personalizados, devemos usar addEventListener, não onmessage:

eventSource.addEventListener('join', event => {
  alert(`Joined ${event.data}`);
});

eventSource.addEventListener('message', event => {
  alert(`Said: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`Left ${event.data}`);
});
Exemplo completo
Aqui está o servidor que envia mensagens com 1, 2, 3, então byee quebra a conexão.

Em seguida, o navegador se reconecta automaticamente.

Resultadoserver.jsindex.html

Resumo
EventSourceO objeto estabelece automaticamente uma conexão persistente e permite que o servidor envie mensagens por ele.

Oferece:

Reconexão automática, com retrytempo limite ajustável.
IDs de mensagem para retomar eventos, o último identificador recebido é enviado no Last-Event-IDcabeçalho na reconexão.
O estado atual está na readyStatepropriedade.
Isso torna EventSourceuma alternativa viável para WebSocket, já que o último é de nível mais baixo e não possui esses recursos integrados (embora possam ser implementados).

Em muitas aplicações da vida real, o poder de EventSourceé apenas o suficiente.

Compatível com todos os navegadores modernos (não IE).

A sintaxe é:

let source = new EventSource(url, [credentials]);
O segundo argumento tem apenas uma opção possível: { withCredentials: true }, permite o envio de credenciais de origem cruzada.

A segurança geral entre origens é a mesma de fetche de outros métodos de rede.

Propriedades de um EventSourceobjeto
readyState
O estado da conexão atual: ou EventSource.CONNECTING (=0), EventSource.OPEN (=1)ou EventSource.CLOSED (=2).
lastEventId
O último recebido id. Ao reconectar, o navegador o envia no cabeçalho Last-Event-ID.
Métodos
close()
Fecha a conexão.
Eventos
message
Mensagem recebida, os dados estão em event.data.
open
A conexão é estabelecida.
error
Em caso de erro, incluindo perda de conexão (reconectará automaticamente) e erros fatais. Podemos verificar readyStatese a reconexão está sendo tentada.
O servidor pode definir um nome de evento personalizado em event:. Tais eventos devem ser tratados usando addEventListener, não on<event>.

Formato de resposta do servidor
O servidor envia mensagens, delimitadas por \n\n.

Uma mensagem pode ter os seguintes campos:

data:– corpo da mensagem, uma sequência de múltiplos dataé interpretada como uma única mensagem, com \nentre as partes.
id:– renova lastEventId, enviado Last-Event-IDna reconexão.
retry:– recomenda um atraso de nova tentativa para reconexões em ms. Não há como configurá-lo a partir do JavaScript.
event:– nome do evento, deve preceder data:.
Uma mensagem pode incluir um ou mais campos em qualquer ordem, mas id:geralmente é o último.

*/