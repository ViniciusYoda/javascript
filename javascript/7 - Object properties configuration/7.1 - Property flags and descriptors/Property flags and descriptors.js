/*

Sinalizadores e descritores de propriedade
Como sabemos, objetos podem armazenar propriedades.

Até agora, uma propriedade era um simples par “chave-valor” para nós. Mas uma propriedade de objeto é, na verdade, uma coisa mais flexível e poderosa.

Neste capítulo, estudaremos opções de configuração adicionais e, no próximo, veremos como transformá-las invisivelmente em funções getter/setter.

Sinalizadores de propriedade

As propriedades do objeto, além de um value, possuem três atributos especiais (os chamados “flags”):

writable– se true, o valor pode ser alterado, caso contrário, é somente leitura.
enumerable– se true, então listado em loops, caso contrário não listado.
configurable– se true, a propriedade pode ser excluída e esses atributos podem ser modificados, caso contrário não.
Ainda não os vimos, porque geralmente não aparecem. Quando criamos um imóvel “da forma usual”, todos eles são true. Mas também podemos alterá-los a qualquer momento.

Primeiro, vamos ver como obter essas bandeiras.

O método Object.getOwnPropertyDescriptor permite consultar a informação completa sobre uma propriedade.

A sintaxe é:

let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);

obj
O objeto do qual obter informações.
propertyName
O nome da propriedade.
O valor retornado é o chamado objeto “descritor de propriedade”: ele contém o valor e todos os sinalizadores.

Por exemplo:

*/

let user = {
   name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert(JSON.stringify(descriptor, null, 2));
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

/*

Para alterar os sinalizadores, podemos usar Object.defineProperty .

A sintaxe é:

Object.defineProperty(obj, propertyName, descriptor)
obj, propertyName
O objeto e sua propriedade para aplicar o descritor.
descriptor
Objeto descritor de propriedade a ser aplicado.
Se a propriedade existir, definePropertyatualiza seus sinalizadores. Caso contrário, ele cria a propriedade com o valor e os sinalizadores fornecidos; nesse caso, se um sinalizador não for fornecido, será assumido false.

Por exemplo, aqui uma propriedade nameé criada com todos os sinalizadores falsos:

*/

let user2 = {};

Object.defineProperty(user, "name", {
   value: "John"
});

let descriptor2 = Object.getOwnPropertyDescriptor(user2, 'name');

alert(JSON.stringify(descriptor2, null, 2));
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */

/*

Compare com “criado normalmente” user.nameacima: agora todos os sinalizadores são falsos. Se não é isso que queremos, é melhor defini-los trueem descriptor.

Agora vamos ver os efeitos dos sinalizadores por exemplo.

Não gravável
Vamos tornar user.namenão gravável (não pode ser reatribuído) alterando o writablesinalizador:

*/

let user3 = {
   name: "John"
};

Object.defineProperty(user3, "name", {
   writable: false
});

user3.name = "Pete"; // Error: Cannot assign to read only property 'name'

/*

Agora ninguém pode mudar o nome do nosso usuário, a menos que aplique o seu próprio definePropertypara substituir o nosso.

Os erros aparecem apenas no modo estrito
No modo não restrito, nenhum erro ocorre ao gravar em propriedades não graváveis ​​e outras. Mas a operação ainda não terá sucesso. As ações que violam a sinalização são silenciosamente ignoradas no não estrito.

Aqui está o mesmo exemplo, mas a propriedade é criada do zero:

*/

let user4 = {};

Object.defineProperty(user4, "name", {
   value: "John",
   // for new properties we need to explicitly list what's true
   enumerable: true,
   configurable: true
});

alert(user4.name); // John
user4.name = "Pete"; // Error

/*

Não enumerável
Agora vamos adicionar um custom toStringao user.

Normalmente, um built-in toStringpara objetos não é enumerável, não aparece em for..in. Mas se adicionarmos um toStringpróprio, então, por padrão, ele aparecerá em for..in, assim:

*/

let user5 = {
   name: "John",
   toString() {
      return this.name;
   }
};

// By default, both our properties are listed:
for (let key in user) alert(key); // name, toString

// Se não gostarmos, podemos definir enumerable:false. Então ele não aparecerá em um for..inloop, assim como o embutido:

let user6 = {
   name: "John",
   toString() {
      return this.name;
   }
};

Object.defineProperty(user, "toString", {
   enumerable: false
});

// Now our toString disappears:
for (let key in user) alert(key); // name

/*

Propriedades não enumeráveis ​​também são excluídas de Object.keys:

alert(Object.keys(user)); // name
Não configurável
O sinalizador não configurável ( configurable:false) às vezes é predefinido para objetos e propriedades integrados.

Uma propriedade não configurável não pode ser excluída, seus atributos não podem ser modificados.

Por exemplo, Math.PIé não gravável, não enumerável e não configurável:

*/

let descriptor3 = Object.getOwnPropertyDescriptor(Math, 'PI');

alert(JSON.stringify(descriptor3, null, 2));
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/

// Portanto, um programador não pode alterar o valor Math.PIou sobrescrevê-lo.

Math.PI = 3; // Error, because it has writable: false

// delete Math.PI won't work either

// Também não podemos mudar Math.PIpara ser writablenovamente:

// Error, because of configurable: false
Object.defineProperty(Math, "PI", { writable: true });

/*

Não há absolutamente nada que possamos fazer com Math.PI.

Tornar uma propriedade não configurável é uma via de mão única. Não podemos mudá-lo de volta com defineProperty.

Observação: configurable: falseimpede alterações de sinalizadores de propriedade e sua exclusão, enquanto permite alterar seu valor.

Aqui user.namenão é configurável, mas ainda podemos alterá-lo (já que é gravável):

*/

let user7 = {
   name: "John"
};

Object.defineProperty(user7, "name", {
   configurable: false
});

user7.name = "Pete"; // works fine
delete user7.name; // Error

// E aqui fazemos user.nameuma constante “para sempre selada”, assim como o built-in Math.PI:

let user8 = {
   name: "John"
};

Object.defineProperty(user8, "name", {
   writable: false,
   configurable: false
});

// won't be able to change user.name or its flags
// all this won't work:
user8.name = "Pete";
delete user8.name;
Object.defineProperty(user, "name", { value: "Pete" });

/*

A única alteração de atributo possível: gravável true → false
Há uma pequena exceção sobre a mudança de sinalizadores.

Podemos alterar writable: truepara falseuma propriedade não configurável, evitando assim a modificação do seu valor (para adicionar outra camada de proteção). Não o contrário embora.

Object.defineProperties
Existe um método Object.defineProperties(obj, descriptors) que permite definir várias propriedades de uma só vez.

A sintaxe é:

Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
Por exemplo:

Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
Assim, podemos definir muitas propriedades de uma só vez.

Object.getOwnPropertyDescriptors
Para obter todos os descritores de propriedades de uma só vez, podemos usar o método Object.getOwnPropertyDescriptors(obj) .

Junto com Object.definePropertiesele pode ser usado como uma forma de clonagem de um objeto “sinalizador”:

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

Normalmente, quando clonamos um objeto, usamos uma atribuição para copiar propriedades, assim:

for (let key in user) {
  clone[key] = user[key]
}
…Mas isso não copia bandeiras. Então, se queremos um clone “melhor”, então Object.definePropertiesé o preferido.

Outra diferença é que for..inignora propriedades simbólicas e não enumeráveis, mas Object.getOwnPropertyDescriptorsretorna todos os descritores de propriedade, incluindo os simbólicos e não enumeráveis.

Selando um objeto globalmente
Os descritores de propriedade funcionam no nível de propriedades individuais.

Existem também métodos que limitam o acesso a todo o objeto:

Object.preventExtensions(obj)
Proíbe a adição de novas propriedades ao objeto.
Object.seal(obj)
Proíbe a adição/remoção de propriedades. Conjuntos configurable: falsepara todas as propriedades existentes.
Object.freeze(obj)
Proíbe a adição/remoção/alteração de propriedades. Conjuntos configurable: false, writable: falsepara todas as propriedades existentes.
E também existem testes para eles:

Object.isExtensible(obj)
Retorna falsese a adição de propriedades for proibida, caso contrário, true.
Object.isSealed(obj)
Retorna truese adicionar/remover propriedades for proibido e todas as propriedades existentes tiverem configurable: false.
Object.isFrozen(obj)
Retorna truese adicionar/remover/alterar propriedades for proibido e todas as propriedades atuais forem configurable: false, writable: false.
Esses métodos raramente são usados ​​na prática.

*/