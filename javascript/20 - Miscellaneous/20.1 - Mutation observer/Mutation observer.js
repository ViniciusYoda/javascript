/*

observador de mutação
MutationObserveré um objeto integrado que observa um elemento DOM e aciona um retorno de chamada quando detecta uma alteração.

Vamos primeiro dar uma olhada na sintaxe e, em seguida, explorar um caso de uso do mundo real, para ver onde tal coisa pode ser útil.

Sintaxe
MutationObserveré fácil de usar.

Primeiro, criamos um observador com uma função de retorno de chamada:

let observer = new MutationObserver(callback);
E, em seguida, anexe-o a um nó DOM:

observer.observe(node, config);
configé um objeto com opções booleanas “em que tipo de mudanças reagir”:

childList– mudanças nos filhos diretos de node,
subtree– em todos os descendentes de node,
attributes– atributos de node,
attributeFilter– uma matriz de nomes de atributos, para observar apenas os selecionados.
characterData– se deve observar node.data(conteúdo do texto),
Algumas outras opções:

attributeOldValue– se true, passe o antigo e o novo valor do atributo para callback (veja abaixo), caso contrário, apenas o novo ( attributesopção de necessidades),
characterDataOldValue– se true, passe o antigo e o novo valor de node.datapara callback (veja abaixo), caso contrário, apenas o novo ( characterDataopção de necessidades).
Então, após qualquer alteração, o callbacké executado: as alterações são passadas no primeiro argumento como uma lista de objetos MutationRecord e o próprio observador como o segundo argumento.

Os objetos MutationRecord têm propriedades:

type– tipo de mutação, um dos
"attributes": atributo modificado
"characterData": dados modificados, usados ​​para nós de texto,
"childList": elementos filhos adicionados/removidos,
target– onde ocorreu a alteração: um elemento para "attributes", ou nó de texto para "characterData", ou um elemento para uma "childList"mutação,
addedNodes/removedNodes – nós que foram adicionados/removidos,
previousSibling/nextSibling– o irmão anterior e próximo para nós adicionados/removidos,
attributeName/attributeNamespace– o nome/namespace (para XML) do atributo alterado,
oldValue– o valor anterior, apenas para alterações de atributo ou texto, se a opção correspondente for definida attributeOldValue/ characterDataOldValue.
Por exemplo, aqui está um <div>com um contentEditableatributo. Esse atributo nos permite focar nele e editá-lo.

<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});

// observe everything except attributes
observer.observe(elem, {
  childList: true, // observe direct children
  subtree: true, // and lower descendants too
  characterDataOldValue: true // pass old data to callback
});
</script>
Se rodarmos este código no navegador, então focar no dado <div>e mudar o texto dentro dele <b>edit</b>, console.logvai mostrar uma mutação:

mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // other properties empty
}];
Se fizermos operações de edição mais complexas, por exemplo, remover o <b>edit</b>, o evento de mutação pode conter vários registros de mutação:

mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // other properties empty
}, {
  type: "characterData"
  target: <text node>
  // ...mutation details depend on how the browser handles such removal
  // it may coalesce two adjacent text nodes "edit " and ", please" into one node
  // or it may leave them separate text nodes
}];
Assim, MutationObserverpermite reagir a quaisquer alterações na subárvore DOM.

Uso para integração
Quando tal coisa pode ser útil?

Imagine a situação em que você precisa adicionar um script de terceiros que contém funcionalidades úteis, mas também faz algo indesejado, por exemplo, mostra anúncios <div class="ads">Unwanted ads</div>.

Naturalmente, o script de terceiros não fornece mecanismos para removê-lo.

Usando MutationObserver, podemos detectar quando o elemento indesejado aparece em nosso DOM e removê-lo.

Existem outras situações em que um script de terceiros adiciona algo em nosso documento e gostaríamos de detectar, quando isso acontece, para adaptar nossa página, redimensionar algo dinamicamente etc.

MutationObserverpermite implementar isso.

Uso para arquitetura
Há também situações em que MutationObserveré bom do ponto de vista arquitetônico.

Digamos que estamos fazendo um site sobre programação. Naturalmente, artigos e outros materiais podem conter trechos de código-fonte.

Tal snippet em uma marcação HTML se parece com isto:

...
<pre class="language-javascript"><code>
  // here's the code
  let hello = "world";
</code></pre>
...
Para melhor legibilidade e, ao mesmo tempo, para embelezá-lo, usaremos uma biblioteca de realce de sintaxe JavaScript em nosso site, como Prism.js . Para obter destaque de sintaxe para o trecho acima no Prism, Prism.highlightElem(pre)é chamado, que examina o conteúdo de tais preelementos e adiciona tags e estilos especiais para realce de sintaxe colorido nesses elementos, semelhante ao que você vê nos exemplos aqui, nesta página.

Quando exatamente devemos executar esse método de realce? Bem, podemos fazer isso no DOMContentLoadedevento ou colocar o script no final da página. No momento em que nosso DOM estiver pronto, podemos procurar por elementos pre[class*="language"]e invocá Prism.highlightElem-los:

// highlight all code snippets on the page
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
Tudo é simples até agora, certo? Encontramos trechos de código em HTML e os destacamos.

Agora vamos continuar. Digamos que vamos buscar materiais dinamicamente de um servidor. Estudaremos métodos para isso mais tarde no tutorial . Por enquanto, só importa buscarmos um artigo HTML de um servidor web e exibi-lo sob demanda:

let article = /* fetch new content from server *//*
articleElem.innerHTML = article;
O novo articleHTML pode conter trechos de código. Precisamos chamá Prism.highlightElem-los, caso contrário, eles não serão destacados.

Onde e quando solicitar Prism.highlightElemum artigo carregado dinamicamente?

Poderíamos anexar essa chamada ao código que carrega um artigo, assim:

let article = /* fetch new content from server *//*
articleElem.innerHTML = article;

let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
…Mas, imagine se tivermos muitos locais no código onde carregamos nosso conteúdo – artigos, questionários, postagens no fórum, etc. Precisamos colocar a chamada de destaque em todos os lugares, para destacar o código no conteúdo após o carregamento? Isso não é muito conveniente.

E se o conteúdo for carregado por um módulo de terceiros? Por exemplo, temos um fórum escrito por outra pessoa, que carrega o conteúdo dinamicamente e gostaríamos de adicionar realce de sintaxe a ele. Ninguém gosta de corrigir scripts de terceiros.

Felizmente, há outra opção.

Podemos usar MutationObserverpara detectar automaticamente quando os trechos de código são inseridos na página e destacá-los.

Assim, trataremos da funcionalidade de realce em um só lugar, dispensando-nos da necessidade de integrá-la.

Demonstração de destaque dinâmico
Aqui está o exemplo de trabalho.

Se você executar este código, ele começará a observar o elemento abaixo e destacar todos os trechos de código que aparecerem lá:

*/

let observer = new MutationObserver(mutations => {

   for(let mutation of mutations) {
     // examine new nodes, is there anything to highlight?
 
     for(let node of mutation.addedNodes) {
       // we track only elements, skip other nodes (e.g. text nodes)
       if (!(node instanceof HTMLElement)) continue;
 
       // check the inserted element for being a code snippet
       if (node.matches('pre[class*="language-"]')) {
         Prism.highlightElement(node);
       }
 
       // or maybe there's a code snippet somewhere in its subtree?
       for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
         Prism.highlightElement(elem);
       }
     }
   }
 
 });
 
 let demoElem = document.getElementById('highlight-demo');
 
 observer.observe(demoElem, {childList: true, subtree: true});

/*

Aqui, abaixo, há um elemento HTML e JavaScript que o preenche dinamicamente usando innerHTML.

Por favor, execute o código anterior (acima, observe esse elemento) e, em seguida, o código abaixo. Você verá como MutationObserverdetecta e destaca o snippet.

Um elemento de demonstração com id="highlight-demo", execute o código acima para observá-lo.

O código a seguir preenche seu innerHTML, que faz MutationObservercom que reaja e destaque seu conteúdo:

let demoElem = document.getElementById('highlight-demo');

// dynamically insert content with code snippets
demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
Agora temos MutationObserverque rastrear todos os destaques nos elementos observados ou no todo document. Podemos adicionar/remover trechos de código em HTML sem pensar nisso.

Métodos adicionais
Existe um método para parar de observar o nó:

observer.disconnect()– interrompe a observação.
Quando paramos de observar, pode ser que algumas alterações ainda não tenham sido processadas pelo observador. Nesses casos, usamos

observer.takeRecords()– obtém uma lista de registros de mutação não processados ​​– aqueles que aconteceram, mas o retorno de chamada não os tratou.
Esses métodos podem ser usados ​​juntos, assim:

// get a list of unprocessed mutations
// should be called before disconnecting,
// if you care about possibly unhandled recent mutations
let mutationRecords = observer.takeRecords();

// stop tracking changes
observer.disconnect();
...
Os registros retornados por observer.takeRecords()são removidos da fila de processamento
O callback não será chamado para registros, retornado por observer.takeRecords().

Interação da coleta de lixo
Os observadores usam referências fracas aos nós internamente. Ou seja, se um nó for removido do DOM e ficar inacessível, ele poderá ser coletado como lixo.

O simples fato de um nó DOM ser observado não impede a coleta de lixo.

Resumo
MutationObserverpode reagir a mudanças no DOM – atributos, conteúdo de texto e adição/remoção de elementos.

Podemos usá-lo para rastrear alterações introduzidas por outras partes do nosso código, bem como para integrar com scripts de terceiros.

MutationObserverpode acompanhar quaisquer alterações. As opções de configuração “o que observar” são usadas para otimizações, não para gastar recursos em chamadas de retorno de chamada desnecessárias.

*/