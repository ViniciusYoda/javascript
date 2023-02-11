/*

Buscar
O JavaScript pode enviar solicitações de rede ao servidor e carregar novas informações sempre que necessário.

Por exemplo, podemos usar uma solicitação de rede para:

Envie um pedido,
Carregar informações do usuário,
Receba as atualizações mais recentes do servidor,
… etc.
…E tudo isso sem recarregar a página!

Existe um termo abrangente “AJAX” (abreviado A synchronous J avaScript A nd X ML) para solicitações de rede de JavaScript. Porém, não precisamos usar XML: o termo vem dos tempos antigos, é por isso que essa palavra está lá. Você já deve ter ouvido esse termo.

Existem várias maneiras de enviar uma solicitação de rede e obter informações do servidor.

O fetch()método é moderno e versátil, então vamos começar por ele. Não é suportado por navegadores antigos (pode ser polipreenchido), mas muito bem suportado entre os modernos.

A sintaxe básica é:

let promise = fetch(url, [options])
url– a URL a ser acessada.
options– parâmetros opcionais: método, cabeçalhos etc.
Sem options, esta é uma solicitação GET simples, baixando o conteúdo do arquivo url.

O navegador inicia a solicitação imediatamente e retorna uma promessa que o código de chamada deve usar para obter o resultado.

Obter uma resposta geralmente é um processo de duas etapas.

Primeiro, o promise, retornado por fetch, resolve com um objeto da classe Response interna assim que o servidor responde com cabeçalhos.

Nesta fase, podemos verificar o status do HTTP, para ver se foi bem-sucedido ou não, verificar os cabeçalhos, mas ainda não temos o corpo.

A promessa é rejeitada se fetchnão for possível fazer a solicitação HTTP, por exemplo, problemas de rede ou se esse site não existir. Status HTTP anormais, como 404 ou 500, não causam erro.

Podemos ver o status HTTP nas propriedades de resposta:

status– Código de status HTTP, por exemplo, 200.
ok– booleano, truese o código de status HTTP for 200-299.
Por exemplo:

let response = await fetch(url);

if (response.ok) { // if HTTP-status is 200-299
  // get the response body (the method explained below)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
Em segundo lugar, para obter o corpo da resposta, precisamos usar uma chamada de método adicional.

Responsefornece vários métodos baseados em promessa para acessar o corpo em vários formatos:

response.text()– leia a resposta e retorne como texto,
response.json()– analisar a resposta como JSON,
response.formData()– retornar a resposta como FormDataobjeto (explicado no próximo capítulo ),
response.blob()– retornar a resposta como Blob (dados binários com tipo),
response.arrayBuffer()– retorna a resposta como ArrayBuffer (representação de baixo nível de dados binários),
além disso, response.bodyé um objeto ReadableStream , permite que você leia o corpo pedaço por pedaço, veremos um exemplo mais tarde.
Por exemplo, vamos obter um objeto JSON com os últimos commits do GitHub:

let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

let commits = await response.json(); // read response body and parse as JSON

alert(commits[0].author.login);
Ou, o mesmo sem await, usando a sintaxe de promessas pura:

fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
Para obter o texto de resposta, await response.text()em vez de .json():

let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // read response body as text

alert(text.slice(0, 80) + '...');
Como vitrine para leitura em formato binário, vamos buscar e mostrar uma imagem do logotipo da especificação “fetch” (veja o capítulo Blob para detalhes sobre operações em Blob):

let response = await fetch('/article/fetch/logo-fetch.svg');

let blob = await response.blob(); // download as Blob object

// create <img> for it
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// show it
img.src = URL.createObjectURL(blob);

setTimeout(() => { // hide after three seconds
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
Importante:
Podemos escolher apenas um método de leitura corporal.

Se já obtivermos a resposta com response.text(), response.json()não funcionará, pois o conteúdo do corpo já foi processado.

let text = await response.text(); // response body consumed
let parsed = await response.json(); // fails (already consumed)
Cabeçalhos de resposta
Os cabeçalhos de resposta estão disponíveis em um objeto de cabeçalho semelhante a um mapa em response.headers.

Não é exatamente um mapa, mas possui métodos semelhantes para obter cabeçalhos individuais por nome ou iterar sobre eles:

let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// get one header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// iterate over all headers
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
Cabeçalhos de solicitação
Para definir um cabeçalho de solicitação em fetch, podemos usar a headersopção. Tem um objeto com cabeçalhos de saída, assim:

let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
…Mas há uma lista de cabeçalhos HTTP proibidos que não podemos definir:

Accept-Charset, Accept-Encoding
Access-Control-Request-Headers
Access-Control-Request-Method
Connection
Content-Length
Cookie,Cookie2
Date
DNT
Expect
Host
Keep-Alive
Origin
Referer
TE
Trailer
Transfer-Encoding
Upgrade
Via
Proxy-*
Sec-*
Esses cabeçalhos garantem HTTP adequado e seguro, portanto, são controlados exclusivamente pelo navegador.

Solicitações POST
Para fazer uma POSTrequisição, ou uma requisição com outro método, precisamos utilizar fetchas opções:

method– método HTTP, por exemplo POST,
body– o corpo da solicitação, um dos seguintes:
uma string (por exemplo, codificada em JSON),
FormDataobjeto, para enviar os dados como multipart/form-data,
Blob/ BufferSourcepara enviar dados binários,
URLSearchParams , para enviar os dados em x-www-form-urlencodedcodificação, raramente usado.
O formato JSON é usado na maioria das vezes.

Por exemplo, este código envia usero objeto como JSON:

let user = {
  name: 'John',
  surname: 'Smith'
};

let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});

let result = await response.json();
alert(result.message);
Observe que, se a solicitação bodyfor uma string, o Content-Typecabeçalho será definido como text/plain;charset=UTF-8padrão.

Mas, como vamos enviar JSON, usamos headersa opção de enviar application/json, em vez disso, o correto Content-Typepara dados codificados em JSON.

Enviando uma imagem
Também podemos enviar dados binários com fetchusing Blobou BufferSourceobjetos.

Neste exemplo, há um <canvas>onde podemos desenhar passando o mouse sobre ele. Um clique no botão “enviar” envia a imagem para o servidor:

<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // the server responds with confirmation and the image size
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>

Observe que aqui não definimos o Content-Typecabeçalho manualmente, porque um Blobobjeto tem um tipo embutido (aqui image/png, conforme gerado por toBlob). Para Blobobjetos, esse tipo se torna o valor de Content-Type.

A submit()função pode ser reescrita sem async/await:

function submit() {
  canvasElem.toBlob(function(blob) {
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
Resumo
Uma solicitação de busca típica consiste em duas awaitchamadas:

let response = await fetch(url, options); // resolves with response headers
let result = await response.json(); // read body as json
Ou, sem await:

fetch(url, options)
  .then(response => response.json())
  .then(result => /* process result *///)
  /*
Propriedades de resposta:

response.status– código HTTP da resposta,
response.ok– truese o status for 200-299.
response.headers– Objeto tipo mapa com cabeçalhos HTTP.
Métodos para obter o corpo da resposta:

response.text()– retornar a resposta como texto,
response.json()– analisar a resposta como objeto JSON,
response.formData()– retorna a resposta como FormDataobjeto ( multipart/form-datacodificação, veja o próximo capítulo),
response.blob()– retornar a resposta como Blob (dados binários com tipo),
response.arrayBuffer()– retorna a resposta como ArrayBuffer (dados binários de baixo nível),
Buscar opções até agora:

method– método HTTP,
headers– um objeto com cabeçalhos de solicitação (nenhum cabeçalho é permitido),
body– os dados a serem enviados (corpo da solicitação) como , string, FormDataou BufferSourceobjeto .BlobUrlSearchParams
Nos próximos capítulos veremos mais opções e casos de uso do fetch.

*/

