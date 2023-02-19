/*

XMLHttpRequest
XMLHttpRequesté um objeto de navegador integrado que permite fazer solicitações HTTP em JavaScript.

Apesar de ter a palavra “XML” em seu nome, ele pode operar sobre qualquer dado, não apenas no formato XML. Podemos fazer upload/download de arquivos, acompanhar o progresso e muito mais.

No momento, há outro método mais moderno fetch, que de certa forma deprecia o XMLHttpRequest.

No desenvolvimento web moderno XMLHttpRequesté usado por três razões:

Motivos históricos: precisamos oferecer suporte a scripts existentes com XMLHttpRequest.
Precisamos oferecer suporte a navegadores antigos e não queremos polyfills (por exemplo, para manter os scripts minúsculos).
Precisamos de algo que fetchainda não podemos fazer, por exemplo, acompanhar o progresso do upload.
Isso soa familiar? Se sim, então tudo bem, continue com XMLHttpRequest. Caso contrário, vá para Fetch .

O básico
XMLHttpRequest possui dois modos de operação: síncrono e assíncrono.

Vamos ver primeiro o assíncrono, pois é usado na maioria dos casos.

Para fazer o pedido, precisamos de 3 passos:

Criar XMLHttpRequest:

let xhr = new XMLHttpRequest();
O construtor não tem argumentos.

Inicialize-o, geralmente logo após new XMLHttpRequest:

xhr.open(method, URL, [async, user, password])
Este método especifica os principais parâmetros da solicitação:

method– método HTTP. Normalmente "GET"ou "POST".
URL– a URL a ser solicitada, uma string, pode ser um objeto URL .
async– se explicitamente definido como false, a solicitação é síncrona, abordaremos isso um pouco mais tarde.
user, password– login e senha para autenticação HTTP básica (se necessário).
Observe que opena chamada, ao contrário do nome, não abre a conexão. Ele apenas configura a solicitação, mas a atividade de rede só começa com a chamada de send.

Envie-o.

xhr.send([body])
Este método abre a conexão e envia a solicitação ao servidor. O parâmetro opcional bodycontém o corpo da solicitação.

Alguns métodos de solicitação, como GETnão possuem um corpo. E alguns deles gostam POSTde bodyenviar os dados para o servidor. Veremos exemplos disso mais tarde.

Ouça os xhreventos para obter resposta.

Esses três eventos são os mais usados:

load– quando a solicitação é concluída (mesmo que o status do HTTP seja como 400 ou 500) e a resposta é totalmente baixada.
error– quando a solicitação não pôde ser feita, por exemplo, rede inativa ou URL inválido.
progress– aciona periodicamente enquanto a resposta está sendo baixada, relata quanto foi baixado.
xhr.onload = function() {
  alert(`Loaded: ${xhr.status} ${xhr.response}`);
};

xhr.onerror = function() { // only triggers if the request couldn't be made at all
  alert(`Network Error`);
};

xhr.onprogress = function(event) { // triggers periodically
  // event.loaded - how many bytes downloaded
  // event.lengthComputable = true if the server sent Content-Length header
  // event.total - total number of bytes (if lengthComputable)
  alert(`Received ${event.loaded} of ${event.total}`);
};
Aqui está um exemplo completo. O código abaixo carrega a URL do /article/xmlhttprequest/example/loadservidor e imprime o progresso:

// 1. Create a new XMLHttpRequest object
let xhr = new XMLHttpRequest();

// 2. Configure it: GET-request for the URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. Send the request over the network
xhr.send();

// 4. This will be called after the response is received
xhr.onload = function() {
  if (xhr.status != 200) { // analyze HTTP status of the response
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
  } else { // show the result
    alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Received ${event.loaded} bytes`); // no Content-Length
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
Depois que o servidor responder, podemos receber o resultado nas seguintes xhrpropriedades:

status
Código de status HTTP (um número): 200, 404, 403e assim por diante, pode ser 0em caso de falha não HTTP.
statusText
Mensagem de status HTTP (uma string): geralmente OKfor 200, Not Foundfor 404, Forbiddenfor 403e assim por diante.
response(scripts antigos podem usar responseText)
O corpo da resposta do servidor.
Também podemos especificar um tempo limite usando a propriedade correspondente:

xhr.timeout = 10000; // timeout in ms, 10 seconds
Se a solicitação não for bem-sucedida dentro do tempo determinado, ela será cancelada e timeouto evento acionado.

Parâmetros de pesquisa de URL
Para adicionar parâmetros à URL, como ?name=value, e garantir a codificação adequada, podemos usar o objeto URL :

let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

// the parameter 'q' is encoded
xhr.open('GET', url); // https://google.com/search?q=test+me%21
Tipo de resposta
Podemos usar xhr.responseTypea propriedade para definir o formato da resposta:

""(padrão) – obtém como string,
"text"– obter como string,
"arraybuffer"– get as ArrayBuffer(para dados binários, consulte o capítulo ArrayBuffer, arrays binários ),
"blob"– get as Blob(para dados binários, veja o capítulo Blob ),
"document"– obter como documento XML (pode usar XPath e outros métodos XML) ou documento HTML (com base no tipo MIME dos dados recebidos),
"json"– obter como JSON (analisado automaticamente).
Por exemplo, vamos obter a resposta como JSON:

let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

xhr.responseType = 'json';

xhr.send();

// the response is {"message": "Hello, world!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
Observe:
Nos scripts antigos você também pode encontrar xhr.responseTexte até mesmo xhr.responseXMLpropriedades.

Eles existem por razões históricas, para obter uma string ou um documento XML. Hoje em dia, devemos definir o formato xhr.responseTypee obter xhr.responsecomo demonstrado acima.

Estados prontos
XMLHttpRequestmuda entre os estados à medida que progride. O estado atual é acessível como xhr.readyState.

Todos os estados, conforme a especificação :

UNSENT = 0; // initial state
OPENED = 1; // open called
HEADERS_RECEIVED = 2; // response headers received
LOADING = 3; // response is loading (a data packet is received)
DONE = 4; // request complete
Um XMLHttpRequestobjeto os percorre na ordem 0→ 1→ 2→ 3→ … → 3→ 4. O estado 3se repete toda vez que um pacote de dados é recebido pela rede.

Podemos rastreá-los usando readystatechangeo evento:

xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // loading
  }
  if (xhr.readyState == 4) {
    // request finished
  }
};
Você pode encontrar readystatechangeouvintes em um código muito antigo, está lá por razões históricas, pois houve um tempo em que não havia loade outros eventos. Hoje em dia, load/error/progressos manipuladores o depreciam.

Solicitação de cancelamento
Podemos encerrar a solicitação a qualquer momento. A chamada para xhr.abort()faz isso:

xhr.abort(); // terminate the request
Isso aciona aborto evento e xhr.statusse torna 0.

Solicitações síncronas
Se no openmétodo o terceiro parâmetro asyncestiver definido como false, a solicitação será feita de forma síncrona.

Em outras palavras, a execução do JavaScript pausa send()e continua quando a resposta é recebida. Um pouco como alertou promptcomandos.

Aqui está o exemplo reescrito, o terceiro parâmetro de opené false:

let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/hello.txt', false);

try {
  xhr.send();
  if (xhr.status != 200) {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
} catch(err) { // instead of onerror
  alert("Request failed");
}
Pode parecer bom, mas as chamadas síncronas raramente são usadas, porque bloqueiam o JavaScript na página até que o carregamento seja concluído. Em alguns navegadores, torna-se impossível rolar. Se uma chamada síncrona demorar muito, o navegador pode sugerir o fechamento da página da Web "pendurada".

Muitos recursos avançados do XMLHttpRequest, como solicitar de outro domínio ou especificar um tempo limite, não estão disponíveis para solicitações síncronas. Além disso, como você pode ver, nenhuma indicação de progresso.

Por tudo isso, as requisições síncronas são usadas com muita parcimônia, quase nunca. Não vamos mais falar sobre eles.

Cabeçalhos HTTP
XMLHttpRequestpermite enviar cabeçalhos personalizados e ler cabeçalhos da resposta.

Existem 3 métodos para cabeçalhos HTTP:

setRequestHeader(name, value)
Define o cabeçalho da solicitação com o dado namee value.

Por exemplo:

xhr.setRequestHeader('Content-Type', 'application/json');
Limitações de cabeçalhos
Vários cabeçalhos são gerenciados exclusivamente pelo navegador, por exemplo, Referere Host. A lista completa está na especificação .

XMLHttpRequestnão é permitido alterá-los, por segurança do usuário e correção da solicitação.

Não é possível remover um cabeçalho
Outra peculiaridade de XMLHttpRequesté que não se pode desfazer setRequestHeader.

Depois que o cabeçalho é definido, ele é definido. Chamadas adicionais adicionam informações ao cabeçalho, não as substituem.

Por exemplo:

xhr.setRequestHeader('X-Auth', '123');
xhr.setRequestHeader('X-Auth', '456');

// the header will be:
// X-Auth: 123, 456
getResponseHeader(name)
Obtém o cabeçalho de resposta com o dado name(exceto Set-Cookiee Set-Cookie2).

Por exemplo:

xhr.getResponseHeader('Content-Type')
getAllResponseHeaders()
Retorna todos os cabeçalhos de resposta, exceto Set-Cookiee Set-Cookie2.

Os cabeçalhos são retornados como uma única linha, por exemplo:

Cache-Control: max-age=31536000
Content-Length: 4260
Content-Type: image/png
Date: Sat, 08 Sep 2012 16:53:16 GMT
A quebra de linha entre os cabeçalhos é sempre "\r\n"(não depende do sistema operacional), para que possamos dividi-la facilmente em cabeçalhos individuais. O separador entre o nome e o valor é sempre dois pontos seguidos de um espaço ": ". Isso é corrigido na especificação.

Portanto, se quisermos obter um objeto com pares nome/valor, precisamos lançar um pouco de JS.

Assim (assumindo que se dois cabeçalhos tiverem o mesmo nome, o último substitui o anterior):

let headers = xhr
  .getAllResponseHeaders()
  .split('\r\n')
  .reduce((result, current) => {
    let [name, value] = current.split(': ');
    result[name] = value;
    return result;
  }, {});

// headers['Content-Type'] = 'image/png'
POST, FormData
Para fazer uma solicitação POST, podemos usar o objeto integrado FormData .

A sintaxe:

let formData = new FormData([form]); // creates an object, optionally fill from <form>
formData.append(name, value); // appends a field
Nós o criamos, opcionalmente preenchemos a partir de um formulário, appendmais campos se necessário, e então:

xhr.open('POST', ...)– POSTmétodo de uso.
xhr.send(formData)para enviar o formulário ao servidor.
Por exemplo:

<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  // pre-fill FormData from the form
  let formData = new FormData(document.forms.person);

  // add one more field
  formData.append("middle", "Lee");

  // send it out
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

  xhr.onload = () => alert(xhr.response);
</script>
O formulário é enviado com multipart/form-datacodificação.

Ou, se gostarmos mais de JSON, JSON.stringifyenvie como uma string.

Apenas não se esqueça de definir o header Content-Type: application/json, muitos frameworks do lado do servidor decodificam JSON automaticamente com ele:

let xhr = new XMLHttpRequest();

let json = JSON.stringify({
  name: "John",
  surname: "Smith"
});

xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);
O .send(body)método é bastante onívoro. Ele pode enviar quase todos os objetos body, incluindo Blobe BufferSource.

Carregar progresso
O progressevento é acionado apenas no estágio de download.

Ou seja: se fizermos POSTalgo, XMLHttpRequestprimeiro carregamos nossos dados (o corpo da solicitação) e depois baixamos a resposta.

Se estivermos fazendo upload de algo grande, certamente estaremos mais interessados ​​em acompanhar o andamento do upload. Mas xhr.onprogressnão ajuda aqui.

Existe outro objeto, sem métodos, exclusivamente para rastrear eventos de upload: xhr.upload.

Ele gera eventos, semelhantes a xhr, mas xhr.uploados aciona apenas no upload:

loadstart– carregamento iniciado.
progress– dispara periodicamente durante o upload.
abort– carregamento abortado.
error– erro não HTTP.
load– upload concluído com sucesso.
timeout– upload expirou (se timeouta propriedade estiver definida).
loadend– upload concluído com sucesso ou erro.
Exemplo de manipuladores:

xhr.upload.onprogress = function(event) {
  alert(`Uploaded ${event.loaded} of ${event.total} bytes`);
};

xhr.upload.onload = function() {
  alert(`Upload finished successfully.`);
};

xhr.upload.onerror = function() {
  alert(`Error during the upload: ${xhr.status}`);
};
Aqui está um exemplo da vida real: upload de arquivo com indicação de progresso:

<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // track upload progress
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };

  // track completion: both successful or not
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
Solicitações de origem cruzada
XMLHttpRequestpode fazer solicitações de origem cruzada, usando a mesma política CORS de fetch .

Assim como fetch, ele não envia cookies e autorização HTTP para outra origem por padrão. Para ativá-los, defina xhr.withCredentialscomo true:

let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.open('POST', 'http://anywhere.com/request');
...
Consulte o capítulo Buscar: Solicitações de origem cruzada para obter detalhes sobre cabeçalhos de origem cruzada.

Resumo
Código típico da solicitação GET com XMLHttpRequest:

let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP error?
    // handle error
    alert( 'Error: ' + xhr.status);
    return;
  }

  // get the response from xhr.response
};

xhr.onprogress = function(event) {
  // report progress
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
  // handle non-HTTP error (e.g. network down)
};
Na verdade, existem mais eventos, a especificação moderna os lista (na ordem do ciclo de vida):

loadstart– o pedido foi iniciado.
progress– um pacote de dados da resposta chegou, todo o corpo da resposta no momento está em response.
abort– o pedido foi cancelado pela chamada xhr.abort().
error– ocorreu um erro de conexão, por exemplo, nome de domínio incorreto. Não acontece para erros de HTTP como 404.
load– a solicitação foi finalizada com sucesso.
timeout– o pedido foi cancelado por timeout (só acontece se estiver definido).
loadend– dispara após load, error, timeoutou abort.
Os eventos error, abort, timeoute são mutuamente exclusivos. loadApenas um deles pode acontecer.

Os eventos mais usados ​​são conclusão de carregamento ( load), falha de carregamento ( error), ou podemos usar um único loadendmanipulador e verificar as propriedades do objeto de solicitação xhrpara ver o que aconteceu.

Já vimos outro evento: readystatechange. Historicamente, apareceu há muito tempo, antes que a especificação fosse estabelecida. Hoje em dia, não há necessidade de usá-lo, podemos substituí-lo por eventos mais recentes, mas muitas vezes pode ser encontrado em scripts mais antigos.

Se precisarmos rastrear o upload especificamente, devemos ouvir os mesmos eventos no xhr.uploadobjeto.

*/