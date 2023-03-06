/*

Shadow DOM
Shadow DOM serve para encapsulamento. Ele permite que um componente tenha sua própria árvore DOM “sombra”, que não pode ser acessada acidentalmente a partir do documento principal, pode ter regras de estilo locais e muito mais.

DOM de sombra integrado
Você já pensou em como os controles complexos do navegador são criados e estilizados?

Tais como <input type="range">:



O navegador usa DOM/CSS internamente para desenhá-los. Essa estrutura DOM normalmente fica oculta para nós, mas podemos vê-la nas ferramentas de desenvolvedor. Por exemplo, no Chrome, precisamos habilitar a opção “Mostrar sombra DOM do agente do usuário” nas ferramentas de desenvolvimento.

Então <input type="range">fica assim:


O que você vê abaixo #shadow-rooté chamado de “shadow DOM”.

Não podemos obter elementos DOM de sombra integrados por chamadas ou seletores regulares de JavaScript. Estas não são crianças normais, mas uma poderosa técnica de encapsulamento.

No exemplo acima, podemos ver um atributo útil pseudo. Não é padrão, existe por razões históricas. Podemos usar subelementos de estilo com CSS, assim:

<style>
/* make the slider track red *//*
input::-webkit-slider-runnable-track {
   background: red;
 }
 </style>
 
 <input type="range">
 
 Mais uma vez, pseudoé um atributo não padrão. Cronologicamente, os navegadores começaram a experimentar estruturas DOM internas para implementar controles e, depois de algum tempo, o shadow DOM foi padronizado para permitir que nós, desenvolvedores, fizéssemos algo semelhante.
 
 Mais adiante, usaremos o moderno padrão shadow DOM, coberto pela especificação DOM e outras especificações relacionadas.
 
 árvore de sombra
 Um elemento DOM pode ter dois tipos de subárvores DOM:
 
 Light tree – uma subárvore regular do DOM, feita de filhos HTML. Todas as subárvores que vimos nos capítulos anteriores eram “light”.
 Árvore de sombra – uma subárvore DOM oculta, não refletida em HTML, oculta de olhares indiscretos.
 Se um elemento tiver ambos, o navegador renderizará apenas a árvore de sombra. Mas podemos configurar um tipo de composição entre árvores de sombra e luz também. Veremos os detalhes posteriormente no capítulo Shadow DOM slots, composição .
 
 A árvore de sombra pode ser usada em elementos personalizados para ocultar componentes internos e aplicar estilos locais de componentes.
 
 Por exemplo, este <show-hello>elemento esconde seu DOM interno na árvore de sombra:
 
 <script>
 customElements.define('show-hello', class extends HTMLElement {
   connectedCallback() {
     const shadow = this.attachShadow({mode: 'open'});
     shadow.innerHTML = `<p>
       Hello, ${this.getAttribute('name')}
     </p>`;
   }
 });
 </script>
 
 <show-hello name="John"></show-hello>
 
 É assim que o DOM resultante aparece nas ferramentas de desenvolvimento do Chrome, todo o conteúdo está em “#shadow-root”:
 
 
 Primeiro, a chamada para elem.attachShadow({mode: …})cria uma árvore de sombra.
 
 Existem duas limitações:
 
 Podemos criar apenas uma raiz de sombra por elemento.
 O elemdeve ser um elemento personalizado ou um dos seguintes: “article”, “aside”, “blockquote”, “body”, “div”, “footer”, “h1…h6”, “header”, “main” “ nav”, “p”, “seção” ou “span”. Outros elementos, como <img>, não podem hospedar a árvore de sombra.
 A modeopção define o nível de encapsulamento. Deve ter qualquer um dos dois valores:
 
 "open"– a raiz sombra está disponível como elem.shadowRoot.
 
 Qualquer código é capaz de acessar a árvore de sombra de elem.
 
 "closed"– elem.shadowRooté sempre null.
 
 Só podemos acessar o shadow DOM pela referência retornada por attachShadow(e provavelmente escondida dentro de uma classe). Árvores de sombra nativas do navegador, como <input type="range">, são fechadas. Não há como acessá-los.
 
 A raiz sombra , retornada por attachShadow, é como um elemento: podemos usar innerHTMLou métodos DOM, como append, para preenchê-la.
 
 O elemento com uma raiz de sombra é chamado de “host de árvore de sombra” e está disponível como a hostpropriedade de raiz de sombra:
 
 // assuming {mode: "open"}, otherwise elem.shadowRoot is null
 alert(elem.shadowRoot.host === elem); // true
 Encapsulamento
 O Shadow DOM é fortemente delimitado do documento principal:
 
 Os elementos Shadow DOM não são visíveis a querySelectorpartir do Light DOM. Em particular, os elementos Shadow DOM podem ter IDs que entram em conflito com aqueles no light DOM. Eles devem ser únicos apenas dentro da árvore de sombra.
 O Shadow DOM possui folhas de estilo próprias. As regras de estilo do DOM externo não são aplicadas.
 Por exemplo:
 
 <style>
   /* document style won't apply to the shadow tree inside #elem (1) *//*
   p { color: red; }
 </style>
 
 <div id="elem"></div>
 
 <script>
   elem.attachShadow({mode: 'open'});
     // shadow tree has its own style (2)
   elem.shadowRoot.innerHTML = `
     <style> p { font-weight: bold; } </style>
     <p>Hello, John!</p>
   `;
 
   // <p> is only visible from queries inside the shadow tree (3)
   alert(document.querySelectorAll('p').length); // 0
   alert(elem.shadowRoot.querySelectorAll('p').length); // 1
 </script>
 O estilo do documento não afeta a árvore de sombra.
 …Mas o estilo de dentro funciona.
 Para obter elementos na árvore de sombra, devemos consultar de dentro da árvore.
 Referências
 DOM: https://dom.spec.whatwg.org/#shadow-trees
 Compatibilidade: https://caniuse.com/#feat=shadowdomv1
 Shadow DOM é mencionado em muitas outras especificações, por exemplo, DOM Parsing especifica que shadow root tem innerHTML.
 Resumo
 Shadow DOM é uma maneira de criar um DOM local de componente.
 
 shadowRoot = elem.attachShadow({mode: open|closed})– cria shadow DOM para elem. Se mode="open", então é acessível como elem.shadowRootpropriedade.
 Podemos preencher shadowRootusando innerHTMLou outros métodos DOM.
 Elementos do Shadow DOM:
 
 Ter seu próprio espaço de ids,
 Invisível para seletores JavaScript do documento principal, como querySelector,
 Use estilos somente da árvore de sombra, não do documento principal.
 O Shadow DOM, se existir, é renderizado pelo navegador em vez do chamado “light DOM” (filhos normais). No capítulo Shadow DOM slots, composição veremos como compô-los.
 
 */