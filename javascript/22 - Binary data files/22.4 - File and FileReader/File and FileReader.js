/*

Arquivo e Leitor de Arquivos
Um objeto File herda Blobe é estendido com recursos relacionados ao sistema de arquivos.

Existem duas maneiras de obtê-lo.

Primeiro, há um construtor, semelhante a Blob:

new File(fileParts, fileName, [options])
fileParts– é uma matriz de valores Blob/BufferSource/String.
fileName– string do nome do arquivo.
options– objeto opcional:
lastModified– o timestamp (data inteira) da última modificação.
Em segundo lugar, com mais frequência obtemos um arquivo <input type="file">ou arrastamos e soltamos ou outras interfaces do navegador. Nesse caso, o arquivo obtém essas informações do sistema operacional.

Como Fileherda de Blob, Fileos objetos têm as mesmas propriedades, mais:

name– o nome do arquivo,
lastModified– o timestamp da última modificação.
É assim que podemos obter um Fileobjeto de <input type="file">:

<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // e.g my.png
  alert(`Last modified: ${file.lastModified}`); // e.g 1552830408824
}
</script>
Observe:
A entrada pode selecionar vários arquivos, assim input.filescomo um objeto semelhante a uma matriz com eles. Aqui temos apenas um arquivo, então apenas pegamos input.files[0].

Leitor de arquivos
FileReader é um objeto com o único propósito de ler dados de Blob(e, portanto, Filetambém) objetos.

Ele entrega os dados usando eventos, pois a leitura do disco pode demorar.

O construtor:

let reader = new FileReader(); // no arguments
Os principais métodos:

readAsArrayBuffer(blob)– ler os dados em formato binário ArrayBuffer.
readAsText(blob, [encoding])– leia os dados como uma string de texto com a codificação fornecida ( utf-8por padrão).
readAsDataURL(blob)– leia os dados binários e codifique-os como url de dados base64.
abort()– cancelar a operação.
A escolha do read*método depende de qual formato preferimos, como vamos usar os dados.

readAsArrayBuffer– para arquivos binários, para fazer operações binárias de baixo nível. Para operações de alto nível, como fatiar, Fileherda de Blob, para que possamos chamá-las diretamente, sem ler.
readAsText– para arquivos de texto, quando gostaríamos de obter uma string.
readAsDataURL– quando gostaríamos de usar esses dados em srcou em imgoutra tag. Existe uma alternativa para ler um arquivo para isso, conforme discutido no capítulo Blob : URL.createObjectURL(file).
À medida que a leitura prossegue, ocorrem eventos:

loadstart– carregamento iniciado.
progress– ocorre durante a leitura.
load– sem erros, leitura completa.
abort– abort()chamou.
error- Um erro ocorreu.
loadend– leitura terminada com sucesso ou falha.
Terminada a leitura, podemos acessar o resultado como:

reader.resulté o resultado (se bem sucedido)
reader.erroré o erro (se falhou).
Os eventos mais usados ​​são com certeza loade error.

Aqui está um exemplo de leitura de um arquivo:

<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
FileReaderpara blobs
Conforme mencionado no capítulo Blob , FileReaderpode ler não apenas arquivos, mas quaisquer blobs.

Podemos usá-lo para converter um blob para outro formato:

readAsArrayBuffer(blob)– para ArrayBuffer,
readAsText(blob, [encoding])– para string (uma alternativa para TextDecoder),
readAsDataURL(blob)– para url de dados base64.
FileReaderSyncestá disponível dentro do Web Workers
Para Web Workers, também existe uma variante síncrona de FileReader, chamada FileReaderSync .

Seus métodos de leitura read*não geram eventos, mas retornam um resultado, como fazem as funções normais.

Isso ocorre apenas dentro de um Web Worker, porque os atrasos nas chamadas síncronas, que são possíveis durante a leitura de arquivos, em Web Workers são menos importantes. Eles não afetam a página.

Resumo
Fileobjetos herdam de Blob.

Além de Blobmétodos e propriedades, Fileos objetos também possuem propriedades namee lastModified, além da capacidade interna de ler a partir do sistema de arquivos. Normalmente, obtemos Fileobjetos a partir da entrada do usuário, como <input>eventos Drag'n'Drop ( ondragend).

FileReaderobjetos podem ler de um arquivo ou blob, em um dos três formatos:

Corda ( readAsText).
ArrayBuffer (readAsArrayBuffer).
URL de dados, codificado em base 64 ( readAsDataURL).
Em muitos casos, porém, não precisamos ler o conteúdo do arquivo. Assim como fizemos com os blobs, podemos criar um URL curto URL.createObjectURL(file)e atribuí-lo a <a>ou <img>. Desta forma, o arquivo pode ser baixado ou mostrado como uma imagem, como parte da tela, etc.

E se vamos enviar um Filepor uma rede, também é fácil: a API de rede gosta XMLHttpRequestou fetchaceita nativamente Fileobjetos.

*/

