// Uma variável

// Uma variável é um "armazenamento nomeado" para dados. Podemos usar varáveis para armazenar guloseimas, visitantes e outros dados.

// Para criar uma variável em JavaScript, use a palavra-chave: let.

// A instrução abaixo cria(em outras palavras: declara) uma variável com o nome "message":

let message;

// Agora, podemos colocar alguns dados nele usando o operador de atribuição =:

message = 'Hello'; // store the string 'Hello' in the variable named message

// A string agora é salva na área de memória associada à variável. Podemos acessá-lo usando o nome da variável:

alert(message); // shows the variable content

// Para ser conciso, podemos combinar a declaração e a atribuição de variável em uma única linha:

let message2 = 'Hello!'; // define the variable and assign the value

alert(message2); // Hello!

//Também podemos declarar várias variáveis em uma linha:
let user = 'John', age = 25, message3 = 'Hello';

//Isso pode parecer mais curto, mas não recomendamos. Para melhor legibilidade, use uma única linha por variável.

// A variante de várias linhas é um pouco mais longa, mas mais fácil de ler:
let user2 = 'John'
let age2 = 25;
let message4 = 'Hello';

//Algumas pessoas também definem múltiplas variáveis neste estilo multilinha:

let user3 = 'John',
age3 = 25,
message5 = 'Hello';

//var ao invés de let

//Em scripts mais antigos, você também pode encontrar outra palavra-chave: var em vez de let:

var message6 = 'Hello';

//A palavra-chave var é quase a mesma que let. Ele também declara uma variável, mas de uma maneira um pouco diferente, "old-school";

//Uma analogia da  vida real
// Podemos entender facilmente o conceito de "variável" se a imaginarmos como uma "caixa" de dados, com um adesivo com um nome exclusivo.

//Por exemplo, a variavel message pode ser imaginada como uma caixa rotulada "message" com o valo "Hello!" nela:

//Podemos colocar qualquer valor na caixa.
//Também podemos alterá-lo quantas vezes quisermos:
let message7;

message7 = 'Hello!';

message7 = 'World!'; // value changed

alert(message7)

//Quando o valor é alterado, os dados antigos são removidos da variável

//Também podemos declarar duas variáveis e copiar dados de uma para a outra.

let hello = 'Hello world!';

let message8;

//copy 'Hello world' from hello into message
message8 = hello;

//now two variables hold the same data
alert(hello); // Hello world!
alert(message8); // Hello world!

//Declarar duas vezes aciona um erro
//Uma variável deve ser declarada apenas uma vez.
//Uma declaração repetida da mesma variável é um erro:
//let message9 = "This";

// repeated 'let' leads to an error
//let message9 = 'That'; // SyntaxError: 'message' has already been declared

//Portanto, devemos declarar uma variável uma vez e depois no referir a ela sem let.

//Linguagens funcionais
//É interessante notar que existem linguagens de programação funcionais, como Scala ou Erlang, que proibem a alteração de valores na variáveis.

//Em tais idiomas, uma vez que o valor é armazenado 'na caiza', ele fica lá para sempre. Se precisarmos armazenar mais alguma coisa, a linguagem nos obriga a criar uma nova caixa(declarar uma nova variável). Não podemos reutilizar o antigo.

//Embora possa parecer um pouco estranho à primeira vista, essas linguagens são bastante capazes de desenvolvimento sério. Mais do que isso, existem áreas como computação paralela onde essa limitação confere certos benefícios. Estudar esse idioma (mesmo que você não pretenda usá-li em breve) é recomendado para ampliar a mente.

//Nomenclatura de variável
//Existem duas limitações em nomes de variáveis em JavaScript:
//1.O nome deve conter apenas letras, dígitos ou os símbolos $ e _,
//2.O primeiro caractere não deve ser um dígito.

//Exemplo de nomes válidos:
let userName;
let test123;

//Quando o nome contém várias palaras, camelCase é comumente usado. Ou seja: as palavras vão uma após a outra, cada palavra exceto a primeira começando com uma letra maiúscula: myVeryLongName.

//O que é interessante - o cifrão '$' e o sublinhado '_' também podem ser usados em nomes. São símbolos regulares, assim como as letras, sem nenhum significado especial.

//Estes nomes são válidos:
let $ = 1; // declared a variable with the name '$'
let _ = 2; // and now a variable with the name '_'

alert($ + _); // 3

//Exemplos de nomes de variáveis incorretos:
//let 1a; //cannot start with a digit

//let my-name; //hyphens '-' aren´t allowed in the name

//Caso importa
//Variáveis nomeadas apple e APPLE são duas variáveis diferentes.

//Letras não latinas são permitidas, mas não recomendadas
//É possível usar qualquer idioma, incluido letras cirílicas ou até hieróglifos, assim:
let имя = '...';
let 我 = '...';

//Tecnicamente, não há nenhum erro aqui. Esses nomes são permitidos, mas existe uma convenção internacional para usar o inglês em nomes de variáveis. Mesmo se estivermos escrevendo um roteiro pequeno, ele pode ter uma longa vida pela frente. Pessias de outros países podem precisar lê-lo algum tempo.

//Nomes reservados
//Existem uma lista de palavras reservadas, que não podem ser usadas como nomes de variáveis porque são usadas pela própria linguagem.

//Por exemplo: let, class, return e function são reservados.

//O código abaixo dá um erro de sintaxe:
//let let = 5; // can´t name a variable 'let', error!
//let return = 5; // also can´t name it 'return', error!

//Uma missão sem use strict
//Normalmente, precisamos definir uma variável antes de usá-la. Mas antigamente era tecnicamente possível criar uma variável por uma mera atribuição do valor sem usar let. Isso ainda funciona agora se não colocarmos user strict nossos scripts para manter a compatibilidade com scripts antigos

// note: no 'use strict' in this example

num = 5; // the variable 'num' is created if it didn´t exist

alert(num); // 5

//Esta é uma prática rum e causaria um erro no modo estrito:

'use strict';

num = 5; // error: num us not defined

//Constantes
//Para declarar uma variável constante(imutável), use const em vez de let:
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, can´t reassign the constant!

//Quando um programador tem certeza que uma variável nunca mudará, ele pode declará-la const para garantir e comunicar claramente esse fato a todos;

//Constantes maiúsculas
//Existe uma prática generalizada de usar constantes como aliases para valores difícies de lembrar que são conhecidos antes da execução.

//Tais constantes são nomeadas usando letras maiúsculas e sublinhados.

//Por exemplo, vamos fazer constantes para cores no chamado formato 'web' (hexadecimal):

const COLOR_RED = '#F00';
const COLOR_GREEN = '#0F0';
const COLOR_BLUE = '#00F';
const COLOR_ORANGE = '#FF7F00';

// ...when we need to pick a color
let color = COLOR_ORANGE;
alert(color); // #FF7F00


//Benefícios:
//. COLOR_ORANGE é nuito mais fácil de lembrar do que '#FF7F00'.
//. É muito mais fácil digitar errado '#FF7F00' do que COLOR_ORANGE.
//  Ao ler o código, COLOR_ORANGEé muito mais significativo do que #FF7F00.

// Quando devemos usar maiúsculas para uma constante e quando devemos nomeá-la normalmente? Vamos deixar isso claro.

// Ser uma “constante” significa apenas que o valor de uma variável nunca muda. Mas há constantes que são conhecidas antes da execução (como um valor hexadecimal para vermelho) e há constantes que são calculadas em tempo de execução, durante a execução, mas não mudam após sua atribuição inicial.

// Por exemplo:

// const pageLoadTime = /* time taken by a webpage to load */;

// O valor de pageLoadTimenão é conhecido antes do carregamento da página, portanto, é nomeado normalmente. Mas ainda é uma constante porque não muda após a atribuição.

// Em outras palavras, constantes nomeadas em maiúsculas são usadas apenas como aliases para valores “codificados permanentemente”.

//Nomeie as coisas corretamente

//Falando em variáveis, há mais uma coisa extremamente importante.

// Um nome de variável deve ter um significado claro e óbvio, descrevendo os dados que ela armazena.

// A nomenclatura de variáveis ​​é uma das habilidades mais importantes e complexas na programação. Uma rápida olhada nos nomes das variáveis ​​pode revelar qual código foi escrito por um iniciante versus um desenvolvedor experiente.

// Em um projeto real, a maior parte do tempo é gasto modificando e estendendo uma base de código existente, em vez de escrever algo completamente separado do zero. Quando voltamos a algum código depois de fazer outra coisa por um tempo, é muito mais fácil encontrar informações bem rotuladas. Ou, em outras palavras, quando as variáveis ​​têm bons nomes.

// Por favor, gaste algum tempo pensando no nome correto para uma variável antes de declará-la. Fazer isso irá recompensá-lo generosamente.

//Algumas regras boas de seguir são:

//Use nomes legíveis como userNameou shoppingCart.
//Fique longe de abreviações ou nomes curtos como a, b, c, a menos que você realmente saiba o que está fazendo.
//Faça nomes extremamente descritivos e concisos. Exemplos de nomes ruins são datae value. Tais nomes não dizem nada. Não há problema em usá-los se o contexto do código tornar excepcionalmente óbvio quais dados ou valores a variável está referenciando.
//Concorde com os termos dentro de sua equipe e em sua própria mente. Se um visitante do site for chamado de “usuário”, devemos nomear variáveis ​​relacionadas currentUserou newUserem vez de currentVisitorou newManInTown.
//Parece simples? Na verdade, é, mas criar nomes de variáveis ​​descritivos e concisos na prática não é. Vá em frente.

// Reutilizar ou criar?
//E a última nota. Existem alguns programadores preguiçosos que, em vez de declarar novas variáveis, tendem a reutilizar as já existentes.

//Como resultado, suas variáveis ​​são como caixas nas quais as pessoas jogam coisas diferentes sem trocar seus adesivos. O que há dentro da caixa agora? Quem sabe? Precisamos nos aproximar e verificar.

//Esses programadores economizam um pouco na declaração de variáveis, mas perdem dez vezes mais na depuração.

//Uma variável extra é boa, não má.

//Os minificadores e navegadores JavaScript modernos otimizam o código suficientemente bem, para que não criem problemas de desempenho. Usar variáveis ​​diferentes para valores diferentes pode até ajudar o mecanismo a otimizar seu código.

// Resumo
//Podemos declarar variáveis ​​para armazenar dados usando as palavras-chave var, letou const.

//let– é uma declaração de variável moderna.
//var– é uma declaração de variável antiga. Normalmente não o usamos, mas abordaremos diferenças sutis letno capítulo O antigo "var" , caso você precise deles.
//const– é como let, mas o valor da variável não pode ser alterado.
//As variáveis ​​devem ser nomeadas de uma forma que nos permita entender facilmente o que está dentro delas.