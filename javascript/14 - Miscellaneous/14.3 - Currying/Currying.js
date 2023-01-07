/*

Escovando
Currying é uma técnica avançada de trabalhar com funções. É usado não apenas em JavaScript, mas também em outras linguagens.

Currying é uma transformação de funções que converte uma função de callable as f(a, b, c)em callable as f(a)(b)(c).

Currying não chama uma função. Apenas o transforma.

Vamos ver primeiro um exemplo, para entender melhor do que estamos falando, e depois aplicações práticas.

Vamos criar uma função auxiliar curry(f)que realiza currying para um de dois argumentos f. Em outras palavras, curry(f)for two-argument f(a, b)o traduz em uma função que é executada como f(a)(b):

*/

function curry(f) {  // curry(f) does the currying transform
   return function(a) {
      return function(b) {
         return f(a, b);
      };
   };
}

// usage
function sum(a, b) {
   return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3

/*

Como você pode ver, a implementação é direta: são apenas dois wrappers.

O resultado de curry(func)é um wrapper function(a).
Quando é chamado como curriedSum(1), o argumento é salvo no Ambiente Lexical e um novo wrapper é retornado function(b).
Em seguida, esse wrapper é chamado 2como um argumento e passa a chamada para o arquivo sum.
Implementações mais avançadas de currying, como _.curry da biblioteca lodash, retornam um wrapper que permite que uma função seja chamada normal e parcialmente:

*/

function sum(a, b) {
   return a + b;
}

let curriedSum2 = _.curry(sum); // using _.curry from lodash library

alert( curriedSum2(1, 2) ); // 3, still callable normally
alert( curriedSum2(1)(2) ); // 3, called partially

/*

Para entender os benefícios, precisamos de um exemplo digno da vida real.

Por exemplo, temos a função de registro log(date, importance, message)que formata e gera as informações. Em projetos reais, tais funções possuem muitos recursos úteis, como enviar logs pela rede, aqui usaremos apenas alert:

function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
Vamos curá-lo!

log = _.curry(log);
Depois disso logfunciona normalmente:

log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
…Mas também funciona na forma de curry:

log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
Agora podemos facilmente criar uma função de conveniência para os logs atuais:

// logNow will be the partial of log with fixed first argument
let logNow = log(new Date());

// use it
logNow("INFO", "message"); // [HH:mm] INFO message
Agora logNowestá logcom o primeiro argumento fixo, em outras palavras "função parcialmente aplicada" ou "parcial" para abreviar.

Podemos ir além e criar uma função de conveniência para os logs de depuração atuais:

let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message

Tão:

1. Não perdemos nada depois de currying: logainda pode ser chamado normalmente.
2. Podemos facilmente gerar funções parciais, como para os logs de hoje.

Implementação avançada de curry
Caso você queira entrar em detalhes, aqui está a implementação de curry “avançada” para funções multi-argumento que poderíamos usar acima.

É bem curto:

function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}

Exemplos de uso:

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying

O novo currypode parecer complicado, mas na verdade é fácil de entender.

O resultado da curry(func)chamada é o wrapper curriedque se parece com isso:

// func is the function to transform
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};

Quando o executamos, existem dois iframos de execução:

1. argsSe a contagem passada for igual ou maior que a função original tem em sua definição ( func.length), basta passar a chamada para ela usando func.apply.
2. Caso contrário, obtenha uma parcial: ainda não pagamos func. Em vez disso, outro wrapper é retornado, que será reaplicado curriedfornecendo os argumentos anteriores junto com os novos.

Quando o executamos, existem dois iframos de execução:

argsSe a contagem passada for igual ou maior que a função original tem em sua definição ( func.length), basta passar a chamada para ela usando func.apply.
Caso contrário, obtenha uma parcial: ainda não pagamos func. Em vez disso, outro wrapper é retornado, que será reaplicado curriedfornecendo os argumentos anteriores junto com os novos.

Resumo
Currying é uma transformação que torna possível chamá-la f(a,b,c)como f(a)(b)(c). As implementações de JavaScript geralmente mantêm a função que pode ser chamada normalmente e retornam a parcial se a contagem de argumentos não for suficiente.

Currying nos permite obter parciais facilmente. Como vimos no exemplo de log, depois de carregar os três argumentos, a função universal log(date, importance, message)nos dá parciais quando chamada com um argumento (como log(date)) ou dois argumentos (como log(date, importance)).

*/

