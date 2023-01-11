/*

Propriedades do nó: tipo, tag e conteúdo
Vamos dar uma olhada mais aprofundada nos nós DOM.

Neste capítulo, veremos mais sobre o que são e aprenderemos suas propriedades mais usadas.

classes de nó DOM
Diferentes nós DOM podem ter propriedades diferentes. Por exemplo, um nó de elemento correspondente a tag <a>possui propriedades relacionadas ao link, e aquele correspondente a <input>possui propriedades relacionadas à entrada e assim por diante. Os nós de texto não são iguais aos nós de elemento. Mas também existem propriedades e métodos comuns entre todos eles, porque todas as classes de nós DOM formam uma única hierarquia.

Cada nó DOM pertence à classe interna correspondente.

A raiz da hierarquia é EventTarget , que é herdada por Node , e outros nós DOM herdam dele.

Aqui está a foto, explicações a seguir:


As aulas são:

EventTarget – é a classe “abstrata” raiz para tudo.

Os objetos dessa classe nunca são criados. Ele serve como base, para que todos os nodos DOM suportem os chamados “eventos”, vamos estudá-los mais adiante.

Nó – também é uma classe “abstrata”, servindo como base para os nós DOM.

Ele fornece a funcionalidade principal da árvore: parentNode, nextSibling, childNodese assim por diante (eles são getters). Objetos de Nodeclasse nunca são criados. Mas existem outras classes que herdam dela (e, portanto, herdam a Nodefuncionalidade).

Document , por razões históricas frequentemente herdadas por HTMLDocument(embora a especificação mais recente não o exija) – é um documento como um todo.

O documentobjeto global pertence exatamente a esta classe. Ele serve como um ponto de entrada para o DOM.

CharacterData – uma classe “abstrata”, herdada por:

Text – a classe correspondente a um texto dentro de elementos, por exemplo, Helloem <p>Hello</p>.
Comentário – a classe para comentários. Eles não são mostrados, mas cada comentário se torna um membro do DOM.
Element – ​​é a classe base para elementos DOM.

Ele fornece navegação em nível de elemento como nextElementSibling, childrene métodos de pesquisa como getElementsByTagName, querySelector.

Um navegador suporta não apenas HTML, mas também XML e SVG. Assim a Elementclasse serve de base para classes mais específicas: SVGElement, XMLElement(não precisamos delas aqui) e HTMLElement.

Finalmente, HTMLElement é a classe básica para todos os elementos HTML. Vamos trabalhar com isso na maior parte do tempo.

É herdado por elementos HTML concretos:

HTMLInputElement – ​​a classe para <input>elementos,
HTMLBodyElement – ​​a classe para <body>elementos,
HTMLAnchorElement – ​​a classe para <a>elementos,
…e assim por diante.
Existem muitas outras tags com suas próprias classes que podem ter propriedades e métodos específicos, enquanto alguns elementos, como <span>, <section>, <article>não possuem nenhuma propriedade específica, portanto são instâncias de HTMLElementclasse.

Assim, o conjunto completo de propriedades e métodos de um determinado nó vem como resultado da cadeia de herança.

Por exemplo, vamos considerar o objeto DOM para um <input>elemento. Pertence à classe HTMLInputElement .

Ele obtém propriedades e métodos como uma superposição de (listados em ordem de herança):

HTMLInputElement– esta classe fornece propriedades específicas de entrada,
HTMLElement– fornece métodos de elemento HTML comuns (e getters/setters),
Element– fornece métodos de elementos genéricos,
Node– fornece propriedades de nó DOM comuns,
EventTarget– dá o suporte para eventos (a serem cobertos),
… e finalmente herda de Object, então métodos de “objeto simples” como hasOwnPropertytambém estão disponíveis.
Para ver o nome da classe do nó DOM, podemos lembrar que um objeto geralmente tem a constructorpropriedade. Ele faz referência ao construtor da classe e constructor.nameé seu nome:

alert( document.body.constructor.name ); // HTMLBodyElement
…Ou podemos apenas toString:

alert( document.body ); // [object HTMLBodyElement]
Também podemos usar instanceofpara verificar a herança:

alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true
alert( document.body instanceof EventTarget ); // true
Como podemos ver, nós DOM são objetos JavaScript regulares. Eles usam classes baseadas em protótipos para herança.

Isso também é fácil de ver exibindo um elemento console.dir(elem)em um navegador. Lá no console você pode ver HTMLElement.prototypee Element.prototypeassim por diante.

console.dir(elem)contraconsole.log(elem)
A maioria dos navegadores oferece suporte a dois comandos em suas ferramentas de desenvolvedor: console.loge console.dir. Eles enviam seus argumentos para o console. Para objetos JavaScript, esses comandos geralmente fazem o mesmo.

Mas para elementos DOM eles são diferentes:

console.log(elem)mostra a árvore DOM do elemento.
console.dir(elem)mostra o elemento como um objeto DOM, bom para explorar suas propriedades.
Experimente document.body.

IDL na especificação
Na especificação, as classes DOM não são descritas usando JavaScript, mas uma linguagem de descrição de interface especial (IDL), que geralmente é fácil de entender.

No IDL, todas as propriedades são anexadas com seus tipos. Por exemplo, DOMString, booleane assim por diante.

Aqui está um trecho dele, com comentários:

// Define HTMLInputElement
// The colon ":" means that HTMLInputElement inherits from HTMLElement
interface HTMLInputElement: HTMLElement {
  // here go properties and methods of <input> elements

  // "DOMString" means that the value of a property is a string
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

  // boolean value property (true/false)
  attribute boolean autofocus;
  ...
  // now the method: "void" means that the method returns no value
  void select();
  ...
}
A propriedade "nodeType"
A nodeTypepropriedade fornece mais uma maneira “antiquada” de obter o “tipo” de um nó DOM.

Tem um valor numérico:

elem.nodeType == 1para nós de elemento,
elem.nodeType == 3para nós de texto,
elem.nodeType == 9para o objeto de documento,
existem alguns outros valores na especificação .
Por exemplo:

<body>
  <script>
  let elem = document.body;

  // let's examine: what type of node is in elem?
  alert(elem.nodeType); // 1 => element

  // and its first child is...
  alert(elem.firstChild.nodeType); // 3 => text

  // for the document object, the type is 9
  alert( document.nodeType ); // 9
  </script>
</body>
Em scripts modernos, podemos usar instanceofe outros testes baseados em classe para ver o tipo de nó, mas às vezes nodeTypepode ser mais simples. Podemos apenas ler nodeType, não alterá-lo.

Tag: nodeName e tagName
Dado um nó DOM, podemos ler seu nome de tag nodeNameou tagNamepropriedades:

Por exemplo:

alert( document.body.nodeName ); // BODY
alert( document.body.tagName ); // BODY
Existe alguma diferença entre tagNamee nodeName?

Claro, a diferença se reflete em seus nomes, mas na verdade é um pouco sutil.

A tagNamepropriedade existe apenas para Elementnós.
O nodeNameé definido para qualquer Node:
para elementos significa o mesmo que tagName.
para outros tipos de nó (texto, comentário, etc.) tem uma string com o tipo de nó.
Em outras palavras, tagNameé suportado apenas por nós de elemento (pois se origina da Elementclasse), enquanto nodeNamepode dizer algo sobre outros tipos de nós.

Por exemplo, vamos comparar tagNamee nodeNamepara documente um nó de comentário:

<body><!-- comment -->

  <script>
    // for comment
    alert( document.body.firstChild.tagName ); // undefined (not an element)
    alert( document.body.firstChild.nodeName ); // #comment

    // for document
    alert( document.tagName ); // undefined (not an element)
    alert( document.nodeName ); // #document
  </script>
</body>
Se lidarmos apenas com elementos, podemos usar ambos tagNamee nodeName– não há diferença.

O nome da tag é sempre maiúsculo, exceto no modo XML
O navegador possui dois modos de processamento de documentos: HTML e XML. Normalmente, o modo HTML é usado para páginas da web. O modo XML é ativado quando o navegador recebe um documento XML com o cabeçalho: Content-Type: application/xml+xhtml.

No modo HTML, tagName/nodeNamesempre é maiúsculo: é BODYfor <body>ou <BoDy>.

No modo XML, o caso é mantido “como está”. Atualmente, o modo XML raramente é usado.

innerHTML: o conteúdo
A propriedade innerHTML permite obter o HTML dentro do elemento como uma string.

Também podemos modificá-lo. Portanto, é uma das maneiras mais poderosas de mudar a página.

O exemplo mostra o conteúdo de document.bodye o substitui completamente:

<body>
  <p>A paragraph</p>
  <div>A div</div>

  <script>
    alert( document.body.innerHTML ); // read the current contents
    document.body.innerHTML = 'The new BODY!'; // replace it
  </script>

</body>
Podemos tentar inserir HTML inválido, o navegador corrigirá nossos erros:

<body>

  <script>
    document.body.innerHTML = '<b>test'; // forgot to close the tag
    alert( document.body.innerHTML ); // <b>test</b> (fixed)
  </script>

</body>
Scripts não são executados
Se innerHTMLinsere uma <script>tag no documento – ela se torna parte do HTML, mas não é executada.

Cuidado: “innerHTML+=" faz uma substituição completa
Podemos anexar HTML a um elemento usando elem.innerHTML+="more html".

Como isso:

chatDiv.innerHTML += "<div>Hello<img src='smile.gif'/> !</div>";
chatDiv.innerHTML += "How goes?";
Mas devemos ter muito cuidado ao fazer isso, porque o que está acontecendo não é uma adição, mas uma substituição completa.

Tecnicamente, essas duas linhas fazem o mesmo:

elem.innerHTML += "...";
// is a shorter way to write:
elem.innerHTML = elem.innerHTML + "..."
Em outras palavras, innerHTML+=faz isso:

1. O conteúdo antigo é removido.
2. Em vez disso, escreve-se o novo innerHTML(uma concatenação do antigo e do novo).

Como o conteúdo é “zerado” e reescrito do zero, todas as imagens e outros recursos serão recarregados .

No chatDivexemplo acima, a linha chatDiv.innerHTML+="How goes?"recria o conteúdo HTML e recarrega smile.gif(espero que seja armazenado em cache). Se chatDivhouver muitos outros textos e imagens, o recarregamento ficará claramente visível.

Existem outros efeitos colaterais também. Por exemplo, se o texto existente foi selecionado com o mouse, a maioria dos navegadores removerá a seleção ao reescrever innerHTML. E se houver um <input>com um texto digitado pelo visitante, o texto será removido. E assim por diante.

Felizmente, existem outras maneiras de adicionar HTML além do innerHTML, e as estudaremos em breve.

outerHTML: HTML completo do elemento
A outerHTMLpropriedade contém o HTML completo do elemento. Isso é como innerHTMLmais o próprio elemento.

Aqui está um exemplo:

<div id="elem">Hello <b>World</b></div>

<script>
  alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
</script>
Cuidado: ao contrário innerHTMLde , escrever em outerHTMLnão altera o elemento. Em vez disso, ele o substitui no DOM.

Sim, parece estranho, e estranho é, é por isso que fazemos uma nota separada sobre isso aqui. Dê uma olhada.

Considere o exemplo:

<div>Hello, world!</div>

<script>
  let div = document.querySelector('div');

  // replace div.outerHTML with <p>...</p>
  div.outerHTML = '<p>A new element</p>'; // (*)

  // Wow! 'div' is still the same!
  alert(div.outerHTML); // <div>Hello, world!</div> (**)
</script>
Parece muito estranho, certo?

Na linha (*)que substituímos divpor <p>A new element</p>. No documento externo (o DOM), podemos ver o novo conteúdo em vez do arquivo <div>. Mas, como podemos ver na linha (**), o valor da divvariável antiga não mudou!

A outerHTMLatribuição não modifica o elemento DOM (o objeto referenciado, neste caso, pela variável 'div'), mas o remove do DOM e insere o novo HTML em seu lugar.

Então o que aconteceu em div.outerHTML=...é:

divfoi removido do documento.
Outro pedaço de HTML <p>A new element</p>foi inserido em seu lugar.
divainda tem seu valor antigo. O novo HTML não foi salvo em nenhuma variável.
É muito fácil cometer um erro aqui: modifique div.outerHTMLe continue trabalhando divcomo se tivesse o novo conteúdo nele. Mas não. Tal coisa é correta para innerHTML, mas não para outerHTML.

Podemos escrever para elem.outerHTML, mas devemos ter em mente que isso não altera o elemento para o qual estamos escrevendo ('elem'). Ele coloca o novo HTML em seu lugar. Podemos obter referências aos novos elementos consultando o DOM.

nodeValue/data: conteúdo do nó de texto
A innerHTMLpropriedade é válida apenas para nós de elemento.

Outros tipos de nó, como nós de texto, têm suas contrapartes: nodeValuee datapropriedades. Esses dois são quase os mesmos para uso prático, existem apenas pequenas diferenças de especificação. Então vamos usar data, porque é mais curto.

Um exemplo de leitura do conteúdo de um nó de texto e um comentário:

<body>
  Hello
  <!-- Comment -->
  <script>
    let text = document.body.firstChild;
    alert(text.data); // Hello

    let comment = text.nextSibling;
    alert(comment.data); // Comment
  </script>
</body>
Para nós de texto, podemos imaginar um motivo para lê-los ou modificá-los, mas por que comentários?

Às vezes, os desenvolvedores incorporam informações ou instruções de modelo em HTML neles, assim:

<!-- if isAdmin -->
  <div>Welcome, Admin!</div>
<!-- /if -->
…Então, o JavaScript pode lê-lo a partir da datapropriedade e processar as instruções incorporadas.

textContent: texto puro
O textContentfornece acesso ao texto dentro do elemento: somente texto, menos tudo <tags>.

Por exemplo:

<div id="news">
  <h1>Headline!</h1>
  <p>Martians attack people!</p>
</div>

<script>
  // Headline! Martians attack people!
  alert(news.textContent);
</script>
Como podemos ver, apenas o texto é devolvido, como se todos <tags>fossem cortados, mas o texto neles permanecesse.

Na prática, a leitura desse tipo de texto raramente é necessária.

Escrever para textContenté muito mais útil, pois permite escrever texto de “maneira segura”.

Digamos que temos uma string arbitrária, por exemplo, inserida por um usuário, e queremos mostrá-la.

Com innerHTMLo inseriremos “como HTML”, com todas as tags HTML.
Com textContento inseriremos “como texto”, todos os símbolos são tratados literalmente.
Compare os dois:

<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("What's your name?", "<b>Winnie-the-Pooh!</b>");

  elem1.innerHTML = name;
  elem2.textContent = name;
</script>

1. A primeira <div>recebe o nome “as HTML”: todas as tags se tornam tags, então vemos o nome em negrito.
2. O segundo <div>recebe o nome “como texto”, então vemos literalmente <b>Winnie-the-Pooh!</b>.
Na maioria dos casos, esperamos o texto de um usuário e queremos tratá-lo como texto. Não queremos HTML inesperado em nosso site. Uma atribuição para textContentfaz exatamente isso.

A propriedade “oculta”
O atributo “hidden” e a propriedade DOM especificam se o elemento é visível ou não.

Podemos usá-lo em HTML ou atribuí-lo usando JavaScript, assim:

<div>Both divs below are hidden</div>

<div hidden>With the attribute "hidden"</div>

<div id="elem">JavaScript assigned the property "hidden"</div>

<script>
  elem.hidden = true;
</script>
Tecnicamente, hiddenfunciona da mesma forma que style="display:none". Mas é mais curto para escrever.

Aqui está um elemento piscando:

<div id="elem">A blinking element</div>

<script>
  setInterval(() => elem.hidden = !elem.hidden, 1000);
</script>
Mais propriedades
Os elementos DOM também possuem propriedades adicionais, em particular aquelas que dependem da classe:

value– o valor para <input>, <select>e <textarea>( HTMLInputElement, HTMLSelectElement…).
href– o “href” para <a href="...">( HTMLAnchorElement).
id– o valor do atributo “id”, para todos os elementos ( HTMLElement).
…e muito mais…
Por exemplo:

<input type="text" id="elem" value="value">

<script>
  alert(elem.type); // "text"
  alert(elem.id); // "elem"
  alert(elem.value); // value
</script>
A maioria dos atributos HTML padrão tem a propriedade DOM correspondente, e podemos acessá-la assim.

Se quisermos saber a lista completa de propriedades suportadas por uma determinada classe, podemos encontrá-las na especificação. Por exemplo, HTMLInputElementestá documentado em https://html.spec.whatwg.org/#htmlinputelement .

Ou se quisermos obtê-los rapidamente ou estivermos interessados ​​em uma especificação de navegador concreta – podemos sempre exibir o elemento usando console.dir(elem)e ler as propriedades. Ou explore as “propriedades do DOM” na guia Elementos das ferramentas de desenvolvedor do navegador.

Resumo
Cada nó DOM pertence a uma determinada classe. As classes formam uma hierarquia. O conjunto completo de propriedades e métodos vem como resultado da herança.

As principais propriedades do nó DOM são:

nodeType
Podemos usá-lo para ver se um nó é um texto ou um nó de elemento. Tem um valor numérico: 1para elementos, 3para nós de texto e alguns outros para outros tipos de nós. Somente leitura.
nodeName/tagName
Para elementos, nome da marca (em letras maiúsculas, a menos que seja no modo XML). Para nós não elementares nodeNamedescreve o que é. Somente leitura.
innerHTML
O conteúdo HTML do elemento. Pode ser modificado.
outerHTML
O HTML completo do elemento. Uma operação de gravação elem.outerHTMLnão afeta a elemsi mesma. Em vez disso, ele é substituído pelo novo HTML no contexto externo.
nodeValue/data
O conteúdo de um nó sem elemento (texto, comentário). Esses dois são quase iguais, geralmente usamos data. Pode ser modificado.
textContent
O texto dentro do elemento: HTML menos tudo <tags>. Escrever nele coloca o texto dentro do elemento, com todos os caracteres especiais e tags tratados exatamente como texto. Pode inserir texto gerado pelo usuário com segurança e proteger contra inserções HTML indesejadas.
hidden
Quando definido como true, faz o mesmo que CSS display:none.
Os nós DOM também possuem outras propriedades, dependendo de sua classe. Por exemplo, <input>os elementos ( HTMLInputElement) suportam value, typeenquanto <a>os elementos ( HTMLAnchorElement) suportam hrefetc. A maioria dos atributos HTML padrão tem uma propriedade DOM correspondente.

No entanto, os atributos HTML e as propriedades DOM nem sempre são os mesmos, como veremos no próximo capítulo.

*/

