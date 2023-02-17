/*

API de busca
Até agora, sabemos um pouco sobre fetch.

Vamos ver o restante da API, para cobrir todas as suas habilidades.

Observe:
Observação: a maioria dessas opções é usada raramente. Você pode pular este capítulo e ainda usar fetchbem.

Ainda assim, é bom saber o que fetchpode fazer, então se houver necessidade, você pode retornar e ler os detalhes.

Aqui está a lista completa de todas as fetchopções possíveis com seus valores padrão (alternativas nos comentários):

let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // the content type header value is usually auto-set
    // depending on the request body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
  referrer: "about:client", // or "" to send no Referer header,
  // or an url from the current origin
  referrerPolicy: "strict-origin-when-cross-origin", // no-referrer-when-downgrade, no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // a hash, like "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController to abort request
  window: window // null
});
Uma lista impressionante, certo?

Cobrimos method, headerse bodyno capítulo Buscar .

A signalopção é abordada em Fetch: Abort .

Agora vamos explorar os recursos restantes.

referenciador, referenciadorPolicy
Essas opções controlam como fetchdefine o cabeçalho HTTP Referer.

Normalmente esse cabeçalho é definido automaticamente e contém a url da página que fez a requisição. Na maioria dos cenários, não é importante, às vezes, por motivos de segurança, faz sentido removê-lo ou encurtá-lo.

A referreropção permite definir qualquer Referer(dentro da origem atual) ou removê-lo.

Para não enviar referenciador, defina uma string vazia:

fetch('/page', {
  referrer: "" // no Referer header
});
Para definir outro URL na origem atual:

fetch('/page', {
  // assuming we're on https://javascript.info
  // we can set any Referer header, but only within the current origin
  referrer: "https://javascript.info/anotherpage"
});
A referrerPolicyopção define regras gerais para arquivos Referer.

As solicitações são divididas em 3 tipos:

Pedido para a mesma origem.
Pedido para outra origem.
Solicitação de HTTPS para HTTP (de protocolo seguro para inseguro).
Ao contrário da referreropção que permite definir o Referervalor exato, referrerPolicyinforma ao navegador regras gerais para cada tipo de solicitação.

Os valores possíveis são descritos na especificação da política do referenciador :

"strict-origin-when-cross-origin"– o valor padrão: para mesma origem, envie o Referer, para origem cruzada, envie apenas a origem, a menos que seja HTTPS→HTTP, então não envie nada.
"no-referrer-when-downgrade"– full Refereré sempre enviado, a menos que enviemos uma solicitação de HTTPS para HTTP (para o protocolo menos seguro).
"no-referrer"– nunca envie Referer.
"origin"– envie apenas a origem em Referer, não o URL da página inteira, por exemplo, apenas http://site.comem vez de http://site.com/path.
"origin-when-cross-origin"– enviar o completo Refererpara a mesma origem, mas apenas a parte da origem para solicitações entre origens (como acima).
"same-origin"– enviar o full Refererpara a mesma origem, mas não Refererpara requisições entre origens.
"strict-origin"– envie apenas a origem, não Refererpara solicitações HTTPS→HTTP.
"unsafe-url"– sempre envie a url completa em Referer, mesmo para solicitações HTTPS→HTTP.
Aqui está uma tabela com todas as combinações:

Valor	Para a mesma origem	Para outra origem	HTTPS→HTTP
"no-referrer"	-	-	-
"no-referrer-when-downgrade"	completo	completo	-
"origin"	origem	origem	origem
"origin-when-cross-origin"	completo	origem	origem
"same-origin"	completo	-	-
"strict-origin"	origem	origem	-
"strict-origin-when-cross-origin"ou ""(padrão)	completo	origem	-
"unsafe-url"	completo	completo	completo
Digamos que temos uma zona administrativa com uma estrutura de URL que não deve ser conhecida fora do site.

Se enviarmos um fetch, por padrão, ele sempre enviará o Referercabeçalho com o URL completo da nossa página (exceto quando solicitamos de HTTPS para HTTP, então não Referer).

Ex Referer: https://javascript.info/admin/secret/paths.

Se quisermos que outros sites saibam apenas a parte de origem, não o caminho da URL, podemos definir a opção:

fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
Podemos colocá-lo em todas fetchas chamadas, talvez integrar à biblioteca JavaScript do nosso projeto que faz todas as solicitações e usos fetchinternos.

Sua única diferença em relação ao comportamento padrão é que, para requisições para outra origem, fetchenvia apenas a parte de origem da URL (por exemplo https://javascript.info, sem caminho). Para solicitações à nossa origem, ainda obtemos o total Referer(talvez útil para fins de depuração).

A política de referência não é apenas parafetch
A política de referência, descrita na especificação , não é apenas para fetch, mas é mais global.

Em particular, é possível definir a política padrão para toda a página usando o Referrer-Policycabeçalho HTTP ou por link, com <a rel="noreferrer">.

modo
A modeopção é uma proteção que evita solicitações ocasionais de origem cruzada:

"cors"– as solicitações de origem cruzada padrão são permitidas, conforme descrito em Fetch: Solicitações de origem cruzada ,
"same-origin"– solicitações de origem cruzada são proibidas,
"no-cors"– somente solicitações seguras de origem cruzada são permitidas.
Essa opção pode ser útil quando o URL fetchvem de terceiros e queremos um "interruptor de desligamento" para limitar os recursos de origem cruzada.

credenciais
A credentialsopção especifica se fetchdeve enviar cookies e cabeçalhos de autorização HTTP com a solicitação.

"same-origin"– o padrão, não envie para solicitações de origem cruzada,
"include"– enviar sempre, requer Access-Control-Allow-Credentialsdo servidor cross-origin para que o JavaScript acesse a resposta, que foi abordado no capítulo Fetch: Cross-Origin Requests ,
"omit"– nunca enviar, mesmo para solicitações de mesma origem.
cache
Por padrão, fetchas solicitações usam cache HTTP padrão. Ou seja, respeita os cabeçalhos Expirese Cache-Control, sends If-Modified-Sincee etc. Assim como as solicitações HTTP regulares fazem.

As cacheopções permitem ignorar o cache HTTP ou ajustar seu uso:

"default"– fetchusa regras e cabeçalhos padrão de cache HTTP,
"no-store"– ignora totalmente o HTTP-cache, este modo se torna o padrão se definirmos um cabeçalho If-Modified-Since, If-None-Match, If-Unmodified-Since, If-Match, ou If-Range,
"reload"– não pegue o resultado do cache HTTP (se houver), mas preencha o cache com a resposta (se os cabeçalhos de resposta permitirem esta ação),
"no-cache"– crie uma solicitação condicional se houver uma resposta em cache e, caso contrário, uma solicitação normal. Preencha o cache HTTP com a resposta,
"force-cache"– use uma resposta do cache HTTP, mesmo que seja obsoleto. Se não houver resposta no cache HTTP, faça uma solicitação HTTP regular, comporte-se normalmente,
"only-if-cached"– use uma resposta do cache HTTP, mesmo que seja obsoleto. Se não houver resposta no cache HTTP, haverá erro. Só funciona quando modeé "same-origin".
redirecionar
Normalmente, fetchsegue redirecionamentos HTTP de forma transparente, como 301, 302 etc.

A redirectopção permite alterar isso:

"follow"– o padrão, siga os redirecionamentos HTTP,
"error"– erro no caso de redirecionamento HTTP,
"manual"– permite processar redirecionamentos HTTP manualmente. Em caso de redirecionamento, obteremos um objeto de resposta especial, com response.type="opaqueredirect"status zerado/vazio e a maioria das outras propriedades.
integridade
A integrityopção permite verificar se a resposta corresponde à soma de verificação conhecida antecipadamente.

Conforme descrito na especificação , as funções de hash compatíveis são SHA-256, SHA-384 e SHA-512, podendo haver outras dependendo do navegador.

Por exemplo, estamos baixando um arquivo e sabemos que sua soma de verificação SHA-256 é “abcdef” (uma soma de verificação real é mais longa, é claro).

Podemos colocar na integrityopção, assim:

fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
Em seguida, fetchcalculará o SHA-256 por conta própria e o comparará com nossa string. Em caso de incompatibilidade, um erro é acionado.

mantenha vivo
A keepaliveopção indica que a solicitação pode “sobreviver” à página da Web que a iniciou.

Por exemplo, coletamos estatísticas sobre como o visitante atual usa nossa página (cliques do mouse, fragmentos de página que ele visualiza), para analisar e melhorar a experiência do usuário.

Quando o visitante sai da nossa página – gostaríamos de salvar os dados em nosso servidor.

Podemos usar o window.onunloadevento para isso:

window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
    keepalive: true
  });
};
Normalmente, quando um documento é descarregado, todas as solicitações de rede associadas são abortadas. Mas a keepaliveopção diz ao navegador para realizar a solicitação em segundo plano, mesmo depois de sair da página. Portanto, esta opção é essencial para que nossa solicitação seja bem-sucedida.

Tem algumas limitações:

Não podemos enviar megabytes: o limite do corpo para keepalivesolicitações é de 64 KB.
Se precisarmos coletar muitas estatísticas sobre a visita, devemos enviá-las regularmente em pacotes, para que não restem muitas para a última onunloadsolicitação.
Esse limite se aplica a todas keepaliveas solicitações juntas. Em outras palavras, podemos executar várias keepalivesolicitações em paralelo, mas a soma de seus comprimentos de corpo não deve exceder 64 KB.
Não podemos lidar com a resposta do servidor se o documento for descarregado. Portanto, em nosso exemplo, fetchserá bem-sucedido devido a keepalive, mas as funções subsequentes não funcionarão.
Na maioria dos casos, como enviar estatísticas, não é um problema, pois o servidor apenas aceita os dados e geralmente envia uma resposta vazia a essas solicitações.

*/