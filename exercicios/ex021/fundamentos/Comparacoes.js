//Comparações

//Conhecemos muitos operadores de comparação de matemática.

//Em JavaScript eles são escritos assim:

// Maior/menor que: a > b, a < b.
// Maior/menor ou igual: a >= b, a <= b.
//Equals: a == b, observe que o sinal de igualdade duplo == significa o teste de igualdade, enquanto um único a = b significa uma atribuição.
// Não é igual: em matemática a notação é ≠, mas em JavaScript é escrita como a != b.

// Neste artigo vamos aprender mais sobre diferentes tipos de comparações, como o JavaScript as faz, incluindo peculiaridades importantes.

// No final, você encontrará uma boa receita para evitar problemas relacionados a "peculiaridades do JavaScript".

// Boolean é o resultado

// Todos os operadores de comparação retornam um valor booleano:

// . true - significa "sim", "correto" ou "a verdade".
// . false - significa "não", "errado" ou "não é a verdade".

// Por exemplo:
alert( 2 > 1); // true (correct)
alert( 2 == 1); // false (wrong)
alert( 2 != 1); // true (correct)

// Um resultado de comparação pode ser atribuído a uma variável, assim como qualquer valor:

let result = 5 > 5; // assign the result of the comparison
alert( result ); // true

// Comparação de strings

// Para ver se uma string é maior que outra, JavaScript usa a chamada ordem "dicionário" ou "lexicográfica".

// Em outras palavras, as strings são comparadas letra por letra.

// Por exemplo

alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true

// O algoritmo para comparar duas strings é simples:

// 1. Compare o primeior caractere de ambas as strings.
// 2. Se o primeiro caractere da primeira string for maior (ou menor) que o da outra string, então a primeira string será maior (ou menor) que a segunda. Foram realizadas.
// 3. Caso contrário, se os primeiros caracteres de ambas as strings forem iguais, compare os segundos caracteres da mesma maneira.
// 4. Repita até o final de qualquer corda.
// 5. Se ambas as strings terminarem com o mesmo comprimento, elas serão iguais. Caso contrário, a string mais longa é maior.

// No primeiro exemplo acima, a comparação 'Z' > 'A' chega a um resultado na primeira etapa.

// A segunda comparação precisa 'Glow'de 'Glee'mais etapas, pois as strings são comparadas caractere por caractere:

// 1. G é o mesmo que G.
// 2. l é o mesmo que l.
// 3. o é maior que e. Pare aqui. A primeira string é maior.

//Não é um dicionário real, mas ordem Unicode

//O algoritmo de comparação fornecido acima é aproximadamente equivalente ao usado em dicionários ou listas telefônicas, mas não é exatamente o mesmo.

//Por exemplo, o caso importa. Uma letra maiúscula "A" não é igual a minúscula "a". Qual é maior? A minúscula "a". Por quê? Porque o caractere minúsculo tem um índice maior na tabela de codificação interna que o JavaScript usa (Unicode). Voltaremos a detalhes específicos e consequências disso no capítulo Strings .

//Comparação de vários tipos

//Ao comparar valores de tipos diferentes, o JavaScript converte os valores em números.

//Por exemplo:

alert( '2' > 1); // true, string '2' becomes a number 2
alert( '01' == 1); // true, string '01' becomes a number 1

//Para valores booleanos, truese torna 1e falsese torna 0.

//Por exemplo:

alert( true == 1); // true
alert( false == 0); // true

//Uma consequência engraçada

//É possível que ao mesmo tempo:

 //. Dois valores são iguais.
 //. Um deles é truecomo booleano e o outro falsecomo booleano.

//Por exemplo:

let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!

// Do ponto de vista do JavaScript, esse resultado é bastante normal. Uma verificação de igualdade converte valores usando a conversão numérica (daí "0"se torna 0), enquanto a conversão explícita Booleanusa outro conjunto de regras.

// Igualdade estrita

// Uma verificação de igualdade regular ==tem um problema. Não pode diferenciar 0de false:

alert( 0 == false ); // true

// A mesma coisa acontece com uma string vazia:

alert( '' == false ); // true

//Isso acontece porque operandos de tipos diferentes são convertidos em números pelo operador de igualdade ==. Uma string vazia, assim como false, torna-se um zero.

//O que fazer se quisermos diferenciar 0de false?

//Um operador de igualdade estrita === verifica a igualdade sem conversão de tipo.

//Em outras palavras, se ae bforem de tipos diferentes, a === bretornará imediatamente falsesem tentar convertê-los.

//Vamos tentar:

alert( 0 === false ); // false, because the types are different

//Para uma verificação não rigorosa ==

//Há uma regra especial. Esses dois são um “casal doce”: eles se igualam (no sentido de ==), mas não qualquer outro valor.

alert( null == undefined ); // true

//Para matemática e outras comparações < > <= >=

//null/undefinedsão convertidos em números: nullse torna 0, enquanto undefinedse torna NaN.

//Agora vamos ver algumas coisas engraçadas que acontecem quando aplicamos essas regras. E, o que é mais importante, como não cair em uma armadilha com eles.

//Resultado estranho: null vs 0

//Vamos comparar nullcom um zero:

alert( null > 0 ); // (1) false
alert( null == 0); // (2) false
alert( null >= 0 ); // (3) true

// Matematicamente, isso é estranho. O último resultado afirma que " nullé maior ou igual a zero", então em uma das comparações acima deve ser true, mas ambos são falsos.

// A razão é que uma verificação de igualdade ==e comparações > < >= <=funcionam de forma diferente. As comparações são convertidas nullem um número, tratando-o como 0. É por isso que (3) null >= 0é verdadeira e (1) null > 0é falsa.

//Por outro lado, a verificação de igualdade == para undefinede nullé definida de tal forma que, sem nenhuma conversão, eles são iguais e não são iguais a mais nada. É por isso que (2) null == 0é falso.

// Um incomparável indefinido

//O valor undefinednão deve ser comparado a outros valores:

alert( undefined > 0); // false (1)
alert( undefined < 0);// false (2)
alert( undefined == 0);// false (3)

//Por que não gosta tanto de zero? Sempre falso!

//Obtemos esses resultados porque:

// . Comparações (1)e (2)retorno falseporque undefinedé convertido para NaNe NaNé um valor numérico especial que retorna falsepara todas as comparações.
// . A verificação de igualdade (3)retorna falseporque undefinedapenas é igual a null, undefinede nenhum outro valor.

// Evite problemas

// Por que examinamos esses exemplos? Devemos nos lembrar dessas peculiaridades o tempo todo? Bem, na verdade não. Na verdade, essas coisas complicadas gradualmente se tornarão familiares com o tempo, mas há uma maneira sólida de evitar problemas com elas:

// . Trate qualquer comparação com undefined/nullexceção da igualdade estrita ===com cuidado excepcional.
// . Não use comparações >= > < <=com uma variável que pode ser null/undefined, a menos que você tenha certeza do que está fazendo. Se uma variável puder ter esses valores, verifique-os separadamente.

//Resumo

// . Os operadores de comparação retornam um valor booleano.
// . As strings são comparadas letra por letra na ordem “dicionário”.
// . Quando valores de tipos diferentes são comparados, eles são convertidos em números (com a exclusão de uma verificação de igualdade estrita).
// . Os valores nulle são undefinediguais ==entre si e não são iguais a nenhum outro valor.
// . Tenha cuidado ao usar comparações como >ou <com variáveis ​​que ocasionalmente podem ser null/undefined. Verificar null/undefinedseparadamente é uma boa ideia.