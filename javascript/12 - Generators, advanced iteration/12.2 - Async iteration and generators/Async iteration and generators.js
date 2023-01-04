/*

Iteração assíncrona e geradores
A iteração assíncrona nos permite iterar sobre os dados que vêm de forma assíncrona, sob demanda. Como, por exemplo, quando baixamos algo pedaço por pedaço em uma rede. E os geradores assíncronos o tornam ainda mais conveniente.

Vamos ver um exemplo simples primeiro, para entender a sintaxe e, em seguida, revisar um caso de uso da vida real.

Recuperar iteráveis
Vamos relembrar o tópico sobre iteráveis.

A ideia é que tenhamos um objeto, como rangeaqui:

let range = {
  from: 1,
  to: 5
};

…E gostaríamos de usar for..ofloop nele, como for(value of range), para obter valores de 1para 5.

Em outras palavras, queremos adicionar uma capacidade de iteração ao objeto.

Isso pode ser implementado usando um método especial com o nome Symbol.iterator:

Esse método é chamado pela for..ofconstrução quando o loop é iniciado e deve retornar um objeto com o nextmétodo.
Para cada iteração, o next()método é invocado para o próximo valor.
O next()deve retornar um valor no formato {done: true/false, value:<loop value>}, onde done:truesignifica o fim do loop.
Aqui está uma implementação para o iterável range:

*/

let range = {
   from: 1,
   to: 5,

   [Symbol.iterator]() { // called once, in the beginning of for..of
      return {
         current: this.from,
         last: this.to,

         next() { // called every iteration, to get the next value
            if (this.current <= this.last) {
               return { done: false, value: this.current++ };
            } else {
               return { done: true };
            }
         }
      };
   }
};

for (let value of range) {
   alert(value); // 1 then 2, then 3, then 4, then 5
}


/*

Se algo não estiver claro, visite o capítulo Iterables , ele fornece todos os detalhes sobre iteráveis ​​regulares.

Iteráveis ​​assíncronos
A iteração assíncrona é necessária quando os valores vêm de forma assíncrona: após setTimeoutou outro tipo de atraso.

O caso mais comum é que o objeto precisa fazer uma solicitação de rede para entregar o próximo valor, veremos um exemplo da vida real um pouco mais tarde.

Para tornar um objeto iterável de forma assíncrona:

1. Use Symbol.asyncIteratorem vez de Symbol.iterator.
2. O next()método deve retornar uma promessa (a ser cumprida com o próximo valor).
A asyncpalavra-chave lida com isso, podemos simplesmente fazer async next().
3. Para iterar sobre tal objeto, devemos usar um for await (let item of iterable)loop.
Observe a awaitpalavra.

Como exemplo inicial, vamos criar um rangeobjeto iterável, semelhante ao anterior, mas agora retornará valores de forma assíncrona, um por segundo.

Tudo o que precisamos fazer é realizar algumas substituições no código acima:

*/

let range = {
   from: 1,
   to: 5,

   [Symbol.asyncIterator]() { // (1)
      return {
         current: this.from,
         last: this.to,

         async next() { // (2)

            // note: we can use "await" inside the async next:
            await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

            if (this.current <= this.last) {
               return { done: false, value: this.current++ };
            } else {
               return { done: true };
            }
         }
      };
   }
};

(async () => {

   for await (let value of range) { // (4)
      alert(value); // 1,2,3,4,5
   }

})()

/*

Como podemos ver, a estrutura é semelhante aos iteradores regulares:

1. Para tornar um objeto iterável de forma assíncrona, ele deve ter um método Symbol.asyncIterator (1).
2. Este método deve retornar o objeto com o next()método retornando uma promessa (2).
3. O next()método não precisa ser async, pode ser um método regular retornando uma promessa, mas asyncnos permite usar await, o que é conveniente. Aqui nós apenas adiamos por um segundo (3).
4. Para iterar, usamos for await(let value of range) (4), ou seja, adicionamos “await” depois de “for”. Ele chama range[Symbol.asyncIterator]()uma vez e, em seguida, é next()para valores.
Aqui está uma pequena tabela com as diferenças:

Iteradores	iteradores assíncronos
Método de objeto para fornecer iterador	Symbol.iterator	Symbol.asyncIterator
next()valor de retorno é	qualquer valor	Promise
fazer um loop, use	for..of	for await..of

A sintaxe de propagação ...não funciona de forma assíncrona
Os recursos que exigem iteradores regulares e síncronos não funcionam com os assíncronos.

Por exemplo, uma sintaxe de propagação não funcionará:

alert( [...range] ); // Error, no Symbol.iterator
Isso é natural, pois espera encontrar Symbol.iterator, não Symbol.asyncIterator.

É também o caso de for..of: a sintaxe sem awaitnecessidades Symbol.iterator.

Geradores de recall
Agora vamos relembrar os geradores, pois eles permitem tornar o código de iteração muito mais curto. Na maioria das vezes, quando queremos fazer um iterável, usamos geradores.

Por pura simplicidade, omitindo algumas coisas importantes, são “funções que geram (produzem) valores”. Eles são explicados em detalhes no capítulo Geradores .

Os geradores são rotulados com function*(observe a estrela) e usados yield​​para gerar um valor, então podemos usar for..ofpara fazer um loop sobre eles.

Este exemplo gera uma sequência de valores de starta end:

*/

function* generateSequence(start, end) {
   for (let i = start; i <= end; i++) {
      yield i;
   }
}

for (let value of generateSequence(1, 5)) {
   alert(value); // 1, then 2, then 3, then 4, then 5
}

/*

Como já sabemos, para tornar um objeto iterável, devemos adicionar Symbol.iteratora ele.

let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
}
Uma prática comum Symbol.iteratoré retornar um gerador, isso torna o código mais curto, como você pode ver:

*/

let range2 = {
   from: 1,
   to: 5,

   *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
      for (let value = this.from; value <= this.to; value++) {
         yield value;
      }
   }
};

for (let value of range2) {
   alert(value); // 1, then 2, then 3, then 4, then 5
}

/*

Consulte o capítulo Geradores se desejar mais detalhes.

Em geradores regulares, não podemos usar arquivos await. Todos os valores devem vir de forma síncrona, conforme exigido pela for..ofconstrução.

E se quisermos gerar valores de forma assíncrona? De solicitações de rede, por exemplo.

Vamos mudar para geradores assíncronos para tornar isso possível.

Geradores assíncronos (finalmente)
Para a maioria das aplicações práticas, quando queremos fazer um objeto que gera de forma assíncrona uma sequência de valores, podemos usar um gerador assíncrono.

A sintaxe é simples: preceder function*com async. Isso torna o gerador assíncrono.

E então use for await (...)para iterar sobre ele, assim:

*/

async function* generateSequence(start, end) {
   for (let i = start; i <= end; i++) {

      // Wow, can use await!
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield i;
   }
}

(async () => {

   let generator = generateSequence(1, 5);
   for await (let value of generator) {
     alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
   }
 
 })();

/*

Como o gerador é assíncrono, podemos usar awaitdentro dele, confiar em promessas, realizar requisições de rede e assim por diante.

Diferença oculta
Tecnicamente, se você é um leitor avançado que se lembra dos detalhes sobre geradores, há uma diferença interna.

Para geradores assíncronos, o generator.next()método é assíncrono, retorna promessas.

Em um gerador regular, usaríamos result = generator.next()para obter valores. Em um gerador assíncrono, devemos adicionar await, assim:

result = await generator.next(); // result = {value: ..., done: true/false}
É por isso que os geradores assíncronos funcionam com arquivos for await...of.

Intervalo iterável assíncrono
Geradores regulares podem ser usados Symbol.iterator​​para tornar o código de iteração mais curto.

Semelhante a isso, geradores assíncronos podem ser usados Symbol.asyncIterator​​para implementar a iteração assíncrona.

Por exemplo, podemos fazer o rangeobjeto gerar valores de forma assíncrona, uma vez por segundo, substituindo síncrono Symbol.iteratorpor assíncrono Symbol.asyncIterator:

*/

let range3 = {
   from: 1,
   to: 5,
 
   // this line is same as [Symbol.asyncIterator]: async function*() {
   async *[Symbol.asyncIterator]() {
     for(let value = this.from; value <= this.to; value++) {
 
       // make a pause between values, wait for something
       await new Promise(resolve => setTimeout(resolve, 1000));
 
       yield value;
     }
   }
 };
 
 (async () => {
 
   for await (let value of range3) {
     alert(value); // 1, then 2, then 3, then 4, then 5
   }
 
 })();

/*

Agora os valores vêm com um atraso de 1 segundo entre eles.

Observe:
Tecnicamente, podemos adicionar Symbol.iteratore Symbol.asyncIteratorao objeto, de modo que seja iterável tanto de forma síncrona ( for..of) quanto assíncrona ( ).for await..of

Na prática, porém, isso seria uma coisa estranha de se fazer.

Exemplo da vida real: dados paginados
Até agora vimos exemplos básicos, para ganhar compreensão. Agora vamos revisar um caso de uso da vida real.

Existem muitos serviços online que fornecem dados paginados. Por exemplo, quando precisamos de uma lista de usuários, uma solicitação retorna uma contagem pré-definida (por exemplo, 100 usuários) – “uma página” e fornece uma URL para a próxima página.

Esse padrão é muito comum. Não se trata de usuários, mas de qualquer coisa.

Por exemplo, o GitHub nos permite recuperar commits da mesma forma paginada:

Devemos fazer uma solicitação fetchno formulário
https://api.github.com/repos/<repo>/commits.
Ele responde com um JSON de 30 commits e também fornece um link para a próxima página no Linkcabeçalho.
Então podemos usar esse link para a próxima solicitação, para obter mais confirmações e assim por diante.
Para nosso código, gostaríamos de ter uma maneira mais simples de obter confirmações.

Vamos fazer uma função fetchCommits(repo)que receba commits para nós, fazendo requisições sempre que necessário. E deixe-o se preocupar com todas as coisas de paginação. Para nós, será uma simples iteração assíncrona for await..of.

Então o uso ficará assim:

for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
Aqui está essa função, implementada como gerador assíncrono:

*/

async function* fetchCommits(repo) {
   let url = `https://api.github.com/repos/${repo}/commits`;
 
   while (url) {
     const response = await fetch(url, { // (1)
       headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
     });
 
     const body = await response.json(); // (2) response is JSON (array of commits)
 
     // (3) the URL of the next page is in the headers, extract it
     let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
     nextPage = nextPage?.[1];
 
     url = nextPage;
 
     for(let commit of body) { // (4) yield commits one by one, until the page ends
       yield commit;
     }
   }
 }

/*

Mais explicações sobre como funciona:

1. Usamos o método de busca do navegador para baixar os commits.

A URL inicial é https://api.github.com/repos/<repo>/commits, e a próxima página estará no Linkcabeçalho da resposta.
O fetchmétodo nos permite fornecer autorização e outros cabeçalhos, se necessário – aqui o GitHub requer User-Agent.

2. Os commits são retornados no formato JSON.

3. Devemos obter o URL da próxima página do Linkcabeçalho da resposta. Ele tem um formato especial, então usamos uma expressão regular para isso (aprenderemos esse recurso em Expressões regulares ).

O URL da próxima página pode parecer https://api.github.com/repositories/93253246/commits?page=2. É gerado pelo próprio GitHub.

4. Em seguida, entregamos os commits recebidos um a um e, quando eles terminarem, a próxima while(url)iteração será acionada, fazendo mais uma solicitação.

Um exemplo de uso (mostra os autores do commit no console):

*/

(async () => {

   let count = 0;
 
   for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
 
     console.log(commit.author.login);
 
     if (++count == 100) { // let's stop at 100 commits
       break;
     }
   }
 
 })();
 
 // Note: If you are running this in an external sandbox, you'll need to paste here the function fetchCommits described above

/*

Isso é exatamente o que queríamos.

A mecânica interna das solicitações paginadas é invisível do lado de fora. Para nós é apenas um gerador assíncrono que retorna commits.

Resumo
Os iteradores e geradores regulares funcionam bem com os dados que não levam tempo para serem gerados.

Quando esperamos que os dados cheguem de forma assíncrona, com atrasos, suas contrapartes assíncronas podem ser usadas e, for await..ofem vez de for..of.

Diferenças de sintaxe entre iteradores assíncronos e regulares:

Iterável	Iterável assíncrono
Método para fornecer iterador	Symbol.iterator	Symbol.asyncIterator
next()valor de retorno é	{value:…, done: true/false}	Promiseque resolve{value:…, done: true/false}
Diferenças de sintaxe entre geradores assíncronos e regulares:

Geradores	Geradores assíncronos
Declaração	function*	async function*
next()valor de retorno é	{value:…, done: true/false}	Promiseque resolve{value:…, done: true/false}
No desenvolvimento da Web, geralmente encontramos fluxos de dados, quando eles fluem pedaço por pedaço. Por exemplo, baixar ou enviar um arquivo grande.

Podemos usar geradores assíncronos para processar esses dados. Vale ressaltar também que em alguns ambientes, como em navegadores, também existe outra API chamada Streams, que fornece interfaces especiais para trabalhar com tais streams, transformar os dados e passá-los de um stream para outro (por exemplo, baixar de um lugar e imediatamente enviar para outro lugar).

*/