/*

String

Em JavaScript, os dados textuais são armazenados como strings. Não há tipo separado para um único caractere.

O formato interno para strings é sempre UTF-16 , não está vinculado à codificação da página.

Citações
Vamos relembrar os tipos de citações.

As strings podem ser colocadas entre aspas simples, aspas duplas ou acentos graves:

*/

let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`

// Aspas simples e duplas são essencialmente as mesmas. Backticks, no entanto, nos permitem incorporar qualquer expressão na string, envolvendo-a em ${…}:

function sum(a, b){
    return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.

// Outra vantagem de usar backticks é que eles permitem que uma string se estenda por várias linhas:

let guestList = `Guests:
    * John
    * Pete
    * Mary
`;

alert(guestList); // a list of guests, multiple lines

/*

Parece natural, certo? Mas aspas simples ou duplas não funcionam dessa maneira.

Se os usarmos e tentarmos usar várias linhas, ocorrerá um erro:

*/

let guestList = "Guest: // Error: Unexpected token ILLEGAL
    * John";

/*

Aspas simples e duplas vêm desde os tempos antigos da criação de idiomas, quando a necessidade de strings de várias linhas não era levada em consideração. Backticks apareceram muito mais tarde e, portanto, são mais versáteis.

Os acentos graves também nos permitem especificar uma “função de modelo” antes do primeiro acento grave. A sintaxe é: func`string`. A função funcé chamada automaticamente, recebe a string e as expressões incorporadas e pode processá-las. Isso é chamado de “modelos marcados”. Esse recurso facilita a implementação de modelos personalizados, mas raramente é usado na prática. Você pode ler mais sobre isso no manual .

*/