/*

eventos do mouse
Neste capítulo entraremos em mais detalhes sobre eventos de mouse e suas propriedades.

Observação: tais eventos podem vir não apenas de “dispositivos de mouse”, mas também de outros dispositivos, como telefones e tablets, onde são emulados para fins de compatibilidade.

Tipos de eventos do mouse
Já vimos alguns desses eventos:

mousedown/mouseup
O botão do mouse é clicado/liberado sobre um elemento.
mouseover/mouseout
O ponteiro do mouse sai de um elemento.
mousemove
Cada movimento do mouse sobre um elemento aciona esse evento.
click
Dispara depois mousedowne depois mouseupsobre o mesmo elemento se o botão esquerdo do mouse foi usado.
dblclick
Dispara após dois cliques no mesmo elemento em um curto período de tempo. Raramente usado hoje em dia.
contextmenu
Dispara quando o botão direito do mouse é pressionado. Existem outras maneiras de abrir um menu de contexto, por exemplo, usando uma tecla especial do teclado, que também é acionada nesse caso, portanto, não é exatamente o evento do mouse.
…Existem vários outros eventos também, vamos abordá-los mais tarde.

Ordem dos eventos
Como você pode ver na lista acima, uma ação do usuário pode acionar vários eventos.

Por exemplo, um clique com o botão esquerdo primeiro aciona mousedown, quando o botão é pressionado e, em seguida, mouseupquando clické liberado.

Nos casos em que uma única ação inicia vários eventos, sua ordem é fixa. Ou seja, os manipuladores são chamados na ordem mousedown→ mouseup→ click.

Clique no botão abaixo e você verá os eventos. Tente clicar duas vezes também.

No teststand abaixo, todos os eventos do mouse são registrados e, se houver mais de 1 segundo de atraso entre eles, eles são separados por uma régua horizontal.

Além disso, podemos ver a buttonpropriedade que nos permite detectar o botão do mouse; está explicado abaixo.

 

botão do mouse
Os eventos relacionados ao clique sempre possuem a buttonpropriedade, que permite obter o botão exato do mouse.

Normalmente não o usamos para eventos clicke contextmenu, porque o primeiro acontece apenas com o botão esquerdo do mouse e o último - apenas com o botão direito.

Por outro lado, os manipuladores mousedowne podem precisar de , porque esses eventos são acionados em qualquer botão, permitindo distinguir entre “mousedown com a direita” e “mousedown com a esquerda”.mouseupevent.buttonbutton

Os possíveis valores de event.buttonsão:

Estado do botão	event.button
Botão esquerdo (principal)	0
Botão do meio (auxiliar)	1
Botão direito (secundário)	2
Botão X1 (voltar)	3
Botão X2 (avançar)	4
A maioria dos dispositivos de mouse possui apenas os botões esquerdo e direito; portanto, os valores possíveis são 0ou 2. Dispositivos de toque também geram eventos semelhantes quando alguém toca neles.

Também há uma event.buttonspropriedade que possui todos os botões atualmente pressionados como um número inteiro, um bit por botão. Na prática, esta propriedade é muito raramente usada, você pode encontrar detalhes no MDN se precisar.

o desatualizadoevent.which
O código antigo pode usar event.whichuma propriedade que é uma maneira antiga e não padrão de obter um botão, com valores possíveis:

event.which == 1- botão esquerdo,
event.which == 2- botão do meio,
event.which == 3- botão direito.
A partir de agora, event.whichestá obsoleto, não devemos usá-lo.

Modificadores: shift, alt, ctrl e meta
Todos os eventos do mouse incluem as informações sobre as teclas modificadoras pressionadas.

Propriedades do evento:

shiftKey: Shift
altKey: Alt(ou Optpara Mac)
ctrlKey:Ctrl
metaKey: Cmdpara Mac
Eles são truese a tecla correspondente foi pressionada durante o evento.

Por exemplo, o botão abaixo só funciona com +clique:Alt+Shift

<button id="button">Alt+Shift+Click on me!</button>

<script>
  button.onclick = function(event) {
    if (event.altKey && event.shiftKey) {
      alert('Hooray!');
    }
  };
</script>

Atenção: no Mac geralmente é Cmdem vez deCtrl
AltNo Windows e no Linux , existem teclas modificadoras Shifte Ctrl. No Mac existe mais um: Cmd, correspondente à propriedade metaKey.

Na maioria dos aplicativos, quando o Windows/Linux usa Ctrl, no Mac Cmdé usado.

Ou seja: onde um usuário do Windows pressiona ou , um usuário do Mac pressiona ou , e assim por diante.Ctrl+EnterCtrl+ACmd+EnterCmd+A

Portanto, se quisermos oferecer suporte a combinações como Ctrl+clique, para Mac, faz sentido usar Cmd+clique. Isso é mais confortável para usuários de Mac.

Mesmo se quisermos forçar os usuários de Mac a Ctrlclicar com + – isso é meio difícil. O problema é: um clique com o botão esquerdo Ctrlé interpretado como um clique com o botão direito no MacOS e gera o contextmenuevento, não clickcomo no Windows/Linux.

Portanto, se queremos que os usuários de todos os sistemas operacionais se sintam confortáveis, ctrlKeydevemos verificar o metaKey.

Para o código JS, isso significa que devemos verificar if (event.ctrlKey || event.metaKey).

Existem também dispositivos móveis
As combinações de teclado são boas como uma adição ao fluxo de trabalho. Para que, se o visitante usar um teclado, eles funcionem.

Mas se o dispositivo deles não tiver - então deve haver uma maneira de viver sem teclas modificadoras.

Coordenadas: clienteX/Y, páginaX/Y
Todos os eventos de mouse fornecem coordenadas em dois tipos:

Relativo à janela: clientXe clientY.
Documento relativo: pageXe pageY.
Já cobrimos a diferença entre eles no capítulo Coordenadas .

Resumindo, as coordenadas relativas ao documento pageX/Ysão contadas a partir do canto superior esquerdo do documento e não mudam quando a página é rolada, enquanto clientX/Ysão contadas a partir do canto superior esquerdo da janela atual. Quando a página é rolada, eles mudam.

Por exemplo, se temos uma janela de tamanho 500x500 e o mouse está no canto superior esquerdo, então clientXe clientYsão 0, não importa como a página é rolada.

E se o mouse estiver no centro, então clientXe clientYsão 250, não importa em que lugar do documento esteja. Eles são semelhantes position:fixednesse aspecto.

Mova o mouse sobre o campo de entrada para ver clientX/clientY(o exemplo está no iframe, então as coordenadas são relativas a isso iframe):

<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">

Impedindo a seleção no mousedown
O clique duplo do mouse tem um efeito colateral que pode atrapalhar em algumas interfaces: ele seleciona o texto.

Por exemplo, clicar duas vezes no texto abaixo o seleciona além de nosso manipulador:

<span ondblclick="alert('dblclick')">Double-click me</span>

Se alguém pressiona o botão esquerdo do mouse e, sem soltá-lo, move o mouse, isso também faz a seleção, muitas vezes indesejada.

Existem várias maneiras de impedir a seleção, que você pode ler no capítulo Seleção e intervalo .

Nesse caso específico, a maneira mais razoável é impedir a ação do navegador em mousedown. Isso impede essas duas seleções:

Before...
<b ondblclick="alert('Click!')" onmousedown="return false">
  Double-click me
</b>
...After

Agora o elemento em negrito não é selecionado em cliques duplos e pressionar o botão esquerdo nele não iniciará a seleção.

Observe: o texto dentro dele ainda é selecionável. No entanto, a seleção não deve começar no próprio texto, mas antes ou depois dele. Normalmente, isso é bom para os usuários.

Impedindo a cópia
Se quisermos desabilitar a seleção para proteger o conteúdo de nossa página de copiar e colar, podemos usar outro evento: oncopy.

<div oncopy="alert('Copying forbidden!');return false">
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>

Se você tentar copiar um pedaço de texto no <div>, isso não funcionará, porque a ação padrão oncopyé evitada.

Com certeza o usuário tem acesso ao código-fonte HTML da página, e pode pegar o conteúdo de lá, mas nem todo mundo sabe como fazer isso.

Resumo
Os eventos de mouse têm as seguintes propriedades:

Botão: button.

Teclas modificadoras ( truese pressionadas): altKey, ctrlKeye shiftKey( metaKeyMac).

Se você quiser lidar com Ctrl, não se esqueça dos usuários de Mac, eles geralmente usam Cmd, então é melhor verificar if (e.metaKey || e.ctrlKey).
Coordenadas relativas à janela: clientX/clientY.

Coordenadas relativas ao documento: pageX/pageY.

A ação padrão do navegador mousedowné a seleção de texto, se não for bom para a interface, deve ser evitado.

No próximo capítulo, veremos mais detalhes sobre os eventos que seguem o movimento do ponteiro e como rastrear as alterações do elemento sob ele.

*/