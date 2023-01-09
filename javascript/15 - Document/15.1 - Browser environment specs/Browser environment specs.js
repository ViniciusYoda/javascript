/*

Ambiente do navegador, especificações
A linguagem JavaScript foi criada inicialmente para navegadores da web. Desde então, evoluiu para uma linguagem com muitos usos e plataformas.

Uma plataforma pode ser um navegador, um servidor web ou outro host , ou mesmo uma máquina de café “inteligente” se puder executar JavaScript. Cada um deles fornece funcionalidade específica da plataforma. A especificação JavaScript chama isso de ambiente de host .

Um ambiente de host fornece seus próprios objetos e funções, além do núcleo da linguagem. Os navegadores da Web fornecem um meio de controlar as páginas da Web. O Node.js fornece recursos do lado do servidor e assim por diante.

Aqui está uma visão panorâmica do que temos quando o JavaScript é executado em um navegador da Web:

Existe um objeto “raiz” chamado window. Tem dois papéis:

1. Primeiro, é um objeto global para código JavaScript, conforme descrito no capítulo Objeto global .
2. Em segundo lugar, representa a “janela do navegador” e fornece métodos para controlá-la.

Por exemplo, podemos usá-lo como um objeto global:

*/

function sayHi() {
   alert("Hello");
}

// global functions are methods of the global object:
window.sayHi();

// E podemos usá-lo como uma janela do navegador, para mostrar a altura da janela:

alert(window.innerHeight); // inner window height

/*

Existem mais métodos e propriedades específicos da janela, que abordaremos mais tarde.

DOM (Modelo de objeto de documento)
O Document Object Model, ou DOM para abreviar, representa todo o conteúdo da página como objetos que podem ser modificados.

O documentobjeto é o principal “ponto de entrada” da página. Podemos alterar ou criar qualquer coisa na página usando-o.

Por exemplo:

*/

// change the background color
document.body.style.background = "red";

// change it back after 1 second
setTimeout(() => document.body.style.background = "", 1000);

/*

Aqui usamos document.body.style, mas tem muito, muito mais. Propriedades e métodos são descritos na especificação: DOM Living Standard .

DOM não é apenas para navegadores
A especificação DOM explica a estrutura de um documento e fornece objetos para manipulá-lo. Existem instrumentos não relacionados ao navegador que também usam DOM.

Por exemplo, scripts do lado do servidor que baixam páginas HTML e as processam também podem usar o DOM. Eles podem suportar apenas uma parte da especificação.

CSSOM para estilo
Há também uma especificação separada, CSS Object Model (CSSOM) para regras CSS e folhas de estilo, que explica como eles são representados como objetos e como lê-los e escrevê-los.

O CSSOM é usado junto com o DOM quando modificamos as regras de estilo do documento. Na prática, porém, o CSSOM raramente é necessário, porque raramente precisamos modificar as regras CSS do JavaScript (geralmente apenas adicionamos/removemos classes CSS, não modificamos suas regras CSS), mas isso também é possível.

BOM (modelo de objeto do navegador)
O Browser Object Model (BOM) representa objetos adicionais fornecidos pelo navegador (ambiente de host) para trabalhar com tudo, exceto o documento.

Por exemplo:

O objeto navegador fornece informações básicas sobre o navegador e o sistema operacional. Existem muitas propriedades, mas as duas mais conhecidas são: navigator.userAgent– sobre o navegador atual e navigator.platform– sobre a plataforma (pode ajudar a diferenciar entre Windows/Linux/Mac etc).
O objeto de localização nos permite ler a URL atual e pode redirecionar o navegador para uma nova.
Veja como podemos usar o locationobjeto:

*/

alert(location.href); // shows current URÇ
if (confirm("Go to Wikipedia?")) {
   location.href = "https://wikipedia.org"; // redirect the browser to another URL
}

/*

As funções alert/confirm/prompttambém fazem parte do BOM: elas não estão diretamente relacionadas ao documento, mas representam métodos puros de navegador para comunicação com o usuário.

Especificações
O BOM faz parte da especificação HTML geral .

Sim, você ouviu direito. A especificação HTML em https://html.spec.whatwg.org não é apenas sobre a “linguagem HTML” (tags, atributos), mas também abrange vários objetos, métodos e extensões DOM específicas do navegador. Isso é "HTML em termos gerais". Além disso, algumas peças têm especificações adicionais listadas em https://spec.whatwg.org .

Resumo
Falando em padrões, temos:

especificação DOM
Descreve a estrutura do documento, manipulações e eventos, consulte https://dom.spec.whatwg.org .
Especificação do CSSOM
Descreve folhas de estilo e regras de estilo, manipulações com elas e sua vinculação a documentos, consulte https://www.w3.org/TR/cssom-1/ .
especificação HTML
Descreve a linguagem HTML (por exemplo, tags) e também o BOM (modelo de objeto do navegador) – várias funções do navegador: setTimeout, alert, locatione assim por diante, consulte https://html.spec.whatwg.org . Ele pega a especificação DOM e a estende com muitas propriedades e métodos adicionais.
Além disso, algumas classes são descritas separadamente em https://spec.whatwg.org/ .

Observe esses links, pois há tanto para aprender que é impossível cobrir tudo e lembrar de tudo.

Quando você quiser ler sobre uma propriedade ou um método, o manual do Mozilla em https://developer.mozilla.org/en-US/ também é um bom recurso, mas a especificação correspondente pode ser melhor: é mais complexo e mais para ler, mas tornará seu conhecimento fundamental sólido e completo.

Para encontrar algo, geralmente é conveniente usar uma pesquisa na Internet “WHATWG [termo]” ou “MDN [termo]”, por exemplo https://google.com?q=whatwg+localstorage , https://google.com?q =mdn+localstorage .

Agora, vamos começar a aprender o DOM, porque o documento desempenha o papel central na interface do usuário.

*/
