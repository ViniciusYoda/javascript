/*

Métodos de protótipo, objetos sem __proto__
No primeiro capítulo desta seção, mencionamos que existem métodos modernos para configurar um protótipo.

Definir ou ler o protótipo com obj.__proto__é considerado desatualizado e um tanto obsoleto (movido para o chamado “Anexo B” do padrão JavaScript, destinado apenas a navegadores).

Os métodos modernos para obter/configurar um protótipo são:

Object.getPrototypeOf(obj) – retorna o [[Prototype]]de obj.
Object.setPrototypeOf(obj, proto) – define o [[Prototype]]of objcomo proto.
O único uso de __proto__, que não é desaprovado, é como uma propriedade ao criar um novo objeto: { __proto__: ... }.

Embora haja um método especial para isso também:

Object.create(proto, [descriptors]) – cria um objeto vazio com descritores de propriedade fornecidos protoe [[Prototype]]opcionais.
Por exemplo:

*/

let animal = {
   eats: true
};

// create a new object with animal as a prototype
let rabbit = Object.create(animal); // same as {__proto__: animal}

alert(rabbit.eats); // true

alert(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}

/*

O Object.createmétodo é um pouco mais poderoso, pois possui um segundo argumento opcional: descritores de propriedade.

Podemos fornecer propriedades adicionais para o novo objeto, assim:

*/

let animal2 = {
   eats: true
};

let rabbit2 = Object.create(animal2, {
   jumps: {
      value: true
   }
});

alert(rabbit.jumps); // true

/*

Os descritores estão no mesmo formato descrito no capítulo Flags e descritores de propriedade .

Podemos usar Object.createpara executar uma clonagem de objeto mais poderosa do que copiar propriedades em for..in:

let clone = Object.create(
  Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
Essa chamada faz uma cópia verdadeiramente exata de obj, incluindo todas as propriedades: enumeráveis ​​e não enumeráveis, propriedades de dados e setters/getters – tudo e com o [[Prototype]].

Breve história
Existem tantas maneiras de gerenciar arquivos [[Prototype]]. Como isso aconteceu? Porque?

Isso por razões históricas.

A herança prototípica estava na linguagem desde o seu surgimento, mas as formas de gerenciá-la evoluíram com o tempo.

A prototypepropriedade de uma função construtora funcionou desde tempos muito antigos. É a forma mais antiga de criar objetos com um determinado protótipo.
Mais tarde, no ano de 2012, Object.createapareceu no padrão. Ele deu a capacidade de criar objetos com um determinado protótipo, mas não forneceu a capacidade de obtê-lo/defini-lo. Alguns navegadores implementaram o __proto__acessor não padrão que permitia ao usuário obter/definir um protótipo a qualquer momento, para dar mais flexibilidade aos desenvolvedores.
Mais tarde, no ano de 2015, Object.setPrototypeOfe Object.getPrototypeOfforam adicionados ao padrão, para executar a mesma funcionalidade do __proto__. Como __proto__foi implementado de fato em todos os lugares, foi meio obsoleto e chegou ao Anexo B do padrão, ou seja: opcional para ambientes sem navegador.
Mais tarde, no ano de 2022, foi oficialmente permitido o uso __proto__em literais de objeto {...}(removido do Anexo B), mas não como getter/setter obj.__proto__(ainda no Anexo B).
Por que foi __proto__substituído pelas funções getPrototypeOf/setPrototypeOf?

Por que foi __proto__parcialmente reabilitado e seu uso permitido em {...}, mas não como getter/setter?

Essa é uma pergunta interessante, exigindo que entendamos por que __proto__é ruim.

E logo teremos a resposta.

Não mude [[Prototype]]em objetos existentes se a velocidade for importante
Tecnicamente, podemos obter/configurar [[Prototype]]a qualquer momento. Mas geralmente nós apenas definimos uma vez no momento da criação do objeto e não o modificamos mais: rabbitherda de animal, e isso não vai mudar.

E os mecanismos JavaScript são altamente otimizados para isso. A alteração de um protótipo “on-the-fly” com Object.setPrototypeOfou obj.__proto__=é uma operação muito lenta, pois interrompe as otimizações internas para as operações de acesso à propriedade do objeto. Portanto, evite-o, a menos que você saiba o que está fazendo, ou a velocidade do JavaScript não importa totalmente para você.

Objetos "muito simples"
Como sabemos, os objetos podem ser usados ​​como matrizes associativas para armazenar pares chave/valor.

…Mas se tentarmos armazenar as chaves fornecidas pelo usuário (por exemplo, um dicionário inserido pelo usuário), podemos ver uma falha interessante: todas as chaves funcionam bem, exceto "__proto__".

Confira o exemplo:

*/

let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object], not "some value"!

/*

Aqui, se o usuário digitar __proto__, a atribuição na linha 4 será ignorada!

Isso certamente pode ser surpreendente para um não desenvolvedor, mas bastante compreensível para nós. A __proto__propriedade é especial: deve ser um objeto ou null. Uma string não pode se tornar um protótipo. É por isso que uma atribuição a uma string __proto__é ignorada.

Mas não pretendíamos implementar tal comportamento, certo? Queremos armazenar pares de chave/valor e a chave nomeada "__proto__"não foi salva corretamente. Então isso é um bug!

Aqui as consequências não são terríveis. Mas, em outros casos, podemos estar armazenando objetos em vez de strings em obj, e então o protótipo será realmente alterado. Como resultado, a execução dará errado de maneiras totalmente inesperadas.

O que é pior - geralmente os desenvolvedores não pensam nessa possibilidade. Isso torna esses bugs difíceis de perceber e até mesmo transformá-los em vulnerabilidades, especialmente quando o JavaScript é usado no lado do servidor.

Coisas inesperadas também podem acontecer ao atribuir a obj.toString, pois é um método de objeto integrado.

Como podemos evitar esse problema?

Primeiro, podemos apenas mudar para usar Mappara armazenamento em vez de objetos simples, então está tudo bem:

*/

let map = new Map();

let key2 = prompt("What's the key?", "__proto__");
map.set(key2, "some value");

alert(map.get(key2)); // "some value" (as intended)

/*

…Mas Objecta sintaxe costuma ser mais atraente, pois é mais concisa.

Felizmente, podemos usar objetos, porque os criadores da linguagem pensaram nesse problema há muito tempo.

Como sabemos, __proto__não é uma propriedade de um objeto, mas uma propriedade acessadora de Object.prototype:

Portanto, se obj.__proto__for lido ou definido, o getter/setter correspondente é chamado a partir de seu protótipo e obtém/configura [[Prototype]].

Como foi dito no início desta seção do tutorial: __proto__é uma forma de acessar [[Prototype]], não é ele [[Prototype]]mesmo.

Agora, se pretendemos usar um objeto como array associativo e ficar livre desses problemas, podemos fazer isso com um pequeno truque:

*/

let obj = Object.create(null);
// or: obj = { __proto__: null }

let key3 = prompt("What's the key?", "__proto__");
obj[key3] = "some value";

alert(obj[key3]); // "some value"

/*

Object.create(null)cria um objeto vazio sem um protótipo ( [[Prototype]]is null):


Portanto, não há getter/setter herdado para __proto__. Agora ele é processado como uma propriedade de dados regular, então o exemplo acima funciona corretamente.

Podemos chamar esses objetos de objetos “muito simples” ou “dicionários puros”, porque eles são ainda mais simples do que o objeto simples regular {...}.

Uma desvantagem é que tais objetos não possuem métodos de objeto integrados, por exemplo toString:

*/

let obj = Object.create(null);

alert(obj); // Error (no toString)

/*

…Mas isso geralmente é bom para arrays associativos.

Observe que a maioria dos métodos relacionados a objetos são Object.something(...), tipo Object.keys(obj)– eles não estão no protótipo, então eles continuarão trabalhando em tais objetos:

*/

let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

alert(Object.keys(chineseDictionary)); // hello,bye

/*

Resumo
Para criar um objeto com o protótipo fornecido, use:

sintaxe literal: { __proto__: ... }, permite especificar várias propriedades
ou Object.create(proto, [descriptors]) , permite especificar descritores de propriedades.
O Object.createfornece uma maneira fácil de copiar superficialmente um objeto com todos os descritores:

let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
Métodos modernos para obter/configurar o protótipo são:

Object.getPrototypeOf(obj) – retorna o [[Prototype]]of obj(o mesmo que __proto__getter).
Object.setPrototypeOf(obj, proto) – define [[Prototype]]of objcomo proto(o mesmo que __proto__setter).
Obter/configurar o protótipo usando o __proto__getter/setter embutido não é recomendado, agora está no Anexo B da especificação.

Também cobrimos objetos sem protótipos, criados com Object.create(null)ou {__proto__: null}.

Esses objetos são usados ​​como dicionários, para armazenar quaisquer chaves (possivelmente geradas pelo usuário).

Normalmente, os objetos herdam métodos internos e __proto__getter/setter de Object.prototype, tornando as chaves correspondentes “ocupadas” e potencialmente causando efeitos colaterais. Com nullo protótipo, os objetos são verdadeiramente vazios.

*/

