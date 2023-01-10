/*

Pesquisando: getElement*, querySelector*
As propriedades de navegação do DOM são ótimas quando os elementos estão próximos uns dos outros. E se não forem? Como obter um elemento arbitrário da página?

Existem métodos de pesquisa adicionais para isso.

document.getElementById ou apenas id
Se um elemento tiver o idatributo, podemos obter o elemento usando o método document.getElementById(id), não importa onde ele esteja.

Por exemplo:

<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // get the element
  let elem = document.getElementById('elem');

  // make its background red
  elem.style.background = 'red';
</script>
Além disso, há uma variável global nomeada por idque faz referência ao elemento:

<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // elem is a reference to DOM-element with id="elem"
  elem.style.background = 'red';

  // id="elem-content" has a hyphen inside, so it can't be a variable name
  // ...but we can access it using square brackets: window['elem-content']
</script>
…A menos que declaremos uma variável JavaScript com o mesmo nome, ela terá precedência:

<div id="elem"></div>

<script>
  let elem = 5; // now elem is 5, not a reference to <div id="elem">

  alert(elem); // 5
</script>
Por favor, não use variáveis ​​globais com nome de id para acessar elementos
Esse comportamento é descrito na especificação , mas é suportado principalmente para fins de compatibilidade.

O navegador tenta nos ajudar misturando namespaces de JS e DOM. Isso é bom para scripts simples, embutidos em HTML, mas geralmente não é uma coisa boa. Pode haver conflitos de nomenclatura. Além disso, quando alguém lê o código JS e não tem HTML em exibição, não é óbvio de onde vem a variável.

Aqui no tutorial usamos idpara referenciar diretamente um elemento para brevidade, quando é óbvio de onde vem o elemento.

Na vida real document.getElementByIdé o método preferido.

O iddeve ser único
O iddeve ser único. Pode haver apenas um elemento no documento com o dado id.

Se houver vários elementos com o mesmo id, o comportamento dos métodos que o utilizam é ​​imprevisível, por exemplo, document.getElementByIdpode retornar qualquer um desses elementos aleatoriamente. Portanto, siga a regra e mantenha-se idexclusivo.

Só document.getElementById, nãoanyElem.getElementById
O método getElementByIdpode ser chamado apenas no documentobjeto. Procura o dado idem todo o documento.

querySelectorAll
De longe, o método mais versátil, elem.querySelectorAll(css)retorna todos os elementos elemcorrespondentes ao seletor CSS fornecido.

Aqui procuramos todos os <li>elementos que são últimos filhos:

<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
  let elements = document.querySelectorAll('ul > li:last-child');

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
Este método é realmente poderoso, porque qualquer seletor CSS pode ser usado.

Pode usar pseudo-classes também
Pseudoclasses no seletor CSS como :hovere :activetambém são suportadas. Por exemplo, document.querySelectorAll(':hover')retornará a coleção com os elementos sobre os quais o ponteiro está agora (em ordem de aninhamento: do mais externo <html>ao mais aninhado).

querySelector
A chamada para elem.querySelector(css)retorna o primeiro elemento para o seletor CSS fornecido.

Em outras palavras, o resultado é o mesmo que elem.querySelectorAll(css)[0], mas o último está procurando por todos os elementos e escolhendo um, enquanto elem.querySelectorapenas procura por um. Portanto, é mais rápido e também mais curto para escrever.

partidas
Os métodos anteriores pesquisavam o DOM.

O elem.matches(css) não procura por nada, apenas verifica se elemcorresponde ao seletor de CSS fornecido. Ele retorna trueou false.

O método é útil quando estamos iterando sobre elementos (como em uma matriz ou algo assim) e tentando filtrar aqueles que nos interessam.

Por exemplo:

<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // can be any collection instead of document.body.children
  for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
      alert("The archive reference: " + elem.href );
    }
  }
</script>
mais próximo
Os ancestrais de um elemento são: pai, o pai do pai, seu pai e assim por diante. Os ancestrais juntos formam a cadeia de pais desde o elemento até o topo.

O método elem.closest(css)procura o ancestral mais próximo que corresponda ao seletor CSS. O elempróprio também é incluído na pesquisa.

Em outras palavras, o método closestsobe do elemento e verifica cada um dos pais. Se corresponder ao seletor, a pesquisa será interrompida e o ancestral será retornado.

Por exemplo:

<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 2</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (because h1 is not an ancestor)
</script>
getElementsBy*
Existem também outros métodos para procurar nós por uma tag, classe, etc.

Hoje, eles são principalmente história, pois querySelectoré mais poderoso e mais curto para escrever.

Então, aqui nós os cobrimos principalmente para completude, enquanto você ainda pode encontrá-los nos scripts antigos.

elem.getElementsByTagName(tag)procura por elementos com a tag dada e retorna a coleção deles. O tagparâmetro também pode ser uma estrela "*"para “qualquer tag”.
elem.getElementsByClassName(className)retorna elementos que possuem a classe CSS fornecida.
document.getElementsByName(name)retorna elementos com o nameatributo fornecido, em todo o documento. Muito raramente usado.
Por exemplo:

// get all divs in the document
let divs = document.getElementsByTagName('div');
Vamos encontrar todas as inputtags dentro da tabela:

<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
  let inputs = table.getElementsByTagName('input');

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
Não se esqueça da "s"carta!
Os desenvolvedores novatos às vezes esquecem a carta "s". Ou seja, eles tentam ligar getElementByTagNameem vez de .getElementsByTagName

A "s"letra está ausente em getElementById, pois retorna um único elemento. Mas getElementsByTagNameretorna uma coleção de elementos, então tem "s"dentro.

Ele retorna uma coleção, não um elemento!
Outro erro comum entre iniciantes é escrever:

// doesn't work
document.getElementsByTagName('input').value = 5;
Isso não funcionará, porque ele pega uma coleção de entradas e atribui o valor a ela, em vez de aos elementos dentro dela.

Devemos iterar sobre a coleção ou obter um elemento por seu índice e, em seguida, atribuir, assim:

// should work (if there's an input)
document.getElementsByTagName('input')[0].value = 5;
Procurando por .articleelementos:

<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // find by name attribute
  let form = document.getElementsByName('my-form')[0];

  // find by class inside the form
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, found two elements with class "article"
</script>
Coleções ao vivo
Todos os métodos "getElementsBy*"retornam uma coleção ativa . Essas coleções sempre refletem o estado atual do documento e são “atualizadas automaticamente” quando ele é alterado.

No exemplo abaixo, há dois scripts.

1. O primeiro cria uma referência à coleção de arquivos <div>. A partir de agora, seu comprimento é 1.
2. O segundo script é executado depois que o navegador encontra mais um <div>, então seu comprimento é 2.

<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  alert(divs.length); // 2
</script>
Em contraste, querySelectorAllretorna uma coleção estática . É como uma matriz fixa de elementos.

Se o usarmos, ambos os scripts produzirão 1:

<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  alert(divs.length); // 1
</script>
Agora podemos facilmente ver a diferença. A coleção estática não aumentou após o aparecimento de um novo divno documento.

Resumo
Existem 6 métodos principais para procurar nós no DOM:

Método	Pesquisas por...	Pode chamar um elemento?	Viver?
querySelector	seletor de CSS	✔	-
querySelectorAll	seletor de CSS	✔	-
getElementById	id	-	-
getElementsByName	name	-	✔
getElementsByTagName	marcar ou'*'	✔	✔
getElementsByClassName	classe	✔	✔
De longe, os mais usados ​​são querySelectore querySelectorAll, mas getElement(s)By*podem ser esporadicamente úteis ou encontrados em scripts antigos.

Além disso:

Há elem.matches(css)para verificar se elemcorresponde ao seletor CSS fornecido.
É elem.closest(css)necessário procurar o ancestral mais próximo que corresponda ao seletor CSS fornecido. O elempróprio também é verificado.
E vamos mencionar mais um método aqui para verificar o relacionamento pai-filho, pois às vezes é útil:

elemA.contains(elemB)retorna verdadeiro se elemBestiver dentro elemA(um descendente de elemA) ou quando elemA==elemB.

*/

