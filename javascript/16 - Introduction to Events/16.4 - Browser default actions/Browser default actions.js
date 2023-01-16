/*

Ações padrão do navegador
Muitos eventos levam automaticamente a determinadas ações executadas pelo navegador.

Por exemplo:

Um clique em um link – inicia a navegação para seu URL.
Um clique em um botão de envio de formulário – inicia seu envio ao servidor.
Pressionar o botão do mouse sobre um texto e movê-lo – seleciona o texto.
Se lidarmos com um evento em JavaScript, podemos não querer que a ação correspondente do navegador aconteça e, em vez disso, queremos implementar outro comportamento.

Impedindo ações do navegador
Existem duas maneiras de dizer ao navegador que não queremos que ele aja:

A principal maneira é usar o eventobjeto. Existe um método event.preventDefault().
Se o manipulador for atribuído usando on<event>(não por addEventListener), retornar falsetambém funcionará da mesma forma.
Nesse HTML, um clique em um link não leva à navegação; o navegador não faz nada:

<a href="/" onclick="return false">Click here</a>
or
<a href="/" onclick="event.preventDefault()">here</a>

No próximo exemplo, usaremos essa técnica para criar um menu baseado em JavaScript.

Retornar falsede um manipulador é uma exceção
O valor retornado por um manipulador de eventos geralmente é ignorado.

A única exceção é return falsede um manipulador atribuído usando on<event>.

Em todos os outros casos, o returnvalor é ignorado. Em particular, não faz sentido retornar true.

Exemplo: o cardápio
Considere um menu de site, como este:

<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
Veja como fica com algum CSS:


Os itens de menu são implementados como links HTML <a>, não botões <button>. Existem várias razões para o fazer, por exemplo:

Muitas pessoas gostam de usar “clique com o botão direito” – “abrir em uma nova janela”. Se usarmos <button>ou <span>, isso não funcionará.
Os mecanismos de pesquisa seguem os <a href="...">links durante a indexação.
Então usamos <a>na marcação. Mas normalmente pretendemos lidar com cliques em JavaScript. Portanto, devemos impedir a ação padrão do navegador.

Como aqui:

menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...can be loading from the server, UI generation etc

  return false; // prevent browser action (don't go to the URL)
};
Se omitirmos return false, depois que nosso código for executado, o navegador executará sua “ação padrão” – navegando para a URL em href. E não precisamos disso aqui, pois estamos lidando com o clique sozinhos.

A propósito, usar a delegação de eventos aqui torna nosso menu muito flexível. Podemos adicionar listas aninhadas e estilizá-las usando CSS para “deslizar para baixo”.

eventos de acompanhamento
Certos eventos fluem um para o outro. Se impedirmos o primeiro evento, não haverá segundo.

Por exemplo, mousedownem um <input>campo leva a focar nele e no focusevento. Se impedirmos o mousedownevento, não há foco.

Tente clicar no primeiro <input>abaixo – o focusevento acontece. Mas se você clicar no segundo, não haverá foco.

<input value="Focus works" onfocus="this.value=''">
<input onmousedown="return false" onfocus="this.value=''" value="Click me">

Isso ocorre porque a ação do navegador é cancelada em mousedown. O foco ainda é possível se usarmos outra maneira de inserir a entrada. Por exemplo, a Tabtecla para passar da 1ª entrada para a 2ª. Mas não com o clique do mouse mais.

A opção de manipulador “passivo”
A passive: trueopção opcional de addEventListenersinaliza ao navegador que o manipulador não vai chamar preventDefault().

Por que isso pode ser necessário?

Existem alguns eventos, como touchmoveem dispositivos móveis (quando o usuário move o dedo pela tela), que causam rolagem por padrão, mas essa rolagem pode ser evitada usando preventDefault()o manipulador.

Portanto, quando o navegador detecta tal evento, ele deve primeiro processar todos os manipuladores e, se preventDefaultnão for chamado em nenhum lugar, pode prosseguir com a rolagem. Isso pode causar atrasos desnecessários e "tremores" na interface do usuário.

As passive: trueopções informam ao navegador que o manipulador não cancelará a rolagem. Em seguida, o navegador rola imediatamente, fornecendo uma experiência fluente máxima, e o evento é tratado a propósito.

Para alguns navegadores (Firefox, Chrome), passiveé truepor padrão para touchstarte touchmoveeventos.

evento.padrãoimpedido
A propriedade event.defaultPreventedé truese a ação padrão foi impedida e falsecaso contrário.

Há um caso de uso interessante para isso.

Você se lembra do capítulo Borbulhando e capturando sobre o qual falamos event.stopPropagation()e por que parar de borbulhar é ruim?

Às vezes, podemos usar event.defaultPrevented, em vez disso, para sinalizar a outros manipuladores de eventos que o evento foi tratado.

Vejamos um exemplo prático.

Por padrão, o navegador no contextmenuevento (clique com o botão direito do mouse) mostra um menu de contexto com opções padrão. Podemos preveni-lo e mostrar o nosso, assim:

<button>Right-click shows browser context menu</button>

<button oncontextmenu="alert('Draw our menu'); return false">
  Right-click shows our context menu
</button>

Agora, além desse menu de contexto, gostaríamos de implementar um menu de contexto para todo o documento.

Ao clicar com o botão direito, o menu de contexto mais próximo deve aparecer.

<p>Right-click here for the document context menu</p>
<button id="elem">Right-click here for the button context menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>

O problema é que quando clicamos em elem, obtemos dois menus: o nível do botão e (o evento aparece) o menu do nível do documento.

Como corrigi-lo? Uma das soluções é pensar assim: “Quando manusearmos o botão direito do mouse no manipulador do botão, vamos parar de borbulhar” e usar event.stopPropagation():

<p>Right-click for the document menu</p>
<button id="elem">Right-click for the button menu (fixed with event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>

Agora, o menu no nível do botão funciona conforme o esperado. Mas o preço é alto. Negamos para sempre o acesso a informações sobre cliques com o botão direito para qualquer código externo, incluindo contadores que coletam estatísticas e assim por diante. Isso é bastante imprudente.

Uma solução alternativa seria verificar no documentmanipulador se a ação padrão foi evitada? Se for assim, o evento foi tratado e não precisamos reagir a ele.

<p>Right-click for the document menu (added a check for event.defaultPrevented)</p>
<button id="elem">Right-click for the button menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    if (event.defaultPrevented) return;

    event.preventDefault();
    alert("Document context menu");
  };
</script>

Agora tudo também funciona corretamente. Se tivermos elementos aninhados e cada um deles tiver um menu de contexto próprio, isso também funcionaria. Apenas certifique-se de verificar event.defaultPreventedem cada contextmenumanipulador.

event.stopPropagation() e event.preventDefault()
Como podemos ver claramente, event.stopPropagation()e event.preventDefault()(também conhecido como return false) são duas coisas diferentes. Eles não estão relacionados entre si.

Arquitetura de menus de contexto aninhados
Também existem maneiras alternativas de implementar menus de contexto aninhados. Uma delas é ter um único objeto global com um handler para document.oncontextmenu, e também métodos que nos permitam armazenar outros handlers nele.

O objeto capturará qualquer clique com o botão direito, examinará os manipuladores armazenados e executará o apropriado.

Mas cada parte do código que deseja um menu de contexto deve saber sobre esse objeto e usar sua ajuda em vez do próprio contextmenumanipulador.

Resumo
Existem muitas ações padrão do navegador:

mousedown– inicia a seleção (mova o mouse para selecionar).
clickon <input type="checkbox">– marca/desmarca o arquivo input.
submit– clicar em <input type="submit">ou pressionar Enterdentro de um campo de formulário faz com que esse evento aconteça e o navegador envia o formulário depois dele.
keydown– pressionar uma tecla pode levar à adição de um caractere a um campo ou a outras ações.
contextmenu– o evento acontece em um clique com o botão direito, a ação é mostrar o menu de contexto do navegador.
…há mais…
Todas as ações padrão podem ser evitadas se quisermos manipular o evento exclusivamente por JavaScript.

Para evitar uma ação padrão – use event.preventDefault()ou return false. O segundo método funciona apenas para manipuladores atribuídos com on<event>.

A passive: trueopção addEventListenerinforma ao navegador que a ação não será impedida. Isso é útil para alguns eventos móveis, como touchstarte touchmove, para informar ao navegador que ele não deve esperar que todos os manipuladores terminem antes de rolar.

Se a ação padrão foi evitada, o valor de event.defaultPreventedse torna true, caso contrário, é false.

Seja semântico, não abuse
Tecnicamente, evitando ações padrão e adicionando JavaScript, podemos personalizar o comportamento de qualquer elemento. Por exemplo, podemos fazer um link <a>funcionar como um botão, e um botão <button>se comportar como um link (redirecionar para outro URL ou algo assim).

Mas geralmente devemos manter o significado semântico dos elementos HTML. Por exemplo, <a>deve executar a navegação, não um botão.

Além de ser “só uma coisa boa”, isso torna seu HTML melhor em termos de acessibilidade.

Além disso, se considerarmos o exemplo com <a>, observe: um navegador nos permite abrir esses links em uma nova janela (clicando com o botão direito do mouse e outros meios). E as pessoas gostam disso. Mas se fizermos um botão se comportar como um link usando JavaScript e até parecer um link usando CSS, <a>os recursos específicos do navegador ainda não funcionarão para ele.

*/

