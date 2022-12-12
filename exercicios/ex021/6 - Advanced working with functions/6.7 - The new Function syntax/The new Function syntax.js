/*

A sintaxe da "nova função"
Há mais uma maneira de criar uma função. Raramente é usado, mas às vezes não há alternativa.

Sintaxe
A sintaxe para criar uma função:

let func = new Function ([arg1, arg2, ...argN], functionBody);
A função é criada com os argumentos arg1...argNe o dado functionBody.

Fica mais fácil de entender olhando um exemplo. Aqui está uma função com dois argumentos:

*/

let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3

// E aqui temos uma função sem argumentos, apenas com o corpo da função:

let sayHi = new Function('alert("Hello")');

sayHi(); // Hello

/*

A grande diferença de outras formas que vimos é que a função é criada literalmente a partir de uma string, que é passada em tempo de execução.

Todas as declarações anteriores exigiam que nós, programadores, escrevêssemos o código da função no script.

Mas new Functionpermite transformar qualquer string em uma função. Por exemplo, podemos receber uma nova função de um servidor e então executá-la:

let str = ... receive the code from a server dynamically ...

let func = new Function(str);
func();
É usado em casos muito específicos, como quando recebemos código de um servidor, ou para compilar dinamicamente uma função de um template, em aplicações web complexas.

Fecho
Normalmente, uma função lembra onde nasceu na propriedade especial [[Environment]]. Ele faz referência ao ambiente léxico de onde foi criado (cobrimos isso no capítulo Escopo variável, fechamento ).

Mas quando uma função é criada usando new Function, ela [[Environment]]é definida para referenciar não o ambiente lexical atual, mas o global.

Assim, tal função não tem acesso às variáveis ​​externas, apenas às globais.

*/

function getFunc() {
   let value = "test";

   let func = new Function('alert(value)');

   return func;
}

getFunc()(); // error: value is not defined

// Compare-o com o comportamento normal:

function getFunc() {
   let value = "test";

   let func = function() { alert(value); };

   return func;
}

getFunc()(); // "test", from the Lexical Environment of getFunc

/*

Esse recurso especial de new Functionparece estranho, mas parece muito útil na prática.

Imagine que devemos criar uma função a partir de uma string. O código dessa função não é conhecido no momento da escrita do script (por isso não usamos funções normais), mas será conhecido no processo de execução. Podemos recebê-lo do servidor ou de outra fonte.

Nossa nova função precisa interagir com o script principal.

E se ele pudesse acessar as variáveis ​​externas?

O problema é que, antes de o JavaScript ser publicado para produção, ele é compactado usando um minificador – um programa especial que encolhe o código removendo comentários extras, espaços e – o que é importante, renomeia as variáveis ​​locais para outras mais curtas.

Por exemplo, se uma função tiver let userName, minifier a substitui por let a(ou outra letra se esta estiver ocupada) e o faz em todos os lugares. Isso geralmente é uma coisa segura de se fazer, porque a variável é local, nada fora da função pode acessá-la. E dentro da função, o minifier substitui todas as menções a ele. Minificadores são inteligentes, eles analisam a estrutura do código, então não quebram nada. Eles não são apenas um encontrar e substituir estúpido.

Portanto, se new Functiontivesse acesso a variáveis ​​externas, não seria possível encontrar arquivos userName.

Se new Functiontivesse acesso a variáveis ​​externas, teria problemas com minificadores.

Além disso, tal código seria arquitetonicamente ruim e sujeito a erros.

Para passar algo para uma função, criada como new Function, devemos usar seus argumentos.

Resumo
A sintaxe:

let func = new Function ([arg1, arg2, ...argN], functionBody);
Por motivos históricos, os argumentos também podem ser fornecidos como uma lista separada por vírgulas.

Estas três declarações significam o mesmo:

new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
As funções criadas com new Function, têm [[Environment]]como referência o ambiente lexical global, não o externo. Portanto, eles não podem usar variáveis ​​externas. Mas isso é realmente bom, porque nos protege de erros. Passar parâmetros explicitamente é um método muito melhor em termos de arquitetura e não causa problemas com minificadores.

*/