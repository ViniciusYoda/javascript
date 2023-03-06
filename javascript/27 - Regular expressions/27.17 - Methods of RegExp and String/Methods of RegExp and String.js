/*

Métodos de RegExp e String
Neste artigo, abordaremos vários métodos que funcionam com regexps em profundidade.

str.match(regexp)
O método str.match(regexp)encontra correspondências para regexpna string str.

Possui 3 modos:

Se o regexpnão tiver flag g, ele retornará a primeira correspondência como uma matriz com grupos de captura e propriedades index(posição da correspondência), input(string de entrada, igual a str):

let str = "I love JavaScript";

let result = str.match(/Java(Script)/);

alert( result[0] );     // JavaScript (full match)
alert( result[1] );     // Script (first capturing group)
alert( result.length ); // 2

// Additional information:
alert( result.index );  // 7 (match position)
alert( result.input );  // I love JavaScript (source string)
Se regexptiver flag g, ele retornará uma matriz de todas as correspondências como strings, sem capturar grupos e outros detalhes.

let str = "I love JavaScript";

let result = str.match(/Java(Script)/g);

alert( result[0] ); // JavaScript
alert( result.length ); // 1
Se não houver correspondências, não importa se há bandeira gou não, nullé retornado.

Essa é uma nuance importante. Se não houver correspondências, não obteremos uma matriz vazia, mas null. É fácil cometer um erro esquecendo-se disso, por exemplo:

let str = "I love JavaScript";

let result = str.match(/HTML/);

alert(result); // null
alert(result.length); // Error: Cannot read property 'length' of null
Se quisermos que o resultado seja um array, podemos escrever assim:

let result = str.match(regexp) || [];
str.matchAll(regexp)
Uma adição recente
Esta é uma adição recente à linguagem. Navegadores antigos podem precisar de polyfills .
O método str.matchAll(regexp)é uma variante “mais recente e aprimorada” do str.match.

É usado principalmente para procurar todas as correspondências com todos os grupos.

Existem 3 diferenças de match:

Ele retorna um objeto iterável com correspondências em vez de uma matriz. Podemos fazer um array regular a partir dele usando Array.from.
Cada correspondência é retornada como uma matriz com grupos de captura (o mesmo formato str.matchsem sinalizador g).
Se não houver resultados, ele retornará um objeto iterável vazio em vez de null.
Exemplo de uso:

let str = '<h1>Hello, world!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

alert(matchAll); // [object RegExp String Iterator], not array, but an iterable

matchAll = Array.from(matchAll); // array now

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Hello, world!</h1>
Se usarmos for..ofpara repetir matchAllcorrespondências, não precisamos Array.fromde mais.

str.split(regexp|substr, limite)
Divide a string usando o regexp (ou uma substring) como delimitador.

Podemos usar splitcom strings, assim:

alert('12-34-56'.split('-')) // array of ['12', '34', '56']
Mas podemos dividir por uma expressão regular, da mesma forma:

alert('12, 34, 56'.split(/,\s*//*)) // array of ['12', '34', '56']
str.search(regexp)
O método str.search(regexp)retorna a posição da primeira correspondência ou -1se nenhuma for encontrada:

let str = "A drop of ink may make a million think";

alert( str.search( /ink/i ) ); // 10 (first match position)
A limitação importante: searchencontra apenas a primeira correspondência.

Se precisarmos de posições de correspondências adicionais, devemos usar outros meios, como encontrá-los todos com str.matchAll(regexp).

str.replace(str|regexp, str|func)
Este é um método genérico para pesquisar e substituir, um dos mais úteis. O canivete suíço para procurar e substituir.

Podemos usá-lo sem regexps, para pesquisar e substituir uma substring:

// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56
Há uma armadilha embora.

Quando o primeiro argumento de replacefor uma string, ele substituirá apenas a primeira correspondência.

Você pode ver isso no exemplo acima: apenas o primeiro "-"é substituído por ":".

Para encontrar todos os hífens, precisamos usar não a string "-", mas uma regexp /-/g, com o gsinalizador obrigatório:

// replace all dashes by a colon
alert( '12-34-56'.replace( /-/g, ":" ) )  // 12:34:56
O segundo argumento é uma string de substituição. Podemos usar caracteres especiais nele:

Símbolos	Ação na string de substituição
$&	insere a partida inteira
$`	insere uma parte da string antes da correspondência
$'	insere uma parte da string após a correspondência
$n	se nfor um número de 1 a 2 dígitos, insere o conteúdo do n-ésimo grupo de captura, para obter detalhes, consulte Capturar grupos
$<name>	insere o conteúdo dos parênteses com o dado name, para detalhes veja Capturando grupos
$$	insere caractere$
Por exemplo:

let str = "John Smith";

// swap first and last name
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
Para situações que requerem substituições “inteligentes”, o segundo argumento pode ser uma função.

Ele será chamado para cada correspondência e o valor retornado será inserido como substituto.

A função é chamada com argumentos func(match, p1, p2, ..., pn, offset, input, groups):

match- o jogo,
p1, p2, ..., pn– conteúdo dos grupos de captura (se houver),
offset– posição da partida,
input– a cadeia de origem,
groups– um objeto com grupos nomeados.
Se não houver parênteses no regexp, haverá apenas 3 argumentos: func(str, offset, input).

Por exemplo, vamos colocar todas as correspondências em maiúsculas:

let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
Substitua cada correspondência por sua posição na string:

alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
No exemplo abaixo há dois parênteses, então a função de substituição é chamada com 5 argumentos: o primeiro é a correspondência completa, depois 2 parênteses e depois dele (não usado no exemplo) a posição da correspondência e a string de origem:

let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
Se houver muitos grupos, é conveniente usar parâmetros rest para acessá-los:

let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
Ou, se estivermos usando grupos nomeados, o groupsobjeto com eles é sempre o último, para que possamos obtê-lo assim:

let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
Usar uma função nos dá o poder de substituição final, porque obtém todas as informações sobre a correspondência, tem acesso a variáveis ​​externas e pode fazer tudo.

str.replaceAll(str|regexp, str|func)
Esse método é essencialmente o mesmo que str.replace, com duas diferenças principais:

Se o primeiro argumento for uma string, ele substituirá todas as ocorrências da string, enquanto replacesubstituirá apenas a primeira ocorrência .
Se o primeiro argumento for uma expressão regular sem o gsinalizador, haverá um erro. Com gsinalizador, funciona da mesma forma que replace.
O principal caso de uso replaceAllé substituir todas as ocorrências de uma string.

Assim:

// replace all dashes by a colon
alert('12-34-56'.replaceAll("-", ":")) // 12:34:56
regexp.exec(str)
O regexp.exec(str)método retorna uma correspondência para regexpna string str. Ao contrário dos métodos anteriores, ele é chamado em um regexp, não em uma string.

Ele se comporta de maneira diferente dependendo se o regexp tem flag g.

Se não houver g, regexp.exec(str)retorna a primeira correspondência exatamente como str.match(regexp). Esse comportamento não traz nada de novo.

Mas se houver flag g, então:

Uma chamada para regexp.exec(str)retorna a primeira correspondência e salva a posição imediatamente após ela na propriedade regexp.lastIndex.
A próxima chamada inicia a pesquisa da posição regexp.lastIndex, retorna a próxima correspondência e salva a posição depois dela em regexp.lastIndex.
…E assim por diante.
Se não houver correspondências, regexp.execretorna nulle redefine regexp.lastIndexpara 0.
Portanto, chamadas repetidas retornam todas as correspondências, uma após a outra, usando a propriedade regexp.lastIndexpara acompanhar a posição de pesquisa atual.

No passado, antes de o método str.matchAllser adicionado ao JavaScript, as chamadas de regexp.execeram usadas no loop para obter todas as correspondências com grupos:

let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found JavaScript at position 11, then
  // Found javascript at position 33
}
Isso também funciona agora, embora para navegadores mais novos str.matchAllgeralmente seja mais conveniente.

Podemos usar regexp.execpara pesquisar a partir de uma determinada posição definindo manualmente lastIndex.

Por exemplo:

let str = 'Hello, world!';

let regexp = /\w+/g; // without flag "g", lastIndex property is ignored
regexp.lastIndex = 5; // search from 5th position (from the comma)

alert( regexp.exec(str) ); // world
Se o regexp tiver flag y, a pesquisa será realizada exatamente na posição regexp.lastIndex, e não mais.

Vamos substituir flag gpor yno exemplo acima. Não haverá correspondências, pois não há palavra na posição 5:

let str = 'Hello, world!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // search exactly at position 5

alert( regexp.exec(str) ); // null
Isso é conveniente para situações em que precisamos “ler” algo da string por um regexp na posição exata, não em algum outro lugar.

regexp.test(str)
O método regexp.test(str)procura uma correspondência e retorna true/falsese ela existe.

Por exemplo:

let str = "I love JavaScript";

// these two tests do the same
alert( /love/i.test(str) ); // true
alert( str.search(/love/i) != -1 ); // true
Um exemplo com a resposta negativa:

let str = "Bla-bla-bla";

alert( /love/i.test(str) ); // false
alert( str.search(/love/i) != -1 ); // false
Se o regexp tiver sinalizador g, regexp.testprocure na regexp.lastIndexpropriedade e atualize essa propriedade, assim como regexp.exec.

Assim, podemos usá-lo para pesquisar a partir de uma determinada posição:

let regexp = /love/gi;

let str = "I love JavaScript";

// start the search from position 10:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (no match)
O mesmo regexp global testado repetidamente em diferentes fontes pode falhar
Se aplicarmos o mesmo regexp global a diferentes entradas, isso pode levar a um resultado errado, porque regexp.testa chamada avança regexp.lastIndexa propriedade, portanto, a pesquisa em outra string pode começar de uma posição diferente de zero.

Por exemplo, aqui chamamos regexp.testduas vezes o mesmo texto e a segunda vez falha:

let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
alert( regexp.test("javascript") ); // false
Isso é exatamente porque regexp.lastIndexé diferente de zero no segundo teste.

Para contornar isso, podemos definir regexp.lastIndex = 0antes de cada pesquisa. Ou, em vez de chamar métodos no regexp, use métodos de stringstr.match/search/... , eles não usam lastIndex.

*/