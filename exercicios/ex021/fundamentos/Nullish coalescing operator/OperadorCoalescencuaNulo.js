/*

Operador de coalescência nulo '??'

Uma adição recente

Esta é uma adição recente a linguagem. Navegadores antigos podem precisar de polyfills.

O operador de coalescência nulo é escrito como dois pontos de interrogação ??.

Como trata null e undefined da mesama forma, usaremos um termo especial aqui, nester artigo. Para resumir, diremos que um valor é "definido" quando não é nem null nem undefined.

O resultado de a ?? b é:

. se a está definido, então a,
. se a não estiver definido, então b.

Em outras palavras, ?? retorna o primeiro argumento se não for null/undefined. Caso contrário, o segundo.

O operador de coalescência nulo não é algo completamente novo. É apenas uma boa sintaxe para obter o primeiro valor "definido" dos dois.

Podemos reescrever result = a ?? b usando os operadores que já conhecemos, assim:

*/

result = (a !== null && a !== undefined) ? a : b;

/*

Agora deve ficar absolutamente claro o que ?? faz. Vamos ver onde isso ajuda.

O caso de uso comum para ?? é fornecer um valor padrão.

Por exemplo, aqui mostramos user se seu valor não é null/undefined, caso contrário Anonymous:

*/

let user;

alert(user ?? "Anonymous"); // Anonymous (user not defined)

// Aqui está o exemplo com user atribuído a um nome:

let users = "John"

alert(users ?? "Anonymous"); // John (user defined)

/*

Também podemos usar uma sequência de ?? para selecionar o primeiro valor de uma lista que não é null/undefined.

Digamos que temos os dados de um usuário em variáveis firstName, lastName ou nickName. Todos eles podem não estar definidos, caso o usuário decida não preencher os valores correspondentes.

Gostaríamos de exibir o nome de usuário usando uma dessas variáveis ou mostrar "Anônimo" se todas elas forem null/undefined.

Vamos  usar o ?? operador para isso:

*/

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first defined value:
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder

/*

Comparação com ||

O operador OR || pode ser utilizado da mesma forma que ??, conforme descrito no capítulo anterior.

Por exemplo, no código acima, poderíamos substituit ?? e || ainda obter o mesmo resultado:

*/

let Firstname = null;
let Lastname = null;
let NIckname = "Supercoder";

// shows the first truthy value:
alert(Firstname || Lastname || NIckname || "Anonymous"); // Supercoder

/*

Historicamente, o || operador OR estava lá primeiro. Ele existe desde o início do JavaScript, então os desenvolvedores o usavam para esses propósitos há muito tempo.

Por outro lado, o operador de coalescência nulo ?? foi adicionado ao JavaScript apenas recentemente, e a razão para isso foi que as pessoas não estavam muito satisfeitas com o ||.

A diferença entre eles é que:

. || retorna o primeiro valor verdadeiro.
. ?? retroana o primeiro valor definido.

Em outras palavras, || não distingue entre false, 0, uma string vazia "" e null/undefined. São todos iguais - valores falsos, Se algum desses for o primeiro argumento de ||, obteremos o segundo argumento como resultado.

Na prática, porém, podemos querer usar o valor padrão apenas quando a variável for null/undefined. Ou seja, quando o valor é realmente desconhecido/não definido.

Por exemplo, considere isso:

*/

let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0

/*

. As height || 100 verificações height para ser um valor falso, e é 0, falso de fato.
    . então o resultado de || é o segundo argumento, 100.
. As height ?? 100 verificações height por ser null/undefined, e não é.
    . então o resultado é height "como está", ou seja 0.

Na prática, a altura zero geralmente é um valor válido, que não deve ser substituído pelo padrão. Então ?? faz a coisa certa.

Precedência

A precedência do ?? operador é a mesma de ||. Ambos são iguais 4 na tabela MDN.

Isso significa que, assim como ||, o operador de coalescência nulo ?? é avaliado antes = e ?, mas depois da maioria das outras operações, como +, *.

Portanto, podemos precisar adicionar parênteses em expressões como esta:

*/

let heights = null;
let width = null;

// important: use parentheses
let area = (heights ?? 100) * (width ?? 50);

alert(area); // 5000

// Caso contrário, se omitirmos os parênteses, como * tem a precedência mais alta que ??, ele será executado primeiro, levando a resultados incorretos.

// without parentheses

let ares = heights ?? 100 * width ?? 50;

// ...works this way (not what we want):
let newArea = heights ?? (100 * width) ?? 50;

/*

Usando ?? com && ou ||

Por motivos de segurança, o JavaScript proíbe o uso ?? junto com os operadores && e ||, a menos que a precedência seja explicitamente especificada entre parênteses.

O código abaixo aciona um erro de sintaxe:

*/

// let x = 1 && 2 ?? 3; // Syntax error

/*

A limitação é certamente discutível, foi adicionada à especificação da linguagem com o objetivo de evitar erros de programação, quando as pessoas começam a mudar de || para ??.

Use parênteses explícitos para contornar isso:

*/

let x = (1 && 2) ?? 3; // Works

alert(x); // 2

/*

Resumo

. O operador de coalescência nulo ?? fornece uma maneira curta de escolher o primeiro valor "definido" de uma lista.

É usado para atribuir valores padrão a variáveis:

// set height=100, if height is null or undefined

*/

height - height ?? 100;

/*

. O operador ?? tem uma precedência mmuito baixa, apenas um pouco maior que ? e =, portanto, considere adicionar parênteses ao usá-lo em uma expressão.

. É proibido usá-lo com || ou && sem parênteses explícitos.

*/