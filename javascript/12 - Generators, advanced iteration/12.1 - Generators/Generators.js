/*

Geradores
As funções regulares retornam apenas um valor único (ou nada).

Os geradores podem retornar (“rendimento”) vários valores, um após o outro, sob demanda. Eles funcionam muito bem com iteráveis , permitindo criar fluxos de dados com facilidade.

Funções do gerador
Para criar um gerador, precisamos de uma construção de sintaxe especial: function*, chamada “função geradora”.

Se parece com isso:

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

As funções do gerador se comportam de maneira diferente das normais. Quando tal função é chamada, ela não executa seu código. Em vez disso, ele retorna um objeto especial, chamado “objeto gerador”, para gerenciar a execução.

Aqui, dê uma olhada:

*/

function* generateSequence() {
   yield 1;
   yield 2;
   return 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
alert(generator); // [object Generator]

/*

A execução do código da função ainda não foi iniciada:


O método principal de um gerador é next(). Quando chamado, executa a execução até a yield <value>instrução mais próxima ( valuepode ser omitido, então é undefined). Em seguida, a execução da função é pausada e o yield valueé retornado ao código externo.

O resultado de next()é sempre um objeto com duas propriedades:

value: o valor rendido.
done: truese o código da função terminou, caso contrário false.
Por exemplo, aqui criamos o gerador e obtemos seu primeiro valor gerado:

*/

function* generateSequence() {
   yield 1;
   yield 2;
   return 3;
}

let generator2 = generateSequence();

let one = generator2.next();

alert(JSON.stringify(one)); // {value: 1, done: false}

/*

A partir de agora, obtivemos apenas o primeiro valor e a execução da função está na segunda linha:


Vamos ligar de generator.next()novo. Ele retoma a execução do código e retorna o seguinte yield:

let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}

E, se chamarmos pela terceira vez, a execução chega ao returncomando que finaliza a função:

let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, done: true}

Agora o gerador está pronto. Devemos vê-lo done:truee processá -lo value:3como o resultado final.

Novas chamadas para generator.next()não fazem mais sentido. Se os fizermos, eles retornarão o mesmo objeto: {done: true}.

function* f(…)ou function *f(…)?
Ambas as sintaxes estão corretas.

Mas geralmente a primeira sintaxe é preferida, pois a estrela *denota que é uma função geradora, descreve o tipo, não o nome, portanto, deve ficar com a palavra- functionchave.

Geradores são iteráveis
Como você provavelmente já adivinhou olhando para o next()método, os geradores são iteráveis .

Podemos fazer um loop sobre seus valores usando for..of:

*/

function* generateSequence() {
   yield 1;
   yield 2;
   return 3;
}

let generator3 = generateSequence();

for (let value of generator3) {
   alert(value); // 1, then 2
}

/*

Parece muito melhor do que ligar .next().value, certo?

…Mas observe: o exemplo acima mostra 1, então 2, e isso é tudo. Não mostra 3!

É porque a for..ofiteração ignora o último value, quando done: true. Então, se quisermos que todos os resultados sejam mostrados por for..of, devemos retorná-los com yield:

*/

function* generateSequence() {
   yield 1;
   yield 2;
   yield 3;
}

let generator4 = generateSequence();

for (let value of generator4) {
   alert(value); // 1, then 2, then 3
}

/*

No código acima, ...generateSequence()transforma o objeto gerador iterável em um array de itens (leia mais sobre a sintaxe de spread no capítulo Parâmetros Rest e sintaxe de spread )

Usando geradores para iteráveis
Algum tempo atrás, no capítulo Iteráveis , criamos um rangeobjeto iterável que retorna valores from..to.

Aqui, vamos relembrar o código:

*/

let range = {
   from: 1,
   to: 5,

   // for..of range calls this method once in the very beginning
   [Symbol.iterator]() {
      // ...it returns the iterator object:
      // onward, for..of works only with that object, asking it for next values
      return {
         current: this.from,
         last: this.to,

         // next() is called on each iteration by the for..of loop
         next() {
            // it should return the value as an object {done:.., value :...}
            if (this.current <= this.last) {
               return { done: false, value: this.current++ };
            } else {
               return { done: true };
            }
         }
      };
   }
};

// iteration over range returns numbers from range.from to range.to
alert([...range]); // 1,2,3,4,5

/*

Podemos usar uma função geradora para iteração fornecendo-a como Symbol.iterator.

Aqui está o mesmo range, mas muito mais compacto:

*/

let range2 = {
   from: 1,
   to: 5,

   *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
      for (let value = this.from; value <= this.to; value++) {
         yield value;
      }
   }
}

alert([...range]); // 1,2,3,4,5

/*

Isso funciona, porque range[Symbol.iterator]()agora retorna um gerador, e os métodos do gerador são exatamente o que se for..ofespera:

tem um .next()método
que retorna valores na forma{value: ..., done: true/false}
Isso não é uma coincidência, é claro. Geradores foram adicionados à linguagem JavaScript com iteradores em mente, para implementá-los facilmente.

A variante com um gerador é muito mais concisa do que o código iterável original de range, e mantém a mesma funcionalidade.

Geradores podem gerar valores para sempre
Nos exemplos acima, geramos sequências finitas, mas também podemos fazer um gerador que gera valores para sempre. Por exemplo, uma sequência interminável de números pseudo-aleatórios.

Isso certamente exigiria um break(ou return) em for..ofcima de tal gerador. Caso contrário, o loop repetiria indefinidamente e travaria.

Composição do gerador
A composição do gerador é um recurso especial dos geradores que permite “embutir” os geradores uns nos outros de forma transparente.

Por exemplo, temos uma função que gera uma sequência de números:

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

Agora gostaríamos de reutilizá-lo para gerar uma sequência mais complexa:

primeiro, dígitos 0..9(com códigos de caracteres 48…57),
seguido por letras maiúsculas do alfabeto A..Z(códigos de caracteres 65…90)
seguido por letras minúsculas do alfabeto a..z(códigos de caracteres 97…122)
Podemos usar essa sequência, por exemplo, para criar senhas selecionando caracteres dela (poderia adicionar caracteres de sintaxe também), mas vamos gerá-la primeiro.

Em uma função regular, para combinar resultados de várias outras funções, nós as chamamos, armazenamos os resultados e, em seguida, juntamos no final.

Para geradores, existe uma yield*sintaxe especial para “embutir” (compor) um gerador em outro.

O gerador composto:

*/

function* generateSequence(start, end) {
   for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

   // 0..9
   yield* generateSequence(48, 57);

   // A..Z
   yield* generateSequence(65, 90);

   // a..z
   yield* generateSequence(97, 122);

}

let str = '';

for (let code of generatePasswordCodes()) {
   str += String.fromCharCode(code);
}

alert(str);

/*

A yield*diretiva delega a execução a outro gerador. Este termo significa que yield* genitera sobre o gerador gene encaminha de forma transparente seus rendimentos para fora. Como se os valores fossem fornecidos pelo gerador externo.

O resultado é o mesmo que se incorporássemos o código de geradores aninhados:

*/

function* generateSequence(start, end) {
   for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

   // yield* generateSequence(48, 57);
   for (let i = 48; i <= 57; i++) yield i;

   // yield* generateSequence(65, 90);
   for (let i = 65; i <= 90; i++) yield i;

   // yield* generateSequence(97, 122);
   for (let i = 97; i <= 122; i++) yield i;

}

let str2 = '';

for (let code of generateAlphaNum()) {
   str2 += String.fromCharCode(code);
}

alert(str2); // 0..9A..Za..z

/*

Uma composição de gerador é uma maneira natural de inserir um fluxo de um gerador em outro. Não usa memória extra para armazenar resultados intermediários.

“rendimento” é uma via de mão dupla
Até o momento, geradores eram semelhantes a objetos iteráveis, com uma sintaxe especial para gerar valores. Mas, na verdade, eles são muito mais poderosos e flexíveis.

Isso porque yieldé uma via de mão dupla: não só retorna o resultado para fora, como também pode passar o valor para dentro do gerador.

Para fazer isso, devemos chamar generator.next(arg), com um argumento. Esse argumento se torna o resultado de yield.

Vejamos um exemplo:

*/

function* gen() {
   // Pass a question to the outer code and wait for an answer
   let result = yield "2 + 2 = ?"; // (*)

   alert(result);
}

let generator5 = gen();

let question = generator5.next().value; // <-- yield returns the value

generator5.next(4); // --> pass the result into the generator

/*

1. A primeira chamada generator.next()deve ser sempre feita sem argumento (o argumento é ignorado se passado). Ele inicia a execução e retorna o resultado do primeiro yield "2+2=?". Neste ponto o gerador pausa a execução, permanecendo na linha (*).
2. Então, como mostra a figura acima, o resultado de yieldfica na questionvariável do código de chamada.
3. Em generator.next(4), o gerador recomeça, e 4entra como resultado: let result = 4.

Observe que o código externo não precisa chamar imediatamente next(4). Pode levar algum tempo. Isso não é um problema: o gerador vai esperar.

Por exemplo:

// resume the generator after some time
setTimeout(() => generator.next(4), 1000);
Como podemos ver, ao contrário das funções regulares, um gerador e o código de chamada podem trocar resultados passando valores em next/yield.

Para tornar as coisas mais óbvias, aqui está outro exemplo, com mais chamadas:

*/

function* gen() {
   let ask1 = yield "2 + 2 = ?";

   alert(ask1); // 4

   let ask2 = yield "3 * 3 = ?"

   alert(ask2); // 9
}

let generator6 = gen();

alert(generator6.next().value); // "2 + 2 = ?"

alert(generator6.next(4).value); // "3 * 3 = ?"

alert(generator6.next(9).done); // true

/*

1. O primeiro .next()inicia a execução… Chega ao primeiro yield.
2. O resultado é retornado ao código externo.
3. O segundo .next(4)retorna 4ao gerador como resultado do primeiro yielde retoma a execução.
4. …Atinge o segundo yield, que se torna o resultado da chamada do gerador.
5. A terceira next(9)passa 9para o gerador como resultado da segunda yielde retoma a execução que chega ao final da função, então done: true.

É como um jogo de “ping-pong”. Cada um next(value)(excluindo o primeiro) passa um valor para o gerador, que se torna o resultado da corrente yield, e então recebe de volta o resultado do próximo yield.

gerador.lance
Conforme observamos nos exemplos acima, o código externo pode passar um valor para o gerador, como resultado de yield.

…Mas também pode iniciar (lançar) um erro lá. Isso é natural, pois um erro é uma espécie de resultado.

Para passar um erro para um yield, devemos chamar generator.throw(err). Nesse caso, o erré jogado na linha com aquele yield.

Por exemplo, aqui o rendimento de "2 + 2 = ?"leva a um erro:

*/

function* gen() {
   try {
      let result = yield "2 + 2 = ?"; // (1)

      alert("The execution does not reach here, because the exception is thrown above");
   } catch (e) {
      alert(e); // shows the error
   }
}

let generator7 = gen();

let question2 = generator.next().value;

generator7.throw(new Error("The answer is not found in my database")); // (2)

/*

O erro lançado no gerador na linha (2)leva a uma exceção na linha (1)com yield. No exemplo acima, try..catchpega e mostra.

Se não o pegarmos, então, como qualquer exceção, ele “cai” do gerador no código de chamada.

A linha atual do código de chamada é a linha com generator.throw, rotulada como (2). Então podemos pegá-lo aqui, assim:

*/

function* generate() {
   let result = yield "2 + 2 = ?"; // Error in this line
}

let generator8 = generate();

let question3 = generator.next().value;

try {
   generator8.throw(new Error("The answer is not found in my database"));
} catch (e) {
   alert(e); // shows the error
}

/*

Se não detectarmos o erro lá, então, como de costume, ele cai no código de chamada externo (se houver) e, se não for detectado, mata o script.

gerador.retorno
generator.return(value)finaliza a execução do gerador e retorna o dado value.

*/

function* gen() {
   yield 1;
   yield 2;
   yield 3;
}

const g = gen();

g.next();        // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next();        // { value: undefined, done: true }

/*

Se usarmos novamente generator.return()em um gerador completo, ele retornará esse valor novamente ( MDN ).

Muitas vezes não o usamos, pois na maioria das vezes queremos obter todos os valores de retorno, mas pode ser útil quando queremos parar o gerador em uma condição específica.

Resumo
Geradores são criados por funções geradoras function* f(…) {…}.
Dentro dos geradores (somente) existe um yieldoperador.
O código externo e o gerador podem trocar resultados por meio de next/yieldchamadas.
No JavaScript moderno, geradores raramente são usados. Mas às vezes eles são úteis, porque a capacidade de uma função de trocar dados com o código de chamada durante a execução é única. E, com certeza, eles são ótimos para fazer objetos iteráveis.

Além disso, no próximo capítulo aprenderemos geradores assíncronos, que são usados ​​para ler fluxos de dados gerados assincronamente (por exemplo, buscas paginadas em uma rede) em for await ... ofloops.

Na programação da web, geralmente trabalhamos com dados transmitidos, então esse é outro caso de uso muito importante.

*/

