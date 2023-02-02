/*

O ataque de clickjacking
O ataque de “clickjacking” permite que uma página maligna clique em um “site de vítima” em nome do visitante .

Muitos sites foram invadidos dessa forma, incluindo Twitter, Facebook, Paypal e outros sites. Todos eles foram corrigidos, é claro.

A ideia
A ideia é muito simples.

Veja como o clickjacking foi feito com o Facebook:

Um visitante é atraído para a página do mal. Não importa como.
A página tem um link de aparência inofensiva (como “fique rico agora” ou “clique aqui, muito engraçado”).
Sobre esse link a página do mal posiciona um transparente <iframe>com srcdo facebook.com, de forma que o botão “Curtir” fique logo acima desse link. Normalmente isso é feito com z-index.
Ao tentar clicar no link, o visitante de fato clica no botão.
a demonstração
Aqui está a aparência da página do mal. Para deixar as coisas claras, o <iframe>é meio transparente (em páginas malignas reais é totalmente transparente):

<style>
iframe { /* iframe from the victim site */
/*
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
  opacity: 0.5; /* in real opacity:0 */
  /*
  z-index: 1;
}
</style>

<div>Click to get rich now:</div>

<!-- The url from the victim site -->
<iframe src="/clickjacking/facebook.html"></iframe>

<button>Click here!</button>

<div>...And you're cool (I'm a cool hacker actually)!</div>
A demonstração completa do ataque:

Resultadofacebook.htmlindex.html
<!DOCTYPE HTML>
<html>

<body style="margin:10px;padding:10px">

  <input type="button" onclick="alert('Like pressed on facebook.html!')" value="I LIKE IT !">

</body>

</html>
Aqui temos um semitransparente <iframe src="facebook.html">, e no exemplo podemos vê-lo passando o mouse sobre o botão. Um clique no botão realmente clica no iframe, mas isso não é visível para o usuário, porque o iframe é transparente.

Como resultado, se o visitante estiver autorizado no Facebook (“lembrar de mim” geralmente está ativado), ele adiciona um “Curtir”. No Twitter, seria um botão “Seguir”.

Aqui está o mesmo exemplo, mas mais próximo da realidade, com opacity:0for <iframe>:

Resultadofacebook.htmlindex.html

Tudo o que precisamos para atacar é posicionar o <iframe>na página do mal de forma que o botão fique logo acima do link. Para que, quando um usuário clicar no link, ele realmente clique no botão. Isso geralmente é possível com CSS.

Clickjacking é para cliques, não para teclado
O ataque afeta apenas as ações do mouse (ou similares, como toques no celular).

A entrada do teclado é muito difícil de redirecionar. Tecnicamente, se tivermos um campo de texto para hackear, podemos posicionar um iframe de forma que os campos de texto se sobreponham. Portanto, quando um visitante tenta se concentrar na entrada que vê na página, na verdade ele se concentra na entrada dentro do iframe.

Mas então há um problema. Tudo que o visitante digitar ficará oculto, pois o iframe não está visível.

As pessoas geralmente param de digitar quando não conseguem ver seus novos caracteres impressos na tela.

Defesas antigas (fracas)
A defesa mais antiga é um pouco de JavaScript que proíbe a abertura da página em um quadro (o chamado “framebusting”).

Isso se parece com isso:

if (top != window) {
  top.location = window.location;
}
Ou seja: se a janela descobrir que não está em cima, ela automaticamente se torna o topo.

Esta não é uma defesa confiável, porque há muitas maneiras de burlá-la. Vamos cobrir alguns.

Bloqueando a navegação superior
Podemos bloquear a transição causada pela alteração top.locationno manipulador de eventos beforeunload .

A página superior (incluindo uma, pertencente ao hacker) define um manipulador de prevenção para ela, assim:

window.onbeforeunload = function() {
  return false;
};
Quando o iframetenta mudar top.location, o visitante recebe uma mensagem perguntando se deseja sair.

Na maioria dos casos, o visitante responderia negativamente porque não conhece o iframe – tudo o que eles podem ver é a página inicial, não há motivo para sair. Então top.locationnão vai mudar!

Em ação:

Resultadoiframe.htmlindex.html

Atributo sandbox
Uma das coisas restritas pelo sandboxatributo é a navegação. Um iframe em área restrita não pode mudar top.location.

Assim, podemos adicionar o iframe com sandbox="allow-scripts allow-forms". Isso relaxaria as restrições, permitindo scripts e formulários. Mas omitimos allow-top-navigationpara que a mudança top.locationseja proibida.

Aqui está o código:

<iframe sandbox="allow-scripts allow-forms" src="facebook.html"></iframe>
Existem outras maneiras de contornar essa proteção simples também.

X-Frame-Options
O cabeçalho do lado do servidor X-Frame-Optionspode permitir ou proibir a exibição da página dentro de um quadro.

Deve ser enviado exatamente como cabeçalho HTTP: o navegador irá ignorá-lo se for encontrado na <meta>tag HTML. Então, <meta http-equiv="X-Frame-Options"...>não vai fazer nada.

O cabeçalho pode ter 3 valores:

DENY
Nunca mostre a página dentro de um quadro.
SAMEORIGIN
Permitir dentro de um quadro se o documento pai vier da mesma origem.
ALLOW-FROM domain
Permitir dentro de um quadro se o documento pai for do domínio fornecido.
Por exemplo, o Twitter usa X-Frame-Options: SAMEORIGIN.

Aqui está o resultado:

<iframe src="https://twitter.com"></iframe>

Dependendo do seu navegador, o iframeacima está vazio ou alertando você de que o navegador não permitirá que a página navegue dessa maneira.

Mostrando com funcionalidade desativada
O X-Frame-Optionscabeçalho tem um efeito colateral. Outros sites não poderão mostrar nossa página em um quadro, mesmo que tenham bons motivos para fazê-lo.

Portanto, existem outras soluções… Por exemplo, podemos “cobrir” a página com um <div>estilos height: 100%; width: 100%;, para que intercepte todos os cliques. Isso <div>deve ser removido se window == topdescobrirmos que não precisamos da proteção.

Algo assim:

<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">Go to the site</a>
</div>

<script>
  // there will be an error if top window is from the different origin
  // but that's ok here
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
A demonstração:

Resultadoiframe.htmlindex.html

Atributo de cookie Samesite
O samesiteatributo cookie também pode prevenir ataques de clickjacking.

Um cookie com esse atributo só é enviado para um site se for aberto diretamente, não por meio de um quadro ou de outra forma. Mais informações no capítulo Cookies, document.cookie .

Se o site, como o Facebook, tivesse samesiteatributo em seu cookie de autenticação, assim:

Set-Cookie: authorization=secret; samesite
…Então esse cookie não seria enviado quando o Facebook fosse aberto em iframe de outro site. Então o ataque falharia.

O samesiteatributo cookie não terá efeito quando os cookies não forem usados. Isso pode permitir que outros sites mostrem facilmente nossas páginas públicas não autenticadas em iframes.

No entanto, isso também pode permitir que ataques de clickjacking funcionem em alguns casos limitados. Um site de pesquisa anônima que evita votação duplicada verificando endereços IP, por exemplo, ainda estaria vulnerável a clickjacking porque não autentica usuários usando cookies.

Resumo
Clickjacking é uma forma de “enganar” os usuários para que cliquem no site da vítima, mesmo sem saber o que está acontecendo. Isso é perigoso se houver ações importantes ativadas por clique.

Um hacker pode postar um link para sua página maligna em uma mensagem ou atrair visitantes para sua página por algum outro meio. Existem muitas variações.

De uma perspectiva – o ataque “não é profundo”: tudo o que um hacker está fazendo é interceptar um único clique. Mas, de outra perspectiva, se o hacker souber que outro controle aparecerá após o clique, ele poderá usar mensagens astutas para coagir o usuário a clicar neles também.

O ataque é bastante perigoso porque, quando projetamos a interface do usuário, geralmente não prevemos que um hacker possa clicar em nome do visitante. Assim, as vulnerabilidades podem ser encontradas em lugares totalmente inesperados.

Recomenda-se o uso X-Frame-Options: SAMEORIGINem páginas (ou sites inteiros) que não devem ser visualizados dentro de quadros.
Use uma cobertura <div>se quisermos permitir que nossas páginas sejam exibidas em iframes, mas ainda assim manter a segurança.

*/