/*

Tamanhos de janela e rolagem
Como encontramos a largura e a altura da janela do navegador? Como obtemos toda a largura e altura do documento, incluindo a parte rolada? Como podemos rolar a página usando JavaScript?

Para esse tipo de informação, podemos utilizar o elemento raiz do documento document.documentElement, que corresponde à <html>tag. Mas existem métodos e peculiaridades adicionais a serem considerados.

Largura/altura da janela
Para obter a largura e a altura da janela, podemos usar o clientWidth/clientHeightof document.documentElement:


Por exemplo, este botão mostra a altura da sua janela:

alert(document.documentElement.clientHeight)

Nãowindow.innerWidth/innerHeight
Os navegadores também oferecem suporte a propriedades como window.innerWidth/innerHeight. Eles se parecem com o que queremos, então por que não usá-los?

Se existir uma barra de rolagem e ela ocupar algum espaço, clientWidth/clientHeightforneça a largura/altura sem ela (subtraia). Ou seja, retornam a largura/altura da parte visível do documento, disponível para o conteúdo.

window.innerWidth/innerHeightinclui a barra de rolagem.

Se houver uma barra de rolagem e ela ocupar algum espaço, essas duas linhas mostrarão valores diferentes:

alert( window.innerWidth ); // full window width
alert( document.documentElement.clientWidth ); // window width minus the scrollbar
Na maioria dos casos, precisamos da largura disponível da janela para desenhar ou posicionar algo dentro das barras de rolagem (se houver), então devemos usar documentElement.clientHeight/clientWidth.

DOCTYPEé importante
Observação: as propriedades de geometria de nível superior podem funcionar de maneira um pouco diferente quando não há <!DOCTYPE HTML>em HTML. Coisas estranhas são possíveis.

No HTML moderno devemos sempre escrever DOCTYPE.

Largura/altura do documento
Teoricamente, como o elemento raiz do documento é document.documentElement, e abrange todo o conteúdo, poderíamos medir o tamanho total do documento como document.documentElement.scrollWidth/scrollHeight.

Mas nesse elemento, para toda a página, essas propriedades não funcionam conforme o esperado. No Chrome/Safari/Opera, se não houver rolagem, documentElement.scrollHeightpode ser ainda menor que documentElement.clientHeight! Estranho, certo?

Para obter de forma confiável a altura total do documento, devemos obter o máximo destas propriedades:

let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Full document height, with scrolled out part: ' + scrollHeight);
Por quê então? Melhor não perguntar. Essas inconsistências vêm de tempos antigos, não de uma lógica “inteligente”.

Obtenha o pergaminho atual
Os elementos DOM têm seu estado de rolagem atual em suas scrollLeft/scrollToppropriedades.

Para rolagem de documentos, document.documentElement.scrollLeft/scrollTopfunciona na maioria dos navegadores, exceto os mais antigos baseados em WebKit, como o Safari (bug 5991 ), onde devemos usar document.bodyem vez de document.documentElement.

Felizmente, não precisamos nos lembrar dessas peculiaridades, porque o pergaminho está disponível nas propriedades especiais window.pageXOffset/pageYOffset:

alert('Current scroll from the top: ' + window.pageYOffset);
alert('Current scroll from the left: ' + window.pageXOffset);
Essas propriedades são somente leitura.

Também disponível como windowpropriedades scrollXescrollY
Por razões históricas, ambas as propriedades existem, mas são as mesmas:

window.pageXOffseté um pseudônimo de window.scrollX.
window.pageYOffseté um pseudônimo de window.scrollY.
Rolagem: scrollTo, scrollBy, scrollIntoView
Importante:
Para rolar a página com JavaScript, seu DOM deve ser totalmente construído.

Por exemplo, se tentarmos rolar a página com um script em <head>, não funcionará.

Elementos regulares podem ser rolados alterando scrollTop/scrollLeft.

Podemos fazer o mesmo para a página usando document.documentElement.scrollTop/scrollLeft(exceto Safari, onde document.body.scrollTop/Leftdeve ser usado).

Como alternativa, há uma solução universal mais simples: os métodos especiais window.scrollBy(x,y) e window.scrollTo(pageX,pageY) .

O método scrollBy(x,y)rola a página em relação à sua posição atual . Por exemplo, scrollBy(0,10)rola a página 10pxpara baixo.

O botão abaixo demonstra isso:

window.scrollBy(0,10)

O método scrollTo(pageX,pageY)rola a página para coordenadas absolutas , de modo que o canto superior esquerdo da parte visível tenha coordenadas (pageX, pageY)relativas ao canto superior esquerdo do documento. É como definir scrollLeft/scrollTop.

Para rolar até o início, podemos usar scrollTo(0,0).

window.scrollTo(0,0)

Esses métodos funcionam para todos os navegadores da mesma maneira.

scrollIntoView
Para completar, vamos abordar mais um método: elem.scrollIntoView(top) .

A chamada para elem.scrollIntoView(top)rola a página para torná-la elemvisível. Tem um argumento:

Se top=true(esse é o padrão), a página será rolada para elemaparecer na parte superior da janela. A borda superior do elemento será alinhada com o topo da janela.
Se top=false, a página rola para elemaparecer na parte inferior. A borda inferior do elemento será alinhada com a parte inferior da janela.
O botão abaixo rola a página para se posicionar no topo da janela:

this.scrollIntoView()

E este botão rola a página para se posicionar na parte inferior:

this.scrollIntoView(falso)

Proibir a rolagem
Às vezes, precisamos tornar o documento “não rolável”. Por exemplo, quando precisamos cobrir a página com uma mensagem grande que requer atenção imediata e queremos que o visitante interaja com essa mensagem, não com o documento.

Para tornar o documento não rolável, basta definir document.body.style.overflow = "hidden". A página irá “congelar” em sua posição de rolagem atual.

Tente:

document.body.style.overflow = 'oculto'

document.body.style.overflow = ''

O primeiro botão congela o scroll, enquanto o segundo o libera.

Podemos usar a mesma técnica para congelar a rolagem para outros elementos, não apenas para document.body.

A desvantagem do método é que a barra de rolagem desaparece. Se ocupou algum espaço, esse espaço agora está livre e o conteúdo “pula” para preenchê-lo.

Isso parece um pouco estranho, mas pode ser contornado se compararmos clientWidthantes e depois do congelamento. Se aumentou (a barra de rolagem desapareceu), adicione paddingno document.bodylugar da barra de rolagem para manter a mesma largura do conteúdo.

Resumo
Geometria:

Largura/altura da parte visível do documento (largura/altura da área de conteúdo):document.documentElement.clientWidth/clientHeight

Largura/altura de todo o documento, com a parte rolada:

let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
Rolagem:

Leia o pergaminho atual: window.pageYOffset/pageXOffset.

Altere a rolagem atual:

window.scrollTo(pageX,pageY)– coordenadas absolutas,
window.scrollBy(x,y)– rolar em relação ao local atual,
elem.scrollIntoView(top)– role para tornar elemvisível (alinhe com a parte superior/inferior da janela).

*/