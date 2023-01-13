/*

Tamanho do elemento e rolagem
Existem muitas propriedades JavaScript que nos permitem ler informações sobre largura, altura e outros recursos de geometria do elemento.

Muitas vezes precisamos deles ao mover ou posicionar elementos em JavaScript.

Elemento de amostra
Como um elemento de amostra para demonstrar as propriedades, usaremos o dado abaixo:

<div id="example">
  ...Text...
</div>
<style>
  #example {
    width: 300px;
    height: 200px;
    border: 25px solid #E8C48F;
    padding: 20px;
    overflow: auto;
  }
</style>
Tem a borda, preenchimento e rolagem. O conjunto completo de recursos. Não há margens, pois não fazem parte do próprio elemento e não há propriedades especiais para elas.

O elemento se parece com isso:


Você pode abrir o documento na caixa de areia .

Cuidado com a barra de rolagem
A figura acima demonstra o caso mais complexo quando o elemento possui uma barra de rolagem. Alguns navegadores (não todos) reservam o espaço para ele retirando-o do conteúdo (rotulado como “largura do conteúdo” acima).

Então, sem a barra de rolagem a largura do conteúdo seria 300px, mas se a barra de rolagem for 16pxlarga (a largura pode variar entre dispositivos e navegadores) então só 300 - 16 = 284pxresta, e devemos levar isso em consideração. É por isso que os exemplos deste capítulo assumem que há uma barra de rolagem. Sem ela, alguns cálculos são mais simples.

A padding-bottomárea pode ser preenchida com texto
Normalmente os paddings são mostrados vazios em nossas ilustrações, mas se houver muito texto no elemento e ele estourar, então os navegadores mostrarão o texto “transbordando” em padding-bottom, isso é normal.

Geometria
Aqui está a imagem geral com propriedades de geometria:


Os valores dessas propriedades são tecnicamente números, mas esses números são “de pixels”, portanto, são medidas de pixels.

Vamos começar a explorar as propriedades começando de fora do elemento.]

offsetParent, offsetLeft/Top
Essas propriedades raramente são necessárias, mas ainda são as propriedades de geometria "mais externas", então começaremos com elas.

O offsetParenté o ancestral mais próximo que o navegador usa para calcular as coordenadas durante a renderização.

Esse é o ancestral mais próximo que é um dos seguintes:

1. Posicionado em CSS ( positioné absolute, relativeou ) fixedousticky
2. <td>, <th>, ou <table>, ou
3. <body>.

As propriedades offsetLeft/offsetTopfornecem coordenadas x/y relativas ao offsetParentcanto superior esquerdo.

No exemplo abaixo, o interno <div>tem <main>como offsetParente offsetLeft/offsetTopdesloca de seu canto superior esquerdo ( 180):

<main style="position: relative" id="main">
  <article>
    <div id="example" style="position: absolute; left: 180px; top: 180px">...</div>
  </article>
</main>
<script>
  alert(example.offsetParent.id); // main
  alert(example.offsetLeft); // 180 (note: a number, not a string "180px")
  alert(example.offsetTop); // 180
</script>

Existem várias ocasiões em que offsetParenté null:

1.Para elementos não mostrados ( display:noneou não no documento).
2. Para <body>e <html>.
3. Para elementos com position:fixed.

largura/altura do deslocamento
Agora vamos passar para o elemento em si.

Essas duas propriedades são as mais simples. Eles fornecem a largura/altura “externa” do elemento. Ou, em outras palavras, em tamanho real, incluindo bordas.


Para nosso elemento de amostra:

offsetWidth = 390– a largura externa, pode ser calculada como largura CSS interna ( 300px) mais preenchimentos ( 2 * 20px) e bordas ( 2 * 25px).
offsetHeight = 290– a altura exterior.
As propriedades de geometria são zero/nulo para elementos que não são exibidos
As propriedades de geometria são calculadas apenas para os elementos exibidos.

Se um elemento (ou qualquer um de seus ancestrais) display:noneestiver ou não no documento, todas as propriedades de geometria serão zero (ou nullpara offsetParent).

Por exemplo, offsetParentis null, e offsetWidth, offsetHeightare 0quando criamos um elemento, mas ainda não o inserimos no documento, ou ele (ou seu ancestral) possui display:none.

Podemos usar isso para verificar se um elemento está oculto, assim:

function isHidden(elem) {
  return !elem.offsetWidth && !elem.offsetHeight;
}
Observe que tais isHiddenretornos truepara elementos que estão na tela, mas têm tamanho zero.

clienteCima/Esquerda
Dentro do elemento temos as bordas.

Para medi-los, existem propriedades clientTope clientLeft.

No nosso exemplo:

clientLeft = 25– largura da borda esquerda
clientTop = 25– largura da borda superior

…Mas, para ser preciso – essas propriedades não são largura/altura da borda, mas sim coordenadas relativas do lado interno do lado externo.

Qual é a diferença?

Torna-se visível quando o documento está da direita para a esquerda (o sistema operacional está nos idiomas árabe ou hebraico). A barra de rolagem não está à direita, mas à esquerda e clientLefttambém inclui a largura da barra de rolagem.

Nesse caso, clientLeftnão seria 25, mas com a largura da barra de rolagem 25 + 16 = 41.

Aqui está o exemplo em hebraico:


largura/altura do cliente
Essas propriedades fornecem o tamanho da área dentro das bordas do elemento.

Eles incluem a largura do conteúdo junto com os preenchimentos, mas sem a barra de rolagem:


Na foto acima vamos primeiro considerar clientHeight.

Não há barra de rolagem horizontal, então é exatamente a soma do que está dentro das bordas: CSS-height 200pxmais paddings superior e inferior ( 2 * 20px) total 240px.

Agora clientWidth– aqui a largura do conteúdo não é 300px, mas 284px, porque 16pxsão ocupados pela barra de rolagem. Portanto, a soma é 284pxmais os preenchimentos esquerdo e direito, total 324px.

Se não houver preenchimentos, então clientWidth/Heighté exatamente a área de conteúdo, dentro das bordas e da barra de rolagem (se houver).


Então, quando não há preenchimento, podemos usar clientWidth/clientHeightpara obter o tamanho da área de conteúdo.

scrollLargura/Altura
Essas propriedades são como clientWidth/clientHeight, mas também incluem as partes roladas (ocultas):


Na foto acima:

scrollHeight = 723– é a altura interna total da área de conteúdo, incluindo as partes roladas.
scrollWidth = 324– é a largura interna total, aqui não temos rolagem horizontal, então é igual a clientWidth.
Podemos usar essas propriedades para expandir a largura do elemento até sua largura/altura total.

Como isso:

// expand the element to the full content height
element.style.height = `${element.scrollHeight}px`;
Clique no botão para expandir o elemento:

texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto
elemento.estilo.altura =${element.scrollHeight}px

scrollLeft/scrollTop
As propriedades scrollLeft/scrollTopsão a largura/altura da parte oculta e rolada do elemento.

Na foto abaixo podemos ver scrollHeighte scrollToppara um bloco com scroll vertical.


Em outras palavras, scrollTopé “quanto é rolado para cima”.

scrollLeft/scrollToppode ser modificado
A maioria das propriedades de geometria aqui são somente leitura, mas scrollLeft/scrollToppodem ser alteradas e o navegador rolará o elemento.

Se você clicar no elemento abaixo, o código será elem.scrollTop += 10executado. Isso faz com que o conteúdo do elemento role 10pxpara baixo.

Clique em
mim
1
2
3
4
5
6
7
8
9
Definir scrollTopcomo 0ou um valor grande, como 1e9fará com que o elemento role para o topo/baixo, respectivamente.

Não tire largura/altura do CSS
Acabamos de cobrir as propriedades geométricas dos elementos DOM, que podem ser usadas para obter larguras, alturas e calcular distâncias.

Mas, como sabemos no capítulo Estilos e classes , podemos ler a altura e a largura do CSS usando getComputedStyle.

Então, por que não ler a largura de um elemento com getComputedStyle, assim?

let elem = document.body;

alert( getComputedStyle(elem).width ); // show CSS width for elem
Por que devemos usar propriedades de geometria em vez disso? Existem dois motivos:

Primeiro, o CSS width/heightdepende de outra propriedade: box-sizingque define “o que é” largura e altura do CSS. Uma alteração box-sizingpara fins de CSS pode interromper esse JavaScript.

Em segundo lugar, CSS width/heightpode ser auto, por exemplo, para um elemento inline:

<span id="elem">Hello!</span>

<script>
  alert( getComputedStyle(elem).width ); // auto
</script>
Do ponto de vista CSS, width:autoé perfeitamente normal, mas em JavaScript precisamos de um tamanho exato pxque possamos usar nos cálculos. Portanto, aqui a largura do CSS é inútil.

E há mais um motivo: uma barra de rolagem. Às vezes, o código que funciona bem sem uma barra de rolagem torna-se problemático com ela, porque uma barra de rolagem ocupa espaço do conteúdo em alguns navegadores. Portanto, a largura real disponível para o conteúdo é menor que a largura do CSS. E clientWidth/clientHeightleve isso em consideração.

…Mas com getComputedStyle(elem).widtha situação é diferente. Alguns navegadores (por exemplo, Chrome) retornam a largura interna real, menos a barra de rolagem, e alguns deles (por exemplo, Firefox) – largura do CSS (ignore a barra de rolagem). Essas diferenças entre navegadores são o motivo para não usar getComputedStyle, mas sim confiar nas propriedades da geometria.

Se o seu navegador reserva espaço para uma barra de rolagem (a maioria dos navegadores para Windows reserva), você pode testá-lo abaixo.


O elemento com texto tem CSS width:300px.

Em um sistema operacional Windows para desktop, Firefox, Chrome, Edge, todos reservam o espaço para a barra de rolagem. Mas o Firefox mostra 300px, enquanto o Chrome e o Edge mostram menos. Isso ocorre porque o Firefox retorna a largura do CSS e outros navegadores retornam a largura “real”.

Observe que a diferença descrita é apenas sobre a leitura getComputedStyle(...).widthdo JavaScript, visualmente tudo está correto.

Resumo
Os elementos têm as seguintes propriedades de geometria:

offsetParent– é o ancestral posicionado mais próximo ou td, th, table, body.
offsetLeft/offsetTop– coordenadas relativas à borda superior esquerda de offsetParent.
offsetWidth/offsetHeight– largura/altura “externa” de um elemento incluindo bordas.
clientLeft/clientTop– as distâncias do canto externo superior esquerdo ao canto interno superior esquerdo (conteúdo + preenchimento). Para sistemas operacionais da esquerda para a direita, eles são sempre as larguras das bordas esquerda/superior. Para o sistema operacional da direita para a esquerda, a barra de rolagem vertical está à esquerda, portanto, clientLeftinclui sua largura também.
clientWidth/clientHeight– a largura/altura do conteúdo incluindo preenchimentos, mas sem a barra de rolagem.
scrollWidth/scrollHeight– a largura/altura do conteúdo, assim como clientWidth/clientHeight, mas também inclui a parte invisível e rolada do elemento.
scrollLeft/scrollTop– largura/altura da parte superior rolada do elemento, começando pelo canto superior esquerdo.
Todas as propriedades são somente leitura, exceto scrollLeft/scrollTopque fazem o navegador rolar o elemento se alterado.

*/

