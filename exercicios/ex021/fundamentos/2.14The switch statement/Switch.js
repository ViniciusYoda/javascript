/*

A declaração de "troca"

Uma instrução switch pode substitur várias verificações if.

Ele fornece uma maneira mais descritiva de comparar um valor com várias variantes.

A sintaxe

O switch tem um ou mais blocos case e um padrão opcional.

Se parece com isso:

*/

switch(x){
    case 'value1': // if (x === 'value1')
        ...
        [break]
    case 'value2': // if (x === 'value2')
        ...
        [break]
    default:
        ...
        [break]
}

/*

. O valor de x é verificado quanto a uma igualdade estrita com o valor do primeiro case (ou seja, value1) depois para o segundo ( value2 ) e assim por diante.
. Se a igualdade for encontrada, switch começa a executar o código a partir do correspondente case, até o mais próximo break (ou até o final de switch).
. Se nenhum caso for correspondido, o código default será executado (se existir).

Um exemplo

Um exemplo de swith (o código executado é destacado):

*/

let a = 2 + 2;

switch(a){
    case 3:
        alert('Too small');
        break;
    case 4:
        alert('Exactly!');
        break;
    case 5:
        alert('Too big');
        break;
    default:
        alert('I don´t know such values');
}

/*

Aqui switch começa a comparar 'a' a partir da primeira variante case que é 3. A partida falha.

Então 4. Isso é uma correspondência, então a execução começa case 4 até o próximo break.

Se não houver break, a execução continua com a próxima case sem nenhum verficação.

Um exemplo sem break:

*/

let b = 2 + 2;

switch(b){
    case 3:
        alert('Too small');
    case 4:
        alert('Exactly!');
    case 5:
        alert('Too big');
    default:
        alert('I don´t know such values')
}

// No exemplo acima veremos a execução seqeuncial de três alert´s:

alert('Exactly!')
alert('Too big')
alert('I don´t know such values')

/*

Qualquer expressão pode ser um switch/case argumento

Ambos switch e case permitem expressões arbitrárias.

Por exemplo:

*/

let c = "1";
let d = 0;

switch (+c) {
    case d + 1:
        alert('this runs, because +a is 1, exactly equals b+1');
        break;

        default:
            alert('this doesn´t run');
}

/*

Aqui +a dá 1, que é comparado com b + 1 in case, e o código correspondente pe executado.

Agrupamento de "caso"

Várias variantes case que compartilham o mesmo código podem ser agrupadas.

Por exemplo, se quisermos que  o mesmo código seja executado para case 3 e case 5:

*/

let e = 3;

switch(e) {
    case 4:
        alert('Right!');
        break;

    case 3: // (*) grouped two cases
    case 5:
        alert('Wrong!');
        alert('Why don´t you take a math class?');
        break;

    default:
        alert('The result is strange. Really.');
}

/*

Agora ambos 3 e 5 mostram a mesma mensagem.

A capacidade de "agrupar" casos é um efeito colateral de como switch/case funciona sem o break.
Aqui a execução de case 3 começa da linha (*) e vai até case 5, porque não há break.

Tipo importa

Vamos enfatizar que a verificação de igualdade é sempre rigorosa. Os valores devem ser do mesmo tipo para corresponder.

Por exemplo, vamos considerar o código:

*/

let arg = prompt("Enter a value?");
switch (arg) {
    case '0':
    case '1':
        alert('One or zero');
        break;

    case '2':
        alert('Two');
        break;

    case '3':
        alert('Never executes!');
        break;
    default:
        alert('An unknown value');
}

/*

1. Para 0, 1, o primeiro alert é executado.
2. Para 2 as segundas alert corridas.
3. Mas para 3, o resultado de prompt é uma string "3", que não é estritamente igual === ao número 3. Então temos um código morto em case 3! A variante default será executada.

*/

