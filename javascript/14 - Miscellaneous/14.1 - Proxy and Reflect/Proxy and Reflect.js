/*

Procurar e Refletir
Um Proxyobjeto envolve outro objeto e intercepta operações, como propriedades de leitura/gravação e outras, opcionalmente manipulando-as por conta própria ou permitindo de forma transparente que o objeto as manipule.

Proxies são usados ​​em muitas bibliotecas e algumas estruturas de navegador. Veremos muitas aplicações práticas neste artigo.

Proxy
A sintaxe:

let proxy = new Proxy(target, handler)

target– é um objeto para envolver, pode ser qualquer coisa, incluindo funções.
handler– configuração do proxy: um objeto com “traps”, métodos que interceptam operações. – por exemplo get, trap para ler uma propriedade de target, settrap para escrever uma propriedade em target, e assim por diante.
Para operações em proxy, se houver uma armadilha correspondente em handler, ele será executado e o proxy terá a chance de lidar com isso, caso contrário, a operação será executada em target.

Como exemplo inicial, vamos criar um proxy sem traps:

*/

let target = {};
let proxy = new Proxy(target, {}); // empty handler

proxy.test = 5. // writing to proxy (1)
alert(target.test); // 5, the property appeared in target!

alert(proxy.test); // 5, we can read it from proxy too (2)

for (let key in proxy) alert(key); // test, iteration works

/*

Como não há traps, todas as operações em proxysão encaminhadas para target.

1. Uma operação de gravação proxy.test=define o valor em target.
2. Uma operação de leitura proxy.testretorna o valor de target.
3.  iteração sobre proxyretorna valores de target.

Como podemos ver, sem armadilhas, proxyhá um wrapper transparente em torno targetde .


Proxyé um “objeto exótico” especial. Não possui propriedades próprias. Com um vazio handler, ele encaminha as operações de forma transparente para target.

Para ativar mais recursos, vamos adicionar armadilhas.

O que podemos interceptar com eles?

Para a maioria das operações em objetos, há um chamado “método interno” na especificação do JavaScript que descreve como ele funciona no nível mais baixo. Por exemplo [[Get]], o método interno para ler uma propriedade, [[Set]], o método interno para gravar uma propriedade e assim por diante. Esses métodos são usados ​​apenas na especificação, não podemos chamá-los diretamente pelo nome.

As interceptações de proxy interceptam invocações desses métodos. Eles estão listados na especificação do Proxy e na tabela abaixo.

Para cada método interno, há uma armadilha nesta tabela: o nome do método que podemos adicionar ao handlerparâmetro de new Proxypara interceptar a operação:


Método Interno	Método do manipulador	Aciona quando…
[[Get]]	get	lendo uma propriedade
[[Set]]	set	escrevendo para uma propriedade
[[HasProperty]]	has	inoperador
[[Delete]]	deleteProperty	deleteoperador
[[Call]]	apply	chamada de função
[[Construct]]	construct	newoperador
[[GetPrototypeOf]]	getPrototypeOf	Object.getPrototypeOf
[[SetPrototypeOf]]	setPrototypeOf	Object.setPrototypeOf
[[IsExtensible]]	isExtensible	Object.isExtensible
[[PreventExtensions]]	preventExtensions	Object.preventExtensions
[[DefineOwnProperty]]	defineProperty	Object.defineProperty , Object.defineProperties
[[GetOwnProperty]]	getOwnPropertyDescriptor	Object.getOwnPropertyDescriptor , for..in,Object.keys/values/entries
[[OwnPropertyKeys]]	ownKeys	Object.getOwnPropertyNames , Object.getOwnPropertySymbols , for..in,Object.keys/values/entries

invariantes
O JavaScript impõe algumas invariantes – condições que devem ser atendidas por métodos internos e traps.

A maioria deles é para valores de retorno:

[[Set]]deve retornar truese o valor foi escrito com sucesso, caso contrário false.
[[Delete]]deve retornar truese o valor foi excluído com sucesso, caso contrário, false.
…e assim por diante, veremos mais nos exemplos abaixo.
Existem alguns outros invariantes, como:

[[GetPrototypeOf]], aplicado ao objeto proxy deve retornar o mesmo valor [[GetPrototypeOf]]aplicado ao objeto de destino do objeto proxy. Em outras palavras, a leitura do protótipo de um proxy deve sempre retornar o protótipo do objeto de destino.
As armadilhas podem interceptar essas operações, mas devem seguir essas regras.

As invariantes garantem um comportamento correto e consistente dos recursos da linguagem. A lista completa de invariantes está na especificação . Você provavelmente não os violará se não estiver fazendo algo estranho.

Vamos ver como isso funciona em exemplos práticos.

Valor padrão com trap “get”
As armadilhas mais comuns são para propriedades de leitura/gravação.

Para interceptar a leitura, o handlerdeve ter um método get(target, property, receiver).

Ele dispara quando uma propriedade é lida, com os seguintes argumentos:

target– é o objeto de destino, aquele passado como o primeiro argumento para new Proxy,
property- nome da propriedade,
receiver– se a propriedade de destino for um getter, então receiveré o objeto que será usado como thisem sua chamada. Normalmente é o proxypróprio objeto (ou um objeto que herda dele, se herdarmos do proxy). No momento, não precisamos desse argumento, portanto, ele será explicado com mais detalhes posteriormente.
Vamos usar getpara implementar valores padrão para um objeto.

Faremos um array numérico que retorna 0para valores inexistentes.

Normalmente, quando alguém tenta obter um item de array inexistente, eles obtêm undefined, mas vamos agrupar um array regular no proxy que intercepta a leitura e retorna 0se não houver tal propriedade:

*/

let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
   get(target, prop) {
      if (prop in target) {
         return target[prop];
      } else {
         return 0; // default value
      }
   }
});

alert(numbers[1]); // 1
alert(numbers[123]); // 0 (no such item)

/*

Como podemos ver, é muito fácil fazer isso com uma getarmadilha.

Podemos usar Proxypara implementar qualquer lógica para valores “padrão”.

Imagine que temos um dicionário, com frases e suas traduções:

*/

let dictionary = {
   'Hello': 'Hola',
   'Bye': 'Adiós'
};

alert(dictionary['Hello']); // Hola
alert(dictionary['Welcome']); // undefined

/*

No momento, se não houver frase, a leitura de dictionaryretorna undefined. Mas, na prática, deixar uma frase sem tradução costuma ser melhor do que undefined. Então, vamos fazê-lo retornar uma frase não traduzida nesse caso, em vez de undefined.

Para conseguir isso, vamos envolver dictionaryem um proxy que intercepta as operações de leitura:

*/

let dictionary2 = {
   'Hello': 'Hola',
   'Bye': 'Adiós'
};

dictionary2 = new Proxy(dictionary2, {
   get(target, phrase) { // intercept reading a property from dictionary
      if (phrase in target) { // if we have it in the dictionary
         return target[phrase]; // return the translation
      } else {
         // otherwise, return the non-translated phrase
         return phrase;
      }
   }
});

// Look up arbitrary phrases in the dictionary!
// At worst, they're not translated.
alert(dictionary['Hello']); // Hola
alert(dictionary['Welcome to Proxy']); // Welcome to Proxy (no translation)

/*

Observe:
Observe como o proxy substitui a variável:

dictionary = new Proxy(dictionary, ...);
O proxy deve substituir totalmente o objeto de destino em todos os lugares. Ninguém deve fazer referência ao objeto de destino depois que ele foi proxy. Caso contrário, é fácil estragar tudo.

Validação com trap “set”
Digamos que queremos um array exclusivamente para números. Se um valor de outro tipo for adicionado, deve haver um erro.

A setarmadilha é acionada quando uma propriedade é gravada.

set(target, property, value, receiver):

target– é o objeto de destino, aquele passado como o primeiro argumento para new Proxy,
property- nome da propriedade,
value- valor da propriedade,
receiver– semelhante ao gettrap, importa apenas para as propriedades do setter.
A setarmadilha deve retornar truese a configuração for bem-sucedida e falsecaso contrário (triggers TypeError).

Vamos usá-lo para validar novos valores:

*/

let numbers2 = [];

numbers2 = new Proxy(numbers2, { // (*)
   set(target, prop, val) { // to intercept property writing
      if (typeof val == 'number') {
         target[prop] = val;
         return true;
      } else {
         return false;
      }
   }
});

numbers2.push(1); // added successfully
numbers2.push(2); // added successfully
alert("Length is: " + numbers.length); // 2

numbers2.push("test"); // TypeError ('set' on proxy returned false)

alert("This line is never reached (error in the line above)");

/*

Observe: a funcionalidade interna de arrays ainda está funcionando! Os valores são somados por push. A lengthpropriedade aumenta automaticamente quando os valores são adicionados. Nosso proxy não quebra nada.

Não precisamos sobrescrever métodos de matriz de valor agregado como pushe unshift, e assim por diante, para adicionar verificações lá, porque internamente eles usam a [[Set]]operação que é interceptada pelo proxy.

Portanto, o código é limpo e conciso.

Não se esqueça de voltartrue
Como dito acima, existem invariantes a serem mantidas.

Para set, ele deve retornar truepara uma gravação bem-sucedida.

Se esquecermos de fazer isso ou retornarmos algum valor falso, a operação será disparada TypeError.

Iteração com “ownKeys” e “getOwnPropertyDescriptor”
Object.keys, for..inloop e a maioria dos outros métodos que iteram sobre as propriedades do objeto usam [[OwnPropertyKeys]]o método interno (interceptado pelo ownKeystrap) para obter uma lista de propriedades.

Esses métodos diferem em detalhes:

Object.getOwnPropertyNames(obj)retorna chaves não simbólicas.
Object.getOwnPropertySymbols(obj)retorna chaves de símbolo.
Object.keys/values()retorna chaves/valores sem símbolo com enumerablesinalizador (os sinalizadores de propriedade foram explicados no artigo Sinalizadores e descritores de propriedade ).
for..inloops sobre chaves não simbólicas com enumerablesinalizador e também chaves de protótipo.
…Mas todos eles começam com essa lista.

No exemplo abaixo usamos ownKeystrap para fazer for..inloop over user, e também Object.keysand Object.values, para pular propriedades começando com um sublinhado _:

*/

let user = {
   name: "John",
   age: 30,
   _password: "***"
};

user = new Proxy(user, {
   ownKeys(target) {
      return Object.keys(target).filter(key => !key.startsWith('_'));
   }
});

// "ownKeys" filters out _password
for (let key in user) alert(key); // name, then: age

// same effect on these methods:
alert(Object.keys(user)); // name,age
alert(Object.values(user)); // John,30

/*

Até agora, funciona.

Porém, se retornarmos uma chave que não existe no objeto, Object.keysnão a listaremos:

*/

let user2 = {};

user2 = new Proxy(user2, {
   ownKeys(target) {
      return ['a', 'b', 'c'];
   }
});

alert(Object.keys(user)); // <empty>

/*

Porque? A razão é simples: Object.keysretorna apenas propriedades com o enumerablesinalizador. Para verificar, ele chama o método interno [[GetOwnProperty]]para cada propriedade para obter seu descritor . E aqui, como não há propriedade, seu descritor está vazio, sem enumerablesinalizador, então é ignorado.

Para Object.keysretornar uma propriedade, precisamos que ela exista no objeto, com o enumerablesinalizador, ou podemos interceptar chamadas para [[GetOwnProperty]](a armadilha getOwnPropertyDescriptorfaz isso) e retornar um descritor com enumerable: true.

Aqui está um exemplo disso:

*/

let user3 = {};

user3 = new Proxy(user3, {
   ownKeys(target) { // called once to get a list of properties
      return ['a', 'b', 'c'];
   },

   getOwnPropertyDescriptor(target, prop) { // called for every property
      return {
         enumerable: true,
         configurable: true
         /* ...other flags, probable "value:..." */
      };
   }
});

alert(Object.keys(user)); // a, b, c

/*

Observemos mais uma vez: só precisamos interceptar [[GetOwnProperty]]se a propriedade estiver ausente no objeto.

Propriedades protegidas com “deleteProperty” e outras armadilhas
Há uma convenção generalizada de que propriedades e métodos prefixados por um sublinhado _são internos. Eles não devem ser acessados ​​de fora do objeto.

Tecnicamente isso é possível:

*/

let user4 = {
   name: "John",
   _password: "secret"
};

alert(user4._password); // secret

/*

Vamos usar proxies para impedir qualquer acesso às propriedades que começam com _.

Vamos precisar das armadilhas:

getlançar um erro ao ler tal propriedade,
setlançar um erro ao escrever,
deletePropertylançar um erro ao deletar,
ownKeyspara excluir propriedades que começam com _from for..ine métodos como Object.keys.
Aqui está o código:

*/

let user5 = {
   name: "John",
   _password: "***"
};

user = new Proxy(user, {
   get(target, prop) {
      if (prop.startsWith('_')) {
         throw new Error("Access denied");
      }
      let value = target[prop];
      return (typeof value === 'function') ? value.bind(target) : value; // (*)
   },
   set(target, prop, val) {// to intercept property writin
      if (prop.startsWith('_')) {
         throw new Error("Access denied");
      } else {
         target[prop] = val;
         return true;
      }
   },
   deleteProperty(target, prop) {// to intercept property deletion
      if (prop.startsWith('_')) {
         throw new Error("Access denied");
      } else {
         delete target[prop];
         return true;
      }
   },
   ownKeys(target) {// to intercept property list
      return Object.keys(target).filter(key => !key.startsWith('_'));
   }
});

// "get" doesn't allow to read _password
try {
   alert(user._password); // Error: Access denied
} catch (e) { alert(e.message); }

// "set" doesn't allow to write _password
try {
   user._password = "test"; // Error: Access denied
} catch (e) { alert(e.message); }

// "deleteProperty" doesn't allow to delete _password

try {
   delete user._password // Error: Access denied
} catch (e) { alert(e.message); }

// "ownKeys" filters out _password
for (let key in user) alert(key); // name

/*

Observe o detalhe importante na getarmadilha, na linha (*):

get(target, prop) {
  // ...
  let value = target[prop];
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
}

Por que precisamos de uma função para chamarvalue.bind(target) ?

A razão é que os métodos de objeto, como user.checkPassword(), devem ser capazes de acessar _password:

user = {
  // ...
  checkPassword(value) {
    // object method must be able to read _password
    return value === this._password;
  }
}

Uma chamada para user.checkPassword()obtém proxy usercomo this(o objeto antes do ponto se torna this), portanto, quando ele tenta acessar this._password, oget armadilha é ativada (ela é acionada em qualquer leitura de propriedade) e gera um erro.

Assim, vinculamos o contexto dos métodos de objeto ao objeto original, target, na linha (*). Em seguida, suas chamadas futuras usarão targetcomothis , sem nenhuma armadilha.

Essa solução geralmente funciona, mas não é a ideal, pois um método pode passar o objeto sem proxy para outro lugar e, então, ficaremos confusos: onde está o objeto original e onde está o proxy?

Além disso, um objeto pode ser proxy várias vezes (vários proxies podem adicionar diferentes “ajustes” ao objeto) e, se passarmos um objeto desempacotado para um método, pode haver consequências inesperadas.

Portanto, esse proxy não deve ser usado em todos os lugares.

Propriedades privadas de uma classe
Mecanismos JavaScript modernos oferecem suporte nativo a propriedades privadas em classes, prefixadas com #. Eles são descritos no artigo Propriedades e métodos privados e protegidos . Sem procurações necessárias.

Essas propriedades têm seus próprios problemas. Em particular, eles não são herdados.

“No alcance” com armadilha “tem”
Vamos ver mais exemplos.

Temos um objeto range:

Propriedades privadas de uma classe
Mecanismos JavaScript modernos oferecem suporte nativo a propriedades privadas em classes, prefixadas com #. Eles são descritos no artigo Propriedades e métodos privados e protegidos . Sem procurações necessárias.

Essas propriedades têm seus próprios problemas. Em particular, eles não são herdados.

“No alcance” com armadilha “tem”
Vamos ver mais exemplos.

Temos um objeto range:

Gostaríamos de usar o inoperador para verificar se um número está em range.

A hasarmadilha intercepta as inchamadas.

has(target, property)

target– é o objeto de destino, passado como o primeiro argumento para new Proxy,

property- nome da propriedade
Aqui está a demonstração:

*/

let range = {
   start: 1,
   end: 10
};

range = new Proxy(range, {
   has(target, prop) {
      return prop >= target.start && prop <= target.end;
   }
});

alert(5 in range); // true
alert(50 in range); // false

/*

Belo açúcar sintático, não é? E muito simples de implementar.

Funções de envolvimento: "aplicar"
Também podemos envolver um proxy em torno de uma função.

A apply(target, thisArg, args)armadilha lida com a chamada de um proxy como função:

targeté o objeto de destino (a função é um objeto em JavaScript),
thisArgé o valor dethis .
argsé uma lista de argumentos.
Por exemplo, vamos relembrar delay(f, ms)decorador, que fizemos no artigo Decoradores e encaminhamentos, ligue/aplique .

Nesse artigo, fizemos isso sem proxies. Uma chamada para delay(f, ms)retornar uma função que encaminha todas as chamadas para fdepoisms de milissegundos.

Aqui está a implementação anterior baseada em função:

*/

function delay(f, ms) {
   // return a wrapper that passes the call to f after the timeout
   return function () { // (*)
      setTimeout(() => f.apply(this, arguments), ms);
   };
}

function sayHi(user) {
   alert(`Hello, ${user}!`);
}

// after this wrapping, calls to sayHi will be delayed for 3 seconds
sayHi = delay(sayHi, 3000);

sayHi("John"); // Hello, John! (after 3 seconds)

/*

Como já vimos, isso geralmente funciona. A função de wrapper(*) executa a chamada após o tempo limite.

Mas uma função wrapper não encaminha operações de leitura/gravação de propriedade ou qualquer outra coisa. Após o wrapper, perde-se o acesso às propriedades das funções originais, como name, lengthe outras:

*/

function delay(f, ms) {
   return function () {
      setTimeout(() => f.apply(this, arguments), ms);
   };
}

function sayHi(user) {
   alert(`Hello, ${user}!`);
}

alert(sayHi.length); // 1 (function length is the arguments count in its declaration)

sayHi = delay(sayHi, 3000);

alert(sayHi.length); // 0 (in the wrapper declaration, there are zero arguments)

/*

Proxyé muito mais poderoso, pois encaminha tudo para o objeto de destino.

Vamos usar Proxyem vez de uma função de envolvimento:

*/

function delay(f, ms) {
   return new Proxy(f, {
      apply(target, thisArg, args) {
         setTimeout(() => target.apply(thisArg, args), ms);
      }
   });
}

function sayHi(user) {
   alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

alert(sayHi.length); // 1 (*) proxy forwards "get length" operation to the target

sayHi("John"); // Hello, John! (after 3 seconds)

/*

O resultado é o mesmo, mas agora não apenas chamadas, mas todas as operações no proxy são encaminhadas para a função original. So sayHi.lengthé retornado corretamente após a quebra de linha (*).

Temos um invólucro “mais rico”.

Existem outras armadilhas: a lista completa está no início deste artigo. Seu padrão de uso é semelhante ao acima.

refletir
Reflecté um objeto integrado que simplifica a criação de arquivos Proxy.

Foi dito anteriormente que métodos internos, como [[Get]],[[Set]] e outros são apenas especificações, eles não podem ser chamados diretamente.

O Reflectobjeto torna isso um pouco possível. Seus métodos são wrappers mínimos em torno dos métodos internos.

Aqui estão exemplos de operações e Reflectchamadas que fazem o mesmo:

Operação	Reflectligar	Método interno
obj[prop]	Reflect.get(obj, prop)	[[Get]]
obj[prop] = value	Reflect.set(obj, prop, value)	[[Set]]
delete obj[prop]	Reflect.deleteProperty(obj, prop)	[[Delete]]
new F(value)	Reflect.construct(F, value)	[[Construct]]

Por exemplo:

*/

let user6 = {};

Reflect.set(user6, 'name', 'John');

alert(user.name); // John

/*

Em particular, Reflectnos permite chamar operadores ( new, delete…) como funções ( Reflect.construct, Reflect.deleteProperty, …). Essa é uma capacidade interessante, mas aqui outra coisa é importante.

Para cada método interno, interceptável por Proxy, existe um método correspondente em Reflect, com o mesmo nome e argumentos da Proxyarmadilha.

Assim, podemos usar Reflectpara encaminhar uma operação para o objeto original.

Neste exemplo, ambos interceptam gete setencaminham de forma transparente (como se não existissem) operações de leitura/escrita para o objeto, mostrando uma mensagem:

*/

let user7 = {
   name: "John",
};

user7 = new Proxy(user, {
   get(target, prop, receiver) {
      alert(`GET ${prop}`);
      return Reflect.get(target, prop, receiver); // (1)
   },
   set(target, prop, val, receiver) {
      alert(`SET ${prop}=${val}`);
      return Reflect.set(target, prop, val, receiver); // (2)
   }
});

let name = user.name; // shows "GET name"
user.name = "Pete"; // shows "SET name=Pete"

/*

Aqui:

Reflect.getlê uma propriedade de objeto.
Reflect.setgrava uma propriedade de objeto e retorna truese for bem-sucedida, falsecaso contrário.
Ou seja, tudo é simples: se um trap quiser encaminhar a chamada para o objeto, basta chamar Reflect.<method>com os mesmos argumentos.

Na maioria dos casos, podemos fazer o mesmo sem Reflect, por exemplo, a leitura de uma propriedade Reflect.get(target, prop, receiver)pode ser substituída por target[prop]. Existem nuances importantes, no entanto.

Proxy de um getter
Vejamos um exemplo que demonstra porque Reflect.geté melhor. E também veremos por que get/settemos o terceiro argumento receiver, que não usamos antes.

Temos um objeto usercom _namepropriedade e um getter para ele.

Aqui está um proxy em torno dele:

*/

let user8 = {
   _name: "Guest",
   get name() {
      return this._name;
   }
};

let userProxy3 = new Proxy(user8, {
   get(target, prop, receiver) {
      return target[prop];
   }
});

alert(userProxy3.name); // Guest

/*

A getarmadilha é “transparente” aqui, ela retorna a propriedade original e não faz mais nada. Isso é o suficiente para o nosso exemplo.

Tudo parece estar bem. Mas vamos tornar o exemplo um pouco mais complexo.

Após herdar outro objeto adminde user, podemos observar o comportamento incorreto:

*/

let user = {
   _name: "Guest",
   get name() {
      return this._name;
   }
};

let userProxy = new Proxy(user, {
   get(target, prop, receiver) {
      return target[prop]; // (*) target = user
   }
});

let admin = {
   __proto__: userProxy,
   _name: "Admin"
};

// Expected: Admin
alert(admin.name); // outputs: Guest (?!?)

/*

A leitura admin.namedeve voltar "Admin", não "Guest"!

Qual é o problema? Talvez tenhamos feito algo errado com a herança?

Mas se removermos o proxy, tudo funcionará conforme o esperado.

O problema realmente está no proxy, na linha (*).

1. Quando lemos admin.name, como admino objeto não possui tal propriedade própria, a busca vai para o seu protótipo.

2. O protótipo é userProxy.

3. Ao ler namea propriedade do proxy, sua getarmadilha é acionada e a retorna do objeto original como target[prop]na linha (*).

Uma chamada para target[prop], quando propé um getter, executa seu código no contexto this=target. Então o resultado é this._namedo objeto original target, ou seja: from user.

Para corrigir tais situações, precisamos receiverde , o terceiro argumento de gettrap. Ele mantém o correto thispara ser passado para um getter. No nosso caso é admin.

Como passar o contexto para um getter? Para uma função regular poderíamos usar call/apply, mas é um getter, não é “chamado”, apenas acessado.

Reflect.getpode fazer isso. Tudo funcionará bem se o usarmos.

Aqui está a variante corrigida:

*/

let user = {
   _name: "Guest",
   get name() {
      return this._name;
   }
};

let userProxy2 = new Proxy(user, {
   get(target, prop, receiver) { // receiver = admin
      return Reflect.get(target, prop, receiver); // (*)
   }
});


let admin2 = {
   __proto__: userProxy2,
   _name: "Admin"
};

alert(admin2.name); // Admin

/*

Agora receiverque mantém uma referência correta this(ou seja admin), é passada para o getter usando Reflect.getna linha (*).

Podemos reescrever a armadilha ainda mais curta:

get(target, prop, receiver) {
  return Reflect.get(...arguments);
}
Reflectas chamadas são nomeadas exatamente da mesma forma que as armadilhas e aceitam os mesmos argumentos. Eles foram projetados especificamente dessa maneira.

Portanto, return Reflect...fornece um acéfalo seguro para encaminhar a operação e garantir que não esqueçamos nada relacionado a isso.

Limitações de proxy
Os proxies fornecem uma maneira única de alterar ou ajustar o comportamento dos objetos existentes no nível mais baixo. Ainda assim, não é perfeito. Existem limitações.

Objetos embutidos: Slots internos
Muitos objetos embutidos, por exemplo Map, Set, Date, Promisee outros fazem uso dos chamados “slots internos”.

São como propriedades, mas reservadas para fins internos, somente de especificação. Por exemplo, Maparmazena itens no slot interno [[MapData]]. Os métodos integrados os acessam diretamente, não por meio [[Get]]/[[Set]]de métodos internos. Então Proxynão pode interceptar isso.

Por que se importar? Eles são internos de qualquer maneira!

Bem, aqui está o problema. Depois que um objeto integrado como esse é colocado em proxy, o proxy não possui esses slots internos, portanto, os métodos integrados falharão.

Por exemplo:

*/

let map = new Map();

let proxy = new Proxy(map, {});


proxy.set('test', 1); // Error

/*

Internamente, a Maparmazena todos os dados em seu [[MapData]]slot interno. O proxy não tem esse slot. O métodoMap.prototype.set interno method tenta acessar a propriedade interna this.[[MapData]], mas porque this=proxy, não consegue encontrá-la proxye simplesmente falha.

Felizmente, há uma maneira de corrigir isso:

*/

let map2 = new Map();

let proxy2 = new Proxy(map2, {
   get(target, prop, receiver) {
      let value = Reflect.get(...arguments);
      return typeof value == 'function' ? value.bind(target) : value;
   }
});

proxy2set('test', 1);
alert(proxy2.get('test')); // 1 (works!)

/*

Agora funciona bem, porque o gettrap liga as propriedades da função, como map.set, ao próprio objeto de destino ( map).

Ao contrário do exemplo anterior, o valor de thisinside proxy.set(...)não será proxy, mas o original map. Portanto, quando a implementação interna de settenta acessar this.[[MapData]]o slot interno, ela é bem-sucedida.

Agora funciona bem, porque o gettrap liga as propriedades da função, como map.set, ao próprio objeto de destino ( map).

Ao contrário do exemplo anterior, o valor de thisinside proxy.set(...)não será proxy, mas o original map. Portanto, quando a implementação interna de settenta acessar this.[[MapData]]o slot interno, ela é bem-sucedida.

*/

class User {
   #name = "Guest";

   getName() {
      return this.#name;
   }
}

let user = new User();

user = new Proxy(user, {});

alert(user.getName()); // Error

/*

A razão é que os campos privados são implementados usando slots internos. JavaScript não usa [[Get]]/[[Set]]ao acessá-los.

Na chamada getName()o valor de thisé o proxy user, e não tem o slot com campos privados.

Mais uma vez, a solução com a vinculação do método faz funcionar:

*/

class User {
   #name = "Guest";

   getName() {
      return this.#name;
   }
}

let user = new User();

user = new Proxy(user, {
   get(target, prop, receiver) {
      let value = Reflect.get(...arguments);
      return typeof value == 'function' ? value.bind(target) : value;
   }
});

alert(user.getName()); // Guest

/*

Dito isso, a solução tem desvantagens, conforme explicado anteriormente: ela expõe o objeto original ao método, potencialmente permitindo que ele seja passado adiante e quebrando outras funcionalidades de proxy.

Proxy != alvo
O proxy e o objeto original são objetos diferentes. Isso é natural, certo?

Portanto, se usarmos o objeto original como uma chave e, em seguida, fizermos um proxy, o proxy não poderá ser encontrado:

*/

let allUsers = new Set();

class User {
   constructor(name) {
      this.name = name;
      allUsers.add(this);
   }
}

let user = new User("John");

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

alert(allUsers.has(user)); // false

/*

Como podemos ver, após o proxy não conseguimos encontrar userno set allUsers, porque o proxy é um objeto diferente.

Proxies não podem interceptar um teste de igualdade estrito===
Os proxies podem interceptar muitos operadores, como new(with construct), in(with has), delete(with deleteProperty) e assim por diante.

Mas não há como interceptar um teste de igualdade estrito para objetos. Um objeto é estritamente igual a si mesmo e a nenhum outro valor.

Portanto, todas as operações e classes internas que comparam objetos quanto à igualdade diferenciarão entre o objeto e o proxy. Nenhuma substituição transparente aqui.

Proxies revogáveis
Um proxy revogável é um proxy que pode ser desabilitado.

Digamos que temos um recurso e gostaríamos de fechar o acesso a ele a qualquer momento.

O que podemos fazer é envolvê-lo em um proxy revogável, sem armadilhas. Esse proxy encaminhará as operações para o objeto e podemos desativá-lo a qualquer momento.

A sintaxe é:

let {proxy, revoke} = Proxy.revocable(target, handler)
A chamada retorna um objeto com a função proxye revokepara desativá-lo.

Aqui está um exemplo:

*/

let object = {
   data: "Valuable data"
};

let { proxy, revoke } = Proxy.revocable(object, {});

// pass the proxy somewhere instead of object...
alert(proxy.data); // Valuable data

// later in our code
revoke();

// the proxy isn't working any more (revoked)
alert(proxy.data); // Error

/*

Uma chamada para revoke()remove todas as referências internas ao objeto de destino do proxy, portanto, elas não estão mais conectadas.

Inicialmente, revokeé separado de proxy, para que possamos passar proxyenquanto saímos revokedo escopo atual.

Também podemos vincular revokeo método ao proxy definindo proxy.revoke = revoke.

Outra opção é criar um WeakMapque tenha proxycomo chave e o correspondente revokecomo valor, que permite achar facilmente revokepor um proxy:

*/

let revokes = new WeakMap();

let object2 = {
  data: "Valuable data"
};

let {proxy, revoke2} = Proxy.revocable(object2, {});

revokes.set(proxy, revoke2);

// ..somewhere else in our code..
revoke2 = revokes.get(proxy);
revoke();

alert(proxy.data); // Error (revoked)

/*

Usamos WeakMapem vez de Mapaqui porque não bloqueará a coleta de lixo. Se um objeto proxy se tornar “inalcançável” (por exemplo, nenhuma variável o referencia mais), WeakMappermite que ele seja apagado da memória junto com os revokeque não serão mais necessários.

Referências
Especificação: Proxy .
MDN: Proxy .
Resumo
Proxyé um wrapper em torno de um objeto, que encaminha operações sobre ele para o objeto, opcionalmente capturando algumas delas.

Ele pode agrupar qualquer tipo de objeto, incluindo classes e funções.

A sintaxe é:

let proxy = new Proxy(target, {
  /* traps */ /*
});

…Devemos usar proxytodos os lugares em vez de target. Um proxy não tem suas próprias propriedades ou métodos. Ele intercepta uma operação se a interceptação for fornecida, caso contrário, a encaminha para o targetobjeto.

Podemos prender:

Lendo ( get), escrevendo ( set), deletando ( deleteProperty) uma propriedade (mesmo inexistente).
Chamando uma função ( applytrap).
O newoperador ( constructarmadilha).
Muitas outras operações (a lista completa está no início do artigo e na documentação ).

Isso nos permite criar propriedades e métodos “virtuais”, implementar valores padrão, objetos observáveis, decoradores de função e muito mais.

Também podemos envolver um objeto várias vezes em diferentes proxies, decorando-o com vários aspectos de funcionalidade.

A API do Reflect foi projetada para complementar o Proxy . Para qualquer Proxyarmadilha, há uma Reflectchamada com os mesmos argumentos. Devemos usá-los para encaminhar chamadas para objetos de destino.

Os proxies têm algumas limitações:

Objetos integrados possuem “slots internos” e o acesso a eles não pode ser feito por proxy. Veja a solução alternativa acima.
O mesmo vale para campos de classe privada, pois eles são implementados internamente usando slots. Portanto, as chamadas de método proxy devem ter o objeto de destino thispara acessá-las.
Os testes de igualdade de objeto ===não podem ser interceptados.
Desempenho: os benchmarks dependem de um mecanismo, mas geralmente o acesso a uma propriedade usando um proxy mais simples leva algumas vezes mais tempo. Na prática, isso só importa para alguns objetos “gargalo”.

*/

