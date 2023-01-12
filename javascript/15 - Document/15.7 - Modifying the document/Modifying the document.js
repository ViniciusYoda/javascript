/*

Modificando o documento
A modificação do DOM é a chave para criar páginas “ao vivo”.

Aqui veremos como criar novos elementos “on the fly” e modificar o conteúdo da página existente.

Exemplo: mostrar uma mensagem
Vamos demonstrar usando um exemplo. Adicionaremos uma mensagem na página que parecerá melhor do que alert.

Veja como ficará:

<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert">
  <strong>Hi there!</strong> You've read an important message.
</div>

Esse foi o exemplo de HTML. Agora vamos criar o mesmo divcom JavaScript (supondo que os estilos já estejam no HTML/CSS).

Criando um elemento
Para criar nós DOM, existem dois métodos:

document.createElement(tag)
Cria um novo nó de elemento com a tag fornecida:

let div = document.createElement('div');
document.createTextNode(text)
Cria um novo nó de texto com o texto fornecido:

let textNode = document.createTextNode('Here I am');
Na maioria das vezes, precisamos criar nós de elemento, como o divda mensagem.

Criando a mensagem
A criação da mensagem div leva 3 etapas:

// 1. Create <div> element
let div = document.createElement('div');

// 2. Set its class to "alert"
div.className = "alert";

// 3. Fill it with the content
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
Nós criamos o elemento. Mas a partir de agora está apenas em uma variável chamada div, não na página ainda. Então não podemos ver.

Métodos de inserção
Para fazer o divshow, precisamos inseri-lo em algum lugar no arquivo document. Por exemplo, no <body>elemento, referenciado por document.body.

Existe um método especial appendpara isso: document.body.append(div).

Aqui está o código completo:

<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

  document.body.append(div);
</script>
Aqui chamamos , mas podemos chamar o método appendem qualquer outro elemento, para colocar outro elemento nele. Por exemplo, podemos anexar algo chamando .document.bodyappend<div>div.append(anotherElement)

Aqui estão mais métodos de inserção, eles especificam lugares diferentes onde inserir:

node.append(...nodes or strings)– anexar nós ou strings no final de node,
node.prepend(...nodes or strings)– inserir nós ou strings no início de node,
node.before(...nodes or strings)–- inserir nós ou strings antes node de ,
node.after(...nodes or strings)–- inserir nós ou strings após node ,
node.replaceWith(...nodes or strings)–- substitui nodepelos nós ou strings fornecidos.
Os argumentos desses métodos são uma lista arbitrária de nós DOM a serem inseridos ou strings de texto (que se tornam nós de texto automaticamente).

Vamos vê-los em ação.

Aqui está um exemplo de como usar esses métodos para adicionar itens a uma lista e o texto antes/depois dela:

<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // insert string "before" before <ol>
  ol.after('after'); // insert string "after" after <ol>

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // insert liFirst at the beginning of <ol>

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // insert liLast at the end of <ol>
</script>

Aqui está uma imagem visual do que os métodos fazem:


Então a lista final será:

before
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
after
Como dito, esses métodos podem inserir vários nós e partes de texto em uma única chamada.

Por exemplo, aqui uma string e um elemento são inseridos:

<div id="div"></div>
<script>
  div.before('<p>Hello</p>', document.createElement('hr'));
</script>
Observação: o texto é inserido “como texto”, não “como HTML”, com o escape adequado de caracteres como <, >.

Portanto, o HTML final é:

&lt;p&gt;Hello&lt;/p&gt;
<hr>
<div id="div"></div>
Ou seja, as strings são inseridas de forma segura, como elem.textContentfaz.

Portanto, esses métodos só podem ser usados ​​para inserir nós DOM ou partes de texto.

Mas e se quisermos inserir uma string HTML “como html”, com todas as tags e outras coisas funcionando, da mesma maneira elem.innerHTMLque ele?

insertAdjacentHTML/Texto/Elemento
Para isso podemos usar outro método bem versátil: elem.insertAdjacentHTML(where, html).

O primeiro parâmetro é uma palavra de código, especificando onde inserir em relação a elem. Deve ser um dos seguintes:

"beforebegin"– inserir htmlimediatamente antes elemde ,
"afterbegin"– inserir htmlem elem, no início,
"beforeend"– inserir htmlem elem, no final,
"afterend"– inserir htmlimediatamente após elem.
O segundo parâmetro é uma string HTML, que é inserida “como HTML”.

Por exemplo:

<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
  div.insertAdjacentHTML('afterend', '<p>Bye</p>');
</script>
… Levaria a:

<p>Hello</p>
<div id="div"></div>
<p>Bye</p>
É assim que podemos anexar HTML arbitrário à página.

Aqui está a imagem das variantes de inserção:


Podemos facilmente notar semelhanças entre esta e a imagem anterior. Os pontos de inserção são realmente os mesmos, mas esse método insere HTML.

O método tem dois irmãos:

elem.insertAdjacentText(where, text)– a mesma sintaxe, mas uma string de texté inserida “como texto” em vez de HTML,
elem.insertAdjacentElement(where, elem)– a mesma sintaxe, mas insere um elemento.
Eles existem principalmente para tornar a sintaxe “uniforme”. Na prática, apenas insertAdjacentHTMLé usado na maioria das vezes. Porque para elementos e texto, temos métodos append/prepend/before/after– eles são mais curtos para escrever e podem inserir nós/pedaços de texto.

Então aqui está uma variante alternativa de mostrar uma mensagem:

<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>Hi there!</strong> You've read an important message.
  </div>`);
</script>
Remoção de nós
Para remover um nó, existe um método node.remove().

Vamos fazer nossa mensagem desaparecer após um segundo:

<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

  document.body.append(div);
  setTimeout(() => div.remove(), 1000);
</script>
Observação: se quisermos mover um elemento para outro local – não há necessidade de removê-lo do antigo.

Todos os métodos de inserção removem automaticamente o nó do local antigo.

Por exemplo, vamos trocar elementos:

<div id="first">First</div>
<div id="second">Second</div>
<script>
  // no need to call remove
  second.after(first); // take #second and after it insert #first
</script>
Nós de clonagem: cloneNode
Como inserir mais uma mensagem semelhante?

Poderíamos fazer uma função e colocar o código lá. Mas a forma alternativa seria clonar o existente dive modificar o texto dentro dele (se necessário).

Às vezes, quando temos um grande elemento, isso pode ser mais rápido e simples.

A chamada elem.cloneNode(true)cria um clone “profundo” do elemento – com todos os atributos e subelementos. Se chamarmos elem.cloneNode(false), o clone será feito sem elementos filhos.
Um exemplo de cópia da mensagem:

<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert" id="div">
  <strong>Hi there!</strong> You've read an important message.
</div>

<script>
  let div2 = div.cloneNode(true); // clone the message
  div2.querySelector('strong').innerHTML = 'Bye there!'; // change the clone

  div.after(div2); // show the clone after the existing div
</script>
DocumentFragment
DocumentFragmenté um nó DOM especial que serve como um wrapper para passar listas de nós.

Podemos anexar outros nós a ele, mas quando o inserimos em algum lugar, seu conteúdo é inserido.

Por exemplo, getListContentabaixo gera um fragmento com <li>itens, que posteriormente são inseridos em <ul>:

<ul id="ul"></ul>

<script>
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

ul.append(getListContent()); // (*)
</script>
Observe que na última linha (*)acrescentamos DocumentFragment, mas ele “se mistura”, então a estrutura resultante será:

<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
DocumentFragmentraramente é usado explicitamente. Por que anexar a um tipo especial de nó, se podemos retornar uma matriz de nós? Exemplo reescrito:

<ul id="ul"></ul>

<script>
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

ul.append(...getListContent()); // append + "..." operator = friends!
</script>
Mencionamos DocumentFragmentprincipalmente porque existem alguns conceitos em cima dele, como elemento de modelo , que abordaremos muito mais tarde.

Métodos antigos de inserir/remover
Moda antiga
Essas informações ajudam a entender scripts antigos, mas não são necessárias para novos desenvolvimentos.
Existem também métodos de manipulação de DOM da “velha escola”, existentes por razões históricas.

Esses métodos vêm de tempos muito antigos. Hoje em dia, não há razão para usá-los, pois métodos modernos, como append, prepend, before, after, remove, replaceWith, são mais flexíveis.

A única razão pela qual listamos esses métodos aqui é que você pode encontrá-los em muitos scripts antigos:

parentElem.appendChild(node)
Acrescenta nodecomo o último filho de parentElem.

O exemplo a seguir adiciona um novo <li>ao final de <ol>:

<ol id="list">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  let newLi = document.createElement('li');
  newLi.innerHTML = 'Hello, world!';

  list.appendChild(newLi);
</script>
parentElem.insertBefore(node, nextSibling)
Insere nodeantes nextSiblingem parentElem.

O código a seguir insere um novo item de lista antes do segundo <li>:

<ol id="list">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>
<script>
  let newLi = document.createElement('li');
  newLi.innerHTML = 'Hello, world!';

  list.insertBefore(newLi, list.children[1]);
</script>
Para inserir newLicomo primeiro elemento, podemos fazer assim:

list.insertBefore(newLi, list.firstChild);
parentElem.replaceChild(node, oldChild)
Substitui oldChildpor nodeentre filhos de parentElem.

parentElem.removeChild(node)
Remove nodede parentElem(supondo que nodeseja seu filho).

O exemplo a seguir remove primeiro <li>de <ol>:

<ol id="list">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  let li = list.firstElementChild;
  list.removeChild(li);
</script>
Todos esses métodos retornam o nó inserido/removido. Em outras palavras, parentElem.appendChild(node)retorna node. Mas normalmente o valor retornado não é utilizado, apenas executamos o método.

Uma palavra sobre “document.write”
Existe mais um método muito antigo de adicionar algo a uma página da web: document.write.

A sintaxe:

<p>Somewhere in the page...</p>
<script>
  document.write('<b>Hello from JS</b>');
</script>
<p>The end</p>
A chamada para document.write(html)escreve htmlna página “aqui e agora”. A htmlstring pode ser gerada dinamicamente, por isso é meio flexível. Podemos usar JavaScript para criar uma página da Web completa e escrevê-la.

O método vem de tempos em que não havia DOM, não havia padrões... Realmente velhos tempos. Ele ainda vive, porque existem scripts que o utilizam.

Em scripts modernos, raramente podemos vê-lo, devido à seguinte limitação importante:

A chamada para document.writesó funciona enquanto a página está carregando.

Se o chamarmos posteriormente, o conteúdo do documento existente será apagado.

Por exemplo:

<p>After one second the contents of this page will be replaced...</p>
<script>
  // document.write after 1 second
  // that's after the page loaded, so it erases the existing content
  setTimeout(() => document.write('<b>...By this.</b>'), 1000);
</script>
Portanto, é meio inutilizável no estágio “depois de carregado”, ao contrário de outros métodos DOM que abordamos acima.

Essa é a desvantagem.

Há uma vantagem também. Tecnicamente, quando document.writeé chamado enquanto o navegador está lendo (“analisando”) HTML de entrada e escreve algo, o navegador o consome como se estivesse inicialmente lá, no texto HTML.

Portanto, funciona incrivelmente rápido, porque não há nenhuma modificação de DOM envolvida. Ele grava diretamente no texto da página, enquanto o DOM ainda não foi criado.

Portanto, se precisarmos adicionar muito texto ao HTML dinamicamente, e estivermos na fase de carregamento da página, e a velocidade for importante, isso pode ajudar. Mas, na prática, esses requisitos raramente vêm juntos. E geralmente podemos ver esse método em scripts apenas porque são antigos.

Resumo
Métodos para criar novos nós:

document.createElement(tag)– cria um elemento com a tag dada,
document.createTextNode(value)– cria um nó de texto (raramente usado),
elem.cloneNode(deep)– clona o elemento, se deep==trueentão com todos os descendentes.
Inserção e remoção:

node.append(...nodes or strings)– inserir em node, no final,
node.prepend(...nodes or strings)– inserir em node, no início,
node.before(...nodes or strings)–- inserir logo antes nodede ,
node.after(...nodes or strings)–- inserir logo após node,
node.replaceWith(...nodes or strings)–- substitua node.
node.remove()–- remova o arquivo node.
Strings de texto são inseridas “como texto”.

Existem também métodos da “velha escola”:

parent.appendChild(node)
parent.insertBefore(node, nextSibling)
parent.removeChild(node)
parent.replaceChild(newElem, node)
Todos esses métodos retornam node.

Dado algum HTML em html, elem.insertAdjacentHTML(where, html)o insere dependendo do valor de where:

"beforebegin"– inserir htmllogo antes elemde ,
"afterbegin"– inserir htmlem elem, no início,
"beforeend"– inserir htmlem elem, no final,
"afterend"– inserir htmllogo após elem.
Também existem métodos semelhantes, elem.insertAdjacentTexte elem.insertAdjacentElement, que inserem strings e elementos de texto, mas raramente são usados.

Para anexar HTML à página antes que ela termine de carregar:

document.write(html)
Depois que a página é carregada, essa chamada apaga o documento. Principalmente visto em scripts antigos.

*/


