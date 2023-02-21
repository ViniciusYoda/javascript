/*

WebSocket
O WebSocketprotocolo, descrito na especificação RFC 6455 , fornece uma maneira de trocar dados entre o navegador e o servidor por meio de uma conexão persistente. Os dados podem ser passados ​​em ambas as direções como “pacotes”, sem interromper a conexão e sem a necessidade de solicitações HTTP adicionais.

O WebSocket é especialmente bom para serviços que requerem troca contínua de dados, por exemplo, jogos online, sistemas de negociação em tempo real e assim por diante.

Um exemplo simples
Para abrir uma conexão websocket, precisamos criar new WebSocketusando o protocolo especial wsna url:

let socket = new WebSocket("ws://javascript.info");
Há também wss://protocolo criptografado. É como HTTPS para websockets.

Prefira semprewss://
O wss://protocolo não é apenas criptografado, mas também mais confiável.

Isso porque ws://os dados não são criptografados, visíveis para qualquer intermediário. Servidores proxy antigos não conhecem o WebSocket, eles podem ver cabeçalhos “estranhos” e abortar a conexão.

Por outro lado, wss://é WebSocket sobre TLS (o mesmo que HTTPS é HTTP sobre TLS), a camada de segurança de transporte criptografa os dados no remetente e os descriptografa no destinatário. Portanto, os pacotes de dados são transmitidos criptografados por meio de proxies. Eles não podem ver o que está dentro e deixá-los passar.

Depois que o soquete é criado, devemos ouvir os eventos nele. Existem no total 4 eventos:

open- conexão estabelecida,
message- Informação recebida,
error– erro de websocket,
close- Conexão fechada.
…E se quisermos enviar algo, então socket.send(data)faremos isso.

Aqui está um exemplo:

let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error]`);
};
Para fins de demonstração, há um pequeno servidor server.js escrito em Node.js, para o exemplo acima, em execução. Ele responde com “Olá do servidor, John”, então espera 5 segundos e fecha a conexão.

Então você verá eventos open→ message→ close.

Na verdade é isso, já podemos falar de WebSocket. Bastante simples, não é?

Agora vamos falar mais a fundo.

Abrindo um websocket
Quando new WebSocket(url)é criado, ele começa a se conectar imediatamente.

Durante a conexão, o navegador (usando cabeçalhos) pergunta ao servidor: “Você oferece suporte ao Websocket?” E se o servidor responder “sim”, a conversa continua no protocolo WebSocket, que não é HTTP.


Aqui está um exemplo de cabeçalhos de navegador para uma solicitação feita por new WebSocket("wss://javascript.info/chat").

GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
Origin– a origem da página do cliente, por exemplo https://javascript.info. Os objetos WebSocket são de origem cruzada por natureza. Não há cabeçalhos especiais ou outras limitações. Os servidores antigos não conseguem lidar com o WebSocket de qualquer maneira, portanto, não há problemas de compatibilidade. Mas o Origincabeçalho é importante, pois permite que o servidor decida se deve ou não conversar com WebSocket com este site.
Connection: Upgrade– sinaliza que o cliente gostaria de mudar o protocolo.
Upgrade: websocket– o protocolo solicitado é “websocket”.
Sec-WebSocket-Key– uma chave aleatória gerada pelo navegador, usada para garantir que o servidor suporte o protocolo WebSocket. É aleatório para evitar que os proxies armazenem em cache qualquer comunicação a seguir.
Sec-WebSocket-Version– Versão do protocolo WebSocket, 13 é a atual.
O handshake do WebSocket não pode ser emulado
Não podemos usar XMLHttpRequestou fetchfazer esse tipo de solicitação HTTP, porque o JavaScript não tem permissão para definir esses cabeçalhos.

Se o servidor concordar em mudar para WebSocket, ele deve enviar a resposta do código 101:

101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
Aqui Sec-WebSocket-Acceptestá Sec-WebSocket-Key, recodificado usando um algoritmo especial. Ao vê-lo, o navegador entende que o servidor realmente suporta o protocolo WebSocket.

Depois, os dados são transferidos usando o protocolo WebSocket, veremos sua estrutura (“frames”) em breve. E isso não é HTTP.

Extensões e subprotocolos
Pode haver cabeçalhos adicionais Sec-WebSocket-Extensionsque Sec-WebSocket-Protocoldescrevam extensões e subprotocolos.

Por exemplo:

Sec-WebSocket-Extensions: deflate-framesignifica que o navegador oferece suporte à compactação de dados. Uma extensão é algo relacionado à transferência dos dados, funcionalidade que estende o protocolo WebSocket. O cabeçalho Sec-WebSocket-Extensionsé enviado automaticamente pelo navegador, com a lista de todas as extensões que ele suporta.

Sec-WebSocket-Protocol: soap, wampsignifica que gostaríamos de transferir não apenas quaisquer dados, mas os dados nos protocolos SOAP ou WAMP (“The WebSocket Application Messaging Protocol”). Os subprotocolos WebSocket são registrados no catálogo da IANA . Então, este cabeçalho descreve os formatos de dados que vamos usar.

Este cabeçalho opcional é definido usando o segundo parâmetro de new WebSocket. Essa é a matriz de subprotocolos, por exemplo, se quisermos usar SOAP ou WAMP:

let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
O servidor deve responder com uma lista de protocolos e extensões que concorda em usar.

Por exemplo, a solicitação:

GET /chat
Host: javascript.info
Upgrade: websocket
Connection: Upgrade
Origin: https://javascript.info
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap, wamp
Resposta:

101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap
Aqui o servidor responde que suporta a extensão “deflate-frame” e apenas SOAP dos subprotocolos solicitados.

Transferência de dados
A comunicação WebSocket consiste em “frames” – fragmentos de dados, que podem ser enviados de qualquer lado, e podem ser de vários tipos:

“quadros de texto” – contêm dados de texto que as partes enviam umas às outras.
“quadros de dados binários” – contêm dados binários que as partes enviam umas às outras.
“frames ping/pong” são usados ​​para verificar a conexão, enviados do servidor, o navegador responde a eles automaticamente.
há também o “quadro de fechamento de conexão” e alguns outros quadros de serviço.
No navegador, trabalhamos diretamente apenas com texto ou quadros binários.

O método WebSocket .send()pode enviar texto ou dados binários.

Uma chamada socket.send(body)permite bodyem string ou formato binário, incluindo Blob, ArrayBuffer, etc. Nenhuma configuração é necessária: basta enviá-la em qualquer formato.

Quando recebemos os dados, o texto sempre vem como string. E para dados binários, podemos escolher entre os formatos Blobe ArrayBuffer.

Isso é definido por socket.binaryTypepropriedade, é "blob"por padrão, então os dados binários vêm como Blobobjetos.

Blob é um objeto binário de alto nível, ele se integra diretamente com <a>, <img>e outras tags, então esse é um padrão sensato. Mas para processamento binário, para acessar bytes de dados individuais, podemos alterá-lo para "arraybuffer":

socket.binaryType = "arraybuffer";
socket.onmessage = (event) => {
  // event.data is either a string (if text) or arraybuffer (if binary)
};
Limitação de taxa
Imagine, nosso aplicativo está gerando muitos dados para enviar. Mas o usuário tem uma conexão de rede lenta, talvez em uma internet móvel, fora de uma cidade.

Podemos ligar socket.send(data)de novo e de novo. Mas os dados serão armazenados em buffer (armazenados) na memória e enviados apenas na velocidade permitida pela velocidade da rede.

A socket.bufferedAmountpropriedade armazena quantos bytes permanecem no buffer neste momento, esperando para serem enviados pela rede.

Podemos examiná-lo para ver se o soquete está realmente disponível para transmissão.

// every 100ms examine the socket and send more data
// only if all the existing data was sent out
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
Conexão fechada
Normalmente, quando uma parte deseja fechar a conexão (tanto o navegador quanto o servidor têm direitos iguais), eles enviam um “quadro de fechamento de conexão” com um código numérico e um motivo textual.

O método para isso é:

socket.close([code], [reason]);
codeé um código especial de fechamento do WebSocket (opcional)
reasoné uma string que descreve o motivo do fechamento (opcional)
Em seguida, a outra parte no closemanipulador de eventos obtém o código e o motivo, por exemplo:

// closing party:
socket.close(1000, "Work complete");

// the other party
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "Work complete"
  // event.wasClean === true (clean close)
};
Valores de código mais comuns:

1000– o fechamento normal padrão (usado se não for codefornecido),
1006– não há como definir esse código manualmente, indica que a conexão foi perdida (sem quadro fechado).
Existem outros códigos como:

1001– a parte está indo embora, por exemplo, o servidor está sendo desligado ou um navegador sai da página,
1009– a mensagem é muito grande para processar,
1011– erro inesperado no servidor,
…e assim por diante.
A lista completa pode ser encontrada em RFC6455, §7.4.1 .

Os códigos WebSocket são um pouco como os códigos HTTP, mas diferentes. Em particular, códigos menores que 1000são reservados, haverá um erro se tentarmos definir tal código.

// in case connection is broken
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false (no closing frame)
};
Estado da conexão
Para obter o estado da conexão, adicionalmente, há socket.readyStatepropriedades com valores:

0– “CONNECTING”: a ligação ainda não foi estabelecida,
1– “ABERTO”: comunicando,
2– “CLOSING”: a ligação está a fechar,
3– “CLOSED”: a ligação está encerrada.
Exemplo de bate-papo
Vamos revisar um exemplo de bate-papo usando a API WebSocket do navegador e o módulo Node.js WebSocket https://github.com/websockets/ws . Daremos atenção principal ao lado do cliente, mas o servidor também é simples.

HTML: precisamos de um <form>para enviar mensagens e um <div>para receber mensagens:

<!-- message form -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Send">
</form>

<!-- div with messages -->
<div id="messages"></div>
Do JavaScript, queremos três coisas:

Abra a conexão.
No envio do formulário – socket.send(message)para a mensagem.
Na mensagem recebida - anexe-a a div#messages.
Aqui está o código:

let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// send message from the form
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// message received - show the message in div#messages
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}
O código do lado do servidor está um pouco além do nosso escopo. Aqui usaremos o Node.js, mas você não precisa. Outras plataformas também têm seus meios para trabalhar com WebSocket.

O algoritmo do lado do servidor será:

Criar clients = new Set()– um conjunto de soquetes.
Para cada websocket aceito, adicione-o ao ouvinte de eventos set clients.add(socket)e set messagepara obter suas mensagens.
Quando uma mensagem é recebida: itere sobre os clientes e envie para todos.
Quando uma conexão é fechada: clients.delete(socket).
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
  // here we only handle websocket connections
  // in real project we'd have some other code here to handle non-websocket requests
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // max message length will be 50

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
Aqui está o exemplo de trabalho:


Você também pode baixá-lo (botão superior direito no iframe) e executá-lo localmente. Apenas não se esqueça de instalar o Node.js e npm install wsantes de executar.

Resumo
O WebSocket é uma maneira moderna de ter conexões navegador-servidor persistentes.

Os WebSockets não têm limitações de origem cruzada.
Eles são bem suportados em navegadores.
Pode enviar/receber strings e dados binários.
A API é simples.

Métodos:

socket.send(data),
socket.close([code], [reason]).
Eventos:

open,
message,
error,
close.
O WebSocket por si só não inclui reconexão, autenticação e muitos outros mecanismos de alto nível. Portanto, existem bibliotecas cliente/servidor para isso e também é possível implementar esses recursos manualmente.

Às vezes, para integrar o WebSocket em projetos existentes, as pessoas executam um servidor WebSocket em paralelo com o servidor HTTP principal e compartilham um único banco de dados. As solicitações para WebSocket usam wss://ws.site.com, um subdomínio que leva ao servidor WebSocket, enquanto https://site.comvai para o servidor HTTP principal.

Certamente, outras formas de integração também são possíveis.

*/