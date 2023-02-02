/*

Popups e métodos de janela
Uma janela pop-up é um dos métodos mais antigos para mostrar documentos adicionais ao usuário.

Basicamente, você apenas executa:

window.open('https://javascript.info/')
…E abrirá uma nova janela com o URL fornecido. A maioria dos navegadores modernos são configurados para abrir url em novas guias em vez de janelas separadas.

Os pop-ups existem desde tempos muito antigos. A ideia inicial era mostrar outro conteúdo sem fechar a janela principal. A partir de agora, existem outras maneiras de fazer isso: podemos carregar o conteúdo dinamicamente com fetch e mostrá-lo em um arquivo <div>. Portanto, pop-ups não são algo que usamos todos os dias.

Além disso, os pop-ups são complicados em dispositivos móveis, que não mostram várias janelas simultaneamente.

Ainda assim, existem tarefas em que os pop-ups ainda são usados, por exemplo, para autorização OAuth (login com Google/Facebook/…), porque:

Um pop-up é uma janela separada que possui seu próprio ambiente JavaScript independente. Portanto, abrir um pop-up de um site de terceiros não confiável é seguro.
É muito fácil abrir um pop-up.
Um pop-up pode navegar (alterar URL) e enviar mensagens para a janela de abertura.
Bloqueio de pop-ups
No passado, sites maliciosos abusavam muito dos pop-ups. Uma página ruim pode abrir toneladas de janelas pop-up com anúncios. Agora, a maioria dos navegadores tenta bloquear pop-ups e proteger o usuário.

A maioria dos navegadores bloqueia pop-ups se forem chamados fora de manipuladores de eventos acionados pelo usuário, como onclick.

Por exemplo:

// popup blocked
window.open('https://javascript.info');

// popup allowed
button.onclick = () => {
  window.open('https://javascript.info');
};
Dessa forma, os usuários ficam um pouco protegidos de pop-ups indesejados, mas a funcionalidade não é totalmente desativada.

window.open
A sintaxe para abrir um pop-up é: window.open(url, name, params):

url
Um URL para carregar na nova janela.
nome
Um nome da nova janela. Cada janela tem um window.name, e aqui podemos especificar qual janela usar para o pop-up. Se já existe uma janela com esse nome - a URL fornecida é aberta nela, caso contrário, uma nova janela é aberta.
parâmetros
A string de configuração para a nova janela. Ele contém configurações, delimitadas por uma vírgula. Não deve haver espaços nos parâmetros, por exemplo: width=200,height=100.
Configurações para params:

Posição:
left/top(numérico) – coordenadas do canto superior esquerdo da janela na tela. Há uma limitação: uma nova janela não pode ser posicionada fora da tela.
width/height(numérico) – largura e altura de uma nova janela. Há um limite mínimo de largura/altura, então é impossível criar uma janela invisível.
Características da janela:
menubar(sim/não) – mostra ou oculta o menu do navegador na nova janela.
toolbar(sim/não) – mostra ou oculta a barra de navegação do navegador (voltar, avançar, recarregar, etc.) na nova janela.
location(sim/não) – mostra ou oculta o campo URL na nova janela. FF e IE não permitem ocultá-lo por padrão.
status(sim/não) – mostra ou oculta a barra de status. Novamente, a maioria dos navegadores força a exibição.
resizable(sim/não) – permite desabilitar o redimensionamento para a nova janela. Não recomendado.
scrollbars(sim/não) – permite desabilitar as barras de rolagem para a nova janela. Não recomendado.
Há também vários recursos específicos do navegador com menos suporte, que geralmente não são usados. Verifique window.open no MDN para obter exemplos.

Exemplo: uma janela minimalista
Vamos abrir uma janela com um conjunto mínimo de recursos, apenas para ver qual deles o navegador permite desabilitar:

let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
Aqui, a maioria dos “recursos de janela” está desabilitada e a janela é posicionada fora da tela. Execute-o e veja o que realmente acontece. A maioria dos navegadores “conserta” coisas estranhas como zero width/heighte fora da tela left/top. Por exemplo, o Chrome abre uma janela com largura/altura total, para que ocupe a tela inteira.

Vamos adicionar opções de posicionamento normais e coordenadas , , width, razoáveis:heightlefttop

let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
A maioria dos navegadores mostra o exemplo acima conforme necessário.

Regras para configurações omitidas:

Se não houver um terceiro argumento na openchamada ou se estiver vazio, os parâmetros padrão da janela serão usados.
Se houver uma string de parâmetros, mas alguns yes/norecursos forem omitidos, então os recursos omitidos terão novalor. Portanto, se você especificar parâmetros, certifique-se de definir explicitamente todos os recursos necessários como sim.
Se não houver left/topin params, o navegador tentará abrir uma nova janela perto da última janela aberta.
Se não houver width/height, a nova janela terá o mesmo tamanho da última aberta.
Acessando o pop-up da janela
A openchamada retorna uma referência à nova janela. Ele pode ser usado para manipular suas propriedades, mudar de local e ainda mais.

Neste exemplo, geramos conteúdo pop-up de JavaScript:

let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write("Hello, world!");
E aqui modificamos o conteúdo após o carregamento:

let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

alert(newWindow.location.href); // (*) about:blank, loading hasn't started yet

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
};
Observe: imediatamente após window.open, a nova janela ainda não foi carregada. Isso é demonstrado por alertin line (*). Então esperamos onloadmodificá-lo. Também poderíamos usar DOMContentLoadedo manipulador para newWin.document.

política de mesma origem
O Windows pode acessar livremente o conteúdo um do outro apenas se eles vierem da mesma origem (o mesmo protocolo://domínio:porta).

Caso contrário, por exemplo, se a janela principal for de site.com, e o pop-up de gmail.com, isso é impossível por razões de segurança do usuário. Para obter detalhes, consulte o capítulo Comunicação entre janelas .

Acessando a janela do pop-up
Um pop-up também pode acessar a janela “abridor” usando window.openerreferência. É nullpara todas as janelas, exceto pop-ups.

Se você executar o código abaixo, ele substituirá o conteúdo da janela de abertura (atual) por “Test”:

let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
Portanto, a conexão entre as janelas é bidirecional: a janela principal e o popup têm uma referência entre si.

Fechando um pop-up
Para fechar uma janela: win.close().

Para verificar se uma janela está fechada: win.closed.

Tecnicamente, o close()método está disponível para qualquer window, mas window.close()é ignorado pela maioria dos navegadores se windownão for criado com window.open(). Portanto, só funcionará em um pop-up.

A closedpropriedade é truese a janela estiver fechada. Isso é útil para verificar se o pop-up (ou a janela principal) ainda está aberto ou não. Um usuário pode fechá-lo a qualquer momento e nosso código deve levar essa possibilidade em consideração.

Este código carrega e fecha a janela:

let newWindow = open('/', 'example', 'width=300,height=300');

newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
Mover e redimensionar
Existem métodos para mover/redimensionar uma janela:

win.moveBy(x,y)
Mova a janela em relação à posição atual xpixels para a direita e ypixels para baixo. Valores negativos são permitidos (para mover para a esquerda/para cima).
win.moveTo(x,y)
Mova a janela para as coordenadas (x,y)na tela.
win.resizeBy(width,height)
Redimensione a janela de width/heightacordo com o tamanho atual. Valores negativos são permitidos.
win.resizeTo(width,height)
Redimensione a janela para o tamanho especificado.
Também tem window.onresizeevento.

Apenas pop-ups
Para evitar abusos, o navegador geralmente bloqueia esses métodos. Eles só funcionam de forma confiável em pop-ups que abrimos, que não possuem guias adicionais.

Sem minificação/maximização
O JavaScript não tem como minimizar ou maximizar uma janela. Essas funções no nível do sistema operacional estão ocultas dos desenvolvedores de front-end.

Os métodos de mover/redimensionar não funcionam para janelas maximizadas/minimizadas.

Rolar uma janela
Já falamos sobre rolar uma janela no capítulo Tamanhos de janela e rolagem .

win.scrollBy(x,y)
xRole os pixels da janela para a direita e ypara baixo em relação à rolagem atual. Valores negativos são permitidos.
win.scrollTo(x,y)
Role a janela para as coordenadas fornecidas (x,y).
elem.scrollIntoView(top = true)
Role a janela para elemaparecer na parte superior (o padrão) ou na parte inferior para elem.scrollIntoView(false).
Também tem window.onscrollevento.

Focar/desfocar em uma janela
window.focus()Teoricamente , existem window.blur()métodos para focar/desfocar em uma janela. E também há focus/blureventos que permitem captar o momento em que o visitante foca uma janela e muda para outro lado.

Embora, na prática, eles sejam severamente limitados, porque no passado as páginas do mal abusaram deles.

Por exemplo, veja este código:

window.onblur = () => window.focus();
Quando um usuário tenta sair da janela ( window.onblur), ele traz a janela de volta ao foco. A intenção é “bloquear” o usuário dentro do arquivo window.

Portanto, os navegadores tiveram que introduzir muitas limitações para proibir o código como esse e proteger o usuário de anúncios e páginas malignas. Eles dependem do navegador.

Por exemplo, um navegador móvel geralmente ignora window.focus()completamente. O foco também não funciona quando um pop-up é aberto em uma guia separada, e não em uma nova janela.

Ainda assim, existem alguns casos de uso em que essas chamadas funcionam e podem ser úteis.

Por exemplo:

Quando abrimos um pop-up, pode ser uma boa ideia executá newWindow.focus()-lo. Por precaução, para algumas combinações de SO/navegador, isso garante que o usuário esteja na nova janela agora.
Se quisermos rastrear quando um visitante realmente usa nosso aplicativo da web, podemos rastrear window.onfocus/onblur. Isso nos permite suspender/retomar atividades na página, animações, etc. Mas observe que o blurevento significa que o visitante saiu da janela, mas ainda pode observá-lo. A janela está em segundo plano, mas ainda pode estar visível.
Resumo
As janelas pop-up raramente são usadas, pois existem alternativas: carregar e exibir informações na página ou em iframe.

Se vamos abrir um pop-up, uma boa prática é informar o usuário sobre isso. Um ícone de “janela de abertura” perto de um link ou botão permitiria ao visitante sobreviver à mudança de foco e manter ambas as janelas em mente.

Um pop-up pode ser aberto pela open(url, name, params)chamada. Ele retorna a referência à janela recém-aberta.
Os navegadores bloqueiam openas chamadas do código fora das ações do usuário. Geralmente uma notificação aparece, para que um usuário possa permitir.
Os navegadores abrem uma nova guia por padrão, mas se os tamanhos forem fornecidos, será uma janela pop-up.
O pop-up pode acessar a janela de abertura usando a window.openerpropriedade.
A janela principal e o pop-up podem se ler e modificar livremente se tiverem a mesma origem. Caso contrário, eles podem mudar de localização um do outro e trocar mensagens .
Para fechar o pop-up: use close()call. Além disso, o usuário pode fechá-los (como qualquer outra janela). O window.closedé truedepois disso.

Métodos focus()e blur()permitem focar/desfocar uma janela. Mas eles não funcionam o tempo todo.
Eventos focuse blurpermitem rastrear a entrada e saída da janela. Mas observe que uma janela ainda pode estar visível mesmo no estado de plano de fundo, após blur.

*/