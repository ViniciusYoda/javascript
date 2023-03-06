/*

Alternância (OU) |
Alternação é o termo em expressão regular que é na verdade um simples “OU”.

Em uma expressão regular, ele é indicado por um caractere de linha vertical |.

Por exemplo, precisamos encontrar linguagens de programação: HTML, PHP, Java ou JavaScript.

O regexp correspondente: html|php|java(script)?.

Um exemplo de uso:

let regexp = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'
Já vimos algo semelhante – colchetes. Eles permitem escolher entre vários caracteres, por exemplo, gr[ae]ycorrespondências grayou grey.

Os colchetes permitem apenas caracteres ou classes de caracteres. A alternância permite quaisquer expressões. Um regexp A|B|Csignifica uma das expressões A, Bou C.

Por exemplo:

gr(a|e)ysignifica exatamente o mesmo que gr[ae]y.
gra|eysignifica graou ey.
Para aplicar alternância a uma parte escolhida do padrão, podemos colocá-la entre parênteses:

I love HTML|CSSpartidas I love HTMLou CSS.
I love (HTML|CSS)partidas I love HTMLou I love CSS.
Exemplo: regexp para tempo
Em artigos anteriores havia uma tarefa para construir um regexp para pesquisar o tempo no formulário hh:mm, por exemplo 12:00. Mas um simples \d\d:\d\dé muito vago. Ele aceita 25:99como hora (já que 99 minutos correspondem ao padrão, mas essa hora é inválida).

Como podemos fazer um padrão melhor?

Podemos usar uma correspondência mais cuidadosa. Primeiro, os horários:

Se o primeiro dígito for 0ou 1, o próximo dígito pode ser qualquer: [01]\d.
Caso contrário, se o primeiro dígito for 2, o próximo deverá ser [0-3].
(nenhum outro primeiro dígito é permitido)
Podemos escrever ambas as variantes em um regexp usando alternância: [01]\d|2[0-3].

Em seguida, os minutos devem ser de 00a 59. Na linguagem de expressão regular, isso pode ser escrito como [0-5]\d: o primeiro dígito 0-5e depois qualquer dígito.

Se juntarmos horas e minutos, obtemos o padrão: [01]\d|2[0-3]:[0-5]\d.

Estamos quase terminando, mas há um problema. A alternância |agora passa a ser entre [01]\de 2[0-3]:[0-5]\d.

Ou seja: minutos são adicionados à segunda variante de alternância, aqui está uma imagem clara:

[01]\d  |  2[0-3]:[0-5]\d
Esse padrão procura [01]\dou 2[0-3]:[0-5]\d.

Mas está errado, a alternância só deve ser usada na parte “horas” da expressão regular, para permitir [01]\dOR 2[0-3]. Vamos corrigir isso colocando “horas” entre parênteses: ([01]\d|2[0-3]):[0-5]\d.

A solução final:

let regexp = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(regexp)); // 00:00,10:10,23:59

*/

