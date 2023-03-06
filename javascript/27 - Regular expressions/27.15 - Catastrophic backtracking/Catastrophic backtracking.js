/*

Retrocesso catastrófico
Algumas expressões regulares parecem simples, mas podem ser executadas por muuuuito longo tempo e até mesmo “travar” o mecanismo JavaScript.

Mais cedo ou mais tarde, a maioria dos desenvolvedores ocasionalmente enfrenta esse tipo de comportamento. O sintoma típico – uma expressão regular funciona bem às vezes, mas para certas strings ela “trava”, consumindo 100% da CPU.

Nesse caso, um navegador da Web sugere encerrar o script e recarregar a página. Não é uma coisa boa com certeza.

Para JavaScript do lado do servidor, esse regexp pode travar o processo do servidor, o que é ainda pior. Portanto, definitivamente devemos dar uma olhada nisso.

Exemplo
Digamos que temos uma string e gostaríamos de verificar se ela consiste em palavras \w+com um espaço opcional \s?após cada uma.

Uma maneira óbvia de construir um regexp seria pegar uma palavra seguida por um espaço opcional \w+\s?e repeti-la com *.

Isso nos leva ao regexp ^(\w+\s?)*$, ele especifica zero ou mais dessas palavras, que começam no início ^e terminam no final $da linha.

Em ação:

let regexp = /^(\w+\s?)*$/;

alert( regexp.test("A good string") ); // true
alert( regexp.test("Bad characters: $@#") ); // false
O regexp parece funcionar. O resultado está correto. Embora, em certas cordas, leve muito tempo. Tanto tempo que o mecanismo JavaScript “trava” com 100% de consumo de CPU.

Se você executar o exemplo abaixo, provavelmente não verá nada, pois o JavaScript simplesmente “travará”. Um navegador da Web parará de reagir a eventos, a interface do usuário parará de funcionar (a maioria dos navegadores permite apenas a rolagem). Depois de algum tempo, ele sugerirá recarregar a página. Então tome cuidado com isso:

let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp hang!";

// will take a very long time
alert( regexp.test(str) );
Para ser justo, observemos que alguns mecanismos de expressão regular podem lidar com essa pesquisa de maneira eficaz, por exemplo, a versão do mecanismo V8 a partir de 8.8 pode fazer isso (portanto, o Google Chrome 88 não trava aqui), enquanto o navegador Firefox trava.

Exemplo simplificado
Qual é o problema? Por que a expressão regular trava?

Para entender isso, vamos simplificar o exemplo: remova os espaços \s?. Então torna-se ^(\w+)*$.

E, para tornar as coisas mais óbvias, vamos substituir \wpor \d. A expressão regular resultante ainda trava, por exemplo:

let regexp = /^(\d+)*$/;

let str = "012345678901234567890123456789z";

// will take a very long time (careful!)
alert( regexp.test(str) );
Então, o que há de errado com o regexp?

Primeiro, pode-se notar que o regexp (\d+)*é um pouco estranho. O quantificador *parece estranho. Se quisermos um número, podemos usar \d+.

De fato, o regexp é artificial; nós conseguimos simplificando o exemplo anterior. Mas a razão pela qual é lento é a mesma. Então vamos entender, e então o exemplo anterior ficará óbvio.

O que acontece durante a busca ^(\d+)*$na linha 123456789z(um pouco abreviada para maior clareza, observe um caractere não numérico zno final, é importante), por que demora tanto?

Aqui está o que o mecanismo regexp faz:

Primeiro, o mecanismo regexp tenta encontrar o conteúdo dos parênteses: o número \d+. O plus +é ganancioso por padrão, então consome todos os dígitos:

\d+.......
(123456789)z
Após todos os dígitos serem consumidos, \d+é considerado encontrado (como 123456789).

Em seguida, o quantificador de estrela (\d+)*se aplica. Mas não há mais dígitos no texto, então a estrela não dá nada.

O próximo caractere no padrão é o final da string $. Mas no texto temos zem vez disso, então não há correspondência:

           X
\d+........$
(123456789)z
Como não há correspondência, o quantificador ganancioso +diminui a contagem de repetições, retrocede um caractere.

Agora \d+pega todos os dígitos, exceto o último ( 12345678):

\d+.......
(12345678)9z
Em seguida, o motor tenta continuar a busca a partir da próxima posição (logo após 12345678).

A estrela (\d+)*pode ser aplicada – dá mais uma correspondência de \d+, o número 9:

\d+.......\d+
(12345678)(9)z
O mecanismo tenta corresponder $novamente, mas falha, porque atende z:

             X
\d+.......\d+
(12345678)(9)z
Não há correspondência, então o motor continuará retrocedendo, diminuindo o número de repetições. O backtracking geralmente funciona assim: o último quantificador guloso diminui o número de repetições até atingir o mínimo. Em seguida, o quantificador guloso anterior diminui e assim por diante.

Todas as combinações possíveis são tentadas. Aqui estão seus exemplos.

O primeiro número \d+tem 7 dígitos e, em seguida, um número de 2 dígitos:

             X
\d+......\d+
(1234567)(89)z
O primeiro número tem 7 dígitos e, em seguida, dois números de 1 dígito cada:

               X
\d+......\d+\d+
(1234567)(8)(9)z
O primeiro número tem 6 dígitos e, em seguida, um número de 3 dígitos:

             X
\d+.......\d+
(123456)(789)z
O primeiro número tem 6 dígitos e, em seguida, 2 números:

               X
\d+.....\d+ \d+
(123456)(78)(9)z
…E assim por diante.

Existem muitas maneiras de dividir uma sequência de dígitos 123456789em números. Para ser preciso, existem , onde é o comprimento da sequência.2n-1n

Pois 123456789temos n=9, que dá 511 combinações.
Para uma sequência mais longa, n=20há cerca de um milhão (1048575) de combinações.
Para n=30– mil vezes mais (1073741823 combinações).
Experimentar cada um deles é exatamente o motivo pelo qual a busca demora tanto.

Voltar para palavras e strings
Algo semelhante acontece em nosso primeiro exemplo, quando procuramos palavras por padrão ^(\w+\s?)*$na string An input that hangs!.

A razão é que uma palavra pode ser representada como uma \w+ou várias:

(input)
(inpu)(t)
(inp)(u)(t)
(in)(p)(ut)
...
Para um ser humano, é óbvio que pode não haver correspondência, porque a string termina com um sinal de exclamação !, mas a expressão regular espera um caractere de palavras \wou um espaço \sno final. Mas o motor não sabe disso.

Ele tenta todas as combinações de como a regexp (\w+\s?)*pode “consumir” a string, incluindo variantes com espaços (\w+\s)*e sem eles (\w+)*(porque os espaços \s?são opcionais). Como existem muitas dessas combinações (já vimos com dígitos), a busca leva muito tempo.

O que fazer?

Devemos ativar o modo preguiçoso?

Infelizmente, isso não ajudará: se substituirmos \w+por \w+?, o regexp ainda travará. A ordem das combinações mudará, mas não sua contagem total.

Alguns mecanismos de expressão regular têm testes complicados e automações finitas que permitem evitar todas as combinações ou torná-lo muito mais rápido, mas a maioria dos mecanismos não o faz e nem sempre ajuda.

Como consertar?
Existem duas abordagens principais para corrigir o problema.

A primeira é diminuir o número de combinações possíveis.

Vamos tornar o espaço não opcional reescrevendo a expressão regular como ^(\w+\s)*\w*$– procuraremos qualquer número de palavras seguidas por um espaço (\w+\s)*e, em seguida, (opcionalmente) uma palavra final \w*.

Este regexp é equivalente ao anterior (corresponde ao mesmo) e funciona bem:

let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false
Por que o problema desapareceu?

Isso porque agora o espaço é obrigatório.

O regexp anterior, se omitirmos o espaço, torna-se (\w+)*, levando a muitas combinações \w+dentro de uma única palavra

So inputpode ser combinado como duas repetições de \w+, assim:

\w+  \w+
(inp)(ut)
O novo padrão é diferente: (\w+\s)*especifica repetições de palavras seguidas de um espaço! A inputstring não pode corresponder a duas repetições de \w+\s, porque o espaço é obrigatório.

O tempo necessário para tentar várias combinações (na verdade, a maioria delas) agora é economizado.

Evitando retrocesso
Porém, nem sempre é conveniente reescrever um regexp. No exemplo acima foi fácil, mas nem sempre é óbvio como fazer.

Além disso, um regexp reescrito geralmente é mais complexo e isso não é bom. Regexps são complexos o suficiente sem esforços extras.

Felizmente, há uma abordagem alternativa. Podemos proibir o retrocesso para o quantificador.

A raiz do problema é que o mecanismo regexp tenta muitas combinações que obviamente são erradas para um ser humano.

Por exemplo, no regexp (\d+)*$é óbvio para um ser humano, que +não deve voltar atrás. Se substituirmos um \d+por dois separados \d+\d+, nada muda:

\d+........
(123456789)!

\d+...\d+....
(1234)(56789)!
E no exemplo original, ^(\w+\s?)*$podemos proibir o retrocesso em \w+. Ou seja: \w+deve corresponder a uma palavra inteira, com o comprimento máximo possível. Não há necessidade de diminuir a contagem de repetições \w+ou dividi-la em duas palavras \w+\w+e assim por diante.

Mecanismos de expressão regular modernos suportam quantificadores possessivos para isso. Os quantificadores regulares tornam-se possessivos se adicionarmos +depois deles. Ou seja, usamos \d++em vez de \d+para parar +de retroceder.

Os quantificadores possessivos são de fato mais simples que os “regulares”. Eles apenas combinam o máximo que podem, sem qualquer retrocesso. O processo de busca sem retrocesso é mais simples.

Existem também os chamados “grupos de captura atômica” – uma maneira de desativar o retrocesso entre parênteses.

…Mas a má notícia é que, infelizmente, em JavaScript eles não são suportados.

Podemos imitá-los usando uma “transformação antecipada”.

Olhe à frente para o resgate!
Então chegamos a tópicos realmente avançados. Gostaríamos de um quantificador, como +não retroceder, porque às vezes retroceder não faz sentido.

O padrão para fazer o máximo de repetições \wpossível sem retroceder é: (?=(\w+))\1. Claro, poderíamos pegar outro padrão em vez de \w.

Isso pode parecer estranho, mas na verdade é uma transformação muito simples.

Vamos decifrá-lo:

Lookahead ?=aguarda a palavra mais longa \w+começando na posição atual.
O conteúdo dos parênteses com ?=...não é memorizado pelo mecanismo, então coloque \w+entre parênteses. Então o motor irá memorizar seu conteúdo
…E nos permite referenciar isso no padrão como \1.
Isto é: olhamos para a frente – e se houver uma palavra \w+, então combine-a como \1.

Por que? Isso ocorre porque o lookahead encontra uma palavra \w+como um todo e nós a capturamos no padrão com \1. Então, basicamente implementamos um +quantificador possessivo mais. Ele captura apenas a palavra inteira \w+, não uma parte dela.

Por exemplo, na palavra JavaScriptpode não apenas corresponder a Java, mas deixar de fora Scriptpara corresponder ao restante do padrão.

Aqui está a comparação de dois padrões:

alert( "JavaScript".match(/\w+Script/)); // JavaScript
alert( "JavaScript".match(/(?=(\w+))\1Script/)); // null
Na primeira variante, \w+primeiro captura a palavra inteira JavaScript, mas depois +retrocede caractere por caractere, para tentar corresponder ao restante do padrão, até que finalmente seja bem-sucedido (quando \w+corresponde a Java).
Na segunda variante (?=(\w+))olha para frente e encontra a palavra JavaScript, que é incluída no padrão como um todo por \1, então não há como encontrar Scriptdepois dela.
Podemos colocar uma expressão regular mais complexa em (?=(\w+))\1vez de \w, quando precisamos proibir o retrocesso +depois dela.

Observe:
Há mais informações sobre a relação entre quantificadores possessivos e lookahead nos artigos Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead and Mimicing Atomic Groups .

Vamos reescrever o primeiro exemplo usando lookahead para evitar retrocesso:

let regexp = /^((?=(\w+))\2\s?)*$/;

alert( regexp.test("A good string") ); // true

let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false, works and fast!
Aqui \2é usado em vez de \1, porque há parênteses externos adicionais. Para evitar confusão com os números, podemos dar um nome aos parênteses, por exemplo (?<word>\w+), .

// parentheses are named ?<word>, referenced as \k<word>
let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false

alert( regexp.test("A correct string") ); // true
O problema descrito neste artigo é chamado de “backtracking catastrófico”.

Cobrimos duas maneiras de resolvê-lo:

Reescreva o regexp para diminuir a contagem de combinações possíveis.
Evite o retrocesso.

*/