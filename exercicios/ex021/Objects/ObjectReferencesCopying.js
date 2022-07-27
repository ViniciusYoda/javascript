/*

Referências e cópias de objetos
Uma das diferenças fundamentais de objetos versus primitivos é que os objetos são armazenados e copiados “por referência”, enquanto os valores primitivos: strings, números, booleanos, etc – são sempre copiados “como um valor inteiro”.

Isso é fácil de entender se olharmos um pouco sob o capô do que acontece quando copiamos um valor.

Vamos começar com um primitivo, como uma string.

Aqui colocamos uma cópia de messageinto phrase:

*/

let message = "Hello!";
let phrase = message;

/*

Como resultado temos duas variáveis ​​independentes, cada uma armazenando a string "Hello!".


Um resultado bastante óbvio, certo?

Objetos não são assim.

Uma variável atribuída a um objeto armazena não o objeto em si, mas seu “endereço na memória” – em outras palavras, “uma referência” a ele.

Vejamos um exemplo de tal variável:

*/

let user = {
    name: "John"
};

/*

E aqui está como ele é realmente armazenado na memória:


O objeto é armazenado em algum lugar da memória (à direita da imagem), enquanto a uservariável (à esquerda) tem uma “referência” a ele.

Podemos pensar em uma variável de objeto, como user, como uma folha de papel com o endereço do objeto nela.

Quando executamos ações com o objeto, por exemplo, pegue uma propriedade user.name, o mecanismo JavaScript verifica o que está nesse endereço e executa a operação no objeto real.

Agora aqui está porque é importante.

Quando uma variável de objeto é copiada, a referência é copiada, mas o próprio objeto não é duplicado.

Por exemplo:

*/

let user = { name: "John" };

let admin = user; // copy the reference

/*

Agora temos duas variáveis, cada uma armazenando uma referência ao mesmo objeto:


Como você pode ver, ainda há um objeto, mas agora com duas variáveis ​​que o referenciam.

Podemos usar qualquer variável para acessar o objeto e modificar seu conteúdo:

*/

let user = { name: 'john' };

let admin = user;

admin.name = 'Pete'; // changed by the "admin" reference

alert(user.bname); // 'Pete', changes are seen from the "user" reference

/*

É como se tivéssemos um armário com duas chaves e usássemos uma delas ( admin) para entrar e fazer alterações. Então, se mais tarde usarmos outra chave ( user), ainda estamos abrindo o mesmo gabinete e podemos acessar o conteúdo alterado.

Comparação por referência
Dois objetos são iguais somente se forem o mesmo objeto.

Por exemplo, aqui ae breferencie o mesmo objeto, então eles são iguais:

*/

let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true

// E aqui dois objetos independentes não são iguais, embora pareçam iguais (ambos estão vazios):

let a = {};
let b = {}; // two independent objects

alert( a == b ); // false

/*

Para comparações como obj1 > obj2ou para uma comparação com um primitivo obj == 5, os objetos são convertidos em primitivos. Estudaremos como as conversões de objetos funcionam muito em breve, mas para falar a verdade, tais comparações são necessárias muito raramente – geralmente elas aparecem como resultado de um erro de programação.

Clonagem e mesclagem, Object.assign
Assim, copiar uma variável de objeto cria mais uma referência ao mesmo objeto.

Mas e se precisarmos duplicar um objeto?

Podemos criar um novo objeto e replicar a estrutura do existente, iterando sobre suas propriedades e copiando-as no nível primitivo.

Assim:

*/

let user = {
    name: "John",
    age: 30
};

let clone = {}; // the new empty object

// let´s copy all user properties into it
for (let key in user) {
    clone[key] = user[key];
}

// now close is a fully independent object with the same content 
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object

/*

Também podemos usar o método Object.assign .

A sintaxe é:

*/

Object.assign(dest, [src1, src2, src3...])

/*

O primeiro argumento desté um objeto de destino.
Outros argumentos src1, ..., srcN(podem ser tantos quantos forem necessários) são objetos de origem.
Ele copia as propriedades de todos os objetos de origem src1, ..., srcNno destino dest. Em outras palavras, as propriedades de todos os argumentos a partir do segundo são copiadas para o primeiro objeto.
A chamada retorna dest.

Por exemplo, podemos usá-lo para mesclar vários objetos em um:

*/

let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }

// Se o nome da propriedade copiada já existir, ele será substituído:

let user = { name: "John" };

Object.assign(usser, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }

// Também podemos usar Object.assignpara substituir for..inloop para clonagem simples:

let user = {
    name: "John",
    age: 30
};

let clone = Object.assign({}, user);

/*

Ele copia todas as propriedades de userno objeto vazio e o retorna.

Existem também outros métodos de clonagem de um objeto, por exemplo, usando a sintaxe de propagação clone = {...user} , abordada posteriormente no tutorial.

Clonagem aninhada
Até agora assumimos que todas as propriedades de usersão primitivas. Mas as propriedades podem ser referências a outros objetos.

Assim:

*/

let user = {
    name: "John",
    sizes: {
        height: 182,
        width: 50
    }
};

alert( user.sizes.height ); // 182

// Agora não basta copiar clone.sizes = user.sizes, pois user.sizesé um objeto, e será copiado por referência, portanto clonee usercompartilhará os mesmos tamanhos:

let user = {
    name: "John",
    sizes: {
        height: 182,
        width: 50
    }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width++; // change a property from one place
alert(clone.sizes.width); // 51, get the result from the other one

/*

Para corrigir isso e criar userobjetos clonerealmente separados, devemos usar um loop de clonagem que examina cada valor de user[key]e, se for um objeto, replica sua estrutura também. Isso é chamado de “clonagem profunda”.

Podemos usar recursão para implementá-lo. Ou, para não reinventar a roda, pegue uma implementação existente, por exemplo _.cloneDeep(obj) da biblioteca JavaScript lodash .

Objetos const podem ser modificados
Um efeito colateral importante de armazenar objetos como referências é que um objeto declarado como const pode ser modificado.

Por exemplo:

*/

const user = {
    name: "John"
};

user.name = "Pete"; // (*)

alert(user.name); // Pete

/*

Pode parecer que a linha (*)causaria um erro, mas isso não acontece. O valor de useré constante, deve sempre referenciar o mesmo objeto, mas as propriedades desse objeto podem ser alteradas.

Em outras palavras, o const usersó dá erro se tentarmos definir user=...como um todo.

Dito isso, se realmente precisamos fazer propriedades de objetos constantes, também é possível, mas usando métodos totalmente diferentes. Mencionaremos isso no capítulo Flags and descriptors de propriedade .

Resumo
Os objetos são atribuídos e copiados por referência. Em outras palavras, uma variável armazena não o “valor do objeto”, mas uma “referência” (endereço na memória) para o valor. Portanto, copiar tal variável ou passá-la como um argumento de função copia essa referência, não o próprio objeto.

Todas as operações por meio de referências copiadas (como adicionar/remover propriedades) são executadas no mesmo objeto único.

Para fazer uma “cópia real” (um clone) podemos usar Object.assigna chamada “cópia rasa” (objetos aninhados são copiados por referência) ou uma função de “clonagem profunda”, como _.cloneDeep(obj) .

*/

