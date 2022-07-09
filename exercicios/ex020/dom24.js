let paraNode = document.querySelector('p');
let paraTextNode = paraNode.childNodes[1];

let range = document.createRange();
range.setStart(paraTextNode, 6);
range.setEnd(paraTextNode, paraTextNode.length-1);

let fragment =range.cloneContents();
document.body.appendChild(fragment);

// Primeiro, obtemos referências ao próprio nó de parágrafo, bem como ao segundo nó filho dentro do parágrafo. O primeiro filho é o elemento forte. O segundo filho é o nó de texto 'é um parágrafo.'.

// Com a referência do nó de texto em mãos, criamos um novo objeto Range chamando createRange() no próprio Document. Definimos a posição inicial do intervalo para o sexto caractere da string do nó de texto e a posição final para o comprimento da string do nó de texto menos um. Isso define o intervalo para abranger a palavra 'parágrafo'.

// Em seguida, terminamos chamando cloneContents() no Range para criar um novo objeto DocumentFragment que contém a parte do documento englobada pelo intervalo. Depois disso, usamos appendChild() para adicionar esse fragmento no final do corpo do documento, conforme obtido de document.body.