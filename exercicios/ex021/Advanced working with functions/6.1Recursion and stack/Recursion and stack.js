/*

Recursão e pilha
Vamos voltar às funções e estudá-las mais profundamente.

Nosso primeiro tópico será recursão .

Se você não é novo em programação, provavelmente é familiar e você pode pular este capítulo.

A recursão é um padrão de programação útil em situações em que uma tarefa pode ser naturalmente dividida em várias tarefas do mesmo tipo, porém mais simples. Ou quando uma tarefa pode ser simplificada em uma ação fácil mais uma variante mais simples da mesma tarefa. Ou, como veremos em breve, para lidar com certas estruturas de dados.

Quando uma função resolve uma tarefa, no processo ela pode chamar muitas outras funções. Um caso parcial disso é quando uma função chama a si mesma . Isso se chama recursão .

Duas maneiras de pensar
Para começar com algo simples - vamos escrever uma função pow(x, n)que eleva xa uma potência natural de n. Em outras palavras, multiplica xpor si mesmo nvezes.

pow(2, 2) = 4
pow(2, 3) = 8
pow(2, 4) = 16

Existem duas maneiras de implementá-lo.

1. Pensamento iterativo: o for loop:

*/

function pow(x, n) {
    let result = 1;

    // multiply result by x n times in the loop
    for (let i = 0; i <n; i++) {
        result *= x;
    }

    return result;
}

alert( pow(2, 3) ); // 8

// 2. Pensamento recursivo: simplifique a tarefa e chame self:

function pow2(x, n) {
    if (n == 1) {
        return x;
    } else {
        return x * pow(x, n - 1);
    }
}

alert( pow2(2, 3) ); // 8

/*

Observe como a variante recursiva é fundamentalmente diferente.

Quando pow(x, n)é chamado, a execução se divide em duas ramificações:

              if n==1  = x
             /
pow(x, n) =
             \
              else     = x * pow(x, n - 1)

1. Se n == 1, então tudo é trivial. É chamada de base da recursão, porque produz imediatamente o resultado óbvio: pow(x, 1)equals x.
2. Caso contrário, podemos representar pow(x, n)como x * pow(x, n - 1). Em matemática, alguém escreveria . Isso é chamado de passo recursivo : transformamos a tarefa em uma ação mais simples (multiplicação por ) e uma chamada mais simples da mesma tarefa ( com menor ). As próximas etapas simplificam cada vez mais até atingir .xn = x * xn-1xpownn1

Também podemos dizer que pow chama a si mesmo recursivamente até n == 1.

Por exemplo, para calcular pow(2, 4)a variante recursiva siga estas etapas:

1. pow(2, 4) = 2 * pow(2, 3)
2. pow(2, 3) = 2 * pow(2, 2)
3. pow(2, 2) = 2 * pow(2, 1)
4. pow(2, 1) = 2

Assim, a recursão reduz uma chamada de função a uma mais simples, e então – a ainda mais simples, e assim por diante, até que o resultado se torne óbvio.

A recursão é geralmente mais curta
Uma solução recursiva é geralmente mais curta do que uma iterativa.

Aqui podemos reescrever o mesmo usando o operador condicional em ?vez de iftornar pow(x, n)mais conciso e ainda muito legível:

*/

function pow3(x, n) {
    return (n == 1) ? x : (x * pow(x, n - 1));
}

/*

O número máximo de chamadas aninhadas (incluindo a primeira) é chamado de profundidade de recursão . No nosso caso, será exatamente n.

A profundidade máxima de recursão é limitada pelo mecanismo JavaScript. Podemos confiar que é 10.000, alguns motores permitem mais, mas 100.000 provavelmente está fora do limite para a maioria deles. Existem otimizações automáticas que ajudam a aliviar isso (“otimizações de chamadas de cauda”), mas ainda não são suportadas em todos os lugares e funcionam apenas em casos simples.

Isso limita a aplicação da recursão, mas ainda permanece muito ampla. Existem muitas tarefas em que a maneira recursiva de pensar fornece um código mais simples, mais fácil de manter.

O contexto de execução e a pilha
Agora vamos examinar como as chamadas recursivas funcionam. Para isso, examinaremos sob o capô das funções.

As informações sobre o processo de execução de uma função em execução são armazenadas em seu contexto de execução .

O contexto de execução é uma estrutura de dados interna que contém detalhes sobre a execução de uma função: onde está o fluxo de controle agora, as variáveis ​​atuais, o valor de this(não usamos aqui) e alguns outros detalhes internos.

Uma chamada de função tem exatamente um contexto de execução associado a ela.

Quando uma função faz uma chamada aninhada, acontece o seguinte:

A função atual é pausada.
O contexto de execução associado a ele é lembrado em uma estrutura de dados especial chamada pilha de contexto de execução .
A chamada aninhada é executada.
Depois que termina, o contexto de execução antigo é recuperado da pilha e a função externa é retomada de onde parou.
Vamos ver o que acontece durante a pow(2, 3)chamada.

pow(2, 3)
No início da chamada pow(2, 3)o contexto de execução irá armazenar as variáveis: x = 2, n = 3, o fluxo de execução está na linha 1da função.

Podemos esboçar como:

Contexto: { x: 2, n: 3, na linha 1 } po(2, 3)
É quando a função começa a ser executada. A condição n == 1é falsa, então o fluxo continua no segundo ramo de if:

*/

function pow4(x, n) {
    if (n == 1) {
        return x;
    } else {
        return x * pow(x, n - 1);
    }
}

alert( pow4(2, 3));

/*

As variáveis ​​são as mesmas, mas a linha muda, então o contexto agora é:

Contexto: { x: 2, n: 3, na linha 5 } po(2, 3)
Para calcular x * pow(x, n - 1), precisamos fazer uma subchamada de powcom novos argumentos pow(2, 2).

pow(2, 2)

Para fazer uma chamada aninhada, o JavaScript lembra o contexto de execução atual na pilha de contexto de execução .

Aqui chamamos a mesma função pow, mas isso não importa absolutamente. O processo é o mesmo para todas as funções:

1. O contexto atual é “lembrado” no topo da pilha.
2. O novo contexto é criado para a subchamada.
3. Quando a subchamada termina – o contexto anterior é removido da pilha e sua execução continua.

Aqui está a pilha de contexto quando entramos na subchamada pow(2, 2):

Contexto: { x: 2, n: 2, na linha 1 } po(2, 2)
Contexto: { x: 2, n: 3, na linha 5 } po(2, 3)
O novo contexto de execução atual está no topo (e em negrito) e os contextos anteriores lembrados estão abaixo.

Quando terminamos a subchamada – fica fácil retomar o contexto anterior, pois mantém as duas variáveis ​​e o local exato do código onde parou.

Observe:
Aqui na figura usamos a palavra “linha”, pois em nosso exemplo há apenas uma subchamada na linha, mas geralmente uma única linha de código pode conter várias subchamadas, como pow(…) + pow(…) + somethingElse(…).

Portanto, seria mais preciso dizer que a execução é retomada “imediatamente após a subchamada”.

pow(2, 1)

O processo se repete: uma nova subchamada é feita na linha 5, agora com argumentos x=2, n=1.

Um novo contexto de execução é criado, o anterior é colocado no topo da pilha:

Contexto: { x: 2, n: 1, na linha 1 } po(2, 1)
Contexto: { x: 2, n: 2, na linha 5 } po(2, 2)
Contexto: { x: 2, n: 3, na linha 5 } po(2, 3)
Existem 2 contextos antigos agora e 1 atualmente em execução para pow(2, 1).

A saída
Durante a execução de pow(2, 1), ao contrário de antes, a condição n == 1é verdadeira, então o primeiro ramo iffunciona:

function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}

Não há mais chamadas aninhadas, então a função termina, retornando 2.

Conforme a função termina, seu contexto de execução não é mais necessário, então ela é removida da memória. O anterior é restaurado do topo da pilha:

Contexto: { x: 2, n: 2, na linha 5 } po(2, 2)
Contexto: { x: 2, n: 3, na linha 5 } po(2, 3)
A execução de pow(2, 2)é retomada. Tem o resultado da subchamada pow(2, 1), então também pode terminar a avaliação de x * pow(x, n - 1), retornando 4.

Em seguida, o contexto anterior é restaurado:

Contexto: { x: 2, n: 3, na linha 5 } po(2, 3)
Quando termina, temos um resultado de pow(2, 3) = 8.

A profundidade da recursão neste caso foi: 3 .

Como podemos ver nas ilustrações acima, a profundidade da recursão é igual ao número máximo de contexto na pilha.

Observe os requisitos de memória. Contextos requerem memória. No nosso caso, elevar à potência de nrealmente requer memória para ncontextos, para todos os valores inferiores de n.

Um algoritmo baseado em loop economiza mais memória:

Não há mais chamadas aninhadas, então a função termina, retornando 2.

Conforme a função termina, seu contexto de execução não é mais necessário, então ela é removida da memória. O anterior é restaurado do topo da pilha:

Contexto: { x: 2, n: 2, na linha 5 } po(2, 2)
Contexto: { x: 2, n: 3, na linha 5 } po(2, 3)
A execução de pow(2, 2)é retomada. Tem o resultado da subchamada pow(2, 1), então também pode terminar a avaliação de x * pow(x, n - 1), retornando 4.

Em seguida, o contexto anterior é restaurado:

Contexto: { x: 2, n: 3, na linha 5 } po(2, 3)
Quando termina, temos um resultado de pow(2, 3) = 8.

A profundidade da recursão neste caso foi: 3 .

Como podemos ver nas ilustrações acima, a profundidade da recursão é igual ao número máximo de contexto na pilha.

Observe os requisitos de memória. Contextos requerem memória. No nosso caso, elevar à potência de nrealmente requer memória para ncontextos, para todos os valores inferiores de n.

Um algoritmo baseado em loop economiza mais memória:

O iterativo powusa um único contexto mudando ie resultno processo. Seus requisitos de memória são pequenos, fixos e não dependem de arquivos n.

Qualquer recursão pode ser reescrita como um loop. A variante de loop geralmente pode ser mais eficaz.

…Mas às vezes a reescrita não é trivial, especialmente quando uma função usa diferentes subchamadas recursivas dependendo das condições e mescla seus resultados ou quando a ramificação é mais complexa. E a otimização pode ser desnecessária e totalmente desnecessária.

A recursão pode fornecer um código mais curto, mais fácil de entender e suportar. Otimizações não são necessárias em todos os lugares, principalmente precisamos de um bom código, por isso é usado.

Percursos recursivos
Outra grande aplicação da recursão é uma travessia recursiva.

Imagine, temos uma empresa. A estrutura de staff pode ser apresentada como um objeto:

*/

let company = {
    sales: [{
        name: 'John',
        salary: 1000
    }, {
        name: 'Alice',
        salary: 1600
    }],

    development: {
        sites: [{
            name: 'Peter',
            salary: 2000
        }, {
            name: 'Alex',
            salary: 1800
        }],

        internals: [{
            name: 'Jack',
            salary: 1300
        }]
    }
};

/*

Em outras palavras, uma empresa tem departamentos.

Um departamento pode ter uma variedade de funcionários. Por exemplo, saleso departamento tem 2 funcionários: John e Alice.

Ou um departamento pode se dividir em subdepartamentos, como developmenttem duas filiais: sitese internals. Cada um deles tem sua própria equipe.

Também é possível que quando um subdepartamento cresce, ele se divide em subsubdepartamentos (ou equipes).

Por exemplo, o sitesdepartamento no futuro pode ser dividido em equipes para siteAe siteB. E eles, potencialmente, podem dividir ainda mais. Isso não está na foto, apenas algo para se ter em mente.

Agora digamos que queremos uma função para obter a soma de todos os salários. Como podemos fazer isso?

Uma abordagem iterativa não é fácil, porque a estrutura não é simples. A primeira ideia pode ser fazer um forloop companycom subloop aninhado sobre departamentos de 1º nível. Mas então precisamos de mais subloops aninhados para iterar sobre a equipe em departamentos de 2º nível como sites… E então outro subloop dentro daqueles para departamentos de 3º nível que pode aparecer no futuro? Se colocarmos 3-4 subloops aninhados no código para percorrer um único objeto, ele se tornará bastante feio.

Vamos tentar a recursão.

Como podemos ver, quando nossa função recebe um departamento para somar, existem dois casos possíveis:

1. Ou é um departamento “simples” com uma variedade de pessoas – então podemos somar os salários em um loop simples.
2. Ou é um objeto com Nsubdepartamentos – então podemos fazer Nchamadas recursivas para obter a soma de cada um dos subdepartamentos e combinar os resultados.

O 1º caso é a base da recursão, o caso trivial, quando obtemos um array.

O segundo caso quando obtemos um objeto é o passo recursivo. Uma tarefa complexa é dividida em subtarefas para departamentos menores. Eles podem, por sua vez, se dividir novamente, mas mais cedo ou mais tarde a divisão terminará em (1).

O algoritmo é provavelmente ainda mais fácil de ler a partir do código:

*/

// The function to do the job

function sumSalaries(department) {
    if (Array.isArray(department)) { // case (1)
        return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
    } else { // case (2)
        let sum = 0;
        for (let subdep of Object.values(department)) {
            sum += sumSalaries(subdep); // recursivety call for subdepartments, sum the results
        }
        return sum;
    }
}

alert(sumSalaries(company)); //7700

/*

O código é curto e fácil de entender (espero?). Esse é o poder da recursão. Também funciona para qualquer nível de aninhamento de subdepartamento.

Aqui está o diagrama de chamadas:


Podemos ver facilmente o princípio: para um objeto {...}são feitas subchamadas, enquanto os arrays [...]são as “folhas” da árvore de recursão, eles dão resultado imediato.

Observe que o código usa recursos inteligentes que abordamos antes:

Método arr.reduceexplicado no capítulo Métodos de array para obter a soma do array.
Loop for(val of Object.values(obj))para iterar sobre os valores do objeto: Object.valuesretorna uma matriz deles.

Estruturas recursivas
Uma estrutura de dados recursiva (definida recursivamente) é uma estrutura que se replica em partes.

Acabamos de ver isso no exemplo de uma estrutura de empresa acima.

Um departamento da empresa é:

Ou uma série de pessoas.
Ou um objeto com departamentos .
Para desenvolvedores web, existem exemplos muito mais conhecidos: documentos HTML e XML.

No documento HTML, uma tag HTML pode conter uma lista de:

Peças de texto.
HTML-comentários.
Outras tags HTML (que por sua vez podem conter trechos de texto/comentários ou outras tags etc).
Isso é mais uma vez uma definição recursiva.

Para melhor entendimento, abordaremos mais uma estrutura recursiva chamada “Lista encadeada” que pode ser uma alternativa melhor para arrays em alguns casos.

lista encadeada
Imagine, queremos armazenar uma lista ordenada de objetos.

A escolha natural seria um array:

let arr = [obj1, obj2, obj3];

…Mas há um problema com matrizes. As operações de “excluir elemento” e “inserir elemento” são caras. Por exemplo, arr.unshift(obj)a operação precisa renumerar todos os elementos para abrir espaço para um novo obje, se o array for grande, leva tempo. O mesmo com arr.shift().

As únicas modificações estruturais que não requerem renumeração em massa são aquelas que operam com o fim do array: arr.push/pop. Então um array pode ser bem lento para filas grandes, quando temos que trabalhar com o começo.

Como alternativa, se realmente precisarmos de uma inserção/exclusão rápida, podemos escolher outra estrutura de dados chamada lista encadeada .

O elemento da lista encadeada é definido recursivamente como um objeto com:

value.
nextpropriedade referenciando o próximo elemento da lista encadeada ou nullse for o fim.
Por exemplo:

*/

let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

/*

Representação gráfica da lista:


Um código alternativo para criação:

*/

let list2 = { value: 1 };
liist2.next = { value: 2 };
list2.next.next = { value: 3 };
liist2.next.next.next = { value: 4 };
list.next.next.next.next = null;

/*

Aqui podemos ver ainda mais claramente que existem vários objetos, cada um com o valuee nextapontando para o vizinho. A listvariável é o primeiro objeto da cadeia, então seguindo os nextponteiros dela podemos chegar a qualquer elemento.

A lista pode ser facilmente dividida em várias partes e posteriormente reunida:

*/

let secondList = list.next.next;
list.next.next = null;

/*

Para juntar:

*/

list.next.next = secondList;

/*

E certamente podemos inserir ou remover itens em qualquer lugar.

Por exemplo, para preceder um novo valor, precisamos atualizar o cabeçalho da lista:

*/

let list3 = { value: 1};
list3.next = { value: 2 };
list3.next.next = { value: 3 };
list3.next.next.next = { value: 4 };

// prepend the new value to the list
list3 = { value: "new item", next: list3 };

// Para remover um valor do meio, altere nexto anterior:

list3.next = list3.next.next;

/*

Fizemos um list.nextsalto 1para o valor 2. O valor 1agora está excluído da cadeia. Se não estiver armazenado em nenhum outro lugar, será automaticamente removido da memória.

Ao contrário dos arrays, não há renumeração em massa, podemos facilmente reorganizar os elementos.

Naturalmente, listas nem sempre são melhores que arrays. Caso contrário, todos usariam apenas listas.

A principal desvantagem é que não podemos acessar facilmente um elemento por seu número. Em um array é fácil: arr[n]é uma referência direta. Mas na lista, precisamos começar do primeiro item e ir next Nvárias vezes para obter o enésimo elemento.

…Mas nem sempre precisamos de tais operações. Por exemplo, quando precisamos de uma fila ou mesmo de um deque – a estrutura ordenada que deve permitir a adição/remoção muito rápida de elementos de ambas as extremidades, mas não é necessário acesso ao seu meio.

As listas podem ser aprimoradas:

Podemos adicionar propriedade prevalém de nextreferenciar o elemento anterior, para voltar facilmente.
Também podemos adicionar uma variável nomeada tailreferenciando o último elemento da lista (e atualizá-la ao adicionar/remover elementos do final).
…A estrutura de dados pode variar de acordo com nossas necessidades.

Resumo
Termos:

Recursão é um termo de programação que significa chamar uma função de si mesma. As funções recursivas podem ser usadas para resolver tarefas de maneiras elegantes.

Quando uma função chama a si mesma, isso é chamado de passo de recursão . A base da recursão são os argumentos da função que tornam a tarefa tão simples que a função não faz mais chamadas.

Uma estrutura de dados definida recursivamente é uma estrutura de dados que pode ser definida usando a si mesma.

Por exemplo, a lista encadeada pode ser definida como uma estrutura de dados que consiste em um objeto referenciando uma lista (ou null).

list = { value, next -> list }
Árvores como a árvore de elementos HTML ou a árvore de departamentos deste capítulo também são naturalmente recursivas: elas têm ramificações e cada ramificação pode ter outras ramificações.

Funções recursivas podem ser usadas para percorrê-los como vimos no sumSalaryexemplo.

Qualquer função recursiva pode ser reescrita em uma função iterativa. E isso às vezes é necessário para otimizar as coisas. Mas, para muitas tarefas, uma solução recursiva é rápida o suficiente e mais fácil de escrever e suportar.

*/

