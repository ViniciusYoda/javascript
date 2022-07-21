/*

Estilo de codificação

Nosso código deve ser o mais limpo e fácil de ler possível.

Essa é, na verdade, a arte da programação – pegar uma tarefa complexa e codificá-la de uma maneira que seja correta e legível por humanos. Um bom estilo de código ajuda muito nisso.

Sintaxe
Aqui está uma folha de dicas com algumas regras sugeridas (veja abaixo para mais detalhes):

Agora vamos discutir as regras e as razões para eles em detalhes.

Não existem regras do tipo “você deve”
Nada está gravado em pedra aqui. Estas são preferências de estilo, não dogmas religiosos.

Chaves Curvas

Na maioria dos projetos JavaScript, as chaves são escritas no estilo “egípcio” com a chave de abertura na mesma linha que a palavra-chave correspondente – não em uma nova linha. Também deve haver um espaço antes do colchete de abertura, assim:

*/

if (condition) {
    // do this
    // ...and that
    // ...and that
}

/*

Uma construção de linha única, como if (condition) doSomething(), é um caso de borda importante. Devemos usar chaves em tudo?

Aqui estão as variantes anotadas para que você possa julgar sua legibilidade por si mesmo:

1. 😠 Iniciantes às vezes fazem isso. Mau! Chaves não são necessárias:

*/

if (n < 0) {alert(`Power ${n} is not supported`);}

// 2. 😠 Divida para uma linha separada sem chaves. Nunca faça isso, é fácil cometer um erro ao adicionar novas linhas:

if (n < 0)
    alert(`Power ${n} is not supported`);

// 3. 😏 Uma linha sem chaves – aceitável, se for curta:

if (n < 0) alert(`Power ${n} is not supported`);

// 4. 😃 A melhor variante:

if (n < 0) {
    alert(`Power ${n} is not supported`);
}

/*

Para um código muito breve, uma linha é permitida, por exemplo if (cond) return null. Mas um bloco de código (a última variante) geralmente é mais legível.

Comprimento da linha
Ninguém gosta de ler uma longa linha horizontal de código. É uma boa prática dividi-los.

Por exemplo:

*/

// backtick quotes ` allow to split the string into multiple lines

let str = `ECMA International's TC39 is a group of JavaScript developers,
implementers, academics, and more, collaborating with the community
to maintain and evolve the definition of JavaScript.`;

// E, para declarações if:

if (
    id === 123 && 
    moonPhase === 'Waning Gibbous' &&
    zodiacSign === 'Libra'
) {
    letTheSorceryBegin();
}

/*

O comprimento máximo da linha deve ser acordado em nível de equipe. Geralmente são 80 ou 120 caracteres.

Recuos
Existem dois tipos de travessões:

. Recuos horizontais: 2 ou 4 espaços.

Um recuo horizontal é feito usando 2 ou 4 espaços ou o símbolo de tabulação horizontal (tecla Tab). Qual escolher é uma velha guerra santa. Os espaços são mais comuns hoje em dia.

Uma vantagem dos espaços em relação às tabulações é que os espaços permitem configurações de recuos mais flexíveis do que o símbolo de tabulação.

Por exemplo, podemos alinhar os parâmetros com o colchete de abertura, assim:

*/

show(parameters,
    aligned, // 5 spaces padding at the left
    one,
    after,
    another
 ) {
 // ...
}

/*

. Recuos verticais: linhas vazias para dividir o código em blocos lógicos.

Mesmo uma única função pode ser dividida em blocos lógicos. No exemplo abaixo, a inicialização das variáveis, o loop principal e o retorno do resultado são divididos verticalmente:

*/

function pow(x, n) {
    let result = 1;
    //              <--
    for(let i = 0; i < n; i++) {
        result *= x;
    }
    //              <--
    return result;
}

/*

Insira uma nova linha extra onde isso ajuda a tornar o código mais legível. Não deve haver mais de nove linhas de código sem recuo vertical.

Ponto e vírgula
Um ponto e vírgula deve estar presente após cada instrução, mesmo que possa ser ignorado.

Existem linguagens em que um ponto e vírgula é realmente opcional e raramente é usado. Em JavaScript, porém, há casos em que uma quebra de linha não é interpretada como ponto e vírgula, deixando o código vulnerável a erros. Veja mais sobre isso no capítulo Estrutura de código .

Se você for um programador JavaScript experiente, poderá escolher um estilo de código sem ponto e vírgula como StandardJS . Caso contrário, é melhor usar ponto e vírgula para evitar possíveis armadilhas. A maioria dos desenvolvedores coloca ponto e vírgula.

Níveis de aninhamento
Tente evitar aninhar o código com muitos níveis de profundidade.

Por exemplo, no loop, às vezes é uma boa ideia usar a continuediretiva para evitar aninhamento extra.

Por exemplo, em vez de adicionar uma condicional aninhada ifcomo esta:

*/

for(let i = 0 i < 10; i++) {
    if (cond) {
        ... // <- one more nesting level
    }
}

// Nós podemos escrever:

for (let i = 0; i < 10; i++) {
    if (!cond) continue;
    ... // <- no extra nesting level
}

/*

Algo semelhante pode ser feito com if/elsee return.

Por exemplo, duas construções abaixo são idênticas.

Opção 1:

*/

function pow(x, n) {
    if (n < 0) {
        alert("Negative 'n' not supported");
    } else {
        let result = 1;

        for (let i = 0; i < n; i++) {
            result *= x;
        }

        return result;
    }
}

// Opção 2:

function pow(x, n) {
    if (n < 0) {
        alert("Negative 'n' not supported");
        return;
    }

    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

/*

O segundo é mais legível porque o “caso especial” de n < 0é tratado desde o início. Uma vez que a verificação é feita, podemos passar para o fluxo de código “principal” sem a necessidade de aninhamento adicional.

Posicionamento da função
Se você estiver escrevendo várias funções “auxiliares” e o código que as utiliza, existem três maneiras de organizar as funções.

1. Declare as funções acima do código que as utiliza:

*/

// function declarations
function createElement() {
    ...
}

function setHandler(elem) {
    ...
}

function walkAround() {
    ...
}

// the code which uses them
let elem = createElement();
setHandler(elem);
walkAround();

// 2.Código primeiro, depois funções

// the code which uses the functions
let elem = createElement();
setHandler(elem);
walkAround();

// --- helper functions ---
function createElement() {
    ...
}

function setHandler(elem) {
    ...
}

function walkAround() {
    ...
}

/*

3.Misto: uma função é declarada onde é usada pela primeira vez.

Na maioria das vezes, a segunda variante é a preferida.

Isso porque ao ler o código, primeiro queremos saber o que ele faz . Se o código for primeiro, fica claro desde o início. Então, talvez não precisemos ler as funções, especialmente se seus nomes forem descritivos do que elas realmente fazem.

Guias de estilo
Um guia de estilo contém regras gerais sobre “como escrever” código, por exemplo, quais aspas usar, quantos espaços para recuar, o comprimento máximo da linha, etc. Muitas coisas menores.

Quando todos os membros de uma equipe usam o mesmo guia de estilo, o código parece uniforme, independentemente de qual membro da equipe o escreveu.

É claro que uma equipe sempre pode escrever seu próprio guia de estilo, mas geralmente não há necessidade. Existem muitos guias existentes para escolher.

Algumas escolhas populares:

. Guia de estilo do Google JavaScript
. Guia de estilo JavaScript do Airbnb
. Idiomático.JS
. StandardJS
. (e muitos mais)

Se você é um desenvolvedor iniciante, comece com a folha de dicas no início deste capítulo. Então você pode navegar em outros guias de estilo para pegar mais ideias e decidir qual você mais gosta.

Linters automatizados
Linters são ferramentas que podem verificar automaticamente o estilo do seu código e fazer sugestões de melhoria.

A melhor coisa sobre eles é que a verificação de estilo também pode encontrar alguns bugs, como erros de digitação em nomes de variáveis ​​ou funções. Por causa desse recurso, o uso de um linter é recomendado mesmo se você não quiser se ater a um “estilo de código” específico.

Aqui estão algumas ferramentas de linting conhecidas:

. JSLint – um dos primeiros linters.
. JSHint – mais configurações do que JSLint.
. ESLint – provavelmente o mais novo.
Todos eles podem fazer o trabalho. O autor usa ESLint .

A maioria dos linters está integrada com muitos editores populares: basta habilitar o plugin no editor e configurar o estilo.

Por exemplo, para ESLint você deve fazer o seguinte:

1. Instale o Node.js.
2. Instale o ESLint com o comando npm install -g eslint(npm é um instalador de pacote JavaScript).
3. Crie um arquivo de configuração nomeado .eslintrcna raiz do seu projeto JavaScript (na pasta que contém todos os seus arquivos).
4. Instale/habilite o plug-in para seu editor que se integra ao ESLint. A maioria dos editores tem um.
Veja um exemplo de .eslintrcarquivo:

Aqui a diretiva "extends"denota que a configuração é baseada no conjunto de configurações “eslint:recommended”. Depois disso, especificamos o nosso próprio.

Também é possível baixar conjuntos de regras de estilo da web e estendê-los. Consulte https://eslint.org/docs/user-guide/getting-started para obter mais detalhes sobre a instalação.

Além disso, alguns IDEs possuem linting integrado, o que é conveniente, mas não tão personalizável quanto o ESLint.

Resumo
Todas as regras de sintaxe descritas neste capítulo (e nos guias de estilo referenciados) visam aumentar a legibilidade do seu código. Todos eles são discutíveis.

Quando pensamos em escrever um código “melhor”, as perguntas que devemos nos fazer são: “O que torna o código mais legível e fácil de entender?” e “O que pode nos ajudar a evitar erros?” Essas são as principais coisas a serem lembradas ao escolher e debater estilos de código.

A leitura de guias de estilo populares permitirá que você se mantenha atualizado com as ideias mais recentes sobre tendências de estilo de código e práticas recomendadas.

*/

