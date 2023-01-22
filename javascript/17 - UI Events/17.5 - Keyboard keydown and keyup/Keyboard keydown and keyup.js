/*

Teclado: keydown e keyup
Antes de chegarmos ao teclado, observe que em dispositivos modernos existem outras maneiras de “inserir algo”. Por exemplo, as pessoas usam reconhecimento de fala (especialmente em dispositivos móveis) ou copiam/colam com o mouse.

Portanto, se quisermos rastrear qualquer entrada em um <input>campo, os eventos do teclado não serão suficientes. Há outro evento chamado inputpara rastrear alterações de um <input>campo, por qualquer meio. E pode ser uma escolha melhor para tal tarefa. Abordaremos isso mais tarde no capítulo Eventos: alterar, inserir, recortar, copiar, colar .

Eventos de teclado devem ser usados ​​quando queremos lidar com ações de teclado (teclado virtual também conta). Por exemplo, para reagir às teclas de seta Upe Down/ou teclas de atalho (incluindo combinações de teclas).

bancada de teste
Para entender melhor os eventos do teclado, você pode usar o teststand abaixo.

Tente diferentes combinações de teclas no campo de texto.

*/

kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

let lastTime = Date.now();

function handle(e) {
  if (form.elements[e.type + 'Ignore'].checked) return;

  area.scrollTop = 1e6;

  let text = e.type +
    ' key=' + e.key +
    ' code=' + e.code +
    (e.shiftKey ? ' shiftKey' : '') +
    (e.ctrlKey ? ' ctrlKey' : '') +
    (e.altKey ? ' altKey' : '') +
    (e.metaKey ? ' metaKey' : '') +
    (e.repeat ? ' (repeat)' : '') +
    "\n";

  if (area.value && Date.now() - lastTime > 250) {
    area.value += new Array(81).join('-') + '\n';
  }
  lastTime = Date.now();

  area.value += text;

  if (form.elements[e.type + 'Stop'].checked) {
    e.preventDefault();
  }
}

/*

Keydown e keyup
Os keydowneventos acontecem quando uma tecla é pressionada e depois keyup– quando é liberada.

evento.código e evento.chave
A keypropriedade do objeto de evento permite obter o caractere, enquanto a codepropriedade do objeto de evento permite obter o “código da chave física”.

Por exemplo, a mesma tecla Zpode ser pressionada com ou sem Shift. Isso nos dá dois caracteres diferentes: minúsculas ze maiúsculas Z.

O event.keyé exatamente o personagem, e será diferente. Mas event.codeé o mesmo:

Chave	event.key	event.code
Z	z(minúsculas)	KeyZ
Shift+Z	Z(maiúsculas)	KeyZ
Se um usuário trabalhar com idiomas diferentes, mudar para outro idioma criaria um caractere totalmente diferente em vez de "Z". Isso se tornará o valor de event.key, enquanto event.codeé sempre o mesmo: "KeyZ".

“KeyZ” e outros códigos de chave
Cada tecla tem o código que depende de sua localização no teclado. Códigos-chave descritos na especificação de código de eventos de interface do usuário .

Por exemplo:

As teclas de letras têm códigos "Key<letter>": "KeyA", "KeyB"etc.
As chaves de dígitos têm códigos: "Digit<number>": "Digit0", "Digit1"etc.
As teclas especiais são codificadas por seus nomes: "Enter", "Backspace", "Tab"etc.
Existem vários layouts de teclado amplamente difundidos e a especificação fornece códigos de tecla para cada um deles.

Leia a seção alfanumérica da especificação para obter mais códigos ou apenas pressione uma tecla no teste acima.

Caso importa: "KeyZ", não"keyZ"
Parece óbvio, mas as pessoas ainda cometem erros.

Evite erros de digitação: é KeyZ, não keyZ. O check like event.code=="keyZ"não funcionará: a primeira letra de "Key"deve ser maiúscula.

E se uma tecla não fornecer nenhum caractere? Por exemplo, Shiftou F1ou outros. Para essas chaves, event.keyé aproximadamente o mesmo que event.code:

Chave	event.key	event.code
F1	F1	F1
Backspace	Backspace	Backspace
Shift	Shift	ShiftRightouShiftLeft
Observe que event.codeespecifica exatamente qual tecla é pressionada. Por exemplo, a maioria dos teclados tem duas Shiftteclas: à esquerda e à direita. O event.codenos diz exatamente qual foi pressionado e event.keyé responsável pelo “significado” da tecla: o que é (um “Shift”).

Digamos que queremos lidar com uma tecla de atalho: (ou para Mac). A maioria dos editores de texto ativa a ação “Desfazer” nele. Podemos ativar um ouvinte e verificar qual tecla foi pressionada.Ctrl+ZCmd+Zkeydown

Há um dilema aqui: em tal ouvinte, devemos verificar o valor de event.keyou event.code?

Por um lado, o valor de event.keyé um caractere, muda dependendo do idioma. Se o visitante tiver vários idiomas no sistema operacional e alternar entre eles, a mesma chave fornecerá caracteres diferentes. Portanto, faz sentido verificar event.code, é sempre o mesmo.

Como isso:

*/

document.addEventListener('keydown', function(event) {
   if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
     alert('Undo!')
   }
});

/*


Por outro lado, há um problema com event.code. Para layouts de teclado diferentes, a mesma tecla pode ter caracteres diferentes.

Por exemplo, aqui estão o layout dos EUA (“QWERTY”) e o layout alemão (“QWERTZ”) abaixo dele (da Wikipedia):



Para a mesma chave, o layout dos EUA tem “Z”, enquanto o layout alemão tem “Y” (as letras são trocadas).

Literalmente, event.codeserá igual KeyZpara pessoas com layout alemão quando pressionarem Y.

Se verificarmos event.code == 'KeyZ'nosso código, então, para pessoas com layout alemão, esse teste será aprovado quando pressionarem Y.

Isso soa muito estranho, mas é mesmo. A especificação menciona explicitamente tal comportamento.

Portanto, event.codepode corresponder a um caractere errado para um layout inesperado. As mesmas letras em layouts diferentes podem ser mapeadas para chaves físicas diferentes, levando a códigos diferentes. Felizmente, isso acontece apenas com vários códigos, por exemplo keyA, keyQ, keyZ(como vimos), e não acontece com chaves especiais como Shift. Você pode encontrar a lista na especificação .

Para rastrear de forma confiável caracteres dependentes de layout, event.keypode ser uma maneira melhor.

Por outro lado, event.codetem a vantagem de permanecer sempre o mesmo, vinculado ao local físico da chave. Portanto, as teclas de atalho que dependem dele funcionam bem, mesmo no caso de uma troca de idioma.

Queremos lidar com chaves dependentes de layout? Então event.keyé o caminho a percorrer.

Ou queremos que uma tecla de atalho funcione mesmo após uma troca de idioma? Então event.codepode ser melhor.

Repetição automática
Se uma tecla estiver sendo pressionada por um tempo longo o suficiente, ela começa a se “repetir automaticamente”: os keydowngatilhos se repetem e, quando é liberada, finalmente obtemos keyup. Portanto, é normal ter muitos keydowne um único arquivo keyup.

Para eventos acionados por repetição automática, o objeto de evento tem event.repeata propriedade definida como true.

Ações padrão
As ações padrão variam, pois há muitas coisas possíveis que podem ser iniciadas pelo teclado.

Por exemplo:

Um personagem aparece na tela (o resultado mais óbvio).
Um caractere é excluído ( Deletetecla).
A página é rolada ( PageDowntecla).
O navegador abre a caixa de diálogo “Salvar página” ( )Ctrl+S
…e assim por diante.
Impedir a ação padrão keydownpode cancelar a maioria deles, com exceção das chaves especiais baseadas no sistema operacional. Por exemplo, no Windows fecha a janela atual do navegador. E não há como pará-lo impedindo a ação padrão em JavaScript.Alt+F4

Por exemplo, o <input>abaixo espera um número de telefone, portanto, não aceita chaves, exceto dígitos +, ()ou -:

<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || ['+','(',')','-'].includes(key);
}
</script>
<input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">

O onkeydownmanipulador aqui usa checkPhoneKeypara verificar a tecla pressionada. Se for válido (de 0..9ou um de +-()), ele retornará true, caso contrário false.

Como sabemos, o falsevalor retornado do manipulador de eventos, atribuído por meio de uma propriedade DOM ou um atributo, como acima, impede a ação padrão, portanto nada aparece nas <input>chaves for que não passem no teste. (O truevalor retornado não interfere em nada, apenas o retorno falseimporta)

Observe que teclas especiais, como Backspace, Left, Right, não funcionam na entrada. Esse é um efeito colateral do filtro estrito checkPhoneKey. Essas chaves fazem com que ele retorne false.

Vamos relaxar um pouco o filtro permitindo as teclas de seta Left, Righte Delete, Backspace:

<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') ||
    ['+','(',')','-','ArrowLeft','ArrowRight','Delete','Backspace'].includes(key);
}
</script>
<input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">

Agora as setas e a exclusão funcionam bem.

Embora tenhamos o filtro de chave, ainda é possível inserir qualquer coisa usando o mouse e clicar com o botão direito do mouse em + Colar. Os dispositivos móveis fornecem outros meios para inserir valores. Portanto, o filtro não é 100% confiável.

A abordagem alternativa seria rastrear o oninputevento – ele é acionado após qualquer modificação. Lá podemos verificar o novo input.valuee modificá-lo/destacá- <input>lo quando for inválido. Ou podemos usar os dois manipuladores de eventos juntos.

Legado
No passado, havia um keypressevento e também keyCode, charCode, whichpropriedades do objeto de evento.

Havia tantas incompatibilidades de navegador ao trabalhar com eles, que os desenvolvedores da especificação não tinham como, a não ser depreciar todos eles e criar eventos novos e modernos (descritos acima neste capítulo). O código antigo ainda funciona, pois os navegadores continuam a suportá-los, mas não há mais necessidade de usá-los.

Teclados móveis
Ao usar teclados virtuais/móveis, formalmente conhecidos como IME (Input-Method Editor), o padrão W3C afirma que um KeyboardEvent e.keyCodedeve ser229 e e.keydeve ser"Unidentified" .

Embora alguns desses teclados ainda possam usar os valores corretos para e.key, e.code, e.keyCode… ao pressionar determinadas teclas, como setas ou backspace, não há garantia, portanto, a lógica do seu teclado pode nem sempre funcionar em dispositivos móveis.

Resumo
ShiftPressionar uma tecla sempre gera um evento de teclado, sejam teclas de símbolos ou teclas especiais como Ctrle assim por diante. A única exceção é Fna chave que às vezes se apresenta no teclado de um laptop. Não há evento de teclado para isso, porque geralmente é implementado em um nível inferior ao do sistema operacional.

Eventos de teclado:

keydown– ao pressionar a tecla (repete automaticamente se a tecla for pressionada por muito tempo),
keyup– ao soltar a chave.
Principais propriedades do evento de teclado:

code– o “código da tecla” ( "KeyA", "ArrowLeft"e assim por diante), específico para a localização física da tecla no teclado.
key– o caractere ( "A", "a"e assim por diante), para chaves sem caracteres, como Esc, geralmente tem o mesmo valor que code.
No passado, os eventos de teclado às vezes eram usados ​​para rastrear a entrada do usuário nos campos do formulário. Isso não é confiável, porque a entrada pode vir de várias fontes. Temos eventos inpute changepara lidar com qualquer entrada (abordado posteriormente no capítulo Eventos: alterar, inserir, recortar, copiar, colar ). Eles são acionados após qualquer tipo de entrada, incluindo copiar e colar ou reconhecimento de fala.

Devemos usar eventos de teclado quando realmente queremos o teclado. Por exemplo, para reagir a teclas de atalho ou teclas especiais.

*/