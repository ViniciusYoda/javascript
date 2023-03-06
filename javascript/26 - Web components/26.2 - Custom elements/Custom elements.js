/*

Elementos personalizados
Podemos criar elementos HTML personalizados, descritos por nossa classe, com seus próprios métodos e propriedades, eventos e assim por diante.

Depois que um elemento personalizado é definido, podemos usá-lo no mesmo nível dos elementos HTML integrados.

Isso é ótimo, pois o dicionário HTML é rico, mas não infinito. Não há <easy-tabs>, <sliding-carousel>, <beautiful-upload>… Pense em qualquer outra tag de que possamos precisar.

Podemos defini-los com uma classe especial e, em seguida, usá-los como se sempre fizessem parte do HTML.

Existem dois tipos de elementos personalizados:

Elementos customizados autônomos – elementos “totalmente novos”, estendendo a HTMLElementclasse abstrata.
Elementos integrados personalizados – estendendo os elementos integrados, como um botão personalizado, com base em HTMLButtonElementetc.
Primeiro, abordaremos os elementos autônomos e, em seguida, passaremos para os integrados personalizados.

Para criar um elemento personalizado, precisamos informar ao navegador vários detalhes sobre ele: como mostrá-lo, o que fazer quando o elemento for adicionado ou removido da página, etc.

Isso é feito criando uma classe com métodos especiais. Isso é fácil, pois existem poucos métodos e todos eles são opcionais.

Aqui está um esboço com a lista completa:

class MyElement extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return [/* array of attribute names to monitor for changes *//*];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}
Depois disso, precisamos registrar o elemento:

// let the browser know that <my-element> is served by our new class
customElements.define("my-element", MyElement);
Agora, para qualquer elemento HTML com tag <my-element>, uma instância de MyElementé criada e os métodos mencionados acima são chamados. Também podemos document.createElement('my-element')em JavaScript.

O nome do elemento personalizado deve conter um hífen-
O nome do elemento personalizado deve ter um hífen -, por exemplo , my-elemente super-buttonsão nomes válidos, mas myelementnão são.

Isso é para garantir que não haja conflitos de nome entre os elementos HTML integrados e personalizados.

Exemplo: “formatado por hora”
Por exemplo, já existe <time>elemento em HTML, para data/hora. Mas não faz nenhuma formatação por si só.

Vamos criar <time-formatted>um elemento que exiba a hora em um formato agradável e compatível com o idioma:

<script>
class TimeFormatted extends HTMLElement { // (1)

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

customElements.define("time-formatted", TimeFormatted); // (2)
</script>

<!-- (3) -->
<time-formatted datetime="2019-12-01"
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>

A classe tem apenas um método connectedCallback()– o navegador o chama quando o elemento é adicionado à página (ou quando o analisador HTML o detecta) e usa o formatador de dados Intl.DateTimeFormat<time-formatted> integrado , bem suportado nos navegadores, para mostrar um bom hora formatada.
Precisamos registrar nosso novo elemento por customElements.define(tag, class).
E então podemos usá-lo em todos os lugares.
Atualização de elementos personalizados
Se o navegador encontrar algum <time-formatted>elemento antes de customElements.define, isso não é um erro. Mas o elemento ainda é desconhecido, assim como qualquer tag fora do padrão.

Esses elementos “indefinidos” podem ser estilizados com o seletor CSS :not(:defined).

Quando customElement.defineé chamado, eles são “atualizados”: uma nova instância de TimeFormatted é criada para cada um e connectedCallbacké chamada. Eles se tornam :defined.

Para obter as informações sobre elementos personalizados, existem métodos:

customElements.get(name)– retorna a classe para um elemento personalizado com o dado name,
customElements.whenDefined(name)– retorna uma promessa que resolve (sem valor) quando um elemento personalizado com o dado nameé definido.
Renderizando em connectedCallback, não emconstructor
No exemplo acima, o conteúdo do elemento é renderizado (criado) em connectedCallback.

Por que não no constructor?

A razão é simples: quando constructoré chamado, ainda é muito cedo. O elemento foi criado, mas o navegador ainda não processou/atribuiu atributos neste estágio: as chamadas para getAttributeretornariam null. Portanto, não podemos realmente renderizar lá.

Além disso, se você pensar bem, é melhor em termos de desempenho – atrasar o trabalho até que seja realmente necessário.

Os connectedCallbackacionadores quando o elemento é adicionado ao documento. Não apenas anexado a outro elemento como filho, mas na verdade se torna parte da página. Assim, podemos construir DOM separado, criar elementos e prepará-los para uso posterior. Eles só serão realmente renderizados quando entrarem na página.

Observando atributos
Na implementação atual de <time-formatted>, depois que o elemento é renderizado, outras alterações de atributo não têm nenhum efeito. Isso é estranho para um elemento HTML. Normalmente, quando alteramos um atributo, como a.href, esperamos que a alteração seja imediatamente visível. Então vamos consertar isso.

Podemos observar os atributos fornecendo sua lista no observedAttributes()getter estático. Para tais atributos, attributeChangedCallbacké chamado quando eles são modificados. Ele não é acionado para outros atributos não listados (por motivos de desempenho).

Aqui está um novo <time-formatted>, que é atualizado automaticamente quando os atributos mudam:

<script>
class TimeFormatted extends HTMLElement {

  render() { // (1)
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

  connectedCallback() { // (2)
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  static get observedAttributes() { // (3)
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

  attributeChangedCallback(name, oldValue, newValue) { // (4)
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
</script>

A lógica de renderização é movida para render()o método auxiliar.
Nós o chamamos uma vez quando o elemento é inserido na página.
Para uma alteração de um atributo, listado em observedAttributes(), attributeChangedCallbacktriggers.
…e renderiza novamente o elemento.
No final, podemos facilmente criar um cronômetro ao vivo.
Ordem de renderização
Quando o analisador HTML cria o DOM, os elementos são processados ​​um após o outro, os pais antes dos filhos. Por exemplo, se tivermos <outer><inner></inner></outer>, então <outer>o elemento é criado e conectado primeiro ao DOM e depois <inner>.

Isso leva a consequências importantes para elementos personalizados.

Por exemplo, se um elemento personalizado tentar acessar innerHTMLem connectedCallback, ele não obterá nada:

<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
    alert(this.innerHTML); // empty (*)
  }

});
</script>

<user-info>John</user-info>
Se você executá-lo, o alertestá vazio.

Isso porque não há filhos naquele estágio, o DOM está inacabado. O analisador HTML conectou o elemento customizado <user-info>e irá prosseguir para seus filhos, mas ainda não o fez.

Se quisermos passar informações para um elemento personalizado, podemos usar atributos. Eles estão disponíveis imediatamente.

Ou, se realmente precisarmos das crianças, podemos adiar o acesso a elas com atraso zero setTimeout.

Isso funciona:

<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
    setTimeout(() => alert(this.innerHTML)); // John (*)
  }

});
</script>

<user-info>John</user-info>
Agora, a alertlinha (*)mostra “John”, conforme a executamos de forma assíncrona, após a conclusão da análise de HTML. Podemos processar filhos, se necessário, e finalizar a inicialização.

Por outro lado, esta solução também não é perfeita. Se os elementos personalizados aninhados também usarem setTimeoutpara inicializar a si mesmos, eles serão enfileirados: os setTimeoutacionadores externos primeiro e depois o interno.

Assim, o elemento externo termina a inicialização antes do interno.

Vamos demonstrar isso no exemplo:

<script>
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    alert(`${this.id} connected.`);
    setTimeout(() => alert(`${this.id} initialized.`));
  }
});
</script>

<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>
Ordem de saída:

externo conectado.
conectado internamente.
inicializado externamente.
inicializado internamente.
Podemos ver claramente que o elemento externo termina a inicialização (3)antes do interno (4).

Não há retorno de chamada interno que seja acionado depois que os elementos aninhados estiverem prontos. Se necessário, podemos implementar tal coisa por conta própria. Por exemplo, os elementos internos podem despachar eventos como initialized, e os externos podem ouvi-los e reagir a eles.

Elementos embutidos personalizados
Novos elementos que criamos, como <time-formatted>, não possuem nenhuma semântica associada. Eles são desconhecidos pelos mecanismos de pesquisa e os dispositivos de acessibilidade não podem lidar com eles.

Mas essas coisas podem ser importantes. Por exemplo, um mecanismo de pesquisa estaria interessado em saber que realmente mostramos um horário. E se estamos fazendo um tipo especial de botão, por que não reutilizar a <button>funcionalidade existente?

Podemos estender e personalizar elementos HTML integrados herdando de suas classes.

Por exemplo, botões são instâncias de HTMLButtonElement, vamos desenvolver isso.

Estenda HTMLButtonElementcom nossa classe:

class HelloButton extends HTMLButtonElement { /* custom element methods */ /*}
Forneça o terceiro argumento para customElements.define, que especifica a tag:

customElements.define('hello-button', HelloButton, {extends: 'button'});
Pode haver tags diferentes que compartilham a mesma classe DOM, por isso extendsé necessário especificar.

No final, para usar nosso elemento personalizado, insira uma <button>tag normal, mas adicione is="hello-button"a ela:

<button is="hello-button">...</button>
Aqui está um exemplo completo:

<script>
// The button that says "hello" on click
class HelloButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener('click', () => alert("Hello!"));
  }
}

customElements.define('hello-button', HelloButton, {extends: 'button'});
</script>

<button is="hello-button">Click me</button>

<button is="hello-button" disabled>Disabled</button>

Nosso novo botão estende o built-in. Portanto, mantém os mesmos estilos e recursos padrão, como disabledatributo.

Referências
HTML Living Standard: https://html.spec.whatwg.org/#custom-elements .
Compatibilidade: https://caniuse.com/#feat=custom-elementsv1 .
Resumo
Os elementos personalizados podem ser de dois tipos:

“Autônomo” – novas tags, extensão HTMLElement.

Esquema de definição:

class MyElement extends HTMLElement {
  constructor() { super(); /* ... *//* }
  connectedCallback() { /* ... */ /*}
  disconnectedCallback() { /* ... */ /* }
  static get observedAttributes() { return [/* ... *//*]; }
  attributeChangedCallback(name, oldValue, newValue) { /* ... */ /*}
  adoptedCallback() { /* ... */ /*}
 }
customElements.define('my-element', MyElement);
/* <my-element> *//*
“Elementos integrados personalizados” – extensões de elementos existentes.

Requer mais um .defineargumento e is="..."em HTML:

class MyButton extends HTMLButtonElement { /*...*/ /* }
customElements.define('my-button', MyElement, {extends: 'button'});
/* <button is="my-button"> *//*
Os elementos personalizados são bem suportados entre os navegadores. Há um polyfill https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs .

*/

