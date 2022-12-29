/*

Tratamento de erros, "tentar...pegar"
Não importa o quão bom sejamos em programação, às vezes nossos scripts têm erros. Eles podem ocorrer devido a nossos erros, uma entrada inesperada do usuário, uma resposta incorreta do servidor e por milhares de outros motivos.

Normalmente, um script “morre” (para imediatamente) em caso de erro, imprimindo-o no console.

Mas existe uma construção de sintaxe try...catchque nos permite “capturar” erros para que o script possa, em vez de morrer, fazer algo mais razoável.

A sintaxe “try…catch”
A try...catchconstrução tem dois blocos principais: try, e então catch:

try {

  // code...

} catch (err) {

  // error handling

}

Funciona assim:

1. Primeiro, o código try {...}é executado.
2. Se não houve erros, então catch (err)é ignorado: a execução chega ao final de trye continua, pulando catch.
3. Se ocorrer um erro, a tryexecução será interrompida e o controle fluirá para o início de catch (err). A errvariável (podemos usar qualquer nome para ela) conterá um objeto de erro com detalhes sobre o que aconteceu.

Portanto, um erro dentro do try {...}bloco não mata o script – temos a chance de tratá-lo em catch.

Vejamos alguns exemplos.

Um exemplo sem erros: mostra alert (1)e (2):

*/

try {

   alert('Start of try runs');  // (1) <--

   // ...no errors here

   alert('End of try runs');   // (2) <--

} catch (err) {

   alert('Catch is ignored, because there are no errors'); // (3)

}

// Um exemplo com um erro: shows (1)e (3):

try {

   alert('Start of try runs');  // (1) <--

   lalala; // error, variable is not defined!

   alert('End of try (never reached)');  // (2)

} catch (err) {

   alert(`Error has occurred!`); // (3) <--

}

/*

try...catchsó funciona para erros de tempo de execução
Para try...catchfuncionar, o código deve ser executável. Em outras palavras, deve ser um JavaScript válido.

Não funcionará se o código estiver sintaticamente errado, por exemplo, se tiver chaves incompatíveis:

try {
   {{{{{{{{{{{{
 } catch (err) {
   alert("The engine can't understand this code, it's invalid");
}

O mecanismo JavaScript primeiro lê o código e depois o executa. Os erros que ocorrem na fase de leitura são chamados de erros “parse-time” e são irrecuperáveis ​​(de dentro desse código). Isso ocorre porque o mecanismo não consegue entender o código.

Portanto, try...catchsó pode lidar com erros que ocorrem em código válido. Tais erros são chamados de “erros de tempo de execução” ou, às vezes, “exceções”.

try...catchfunciona de forma sincronizada
Se uma exceção acontecer no código “agendado”, como em setTimeout, try...catchnão será detectada:

*/

try {
   setTimeout(function () {
      noSuchVariable; // script will die here
   }, 1000);
} catch (err) {
   alert("won't work");
}

/*

Isso porque a própria função é executada posteriormente, quando o motor já saiu da try...catchconstrução.

Para capturar uma exceção dentro de uma função agendada, try...catchdeve estar dentro dessa função:

*/

setTimeout(function () {
   try {
      noSuchVariable; // try...catch handles the error!
   } catch {
      alert("error is caught here!");
   }
}, 1000);

/*

objeto de erro
Quando ocorre um erro, o JavaScript gera um objeto contendo os detalhes sobre ele. O objeto é então passado como um argumento para catch:

try {
  // ...
} catch (err) { // <-- the "error object", could use another word instead of err
  // ...
}
Para todos os erros integrados, o objeto de erro tem duas propriedades principais:

name
Nome do erro. Por exemplo, para uma variável indefinida que é "ReferenceError".
message
Mensagem textual sobre detalhes do erro.
Existem outras propriedades não padrão disponíveis na maioria dos ambientes. Um dos mais amplamente utilizados e suportados é:

stack
Pilha de chamada atual: uma string com informações sobre a sequência de chamadas aninhadas que levaram ao erro. Usado para fins de depuração.
Por exemplo:

*/

try {
   lalala; // error, variable is not defined!
} catch (err) {
   alert(err.name); // ReferenceError
   alert(err.message); // lalala is not defined
   alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)

   // Can also show an error as a whole
   // The error is converted to string as "name: message"
   alert(err); // ReferenceError: lalala is not defined
}

/*

Encadernação “catch” opcional
Uma adição recente
Esta é uma adição recente à linguagem. Navegadores antigos podem precisar de polyfills .
Se não precisarmos dos detalhes do erro, podemos catchomiti-los:

try {
  // ...
} catch { // <-- without (err)
  // ...
}
Usando “tentar…pegar”

Vamos explorar um caso de uso real do try...catch.

Como já sabemos, o JavaScript oferece suporte ao método JSON.parse(str) para ler valores codificados em JSON.

Geralmente é usado para decodificar os dados recebidos pela rede, do servidor ou de outra fonte.

Recebemos e chamamos JSON.parseassim:

*/

let json = '{"name":"John", "age": 30}'; // data from the server

let user = JSON.parse(json); // convert the text representation to JS object

// now user is an object with properties from the string
alert(user.name); // John
alert(user.age);  // 30

/*

ocê pode encontrar informações mais detalhadas sobre JSON nos métodos JSON, no capítulo JSON.

Se jsonestiver malformado, JSON.parsegera um erro, então o script “morre”.

Devemos ficar satisfeitos com isso? Claro que não!

Dessa forma, se algo estiver errado com os dados, o visitante nunca saberá disso (a menos que abra o console do desenvolvedor). E as pessoas realmente não gostam quando algo “simplesmente morre” sem nenhuma mensagem de erro.

Vamos usar try...catchpara lidar com o erro:

*/

let json2 = "{ bad json }";

try {

   let user = JSON.parse(json2); // <-- when an erro occurs...
   alert(user.name); // doesn't work

} catch (err) {
   // ...the execution jumps here
   alert("Our apologies, the data has errors, we'll try to request it one more time.");
   alert(err.name);
   alert(err.message);
}

/*

Aqui usamos o catchbloco apenas para mostrar a mensagem, mas podemos fazer muito mais: enviar um novo pedido de rede, sugerir uma alternativa ao visitante, enviar informação sobre o erro a uma central de registo, … . Tudo muito melhor do que apenas morrer.

Jogando nossos próprios erros
E se jsonestiver sintaticamente correto, mas não tiver uma namepropriedade obrigatória?

Assim:

*/

let json3 = '{ "age": 30 }'; // incomplete data

try {

   let user = JSON.parse(json3); // <-- no erros
   alert(user.name); // no name!

} catch (err) {
   alert("doesn't execute");
}

/*

Aqui JSON.parseroda normalmente, mas a ausência de nameé realmente um erro nosso.

Para unificar o tratamento de erros, usaremos o throwoperador.

Operador de “jogar”
O throwoperador gera um erro.

A sintaxe é:

throw <error object>

Tecnicamente, podemos usar qualquer coisa como um objeto de erro. Isso pode até ser um primitivo, como um número ou uma string, mas é melhor usar objetos, de preferência com propriedades namee message(para ficar um pouco compatível com os erros internos).

O JavaScript tem muitos construtores integrados para erros padrão: Error, SyntaxError, ReferenceErrore TypeErroroutros. Também podemos usá-los para criar objetos de erro.

A sintaxe deles é:

let error = new Error(message);
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...

Para erros internos (não para quaisquer objetos, apenas para erros), a namepropriedade é exatamente o nome do construtor. E messageé retirado do argumento.

Por exemplo:

*/

let error = new Error("Things happen o_O");

alert(error.name); // Error
alert(error.message); // Things happen o_O

// Vamos ver que tipo de erro JSON.parsegera:

try {
   JSON.parse("{ bad json o_O }");
} catch (err) {
   alert(err.name); // SyntaxError
   alert(err.message); // Unexpected token b in JSON at position 2
}

/*

Como podemos ver, é um arquivo SyntaxError.

E no nosso caso, a ausência de nameé um erro, pois os usuários devem ter um arquivo name.

Então vamos lançar:

*/

let json4 = '{ "age": 30 }'; // incomplete data

try {

   let user = JSON.parse(json4); // <-- no errors

   if (!user.name) {
      throw new SyntaxError("Incomplete data: no name"); // (*)
   }

   alert(user.name);

} catch (err) {
   alert("JSON Error: " + err.message); // JSON Error: Incomplete data: no name
}

/*


Na linha (*), o throwoperador gera um SyntaxErrorcom o dado message, da mesma forma que o próprio JavaScript o geraria. A execução de trypára imediatamente e o fluxo de controle salta para catch.

Agora catchtornou-se um único local para todo o tratamento de erros: para JSON.parsee outros casos.

Relançando
No exemplo acima, usamos try...catchpara lidar com dados incorretos. Mas é possível que outro erro inesperado ocorra dentro do try {...}bloco? Como um erro de programação (variável não está definida) ou outra coisa, não apenas essa coisa de “dados incorretos”.

Por exemplo:

*/

let json5 = '{ "age": 30 }'; // incomplete data

try {
   user = JSON.parse(json5); // <-- forgot to put "let" before user

   // ...
} catch (err) {
   alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
   // (no JSON Error actually)
}

/*

Claro, tudo é possível! Os programadores cometem erros. Mesmo em utilitários de código aberto usados ​​por milhões por décadas – de repente, um bug pode ser descoberto e levar a hacks terríveis.

No nosso caso, try...catché colocado para detectar erros de “dados incorretos”. Mas, por sua natureza, catchobtém todos os erros de arquivos try. Aqui ele recebe um erro inesperado, mas ainda mostra a mesma "JSON Error"mensagem. Isso está errado e também torna o código mais difícil de depurar.

Para evitar tais problemas, podemos empregar a técnica de “relançamento”. A regra é simples:

Catch deve processar apenas os erros que conhece e “relançar” todos os outros.

A técnica de “relançamento” pode ser explicada com mais detalhes como:

1. Catch obtém todos os erros.
2. No catch (err) {...}bloco analisamos o objeto de erro err.
3. Se não sabemos como lidar com isso, nós o fazemos throw err.

Normalmente, podemos verificar o tipo de erro usando o instanceofoperador:

*/

try {
   user = { /*...*/ };
} catch (err) {
   if (err instanceof ReferenceError) {
      alert('ReferencecError');  // "ReferenceError" for accessing an undefined variable
   }
}

/*

Também podemos obter o nome da classe de erro da err.namepropriedade. Todos os erros nativos o possuem. Outra opção é ler err.constructor.name.

No código abaixo, usamos rethrowing para que catchapenas manipula SyntaxError:

*/

let json6 = '{ "age": 30 }'; // incomplete data
try {

   let user = JSON.parse(json6);

   if (!user.name) {
      throw new SyntaxError("Incomplete data: no name");
   }

   blabla(); // unexpected error

   alert(user.name);

} catch (err) {

   if (err instanceof SyntaxError) {
      alert("JSON Error: " + err.message);
   } else {
      throw err; // rethrow (*)
   }

}

/*

O erro jogando on-line (*)de dentro do catchbloco “cai” try...catche pode ser detectado por uma construção externa try...catch(se existir) ou mata o script.

Portanto, o catchbloco realmente lida apenas com erros com os quais sabe lidar e “pula” todos os outros.

O exemplo abaixo demonstra como tais erros podem ser detectados por mais um nível de try...catch:

*/

function readData() {
   let json = '{ "age": 30 }';

   try {
      // ...
      blabla(); // error!
   } catch (err) {
      // ...
      if (!(err instanceof SyntaxError)) {
         throw err; // rethrow (don't know how to deal with it)
      }
   }
}

try {
   readData();
} catch (err) {
   alert("External catch got: " + err); // caught it!
}

/*

Aqui readDatasó sabe dar conta SyntaxError, enquanto o de fora try...catchsabe dar conta de tudo.

tente...pegue...finalmente
Espere, isso não é tudo.

A try...catchconstrução pode ter mais uma cláusula de código: finally.

Se existir, será executado em todos os casos:

após try, se não houver erros,
depois catch, se houver erros.
A sintaxe estendida fica assim:

try {
   ... try to execute the code ...
} catch (err) {
   ... handle errors ...
} finally {
   ... execute always ...
}

Tente rodar este código:

*/

try {
   alert('try')
   if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
   alert('catch');
} finally {
   alert('finally');
}

/*

O código tem duas formas de execução:

1. Se você responder “Sim” para “Comete um erro?”, então try -> catch -> finally.
2. Se você disser “Não”, então try -> finally.

A finallycláusula é frequentemente usada quando começamos a fazer algo e queremos finalizá-lo em qualquer caso de resultado.

Por exemplo, queremos medir o tempo que uma função de números de Fibonacci fib(n)leva. Naturalmente, podemos começar a medir antes de executar e terminar depois. Mas e se houver um erro durante a chamada da função? Em particular, a implementação de fib(n)no código abaixo retorna um erro para números negativos ou não inteiros.

A finallycláusula é um ótimo lugar para terminar as medições, não importa o quê.

Aqui finallygarante que o tempo será medido corretamente em ambas as situações – em caso de execução bem-sucedida fibe em caso de erro na mesma:

*/

let num = +prompt("Enter a positive integer number?", 35)

let diff, result;

function fib(n) {
   if (n < 0 || Math.trunc(n) != n) {
      throw new Error("Must not be negative, and also an integer.");
   }
   return n <= 1 ? n : fib(n - 1) + fib(n - 1);
}

let start = Date.now();

try {
   result = fub(num);
} catch (err) {
   result = 0;
} finally {
   diff = Date.now() - start;
}

alert(result || "error occurred");

alert(`execution took ${diff}ms`);

/*

Você pode verificar executando o código com enter 35into prompt– ele é executado normalmente, finallyapós try. E então digite -1- haverá um erro imediato e a execução levará 0ms. Ambas as medições são feitas corretamente.

Em outras palavras, a função pode terminar com returnou throw, isso não importa. A finallycláusula é executada em ambos os casos.

Variáveis ​​são locais dentrotry...catch...finally
Observe que as variáveis result​​e diffno código acima são declaradas antes try...catch de .

Caso contrário, se declararmos letem trybloco, ele só ficará visível dentro dele.

finallyereturn
A finallycláusula funciona para qualquer saída de try...catch. Isso inclui um return.

No exemplo abaixo, há um returnin try. Nesse caso, finallyé executado logo antes do controle retornar ao código externo.

*/

function func() {

   try {
      return 1;

   } catch (err) {
      /* ... */
   } finally {
      alert('finally');
   }
}

alert(func()); // first works alert from finally, and then this one

/*

try...finally
A try...finallyconstrução, sem catchcláusula, também é útil. Nós o aplicamos quando não queremos lidar com erros aqui (deixá-los cair), mas queremos ter certeza de que os processos que iniciamos são finalizados.

function func() {
  // start doing something that needs completion (like measurements)
  try {
    // ...
  } finally {
    // complete that thing even if all dies
  }
}
No código acima, trysempre ocorre um erro interno, porque não há catch. Mas finallyfunciona antes que o fluxo de execução saia da função.

captura global
Ambiente específico
As informações desta seção não fazem parte do núcleo do JavaScript.

Vamos imaginar que temos um erro fatal fora de try...catch, e o script morreu. Como um erro de programação ou alguma outra coisa terrível.

Existe uma maneira de reagir a tais ocorrências? Podemos querer registrar o erro, mostrar algo ao usuário (normalmente ele não vê mensagens de erro), etc.

Não há nenhum na especificação, mas os ambientes geralmente fornecem, porque é realmente útil. Por exemplo, Node.js tem process.on("uncaughtException")para isso. E no navegador podemos atribuir uma função à propriedade especial window.onerror , que será executada em caso de erro não detectado.

A sintaxe:

window.onerror = function(message, url, line, col, error) {
  // ...
};

message
Mensagem de erro.
url
URL do script onde ocorreu o erro.
line, col
Números de linha e coluna onde ocorreu o erro.
error
Objeto de erro.
Por exemplo:

*/

/*

<script>
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };

  function readData() {
    badFunc(); // Whoops, something went wrong!
  }

  readData();
</script>

*/

/*

A função do manipulador global window.onerrorgeralmente não é recuperar a execução do script – isso provavelmente é impossível em caso de erros de programação, mas enviar a mensagem de erro aos desenvolvedores.

Também existem serviços da web que fornecem registro de erros para esses casos, como https://errorception.com ou https://www.muscula.com .

Eles funcionam assim:

1. Nós nos registramos no serviço e obtemos deles um pedaço de JS (ou um URL de script) para inserir nas páginas.
2. Esse script JS define uma window.onerrorfunção personalizada.
3. Quando ocorre um erro, ele envia uma solicitação de rede sobre isso ao serviço.
4. Podemos fazer login na interface da Web do serviço e ver os erros.

Resumo
A try...catchconstrução permite lidar com erros de tempo de execução. Ele literalmente permite “tentar” rodar o código e “capturar” erros que possam ocorrer nele.

A sintaxe é:

try {
  // run this code
} catch (err) {
  // if an error happened, then jump here
  // err is the error object
} finally {
  // do in any case after try/catch
}
Pode não haver catchseção ou nenhum finally, portanto, construções mais curtas try...catche try...finallytambém são válidas.

Objetos de erro têm as seguintes propriedades:

message– a mensagem de erro legível por humanos.
name– a string com o nome do erro (nome do construtor do erro).
stack(não padrão, mas bem suportado) – a pilha no momento da criação do erro.

Se um objeto de erro não for necessário, podemos omiti-lo usando catch {em vez de catch (err) {.

Também podemos gerar nossos próprios erros usando o throwoperador. Tecnicamente, o argumento de throwpode ser qualquer coisa, mas geralmente é um objeto de erro herdado da Errorclasse interna. Mais informações sobre a extensão de erros no próximo capítulo.

O relançamento é um padrão muito importante de tratamento de erros: um catchbloco geralmente espera e sabe como lidar com o tipo de erro específico, portanto, deve relançar os erros que não conhece.

Mesmo que não tenhamos try...catch, a maioria dos ambientes nos permite configurar um manipulador de erros “global” para detectar erros que “caem”. No navegador, isso é window.onerror.

*/


