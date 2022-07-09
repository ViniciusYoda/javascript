// AbstractRange

// A interface abstrata AbstractRange é a classe base na qual todos os tipos de intervalo DOM são definidos. Um intervalo é um objeto que indica os pontos inicial e final de uma seção de conteúdo dentro do documento.

// Nota: Como uma interface abstrata, você não instanciará diretamente um objeto do tipo AbstractRange. Em vez disso, você usará as interfaces Range ou StaticRange. Para entender a diferença entre essas duas interfaces e como escolher qual é a mais adequada às suas necessidades.

// Properties

// collapsed (read only)
// Um valor booleano que é verdadeiro se o intervalo for recolhido. Um intervalo recolhido é um intervalo cuja posição inicial e final são as mesmas, resultando em um intervalo de zero caractere.

//endContainer (read only)
// O objeto Node no qual o final do intervalo, conforme especificado pela propriedade endOffset, está localizado.

//endOffset (read only)
// Um valor inteiro que indica o deslocamento, em caracteres, do início do conteúdo do nó até o início do intervalo representado pelo objeto de intervalo. Esse valor deve ser menor que o comprimento do nó endContainer.

//startOffset (read only)
// Um valor inteiro que indica o deslocamento, em caracteres, desde o início do conteúdo do nó até o último caractere do conteúdo referido pelo objeto de intervalo. Este valor deve ser menor que o comprimento do nó indicado em startContainer

// Methods
// A interface AbstractRange fornece quaisquer métodos.

// Usage notes
//Range types

// Todos os intervalos de conteúdo dentro de um documento são descritos usando instâncias de interfaces baseadas em AbstractRange. Existem duas dessas interfaces:

//Range
// A interface Range existe há muito tempo e só recentemente foi redefinida para ser baseada em AbstractRange, pois surgiu a necessidade de definir outras formas de dados de intervalo. O intervalo fornece métodos que permitem alterar os pontos finais do intervalo, bem como métodos para comparar intervalos, detectar interseções entre intervalos e assim por diante.

//StaticRange
// Um StaticRange é um intervalo básico que não pode ser alterado depois de criado. Especificamente, à medida que a árvore de nós muda e muda, o intervalo não. Isso é útil quando você precisa especificar um intervalo que será usado apenas uma vez, pois evita o impacto no desempenho e nos recursos da interface Range mais complexa.

//Contents of elements
// Ao tentar acessar o conteúdo de um elemento, lembre-se de que o próprio elemento é um nó, assim como qualquer texto dentro dele. Para definir um ponto de extremidade de intervalo no texto de um elemento, certifique-se de encontrar o nó de texto dentro do elemento:

let startElem = document.querySelector('p');
let endElem = startElem.querySelector('span');
let range = document.createRange();

range.setStart(startElem, 0);
range.setEnd(endElem, endElem.childNodes[0].length/2);
let contents = range.cloneContents();

document.body.appendChild(contents);

// Este exemplo cria um novo intervalo, intervalo e define seu ponto de partida para o terceiro nó filho do primeiro elemento cuja classe é elementclass. O ponto final é definido como o meio do primeiro filho do intervalo e, em seguida, o intervalo é usado para copiar o conteúdo do intervalo.

