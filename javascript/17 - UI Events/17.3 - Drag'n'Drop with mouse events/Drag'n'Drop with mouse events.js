/*

Drag'n'Drop com eventos de mouse
Drag'n'Drop é uma ótima solução de interface. Pegar algo e arrastá-lo e soltá-lo é uma maneira clara e simples de fazer muitas coisas, desde copiar e mover documentos (como em gerenciadores de arquivos) até fazer pedidos (colocar itens em um carrinho).

No padrão HTML moderno, há uma seção sobre arrastar e soltar com eventos especiais como dragstart, dragende assim por diante.

Esses eventos nos permitem oferecer suporte a tipos especiais de arrastar e soltar, como arrastar um arquivo do gerenciador de arquivos do sistema operacional e soltá-lo na janela do navegador. Então o JavaScript pode acessar o conteúdo desses arquivos.

Mas os eventos de arrastar nativos também têm limitações. Por exemplo, não podemos evitar arrastar de uma determinada área. Também não podemos fazer o arraste “horizontal” ou “vertical” apenas. E há muitas outras tarefas de arrastar e soltar que não podem ser feitas usando-as. Além disso, o suporte a dispositivos móveis para tais eventos é muito fraco.

Então, aqui veremos como implementar Drag'n'Drop usando eventos de mouse.

Algoritmo de arrastar e soltar
O algoritmo básico de Drag'n'Drop se parece com isto:

On mousedown– prepare o elemento para mover, se necessário (talvez crie um clone dele, adicione uma classe a ele ou qualquer outra coisa).
Em seguida, mousemovemova-o alterando left/topcom position:absolute.
Ativado mouseup– executa todas as ações relacionadas à conclusão do arrastar e soltar.
Estes são os princípios básicos. Posteriormente, veremos como adicionar outros recursos, como destacar os elementos subjacentes atuais enquanto os arrastamos.

Aqui está a implementação de arrastar uma bola:

ball.onmousedown = function(event) {
  // (1) prepare to moving: make absolute and on top by z-index
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(ball);

  // centers the ball at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  // move our absolutely positioned ball under the pointer
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (3) drop the ball, remove unneeded handlers
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
Se executarmos o código, podemos notar algo estranho. No início do arrastar e soltar, a bola “se bifurca”: começamos a arrastar o seu “clone”.

Aqui está um exemplo em ação:


Tente arrastar e soltar com o mouse e você verá esse comportamento.

Isso porque o navegador tem seu próprio suporte para arrastar e soltar imagens e alguns outros elementos. Ele é executado automaticamente e entra em conflito com o nosso.

Para desativá-lo:

ball.ondragstart = function() {
  return false;
};
Agora vai dar tudo certo.

Em ação:


Outro aspecto importante – rastreamos mousemoveem document, não em ball. À primeira vista, pode parecer que o mouse está sempre sobre a bola e podemos colocá mousemove-la.

Mas, como lembramos, mousemoveaciona com frequência, mas não para cada pixel. Portanto, após um movimento rápido, o ponteiro pode pular da bola em algum lugar no meio do documento (ou mesmo fora da janela).

Portanto, devemos ouvir documentpara pegá-lo.

Posicionamento correto
Nos exemplos acima, a bola é sempre movida de modo que seu centro fique sob o ponteiro:

ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
Nada mal, mas há um efeito colateral. Para iniciar o arrastar e soltar, podemos mousedownem qualquer lugar da bola. Mas se "pegá-la" de sua borda, a bola repentinamente "pula" para ficar centralizada sob o ponteiro do mouse.

Seria melhor se mantivéssemos o deslocamento inicial do elemento em relação ao ponteiro.

Por exemplo, se começarmos a arrastar pela borda da bola, o ponteiro deve permanecer sobre a borda enquanto arrastamos.


Vamos atualizar nosso algoritmo:

Quando um visitante pressiona o botão ( mousedown) – lembre-se da distância do ponteiro ao canto superior esquerdo da bola em variáveis shiftX/shiftY​​. Manteremos essa distância enquanto arrastamos.

Para obter esses deslocamentos, podemos subtrair as coordenadas:

// onmousedown
let shiftX = event.clientX - ball.getBoundingClientRect().left;
let shiftY = event.clientY - ball.getBoundingClientRect().top;
Então, enquanto arrastamos, posicionamos a bola no mesmo deslocamento em relação ao ponteiro, assim:

// onmousemove
// ball has position:absolute
ball.style.left = event.pageX - shiftX + 'px';
ball.style.top = event.pageY - shiftY + 'px';
O código final com melhor posicionamento:

ball.onmousedown = function(event) {

  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function() {
  return false;
};
Em ação (dentro <iframe>):


A diferença é especialmente perceptível se arrastarmos a bola pelo canto inferior direito. No exemplo anterior, a bola “pula” sob o ponteiro. Agora ele segue fluentemente o ponteiro da posição atual.

Possíveis alvos de drop (droppables)
Nos exemplos anteriores, a bola poderia ser largada “em qualquer lugar” para ficar. Na vida real, geralmente pegamos um elemento e o colocamos em outro. Por exemplo, um “arquivo” em uma “pasta” ou outra coisa.

Falando em abstrato, pegamos um elemento “arrastável” e o soltamos no elemento “soltável”.

Nós precisamos saber:

onde o elemento foi solto no final de Drag'n'Drop - para fazer a ação correspondente,
e, de preferência, conheça o droppable que estamos arrastando, para destacá-lo.
A solução é meio interessante e um pouco complicada, então vamos abordá-la aqui.

Qual pode ser a primeira ideia? Provavelmente para definir mouseover/mouseupmanipuladores em droppables em potencial?

Mas isso não funciona.

O problema é que, enquanto arrastamos, o elemento arrastável está sempre acima dos outros elementos. E os eventos do mouse acontecem apenas no elemento superior, não naqueles abaixo dele.

Por exemplo, abaixo estão dois <div>elementos, um vermelho em cima do azul (cobre totalmente). Não há como capturar um evento no azul, porque o vermelho está no topo:

<style>
  div {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
  }
</style>
<div style="background:blue" onmouseover="alert('never works')"></div>
<div style="background:red" onmouseover="alert('over red!')"></div>

O mesmo com um elemento arrastável. A bola está sempre em cima de outros elementos, então os eventos acontecem nela. Quaisquer que sejam os manipuladores que definirmos nos elementos inferiores, eles não funcionarão.

É por isso que a ideia inicial de colocar manipuladores em droppables em potencial não funciona na prática. Eles não vão correr.

Então o que fazer?

Existe um método chamado document.elementFromPoint(clientX, clientY). Ele retorna o elemento mais aninhado em determinadas coordenadas relativas à janela (ou nullse as coordenadas fornecidas estiverem fora da janela). Se houver vários elementos sobrepostos nas mesmas coordenadas, o mais alto será retornado.

Podemos usá-lo em qualquer um de nossos manipuladores de eventos de mouse para detectar o possível droppable sob o ponteiro, assim:

// in a mouse event handler
ball.hidden = true; // (*) hide the element that we drag

let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow is the element below the ball, may be droppable

ball.hidden = false;
Observação: precisamos esconder a bola antes da chamada (*). Caso contrário, normalmente teremos uma bola nessas coordenadas, pois é o elemento superior sob o ponteiro: elemBelow=ball. Então, escondemos e imediatamente mostramos novamente.

Podemos usar esse código para verificar qual elemento estamos “sobrevoando” a qualquer momento. E lide com a queda quando isso acontecer.

Um código estendido de onMouseMovepara encontrar elementos “soltáveis”:

// potential droppable that we're flying over right now
let currentDroppable = null;

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

  // mousemove events may trigger out of the window (when the ball is dragged off-screen)
  // if clientX/clientY are out of the window, then elementFromPoint returns null
  if (!elemBelow) return;

  // potential droppables are labeled with the class "droppable" (can be other logic)
  let droppableBelow = elemBelow.closest('.droppable');

  if (currentDroppable != droppableBelow) {
    // we're flying in or out...
    // note: both values can be null
    //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
    //   droppableBelow=null if we're not over a droppable now, during this event

    if (currentDroppable) {
      // the logic to process "flying out" of the droppable (remove highlight)
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // the logic to process "flying in" of the droppable
      enterDroppable(currentDroppable);
    }
  }
}
No exemplo abaixo, quando a bola é arrastada sobre o gol de futebol, o gol é destacado.

Resultadoestilo.cssindex.html

Agora temos o “drop target” atual, sobre o qual estamos sobrevoando, na variável currentDroppabledurante todo o processo e podemos usá-lo para realçar ou qualquer outra coisa.

Resumo
Consideramos um algoritmo básico de arrastar e soltar.

Os principais componentes:

Fluxo de eventos: ball.mousedown→ document.mousemove→ ball.mouseup(não se esqueça de cancelar o nativo ondragstart).
No início do arrasto – lembre-se do deslocamento inicial do ponteiro em relação ao elemento: shiftX/shiftYe mantenha-o durante o arrasto.
Detecte elementos que podem ser soltos sob o ponteiro usando document.elementFromPoint.
Podemos lançar muito sobre esse fundamento.

On mouseuppodemos finalizar intelectualmente a queda: alterar dados, mover elementos.
Podemos destacar os elementos sobre os quais estamos sobrevoando.
Podemos limitar o arrasto por uma determinada área ou direção.
Podemos usar a delegação de eventos para arquivos mousedown/up. Um manipulador de eventos de grande área que verifica event.targetpode gerenciar Drag'n'Drop para centenas de elementos.
E assim por diante.
Existem frameworks que constroem arquitetura sobre ele: DragZone, Droppable, Draggablee outras classes. A maioria deles faz coisas semelhantes às descritas acima, então deve ser fácil entendê-los agora. Ou crie o seu próprio, pois você pode ver que é bastante fácil de fazer, às vezes mais fácil do que adaptar uma solução de terceiros.

*/
