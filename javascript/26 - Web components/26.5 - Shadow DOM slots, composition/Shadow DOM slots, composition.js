/*

Slots Shadow DOM, composição
Muitos tipos de componentes, como guias, menus, galerias de imagens e assim por diante, precisam do conteúdo para renderizar.

Assim como o navegador integrado <select>espera <option>itens, podemos <custom-tabs>esperar que o conteúdo real da guia seja passado. E <custom-menu>pode esperar itens de menu.

O código que faz uso <custom-menu>pode ficar assim:

<custom-menu>
  <title>Candy menu</title>
  <item>Lollipop</item>
  <item>Fruit Toast</item>
  <item>Cup Cake</item>
</custom-menu>
…Então nosso componente deve renderizá-lo corretamente, como um bom menu com determinado título e itens, lidar com eventos de menu, etc.

Como implementá-lo?

Poderíamos tentar analisar o conteúdo do elemento e copiar e reorganizar dinamicamente os nós DOM. Isso é possível, mas se estivermos movendo elementos para o shadow DOM, os estilos CSS do documento não se aplicam lá, então o estilo visual pode ser perdido. Além disso, isso requer alguma codificação.

Felizmente, não precisamos. Shadow DOM suporta <slot>elementos, que são preenchidos automaticamente pelo conteúdo do light DOM.

slots nomeados
Vamos ver como os slots funcionam em um exemplo simples.

Aqui, <user-card>o shadow DOM fornece dois slots, preenchidos pelo light DOM:

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div>Name:
        <slot name="username"></slot>
      </div>
      <div>Birthday:
        <slot name="birthday"></slot>
      </div>
    `;
  }
});
</script>

<user-card>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>

No shadow DOM, <slot name="X">define um “ponto de inserção”, um local onde os elementos com slot="X"são renderizados.

Em seguida, o navegador executa a “composição”: ele pega elementos do light DOM e os renderiza nos slots correspondentes do shadow DOM. No final, temos exatamente o que queremos – um componente que pode ser preenchido com dados.

Aqui está a estrutura do DOM após o script, sem levar em conta a composição:

<user-card>
  #shadow-root
    <div>Name:
      <slot name="username"></slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
Criamos o shadow DOM, então aqui está, em #shadow-root. Agora o elemento tem DOM de luz e sombra.

Para fins de renderização, para cada um <slot name="...">no shadow DOM, o navegador procura slot="..."pelo mesmo nome no light DOM. Esses elementos são renderizados dentro dos slots:


O resultado é chamado de DOM “achatado”:

<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <!-- slotted element is inserted into the slot -->
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
</user-card>
…Mas o DOM nivelado existe apenas para fins de renderização e manipulação de eventos. É meio “virtual”. É assim que as coisas são mostradas. Mas os nós no documento não são realmente movidos!

Isso pode ser facilmente verificado se executarmos querySelectorAll: os nós ainda estão em seus lugares.

// light DOM <span> nodes are still at the same place, under `<user-card>`
alert( document.querySelectorAll('user-card span').length ); // 2
Portanto, o DOM achatado é derivado do DOM de sombra inserindo slots. O navegador o renderiza e usa para herança de estilo, propagação de eventos (mais sobre isso mais tarde). Mas o JavaScript ainda vê o documento “como está”, antes de nivelar.

Somente filhos de nível superior podem ter o atributo slot="…"
O slot="..."atributo só é válido para filhos diretos do host shadow (no nosso exemplo, <user-card>elemento). Para elementos aninhados, é ignorado.

Por exemplo, o segundo <span>aqui é ignorado (já que não é um filho de nível superior de <user-card>):

<user-card>
  <span slot="username">John Smith</span>
  <div>
    <!-- invalid slot, must be direct child of user-card -->
    <span slot="birthday">01.01.2001</span>
  </div>
</user-card>
Se houver vários elementos no light DOM com o mesmo nome de slot, eles serão anexados ao slot, um após o outro.

Por exemplo, isto:

<user-card>
  <span slot="username">John</span>
  <span slot="username">Smith</span>
</user-card>
Dá este DOM achatado com dois elementos em <slot name="username">:

<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <span slot="username">John</span>
        <span slot="username">Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
</user-card>
Conteúdo substituto do slot
Se colocarmos algo dentro de um <slot>, ele se tornará o conteúdo alternativo, “padrão”. O navegador mostra se não há preenchimento correspondente no light DOM.

Por exemplo, neste pedaço de DOM de sombra, Anonymousrenderiza se não houver slot="username"DOM de luz.

<div>Name:
  <slot name="username">Anonymous</slot>
</div>
Slot padrão: primeiro sem nome
O primeiro <slot>no shadow DOM que não tem nome é um slot “padrão”. Ele obtém todos os nós do DOM leve que não estão encaixados em outro lugar.

Por exemplo, vamos adicionar o slot padrão ao nosso <user-card>que mostra todas as informações não alocadas sobre o usuário:

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <div>Name:
      <slot name="username"></slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
    <fieldset>
      <legend>Other information</legend>
      <slot></slot>
    </fieldset>
    `;
  }
});
</script>

<user-card>
  <div>I like to swim.</div>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
  <div>...And play volleyball too!</div>
</user-card>

Todo o conteúdo DOM leve sem slot entra no conjunto de campos "Outras informações".

Os elementos são anexados a um slot um após o outro, de modo que ambas as informações sem slot estão juntas no slot padrão.

O DOM achatado se parece com isso:

<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
    <fieldset>
      <legend>Other information</legend>
      <slot>
        <div>I like to swim.</div>
        <div>...And play volleyball too!</div>
      </slot>
    </fieldset>
</user-card>
Exemplo de cardápio
Agora vamos voltar para <custom-menu>, mencionado no início do capítulo.

Podemos usar slots para distribuir elementos.

Aqui está a marcação para <custom-menu>:

<custom-menu>
  <span slot="title">Candy menu</span>
  <li slot="item">Lollipop</li>
  <li slot="item">Fruit Toast</li>
  <li slot="item">Cup Cake</li>
</custom-menu>
O modelo shadow DOM com slots apropriados:

<template id="tmpl">
  <style> /* menu styles */ /*</style>
  <div class="menu">
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul>
  </div>
</template>
<span slot="title">entra em <slot name="title">.
Existem muitos <li slot="item">no <custom-menu>, mas apenas um <slot name="item">no modelo. Portanto, todos esses <li slot="item">são anexados <slot name="item">um após o outro, formando assim a lista.
O DOM achatado se torna:

<custom-menu>
  #shadow-root
    <style> /* menu styles */ /*</style>
    <div class="menu">
      <slot name="title">
        <span slot="title">Candy menu</span>
      </slot>
      <ul>
        <slot name="item">
          <li slot="item">Lollipop</li>
          <li slot="item">Fruit Toast</li>
          <li slot="item">Cup Cake</li>
        </slot>
      </ul>
    </div>
</custom-menu>
Pode-se notar que, em um DOM válido, <li>deve ser um filho direto de <ul>. Mas isso é DOM achatado, ele descreve como o componente é renderizado, tal coisa acontece naturalmente aqui.

Só precisamos adicionar um clickhandler para abrir/fechar a lista, e está <custom-menu>pronto:

customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});

    // tmpl is the shadow DOM template (above)
    this.shadowRoot.append( tmpl.content.cloneNode(true) );

    // we can't select light DOM nodes, so let's handle clicks on the slot
    this.shadowRoot.querySelector('slot[name="title"]').onclick = () => {
      // open/close the menu
      this.shadowRoot.querySelector('.menu').classList.toggle('closed');
    };
  }
});
Aqui está a demonstração completa:


Claro, podemos adicionar mais funcionalidades a ele: eventos, métodos e assim por diante.

Atualizando slots
E se o código externo quiser adicionar/remover itens de menu dinamicamente?

O navegador monitora os slots e atualiza a renderização se os elementos com slots forem adicionados/removidos.

Além disso, como os nós DOM leves não são copiados, mas apenas renderizados em slots, as alterações dentro deles imediatamente se tornam visíveis.

Portanto, não precisamos fazer nada para atualizar a renderização. Mas se o código do componente quiser saber sobre as alterações de slot, o slotchangeevento estará disponível.

Por exemplo, aqui o item de menu é inserido dinamicamente após 1 segundo e o título muda após 2 segundos:

<custom-menu id="menu">
  <span slot="title">Candy menu</span>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // shadowRoot can't have event handlers, so using the first child
    this.shadowRoot.firstElementChild.addEventListener('slotchange',
      e => alert("slotchange: " + e.target.name)
    );
  }
});

setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Lollipop</li>')
}, 1000);

setTimeout(() => {
  menu.querySelector('[slot="title"]').innerHTML = "New menu";
}, 2000);
</script>
A renderização do menu é atualizada toda vez sem nossa intervenção.

Existem dois slotchangeeventos aqui:

Na inicialização:

slotchange: titledispara imediatamente, pois o slot="title"DOM da luz entra no slot correspondente.

Após 1 segundo:

slotchange: itemgatilhos, quando um novo <li slot="item">é adicionado.

Observação: não há slotchangeevento após 2 segundos, quando o conteúdo de slot="title"é modificado. Isso porque não há mudança de slot. Modificamos o conteúdo dentro do elemento com slot, isso é outra coisa.

Se quisermos rastrear as modificações internas do light DOM do JavaScript, isso também é possível usando um mecanismo mais genérico: MutationObserver .

API de slot
Finalmente, vamos mencionar os métodos JavaScript relacionados ao slot.

Como vimos antes, o JavaScript olha para o DOM “real”, sem nivelar. Mas, se a árvore de sombra tiver {mode: 'open'}, então podemos descobrir quais elementos atribuídos a um slot e, vice-versa, o slot pelo elemento dentro dele:

node.assignedSlot– retorna o <slot>elemento ao qual nodeestá atribuído.
slot.assignedNodes({flatten: true/false})– nós DOM, atribuídos ao slot. A flattenopção é falsepor padrão. Se explicitamente definido como true, ele examina mais profundamente o DOM nivelado, retornando slots aninhados no caso de componentes aninhados e o conteúdo de fallback se nenhum nó for atribuído.
slot.assignedElements({flatten: true/false})– Elementos DOM, atribuídos ao slot (o mesmo que acima, mas apenas nós de elemento).
Esses métodos são úteis quando precisamos não apenas mostrar o conteúdo inserido, mas também rastreá-lo em JavaScript.

Por exemplo, se <custom-menu>o componente deseja saber o que mostra, ele pode rastrear slotchangee obter os itens de slot.assignedElements:

<custom-menu id="menu">
  <span slot="title">Candy menu</span>
  <li slot="item">Lollipop</li>
  <li slot="item">Fruit Toast</li>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  items = []

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // triggers when slot content changes
    this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
      let slot = e.target;
      if (slot.name == 'item') {
        this.items = slot.assignedElements().map(elem => elem.textContent);
        alert("Items: " + this.items);
      }
    });
  }
});

// items update after 1 second
setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Cup Cake</li>')
}, 1000);
</script>
Resumo
Normalmente, se um elemento tiver shadow DOM, seu light DOM não será exibido. Os slots permitem mostrar elementos do light DOM em locais especificados do shadow DOM.

Existem dois tipos de slots:

Slots nomeados: <slot name="X">...</slot>– obtém crianças leves com slot="X".
Slot padrão: o primeiro <slot>sem nome (os slots subseqüentes sem nome são ignorados) – obtém filhos leves sem slot.
Se houver muitos elementos para o mesmo slot, eles serão anexados um após o outro.
O conteúdo do <slot>elemento é usado como um fallback. É mostrado se não há filhos claros para o slot.
O processo de renderização de elementos com slots dentro de seus slots é chamado de “composição”. O resultado é chamado de “DOM achatado”.

A composição realmente não move os nós, do ponto de vista do JavaScript, o DOM ainda é o mesmo.

JavaScript pode acessar slots usando métodos:

slot.assignedNodes/Elements()– retorna nós/elementos dentro do arquivo slot.
node.assignedSlot– a propriedade reverse, retorna slot por um nó.
Se quisermos saber o que estamos mostrando, podemos rastrear o conteúdo do slot usando:

slotchangeevento – dispara na primeira vez que um slot é preenchido e em qualquer operação de adição/remoção/substituição do elemento com slot, mas não de seus filhos. A ranhura é event.target.
MutationObserver para se aprofundar no conteúdo do slot, observe as mudanças dentro dele.
Agora, como sabemos como mostrar elementos do light DOM no shadow DOM, vamos ver como estilizá-los corretamente. A regra básica é que os elementos de sombra são estilizados por dentro e os elementos de luz por fora, mas há exceções notáveis.

Veremos os detalhes no próximo capítulo.

*/