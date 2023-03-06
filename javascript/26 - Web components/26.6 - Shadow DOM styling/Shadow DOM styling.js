/*

Estilização do Shadow DOM
O Shadow DOM pode incluir tags <style>e <link rel="stylesheet" href="…">. No último caso, as folhas de estilo são armazenadas em cache HTTP, portanto, não são baixadas novamente para vários componentes que usam o mesmo modelo.

Como regra geral, os estilos locais funcionam apenas dentro da árvore de sombra e os estilos de documento funcionam fora dela. Mas há poucas exceções.

:hospedar
O :hostseletor permite selecionar o host de sombra (o elemento que contém a árvore de sombra).

Por exemplo, estamos criando <custom-dialog>um elemento que deve ser centralizado. Para isso, precisamos estilizar o <custom-dialog>próprio elemento.

Isso é exatamente o que :hostfaz:

<template id="tmpl">
  <style>
    /* the style will be applied from inside to the custom-dialog element */
   /* :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>

<custom-dialog>
  Hello!
</custom-dialog>

Cascata
O host de sombra ( <custom-dialog>em si) reside no light DOM, portanto, é afetado pelas regras de CSS do documento.

Se houver uma propriedade estilizada localmente :hoste no documento, o estilo do documento terá precedência.

Por exemplo, se no documento tivéssemos:

<style>
custom-dialog {
  padding: 0;
}
</style>
…Então o <custom-dialog>seria sem preenchimento.

É muito conveniente, pois podemos configurar estilos de componentes “padrão” em sua :hostregra e facilmente substituí-los no documento.

A exceção é quando uma propriedade local é rotulada como !important; para essas propriedades, os estilos locais têm precedência.

:host(seletor)
O mesmo que :host, mas aplicado somente se o host de sombra corresponder ao selector.

Por exemplo, gostaríamos de centralizar <custom-dialog>apenas se ele tiver centeredatributo:

<template id="tmpl">
  <style>
    :host([centered]) {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-color: blue;
    }

    :host {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>


<custom-dialog centered>
  Centered!
</custom-dialog>

<custom-dialog>
  Not centered.
</custom-dialog>

Agora, os estilos de centralização adicionais são aplicados apenas ao primeiro diálogo: <custom-dialog centered>.

Para resumir, podemos usar :host-family of seletores para estilizar o elemento principal do componente. Esses estilos (a menos que !important) podem ser substituídos pelo documento.

Estilizando o conteúdo com slot
Agora vamos considerar a situação com slots.

Os elementos com fenda vêm do DOM leve, então eles usam estilos de documento. Os estilos locais não afetam o conteúdo com slot.

No exemplo abaixo, slotted <span>está em negrito, de acordo com o estilo do documento, mas não é retirado backgrounddo estilo local:

<style>
  span { font-weight: bold }
</style>

<user-card>
  <div slot="username"><span>John Smith</span></div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
      span { background: red; }
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>

O resultado é ousado, mas não vermelho.

Se quisermos estilizar elementos com fenda em nosso componente, há duas opções.

Primeiro, podemos estilizar o <slot>próprio e confiar na herança CSS:

<user-card>
  <div slot="username"><span>John Smith</span></div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
      slot[name="username"] { font-weight: bold; }
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>

Aqui <p>John Smith</p>fica em negrito, porque a herança CSS está em vigor entre o <slot>e seu conteúdo. Mas no próprio CSS nem todas as propriedades são herdadas.

Outra opção é usar ::slotted(selector)pseudo-classe. Ele combina elementos com base em duas condições:

Esse é um elemento com slot, que vem do light DOM. O nome do slot não importa. Apenas qualquer elemento com slot, mas apenas o elemento em si, não seus filhos.
O elemento corresponde ao selector.
Em nosso exemplo, ::slotted(div)seleciona exatamente <div slot="username">, mas não seus filhos:

<user-card>
  <div slot="username">
    <div>John Smith</div>
  </div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
      ::slotted(div) { border: 1px solid red; }
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>

Observe que ::slottedo seletor não pode descer mais no slot. Estes seletores são inválidos:

::slotted(div span) {
  /* our slotted <div> does not match this *//*
}

::slotted(div) p {
  /* can't go inside light DOM *//*
}
Além disso, ::slottedsó pode ser usado em CSS. Não podemos usá-lo em querySelector.

Hooks CSS com propriedades personalizadas
Como estilizamos os elementos internos de um componente do documento principal?

Seletores como :hostaplicar regras a <custom-dialog>element ou <user-card>, mas como estilizar os elementos shadow DOM dentro deles?

Não há nenhum seletor que possa afetar diretamente os estilos shadow DOM do documento. Mas, assim como expomos métodos para interagir com nosso componente, podemos expor variáveis ​​CSS (propriedades CSS personalizadas) para estilizá-lo.

As propriedades CSS personalizadas existem em todos os níveis, tanto na luz quanto na sombra.

Por exemplo, no shadow DOM podemos usar --user-card-field-colorvariáveis ​​CSS para estilizar campos, e o documento externo pode definir seu valor:

<style>
  .field {
    color: var(--user-card-field-color, black);
    /* if --user-card-field-color is not defined, use black color *//*
  }
</style>
<div class="field">Name: <slot name="username"></slot></div>
<div class="field">Birthday: <slot name="birthday"></slot></div>
Então, podemos declarar esta propriedade no documento externo para <user-card>:

user-card {
  --user-card-field-color: green;
}
As propriedades CSS personalizadas perfuram o shadow DOM, elas são visíveis em todos os lugares, portanto, a .fieldregra interna fará uso dela.

Aqui está o exemplo completo:

<style>
  user-card {
    --user-card-field-color: green;
  }
</style>

<template id="tmpl">
  <style>
    .field {
      color: var(--user-card-field-color, black);
    }
  </style>
  <div class="field">Name: <slot name="username"></slot></div>
  <div class="field">Birthday: <slot name="birthday"></slot></div>
</template>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
  }
});
</script>

<user-card>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>

Resumo
O Shadow DOM pode incluir estilos, como <style>ou <link rel="stylesheet">.

Os estilos locais podem afetar:

árvore de sombra,
host de sombra com :hoste :host()pseudoclasses,
Elementos com fenda (vindos do Light DOM), ::slotted(selector)permitem selecionar os próprios elementos com fenda, mas não seus filhos.
Os estilos de documento podem afetar:

host de sombra (como ele vive no documento externo)
elementos com fenda e seus conteúdos (como também está no documento externo)
Quando as propriedades CSS entram em conflito, normalmente os estilos de documento têm precedência, a menos que a propriedade seja rotulada como !important. Então os estilos locais têm precedência.

As propriedades personalizadas do CSS atravessam o shadow DOM. Eles são usados ​​como “ganchos” para estilizar o componente:

O componente usa uma propriedade CSS personalizada para estilizar elementos-chave, como var(--component-name-title, <default value>).
O autor do componente publica essas propriedades para desenvolvedores, elas são tão importantes quanto outros métodos de componentes públicos.
Quando um desenvolvedor deseja estilizar um título, ele atribui --component-name-titlea propriedade CSS para o host de sombra ou superior.
Lucro!

*/