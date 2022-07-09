//Range and the hierarchy of the DOM
// Para definir um intervalo de caracteres em um documento de forma que seja capaz de abranger zero ou mais limites de nó e que seja o mais resiliente possível a alterações no DOM, você não pode especificar o deslocamento para o primeiro e últimos caracteres no HTML. Existem algumas boas razões para isso.

// Primeiro, depois que sua página é carregada, o navegador não está pensando em termos de HTML. Depois de carregada, a página é uma árvore de objetos DOM Node, portanto, você precisa especificar os locais inicial e final de um intervalo em termos de nós e posições dentro dos nós.

// Em segundo lugar, para dar suporte à mutabilidade da árvore DOM o máximo possível, você precisa de uma maneira de representar posições relativas a nós na árvore, em vez de posições globais em todo o documento. Ao definir pontos dentro do documento como deslocamentos dentro de um determinado nó, essas posições permanecem consistentes com o conteúdo mesmo quando os nós são adicionados, removidos ou movidos dentro da árvore DOM - dentro do razoável. Existem limitações bastante óbvias (como se um nó for movido para depois do ponto final de um intervalo ou se o conteúdo de um nó for fortemente alterado), mas é muito melhor do que nada.

// Terceiro, o uso de posições relativas ao nó para definir as posições inicial e final geralmente será mais fácil de ter um bom desempenho. Em vez de ter que negociar o DOM para descobrir a que se refere seu deslocamento global, o agente do usuário (navegador) pode ir diretamente para o nó indicado pela posição inicial e começar a partir daí, avançando até atingir o deslocamento especificado em o nó final.

let pRange = document.createRange();
pRange.selectNodeContents(document.querySelector('#entry1 p'));

let r = document.createRange();
let startNode = document.querySelector('section h2').childNodes[0];
r.setStart(startNode, 11);

let endNode = document.querySelector('#entry1 p em').childNodes[0];
r.setEnd(endNode, 2);

let fragment = r.cloneContents();

// Aqui surge um problema interessante - estamos capturando conteúdo de vários nós localizados em diferentes níveis da hierarquia DOM e, em seguida, apenas parte de um deles. Como deve ser o resultado?

// Como se vê, a especificação DOM felizmente aborda esse problema exato. Por exemplo, neste caso, estamos chamando cloneContents() no intervalo para criar um novo objeto DocumentFragment fornecendo uma subárvore DOM que replica o conteúdo do intervalo especificado. Para fazer isso, cloneContents() constrói todos os nós necessários para preservar a estrutura do intervalo indicado, mas não mais do que o necessário.

// Neste exemplo, o início do intervalo especificado é encontrado no nó de texto abaixo do cabeçalho da seção, o que significa que o novo DocumentFragment precisará conter um h2 e, abaixo dele, um nó de texto.

// O final do intervalo está localizado abaixo do elemento p, de modo que será necessário dentro do novo fragmento. O mesmo acontecerá com o nó de texto que contém a palavra 'A', já que está incluído no intervalo. Finalmente, um em e um nó de texto abaixo dele também serão adicionados abaixo do p.

// O conteúdo dos nós de texto é então determinado pelos deslocamentos nesses nós de texto fornecidos ao chamar setStart() e setEnd(). Dado o deslocamento de 11 no texto do título, esse nó conterá 'Uma coisa interessante...'. Da mesma forma, o último nó de texto conterá 've', dado o pedido dos dois primeiros caracteres do nó final.