/*

Carregamento de recursos: onload e onerror
O navegador nos permite rastrear o carregamento de recursos externos – scripts, iframes, imagens e assim por diante.

Existem dois eventos para isso:

onload– carga bem-sucedida,
onerror- um erro ocorreu.
Carregando um script
Digamos que precisamos carregar um script de terceiros e chamar uma função que reside lá.

Podemos carregá-lo dinamicamente, assim:

let script = document.createElement('script');
script.src = "my.js";

document.head.append(script);
…Mas como executar a função que está declarada dentro desse script? Precisamos esperar até que o script carregue e só então podemos chamá-lo.

Observe:
Para nossos próprios scripts, poderíamos usar módulos JavaScript aqui, mas eles não são amplamente adotados por bibliotecas de terceiros.

script.onload
O principal ajudante é o loadevento. Ele é acionado depois que o script foi carregado e executado.

Por exemplo:

let script = document.createElement('script');

// can load any script, from any domain
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

script.onload = function() {
  // the script creates a variable "_"
  alert( _.VERSION ); // shows library version
};
Assim onload, podemos usar variáveis ​​de script, executar funções etc.

…E se o carregamento falhar? Por exemplo, esse script não existe (erro 404) ou o servidor está inoperante (indisponível).

script.onerror
Os erros que ocorrem durante o carregamento do script podem ser rastreados em um errorevento.

Por exemplo, vamos solicitar um script que não existe:

let script = document.createElement('script');
script.src = "https://example.com/404.js"; // no such script
document.head.append(script);

script.onerror = function() {
  alert("Error loading " + this.src); // Error loading https://example.com/404.js
};
Observe que não podemos obter detalhes de erro HTTP aqui. Não sabemos se foi um erro 404 ou 500 ou algo mais. Só que o carregamento falhou.

Importante:
Eventos onload/ onerroracompanhar apenas o próprio carregamento.

Erros que podem ocorrer durante o processamento e execução do script estão fora do escopo desses eventos. Ou seja: se um script foi carregado com sucesso, ele onloaddispara, mesmo que tenha erros de programação. Para rastrear erros de script, pode-se usar window.onerroro manipulador global.

Outros recursos
Os eventos loade errortambém funcionam para outros recursos, basicamente para qualquer recurso que tenha um arquivo src.

Por exemplo:

let img = document.createElement('img');
img.src = "https://js.cx/clipart/train.gif"; // (*)

img.onload = function() {
  alert(`Image loaded, size ${img.width}x${img.height}`);
};

img.onerror = function() {
  alert("Error occurred while loading image");
};
No entanto, existem algumas notas:

A maioria dos recursos começa a carregar quando são adicionados ao documento. Mas <img>é uma exceção. Ele começa a carregar quando recebe um src (*).
Para <iframe>, o iframe.onloadevento é acionado quando o carregamento do iframe é concluído, tanto para carregamento bem-sucedido quanto em caso de erro.
Isso por razões históricas.

Política de origem cruzada
Existe uma regra: os scripts de um site não podem acessar o conteúdo do outro site. Assim, por exemplo, um script em https://facebook.comnão pode ler a caixa de correio do usuário em https://gmail.com.

Ou, para ser mais preciso, uma origem (domínio/porta/trigêmeo de protocolo) não pode acessar o conteúdo de outra. Portanto, mesmo que tenhamos um subdomínio ou apenas outra porta, essas são origens diferentes sem acesso umas às outras.

Esta regra também afeta recursos de outros domínios.

Se estivermos usando um script de outro domínio e houver um erro nele, não poderemos obter os detalhes do erro.

Por exemplo, vamos pegar um script error.jsque consiste em uma única chamada de função (ruim):

// 📁 error.js
noSuchFunction();
Agora carregue-o do mesmo site onde está localizado:

<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="/article/onload-onerror/crossorigin/error.js"></script>
Podemos ver um bom relatório de erro, como este:

Uncaught ReferenceError: noSuchFunction is not defined
https://javascript.info/article/onload-onerror/crossorigin/error.js, 1:1
Agora vamos carregar o mesmo script de outro domínio:

<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
O relatório é diferente, assim:

Script error.
, 0:0
Os detalhes podem variar dependendo do navegador, mas a ideia é a mesma: qualquer informação sobre as partes internas de um script, incluindo rastreamentos de pilha de erros, fica oculta. Exatamente porque é de outro domínio.

Por que precisamos de detalhes do erro?

Existem muitos serviços (e podemos construir o nosso próprio) que detectam erros globais usando window.onerror, salvam erros e fornecem uma interface para acessá-los e analisá-los. Isso é ótimo, pois podemos ver erros reais, acionados por nossos usuários. Mas se um script vem de outra origem, então não há muita informação sobre erros nele, como acabamos de ver.

A política semelhante de origem cruzada (CORS) também é aplicada para outros tipos de recursos.

Para permitir o acesso de origem cruzada, a <script>tag precisa ter o crossoriginatributo, além do servidor remoto deve fornecer cabeçalhos especiais.

Existem três níveis de acesso de origem cruzada:

Sem crossoriginatributo – acesso proibido.
crossorigin="anonymous"– acesso permitido se o servidor responder com o cabeçalho Access-Control-Allow-Origincom *ou nossa origem. O navegador não envia informações de autorização e cookies para o servidor remoto.
crossorigin="use-credentials"– acesso permitido se o servidor enviar de volta o cabeçalho Access-Control-Allow-Origincom nossa origem e Access-Control-Allow-Credentials: true. O navegador envia informações de autorização e cookies para o servidor remoto.
Observe:
Você pode ler mais sobre o acesso cross-origin no capítulo Fetch: Cross-Origin Requests . Ele descreve o fetchmétodo para solicitações de rede, mas a política é exatamente a mesma.

Algo como “cookies” está fora do nosso escopo atual, mas você pode ler sobre eles no capítulo Cookies, document.cookie .

No nosso caso, não tínhamos nenhum atributo crossorigin. Portanto, o acesso cross-origem foi proibido. Vamos adicioná-lo.

Podemos escolher entre "anonymous"(nenhum cookie enviado, um cabeçalho do lado do servidor necessário) e "use-credentials"(enviar cookies também, dois cabeçalhos do lado do servidor necessários).

Se não nos importamos com cookies, então "anonymous"é o seguinte:

<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script crossorigin="anonymous" src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
Agora, supondo que o servidor forneça um Access-Control-Allow-Origincabeçalho, está tudo bem. Temos o relatório de erro completo.

Resumo
Imagens <img>, estilos externos, scripts e outros recursos fornecem loade erroreventos para rastrear seu carregamento:

loaddispara em uma carga bem-sucedida,
errordispara em uma carga com falha.
A única exceção é <iframe>: por razões históricas ele sempre aciona load, para qualquer finalização de carregamento, mesmo que a página não seja encontrada.

O readystatechangeevento também funciona para recursos, mas raramente é usado, pois load/erroros eventos são mais simples.

*/

