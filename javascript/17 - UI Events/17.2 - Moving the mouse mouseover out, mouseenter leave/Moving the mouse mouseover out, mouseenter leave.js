/*

Movendo o mouse: mouseover/out, mouseenter/leave
Vamos mergulhar em mais detalhes sobre os eventos que acontecem quando o mouse se move entre os elementos.

Eventos mouseover/mouseout, relatedTarget
O mouseoverevento ocorre quando o ponteiro do mouse passa sobre um elemento e mouseout– quando sai.


Esses eventos são especiais, pois possuem propriedade relatedTarget. Esta propriedade complementa target. Quando um mouse sai de um elemento para outro, um deles se torna target, e o outro - relatedTarget.

Para mouseover:

event.target– é o elemento onde o mouse passou.
event.relatedTarget– é o elemento de onde veio o mouse ( relatedTarget→ target).
Para mouseouto inverso:

event.target– é o elemento que o mouse deixou.
event.relatedTarget– é o novo elemento sob o ponteiro, aquele mouse deixado para ( target→ relatedTarget).
No exemplo abaixo, cada face e suas características são elementos separados. Ao mover o mouse, você pode ver os eventos do mouse na área de texto.

Cada evento tem as informações sobre ambos targete relatedTarget:

*/

container.onmouseover = container.onmouseout = handler;

function handler(event) {

  function str(el) {
    if (!el) return "null"
    return el.className || el.tagName;
  }

  log.value += event.type + ':  ' +
    'target=' + str(event.target) +
    ',  relatedTarget=' + str(event.relatedTarget) + "\n";
  log.scrollTop = log.scrollHeight;

  if (event.type == 'mouseover') {
    event.target.style.background = 'pink'
  }
  if (event.type == 'mouseout') {
    event.target.style.background = ''
  }
}

/*

relatedTargetpode sernull
A relatedTargetpropriedade pode ser null.

Isso é normal e significa apenas que o mouse não veio de outro elemento, mas de fora da janela. Ou que saiu da janela.

Devemos manter essa possibilidade em mente ao usar event.relatedTargetem nosso código. Se acessarmos event.relatedTarget.tagName, haverá um erro.

Ignorando elementos
O mousemoveevento é acionado quando o mouse se move. Mas isso não significa que cada pixel leva a um evento.

O navegador verifica a posição do mouse de tempos em tempos. E se ele perceber mudanças, acionará os eventos.

Isso significa que se o visitante estiver movendo o mouse muito rápido, alguns elementos DOM podem ser ignorados:


Se o mouse se mover muito rapidamente de #FROMpara #TOos elementos conforme pintado acima, os elementos intermediários <div>(ou alguns deles) podem ser ignorados. O mouseoutevento pode ser acionado e, em seguida #FROM, imediatamente .mouseover#TO

Isso é bom para o desempenho, porque pode haver muitos elementos intermediários. Nós realmente não queremos processar dentro e fora de cada um.

Por outro lado, devemos ter em mente que o ponteiro do mouse não “visita” todos os elementos ao longo do caminho. Pode pular".

Em particular, é possível que o ponteiro pule direto para o meio da página de fora da janela. Nesse caso relatedTargeté null, porque veio do “lugar nenhum”:


Você pode conferir “ao vivo” em um teststand abaixo.

Seu HTML possui dois elementos aninhados: o <div id="child">está dentro do <div id="parent">. Se você mover o mouse rapidamente sobre eles, talvez apenas o div filho acione eventos, ou talvez o pai, ou talvez não haja nenhum evento.

Também mova o ponteiro para o filho dive, em seguida, mova-o rapidamente para baixo no pai. Se o movimento for rápido o suficiente, o elemento pai será ignorado. O mouse cruzará o elemento pai sem perceber.

*/

let parent = document.getElementById('parent');
parent.onmouseover = parent.onmouseout = parent.onmousemove = handler;

function handler(event) {
  let type = event.type;
  while (type.length < 11) type += ' ';

  log(type + " target=" + event.target.id)
  return false;
}


function clearText() {
  text.value = "";
  lastMessage = "";
}

let lastMessageTime = 0;
let lastMessage = "";
let repeatCounter = 1;

function log(message) {
  if (lastMessageTime == 0) lastMessageTime = new Date();

  let time = new Date();

  if (time - lastMessageTime > 500) {
    message = '------------------------------\n' + message;
  }

  if (message === lastMessage) {
    repeatCounter++;
    if (repeatCounter == 2) {
      text.value = text.value.trim() + ' x 2\n';
    } else {
      text.value = text.value.slice(0, text.value.lastIndexOf('x') + 1) + repeatCounter + "\n";
    }

  } else {
    repeatCounter = 1;
    text.value += message + "\n";
  }

  text.scrollTop = text.scrollHeight;

  lastMessageTime = time;
  lastMessage = message;
}

/*

Se mouseoveracionado, deve havermouseout
No caso de movimentos rápidos do mouse, os elementos intermediários podem ser ignorados, mas de uma coisa sabemos com certeza: se o ponteiro entrou “oficialmente” em um elemento ( mouseoverevento gerado), ao sair dele sempre obtemos mouseout.

Mouseout ao sair para uma criança
Uma característica importante de mouseout– ele dispara, quando o ponteiro se move de um elemento para seu descendente, por exemplo, de #parentpara #childneste HTML:

<div id="parent">
  <div id="child">...</div>
</div>
Se estivermos ligados #parente, em seguida, movermos o ponteiro mais fundo para #child, mouseoutcontinuamos #parent!


Isso pode parecer estranho, mas pode ser facilmente explicado.

De acordo com a lógica do navegador, o cursor do mouse pode estar apenas sobre um único elemento a qualquer momento – o mais aninhado e superior por z-index.

Portanto, se for para outro elemento (mesmo que seja um descendente), ele sai do anterior.

Observe outro detalhe importante do processamento de eventos.

O mouseoverevento em um descendente borbulha. Então, se #parenttiver mouseoverhandler, ele aciona:


Você pode ver isso muito bem no exemplo abaixo: <div id="child">está dentro do arquivo <div id="parent">. Existem mouseover/outmanipuladores no #parentelemento que fornecem detalhes do evento.

Se você mover o mouse de #parentpara #child, verá dois eventos em #parent:

mouseout [target: parent](deixou o pai), então
mouseover [target: child](veio para a criança, borbulhou).

*/

function mouselog(event) {
   let d = new Date();
   text.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
   text.scrollTop = text.scrollHeight;
 }

/*

Conforme mostrado, quando o ponteiro se move do #parentelemento para #child, dois manipuladores são acionados no elemento pai: mouseoute mouseover:

parent.onmouseout = function(event) {
  /* event.target: parent element *//*
};
parent.onmouseover = function(event) {
  /* event.target: child element (bubbled) */ /*
};
Se não examinarmos event.targetdentro dos manipuladores, pode parecer que o ponteiro do mouse deixou o #parentelemento e imediatamente voltou sobre ele.

Mas esse não é o caso! O ponteiro ainda está sobre o pai, apenas se moveu mais fundo no elemento filho.

Se houver algumas ações ao deixar o elemento pai, por exemplo, uma animação executada em parent.onmouseout, geralmente não queremos quando o ponteiro for mais fundo em #parent.

Para evitá-lo, podemos verificar relatedTargeto manipulador e, se o mouse ainda estiver dentro do elemento, ignorar esse evento.

Como alternativa, podemos usar outros eventos: mouseentere mouseleave, que abordaremos agora, pois eles não têm esses problemas.

Eventos mouseenter e mouseleave
Eventos mouseenter/mouseleavesão como mouseover/mouseout. Eles disparam quando o ponteiro do mouse entra/sai do elemento.

Mas há duas diferenças importantes:

As transições dentro do elemento, de/para descendentes, não são contadas.
Os eventos mouseenter/mouseleavenão borbulham.
Esses eventos são extremamente simples.

Quando o ponteiro entra em um elemento – mouseenterdispara. A localização exata do ponteiro dentro do elemento ou seus descendentes não importa.

Quando o ponteiro sai de um elemento – mouseleavedispara.

Este exemplo é semelhante ao anterior, mas agora o elemento superior tem mouseenter/mouseleaveem vez de mouseover/mouseout.

Como você pode ver, os únicos eventos gerados são aqueles relacionados a mover o ponteiro para dentro e para fora do elemento superior. Nada acontece quando o ponteiro vai para a criança e volta. Transições entre descendentes são ignoradas

*/

function mouselog(event) {
   let d = new Date();
   text.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
   text.scrollTop = text.scrollHeight;
 }

/*

delegação do evento
Os eventos mouseenter/leavesão muito simples e fáceis de usar. Mas eles não borbulham. Portanto, não podemos usar a delegação de eventos com eles.

Imagine que queremos manipular a entrada/saída do mouse para as células da tabela. E há centenas de células.

A solução natural seria – ativar o manipulador <table>e processar eventos lá. Mas mouseenter/leavenão borbulhe. Portanto, se tal evento acontecer em <td>, somente um manipulador em que <td>poderá capturá-lo.

Os manipuladores para mouseenter/leaveon <table>são acionados apenas quando o ponteiro entra/sai da tabela como um todo. É impossível obter qualquer informação sobre as transições dentro dele.

Então, vamos usar mouseover/mouseout.

Vamos começar com manipuladores simples que destacam o elemento sob o mouse:

// let's highlight an element under the pointer
table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
};
Aqui eles estão em ação. À medida que o mouse percorre os elementos desta tabela, o atual é destacado:

*/

table.onmouseover = function(event) {
   let target = event.target;
   target.style.background = 'pink';
 
   text.value += `over -> ${target.tagName}\n`;
   text.scrollTop = text.scrollHeight;
 };
 
 table.onmouseout = function(event) {
   let target = event.target;
   target.style.background = '';
 
   text.value += `out <- ${target.tagName}\n`;
   text.scrollTop = text.scrollHeight;
 };

/*

No nosso caso, gostaríamos de lidar com as transições entre as células da tabela <td>: entrar em uma célula e sair dela. Outras transições, como dentro da célula ou fora de qualquer célula, não nos interessam. Vamos filtrá-los.

Aqui está o que podemos fazer:

Lembre-se do atualmente destacado <td>em uma variável, vamos chamá-lo de currentElem.
On mouseover– ignora o evento se ainda estivermos dentro do atual <td>.
On mouseout– ignora se não deixamos o atual <td>.
Aqui está um exemplo de código que considera todas as situações possíveis:

// <td> under the mouse right now (if any)
let currentElem = null;

table.onmouseover = function(event) {
  // before entering a new element, the mouse always leaves the previous one
  // if currentElem is set, we didn't leave the previous <td>,
  // that's a mouseover inside it, ignore the event
  if (currentElem) return;

  let target = event.target.closest('td');

  // we moved not into a <td> - ignore
  if (!target) return;

  // moved into <td>, but outside of our table (possible in case of nested tables)
  // ignore
  if (!table.contains(target)) return;

  // hooray! we entered a new <td>
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function(event) {
  // if we're outside of any <td> now, then ignore the event
  // that's probably a move inside the table, but out of <td>,
  // e.g. from <tr> to another <tr>
  if (!currentElem) return;

  // we're leaving the element – where to? Maybe to a descendant?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // go up the parent chain and check – if we're still inside currentElem
    // then that's an internal transition – ignore it
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // we left the <td>. really.
  onLeave(currentElem);
  currentElem = null;
};

// any functions to handle entering/leaving an element
function onEnter(elem) {
  elem.style.background = 'pink';

  // show that in textarea
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

  // show that in textarea
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
Mais uma vez, os recursos importantes são:

Ele usa a delegação de eventos para lidar com a entrada/saída de qualquer um <td>dentro da tabela. Portanto, ele depende mouseover/outde não mouseenter/leavefazer bolhas e, portanto, não permite delegação.
Eventos extras, como mover entre descendentes de <td>, são filtrados, de modo que são onEnter/Leaveexecutados apenas se o ponteiro sair ou entrar <td>como um todo.
Aqui está o exemplo completo com todos os detalhes:

*/

// <td> under the mouse right now (if any)
let currentElem = null;

table.onmouseover = function(event) {
  // before entering a new element, the mouse always leaves the previous one
  // if currentElem is set, we didn't leave the previous <td>,
  // that's a mouseover inside it, ignore the event
  if (currentElem) return;

  let target = event.target.closest('td');

  // we moved not into a <td> - ignore
  if (!target) return;

  // moved into <td>, but outside of our table (possible in case of nested tables)
  // ignore
  if (!table.contains(target)) return;

  // hooray! we entered a new <td>
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function(event) {
  // if we're outside of any <td> now, then ignore the event
  // that's probably a move inside the table, but out of <td>,
  // e.g. from <tr> to another <tr>
  if (!currentElem) return;

  // we're leaving the element – where to? Maybe to a descendant?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // go up the parent chain and check – if we're still inside currentElem
    // then that's an internal transition – ignore it
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // we left the <td>. really.
  onLeave(currentElem);
  currentElem = null;
};

// any functions to handle entering/leaving an element
function onEnter(elem) {
  elem.style.background = 'pink';

  // show that in textarea
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

  // show that in textarea
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}

/*

Tente mover o cursor para dentro e para fora das células da tabela e dentro delas. Rápido ou lento – não importa. Apenas <td>como um todo é destacado, ao contrário do exemplo anterior.

Resumo
Cobrimos eventos mouseover, mouseout, mousemovee mouseenter.mouseleave

Estas coisas são boas de se observar:

Um movimento rápido do mouse pode pular elementos intermediários.
Eventos mouseover/oute mouseenter/leavetem uma propriedade adicional: relatedTarget. Esse é o elemento de/para o qual viemos, complementar a target.
Os eventos mouseover/outsão acionados mesmo quando passamos do elemento pai para um elemento filho. O navegador assume que o mouse pode estar apenas sobre um elemento por vez – o mais profundo.

Os eventos mouseenter/leavesão diferentes nesse aspecto: eles só disparam quando o mouse entra e sai do elemento como um todo. Além disso, eles não borbulham.

*/

