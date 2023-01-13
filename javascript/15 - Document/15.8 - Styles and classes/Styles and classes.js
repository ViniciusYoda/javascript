/*

Estilos e classes
Antes de entrarmos nas formas do JavaScript lidar com estilos e classes – aqui está uma regra importante. Espero que seja óbvio o suficiente, mas ainda temos que mencioná-lo.

Geralmente, existem duas maneiras de estilizar um elemento:

1. Crie uma classe em CSS e adicione-a:<div class="...">
2. Escreva as propriedades diretamente em style: <div style="...">.

JavaScript pode modificar classes e stylepropriedades.

Devemos sempre preferir classes CSS a style. Este último só deve ser usado se as classes “não puderem lidar com isso”.

Por exemplo, styleé aceitável se calcularmos as coordenadas de um elemento dinamicamente e quisermos defini-las a partir do JavaScript, assim:

let top = /* complex calculations */; /*
let left = /* complex calculations */;/*

elem.style.left = left; // e.g '123px', calculated at run-time
elem.style.top = top; // e.g '456px'
Para outros casos, como tornar o texto vermelho, adicionar um ícone de fundo – descreva isso em CSS e adicione a classe (JavaScript pode fazer isso). Isso é mais flexível e mais fácil de suportar.

className e classList
Alterar uma classe é uma das ações mais usadas em scripts.

Nos tempos antigos, havia uma limitação no JavaScript: uma palavra reservada como "class"não poderia ser uma propriedade de objeto. Essa limitação não existe agora, mas naquela época era impossível ter uma "class"propriedade, como elem.class.

"className"Assim, para as classes, foi introduzida a propriedade de aparência semelhante : o elem.classNamecorresponde ao "class"atributo.

Por exemplo:

<body class="main page">
  <script>
    alert(document.body.className); // main page
  </script>
</body>
Se atribuirmos algo a elem.className, ele substituirá toda a cadeia de classes. Às vezes é disso que precisamos, mas muitas vezes queremos adicionar/remover uma única classe.

Existe outra propriedade para isso: elem.classList.

O elem.classListé um objeto especial com métodos para add/remove/toggleuma única classe.

Por exemplo:

<body class="main page">
  <script>
    // add a class
    document.body.classList.add('article');

    alert(document.body.className); // main page article
  </script>
</body>
Assim, podemos operar tanto na string de classe inteira usando classNameou em classes individuais usando classList. O que escolhemos depende de nossas necessidades.

Métodos de classList:

elem.classList.add/remove("class")– adiciona/remove a classe.
elem.classList.toggle("class")– adiciona a classe se ela não existir, caso contrário a remove.
elem.classList.contains("class")– verifica a classe dada, retorna true/false.
Além disso, classListé iterável, então podemos listar todas as classes com for..of, assim:

<body class="main page">
  <script>
    for (let name of document.body.classList) {
      alert(name); // main, and then page
    }
  </script>
</body>
Estilo do elemento
A propriedade elem.styleé um objeto que corresponde ao que está escrito no "style"atributo. A configuração elem.style.width="100px"funciona da mesma forma como se tivéssemos no atributo styleuma string width:100px.

Para propriedades de várias palavras, o camelCase é usado:

background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
Por exemplo:

document.body.style.backgroundColor = prompt('background color?', 'green');
Propriedades prefixadas
Propriedades prefixadas pelo navegador, como -moz-border-radius, -webkit-border-radiustambém seguem a mesma regra: um traço significa letras maiúsculas.

Por exemplo:

button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
Redefinindo a propriedade de estilo
Às vezes, queremos atribuir uma propriedade de estilo e depois removê-la.

Por exemplo, para ocultar um elemento, podemos definir elem.style.display = "none".

Mais tarde, podemos querer remover o style.displaycomo se não estivesse definido. Em vez de delete elem.style.displaydevemos atribuir uma string vazia a ele: elem.style.display = "".

// if we run this code, the <body> will blink
document.body.style.display = "none"; // hide

setTimeout(() => document.body.style.display = "", 1000); // back to normal
Se definirmos como uma string vazia, o navegador aplicará as classes CSS e seus estilos internos normalmente, como se essa propriedade style.displaynão existisse .style.display

Também existe um método especial para isso, elem.style.removeProperty('style property'). Então, podemos remover uma propriedade como esta:

document.body.style.background = 'red'; //set background to red

setTimeout(() => document.body.style.removeProperty('background'), 1000); // remove background after 1 second
Reescrita completa comstyle.cssText
Normalmente, usamos style.*para atribuir propriedades de estilo individuais. Não podemos definir o estilo completo como div.style="color: red; width: 100px", porque div.styleé um objeto e é somente leitura.

Para definir o estilo completo como uma string, há uma propriedade especial style.cssText:

<div id="div">Button</div>

<script>
  // we can set special style flags like "important" here
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
Essa propriedade raramente é usada, porque tal atribuição remove todos os estilos existentes: ela não os adiciona, mas os substitui. Pode ocasionalmente excluir algo necessário. Mas podemos usá-lo com segurança para novos elementos, quando sabemos que não iremos excluir um estilo existente.

O mesmo pode ser feito definindo um atributo: div.setAttribute('style', 'color: red...').

Cuidado com as unidades
Não se esqueça de adicionar unidades CSS aos valores.

Por exemplo, não devemos definir elem.style.topcomo 10, mas sim como 10px. Caso contrário, não funcionaria:

<body>
  <script>
    // doesn't work!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (empty string, the assignment is ignored)

    // now add the CSS unit (px) - and it works
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
Observação: o navegador “descompacta” a propriedade style.marginnas últimas linhas e infere style.marginLefte style.marginTopa partir dela.

Estilos calculados: getComputedStyle
Portanto, modificar um estilo é fácil. Mas como lê -lo?

Por exemplo, queremos saber o tamanho, as margens, a cor de um elemento. Como fazer isso?

A stylepropriedade opera apenas no valor do "style"atributo, sem nenhuma cascata de CSS.

Portanto, não podemos ler nada que venha de classes CSS usando elem.style.

Por exemplo, aqui stylenão vê a margem:

<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
    alert(document.body.style.color); // empty
    alert(document.body.style.marginTop); // empty
  </script>
</body>
…Mas e se precisarmos, digamos, aumentar a margem em 20px? Queremos o valor atual dele.

Existe outro método para isso: getComputedStyle.

A sintaxe é:

getComputedStyle(element, [pseudo])
elemento
Elemento para o qual ler o valor.
pseudo
Um pseudo-elemento, se necessário, por exemplo ::before. Uma string vazia ou nenhum argumento significa o próprio elemento.
O resultado é um objeto com estilos, como elem.style, mas agora com relação a todas as classes CSS.

Por exemplo:

<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // now we can read the margin and the color from it

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>

Valores calculados e resolvidos
Existem dois conceitos em CSS :

1. Um valor de estilo computado é o valor depois que todas as regras CSS e herança CSS são aplicadas, como resultado da cascata CSS. Pode parecer height:1emou font-size:125%.
2. Um valor de estilo resolvido é aquele finalmente aplicado ao elemento. Valores como 1emou 125%são relativos. O navegador pega o valor calculado e torna todas as unidades fixas e absolutas, por exemplo: height:20pxou font-size:16px. Para propriedades de geometria, os valores resolvidos podem ter um ponto flutuante, como width:50.5px.

Há muito tempo getComputedStylefoi criado para obter valores calculados, mas descobriu-se que os valores resolvidos são muito mais convenientes e o padrão mudou.

Hoje em dia getComputedStyle, na verdade, retorna o valor resolvido da propriedade, geralmente em pxgeometria.

getComputedStylerequer o nome completo da propriedade
Devemos sempre pedir a propriedade exata que queremos, como paddingLeftou marginTopou borderTopWidth. Caso contrário, o resultado correto não é garantido.

Por exemplo, se houver propriedades paddingLeft/paddingTop, então o que devemos obter getComputedStyle(elem).padding? Nada, ou talvez um valor “gerado” de paddings conhecidos? Não há regra padrão aqui.

Os estilos aplicados aos :visitedlinks estão ocultos!
Links visitados podem ser coloridos usando :visitedpseudoclasse CSS.

Mas getComputedStylenão dá acesso a essa cor, porque senão uma página arbitrária poderia descobrir se o usuário visitou um link criando-o na página e verificando os estilos.

O JavaScript pode não ver os estilos aplicados por :visited. Além disso, há uma limitação no CSS que proíbe a aplicação de estilos de alteração de geometria em arquivos :visited. Isso é para garantir que não haja nenhum caminho secundário para uma página maliciosa testar se um link foi visitado e, portanto, quebrar a privacidade.

Resumo
Para gerenciar classes, existem duas propriedades DOM:

className– o valor da string, bom para gerenciar todo o conjunto de classes.
classList– o objeto com métodos add/remove/toggle/contains, bom para classes individuais.
Para alterar os estilos:

A stylepropriedade é um objeto com estilos camelCased. Ler e escrever nele tem o mesmo significado que modificar propriedades individuais no "style"atributo. Para ver como aplicar importante outras coisas raras – há uma lista de métodos em MDN .

A style.cssTextpropriedade corresponde a todo o "style"atributo, a cadeia completa de estilos.

Para ler os estilos resolvidos (em relação a todas as classes, depois que todo o CSS for aplicado e os valores finais forem calculados):

O getComputedStyle(elem, [pseudo])retorna o objeto de estilo com eles. Somente leitura.

*/

