/*

Despachando eventos personalizados
Podemos não apenas atribuir manipuladores, mas também gerar eventos de JavaScript.

Eventos customizados podem ser usados ​​para criar “componentes gráficos”. Por exemplo, um elemento raiz de nosso próprio menu baseado em JS pode acionar eventos informando o que acontece com o menu: open(menu aberto), select(um item é selecionado) e assim por diante. Outro código pode escutar os eventos e observar o que está acontecendo com o menu.

Podemos gerar não apenas eventos completamente novos, que inventamos para nossos próprios propósitos, mas também eventos integrados, como click, mousedownetc. Isso pode ser útil para testes automatizados.

Construtor de eventos
As classes de eventos incorporadas formam uma hierarquia, semelhante às classes de elementos DOM. A raiz é a classe de evento integrada .

Podemos criar Eventobjetos assim:

let event = new Event(type[, options]);
Argumentos:

type – tipo de evento, uma string como "click"ou nossa própria como "my-event".

opções – o objeto com duas propriedades opcionais:

bubbles: true/false– se true, então o evento borbulha.
cancelable: true/false– se true, então a “ação padrão” pode ser evitada. Mais tarde veremos o que isso significa para eventos personalizados.
Por padrão, ambos são falsos: {bubbles: false, cancelable: false}.

dispatchEvent
Depois que um objeto de evento é criado, devemos “executá-lo” em um elemento usando a chamada elem.dispatchEvent(event).

Em seguida, os manipuladores reagem a ele como se fosse um evento regular do navegador. Se o evento foi criado com a bubblesbandeira, ele borbulha.

No exemplo abaixo o clickevento é iniciado em JavaScript. O manipulador funciona da mesma forma como se o botão fosse clicado:

<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
evento.isTrusted
Existe uma maneira de diferenciar um evento de usuário “real” de um evento gerado por script.

A propriedade event.isTrustedé truepara eventos provenientes de ações reais do usuário e falsepara eventos gerados por script.

Exemplo de bolha
Podemos criar um evento borbulhante com o nome "hello"e pegá-lo document.

Tudo o que precisamos é definir bubblespara true:

<h1 id="elem">Hello from the script!</h1>

<script>
  // catch on document...
  document.addEventListener("hello", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello from H1
  });

  // ...dispatch on elem!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

  // the handler on document will activate and display the message.

</script>
Notas:

Devemos usar addEventListenerpara nossos eventos personalizados, porque on<event>existe apenas para eventos internos, document.onhellonão funciona.
Deve definir bubbles:true, caso contrário, o evento não irá borbulhar.
A mecânica de bolhas é a mesma para eventos integrados ( click) e personalizados ( ). helloHá também estágios de captura e borbulhamento.

MouseEvent, KeyboardEvent e outros
Aqui está uma pequena lista de classes para UI Events da especificação UI Event :

UIEvent
FocusEvent
MouseEvent
WheelEvent
KeyboardEvent
…
Devemos usá-los em vez de new Eventse quisermos criar tais eventos. Por exemplo, new MouseEvent("click").

O construtor certo permite especificar propriedades padrão para esse tipo de evento.

Como clientX/clientYpara um evento de mouse:

let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

alert(event.clientX); // 100
Observe: o Eventconstrutor genérico não permite isso.

Vamos tentar:

let event = new Event("click", {
  bubbles: true, // only bubbles and cancelable
  cancelable: true, // work in the Event constructor
  clientX: 100,
  clientY: 100
});

alert(event.clientX); // undefined, the unknown property is ignored!
Tecnicamente, podemos contornar isso atribuindo diretamente event.clientX=100após a criação. Portanto, é uma questão de conveniência e de seguir as regras. Os eventos gerados pelo navegador sempre têm o tipo certo.

A lista completa de propriedades para diferentes eventos de interface do usuário está na especificação, por exemplo, MouseEvent .

Eventos personalizados
Para os nossos próprios tipos de eventos completamente novos, como "hello"devemos usar new CustomEvent. Tecnicamente CustomEvent é o mesmo que Event, com uma exceção.

No segundo argumento (objeto) podemos adicionar uma propriedade adicional detailpara qualquer informação personalizada que queremos passar com o evento.

Por exemplo:

<h1 id="elem">Hello for John!</h1>

<script>
  // additional details come with the event to the handler
  elem.addEventListener("hello", function(event) {
    alert(event.detail.name);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
    detail: { name: "John" }
  }));
</script>
A detailpropriedade pode ter quaisquer dados. Tecnicamente, poderíamos viver sem, porque podemos atribuir quaisquer propriedades a um new Eventobjeto regular após sua criação. Mas CustomEventfornece o detailcampo especial para evitar conflitos com outras propriedades do evento.

Além disso, a classe de evento descreve “que tipo de evento” é e, se o evento for personalizado, devemos usá CustomEvent-lo apenas para esclarecer o que é.

event.preventDefault()
Muitos eventos do navegador têm uma “ação padrão”, como navegar para um link, iniciar uma seleção e assim por diante.

Para novos eventos personalizados, definitivamente não há ações padrão do navegador, mas um código que despacha tal evento pode ter seus próprios planos sobre o que fazer após acionar o evento.

Ao chamar event.preventDefault(), um manipulador de eventos pode enviar um sinal de que essas ações devem ser canceladas.

Nesse caso, a chamada para elem.dispatchEvent(event)retorna false. E o código que o despachou sabe que não deve continuar.

Vejamos um exemplo prático – um coelho escondido (pode ser um menu de encerramento ou outra coisa).

Abaixo você pode ver uma função #rabbitand hide()que despacha "hide"um evento nele, para que todas as partes interessadas saibam que o coelho vai se esconder.

Qualquer manipulador pode escutar esse evento com rabbit.addEventListener('hide',...)e, se necessário, cancelar a ação usando event.preventDefault(). Então o coelho não vai desaparecer:

<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Hide()</button>

<script>
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // without that flag preventDefault doesn't work
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('The action was prevented by a handler');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Call preventDefault?")) {
      event.preventDefault();
    }
  });
</script>

Atenção: o evento deve ter o sinalizador cancelable: true, caso contrário a chamada event.preventDefault()é ignorada.

Eventos-em-eventos são síncronos
Normalmente os eventos são processados ​​em uma fila. Ou seja: se o navegador estiver processando onclicke um novo evento ocorrer, por exemplo, mouse movido, então seu manuseio é colocado na fila, os mousemovemanipuladores correspondentes serão chamados após o término do onclickprocessamento.

A exceção notável é quando um evento é iniciado de dentro de outro, por exemplo, usando dispatchEvent. Tais eventos são processados ​​imediatamente: os novos manipuladores de eventos são chamados e, em seguida, o tratamento de eventos atual é retomado.

Por exemplo, no código abaixo, o menu-openevento é acionado durante o onclick.

É processado imediatamente, sem esperar que o onclickmanipulador termine:

<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  // triggers between 1 and 2
  document.addEventListener('menu-open', () => alert('nested'));
</script>

A ordem de saída é: 1 → aninhado → 2.

Observe que o evento aninhado menu-opené capturado no arquivo document. A propagação e o tratamento do evento aninhado são concluídos antes que o processamento volte para o código externo ( onclick).

Isso não é só sobre dispatchEvent, existem outros casos. Se um manipulador de eventos chama métodos que acionam outros eventos – eles também são processados ​​de forma síncrona, de forma aninhada.

Digamos que não gostamos. Queremos onclickser totalmente processados ​​primeiro, independentemente de menu-openou de qualquer outro evento aninhado.

Em seguida, podemos colocar o dispatchEvent(ou outra chamada de acionamento de evento) no final de onclickou, talvez melhor, envolvê-lo no atraso zero setTimeout:

<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
Agora dispatchEventé executado de forma assíncrona após a conclusão da execução do código atual, incluindo menu.onclick, portanto, os manipuladores de eventos são totalmente separados.

A ordem de saída torna-se: 1 → 2 → aninhado.

Resumo
Para gerar um evento a partir do código, primeiro precisamos criar um objeto de evento.

O construtor genérico Event(name, options)aceita um nome de evento arbitrário e o optionsobjeto com duas propriedades:

bubbles: truese o evento deve bolha.
cancelable: truese o event.preventDefault()deve funcionar.
Outros construtores de eventos nativos, como MouseEvente KeyboardEventassim por diante, aceitam propriedades específicas desse tipo de evento. Por exemplo, clientXpara eventos de mouse.

Para eventos personalizados, devemos usar CustomEventconstructor. Ele tem uma opção adicional chamada detail, devemos atribuir os dados específicos do evento a ele. Então todos os manipuladores podem acessá-lo como arquivos event.detail.

Apesar da possibilidade técnica de gerar eventos de navegador como clickou keydown, devemos utilizá-los com muito cuidado.

Não devemos gerar eventos do navegador, pois é uma maneira hacky de executar manipuladores. Isso é arquitetura ruim na maioria das vezes.

Eventos nativos podem ser gerados:

Como um hack sujo para fazer as bibliotecas de terceiros funcionarem da maneira necessária, se elas não fornecerem outros meios de interação.
Para testes automatizados, “clique no botão” no script e veja se a interface reage corretamente.
Eventos personalizados com nossos próprios nomes geralmente são gerados para fins de arquitetura, para sinalizar o que acontece dentro de nossos menus, controles deslizantes, carrosséis, etc.

*/