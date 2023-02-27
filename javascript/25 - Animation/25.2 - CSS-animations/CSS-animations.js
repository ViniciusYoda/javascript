/*

animações CSS
As animações CSS tornam possível fazer animações simples sem JavaScript.

O JavaScript pode ser usado para controlar as animações CSS e torná-las ainda melhores, com pouco código.

transições CSS
A ideia das transições CSS é simples. Descrevemos uma propriedade e como suas alterações devem ser animadas. Quando a propriedade muda, o navegador pinta a animação.

Ou seja, basta alterar a propriedade, e a transição fluida será feita pelo navegador.

Por exemplo, o CSS abaixo anima mudanças de background-colorpor 3 segundos:

.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
Agora se um elemento tem .animatedclasse, qualquer mudança de background-coloré animada durante 3 segundos.

Clique no botão abaixo para animar o fundo:

<button id="color">Click me</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>

Existem 4 propriedades para descrever transições CSS:

transition-property
transition-duration
transition-timing-function
transition-delay
Vamos abordá-los em um momento, por enquanto vamos observar que a transitionpropriedade comum permite declará-los juntos na ordem: property duration timing-function delay, bem como animar várias propriedades de uma só vez.

Por exemplo, este botão anima ambos colore font-size:

<button id="growing">Click me</button>

<style>
#growing {
  transition: font-size 3s, color 2s;
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>

Agora, vamos cobrir as propriedades de animação uma a uma.

propriedade de transição
Em transition-property, escrevemos uma lista de propriedades para animar, por exemplo: left, margin-left, height, color. Ou poderíamos escrever all, que significa “animar todas as propriedades”.

Observe que existem propriedades que não podem ser animadas. No entanto, a maioria das propriedades geralmente usadas são animáveis .

duração da transição
Em transition-durationpodemos especificar quanto tempo a animação deve durar. A hora deve estar no formato CSS : em segundos sou milissegundos ms.

atraso de transição
Em transition-delaypodemos especificar o atraso antes da animação. Por exemplo, se transition-delayis 1se transition-durationis 2s, a animação começa 1 segundo após a alteração da propriedade e a duração total será de 2 segundos.

Valores negativos também são possíveis. Então a animação é mostrada imediatamente, mas o ponto inicial da animação será após determinado valor (tempo). Por exemplo, se transition-delayis -1se transition-durationis 2s, a animação começa no meio do caminho e a duração total será de 1 segundo.

Aqui a animação muda os números de 0para 9usando translatea propriedade CSS:

Resultadoscript.jsestilo.cssindex.html
stripe.onclick = function() {
  stripe.classList.add('animate');
};
A transformpropriedade é animada assim:

#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
No exemplo acima, o JavaScript adiciona a classe .animateao elemento – e a animação começa:

stripe.classList.add('animate');
Também poderíamos iniciá-lo de algum lugar no meio da transição, de um número exato, por exemplo, correspondente ao segundo atual, usando um transition-delay.

Aqui, se você clicar no dígito – ele inicia a animação a partir do segundo atual:

Resultadoscript.jsestilo.cssindex.html
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
  stripe.style.transitionDelay = '-' + sec + 's';
  stripe.classList.add('animate');
};
JavaScript faz isso com uma linha extra:

stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
  // for instance, -3s here starts the animation from the 3rd second
  stripe.style.transitionDelay = '-' + sec + 's';
  stripe.classList.add('animate');
};
função de tempo de transição
A função de temporização descreve como o processo de animação é distribuído ao longo de sua linha do tempo. Vai começar devagar e depois ir rápido, ou vice-versa.

Parece ser a propriedade mais complicada no início. Mas torna-se muito simples se dedicarmos um pouco de tempo a isso.

Essa propriedade aceita dois tipos de valores: uma curva de Bezier ou etapas. Vamos começar com a curva, pois ela é mais usada.

curva de Bezier
A função de temporização pode ser definida como uma curva de Bezier com 4 pontos de controle que satisfaçam as condições:

Primeiro ponto de controle: (0,0).
Último ponto de controle: (1,1).
Para pontos intermediários, os valores de xdevem estar no intervalo 0..1, ypodem ser qualquer um.
A sintaxe para uma curva de Bezier em CSS: cubic-bezier(x2, y2, x3, y3). Aqui precisamos especificar apenas o 2º e 3º pontos de controle, porque o 1º é fixo (0,0)e o 4º é (1,1).

A função de temporização descreve a velocidade do processo de animação.

O xeixo é o tempo: 0– o início, 1– o fim de transition-duration.
O yeixo especifica a conclusão do processo: 0– o valor inicial da propriedade, 1– o valor final.
A variante mais simples é quando a animação é uniforme, com a mesma velocidade linear. Isso pode ser especificado pela curva cubic-bezier(0, 0, 1, 1).

Veja como fica essa curva:


…Como podemos ver, é apenas uma linha reta. À medida que o tempo ( x) passa, a conclusão ( y) da animação vai gradualmente de 0para 1.

O trem do exemplo abaixo vai da esquerda para a direita com a velocidade permanente (clique nele):

Resultadoestilo.cssindex.html

O CSS transitioné baseado nessa curva:

.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* click on a train sets left to 450px, thus triggering the animation */
  /*
}
…E como podemos mostrar um trem desacelerando?

Podemos usar outra curva de Bezier: cubic-bezier(0.0, 0.5, 0.5 ,1.0).

O gráfico:


Como podemos ver, o processo começa rápido: a curva sobe alto, e depois cada vez mais devagar.

Aqui está a função de temporização em ação (clique no trem):

Resultadoestilo.cssindex.html

CSS:

.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* click on a train sets left to 450px, thus triggering the animation */
  /*
}
Existem várias curvas incorporadas : linear, ease, e .ease-inease-outease-in-out

O linearé uma abreviação de cubic-bezier(0, 0, 1, 1)– uma linha reta, que descrevemos acima.

Outros nomes são abreviações para o seguinte cubic-bezier:

ease*	ease-in	ease-out	ease-in-out
(0.25, 0.1, 0.25, 1.0)	(0.42, 0, 1.0, 1.0)	(0, 0, 0.58, 1.0)	(0.42, 0, 0.58, 1.0)




*– por padrão, se não houver função de temporização, easeé usado.

Então, poderíamos usar ease-outpara nosso trem de desaceleração:

.train {
  left: 0;
  transition: left 5s ease-out;
  /* same as transition: left 5s cubic-bezier(0, .5, .5, 1); */
  /*
}
Mas parece um pouco diferente.

Uma curva de Bezier pode fazer com que a animação exceda seu alcance.

Os pontos de controle na curva podem ter quaisquer ycoordenadas: mesmo negativas ou enormes. Em seguida, a curva de Bezier também se estenderia muito para baixo ou para cima, fazendo com que a animação fosse além de seu intervalo normal.

No exemplo abaixo o código da animação é:

.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* click on a train sets left to 450px */
  /*
}
A propriedade leftdeve ser animada de 100pxpara 400px.

Mas se você clicar no trem, verá que:

Primeiro, o trem volta : torna left-se menor que 100px.
Então ele vai para frente, um pouco mais longe do que 400px.
E depois de volta - para 400px.
Resultadoestilo.cssindex.html

Por que isso acontece é bastante óbvio se olharmos para o gráfico da curva de Bezier dada:


Deslocamos a ycoordenada do 2º ponto abaixo de zero, e para o 3º ponto fizemos sobre 1, assim a curva sai do quadrante “regular”. O yestá fora da faixa “padrão” 0..1.

Como sabemos, ymede “a finalização do processo de animação”. O valor y = 0corresponde ao valor inicial da propriedade e y = 1– ao valor final. Portanto, os valores y<0movem a propriedade além do início lefte y>1– além do final left.

Essa é uma variante “soft” com certeza. Se colocarmos yvalores como -99e 99então o trem sairia muito mais do intervalo.

Mas como fazemos uma curva de Bezier para uma tarefa específica? Existem muitas ferramentas.

Por exemplo, podemos fazê-lo no site https://cubic-bezier.com .
As ferramentas de desenvolvedor do navegador também têm suporte especial para curvas de Bezier em CSS:
Abra as ferramentas do desenvolvedor com F12(Mac: ).Cmd+Opt+I
Selecione a Elementsguia e preste atenção no Stylessubpainel à direita.
As propriedades CSS com uma palavra cubic-bezierterão um ícone antes dessa palavra.
Clique neste ícone para editar a curva.
Passos
A função de temporização steps(number of steps[, start/end])permite dividir uma transição em várias etapas.

Vamos ver isso em um exemplo com dígitos.

Aqui está uma lista de dígitos, sem nenhuma animação, apenas como fonte:

Resultadoestilo.cssindex.html

No HTML, uma faixa de dígitos é incluída em um comprimento fixo <div id="digits">:

<div id="digit">
  <div id="stripe">0123456789</div>
</div>
O #digitdiv tem uma largura fixa e uma borda, então parece uma janela vermelha.

Faremos um cronômetro: os dígitos aparecerão um a um, de forma discreta.

Para conseguir isso, vamos ocultar a #stripeparte externa de #digitusing overflow: hidden, e então deslocar o #stripepasso a passo para a esquerda.

Haverá 9 passos, um movimento de passo para cada dígito:

#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s steps(9, start);
}
O primeiro argumento de steps(9, start)é o número de passos. A transformação será dividida em 9 partes (10% cada). O intervalo de tempo também é dividido automaticamente em 9 partes, o que transition: 9snos dá 9 segundos para toda a animação – 1 segundo por dígito.

O segundo argumento é uma das duas palavras: startou end.

O que startsignifica que no início da animação precisamos dar o primeiro passo imediatamente.

Em ação:

Resultadoestilo.cssindex.html
#digit {
  width: .5em;
  overflow: hidden;
  font: 32px monospace;
  cursor: pointer;
}

#stripe {
  display: inline-block
}

#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
  transition-timing-function: steps(9, start);
}
Um clique no dígito o altera para 1(o primeiro passo) imediatamente e, em seguida, muda no início do próximo segundo.

O processo está progredindo assim:

0s– -10%(primeira mudança no início do 1º segundo, imediatamente)
1s – -20%
…
8s–-90%
(o último segundo mostra o valor final).
Aqui, a primeira mudança foi imediata por causa startdo steps.

O valor alternativo endsignificaria que a alteração deveria ser aplicada não no início, mas no final de cada segundo.

Então o processo para steps(9, end)seria assim:

0s– 0(durante o primeiro segundo nada muda)
1s– -10%(primeira mudança no final do 1º segundo)
2s–-20%
…
9s–-90%
Aqui está steps(9, end)em ação (observe a pausa antes da mudança do primeiro dígito):

Resultadoestilo.cssindex.html

Existem também algumas abreviações pré-definidas para steps(...):

step-start– é o mesmo que steps(1, start). Ou seja, a animação começa imediatamente e leva 1 passo. Então começa e termina imediatamente, como se não houvesse animação.
step-end– o mesmo que steps(1, end): fazer a animação em uma única etapa no final de transition-duration.
Esses valores raramente são usados, pois não representam uma animação real, mas sim uma alteração em uma única etapa. Nós os mencionamos aqui para completar.

Evento: “transitionend”
Quando a animação CSS termina, o transitionendevento é acionado.

É muito usado para fazer uma ação depois que a animação é feita. Também podemos juntar animações.

Por exemplo, o navio do exemplo abaixo começa a navegar para lá e para trás quando clicado, cada vez mais para a direita:


A animação é iniciada pela função goque é executada novamente toda vez que a transição termina e inverte a direção:

boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // sail to the right
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // sail to the left
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
O objeto de evento para transitionendtem algumas propriedades específicas:

event.propertyName
A propriedade que terminou de animar. Pode ser bom se animarmos várias propriedades simultaneamente.
event.elapsedTime
O tempo (em segundos) que a animação levou, sem transition-delay.
Quadros-chave
Podemos juntar várias animações simples usando a @keyframesregra CSS.

Ele especifica o “nome” da animação e as regras – o quê, quando e onde animar. Em seguida, usando a animationpropriedade, podemos anexar a animação ao elemento e especificar parâmetros adicionais para ela.

Aqui está um exemplo com explicações:

<div class="progress"></div>

<style>
  @keyframes go-left-right {        /* give it a name: "go-left-right" */
   // from { left: 0px; }             /* animate from left: 0px */
   // to { left: calc(100% - 50px); } /* animate to left: 100%-50px */
   /*
  }

  .progress {
    animation: go-left-right 3s infinite alternate;
    /* apply the animation "go-left-right" to the element
       duration 3 seconds
       number of times: infinite
       alternate direction every time
    */

       /*
    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>

Existem muitos artigos sobre @keyframese uma especificação detalhada .

Você provavelmente não precisará @keyframescom frequência, a menos que tudo esteja em constante movimento em seus sites.

Desempenho
A maioria das propriedades CSS pode ser animada, porque a maioria delas são valores numéricos. Por exemplo, width, color, font-sizesão todos números. Ao animá-los, o navegador altera gradualmente esses números quadro a quadro, criando um efeito suave.

No entanto, nem todas as animações terão uma aparência tão suave quanto você gostaria, porque diferentes propriedades CSS têm custos diferentes para alterar.

Em detalhes mais técnicos, quando há uma mudança de estilo, o navegador passa por 3 etapas para renderizar o novo visual:

Layout : recalcule a geometria e a posição de cada elemento e, em seguida,
Pintar : recalcule como tudo deve ficar em seus lugares, incluindo plano de fundo, cores,
Composto : renderize os resultados finais em pixels na tela, aplique transformações CSS, se existirem.
Durante uma animação CSS, esse processo se repete a cada quadro. No entanto, as propriedades CSS que nunca afetam a geometria ou a posição, como color, podem ignorar a etapa Layout. Se a colormudar, o navegador não calcula nenhuma nova geometria, ele vai para Paint → Composite. E há poucas propriedades que vão diretamente para o Composite. Você pode encontrar uma lista mais longa de propriedades CSS e quais estágios elas acionam em https://csstriggers.com .

Os cálculos podem levar tempo, especialmente em páginas com muitos elementos e um layout complexo. E os atrasos são realmente visíveis na maioria dos dispositivos, levando a animações “nervosas” e menos fluidas.

As animações de propriedades que ignoram a etapa Layout são mais rápidas. É ainda melhor se o Paint também for ignorado.

O transformimóvel é uma ótima escolha, pois:

As transformações CSS afetam a caixa do elemento de destino como um todo (girar, inverter, esticar, deslocar).
As transformações CSS nunca afetam os elementos vizinhos.
…Assim, os navegadores aplicam transform“em cima” dos cálculos de layout e pintura existentes, no estágio Composto.

Em outras palavras, o navegador calcula o Layout (tamanhos, posições), pinta-o com cores, planos de fundo etc. na etapa de pintura e depois aplica transformnas caixas de elementos que precisam.

As alterações (animações) da transformpropriedade nunca acionam as etapas de Layout e Pintura. Mais do que isso, o navegador aproveita o acelerador gráfico (um chip especial na CPU ou na placa gráfica) para transformações CSS, tornando-as muito eficientes.

Felizmente, a transformpropriedade é muito poderosa. Ao usar transformum elemento, você pode girá-lo e invertê-lo, esticá-lo e encolhê-lo, movê-lo e muito mais . Então, em vez de left/margin-leftpropriedades, podemos usar transform: translateX(…), use transform: scalepara aumentar o tamanho do elemento, etc.

A opacitypropriedade também nunca aciona o Layout (também ignora o Paint no Mozilla Gecko). Podemos usá-lo para mostrar/ocultar ou efeitos fade-in/fade-out.

Paring transformwith opacitygeralmente pode resolver a maioria das nossas necessidades, fornecendo animações fluidas e de boa aparência.

Por exemplo, aqui clicando no #boatelemento adiciona a classe com transform: translateX(300)e opacity: 0, fazendo com que ela se mova 300pxpara a direita e desapareça:

<img src="https://js.cx/clipart/boat.png" id="boat">

<style>
#boat {
  cursor: pointer;
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
}

.move {
  transform: translateX(300px);
  opacity: 0;
}
</style>
<script>
  boat.onclick = () => boat.classList.add('move');
</script>

Aqui está um exemplo mais complexo, com @keyframes:

<h2 onclick="this.classList.toggle('animated')">click me to start / stop</h2>
<style>
  .animated {
    animation: hello-goodbye 1.8s infinite;
    width: fit-content;
  }
  @keyframes hello-goodbye {
    0% {
      transform: translateY(-60px) rotateX(0.7turn);
      opacity: 0;
    }
    50% {
      transform: none;
      opacity: 1;
    }
    100% {
      transform: translateX(230px) rotateZ(90deg) scale(0.5);
      opacity: 0;
    }
  }
</style>

Resumo
As animações CSS permitem alterações animadas suaves (ou passo a passo) de uma ou várias propriedades CSS.

Eles são bons para a maioria das tarefas de animação. Também podemos usar JavaScript para animações, o próximo capítulo é dedicado a isso.

Limitações de animações CSS em comparação com animações JavaScript:

Méritos
Coisas simples feitas com simplicidade.
Rápido e leve para CPU.
Deméritos
As animações JavaScript são flexíveis. Eles podem implementar qualquer lógica de animação, como uma “explosão” de um elemento.
Não apenas mudanças de propriedade. Podemos criar novos elementos em JavaScript como parte da animação.
Nos primeiros exemplos deste capítulo, animamos font-size, left, width, height, etc. Em projetos da vida real, devemos usar transform: scale()e transform: translate()para um melhor desempenho.

A maioria das animações pode ser implementada usando CSS conforme descrito neste capítulo. E o transitionendevento permite que o JavaScript seja executado após a animação, para que ele se integre bem ao código.

Mas no próximo capítulo faremos algumas animações JavaScript para cobrir casos mais complexos.

*/