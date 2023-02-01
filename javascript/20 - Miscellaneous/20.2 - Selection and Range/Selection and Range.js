/*

Seleção e intervalo
Neste capítulo, abordaremos a seleção no documento, bem como a seleção em campos de formulário, como <input>.

O JavaScript pode acessar uma seleção existente, selecionar/desmarcar nós DOM como um todo ou parcialmente, remover o conteúdo selecionado do documento, envolvê-lo em uma tag e assim por diante.

Você pode encontrar algumas receitas para tarefas comuns no final do capítulo, na seção “Resumo”. Talvez isso cubra suas necessidades atuais, mas você obterá muito mais se ler todo o texto.

O subjacente Rangee os Selectionobjetos são fáceis de entender e você não precisará de receitas para fazê-los fazer o que você deseja.

Alcance
O conceito básico de seleção é Range , que é essencialmente um par de “pontos de fronteira”: início e fim do intervalo.

Um Rangeobjeto é criado sem parâmetros:

let range = new Range();
Em seguida, podemos definir os limites de seleção usando range.setStart(node, offset)e range.setEnd(node, offset).

Como você pode imaginar, ainda usaremos os Rangeobjetos para seleção, mas primeiro vamos criar alguns desses objetos.

Selecionando o texto parcialmente
O interessante é que o primeiro argumento nodeem ambos os métodos pode ser um nó de texto ou um nó de elemento, e o significado do segundo argumento depende disso.

Se nodefor um nó de texto, offsetdeve ser a posição em seu texto.

Por exemplo, dado o elemento <p>Hello</p>, podemos criar o intervalo contendo as letras “ll” da seguinte forma:

<p id="p">Hello</p>
<script>
  let range = new Range();
  range.setStart(p.firstChild, 2);
  range.setEnd(p.firstChild, 4);

  // toString of a range returns its content as text
  console.log(range); // ll
</script>
Aqui pegamos o primeiro filho de <p>(que é o nó de texto) e especificamos as posições do texto dentro dele:


Selecionando nós de elemento
Como alternativa, se nodefor um nó de elemento, offsetdeverá ser o número do filho.

Isso é útil para criar intervalos que contenham nós como um todo, sem parar em algum lugar dentro do texto.

Por exemplo, temos um fragmento de documento mais complexo:

<p id="p">Example: <i>italic</i> and <b>bold</b></p>

Aqui está sua estrutura DOM com elementos e nós de texto:

▾
P
#text Example:␣
▾
I
#text italic
#text ␣and␣
▾
B
#text bold
Vamos fazer um intervalo para "Example: <i>italic</i>".

Como podemos ver, esta frase consiste exatamente em dois filhos de <p>, com índices 0e 1:


O ponto inicial tem <p>como pai nodee 0como deslocamento.

Portanto, podemos defini-lo como range.setStart(p, 0).

O ponto final também tem <p>como pai node, mas 2como deslocamento (especifica o intervalo até, mas não incluindo offset).

Portanto, podemos defini-lo como range.setEnd(p, 2).

Aqui está a demonstração. Se você executá-lo, poderá ver que o texto é selecionado:

<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();

  range.setStart(p, 0);
  range.setEnd(p, 2);

  // toString of a range returns its content as text, without tags
  console.log(range); // Example: italic

  // apply this range for document selection (explained later below)
  document.getSelection().addRange(range);
</script>
Aqui está uma bancada de teste mais flexível onde você pode definir números de início/fim de intervalo e explorar outras variantes:

<p id="p">Example: <i>italic</i> and <b>bold</b></p>

From <input id="start" type="number" value=1> – To <input id="end" type="number" value=4>
<button id="button">Click to select</button>
<script>
  button.onclick = () => {
    let range = new Range();

    range.setStart(p, start.value);
    range.setEnd(p, end.value);

    // apply the selection, explained later below
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  };
</script>

Por exemplo, selecionando o mesmo <p>de deslocamento 1para 4nos dá o intervalo <i>italic</i> and <b>bold</b>:


Os nós inicial e final podem ser diferentes
Não precisamos usar o mesmo nó em setStarte setEnd. Um intervalo pode abranger muitos nós não relacionados. É importante apenas que o final esteja após o início no documento.

Selecionando um fragmento maior
Vamos fazer uma seleção maior em nosso exemplo, assim:


Já sabemos como fazer isso. Só precisamos definir o início e o fim como um deslocamento relativo nos nós de texto.

Precisamos criar um intervalo, que:

começa na posição 2 no <p>primeiro filho (pegando todas as primeiras letras de "Ex amplo: ")
termina na posição 3 no <b>primeiro filho (tirando as três primeiras letras de “ bol d”, mas não mais):
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();

  range.setStart(p.firstChild, 2);
  range.setEnd(p.querySelector('b').firstChild, 3);

  console.log(range); // ample: italic and bol

  // use this range for selection (explained later)
  window.getSelection().addRange(range);
</script>
Como você pode ver, é bastante fácil fazer um intervalo do que quisermos.

Se quisermos pegar os nós como um todo, podemos passar elementos em setStart/setEnd. Caso contrário, podemos trabalhar no nível do texto.

Propriedades do intervalo
O objeto range que criamos no exemplo acima possui as seguintes propriedades:


startContainer, startOffset– nó e deslocamento do início,
no exemplo acima: primeiro nó de texto dentro <p>e 2.
endContainer, endOffset– nó e deslocamento da extremidade,
no exemplo acima: primeiro nó de texto dentro <b>e 3.
collapsed– booleano, truese o intervalo começa e termina no mesmo ponto (portanto, não há conteúdo dentro do intervalo),
no exemplo acima:false
commonAncestorContainer– o ancestral comum mais próximo de todos os nós dentro do intervalo,
no exemplo acima:<p>
Métodos de seleção de intervalo
Existem muitos métodos convenientes para manipular intervalos.

Já vimos setStarte setEnd, aqui estão outros métodos semelhantes.

Definir início do intervalo:

setStart(node, offset)definir início em: posição offsetemnode
setStartBefore(node)definir início em: logo antesnode
setStartAfter(node)definir início em: logo apósnode
Defina o final do intervalo (métodos semelhantes):

setEnd(node, offset)definir final em: posição offsetemnode
setEndBefore(node)terminar em: logo antesnode
setEndAfter(node)terminar em: logo apósnode
Technically, setStart/setEnd can do anything, but more methods provide more convenience.

In all these methods, node can be both a text or element node: for text nodes offset skips that many of characters, while for element nodes that many child nodes.

Even more methods to create ranges:

selectNode(node) set range to select the whole node
selectNodeContents(node) set range to select the whole node contents
collapse(toStart) if toStart=true set end=start, otherwise set start=end, thus collapsing the range
cloneRange() creates a new range with the same start/end
Range editing methods
Once the range is created, we can manipulate its content using these methods:

deleteContents() – remove range content from the document
extractContents() – remove range content from the document and return as DocumentFragment
cloneContents() – clone range content and return as DocumentFragment
insertNode(node)– inserir nodeno documento no início do intervalo
surroundContents(node)– envolve nodeo conteúdo do intervalo. Para que isso funcione, o intervalo deve conter tags de abertura e fechamento para todos os elementos dentro dele: nenhum intervalo parcial como <i>abc.
Com esses métodos, podemos fazer basicamente qualquer coisa com os nós selecionados.

Aqui está a bancada de teste para vê-los em ação:

Click buttons to run methods on the selection, "resetExample" to reset it.

<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<p id="result"></p>
<script>
  let range = new Range();

  // Each demonstrated method is represented here:
  let methods = {
    deleteContents() {
      range.deleteContents()
    },
    extractContents() {
      let content = range.extractContents();
      result.innerHTML = "";
      result.append("extracted: ", content);
    },
    cloneContents() {
      let content = range.cloneContents();
      result.innerHTML = "";
      result.append("cloned: ", content);
    },
    insertNode() {
      let newNode = document.createElement('u');
      newNode.innerHTML = "NEW NODE";
      range.insertNode(newNode);
    },
    surroundContents() {
      let newNode = document.createElement('u');
      try {
        range.surroundContents(newNode);
      } catch(e) { console.log(e) }
    },
    resetExample() {
      p.innerHTML = `Example: <i>italic</i> and <b>bold</b>`;
      result.innerHTML = "";

      range.setStart(p.firstChild, 2);
      range.setEnd(p.querySelector('b').firstChild, 3);

      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  };

  for(let method in methods) {
    document.write(`<div><button onclick="methods.${method}()">${method}</button></div>`);
  }

  methods.resetExample();
</script>

Também existem métodos para comparar intervalos, mas raramente são usados. Quando precisar deles, consulte as especificações ou o manual do MDN .

Seleção
Rangeé um objeto genérico para gerenciar intervalos de seleção. Porém, criar um Rangenão significa que vemos uma seleção na tela.

Podemos criar Rangeobjetos, distribuí-los – eles não selecionam visualmente nada por conta própria.

A seleção do documento é representada por Selectionobjeto, que pode ser obtido como window.getSelection()ou document.getSelection(). Uma seleção pode incluir zero ou mais intervalos. Pelo menos, a especificação da API Selection diz isso. Na prática, porém, apenas o Firefox permite selecionar vários intervalos no documento usando ( para Mac).Ctrl+clickCmd+click

Aqui está uma captura de tela de uma seleção com 3 intervalos, feita no Firefox:


Outros navegadores suportam no máximo 1 intervalo. Como veremos, alguns dos Selectionmétodos implicam que pode haver muitos intervalos, mas, novamente, em todos os navegadores, exceto o Firefox, há no máximo 1.

Aqui está uma pequena demonstração que mostra a seleção atual (selecione algo e clique) como texto:

alert(document.getSelection())

Propriedades de seleção
Como dito, uma seleção pode, em teoria, conter vários intervalos. Podemos obter esses objetos range usando o método:

getRangeAt(i)– obtenha o i-ésimo intervalo, começando em 0. Em todos os navegadores, exceto Firefox, apenas 0é usado.
Além disso, existem propriedades que geralmente oferecem melhor conveniência.

Semelhante a um intervalo, um objeto de seleção tem um início, chamado de “âncora”, e o fim, chamado de “foco”.

As principais propriedades de seleção são:

anchorNode– o nó onde a seleção começa,
anchorOffset– o deslocamento em anchorNodeque a seleção começa,
focusNode– o nó onde a seleção termina,
focusOffset– o deslocamento em focusNodeque a seleção termina,
isCollapsed– truese a seleção não selecionar nada (intervalo vazio) ou não existir.
rangeCount– contagem de intervalos na seleção, máximo 1em todos os navegadores, exceto Firefox.
Fim/início da seleção vs Intervalo
Há diferenças importantes de uma âncora/foco de seleção em comparação com um Rangeinício/fim.

Como sabemos, Rangeos objetos sempre têm seu início antes do fim.

Para seleções, nem sempre é o caso.

A seleção de algo com o mouse pode ser feita em ambas as direções: “da esquerda para a direita” ou “da direita para a esquerda”.

Em outras palavras, quando o botão do mouse é pressionado e ele avança no documento, seu final (foco) será após seu início (âncora).

Ex.: se o usuário começar a selecionar com o mouse e passar de “Exemplo” para “itálico”:


…Mas a mesma seleção poderia ser feita ao contrário: partindo de “itálico” para “Exemplo” (sentido inverso), então seu final (foco) será anterior ao início (âncora):


Eventos de seleção
Existem eventos para acompanhar a seleção:

elem.onselectstart– quando uma seleção começa especificamente no elemento elem(ou dentro dele). Por exemplo, quando o usuário pressiona o botão do mouse sobre ele e começa a mover o ponteiro.
Impedir a ação padrão cancela o início da seleção. Portanto, iniciar uma seleção a partir desse elemento torna-se impossível, mas o elemento ainda é selecionável. O visitante só precisa iniciar a seleção de outro lugar.
document.onselectionchange– sempre que uma seleção muda ou começa.
Observe: este manipulador pode ser definido apenas em document, ele rastreia todas as seleções nele.
Demonstração de rastreamento de seleção
Aqui está uma pequena demonstração. Ele rastreia a seleção atual no documente mostra seus limites:

<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

From <input id="from" disabled> – To <input id="to" disabled>
<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    let {anchorNode, anchorOffset, focusNode, focusOffset} = selection;

    // anchorNode and focusNode are text nodes usually
    from.value = `${anchorNode?.data}, offset ${anchorOffset}`;
    to.value = `${focusNode?.data}, offset ${focusOffset}`;
  };
</script>
Demonstração de cópia de seleção
Existem duas abordagens para copiar o conteúdo selecionado:

Podemos usar document.getSelection().toString()para obtê-lo como texto.
Caso contrário, para copiar o DOM completo, por exemplo, se precisarmos manter a formatação, podemos obter os intervalos subjacentes com getRangeAt(...). Um Rangeobjeto, por sua vez, possui cloneContents()método que clona seu conteúdo e retorna como DocumentFragmentobjeto, que podemos inserir em outro lugar.
Aqui está a demonstração de como copiar o conteúdo selecionado como texto e nós DOM:

<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

Cloned: <span id="cloned"></span>
<br>
As text: <span id="astext"></span>

<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    cloned.innerHTML = astext.innerHTML = "";

    // Clone DOM nodes from ranges (we support multiselect here)
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }

    // Get as text
    astext.innerHTML += selection;
  };
</script>
Métodos de seleção
Podemos trabalhar com a seleção adicionando/removendo intervalos:

getRangeAt(i)– obtenha o i-ésimo intervalo, começando em 0. Em todos os navegadores, exceto Firefox, apenas 0é usado.
addRange(range)– adicionar rangeà seleção. Todos os navegadores, exceto o Firefox, ignoram a chamada, se a seleção já tiver um intervalo associado.
removeRange(range)– remover rangeda seleção.
removeAllRanges()– remover todos os intervalos.
empty()– alias para removeAllRanges.
Existem também métodos de conveniência para manipular o intervalo de seleção diretamente, sem Rangechamadas intermediárias:

collapse(node, offset)– substitua o intervalo selecionado por um novo que comece e termine no dado node, na posição offset.
setPosition(node, offset)– alias para collapse.
collapseToStart()– recolher (substituir por um intervalo vazio) para iniciar a seleção,
collapseToEnd()– recolher até o final da seleção,
extend(node, offset)– mover o foco da seleção para o dado node, posição offset,
setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)– substitua o intervalo de seleção pelo início anchorNode/anchorOffsete fim fornecidos focusNode/focusOffset. Todo o conteúdo entre eles é selecionado.
selectAllChildren(node)– selecione todos os filhos do arquivo node.
deleteFromDocument()– remover o conteúdo selecionado do documento.
containsNode(node, allowPartialContainment = false)– verifica se a seleção contém node(parcialmente se o segundo argumento for true)
Para a maioria das tarefas, esses métodos são adequados, não há necessidade de acessar o Rangeobjeto subjacente.

Por exemplo, selecionando todo o conteúdo do parágrafo <p>:

<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  // select from 0th child of <p> to the last child
  document.getSelection().setBaseAndExtent(p, 0, p, p.childNodes.length);
</script>
A mesma coisa usando intervalos:

<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();
  range.selectNodeContents(p); // or selectNode(p) to select the <p> tag too

  document.getSelection().removeAllRanges(); // clear existing selection if any
  document.getSelection().addRange(range);
</script>
Para selecionar algo, primeiro remova a seleção existente
Se já existir uma seleção de documento, esvazie-a primeiro com removeAllRanges(). E então adicione intervalos. Caso contrário, todos os navegadores, exceto o Firefox, ignoram os novos intervalos.

A exceção são alguns métodos de seleção, que substituem a seleção existente, como setBaseAndExtent.

Seleção em controles de formulário
Elementos de formulário, como inpute textareafornecem API especial para seleção , sem Selectionou Rangeobjetos. Como um valor de entrada é um texto puro, não HTML, não há necessidade de tais objetos, tudo é muito mais simples.

Propriedades:

input.selectionStart– posição de início da seleção (gravável),
input.selectionEnd– posição do final da seleção (gravável),
input.selectionDirection– direção de seleção, uma das seguintes: “para frente”, “para trás” ou “nenhum” (se, por exemplo, selecionado com um clique duplo do mouse),
Eventos:

input.onselect– dispara quando algo é selecionado.
Métodos:

input.select()– seleciona tudo no controle de texto (pode ser textareaem vez de input),

input.setSelectionRange(start, end, [direction])– mude a seleção para abranger da posição startaté end, na direção dada (opcional).

input.setRangeText(replacement, [start], [end], [selectionMode])– substituir um intervalo de texto pelo novo texto.

Argumentos opcionais starte end, se fornecidos, definem o início e o fim do intervalo, caso contrário, a seleção do usuário é usada.

O último argumento, selectionMode, determina como a seleção será definida após a substituição do texto. Os valores possíveis são:

"select"– o novo texto inserido será selecionado.
"start"– o intervalo de seleção é recolhido imediatamente antes do texto inserido (o cursor estará imediatamente antes dele).
"end"– o intervalo de seleção é recolhido logo após o texto inserido (o cursor estará logo após).
"preserve"– tenta preservar a seleção. Este é o padrão.
Agora vamos ver esses métodos em ação.

Exemplo: seleção de rastreamento
Por exemplo, este código usa onselecto evento para rastrear a seleção:

<textarea id="area" style="width:80%;height:60px">
Selecting in this text updates values below.
</textarea>
<br>
From <input id="from" disabled> – To <input id="to" disabled>

<script>
  area.onselect = function() {
    from.value = area.selectionStart;
    to.value = area.selectionEnd;
  };
</script>

Observe:

onselectdispara quando algo é selecionado, mas não quando a seleção é removida.
document.onselectionchangeO evento não deve disparar para seleções dentro de um controle de formulário, de acordo com a especificação , pois não está relacionado a documentseleção e intervalos. Alguns navegadores o geram, mas não devemos confiar nele.
Exemplo: mover o cursor
Podemos alterar selectionStarte selectionEnd, que define a seleção.

Um caso extremo importante é quando selectionStarte selectionEndse igualam. Então é exatamente a posição do cursor. Ou, para reformular, quando nada é selecionado, a seleção é recolhida na posição do cursor.

Assim, definindo selectionStarte selectionEndcom o mesmo valor, movemos o cursor.

Por exemplo:

<textarea id="area" style="width:80%;height:60px">
Focus on me, the cursor will be at position 10.
</textarea>

<script>
  area.onfocus = () => {
    // zero delay setTimeout to run after browser "focus" action finishes
    setTimeout(() => {
      // we can set any selection
      // if start=end, the cursor is exactly at that place
      area.selectionStart = area.selectionEnd = 10;
    });
  };
</script>

Exemplo: modificação da seleção
Para modificar o conteúdo da seleção, podemos usar input.setRangeText()method. Claro, podemos ler selectionStart/Ende, com o conhecimento da seleção, alterar a substring correspondente de value, mas setRangeTexté mais poderoso e geralmente mais conveniente.

Esse é um método um tanto complexo. Em sua forma mais simples de um argumento, ele substitui o intervalo selecionado pelo usuário e remove a seleção.

Por exemplo, aqui a seleção do usuário será agrupada por *...*:

<input id="input" style="width:200px" value="Select here and click the button">
<button id="button">Wrap selection in stars *...*</button>

<script>
button.onclick = () => {
  if (input.selectionStart == input.selectionEnd) {
    return; // nothing is selected
  }

  let selected = input.value.slice(input.selectionStart, input.selectionEnd);
  input.setRangeText(`*${selected}*`);
};
</script>

Com mais argumentos, podemos definir range starte end.

Neste exemplo encontramos "THIS"no texto de entrada, substitua-o e mantenha a substituição selecionada:

<input id="input" style="width:200px" value="Replace THIS in text">
<button id="button">Replace THIS</button>

<script>
button.onclick = () => {
  let pos = input.value.indexOf("THIS");
  if (pos >= 0) {
    input.setRangeText("*THIS*", pos, pos + 4, "select");
    input.focus(); // focus to make selection visible
  }
};
</script>

Exemplo: inserir no cursor
Se nada for selecionado, ou usarmos equal starte endin setRangeText, o novo texto será apenas inserido, nada será removido.

Também podemos inserir algo “no cursor” usando setRangeText.

Aqui está um botão que insere "HELLO"na posição do cursor e coloca o cursor imediatamente depois dele. Se a seleção não estiver vazia, ela será substituída (podemos detectá-la comparando selectionStart!=selectionEnde fazer outra coisa):

<input id="input" style="width:200px" value="Text Text Text Text Text">
<button id="button">Insert "HELLO" at cursor</button>

<script>
  button.onclick = () => {
    input.setRangeText("HELLO", input.selectionStart, input.selectionEnd, "end");
    input.focus();
  };
</script>

Tornando não selecionável
Para tornar algo não selecionável, existem três maneiras:

Use a propriedade CSS user-select: none.

<style>
#elem {
  user-select: none;
}
</style>
<div>Selectable <div id="elem">Unselectable</div> Selectable</div>
Isso não permite que a seleção comece em elem. Mas o usuário pode iniciar a seleção em outro lugar e incluí elem-la.

Then elemfará parte de document.getSelection(), então a seleção realmente acontece, mas seu conteúdo geralmente é ignorado no copiar e colar.

Impedir a ação padrão em onselectstartou mousedowneventos.

<div>Selectable <div id="elem">Unselectable</div> Selectable</div>

<script>
  elem.onselectstart = () => false;
</script>
Isso evita iniciar a seleção em elem, mas o visitante pode iniciá-la em outro elemento e estender para elem.

Isso é conveniente quando há outro manipulador de eventos na mesma ação que aciona o select (por exemplo mousedown, ). Então desativamos a seleção para evitar conflito, permitindo ainda elema cópia do conteúdo.

Também podemos limpar a seleção post-factum depois que ela acontecer com document.getSelection().empty(). Isso raramente é usado, pois causa piscadas indesejadas à medida que a seleção aparece ou desaparece.

Referências
Especificação DOM: intervalo
API de seleção
Especificação HTML: APIs para as seleções de controle de texto
Resumo
Cobrimos duas APIs diferentes para seleções:

Para documento: Selectione Rangeobjetos.
Para input, textarea: métodos e propriedades adicionais.
A segunda API é muito simples, pois funciona com texto.

As receitas mais usadas são provavelmente:

Obtendo a seleção:
let selection = document.getSelection();

let cloned = /* element to clone the selected nodes to */;

// then apply Range methods to selection.getRangeAt(0)
// or, like here, to all ranges to support multi-select
/*
for (let i = 0; i < selection.rangeCount; i++) {
  cloned.append(selection.getRangeAt(i).cloneContents());
}
Definindo a seleção:
let selection = document.getSelection();
*/

// directly:
/*
selection.setBaseAndExtent(...from...to...);
*/

// or we can create a range and:
/*
selection.removeAllRanges();
selection.addRange(range);
E, finalmente, sobre o cursor. A posição do cursor em elementos editáveis, como <textarea>sempre no início ou no final da seleção. Podemos usá-lo para obter a posição do cursor ou para mover o cursor definindo elem.selectionStarte elem.selectionEnd.

*/