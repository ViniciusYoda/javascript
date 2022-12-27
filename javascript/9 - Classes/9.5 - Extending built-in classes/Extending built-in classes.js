/*

Estendendo classes internas
Classes internas como Array, Map e outras também são extensíveis.

Por exemplo, here PowerArrayherda do nativo Array:

*/

// add one more method  to it (can do more)
class PowerArray extends Array {
   isEmpty() {
      return this.length === 0;
   }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false

/*

Observe uma coisa muito interessante. Métodos integrados como filtere mapoutros – retornam novos objetos exatamente do tipo herdado PowerArray. Sua implementação interna usa a propriedade do objeto constructorpara isso.

No exemplo acima,

arr.constructor === PowerArray
Quando arr.filter()é chamado, ele cria internamente a nova matriz de resultados usando exatamente arr.constructor, não basic Array. Isso é realmente muito legal, porque podemos continuar usando PowerArraymétodos mais adiante no resultado.

Ainda mais, podemos personalizar esse comportamento.

Podemos adicionar um getter estático especial Symbol.speciesà classe. Se existir, deve retornar o construtor que o JavaScript usará internamente para criar novas entidades em map, filtere assim por diante.

Se quisermos métodos integrados como mapou filterpara retornar arrays regulares, podemos retornar Arrayin Symbol.species, como aqui:

*/

class PowerArray extends Array {
   isEmpty() {
      return this.length === 0;
   }

   // built-in methods will use this as the constructor
   static get [Symbol.species]() {
      return Array;
   }
}

let arr2 =  new PowerArray(1, 2, 5, 10, 50);
alert(arr2.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr2 = arr2.filter(item => item >= 10);

// filteredArr is not PowerArray, but Array
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function

/*

Como você pode ver, agora .filterretorna Array. Portanto, a funcionalidade estendida não é mais passada.

Outras coleções funcionam de forma semelhante
Outras coleções, como Mape Set, funcionam da mesma forma. Eles também usam Symbol.species.

Nenhuma herança estática em built-ins
Objetos embutidos têm seus próprios métodos estáticos, por exemplo Object.keys, Array.isArrayetc.

Como já sabemos, as classes nativas se estendem. Por exemplo, Arrayestende Object.

Normalmente, quando uma classe estende outra, ambos os métodos estáticos e não estáticos são herdados. Isso foi explicado minuciosamente no artigo Propriedades e métodos estáticos .

Mas as classes internas são uma exceção. Eles não herdam a estática um do outro.

Por exemplo, ambos Arraye Dateherdam de Object, então suas instâncias têm métodos de Object.prototype. Mas Array.[[Prototype]]não faz referência Objecta , então não há, por exemplo, Array.keys()(ou Date.keys()) método estático.

Aqui está a estrutura da imagem para Datee Object:

Como você pode ver, não há ligação entre Datee Object. Eles são independentes, só Date.prototypeherda de Object.prototype.

Essa é uma diferença importante de herança entre objetos internos em comparação com o que obtemos com extends.

*/

