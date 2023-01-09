/*

Andando pelo DOM
O DOM nos permite fazer qualquer coisa com elementos e seus conteúdos, mas primeiro precisamos alcançar o objeto DOM correspondente.

Todas as operações no DOM começam com o documentobjeto. Esse é o principal “ponto de entrada” para o DOM. A partir dele podemos acessar qualquer nó.

Aqui está uma imagem de links que permitem viajar entre nós DOM:


Vamos discuti-los com mais detalhes.

No topo: documentElement e body
Os nós da árvore superior estão disponíveis diretamente como documentpropriedades:

<html> = document.documentElement
O nó do documento superior é document.documentElement. Esse é o nó DOM da <html>tag.
<body>=document.body
Outro nó DOM amplamente utilizado é o <body>elemento – document.body.
<head>=document.head
A <head>tag está disponível como document.head.
Há um problema: document.bodypode sernull
Um script não pode acessar um elemento que não existe no momento da execução.

Em particular, se um script estiver dentro <head>de , ele document.bodyestará indisponível porque o navegador ainda não o leu.

Então, no exemplo abaixo o primeiro alertmostra null:

<html>

<head>
  <script>
    alert( "From HEAD: " + document.body ); // null, there's no <body> yet
  </script>
</head>

<body>

  <script>
    alert( "From BODY: " + document.body ); // HTMLBodyElement, now it exists
  </script>

</body>
</html>
No mundo DOM nullsignifica “não existe”
No DOM, o nullvalor significa “não existe” ou “não existe tal nó”.

Filhos: childNodes, firstChild, lastChild
Existem dois termos que usaremos a partir de agora:

Nós filhos (ou filhos) – elementos que são filhos diretos. Em outras palavras, eles estão aninhados exatamente no dado. Por exemplo, <head>e <body>são filhos do <html>elemento.
Descendentes – todos os elementos que estão aninhados no dado, incluindo filhos, seus filhos e assim por diante.
Por exemplo, aqui <body>tem filhos <div>e <ul>(e alguns nós de texto em branco):

<html>
<body>
  <div>Begin</div>

  <ul>
    <li>
      <b>Information</b>
    </li>
  </ul>
</body>
</html>
…E os descendentes de <body>não são apenas filhos diretos <div>, <ul>mas também elementos aninhados mais profundamente, como <li>(um filho de <ul>) e <b>(um filho de <li>) – a subárvore inteira.

A childNodescoleção lista todos os nós filhos, incluindo nós de texto.

O exemplo abaixo mostra os filhos de document.body:

<html>
<body>
  <div>Begin</div>

  <ul>
    <li>Information</li>
  </ul>

  <div>End</div>

  <script>
    for (let i = 0; i < document.body.childNodes.length; i++) {
      alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
    }
  </script>
  ...more stuff...
</body>
</html>
Por favor, observe um detalhe interessante aqui. Se executarmos o exemplo acima, o último elemento mostrado é <script>. Na verdade, o documento tem mais coisas abaixo, mas no momento da execução do script o navegador ainda não leu, então o script não o vê.

Propriedades firstChilde lastChildacesso rápido aos primeiros e últimos filhos.

Eles são apenas atalhos. Se existirem nós filhos, o seguinte será sempre verdadeiro:

elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
Há também uma função especial elem.hasChildNodes()para verificar se existem nós filhos.

coleções DOM
Como podemos ver, childNodesparece um array. Mas, na verdade, não é um array, mas sim uma coleção – um objeto iterável semelhante a um array especial.

Há duas consequências importantes:

1. Podemos usar for..ofpara iterar sobre ele:
for (let node of document.body.childNodes) {
  alert(node); // shows all nodes from the collection
}
Isso ocorre porque é iterável (fornece a Symbol.iteratorpropriedade, conforme necessário).

2. Métodos de array não funcionarão, porque não é um array:
alert(document.body.childNodes.filter); // undefined (there's no filter method!)
A primeira coisa é legal. A segunda é tolerável, pois podemos usar Array.frompara criar um array “real” a partir da coleção, se quisermos métodos de array:

alert( Array.from(document.body.childNodes).filter ); // function

As coleções DOM são somente leitura
Coleções DOM e ainda mais – todas as propriedades de navegação listadas neste capítulo são somente leitura.

Não podemos substituir um filho por outra coisa atribuindo childNodes[i] = ....

Alterar o DOM requer outros métodos. Nós os veremos no próximo capítulo.

As coleções DOM estão ativas
Quase todas as coleções DOM com pequenas exceções são ativas . Em outras palavras, eles refletem o estado atual do DOM.

Se mantivermos uma referência a elem.childNodes, e adicionarmos/removermos nós no DOM, eles aparecerão na coleção automaticamente.

Não use for..inpara repetir coleções
As coleções são iteráveis ​​usando for..of. Às vezes as pessoas tentam usar for..inpara isso.

Por favor, não. O for..inloop itera sobre todas as propriedades enumeráveis. E as coleções têm algumas propriedades “extras” raramente usadas que geralmente não queremos obter:

<body>
<script>
  // shows 0, 1, length, item, values and more.
  for (let prop in document.body.childNodes) alert(prop);
</script>
</body>

Irmãos e o pai
Irmãos são nós que são filhos do mesmo pai.

Por exemplo, aqui <head>e <body>são irmãos:

<html>
  <head>...</head><body>...</body>
</html>
<body>é dito ser o irmão “próximo” ou “certo” de <head>,
<head>é considerado o irmão “anterior” ou “esquerdo” de <body>.
O próximo irmão está em nextSiblingpropriedade e o anterior - em previousSibling.

O pai está disponível como parentNode.

Por exemplo:

// parent of <body> is <html>
alert( document.body.parentNode === document.documentElement ); // true

// after <head> goes <body>
alert( document.head.nextSibling ); // HTMLBodyElement

// before <body> goes <head>
alert( document.body.previousSibling ); // HTMLHeadElement

Navegação somente de elementos
As propriedades de navegação listadas acima referem-se a todos os nós. Por exemplo, childNodespodemos ver nós de texto, nós de elemento e até nós de comentário, se existirem.

Mas, para muitas tarefas, não queremos nós de texto ou comentários. Queremos manipular nós de elementos que representam tags e formam a estrutura da página.

Então, vamos ver mais links de navegação que levam em consideração apenas os nós do elemento :


Os links são semelhantes aos fornecidos acima, apenas com a Elementpalavra dentro:

children– apenas os filhos que são nós de elemento.
firstElementChild, lastElementChild– primeiro e último elementos filhos.
previousElementSibling, nextElementSibling– elementos vizinhos.
parentElement– elemento pai.
Por quê parentElement? O pai pode não ser um elemento?
A parentElementpropriedade retorna o pai "elemento", enquanto parentNoderetorna o pai "qualquer nó". Essas propriedades geralmente são as mesmas: ambas obtêm o pai.

Com a única exceção de document.documentElement:

alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null
A razão é que o nó raiz document.documentElement( <html>) tem documentcomo pai. Mas documentnão é um nó de elemento, então parentNoderetorna e parentElementnão.

Este detalhe pode ser útil quando queremos subir de um elemento arbitrário elempara <html>, mas não para document:

while(elem = elem.parentElement) { // go up till <html>
  alert( elem );
}
Vamos modificar um dos exemplos acima: substitua childNodespor children. Agora mostra apenas os elementos:

<html>
<body>
  <div>Begin</div>

  <ul>
    <li>Information</li>
  </ul>

  <div>End</div>

  <script>
    for (let elem of document.body.children) {
      alert(elem); // DIV, UL, DIV, SCRIPT
    }
  </script>
  ...
</body>
</html>

Mais links: tabelas
Até agora descrevemos as propriedades básicas de navegação.

Certos tipos de elementos DOM podem fornecer propriedades adicionais, específicas para seu tipo, por conveniência.

As tabelas são um ótimo exemplo disso, e representam um caso particularmente importante:

O<table> elemento suporta (além do dado acima) estas propriedades:

table.rows– a coleção de <tr>elementos da tabela.
table.caption/tHead/tFoot– referências aos elementos <caption>, <thead>, <tfoot>.
table.tBodies– a coleção de <tbody>elementos (podem ser muitos conforme o padrão, mas sempre haverá pelo menos um – mesmo que não esteja no HTML de origem, o navegador colocará no DOM).
<thead>, <tfoot>,<tbody> os elementos fornecem a rowspropriedade:

tbody.rows– a coleção de <tr>dentro.
<tr>:

tr.cells– a coleção de <td>e <th>células dentro do dado <tr>.
tr.sectionRowIndex– a posição (índice) do dado <tr>dentro do delimitador <thead>/<tbody>/<tfoot>.
tr.rowIndex– o número do <tr>na tabela como um todo (incluindo todas as linhas da tabela).
<td>e <th>:

td.cellIndex– o número da célula dentro do delimitador <tr>.
Um exemplo de uso:

<table id="table">
  <tr>
    <td>one</td><td>two</td>
  </tr>
  <tr>
    <td>three</td><td>four</td>
  </tr>
</table>

<script>
  // get td with "two" (first row, second column)
  let td = table.rows[0].cells[1];
  td.style.backgroundColor = "red"; // highlight it
</script>
A especificação: dados tabulares .

Também existem propriedades de navegação adicionais para formulários HTML. Vamos examiná-los mais tarde, quando começarmos a trabalhar com formulários.

Resumo
Dado um nó DOM, podemos ir para seus vizinhos imediatos usando propriedades de navegação.

Existem dois conjuntos principais deles:

Para todos os nós: parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling.
Somente para nós de elemento: parentElement, children, firstElementChild, lastElementChild, previousElementSibling, nextElementSibling.
Alguns tipos de elementos DOM, por exemplo, tabelas, fornecem propriedades e coleções adicionais para acessar seu conteúdo.

*/

