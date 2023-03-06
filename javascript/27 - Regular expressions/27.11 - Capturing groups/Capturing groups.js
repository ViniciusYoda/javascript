/*

Capturando grupos
Uma parte de um padrão pode ser colocada entre parênteses (...). Isso é chamado de “grupo de captura”.

Isso tem dois efeitos:

Ele permite obter uma parte da correspondência como um item separado na matriz de resultados.
Se colocarmos um quantificador após os parênteses, ele se aplica aos parênteses como um todo.
Exemplos
Vamos ver como os parênteses funcionam nos exemplos.

Exemplo: gogogo
Sem parênteses, o padrão go+significa gcaractere, seguido de orepetido uma ou mais vezes. Por exemplo, gooooou gooooooooo.

Parênteses agrupam os caracteres, então (go)+significa go, gogo, gogogoe assim por diante.

alert( 'Gogogo now!'.match(/(go)+/ig) ); // "Gogogo"
Exemplo: domínio
Vamos tornar algo mais complexo – uma expressão regular para pesquisar um domínio de site.

Por exemplo:

mail.com
users.mail.com
smith.users.mail.com
Como podemos ver, um domínio consiste em palavras repetidas, um ponto após cada uma, exceto a última.

Em expressões regulares, isso é (\w+\.)+\w+:

let regexp = /(\w+\.)+\w+/g;

alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com
A pesquisa funciona, mas o padrão não pode corresponder a um domínio com um hífen, por exemplo my-site.com, porque o hífen não pertence à classe \w.

Podemos corrigi-lo substituindo \wpor [\w-]em todas as palavras, exceto na última: ([\w-]+\.)+\w+.

Exemplo: e-mail
O exemplo anterior pode ser estendido. Podemos criar uma expressão regular para e-mails com base nela.

O formato do e-mail é: name@domain. Qualquer palavra pode ser o nome, hifens e pontos são permitidos. Em expressões regulares, isso é [-.\w]+.

O padrão:

let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
Esse regexp não é perfeito, mas funciona principalmente e ajuda a corrigir erros de digitação acidentais. A única verificação verdadeiramente confiável de um e-mail só pode ser feita enviando uma carta.

Conteúdo dos parênteses na correspondência
Os parênteses são numerados da esquerda para a direita. O motor de busca memoriza o conteúdo correspondido por cada um deles e permite obtê-lo no resultado.

O método str.match(regexp), se regexpnão tiver sinalizador g, procura a primeira correspondência e a retorna como um array:

No índice 0: a correspondência completa.
No índice 1: o conteúdo dos primeiros parênteses.
No índice 2: o conteúdo do segundo parênteses.
…e assim por diante…
Por exemplo, gostaríamos de encontrar tags HTML <.*?>e processá-las. Seria conveniente ter o conteúdo da tag (o que está dentro dos ângulos), em uma variável separada.

Vamos colocar o conteúdo interno entre parênteses, assim: <(.*?)>.

Agora obteremos a tag como um todo <h1>e seu conteúdo h1no array resultante:

let str = '<h1>Hello, world!</h1>';

let tag = str.match(/<(.*?)>/);

alert( tag[0] ); // <h1>
alert( tag[1] ); // h1
Grupos aninhados
Parênteses podem ser aninhados. Neste caso, a numeração também vai da esquerda para a direita.

Por exemplo, ao pesquisar uma tag em <span class="my">podemos estar interessados ​​em:

O conteúdo da tag como um todo: span class="my".
O nome da etiqueta: span.
Os atributos da marca: class="my".
Vamos adicionar parênteses para eles: <(([a-z]+)\s*([^>]*))>.

Veja como eles são numerados (da esquerda para a direita, pelo parêntese de abertura):


Em ação:

let str = '<span class="my">';

let regexp = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
alert(result[0]); // <span class="my">
alert(result[1]); // span class="my"
alert(result[2]); // span
alert(result[3]); // class="my"
O índice zero de resultsempre contém a correspondência completa.

Em seguida, grupos, numerados da esquerda para a direita por um parêntese de abertura. O primeiro grupo é retornado como result[1]. Aqui ele inclui todo o conteúdo da tag.

Em seguida, result[2]entra o grupo do segundo parêntese de abertura ([a-z]+)– nome da tag e, em seguida, result[3]na tag: ([^>]*).

O conteúdo de cada grupo na string:


Grupos opcionais
Mesmo que um grupo seja opcional e não exista na correspondência (por exemplo, tenha o quantificador (...)?), o resultitem correspondente da matriz está presente e é igual a undefined.

Por exemplo, vamos considerar o regexp a(z)?(c)?. Ele procura "a"opcionalmente seguido por "z"opcionalmente seguido por "c".

Se o executarmos na string com uma única letra a, o resultado será:

let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
alert( match[0] ); // a (whole match)
alert( match[1] ); // undefined
alert( match[2] ); // undefined
A matriz tem o comprimento de 3, mas todos os grupos estão vazios.

E aqui está uma correspondência mais complexa para a string ac:

let match = 'ac'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac (whole match)
alert( match[1] ); // undefined, because there's nothing for (z)?
alert( match[2] ); // c
O comprimento da matriz é permanente: 3. Mas não há nada para o grupo (z)?, então o resultado é ["ac", undefined, "c"].

Pesquisando todas as correspondências com grupos: matchAll
matchAllé um novo método, polyfill pode ser necessário
O método matchAllnão é suportado em navegadores antigos.

Um polyfill pode ser necessário, como https://github.com/ljharb/String.prototype.matchAll .

Quando buscamos todas as correspondências (flag g), o matchmétodo não retorna o conteúdo dos grupos.

Por exemplo, vamos encontrar todas as tags em uma string:

let str = '<h1> <h2>';

let tags = str.match(/<(.*?)>/g);

alert( tags ); // <h1>,<h2>
O resultado é uma matriz de correspondências, mas sem detalhes sobre cada uma delas. Mas na prática geralmente precisamos de conteúdos de captura de grupos no resultado.

Para obtê-los, devemos pesquisar usando o método str.matchAll(regexp).

Foi adicionado à linguagem JavaScript muito tempo depois match, como sua “versão nova e aprimorada”.

Assim como match, ele procura correspondências, mas há 3 diferenças:

Ele retorna não uma matriz, mas um objeto iterável.
Quando o sinalizador gestá presente, ele retorna cada correspondência como uma matriz com grupos.
Se não houver correspondências, ele retornará não null, mas um objeto iterável vazio.
Por exemplo:

let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

// results - is not an array, but an iterable object
alert(results); // [object RegExp String Iterator]

alert(results[0]); // undefined (*)

results = Array.from(results); // let's turn it into array

alert(results[0]); // <h1>,h1 (1st tag)
alert(results[1]); // <h2>,h2 (2nd tag)
Como podemos ver, a primeira diferença é muito importante, conforme demonstrado na linha (*). Não podemos obter a correspondência como results[0], porque esse objeto não é pseudoarray. Podemos transformá-lo em um real Arrayusando Array.from. Há mais detalhes sobre pseudoarrays e iteráveis ​​no artigo Iteráveis .

Não há necessidade Array.fromse estivermos repetindo os resultados:

let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

for(let result of results) {
  alert(result);
  // first alert: <h1>,h1
  // second: <h2>,h2
}
…Ou usando a desestruturação:

let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
Cada correspondência, retornada por matchAll, tem o mesmo formato retornado por matchsem flag g: é uma matriz com propriedades adicionais index(índice de correspondência na string) e input(string de origem):

let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

let [tag1, tag2] = results;

alert( tag1[0] ); // <h1>
alert( tag1[1] ); // h1
alert( tag1.index ); // 0
alert( tag1.input ); // <h1> <h2>
Por que o resultado é matchAllum objeto iterável, não uma matriz?
Por que o método é projetado assim? A razão é simples – para a otimização.

A chamada para matchAllnão realiza a pesquisa. Em vez disso, ele retorna um objeto iterável, sem os resultados inicialmente. A busca é realizada cada vez que iteramos sobre ela, por exemplo, no loop.

Assim, serão encontrados tantos resultados quantos forem necessários, não mais.

Por exemplo, existem potencialmente 100 correspondências no texto, mas em um for..ofloop encontramos 5 delas, então decidimos que é o suficiente e criamos um arquivo break. Assim, o mecanismo não perderá tempo procurando outras 95 correspondências.

Grupos nomeados
Lembrar grupos por seus números é difícil. Para padrões simples é possível, mas para os mais complexos contar parênteses é inconveniente. Temos uma opção muito melhor: dar nomes aos parênteses.

Isso é feito colocando-se ?<name>imediatamente após o parêntese de abertura.

Por exemplo, vamos procurar uma data no formato “ano-mês-dia”:

let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

alert(groups.year); // 2019
alert(groups.month); // 04
alert(groups.day); // 30
Como você pode ver, os grupos residem na .groupspropriedade da partida.

Para procurar todas as datas, podemos adicionar flag g.

Também precisaremos matchAllobter correspondências completas, juntamente com grupos:

let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30 2020-01-01";

let results = str.matchAll(dateRegexp);

for(let result of results) {
  let {year, month, day} = result.groups;

  alert(`${day}.${month}.${year}`);
  // first alert: 30.10.2019
  // second: 01.01.2020
}
Capturando grupos em substituição
O método str.replace(regexp, replacement)que substitui todas as correspondências por regexpin strpermite usar o conteúdo dos parênteses na replacementstring. Isso é feito usando $n, onde né o número do grupo.

Por exemplo,

let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
Para parênteses nomeados, a referência será $<name>.

Por exemplo, vamos reformatar as datas de “ano-mês-dia” para “dia.mês.ano”:

let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
// 30.10.2019, 01.01.2020
Grupos sem captura com ?:
Às vezes, precisamos de parênteses para aplicar corretamente um quantificador, mas não queremos o conteúdo deles nos resultados.

Um grupo pode ser excluído adicionando ?:no início.

Por exemplo, se quisermos encontrar (go)+, mas não quisermos o conteúdo dos parênteses ( go) como um item de array separado, podemos escrever: (?:go)+.

No exemplo abaixo, obtemos apenas o nome Johncomo um membro separado da correspondência:

let str = "Gogogo John!";

// ?: excludes 'go' from capturing
let regexp = /(?:go)+ (\w+)/i;

let result = str.match(regexp);

alert( result[0] ); // Gogogo John (full match)
alert( result[1] ); // John
alert( result.length ); // 2 (no more items in the array)
Resumo
Os parênteses agrupam uma parte da expressão regular, para que o quantificador se aplique a ela como um todo.

Os grupos de parênteses são numerados da esquerda para a direita e, opcionalmente, podem ser nomeados com (?<name>...).

O conteúdo, pareado por um grupo, pode ser obtido nos resultados:

O método str.matchretorna grupos de captura apenas sem sinalizador g.
O método str.matchAllsempre retorna grupos de captura.
Se os parênteses não tiverem nome, seu conteúdo estará disponível na matriz correspondente por seu número. Os parênteses nomeados também estão disponíveis na propriedade groups.

Também podemos usar o conteúdo dos parênteses na string de substituição em str.replace: pelo número $nou pelo nome $<name>.

Um grupo pode ser excluído da numeração adicionando ?:seu início. Isso é usado quando precisamos aplicar um quantificador a todo o grupo, mas não o queremos como um item separado na matriz de resultados. Também não podemos fazer referência a esses parênteses na string de substituição.

*/