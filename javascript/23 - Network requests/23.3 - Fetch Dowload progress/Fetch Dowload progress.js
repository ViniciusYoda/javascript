/*

Buscar: progresso do download
O fetchmétodo permite acompanhar o progresso do download .

Observação: atualmente não há como fetchacompanhar o progresso do upload . Para isso, use XMLHttpRequest , abordaremos isso mais tarde.

Para rastrear o progresso do download, podemos usar response.bodypropriedade. É um ReadableStream– um objeto especial que fornece corpo pedaço por pedaço, conforme ele vem. Fluxos legíveis são descritos na especificação da API de fluxos .

Ao contrário response.text()de , response.json()e de outros métodos, response.bodydá total controle sobre o processo de leitura, e podemos contar quanto é consumido a qualquer momento.

Aqui está o esboço do código que lê a resposta de response.body:

// instead of response.json() and other methods
const reader = response.body.getReader();

// infinite loop while the body is downloading
while(true) {
  // done is true for the last chunk
  // value is Uint8Array of the chunk bytes
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
O resultado da await reader.read()chamada é um objeto com duas propriedades:

done– truequando a leitura estiver completa, caso contrário false.
value– um array digitado de bytes: Uint8Array.
Observe:
A API de fluxos também descreve a iteração assíncrona ReadableStreamcom for await..ofloop, mas ainda não é amplamente suportada (consulte os problemas do navegador ), então usamos whileloop.

Recebemos pedaços de resposta no loop, até que o carregamento termine, ou seja: até que donese torne true.

Para registrar o progresso, basta que cada fragmento recebido valueadicione seu comprimento ao contador.

Aqui está o exemplo de trabalho completo que obtém a resposta e registra o progresso no console, mais explicações a seguir:

// Step 1: start the fetch and obtain a reader
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Step 2: get total length
const contentLength = +response.headers.get('Content-Length');

// Step 3: read the data
let receivedLength = 0; // received that many bytes at the moment
let chunks = []; // array of received binary chunks (comprises the body)
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

// Step 4: concatenate chunks into single Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
  chunksAll.set(chunk, position); // (4.2)
  position += chunk.length;
}

// Step 5: decode into a string
let result = new TextDecoder("utf-8").decode(chunksAll);

// We're done!
let commits = JSON.parse(result);
alert(commits[0].author.login);
Vamos explicar isso passo a passo:

Executamos fetchcomo de costume, mas em vez de chamar response.json(), obtemos um leitor de fluxo response.body.getReader().

Observe que não podemos usar esses dois métodos para ler a mesma resposta: use um leitor ou um método de resposta para obter o resultado.

Antes da leitura, podemos descobrir o comprimento total da resposta do Content-Lengthcabeçalho.

Pode estar ausente para solicitações de origem cruzada (consulte o capítulo Buscar: solicitações de origem cruzada ) e, bem, tecnicamente, um servidor não precisa defini-lo. Mas geralmente está no lugar.

Ligue await reader.read()até terminar.

Reunimos pedaços de resposta na matriz chunks. Isso é importante, pois depois que a resposta for consumida, não poderemos “relê-la” usando response.json()ou de outra forma (você pode tentar, vai dar erro).

No final, temos chunks– uma matriz de Uint8Arrayblocos de bytes. Precisamos juntá-los em um único resultado. Infelizmente, não há um método único que os concatene, então há algum código para fazer isso:

Criamos chunksAll = new Uint8Array(receivedLength)– uma matriz do mesmo tipo com o comprimento combinado.
Em seguida, use .set(chunk, position)o método para copiar cada chunkum após o outro nele.
Temos o resultado em chunksAll. É uma matriz de bytes, não uma string.

Para criar uma string, precisamos interpretar esses bytes. O TextDecoder embutido faz exatamente isso. Então podemos JSON.parse, se necessário.

E se precisarmos de conteúdo binário em vez de uma string? Isso é ainda mais simples. Substitua as etapas 4 e 5 por uma única linha que cria um Blobde todos os blocos:

let blob = new Blob(chunks);
No final, temos o resultado (como uma string ou um blob, o que for conveniente) e o acompanhamento do progresso no processo.

Mais uma vez, observe que não é para o progresso do upload (de jeito nenhum agora com fetch), apenas para o progresso do download .

Além disso, se o tamanho for desconhecido, devemos verificar receivedLengtho loop e quebrá-lo assim que atingir um determinado limite. Para que o chunksnão sobrecarregue a memória.

*/