/*

bolha
ArrayBuffere visualizações fazem parte do padrão ECMA, parte do JavaScript.

No navegador, existem objetos adicionais de nível superior, descritos em File API , em particular Blob.

Blobconsiste em uma string opcional type(normalmente do tipo MIME), mais blobParts– uma sequência de outros Blobobjetos, strings e arquivos BufferSource.


A sintaxe do construtor é:

new Blob(blobParts, options);
blobPartsé uma matriz de // Blobvalores .BufferSourceString
optionsobjeto opcional:
type– Blobtipo, geralmente do tipo MIME, por exemplo image/png,
endings– se deve transformar o fim da linha para Blobcorresponder às novas linhas atuais do sistema operacional ( \r\nou \n). Por padrão "transparent"(não fazer nada), mas também pode ser "native"(transformar).
Por exemplo:

// create Blob from a string
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// please note: the first argument must be an array [...]
// create Blob from a typed array and strings
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in binary form

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
Podemos extrair Blobfatias com:

blob.slice([byteStart], [byteEnd], [contentType]);
byteStart– o byte inicial, por padrão 0.
byteEnd– o último byte (exclusivo, por padrão até o final).
contentType– o typedo novo blob, por padrão o mesmo da fonte.
Os argumentos são semelhantes a array.slice, números negativos também são permitidos.

Blobobjetos são imutáveis
Não podemos alterar os dados diretamente em um Blob, mas podemos fatiar partes de um Blob, criar novos Blobobjetos a partir deles, misturá-los em um novo Blobe assim por diante.

Esse comportamento é semelhante às strings JavaScript: não podemos alterar um caractere em uma string, mas podemos criar uma nova string corrigida.

Blob como URL
Um Blob pode ser facilmente usado como um URL para <a>, <img>ou outras tags, para mostrar seu conteúdo.

Graças a type, também podemos fazer download/upload Blobde objetos, e isso typese torna naturalmente Content-Typeem solicitações de rede.

Vamos começar com um exemplo simples. Ao clicar em um link, você baixa um arquivo gerado dinamicamente Blobcom hello worldo conteúdo:

<!-- download attribute forces the browser to download instead of navigating -->
<a download="hello.txt" href='#' id="link">Download</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
Também podemos criar um link dinamicamente em JavaScript e simular um clique por link.click(), então o download começa automaticamente.

Aqui está o código semelhante que faz com que o usuário baixe o dinamicamente criado Blob, sem nenhum HTML:

let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
URL.createObjectURLpega um Blobe cria um URL exclusivo para ele, no formato blob:<origin>/<uuid>.

É assim que o valor de link.hrefse parece:

blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
Para cada URL gerada pelo URL.createObjectURLnavegador, um URL → Blobmapeamento é armazenado internamente. Portanto, essas URLs são curtas, mas permitem acessar o arquivo Blob.

Um URL gerado (e, portanto, o link com ele) só é válido no documento atual, enquanto estiver aberto. E permite referenciar o Blobin <img>, <a>, basicamente qualquer outro objeto que espera uma URL.

Há um efeito colateral embora. Embora haja um mapeamento para a Blob, o Blobpróprio reside na memória. O navegador não pode liberá-lo.

O mapeamento é automaticamente limpo no descarregamento do documento, então os Blobobjetos são liberados. Mas se um aplicativo for de longa duração, isso não acontecerá tão cedo.

Portanto, se criarmos uma URL, ela Blobficará na memória, mesmo que não seja mais necessária.

URL.revokeObjectURL(url)remove a referência do mapeamento interno, permitindo assim que o Blobseja excluído (se não houver outras referências) e a memória seja liberada.

No último exemplo, pretendemos que o Blobseja usado apenas uma vez, para download instantâneo, então chamamos URL.revokeObjectURL(link.href)imediatamente.

No exemplo anterior com o link HTML clicável, não chamamos URL.revokeObjectURL(link.href), porque isso tornaria o BlobURL inválido. Após a revogação, como o mapeamento é removido, a URL não funciona mais.

Blob para base64
Uma alternativa URL.createObjectURLé converter a Blobem uma string codificada em base64.

Essa codificação representa dados binários como uma string de caracteres ultra-seguros “legíveis” com códigos ASCII de 0 a 64. E o que é mais importante – podemos usar essa codificação em “data-urls”.

Uma url de dados tem o formato data:[<mediatype>][;base64],<data>. Podemos usar esses URLs em qualquer lugar, a par dos URLs “regulares”.

Por exemplo, aqui está um smiley:

<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
O navegador irá decodificar a string e mostrar a imagem:

Para transformar a Blobem base64, usaremos o FileReaderobjeto interno. Ele pode ler dados de Blobs em vários formatos. No próximo capítulo , abordaremos isso com mais profundidade.

Aqui está a demonstração do download de um blob, agora via base-64:

let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

let reader = new FileReader();
reader.readAsDataURL(blob); // converts the blob to base64 and calls onload

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
Ambas as formas de criar um URL Blobsão utilizáveis. Mas geralmente URL.createObjectURL(blob)é mais simples e rápido.

URL.createObjectURL(blob)
Precisamos revogá-los se nos preocupamos com a memória.
Acesso direto ao blob, sem “codificação/decodificação”
Blob para url de dados
Não há necessidade de revogar nada.
Perdas de desempenho e memória em Blobobjetos grandes para codificação.
Imagem para blob
Podemos criar Blobuma imagem, uma parte da imagem ou até mesmo fazer uma captura de tela da página. Isso é útil para carregá-lo em algum lugar.

As operações de imagem são feitas por meio <canvas>do elemento:

Desenhe uma imagem (ou parte dela) na tela usando canvas.drawImage .
Chame o método canvas .toBlob(callback, format, quality) que cria um Blobe executa callbackcom ele quando terminar.
No exemplo abaixo, uma imagem é apenas copiada, mas podemos cortá-la ou transformá-la na tela antes de fazer um blob:

// take any image
let img = document.querySelector('img');

// make <canvas> of the same size
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// copy image to it (this method allows to cut image)
context.drawImage(img, 0, 0);
// we can context.rotate(), and do many other things on canvas

// toBlob is async operation, callback is called when done
canvas.toBlob(function(blob) {
  // blob ready, download it
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // delete the internal blob reference, to let the browser clear memory from it
  URL.revokeObjectURL(link.href);
}, 'image/png');
Se preferirmos async/awaitem vez de callbacks:

let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
Para capturar uma página, podemos usar uma biblioteca como https://github.com/niklasvh/html2canvas . O que ele faz é apenas percorrer a página e desenha-la <canvas>. Então podemos obter um Blobdele da mesma maneira que acima.

De Blob para ArrayBuffer
O Blobconstrutor permite criar um blob de quase tudo, incluindo qualquer arquivo BufferSource.

Mas se precisarmos executar processamento de baixo nível, podemos obter o nível mais baixo ArrayBufferde blob.arrayBuffer():

// get arrayBuffer from blob
const bufferPromise = await blob.arrayBuffer();

// or
blob.arrayBuffer().then(buffer => /* process the ArrayBuffer */);
De Blob para stream
Quando lemos e escrevemos em um blob maior que 2 GB, o uso de arrayBuffertorna-se mais intensivo em memória para nós. Neste ponto, podemos converter diretamente o blob em um fluxo.

Um stream é um objeto especial que permite ler dele (ou escrever nele) parte por parte. Está fora do nosso escopo aqui, mas aqui está um exemplo e você pode ler mais em https://developer.mozilla.org/en-US/docs/Web/API/Streams_API . Os fluxos são convenientes para dados adequados para processamento peça por peça.

O método Blobda interface stream()retorna um ReadableStreamque ao ler retorna os dados contidos no arquivo Blob.

Então podemos ler a partir dele, assim:

// get readableStream from blob
const readableStream = blob.stream();
const stream = readableStream.getReader();

while (true) {
  // for each iteration: value is the next blob fragment
  let { done, value } = await stream.read();
  if (done) {
    // no more data in the stream
    console.log('all blob processed.');
    break;
  }

   // do something with the data portion we've just read from the blob
  console.log(value);
}
Resumo
Enquanto ArrayBuffer, Uint8Arraye outros BufferSourcesão “dados binários”, um Blob representa “dados binários com tipo”.

Isso torna os Blobs convenientes para operações de upload/download, tão comuns no navegador.

Os métodos que executam solicitações da Web, como XMLHttpRequest , fetch e assim por diante, podem funcionar Blobnativamente, bem como com outros tipos binários.

Podemos facilmente converter entre Blobtipos de dados binários de baixo nível:

Podemos fazer um a Blobpartir de um array digitado usando o new Blob(...)construtor.
Podemos voltar ArrayBufferde um Blob usando blob.arrayBuffer()e, em seguida, criar uma exibição sobre ele para processamento binário de baixo nível.
Fluxos de conversão são muito úteis quando precisamos lidar com blobs grandes. Você pode facilmente criar um a ReadableStreampartir de um blob. O método Blobda interface stream()retorna um ReadableStreamque ao ler retorna os dados contidos no blob.

*/

