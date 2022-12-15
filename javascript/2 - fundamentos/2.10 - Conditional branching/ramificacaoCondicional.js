/* Ramificação condicional: if,'?'

Às vezes, precisamos realizar ações diferentes com base em condições diferentes.

Para fazer isso, podemos usar a instrução if e o operador condicional ?, também chamado de operador "ponto de interrogração".

A declaração "if"

A instrução if(...) avalia uma condição entre parênteses e, se o resultado for true, executa um bloco de código.

Por exemplo:

*/

let year = prompt('In which year was ECMAScript-2015 sprecification published?','');

if (year == 2015) alert( 'You are right ')

/* 

No exemplo acima, a condição é uma simples verificação de igualdade (year == 2015), mas pode ser muito mais complexa.

Se quisermos executar mais de uma instrução, temos que envolver nosso bloco de código entre chaves:

*/

if (year == 2015){
    alert("That´s correct!");
    alert( "You´re so smart!");
}

/*

Recomendamos envolver seu bloco de código com chaves {} toda vez que você usar uma instrução if, mesmo que hajas apenas uma instrução a ser executada. Isso melhora a legibilidade.

Conversão booleana

A instrução if(...) avalia a expressão entre parênteses e converte o resultado em um booleano.

Vamos relembrar as regras de conversão do capítulo Conversões de Tipo:

. Um número 0, uma string vazia "",null, undefined, e NaN todos se tornam false. Por isso são chamados de valores "falsos".
. Outros valores se tornam true, então eles são chamados de "verdadeiros".

Portanto, o código sob essa condição nunca seria executado:

*/

if (0){ // 0 is falsy
    //...
}

//... e dentro desta condição -- sempre será:

if (1) { // 1 is truthy
    //...
}

// Também podemos passar um valor booleano pré-avaliado para if, assim:

let cond = (year == 2015); // equality evaluates to true or false

if (cond){
    //...
}

/* 

A clásula "else"

A instrução if pode conter um bloco opcional "else". Ele é executado quando a condição é falsa.

Por exemplo:

*/

let years = prompt('In which year was the ECMAScript-2015 specification published?','');

if (years == 2015){
    alert('You guessed it right!');
} else {
    alert('How can you be so wrong?'); // any value except 2015
}

/*

Várias condições: "else if"

Às vezes, gostariamos de testar várias variantes de uma condição. A cláusula else if nos permite fazer isso.

Por exemplo:

*/

let nyears = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (nyears < 2015){
    alert('Too early...');
} else if (year > 2015){
    alert('Too late');
}else{
    alert('Exactly!');
}

/* No código acima, o JavaScript primeiro verifica year < 2015. Se isso for falso, vai para a próxima condição year > 2015. Se isso também for falso, ele mostra o último alert.

Pode haver mais blocos else if. A final else é opcional.

Operador condicional '?'

Às vezes, precisamos atribuir uma variável dependendo de uma condição.

Por exemplo:

*/

let accessAllowed;
let age = prompt('How old are you?', '');

if(age > 18){
    accessAllowed = true;
} else {
    accessAllowed = false;
}

alert(accessAllowed);

/*

O chamado operador "condicional" ou "ponto de interrogação" nos permite fazer isso de uma forma mais curta e simples.

O operador é representado por um ponto de interrogação ?. Às vezes é chamado de "ternário", pois o operador possui três operandos. Na verdade, é o único operador em JavaScipt que possui tantos.

A sintaxe é:

*/

let results = condition ? value1 : value2;

/*

O condition é avaliado: se for vardadeiro então value1 é retornado, caso contráio = value2.

Por exemplo:

*/

let accessAlloweds = (age > 18) ? true : false;

/*

Tecnicamente, podemos omitir os parênteses em torno de age > 18. O operador de ponto de interrogação tem baixa precedência, portanto, é executado após a comparação >.

Este exemplo fará a mesma coisa que o anterior:

*/

// the comparison operator "age > 18" executes first anyway
// (no need to wrap it into parentheses)
let accessAllowed3 = age > 18 ? true : false;

// Mas os parêntese tornam o código mais legível, por isso recomendamos usá-los.

/*

Observe:

No exemplo acima, você pode evitar usar o operador de ponto de interrogação porque a própria comparação retorna true/false:

*/

// the same
let accessAllowed4 = age > 18;

/*

Múltiplo '?'

Uma sequência de operadores de ponto de interrogação ? pode retornar umv alor que depende de mais de uma condição.

Por exemplo:

*/

let ages = prompt('age?', 18);

let message = (ages < 3) ? 'Hi, baby' : (ages <18) ? 'Hello' : (ages < 100) ? 'Greetings!' : 'What an unusual age!';

alert(message);

/*

Pode ser difícil no início entender o que está acontecendo. Mas depois de um olhar mais atento, podemos ver que é apenas uma sequência comum de testes:

1. O primeiro ponto de interrogação verifica se ages < 3.
2. Se verdadeiro - retorna 'Hi, baby!'. Caso contrário, continua para a expressão após os dois pontos ":", verificando age < 100.
3. Se isso for verdade - ele retorna 'Hello!'. Caso contrário, continua para a expressão após os próximos dois pontos ":", verificando age < 100.
4. Se isso for verdade - ele retorna 'Greetings!'. Caso contrário, continua para a expressão após os últimos dois pontos ":", retornando "What an unusual age!".

Veja como isso fica usando if..else:

*/

if(ages < 3){
    message = 'Hi, baby!';
} else if (ages < 18) {
    message = 'Hello!';
} else if (ages < 100) {
    message = 'Greetings!';
} else {
    message = 'Whar an unusual age!';
}

/*

Uso não tradicional de '?'

Às vezes, o ponto de interrogação ? é usado como substituto para if:

*/

let company = prompt('Which company created JavaScript?', '');

(company == 'Netscape') ?
    alert('Right') : alert('Wrong.');

/*

Dependendo da condição company == 'Netscape', a primeira ou a segunda expressão após o ? é executada e mostra um alerta.

Não atribuímos um resultado a uma variável aqui. Em vez disso, executamos um código diferente dependendo da condição.

Não é recomendado usar o operador de ponto de interrogação dessa maneira.

A notação é mais curta do que a declaração if equivalente, o que atrai alguns programadores. Mas é menos legível.

Aqui está o mesmo código usando if para comparação:

*/

let companys = prompt('Which company created JavaScript?', '');

if (companys == 'Netscape') {
    alert('Right!');
} else {
    alert('Wrong.')
}

/*

Nossos olhos escaneiam o código verticalmente. Blocos de código que abrangem várias linhas são mais fáceis de entender do que um conjunto de instruções longo e hroizontal.

O objetivo do operador de ponto de interrogação ? é retornar um valor ou outro dependendo de sua condição. Por favor, use-o exatamente para isso. Use if quando precisar executar diferentes ramificações de código.

*/