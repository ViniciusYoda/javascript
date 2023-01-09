/*

árvore DOM
A espinha dorsal de um documento HTML são as tags.

De acordo com o Document Object Model (DOM), toda tag HTML é um objeto. Tags aninhadas são “filhos” da tag delimitadora. O texto dentro de uma tag também é um objeto.

Todos esses objetos são acessíveis usando JavaScript e podemos usá-los para modificar a página.

Por exemplo, document.bodyé o objeto que representa a <body>tag.

Executar este código fará o <body>vermelho por 3 segundos:

*/

document.body.style.background = 'red'; // make the background red

setTimeout(() => document.body.style.background = '', 3000); // return back

/*

Aqui costumávamos style.backgroundmudar a cor de fundo de document.body, mas existem muitas outras propriedades, como:

innerHTML– Conteúdo HTML do nó.
offsetWidth– a largura do nó (em pixels)
…e assim por diante.
Em breve aprenderemos mais formas de manipular o DOM, mas primeiro precisamos conhecer sua estrutura.

Exemplo de DOM
Vamos começar com o seguinte documento simples:

<!DOCTYPE HTML>
<html>
<head>
  <title>About elk</title>
</head>
<body>
  The truth about elk.
</body>
</html>

O DOM representa o HTML como uma estrutura em árvore de tags. Veja como fica:

▾
HTML
▾
HEAD
#text ↵␣␣
▾
TITLE
#text About elk
#text ↵
#text ↵
▾
BODY
#text ↵␣␣The truth about elk.↵

Na imagem acima, você pode clicar nos nós do elemento e seus filhos serão abertos/recolhidos.

Cada nó de árvore é um objeto.

Tags são nós de elementos (ou apenas elementos) e formam a estrutura da árvore: <html>está na raiz, depois <head>e <body>são seus filhos, etc.

O texto dentro dos elementos forma nós de texto , rotulados como #text. Um nó de texto contém apenas uma string. Pode não ter filhos e é sempre uma folha da árvore.

Por exemplo, a <title>tag tem o texto "About elk".

Observe os caracteres especiais nos nós de texto:

uma nova linha: ↵(em JavaScript conhecido como \n)
um espaço:␣
Espaços e novas linhas são caracteres totalmente válidos, como letras e dígitos. Eles formam nós de texto e se tornam parte do DOM. Assim, por exemplo, no exemplo acima, a <head>tag contém alguns espaços antes <title>de , e esse texto se torna um #textnó (ele contém uma nova linha e apenas alguns espaços).

Existem apenas duas exclusões de nível superior:

1. Espaços e novas linhas antes <head>são ignorados por razões históricas.
2. Se colocarmos algo depois </body>de , isso será automaticamente movido para dentro de body, no final, pois a especificação HTML exige que todo o conteúdo esteja dentro <body>de . Portanto, não pode haver espaços depois de </body>.

Em outros casos, tudo é direto - se houver espaços (como qualquer caractere) no documento, eles se tornarão nós de texto no DOM e, se os removermos, não haverá nenhum.

Aqui não há nós de texto apenas com espaço:

<!DOCTYPE HTML>
<html><head><title>About elk</title></head><body>The truth about elk.</body>

▾
HTML
▾
HEAD
▾
TITLE
#text About elk
▾
BODY
#text The truth about elk.

Os espaços no início/fim da string e os nós de texto somente com espaço geralmente ficam ocultos nas ferramentas
As ferramentas do navegador (a serem abordadas em breve) que funcionam com DOM geralmente não mostram espaços no início/fim do texto e nós de texto vazios (quebras de linha) entre as tags.

As ferramentas do desenvolvedor economizam espaço na tela dessa maneira.

Em outras imagens do DOM, às vezes, as omitiremos quando forem irrelevantes. Esses espaços geralmente não afetam como o documento é exibido.

Auto correção
Se o navegador encontrar HTML malformado, ele o corrige automaticamente ao criar o DOM.

Por exemplo, a tag superior é sempre <html>. Mesmo que não exista no documento, existirá no DOM, pois o navegador irá criá-lo. O mesmo vale para <body>.

Por exemplo, se o arquivo HTML for uma única palavra "Hello", o navegador o agrupará em <html>e <body>, e adicionará o necessário <head>, e o DOM será:

▾
HTML
▾
HEAD
▾
BODY
#text Hello
Ao gerar o DOM, os navegadores processam automaticamente erros no documento, fecham tags e assim por diante.

Um documento com tags não fechadas:

<p>Hello
<li>Mom
<li>and
<li>Dad
… se tornará um DOM normal conforme o navegador lê as tags e restaura as partes que faltam:

▾
HTML
▾
HEAD
▾
BODY
▾
P
#text Hello
▾
LI
#text Mom
▾
LI
#text and
▾
LI
#text Dad
Mesas sempre tem<tbody>

Um “caso especial” interessante são as tabelas. Pela especificação do DOM, eles devem ter <tbody>tag, mas o texto HTML pode omiti-lo. Em seguida, o navegador cria <tbody>no DOM automaticamente.

Para o HTML:

<table id="table"><tr><td>1</td></tr></table>
A estrutura DOM será:

▾
TABLE
▾
TBODY
▾
TR
▾
TD
#text 1
Você vê? O <tbody>apareceu do nada. Devemos ter isso em mente ao trabalhar com tabelas para evitar surpresas.

Um “caso especial” interessante são as tabelas. Pela especificação do DOM, eles devem ter <tbody>tag, mas o texto HTML pode omiti-lo. Em seguida, o navegador cria <tbody>no DOM automaticamente.

Para o HTML:

<table id="table"><tr><td>1</td></tr></table>
A estrutura DOM será:

▾
TABLE
▾
TBODY
▾
TR
▾
TD
#text 1
Você vê? O <tbody>apareceu do nada. Devemos ter isso em mente ao trabalhar com tabelas para evitar surpresas.

▾
HTML
▾
HEAD
▾
BODY
#text ↵␣␣The truth about elk.↵␣␣
▾
OL
#text ↵␣␣␣␣
▾
LI
#text An elk is a smart
#text ↵␣␣␣␣
#comment comment
#text ↵␣␣␣␣
▾
LI
#text ...and cunning animal!
#text ↵␣␣
#text ↵↵↵

Podemos ver aqui um novo tipo de nó de árvore – nó de comentário , rotulado como #comment, entre dois nós de texto.

Podemos pensar – por que um comentário é adicionado ao DOM? Não afeta a representação visual de forma alguma. Mas há uma regra – se algo está em HTML, também deve estar na árvore DOM.

Tudo em HTML, até comentários, torna-se parte do DOM.

Mesmo a <!DOCTYPE...>diretiva no início do HTML também é um nó DOM. Está na árvore DOM logo antes <html>de . Poucas pessoas sabem disso. Não vamos tocar nesse nó, nem desenhamos em diagramas, mas está lá.

O documentobjeto que representa todo o documento também é, formalmente, um nó DOM.

Existem 12 tipos de nós . Na prática costumamos trabalhar com 4 deles:

1. document– o “ponto de entrada” no DOM.
2. nós de elemento – tags HTML, os blocos de construção da árvore.
3. nós de texto – contêm texto.
4. comentários – às vezes podemos colocar informações lá, não serão mostradas, mas o JS pode ler do DOM.

Veja você mesmo
Para ver a estrutura DOM em tempo real, experimente o Live DOM Viewer . Basta digitar o documento e ele aparecerá como um DOM em um instante.

Outra maneira de explorar o DOM é usar as ferramentas de desenvolvedor do navegador. Na verdade, é isso que usamos ao desenvolver.

Para fazer isso, abra a página da web elk.html , ative as ferramentas de desenvolvedor do navegador e vá para a guia Elementos.

Deve ficar assim:

Você pode ver o DOM, clicar nos elementos, ver seus detalhes e assim por diante.

Observe que a estrutura DOM nas ferramentas do desenvolvedor é simplificada. Os nós de texto são mostrados apenas como texto. E não há nós de texto “em branco” (somente espaço). Tudo bem, porque na maioria das vezes estamos interessados ​​em nós de elementos.

Clicando nobotão no canto superior esquerdo nos permite escolher um nó da página da web usando um mouse (ou outros dispositivos de ponteiro) e “inspecioná-lo” (role até ele na guia Elementos). Isso funciona muito bem quando temos uma página HTML enorme (e o DOM enorme correspondente) e gostaríamos de ver o local de um elemento específico nela.

Outra maneira de fazer isso seria clicar com o botão direito do mouse em uma página da Web e selecionar “Inspecionar” no menu de contexto.

Na parte direita das ferramentas, existem as seguintes subguias:

Estilos – podemos ver o CSS aplicado ao elemento atual regra por regra, incluindo regras internas (cinza). Quase tudo pode ser editado no local, incluindo as dimensões/margens/preenchimentos da caixa abaixo.
Calculado – para ver o CSS aplicado ao elemento por propriedade: para cada propriedade podemos ver uma regra que a fornece (incluindo herança de CSS e tal).
Ouvintes de eventos – para ver ouvintes de eventos anexados a elementos DOM (vamos abordá-los na próxima parte do tutorial).
…e assim por diante.
A melhor maneira de estudá-los é clicar. A maioria dos valores é editável no local.

Interação com o console
À medida que trabalhamos o DOM, também podemos aplicar JavaScript a ele. Tipo: pegue um nó e execute algum código para modificá-lo, para ver o resultado. Aqui estão algumas dicas para viajar entre a guia Elementos e o console.

Para começar:

1. Selecione o primeiro <li>na guia Elementos.
2. Pressione Esc- abrirá o console logo abaixo da guia Elementos.

Agora o último elemento selecionado está disponível como $0, o selecionado anteriormente é $1etc.

Podemos executar comandos neles. Por exemplo, $0.style.background = 'red'torna o item de lista selecionado vermelho, assim:

É assim que se obtém um nó de Elements in Console.

Há também uma estrada de volta. Se houver uma variável referenciando um nó DOM, podemos usar o comando inspect(node)no Console para vê-la no painel Elementos.

Ou podemos apenas gerar o nó DOM no console e explorar “no local”, como document.bodyabaixo:

Isso é para fins de depuração, é claro. A partir do próximo capítulo, acessaremos e modificaremos o DOM usando JavaScript.

As ferramentas de desenvolvedor do navegador são uma grande ajuda no desenvolvimento: podemos explorar o DOM, experimentar e ver o que dá errado.

Resumo
Um documento HTML/XML é representado dentro do navegador como a árvore DOM.

Tags tornam-se nós de elemento e formam a estrutura.
O texto se torna nós de texto.
…etc, tudo em HTML tem seu lugar no DOM, até os comentários.
Podemos usar ferramentas de desenvolvedor para inspecionar o DOM e modificá-lo manualmente.

Aqui cobrimos o básico, as ações mais usadas e importantes para começar. Há uma extensa documentação sobre as Ferramentas do desenvolvedor do Chrome em https://developers.google.com/web/tools/chrome-devtools . A melhor forma de aprender as ferramentas é clicar aqui e ali, ler menus: a maioria das opções são óbvias. Mais tarde, quando você os conhecer em geral, leia os documentos e pegue o resto.

Os nós DOM têm propriedades e métodos que nos permitem viajar entre eles, modificá-los, mover-se pela página e muito mais. Nós vamos chegar a eles nos próximos capítulos.

*/