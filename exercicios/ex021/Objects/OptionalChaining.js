/*

Encadeamento opcional '?.'

Uma adição recente
Esta é uma adição recente à linguagem. Navegadores antigos podem precisar de polyfills .

O encadeamento opcional ?.é uma maneira segura de acessar propriedades de objetos aninhados, mesmo que não exista uma propriedade intermediária.

O problema da “propriedade inexistente”
Se você acabou de começar a ler o tutorial e aprender JavaScript, talvez o problema ainda não o tenha tocado, mas é bastante comum.

Como exemplo, digamos que temos userobjetos que contêm as informações sobre nossos usuários.

A maioria de nossos usuários possui endereços em user.addressimóveis, com a rua user.address.street, mas alguns não os forneceram.

Nesse caso, quando tentamos obter user.address.street, e o usuário está sem endereço, recebemos um erro:

*/

let user = {}; // a  user without "address" property

alert(user.address.street); // Error!

/*

Esse é o resultado esperado. JavaScript funciona assim. Como user.addressestá undefined, uma tentativa de obter user.address.streetfalha com um erro.

Em muitos casos práticos, preferimos obter undefinedem vez de um erro aqui (significando “sem rua”).

…e outro exemplo. No desenvolvimento da Web, podemos obter um objeto que corresponde a um elemento de página da Web usando uma chamada de método especial, como document.querySelector('.elem'), e ele retorna nullquando não existe tal elemento.

*/

// document.querySelector('.elem') is null if there´s no element
let html = document.querySelector('.elem').innerHTML; // error if it´s null

/*

Mais uma vez, se o elemento não existir, obteremos um erro ao acessar a .innerHTMLpropriedade de null. E em alguns casos, quando a ausência do elemento é normal, gostaríamos de evitar o erro e apenas aceitar html = nullcomo resultado.

Como podemos fazer isso?

A solução óbvia seria verificar o valor usando ifou o operador condicional ?, antes de acessar sua propriedade, assim:

*/

let user = {};

alert(user.address ? user.address.street : undefined);

/*

Funciona, não tem erro... Mas é bem deselegante. Como você pode ver, o "user.address"aparece duas vezes no código.

Veja como o mesmo ficaria document.querySelector:

*/

let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;

/*

Podemos ver que a busca do elemento document.querySelector('.elem')é realmente chamada duas vezes aqui. Não é bom.

Para propriedades aninhadas mais profundamente, torna-se ainda mais feio, pois são necessárias mais repetições.

Por exemplo, vamos entrar user.address.street.namede forma semelhante.

*/

let user = {}; // user has no address

alert(user.address ? user.address.street ? user.address.street.name : null : null);

/*

Isso é simplesmente horrível, pode-se até ter problemas para entender esse código.

Há uma maneira um pouco melhor de escrevê-lo, usando o &&operador:

*/

let user = {}; // user has no address

alert( user.address && user.address.street && user.address.street.name); // undefined (no error)

/*

E'ing todo o caminho para a propriedade garante que todos os componentes existam (se não, a avaliação pára), mas também não é o ideal.

Como você pode ver, os nomes das propriedades ainda estão duplicados no código. Por exemplo, no código acima, user.addressaparece três vezes.

É por isso que o encadeamento opcional ?.foi adicionado à linguagem. Para resolver este problema de uma vez por todas!

Encadeamento opcional
O encadeamento opcional ?.interrompe a avaliação se o valor anterior ?.for undefinedou nulle retornar undefined.

Mais adiante neste artigo, por brevidade, estaremos dizendo que algo “existe” se não for nulle não for undefined.

Em outras palavras, value?.prop:

funciona como value.prop, se valueexistir,
caso contrário (quando valueé undefined/null) ele retorna undefined.
Aqui está a maneira segura de acessar user.address.streetusando ?.:

*/

let user = {}; // user has no address

alert( user?.address?.street ); // undefined (no error)

/*

O código é curto e limpo, não há duplicação.

Segue um exemplo com document.querySelector:

*/

let html = document.querySelector('.elem')?.innerHTML; // will be undefined, if there0s no element

// Ler o endereço com user?.addressfunciona mesmo que usero objeto não exista:

let user = null;

alert (user?.address ); // undefined
alert( user?.address.street ); // undefined

/*

Observe: a ?.sintaxe torna opcional o valor antes dele, mas não mais.

user?.address.street.namePor exemplo , no ?.permite userser seguro null/undefined(e retorna undefinednesse caso), mas isso é apenas para user. Outras propriedades são acessadas de maneira regular. Se quisermos que alguns deles sejam opcionais, precisaremos substituir mais .por ?..

Não abuse do encadeamento opcional
Devemos usar ?.apenas onde está tudo bem que algo não existe.

Por exemplo, se de acordo com nosso código, o userobjeto lógico deve existir, mas addressé opcional, devemos escrever user.address?.street, mas não user?.address?.street.

Então, se userestiver indefinido, veremos um erro de programação e o corrigiremos. Caso contrário, se usarmos demais ?., os erros de codificação podem ser silenciados quando não for apropriado e se tornar mais difíceis de depurar.

A variável antes ?.deve ser declarada
Se não houver nenhuma variável user, user?.anythingacionará um erro:

*/

// ReferenceError: user is not defined
user?.address;

/*

A variável deve ser declarada (por exemplo let/const/var user, ou como parâmetro de função). O encadeamento opcional funciona apenas para variáveis ​​declaradas.

Curto-circuito
Como foi dito antes, o ?.imediatamente interrompe (“curto-circuito”) a avaliação se a parte esquerda não existir.

Portanto, se houver outras chamadas de função ou operações à direita de ?., elas não serão feitas.

Por exemplo:

*/

let user = null;
let x = 0;

user?.sayHi(x++); // no "user", so the execution doesn´t reach sayHi call and x++

alert(x); // 0, value not incremented

/*

Outras variantes: ?.(), ?.[]
O encadeamento opcional ?.não é um operador, mas uma construção de sintaxe especial, que também funciona com funções e colchetes.

Por exemplo, ?.()é usado para chamar uma função que pode não existir.

No código abaixo, alguns de nossos usuários têm adminmétodo e outros não:

*/

let userAdmin = {
    admin() {
        alert("I am admin");
    }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // nothing happens (no such method)

/*

Aqui, em ambas as linhas, primeiro usamos o ponto ( userAdmin.admin) para obter a adminpropriedade, porque assumimos que o userobjeto existe, portanto, é seguro lê-lo.

Em seguida ?.(), verifica a parte esquerda: se a adminfunção existe, ela é executada (é assim para userAdmin). Caso contrário (para userGuest) a avaliação para sem erros.

A ?.[]sintaxe também funciona, se quisermos usar colchetes []para acessar propriedades em vez de ponto .. Semelhante aos casos anteriores, permite ler com segurança uma propriedade de um objeto que pode não existir.

*/

let key = "firstName";

let user1 = {
    firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

// Também podemos usar ?.com delete:

delete user?.name; // delete user.name if user existis

/*

Podemos usar ?.para leitura e exclusão seguras, mas não para escrita
O encadeamento opcional ?.não tem uso no lado esquerdo de uma atribuição.

Por exemplo:

*/

let user = null;

user?.name = "John"; // Error, doesn´t work because it evaluates to: undefined = "John"

/*

Resumo
?.A sintaxe de encadeamento opcional tem três formas:

1. obj?.prop– retorna obj.propse objexistir, caso contrário undefined.
2. obj?.[prop]– retorna obj[prop]se objexistir, caso contrário undefined.
3. obj.method?.()– chama obj.method()se obj.methodexistir, caso contrário retorna undefined.

Como podemos ver, todos eles são diretos e simples de usar. O ?.verifica a parte esquerda null/undefinede permite que a avaliação prossiga se não for assim.

Uma cadeia de ?.permite acessar com segurança propriedades aninhadas.

Ainda assim, devemos aplicar ?.com cuidado, apenas onde for aceitável, de acordo com nossa lógica de código, que a parte esquerda não exista. Para que não esconda erros de programação de nós, se eles ocorrerem.