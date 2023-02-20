/*

Carregamento de arquivo retomável
Com fetcho método é bastante fácil fazer upload de um arquivo.

Como retomar o upload após perda de conexão? Não há opção integrada para isso, mas temos as peças para implementá-la.

Os uploads retomáveis ​​devem vir com indicação de progresso de upload, pois esperamos arquivos grandes (se precisarmos retomar). Então, como fetchnão permite rastrear o progresso do upload, usaremos XMLHttpRequest .

Evento de progresso não tão útil
Para retomar o upload, precisamos saber quanto foi carregado até que a conexão foi perdida.

Há xhr.upload.onprogresspara acompanhar o progresso do upload.

Infelizmente, não nos ajudará a retomar o upload aqui, pois ele é acionado quando os dados são enviados , mas foi recebido pelo servidor? O navegador não sabe.

Talvez tenha sido armazenado em buffer por um proxy de rede local, ou talvez o processo do servidor remoto simplesmente tenha parado e não tenha conseguido processá-lo, ou tenha se perdido no meio e não tenha alcançado o receptor.

É por isso que este evento só serve para mostrar uma boa barra de progresso.

Para retomar o upload, precisamos saber exatamente o número de bytes recebidos pelo servidor. E apenas o servidor pode dizer isso, então faremos uma solicitação adicional.

Algoritmo
Primeiro, crie um id de arquivo, para identificar exclusivamente o arquivo que vamos enviar:

let fileId = file.name + '-' + file.size + '-' + file.lastModified;
Isso é necessário para retomar o upload, para informar ao servidor o que estamos retomando.

Se o nome, o tamanho ou a data da última modificação mudar, haverá outro arquivo fileId.

Envie uma requisição ao servidor, perguntando quantos bytes ele já possui, assim:

let response = await fetch('status', {
  headers: {
    'X-File-Id': fileId
  }
});

// The server has that many bytes
let startByte = +await response.text();
Isso pressupõe que o servidor rastreia uploads de arquivos por X-File-Idcabeçalho. Deve ser implementado no lado do servidor.

Se o arquivo ainda não existir no servidor, a resposta do servidor deve ser0

Então, podemos usar Blobo método slicepara enviar o arquivo de startByte:

xhr.open("POST", "upload");

// File id, so that the server knows which file we upload
xhr.setRequestHeader('X-File-Id', fileId);

// The byte we're resuming from, so the server knows we're resuming
xhr.setRequestHeader('X-Start-Byte', startByte);

xhr.upload.onprogress = (e) => {
  console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
};

// file can be from input.files[0] or another source
xhr.send(file.slice(startByte));
Aqui, enviamos ao servidor o ID do arquivo como X-File-Id, para que ele saiba qual arquivo estamos enviando, e o byte inicial como X-Start-Byte, para que saiba que não o estamos enviando inicialmente, mas continuando.

O servidor deve verificar seus registros e, se houver um upload desse arquivo e o tamanho do upload atual for exatamente X-Start-Byte, anexe os dados a ele.

Aqui está a demonstração com código de cliente e servidor, escrita em Node.js.

Ele funciona apenas parcialmente neste site, pois o Node.js está atrás de outro servidor chamado Nginx, que armazena os uploads em buffer, passando-os para o Node.js quando totalmente concluídos.

Mas você pode baixá-lo e executá-lo localmente para ver a demonstração completa:

Resultadoserver.jsuploader.jsindex.html

Como podemos ver, os métodos de rede modernos estão próximos dos gerenciadores de arquivos em suas capacidades – controle sobre cabeçalhos, indicador de progresso, envio de partes de arquivos, etc.

Podemos implementar upload retomável e muito mais.

*/

