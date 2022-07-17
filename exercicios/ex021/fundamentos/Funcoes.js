/*

Funções

Muitas vezes precisamos realizar uma ação semelhante em muito lugares do script.

Por exemplo, precisamos mostrar uma mensagem bonita quando um visitante faz login, sai e talvez em outro lugar.

As funções são os principais "blocos de construção" do programa. Eles permitem que o código seja chamado muitas vezes sem repetição.

Já vimos exemplos de funções internas, como alert(message), prompt(message, default) e confirm(question). Mas também podemos criar nossas próprias funções.

Declaração de função

Para criar uma função, podemos usar uma declaração de função.

Se parece com isso:

*/

function showMessage() {
    alert('Hello everyone!');
}

// A palavra-chave function vai primeiro, depois vai o nome da função, depois uma lista de parêmetros entre os parênteses (separados por vírgula, vazio no exemplo acima, veremos exemplos depois) e finalmente o código da função, também chamada " o corpo da função", entre chaves.

function name(paremeter1, parameter2, ... parameterN){
    ...body...
}

/*

Nossa nova função pode ser chamada pelo nome> showMessage().

Por exemplo:

*/

function showMessage() {
    alert('Hello everyone!');
}

showMessage();
showMessage();

/*

A chamada showMessage() executa o código da função. Aqui veremos a mensagem duas vezes.

Este exemplo demonstra claramente um dos principais propósitos da funções: evitar a duplicação de código.

Se alguma vez precisarmos alterar a mensagem ou a forma como ela é mostrada, basta modificar o código em um só lugar: a função que a gera.

Variáveis locais

Uma variável declarada dentro de uma função só é visível dentro dessa função.

Por exemplo:

*/

function showMessage() {
    let message = "Hello, I´m JavaScript"; // local variable

    alert(message)
}

showMessage(); // Hello, I´m JavaScript

alert(message); // <-- Error! The variable is local to th e function

/*

Variáveis externas

Uma função também pode acessar uma variável externa, por exemplo:

*/

let userName = 'John';

function showMessage() {
    let message = 'Hello, ' + userName;
    alert(message);
}

showMessage(); // Hello, John

/*

A função tem acesso total à variável externa. Ele pode modificá-lo também.

Por exemplo:

*/

let userName = 'John';

function showMessage() {
    userName = "Bob"; // (1) changed the outer variable

    let message = 'Hello, ' + userName;
    alert(message);
}

alert(userName); // John before the function call

showMessage();

alert(userName); // Bob, the value was modified by the function

/*

A variável externa só é usada se não houver uma variável local.

Se uma variável de mesmo nome for declarada dentro da função, ele ocultará a externa. Por exemplo, no código abaixo, a função usa o local userName. O externo é ignorado:

*/

let userName = 'John';

function showMessage() {
    let userName = "Bob"; // declare a local variable

    let message = 'Hello, ' + userName; // Bob
    alert(message);
}

// the function will create and use its own userName
showMessage();

alert(userName); // John, unchanged, the function did not access the outer variable

/*

Variáveis globais

Variáveis declaradas fora de qualquer função, como a externa userName no código acima, são chamadas de global.

As variáveis globais são visíveis de qualquer função (a menos que sejam sombreadas por locais);

É uma boa prática minimizar o uso de variáveis globais. O código moderno tem poucos ou nenhum global. A maioria das variáveis reside em suas funções. Às vezes, porém, eles podem ser úteis para armazenar dados no nível  do projeto.

Parâmetros

Podemos passar dados arbitrários para funções usando parâmetros.

No exemplo abaixo, a função tem dois parâmetros: from e text.

*/

function showMessage(from, text) { // parameters: from, text
    alert(from + ': ' + text);
}

showMessage('Ann', 'Hello'); // Ann: Hello (*)
showMessage('Ann', "What´s up?"); // Ann: What´s up? (**)

/*

Quando a função é chamada em linhas (*) e (**), os valores fornecidos são copiados para varipaveis locais from e text. Em seguida, a função os usa.

Aqui está mais um exemplo: temos uma variável from e a passamos para a função, Observe: a função from muda, mas a mudança não é vista fora, porque uma função sempre obtém uma cópria do valor:

*/

function showMessage(from, text) {

    from = '*' + from + '*'; // make "from" look nicer

    alert(from+': ' + text);
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// the value of "from" is the same, the function modified a local copy
alert(from); // Ann

/*

Quando um valor é passado como parâmetro de função, também é chamado de argumento.

Em outra palavras, para colocar esses termos em ordem:

. Um parâmetro é a variável listada entre parênteses na declaração da função (é um termo de tempo de declaração).
. Um argumento é o valor que é passado para a função quando ela é chamada (é um termo de tempo de chamada).

Declaramos funções listando seus parâmetros, então as chamamos passando argumentos.

No exemplo acima, pode-se dizer: "a função showMessage é declara com dois parâmetros, depois chamada com dois argumentos: from e "Helo"".

Valores padrão

Se uma função for chamada, mas  um argumento não for fornecido, o valor correspondente se tornará undefined.

Por exemplo, a função acima mencionada showMessage(from, text) pode ser chamada com um único argumento: 

*/

showMessage("Ann");

/*

Isso não pe um erro, Tal chamada produziria "*Ann*: undefined". Como o valor para text não é passado, torna-se undefined.

Podemos especificar o chamado valor "default" (para usar se omitido) par um parâmetro na declaração da função, usando =:

*/

function showMessage(from, text = "no text given") {
    alert(from + ": " + text);
}

showMessage("Ann"); // Ann: no text given

/*

Agora, se o text parâmetro não for passado, ele obterá o valor "no text given"

Aqui "no text given" está uma string, mas pode ser uma expressão mais complexa, que só é avaliada e atribuída se o parâmetro estiver ausente. Então, isso também é possível:

*/

function showMessage(from, text = anotherFunction()) {
    // anotherFunction() only executed if no text given
    // its result becomes the value of text
}

/* Avaliação de parâmetros padrão

Em JavaScript, um parâmetro padrão é avaliado toda vez que a função é chamada sem o respectivo parâmetro.

No exemplo acima, anotherFunction() não é chamado, se o parâmetro text for fornecido.

Por outro lado, é chamado independentemente toda vez que text está faltando.

Parâmetros padrão no código JavaScript antigo

Vários anos atrás, o JavaScript não suportava a sintaxe para parâmetros padrão, Então, as pessoas usaram outras maneiras de especificá-los.

Hoje em dia, podemos encontrá-los em scripts antigos.

Por exemplo, uma verificaçaõ explicita para undefined:

*/

function showMessage(from, text){
    if(text === undefined) {
        text = 'no text given';
    }

    alert(from + ": " + text);
}

//... Ou usando o || operador:

function showMessage(from, text) {
    // If the value of text is falsy, assign the default value
    // this assumes that text == "" is the same as no text at all
    text = text || "no text given";
    ...
}

/*

Parâmetros padrão alternativos

Às vezes, faz sentido atribuit valores padrão para parâmetros não na declaração da função, mas em um estágio posterior.

Podemos verificar se o parâmetro é passado durante a execução da função, comparando-o com undefined:

*/

function showMessage(text) {
    // ...

    if (text === undefined) { // if the parameter is missing
        text = 'empty message';
    }

    alert(text);
}

showMessage(); // empty message

//...Ou podemos usar o || operador:

function showMessage(text) {
    // if text is undefined or otherwise falsy, set it to 'empty'
    text = text || 'empty';
    ...
}

// Os mecanismo de JavaScript modernos suportam o operador de coalescência nulo ??, é melhor quando a maioria dos valores falsos, como 0, devem ser considerados "normais":

function showCount(count) {
    // if count is undefined or null, show "unknown"
    alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown

/*

Retornando um valor

Uma função pode retornar um valor de volta ao código de chamada como resultado.

O exemplo mais simples seria uma função que soma dois valores:

*/

function sum(a, b) {
    return a + b;
}

let result = sum(1, 2);
alert(result); // 3

/*

A diretiva return pode estar em qualquer lugar da função. Quando a execução o atinge, a função para e o valor é retornado ao código de chamada (atribuído result acima).

Pode haver muitas ocorrências de return em uma única função. Por exemplo:

*/

function checkAge(age) {
    if (age >= 18) {
        return true;
    } else {
        return confirm('Do you have permission from your parents?');
    }
}

let age = prompt('How old are you?', 18);

if (checkAge(age)) {
    alert('Access granted');
}else{
    alert('Access denied');
}

/*

É possível usar return sem valor. Isso faz com que a função saia imediatamente.

Por exemplo:

*/

function showMovie(age) {
    if(!checkAge(age)){
        return;
    }

    alert("Showing you the movie"); //(*)
    // ...
}

/*

No código acima, se checkAge(age) retornar false, showMovie não prosseguirá para o alert.

Uma função com um vazio return ou sem ele retorna undefined

Se uma função não retornar um valor, é o mesmo que retornar undefined:

*/

function doNothing(){/* empty */}

alert(doNothing()=== undefined); // true

// Um vazio return também é o mesmo que return undefined:

function doNothing() {
    return;
}

alert(doNothing()=== undefined); //true

/*

Nunca adicionae uma nova linha entre return e o valor

Para uma expressão longa em return, pode ser tentador colocá-la em uma linga separada, assim:

*/

return
(some + long + expression + or + whatever * f(a) + f(b))

// Isso não funciona, porque o JavaScript assume um ponto e vírgula depois de return. Isso funcionará da mesma forma que: 

return;
(some + long + expression + or + whateveer *f(a) + f(b))

/*

Assim, torna-se efetivamente um retorno vazio.

Se quisermos que a expressão retornada envolva várias linhas, devemos iniciá-la na mesma linha que return. Ou pelo menos coloque os parênteses de abertura da seguinte forma:

*/

return {
    some + long + expression
    + or +
    whatever * f(a) + f(b)
}

/*

E funcionará exatamente como esperamos.

Nomeando uma função

Funções são ações. Portanto, seu nome geralmente é um verbo. Deve ser breve, o mais preciso possível e descrever o que a função faz, para que alguém que leia o código tenha uma indicação do que a função faz.

É uma prática comum iniciar uma função com um prefixo verbal que descreve vagamente a ação. Deve haver um acordo dentro da equipe sobre o significado oos prefixos.

Por exemplo, funções que começam com "show" geralmente mostram algo.

Função começando com...

. "get..." - retornar um valor,
. "calc..." - calcular algo,
. "create..." - criar algo,
. "check..." - verificar algo e retornar um booleano, etc.

Exempllos de tais nomes:

*/

showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false

/*

Com os prefixos no lugar, uma olhada no nome de uma função dá uma compreensão do tipo de trabalho que ela faz e que tipo de valor ela retorna.

Uma função – uma ação
Uma função deve fazer exatamente o que seu nome sugere, nada mais.

Duas ações independentes geralmente merecem duas funções, mesmo que geralmente sejam chamadas juntas (nesse caso podemos fazer uma 3ª função que chama essas duas).

Alguns exemplos de quebra dessa regra:

.getAge– seria ruim se mostrasse um alertcom a idade (só deveria chegar).
.createForm– seria ruim se modificasse o documento, adicionando um formulário a ele (só deve criá-lo e retornar).
.checkPermission– seria ruim se exibisse a access granted/deniedmensagem (só deve realizar a verificação e retornar o resultado).
 
Esses exemplos assumem significados comuns de prefixos. Você e sua equipe são livres para concordar com outros significados, mas geralmente eles não são muito diferentes. Em qualquer caso, você deve ter um entendimento firme do que um prefixo significa, o que uma função prefixada pode e não pode fazer. Todas as funções com o mesmo prefixo devem obedecer às regras. E a equipe deve compartilhar o conhecimento.

Nomes de funções ultracurtos
As funções que são usadas com muita frequência às vezes têm nomes ultracurtos.

Por exemplo, o framework jQuery define uma função com $. A biblioteca Lodash tem sua função principal chamada _.

Estas são exceções. Geralmente, os nomes das funções devem ser concisos e descritivos.

Funções == Comentários
As funções devem ser curtas e fazer exatamente uma coisa. Se essa coisa for grande, talvez valha a pena dividir a função em algumas funções menores. Às vezes, seguir essa regra pode não ser tão fácil, mas é definitivamente uma coisa boa.

Uma função separada não é apenas mais fácil de testar e depurar – sua própria existência é um ótimo comentário!

Por exemplo, compare as duas funções showPrimes(n)abaixo. Cada um produz números primos até n.

A primeira variante usa um rótulo:

*/

function showPrimes(n) {
    nextPrime: for (let i = 2; i < n; i++){

        for (let j = 2; j < i; j++){
            if(i % j == 0) continue nextPrime;
        }

        alert(i);  // a prime
    }
}

// A segunda variante usa uma função adicional isPrime(n)para testar a primalidade:

function showPrimes(n) {

    for(let i = 2; i < n; i++){
        if(!isPrime(i)) continue;

        alert(i); // a prime
    }
}

function isPrime(n) {
    for(let i = 2; i < n; i++){
        if(n%i==0) return;
    }

    return true;
}

/*

A segunda variante é mais fácil de entender, não é? Em vez da parte do código, vemos um nome da ação ( isPrime). Às vezes, as pessoas se referem a esse código como autodescritivo .

Assim, as funções podem ser criadas mesmo que não pretendamos reutilizá-las. Eles estruturam o código e o tornam legível.

Resumo
Uma declaração de função se parece com isso:

function name(parameters, delimited, by, comma) {
  /* code */
// }

/*
Os valores passados ​​para uma função como parâmetros são copiados para suas variáveis ​​locais.
Uma função pode acessar variáveis ​​externas. Mas só funciona de dentro para fora. O código fora da função não vê suas variáveis ​​locais.
Uma função pode retornar um valor. Se não, então seu resultado é undefined.
Para tornar o código limpo e fácil de entender, é recomendado usar principalmente variáveis ​​e parâmetros locais na função, não variáveis ​​externas.

É sempre mais fácil entender uma função que obtém parâmetros, trabalha com eles e retorna um resultado do que uma função que não obtém parâmetros, mas modifica variáveis ​​externas como efeito colateral.

Nomenclatura da função:

Um nome deve descrever claramente o que a função faz. Quando vemos uma chamada de função no código, um bom nome instantaneamente nos dá uma compreensão do que ele faz e retorna.
Uma função é uma ação, portanto, os nomes das funções geralmente são verbais.
Existem muitos prefixos de função bem conhecidos como create…, show…, get…e check…assim por diante. Use-os para sugerir o que uma função faz.
As funções são os principais blocos de construção dos scripts. Agora cobrimos o básico, então podemos começar a criá-los e usá-los. Mas isso é apenas o começo do caminho. Voltaremos a eles muitas vezes, aprofundando seus recursos avançados.
*/