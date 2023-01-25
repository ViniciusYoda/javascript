/*

Propriedades e métodos de formulário
Formulários e elementos de controle, como <input>têm muitas propriedades e eventos especiais.

Trabalhar com formulários será muito mais conveniente quando os aprendermos.

Navegação: forma e elementos
Os formulários de documentos são membros da coleção especial document.forms.

Essa é a chamada “coleção nomeada” : ela é nomeada e ordenada. Podemos usar o nome ou o número no documento para obter o formulário.

document.forms.my; // the form with name="my"
document.forms[0]; // the first form in the document
Quando temos um formulário, qualquer elemento está disponível na coleção nomeada form.elements.

Por exemplo:

<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // get the form
  let form = document.forms.my; // <form name="my"> element

  // get the element
  let elem = form.elements.one; // <input name="one"> element

  alert(elem.value); // 1
</script>
Pode haver vários elementos com o mesmo nome. Isso é típico com botões de opção e caixas de seleção.

Nesse caso, form.elements[name]é uma coleção . Por exemplo:

<form>
  <input type="radio" name="age" value="10">
  <input type="radio" name="age" value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

alert(ageElems[0]); // [object HTMLInputElement]
</script>
Essas propriedades de navegação não dependem da estrutura da tag. Todos os elementos de controle, não importa quão profundos estejam no formulário, estão disponíveis em formato form.elements.

Fieldsets como “subformulários”
Um formulário pode ter um ou vários <fieldset>elementos dentro dele. Eles também têm elementspropriedades que listam os controles de formulário dentro deles.

Por exemplo:

<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

    // we can get the input by name both from the form and from the fieldset
    alert(fieldset.elements.login == form.elements.login); // true
  </script>
</body>
Notação mais curta:form.name
Existe uma notação mais curta: podemos acessar o elemento como form[index/name].

Em outras palavras, em vez de form.elements.loginpodemos escrever form.login.

Isso também funciona, mas há um problema menor: se acessarmos um elemento e depois alterarmos seu name, ele ainda estará disponível com o nome antigo (assim como com o novo).

Isso é fácil de ver em um exemplo:

<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true, the same <input>

  form.login.name = "username"; // change the name of the input

  // form.elements updated the name:
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input

  // form allows both names: the new one and the old one
  alert(form.username == form.login); // true
</script>
Isso geralmente não é um problema, no entanto, porque raramente alteramos nomes de elementos de formulário.

Referência anterior: elemento.form
Para qualquer elemento, o formulário está disponível como element.form. Portanto, um formulário faz referência a todos os elementos e os elementos fazem referência ao formulário.

Aqui está a foto:


Por exemplo:

<form id="form">
  <input type="text" name="login">
</form>

<script>
  // form -> element
  let login = form.login;

  // element -> form
  alert(login.form); // HTMLFormElement
</script>
Elementos de formulário
Vamos falar sobre controles de formulário.

entrada e área de texto
Podemos acessar seu valor como input.value(string) ou input.checked(booleano) para caixas de seleção e botões de opção.

Como isso:

input.value = "New value";
textarea.value = "New text";

input.checked = true; // for a checkbox or radio button
usar textarea.value, nãotextarea.innerHTML
Observe que, embora <textarea>...</textarea>mantenha seu valor como HTML aninhado, nunca devemos usá textarea.innerHTML-lo para acessá-lo.

Ele armazena apenas o HTML que estava inicialmente na página, não o valor atual.

selecione e opção
Um <select>elemento tem 3 propriedades importantes:

select.options– a coleção de <option>subelementos,
select.value– o valor do atualmente selecionado <option>,
select.selectedIndex– o número do atualmente selecionado <option>.
Eles fornecem três maneiras diferentes de definir um valor para a <select>:

Encontre o <option>elemento correspondente (por exemplo, entre select.options) e defina-o option.selectedcomo true.
Se conhecermos um novo valor: defina select.valuepara o novo valor.
Se soubermos o novo número de opção: defina select.selectedIndexpara esse número.
Aqui está um exemplo de todos os três métodos:

<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // all three lines do the same thing
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
  // please note: options start from zero, so index 2 means the 3rd option.
</script>
Ao contrário da maioria dos outros controles, <select>permite selecionar várias opções de uma só vez se tiver multipleatributo. Este atributo raramente é usado, no entanto.

Para vários valores selecionados, use a primeira forma de definir valores: adicionar/remover a selectedpropriedade dos <option>subelementos.

Aqui está um exemplo de como obter valores selecionados de uma seleção múltipla:

<select id="select" multiple>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // get all selected values from multi-select
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock
</script>
A especificação completa do <select>elemento está disponível na especificação https://html.spec.whatwg.org/multipage/forms.html#the-select-element .

nova opção
Na especificação , há uma sintaxe curta e agradável para criar um <option>elemento:

option = new Option(text, value, defaultSelected, selected);
Essa sintaxe é opcional. Podemos usar document.createElement('option')e definir atributos manualmente. Ainda assim, pode ser mais curto, então aqui estão os parâmetros:

text– o texto dentro da opção,
value– o valor da opção,
defaultSelected– se true, então selectedo atributo HTML é criado,
selected– se true, então a opção está selecionada.
A diferença entre defaultSelectede selectedé que defaultSelecteddefine o atributo HTML (que podemos obter usando option.getAttribute('selected'), while selecteddefine se a opção está selecionada ou não.

Na prática, geralmente deve-se definir ambos os valores para trueou false. (Ou simplesmente omita-os; ambos são padronizados como false.)

Por exemplo, aqui está uma nova opção “desmarcada”:

let option = new Option("Text", "value");
// creates <option value="value">Text</option>
A mesma opção, mas selecionada:

let option = new Option("Text", "value", true, true);
Os elementos de opção têm propriedades:

option.selected
A opção está selecionada.
option.index
O número da opção entre as demais em seu arquivo <select>.
option.text
Conteúdo de texto da opção (visto pelo visitante).
Referências
Especificação: https://html.spec.whatwg.org/multipage/forms.html .
Resumo
Navegação do formulário:

document.forms
Um formulário está disponível como document.forms[name/index].
form.elements
Os elementos de formulário estão disponíveis como form.elements[name/index], ou podem ser usados ​​apenas form[name/index]. A elementspropriedade também funciona para <fieldset>.
element.form
Os elementos fazem referência à sua forma na formpropriedade.
O valor está disponível como input.value, textarea.value, select.value, etc. (Para caixas de seleção e botões de opção, use input.checkedpara determinar se um valor está selecionado.)

Para <select>, também se pode obter o valor pelo índice select.selectedIndexou pela coleção de opções select.options.

Estes são os princípios básicos para começar a trabalhar com formulários. Encontraremos muitos exemplos mais adiante no tutorial.

focusNo próximo capítulo , abordaremos blureventos que podem ocorrer em qualquer elemento, mas são tratados principalmente em formulários.

*/