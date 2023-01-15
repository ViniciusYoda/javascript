/*

Introdução aos eventos do navegador
Um evento é um sinal de que algo aconteceu. Todos os nós DOM geram tais sinais (mas os eventos não estão limitados ao DOM).

Aqui está uma lista dos eventos DOM mais úteis, apenas para dar uma olhada:

Eventos do mouse:

click– quando o mouse clica em um elemento (dispositivos touchscreen o geram com um toque).
contextmenu– quando o mouse clica com o botão direito em um elemento.
mouseover/ mouseout– quando o cursor do mouse passa por cima de / sai de um elemento.
mousedown/ mouseup– quando o botão do mouse é pressionado/solto sobre um elemento.
mousemove– quando o mouse é movido.
Eventos de teclado:

keydowne keyup– quando uma tecla do teclado é pressionada e liberada.
Eventos de elemento de formulário:

submit– quando o visitante envia um arquivo <form>.
focus– quando o visitante se concentra em um elemento, por exemplo, em um arquivo <input>.
Eventos do documento:

DOMContentLoaded– quando o HTML é carregado e processado, o DOM é totalmente construído.
Eventos CSS:

transitionend– quando uma animação CSS termina.
Existem muitos outros eventos. Entraremos em mais detalhes de eventos específicos nos próximos capítulos.

Manipuladores de eventos
Para reagir a eventos, podemos atribuir um manipulador – uma função que é executada no caso de um evento.

Os manipuladores são uma maneira de executar o código JavaScript no caso de ações do usuário.

Existem várias maneiras de atribuir um manipulador. Vamos vê-los, começando pelo mais simples.

atributo HTML
Um manipulador pode ser definido em HTML com um atributo chamado on<event>.

Por exemplo, para atribuir um clickmanipulador para um input, podemos usar onclick, como aqui:

<input value="Click me" onclick="alert('Click!')" type="button">
Com um clique do mouse, o código interno onclické executado.

Observe que dentro onclickusamos aspas simples, porque o próprio atributo está entre aspas duplas. Se esquecermos que o código está dentro do atributo e colocarmos aspas dentro, assim: onclick="alert("Click!")", então não vai funcionar direito.

Um atributo HTML não é um lugar conveniente para escrever muito código, então é melhor criarmos uma função JavaScript e chamá-la lá.

Aqui um clique executa a função countRabbits():

<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Rabbit number " + i);
    }
  }
</script>

<input type="button" onclick="countRabbits()" value="Count rabbits!">

Como sabemos, os nomes de atributos HTML não diferenciam maiúsculas de minúsculas, então ONCLICKfunciona tão bem quanto onClicke onCLICK… Mas geralmente os atributos são minúsculos: onclick.

propriedade DOM
Podemos atribuir um manipulador usando uma propriedade DOM on<event>.

Por exemplo elem.onclick:

<input id="elem" type="button" value="Click me">
<script>
  elem.onclick = function() {
    alert('Thank you');
  };
</script>

Se o manipulador for atribuído usando um atributo HTML, o navegador o lerá, criará uma nova função a partir do conteúdo do atributo e a gravará na propriedade DOM.

Portanto, este caminho é realmente o mesmo que o anterior.

Essas duas partes do código funcionam da mesma forma:

Somente HTML:

<input type="button" onclick="alert('Click!')" value="Button">

HTML + JS:

<input type="button" id="button" value="Button">
<script>
  button.onclick = function() {
    alert('Click!');
  };
</script>

No primeiro exemplo, o atributo HTML é usado para inicializar o button.onclick, enquanto no segundo exemplo – o script, essa é toda a diferença.

Como há apenas uma onclickpropriedade, não podemos atribuir mais de um manipulador de eventos.

No exemplo abaixo, adicionar um manipulador com JavaScript substitui o manipulador existente:

<input type="button" id="elem" onclick="alert('Before')" value="Click me">
<script>
  elem.onclick = function() { // overwrites the existing handler
    alert('After'); // only this will be shown
  };
</script>

Para remover um manipulador – atribua elem.onclick = null.

Acessando o elemento: este
O valor de thisdentro de um manipulador é o elemento. Aquele que tem o manipulador nele.

No código abaixo buttonmostra seu conteúdo usando this.innerHTML:

<button onclick="alert(this.innerHTML)">Click me</button>

Possíveis erros
Se você está começando a trabalhar com eventos, observe algumas sutilezas.

Podemos definir uma função existente como um manipulador:

function sayThanks() {
  alert('Thanks!');
}

elem.onclick = sayThanks;
Mas cuidado: a função deve ser atribuída como sayThanks, não sayThanks().

// right
button.onclick = sayThanks;

// wrong
button.onclick = sayThanks();
Se adicionarmos parênteses, sayThanks()torna-se uma chamada de função. Portanto, a última linha realmente pega o resultado da execução da função, ou seja undefined(como a função não retorna nada), e o atribui a onclick. Isso não funciona.

…Por outro lado, na marcação, precisamos dos parênteses:

<input type="button" id="button" onclick="sayThanks()">
A diferença é fácil de explicar. Quando o navegador lê o atributo, ele cria uma função manipuladora com corpo a partir do conteúdo do atributo.

Portanto, a marcação gera esta propriedade:

button.onclick = function() {
  sayThanks(); // <-- the attribute content goes here
};
Não use setAttributepara manipuladores.

Essa chamada não funcionará:

// a click on <body> will generate errors,
// because attributes are always strings, function becomes a string
document.body.setAttribute('onclick', function() { alert(1) });
O caso da propriedade DOM é importante.

Atribua um manipulador para elem.onclick, não elem.ONCLICK, porque as propriedades DOM diferenciam maiúsculas de minúsculas.

addEventListener
O problema fundamental das formas mencionadas de atribuir manipuladores é que não podemos atribuir vários manipuladores a um evento .

Digamos que uma parte do nosso código deseja destacar um botão ao clicar e outra deseja mostrar uma mensagem no mesmo clique.

Gostaríamos de atribuir dois manipuladores de eventos para isso. Mas uma nova propriedade DOM substituirá a existente:

input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // replaces the previous handler
Os desenvolvedores de padrões da web entenderam isso há muito tempo e sugeriram uma maneira alternativa de gerenciar manipuladores usando métodos especiais addEventListenere removeEventListenerque não estão vinculados a essa restrição.

A sintaxe para adicionar um manipulador:

element.addEventListener(event, handler, [options]);
event
Nome do evento, por exemplo "click".
handler
A função do manipulador.
options
Um objeto opcional adicional com propriedades:
once: se true, então o ouvinte é removido automaticamente após ser acionado.
capture: a fase em que lidar com o evento, a ser abordada posteriormente no capítulo Bubbling e captura . Por razões históricas, optionstambém pode ser false/true, que é o mesmo que {capture: false/true}.
passive: se true, o manipulador não chamará preventDefault(), explicaremos isso mais tarde em Ações padrão do navegador .
Para remover o manipulador, use removeEventListener:

element.removeEventListener(event, handler, [options]);
Remoção requer a mesma função
Para remover um manipulador, devemos passar exatamente a mesma função que foi atribuída.

Isso não funciona:

elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
O handler não será removido, pois removeEventListenerganha outra função – com o mesmo código, mas isso não importa, pois é um objeto de função diferente.

Aqui está o caminho certo:

function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
Observe – se não armazenarmos a função em uma variável, não poderemos removê-la. Não há como “ler novamente” manipuladores atribuídos por addEventListener.

Várias chamadas para addEventListenerpermitir a adição de vários manipuladores, como este:

<input id="elem" type="button" value="Click me"/>

<script>
  function handler1() {
    alert('Thanks!');
  };

  function handler2() {
    alert('Thanks again!');
  }

  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Thanks!
  elem.addEventListener("click", handler2); // Thanks again!
</script>
Como podemos ver no exemplo acima, podemos definir manipuladores usando uma propriedade DOM e addEventListener. Mas geralmente usamos apenas uma dessas maneiras.

Para alguns eventos, os manipuladores funcionam apenas comaddEventListener
Existem eventos que não podem ser atribuídos por meio de uma propriedade DOM. Apenas com addEventListener.

Por exemplo, o DOMContentLoadedevento, que dispara quando o documento é carregado e o DOM foi construído.

// will never run
document.onDOMContentLoaded = function() {
  alert("DOM built");
};
// this way it works
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM built");
});
Então addEventListeneré mais universal. Embora, tais eventos sejam uma exceção e não a regra.

Objeto de evento
Para lidar adequadamente com um evento, gostaríamos de saber mais sobre o que aconteceu. Não apenas um “clique” ou um “keydown”, mas quais eram as coordenadas do ponteiro? Qual tecla foi pressionada? E assim por diante.

Quando um evento acontece, o navegador cria um objeto de evento , coloca detalhes nele e o passa como um argumento para o manipulador.

Aqui está um exemplo de obtenção de coordenadas de ponteiro do objeto de evento:

<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(event) {
    // show event type, element and coordinates of the click
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
Algumas propriedades do eventobjeto:

event.type
Tipo de evento, aqui está "click".
event.currentTarget
Elemento que tratou o evento. Isso é exatamente o mesmo que this, a menos que o manipulador seja uma função de seta ou thisesteja vinculado a outra coisa, podemos obter o elemento de event.currentTarget.
event.clientX / event.clientY
Coordenadas relativas à janela do cursor, para eventos de ponteiro.
Existem mais propriedades. Muitos deles dependem do tipo de evento: eventos de teclado têm um conjunto de propriedades, eventos de ponteiro – outro, vamos estudá-los mais tarde quando passarmos para os detalhes de diferentes eventos.

O objeto de evento também está disponível em manipuladores HTML
Se atribuirmos um handler em HTML, também podemos usar o eventobjeto, assim:

<input type="button" onclick="alert(event.type)" value="Event type">

Isso é possível porque quando o navegador lê o atributo, ele cria um manipulador como este: function(event) { alert(event.type) }. Ou seja: seu primeiro argumento é chamado "event", e o corpo é retirado do atributo.

Manipuladores de objetos: handleEvent
Podemos atribuir não apenas uma função, mas um objeto como manipulador de eventos usando addEventListener. Quando ocorre um evento, seu handleEventmétodo é chamado.

Por exemplo:

<button id="elem">Click me</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
Como podemos ver, ao addEventListenerreceber um objeto como handler, ele chama obj.handleEvent(event)em caso de evento.

Também poderíamos usar objetos de uma classe personalizada, assim:

<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }

  let menu = new Menu();

  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
Aqui, o mesmo objeto lida com ambos os eventos. Observe que precisamos configurar explicitamente os eventos para ouvir usando addEventListener. O menuobjeto só recebe mousedowne mouseupaqui, nenhum outro tipo de evento.

O método handleEventnão precisa fazer todo o trabalho sozinho. Ele pode chamar outros métodos específicos do evento, como este:

<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Mouse button pressed";
    }

    onMouseup() {
      elem.innerHTML += "...and released.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
Agora os manipuladores de eventos estão claramente separados, o que pode ser mais fácil de suportar.

Resumo
Existem 3 maneiras de atribuir manipuladores de eventos:

Atributo HTML: onclick="...".
Propriedade DOM: elem.onclick = function.
Métodos: elem.addEventListener(event, handler[, phase])adicionar, removeEventListenerremover.
Os atributos HTML são usados ​​com moderação, porque o JavaScript no meio de uma tag HTML parece um pouco estranho e estranho. Também não pode escrever muito código lá.

As propriedades DOM podem ser usadas, mas não podemos atribuir mais de um manipulador do evento específico. Em muitos casos, essa limitação não é premente.

A última maneira é a mais flexível, mas também é a mais demorada para escrever. Existem poucos eventos que funcionam apenas com ele, por exemplo transitionende DOMContentLoaded(a ser coberto). Também addEventListeneroferece suporte a objetos como manipuladores de eventos. Nesse caso, o método handleEventé chamado no caso do evento.

Não importa como você atribui o manipulador – ele obtém um objeto de evento como o primeiro argumento. Esse objeto contém os detalhes sobre o que aconteceu.

Aprenderemos mais sobre eventos em geral e sobre diferentes tipos de eventos nos próximos capítulos.

*/

