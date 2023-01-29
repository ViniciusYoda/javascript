/*

Página: DOMContentLoaded, carregar, antes de descarregar, descarregar
O ciclo de vida de uma página HTML tem três eventos importantes:

DOMContentLoaded– o navegador totalmente carregado HTML e a árvore DOM é construída, mas recursos externos como imagens <img>e folhas de estilo podem ainda não ter sido carregados.
load– não apenas o HTML é carregado, mas também todos os recursos externos: imagens, estilos etc.
beforeunload/unload– o usuário está saindo da página.
Cada evento pode ser útil:

DOMContentLoadedevento – DOM está pronto, então o manipulador pode procurar nós DOM, inicializar a interface.
loadevento – os recursos externos são carregados, então os estilos são aplicados, os tamanhos das imagens são conhecidos, etc.
beforeunloadevento – o usuário está saindo: podemos verificar se o usuário salvou as alterações e perguntar se ele realmente deseja sair.
unload– o usuário quase saiu, mas ainda podemos iniciar algumas operações, como enviar estatísticas.
Vamos explorar os detalhes desses eventos.

DOMContentLoaded
O DOMContentLoadedevento acontece no documentobjeto.

Devemos usar addEventListenerpara capturá-lo:

document.addEventListener("DOMContentLoaded", ready);
// not "document.onDOMContentLoaded = ..."
Por exemplo:

<script>
  function ready() {
    alert('DOM is ready');

    // image is not yet loaded (unless it was cached), so the size is 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

  document.addEventListener("DOMContentLoaded", ready);
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">

No exemplo, o DOMContentLoadedmanipulador é executado quando o documento é carregado, para que ele possa ver todos os elementos, inclusive <img>abaixo.

Mas não espera a imagem carregar. Então alertmostra tamanhos zero.

À primeira vista, o DOMContentLoadedevento é muito simples. A árvore DOM está pronta – aqui está o evento. Existem poucas peculiaridades embora.

DOMContentLoaded e scripts
Quando o navegador processa um documento HTML e encontra uma <script>tag, ele precisa executá-lo antes de continuar construindo o DOM. Isso é uma precaução, pois os scripts podem querer modificar o DOM e até mesmo document.writenele, então DOMContentLoadedé preciso esperar.

Portanto, DOMContentLoaded definitivamente acontece após esses scripts:

<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("DOM ready!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("Library loaded, inline script executed");
</script>
No exemplo acima, vemos primeiro “Biblioteca carregada…” e depois “DOM pronto!” (todos os scripts são executados).

Scripts que não bloqueiam DOMContentLoaded
Há duas exceções a esta regra:

Scripts com o asyncatributo, que abordaremos um pouco mais tarde , não bloqueiam DOMContentLoaded.
Os scripts que são gerados dinamicamente document.createElement('script')e adicionados à página da Web também não bloqueiam esse evento.
DOMContentLoaded e estilos
Folhas de estilo externas não afetam o DOM, então DOMContentLoadednão espere por elas.

Mas há uma armadilha. Se tivermos um script após o estilo, esse script deverá aguardar até que a folha de estilo seja carregada:

<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // the script doesn't execute until the stylesheet is loaded
  alert(getComputedStyle(document.body).marginTop);
</script>
A razão para isso é que o script pode querer obter coordenadas e outras propriedades de elementos dependentes de estilo, como no exemplo acima. Naturalmente, ele precisa aguardar o carregamento dos estilos.

Como DOMContentLoadedespera por scripts, agora espera por estilos antes deles também.

Preenchimento automático do navegador integrado
Formulários de preenchimento automático do Firefox, Chrome e Opera em arquivos DOMContentLoaded.

Por exemplo, se a página possui um formulário com login e senha, e o navegador lembrou dos valores, então DOMContentLoadednela pode tentar preenchê-los automaticamente (se aprovado pelo usuário).

Portanto, se DOMContentLoadedfor adiado por scripts de carregamento longo, o preenchimento automático também aguardará. Você provavelmente viu isso em alguns sites (se você usar o preenchimento automático do navegador) – os campos de login/senha não são preenchidos automaticamente imediatamente, mas há um atraso até que a página carregue totalmente. Na verdade, é o atraso até o DOMContentLoadedevento.

window.onload
O loadevento no windowobjeto é acionado quando toda a página é carregada, incluindo estilos, imagens e outros recursos. Este evento está disponível através da onloadpropriedade.

O exemplo abaixo mostra corretamente os tamanhos das imagens, pois window.onloadespera por todas as imagens:

<script>
  window.onload = function() { // can also use window.addEventListener('load', (event) => {
    alert('Page loaded');

    // image is loaded at this time
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
window.onunload
Quando um visitante sai da página, o unloadevento é acionado em window. Podemos fazer algo que não envolva atrasos, como fechar janelas pop-up relacionadas.

A exceção notável é o envio de analytics.

Digamos que coletamos dados sobre como a página é usada: cliques do mouse, rolagens, áreas da página visualizadas e assim por diante.

Naturalmente, unloado evento é quando o usuário nos deixa e gostaríamos de salvar os dados em nosso servidor.

Existe um navigator.sendBeacon(url, data)método especial para tais necessidades, descrito na especificação https://w3c.github.io/beacon/ .

Ele envia os dados em segundo plano. A transição para outra página não é atrasada: o navegador sai da página, mas ainda executa sendBeacon.

Veja como usá-lo:

let analyticsData = { /* object with gathered data *//* };

window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
});
A solicitação é enviada como POST.
Podemos enviar não apenas uma string, mas também formulários e outros formatos, conforme descrito no capítulo Fetch , mas geralmente é um objeto stringificado.
Os dados são limitados por 64kb.
Quando a sendBeaconsolicitação é finalizada, o navegador provavelmente já saiu do documento, então não há como obter a resposta do servidor (que geralmente está vazio para análise).

Há também um keepalivesinalizador para fazer essas solicitações “depois da esquerda da página” no método de busca para solicitações de rede genéricas. Você pode encontrar mais informações no capítulo Fetch API .

Se quisermos cancelar a transição para outra página, não podemos fazê-lo aqui. Mas podemos usar outro evento – onbeforeunload.

window.onbeforeunload
Se um visitante iniciar a navegação fora da página ou tentar fechar a janela, o beforeunloadmanipulador solicitará uma confirmação adicional.

Se cancelarmos o evento, o navegador pode perguntar ao visitante se ele tem certeza.

Você pode experimentá-lo executando este código e, em seguida, recarregando a página:

window.onbeforeunload = function() {
  return false;
};
Por razões históricas, retornar uma string não vazia também conta como cancelar o evento. Algum tempo atrás, os navegadores costumavam mostrá-lo como uma mensagem, mas, como diz a especificação moderna , não deveriam.

Aqui está um exemplo:

window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
O comportamento foi alterado, porque alguns webmasters abusaram desse manipulador de eventos, exibindo mensagens enganosas e irritantes. Portanto, no momento, os navegadores antigos ainda podem exibi-lo como uma mensagem, mas, além disso, não há como personalizar a mensagem exibida ao usuário.

O event.preventDefault()não funciona de um beforeunloadmanipulador
Isso pode soar estranho, mas a maioria dos navegadores ignora arquivos event.preventDefault().

O que significa que o seguinte código pode não funcionar:

window.addEventListener("beforeunload", (event) => {
  // doesn't work, so this event handler doesn't do anything
  event.preventDefault();
});
Em vez disso, em tais manipuladores, deve-se definir event.returnValueuma string para obter o resultado semelhante ao código acima:

window.addEventListener("beforeunload", (event) => {
  // works, same as returning from window.onbeforeunload
  event.returnValue = "There are unsaved changes. Leave now?";
});
estado pronto
O que acontece se definirmos o DOMContentLoadedmanipulador depois que o documento for carregado?

Naturalmente, ele nunca é executado.

Há casos em que não temos certeza se o documento está pronto ou não. Gostaríamos que nossa função fosse executada quando o DOM for carregado, seja agora ou mais tarde.

A document.readyStatepropriedade nos informa sobre o estado de carregamento atual.

Existem 3 valores possíveis:

"loading"– o documento está sendo carregado.
"interactive"– o documento foi lido na íntegra.
"complete"– o documento foi totalmente lido e todos os recursos (como imagens) também foram carregados.
Assim, podemos verificar document.readyStatee configurar um manipulador ou executar o código imediatamente, se estiver pronto.

Como isso:

function work() { /*...*/ /*}

if (document.readyState == 'loading') {
  // still loading, wait for the event
  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM is ready!
  work();
}
Há também o readystatechangeevento que dispara quando o estado muda, então podemos imprimir todos esses estados assim:

// current state
console.log(document.readyState);

// print state changes
document.addEventListener('readystatechange', () => console.log(document.readyState));
O readystatechangeevento é uma mecânica alternativa de rastrear o estado de carregamento do documento, surgiu há muito tempo. Hoje em dia, raramente é usado.

Vamos ver o fluxo completo de eventos para a completude.

Aqui está um documento com <iframe>, <img>e manipuladores que registram eventos:

<script>
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="https://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
O exemplo de trabalho está na caixa de areia .

A saída típica:

[1] estado inicial pronto: carregando
[2] estado pronto: interativo
[2] DOMContentLoaded
[3] iframe ao carregar
[4] img ao carregar
[4] estado pronto: completo
[4] janela ao carregar
Os números entre colchetes denotam o tempo aproximado de quando isso acontece. Eventos rotulados com o mesmo dígito acontecem aproximadamente ao mesmo tempo (± alguns ms).

document.readyStatetorna -se interactivelogo antes DOMContentLoaded. Essas duas coisas realmente significam o mesmo.
document.readyStatetorna -se completequando todos os recursos ( iframee img) são carregados. Aqui podemos ver que isso acontece quase ao mesmo tempo que img.onload( imgé o último recurso) e window.onload. Mudar para completeo estado significa o mesmo que window.onload. A diferença é que window.onloadsempre funciona depois de todos os outros loadmanipuladores.
Resumo
Eventos de carregamento de página:

O DOMContentLoadedevento é acionado documentquando o DOM está pronto. Podemos aplicar JavaScript a elementos nesta fase.
Script como <script>...</script>ou <script src="..."></script>bloco DOMContentLoaded, o navegador espera que eles sejam executados.
Imagens e outros recursos também podem continuar carregando.
O loadevento on windowé acionado quando a página e todos os recursos são carregados. Raramente usamos, porque geralmente não há necessidade de esperar tanto tempo.
O beforeunloadevento on windowdispara quando o usuário deseja sair da página. Se cancelarmos o evento, o navegador pergunta se o usuário realmente deseja sair (por exemplo, temos alterações não salvas).
O unloadevento on windowdispara quando o usuário finalmente está saindo, no handler só podemos fazer coisas simples que não envolvam atrasos ou perguntas a um usuário. Devido a essa limitação, raramente é usado. Podemos enviar uma solicitação de rede com navigator.sendBeacon.
document.readyStateé o estado atual do documento, as alterações podem ser rastreadas no readystatechangeevento:
loading– o documento está sendo carregado.
interactive– o documento é analisado, acontece aproximadamente ao mesmo tempo que DOMContentLoaded, mas antes dele.
complete– o documento e os recursos são carregados, acontece mais ou menos ao mesmo tempo que window.onload, mas antes dele.

*/