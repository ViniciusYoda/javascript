/*

Shadow DOM e eventos
A ideia por trás da árvore de sombra é encapsular detalhes de implementação interna de um componente.

Digamos que um evento click aconteça dentro de um shadow DOM do <user-card>componente. Mas os scripts no documento principal não têm ideia sobre os componentes internos do shadow DOM, especialmente se o componente vier de uma biblioteca de terceiros.

Portanto, para manter os detalhes encapsulados, o navegador redireciona o evento.

Os eventos que ocorrem no shadow DOM têm o elemento host como destino, quando capturados fora do componente.

Aqui está um exemplo simples:

<user-card></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Click me</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Outer target: " + e.target.tagName);
</script>

Se você clicar no botão, as mensagens são:

Destino interno: BUTTON– o manipulador de eventos interno obtém o destino correto, o elemento dentro do shadow DOM.
Destino externo: USER-CARD– o manipulador de eventos do documento obtém o host de sombra como destino.
O redirecionamento de eventos é ótimo, porque o documento externo não precisa saber sobre componentes internos. Do seu ponto de vista, o evento aconteceu em <user-card>.

O redirecionamento não ocorre se o evento ocorrer em um elemento com slot, que reside fisicamente no light DOM.

Por exemplo, se um usuário clicar <span slot="username">no exemplo abaixo, o alvo do evento é exatamente este spanelemento, tanto para manipuladores de sombra quanto para luz:

<user-card id="userCard">
  <span slot="username">John Smith</span>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div>
      <b>Name:</b> <slot name="username"></slot>
    </div>`;

    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

userCard.onclick = e => alert(`Outer target: ${e.target.tagName}`);
</script>

Se ocorrer um clique em "John Smith", para os manipuladores internos e externos, o destino será <span slot="username">. Esse é um elemento do light DOM, então nada de redirecionamento.

Por outro lado, se o clique ocorrer em um elemento originário do shadow DOM, por exemplo <b>Name</b>, em , então, conforme ele sai do shadow DOM, ele event.targeté redefinido para <user-card>.

Borbulhando, event.composedPath()
Para propósitos de bolhas de eventos, DOM achatado é usado.

Portanto, se tivermos um elemento com fenda e um evento ocorrer em algum lugar dentro dele, ele borbulha para cima <slot>e para cima.

O caminho completo para o destino do evento original, com todos os elementos de sombra, pode ser obtido usando event.composedPath(). Como podemos ver pelo nome do método, esse caminho é percorrido após a composição.

No exemplo acima, o DOM achatado é:

<user-card id="userCard">
  #shadow-root
    <div>
      <b>Name:</b>
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
</user-card>
Portanto, para um clique em <span slot="username">, uma chamada a event.composedPath()retorna um array: [ span, slot, div, shadow-root, user-card, body, html, document, window]. Essa é exatamente a cadeia pai do elemento de destino no DOM achatado, após a composição.

Os detalhes da árvore de sombra são fornecidos apenas para {mode:'open'}árvores
Se a árvore de sombra foi criada com {mode: 'closed'}, o caminho composto começa no host: user-carde para cima.

Esse é o mesmo princípio de outros métodos que funcionam com o shadow DOM. As partes internas das árvores fechadas ficam completamente escondidas.

evento.composto
A maioria dos eventos borbulha com sucesso através de um limite de shadow DOM. São poucos os eventos que não.

Isso é governado pela composedpropriedade do objeto de evento. Se for true, então o evento cruza o limite. Caso contrário, ele só pode ser capturado de dentro do shadow DOM.

Se você der uma olhada na especificação de UI Events , a maioria dos eventos tem composed: true:

blur, focus, focusin, focusout,
click, dblclick,
mousedown, mouseup mousemove, mouseout, mouseover,
wheel,
beforeinput, input, keydown, keyup.
Todos os eventos de toque e eventos de ponteiro também têm composed: true.

Existem alguns eventos que têm composed: falseembora:

mouseenter, mouseleave(eles não borbulham),
load, unload, abort, error,
select,
slotchange.
Esses eventos podem ser capturados apenas em elementos dentro do mesmo DOM, onde reside o destino do evento.

Eventos personalizados
Quando despachamos eventos personalizados, precisamos definir as propriedades de bubblese para que ele apareça e saia do componente.composedtrue

Por exemplo, aqui criamos div#innerno shadow DOM de div#outere acionamos dois eventos nele. Apenas aquele com composed: truefaz isso fora do documento:

<div id="outer"></div>

<script>
outer.attachShadow({mode: 'open'});

let inner = document.createElement('div');
outer.shadowRoot.append(inner);

/*
div(id=outer)
  #shadow-dom
    div(id=inner)
*//*

document.addEventListener('test', event => alert(event.detail));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
  composed: true,
  detail: "composed"
}));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
  composed: false,
  detail: "not composed"
}));
</script>
Resumo
Os eventos só cruzam os limites do shadow DOM se seu composedsinalizador estiver definido como true.

A maioria dos eventos integrados tem composed: true, conforme descrito nas especificações relevantes:

Eventos de IU https://www.w3.org/TR/uievents .
Eventos de toque https://w3c.github.io/touch-events .
Eventos de ponteiro https://www.w3.org/TR/pointerevents .
…E assim por diante.
Alguns eventos integrados que possuem composed: false:

mouseenter, mouseleave(também não borbulha),
load, unload, abort, error,
select,
slotchange.
Esses eventos podem ser capturados apenas em elementos dentro do mesmo DOM.

Se despacharmos a CustomEvent, devemos definir explicitamente composed: true.

Observe que, no caso de componentes aninhados, um shadow DOM pode ser aninhado em outro. Nesse caso, os eventos compostos passam por todos os limites do shadow DOM. Portanto, se um evento for destinado apenas ao componente de inclusão imediato, também podemos despachá-lo no host de sombra e definir composed: false. Em seguida, ele está fora do DOM de sombra do componente, mas não vai subir para o DOM de nível superior.

*/