/*

Busca: solicitações de origem cruzada
Se enviarmos uma fetchsolicitação para outro site, provavelmente falhará.

Por exemplo, vamos tentar buscar http://example.com:

try {
  await fetch('http://example.com');
} catch(err) {
  alert(err); // Failed to fetch
}
A busca falha, conforme esperado.

O conceito principal aqui é a origem – um trio de domínio/porta/protocolo.

Solicitações de origem cruzada – aquelas enviadas para outro domínio (mesmo um subdomínio) ou protocolo ou porta – requerem cabeçalhos especiais do lado remoto.

Essa política é chamada de “CORS”: Cross-Origin Resource Sharing.

Por que o CORS é necessário? Uma breve história
CORS existe para proteger a internet de hackers malignos.

Seriamente. Façamos uma brevíssima digressão histórica.

Por muitos anos, um script de um site não conseguia acessar o conteúdo de outro site.

Essa regra simples, mas poderosa, era a base da segurança da Internet. Por exemplo, um script malicioso do site hacker.comnão pôde acessar a caixa de correio do usuário no site gmail.com. As pessoas se sentiam seguras.

O JavaScript também não tinha nenhum método especial para executar solicitações de rede naquele momento. Era uma linguagem de brinquedo para decorar uma página da web.

Mas os desenvolvedores da web exigiam mais poder. Uma variedade de truques foi inventada para contornar a limitação e fazer solicitações a outros sites.

Usando formulários
Uma maneira de se comunicar com outro servidor era enviar um arquivo <form>lá. As pessoas enviaram para <iframe>, apenas para permanecer na página atual, assim:

<!-- form target -->
<iframe name="iframe"></iframe>

<!-- a form could be dynamically generated and submitted by JavaScript -->
<form target="iframe" method="POST" action="http://another.com/…">
  ...
</form>
Assim, foi possível fazer uma solicitação GET/POST para outro site, mesmo sem métodos de rede, pois os formulários podem enviar dados para qualquer lugar. Mas como é proibido acessar o conteúdo de um <iframe>de outro site, não foi possível ler a resposta.

Para ser preciso, havia truques para isso, eles exigiam scripts especiais tanto no iframe quanto na página. Portanto, a comunicação com o iframe era tecnicamente possível. Agora não adianta entrar em detalhes, deixe esses dinossauros descansarem em paz.

Usando scripts
Outro truque era usar uma scriptetiqueta. Um script pode ter qualquer src, com qualquer domínio, como <script src="http://another.com/…">. É possível executar um script de qualquer site.

Se um site, por exemplo, another.comdestinado a expor dados para esse tipo de acesso, foi usado o chamado protocolo “JSONP (JSON com preenchimento)”.

Veja como funcionou.

Digamos que nós, em nosso site, precisamos obter os dados de http://another.com, como o clima:

Primeiro, antecipadamente, declaramos uma função global para aceitar os dados, por exemplo gotWeather, .

// 1. Declare the function to process the weather data
function gotWeather({ temperature, humidity }) {
  alert(`temperature: ${temperature}, humidity: ${humidity}`);
}
Em seguida, criamos uma <script>tag com src="http://another.com/weather.json?callback=gotWeather", usando o nome de nossa função como callbackparâmetro de URL.

let script = document.createElement('script');
script.src = `http://another.com/weather.json?callback=gotWeather`;
document.body.append(script);
O servidor remoto another.comgera dinamicamente um script que chama gotWeather(...)com os dados que deseja que recebamos.

// The expected answer from the server looks like this:
gotWeather({
  temperature: 25,
  humidity: 78
});
Quando o script remoto carrega e executa, gotWeatherexecuta e, como é nossa função, temos os dados.

Isso funciona e não viola a segurança, porque ambos os lados concordaram em passar os dados dessa maneira. E, quando ambos os lados concordam, definitivamente não é um hack. Ainda existem serviços que fornecem esse acesso, pois funciona até para navegadores muito antigos.

Depois de um tempo, os métodos de rede apareceram no JavaScript do navegador.

A princípio, as solicitações de origem cruzada eram proibidas. Mas, como resultado de longas discussões, as solicitações de origem cruzada foram permitidas, mas com quaisquer novos recursos que exigissem uma permissão explícita do servidor, expressa em cabeçalhos especiais.

Solicitações seguras
Existem dois tipos de solicitações de origem cruzada:

Pedidos seguros.
Todos os outros.
Solicitações seguras são mais simples de fazer, então vamos começar com elas.

Uma requisição é segura se satisfizer duas condições:

Método seguro : GET, POST ou HEAD
Cabeçalhos seguros – os únicos cabeçalhos personalizados permitidos são:
Accept,
Accept-Language,
Content-Language,
Content-Typecom o valor application/x-www-form-urlencoded, multipart/form-dataou text/plain.
Qualquer outro pedido é considerado “inseguro”. Por exemplo, uma solicitação com PUTmétodo ou com um API-Keycabeçalho HTTP não se encaixa nas limitações.

A diferença essencial é que uma solicitação segura pode ser feita com a <form>ou a <script>, sem nenhum método especial.

Portanto, mesmo um servidor muito antigo deve estar pronto para aceitar uma solicitação segura.

Ao contrário disso, solicitações com cabeçalhos não padrão ou, por exemplo, método DELETEnão podem ser criadas dessa maneira. Por muito tempo, o JavaScript não conseguiu fazer essas solicitações. Assim, um servidor antigo pode assumir que tais solicitações vêm de uma fonte privilegiada, “porque uma página da Web não pode enviá-las”.

Quando tentamos fazer uma solicitação insegura, o navegador envia uma solicitação especial de “preflight” que pergunta ao servidor – ele concorda em aceitar essas solicitações de origem cruzada ou não?

E, a menos que o servidor confirme isso explicitamente com cabeçalhos, uma solicitação insegura não é enviada.

Agora vamos entrar em detalhes.

CORS para solicitações seguras
Se uma solicitação for de origem cruzada, o navegador sempre adicionará o Origincabeçalho a ela.

Por exemplo, se solicitarmos https://anywhere.com/requestde https://javascript.info/page, os cabeçalhos serão parecidos com:

GET /request
Host: anywhere.com
Origin: https://javascript.info
...
Como você pode ver, o Origincabeçalho contém exatamente a origem (domínio/protocolo/porta), sem um caminho.

O servidor pode inspecionar o Origine, se concordar em aceitar tal solicitação, adicionar um cabeçalho especial Access-Control-Allow-Originà resposta. Esse cabeçalho deve conter a origem permitida (no nosso caso https://javascript.info), ou uma estrela *. Então a resposta é bem-sucedida, caso contrário, é um erro.

O navegador desempenha o papel de um mediador confiável aqui:

Ele garante que o correto Originseja enviado com uma solicitação de origem cruzada.
Ele verifica a permissão Access-Control-Allow-Originna resposta, se existir, o JavaScript tem permissão para acessar a resposta, caso contrário, falha com um erro.

Aqui está um exemplo de uma resposta permissiva do servidor:

200 OK
Content-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: https://javascript.info
Cabeçalhos de resposta
Para solicitação de origem cruzada, por padrão, o JavaScript pode acessar apenas os chamados cabeçalhos de resposta “seguros”:

Cache-Control
Content-Language
Content-Length
Content-Type
Expires
Last-Modified
Pragma
Acessar qualquer outro cabeçalho de resposta causa um erro.

Para conceder acesso JavaScript a qualquer outro cabeçalho de resposta, o servidor deve enviar o Access-Control-Expose-Headerscabeçalho. Ele contém uma lista separada por vírgulas de nomes de cabeçalho não seguros que devem ser disponibilizados.

Por exemplo:

200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
Content-Encoding: gzip
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Expose-Headers: Content-Encoding,API-Key
Com tal Access-Control-Expose-Headerscabeçalho, o script tem permissão para ler os cabeçalhos Content-Encodinge API-Keyda resposta.

Pedidos “inseguros”
Podemos usar qualquer método HTTP: não apenas GET/POST, mas também PATCH, DELETEe outros.

Há algum tempo, ninguém poderia imaginar que uma página da Web pudesse fazer tais solicitações. Portanto, ainda podem existir webservices que tratam um método não padrão como um sinal: “Isso não é um navegador”. Eles podem levar isso em consideração ao verificar os direitos de acesso.

Então, para evitar mal-entendidos, qualquer requisição “insegura” – que não podia ser feito antigamente, o navegador não faz tais requisições de imediato. Primeiro, ele envia uma solicitação preliminar, chamada de “preflight”, para pedir permissão.

Uma solicitação de simulação usa o método OPTIONS, sem corpo e três cabeçalhos:

Access-Control-Request-Methodheader tem o método da solicitação insegura.
Access-Control-Request-Headersheader fornece uma lista separada por vírgulas de seus cabeçalhos HTTP inseguros.
Origincabeçalho informa de onde veio a solicitação. (tal como https://javascript.info)
Se o servidor concordar em atender às solicitações, ele deve responder com corpo vazio, status 200 e cabeçalhos:

Access-Control-Allow-Origindeve ser *ou a origem solicitante, como https://javascript.info, para permitir isso.
Access-Control-Allow-Methodsdeve ter o método permitido.
Access-Control-Allow-Headersdeve ter uma lista de cabeçalhos permitidos.
Além disso, o cabeçalho Access-Control-Max-Agepode especificar um número de segundos para armazenar em cache as permissões. Portanto, o navegador não precisará enviar um preflight para solicitações subsequentes que satisfaçam as permissões fornecidas.

Vamos ver como funciona passo a passo no exemplo de uma PATCHrequisição cross-origin (esse método é frequentemente usado para atualização de dados):

let response = await fetch('https://site.com/service.json', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'API-Key': 'secret'
  }
});
Existem três razões pelas quais a solicitação não é segura (uma é suficiente):

MétodoPATCH
Content-Typenão é um de: application/x-www-form-urlencoded, multipart/form-data, text/plain.
Cabeçalho “inseguro” API-Key.
Etapa 1 (solicitação de comprovação)
Antes de enviar tal solicitação, o navegador, por conta própria, envia uma solicitação de comprovação semelhante a esta:

OPTIONS /service.json
Host: site.com
Origin: https://javascript.info
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: Content-Type,API-Key
Método: OPTIONS.
O caminho – exatamente o mesmo que o pedido principal: /service.json.
Cabeçalhos especiais de origem cruzada:
Origin– a origem da fonte.
Access-Control-Request-Method– método solicitado.
Access-Control-Request-Headers– uma lista separada por vírgulas de cabeçalhos “inseguros”.
Passo 2 (resposta pré-voo)
O servidor deve responder com o status 200 e os cabeçalhos:

Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Methods: PATCH
Access-Control-Allow-Headers: Content-Type,API-Key.
Isso permite a comunicação futura, caso contrário, um erro é acionado.

Se o servidor espera outros métodos e cabeçalhos no futuro, faz sentido permiti-los antecipadamente adicionando-os à lista.

Por exemplo, esta resposta também permite PUT, DELETEe cabeçalhos adicionais:

200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400
Agora o navegador pode ver que PATCHestá dentro Access-Control-Allow-Methodse Content-Type,API-Keyestá na lista Access-Control-Allow-Headers, então ele envia a solicitação principal.

Se houver o cabeçalho Access-Control-Max-Agecom um número de segundos, as permissões de simulação serão armazenadas em cache pelo tempo determinado. A resposta acima será armazenada em cache por 86400 segundos (um dia). Dentro desse prazo, as solicitações subsequentes não causarão uma simulação. Supondo que eles se encaixem nas licenças em cache, eles serão enviados diretamente.

Etapa 3 (solicitação real)
Quando a simulação for bem-sucedida, o navegador fará a solicitação principal. O processo aqui é o mesmo para solicitações seguras.

A solicitação principal tem o Origincabeçalho (por ser de origem cruzada):

PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: https://javascript.info
Etapa 4 (resposta real)
O servidor não deve esquecer de adicionar Access-Control-Allow-Originà resposta principal. Um preflight bem-sucedido não isenta disso:

Access-Control-Allow-Origin: https://javascript.info
Então o JavaScript é capaz de ler a resposta do servidor principal.

Observe:
A solicitação de comprovação ocorre “nos bastidores”, é invisível para o JavaScript.

O JavaScript só obtém a resposta para a solicitação principal ou um erro se não houver permissão do servidor.

Credenciais
Uma solicitação de origem cruzada iniciada por código JavaScript por padrão não traz nenhuma credencial (cookies ou autenticação HTTP).

Isso é incomum para solicitações HTTP. Normalmente, uma solicitação para http://site.comé acompanhada por todos os cookies desse domínio. As solicitações de origem cruzada feitas por métodos JavaScript, por outro lado, são uma exceção.

Por exemplo, fetch('http://another.com')não envia nenhum cookie, mesmo aqueles (!) que pertencem ao another.comdomínio.

Por que?

Isso porque uma solicitação com credenciais é muito mais poderosa do que sem elas. Se permitido, concede ao JavaScript todo o poder para agir em nome do usuário e acessar informações confidenciais usando suas credenciais.

O servidor realmente confia tanto no script? Em seguida, ele deve permitir explicitamente solicitações com credenciais com um cabeçalho adicional.

Para enviar credenciais em fetch, precisamos adicionar a opção credentials: "include", assim:

fetch('http://another.com', {
  credentials: "include"
});
Agora fetchenvia cookies originados another.comcom solicitação para esse site.

Se o servidor concordar em aceitar a solicitação com credenciais , ele deverá adicionar um cabeçalho Access-Control-Allow-Credentials: trueà resposta, além de Access-Control-Allow-Origin.

Por exemplo:

200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
Atenção: Access-Control-Allow-Originé proibido o uso de estrela *para solicitações com credenciais. Como mostrado acima, deve fornecer a origem exata lá. Essa é uma medida de segurança adicional, para garantir que o servidor realmente saiba em quem ele confia para fazer tais solicitações.

Resumo
Do ponto de vista do navegador, existem dois tipos de requisições cross-origin: “safe” e todas as outras.

Os pedidos “seguros” devem satisfazer as seguintes condições:

Método: GET, POST ou HEAD.
Cabeçalhos – podemos definir apenas:
Accept
Accept-Language
Content-Language
Content-Typeao valor application/x-www-form-urlencoded, multipart/form-dataou text/plain.
A diferença essencial é que solicitações seguras eram possíveis desde os tempos antigos usando <form>ou <script>tags, enquanto as inseguras eram impossíveis para os navegadores por muito tempo.

Então, a diferença prática é que as requisições seguras são enviadas na hora, com o Origincabeçalho, enquanto nas demais o navegador faz uma requisição preliminar “preflight”, pedindo permissão.

Para solicitações seguras:

→ O navegador envia o Origincabeçalho com a origem.
← Para solicitações sem credenciais (não enviadas por padrão), o servidor deve definir:
Access-Control-Allow-Originpara *ou mesmo valor queOrigin
← Para solicitações com credenciais, o servidor deve definir:
Access-Control-Allow-Originpara o mesmo valor queOrigin
Access-Control-Allow-Credentialsparatrue
Além disso, para conceder acesso JavaScript a quaisquer cabeçalhos de resposta, exceto , , , Cache-Controlou Content-Language, Content-Typeo servidor deve listar os permitidos em header.ExpiresLast-ModifiedPragmaAccess-Control-Expose-Headers

Para solicitações inseguras, uma solicitação preliminar de “preflight” é emitida antes da solicitada:

→ O navegador envia uma OPTIONSsolicitação para a mesma URL, com os cabeçalhos:
Access-Control-Request-Methodsolicitou o método.
Access-Control-Request-Headerslista cabeçalhos solicitados não seguros.
← O servidor deve responder com o status 200 e os cabeçalhos:
Access-Control-Allow-Methodscom uma lista de métodos permitidos,
Access-Control-Allow-Headerscom uma lista de cabeçalhos permitidos,
Access-Control-Max-Agecom um número de segundos para armazenar em cache as permissões.
Em seguida, a solicitação real é enviada e o esquema “seguro” anterior é aplicado.

*/