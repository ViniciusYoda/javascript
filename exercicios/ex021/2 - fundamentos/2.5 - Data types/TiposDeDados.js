//Tipos de dados

// Um valor em JavaScript é sempre de um determinado tipo. Por exemplo, uma string ou um número.

//Existem oito tipos de dados básicos em JavaScript. Aqui, vamos abordá-los em geral e nos próximos capítulos vamos falar sobre cada um deles em detalhes.

//Podemos colocar qualquer tipo em uma variável. Por exemplo, uma variável pode em um momento ser uma string e então armazenar um número:

// no error
let message = "hello";
message = 12345;

// As linguagens de programação que permitem tais coisas, como JavaScript, são chamadas de “tipadas dinamicamente”, o que significa que existem tipos de dados, mas as variáveis ​​não estão vinculadas a nenhum deles.

// Números

let n = 123;
n = 12.345;

// O tipo de número representa números inteiros e de ponto flutuante.

//Existem muitas operações para números, por exemplo, multiplicação *, divisão /, adição +, subtração -e assim por diante.

//Além dos números regulares, existem os chamados “valores numéricos especiais” que também pertencem a este tipo de dados: Infinity, -Infinitye NaN.

//Infinityrepresenta o infinito matemático ∞. É um valor especial que é maior que qualquer número.

//Podemos obtê-lo como resultado da divisão por zero:

alert( 1 / 0 ); // Infinity

// Ou apenas referenciá-lo diretamente:

alert( Infinity ); // Infinity

// NaN representa um erro computacional. É resultado de uma operação matemática incorreta ou indefinida, por exemplo:

alert( "not a number" / 2); // Nan, such a division is erroneous

// NaN é pegajoso. Qualquer outra operação matemática sobre NaN retorna NaN:

alert( NaN + 1); // NaN
alert( 3 * NaN ); // NaN
alert( "not a number" / 2 - 1); // NaN

// Então, se houver um NaN em algum lugar em uma expressão matemática, ele se propaga para todo o resultado (há apenas uma exceção a isso: NaN ** 0 is 1).

// Operações matemáticas são seguras
// Fazer matemática é “seguro” em JavaScript. Podemos fazer qualquer coisa: dividir por zero, tratar strings não numéricas como números, etc.

//O script nunca irá parar com um erro fatal (“morrer”). Na pior das hipóteses, teremos NaNcomo resultado.

// Valores numéricos especiais pertencem formalmente ao tipo “número”. Claro que não são números no sentido comum desta palavra.

// Veremos mais sobre como trabalhar com números no capítulo Números .

//BigIntName
//Em JavaScript, o tipo “number” não pode representar valores inteiros maiores que (isto é ), ou menores que para negativos. É uma limitação técnica causada por sua representação interna.(2^53-1)9007199254740991 -(2^53-1)

//Para a maioria dos propósitos, isso é suficiente, mas às vezes precisamos de números realmente grandes, por exemplo, para criptografia ou carimbos de data e hora com precisão de microssegundos.

//BigInt type foi adicionado recentemente à linguagem para representar inteiros de comprimento arbitrário.

//Um BigInt valor é criado anexando nao final de um inteiro:

// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;

// Como BigIntos números raramente são necessários, não os abordamos aqui, mas dedicamos a eles um capítulo separado BigInt . Leia-o quando precisar de números tão grandes.

// Problemas de compatibilidade
//No momento, BigInté suportado no Firefox/Chrome/Edge/Safari, mas não no IE.

// Você pode verificar a tabela de compatibilidade do MDN BigInt para saber quais versões de um navegador são suportadas.

//Corda
//Uma string em JavaScript deve estar entre aspas.

let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;

//Em JavaScript, existem 3 tipos de citações.

//1.Aspas duplas: "Hello".
//2.Aspas simples: 'Hello'.
//3.Retrocessos: `Hello`.
//Aspas simples e duplas são aspas “simples”. Praticamente não há diferença entre eles em JavaScript.

//Backticks são citações de “funcionalidade estendida”. Eles nos permitem incorporar variáveis ​​e expressões em uma string envolvendo-as em ${…}, por exemplo:

let name = "John";

// embed a variable
alert( `Hello, ${name}!` ); // Hello, John!

// embed an expression
alert( `the result is ${1 + 2}` ); // the result is 3

// A expressão interna ${…} é avaliada e o resultado se torna parte da string. Podemos colocar qualquer coisa lá: uma variável como nameou uma expressão aritmética como 1 + 2ou algo mais complexo.

//Por favor, note que isso só pode ser feito em backticks. Outras cotações não têm essa funcionalidade de incorporação!

alert( 'the result is ${1 + 2}');  // the result is ${1 + 2} (double quotes do nothing)

// Abordaremos as strings mais detalhadamente no capítulo Strings .

//Não há tipo de caractere .
//Em alguns idiomas, existe um tipo especial de “caractere” para um único caractere. Por exemplo, na linguagem C e em Java é chamado de “char”.

//Em JavaScript, não existe esse tipo. Só existe um tipo: string. Uma string pode consistir em zero caracteres (estar vazio), um caractere ou muitos deles.

//Booleano (tipo lógico)
//O tipo booleano tem apenas dois valores: true e false.

//Este tipo é comumente usado para armazenar valores sim/não: true significa “sim, correto” e false significa “não, incorreto”.

//Por exemplo:

let nameFieldChecked = true; // yes, name field is checked
let ageFieldChecked = false; // no, age field is not checked

//Os valores booleanos também vêm como resultado de comparações:

let isGreater = 4 > 1;

alert( isGreater ); // true (the comparison result is "yes")

// Abordaremos os booleanos mais profundamente no capítulo Operadores lógicos .

// O valor “nulo”
//O null valor especial não pertence a nenhum dos tipos descritos acima.

//Ele forma um tipo separado próprio que contém apenas o null valor:

let age = null;

// Em JavaScript, nullnão é uma “referência a um objeto inexistente” ou um “ponteiro nulo” como em algumas outras linguagens.

// É apenas um valor especial que representa “nada”, “vazio” ou “valor desconhecido”.

// O código acima indica que ageé desconhecido.

//O valor “indefinido”
// O valor especial undefined também se destaca. Faz um tipo próprio, assim como null.

//O significado de undefined é “valor não atribuído”.

//Se uma variável é declarada, mas não atribuída, seu valor é undefined:

let a;

alert(a); // shows "undefined"

//Tecnicamente, é possível atribuir explicitamente undefined a uma variável:

let b = 100

// change the valut to undefined
b = undefined;

alert(b); // "undefined"

// …Mas não recomendamos fazer isso. Normalmente, costuma null-se atribuir um valor “vazio” ou “desconhecido” a uma variável, enquanto undefinedé reservado como valor inicial padrão para coisas não atribuídas.

// Objetos e Símbolos
//O object tipo é especial.

//Todos os outros tipos são chamados de “primitivos” porque seus valores podem conter apenas uma única coisa (seja uma string ou um número ou qualquer outra coisa). Em contraste, os objetos são usados ​​para armazenar coleções de dados e entidades mais complexas.

//Sendo tão importante, os objetos merecem um tratamento especial. Nós vamos lidar com eles mais tarde no capítulo Objetos , depois que aprendermos mais sobre primitivas.

//O symbol tipo é usado para criar identificadores exclusivos para objetos. Temos que mencioná-lo aqui por uma questão de completude, mas também adiar os detalhes até conhecermos os objetos.

//O tipo de operador
//O typeof operador retorna o tipo do argumento. É útil quando queremos processar valores de diferentes tipos de forma diferente ou apenas queremos fazer uma verificação rápida.

//Uma chamada para typeof x retorna uma string com o nome do tipo:

typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

typeof Math // "object"  (1)

typeof null // "object"  (2)

typeof alert // "function"  (3)

//As últimas três linhas podem precisar de explicação adicional:

//1.Math é um objeto interno que fornece operações matemáticas. Nós o aprenderemos no capítulo Números . Aqui, serve apenas como um exemplo de um objeto.
//2.O resultado de typeof null é "object". Esse é um erro oficialmente reconhecido no typeof, vindo dos primeiros dias do JavaScript e mantido para compatibilidade. Definitivamente, null não é um objeto. É um valor especial com um tipo separado próprio. O comportamento de typeofestá errado aqui.
//3. O resultado de typeof alert é "function", porque alert é uma função. Estudaremos funções nos próximos capítulos, onde também veremos que não existe um tipo especial de “função” em JavaScript. As funções pertencem ao tipo de objeto. Mas typeof os trata de forma diferente, retornando "function". Isso também vem dos primeiros dias do JavaScript. Tecnicamente, tal comportamento não é correto, mas pode ser conveniente na prática.

//A typeof(x)sintaxe
//Você também pode encontrar outra sintaxe: typeof(x). É o mesmo que typeof x.

//Para deixar claro: typeof é um operador, não uma função. Os parênteses aqui não fazem parte de typeof. É o tipo de parênteses usado para agrupamento matemático.

//Normalmente, esses parênteses contêm uma expressão matemática, como (2 + 2), mas aqui eles contêm apenas um argumento (x). Sintaticamente, eles permitem evitar um espaço entre o typeofoperador e seu argumento, e algumas pessoas gostam disso.

//Algumas pessoas preferem typeof(x), embora a typeof x sintaxe seja muito mais comum.

// Resumo
//Existem 8 tipos de dados básicos em JavaScript.

//Sete tipos de dados primitivos:
///number para números de qualquer tipo: inteiro ou ponto flutuante, os inteiros são limitados por .±(2^53-1)
//bigint para números inteiros de comprimento arbitrário.
//string para cordas. Uma string pode ter zero ou mais caracteres, não há um tipo de caractere único separado.
//boolean para true/ false.
//null para valores desconhecidos – um tipo autônomo que tem um único valor null.
//undefined para valores não atribuídos – um tipo autônomo que tem um único valor undefined.
//symbol para identificadores exclusivos.
//E um tipo de dados não primitivo:
//object para estruturas de dados mais complexas.
//O typeof operador nos permite ver qual tipo está armazenado em uma variável.

//Geralmente usado como typeof x, mas typeof(x)também é possível.
//Retorna uma string com o nome do tipo, como "string".
//Para null retornos "object"– isso é um erro na linguagem, não é realmente um objeto.

//Nos próximos capítulos, vamos nos concentrar nos valores primitivos e, quando estivermos familiarizados com eles, passaremos para os objetos.