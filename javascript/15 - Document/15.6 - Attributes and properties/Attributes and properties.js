/*

Atributos e propriedades
Quando o navegador carrega a página, ele “lê” (outra palavra: “analisa”) o HTML e gera objetos DOM a partir dele. Para nós de elemento, a maioria dos atributos HTML padrão tornam-se automaticamente propriedades de objetos DOM.

Por exemplo, se a tag for <body id="page">, o objeto DOM terá body.id="page".

Mas o mapeamento atributo-propriedade não é um-para-um! Neste capítulo vamos prestar atenção para separar essas duas noções, para ver como trabalhar com elas, quando são iguais e quando são diferentes.

propriedades DOM
Já vimos propriedades internas do DOM. Há um monte. Mas tecnicamente ninguém nos limita e, se não houver o suficiente, podemos adicionar os nossos.

Os nós DOM são objetos JavaScript regulares. Podemos alterá-los.

Por exemplo, vamos criar uma nova propriedade em document.body:

document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
Podemos adicionar um método também:

document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (the value of "this" in the method is document.body)
Também podemos modificar protótipos integrados Element.prototypee adicionar novos métodos a todos os elementos:

Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
Portanto, as propriedades e os métodos do DOM se comportam exatamente como os objetos regulares do JavaScript:

Eles podem ter qualquer valor.
Eles diferenciam maiúsculas de minúsculas (write elem.nodeType, não elem.NoDeTyPe).
Atributos HTML
Em HTML, as tags podem ter atributos. Quando o navegador analisa o HTML para criar objetos DOM para tags, ele reconhece atributos padrão e cria propriedades DOM a partir deles.

Portanto, quando um elemento possui idou outro atributo padrão , a propriedade correspondente é criada. Mas isso não acontece se o atributo não for padrão.

Por exemplo:

<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
    // non-standard attribute does not yield a property
    alert(document.body.something); // undefined
  </script>
</body>
Observe que um atributo padrão para um elemento pode ser desconhecido para outro. Por exemplo, "type"é padrão para <input>( HTMLInputElement ), mas não para <body>( HTMLBodyElement ). Os atributos padrão são descritos na especificação para a classe de elemento correspondente.

Aqui podemos vê-lo:

<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
    alert(body.type); // undefined: DOM property not created, because it's non-standard
  </script>
</body>
Portanto, se um atributo não for padrão, não haverá uma propriedade DOM para ele. Existe uma maneira de acessar esses atributos?

Certo. Todos os atributos são acessíveis usando os seguintes métodos:

elem.hasAttribute(name)– verifica a existência.
elem.getAttribute(name)– obtém o valor.
elem.setAttribute(name, value)– define o valor.
elem.removeAttribute(name)– remove o atributo.
Esses métodos operam exatamente com o que está escrito em HTML.

Também é possível ler todos os atributos usando elem.attributes: uma coleção de objetos que pertencem a uma classe Atr internaname , com propriedades e value.

Aqui está uma demonstração da leitura de uma propriedade não padrão:

<body something="non-standard">
  <script>
    alert(document.body.getAttribute('something')); // non-standard
  </script>
</body>
Os atributos HTML têm os seguintes recursos:

Seu nome não diferencia maiúsculas de minúsculas ( idé o mesmo que ID).
Seus valores são sempre strings.
Aqui está uma demonstração estendida de como trabalhar com atributos:

<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', reading

    elem.setAttribute('Test', 123); // (2), writing

    alert( elem.outerHTML ); // (3), see if the attribute is in HTML (yes)

    for (let attr of elem.attributes) { // (4) list all
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>

Observe

1.getAttribute('About')– a primeira letra é maiúscula aqui, e em HTML é toda minúscula. Mas isso não importa: os nomes dos atributos não diferenciam maiúsculas de minúsculas.
2.Podemos atribuir qualquer coisa a um atributo, mas ele se torna uma string. Então aqui temos "123"como o valor.
3.Todos os atributos, incluindo aqueles que definimos, são visíveis em outerHTML.
4.A attributescoleção é iterável e possui todos os atributos do elemento (padrão e não padrão) como objetos com namee valuepropriedades.

Sincronização de atributo de propriedade
Quando um atributo padrão é alterado, a propriedade correspondente é atualizada automaticamente e (com algumas exceções) vice-versa.

No exemplo abaixo idé modificado como um atributo, e podemos ver a propriedade alterada também. E então o mesmo para trás:

<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('id', 'id');
  alert(input.id); // id (updated)

  // property => attribute
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (updated)
</script>
Mas há exclusões, por exemplo, input.valuesincroniza apenas do atributo → propriedade, mas não de volta:

<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('value', 'text');
  alert(input.value); // text

  // NOT property => attribute
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (not updated!)
</script>
No exemplo acima:

Alterar o atributo valueatualiza a propriedade.
Mas a mudança de propriedade não afeta o atributo.
Esse “recurso” pode até ser útil, pois as ações do usuário podem levar a valuealterações, e depois delas, se quisermos recuperar o valor “original” do HTML, está no atributo.

As propriedades do DOM são digitadas
As propriedades DOM nem sempre são strings. Por exemplo, a input.checkedpropriedade (para caixas de seleção) é um booleano:

<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // the attribute value is: empty string
  alert(input.checked); // the property value is: true
</script>
Existem outros exemplos. O styleatributo é uma string, mas a stylepropriedade é um objeto:

<div id="div" style="color:red;font-size:120%">Hello</div>

<script>
  // string
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // object
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
A maioria das propriedades são strings.

Muito raramente, mesmo que um tipo de propriedade DOM seja uma string, ela pode diferir do atributo. Por exemplo, a hrefpropriedade DOM é sempre uma URL completa , mesmo que o atributo contenha uma URL relativa ou apenas um arquivo #hash.

Aqui está um exemplo:

<a id="a" href="#hello">link</a>
<script>
  // attribute
  alert(a.getAttribute('href')); // #hello

  // property
  alert(a.href ); // full URL in the form http://site.com/page#hello
</script>
Se precisarmos do valor de hrefou qualquer outro atributo exatamente como escrito no HTML, podemos usar getAttribute.

Atributos não padrão, conjunto de dados
Ao escrever HTML, usamos muitos atributos padrão. Mas e os não padronizados e personalizados? Primeiro, vamos ver se eles são úteis ou não? Pelo que?

Às vezes, atributos não padrão são usados ​​para passar dados personalizados de HTML para JavaScript ou para “marcar” elementos HTML para JavaScript.

Como isso:

<!-- mark the div to show "name" here -->
<div show-info="name"></div>
<!-- and age here -->
<div show-info="age"></div>

<script>
  // the code finds an element with the mark and shows what's requested
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // insert the corresponding info into the field
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // first Pete into "name", then 25 into "age"
  }
</script>
Também podem ser usados ​​para estilizar um elemento.

Por exemplo, aqui para o estado do pedido, o atributo order-stateé usado:

<style>
  /* styles rely on the custom attribute "order-state" */ /*
  .order[order-state="new"] {
   color: green;
 }

 .order[order-state="pending"] {
   color: blue;
 }

 .order[order-state="canceled"] {
   color: red;
 }
</style>

<div class="order" order-state="new">
 A new order.
</div>

<div class="order" order-state="pending">
 A pending order.
</div>

<div class="order" order-state="canceled">
 A canceled order.
</div>
Por que usar um atributo seria preferível a ter classes como .order-state-new, .order-state-pending, .order-state-canceled?

Porque um atributo é mais conveniente de gerenciar. O estado pode ser alterado tão fácil quanto:

// a bit simpler than removing old/adding a new class
div.setAttribute('order-state', 'canceled');
Mas pode haver um possível problema com atributos personalizados. E se usarmos um atributo não padrão para nossos propósitos e mais tarde o padrão o introduzir e o obrigar a fazer algo? A linguagem HTML está viva, cresce e mais atributos aparecem para atender às necessidades dos desenvolvedores. Pode haver efeitos inesperados em tal caso.

Para evitar conflitos, existem atributos data-* .

Todos os atributos que começam com “data-” são reservados para uso dos programadores. Eles estão disponíveis na datasetpropriedade.

Por exemplo, se an elemtiver um atributo chamado "data-about", ele estará disponível como elem.dataset.about.

Como isso:

<body data-about="Elephants">
<script>
 alert(document.body.dataset.about); // Elephants
</script>
Atributos de várias palavras como data-order-statetornar-se camel-case: dataset.orderState.

Aqui está um exemplo de “estado de pedido” reescrito:

<style>
 .order[data-order-state="new"] {
   color: green;
 }

 .order[data-order-state="pending"] {
   color: blue;
 }

 .order[data-order-state="canceled"] {
   color: red;
 }
</style>

<div id="order" class="order" data-order-state="new">
 A new order.
</div>

<script>
 // read
 alert(order.dataset.orderState); // new

 // modify
 order.dataset.orderState = "pending"; // (*)
</script>
O uso data-*de atributos é uma maneira válida e segura de transmitir dados personalizados.

Observe que não podemos apenas ler, mas também modificar atributos de dados. Em seguida, o CSS atualiza a exibição de acordo: no exemplo acima, a última linha (*)muda a cor para azul.

Resumo
Atributos – é o que está escrito em HTML.
Propriedades – é o que está nos objetos DOM.
Uma pequena comparação:

Propriedades	Atributos
Tipo	Qualquer valor, as propriedades padrão têm tipos descritos na especificação	Uma linha
Nome	O nome diferencia maiúsculas de minúsculas	O nome não diferencia maiúsculas de minúsculas
Os métodos para trabalhar com atributos são:

elem.hasAttribute(name)– para verificar a existência.
elem.getAttribute(name)– para obter o valor.
elem.setAttribute(name, value)– para definir o valor.
elem.removeAttribute(name)– para remover o atributo.
elem.attributesé uma coleção de todos os atributos.
Para a maioria das situações, é preferível usar propriedades DOM. Devemos nos referir a atributos apenas quando as propriedades DOM não nos convém, quando precisamos exatamente de atributos, por exemplo:

Precisamos de um atributo não padrão. Mas se começar comdata- , então devemos usar dataset.
Queremos ler o valor “como escrito” em HTML. O valor da propriedade DOM pode ser diferente, por exemplo, a hrefpropriedade é sempre uma URL completa e podemos querer obter o valor “original”.

*/