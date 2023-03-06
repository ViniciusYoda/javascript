/*

Elemento de modelo
Um elemento interno <template>serve como um armazenamento para modelos de marcação HTML. O navegador ignora seu conteúdo, apenas verifica a validade da sintaxe, mas podemos acessá-lo e usá-lo em JavaScript para criar outros elementos.

Em teoria, poderíamos criar qualquer elemento invisível em algum lugar do HTML para fins de armazenamento de marcação HTML. O que há de especial <template>?

Primeiro, seu conteúdo pode ser qualquer HTML válido, mesmo que normalmente exija uma tag delimitadora adequada.

Por exemplo, podemos colocar lá uma linha da tabela <tr>:

<template>
  <tr>
    <td>Contents</td>
  </tr>
</template>
Normalmente, se tentarmos colocar <tr>dentro de, digamos, um <div>, o navegador detecta a estrutura DOM inválida e a “conserta”, adiciona <table>ao redor. Não é isso que queremos. Por outro lado, <template>mantém exatamente o que colocamos lá.

Podemos colocar estilos e scripts <template>também:

<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Hello");
  </script>
</template>
O navegador considera <template>o conteúdo “fora do documento”: estilos não são aplicados, scripts não são executados, <video autoplay>não são executados, etc.

O conteúdo torna-se ativo (aplicam-se estilos, executam-se scripts, etc.) quando o inserimos no documento.

Inserindo modelo
O conteúdo do modelo está disponível em sua contentpropriedade como um DocumentFragment – ​​um tipo especial de nó DOM.

Podemos tratá-lo como qualquer outro nó DOM, exceto por uma propriedade especial: quando o inserimos em algum lugar, seus filhos são inseridos.

Por exemplo:

<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Hello, world!</div>
</template>

<script>
  let elem = document.createElement('div');

  // Clone the template content to reuse it multiple times
  elem.append(tmpl.content.cloneNode(true));

  document.body.append(elem);
  // Now the script from <template> runs
</script>
Vamos reescrever um exemplo de Shadow DOM do capítulo anterior usando <template>:

<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Click me</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)

    elem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows!";
  };
</script>

Na linha (*)quando clonamos e inserimos tmpl.content, como seu DocumentFragment, seus filhos ( <style>, <p>) são inseridos no lugar.

Eles formam o shadow DOM:

<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
Resumo
Para resumir:

<template>o conteúdo pode ser qualquer HTML sintaticamente correto.
<template>o conteúdo é considerado “fora do documento”, portanto não interfere em nada.
Podemos acessar template.contentdo JavaScript, cloná-lo para reutilizá-lo em um novo componente.
A <template>tag é única, porque:

O navegador verifica a sintaxe HTML dentro dele (ao contrário de usar uma string de modelo dentro de um script).
…Mas ainda permite o uso de quaisquer tags HTML de nível superior, mesmo aquelas que não fazem sentido sem os wrappers adequados (por exemplo, <tr>).
O conteúdo torna-se interativo: scripts rodam, <video autoplay>jogam etc, quando inseridos no documento.
O <template>elemento não apresenta nenhum mecanismo de iteração, vinculação de dados ou substituição de variáveis, mas podemos implementá-los em cima dele.

*/