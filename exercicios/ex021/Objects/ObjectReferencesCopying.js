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

alert 