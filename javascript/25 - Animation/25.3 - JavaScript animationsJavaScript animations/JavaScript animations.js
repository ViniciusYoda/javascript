/*

animações JavaScript
As animações JavaScript podem lidar com coisas que o CSS não pode.

Por exemplo, movendo-se ao longo de um caminho complexo, com uma função de temporização diferente das curvas de Bezier, ou uma animação em uma tela.

Usando setInterval
Uma animação pode ser implementada como uma sequência de quadros – geralmente pequenas alterações nas propriedades HTML/CSS.

Por exemplo, mudar style.leftde 0pxpara 100pxmove o elemento. E se aumentarmos em setInterval, mudando 2pxcom um pequeno atraso, como 50 vezes por segundo, parece suave. Esse é o mesmo princípio do cinema: 24 quadros por segundo são suficientes para fazer com que pareça suave.

O pseudocódigo pode ficar assim:

let timer = setInterval(function() {
  if (animation complete) clearInterval(timer);
  else increase style.left by 2px
}, 20); // change by 2px every 20ms, about 50 frames per second
Exemplo mais completo da animação:

let start = Date.now(); // remember start time

let timer = setInterval(function() {
  // how much time passed from the start?
  let timePassed = Date.now() - start;

  if (timePassed >= 2000) {
    clearInterval(timer); // finish the animation after 2 seconds
    return;
  }

  // draw the animation at the moment timePassed
  draw(timePassed);

}, 20);

// as timePassed goes from 0 to 2000
// left gets values from 0px to 400px
function draw(timePassed) {
  train.style.left = timePassed / 5 + 'px';
}
Clique para a demonstração:

Resultadoindex.html
<!DOCTYPE HTML>
<html>

<head>
  <style>
    #train {
      position: relative;
      cursor: pointer;
    }
  </style>
</head>

<body>

  <img id="train" src="https://js.cx/clipart/train.gif">


  <script>
    train.onclick = function() {
      let start = Date.now();

      let timer = setInterval(function() {
        let timePassed = Date.now() - start;

        train.style.left = timePassed / 5 + 'px';

        if (timePassed > 2000) clearInterval(timer);

      }, 20);
    }
  </script>


</body>

</html>
Usando requestAnimationFrame
Vamos imaginar que temos várias animações rodando simultaneamente.

Se os executarmos separadamente, mesmo que cada um tenha setInterval(..., 20), o navegador terá que repintar com muito mais frequência do que cada 20ms.

Isso ocorre porque eles têm tempos de início diferentes, então “a cada 20ms” difere entre diferentes animações. Os intervalos não estão alinhados. Portanto, teremos várias execuções independentes dentro do 20ms.

Em outras palavras, isso:

setInterval(function() {
  animate1();
  animate2();
  animate3();
}, 20)
…É mais leve que três chamadas independentes:

setInterval(animate1, 20); // independent animations
setInterval(animate2, 20); // in different places of the script
setInterval(animate3, 20);
Esses vários redesenhos independentes devem ser agrupados, para tornar o redesenho mais fácil para o navegador e, portanto, carregar menos carga da CPU e parecer mais suave.

Há mais uma coisa a ter em mente. Às vezes, a CPU está sobrecarregada ou há outros motivos para redesenhar com menos frequência (como quando a guia do navegador está oculta), portanto, não devemos executá-la a cada 20ms.

Mas como sabemos disso em JavaScript? Há uma especificação de tempo de animação que fornece a função requestAnimationFrame. Ele aborda todas essas questões e ainda mais.

A sintaxe:

let requestId = requestAnimationFrame(callback)
Isso agenda a callbackfunção para ser executada no horário mais próximo em que o navegador deseja fazer a animação.

Se fizermos alterações nos elementos, callbackeles serão agrupados com outros requestAnimationFramecallbacks e com animações CSS. Portanto, haverá um recálculo de geometria e repintura em vez de muitos.

O valor retornado requestIdpode ser usado para cancelar a chamada:

// cancel the scheduled execution of callback
cancelAnimationFrame(requestId);
O callbackobtém um argumento – o tempo passado desde o início do carregamento da página em milissegundos. Esse tempo também pode ser obtido chamando performance.now() .

Geralmente callbackroda muito rápido, a menos que a CPU esteja sobrecarregada ou a bateria do laptop esteja quase descarregada, ou haja outro motivo.

O código abaixo mostra o tempo entre as 10 primeiras execuções para requestAnimationFrame. Normalmente é 10-20ms:

<script>
  let prev = performance.now();
  let times = 0;

  requestAnimationFrame(function measure(time) {
    document.body.insertAdjacentHTML("beforeEnd", Math.floor(time - prev) + " ");
    prev = time;

    if (times++ < 10) requestAnimationFrame(measure);
  })
</script>
animação estruturada
Agora podemos fazer uma função de animação mais universal baseada em requestAnimationFrame:

function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction)

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
A função animateaceita 3 parâmetros que descrevem essencialmente a animação:

duration
Tempo total de animação. Tipo, 1000.

timing(timeFraction)
Função de temporização, como propriedade CSS transition-timing-functionque obtém a fração de tempo que passou ( 0no início, 1no final) e retorna a conclusão da animação (como yna curva de Bezier).

Por exemplo, uma função linear significa que a animação continua uniformemente com a mesma velocidade:

function linear(timeFraction) {
  return timeFraction;
}
Seu gráfico: 

Isso é como transition-timing-function: linear. Existem variantes mais interessantes mostradas abaixo.

draw(progress)
A função que pega o estado de conclusão da animação e o desenha. O valor progress=0denota o estado inicial da animação e progress=1– o estado final.

Esta é a função que realmente desenha a animação.

Pode mover o elemento:

function draw(progress) {
  train.style.left = progress + 'px';
}
…Ou fazer qualquer outra coisa, podemos animar qualquer coisa, de qualquer maneira.

Vamos animar o elemento widthusando nossa função 0.100%

Clique no elemento para a demonstração:

Resultadoanimate.jsindex.html
function animate({duration, draw, timing}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction)

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
O código para isso:

animate({
  duration: 1000,
  timing(timeFraction) {
    return timeFraction;
  },
  draw(progress) {
    elem.style.width = progress * 100 + '%';
  }
});
Ao contrário da animação CSS, podemos fazer qualquer função de temporização e qualquer função de desenho aqui. A função de temporização não é limitada pelas curvas de Bezier. E drawpode ir além das propriedades, criar novos elementos para animações como fogos de artifício ou algo assim.

funções de cronometragem
Vimos a função de temporização linear mais simples acima.

Vamos ver mais deles. Tentaremos animações de movimento com diferentes funções de temporização para ver como funcionam.

poder de n
Se quisermos acelerar a animação, podemos usar progressno power n.

Por exemplo, uma curva parabólica:

function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}
O gráfico:


Veja em ação (clique para ativar):


…Ou a curva cúbica ou ainda maior n. Aumentar a potência faz com que ele acelere mais rápido.

Aqui está o gráfico para progresso poder 5:


Em ação:


o arco
Função:

function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}
O gráfico:



Atrás: tiro com arco
Esta função faz o “tiro de arco”. Primeiro "puxamos a corda do arco" e depois "atiramos".

Ao contrário das funções anteriores, depende de um parâmetro adicional x, o “coeficiente de elasticidade”. A distância de “puxar corda do arco” é definida por ele.

O código:

function back(x, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}
O gráfico para x = 1.5:


Para animação, usamos com um valor específico de x. Exemplo para x = 1.5:


Quicar
Imagine que estamos deixando cair uma bola. Ele cai, depois salta para trás algumas vezes e para.

A bouncefunção faz o mesmo, mas na ordem inversa: o “bouncing” começa imediatamente. Ele usa alguns coeficientes especiais para isso:

function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}
Em ação:


animação elástica
Mais uma função “elástica” que aceita um parâmetro adicional xpara a “faixa inicial”.

function elastic(x, timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}
O gráfico para x=1.5: 

Em ação para x=1.5:


Reversão: facilidade*
Portanto, temos uma coleção de funções de temporização. Sua aplicação direta é chamada de “easeIn”.

Às vezes, precisamos mostrar a animação na ordem inversa. Isso é feito com a transformação “easeOut”.

facilidadeOut
No modo “easeOut” a timingfunção é colocada em um wrapper timingEaseOut:

timingEaseOut(timeFraction) = 1 - timing(1 - timeFraction)
Em outras palavras, temos uma função “transform” makeEaseOutque pega uma função de tempo “regular” e retorna o wrapper em torno dela:

// accepts a timing function, returns the transformed variant
function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}
Por exemplo, podemos pegar a bouncefunção descrita acima e aplicá-la:

let bounceEaseOut = makeEaseOut(bounce);
Então o salto não será no começo, mas no final da animação. Parece ainda melhor:

Resultadoestilo.cssindex.html

Aqui podemos ver como a transformação altera o comportamento da função:


Se houver um efeito de animação no início, como um salto, ele será exibido no final.

No gráfico acima, o salto normal tem a cor vermelha e o salto de easyOut é azul.

Salto regular – o objeto salta na parte inferior e, no final, salta bruscamente para o topo.
Depois easeOut– primeiro pula para o topo, depois salta para lá.
easyInOut
Também podemos mostrar o efeito tanto no início quanto no final da animação. A transformação é chamada de “easeInOut”.

Dada a função de temporização, calculamos o estado da animação assim:

if (timeFraction <= 0.5) { // first half of the animation
  return timing(2 * timeFraction) / 2;
} else { // second half of the animation
  return (2 - timing(2 * (1 - timeFraction))) / 2;
}
O código do wrapper:

function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

bounceEaseInOut = makeEaseInOut(bounce);
Em ação bounceEaseInOut,:

Resultadoestilo.cssindex.html

A transformação “easeInOut” une dois gráficos em um: easeIn(regular) para a primeira metade da animação e easeOut(invertido) – para a segunda parte.

O efeito é visto claramente se compararmos os gráficos de easeIn, easeOute easeInOutda circfunção de tempo:


Vermelho é a variante regular de circ( easeIn).
Verde – easeOut.
Azul – easeInOut.
Como podemos ver, o gráfico da primeira metade da animação é reduzido easeIn, e o da segunda metade é reduzido easeOut. Como resultado, a animação começa e termina com o mesmo efeito.

“Desenho” mais interessante
Em vez de mover o elemento, podemos fazer outra coisa. Tudo o que precisamos é escrever o arquivo draw.

Aqui está a digitação animada do texto “pulando”:

Resultadoestilo.cssindex.html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css">
  <script src="https://js.cx/libs/animate.js"></script>
</head>

<body>


  <textarea id="textExample" rows="5" cols="60">He took his vorpal sword in hand:
Long time the manxome foe he sought—
So rested he by the Tumtum tree,
And stood awhile in thought.
  </textarea>

  <button onclick="animateText(textExample)">Run the animated typing!</button>

  <script>
    function animateText(textArea) {
      let text = textArea.value;
      let to = text.length,
        from = 0;

      animate({
        duration: 5000,
        timing: bounce,
        draw: function(progress) {
          let result = (to - from) * progress + from;
          textArea.value = text.slice(0, Math.ceil(result))
        }
      });
    }


    function bounce(timeFraction) {
      for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    }
  </script>


</body>

</html>
Resumo
Para animações com as quais o CSS não consegue lidar bem, ou aquelas que precisam de um controle rígido, o JavaScript pode ajudar. As animações JavaScript devem ser implementadas via requestAnimationFrame. Esse método interno permite configurar uma função de retorno de chamada para ser executada quando o navegador estiver preparando uma repintura. Normalmente é muito em breve, mas a hora exata depende do navegador.

Quando uma página está em segundo plano, não há nenhuma repintura, portanto o callback não será executado: a animação será suspensa e não consumirá recursos. Isso é ótimo.

Aqui está a animatefunção auxiliar para configurar a maioria das animações:

function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
Opções:

duration– o tempo total de animação em ms.
timing– a função para calcular o progresso da animação. Obtém uma fração de tempo de 0 a 1, retorna o progresso da animação, geralmente de 0 a 1.
draw– a função para desenhar a animação.
Certamente poderíamos melhorá-lo, adicionar mais sinos e assobios, mas as animações JavaScript não são aplicadas diariamente. Eles são usados ​​​​para fazer algo interessante e fora do padrão. Portanto, você deseja adicionar os recursos necessários quando precisar deles.

As animações JavaScript podem usar qualquer função de temporização. Cobrimos muitos exemplos e transformações para torná-los ainda mais versáteis. Ao contrário do CSS, não estamos limitados às curvas de Bezier aqui.

O mesmo é sobre draw: ​​podemos animar qualquer coisa, não apenas propriedades CSS.

*/