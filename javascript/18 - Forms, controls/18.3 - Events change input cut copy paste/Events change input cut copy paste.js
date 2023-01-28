/*

Eventos: alterar, inserir, recortar, copiar, colar
Vamos cobrir vários eventos que acompanham as atualizações de dados.

Evento: mudança
O changeevento é acionado quando o elemento termina de mudar.

Para entradas de texto, isso significa que o evento ocorre quando perde o foco.

Por exemplo, enquanto estamos digitando no campo de texto abaixo – não há evento. Mas quando movemos o foco para outro lugar, por exemplo, clicamos em um botão – haverá um changeevento:

<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">

Para outros elementos: select, input type=checkbox/radiodispara logo após a mudança de seleção:

<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>

Evento: entrada
O inputevento é acionado sempre que um valor é modificado pelo usuário.

Ao contrário dos eventos de teclado, ele dispara em qualquer alteração de valor, mesmo aquelas que não envolvem ações do teclado: colar com o mouse ou usar o reconhecimento de fala para ditar o texto.

Por exemplo:

<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>

Se quisermos lidar com todas as modificações de um <input>, então este evento é a melhor escolha.

Por outro lado, inputo evento não é acionado na entrada do teclado e em outras ações que não envolvem alteração de valor, por exemplo, pressionando as teclas de seta ⇦ ⇨durante a entrada.

Não pode impedir nada emoninput
O inputevento ocorre depois que o valor é modificado.

Então não podemos usar event.preventDefault()lá – é tarde demais, não haveria efeito.

Eventos: recortar, copiar, colar
Esses eventos ocorrem ao recortar/copiar/colar um valor.

Eles pertencem à classe ClipboardEvent e fornecem acesso aos dados que são recortados/copiados/colados.

Também podemos usar event.preventDefault()para abortar a ação, então nada é copiado/colado.

Por exemplo, o código abaixo previne todos os cut/copy/pasteeventos e mostra o texto que estamos tentando recortar/copiar/colar:

<input type="text" id="input">
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>

Observe: dentro cute copymanipuladores de eventos uma chamada para event.clipboardData.getData(...)retorna uma string vazia. Isso porque tecnicamente os dados ainda não estão na área de transferência. Se o usarmos event.preventDefault(), ele não será copiado.

Portanto, o exemplo acima usa document.getSelection()para obter o texto selecionado. Você pode encontrar mais detalhes sobre a seleção de documentos no artigo Seleção e intervalo .

É possível copiar/colar não apenas texto, mas tudo. Por exemplo, podemos copiar um arquivo no gerenciador de arquivos do sistema operacional e colá-lo.

Isso porque clipboardDataimplementa a DataTransferinterface, comumente usada para arrastar e soltar e copiar/colar. Está um pouco além do nosso escopo agora, mas você pode encontrar seus métodos na especificação DataTransfer .

Além disso, há uma API assíncrona adicional para acessar a área de transferência: navigator.clipboard. Mais sobre isso na especificação Clipboard API e eventos , não suportados pelo Firefox .

Restrições de segurança
A área de transferência é uma coisa “global” no nível do sistema operacional. Um usuário pode alternar entre vários aplicativos, copiar/colar coisas diferentes e uma página do navegador não deve ver tudo isso.

Portanto, a maioria dos navegadores permite acesso contínuo de leitura/gravação à área de transferência apenas no escopo de determinadas ações do usuário, como copiar/colar, etc.

É proibido gerar eventos de área de transferência “personalizados” dispatchEventem todos os navegadores, exceto o Firefox. E mesmo que consigamos despachar tal evento, a especificação afirma claramente que tais eventos “sintéticos” não devem fornecer acesso à área de transferência.

Mesmo que alguém decida salvar event.clipboardDataem um manipulador de eventos e acessá-lo mais tarde, não funcionará.

Para reiterar, event.clipboardData funciona apenas no contexto de manipuladores de eventos iniciados pelo usuário.

Por outro lado, navigator.clipboard é a API mais recente, destinada ao uso em qualquer contexto. Ele pede permissão do usuário, se necessário.

Resumo
Eventos de alteração de dados:

Evento	Descrição	Especiais
change	Um valor foi alterado.	Para entradas de texto, aciona a perda de foco.
input	Para entradas de texto em cada mudança.	Aciona imediatamente ao contrário changede .
cut/copy/paste	Cortar/copiar/colar ações.	A ação pode ser evitada. A event.clipboardDatapropriedade dá acesso à área de transferência. Todos os navegadores, exceto o Firefox, também suportam navigator.clipboard.

*/