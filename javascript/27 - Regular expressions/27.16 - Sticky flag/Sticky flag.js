/*

Sinalizador fixo "y", pesquisando na posição
O sinalizador ypermite realizar a pesquisa na posição especificada na string de origem.

Para entender o caso de uso de yflag e entender melhor as formas de regexps, vamos explorar um exemplo prático.

Uma das tarefas comuns para regexps é a “análise léxica”: obtemos um texto, por exemplo, em uma linguagem de programação, e precisamos encontrar seus elementos estruturais. Por exemplo, o HTML possui tags e atributos, o código JavaScript possui funções, variáveis ​​e assim por diante.

Escrever analisadores léxicos é uma área especial, com ferramentas e algoritmos próprios, por isso não nos aprofundamos nisso, mas há uma tarefa comum: ler algo na posição dada.

Por exemplo, temos uma string de código let varName = "value"e precisamos ler o nome da variável dela, que começa na posição 4.

Procuraremos o nome da variável usando regexp \w+. Na verdade, os nomes de variáveis ​​JavaScript precisam de um regexp um pouco mais complexo para uma correspondência precisa, mas aqui isso não importa.

Uma chamada para str.match(/\w+/)encontrará apenas a primeira palavra na linha ( let). Não é isso.
Podemos adicionar a bandeira g. Mas então a chamada str.match(/\w+/g)procurará todas as palavras no texto, enquanto precisamos de uma palavra na posição 4. Novamente, não é o que precisamos.
Então, como procurar um regexp exatamente na posição especificada?

Vamos tentar usar o método regexp.exec(str).

Para a regexpsem sinalizadores ge y, este método procura apenas pela primeira correspondência, funciona exatamente como str.match(regexp).

…Mas se houver flag g, então ele realiza a busca em str, partindo da posição armazenada na regexp.lastIndexpropriedade. E, se encontrar uma correspondência, define regexp.lastIndexo índice imediatamente após a correspondência.

Ou seja, regexp.lastIndexserve como ponto de partida para a busca, que a cada regexp.exec(str)chamada redefine para o novo valor (“após a última correspondência”). Isso só se houver gbandeira, claro.

Assim, chamadas sucessivas para regexp.exec(str)retornar partidas uma após a outra.

Aqui está um exemplo dessas chamadas:

let str = 'let varName'; // Let's find all words in this string
let regexp = /\w+/g;

alert(regexp.lastIndex); // 0 (initially lastIndex=0)

let word1 = regexp.exec(str);
alert(word1[0]); // let (1st word)
alert(regexp.lastIndex); // 3 (position after the match)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (2nd word)
alert(regexp.lastIndex); // 11 (position after the match)

let word3 = regexp.exec(str);
alert(word3); // null (no more matches)
alert(regexp.lastIndex); // 0 (resets at search end)
Podemos obter todas as correspondências no loop:

let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found let at position 0, then
  // Found varName at position 4
}
Esse uso de regexp.execé uma alternativa ao método str.matchAll, com um pouco mais de controle sobre o processo.

Voltemos à nossa tarefa.

Podemos definir manualmente lastIndexpara 4, para iniciar a pesquisa a partir da posição fornecida!

Assim:

let str = 'let varName = "value"';

let regexp = /\w+/g; // without flag "g", property lastIndex is ignored

regexp.lastIndex = 4;

let word = regexp.exec(str);
alert(word); // varName
Viva! Problema resolvido!

Realizamos uma busca de \w+, partindo da posição regexp.lastIndex = 4.

O resultado está correto.

…Mas espere, não tão rápido.

Observe: a regexp.execchamada começa a procurar na posição lastIndexe depois continua. Se não houver palavra na posição lastIndex, mas estiver em algum lugar depois dela, ela será encontrada:

let str = 'let varName = "value"';

let regexp = /\w+/g;

// start the search from position 3
regexp.lastIndex = 3;

let word = regexp.exec(str);
// found the match at position 4
alert(word[0]); // varName
alert(word.index); // 4
Para algumas tarefas, incluindo a análise léxica, isso está errado. Precisamos encontrar uma correspondência exatamente na posição especificada no texto, não em algum lugar depois dela. E é ypara isso que serve a bandeira.

A flag yfaz regexp.execa busca exatamente na posição lastIndex, não “começando” dela.

Aqui está a mesma pesquisa com bandeira y:

let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null (there's a space at position 3, not a word)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (word at position 4)
Como podemos ver, regexp /\w+/ynão corresponde a position 3(diferente de flag g), mas corresponde a position 4.

Não só é disso que precisamos, há um importante ganho de desempenho ao usar flag y.

Imagine, temos um texto longo e não há nenhuma correspondência nele. Então uma busca com flag girá até o final do texto e não encontrará nada, e isso levará muito mais tempo do que a busca com flag y, que verifica apenas a posição exata.

Em tarefas como análise léxica, costuma haver muitas buscas em uma posição exata, para verificar o que temos ali. Usar flag yé a chave para implementações corretas e um bom desempenho.

*/