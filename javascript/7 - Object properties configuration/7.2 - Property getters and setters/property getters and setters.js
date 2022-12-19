/*

Getters e setters de propriedade

Existem dois tipos de propriedades de objeto.

O primeiro tipo são as propriedades de dados . Já sabemos como trabalhar com eles. Todas as propriedades que usamos até agora eram propriedades de dados.

O segundo tipo de propriedade é algo novo. É uma propriedade do acessador . Eles são essencialmente funções que executam ao obter e definir um valor, mas parecem propriedades regulares para um código externo.

Getters e setters
As propriedades do acessador são representadas pelos métodos “getter” e “setter”. Em um literal de objeto, eles são denotados por gete set:

let obj = {
  get propName() {
    // getter, the code executed on getting obj.propName
  },

  set propName(value) {
    // setter, the code executed on setting obj.propName = value
  }
};

O getter funciona quando obj.propNameé lido, o setter – quando é atribuído.

Por exemplo, temos um userobjeto com namee surname:

let user = {
  name: "John",
  surname: "Smith"
};

Agora queremos adicionar uma fullNamepropriedade, que deve ser "John Smith". Obviamente, não queremos copiar e colar as informações existentes, portanto, podemos implementá-las como um acessador:

*/

let user = {
   name: "John",
   surname: "Smith",


   get fullName() {
      return `${this.name} ${this.surname}`;
   }
};

alert(user.fullName); // John Smith

/*

Do lado de fora, uma propriedade do acessador se parece com uma regular. Essa é a ideia das propriedades do acessador. Não chamamos user.fullName como função, lemos normalmente: o getter roda nos bastidores.

A partir de agora, fullNametem apenas um getter. Se tentarmos atribuir user.fullName=, haverá um erro:

*/

let user3 = {
   get fullName() {
      return `...`;
   }
};

user3.fullName = "Test";  // Error (property has only a getter)

// Vamos corrigi-lo adicionando um setter para user.fullName:

let user4 = {
   name: "John",
   surname: "Smith",

   get fullName() {
      return `${this.name} ${this.surname}`;
   },

   set fullName(value) {
      [this.name, this.surname] = value.split(" ");
   }
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper

/*

Como resultado, temos uma propriedade “virtual” fullName. É legível e gravável.

Descritores de acesso
Descritores para propriedades de acesso são diferentes daqueles para propriedades de dados.

Para propriedades do acessador, não há valueou writable, mas, em vez disso, há funções gete set.

Ou seja, um descritor de acesso pode ter:

get– uma função sem argumentos, que funciona quando uma propriedade é lida,
set– uma função com um argumento, que é chamada quando a propriedade é definida,
enumerable– o mesmo que para propriedades de dados,
configurable– o mesmo que para propriedades de dados.

Por exemplo, para criar um acessador fullNamecom defineProperty, podemos passar um descritor com gete set:

*/

let user5 = {
   name: "John",
   surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
   get() {
      return `${this.name} ${this.surname}`;
   },

   set(value) {
      [this.name, this.surname] = value.split(" ");
   }
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname

/*

Observe que uma propriedade pode ser um acessador (tem get/setmétodos) ou uma propriedade de dados (tem um value), não ambos.

Se tentarmos fornecer ambos gete valueno mesmo descritor, ocorrerá um erro:

*/

// Error: Invalid property descriptor.
Object.defineProperty({}, 'prop', {
   get() {
      return 1
   },

   value: 2
});

/*

Getters/setters mais inteligentes
Getters/setters podem ser usados ​​como wrappers sobre valores de propriedade “reais” para obter mais controle sobre as operações com eles.

Por exemplo, se quisermos proibir nomes muito curtos para user, podemos ter um setter namee manter o valor em uma propriedade separada _name:

*/

let user6 = {
   get name() {
      return this._name;
   },

   set name(value) {
      if (value.length < 4) {
         alert("Name is too short, need at least 4 characters");
         return;
      }
      this._name = value;
   }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Name is too short...

/*

Assim, o nome fica armazenado na _namepropriedade, e o acesso é feito via getter e setter.

Tecnicamente, o código externo pode acessar o nome diretamente usando user._name. Mas há uma convenção amplamente conhecida de que as propriedades que começam com um sublinhado "_"são internas e não devem ser tocadas de fora do objeto.

Usando para compatibilidade
Um dos grandes usos dos acessadores é que eles permitem assumir o controle de uma propriedade de dados “regular” a qualquer momento, substituindo-a por um getter e um setter e ajustando seu comportamento.

Imagine que começamos a implementar objetos de usuário usando propriedades de dados namee age:

function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25

…Mas mais cedo ou mais tarde, as coisas podem mudar. Em vez de agepodemos decidir armazenar birthday, porque é mais preciso e conveniente:

function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));

Agora o que fazer com o código antigo que ainda usa agepropriedade?

Podemos tentar encontrar todos esses lugares e corrigi-los, mas isso leva tempo e pode ser difícil de fazer se esse código for usado por muitas outras pessoas. E além disso, ageé uma coisa legal de se ter user, né?

Vamos mantê-lo.

Adicionar um getter para ageresolve o problema:

*/

function User(name, birthday) {
   this.name = name;
   this.birthday = birthday;

   // age is calculated from the current date and birthday
   Object.defineProperty(this, "age", {
      get() {
         let todayYear = new Date().getFullYear();
         return todayYear - this.birthday.getFullYear();
      }
   });
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday is available
alert( john.age );      // ...as well as the age

// Agora o código antigo também funciona e temos uma boa propriedade adicional.

