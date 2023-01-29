/*

Formulários: envio de evento e método
O submitevento dispara quando o formulário é enviado, geralmente é usado para validar o formulário antes de enviá-lo ao servidor ou para abortar o envio e processá-lo em JavaScript.

O método form.submit()permite iniciar o envio do formulário a partir do JavaScript. Podemos usá-lo para criar e enviar dinamicamente nossos próprios formulários para o servidor.

Vamos ver mais detalhes deles.

Evento: enviar
Existem duas maneiras principais de enviar um formulário:

O primeiro – para clicar <input type="submit">ou <input type="image">.
O segundo – pressione Enterem um campo de entrada.
Ambas as ações levam a submitum evento no formulário. O manipulador pode verificar os dados e, se houver erros, mostre-os e chame event.preventDefault(), então o formulário não será enviado ao servidor.

No formulário abaixo:

Vá para o campo de texto e pressione Enter.
Clique em <input type="submit">.
Ambas as ações são exibidas alerte o formulário não é enviado a lugar nenhum devido a return false:

<form onsubmit="alert('submit!');return false">
  First: Enter in the input field <input type="text" value="text"><br>
  Second: Click "submit": <input type="submit" value="Submit">
</form>

Relação entre submiteclick
Quando um formulário é enviado usando Enterum campo de entrada, um clickevento é acionado no arquivo <input type="submit">.

Isso é bastante engraçado, porque não houve nenhum clique.

Aqui está a demonstração:

<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" onclick="alert('click')">
</form>

Método: enviar
Para enviar um formulário ao servidor manualmente, podemos chamar form.submit().

Então o submitevento não é gerado. Supõe-se que, se o programador chamar form.submit(), o script já fez todo o processamento relacionado.

Às vezes, isso é usado para criar e enviar manualmente um formulário, como este:

let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// the form must be in the document to submit it
document.body.append(form);

form.submit();

*/