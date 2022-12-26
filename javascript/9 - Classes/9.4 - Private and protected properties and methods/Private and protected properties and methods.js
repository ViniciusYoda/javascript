/*

Propriedades e métodos privados e protegidos
Um dos princípios mais importantes da programação orientada a objetos – delimitando a interface interna da externa.

Essa é uma prática “obrigatória” no desenvolvimento de algo mais complexo do que um aplicativo “hello world”.

Para entender isso, vamos nos afastar do desenvolvimento e voltar nossos olhos para o mundo real.

Normalmente, os dispositivos que usamos são bastante complexos. Mas delimitar a interface interna da externa permite utilizá-los sem problemas.

Um exemplo da vida real
Por exemplo, uma máquina de café. Simples do lado de fora: um botão, um display, alguns furos… E, com certeza, o resultado – ótimo café! :)


Mas por dentro… (uma foto do manual de reparo)


Muitos detalhes. Mas podemos usá-lo sem saber nada.

As máquinas de café são bastante confiáveis, não são? Podemos usar um por anos e somente se algo der errado - leve-o para reparos.

O segredo da fiabilidade e simplicidade de uma máquina de café – todos os detalhes estão bem afinados e escondidos no seu interior.

Se retirarmos a capa protetora da cafeteira, seu uso será muito mais complexo (onde apertar?), e perigoso (pode eletrocutar).

Como veremos, na programação os objetos são como máquinas de café.

Mas, para ocultar os detalhes internos, não usaremos uma capa protetora, mas sim uma sintaxe especial da linguagem e convenções.

Interface interna e externa
Na programação orientada a objetos, propriedades e métodos são divididos em dois grupos:

Interface interna – métodos e propriedades, acessíveis de outros métodos da classe, mas não de fora.
Interface externa – métodos e propriedades, acessíveis também de fora da classe.
Se continuarmos a analogia com a máquina de café – o que está escondido dentro: um tubo de caldeira, elemento de aquecimento e assim por diante – é sua interface interna.

Uma interface interna é usada para o objeto funcionar, seus detalhes usam uns aos outros. Por exemplo, um tubo de caldeira é conectado ao elemento de aquecimento.

Mas do lado de fora uma máquina de café é fechada pela tampa protetora, para que ninguém possa alcançá-la. Os detalhes estão ocultos e inacessíveis. Podemos usar seus recursos por meio da interface externa.

Então, tudo o que precisamos para usar um objeto é conhecer sua interface externa. Podemos não saber como funciona por dentro, e isso é ótimo.

Essa foi uma introdução geral.

Em JavaScript, existem dois tipos de campos de objeto (propriedades e métodos):

Público: acessível de qualquer lugar. Eles compõem a interface externa. Até agora, estávamos usando apenas propriedades e métodos públicos.
Private: acessível apenas de dentro da classe. Estes são para a interface interna.
Em muitas outras linguagens também existem campos “protegidos”: acessíveis apenas de dentro da classe e aqueles que a estendem (como private, mas mais acesso de classes herdadas). Eles também são úteis para a interface interna. Eles são, em certo sentido, mais difundidos do que os privados, porque geralmente queremos classes herdadas para obter acesso a eles.

Os campos protegidos não são implementados em JavaScript no nível da linguagem, mas na prática são muito convenientes, por isso são emulados.

Agora faremos uma máquina de café em JavaScript com todos esses tipos de propriedades. Uma máquina de café tem muitos detalhes, não vamos modelá-los para ficarem simples (embora pudéssemos).

Protegendo “waterAmount”
Vamos fazer uma aula simples de máquina de café primeiro:

*/

class CoffeeMachine {
   waterAmount = 0; // the amount of water inside

   constructor(power) {
      this.power = power;
      alert( `Created a coffee-machine, power: ${power}` );
   }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = 200;

/*

Agora as propriedades waterAmounte powersão públicas. Podemos obtê-los/defini-los facilmente de fora para qualquer valor.

Vamos alterar waterAmounta propriedade para protegida para ter mais controle sobre ela. Por exemplo, não queremos que ninguém o coloque abaixo de zero.

As propriedades protegidas geralmente são prefixadas com um sublinhado _.

Isso não é aplicado no nível da linguagem, mas há uma convenção bem conhecida entre os programadores de que essas propriedades e métodos não devem ser acessados ​​de fora.

Então nossa propriedade será chamada _waterAmount:

*/

class CoffeMachine {
   _waterAmount = 0;

   set waterAmount(value) {
      if (value < 0) {
         value = 0;
      }
      this._waterAmount = value;
   }

   get waterAmount() {
      return this._waterAmount;
   }

   constructor(power) {
      this._power = power;
   }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10

/*

Agora o acesso está sob controle, portanto, definir a quantidade de água abaixo de zero torna-se impossível.

“Poder” somente leitura
Para powera propriedade, vamos torná-la somente leitura. Às vezes acontece que uma propriedade deve ser definida apenas no momento da criação e nunca modificada.

É exatamente o caso de uma máquina de café: a potência nunca muda.

Para fazer isso, precisamos apenas fazer o getter, mas não o setter:

*/

class CoffeeMachine {
   // ...

   constructor(power) {
      this._power = power;
   }

   get power() {
      return this._power;
   }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

coffeeMachine.power = 25; // Error (no setter)

/*

Funções getter/setter
Aqui usamos a sintaxe getter/setter.

Mas na maioria das vezes as get.../set...funções são preferidas, como esta:

class CoffeeMachine {
  _waterAmount = 0;

  setWaterAmount(value) {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  getWaterAmount() {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
Isso parece um pouco mais longo, mas as funções são mais flexíveis. Eles podem aceitar vários argumentos (mesmo que não precisemos deles agora).

Por outro lado, a sintaxe get/set é mais curta, então, em última análise, não há regra estrita, cabe a você decidir.

Os campos protegidos são herdados
Se herdarmos class MegaMachine extends CoffeeMachine, nada nos impedirá de acessar this._waterAmountou this._powerdos métodos da nova classe.

Portanto, os campos protegidos são naturalmente herdáveis. Ao contrário dos privados que veremos a seguir.

Privado “#waterLimit”
Uma adição recente
Esta é uma adição recente à linguagem. Sem suporte em mecanismos JavaScript, ou com suporte parcial ainda, requer polyfilling .
Há uma proposta de JavaScript finalizada, quase no padrão, que fornece suporte em nível de linguagem para propriedades e métodos privados.

Privados devem começar com #. Eles só são acessíveis de dentro da classe.

Por exemplo, aqui está uma #waterLimitpropriedade privada e o método privado de verificação de água #fixWaterAmount:

*/

class CoffeeMachine {
   #waterLimit = 200;

   #fixWaterAmount(value) {
      if (value < 0) return 0
      if (value > this.#waterLimit) return this.#waterLimit;
   }

   setWaterAmount(value) {
      this.#waterLimit = this.#fixWaterAmount(value);
   }

}

let coffeeMachine = new CoffeeMachine();

// can't access privates from outside of the class
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error

/*

No nível do idioma, #é um sinal especial de que o campo é privado. Não podemos acessá-lo de fora ou de classes herdadas.

Os campos privados não entram em conflito com os públicos. Podemos ter campos privados #waterAmounte públicos waterAmountao mesmo tempo.

Por exemplo, vamos criar waterAmountum acessador para #waterAmount:

*/

class CoffeeMachine {

   #waterAmount = 0;

   get waterAmount() {
      return this.#waterAmount;
   }

   set waterAmount(value) {
      if (value < 0) value = 0;
      this.#waterAmount = value;
   }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error

/*

Ao contrário dos protegidos, os campos privados são impostos pela própria linguagem. Isso é uma coisa boa.

Mas se herdarmos de CoffeeMachine, não teremos acesso direto a #waterAmount. Precisamos confiar em waterAmountgetter/setter:

class MegaCoffeeMachine extends CoffeeMachine {
  method() {
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
  }
}
Em muitos cenários, essa limitação é muito severa. Se estendermos um CoffeeMachine, podemos ter motivos legítimos para acessar seus componentes internos. É por isso que os campos protegidos são usados ​​com mais frequência, mesmo que não sejam suportados pela sintaxe da linguagem.

Campos privados não estão disponíveis como este[nome]
Os campos privados são especiais.

Como sabemos, geralmente podemos acessar os campos usando this[name]:

class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${this[fieldName]}`);
  }
}
Com campos privados isso é impossível: this['#name']não funciona. Essa é uma limitação de sintaxe para garantir a privacidade.

Resumo
Em termos de OOP, a delimitação da interface interna da externa é chamada de encapsulamento .

Dá os seguintes benefícios:

Proteção para os usuários, para que não dêem tiro no pé
Imagine, há uma equipe de desenvolvedores usando uma máquina de café. Foi fabricado pela empresa “Best CoffeeMachine” e funciona bem, mas uma capa protetora foi removida. Assim, a interface interna fica exposta.

Todos os desenvolvedores são civilizados – eles usam a máquina de café como pretendido. Mas um deles, John, decidiu que é o mais inteligente e fez alguns ajustes nas partes internas da máquina de café. Então a máquina de café falhou dois dias depois.

Isso certamente não é culpa de John, mas sim da pessoa que removeu a capa protetora e deixou John fazer suas manipulações.

O mesmo na programação. Se um usuário de uma classe mudar as coisas que não deveriam ser alteradas de fora - as consequências são imprevisíveis.

Suportável
A situação na programação é mais complexa do que em uma máquina de café da vida real, porque não a compramos apenas uma vez. O código passa constantemente por desenvolvimento e aprimoramento.

Se delimitarmos estritamente a interface interna, o desenvolvedor da classe poderá alterar livremente suas propriedades e métodos internos, mesmo sem informar os usuários.

Se você é um desenvolvedor dessa classe, é ótimo saber que métodos privados podem ser renomeados com segurança, seus parâmetros podem ser alterados e até removidos, pois nenhum código externo depende deles.

Para os usuários, quando uma nova versão é lançada, pode ser uma revisão total internamente, mas ainda simples de atualizar se a interface externa for a mesma.

Ocultando a complexidade
As pessoas adoram usar coisas que são simples. Pelo menos de fora. O que está dentro é uma coisa diferente.

Os programadores não são uma exceção.

É sempre conveniente quando os detalhes de implementação estão ocultos e uma interface externa simples e bem documentada está disponível.

Para ocultar uma interface interna, usamos propriedades protegidas ou privadas:

Os campos protegidos começam com _. Essa é uma convenção bem conhecida, não aplicada no nível do idioma. Os programadores só devem acessar um campo começando com _de sua classe e classes herdadas dela.
Os campos privados começam com #. O JavaScript garante que só podemos acessar aqueles de dentro da classe.
No momento, os campos privados não são bem suportados entre os navegadores, mas podem ser polipreenchidos.

*/

