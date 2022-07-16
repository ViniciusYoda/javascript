/*

Loops: enquanto e para

Muitas vezes precisamos repetir ações.´

Por exemplo, a saída de mercadorias de uma lista uma após a outra ou apenas executando o mesmo código para cada número de 1 a 10.

Os loops são uma maneira de repetir o mesmo código várias vezes.

Os loops for...of e for...in

Um pequeno anúncio para leitores avançados.

Este artigo cobre apenas loops básicos: while, do..while e for(..;..;..).

Se você chegou a este artigo procurando outros tipos de loops, aqui estão as dicas:

. Consulte for..in para fazer um loop sobre as propriedades do objeto.
. Veja for..of e iterables para fazer um loop sobre arraus e objetos iteráveis.

Caso contrário, por favor, continue a ler.

O loop "while"

O loop while tem a seguinte sintaxe:

*/

while (condition) {
    // code
    // so-called "loop body"
}

/*

Enquanto o condition é verdadeiro, o code do corpo do loop é executado.

Por exemplo, o loop abaixo gera i while i < 3:

*/

let i = 0;
while (i < 3) { // shows 0, then 1, then 2
    alert( i );
    i++;
}

/*

Uma única execução do corpo do loop é chamada de iteração. O loop no exemplo acima faz três iterações.

Se i++ estivesse faltando no exemplo faltando no exemplo acima, o loop se repetiria(em teoria) para sempre. Na prática, o navagador fornece maneiras de interromper esses loops e, no JavaScript do lado do servidor, podemos matar o processo.

Qualquer expressão ou variável pode ser uma condição de loop, não apenas comparações: a condição é avaliada e convertida em um booleano por while.

Por exemplo, uma maneira mais curta de escrever while (i != 0) é while (i):

*/

let o = 3;
while (o) { // when i becomes 0, the condition becomes falsy, and the loop stops
    alert( o );
    o--;
}

/*

Chaves não são necessárias para um corpo de linha única

Se o corpo do loop tiver uma única instrução, podemos omitir as chaves {...}:

*/

let q = 3;
while (q) alert(q--);

/*

O loop "do... while"

A verificação de condição pode ser movida abaixo do corpo do loop usando a do..while sintaxe:

*/

do {
    // loop body
} while (condition);

/*

O loop executará primeiro o corpo, depois verificará a condição e, enquanto for verdadeiro, executará novamente e novamente.

Por exemplo:

*/

let w = 0;
do {
    alert( w )
    i++;
} while (w < 3);

/*

Essa forma de sintaxe deve ser usada apenas quando você deseja que o corpo do loop seja executado pelo menos uma vez, independentemente da condição ser verdadeira. Normalmente, a outra forma é preferida: while(...) {...}.

O laço "for"

O loop for é mais complexo, mas também é o loop mais usado.

Se parece com isso:

*/

for(begin;condition;step){
    // ... loop body ...
}

// Vamos aprender o significado dessas partes pelo exemplo. O loop abaixo é executado alert(i) de i até 0 (mas não incluindo) 3:

for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
    alert(i);
}

// Vamos examinar a declaração parte por parte:

/*

papel
começar let i = 0 Executa uma vez ao entrar no loop.
condição i < 3 Verificado antes de cada iteração de loop. Se false, o loop para.
corpo alert(i) Executa repetidamente enquanto a condição é verdadeira.
step i++ Executa após o corpo em cada iteração.

O algoritmo de loop geral funciona assim>

1 Run begin
2 → (if condition → run body and run step)
3 → (if condition → run body and run step)
4 → (if condition → run body and run step)
5 → ...

Ou seja, begin executa uma vez, e então itera: após cada condition teste, body e step são executados.

Se você é novo em loops, pode ser útil voltar ao exemplo e reproduzir como ele é executado passo a passo em um pedaço de papel.

Aqui está exatamente o que acontece no nosso caso:

*/

// for (let i = 0; i < 3; i++)  alert(i)

// run begin
let e = 0
// if condition → run body and run step
if(e < 3) { alert(e); e++ }
// if condition → run body and run step
if(e < 3) { alert(e); e++ }
// if condition → run body and run step
if(e < 3) { alert(e); e++ }
// ...finish, because now i == 3

/*

Declaração de variável em linha

Aqui, a variável "counter" i é declarada diretamente no loop. Isso é chamado de declaração de variável "inline". Tais variáveis são visíveis apenas dentro do loop.

*/

for(let i = 0; i < 3; i++){
    alert(i); // 0, 1, 2
}
alert(i); // error, no such variable

// Em vez de definir uma variável, poderíamos usar uma já existente:

let r = 0;

for(r = 0; r < 3; r++) { // use an existing variable
    alert(r); // 0, 1, 2
}

alert(r); // 3, visible, because declared outside of the loop

/*

Pular partes

Qualquer parte for pode ser ignorada.

Por exemplo, podemos omitir begin se não precisarmos fazer nada no início do loop.

Como aqui:

*/

let t = 0; // we have t already declared and assigned

for(; t < 3; t++){ // no need for "begin"
    alert( t ); // 0, 1, 2
}

// Também podemosremover a parte step:

let y = 0;

for(; y < 3;) {
    alert( i++ );
}

/*

Isso torna o loop idêntico ao while (i < 3).

Na verdade, podemos remover tudo, criando um loop infinito:

*/

for(;;){
    // repeats without limits
}

/*

Observe que os dois pontos for e vírgulas ; devem estar presentes. Caso contrário, haveria um erro de sintaxe.

Quebrando o laço

Normalmente, um loop é encerrado quando sua condição se torna falsa.

Mas podemos forçar a saída a qualquer momento usando a diretaiva break especial.

Por exemplo, o loop abaixo pede ao usuário uma série de números, "quebrando" quando nenhum números é inserido:

*/

let sum = 0;

while (true) {
    let value = +prompt("Enter a number", '');

    if (!value) break; // (*)

    sum += value;
}
alert( 'Sum>: ' + sum );

/*

A diretiva break é ativada na linha (*) se o usuário inserir uma linha vazia ou cancelar a entrada. Ele para o loop imediatamente, passando o controle para a primeira linha após o loop. Ou seja, alert.

A combinação "loop infinito + break conforme necessário" é ótima para situações em que a condição de um loop deve ser verificada não no início ou no final do loop, mas no meio ou mesmo em vários locais do seu corpo.

Continuar para a próxima iteração

A diretiva continue é uma "versão mais leve" do break. Não para todo o ciclo. Em vez disso, ele interrompe a iteração atual e força o loop a iniciar um novo (se a condição permitir).

Podemos usá-lo pse terminarmos a iteração atual e quisermos passar para a próxima.

O loop abaixo usar continue para gerar apenas valores ímpares:

*/

for (let i = 0; i < 10; i++){

    // if true, skip the remaining part of the body
    if (i % 2 == 0) continue;

    alert(i); // 1, then 3, 5, 7, 9
}

/*

Para valores pares de i, a diretiva continue para de executar o corpo e passa o controle para a próxima iteração de for(com o próximo número). Portanto, o alert é chamado apenas para valores ímpares.

A diretiva continue ajuda a diminuir o aninhamento

Um loop que mostra valores ímpares pode ser assim:

*/

for (let i = 0; i < 10; i++){

    if(i%2){
        alert(i);
    }
}

/*

Do ponto de vista técnico, isso é idêntico ao exemplo acima. Certamente, podemos simplesmente envolver o código em um bloco if em vez de usar continue.

Mas como efeito colateral, isso criou mais um nível de aninhamento (a chamada alert dentro das chaves). Se o código dentro de if for maior que algumas linhas, isso pode diminuir a legibilidade geral.

Não break/continue para o lado direito de '?'

Observe que construções de sintaze que não são expressões não podem ser usadas com o operador ternário ?. Em particular, diretivas como break/continue não são permitidas lá.

Por exemplom se pagarmos este código:

*/

if (i > 5) {
    alert(i);
} else {
    continue;
}

// ... e reescreva usando um ponto de interrogação:

(i > 5) ? alert(i) : continue; // continue isn´t allowed here

/*

Etiquetas para pausar/continuar

Às vezes, precisamos sair de vários loops aninhados de uma só vez.

Por exemplo, no código abaixo fazemos um loop sobre i and j, solicitando as coordenadas (i,j) de (0,0) to (2,2):

*/

for(let i = 0; i < 3; i++){

    for(let j = 0; j < 3; j++){
        
        let input = prompt(`Value at coords (${i},${j})`, '');

        // what if we want to exit from gete to Done (below) ?
    }
}

alert('Done!');

/*

Precisamos de uma maneira de parar o processo se o usuário cancelar a entrada.

O break depois comum input apenas quebraria o loop interno. Isso não é suficiente - rótulos, venham em socorro!

Um rótulo é um identificador com dois pontos antes de um loop:

*/

labelName: for(...){
    ...
}

// A break <labelName> instrução no loop abaixo vai para o rótulo:

outer: for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++){
        let input = prompt(`Value at coords (${i},${j})`, '');

        // if an empty string or canceled, then break out of both loops
        if (!input) break outer; // (*)

        // do something with the value...
    }
}

alert('Done!');

/*

No códio acima, break outer procura o rótulo nomeado para cima outer e sai desse loop.

Então o controle vai direto de (*) para alert('Done!').

Também podemos mover o rótulo para uma linha separada:

*/

outer:
for (let i = 0; i < 3; i++) {...}

/*

A diretiva continue também pode ser usada com um rótulo. Nesse caso, a execução do código salta para a próxima iteração do loop rotulado.

Rótulos não permitem "saltar" em qualquer lugar

Os rótulos não nos permitem saltar para um lugar arbitrário no código.

Por exemplo, é impossível fazer isso:

*/

break label; // jump to the label below (doesn´t work)

label: for(...)

// Uma diretiva break deve estar dentro de um bloco de código. Tecnicamente, qualquer bloco de código rotulado servirá, por exemplo:

label: {
    //...
    break label; // works
    //...
}

//... Embora, 99,9% do tempo break seja usado dentro de loops, como vimos nos exemplos acima. A continue só é possivel de dentro de um loop.

/*

Resumo

Cobrimos 3 tipos de loops:

. while - A condição é verificada antes de cada interação.
. do..while - A condição é verificada após cada iteração
. for(;;) - A condição é verificada antes de cada iteração, configurações adicionais disponíveis. 

Para fazer um loop "infinito", geralmente a while(true) construção é usada. Esse loop, como qualquer outro, pode ser interrompido com a diretiva break.

Se não quisermos fazer nada na iteração atual e quisermos encaminhar para a próxima, podemos usar a diretiva continue.

break/continue rótulos de suporte antes do loop. Um rótulo é a única maneira de break/continue escapar de um loop aninhado para ir para um externo.

