/*

delegação do evento
A captura e o bubbling nos permitem implementar um dos padrões de manipulação de eventos mais poderosos, chamado delegação de eventos .

A ideia é que, se tivermos muitos elementos manipulados de maneira semelhante, em vez de atribuir um manipulador a cada um deles, colocamos um único manipulador em seu ancestral comum.

No manipulador, podemos event.targetver onde o evento realmente aconteceu e manipulá-lo.

Vejamos um exemplo – o diagrama Ba-Gua refletindo a antiga filosofia chinesa.

Aqui está:


O HTML é assim:

<table>
  <tr>
    <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
  </tr>
  <tr>
    <td class="nw"><strong>Northwest</strong><br>Metal<br>Silver<br>Elders</td>
    <td class="n">...</td>
    <td class="ne">...</td>
  </tr>
  <tr>...2 more lines of this kind...</tr>
  <tr>...2 more lines of this kind...</tr>
</table>
A tabela tem 9 células, mas pode ser 99 ou 9999, tanto faz.

Nossa tarefa é destacar uma célula <td>ao clicar.

Em vez de atribuir um onclickmanipulador para cada um <td>(pode ser muitos) – vamos configurar o manipulador “pega-tudo” no <table>elemento.

Ele usará event.targetpara obter o elemento clicado e destacá-lo.

O código:

let selectedTd;

table.onclick = function(event) {
  let target = event.target; // where was the click?

  if (target.tagName != 'TD') return; // not on TD? Then we're not interested

  highlight(target); // highlight it
};

function highlight(td) {
  if (selectedTd) { // remove the existing highlight if any
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // highlight the new td
}
Esse código não se importa com quantas células existem na tabela. Podemos adicionar/remover <td>dinamicamente a qualquer momento e o realce ainda funcionará.

Ainda assim, há uma desvantagem.

O clique pode ocorrer não no <td>, mas dentro dele.

No nosso caso, se dermos uma olhada dentro do HTML, podemos ver tags aninhadas dentro <td>de , como <strong>:

<td>
  <strong>Northwest</strong>
  ...
</td>
Naturalmente, se um clique acontecer <strong>, ele se tornará o valor de event.target.


No handler table.onclickdevemos pegar tal event.targete descobrir se o click foi dentro <td>ou não.

Aqui está o código melhorado:

table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};
Explicações:

O método elem.closest(selector)retorna o ancestral mais próximo que corresponde ao seletor. No nosso caso, procuramos <td>no caminho para cima do elemento de origem.
Se event.targetnão estiver dentro de nenhum <td>, a chamada retornará imediatamente, pois não há nada a fazer.
No caso de tabelas aninhadas, event.targetpode ser um <td>, mas fora da tabela atual. Portanto, verificamos se esse é realmente o arquivo <td> .
E, se for assim, então destaque-o.
Como resultado, temos um código de realce rápido e eficiente, que não se importa com o número total de <td>na tabela.

Exemplo de delegação: ações na marcação
Existem outros usos para a delegação de eventos.

Digamos que queremos fazer um menu com os botões “Salvar”, “Carregar”, “Pesquisar” e assim por diante. E há um objeto com métodos save, load, search… Como combiná-los?

A primeira ideia pode ser atribuir um manipulador separado para cada botão. Mas há uma solução mais elegante. Podemos adicionar um handler para todo o menu e data-actionatributos para os botões que possuem o método a ser chamado:

<button data-action="save">Click to Save</button>
O manipulador lê o atributo e executa o método. Dê uma olhada no exemplo de trabalho:

<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('saving');
    }

    load() {
      alert('loading');
    }

    search() {
      alert('searching');
    }

    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
    };
  }

  new Menu(menu);
</script>

Por favor, note que this.onClickestá vinculado thisem (*). Isso é importante porque, caso contrário this, dentro dele faria referência ao elemento DOM ( elem), não ao Menuobjeto, e this[action]não seria o que precisamos.

Então, quais vantagens a delegação nos dá aqui?

Não precisamos escrever o código para atribuir um manipulador a cada botão. Basta criar um método e colocá-lo na marcação.
A estrutura HTML é flexível, podemos adicionar/remover botões a qualquer momento.
Também poderíamos usar classes .action-save, .action-load, mas um atributo data-actioné melhor semanticamente. E podemos usá-lo em regras CSS também.

O padrão de “comportamento”
Também podemos usar a delegação de eventos para adicionar “comportamentos” aos elementos de forma declarativa , com atributos e classes especiais.

O padrão tem duas partes:

Adicionamos um atributo personalizado a um elemento que descreve seu comportamento.
Um manipulador de todo o documento rastreia eventos e, se um evento ocorrer em um elemento atribuído, executa a ação.
Comportamento: Contador
Por exemplo, aqui o atributo data-counteradiciona um comportamento: “aumentar valor ao clicar” aos botões:

Counter: <input type="button" value="1" data-counter>
One more counter: <input type="button" value="2" data-counter>

<script>
  document.addEventListener('click', function(event) {

    if (event.target.dataset.counter != undefined) { // if the attribute exists...
      event.target.value++;
    }

  });
</script>

Se clicarmos em um botão – seu valor é aumentado. Não botões, mas a abordagem geral é importante aqui.

Pode haver quantos atributos data-counterquisermos. Podemos adicionar novos ao HTML a qualquer momento. Usando a delegação de evento nós “estendemos” o HTML, adicionamos um atributo que descreve um novo comportamento.

Para manipuladores de nível de documento – sempreaddEventListener
Quando atribuímos um manipulador de eventos ao documentobjeto, devemos sempre usar addEventListener, e não document.on<event>, porque este último causará conflitos: novos manipuladores sobrescrevem os antigos.

Para projetos reais, é normal que existam muitos manipuladores documentdefinidos por diferentes partes do código.

Comportamento: Alternar
Mais um exemplo de comportamento. Um clique em um elemento com o atributo data-toggle-idmostrará/ocultará o elemento com o dado id:

<button data-toggle-id="subscribe-mail">
  Show the subscription form
</button>

<form id="subscribe-mail" hidden>
  Your mail: <input type="email">
</form>

<script>
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
</script>

Observemos mais uma vez o que fizemos. Agora, para adicionar funcionalidade de alternância a um elemento – não há necessidade de conhecer JavaScript, basta usar o atributo data-toggle-id.

Isso pode se tornar muito conveniente – não há necessidade de escrever JavaScript para cada um desses elementos. Basta usar o comportamento. O manipulador de nível de documento faz com que funcione para qualquer elemento da página.

Também podemos combinar vários comportamentos em um único elemento.

O padrão “behavior” pode ser uma alternativa aos mini-fragmentos de JavaScript.

Resumo
A delegação do evento é muito legal! É um dos padrões mais úteis para eventos DOM.

Geralmente é usado para adicionar o mesmo tratamento para muitos elementos semelhantes, mas não apenas para isso.

O algoritmo:

Coloque um único manipulador no contêiner.
No manipulador – verifique o elemento de origem event.target.
Se o evento aconteceu dentro de um elemento que nos interessa, trate o evento.
Benefícios:

Simplifica a inicialização e economiza memória: não há necessidade de adicionar muitos manipuladores.
Menos código: ao adicionar ou remover elementos, não há necessidade de adicionar/remover manipuladores.
Modificações DOM: podemos adicionar/remover elementos em massa com innerHTMLe afins.
A delegação tem suas limitações é claro:

Primeiro, o evento deve estar borbulhando. Alguns eventos não borbulham. Além disso, manipuladores de baixo nível não devem usar event.stopPropagation().
Em segundo lugar, a delegação pode adicionar carga de CPU, porque o manipulador no nível do contêiner reage a eventos em qualquer lugar do contêiner, não importa se eles nos interessam ou não. Mas geralmente a carga é insignificante, então não a levamos em consideração.

*/