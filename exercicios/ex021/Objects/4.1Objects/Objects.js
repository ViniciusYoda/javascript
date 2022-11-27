/*

Objetos
Como sabemos do capítulo Tipos de dados , existem oito tipos de dados em JavaScript. Sete deles são chamados de “primitivos”, porque seus valores contêm apenas uma única coisa (seja uma string ou um número ou qualquer outra coisa).

Em contraste, os objetos são usados ​​para armazenar coleções chaveadas de vários dados e entidades mais complexas. Em JavaScript, objetos penetram em quase todos os aspectos da linguagem. Portanto, devemos entendê-los primeiro antes de nos aprofundarmos em qualquer outro lugar.

Um objeto pode ser criado com colchetes de figuras {…}com uma lista opcional de propriedades . Uma propriedade é um par “chave: valor”, onde keyé uma string (também chamada de “nome da propriedade”), e valuepode ser qualquer coisa.

Podemos imaginar um objeto como um armário com arquivos assinados. Cada pedaço de dados é armazenado em seu arquivo pela chave. É fácil encontrar um arquivo pelo nome ou adicionar/remover um arquivo.

Um objeto vazio (“armário vazio”) pode ser criado usando uma das duas sintaxes:

*/

let user = new Object(); // "object constructor" syntax
let user = {}; // "objecct literal" syntax

/*

Normalmente, os parênteses de figura {...}são usados. Essa declaração é chamada de literal de objeto .

Literais e propriedades
Podemos colocar imediatamente algumas propriedades {...}como pares “chave: valor”:

*/

let user = {    // an object
    name: "John", // by key "name" store value "John"
    age: 30     // by key "age" store value 30
};

/*

Uma propriedade tem uma chave (também conhecida como “nome” ou “identificador”) antes dos dois pontos ":"e um valor à direita dela.

No userobjeto, existem duas propriedades:

1. A primeira propriedade tem o nome "name"e o valor "John".
2. O segundo tem o nome "age"e o valor 30.

O objeto resultante userpode ser imaginado como um gabinete com dois arquivos assinados rotulados como “nome” e “idade”.

Podemos adicionar, remover e ler arquivos dele a qualquer momento.

Os valores de propriedade são acessíveis usando a notação de ponto:

*/

// get property values of the object:
alert( user.name ); // John
alert( user.age ); // 30

// O valor pode ser de qualquer tipo. Vamos adicionar um booleano:

user.isAdmin = true;

// Para remover uma propriedade, podemos usar o deleteoperador:

delete user.age;

// Também podemos usar nomes de propriedades com várias palavras, mas eles devem ser citados:

let user = {
    name: "John",
    age: 30,
    "likes birds": true // multiword property name must be quoted
};

// A última propriedade da lista pode terminar com uma vírgula:

let user = {
    name: "John",
    age: 30,
}

/*

Isso é chamado de vírgula “à direita” ou “pendurada”. Torna mais fácil adicionar/remover/mover propriedades, porque todas as linhas se tornam iguais.

Colchetes
Para propriedades de várias palavras, o acesso ao ponto não funciona:

*/

// this would give a syntaz error
user.likes birds = true

/*

JavaScript não entende isso. Ele acha que nós endereçamos user.likes, e então dá um erro de sintaxe quando se depara com o inesperado birds.

O ponto requer que a chave seja um identificador de variável válido. Isso implica: não contém espaços, não começa com um dígito e não inclui caracteres especiais ( $e _são permitidos).

Existe uma “notação de colchetes” alternativa que funciona com qualquer string:

*/

let user = {}.dictionary

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];

/*

Agora está tudo bem. Observe que a string dentro dos colchetes está entre aspas corretamente (qualquer tipo de aspas serve).

Os colchetes também fornecem uma maneira de obter o nome da propriedade como resultado de qualquer expressão – em oposição a uma string literal – como de uma variável da seguinte forma:

*/

let key = "likes birds";

// same as user["likes birds"] = true;
user[key] = true;

/*

Aqui, a variável keypode ser calculada em tempo de execução ou depender da entrada do usuário. E então nós o usamos para acessar a propriedade. Isso nos dá uma grande flexibilidade.

Por exemplo:

*/

let user = {
    name: "John",
    age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// access by variable
alert( user[key] ); // John (if enter "name")

// A notação de ponto não pode ser usada de maneira semelhante:

let user = {
    name: "John",
    age: 30
};

let key = "name";
alert( user.key ) // undefined

/*

Propriedades computadas
Podemos usar colchetes em um literal de objeto, ao criar um objeto. Isso é chamado de propriedades computadas .

Por exemplo:

*/

let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
    [fruit]: 5, // the bame of the property is taken from the variable fruit
};

alert( bag.apple ); // 5 if fruit="apple"

/*

O significado de uma propriedade computada é simples: [fruit]significa que o nome da propriedade deve ser retirado de fruit.

Então, se um visitante entrar "apple", bagse tornará {apple: 5}.

Essencialmente, isso funciona da mesma forma que:

*/

let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// take property name from the fruit variable
bag[fruit] = 5;

/*

… Mas parece mais bonito.

Podemos usar expressões mais complexas entre colchetes:

*/

let fruit = 'apple';
let bag = {
    [fruit + 'Computers']: 5 // bag.appleComputers = 5
};

/*

Os colchetes são muito mais poderosos do que a notação de pontos. Eles permitem quaisquer nomes e variáveis ​​de propriedade. Mas eles também são mais complicados de escrever.

Portanto, na maioria das vezes, quando os nomes das propriedades são conhecidos e simples, o ponto é usado. E se precisarmos de algo mais complexo, mudamos para colchetes.

Abreviação do valor da propriedade
Em código real, geralmente usamos variáveis ​​existentes como valores para nomes de propriedades.

Por exemplo:

*/

function makeUser(name, age) {
    return {
        name: name,
        age: age,
        // ...other properties
    };
}

let user = makeUser("John", 30);
alert(user.name); // John

/*

No exemplo acima, as propriedades têm os mesmos nomes das variáveis. O caso de uso de fazer uma propriedade a partir de uma variável é tão comum, que existe uma abreviação especial do valor da propriedade para torná-la mais curta.

Em vez de name:name, podemos apenas escrever name, assim:

*/

function makeUser(name, age) {
    return {
        name, // same as name: name
        age, // same as age: age
        //...
    };
}

// Podemos usar propriedades normais e abreviações no mesmo objeto:

let user = {
    name, // same as name:name
    age: 30
};

/*

Limitações de nomes de propriedade
Como já sabemos, uma variável não pode ter um nome igual a uma das palavras reservadas ao idioma como “for”, “let”, “return” etc.

Mas para uma propriedade de objeto, não há tal restrição:

*/

// these properties are all right
let obj = {
    for: 1,
    let: 2,
    return: 3
};

alert( obj.for + obj.let + obj.return ); // 6

/*

Resumindo, não há limitações para nomes de propriedades. Eles podem ser quaisquer strings ou símbolos (um tipo especial para identificadores, que será abordado posteriormente).

Outros tipos são convertidos automaticamente em strings.

Por exemplo, um número 0se torna uma string "0"quando usado como chave de propriedade:

*/

let obj = {
    0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0" )
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)

// Há uma pequena pegadinha com uma propriedade especial chamada __proto__. Não podemos configurá-lo para um valor não-objeto:

let obj = {};
obj._proto_ = 5; // assign a number
alert(obj._proto_); // [object Object] - the value is an object, didn´t work as intended

/*

Como vemos no código, a atribuição a uma primitiva 5é ignorada.

Abordaremos a natureza especial de __proto__nos capítulos subsequentes e sugeriremos maneiras de corrigir esse comportamento.

Teste de existência de propriedade, operador “in”
Uma característica notável de objetos em JavaScript, em comparação com muitas outras linguagens, é que é possível acessar qualquer propriedade. Não haverá erro se a propriedade não existir!

Ler uma propriedade inexistente apenas retorna undefined. Assim, podemos testar facilmente se a propriedade existe:

*/

let user = {};

alert( user.noSuchProperty === undefined ); // true means "no such property"

/*

Há também um operador especial "in"para isso.

A sintaxe é:

*/

"key" in Object

// Por exemplo:

let user = { name: "John", age: 30 };

alert( "age" in user); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn´t exist

/*

Observe que no lado esquerdo indeve haver um nome de propriedade . Isso geralmente é uma string entre aspas.

Se omitirmos as aspas, isso significa que uma variável deve conter o nome real a ser testado. Por exemplo:

*/

let user = { age: 30 };

let key = "age";
alert( key in user ); // true, propertu "age" exists

/*

Por que o inoperador existe? Não é o suficiente para comparar undefined?

Bem, na maioria das vezes a comparação com undefinedfunciona bem. Mas há um caso especial quando ele falha, mas "in"funciona corretamente.

É quando uma propriedade de objeto existe, mas armazena undefined:

*/

let obj = {
    test: undefined
};

alert( obj.test ); // it´s undefined, so - no such property?

alert( "test" in obj ); // true, the property does exist!

/*

No código acima, a propriedade obj.testexiste tecnicamente. Assim, o inoperador funciona direito.

Situações como esta acontecem muito raramente, porque undefinednão devem ser explicitamente atribuídas. Usamos principalmente nullpara valores “desconhecidos” ou “vazios”. Portanto, o inoperador é um convidado exótico no código.

O loop "for..in"
Para percorrer todas as teclas de um objeto, existe uma forma especial de loop: for..in. Isso é uma coisa completamente diferente da for(;;)construção que estudamos antes.

A sintaxe:

*/

for (key in Object) {
    // executes the body for each key among object properties
}

// Por exemplo, vamos gerar todas as propriedades de user:

let user = {
    name: "John",
    age: 30,
    isAdmin: true
};

for (let key in user) {
    // keys 
    alert( key ); // name, age, isAdmin
    // values for the keys
    alert( user[key] ); // John, 20, true
}

/*

Observe que todas as construções “for” nos permitem declarar a variável de loop dentro do loop, como let keyaqui.

Além disso, poderíamos usar outro nome de variável aqui em vez de key. Por exemplo, "for (let prop in obj)"também é amplamente utilizado.

Ordenado como um objeto
Os objetos são ordenados? Em outras palavras, se fizermos um loop sobre um objeto, obteremos todas as propriedades na mesma ordem em que foram adicionadas? Podemos confiar nisso?

A resposta curta é: “ordenado de forma especial”: as propriedades inteiras são classificadas, outras aparecem na ordem de criação. Os detalhes seguem.

Como exemplo, vamos considerar um objeto com os códigos do telefone:

*/

let codes = {
    "49": "Germany",
    "41": "Switzerland",
    "44": "Great Britain",
    // ...,
    "1": "USA"
};

for (let code in codes) {
    alert(code); // 1, 41, 44, 49
}

/*

O objeto pode ser usado para sugerir uma lista de opções ao usuário. Se estamos fazendo um site principalmente para um público alemão, provavelmente queremos 49ser os primeiros.

Mas se executarmos o código, veremos uma imagem totalmente diferente:

EUA (1) vai primeiro
depois a Suíça (41) e assim por diante.
Os códigos de telefone vão em ordem crescente, porque são números inteiros. Então nós vemos 1, 41, 44, 49.

Propriedades inteiras? O que é isso?
O termo "propriedade de inteiro" aqui significa uma string que pode ser convertida de e para um inteiro sem alteração.

Então, "49"é um nome de propriedade inteiro, porque quando é transformado em um número inteiro e de volta, ainda é o mesmo. Mas "+49"e "1.2"não são:

*/

// Number(...) explicitly converts to a number
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property

// …Por outro lado, se as chaves não forem inteiras, elas serão listadas na ordem de criação, por exemplo:

let user = {
    name: "John",
    surname: "Smith"
};
user.age = 25; // add one more
  
// non-integer properties are listed in the creation order
for (let prop in user) {
    alert( prop ); // name, surname, age
}

/*

Portanto, para corrigir o problema com os códigos do telefone, podemos “trapacear” tornando os códigos não inteiros. Adicionar um "+"sinal de mais antes de cada código é suficiente.

Assim:

*/

let codes = {
    "+49": "Germany",
    "+41": "Switzerland",
    "+44": "Great Britain",
    // ..,
    "+1": "USA"
};
  
for (let code in codes) {
    alert( +code ); // 49, 41, 44, 1
}

/*

Agora funciona como pretendido.

Resumo
Objetos são arrays associativos com vários recursos especiais.

Eles armazenam propriedades (pares chave-valor), onde:

As chaves de propriedade devem ser strings ou símbolos (geralmente strings).
Os valores podem ser de qualquer tipo.
Para acessar uma propriedade, podemos usar:

A notação de ponto: obj.property.
Notação de colchetes obj["property"]. Os colchetes permitem tirar a chave de uma variável, como obj[varWithKey].
Operadores adicionais:

Para excluir uma propriedade: delete obj.prop.
Para verificar se existe uma propriedade com a chave fornecida: "key" in obj.
Para iterar sobre um objeto: for (let key in obj)loop.
O que estudamos neste capítulo é chamado de “objeto simples”, ou apenas Object.

Existem muitos outros tipos de objetos em JavaScript:

Arraypara armazenar coleções de dados ordenadas,
Datepara armazenar as informações sobre a data e hora,
Errorpara armazenar as informações sobre um erro.
…E assim por diante.
Eles têm suas características especiais que estudaremos mais tarde. Às vezes as pessoas dizem algo como “tipo de matriz” ou “tipo de data”, mas formalmente eles não são tipos próprios, mas pertencem a um único tipo de dados “objeto”. E eles o estendem de várias maneiras.

Objetos em JavaScript são muito poderosos. Aqui nós apenas arranhamos a superfície de um tópico que é realmente enorme. Trabalharemos de perto com objetos e aprenderemos mais sobre eles em outras partes do tutorial.

*/