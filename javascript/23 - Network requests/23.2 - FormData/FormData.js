/*

FormData
Este capítulo trata do envio de formulários HTML: com ou sem arquivos, com campos adicionais e assim por diante.

Objetos FormData podem ajudar com isso. Como você deve ter adivinhado, é o objeto para representar os dados do formulário HTML.

O construtor é:

let formData = new FormData([form]);
Se o elemento HTML formfor fornecido, ele captura automaticamente seus campos.

O especial FormDataé que os métodos de rede, como fetch, podem aceitar um FormDataobjeto como um corpo. É codificado e enviado com extensão Content-Type: multipart/form-data.

Do ponto de vista do servidor, parece um envio de formulário comum.

Enviando um formulário simples
Vamos enviar um formulário simples primeiro.

Como você pode ver, isso é quase uma linha:

<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
      body: new FormData(formElem)
    });

    let result = await response.json();

    alert(result.message);
  };
</script>

Neste exemplo, o código do servidor não é apresentado, pois está além do nosso escopo. O servidor aceita a solicitação POST e responde “Usuário salvo”.

Métodos FormData
Podemos modificar campos FormDatacom métodos:

formData.append(name, value)– adicionar um campo de formulário com o dado namee value,
formData.append(name, blob, fileName)– adicione um campo como se fosse <input type="file">, o terceiro argumento fileNamedefine o nome do arquivo (não o nome do campo do formulário), como se fosse um nome do arquivo no sistema de arquivos do usuário,
formData.delete(name)– remover o campo com o dado name,
formData.get(name)– obter o valor do campo com o dado name,
formData.has(name)– se existir um campo com o dado name, retorna true, caso contráriofalse
Tecnicamente, é permitido que um formulário tenha muitos campos com o mesmo name, portanto, várias chamadas para appendadicionar mais campos com o mesmo nome.

Há também o método set, com a mesma sintaxe de append. A diferença é que .setremove todos os campos com o especificado namee, em seguida, acrescenta um novo campo. Portanto, garante que haja apenas um campo com tal name, o resto é como append:

formData.set(name, value),
formData.set(name, blob, fileName).
Também podemos iterar sobre campos formData usando for..ofloop:

let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// List key/value pairs
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
}
Enviando um formulário com um arquivo
O formulário é sempre enviado como Content-Type: multipart/form-data, esta codificação permite o envio de arquivos. Assim, <input type="file">os campos também são enviados, semelhante a um envio de formulário normal.

Aqui está um exemplo com tal formulário:

<form id="formElem">
  <input type="text" name="firstName" value="John">
  Picture: <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
      body: new FormData(formElem)
    });

    let result = await response.json();

    alert(result.message);
  };
</script>

Enviando um formulário com dados Blob
Como vimos no capítulo Fetch , é fácil enviar dados binários gerados dinamicamente, por exemplo, uma imagem, como Blob. Podemos fornecê-lo diretamente como fetchparâmetro body.

Na prática, porém, muitas vezes é conveniente enviar uma imagem não separadamente, mas como parte do formulário, com campos adicionais, como “nome” e outros metadados.

Além disso, os servidores geralmente são mais adequados para aceitar formulários codificados em várias partes, em vez de dados binários brutos.

Este exemplo envia uma imagem de <canvas>, juntamente com alguns outros campos, como um formulário, usando FormData:

<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>

Observe como a imagem Blobé adicionada:

formData.append("image", imageBlob, "image.png");
É o mesmo que se houvesse <input type="file" name="image">no formulário e o visitante enviasse um arquivo chamado "image.png"(3º argumento) com os dados imageBlob(2º argumento) de seu sistema de arquivos.

O servidor lê os dados do formulário e o arquivo, como se fosse um envio de formulário normal.

Resumo
Os objetos FormData são usados ​​para capturar o formulário HTML e enviá-lo usando fetchou outro método de rede.

Podemos criar a new FormData(form)partir de um formulário HTML ou criar um objeto sem um formulário e, em seguida, anexar campos com métodos:

formData.append(name, value)
formData.append(name, blob, fileName)
formData.set(name, value)
formData.set(name, blob, fileName)
Notemos aqui duas peculiaridades:

O setmétodo remove campos com o mesmo nome, appendnão. Essa é a única diferença entre eles.
Para enviar um arquivo, é necessária uma sintaxe de 3 argumentos, o último argumento é um nome de arquivo, que normalmente é obtido do sistema de arquivos do usuário para <input type="file">.
Outros métodos são:

formData.delete(name)
formData.get(name)
formData.has(name)
É isso!

*/

