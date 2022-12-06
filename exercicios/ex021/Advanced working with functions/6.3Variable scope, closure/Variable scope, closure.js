/*

Escopo variável, fechamento
JavaScript é uma linguagem muito orientada a funções. Isso nos dá muita liberdade. Uma função pode ser criada a qualquer momento, passada como um argumento para outra função e, posteriormente, chamada de um local de código totalmente diferente.

Já sabemos que uma função pode acessar variáveis ​​fora dela (variáveis ​​“externas”).

Mas o que acontece se as variáveis ​​externas mudarem desde que uma função é criada? A função obterá valores mais novos ou antigos?

E se uma função for passada como um argumento e chamada de outro local do código, ela obterá acesso a variáveis ​​externas no novo local?

Vamos expandir nosso conhecimento para entender esses cenários e outros mais complexos.

Falaremos sobre let/constvariáveis ​​aqui
Em JavaScript, existem 3 maneiras de declarar uma variável: let, const(as modernas) e var(o remanescente do passado).

Neste artigo, usaremos letvariáveis ​​em exemplos.
Variáveis, declaradas com const, se comportam da mesma forma, então este artigo consttambém é sobre isso.
O antigo vartem algumas diferenças notáveis, elas serão abordadas no artigo O antigo "var" .

Blocos de código
Se uma variável for declarada dentro de um bloco de código {...}, ela só ficará visível dentro desse bloco.

Por exemplo:

*/

{
    // do some job with local variables that should not be seen outside

    let message = "Hello"; // only visible in this block

    alert(message); // Hello
}

alert(message); // Error: message is not defined

// Podemos usar isso para isolar um pedaço de código que faz sua própria tarefa, com variáveis ​​que pertencem apenas a ele:

{
    // show message
    let message = "Hello";
    alert(message);
}

{
    // show another message
    let message = "Goodbye";
    alert(message);
}

/*

Haveria um erro sem blocos
Por favor, note que sem blocos separados haveria um erro, se usarmos letcom o nome da variável existente:

// show message
let message = "Hello";
alert(message);

// show another message
let message = "Goodbye"; // Error: variable already declared
alert(message);
Para if, for, whilee assim por diante, as variáveis ​​declaradas em {...}também são visíveis apenas dentro de:

*/

if (true) {
    let phrase = "Hello!";

    alert(phrase); // Hello!
}

alert(phrase); // Error, no such variable!

/*

Aqui, depois de ifterminar, o alertabaixo não verá o phrase, daí o erro.

Isso é ótimo, pois nos permite criar variáveis ​​locais de bloco, específicas para uma iframificação.

A mesma coisa vale para fore whileloops:

*/

for (let i = 0; i < 3; i++) {
    // the variable i is only visible inside this for
    alert(i); // 0, then 1, then 2
}

alert(i); // Error, no such variable

/*

Visualmente, let iestá fora de {...}. Mas a forconstrução é especial aqui: a variável, declarada dentro dela, é considerada parte do bloco.

funções aninhadas
Uma função é chamada de “aninhada” quando é criada dentro de outra função.

É facilmente possível fazer isso com JavaScript.

Podemos usá-lo para organizar nosso código, assim:

*/

function sayHiBye(firstName, lastName) {

    // helper nested function to use below
    function getFullName() {
        return firstName + " " + lastName;
    }

    alert("Hello, " + getFullName());
    alert("Bye, " + getFullName());

}

/*

Aqui a função aninhadagetFullName() é feita por conveniência. Ele pode acessar as variáveis ​​externas e, portanto, pode retornar o nome completo. Funções aninhadas são bastante comuns em JavaScript.

O que é muito mais interessante, uma função aninhada pode ser retornada: como uma propriedade de um novo objeto ou como resultado por si só. Ele pode então ser usado em outro lugar. Não importa onde, ele ainda tem acesso às mesmas variáveis ​​externas.

Abaixo, makeCountercrie a função “contador” que retorna o próximo número a cada invocação:

*/

function makeCounter() {
    let count = 0;

    return function () {
        return count++;
    };
}

let counter = makeCounter();

alert(counter()); // 0
alert(counter()); // 1
alert(counter()); // 2

/*

Apesar de simples, variantes ligeiramente modificadas desse código têm usos práticos, por exemplo, como gerador de números aleatórios para gerar valores aleatórios para testes automatizados.

Como é que isso funciona? Se criarmos vários contadores, eles serão independentes? O que está acontecendo com as variáveis ​​aqui?

Entender essas coisas é ótimo para o conhecimento geral de JavaScript e benéfico para cenários mais complexos. Então vamos aprofundar um pouco.

Apesar de simples, variantes ligeiramente modificadas desse código têm usos práticos, por exemplo, como gerador de números aleatórios para gerar valores aleatórios para testes automatizados.

Como é que isso funciona? Se criarmos vários contadores, eles serão independentes? O que está acontecendo com as variáveis ​​aqui?

Entender essas coisas é ótimo para o conhecimento geral de JavaScript e benéfico para cenários mais complexos. Então vamos aprofundar um pouco.

Passo 1. Variáveis
Em JavaScript, cada função em execução, bloco de código {...}e o script como um todo têm um objeto associado interno (oculto) conhecido como Lexical Environment .

O objeto Lexical Environment consiste em duas partes:

1. Registro de ambiente – um objeto que armazena todas as variáveis ​​locais como suas propriedades (e algumas outras informações como o valor de this).
2. Uma referência ao ambiente lexical externo , aquele associado ao código externo.

Uma “variável” é apenas uma propriedade do objeto interno especial, Environment Record. “Obter ou alterar uma variável” significa “obter ou alterar uma propriedade desse objeto”.

Neste código simples sem funções, existe apenas um Ambiente Lexical:


Este é o chamado Ambiente Lexical global , associado a todo o script.

Na figura acima, o retângulo significa Registro do Ambiente (armazenamento de variáveis) e a seta significa a referência externa. O Ambiente Lexical global não possui referência externa, por isso a seta aponta para null.

À medida que o código começa a ser executado e continua, o ambiente léxico muda.

Aqui está um código um pouco mais longo:

Os retângulos do lado direito demonstram como o ambiente lexical global muda durante a execução:

1. Quando o script é iniciado, o Lexical Environment é pré-preenchido com todas as variáveis ​​declaradas.
Inicialmente, eles estão no estado “Não inicializado”. Esse é um estado interno especial, significa que o mecanismo conhece a variável, mas não pode ser referenciado até que seja declarado com let. É quase como se a variável não existisse.
2. Então let phrasea definição aparece. Ainda não há atribuição, então seu valor é undefined. Podemos usar a variável deste ponto em diante.
3. phraseé atribuído um valor.
4. phrasealtera o valor.

Tudo parece simples por enquanto, certo?

Uma variável é uma propriedade de um objeto interno especial, associado ao bloco/função/script em execução no momento.
Trabalhar com variáveis ​​é, na verdade, trabalhar com as propriedades desse objeto.

Lexical Environment é um objeto de especificação
“Ambiente lexical” é um objeto de especificação: ele só existe “teoricamente” na especificação da linguagem para descrever como as coisas funcionam. Não podemos obter esse objeto em nosso código e manipulá-lo diretamente.

Os mecanismos JavaScript também podem otimizá-lo, descartar variáveis ​​que não são usadas para economizar memória e executar outros truques internos, desde que o comportamento visível permaneça como descrito.

Etapa 2. Declarações de funções
Uma função também é um valor, como uma variável.

A diferença é que uma declaração de função é totalmente inicializada instantaneamente.

Quando um ambiente léxico é criado, uma declaração de função imediatamente se torna uma função pronta para uso (ao contrário letde , que é inutilizável até a declaração).

É por isso que podemos usar uma função, declarada como Declaração de Função, antes mesmo da própria declaração.

Por exemplo, aqui está o estado inicial do Lexical Environment global quando adicionamos uma função:


Naturalmente, esse comportamento se aplica apenas a declarações de função, não a expressões de função em que atribuímos uma função a uma variável, como let say = function(name)....

Etapa 3. Ambiente lexical interno e externo
Quando uma função é executada, no início da chamada, um novo Ambiente Lexical é criado automaticamente para armazenar variáveis ​​locais e parâmetros da chamada.

Por exemplo, para say("John"), fica assim (a execução está na linha, marcada com uma seta):


Durante a chamada da função temos dois Ambientes Léxicos: o interno (para a chamada da função) e o externo (global):

O ambiente lexical interno corresponde à execução atual de say. Ele tem uma única propriedade: name, o argumento da função. Chamamos say("John"), então o valor de nameé "John".
O ambiente lexical externo é o ambiente lexical global. Tem a phrasevariável e a própria função.
O ambiente lexical interno tem uma referência ao outerum.

Quando o código quer acessar uma variável – busca-se primeiro o Ambiente Lexical interno, depois o externo, depois o mais externo e assim sucessivamente até o global.

Se uma variável não for encontrada em nenhum lugar, isso é um erro no modo estrito (sem use strict, uma atribuição a uma variável inexistente cria uma nova variável global, para compatibilidade com o código antigo).

Neste exemplo, a pesquisa procede da seguinte forma:

Para a namevariável, o alertinside a sayencontra imediatamente no Ambiente Lexical interno.
Quando ele deseja acessar phrase, então não há phraselocalmente, então ele segue a referência ao Ambiente Lexical externo e o encontra lá.

Etapa 4. Retornando uma função
Voltemos ao makeCounterexemplo.

*/

function makeCounter() {
    let count = 0;

    return function () {
        return count++;
    };
}

let counter2 = makeCounter();

/*

No início de cada makeCounter()chamada, um novo objeto Lexical Environment é criado para armazenar variáveis ​​para esta makeCounterexecução.

Assim temos dois Ambientes Léxicos aninhados, assim como no exemplo acima:


A diferença é que, durante a execução de makeCounter(), uma minúscula função aninhada é criada com apenas uma linha: return count++. Ainda não o executamos, apenas criamos.

Todas as funções lembram o Ambiente Lexical em que foram feitas. Tecnicamente, não há mágica aqui: todas as funções possuem a propriedade hidden chamada [[Environment]], que mantém a referência ao Ambiente Lexical onde a função foi criada:


Assim, counter.[[Environment]]tem-se a referência ao {count: 0}Ambiente Lexical. É assim que a função se lembra de onde foi criada, não importa onde seja chamada. A [[Environment]]referência é definida uma vez e para sempre no momento da criação da função.

Mais tarde, quando counter()é chamado, um novo Ambiente Lexical é criado para a chamada, e sua referência de Ambiente Lexical externo é retirada de counter.[[Environment]]:


Agora, quando o código interno counter()procura por countvariável, ele primeiro procura seu próprio Ambiente Lexical (vazio, pois não há variáveis ​​locais lá), depois o Ambiente Lexical da makeCounter()chamada externa, onde a encontra e a altera.

Uma variável é atualizada no ambiente léxico onde reside.

Aqui está o estado após a execução:


Se chamarmos counter()várias vezes, a countvariável será aumentada para 2, 3e assim por diante, no mesmo local.

Fecho
Existe um termo geral de programação “fechamento”, que os desenvolvedores geralmente devem conhecer.

Um fechamento é uma função que lembra suas variáveis ​​externas e pode acessá-las. Em algumas linguagens, isso não é possível, ou uma função deve ser escrita de uma maneira especial para que isso aconteça. Mas, como explicado acima, em JavaScript, todas as funções são naturalmente encerramentos (há apenas uma exceção, a ser abordada na sintaxe da "nova função" ).

Ou seja: eles se lembram automaticamente de onde foram criados usando uma [[Environment]]propriedade oculta e, em seguida, seu código pode acessar variáveis ​​externas.

Quando em uma entrevista, um desenvolvedor frontend recebe uma pergunta sobre “o que é um encerramento?”, uma resposta válida seria uma definição do encerramento e uma explicação de que todas as funções em JavaScript são encerramentos e talvez mais algumas palavras sobre detalhes técnicos: a [[Environment]]propriedade e como funcionam os Ambientes Léxicos.

Coleta de lixo
Normalmente, um ambiente léxico é removido da memória com todas as variáveis ​​após o término da chamada da função. Isso porque não há referências a ele. Como qualquer objeto JavaScript, ele só é mantido na memória enquanto estiver acessível.

No entanto, se houver uma função aninhada que ainda pode ser acessada após o término de uma função, ela possui uma [[Environment]]propriedade que faz referência ao ambiente léxico.

Nesse caso, o ambiente lexical ainda pode ser acessado mesmo após a conclusão da função, portanto, permanece ativo.

Por exemplo:

*/

function f() {
    let value = 123;

    return function () {
        alert(value);
    }
}

let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// of the corresponding f() call

// Observe que, se f()for chamado várias vezes e as funções resultantes forem salvas, todos os objetos Lexical Environment correspondentes também serão retidos na memória. No código abaixo, todos os 3 deles:

function f() {
    let value = Math.random();

    return function () { alert(value); };
}

// 3 functions in array, every one of them links to Lexical Environment
// from the corresponding f() run
let arr = [f(), f(), f()];

/*

Um objeto Lexical Environment morre quando se torna inacessível (como qualquer outro objeto). Em outras palavras, ele existe apenas enquanto houver pelo menos uma função aninhada fazendo referência a ele.

No código abaixo, depois que a função aninhada é removida, seu ambiente léxico envolvente (e, portanto, o value) é limpo da memória:

*/

function f() {
    let value = 123;

    return function () {
        alert(value);
    }
}

let g2 = f(); // while g function exists, the value stays in memory

g2 = null; // ...and now the memory is cleaned up

/*

Otimizações da vida real
Como vimos, em teoria, enquanto uma função está viva, todas as variáveis ​​externas também são retidas.

Mas, na prática, os mecanismos JavaScript tentam otimizar isso. Eles analisam o uso de variáveis ​​e se for óbvio no código que uma variável externa não é usada – ela é removida.

Um efeito colateral importante no V8 (Chrome, Edge, Opera) é que essa variável ficará indisponível na depuração.

Tente executar o exemplo abaixo no Chrome com as Ferramentas do desenvolvedor abertas.

Quando ele pausar, no console digite alert(value).

*/

function f() {
    let value = Math.random();

    function g() {
        debugger; // in console: type alert(value); No such variable!
    }

    return g;
}

let g3 = f();
g3();

/*

Como você pode ver – não existe essa variável! Em teoria, deveria ser acessível, mas o mecanismo o otimizou.

Isso pode levar a problemas de depuração engraçados (se não tão demorados). Um deles – podemos ver uma variável externa com o mesmo nome em vez da esperada:

*/

let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // in console: type alert(value); Surprise!
  }

  return g;
}

let g4 = f();
g4();

/*

Este recurso do V8 é bom saber. Se você estiver depurando com o Chrome/Edge/Opera, mais cedo ou mais tarde você o encontrará.

Isso não é um bug no depurador, mas sim um recurso especial do V8. Talvez seja alterado em algum momento. Você sempre pode verificar executando os exemplos nesta página.

*/
