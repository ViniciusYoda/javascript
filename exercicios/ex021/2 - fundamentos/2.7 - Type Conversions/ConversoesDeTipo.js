//Conversões de tipo

//Na maioria das vezes, operadores e funções convertem automaticamente os valores dados a eles para o tipo correto.

//Por exemplo, alert converte automaticamente qualquer valor em uma string para mostrá-lo. As operações matemáticas convertem valores em números.

//Há também casos em que precisamos converter explicitamente um valor para o tipo esperado.

//Ainda não falando sobre objetos

//Neste capítulo, não abordaremos objetos. Por enquanto, falaremos apenas sobre primitivos.

//Mais tarde, depois de aprendermos sobre objetos, no capítulo Conversão de objetos para primitivos veremos como os objetos se encaixam.

//Conversão de String

//A conversão de string acontece quando precisamos da forma de string de um valor.

//Por exemplo, alert(value)faz isso para mostrar o valor.

//Também podemos chamar a String(value)função para converter um valor em uma string:

let value = true;
alert(typeof value); // boolean

value = String(value);  // now value is a string "true"
alert(typeof value); // string

// A conversão de strings é principalmente óbvia. A falsetorna -se "false", nulltorna -se "null", etc.

//Conversão Numérica

//A conversão numérica acontece em funções e expressões matemáticas automaticamente.

//Por exemplo, quando a divisão / é aplicada a não números:

alert( "6" / "2"); // 3, strings are converted to numbers

// Podemos usar a Number(value)função para converter explicitamente a valueem um número:

let str = "123";
alert(typeof str); // string

let num = Number(str); // becomes a number 123

alert(typeof num); // number

//A conversão explícita geralmente é necessária quando lemos um valor de uma fonte baseada em string, como um formulário de texto, mas esperamos que um número seja inserido.

//Se a string não for um número válido, o resultado dessa conversão será NaN. Por exemplo:

let age = Number("an arbitrary string instead of a number");

alert(age); // Nan, conversion failed

//Regras de conversão númerica:


//Valor: Undefined torna-se Nan
//Valor: null torna-se 0
//valor: true and false torna-se 1 e 0
//Valor: string torna-se Os espaços em branco do início e do fim são removidos. Se a string restante estiver vazia, o resultado será 0. Caso contrário, o número é “lido” da string. Um erro dá NaN.

//Exemplos:

alert( Number(" 123 ") ); // 123
alert( Number("123z") ); // NaN (error reading a number at "z")
alert( Number(true) ); // 1
alert( Number(false) ); // 0

//Observe que nulle undefinedse comporte de maneira diferente aqui: nulltorna-se zero enquanto undefinedtorna -se NaN.

//A maioria dos operadores matemáticos também realiza essa conversão, veremos isso no próximo capítulo.

//Conversão booleana

//A conversão booleana é a mais simples.

//Isso acontece em operações lógicas (mais tarde conheceremos testes de condição e outras coisas semelhantes), mas também pode ser executado explicitamente com uma chamada para Boolean(value).

//A regra de conversão:

//Valores que são intuitivamente “vazios”, como 0, uma string vazia, null, undefinede NaN, tornam-se false.

//Outros valores se tornam true.

//Por exemplo:

alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); //true
alert( Boolean("") ); // false

//Observe: a string com zero "0" é true

//Algumas linguagens (nomeadamente PHP) tratam "0"como false. Mas em JavaScript, uma string não vazia é sempre true.

alert( Boolean("0") ); //true
alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)

//Resumo

//As três conversões de tipo mais usadas são para string, para número e para booleano.

//String Conversion– Ocorre quando produzimos algo. Pode ser realizado com String(value). A conversão para string geralmente é óbvia para valores primitivos.

//Numeric Conversion– Ocorre em operações matemáticas. Pode ser realizado com Number(value).

//A conversão segue as regras:

//Valor	Torna-se…
//undefined	NaN
//null	0
//true / false	1 / 0
//string	A string é lida “como está”, os espaços em branco de ambos os lados são ignorados. Uma string vazia se torna 0. Um erro dá NaN.

//Boolean Conversion– Ocorre em operações lógicas. Pode ser realizado com Boolean(value).

//Segue as regras:

//Valor	Torna-se…
//0, null, undefined, NaN, ""	false
//qualquer outro valor	true
//A maioria dessas regras são fáceis de entender e memorizar. As exceções notáveis ​​em que as pessoas geralmente cometem erros são:

//undefined é NaN como um número, não 0.
//"0" e strings somente de espaço como " "são verdadeiras como booleanas.

//Os objetos não são abordados aqui. Voltaremos a eles mais adiante no capítulo Conversão de objetos para primitivos que é dedicada exclusivamente a objetos depois de aprendermos coisas mais básicas sobre JavaScript.