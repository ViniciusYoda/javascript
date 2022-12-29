/*

Erros personalizados, erro de extensão
Quando desenvolvemos algo, muitas vezes precisamos de nossas próprias classes de erro para refletir coisas específicas que podem dar errado em nossas tarefas. Para erros em operações de rede, podemos precisar HttpErrorde , para operações de banco de dados DbError, para operações de busca NotFoundErrore assim por diante.

Nossos erros devem suportar propriedades básicas de erro como message, namee, preferencialmente, stack. Mas eles também podem ter outras propriedades próprias, por exemplo, os HttpErrorobjetos podem ter uma statusCodepropriedade com um valor como 404ou 403ou 500.

O JavaScript permite usar throwcom qualquer argumento, portanto, tecnicamente, nossas classes de erro personalizadas não precisam herdar de Error. Mas se herdarmos, torna-se possível usar obj instanceof Errorpara identificar objetos de erro. Portanto, é melhor herdar dele.

À medida que o aplicativo cresce, nossos próprios erros naturalmente formam uma hierarquia. Por exemplo, HttpTimeoutErrorpode herdar de HttpErrore assim por diante.

Erro de extensão
Como exemplo, vamos considerar uma função readUser(json)que deve ler JSON com dados do usuário.

Aqui está um exemplo de como um válido jsonpode parecer:

let json = `{ "name": "John", "age": 30 }`;
Internamente, usaremos JSON.parse. Se ele receber malformado json, ele lançará SyntaxError. Mas mesmo que jsonesteja sintaticamente correto, isso não significa que seja um usuário válido, certo? Pode perder os dados necessários. Por exemplo, pode não ter propriedades essenciais para nossos usuários name.age

Nossa função readUser(json)não apenas lerá JSON, mas também verificará (“validará”) os dados. Se não houver campos obrigatórios ou o formato estiver errado, isso é um erro. E isso não é um SyntaxError, porque os dados estão sintaticamente corretos, mas outro tipo de erro. Vamos chamá-lo ValidationErrore criar uma classe para ele. Um erro desse tipo também deve conter as informações sobre o campo ofensivo.

Nossa ValidationErrorclasse deve herdar da Errorclasse.

A Errorclasse é integrada, mas aqui está seu código aproximado para que possamos entender o que estamos estendendo:

// The "pseudocode" for the built-in Error class defined by JavaScript itself
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (different names for different built-in error classes)
    this.stack = <call stack>; // non-standard, but most environments support it
  }
}
Agora vamos herdar ValidationErrordele e experimentá-lo em ação:

*/

class ValidationError extends Error {
   constructor(message) {
      super(message); // (1)
      this.name = "ValidationError"; // (2)
   }
}

function test() {
   throw new ValidationError("Whoops!");
}

try {
   test();
} catch (err) {
   alert(err.message); // Whoops!
   alert(err.name); // ValidationError
   alert(err.stack); // a list of nested calls with line numbers for each
}

/*

Observe: na linha (1), chamamos o construtor pai. O JavaScript exige que chamemos supero construtor filho, então isso é obrigatório. O construtor pai define a messagepropriedade.

O construtor pai também define a namepropriedade como "Error", portanto, na linha (2), a redefinimos com o valor correto.

Vamos tentar usá-lo em readUser(json):

*/

class ValidationError extends Error {
   constructor(message) {
      super(message);
      this.name = "ValidationError";
   }
}

// Usage
function readUser(json) {
   let user = JSON.parse(json);

   if (!user.age) {
      throw new ValidationError("No field: age");
   }
   if (!user.name) {
      throw new ValidationError("No field: name");
   }

   return user;
}

// Working example with try..catch

try {
   let user = readUser('{ "age": 25 }');
} catch (err) {
   if (err instanceof ValidationError) {
      alert("Invalid data: " + err.message); // Invalid data: No field: name
   } else if (err instanceof SyntaxError) { // (*)
      alert("JSON Syntax Error: " + err.message);
   } else {
      throw err; // unknown error, rethrow it (**)
   }
}

/*

O try..catchbloco no código acima lida com o nosso ValidationErrore o built-in SyntaxErrorfrom JSON.parse.

Por favor, dê uma olhada em como usamos instanceofpara verificar o tipo de erro específico na linha (*).

Também poderíamos olhar para err.name, assim:

// ...
// instead of (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
A instanceofversão é muito melhor, porque no futuro vamos estender ValidationError, fazer subtipos dela, como PropertyRequiredError. E instanceofa verificação continuará a funcionar para novas classes herdadas. Então isso é à prova de futuro.

Também é importante que se catchencontrar um erro desconhecido, ele o reinicie na linha (**). O catchbloco só sabe como lidar com erros de validação e sintaxe, outros tipos (causados ​​por um erro de digitação no código ou outros motivos desconhecidos) devem falhar.

Mais herança
A ValidationErrorclasse é muito genérica. Muitas coisas podem dar errado. A propriedade pode estar ausente ou pode estar em um formato incorreto (como um valor de string em agevez de um número). Vamos fazer uma classe mais concreta PropertyRequiredError, exatamente para propriedades ausentes. Ele conterá informações adicionais sobre a propriedade que está faltando.

*/

class ValidationError extends Error {
   constructor(message) {
      super(message);
      this.name = "ValidationError";
   }
}

class PropertyRequiredError extends ValidationError {
   constructor(property) {
      super("No property: " + property);
      this.name = "PropertyRequiredError";
      this.property = property;
   }
}

// Usage
function readUser(json) {
   let user = JSON.parse(json);

   if (!user.age) {
      throw new PropertyRequiredError("age");
   }
   if (!user.name) {
      throw new PropertyRequiredError("name");
   }

   return user;
}

// Working example with try..catch

try {
   let user = readUser('{ "age": 25 }');
} catch (err) {
   if (err instanceof ValidationError) {
      alert("Invalid data: " + err.message); // Invalid data: No property: name
      alert(err.name); // PropertyRequiredError
      alert(err.property); // name
   } else if (err instanceof SyntaxError) {
      alert("JSON Syntax Error: " + err.message);
   } else {
      throw err; // unknown error, rethrow it
   }
}

/*

A nova classe PropertyRequiredErroré fácil de usar: basta passar o nome da propriedade: new PropertyRequiredError(property). O legível por humanos messageé gerado pelo construtor.

Observe que this.nameno PropertyRequiredErrorconstrutor é novamente atribuído manualmente. Isso pode se tornar um pouco tedioso – atribuir this.name = <class name>em cada classe de erro personalizada. Podemos evitá-lo criando nossa própria classe de “erro básico” que atribui this.name = this.constructor.name. E, em seguida, herdar todos os nossos erros personalizados dele.

Vamos chamá-lo MyError.

Aqui está o código com MyErroroutras classes de erro personalizadas, simplificadas:

*/

class MyError extends Error {
   constructor(message) {
      super(message);
      this.name = this.constructor.name;
   }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
   constructor(property) {
      super("No property: " + property);
      this.property = property;
   }
}

// name is correct
alert(new PropertyRequiredError("field").name); // PropertyRequiredError

/*

Agora os erros personalizados são muito mais curtos, especialmente ValidationErrorporque eliminamos a "this.name = ..."linha no construtor.

Exceções de empacotamento
O objetivo da função readUserno código acima é “ler os dados do usuário”. Podem ocorrer diferentes tipos de erros no processo. No momento temos SyntaxErrore ValidationError, mas no futuro a readUserfunção pode crescer e provavelmente gerar outros tipos de erros.

O código que chama readUserdeve lidar com esses erros. No momento, ele usa vários ifs no catchbloco, que verificam a classe, tratam dos erros conhecidos e lançam novamente os desconhecidos.

O esquema é assim:

try {
  ...
  readUser()  // the potential error source
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // handle validation errors
  } else if (err instanceof SyntaxError) {
    // handle syntax errors
  } else {
    throw err; // unknown error, rethrow it
  }
}

No código acima podemos ver dois tipos de erros, mas pode haver mais.

Se a readUserfunção gerar vários tipos de erros, devemos nos perguntar: realmente queremos verificar todos os tipos de erro um por um todas as vezes?

Muitas vezes a resposta é “Não”: gostaríamos de estar “um nível acima de tudo isso”. Queremos apenas saber se houve um “erro de leitura de dados” – por que exatamente isso aconteceu é muitas vezes irrelevante (a mensagem de erro descreve isso). Ou, melhor ainda, gostaríamos de ter uma maneira de obter os detalhes do erro, mas apenas se for necessário.

A técnica que descrevemos aqui é chamada de “exceções de empacotamento”.

1. Faremos uma nova classe ReadErrorpara representar um erro genérico de “leitura de dados”.
2. A função readUserirá capturar erros de leitura de dados que ocorrem dentro dela, como ValidationErrore SyntaxError, e gerar um em seu ReadErrorlugar.
3. O ReadErrorobjeto manterá a referência ao erro original em sua causepropriedade.

Então o código que chama readUsersó terá que verificar ReadError, não todo tipo de erro de leitura de dados. E se precisar de mais detalhes de um erro, pode verificar sua causepropriedade.

Aqui está o código que define ReadErrore demonstra seu uso em readUsere try..catch:

*/

class ReadError extends Error {
   constructor(message, cause) {
      super(message);
      this.cause = cause;
      this.name = 'ReadError';
   }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
   if (!user.age) {
      throw new PropertyRequiredError("age");
   }

   if (!user.name) {
      throw new PropertyRequiredError("name");
   }
}

function readUser(json) {
   let user;

   try {
      user = JSON.parse(json);
   } catch (err) {
      if (err instanceof SyntaxError) {
         throw new ReadError("Syntax Error", err);
      } else {
         throw err;
      }
   }

   try {
      validateUser(user);
   } catch (err) {
      if (err instanceof ValidationError) {
         throw new ReadError("Validation Error", err);
      } else {
         throw err;
      }
   }

}

try {
   readUser('{bad json}');
} catch (e) {
   if (e instanceof ReadError) {
      alert(e);
      // Original error: SyntaxError: Unexpected token b in JSON at position 1
      alert("Original error: " + e.cause);
   } else {
      throw e;
   }
}

/*

No código acima, readUserfunciona exatamente como descrito – captura erros de sintaxe e validação e ReadError, em vez disso, lança erros (erros desconhecidos são lançados novamente como de costume).

Então o código externo verifica instanceof ReadErrore é isso. Não há necessidade de listar todos os tipos de erros possíveis.

A abordagem é chamada de “empacotar exceções”, porque pegamos exceções de “baixo nível” e as “embrulhamos” de forma ReadErrormais abstrata. É amplamente utilizado em programação orientada a objetos.

Resumo
Podemos herdar de Errore outras classes de erro incorporadas normalmente. Só precisamos cuidar do nameimóvel e não esqueça de ligar super.
Podemos usar instanceofpara verificar erros específicos. Também funciona com herança. Mas às vezes temos um objeto de erro vindo de uma biblioteca de terceiros e não há uma maneira fácil de obter sua classe. Então namea propriedade pode ser usada para tais verificações.
O agrupamento de exceções é uma técnica amplamente difundida: uma função lida com exceções de baixo nível e cria erros de nível superior em vez de vários de baixo nível. Às vezes, as exceções de baixo nível se tornam propriedades desse objeto, como err.causenos exemplos acima, mas isso não é estritamente necessário.

*/

