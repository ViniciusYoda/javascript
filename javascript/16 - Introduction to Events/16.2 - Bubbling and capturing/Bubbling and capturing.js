/*

Borbulhando e capturando
Vamos começar com um exemplo.

Este manipulador é atribuído a <div>, mas também é executado se você clicar em qualquer tag aninhada como <em>ou <code>:

<div onclick="alert('The handler!')">
  <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
</div>

Não é um pouco estranho? Por que o manipulador é <div>executado se o clique real foi ativado <em>?

borbulhando
O princípio de borbulhar é simples.

Quando um evento acontece em um elemento, ele primeiro executa os manipuladores nele, depois em seu pai e depois em outros ancestrais.

Digamos que temos 3 elementos aninhados FORM > DIV > Pcom um manipulador em cada um deles:

<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>

Um clique nas <p>primeiras execuções internas onclick:

Sobre isso <p>.
Depois na parte externa <div>.
Depois na parte externa <form>.
E assim sucessivamente até o documentobjeto.

Então, se clicarmos em <p>, veremos 3 alertas: p→ div→ form.

O processo é chamado de “borbulhamento”, porque os eventos “borbulham” do elemento interno para os pais, como uma bolha na água.

Quase todos os eventos bolha.
A palavra-chave nesta frase é “quase”.

Por exemplo, um focusevento não borbulha. Existem outros exemplos também, vamos conhecê-los. Mas ainda é uma exceção, e não uma regra, a maioria dos eventos bolha.

event.target
Um manipulador em um elemento pai sempre pode obter os detalhes sobre onde isso realmente aconteceu.

O elemento aninhado mais profundo que causou o evento é chamado de elemento de destino , acessível como event.target.

Observe as diferenças de this(= event.currentTarget):

event.target– é o elemento “alvo” que iniciou o evento, não muda durante o processo de borbulhamento.
this– é o elemento “atual”, aquele que possui um manipulador atualmente em execução.
Por exemplo, se tivermos um único manipulador form.onclick, ele poderá “capturar” todos os cliques dentro do formulário. Não importa onde o clique aconteceu, ele borbulha <form>e executa o manipulador.

No form.onclickmanipulador:

this(= event.currentTarget) é o <form>elemento, porque o manipulador é executado nele.
event.targeté o elemento real dentro do formulário que foi clicado.
Confira:

Resultadoscript.jsexemplo.cssindex.html

É possível que seja event.targetigual this– acontece quando o clique é feito diretamente no <form>elemento.

Parando de borbulhar
Um evento borbulhante vai do elemento de destino diretamente para cima. Normalmente, ele sobe até <html>, e então documentobjeta, e alguns eventos chegam até window, chamando todos os manipuladores no caminho.

Mas qualquer manipulador pode decidir que o evento foi totalmente processado e interromper o borbulhamento.

O método para isso é event.stopPropagation().

Por exemplo, aqui body.onclicknão funciona se você clicar em <button>:

<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">Click me</button>
</body>

event.stopImmediatePropagation()
Se um elemento tiver vários manipuladores de eventos em um único evento, mesmo que um deles interrompa o borbulhamento, os outros ainda serão executados.

Em outras palavras, event.stopPropagation()interrompe o movimento para cima, mas no elemento atual todos os outros manipuladores serão executados.

Para interromper o borbulhamento e impedir que os manipuladores no elemento atual sejam executados, existe um método event.stopImmediatePropagation(). Depois disso, nenhum outro manipulador é executado.

Não pare de borbulhar sem necessidade!
Borbulhar é conveniente. Não pare sem uma necessidade real: óbvio e arquitetonicamente bem pensado.

Às vezes event.stopPropagation(), cria armadilhas ocultas que mais tarde podem se tornar problemas.

Por exemplo:

Criamos um menu aninhado. Cada submenu lida com cliques em seus elementos e chamadas stopPropagationpara que o menu externo não seja acionado.
Mais tarde, decidimos capturar cliques em toda a janela, para rastrear o comportamento dos usuários (onde as pessoas clicam). Alguns sistemas analíticos fazem isso. Normalmente, o código usa document.addEventListener('click'…)para capturar todos os cliques.
Nossa análise não funcionará na área onde os cliques são interrompidos por stopPropagation. Infelizmente, temos uma “zona morta”.
Geralmente não há necessidade real de evitar o borbulhamento. Uma tarefa que aparentemente exige que possa ser resolvida por outros meios. Uma delas é usar eventos customizados, falaremos sobre eles mais tarde. Também podemos gravar nossos dados no eventobjeto em um manipulador e lê-los em outro, para que possamos passar aos manipuladores nos pais informações sobre o processamento abaixo.

Capturando
Há outra fase do processamento de eventos chamada “captura”. Raramente é usado em código real, mas às vezes pode ser útil.

Os eventos DOM padrão descrevem 3 fases de propagação de eventos:

Fase de captura – o evento desce para o elemento.
Fase alvo – o evento atingiu o elemento alvo.
Fase de borbulhamento – o evento borbulha a partir do elemento.
Aqui está a imagem, tirada da especificação, das fases capture (1), target (2)e bubbling (3)para um evento click <td>dentro de uma tabela:


Ou seja: para um click <td>o evento primeiro percorre a cadeia dos ancestrais até o elemento (fase de captura), depois atinge o alvo e dispara lá (fase do alvo), e depois sobe (fase de borbulhamento), chamando os manipuladores em seu caminho.

Até agora, falamos apenas em borbulhar, porque a fase de captura raramente é usada.

Na verdade, a fase de captura era invisível para nós, porque os manipuladores adicionados usando on<event>-property ou usando atributos HTML ou usando dois argumentos addEventListener(event, handler)não sabem nada sobre captura, eles só executam na 2ª e 3ª fases.

Para capturar um evento na fase de captura, precisamos definir a captureopção do manipulador para true:

elem.addEventListener(..., {capture: true})

// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
Existem dois valores possíveis da captureopção:

Se for false(padrão), o manipulador será definido na fase de borbulhamento.
Se for true, o manipulador está definido na fase de captura.
Observe que, embora formalmente existam 3 fases, a 2ª fase (“fase de destino”: o evento atingiu o elemento) não é tratada separadamente: os manipuladores nas fases de captura e bolha são acionados nessa fase.

Vamos ver a captura e o borbulhar em ação:

<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>

O código define manipuladores de clique em cada elemento do documento para ver quais estão funcionando.

Se você clicar em <p>, então a sequência é:

HTML→ BODY→ FORM→ DIV -> P(fase de captura, o primeiro ouvinte):
P→ DIV→ FORM→ BODY→ HTML(fase de borbulhamento, o segundo ouvinte).
Observe que o Paparece duas vezes, porque definimos dois ouvintes: capturando e borbulhando. O alvo dispara no final da primeira e no início da segunda fase.

Existe uma propriedade event.eventPhaseque nos diz o número da fase em que o evento foi capturado. Mas raramente é usado, porque geralmente o conhecemos no manipulador.

Para remover o manipulador, removeEventListenerprecisa da mesma fase
Se nós addEventListener(..., true), então devemos mencionar a mesma fase removeEventListener(..., true)para remover corretamente o manipulador.

Os ouvintes no mesmo elemento e na mesma fase são executados em sua ordem definida
Se tivermos vários manipuladores de eventos na mesma fase, atribuídos ao mesmo elemento com addEventListener, eles serão executados na mesma ordem em que foram criados:

elem.addEventListener("click", e => alert(1)); // guaranteed to trigger first
elem.addEventListener("click", e => alert(2));
O event.stopPropagation()durante a captura também evita o borbulhamento
O event.stopPropagation()método e seu irmão event.stopImmediatePropagation()também podem ser chamados na fase de captura. Então, não apenas a captura posterior é interrompida, mas também o borbulhamento.

Em outras palavras, normalmente o evento vai primeiro para baixo (“capturando”) e depois para cima (“borbulhando”). Mas se event.stopPropagation()for chamado durante a fase de captura, então a viagem do evento para, nenhum borbulhamento ocorrerá.

Resumo
Quando um evento acontece – o elemento mais aninhado onde ele acontece é rotulado como o “elemento de destino” ( event.target).

Em seguida, o evento desce da raiz do documento para event.target, chamando os manipuladores atribuídos com addEventListener(..., true)no caminho ( trueé uma abreviação de {capture: true}).
Em seguida, os manipuladores são chamados no próprio elemento de destino.
Em seguida, o evento borbulha event.targetpara a raiz, chamando manipuladores atribuídos usando on<event>atributos HTML e addEventListenersem o terceiro argumento ou com o terceiro argumento false/{capture:false}.
Cada manipulador pode acessar as eventpropriedades do objeto:

event.target– o elemento mais profundo que originou o evento.
event.currentTarget(= this) – o elemento atual que manipula o evento (aquele que possui o manipulador)
event.eventPhase– a fase atual (capturando=1, alvo=2, borbulhando=3).
Qualquer manipulador de eventos pode interromper o evento chamando event.stopPropagation(), mas isso não é recomendado, porque não podemos ter certeza de que não precisaremos dele acima, talvez para coisas completamente diferentes.

A fase de captura é usada muito raramente, geralmente lidamos com eventos em bubbling. E há uma explicação lógica para isso.

No mundo real, quando acontece um acidente, as autoridades locais reagem primeiro. Eles conhecem melhor a área onde aconteceu. Em seguida, autoridades de nível superior, se necessário.

O mesmo para manipuladores de eventos. O código que define o manipulador em um determinado elemento conhece o máximo de detalhes sobre o elemento e o que ele faz. Um manipulador em particular <td>pode ser adequado para isso exatamente <td>, ele sabe tudo sobre isso, então deve ter a chance primeiro. Em seguida, seu pai imediato também conhece o contexto, mas um pouco menos, e assim por diante até o elemento superior que lida com conceitos gerais e executa o último.

O borbulhamento e a captura estabelecem a base para a “delegação de eventos” – um padrão de manipulação de eventos extremamente poderoso que estudaremos no próximo capítulo.

*/