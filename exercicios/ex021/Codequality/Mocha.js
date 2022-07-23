/*

Testes automatizados com Mocha

Testes automatizados serão usados ​​em outras tarefas e também são amplamente utilizados em projetos reais.

Por que precisamos de testes?
Quando escrevemos uma função, geralmente podemos imaginar o que ela deve fazer: quais parâmetros fornecem quais resultados.

Durante o desenvolvimento, podemos verificar a função executando-a e comparando o resultado com o esperado. Por exemplo, podemos fazer isso no console.

Se algo estiver errado – corrigimos o código, executamos novamente, verificamos o resultado – e assim por diante até funcionar.

Mas essas “re-execuções” manuais são imperfeitas.

Ao testar um código por reexecuções manuais, é fácil perder alguma coisa.

Por exemplo, estamos criando uma função f. Escrevi algum código, testando: f(1)funciona, mas f(2)não funciona. Corrigimos o código e agora f(2)funciona. Parece completo? Mas esquecemos de testar novamente f(1). Isso pode levar a um erro.

Isso é muito típico. Quando desenvolvemos algo, mantemos muitos casos de uso possíveis em mente. Mas é difícil esperar que um programador verifique todos eles manualmente após cada alteração. Assim fica fácil consertar uma coisa e quebrar outra.

Teste automatizado significa que os testes são escritos separadamente, além do código. Eles executam nossas funções de várias maneiras e comparam os resultados com o esperado.

Desenvolvimento Orientado ao Comportamento (BDD)
Vamos começar com uma técnica chamada Behavior Driven Development ou, em resumo, BDD.

BDD é três coisas em uma: testes E documentação E exemplos.

Para entender o BDD, examinaremos um caso prático de desenvolvimento.

Desenvolvimento de “pow”: a especificação
Digamos que queremos fazer uma função pow(x, n)que eleva xa uma potência inteira n. Assumimos isso n≥0.

Essa tarefa é apenas um exemplo: existe o **operador em JavaScript que pode fazer isso, mas aqui nos concentramos no fluxo de desenvolvimento que também pode ser aplicado a tarefas mais complexas.

Antes de criar o código de pow, podemos imaginar o que a função deve fazer e descrevê-la.

Tal descrição é chamada de especificação ou, resumidamente, de especificação, e contém descrições de casos de uso junto com testes para eles, assim:

*/

describe("pow", function() {

    it("raises to n-th power", function() {
        asserts.equal(pow(2, 3), 8);
    });

});

/*

Uma especificação tem três blocos de construção principais que você pode ver acima:

describe("title", function() { ... })
Que funcionalidade estamos descrevendo? No nosso caso, estamos descrevendo a função pow. Usado para agrupar “trabalhadores” – os itblocos.

it("use case description", function() { ... })
No título de itnós descrevemos de uma forma legível por humanos o caso de uso específico, e o segundo argumento é uma função que o testa.

assert.equal(value1, value2)
O código dentro do itbloco, se a implementação estiver correta, deve ser executado sem erros.

As funções assert.*são usadas para verificar se powfunciona conforme o esperado. Aqui estamos usando um deles – assert.equal, ele compara argumentos e dá um erro se eles não forem iguais. Aqui ele verifica se o resultado de pow(2, 3)equals 8. Existem outros tipos de comparações e verificações, que adicionaremos posteriormente.

A especificação pode ser executada e executará o teste especificado no itbloco. Veremos isso mais tarde.

O fluxo de desenvolvimento
O fluxo de desenvolvimento geralmente se parece com isso:

1. Uma especificação inicial é escrita, com testes para a funcionalidade mais básica.
2. Uma implementação inicial é criada.
3. Para verificar se funciona, rodamos o framework de testes Mocha (mais detalhes em breve) que roda a especificação. Enquanto a funcionalidade não estiver completa, os erros são exibidos. Fazemos correções até que tudo funcione.
4. Agora temos uma implementação inicial de trabalho com testes.
5. Adicionamos mais casos de uso à especificação, provavelmente ainda não suportados pelas implementações. Os testes começam a falhar.
6. Vá para 3, atualize a implementação até que os testes não apresentem erros.
7. Repita as etapas 3-6 até que a funcionalidade esteja pronta.

Portanto, o desenvolvimento é iterativo . Nós escrevemos a especificação, implementamos, garantimos que os testes passem, então escrevemos mais testes, garantimos que eles funcionem, etc. No final, temos uma implementação funcional e testes para ela.

Vamos ver esse fluxo de desenvolvimento em nosso caso prático.

O primeiro passo já está completo: temos uma especificação inicial para pow. Agora, antes de fazer a implementação, vamos usar algumas bibliotecas JavaScript para executar os testes, só para ver se estão funcionando (todos vão falhar).

A especificação em ação
Aqui no tutorial, usaremos as seguintes bibliotecas JavaScript para testes:

Mocha – a estrutura principal: fornece funções de teste comuns, incluindo ee describea itfunção principal que executa testes.
Chai – a biblioteca com muitas afirmações. Ele permite usar muitas asserções diferentes, por enquanto precisamos apenas de assert.equal.
Sinon – uma biblioteca para espionar funções, emular funções internas e muito mais, precisaremos muito mais tarde.
Essas bibliotecas são adequadas para testes no navegador e no servidor. Aqui vamos considerar a variante do navegador.

A página HTML completa com esses frameworks e powespecificações:

*/

/*

A página pode ser dividida em cinco partes:

1. O <head>– adiciona bibliotecas e estilos de terceiros para testes.
2. O <script>com a função para testar, no nosso caso – com o código para pow.
3. Os testes – no nosso caso um script externo test.jsque tem describe("pow", ...)de cima.
4. O elemento HTML <div id="mocha">será usado pelo Mocha para gerar resultados.
5. Os testes são iniciados pelo comando mocha.run().

A partir de agora, o teste falha, há um erro. Isso é lógico: temos um código de função vazio em pow, então pow(2,3)retorna undefinedem vez de 8.

Para o futuro, vamos notar que existem mais executores de testes de alto nível, como karma e outros, que facilitam a execução automática de muitos testes diferentes.

Implementação inicial
Vamos fazer uma implementação simples de pow, para que os testes passem:

Melhorando a especificação
O que fizemos é definitivamente uma fraude. A função não funciona: uma tentativa de calcular pow(3,4)daria um resultado incorreto, mas os testes passam.

…Mas a situação é bem típica, acontece na prática. Os testes passam, mas a função funciona errado. Nossa especificação é imperfeita. Precisamos adicionar mais casos de uso a ele.

Vamos adicionar mais um teste para verificar isso pow(3, 4) = 81.

Podemos selecionar uma das duas maneiras de organizar o teste aqui:

1. A primeira variante - adicione mais uma assertna mesma it:

*/

describe("pow", function() {

    it("raises to n-th power", function() {
        asserts.equal(pow(2, 3), 8);
        asserts.equal(pow(3, 4), 81);
    });
});

// 2. O segundo - faça dois testes

describe("pow", function() {

    it("2 raised to power 3 is 8", function() {
        asserts.equal(pow(2, 3), 8);
    });

    it("3 raised to powe 4 is 81", function() {
        asserts.equal(pow(3, 4), 81);
    });

});

/*

A principal diferença é que quando assertaciona um erro, o itbloco termina imediatamente. Portanto, na primeira variante, se a primeira assertfalhar, nunca veremos o resultado da segunda assert.

Fazer testes separados é útil para obter mais informações sobre o que está acontecendo, então a segunda variante é melhor.

E além disso, há mais uma regra que é bom seguir.

Um teste verifica uma coisa.

Se olharmos para o teste e virmos duas verificações independentes nele, é melhor dividi-lo em duas mais simples.

Então vamos continuar com a segunda variante.

Melhorando a implementação
Vamos escrever algo mais real para os testes passarem:

*/

function pow(x, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

// Para ter certeza de que a função funciona bem, vamos testá-la para mais valores. Em vez de escrever itblocos manualmente, podemos gerá-los em for:

describe("pow", function() {

    function makeTest(x) {
        let expected = x * x * x;
        it(`${x} in the power 3 is ${expected}`, function() {
            assert.equal(pow(x, 3), expected);
        });
    }

    for (let x = 1; x <=5; x++) {
        makeTest(x);
    }
});

/*

Descrição aninhada
Vamos adicionar ainda mais testes. Mas antes disso vamos notar que a função auxiliar makeTeste fordeve ser agrupada. Não precisaremos makeTestem outros testes, é necessário apenas em for: sua tarefa comum é verificar como powaumenta para a potência dada.

O agrupamento é feito com um aninhado describe:

*/

describe("pow", function() {

    describe("raises x to power 3", function() {
  
      function makeTest(x) {
        let expected = x * x * x;
        it(`${x} in the power 3 is ${expected}`, function() {
          assert.equal(pow(x, 3), expected);
        });
      }
  
      for (let x = 1; x <= 5; x++) {
        makeTest(x);
      }
  
    });
  
    // ... more tests to follow here, both describe and it can be added
  });

/*

O aninhado describedefine um novo “subgrupo” de testes. Na saída, podemos ver o recuo intitulado:

No futuro, podemos adicionar mais ite describeno nível superior com funções auxiliares próprias, eles não verão makeTest.

before/afterebeforeEach/afterEach
Podemos configurar before/afterfunções que executam antes/depois de executar testes e também beforeEach/afterEachfunções que executam antes/depois de cada it .

Por exemplo:

*/

describe("test", function() {

    before(() => alert("Testing started – before all tests"));
    after(() => alert("Testing finished – after all tests"));
  
    beforeEach(() => alert("Before a test – enter a test"));
    afterEach(() => alert("After a test – exit a test"));
  
    it('test 1', () => alert(1));
    it('test 2', () => alert(2));
  
  });

/*

A sequência de execução será:

Testing started – before all tests (before)
Before a test – enter a test (beforeEach)
1
After a test – exit a test   (afterEach)
Before a test – enter a test (beforeEach)
2
After a test – exit a test   (afterEach)
Testing finished – after all tests (after)
Abra o exemplo na caixa de areia.
Normalmente, beforeEach/afterEache before/aftersão usados ​​para realizar a inicialização, zerar contadores ou fazer outra coisa entre os testes (ou grupos de teste).

Estendendo a especificação
A funcionalidade básica de powestá completa. A primeira iteração do desenvolvimento é feita. Quando terminarmos de comemorar e beber champanhe – vamos continuar e melhorar.

Como foi dito, a função pow(x, n)deve funcionar com valores inteiros positivos n.

Para indicar um erro matemático, as funções JavaScript geralmente retornam NaN. Vamos fazer o mesmo para valores inválidos de n.

Vamos primeiro adicionar o comportamento ao spec(!):

*/

describe("pow", function() {

    // ...
  
    it("for negative n the result is NaN", function() {
      assert.isNaN(pow(2, -1));
    });
  
    it("for non-integer n the result is NaN", function() {
      assert.isNaN(pow(2, 1.5));
    });
  
  });

/*

Os testes recém-adicionados falham porque nossa implementação não os suporta. É assim que o BDD é feito: primeiro escrevemos testes que falham e depois fazemos uma implementação para eles.

Outras afirmações
Observe a afirmação assert.isNaN: ela verifica NaN.

Há outras afirmações em Chai também, por exemplo:

assert.equal(value1, value2)– verifica a igualdade value1 == value2.
assert.strictEqual(value1, value2)– verifica a igualdade estrita value1 === value2.
assert.notEqual, assert.notStrictEqual– verificações inversas às anteriores.
assert.isTrue(value)– verifica quevalue === true
assert.isFalse(value)– verifica quevalue === false
…a lista completa está nos documentos

Então, devemos adicionar algumas linhas a pow:

*/

function pow(x, n) {
    if (n < 0) return NaN;
    if (Math.round(n) != n) return NaN;
  
    let result = 1;
  
    for (let i = 0; i < n; i++) {
      result *= x;
    }
  
    return result;
  }

/*

Resumo
No BDD, a especificação vem primeiro, seguida pela implementação. No final, temos a especificação e o código.

A especificação pode ser usada de três maneiras:

Como Testes – eles garantem que o código funcione corretamente.
As Docs – os títulos describee itinformam o que a função faz.
Como Exemplos – os testes são realmente exemplos de trabalho mostrando como uma função pode ser usada.
Com a especificação, podemos melhorar, alterar e até reescrever a função com segurança do zero e garantir que ela ainda funcione corretamente.

Isso é especialmente importante em grandes projetos quando uma função é usada em muitos lugares. Quando alteramos essa função, simplesmente não há como verificar manualmente se todos os lugares que a usam ainda funcionam corretamente.

Sem testes, as pessoas têm duas maneiras:

Para realizar a mudança, não importa o quê. E então nossos usuários encontram bugs, pois provavelmente não verificamos algo manualmente.
Ou, se a punição por erros for dura, como não há testes, as pessoas ficam com medo de modificar tais funções, e aí o código fica desatualizado, ninguém quer entrar nele. Não é bom para o desenvolvimento.
O teste automático ajuda a evitar esses problemas!

Se o projeto for coberto com testes, simplesmente não há esse problema. Após qualquer alteração, podemos executar testes e ver muitas verificações feitas em questão de segundos.

Além disso, um código bem testado tem uma arquitetura melhor.

Naturalmente, isso ocorre porque o código testado automaticamente é mais fácil de modificar e melhorar. Mas há também outra razão.

Para escrever testes, o código deve ser organizado de tal forma que cada função tenha uma tarefa claramente descrita, entradas e saídas bem definidas. Isso significa uma boa arquitetura desde o início.

Na vida real isso às vezes não é tão fácil. Às vezes é difícil escrever uma especificação antes do código real, porque ainda não está claro como ele deve se comportar. Mas, em geral, escrever testes torna o desenvolvimento mais rápido e estável.

Mais adiante no tutorial, você encontrará muitas tarefas com testes integrados. Assim você verá exemplos mais práticos.

Escrever testes requer um bom conhecimento de JavaScript. Mas estamos apenas começando a aprender. Então, para resolver tudo, a partir de agora você não é obrigado a escrever testes, mas já deve ser capaz de lê-los, mesmo que sejam um pouco mais complexos do que neste capítulo.

*/