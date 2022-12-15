/*

Data e hora
Vamos conhecer um novo objeto embutido: Date . Ele armazena a data, hora e fornece métodos para gerenciamento de data/hora.

Por exemplo, podemos usá-lo para armazenar os tempos de criação/modificação, para medir o tempo ou apenas para imprimir a data atual.

Criação
Para criar uma nova Datechamada de objeto new Date()com um dos seguintes argumentos:

new Date()
Sem argumentos – crie um Dateobjeto para a data e hora atuais:

*/

let now = new Date();
alert(now); // shows current date/time

/*

new Date(milliseconds)
Crie um Dateobjeto com o tempo igual ao número de milissegundos (1/1000 de segundo) passado após 1º de janeiro de 1970 UTC+0.

*/

// 0 means 01.01.1970 UTC+0
let Jan01_1970 = new Date(0);
alert(Jan01_1970);

// now add 24 hours, get 02.01.1970 UTC+0
let Jan02_1970 = new Date(25 * 3600 * 1000)
alert(Jan02_1970)

/*

Um número inteiro que representa o número de milissegundos que se passaram desde o início de 1970 é chamado de timestamp .

É uma representação numérica leve de uma data. Sempre podemos criar uma data a partir de um timestamp usando new Date(timestamp)e converter o Dateobjeto existente em um timestamp usando o date.getTime()método (veja abaixo).

Datas anteriores a 01.01.1970 possuem timestamps negativos, por exemplo:

*/

// 31 Dec 1969
let Dec31_1969 = new Date(-24 * 3600 * 1000);
alert(Dec31_1969);

/*

new Date(datestring)
Se houver um único argumento e for uma string, ele será analisado automaticamente. O algoritmo é o mesmo que Date.parseusa, falaremos sobre isso mais tarde.

*/

let date = new Date("2017-01-26");
alert(date);
// The time is not set, so it's assumed to be midnight GMT and
// is adjusted according to the timezone the code is run in
// So the result could be
// Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
// or
// Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)

/*

new Date(year, month, date, hours, minutes, seconds, ms)
Crie a data com os componentes fornecidos no fuso horário local. Apenas os dois primeiros argumentos são obrigatórios.

O yeardeve ter 4 dígitos. Para compatibilidade, 2 dígitos também são aceitos e considerados 19xx, por exemplo, 98é o mesmo que 1998aqui, mas sempre usar 4 dígitos é altamente recomendável.
A monthcontagem começa com 0(Jan), até 11(Dez).
O dateparâmetro é, na verdade, o dia do mês, se ausente, então 1é assumido.
Se hours/minutes/seconds/msestiver ausente, eles são considerados iguais 0.
Por exemplo:

*/

new Date(2011, 0, 1, 0, 0, 0, 0);  // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1); // the same, hours etc are 0 by default

// A precisão máxima é de 1 ms (1/1000 seg):

let date2 = new Date(2011, 0, 1, 2, 3, 4, 567);
alert(date2)

/*

Componentes de data de acesso
Existem métodos para acessar o ano, mês e assim por diante a partir do Dateobjeto:

getFullYear()
Obter o ano (4 dígitos)
getMês()
Obtenha o mês, de 0 a 11 .
getDate()
Obtenha o dia do mês, de 1 a 31, o nome do método parece um pouco estranho.
getHours() , getMinutes() , getSeconds() , getMilliseconds()
Obtenha os componentes de tempo correspondentes.

Não getYear(), masgetFullYear()
Muitos mecanismos JavaScript implementam um método não padrão getYear(). Este método está obsoleto. Ele retorna o ano de 2 dígitos às vezes. Por favor, nunca use. Tem getFullYear()para o ano.

Além disso, podemos obter um dia da semana:

getDay()
Obtenha o dia da semana, de 0(domingo) a 6(sábado). O primeiro dia é sempre domingo, em alguns países não é assim, mas não pode ser alterado.
Todos os métodos acima retornam os componentes relativos ao fuso horário local.

Há também suas contrapartes UTC, que retornam dia, mês, ano e assim por diante para o fuso horário UTC+0: getUTCFullYear() , getUTCMonth() , getUTCDay() . Basta inserir o "UTC"logo após "get".

Se o fuso horário local for alterado em relação ao UTC, o código abaixo mostrará horários diferentes:

*/

// current date
let date3 = new Date();

// the hour in your current time zone
alert(date.getHours());

// the hour is UTC+0 time zone (London time without daylight savings)
alert( date.getUTCHours() );

/*

Além dos métodos fornecidos, existem dois métodos especiais que não possuem uma variante UTC:

consiga tempo()
Retorna o timestamp para a data – um número de milissegundos passados ​​desde 1º de janeiro de 1970 UTC+0.

getTimezoneOffset()
Retorna a diferença entre o UTC e o fuso horário local, em minutos:

*/

// if you are in timezone UTC-1, outputs 60
// if you are in timezone UTC+3, outputs -180
alert( new Date().getTimezoneOffset() );

/*

Definir componentes de data
Os seguintes métodos permitem definir os componentes de data/hora:

setFullYear(year, [month], [date])
setMonth(month, [date])
setDate(date)
setHours(hour, [min], [sec], [ms])
setMinutes(min, [sec], [ms])
setSeconds(sec, [ms])
setMilliseconds(ms)
setTime(milliseconds)(define a data inteira em milissegundos desde 01.01.1970 UTC)
Cada um deles, exceto setTime()tem uma variante UTC, por exemplo: setUTCHours().

Como podemos ver, alguns métodos podem definir vários componentes de uma só vez, por exemplo setHours. Os componentes não mencionados não são modificados.

Por exemplo:

*/

let today = new Date();

today.setHours(0);
alert(today); // still today, but the hour is changed to 0

today.setHours(0, 0, 0, 0);
alert(today); // still today, now 00:00:00 sharp.

/*

Auto correção
A autocorreção é um recurso muito útil dos Dateobjetos. Podemos definir valores fora do intervalo e ele se ajustará automaticamente.

Por exemplo:

*/

let date4 = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
alert(date); // ...is 1st Feb 2013!

/*

Os componentes de data fora do intervalo são distribuídos automaticamente.

Digamos que precisamos aumentar a data “28 de fevereiro de 2016” em 2 dias. Pode ser “2 de março” ou “1 de março” no caso de ano bissexto. Não precisamos pensar nisso. Basta adicionar 2 dias. O Dateobjeto fará o resto:

*/

let date5 = new Date(2016, 1, 28);
date5.setDate(date5.getDate() + 2);

alert( date5 ); // 1 Mar 2016

// Esse recurso é frequentemente usado para obter a data após um determinado período de tempo. Por exemplo, vamos obter a data para “70 segundos depois de agora”:

let date6 = new Date();
date6.setSeconds(date6.getSeconds() + 70);

alert( date6 ); // shows the correct date

// Também podemos definir valores zero ou mesmo negativos. Por exemplo:

let date7 = new Date(2016, 0, 2); // 2 Jan 2016

date7.setDate(1); // set day 1 of month
alert( date7 )

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
alert( date ); // 31 Dec 2015

/*

Data para número, diferença de data
Quando um Dateobjeto é convertido em número, ele se torna o timestamp igual a date.getTime():

*/

let date8 = new Date();
alert(+date); // the number of milliseconds, same as date.getTime()

/*

O importante efeito colateral: as datas podem ser subtraídas, o resultado é a diferença em ms.

Isso pode ser usado para medições de tempo:

*/

let start = new Date(); // start measuring time

// do the job
for (let i = 0; i < 100000; i++) {
    let doSomething = i * i * i;
}

let end = new Date(); // end measuring time

alert( `The loop took ${end - start} ms` );

/*

Data.agora()
Se queremos apenas medir o tempo, não precisamos do Dateobjeto.

Existe um método especial Date.now()que retorna o timestamp atual.

É semanticamente equivalente a new Date().getTime(), mas não cria um Dateobjeto intermediário. Portanto, é mais rápido e não pressiona a coleta de lixo.

É usado principalmente por conveniência ou quando o desempenho é importante, como em jogos em JavaScript ou outros aplicativos especializados.

Então provavelmente é melhor:

*/

let start2 = Date.now();  // milliseconds count from 1 Jan 1970

// do the job
for (let i = 0; i < 100000; i++) {
    let doSomething = i * i * i;
}

let end2 = Date.now(); // done

alert( `The loop took ${end2 - start2} ms` ); // subtract numbers, not dates

/*

avaliação comparativa
Se quisermos um benchmark confiável da função que consome muita CPU, devemos ter cuidado.

Por exemplo, vamos medir duas funções que calculam a diferença entre duas datas: qual é a mais rápida?

Tais medições de desempenho são freqüentemente chamadas de “benchmarks”.

*/

// we have date1 and date2, which function faster returns their difference in ms?
function diffSubtract(date1, date2) {
    return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
    return date2.getTime() - date1.getTime();
}

/*

Esses dois fazem exatamente a mesma coisa, mas um deles usa um explícito date.getTime()para obter a data em ms e o outro depende de uma transformação de data para número. Seu resultado é sempre o mesmo.

Então, qual é mais rápido?

A primeira ideia pode ser executá-los várias vezes seguidas e medir a diferença de tempo. Para o nosso caso, as funções são muito simples, então temos que fazer pelo menos 100.000 vezes.

Vamos medir:

*/

function diffSubtract(date1, date2) {
    return date2 - date1;
}
  
function diffGetTime(date1, date2) {
    return date2.getTime() - date1.getTime();
}

function bench(f) {
    let date1 = new Date(0);
    let date2 = new Date();

    let start = Date.now();
    for(let i = 0; i < 100000; i++) f(date1, date2);
    return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );

/*

Uau! Usar getTime()é muito mais rápido! Isso porque não há conversão de tipo, é muito mais fácil para os mecanismos otimizarem.

Ok, temos algo. Mas ainda não é um bom benchmark.

Imagine que no momento da execução a bench(diffSubtract)CPU estava fazendo algo em paralelo, e estava consumindo recursos. E no momento da execução bench(diffGetTime), esse trabalho foi concluído.

Um cenário bastante real para um sistema operacional multiprocesso moderno.

Como resultado, o primeiro benchmark terá menos recursos de CPU que o segundo. Isso pode levar a resultados errados.

Para um benchmarking mais confiável, todo o pacote de benchmarks deve ser reexecutado várias vezes.

Por exemplo, assim:

*/

function diffSubtract(date1, date2) {
    return date2 - date1;
}
  
function diffGetTime(date1, date2) {
    return date2.getTime() - date1.getTime();
}
  
function bench(f) {
    let date1 = new Date(0);
    let date2 = new Date();
  
    let start = Date.now();
    for (let i = 0; i < 100000; i++) f(date1, date2);
    return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

// run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
for (let i = 0; i < 10; i++) {
    time1 += bench(diffSubtract);
    time2 += bench(diffGetTime);
}

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );

// Mecanismos JavaScript modernos começam a aplicar otimizações avançadas apenas para “código quente” que é executado muitas vezes (sem necessidade de otimizar coisas raramente executadas). Portanto, no exemplo acima, as primeiras execuções não são bem otimizadas. Podemos querer adicionar uma corrida de aquecimento:

// added for "heating up" prior to the main loop
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}

/*

Tenha cuidado ao fazer microbenchmarking
Mecanismos JavaScript modernos executam muitas otimizações. Eles podem ajustar os resultados de “testes artificiais” em comparação com o “uso normal”, especialmente quando comparamos algo muito pequeno, como o funcionamento de um operador ou uma função integrada. Portanto, se você realmente deseja entender o desempenho, estude como funciona o mecanismo JavaScript. E então você provavelmente não precisará de microbenchmarks.

O grande pacote de artigos sobre V8 pode ser encontrado em https://mrale.ph .

Date.parse de uma string
O método Date.parse(str) pode ler uma data de uma string.

O formato da string deve ser: YYYY-MM-DDTHH:mm:ss.sssZ, onde:

YYYY-MM-DD– é a data: ano-mês-dia.
O caractere "T"é usado como delimitador.
HH:mm:ss.sss– é o tempo: horas, minutos, segundos e milissegundos.
A parte opcional 'Z'denota o fuso horário no formato +-hh:mm. Uma única letra Zsignificaria UTC+0.
Variantes mais curtas também são possíveis, como YYYY-MM-DDou YYYY-MMou mesmo YYYY.

A chamada para Date.parse(str)analisa a string no formato fornecido e retorna o carimbo de data/hora (número de milissegundos a partir de 1º de janeiro de 1970 UTC+0). Se o formato for inválido, retorna NaN.

Por exemplo:

*/

let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)

// Podemos criar instantaneamente um new Dateobjeto a partir do timestamp:

let date9 = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);

/*

Resumo
Data e hora em JavaScript são representadas com o objeto Date . Não podemos criar “só data” ou “só hora”: Dateos objetos sempre carregam ambos.
Os meses são contados a partir do zero (sim, janeiro é um mês zero).
Os dias da semana getDay()também são contados a partir de zero (que é domingo).
Datecorrige-se automaticamente quando componentes fora do intervalo são definidos. Bom para somar/subtrair dias/meses/horas.
As datas podem ser subtraídas, dando sua diferença em milissegundos. Isso ocorre porque a Datese torna o carimbo de data/hora quando convertido em um número.
Use Date.now()para obter o registro de data e hora atual rapidamente.
Observe que, ao contrário de muitos outros sistemas, os timestamps em JavaScript estão em milissegundos, não em segundos.

Às vezes, precisamos de medições de tempo mais precisas. O próprio JavaScript não tem como medir o tempo em microssegundos (1 milionésimo de segundo), mas a maioria dos ambientes o fornece. Por exemplo, o navegador tem performance.now() que fornece o número de milissegundos desde o início do carregamento da página com precisão de microssegundos (3 dígitos após o ponto):

*/

alert(`Loading started ${performance.now()}ms ago`);
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, only the first 3 are correct

// Node.js tem microtimemódulo e outras formas. Tecnicamente, quase qualquer dispositivo e ambiente permite obter mais precisão, mas não em Date.

