/*

Quantificadores gananciosos e preguiçosos
Os quantificadores são muito simples à primeira vista, mas na verdade podem ser complicados.

Devemos entender como a busca funciona muito bem se pretendemos procurar por algo mais complexo do que /\d+/.

Vamos tomar a seguinte tarefa como exemplo.

Temos um texto e precisamos substituir todas as aspas "..."por guilhotinas: «...». Eles são preferidos para tipografia em muitos países.

Por exemplo: "Hello, world"deve se tornar «Hello, world». Existem outras citações, como „Witaj, świecie!”(polonês) ou 「你好，世界」(chinês), mas para nossa tarefa vamos escolher «...».

A primeira coisa a fazer é localizar as strings entre aspas, e então podemos substituí-las.

Uma expressão regular como /".+"/g(uma aspa, depois alguma coisa, depois a outra aspa) pode parecer um bom ajuste, mas não é!

Vamos tentar:

let regexp = /".+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch" and her "broom"
…Podemos ver que não funciona como pretendido!

Em vez de encontrar duas correspondências "witch"e "broom", ele encontra uma: "witch" and her "broom".

Isso pode ser descrito como “a ganância é a causa de todos os males”.

Pesquisa gananciosa
Para encontrar uma correspondência, o mecanismo de expressão regular usa o seguinte algoritmo:

Para cada posição na string
Tente combinar o padrão nessa posição.
Se não houver correspondência, vá para a próxima posição.
Essas palavras comuns não tornam óbvio por que o regexp falha, então vamos elaborar como a pesquisa funciona para o padrão ".+".

O primeiro caractere padrão é uma citação ".

O mecanismo de expressão regular tenta localizá-lo na posição zero da string de origem a "witch" and her "broom" is one, mas está alá, então não há correspondência imediatamente.

Em seguida, avança: vai para as próximas posições na string de origem e tenta encontrar o primeiro caractere do padrão ali, falha novamente e, finalmente, encontra a citação na 3ª posição:


A citação é detectada e, em seguida, o mecanismo tenta encontrar uma correspondência para o restante do padrão. Ele tenta ver se o restante da string de assunto está em conformidade com .+".

No nosso caso, o próximo caractere padrão é .(um ponto). Denota “qualquer caractere exceto uma nova linha”, então a próxima letra da string 'w'se encaixa:


Então o ponto se repete por causa do quantificador .+. O mecanismo de expressão regular adiciona à correspondência um caractere após o outro.

…Até quando? Todos os caracteres correspondem ao ponto, então ele só para quando chega ao final da string:


Agora o motor terminou de repetir .+e tenta encontrar o próximo caractere do padrão. É a citação ". Mas há um problema: a string acabou, não há mais caracteres!

O mecanismo de expressão regular entende que demorou demais .+e começa a retroceder .

Em outras palavras, encurta a correspondência para o quantificador em um caractere:


Agora ele assume que .+termina um caractere antes do final da string e tenta combinar o restante do padrão a partir dessa posição.

Se houvesse uma citação ali, a pesquisa terminaria, mas o último caractere é 'e', então não há correspondência.

…Assim, o mecanismo diminui o número de repetições de .+em mais um caractere:


A citação '"'não corresponde 'n'.

O mecanismo continua retrocedendo: diminui a contagem de repetições até '.'que o restante do padrão (no nosso caso '"') corresponda:


A partida está completa.

Portanto, a primeira correspondência é "witch" and her "broom". Se a expressão regular tiver flag g, a pesquisa continuará de onde a primeira correspondência termina. Não há mais aspas no restante da string is one, portanto, não há mais resultados.

Provavelmente não é o que esperávamos, mas é assim que funciona.

No modo guloso (por padrão), um caractere quantificado é repetido tantas vezes quanto possível.

O mecanismo regexp adiciona à correspondência o máximo de caracteres possível para .+, e então reduz um por um, se o restante do padrão não corresponder.

Para nossa tarefa, queremos outra coisa. É aí que um modo preguiçoso pode ajudar.

modo preguiçoso
O modo preguiçoso dos quantificadores é o oposto do modo guloso. Significa: “repita um número mínimo de vezes”.

Podemos ativá-lo colocando um ponto de interrogação '?'após o quantificador, para que se torne *?ou +?ou mesmo ??para '?'.

Para deixar as coisas claras: geralmente um ponto de interrogação ?é um quantificador por si só (zero ou um), mas se adicionado após outro quantificador (ou até mesmo) ele ganha outro significado – ele muda o modo de correspondência de ganancioso para preguiçoso.

O regexp /".+?"/gfunciona como pretendido: encontra "witch"e "broom":

let regexp = /".+?"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch", "broom"
Para entender claramente a mudança, vamos traçar a pesquisa passo a passo.

O primeiro passo é o mesmo: encontra o início do padrão '"'na 3ª posição:


A próxima etapa também é semelhante: o mecanismo encontra uma correspondência para o ponto '.':


E agora a busca é diferente. Como temos um modo preguiçoso para +?, o mecanismo não tenta corresponder a um ponto mais uma vez, mas para e tenta corresponder ao restante do padrão '"'agora:


Se houvesse uma citação ali, a pesquisa terminaria, mas há 'i', então não há correspondência.

Em seguida, o mecanismo de expressão regular aumenta o número de repetições para o ponto e tenta mais uma vez:


Falha novamente. Então o número de repetições é aumentado de novo e de novo…

…Até que a correspondência para o restante do padrão seja encontrada:


A próxima pesquisa começa no final da correspondência atual e produz mais um resultado:


Neste exemplo, vimos como o modo preguiçoso funciona para arquivos +?. Quantificadores *?e ??funcionam de maneira semelhante - o mecanismo regexp aumenta o número de repetições somente se o restante do padrão não puder corresponder na posição especificada.

A preguiça só é habilitada para o quantificador com ?.

Outros quantificadores permanecem gananciosos.

Por exemplo:

alert( "123 456".match(/\d+ \d+?/) ); // 123 4
O padrão \d+tenta combinar o máximo de dígitos possível (modo guloso), então ele encontra 123e para, porque o próximo caractere é um espaço ' '.

Então há um espaço no padrão, ele combina.

Então há \d+?. O quantificador está no modo preguiçoso, então ele encontra um dígito 4e tenta verificar se o resto do padrão combina a partir daí.

…Mas não há nada no padrão depois de \d+?.

O modo preguiçoso não repete nada sem necessidade. O padrão terminou, então terminamos. Temos uma partida 123 4.

Otimizações
Mecanismos de expressão regular modernos podem otimizar algoritmos internos para trabalhar mais rápido. Portanto, eles podem funcionar de maneira um pouco diferente do algoritmo descrito.

Mas para entender como as expressões regulares funcionam e para construir expressões regulares, não precisamos saber disso. Eles são usados ​​apenas internamente para otimizar as coisas.

Expressões regulares complexas são difíceis de otimizar, portanto, a pesquisa também pode funcionar exatamente como descrita.

Abordagem alternativa
Com regexps, geralmente há mais de uma maneira de fazer a mesma coisa.

No nosso caso, podemos encontrar strings entre aspas sem o modo preguiçoso usando o regexp "[^"]+":

let regexp = /"[^"]+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch", "broom"
O regexp "[^"]+"fornece resultados corretos, porque procura uma aspa '"'seguida por uma ou mais não aspas [^"]e, em seguida, a aspa de fechamento.

Quando o mecanismo regexp procura, [^"]+ele interrompe as repetições quando encontra a aspa de fechamento e terminamos.

Observe que essa lógica não substitui os quantificadores preguiçosos!

É apenas diferente. Há momentos em que precisamos de um ou outro.

Vejamos um exemplo em que os quantificadores preguiçosos falham e essa variante funciona corretamente.

Por exemplo, queremos encontrar links do formulário <a href="..." class="doc">, com qualquer href.

Qual expressão regular usar?

A primeira ideia pode ser: /<a href=".*" class="doc">/g.

Vamos verificar:

let str = '...<a href="link" class="doc">...';
let regexp = /<a href=".*" class="doc">/g;

// Works!
alert( str.match(regexp) ); // <a href="link" class="doc">
Funcionou. Mas vamos ver o que acontece se houver muitos links no texto?

let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href=".*" class="doc">/g;

// Whoops! Two links in one match!
alert( str.match(regexp) ); // <a href="link1" class="doc">... <a href="link2" class="doc">
Agora o resultado está errado pelo mesmo motivo do nosso exemplo das “bruxas”. O quantificador .*levou muitos caracteres.

A partida fica assim:

<a href="....................................." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
Vamos modificar o padrão tornando o quantificador .*?preguiçoso:

let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href=".*?" class="doc">/g;

// Works!
alert( str.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
Agora parece funcionar, há duas correspondências:

<a href="....." class="doc">    <a href="....." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
…Mas vamos testá-lo em mais uma entrada de texto:

let str = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let regexp = /<a href=".*?" class="doc">/g;

// Wrong match!
alert( str.match(regexp) ); // <a href="link1" class="wrong">... <p style="" class="doc">
Agora falha. A correspondência inclui não apenas um link, mas também muito texto depois dele, incluindo <p...>.

Por que?

É isso que está acontecendo:

Primeiro, o regexp encontra um link start <a href=".
Em seguida, ele procura por .*?: pega um caractere (preguiçosamente!), verifica se há uma correspondência para " class="doc">(nenhum).
Em seguida, leva outro personagem para .*?, e assim por diante ... até finalmente chegar a " class="doc">.
Mas o problema é: isso já está além do link <a...>, em outra tag <p>. Não o que queremos.

Aqui está a foto da partida alinhada com o texto:

<a href="..................................." class="doc">
<a href="link1" class="wrong">... <p style="" class="doc">
Portanto, precisamos do padrão para procurar <a href="...something..." class="doc">, mas as variantes gananciosas e preguiçosas têm problemas.

A variante correta pode ser: href="[^"]*". Levará todos os caracteres dentro do hrefatributo até a citação mais próxima, exatamente o que precisamos.

Um exemplo de trabalho:

let str1 = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let str2 = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href="[^"]*" class="doc">/g;

// Works!
alert( str1.match(regexp) ); // null, no matches, that's correct
alert( str2.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
Resumo
Os quantificadores têm dois modos de trabalho:

Ambicioso
Por padrão, o mecanismo de expressão regular tenta repetir o caractere quantificado quantas vezes for possível. Por exemplo, \d+consome todos os dígitos possíveis. Quando se torna impossível consumir mais (sem mais dígitos ou final de string), ele continua a corresponder ao restante do padrão. Se não houver correspondência, ele diminui o número de repetições (backtracks) e tenta novamente.
Preguiçoso
Ativado pelo ponto de interrogação ?após o quantificador. O mecanismo regexp tenta corresponder ao restante do padrão antes de cada repetição do caractere quantificado.
Como vimos, o modo preguiçoso não é uma “panaceia” da busca gananciosa. Uma alternativa é uma busca gulosa “afinada”, com exclusões, como no padrão "[^"]+".

*/