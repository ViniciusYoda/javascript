/*

Coordenadas
Para mover os elementos, devemos estar familiarizados com as coordenadas.

A maioria dos métodos JavaScript lida com um dos dois sistemas de coordenadas:

Relativo à janela – semelhante a position:fixed, calculado a partir da borda superior/esquerda da janela.
vamos denotar essas coordenadas como clientX/clientY, o raciocínio para tal nome ficará claro mais tarde, quando estudarmos as propriedades do evento.
Relativo ao documento – semelhante à position:absoluteraiz do documento, calculado a partir da borda superior/esquerda do documento.
vamos denotá-los pageX/pageY.
Quando a página é rolada até o início, de modo que o canto superior/esquerdo da janela seja exatamente o canto superior/esquerdo do documento, essas coordenadas são iguais. Mas depois que o documento muda, as coordenadas relativas à janela dos elementos mudam, conforme os elementos se movem pela janela, enquanto as coordenadas relativas ao documento permanecem as mesmas.

Nesta foto pegamos um ponto no documento e demonstramos suas coordenadas antes do scroll (esquerda) e depois dele (direita):


Quando o documento rolou:

pageY– a coordenada relativa ao documento permaneceu a mesma, é contada a partir do topo do documento (agora rolada para fora).
clientY– a coordenada relativa à janela mudou (a seta ficou mais curta), pois o mesmo ponto ficou mais próximo do topo da janela.
Coordenadas do elemento: getBoundingClientRect
O método elem.getBoundingClientRect()retorna as coordenadas da janela para um retângulo mínimo que inclui elemum objeto da classe interna DOMRect .

Principais DOMRectpropriedades:

x/y– Coordenadas X/Y da origem do retângulo em relação à janela,
width/height– largura/altura do retângulo (pode ser negativo).
Além disso, existem propriedades derivadas:

top/bottom– Coordenada Y para a aresta superior/inferior do retângulo,
left/right– Coordenada X para a borda esquerda/direita do retângulo.
Por exemplo, clique neste botão para ver as coordenadas da janela:


Se você rolar a página e repetir, notará que conforme a posição do botão relativo à janela muda, suas coordenadas de janela ( y/top/bottomse você rolar verticalmente) também mudam.

Aqui está a imagem da elem.getBoundingClientRect()saída:


Como você pode ver x/ye width/heightdescrever completamente o retângulo. As propriedades derivadas podem ser facilmente calculadas a partir delas:

left = x
top = y
right = x + width
bottom = y + height
Observe:

As coordenadas podem ser frações decimais, como 10.5. Isso é normal, internamente o navegador usa frações nos cálculos. Não precisamos arredondá-los ao defini-los como style.left/top.
As coordenadas podem ser negativas. Por exemplo, se a página for rolada de modo que elemagora esteja acima da janela, então elem.getBoundingClientRect().topé negativo.
Por que as propriedades derivadas são necessárias? Por que top/leftexiste se há x/y?
Matematicamente, um retângulo é definido exclusivamente com seu ponto inicial (x,y)e o vetor de direção (width,height). Portanto, as propriedades derivadas adicionais são por conveniência.

Tecnicamente, é possível width/heightser negativo, o que permite um retângulo “direcionado”, por exemplo, para representar a seleção do mouse com início e fim devidamente marcados.

Valores negativos width/heightsignificam que o retângulo começa no canto inferior direito e depois “cresce” da esquerda para cima.

Aqui está um retângulo com negativo widthe height(por exemplo width=-200, , height=-100):


Como você pode ver, left/topnão é igual x/ynesse caso.

Na prática, porém, elem.getBoundingClientRect()sempre retorna largura/altura positiva, aqui mencionamos negativa width/heightapenas para você entender porque essas propriedades aparentemente duplicadas não são realmente duplicadas.

Internet Explorer: sem suporte parax/y
O Internet Explorer não oferece suporte x/ya propriedades por motivos históricos.

Portanto, podemos fazer um polyfill (adicionar getters em DomRect.prototype) ou apenas usar top/left, pois eles são sempre os mesmos x/ypara positivo width/height, em particular no resultado de elem.getBoundingClientRect().

As coordenadas direita/inferior são diferentes das propriedades de posição do CSS
Existem semelhanças óbvias entre coordenadas relativas à janela e CSS position:fixed.

Mas no posicionamento CSS, rightpropriedade significa a distância da borda direita e bottompropriedade significa a distância da borda inferior.

Se olharmos apenas para a imagem acima, podemos ver que em JavaScript não é assim. Todas as coordenadas da janela são contadas a partir do canto superior esquerdo, incluindo estas.

elementoDoPonto(x, y)
A chamada para document.elementFromPoint(x, y)retorna o elemento mais aninhado nas coordenadas da janela (x, y).

A sintaxe é:

let elem = document.elementFromPoint(x, y);
Por exemplo, o código abaixo destaca e exibe a tag do elemento que agora está no meio da janela:

let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elementFromPoint(centerX, centerY);

elem.style.background = "red";
alert(elem.tagName);
Como usa coordenadas de janela, o elemento pode ser diferente dependendo da posição de rolagem atual.

Para coordenadas fora da janela, os elementFromPointretornosnull
O método document.elementFromPoint(x,y)só funciona se (x,y)estiver dentro da área visível.

Se alguma das coordenadas for negativa ou exceder a largura/altura da janela, ela retornará null.

Aqui está um erro típico que pode ocorrer se não o verificarmos:

let elem = document.elementFromPoint(x, y);
// if the coordinates happen to be out of the window, then elem = null
elem.style.background = ''; // Error!
Usando para posicionamento “fixo”
Na maioria das vezes, precisamos de coordenadas para posicionar algo.

Para mostrar algo próximo a um elemento, podemos usar getBoundingClientRectpara obter suas coordenadas e, em seguida, CSS positionjunto com left/top(ou right/bottom).

Por exemplo, a função createMessageUnder(elem, html)abaixo mostra a mensagem abaixo elem:

let elem = document.getElementById("coords-show-mark");

function createMessageUnder(elem, html) {
  // create message element
  let message = document.createElement('div');
  // better to use a css class for the style here
  message.style.cssText = "position:fixed; color: red";

  // assign coordinates, don't forget "px"!
  let coords = elem.getBoundingClientRect();

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}

// Usage:
// add it for 5 seconds in the document
let message = createMessageUnder(elem, 'Hello, world!');
document.body.append(message);
setTimeout(() => message.remove(), 5000);
Clique no botão para executá-lo:

Botão com id=“coords-show-mark”, a mensagem aparecerá embaixo dele

O código pode ser modificado para mostrar a mensagem à esquerda, direita, abaixo, aplicar animações CSS para “fade it in” e assim por diante. Isso é fácil, pois temos todas as coordenadas e tamanhos do elemento.

Mas observe o detalhe importante: quando a página é rolada, a mensagem flui para longe do botão.

A razão é óbvia: o elemento message depende de position:fixed, então ele permanece no mesmo lugar da janela enquanto a página rola.

Para mudar isso, precisamos usar coordenadas baseadas em documentos e arquivos position:absolute.

Coordenadas do documento
As coordenadas relativas ao documento começam no canto superior esquerdo do documento, não na janela.

Em CSS, as coordenadas da janela correspondem a position:fixed, enquanto as coordenadas do documento são semelhantes a position:absoluteno topo.

Podemos usar position:absolutee top/leftpara colocar algo em um determinado local do documento, para que permaneça lá durante a rolagem da página. Mas primeiro precisamos das coordenadas certas.

Não existe um método padrão para obter as coordenadas do documento de um elemento. Mas é fácil escrevê-lo.

Os dois sistemas de coordenadas são conectados pela fórmula:

pageY= clientY+ altura da parte vertical rolada do documento.
pageX= clientX+ largura da parte horizontal rolada do documento.
A função getCoords(elem)pegará as coordenadas da janela elem.getBoundingClientRect()e adicionará a rolagem atual a elas:

// get document coordinates of the element
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}
Se no exemplo acima o usássemos com position:absolute, então a mensagem ficaria perto do elemento no scroll.

A função modificada createMessageUnder:

function createMessageUnder(elem, html) {
  let message = document.createElement('div');
  message.style.cssText = "position:absolute; color: red";

  let coords = getCoords(elem);

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}
Resumo
Qualquer ponto na página tem coordenadas:

Em relação à janela – elem.getBoundingClientRect().
Relativo ao documento – elem.getBoundingClientRect()mais a rolagem da página atual.
As coordenadas da janela são ótimas para usar position:fixede as coordenadas do documento funcionam bem com position:absolute.

Ambos os sistemas de coordenadas têm seus prós e contras; às vezes precisamos de um ou outro, assim como CSS position absolutee fixed.

*/