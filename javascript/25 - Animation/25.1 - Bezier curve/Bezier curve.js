/*

curva de Bezier
As curvas de Bezier são usadas em computação gráfica para desenhar formas, para animação CSS e em muitos outros lugares.

Eles são uma coisa muito simples, vale a pena estudar uma vez e depois se sentir confortável no mundo dos gráficos vetoriais e animações avançadas.

Alguma teoria, por favor
Este artigo fornece uma visão teórica, mas muito necessária, sobre o que são as curvas de Bezier, enquanto o próximo mostra como podemos usá-las para animações CSS.

Por favor, tome seu tempo para ler e entender o conceito, ele irá atendê-lo bem.

Pontos de controle
Uma curva de Bezier é definida por pontos de controle.

Pode haver 2, 3, 4 ou mais.

Por exemplo, curva de dois pontos:


Curva de três pontos:


Curva de quatro pontos:


Se você olhar atentamente para essas curvas, poderá notar imediatamente:

Os pontos nem sempre estão na curva. Isso é perfeitamente normal, depois veremos como a curva é construída.

A ordem da curva é igual ao número de pontos menos um . Para dois pontos temos uma curva linear (que é uma linha reta), para três pontos – curva quadrática (parabólica), para quatro pontos – curva cúbica.

Uma curva está sempre dentro da casca convexa dos pontos de controle:

 

Por causa dessa última propriedade, em computação gráfica é possível otimizar os testes de interseção. Se as cascas convexas não se cruzam, as curvas também não. Portanto, verificar primeiro a interseção dos cascos convexos pode fornecer um resultado "sem interseção" muito rápido. Verificar a interseção de cascas convexas é muito mais fácil, pois são retângulos, triângulos e assim por diante (veja a figura acima), figuras bem mais simples que a curva.

O principal valor das curvas de Bezier para desenhar - movendo os pontos, a curva está mudando de maneira intuitivamente óbvia .

Tente mover os pontos de controle usando um mouse no exemplo abaixo:


Como você pode notar, a curva se estende ao longo das linhas tangenciais 1 → 2 e 3 → 4.

Depois de alguma prática, torna-se óbvio como colocar os pontos para obter a curva necessária. E conectando várias curvas podemos obter praticamente qualquer coisa.

aqui estão alguns exemplos:

  

De Casteljau’s algorithm
Existe uma fórmula matemática para as curvas de Bezier, mas vamos abordá-la um pouco mais tarde, porque o algoritmo de De Casteljau é idêntico à definição matemática e mostra visualmente como é construído.

Primeiro vamos ver o exemplo de 3 pontos.

Aqui está a demonstração e a explicação a seguir.

Os pontos de controle (1,2 e 3) podem ser movidos com o mouse. Pressione o botão "play" para executá-lo.


De Casteljau’s algorithm of building the 3-point bezier curve:

Desenhe pontos de controle. Na demonstração acima, eles são rotulados: 1, 2, 3.

Construa segmentos entre os pontos de controle 1 → 2 → 3. Na demonstração acima, eles são marrons .

O parâmetro tse move de 0para 1. No exemplo acima 0.05é usado o passo: o loop vai por cima 0, 0.05, 0.1, 0.15, ... 0.95, 1.

Para cada um desses valores de t:

Em cada segmento marrom tomamos um ponto localizado na distância proporcional a tdesde o seu início. Como são dois segmentos, temos dois pontos.

Por exemplo, para t=0– ambos os pontos estarão no início dos segmentos, e para t=0.25– nos 25% do comprimento do segmento desde o início, para t=0.5– 50% (o meio), para t=1– no final dos segmentos.

Conecte os pontos. Na figura abaixo, o segmento de conexão está pintado de azul .

Parat=0.25	Parat=0.5
	
Agora, no segmento azul , marque um ponto na distância proporcional ao mesmo valor de t. Ou seja, para t=0.25(a imagem da esquerda) temos um ponto no final do quarto esquerdo do segmento e para t=0.5(a imagem da direita) – no meio do segmento. Nas fotos acima desse ponto é vermelho .

Como tvai de 0a 1, todo valor de tadiciona um ponto à curva. O conjunto desses pontos forma a curva de Bezier. É vermelho e parabólico nas fotos acima.

Esse foi um processo para 3 pontos. Mas o mesmo vale para 4 pontos.

A demonstração para 4 pontos (os pontos podem ser movidos por um mouse):


O algoritmo para 4 pontos:

Conecte os pontos de controle por segmentos: 1 → 2, 2 → 3, 3 → 4. Haverá 3 segmentos marrons .
Para cada um tno intervalo de 0a 1:
Tomamos pontos nesses segmentos na distância proporcional a tdesde o início. Esses pontos estão conectados, de modo que temos dois segmentos verdes .
Nesses segmentos tomamos pontos proporcionais a t. Obtemos um segmento azul .
No segmento azul tomamos um ponto proporcional a t. No exemplo acima é vermelho .
Esses pontos juntos formam a curva.
O algoritmo é recursivo e pode ser generalizado para qualquer número de pontos de controle.

Dado N de pontos de controle:

Nós os conectamos para obter inicialmente N-1 segmentos.
Então, para cada tde 0a 1, pegamos um ponto em cada segmento na distância proporcional a te os conectamos. Haverá N-2 segmentos.
Repita o passo 2 até que haja apenas um ponto.
Esses pontos fazem a curva.

Executar e pausar exemplos para ver claramente os segmentos e como a curva é construída.

Uma curva que se parece com y=1/t:


Os pontos de controle em zigue-zague também funcionam bem:


Fazer um loop é possível:


Uma curva de Bezier não suave (sim, isso também é possível):


Se houver algo obscuro na descrição do algoritmo, observe os exemplos ao vivo acima para ver como a curva é construída.

Como o algoritmo é recursivo, podemos construir curvas de Bezier de qualquer ordem, ou seja: usando 5, 6 ou mais pontos de controle. Mas na prática muitos pontos são menos úteis. Normalmente, pegamos 2-3 pontos e, para linhas complexas, colamos várias curvas juntas. Isso é mais simples de desenvolver e calcular.

Como desenhar uma curva através de pontos dados?
Para especificar uma curva de Bezier, são usados ​​pontos de controle. Como podemos ver, eles não estão na curva, exceto o primeiro e o último.

Às vezes temos outra tarefa: traçar uma curva passando por vários pontos , de forma que todos fiquem em uma única curva suave. Essa tarefa é chamada de interpolação e não a abordamos aqui.

Existem fórmulas matemáticas para tais curvas, por exemplo polinômio de Lagrange . Em computação gráfica, a interpolação spline é freqüentemente usada para construir curvas suaves que conectam muitos pontos.

Matemáticas
Uma curva de Bezier pode ser descrita usando uma fórmula matemática.

Como vimos – na verdade não há necessidade de saber, a maioria das pessoas apenas desenha a curva movendo os pontos com o mouse. Mas se você gosta de matemática - aqui está.

Dadas as coordenadas dos pontos de controle : o primeiro ponto de controle tem as coordenadas , o segundo: , e assim por diante, as coordenadas da curva são descritas pela equação que depende do parâmetro do segmento .PiP1 = (x1, y1)P2 = (x2, y2)t[0,1]

A fórmula para uma curva de 2 pontos:

P = (1-t)P1 + tP2

Para 3 pontos de controle:

P = (1−t)2P1 + 2(1−t)tP2 + t2P3

Para 4 pontos de controle:

P = (1−t)3P1 + 3(1−t)2tP2 +3(1−t)t2P3 + t3P4

Estas são equações vetoriais. Em outras palavras, podemos colocar xe yem vez de Pobter as coordenadas correspondentes.

Por exemplo, a curva de 3 pontos é formada por pontos (x,y)calculados como:

x = (1−t)2x1 + 2(1−t)tx2 + t2x3
y = (1−t)2y1 + 2(1−t)ty2 + t2y3
Em vez de devemos colocar as coordenadas de 3 pontos de controle, e depois como se move de a , para cada valor que teremos da curva.x1, y1, x2, y2, x3, y3t01t(x,y)

Por exemplo, se os pontos de controle são (0,0), (0.5, 1)e (1, 0), as equações se tornam:

x = (1−t)2 * 0 + 2(1−t)t * 0.5 + t2 * 1 = (1-t)t + t2 = t
y = (1−t)2 * 0 + 2(1−t)t * 1 + t2 * 0 = 2(1-t)t = –2t2 + 2t
Agora, conforme tvai de 0a 1, o conjunto de valores (x,y)para cada um tforma a curva para tais pontos de controle.

Resumo
As curvas de Bezier são definidas por seus pontos de controle.

Vimos duas definições de curvas de Bezier:

Using a drawing process: De Casteljau’s algorithm.
Usando uma fórmulas matemáticas.
Boas propriedades das curvas de Bezier:

Podemos desenhar linhas suaves com um mouse movendo os pontos de controle.
Formas complexas podem ser feitas de várias curvas de Bezier.
Uso:

Em computação gráfica, modelagem, editores gráficos vetoriais. As fontes são descritas por curvas de Bezier.
Em desenvolvimento web – para gráficos em Canvas e no formato SVG. A propósito, os exemplos “ao vivo” acima são escritos em SVG. Na verdade, eles são um único documento SVG que recebe diferentes pontos como parâmetros. Você pode abri-lo em uma janela separada e ver a fonte: demo.svg .
Em animação CSS para descrever o caminho e a velocidade da animação.

*/