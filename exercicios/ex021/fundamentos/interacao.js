//Interação: alert, prompt, confirm

//Como usaremos o navegador como nosso ambiente de demonstração, vamos ver algumas funções para interagir com o usuário: alert, prompt e confirm.

//alerta
//Esse nós já vimos. Ele mostra uma mensagem e espera que o usuário pressione “OK”.

//Por exemplo:

alert('Hello');

// A mini-janela com a mensagem é chamada de janela modal . A palavra “modal” significa que o visitante não pode interagir com o resto da página, pressionar outros botões, etc, até que tenha lidado com a janela. Neste caso – até que eles pressionem “OK”.

//Prompt
// A função prompt aceita dois argumentos:
result = prompt(title, [default]);

//Mostra uma janela modal com uma mensagem de texto, um campo de entrada para o visitante e os botões OK/Cancelar.

//title
//O texto para mostrar ao visitante.

//default
//Um segundo parâmetro opcional, o valor inicial para o campo de entrada.

//Os colchetes na sintaxe[...]
//Os colchetes ao redor default na sintaxe acima denotam que o parâmetro é opcional, não obrigatório.

//O visitante pode digitar algo no campo de entrada de prompt e pressionar OK. Em seguida, obtemos esse texto no arquivo result. Ou eles podem cancelar a entrada pressionando Cancelar ou pressionando a Esc tecla, então obtemos null como o result.

//A chamada para prompt retorna o texto do campo de entrada ou null se a entrada foi cancelada.

//Por exemplo:

let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!

//No IE: forneça sempre um default

//O segundo parâmetro é opcional, mas se não for fornecido, o Internet Explorer inserirá o texto "undefined"no prompt.

//Execute este código no Internet Explorer para ver:
let test = prompt('Test');

//Portanto, para que os prompts tenham uma boa aparência no IE, recomendamos sempre fornecer o segundo argumento:

let test2 = prompt('Test', ''); // <-- for IE

// confirm
//A sintaxe:
result = confirm(question);

//A função confirm mostra uma janela modal com um question e dois botões: OK e Cancelar.

//O resultado é true se OK for pressionado e false caso contrário.

//Por exemplo:

let isBoss = confirm('Are you the boss?');

alert( isBoss ); // true if OK is pressed

//Resumo
//Cobrimos 3 funções específicas do navegador para interagir com os visitantes:

//alert
//mostra uma mensagem.
//prompt
//mostra uma mensagem pedindo ao usuário para inserir texto. Retorna o texto ou, se o botão Cancelar ou Escfor clicado, null.
//confirm
//mostra uma mensagem e espera que o usuário pressione “OK” ou “Cancelar”. Retorna truepara OK e falsepara Cancel/ Esc.
//Todos esses métodos são modais: eles pausam a execução do script e não permitem que o visitante interaja com o restante da página até que a janela seja descartada.

//Existem duas limitações compartilhadas por todos os métodos acima:

//A localização exata da janela modal é determinada pelo navegador. Normalmente, fica no centro.
//A aparência exata da janela também depende do navegador. Não podemos modificá-lo.
//Esse é o preço da simplicidade. Existem outras maneiras de mostrar janelas mais agradáveis ​​e interação mais rica com o visitante, mas se “sinos e assobios” não importam muito, esses métodos funcionam bem.