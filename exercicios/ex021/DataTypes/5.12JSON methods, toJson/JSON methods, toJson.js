/*

Métodos JSON, toJSON
Digamos que temos um objeto complexo e gostaríamos de convertê-lo em uma string, enviá-lo por uma rede ou apenas enviá-lo para fins de registro.

Naturalmente, essa string deve incluir todas as propriedades importantes.

Poderíamos implementar a conversão assim:

*/

let user = {
    name: "John",
    age: 30,

    toString() {
        return `{name: "${this.name}", age: ${this.age}}`;
    }
};

alert(user); // {name: "John", age: 30}

/*

…Mas no processo de desenvolvimento, novas propriedades são adicionadas, propriedades antigas são renomeadas e removidas. Atualizar toStringsempre pode se tornar uma dor. Poderíamos tentar fazer um loop sobre as propriedades nele, mas e se o objeto for complexo e tiver objetos aninhados nas propriedades? Também precisaríamos implementar a conversão deles.

Felizmente, não há necessidade de escrever o código para lidar com tudo isso. A tarefa já foi resolvida.

JSON.stringify
O JSON (JavaScript Object Notation) é um formato geral para representar valores e objetos. É descrito como no padrão RFC 4627 . Inicialmente foi feito para JavaScript, mas muitas outras linguagens também possuem bibliotecas para lidar com isso. Portanto, é fácil usar JSON para troca de dados quando o cliente usa JavaScript e o servidor é escrito em Ruby/PHP/Java/Whatever.

JavaScript fornece métodos:

JSON.stringifypara converter objetos em JSON.
JSON.parsepara converter JSON de volta em um objeto.
Por exemplo, aqui nós, JSON.stringifyum aluno:

*/

let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    spouse: null
};

let json = JSON.stringify(student);

alert(typeof json); // we've got a string!

alert(json);
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}
*/

/*

O método JSON.stringify(student)pega o objeto e o converte em uma string.

jsonA string resultante é chamada de objeto codificado em JSON ou serializado ou stringificado ou empacotado . Estamos prontos para enviá-lo pela rede ou colocá-lo em um armazenamento de dados simples.

Observe que um objeto codificado em JSON tem várias diferenças importantes do objeto literal:

Strings usam aspas duplas. Sem aspas simples ou acentos graves em JSON. Assim 'John'se torna "John".
Nomes de propriedade de objeto também são colocados entre aspas. Isso é obrigatório. Assim age:30se torna "age":30.
JSON.stringifytambém pode ser aplicado a primitivos.

JSON suporta os seguintes tipos de dados:

Objetos{ ... }
Matrizes[ ... ]
Primitivos:
cordas,
números,
valores booleanos true/false,
null.
Por exemplo:

*/

// a number in JSON is just a number
alert( JSON.stringify(1) ) // 1

// a string in JSON is still a string, but double-quoted
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]

/*

JSON é uma especificação independente de idioma somente para dados, portanto, algumas propriedades de objeto específicas do JavaScript são ignoradas por JSON.stringify.

Nomeadamente:

Propriedades da função (métodos).
Chaves e valores simbólicos.
Propriedades que armazenam undefined.

*/

let user2 = {
    sayHi() { //ignored
        alert("Hello")
    },
    [Symbol("id")]: 123, // ignored
    something: undefined // ignored
};

alert( JSON.stringify(user) ); // {} (empty object)

/*

Normalmente, tudo bem. Se não é isso que queremos, logo veremos como customizar o processo.

O melhor é que os objetos aninhados são suportados e convertidos automaticamente.

Por exemplo:

*/

let meetup = {
    title: "Conference",
    room: {
        number: 23,
        participants: ["john", "ann"]
    }
};

alert( JSON.stringify(meetup) );
/* The whole structure is stringified:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/

/*

A limitação importante: não deve haver referências circulares.

Por exemplo:

*/

let room = {
    number: 23
};

let meetup2 = {
    title: "Conference",
    participants: ["john", "ann"]
};

meetup2.place = room; // meetup references room
room.occupiedBy = meetup2 // room references meetup

JSON.stringify(meetup2); // Error: Converting circular structure to JSON

/*

Aqui, a conversão falha devido a referência circular: room.occupiedByreferências meetupe meetup.placereferências room:


Excluindo e transformando: substituto
A sintaxe completa de JSON.stringifyé:

*/

let json2 = JSON.stringify(value[, replacer, space])

/*

valor
Um valor para codificar.
substituto
Matriz de propriedades para codificar ou uma função de mapeamento function(key, value).
espaço
Quantidade de espaço a ser usado para formatação
Na maioria das vezes, JSON.stringifyé usado apenas com o primeiro argumento. Mas se precisarmos ajustar o processo de substituição, como filtrar referências circulares, podemos usar o segundo argumento de JSON.stringify.

Se passarmos um array de propriedades para ele, somente essas propriedades serão codificadas.

Por exemplo:

*/

let room = {
    number: 23
  };
  
let meetup3 = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup references room
};

room.occupiedBy = meetup3; // room references meetup

alert( JSON.stringify(meetup3, ['title', 'participants']) );
// {"title":"Conference","participants":[{},{}]}

/*

Aqui provavelmente somos muito rigorosos. A lista de propriedades é aplicada a toda a estrutura do objeto. Portanto, os objetos em participantsestão vazios, porque namenão estão na lista.

Vamos incluir na lista todas as propriedades, exceto room.occupiedByas que causariam a referência circular:

*/

let room = {
    number: 23
  };
  
let meetup4 = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup references room
};
  
room.occupiedBy = meetup4; // room references meetup
  
alert( JSON.stringify(meetup4, ['title', 'participants', 'place', 'name', 'number']) );
/*
{
"title":"Conference",
"participants":[{"name":"John"},{"name":"Alice"}],
"place":{"number":23}
}
*/

/*

Agora tudo, exceto occupiedByé serializado. Mas a lista de propriedades é bastante longa.

Felizmente, podemos usar uma função em vez de um array como o arquivo replacer.

A função será chamada para cada (key, value)par e deverá retornar o valor “replaced”, que será utilizado no lugar do original. Ou undefinedse o valor deve ser ignorado.

No nosso caso, podemos retornar value“como está” para tudo, exceto occupiedBy. Para ignorar occupiedBy, o código abaixo retorna undefined:

*/

let room = {
    number: 23
};

let meetup5 = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup references room
};

room.occupiedBy = meetup5; // room references meetup

alert( JSON.stringify(meetup5, function replacer(key, valye) {
    alert(`${key}: ${value}`);
    return (key = 'occupiedBy') ? undefined : value;
}));
/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/

/*

Observe que a replacerfunção obtém todos os pares de chave/valor, incluindo objetos aninhados e itens de matriz. É aplicado recursivamente. O valor de thisinside replaceré o objeto que contém a propriedade atual.

A primeira chamada é especial. É feito usando um “objeto wrapper” especial: {"": meetup}. Em outras palavras, o primeiro (key, value)par tem uma chave vazia e o valor é o objeto de destino como um todo. É por isso que a primeira linha está ":[object Object]"no exemplo acima.

A ideia é fornecer o máximo de poder replacerpossível: ele tem a chance de analisar e substituir/pular até mesmo o objeto inteiro, se necessário.

Formatação: espaço
O terceiro argumento de JSON.stringify(value, replacer, space)é o número de espaços a serem usados ​​para formatação bonita.

Anteriormente, todos os objetos stringificados não tinham recuos e espaços extras. Tudo bem se quisermos enviar um objeto por uma rede. O spaceargumento é usado exclusivamente para uma boa saída.

Aqui space = 2diz ao JavaScript para mostrar objetos aninhados em várias linhas, com recuo de 2 espaços dentro de um objeto:

*/

let user3 = {
    name: "John",
    age: 25,
    roles: {
        isAdmin: false,
        isEditor: true
    }
};

alert(JSON.stringify(user, null, 2));
/* two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* for JSON.stringify(user, null, 4) the result would be more indented:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/

/*

O terceiro argumento também pode ser uma string. Nesse caso, a string é usada para recuo em vez de vários espaços.

O spaceparâmetro é usado apenas para fins de registro e saída agradável.

"paraJSON" personalizado
Como toStringna conversão de string, um objeto pode fornecer um método toJSONpara conversão em JSON. JSON.stringifychama-o automaticamente, se disponível.

Por exemplo:

*/

let room = {
    number: 23
};

let meetup6 = {
    title: "Conference",
    date: new Date(Date.UTC(2017, 0, 1)),
    room
};

alert( JSON.stringify(meetup6) );
/*
  {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z",  // (1)
    "room": {"number":23}               // (2)
  }
*/

/*

Aqui podemos ver que date (1)se tornou uma string. Isso porque todas as datas possuem um toJSONmétodo interno que retorna esse tipo de string.

Agora vamos adicionar um custom toJSONpara nosso objeto room (2):

*/

let room = {
    number: 23,
    toJSON() {
        return this.number;
    }
};

let meetup7 = {
    title: "Conference",
    room
};

alert( JSON.stringify(room) ); // 23

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
    "room": 23
  }
*/

/*

Como podemos ver, toJSONé usado tanto para a chamada direta JSON.stringify(room)quanto quando roomestá aninhado em outro objeto codificado.

JSON.parse
Para decodificar uma string JSON, precisamos de outro método chamado JSON.parse .

A sintaxe:

*/

let value = JSON.parse(str, [reviver]);

/*

str
Cadeia de caracteres JSON a ser analisada.
reviver
Função opcional(chave,valor) que será chamada para cada (key, value)par e pode transformar o valor.
Por exemplo:

*/

// stringified array
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1

// Ou para objetos aninhados:

let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user4 = JSON.parse(userData);

alert( user.friends[1] ); // 1

/*

O JSON pode ser tão complexo quanto necessário, objetos e arrays podem incluir outros objetos e arrays. Mas devem obedecer ao mesmo formato JSON.

Aqui estão os erros típicos no JSON escrito à mão (às vezes temos que escrevê-lo para fins de depuração):

*/

let json3 = `{
    name: "John",  // mistake: property name without quotes
    "surname": 'Smith',  // mistake: single quotes in value (must be double)
    'isAdmin': false  // mistake: single quotes in key (must be double)
    "birthday": new Date(2000, 2, 3), // mistake: no "new" is allowed, only bare values
    "friends": [0,1,2,3] // here all fine
}`;

/*

Além disso, JSON não suporta comentários. Adicionar um comentário ao JSON o torna inválido.

Existe outro formato chamado JSON5 , que permite chaves sem aspas, comentários etc. Mas esta é uma biblioteca independente, não está na especificação da linguagem.

O JSON regular é tão rígido não porque seus desenvolvedores são preguiçosos, mas para permitir implementações fáceis, confiáveis ​​e muito rápidas do algoritmo de análise.

Usando reviver
Imagine, recebemos um meetupobjeto stringificado do servidor.

Se parece com isso:

*/

// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}'

/*

…E agora precisamos desserializá -lo, para voltar a ser um objeto JavaScript.

Vamos fazer isso chamando JSON.parse:

*/

let meetup8 = JSON.parse(str);

alert( meetup8.date.getDate() ); // Error!

/*

Opa! Um erro!

O valor de meetup.dateé uma string, não um Dateobjeto. Como poderia JSON.parsesaber que deveria transformar aquela string em um Date?

Vamos passar para JSON.parsea função reviver como segundo argumento, que retorna todos os valores “como estão”, mas datese tornará um Date:

*/

let str2 = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}'

let meetup9 = JSON.parse(str2, function(key, value) {
    if (key == 'date') return new Date(value);
    return value;
});

alert( meetup.date.getDate() ); // now works!

// A propósito, isso também funciona para objetos aninhados:

let schedule = `{
    "meetups": [
      {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
      {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
    ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
    if (key == 'date') return new Date(value);
    return value;
});

alert( schedule.meetups[1].date.getDate() ); // works!

/*

Resumo
JSON é um formato de dados que possui seu próprio padrão independente e bibliotecas para a maioria das linguagens de programação.
JSON suporta objetos simples, arrays, strings, números, booleanos e null.
JavaScript fornece métodos JSON.stringify para serializar em JSON e JSON.parse para ler de JSON.
Ambos os métodos suportam funções de transformador para leitura/gravação inteligente.
Se um objeto tiver toJSON, ele será chamado por JSON.stringify.

*/

