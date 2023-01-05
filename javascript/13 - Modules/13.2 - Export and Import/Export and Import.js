/*

Exportar e importar
As diretivas de exportação e importação têm diversas variantes de sintaxe.

No artigo anterior vimos um uso simples, agora vamos explorar mais exemplos.

Exportar antes das declarações
Podemos rotular qualquer declaração como exportada colocando exportantes dela, seja uma variável, função ou classe.

Por exemplo, aqui todas as exportações são válidas:

// export an array
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
  constructor(name) {
    this.name = name;
  }
}

Sem ponto-e-vírgula após exportar classe/função
Observe que exportantes de uma classe ou uma função não a torna uma expressão de função . Ainda é uma declaração de função, embora exportada.

A maioria dos guias de estilo JavaScript não recomendam ponto-e-vírgula após declarações de função e classe.

É por isso que não há necessidade de ponto e vírgula no final de export classe export function:

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}  // no ; at the end

Exportar além das declarações
Além disso, podemos colocar exportseparadamente.

Aqui, primeiro declaramos e depois exportamos:

// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // a list of exported variables
…Ou, tecnicamente, poderíamos colocar exportas funções acima também.

Importar *
Normalmente, colocamos uma lista do que importar entre chaves import {...}, assim:

Exportar além das declarações
Além disso, podemos colocar exportseparadamente.

Aqui, primeiro declaramos e depois exportamos:

// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // a list of exported variables
…Ou, tecnicamente, poderíamos colocar exportas funções acima também.

Importar *
Normalmente, colocamos uma lista do que importar entre chaves import {...}, assim:

// 📁 main.js
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');

À primeira vista, “importar tudo” parece uma coisa tão legal, curta para escrever, por que deveríamos listar explicitamente o que precisamos importar?

Bem, existem algumas razões.

1. Listar explicitamente o que importar fornece nomes mais curtos: sayHi()em vez de say.sayHi().
2. A lista explícita de importações fornece uma visão geral melhor da estrutura do código: o que é usado e onde. Isso facilita o suporte ao código e a refatoração.

Não tenha medo de importar demais
Ferramentas de compilação modernas, como webpack e outras, agrupam módulos e os otimizam para acelerar o carregamento. Eles também removeram as importações não utilizadas.

Por exemplo, se você import * as libraryusar uma grande biblioteca de códigos e usar apenas alguns métodos, os não utilizados não serão incluídos no pacote otimizado.

Importar “como”
Também podemos usar aspara importar com nomes diferentes.

Por exemplo, vamos importar sayHipara a variável local hipara abreviar e importar sayByecomo bye:

// 📁 main.js
import {sayHi as hi, sayBye as bye} from './say.js';

hi('John'); // Hello, John!
bye('John'); // Bye, John!
Exportar “como”

A sintaxe semelhante existe para export.

Vamos exportar funções como hie bye:

// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
Agora hie byesão nomes oficiais de forasteiros, para serem usados ​​nas importações:

// 📁 main.js
import * as say from './say.js';

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!
padrão de exportação
Na prática, existem basicamente dois tipos de módulos.

1. Módulos que contêm uma biblioteca, pacote de funções, como say.jsacima.
2. Módulos que declaram uma única entidade, por exemplo, um módulo user.jsexporta apenas arquivos class User.

Principalmente, a segunda abordagem é preferida, de modo que cada “coisa” resida em seu próprio módulo.

Naturalmente, isso requer muitos arquivos, pois tudo precisa de seu próprio módulo, mas isso não é um problema. Na verdade, a navegação de código se torna mais fácil se os arquivos forem bem nomeados e estruturados em pastas.

Os módulos fornecem uma export defaultsintaxe especial (“a exportação padrão”) para fazer com que a maneira “uma coisa por módulo” pareça melhor.

Coloque export defaultantes da entidade a exportar:

// 📁 user.js
export default class User { // just add "default"
  constructor(name) {
    this.name = name;
  }
}
Pode haver apenas um export defaultpor arquivo.

…E então importe-o sem chaves:

// 📁 main.js
import User from './user.js'; // not {User}, just User

new User('John');
As importações sem chaves têm uma aparência melhor. Um erro comum ao começar a usar módulos é esquecer as chaves. Então, lembre-se, importprecisa de chaves para exportações nomeadas e não precisa delas para a padrão.

exportação nomeada	exportação padrão
export class User {...}	export default class User {...}
import {User} from ...	import User from ...
Tecnicamente, podemos ter exportações padrão e nomeadas em um único módulo, mas na prática as pessoas geralmente não as misturam. Um módulo tem exportações nomeadas ou padrão.

Como pode haver no máximo uma exportação padrão por arquivo, a entidade exportada pode não ter nome.

Por exemplo, todas essas são exportações padrão perfeitamente válidas:

export default class { // no class name
  constructor() { ... }
}
export default function(user) { // no function name
  alert(`Hello, ${user}!`);
}
// export a single value, without making a variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

Não dar um nome é bom, porque há apenas um export defaultpor arquivo, portanto, importsem chaves sabe o que importar.

Sem default, tal exportação daria um erro:

export class { // Error! (non-default export needs a name)
  constructor() {}
}
O nome “padrão”
Em algumas situações, a defaultpalavra-chave é usada para fazer referência à exportação padrão.

Por exemplo, para exportar uma função separadamente de sua definição:

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// same as if we added "export default" before the function
export {sayHi as default};

Ou, em outra situação, digamos que um módulo user.jsexporte uma coisa principal “padrão” e algumas nomeadas (raramente é o caso, mas acontece):

// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
Veja como importar a exportação padrão junto com uma nomeada:

// 📁 main.js
import {default as User, sayHi} from './user.js';

new User('John');
E, finalmente, se importar tudo *como um objeto, a defaultpropriedade será exatamente a exportação padrão:

// 📁 main.js
import * as user from './user.js';

let User = user.default; // the default export
new User('John');
Uma palavra contra as exportações padrão
As exportações nomeadas são explícitas. Eles nomeiam exatamente o que importam, então temos essa informação deles; isso é uma coisa boa.

As exportações nomeadas nos forçam a usar exatamente o nome correto para importar:

import {User} from './user.js';
// import {MyUser} won't work, the name must be {User}
…enquanto para uma exportação padrão, sempre escolhemos o nome ao importar:

import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything... and it'll still work

Portanto, os membros da equipe podem usar nomes diferentes para importar a mesma coisa, e isso não é bom.

Normalmente, para evitar isso e manter o código consistente, existe uma regra que as variáveis ​​importadas devem corresponder aos nomes dos arquivos, por exemplo:

import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
Ainda assim, algumas equipes consideram isso uma séria desvantagem das exportações padrão. Portanto, eles preferem sempre usar exportações nomeadas. Mesmo que apenas uma única coisa seja exportada, ela ainda será exportada com um nome, sem default.

Isso também torna a reexportação (veja abaixo) um pouco mais fácil.

Reexportar
A sintaxe “Reexportar” export ... from ...permite importar coisas e exportá-las imediatamente (possivelmente sob outro nome), assim:

export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
Por que isso seria necessário? Vejamos um caso de uso prático.

Imagine, estamos escrevendo um “pacote”: uma pasta com muitos módulos, com algumas funcionalidades exportadas para fora (ferramentas como o NPM nos permitem publicar e distribuir tais pacotes, mas não precisamos usá-los), e muitos módulos são apenas “auxiliares”, para uso interno em outros módulos do pacote.

A estrutura do arquivo poderia ser assim:

auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...

Gostaríamos de expor a funcionalidade do pacote por meio de um único ponto de entrada.

Ou seja, quem quiser utilizar nosso pacote, deverá importar apenas do “arquivo principal” auth/index.js.

Assim:

import {login, logout} from 'auth/index.js'
O “arquivo principal” auth/index.jsexporta todas as funcionalidades que gostaríamos de fornecer em nosso pacote.

A ideia é que estranhos, outros programadores que usam nosso pacote, não se metam em sua estrutura interna, procurem arquivos dentro da pasta do nosso pacote. Exportamos apenas o que é necessário auth/index.jse mantemos o resto escondido de olhares indiscretos.

Como a funcionalidade exportada real está espalhada pelo pacote, podemos importá-la auth/index.jse exportá-la:

// 📁 auth/index.js

// import login/logout and immediately export them
import {login, logout} from './helpers.js';
export {login, logout};

// import default as User and export it
import User from './user.js';
export {User};
...
Agora os usuários do nosso pacote podemimport {login} from "auth/index.js" .

A sintaxe export ... from ...é apenas uma notação mais curta para tal importação-exportação:

// 📁 auth/index.js
// re-export login/logout
export {login, logout} from './helpers.js';

// re-export the default export as User
export {default as User} from './user.js';
...
A diferença notável em export ... fromrelação a import/exporté que os módulos reexportados não estão disponíveis no arquivo atual. Portanto, dentro do exemplo acima auth/index.js, não podemos usar funções reexportadas login/logout.

Reexportando a exportação padrão
A exportação padrão precisa de tratamento separado ao reexportar.

Digamos que temos user.jscom o export default class Usere gostaríamos de reexportá-lo:

// 📁 user.js
export default class User {
  // ...
}
Podemos nos deparar com dois problemas com ela:

1. export User from './user.js'não vai funcionar. Isso levaria a um erro de sintaxe.

Para reexportar a exportação padrão, devemos escrever export {default as User}, como no exemplo acima.

2. export * from './user.js'reexporta apenas exportações nomeadas, mas ignora a padrão.

Se quisermos reexportar as exportações nomeadas e padrão, serão necessárias duas instruções:

export * from './user.js'; // to re-export named exports
export {default} from './user.js'; // to re-export the default export
Essas esquisitices de reexportar uma exportação padrão são uma das razões pelas quais alguns desenvolvedores não gostam de exportações padrão e preferem as nomeadas.

Resumo
Aqui estão todos os tipos deexport que abordamos neste e em artigos anteriores.

Você pode verificar a si mesmo lendo-os e lembrando-se do que eles significam:

Antes da declaração de uma classe/função/…:
export [default] class/function/variable ...
Exportação independente:
export {x [as y], ...}.
Reexportar:
export {x [as y], ...} from "module"
export * from "module"(não reexporta o padrão).
export {default [as y]} from "module"(padrão de reexportação).

Importar:

Importando exportações nomeadas:
import {x [as y], ...} from "module"
Importando a exportação padrão:
import x from "module"
import {default as x} from "module"
Importar tudo:
import * as obj from "module"
Importe o módulo (seu código é executado), mas não atribua nenhuma de suas exportações a variáveis:
import "module"
podemos colocarimport/export declarações no início ou no final de um script, não importa.

Então, tecnicamente este código está bom:

sayHi();

// ...

import {sayHi} from './say.js'; // import at the end of the file
Na prática, as importações geralmente estão no início do arquivo, mas isso é apenas para maior conveniência.

Observe que as instruções de importação/exportação não funcionam se estiverem dentro de arquivos {...}.

Uma importação condicional, como esta, não funcionará:

if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}
…Mas e se realmente precisarmos importar algo condicionalmente? Ou na hora certa? Tipo, carregar um módulo a pedido, quando é realmente necessário?

Veremos as importações dinâmicas no próximo artigo.

*/