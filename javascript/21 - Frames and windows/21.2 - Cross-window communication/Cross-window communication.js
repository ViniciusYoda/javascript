/*

Comunicação entre janelas
A política “Same Origin” (mesmo site) limita o acesso de janelas e molduras entre si.

A ideia é que, se um usuário tiver duas páginas abertas: uma de john-smith.come outra de gmail.com, ele não gostaria que um script de john-smith.comlesse nosso e-mail de gmail.com. Portanto, o objetivo da política de “mesma origem” é proteger os usuários contra roubo de informações.

Mesma Origem
Duas URLs são ditas como tendo a “mesma origem” se tiverem o mesmo protocolo, domínio e porta.

Todos esses URLs compartilham a mesma origem:

http://site.com
http://site.com/
http://site.com/my/page.html
Estes não:

http://www.site.com(outro domínio: www.importa)
http://site.org(outro domínio: .orgimporta)
https://site.com(outro protocolo: https)
http://site.com:8080(outra porta: 8080)
A política de “mesma origem” afirma que:

se tivermos uma referência a outra janela, por exemplo, um pop-up criado por window.openou uma janela dentro <iframe>de , e essa janela vier da mesma origem, teremos acesso total a essa janela.
caso contrário, se vier de outra origem, não poderemos acessar o conteúdo dessa janela: variáveis, documento, qualquer coisa. A única exceção é location: podemos alterá-lo (redirecionando assim o usuário). Mas não podemos ler a localização (portanto, não podemos ver onde o usuário está agora, sem vazamento de informações).
Em ação: iframe
Uma <iframe>tag hospeda uma janela incorporada separada, com seus próprios objetos documente separados.window

Podemos acessá-los usando as propriedades:

iframe.contentWindowpara obter a janela dentro do arquivo <iframe>.
iframe.contentDocumentpara colocar o documento dentro de <iframe>, abreviação de iframe.contentWindow.document.
Quando acessamos algo dentro da janela incorporada, o navegador verifica se o iframe tem a mesma origem. Se não for assim, o acesso é negado (escrever para locationé uma exceção, ainda é permitido).

Por exemplo, vamos tentar ler e escrever <iframe>de outra origem:

<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // we can get the reference to the inner window
    let iframeWindow = iframe.contentWindow; // OK
    try {
      // ...but not to the document inside it
      let doc = iframe.contentDocument; // ERROR
    } catch(e) {
      alert(e); // Security Error (another origin)
    }

    // also we can't READ the URL of the page in iframe
    try {
      // Can't read URL from the Location object
      let href = iframe.contentWindow.location.href; // ERROR
    } catch(e) {
      alert(e); // Security Error
    }

    // ...we can WRITE into location (and thus load something else into the iframe)!
    iframe.contentWindow.location = '/'; // OK

    iframe.onload = null; // clear the handler, not to run it after the location change
  };
</script>
O código acima mostra erros para todas as operações, exceto:

Obtendo a referência para a janela interna iframe.contentWindow– isso é permitido.
Escrevendo para location.
Ao contrário disso, se o <iframe>tiver a mesma origem, podemos fazer qualquer coisa com ele:

<!-- iframe from the same site -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // just do anything
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
iframe.onloadvsiframe.contentWindow.onload
O iframe.onloadevento (no <iframe>tag) é essencialmente o mesmo que iframe.contentWindow.onload(no objeto de janela incorporado). Ele é acionado quando a janela incorporada carrega totalmente com todos os recursos.

…Mas não podemos acessar iframe.contentWindow.onloadum iframe de outra origem, então usar iframe.onload.

Windows em subdomínios: document.domain
Por definição, duas URLs com domínios diferentes têm origens diferentes.

Mas se as janelas compartilham o mesmo domínio de segundo nível, por exemplo john.site.com, peter.site.come site.com(para que seu domínio de segundo nível comum seja site.com), podemos fazer o navegador ignorar essa diferença, para que possam ser tratadas como provenientes da “mesma origem”. para fins de comunicação entre janelas.

Para fazê-lo funcionar, cada uma dessas janelas deve executar o código:

document.domain = 'site.com';
Isso é tudo. Agora eles podem interagir sem limitações. Novamente, isso só é possível para páginas com o mesmo domínio de segundo nível.

Obsoleto, mas ainda funcionando
A document.domainpropriedade está em processo de remoção da especificação . A mensagem entre janelas (explicada logo abaixo) é a substituição sugerida.

Dito isso, a partir de agora todos os navegadores o suportam. E o suporte será mantido para o futuro, para não quebrar o código antigo que depende do document.domain.

Iframe: armadilha de documento errado
Quando um iframe vem da mesma origem e podemos acessar seu document, existe uma armadilha. Não está relacionado a coisas de origem cruzada, mas é importante saber.

Após sua criação, um iframe imediatamente possui um documento. Mas esse documento é diferente daquele que carrega nele!

Portanto, se fizermos algo com o documento imediatamente, isso provavelmente será perdido.

Olhe aqui:

<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
    // the loaded document is not the same as initial!
    alert(oldDoc == newDoc); // false
  };
</script>
Não devemos trabalhar com o documento de um iframe ainda não carregado, porque esse é o documento errado . Se definirmos quaisquer manipuladores de eventos nele, eles serão ignorados.

Como detectar o momento em que o documento está lá?

O documento certo está definitivamente no lugar quando iframe.onload dispara. Mas só é acionado quando todo o iframe com todos os recursos é carregado.

Podemos tentar capturar o momento anterior usando checks in setInterval:

<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // every 100 ms check if the document is the new one
  let timer = setInterval(() => {
    let newDoc = iframe.contentDocument;
    if (newDoc == oldDoc) return;

    alert("New document is here!");

    clearInterval(timer); // cancel setInterval, don't need it any more
  }, 100);
</script>
Coleção: window.frames
Uma maneira alternativa de obter um objeto de janela para <iframe>– é obtê-lo da coleção nomeada window.frames:

Por número: window.frames[0]– o objeto de janela para o primeiro quadro no documento.
Por nome: window.frames.iframeName– o objeto de janela para o quadro com name="iframeName".
Por exemplo:

<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
Um iframe pode conter outros iframes dentro dele. Os objetos correspondentes windowformam uma hierarquia.

Os links de navegação são:

window.frames– a coleção de janelas “filhos” (para quadros aninhados).
window.parent– a referência à janela “pai” (externa).
window.top– a referência à janela pai superior.
Por exemplo:

window.frames[0].parent === window; // true
Podemos usar a toppropriedade para verificar se o documento atual está aberto dentro de um quadro ou não:

if (window == top) { // current window == window.top?
  alert('The script is in the topmost window, not in a frame');
} else {
  alert('The script runs in a frame!');
}
O atributo iframe “sandbox”
O sandboxatributo permite a exclusão de certas ações dentro de um <iframe>para evitar que ele execute um código não confiável. Ele “coloca” o iframe tratando-o como vindo de outra origem e/ou aplicando outras limitações.

Há um “conjunto padrão” de restrições aplicadas para <iframe sandbox src="...">. Mas pode ser relaxado se fornecermos uma lista separada por espaços de restrições que não devem ser aplicadas como um valor do atributo, assim: <iframe sandbox="allow-forms allow-popups">.

Em outras palavras, um "sandbox"atributo vazio coloca as limitações mais estritas possíveis, mas podemos colocar uma lista delimitada por espaços daqueles que queremos levantar.

Aqui está uma lista de limitações:

allow-same-origin
Por padrão "sandbox", força a política de “origem diferente” para o iframe. Ou seja, faz com que o navegador trate o iframecomo vindo de outra origem, mesmo que srcaponte para o mesmo site. Com todas as restrições implícitas para scripts. Esta opção remove esse recurso.
allow-top-navigation
Permite a iframealteração parent.location.
allow-forms
Permite enviar formulários de iframe.
allow-scripts
Permite executar scripts do arquivo iframe.
allow-popups
Permite pop- window.openups doiframe
Veja o manual para mais.

O exemplo abaixo demonstra um iframe em área restrita com o conjunto padrão de restrições: <iframe sandbox src="...">. Tem algum JavaScript e um formulário.

Por favor, note que nada funciona. Portanto, o conjunto padrão é realmente severo:

Resultadoindex.htmlsandboxed.html
<!doctype html>
<html>

<head>
  <meta charset="UTF-8">
</head>

<body>

  <button onclick="alert(123)">Click to run a script (doesn't work)</button>

  <form action="http://google.com">
    <input type="text">
    <input type="submit" value="Submit (doesn't work)">
  </form>

</body>
</html>
Observe:
O objetivo do "sandbox"atributo é apenas adicionar mais restrições. Ele não pode removê-los. Em particular, ele não pode relaxar as restrições de mesma origem se o iframe vier de outra origem.

Mensagens entre janelas
A postMessageinterface permite que as janelas conversem entre si, independentemente de sua origem.

Portanto, é uma maneira de contornar a política de “mesma origem”. Ele permite que uma janela john-smith.comconverse gmail.come troque informações, mas apenas se ambos concordarem e chamarem as funções JavaScript correspondentes. Isso o torna seguro para os usuários.

A interface tem duas partes.

postar mensagem
A janela que deseja enviar uma mensagem chama o método postMessage da janela receptora. Em outras palavras, se quisermos enviar a mensagem para win, devemos chamar win.postMessage(data, targetOrigin).

Argumentos:

data
Os dados a enviar. Pode ser qualquer objeto, os dados são clonados usando o “algoritmo de serialização estruturada”. O IE suporta apenas strings, então devemos JSON.stringifyobjetos complexos para suportar aquele navegador.
targetOrigin
Especifica a origem da janela de destino, de modo que apenas uma janela da origem especificada receberá a mensagem.
A targetOriginé uma medida de segurança. Lembre-se, se a janela de destino vier de outra origem, não podemos lê- locationla na janela do remetente. Portanto, não podemos ter certeza de qual site está aberto na janela pretendida agora: o usuário pode navegar e a janela do remetente não tem ideia disso.

Especificar targetOrigingarante que a janela só receba os dados se ainda estiver no site certo. Importante quando os dados são confidenciais.

Por exemplo, here winsó receberá a mensagem se tiver um documento da origem http://example.com:

<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
Se não quisermos essa verificação, podemos definir targetOrigincomo *.

<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "*");
</script>
na mensagem
Para receber uma mensagem, a janela de destino deve ter um manipulador no messageevento. Ele dispara quando postMessageé chamado (e targetOrigina verificação é bem-sucedida).

O objeto de evento tem propriedades especiais:

data
Os dados de postMessage.
origin
A origem do remetente, por exemplo http://javascript.info.
source
A referência à janela do remetente. Podemos source.postMessage(...)voltar imediatamente, se quisermos.
Para atribuir esse manipulador, devemos usar addEventListener, uma sintaxe curta window.onmessagenão funciona.

Aqui está um exemplo:

window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // something from an unknown domain, let's ignore it
    return;
  }

  alert( "received: " + event.data );

  // can message back using event.source.postMessage(...)
});
O exemplo completo:

Resultadoiframe.htmlindex.html

Resumo
Para chamar métodos e acessar o conteúdo de outra janela, devemos primeiro ter uma referência a ela.

Para pop-ups, temos estas referências:

Da janela de abertura: window.open– abre uma nova janela e retorna uma referência a ela,
Do pop-up: window.opener– é uma referência à janela de abertura de um pop-up.
Para iframes, podemos acessar as janelas pai/filho usando:

window.frames– uma coleção de objetos de janela aninhados,
window.parent, window.topsão as referências às janelas principal e superior,
iframe.contentWindowé a janela dentro de uma <iframe>tag.
Se as janelas compartilharem a mesma origem (host, porta, protocolo), as janelas poderão fazer o que quiserem umas com as outras.

Caso contrário, as únicas ações possíveis são:

Altere o locationde outra janela (acesso somente para gravação).
Poste uma mensagem nele.
As exceções são:

Windows que compartilham o mesmo domínio de segundo nível: a.site.come b.site.com. Em seguida, definir document.domain='site.com'ambos os coloca no estado de "mesma origem".
Se um iframe tiver um sandboxatributo, ele será forçado a entrar no estado de “origem diferente”, a menos que allow-same-originseja especificado no valor do atributo. Isso pode ser usado para executar código não confiável em iframes do mesmo site.
A postMessageinterface permite que duas janelas com qualquer origem conversem:

O remetente chama targetWin.postMessage(data, targetOrigin).

Caso targetOrigincontrário '*', o navegador verifica se a janela targetWintem a origem targetOrigin.

Se for assim, targetWinaciona o messageevento com propriedades especiais:

origin– a origem da janela do remetente (como http://my.site.com)
source– a referência à janela do remetente.
data– os dados, qualquer objeto em qualquer lugar, exceto IE que suporta apenas strings.
Devemos usar addEventListenerpara definir o manipulador para este evento dentro da janela de destino.

*/

