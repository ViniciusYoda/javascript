/*

ArrayBuffer, matrizes binárias
No desenvolvimento web, encontramos dados binários principalmente ao lidar com arquivos (criar, carregar, baixar). Outro caso de uso típico é o processamento de imagens.

Tudo isso é possível em JavaScript, e as operações binárias são de alto desempenho.

Embora haja um pouco de confusão, porque há muitas classes. Para nomear alguns:

ArrayBuffer, Uint8Array, DataView, Blob, File, etc
Os dados binários em JavaScript são implementados de maneira não padronizada, em comparação com outras linguagens. Mas quando resolvemos as coisas, tudo se torna bastante simples.

O objeto binário básico é ArrayBuffer– uma referência a uma área de memória contígua de comprimento fixo.

Criamos assim:

let buffer = new ArrayBuffer(16); // create a buffer of length 16
alert(buffer.byteLength); // 16
Isso aloca uma área de memória contígua de 16 bytes e a preenche previamente com zeros.

ArrayBuffernão é uma matriz de algo
Vamos eliminar uma possível fonte de confusão. ArrayBuffernão tem nada em comum com Array:

Tem um comprimento fixo, não podemos aumentar ou diminuir.
É preciso exatamente esse espaço na memória.
Para acessar bytes individuais, outro objeto “view” é necessário, não buffer[index].
ArrayBufferé uma área de memória. O que está armazenado nele? Não tem ideia. Apenas uma sequência bruta de bytes.

Para manipular um ArrayBuffer, precisamos usar um objeto “view”.

Um objeto de exibição não armazena nada por conta própria. São os “óculos” que dão uma interpretação dos bytes armazenados no arquivo ArrayBuffer.

Por exemplo:

Uint8Array– trata cada byte ArrayBuffercomo um número separado, com valores possíveis de 0 a 255 (um byte tem 8 bits, portanto, pode conter apenas isso). Tal valor é chamado de “inteiro não assinado de 8 bits”.
Uint16Array– trata cada 2 bytes como um inteiro, com valores possíveis de 0 a 65535. Isso é chamado de “inteiro sem sinal de 16 bits”.
Uint32Array– trata cada 4 bytes como um inteiro, com valores possíveis de 0 a 4294967295. Isso é chamado de “inteiro sem sinal de 32 bits”.
Float64Array– trata cada 8 bytes como um número de ponto flutuante com valores possíveis de a .5.0x10-3241.8x10308
Assim, os dados binários em um ArrayBufferde 16 bytes podem ser interpretados como 16 “números minúsculos”, ou 8 números maiores (2 bytes cada), ou 4 ainda maiores (4 bytes cada), ou 2 valores de ponto flutuante com alta precisão ( 8 bytes cada).


ArrayBufferé o objeto central, a raiz de tudo, os dados binários brutos.

Mas se vamos escrever nele, ou iterar sobre ele, basicamente para quase qualquer operação – devemos usar uma visão, por exemplo:

let buffer = new ArrayBuffer(16); // create a buffer of length 16

let view = new Uint32Array(buffer); // treat buffer as a sequence of 32-bit integers

alert(Uint32Array.BYTES_PER_ELEMENT); // 4 bytes per integer

alert(view.length); // 4, it stores that many integers
alert(view.byteLength); // 16, the size in bytes

// let's write a value
view[0] = 123456;

// iterate over values
for(let num of view) {
  alert(num); // 123456, then 0, 0, 0 (4 values total)
}
TypedArray
O termo comum para todas essas exibições ( Uint8Array, Uint32Array, etc) é TypedArray . Eles compartilham o mesmo conjunto de métodos e propriedades.

Observe que não existe um construtor chamado TypedArray, é apenas um termo "guarda-chuva" comum para representar uma das visualizações sobre ArrayBuffer: Int8Array, Uint8Arraye assim por diante, a lista completa logo a seguir.

Quando você vê algo como new TypedArray, significa qualquer um dos new Int8Array, new Uint8Array, etc.

Arrays digitados se comportam como arrays regulares: possuem índices e são iteráveis.

Um construtor de array com tipo (seja ele Int8Arrayou Float64Array, não importa) se comporta de maneira diferente dependendo dos tipos de argumento.

Existem 5 variantes de argumentos:

new TypedArray(buffer, [byteOffset], [length]);
new TypedArray(object);
new TypedArray(typedArray);
new TypedArray(length);
new TypedArray();
Se um ArrayBufferargumento for fornecido, a exibição será criada sobre ele. Já usamos essa sintaxe.

Opcionalmente, podemos fornecer byteOffsetpara iniciar de (0 por padrão) e length(até o final do buffer por padrão), então a exibição cobrirá apenas uma parte do arquivo buffer.

Se um Array, ou qualquer objeto semelhante a uma matriz for fornecido, ele criará uma matriz digitada do mesmo tamanho e copiará o conteúdo.

Podemos usá-lo para pré-preencher o array com os dados:

let arr = new Uint8Array([0, 1, 2, 3]);
alert( arr.length ); // 4, created binary array of the same length
alert( arr[1] ); // 1, filled with 4 bytes (unsigned 8-bit integers) with given values
Se outro TypedArrayfor fornecido, ele faz o mesmo: cria um array digitado do mesmo tamanho e copia os valores. Os valores são convertidos para o novo tipo no processo, se necessário.

let arr16 = new Uint16Array([1, 1000]);
let arr8 = new Uint8Array(arr16);
alert( arr8[0] ); // 1
alert( arr8[1] ); // 232, tried to copy 1000, but can't fit 1000 into 8 bits (explanations below)
Para um argumento numérico length– cria a matriz digitada para conter tantos elementos. Seu comprimento de byte será lengthmultiplicado pelo número de bytes em um único item TypedArray.BYTES_PER_ELEMENT:

let arr = new Uint16Array(4); // create typed array for 4 integers
alert( Uint16Array.BYTES_PER_ELEMENT ); // 2 bytes per integer
alert( arr.byteLength ); // 8 (size in bytes)
Sem argumentos, cria uma matriz digitada de comprimento zero.

Podemos criar um TypedArraydiretamente, sem mencionar ArrayBuffer. Mas uma visão não pode existir sem um subjacente ArrayBuffer, então é criada automaticamente em todos esses casos, exceto o primeiro (quando fornecido).

Para acessar o subjacente ArrayBuffer, existem as seguintes propriedades em TypedArray:

buffer– referencia o ArrayBuffer.
byteLength- o comprimento do ArrayBuffer.
Assim, podemos sempre passar de uma visão para outra:

let arr8 = new Uint8Array([0, 1, 2, 3]);

// another view on the same data
let arr16 = new Uint16Array(arr8.buffer);
Aqui está a lista de arrays digitados:

Uint8Array, Uint16Array, Uint32Array– para números inteiros de 8, 16 e 32 bits.
Uint8ClampedArray– para inteiros de 8 bits, “fixe-os” na atribuição (veja abaixo).
Int8Array, Int16Array, Int32Array– para números inteiros com sinal (pode ser negativo).
Float32Array, Float64Array– para números de ponto flutuante assinados de 32 e 64 bits.
Nenhum int8ou tipos de valor único semelhantes
Observe que, apesar dos nomes como Int8Array, não há nenhum tipo de valor único como int, ou int8em JavaScript.

Isso é lógico, pois Int8Arraynão é uma matriz desses valores individuais, mas sim uma exibição em ArrayBuffer.

Comportamento fora dos limites
E se tentarmos escrever um valor fora dos limites em um array digitado? Não haverá erro. Mas bits extras são cortados.

Por exemplo, vamos tentar colocar 256 em Uint8Array. Na forma binária, 256 é 100000000(9 bits), mas Uint8Arrayfornece apenas 8 bits por valor, o que torna o intervalo disponível de 0 a 255.

Para números maiores, apenas os 8 bits mais à direita (menos significativos) são armazenados e o restante é cortado:


Então vamos tirar zero.

Para 257, a forma binária é 100000001(9 bits), os 8 mais à direita ficam armazenados, então teremos 1no array:


Em outras palavras, o número módulo 2 8 é salvo.

Aqui está a demonstração:

let uint8array = new Uint8Array(16);

let num = 256;
alert(num.toString(2)); // 100000000 (binary representation)

uint8array[0] = 256;
uint8array[1] = 257;

alert(uint8array[0]); // 0
alert(uint8array[1]); // 1
Uint8ClampedArrayé especial neste aspecto, seu comportamento é diferente. Ele salva 255 para qualquer número maior que 255 e 0 para qualquer número negativo. Esse comportamento é útil para o processamento de imagens.

Métodos TypedArray
TypedArrayArraytem métodos regulares , com exceções notáveis.

Podemos iterar, map, slice, find, reduceetc.

Há algumas coisas que não podemos fazer:

Não splice– não podemos “excluir” um valor, porque as matrizes digitadas são exibições em um buffer e são áreas fixas e contíguas da memória. Tudo o que podemos fazer é atribuir um zero.
Nenhum concatmétodo.
Existem dois métodos adicionais:

arr.set(fromArr, [offset])copia todos os elementos de fromArrpara o arr, começando na posição offset(0 por padrão).
arr.subarray([begin, end])cria uma nova visualização do mesmo tipo de beginaté end(exclusivo). Isso é semelhante ao slicemétodo (que também é suportado), mas não copia nada – apenas cria uma nova visão, para operar no dado dado.
Esses métodos nos permitem copiar arrays digitados, misturá-los, criar novos arrays a partir dos existentes e assim por diante.

Exibição de dados
DataView é uma exibição especial superflexível “sem tipo” sobre arquivos ArrayBuffer. Permite acessar os dados em qualquer offset em qualquer formato.

Para arrays digitados, o construtor determina qual é o formato. A matriz inteira deve ser uniforme. O i-ésimo número é arr[i].
Com DataViewacessamos os dados com métodos como .getUint8(i)ou .getUint16(i). Escolhemos o formato na hora da chamada do método ao invés da hora da construção.
A sintaxe:

new DataView(buffer, [byteOffset], [byteLength])
buffer– o subjacente ArrayBuffer. Ao contrário dos arrays digitados, DataViewnão cria um buffer por conta própria. Precisamos tê-lo pronto.
byteOffset– a posição inicial do byte da visualização (por padrão 0).
byteLength– o comprimento em bytes da visualização (por padrão até o final de buffer).
Por exemplo, aqui extraímos números em diferentes formatos do mesmo buffer:

// binary array of 4 bytes, all have the maximal value 255
let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

let dataView = new DataView(buffer);

// get 8-bit number at offset 0
alert( dataView.getUint8(0) ); // 255

// now get 16-bit number at offset 0, it consists of 2 bytes, together interpreted as 65535
alert( dataView.getUint16(0) ); // 65535 (biggest 16-bit unsigned int)

// get 32-bit number at offset 0
alert( dataView.getUint32(0) ); // 4294967295 (biggest 32-bit unsigned int)

dataView.setUint32(0, 0); // set 4-byte number to zero, thus setting all bytes to 0
DataViewé ótimo quando armazenamos dados de formato misto no mesmo buffer. Por exemplo, quando armazenamos uma sequência de pares (inteiro de 16 bits, flutuante de 32 bits), DataViewpermite acessá-los facilmente.

Resumo
ArrayBufferé o objeto central, uma referência à área de memória contígua de comprimento fixo.

Para fazer quase qualquer operação em ArrayBuffer, precisamos de uma visão.

Pode ser um TypedArray:
Uint8Array, Uint16Array, Uint32Array– para inteiros sem sinal de 8, 16 e 32 bits.
Uint8ClampedArray– para inteiros de 8 bits, “fixa-os” na atribuição.
Int8Array, Int16Array, Int32Array– para números inteiros com sinal (pode ser negativo).
Float32Array, Float64Array– para números de ponto flutuante assinados de 32 e 64 bits.
Ou a DataView– a visão que usa métodos para especificar um formato, por exemplo, getUint8(offset).
Na maioria dos casos, criamos e operamos diretamente em matrizes digitadas, deixando ArrayBuffersob cobertura, como um “denominador comum”. Podemos acessá-lo como .buffere fazer outra visualização, se necessário.

Existem também dois termos adicionais, que são usados ​​em descrições de métodos que operam em dados binários:

ArrayBufferViewé um termo abrangente para todos esses tipos de pontos de vista.
BufferSourceé um termo genérico para ArrayBufferou ArrayBufferView.
Veremos esses termos nos próximos capítulos. BufferSourceé um dos termos mais comuns, pois significa “qualquer tipo de dado binário” – um ArrayBufferou uma visão sobre ele.

Aqui está uma folha de dicas:

*/