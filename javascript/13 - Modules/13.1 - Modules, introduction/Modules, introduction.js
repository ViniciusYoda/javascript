/*

Módulos, introdução
À medida que nosso aplicativo cresce, queremos dividi-lo em vários arquivos, chamados de “módulos”. Um módulo pode conter uma classe ou uma biblioteca de funções para um propósito específico.

Por muito tempo, o JavaScript existiu sem uma sintaxe de módulo no nível da linguagem. Isso não foi um problema, porque inicialmente os scripts eram pequenos e simples, então não havia necessidade.

Mas eventualmente os scripts se tornaram cada vez mais complexos, então a comunidade inventou uma variedade de maneiras de organizar o código em módulos, bibliotecas especiais para carregar módulos sob demanda.

Para citar alguns (por razões históricas):

AMD – um dos sistemas de módulos mais antigos, inicialmente implementado pela biblioteca require.js .
CommonJS – o sistema de módulos criado para o servidor Node.js.
UMD – mais um sistema de módulos, sugerido como universal, compatível com AMD e CommonJS.

Agora, tudo isso lentamente se tornou parte da história, mas ainda podemos encontrá-los em scripts antigos.

O sistema de módulos de nível de linguagem apareceu no padrão em 2015, evoluiu gradualmente desde então e agora é suportado por todos os principais navegadores e no Node.js. Portanto, estudaremos os módulos JavaScript modernos a partir de agora.

O que é um módulo?
Um módulo é apenas um arquivo. Um script é um módulo. Tão simples como isso.

Os módulos podem carregar uns aos outros e usar diretivas especiais exporte importpara trocar funcionalidade, chamar funções de um módulo de outro:

exportpalavras-chave rotula variáveis ​​e funções que devem ser acessíveis de fora do módulo atual.
importpermite a importação de funcionalidades de outros módulos.
Por exemplo, se tivermos um arquivo sayHi.jsexportando uma função:

// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}

…Em seguida, outro arquivo pode ser importado e usado:

// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
A importdiretiva carrega o módulo pelo caminho ./sayHi.jsrelativo ao arquivo atual e atribui a função exportada sayHià variável correspondente.

Vamos executar o exemplo no navegador.

Como os módulos suportam palavras-chave e recursos especiais, devemos informar ao navegador que um script deve ser tratado como um módulo, usando o atributo <script type="module">.

Assim:

*/

// index.html

/*

<!doctype html>
<script type="module">
  import {sayHi} from './say.js';

  document.body.innerHTML = sayHi('John');
</script>

*/

// dizer.js

export function sayHi(user) {
   return `Hello, ${user}!`;
}

/*

O navegador busca e avalia automaticamente o módulo importado (e suas importações, se necessário) e, em seguida, executa o script.

Os módulos funcionam apenas via HTTP(s), não localmente
Se você tentar abrir uma página da Web localmente, via file://protocolo, verá que import/exportas diretivas não funcionam. Use um servidor da Web local, como servidor estático ou use o recurso “servidor ao vivo” do seu editor, como VS Code Live Server Extension para testar módulos.

Recursos principais do módulo
O que há de diferente nos módulos em comparação com os scripts “regulares”?

Existem recursos básicos, válidos tanto para o navegador quanto para o JavaScript do lado do servidor.

Sempre “use estrito”
Os módulos sempre funcionam em modo estrito. Por exemplo, atribuir a uma variável não declarada causará um erro.

<script type="module">
  a = 5; // error
</script>
Escopo no nível do módulo
Cada módulo tem seu próprio escopo de nível superior. Em outras palavras, variáveis ​​e funções de nível superior de um módulo não são vistas em outros scripts.

No exemplo abaixo, dois scripts são importados e hello.jstentam usar a uservariável declarada em user.js. Ele falha, porque é um módulo separado (você verá o erro no console):

*/

// index.html

/*

<!doctype html>
<script type="module" src="user.js"></script>
<script type="module" src="hello.js"></script>

*/

// usuário.js

let user = "John";

// ola.js

alert(user); // no such variable (each module has independent variables)

/*

Os módulos devem exportser acessíveis de fora e importo que eles precisam.

user.jsdeve exportar a uservariável.
hello.jsdeve importá-lo do user.jsmódulo.
Em outras palavras, com módulos usamos import/export em vez de depender de variáveis ​​globais.

Esta é a variante correta:

*/

// index.html

/*

<!doctype html>
<script type="module" src="hello.js"></script>

*/

// usuário.js

export let user2 = "John";

// ola.js

import {user2} from './user.js';

document.body.innerHTML = user2; // John

/*

No navegador, se falamos de páginas HTML, também existe um escopo de nível superior independente para cada arquivo <script type="module">.

Aqui estão dois scripts na mesma página, ambos type="module". Eles não veem as variáveis ​​de nível superior uns dos outros:

<script type="module">
  // The variable is only visible in this module script
  let user = "John";
</script>

<script type="module">
  alert(user); // Error: user is not defined
</script>

Observe:
No navegador, podemos tornar global uma variável em nível de janela, atribuindo-a explicitamente a uma windowpropriedade, por exemplo, window.user = "John".

Então, todos os scripts o verão, com type="module"e sem ele.

Dito isto, fazer tais variáveis ​​globais é desaprovado. Por favor, tente evitá-los.

Um código de módulo é avaliado apenas na primeira vez quando importado
Se o mesmo módulo for importado para vários outros módulos, seu código será executado apenas uma vez, na primeira importação. Em seguida, suas exportações são dadas a todos os outros importadores.

A avaliação pontual tem consequências importantes, às quais devemos estar atentos.

Vejamos alguns exemplos.

Primeiro, se executar um código de módulo traz efeitos colaterais, como mostrar uma mensagem, importá-lo várias vezes o acionará apenas uma vez - a primeira vez:

// 📁 alert.js
alert("Module is evaluated!");

// Import the same module from different files

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
import `./alert.js`; // (shows nothing)
A segunda importação não mostra nada, porque o módulo já foi avaliado.

Há uma regra: o código do módulo de nível superior deve ser usado para inicialização, criação de estruturas de dados internas específicas do módulo. Se precisarmos tornar algo que pode ser chamado várias vezes, devemos exportá-lo como uma função, como fizemos sayHiacima.

Agora, vamos considerar um exemplo mais profundo.

Digamos que um módulo exporte um objeto:

// 📁 admin.js
export let admin = {
  name: "John"
};
Se este módulo for importado de vários arquivos, o módulo é avaliado apenas na primeira vez, o adminobjeto é criado e passado para todos os outros importadores.

Todos os importadores obtêm exatamente o único adminobjeto:

// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

// Both 1.js and 2.js reference the same admin object
// Changes made in 1.js are visible in 2.js
Como você pode ver, quando 1.jsaltera a namepropriedade no importado admin, 2.jspode ver o novo admin.name.

Isso porque o módulo é executado apenas uma vez. As exportações são geradas e, em seguida, são compartilhadas entre os importadores, portanto, se algo alterar o adminobjeto, outros importadores verão isso.

Na verdade, esse comportamento é muito conveniente, pois permite configurar módulos.

Em outras palavras, um módulo pode fornecer uma funcionalidade genérica que precisa de uma configuração. Por exemplo, a autenticação precisa de credenciais. Em seguida, ele pode exportar um objeto de configuração esperando que o código externo seja atribuído a ele.

Aqui está o padrão clássico:

1. Um módulo exporta alguns meios de configuração, por exemplo, um objeto de configuração.
2. Na primeira importação, inicializamos, escrevemos em suas propriedades. O script de aplicativo de nível superior pode fazer isso.
3. Outras importações usam o módulo.

Por exemplo, o admin.jsmódulo pode fornecer certa funcionalidade (por exemplo, autenticação), mas espera que as credenciais entrem no configobjeto de fora:

// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Ready to serve, ${config.user}!`);
}
Aqui, admin.jsexporta o configobjeto (inicialmente vazio, mas também pode ter propriedades padrão).

Então em init.js, o primeiro script do nosso app, importamos configdele e configuramos config.user:

// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
…Agora o módulo admin.jsestá configurado.

Outros importadores podem chamá-lo e ele mostra corretamente o usuário atual:

// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Ready to serve, Pete!
import.meta
O objeto import.metacontém as informações sobre o módulo atual.

Seu conteúdo depende do ambiente. No navegador, ele contém o URL do script ou o URL de uma página da Web atual, se estiver dentro do HTML:

<script type="module">
  alert(import.meta.url); // script URL
  // for an inline script - the URL of the current HTML-page
</script>

Em um módulo, “isto” é indefinido
Esse é um recurso menor, mas, para completar, devemos mencioná-lo.

Em um módulo, o nível superior thisé indefinido.

Compare-o com scripts não modulares, onde thisé um objeto global:

<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>

Recursos específicos do navegador
Existem também várias diferenças de scripts específicas do navegador em type="module"comparação com os regulares.

Você pode pular esta seção por enquanto se estiver lendo pela primeira vez ou se não usar JavaScript em um navegador.

Os scripts do módulo são adiados
Os scripts do módulo são sempre adiados, mesmo efeito do deferatributo (descrito no capítulo Scripts: async, defer ), para scripts externos e inline.

Em outras palavras:

baixar scripts de módulos externos <script type="module" src="...">não bloqueia o processamento de HTML, eles carregam em paralelo com outros recursos.
os scripts do módulo esperam até que o documento HTML esteja totalmente pronto (mesmo que sejam pequenos e carreguem mais rápido que o HTML) e, em seguida, executem.
a ordem relativa dos scripts é mantida: os scripts que vão primeiro no documento, executam primeiro.
Como efeito colateral, os scripts de módulo sempre “vêem” a página HTML totalmente carregada, incluindo os elementos HTML abaixo deles.

Por exemplo:

<script type="module">
  alert(typeof button); // object: the script can 'see' the button below
  // as modules are deferred, the script runs after the whole page is loaded
</script>

Compare to regular script below:

<script>
  alert(typeof button); // button is undefined, the script can't see elements below
  // regular scripts run immediately, before the rest of the page is processed
</script>

<button id="button">Button</button>

Observação: na verdade, o segundo script é executado antes do primeiro! Então veremos undefinedprimeiro, e depois object.

Isso porque os módulos são diferidos, então esperamos o documento ser processado. O script regular é executado imediatamente, então vemos sua saída primeiro.

Ao usar módulos, devemos estar cientes de que a página HTML aparece à medida que carrega e os módulos JavaScript são executados depois disso, para que o usuário possa ver a página antes que o aplicativo JavaScript esteja pronto. Algumas funcionalidades podem não funcionar ainda. Devemos colocar “indicadores de carregamento”, ou então garantir que o visitante não se confunda com isso.

Async funciona em scripts embutidos
Para scripts não modulares, o asyncatributo funciona apenas em scripts externos. Os scripts assíncronos são executados imediatamente quando prontos, independentemente de outros scripts ou do documento HTML.

Para scripts de módulo, ele também funciona em scripts embutidos.

Por exemplo, o script embutido abaixo tem async, então não espera por nada.

Ele realiza a importação (fetches ./analytics.js) e executa quando pronto, mesmo que o documento HTML ainda não esteja finalizado, ou que outros scripts ainda estejam pendentes.

Isso é bom para funcionalidades que não dependem de nada, como contadores, anúncios, ouvintes de eventos em nível de documento.

<!-- all dependencies are fetched (analytics.js), and the script runs -->
<!-- doesn't wait for the document or other <script> tags -->
<script async type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>

Scripts externos
Os scripts externos que possuem type="module"são diferentes em dois aspectos:

1. Scripts externos com o mesmo srcrodam apenas uma vez:

<!-- the script my.js is fetched and executed only once -->
<script type="module" src="my.js"></script>
<script type="module" src="my.js"></script>

2. ripts externos que são buscados de outra origem (por exemplo, outro site) requerem cabeçalhos CORS , conforme descrito no capítulo Busca: Solicitações entre origens . Em outras palavras, se um script de módulo for obtido de outra origem, o servidor remoto deverá fornecer um cabeçalho Access-Control-Allow-Originque permita a busca.

<!-- another-site.com must supply Access-Control-Allow-Origin -->
<!-- otherwise, the script won't execute -->
<script type="module" src="http://another-site.com/their.js"></script>
Isso garante melhor segurança por padrão.

Não são permitidos módulos “vazios”
No navegador, importdeve obter um URL relativo ou absoluto. Módulos sem nenhum caminho são chamados de módulos “bare”. Esses módulos não são permitidos em arquivos import.

Por exemplo, isso importé inválido:

import {sayHi} from 'sayHi'; // Error, "bare" module
// the module must have a path, e.g. './sayHi.js' or wherever the module is
Certos ambientes, como Node.js ou ferramentas de pacote, permitem módulos simples, sem nenhum caminho, pois eles têm suas próprias maneiras de encontrar módulos e ganchos para ajustá-los. Mas os navegadores ainda não suportam módulos simples.

Compatibilidade, “nomodule”
Navegadores antigos não entendem type="module". Scripts de um tipo desconhecido são simplesmente ignorados. Para eles, é possível fornecer um fallback usando o nomoduleatributo:

<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>

ferramentas de construção
Na vida real, os módulos do navegador raramente são usados ​​em sua forma “bruta”. Normalmente, nós os agrupamos com uma ferramenta especial, como o Webpack , e os implantamos no servidor de produção.

Um dos benefícios de usar bundlers – eles dão mais controle sobre como os módulos são resolvidos, permitindo módulos simples e muito mais, como módulos CSS/HTML.

As ferramentas de compilação fazem o seguinte:

1. Pegue um módulo “principal”, aquele que se pretende colocar<script type="module"> em HTML.

2. Analise suas dependências: importações e depois importações de importações etc.

3. Crie um único arquivo com todos os módulos (ou vários arquivos, que podem ser ajustados), substituindo nativosimport chamadas nativas por funções do bundler, para que funcione. Tipos de módulos “especiais” como módulos HTML/CSS também são suportados.

4. No processo, outras transformações e otimizações podem ser aplicadas:
Código inacessível removido.
Exportações não utilizadas removidas (“tremor de árvore”).
Declarações específicas de desenvolvimento como consolee debuggerremovidas.
A sintaxe moderna e de ponta do JavaScript pode ser transformada em uma mais antiga com funcionalidade semelhante usando o Babel .
O arquivo resultante é reduzido (espaços removidos, variáveis ​​substituídas por nomes mais curtos, etc).

Se usarmos ferramentas de pacote, à medida que os scripts são agrupados em um único arquivo (ou alguns arquivos), import/exportas instruções dentro desses scripts são substituídas por funções especiais do bundler. Portanto, o script “empacotado” resultante não contém nenhum import/export, não requer type="module", e podemos colocá-lo em um script regular:

<!-- Assuming we got bundle.js from a tool like Webpack -->
<script src="bundle.js"></script>
Dito isto, os módulos nativos também são utilizáveis. Portanto, não usaremos o Webpack aqui: você pode configurá-lo mais tarde.

Resumo
Resumindo, os conceitos básicos são:

1. Um módulo é um arquivo. Para import/exportfuncionar, os navegadores precisam<script type="module"> . Os módulos têm várias diferenças:
Adiado por padrão.
Async funciona em scripts embutidos.
Para carregar scripts externos de outra origem (domínio/protocolo/porta), são necessários cabeçalhos CORS.
Scripts externos duplicados são ignorados.

2. Os módulos têm seu próprio escopo local de nível superior e funcionalidade de intercâmbio via import/export.

3. Módulos sempre use strict.

4. O código do módulo é executado apenas uma vez. As exportações são criadas uma vez e compartilhadas entre os importadores.

Quando usamos módulos, cada módulo implementa a funcionalidade e a exporta. Em seguida, usamos importpara importá-lo diretamente para onde é necessário. O navegador carrega e avalia os scripts automaticamente.

Na produção, as pessoas costumam usar empacotadores como o Webpack para agrupar módulos para desempenho e outros motivos.

No próximo capítulo veremos mais exemplos de módulos, e como as coisas podem ser exportadas/importadas.

*/

