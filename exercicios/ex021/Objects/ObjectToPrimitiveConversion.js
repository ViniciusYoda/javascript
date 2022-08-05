/*

Conversão de objeto para primitivo
O que acontece quando os objetos são adicionados obj1 + obj2, subtraídos obj1 - obj2ou impressos usando alert(obj)?

JavaScript não permite que você personalize como os operadores trabalham em objetos. Ao contrário de algumas outras linguagens de programação, como Ruby ou C++, não podemos implementar um método de objeto especial para lidar com adição (ou outros operadores).

No caso de tais operações, os objetos são convertidos automaticamente em primitivas e, em seguida, a operação é realizada sobre essas primitivas e resulta em um valor primitivo.

Essa é uma limitação importante: o resultado de obj1 + obj2(ou outra operação matemática) não pode ser outro objeto!

Por exemplo, não podemos fazer objetos representando vetores ou matrizes (ou conquistas ou qualquer outra coisa), adicioná-los e esperar um objeto “somado” como resultado. Tais proezas arquitetônicas são automaticamente “fora do quadro”.

Então, como tecnicamente não podemos fazer muito aqui, não há matemática com objetos em projetos reais. Quando isso acontece, com raras exceções, é por causa de um erro de codificação.

Neste capítulo, abordaremos como um objeto é convertido em primitivo e como personalizá-lo.

Temos dois propósitos:

1. Isso nos permitirá entender o que está acontecendo em caso de erros de codificação, quando tal operação aconteceu acidentalmente.

2. Há exceções, onde tais operações são possíveis e parecem boas. Por exemplo, subtraindo ou comparando datas ( Dateobjetos). Nós os encontraremos mais tarde.

Regras de conversão
No capítulo Conversões de Tipos vimos as regras para conversões numéricas, string e booleanas de primitivas. Mas deixamos uma lacuna para objetos. Agora, como sabemos sobre métodos e símbolos, torna-se possível preenchê-lo.

1. Não há conversão para booleano. Todos os objetos estão trueem um contexto booleano, simples assim. Existem apenas conversões numéricas e de strings.
2. A conversão numérica acontece quando subtraímos objetos ou aplicamos funções matemáticas. Por exemplo, Dateobjetos (a serem abordados no capítulo Data e hora ) podem ser subtraídos, e o resultado de date1 - date2é a diferença de tempo entre duas datas.
3. Quanto à conversão de string – geralmente acontece quando produzimos um objeto com alert(obj)e em contextos semelhantes.

Podemos implementar a conversão de strings e numéricas por nós mesmos, usando métodos de objetos especiais.

Agora vamos entrar em detalhes técnicos, porque é a única maneira de abordar o tópico em profundidade.

Dicas
Como o JavaScript decide qual conversão aplicar?

Existem três variantes de conversão de tipo, que acontecem em diversas situações. Eles são chamados de “dicas”, conforme descrito na especificação :

"string"
Para uma conversão de objeto para string, quando estamos fazendo uma operação em um objeto que espera uma string, como alert:

*/

// output
alert(obj);

// using object as a property key
anotherObj[obj] = 123;

/*

"number"
Para uma conversão de objeto para número, como quando estamos fazendo contas:

*/

// explicit conversion
let num = Number(obj);

// maths (except binary plus)
let n = +obj; // unary plus
let delta = date1 - date2;

// lessgreater comparison
let greater = user1 > user2;

/*

A maioria das funções matemáticas integradas também inclui essa conversão.

"default"
Ocorre em casos raros quando o operador “não tem certeza” de qual tipo esperar.

Por exemplo, o binário plus +pode funcionar tanto com strings (concatena-as) quanto com números (adiciona-as). Então, se um binário plus recebe um objeto como argumento, ele usa a "default"dica para convertê-lo.

Além disso, se um objeto é comparado usando ==uma string, número ou símbolo, também não está claro qual conversão deve ser feita, então a "default"dica é usada.

*/

// binary plus uses the "default" hint
let total = obj1 + obj2;

// obj == number uses the "default" hint
if (user == 1) { ... };

/*

Os operadores de comparação maior e menor, como < >, também podem funcionar com strings e números. Ainda assim, eles usam a "number"dica, não "default". Isso por razões históricas.

Na prática, porém, as coisas são um pouco mais simples.

Todos os objetos internos, exceto um caso ( Dateobjeto, aprenderemos mais tarde), implementam "default"a conversão da mesma maneira que "number". E provavelmente deveríamos fazer o mesmo.

Ainda assim, é importante saber sobre todas as 3 dicas, em breve veremos o porquê.

Para fazer a conversão, o JavaScript tenta encontrar e chamar três métodos de objeto:

1. Call obj[Symbol.toPrimitive](hint)– o método com a chave simbólica Symbol.toPrimitive(símbolo do sistema), se tal método existir,
3. Caso contrário, se a dica for"string"
tente chamar obj.toString()ou obj.valueOf(), o que existir.
3. Caso contrário, se a dica é "number"ou"default"
tente chamar obj.valueOf()ou obj.toString(), o que existir.

Símbolo.paraPrimitivo

Vamos começar do primeiro método. Há um símbolo embutido chamado Symbol.toPrimitiveque deve ser usado para nomear o método de conversão, assim:

*/

obj[Symbol.toPrimitive] = function(hint){
    // here goes the code to convert this object to a primitive it must return a primitive value hint = one of "string", "number", "default"
};

/*

Se o método Symbol.toPrimitiveexistir, ele será usado para todas as dicas e não serão necessários mais métodos.

Por exemplo, aqui usero objeto o implementa:

*/

let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        alert(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}}` : this.money;
    }
};

// conversions demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
// alert(user + 500); // hint: default -> 1500

/*

Como podemos ver no código, usertorna-se uma string autodescritiva ou uma quantia em dinheiro, dependendo da conversão. O método único user[Symbol.toPrimitive]trata de todos os casos de conversão.

toString/valueOf
Se não houver, o Symbol.toPrimitiveJavaScript tenta encontrar métodos toStringe valueOf:

Para a "string"dica: chame o toStringmétodo e, se ele não existir, então valueOf(assim toStringtem a prioridade para conversões de string).
Para outras dicas: valueOf, e se não existir, então toString(assim valueOftem a prioridade para matemática).
Métodos toStringe valueOfvêm desde os tempos antigos. Eles não são símbolos (os símbolos não existiam há muito tempo), mas sim métodos “regulares” com nomes de strings. Eles fornecem uma maneira alternativa “à moda antiga” de implementar a conversão.

Esses métodos devem retornar um valor primitivo. Se toStringou valueOfretornar um objeto, ele será ignorado (como se não houvesse método).

Por padrão, um objeto simples tem o seguinte toStringe valueOfmétodos:

O toStringmétodo retorna uma string "[object Object]".
O valueOfmétodo retorna o próprio objeto.
Aqui está a demonstração:

*/

let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true

/*

Então, se tentarmos usar um objeto como uma string, como em an alertou so, então, por padrão, veremos [object Object].

O padrão valueOfé mencionado aqui apenas por uma questão de integridade, para evitar qualquer confusão. Como você pode ver, ele retorna o próprio objeto e, portanto, é ignorado. Não me pergunte por que, isso é por razões históricas. Então podemos supor que não existe.

Vamos implementar esses métodos para personalizar a conversão.

Por exemplo, aqui userfaz o mesmo que acima usando uma combinação de toStringe valueOfem vez de Symbol.toPrimitive:

*/

let user = {
    name: "John",
    money: 1000,

    // for hint="string"
    toString() {
        return `{bame: "${this.name}"}`;
    },

    // for hint="number" or "default"
    valueOf() {
        return this.money;
    }
};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500

/*

Como podemos ver, o comportamento é o mesmo do exemplo anterior com Symbol.toPrimitive.

Muitas vezes, queremos um único local “pega-tudo” para lidar com todas as conversões primitivas. Neste caso, podemos implementar toStringapenas, assim:

*/

let user = {
    name: "John",

    toString() {
        return this.name;
    }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500

/*

Na ausência de Symbol.toPrimitivee valueOf, toStringtratará de todas as conversões primitivas.

Uma conversão pode retornar qualquer tipo primitivo
O importante a saber sobre todos os métodos de conversão de primitivos é que eles não necessariamente retornam o primitivo “sinalizado”.

Não há controle se toStringretorna exatamente uma string ou se Symbol.toPrimitiveo método retorna um número para a dica "number".

A única coisa obrigatória: esses métodos devem retornar uma primitiva, não um objeto.

Notas históricas
Por motivos históricos, se toStringou valueOfretorna um objeto, não há erro, mas tal valor é ignorado (como se o método não existisse). Isso porque nos tempos antigos não havia um bom conceito de “erro” em JavaScript.

Em contrapartida, Symbol.toPrimitiveé mais estrito, deve retornar uma primitiva, caso contrário haverá um erro.

Outras conversões
Como já sabemos, muitos operadores e funções realizam conversões de tipo, por exemplo, a multiplicação *converte operandos em números.

Se passarmos um objeto como argumento, existem dois estágios de cálculos:

1. O objeto é convertido em um primitivo (usando as regras descritas acima).
2. Se necessário para cálculos adicionais, a primitiva resultante também é convertida.

Por exemplo:

*/

let obj = {
    // toString handles all conversions in the absence of other methods
    toString() {
      return "2";
    }
};
  
alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number

/*

1. A multiplicação obj * 2primeiro converte o objeto em primitivo (que é uma string "2").
2. Então "2" * 2se torna 2 * 2(a string é convertida em número).

Binary plus concatenará strings na mesma situação, pois aceita de bom grado uma string:

*/

let obj = {
    toString() {
      return "2";
    }
};
  
alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation

/*

Resumo
A conversão de objeto para primitivo é chamada automaticamente por muitas funções e operadores internos que esperam um primitivo como valor.

Existem 3 tipos (dicas) disso:

"string"(para alerte outras operações que precisam de uma string)
"number"(para matemática)
"default"(poucos operadores, geralmente objetos implementam da mesma maneira que "number")
A especificação descreve explicitamente qual operador usa qual dica.

O algoritmo de conversão é:

1. Chame obj[Symbol.toPrimitive](hint)se o método existir,
2. Caso contrário, se a dica for"string"
tente chamar obj.toString()ou obj.valueOf(), o que existir.
3. Caso contrário, se a dica é "number"ou"default"
tente chamar obj.valueOf()ou obj.toString(), o que existir.

Todos esses métodos devem retornar uma primitiva para funcionar (se definida).

Na prática, muitas vezes é suficiente implementar apenas obj.toString()como um método “pega-tudo” para conversões de string que devem retornar uma representação “legível por humanos” de um objeto, para fins de registro ou depuração.

