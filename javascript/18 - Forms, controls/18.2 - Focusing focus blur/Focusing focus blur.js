/*

Foco: foco/desfoque
Um elemento recebe o foco quando o usuário clica nele ou usa a Tabtecla do teclado. Há também um autofocusatributo HTML que coloca o foco em um elemento por padrão quando uma página é carregada e outros meios de obter o foco.

Focar em um elemento geralmente significa: “preparar para aceitar os dados aqui”, então é nesse momento que podemos executar o código para inicializar a funcionalidade necessária.

O momento de perder o foco (“blur”) pode ser ainda mais importante. É quando um usuário clica em outro lugar ou pressiona Tabpara ir para o próximo campo do formulário, ou há outros meios também.

Perder o foco geralmente significa: “os dados foram inseridos”, então podemos executar o código para verificá-lo ou até mesmo salvá-lo no servidor e assim por diante.

Existem peculiaridades importantes ao trabalhar com eventos de foco. Faremos o possível para cobri-los mais adiante.

Foco/desfoque de eventos
O focusevento é chamado de foco, e blur– quando o elemento perde o foco.

Vamos usá-los para validação de um campo de entrada.

No exemplo abaixo:

O blurmanipulador verifica se o campo tem um e-mail inserido e, se não, mostra um erro.
O focusmanipulador oculta a mensagem de erro ( blurserá verificada novamente):
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Your email please: <input type="email" id="input">

<div id="error"></div>

<script>
input.onblur = function() {
  if (!input.value.includes('@')) { // not email
    input.classList.add('invalid');
    error.innerHTML = 'Please enter a correct email.'
  }
};

input.onfocus = function() {
  if (this.classList.contains('invalid')) {
    // remove the "error" indication, because the user wants to re-enter something
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>

O HTML moderno nos permite fazer muitas validações usando atributos de entrada: required, patterne assim por diante. E às vezes eles são exatamente o que precisamos. JavaScript pode ser usado quando queremos mais flexibilidade. Também podemos enviar automaticamente o valor alterado para o servidor se estiver correto.

Métodos foco/desfoque
Métodos elem.focus()e elem.blur()definir/desativar o foco no elemento.

Por exemplo, vamos impedir que o visitante saia da entrada se o valor for inválido:

<style>
  .error {
    background: red;
  }
</style>

Your email please: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="make email invalid and try to focus here">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // not email
      // show the error
      this.classList.add("error");
      // ...and put the focus back
      input.focus();
    } else {
      this.classList.remove("error");
    }
  };
</script>

Funciona em todos os navegadores, exceto Firefox ( bug ).

Se inserirmos algo na entrada e tentarmos usar Tabou clicar fora do <input>, onbluro foco será retornado.

Observe que não podemos “evitar a perda de foco” chamando event.preventDefault(), onblurporque onblurfunciona depois que o elemento perdeu o foco.

Porém, na prática, deve-se pensar bem, antes de implementar algo assim, pois geralmente devemos mostrar erros ao usuário, mas não devemos impedir seu progresso no preenchimento de nosso formulário. Eles podem querer preencher outros campos primeiro.

Perda de foco iniciada por JavaScript
Uma perda de foco pode ocorrer por vários motivos.

Uma delas é quando o visitante clica em outro lugar. Mas também o próprio JavaScript pode causar isso, por exemplo:

An alertmove o foco para si mesmo, então causa a perda de foco no elemento ( blurevento), e quando o alerté dispensado, o foco volta ( focusevento).
Se um elemento for removido do DOM, ele também causará a perda de foco. Se for reinserido posteriormente, o foco não retorna.
Esses recursos às vezes fazem com que focus/bluros manipuladores se comportem mal - acionem quando não forem necessários.

A melhor receita é ter cuidado ao usar esses eventos. Se quisermos rastrear a perda de foco iniciada pelo usuário, devemos evitar causá-la nós mesmos.

Permite focar em qualquer elemento: tabindex
Por padrão, muitos elementos não oferecem suporte ao foco.

A lista varia um pouco entre os navegadores, mas uma coisa é sempre correta: o focus/blursuporte é garantido para os elementos com os quais um visitante pode interagir: <button>, <input>, <select>, <a>e assim por diante.

Por outro lado, elementos que existem para formatar algo, como <div>, <span>, <table>– não podem ser focados por padrão. O método elem.focus()não funciona neles e os focus/blureventos nunca são acionados.

Isso pode ser alterado usando HTML-attribute tabindex.

Qualquer elemento torna-se focalizável se tiver tabindex. O valor do atributo é o número de ordem do elemento quando Tab(ou algo parecido) é usado para alternar entre eles.

Ou seja: se tivermos dois elementos, o primeiro tem tabindex="1", e o segundo tem tabindex="2", então pressionar Tabenquanto no primeiro elemento move o foco para o segundo.

A ordem de troca é: os elementos com tabindexde 1e acima vão primeiro (na tabindexordem) e depois os elementos sem tabindex(por exemplo, um regular <input>).

Os elementos sem correspondência tabindexsão alternados na ordem de origem do documento (a ordem padrão).

Existem dois valores especiais:

tabindex="0"coloca um elemento entre aqueles sem tabindex. Ou seja, quando trocamos os elementos, os elementos com tabindex=0vão atrás dos elementos com tabindex ≥ 1.

Geralmente é usado para tornar um elemento focalizável, mas manter a ordem de alternância padrão. Para tornar um elemento parte do formulário a par com <input>.

tabindex="-1"permite apenas o foco programático em um elemento. A Tabchave ignora esses elementos, mas o método elem.focus()funciona.

Por exemplo, aqui está uma lista. Clique no primeiro item e pressione Tab:

Click the first item and press Tab. Keep track of the order. Please note that many subsequent Tabs can move the focus out of the iframe in the example.
<ul>
  <li tabindex="1">One</li>
  <li tabindex="0">Zero</li>
  <li tabindex="2">Two</li>
  <li tabindex="-1">Minus one</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>

A ordem é assim: 1 - 2 - 0. Normalmente, <li>não suporta foco, mas tabindexo habilita totalmente, juntamente com eventos e estilização com :focus.

A propriedade elem.tabIndextambém funciona
Podemos adicionar tabindexdo JavaScript usando a elem.tabIndexpropriedade. Isso tem o mesmo efeito.

Delegação: foco/foco fora
Eventos focuse blurnão bolha.

Por exemplo, não podemos colocar onfocuso <form>para destacá-lo, assim:

<!-- on focusing in the form -- add the class -->
<form onfocus="this.className='focused'">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

O exemplo acima não funciona, porque quando o usuário se concentra em um <input>, o focusevento é acionado apenas nessa entrada. Não borbulha. Portanto, form.onfocusnunca desencadeia.

Existem duas soluções.

Primeiro, há uma característica histórica engraçada: focus/blurnão borbulha, mas se propaga para baixo na fase de captura.

Isso vai funcionar:

<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
  // put the handler on capturing phase (last argument true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
</script>

Em segundo lugar, há focusine focusouteventos – exatamente o mesmo que focus/blur, mas eles borbulham.

Observe que eles devem ser atribuídos usando elem.addEventListener, não on<event>.

Então aqui está outra variante de trabalho:

<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
</script>

Resumo
Eventos focuse blurgatilhos em um elemento focando/perdendo o foco.

Seus especiais são:

Eles não borbulham. Em vez disso, pode usar o estado de captura ou focusin/focusout.
A maioria dos elementos não oferece suporte ao foco por padrão. Use tabindexpara tornar qualquer coisa focalizável.
O elemento em foco atual está disponível como document.activeElement.

*/