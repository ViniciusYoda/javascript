/*

Eventos de ponteiro
Os eventos de ponteiro são uma maneira moderna de lidar com a entrada de uma variedade de dispositivos apontadores, como mouse, caneta/stylus, tela sensível ao toque e assim por diante.

a breve história
Vamos fazer uma pequena visão geral, para que você entenda o quadro geral e a localização dos Pointer Events entre outros tipos de eventos.

Há muito tempo, no passado, havia apenas eventos de mouse.

Em seguida, os dispositivos de toque se espalharam, telefones e tablets em particular. Para os scripts existentes funcionarem, eles geraram (e ainda geram) eventos de mouse. Por exemplo, tocar em uma tela sensível ao toque gera mousedown. Portanto, os dispositivos de toque funcionaram bem com as páginas da web.

Mas os dispositivos de toque têm mais recursos do que um mouse. Por exemplo, é possível tocar vários pontos ao mesmo tempo (“multi-touch”). No entanto, os eventos de mouse não possuem as propriedades necessárias para lidar com esses multitoques.

Assim, os eventos de toque foram introduzidos, como touchstart, touchend, touchmove, que possuem propriedades específicas de toque (não os abordaremos em detalhes aqui, porque os eventos de ponteiro são ainda melhores).

Ainda assim, não foi o suficiente, pois existem muitos outros dispositivos, como canetas, que possuem recursos próprios. Além disso, escrever um código que detecta eventos de toque e mouse era complicado.

Para resolver esses problemas, o novo padrão Pointer Events foi introduzido. Ele fornece um único conjunto de eventos para todos os tipos de dispositivos apontadores.

A partir de agora, a especificação Pointer Events Level 2 é suportada em todos os principais navegadores, enquanto o mais recente Pointer Events Level 3 está em andamento e é compatível principalmente com Pointer Events nível 2.

A menos que você desenvolva para navegadores antigos, como Internet Explorer 10 ou Safari 12 ou inferior, não há mais sentido em usar eventos de mouse ou toque – podemos alternar para eventos de ponteiro.

Assim, seu código funcionará bem com dispositivos de toque e mouse.

Dito isso, existem algumas peculiaridades importantes que se deve conhecer para utilizar corretamente os Pointer Events e evitar surpresas. Vamos anotá-los neste artigo.

Tipos de evento de ponteiro
Os eventos de ponteiro são nomeados de forma semelhante aos eventos de mouse:

Evento de ponteiro	Evento de mouse semelhante
pointerdown	mousedown
pointerup	mouseup
pointermove	mousemove
pointerover	mouseover
pointerout	mouseout
pointerenter	mouseenter
pointerleave	mouseleave
pointercancel	-
gotpointercapture	-
lostpointercapture	-
Como podemos ver, para cada mouse<event>, há um pointer<event>que desempenha um papel semelhante. Além disso, existem 3 eventos de ponteiro adicionais que não possuem uma mouse...contrapartida correspondente, vamos explicá-los em breve.

Substituindo mouse<event>por pointer<event>em nosso código
Podemos substituir mouse<event>eventos pointer<event>em nosso código e esperar que as coisas continuem funcionando bem com o mouse.

O suporte para dispositivos de toque também melhorará "magicamente". Embora, possamos precisar adicionar touch-action: noneem alguns lugares no CSS. Vamos cobri-lo abaixo na seção sobre pointercancel.

Propriedades do evento de ponteiro
Os eventos de ponteiro têm as mesmas propriedades dos eventos de mouse, como clientX/Y, target, etc., além de algumas outras:

pointerId– o identificador exclusivo do ponteiro que está causando o evento.

Gerado pelo navegador. Permite manipular vários ponteiros, como uma tela sensível ao toque com caneta e multitoque (serão apresentados exemplos).

pointerType– o tipo de dispositivo apontador. Deve ser uma string, uma das seguintes: “mouse”, “pen” ou “touch”.

Podemos usar essa propriedade para reagir de forma diferente em vários tipos de ponteiro.

isPrimary– é truepara o ponteiro principal (o primeiro dedo em multitoque).

Alguns dispositivos indicadores medem a área de contato e a pressão, por exemplo, para um dedo na tela sensível ao toque, existem propriedades adicionais para isso:

width– a largura da área onde o ponteiro (por exemplo, um dedo) toca o dispositivo. Onde não há suporte, por exemplo, para um mouse, é sempre 1.
height– a altura da área onde o ponteiro toca o dispositivo. Onde não há suporte, é sempre 1.
pressure– a pressão da ponta do ponteiro, na faixa de 0 a 1. Para aparelhos que não suportam pressão deve ser 0.5(pressionado) ou 0.
tangentialPressure– a pressão tangencial normalizada.
tiltX, tiltY, twist– propriedades específicas da caneta que descrevem como a caneta é posicionada em relação à superfície.
Essas propriedades não são suportadas pela maioria dos dispositivos, portanto, raramente são usadas. Você pode encontrar os detalhes sobre eles na especificação , se necessário.

Multitoque
Uma das coisas que os eventos de mouse não suportam totalmente é o multitoque: um usuário pode tocar em vários lugares ao mesmo tempo em seu telefone ou tablet ou realizar gestos especiais.

Eventos de ponteiro permitem lidar com multitoque com a ajuda das propriedades pointerIde isPrimary.

Veja o que acontece quando um usuário toca em uma tela sensível ao toque em um lugar e, em seguida, coloca outro dedo em outro lugar:

Ao primeiro toque do dedo:
pointerdowncom isPrimary=truee alguns pointerId.
Para o segundo dedo e mais dedos (supondo que o primeiro ainda esteja se tocando):
pointerdowncom isPrimary=falsee um diferente pointerIdpara cada dedo.
Observação: o pointerIdnão é atribuído a todo o dispositivo, mas a cada dedo que toca. Se usarmos 5 dedos para tocar simultaneamente na tela, teremos 5 pointerdowneventos, cada um com suas respectivas coordenadas e um pointerId.

Os eventos associados ao primeiro dedo sempre têm isPrimary=true.

Podemos rastrear vários dedos se tocando usando seus arquivos pointerId. Quando o usuário move e remove um dedo, obtemos pointermovee pointerupeventos com o mesmo pointerIdque tínhamos em pointerdown.

Aqui está a demonstração que registra pointerdowne pointerupeventos:


Observação: você deve estar usando um dispositivo com tela sensível ao toque, como um telefone ou tablet, para realmente ver a diferença em pointerId/isPrimary. Para dispositivos de toque único, como um mouse, sempre haverá o mesmo pointerIdcom isPrimary=true, para todos os eventos de ponteiro.

Evento: ponteiro cancela
O pointercancelevento é acionado quando há uma interação de ponteiro em andamento e, em seguida, algo acontece que faz com que ele seja abortado, de modo que nenhum outro evento de ponteiro seja gerado.

Tais causas são:

O hardware do dispositivo apontador foi desativado fisicamente.
A orientação do dispositivo mudou (tablet girado).
O navegador decidiu lidar com a interação por conta própria, considerando-a um gesto do mouse ou uma ação de zoom e panorâmica ou qualquer outra coisa.
Vamos demonstrar pointercancelem um exemplo prático para ver como isso nos afeta.

Digamos que estamos implementando arrastar e soltar para uma bola, assim como no início do artigo Arrastar e soltar com eventos de mouse .

Aqui está o fluxo de ações do usuário e os eventos correspondentes:

O usuário pressiona uma imagem, para começar a arrastar
pointerdownincêndios de eventos
Em seguida, eles começam a mover o ponteiro (arrastando assim a imagem)
pointermoveincêndios, talvez várias vezes
E então a surpresa acontece! O navegador possui suporte nativo de arrastar e soltar para imagens, que entra em ação e assume o processo de arrastar e soltar, gerando assim o pointercancelevento.
O navegador agora lida com arrastar e soltar a imagem por conta própria. O usuário pode até arrastar a imagem da bola para fora do navegador, para o programa Mail ou para um gerenciador de arquivos.
Não há mais pointermoveeventos para nós.
Então o problema é que o navegador “seqüestra” a interação: pointercanceldispara no início do processo de “arrastar e soltar” e não pointermovegera mais nenhum evento.

Aqui está a demonstração de arrastar e soltar com login de eventos de ponteiro (somente up/down, movee cancel) no textarea:


Gostaríamos de implementar o arrastar e soltar por conta própria, então vamos dizer ao navegador para não assumi-lo.

Evite a ação padrão do navegador para evitar pointercancel.

Precisamos fazer duas coisas:

Impedir que o recurso de arrastar e soltar nativo aconteça:
Podemos fazer isso configurando ball.ondragstart = () => false, conforme descrito no artigo Arrastar e soltar com eventos de mouse .
Isso funciona bem para eventos de mouse.
Para dispositivos de toque, existem outras ações do navegador relacionadas ao toque (além de arrastar e soltar). Para evitar problemas com eles também:
Evite-os definindo #ball { touch-action: none }em CSS.
Então nosso código começará a funcionar em dispositivos de toque.
Depois que fizermos isso, os eventos funcionarão conforme o esperado, o navegador não sequestrará o processo e não emitirá arquivos pointercancel.

Esta demonstração adiciona estas linhas:


Como você pode ver, não há pointercancelmais.

Agora podemos adicionar o código para realmente mover a bola, e nosso arrastar e soltar funcionará para dispositivos de mouse e dispositivos de toque.

Captura de ponteiro
A captura de ponteiro é um recurso especial dos eventos de ponteiro.

A ideia é muito simples, mas pode parecer bastante estranha a princípio, já que nada disso existe para qualquer outro tipo de evento.

O método principal é:

elem.setPointerCapture(pointerId)– vincula eventos com o dado pointerIdpara elem. Após a chamada, todos os eventos de ponteiro com o mesmo pointerIdterão elemcomo alvo (como se tivessem acontecido em elem), não importa onde no documento eles realmente aconteceram.
Em outras palavras, elem.setPointerCapture(pointerId)redireciona todos os eventos subsequentes com o dado pointerIdpara elem.

A ligação é removida:

automaticamente quando pointerupou pointercanceleventos ocorrem,
automaticamente quando elemé removido do documento,
quando elem.releasePointerCapture(pointerId)é chamado.
Agora, para que serve? É hora de ver um exemplo da vida real.

A captura de ponteiro pode ser usada para simplificar as interações do tipo arrastar e soltar.

Vamos relembrar como podemos implementar um slider customizado, descrito em Drag'n'Drop with mouse events .

Podemos fazer um sliderelemento para representar a faixa e o “corredor” ( thumb) dentro dela:

<div class="slider">
  <div class="thumb"></div>
</div>
Com estilos, fica assim:


E aqui está a lógica de trabalho, conforme descrita, após a substituição de eventos de mouse por eventos de ponteiro semelhantes:

O usuário pressiona o controle deslizante thumb– pointerdowngatilhos.
Em seguida, eles movem o ponteiro – pointermovegatilhos e nosso código move o thumbelemento.
…Conforme o ponteiro se move, ele pode deixar o elemento deslizante thumb, ir acima ou abaixo dele. O thumbdeve se mover estritamente na horizontal, permanecendo alinhado com o ponteiro.
Na solução baseada em eventos do mouse, para rastrear todos os movimentos do ponteiro, inclusive quando ele vai acima/abaixo do thumb, tivemos que atribuir mousemoveo manipulador de eventos em todo o document.

Essa não é uma solução mais limpa, no entanto. Um dos problemas é que, quando um usuário move o ponteiro pelo documento, ele pode acionar manipuladores de eventos (como mouseover) em alguns outros elementos, invocar funcionalidades de interface do usuário totalmente não relacionadas e não queremos isso.

Este é o lugar onde setPointerCaptureentra em jogo.

Podemos chamar o thumb.setPointerCapture(event.pointerId)manipulador pointerdown,
Em seguida, eventos de ponteiro futuros até pointerup/cancelserão redirecionados para thumb.
Quando pointerupacontece (arrastar completo), a vinculação é removida automaticamente, não precisamos nos preocupar com isso.
Portanto, mesmo que o usuário mova o ponteiro por todo o documento, os manipuladores de eventos serão chamados thumb. No entanto, coordene as propriedades dos objetos de evento, como clientX/clientYainda estará correto - a captura afeta apenas target/currentTarget.

Aqui está o código essencial:

thumb.onpointerdown = function(event) {
  // retarget all pointer events (until pointerup) to thumb
  thumb.setPointerCapture(event.pointerId);

  // start tracking pointer moves
  thumb.onpointermove = function(event) {
    // moving the slider: listen on the thumb, as all pointer events are retargeted to it
    let newLeft = event.clientX - slider.getBoundingClientRect().left;
    thumb.style.left = newLeft + 'px';
  };

  // on pointer up finish tracking pointer moves
  thumb.onpointerup = function(event) {
    thumb.onpointermove = null;
    thumb.onpointerup = null;
    // ...also process the "drag end" if needed
  };
};

// note: no need to call thumb.releasePointerCapture,
// it happens on pointerup automatically
A demonstração completa:


Na demonstração, há também um elemento adicional com onmouseovero manipulador mostrando a data atual.

Observação: enquanto arrasta o polegar, você pode passar o mouse sobre esse elemento e seu manipulador não é acionado.

Portanto, arrastar agora está livre de efeitos colaterais, graças ao setPointerCapture.

No final, a captura de ponteiro nos dá dois benefícios:

O código fica mais limpo, pois não precisamos mais adicionar/remover manipuladores como um todo document. A ligação é liberada automaticamente.
Se houver outros manipuladores de eventos de ponteiro no documento, eles não serão acionados acidentalmente pelo ponteiro enquanto o usuário estiver arrastando o controle deslizante.
Eventos de captura de ponteiro
Há mais uma coisa a mencionar aqui, por uma questão de integridade.

Existem dois eventos associados à captura do ponteiro:

gotpointercapturedispara quando um elemento usa setPointerCapturepara habilitar a captura.
lostpointercapturedispara quando a captura é liberada: explicitamente com releasePointerCapturechamada ou automaticamente em pointerup/ pointercancel.
Resumo
Os eventos de ponteiro permitem manipular eventos de mouse, toque e caneta simultaneamente, com um único código.

Eventos de ponteiro estendem eventos de mouse. Podemos substituir mousepor pointernomes de eventos e esperar que nosso código continue funcionando para mouse, com melhor suporte para outros tipos de dispositivos.

Para arrastar e soltar e interações de toque complexas que o navegador pode decidir sequestrar e manipular por conta própria – lembre-se de cancelar a ação padrão em eventos e definir touch-action: noneem CSS para os elementos que envolvemos.

Habilidades adicionais de eventos de ponteiro são:

Suporte multitoque usando pointerIde isPrimary.
Propriedades específicas do dispositivo, como pressure, width/heighte outras.
Captura de ponteiro: podemos redirecionar todos os eventos de ponteiro para um elemento específico até pointerup/ pointercancel.
A partir de agora, os eventos de ponteiro são suportados em todos os principais navegadores, portanto, podemos alternar com segurança para eles, especialmente se o IE10 e o Safari 12 não forem necessários. E mesmo com esses navegadores, existem polyfills que permitem o suporte a eventos de ponteiro.

*/

