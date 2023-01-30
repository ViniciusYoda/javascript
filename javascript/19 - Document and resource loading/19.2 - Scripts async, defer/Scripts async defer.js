/*

Scripts: assíncrono, adiar
Em sites modernos, os scripts costumam ser “mais pesados” que o HTML: o tamanho do download é maior e o tempo de processamento também é maior.

Quando o navegador carrega o HTML e encontra uma <script>...</script>tag, ele não pode continuar construindo o DOM. Ele deve executar o script agora. O mesmo acontece com os scripts externos <script src="..."></script>: o navegador deve aguardar o download do script, executar o script baixado e só então processar o restante da página.

Isso leva a duas questões importantes:

Os scripts não podem ver os elementos DOM abaixo deles, portanto, não podem adicionar manipuladores, etc.
Se houver um script volumoso no topo da página, ele “bloqueia a página”. Os usuários não podem ver o conteúdo da página até que ela seja baixada e executada:
<p>...content before script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- This isn't visible until the script loads -->
<p>...content after script...</p>
Existem algumas soluções alternativas para isso. Por exemplo, podemos colocar um script na parte inferior da página. Em seguida, ele pode ver os elementos acima dele e não bloqueia a exibição do conteúdo da página:

<body>
  ...all content is above the script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
Mas esta solução está longe de ser perfeita. Por exemplo, o navegador percebe o script (e pode começar a baixá-lo) somente depois de baixar o documento HTML completo. Para documentos HTML longos, isso pode ser um atraso perceptível.

Essas coisas são invisíveis para pessoas que usam conexões muito rápidas, mas muitas pessoas no mundo ainda têm velocidades de internet lentas e usam uma conexão de internet móvel longe de ser perfeita.

Felizmente, existem dois <script>atributos que resolvem o problema para nós: defere async.

adiar
O deferatributo diz ao navegador para não esperar pelo script. Em vez disso, o navegador continuará processando o HTML, construindo o DOM. O script carrega “em segundo plano” e, em seguida, é executado quando o DOM é totalmente construído.

Aqui está o mesmo exemplo acima, mas com defer:

<p>...content before script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- visible immediately -->
<p>...content after script...</p>
Em outras palavras:

Scripts com defernunca bloqueiam a página.
Scripts defersempre são executados quando o DOM está pronto (mas antes do DOMContentLoadedevento).
O exemplo a seguir demonstra a segunda parte:

<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...content after scripts...</p>
O conteúdo da página aparece imediatamente.
DOMContentLoadedo manipulador de eventos aguarda o script adiado. Ele só é acionado quando o script é baixado e executado.
Os scripts adiados mantêm sua ordem relativa, assim como os scripts regulares.

Digamos que temos dois scripts adiados: the long.jsand then small.js:

<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
Os navegadores verificam a página em busca de scripts e os baixam em paralelo, para melhorar o desempenho. Assim, no exemplo acima, ambos os scripts são baixados em paralelo. O small.jsprovavelmente termina primeiro.

…Mas o deferatributo, além de dizer ao navegador “não bloquear”, garante que a ordem relativa seja mantida. Portanto, mesmo que small.jscarregue primeiro, ele ainda espera e executa após a long.jsexecução.

Isso pode ser importante para casos em que precisamos carregar uma biblioteca JavaScript e depois um script que depende dela.

O deferatributo é apenas para scripts externos
O deferatributo é ignorado se a <script>tag não tiver src.

assíncrono
O asyncatributo é um pouco como defer. Isso também torna o script sem bloqueio. Mas tem diferenças importantes no comportamento.

O asyncatributo significa que um script é completamente independente:

O navegador não bloqueia asyncscripts (como defer).
Outros scripts não esperam por asyncscripts e asyncscripts não esperam por eles.
DOMContentLoadede scripts assíncronos não esperam um pelo outro:
DOMContentLoadedpode acontecer antes de um script assíncrono (se um script assíncrono terminar de carregar depois que a página for concluída)
…ou depois de um script assíncrono (se um script assíncrono for curto ou estiver no cache HTTP)
Em outras palavras, asyncos scripts são carregados em segundo plano e executados quando estiverem prontos. O DOM e outros scripts não esperam por eles e não esperam por nada. Um script totalmente independente que é executado quando carregado. Tão simples quanto possível, certo?

Aqui está um exemplo semelhante ao que vimos com defer: dois scripts long.jse small.js, mas agora com asyncem vez de defer.

Eles não esperam um pelo outro. O que quer que seja carregado primeiro (provavelmente small.js) – é executado primeiro:

<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
O conteúdo da página aparece imediatamente: asyncnão o bloqueia.
DOMContentLoadedpode acontecer antes e depois async, não há garantias aqui.
Um script menor small.jsvai em segundo lugar, mas provavelmente carrega antes long.jsde , então small.jsé executado primeiro. Embora possa ser long.jscarregado primeiro, se armazenado em cache, ele é executado primeiro. Em outras palavras, os scripts assíncronos são executados na ordem “carregar primeiro”.
Os scripts assíncronos são ótimos quando integramos um script independente de terceiros na página: contadores, anúncios e assim por diante, pois eles não dependem de nossos scripts e nossos scripts não devem esperar por eles:

<!-- Google Analytics is usually added like this -->
<script async src="https://google-analytics.com/analytics.js"></script>
O asyncatributo é apenas para scripts externos
Assim como defer, o asyncatributo é ignorado se a <script>tag não tiver src.

scripts dinâmicos
Há mais uma maneira importante de adicionar um script à página.

Podemos criar um script e anexá-lo ao documento dinamicamente usando JavaScript:

let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
O script começa a carregar assim que é anexado ao documento (*).

Os scripts dinâmicos se comportam como “assíncronos” por padrão.

Isso é:

Eles não esperam por nada, nada espera por eles.
O script que carrega primeiro – é executado primeiro (ordem “carregar primeiro”).
Isso pode ser alterado se definirmos explicitamente script.async=false. Em seguida, os scripts serão executados na ordem do documento, assim como defer.

Neste exemplo, loadScript(src)a função adiciona um script e também define asynccomo false.

Portanto, long.jssempre é executado primeiro (como é adicionado primeiro):

function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js runs first because of async=false
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
Sem script.async=false, os scripts seriam executados na ordem padrão de carregamento primeiro ( small.jsprovavelmente o primeiro).

Novamente, como com o defer, a ordem é importante se quisermos carregar uma biblioteca e outro script que dependa dela.

Resumo
Ambos têm uma coisa asyncem defercomum: o download desses scripts não bloqueia a renderização da página. Assim, o usuário pode ler o conteúdo da página e se familiarizar com a página imediatamente.

Mas também há diferenças essenciais entre eles:

Ordem	DOMContentLoaded
async	Carregar primeiro pedido . A ordem dos documentos não importa - o que carrega primeiro é executado primeiro	Irrelevante. Pode carregar e executar enquanto o documento ainda não foi totalmente baixado. Isso acontece se os scripts forem pequenos ou armazenados em cache e o documento for longo o suficiente.
defer	Ordem dos documentos (conforme vão no documento).	Execute depois que o documento for carregado e analisado (eles esperam se necessário), logo antes DOMContentLoadedde .
Na prática, deferé usado para scripts que precisam de todo o DOM e/ou sua ordem relativa de execução é importante.

E asyncé usado para scripts independentes, como contadores ou anúncios. E sua ordem de execução relativa não importa.

A página sem scripts deve ser utilizável
Observação: se você estiver usando deferou async, o usuário verá a página antes do carregamento do script.

Nesse caso, alguns componentes gráficos provavelmente ainda não foram inicializados.

Não se esqueça de colocar a indicação de “carregando” e desabilitar os botões que ainda não estão funcionando. Deixe o usuário ver claramente o que ele pode fazer na página, e o que ainda está sendo preparado.

*/