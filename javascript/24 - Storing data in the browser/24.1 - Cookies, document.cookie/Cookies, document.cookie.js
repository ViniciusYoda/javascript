/*

Cookies, documento.cookie
Cookies são pequenas cadeias de dados que são armazenadas diretamente no navegador. Eles fazem parte do protocolo HTTP, definido pela especificação RFC 6265 .

Os cookies geralmente são definidos por um servidor da Web usando o Set-Cookiecabeçalho HTTP de resposta. Em seguida, o navegador os adiciona automaticamente a (quase) todas as solicitações para o mesmo domínio usando o Cookiecabeçalho HTTP.

Um dos casos de uso mais difundidos é a autenticação:

Ao entrar, o servidor usa o Set-Cookiecabeçalho HTTP na resposta para definir um cookie com um “identificador de sessão” exclusivo.
Da próxima vez que a solicitação for enviada para o mesmo domínio, o navegador enviará o cookie pela rede usando o Cookiecabeçalho HTTP.
Assim, o servidor sabe quem fez a solicitação.
Também podemos acessar os cookies do navegador, usando document.cookiepropriedade.

Há muitas coisas complicadas sobre cookies e suas opções. Neste capítulo, vamos abordá-los em detalhes.

Lendo de document.cookie
O seu navegador armazena algum cookie deste site? Vamos ver:

// At javascript.info, we use Google Analytics for statistics,
// so there should be some cookies
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
O valor de document.cookieconsiste em name=valuepares, delimitados por ;. Cada um é um cookie separado.

Para encontrar um determinado cookie, podemos dividir document.cookiepor ;e, em seguida, encontrar o nome correto. Podemos usar uma expressão regular ou funções de matriz para fazer isso.

Deixamos como exercício para o leitor. Além disso, no final do capítulo você encontrará funções auxiliares para manipular cookies.

Gravando em document.cookie
Podemos escrever para document.cookie. Mas não é uma propriedade de dados, é um acessador (getter/setter) . Uma atribuição a ele é tratada de forma especial.

Uma operação de gravação document.cookieatualiza apenas os cookies mencionados nela, mas não toca em outros cookies.

Por exemplo, esta chamada define um cookie com o nome usere o valor John:

document.cookie = "user=John"; // update only cookie named 'user'
alert(document.cookie); // show all cookies
Se você executá-lo, provavelmente verá vários cookies. Isso ocorre porque a document.cookie=operação não substitui todos os cookies. Ele apenas define o cookie mencionado user.

Tecnicamente, nome e valor podem ter qualquer caractere. Para manter a formatação válida, eles devem ser escapados usando uma função interna encodeURIComponent:

// special characters (spaces), need encoding
let name = "my name";
let value = "John Smith"

// encodes the cookie as my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
Limitações
Existem algumas limitações:

O name=valuepar, após encodeURIComponent, não deve ultrapassar 4KB. Portanto, não podemos armazenar nada grande em um cookie.
O número total de cookies por domínio é limitado a cerca de 20+, o limite exato depende do navegador.
Os cookies têm várias opções, muitas delas são importantes e devem ser configuradas.

As opções são listadas após key=value, delimitadas por ;, assim:

document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
caminho
path=/mypath
O prefixo do caminho do URL deve ser absoluto. Isso torna o cookie acessível para páginas nesse caminho. Por padrão, é o caminho atual.

Se um cookie for definido com path=/admin, ele ficará visível nas páginas /admine /admin/something, mas não em /homeou /adminpage.

Normalmente, devemos definir pathcomo raiz: path=/para tornar o cookie acessível a partir de todas as páginas do site.

domínio
domain=site.com
Um domínio define onde o cookie está acessível. Na prática, porém, existem limitações. Não podemos definir nenhum domínio.

Não há como permitir que um cookie seja acessível a partir de outro domínio de segundo nível, portanto, other.comnunca receberá um cookie definido como site.com.

É uma restrição de segurança, para nos permitir armazenar dados sensíveis em cookies que devem estar disponíveis apenas em um site.

Por padrão, um cookie é acessível apenas no domínio que o definiu.

Observe que, por padrão, um cookie também não é compartilhado com um subdomínio, como forum.site.com.

// if we set a cookie at site.com website...
document.cookie = "user=John"

// ...we won't see it at forum.site.com
alert(document.cookie); // no user
…Mas isso pode ser mudado. Se quisermos permitir que subdomínios como forum.site.comobter um cookie definido em site.com, isso é possível.

Para que isso aconteça, ao definir um cookie em site.com, devemos definir explicitamente a domainopção para o domínio raiz: domain=site.com. Então, todos os subdomínios verão esse cookie.

Por exemplo:

// at site.com
// make the cookie accessible on any subdomain *.site.com:
document.cookie = "user=John; domain=site.com"

// later

// at forum.site.com
alert(document.cookie); // has cookie user=John
Por razões históricas, domain=.site.com(com um ponto antes site.com) também funciona da mesma forma, permitindo o acesso ao cookie a partir de subdomínios. Essa é uma notação antiga e deve ser usada se precisarmos oferecer suporte a navegadores muito antigos.

Para resumir, a domainopção permite tornar um cookie acessível em subdomínios.

expira, idade máxima
Por padrão, se um cookie não tiver uma dessas opções, ele desaparece quando o navegador é fechado. Esses cookies são chamados de “cookies de sessão”

Para permitir que os cookies sobrevivam ao fechamento do navegador, podemos definir a opção expiresou max-age.

expires=Tue, 19 Jan 2038 03:14:07 GMT
A data de expiração do cookie define a hora em que o navegador o excluirá automaticamente.

A data deve estar exatamente neste formato, no fuso horário GMT. Podemos usar date.toUTCStringpara obtê-lo. Por exemplo, podemos configurar o cookie para expirar em 1 dia:

// +1 day from now
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
Se definirmos expiresuma data no passado, o cookie será excluído.

max-age=3600
É uma alternativa expirese especifica a expiração do cookie em segundos a partir do momento atual.

Se definido como zero ou um valor negativo, o cookie é excluído:

// cookie will die in +1 hour from now
document.cookie = "user=John; max-age=3600";

// delete cookie (let it expire right now)
document.cookie = "user=John; max-age=0";
seguro
secure
O cookie deve ser transferido apenas por HTTPS.

Por padrão, se definirmos um cookie em http://site.com, ele também aparecerá em https://site.come vice-versa.

Ou seja, os cookies são baseados em domínio, não fazem distinção entre os protocolos.

Com esta opção, se um cookie for definido por https://site.com, ele não aparecerá quando o mesmo site for acessado por HTTP, como http://site.com. Portanto, se um cookie tiver conteúdo confidencial que nunca deve ser enviado por HTTP não criptografado, o securesinalizador é a coisa certa.

// assuming we're on https:// now
// set the cookie to be secure (only accessible over HTTPS)
document.cookie = "user=John; secure";
mesmo site
Esse é outro atributo de segurança samesite. Ele foi projetado para proteger dos chamados ataques XSRF (falsificação de solicitação entre sites).

Para entender como funciona e quando é útil, vamos dar uma olhada nos ataques XSRF.

ataque XSRF
Imagine, você está logado no site bank.com. Ou seja: você tem um cookie de autenticação desse site. Seu navegador o envia a bank.comcada solicitação, para que ele o reconheça e execute todas as operações financeiras confidenciais.

Agora, enquanto navega na web em outra janela, você acidentalmente chega a outro site evil.com. Esse site tem código JavaScript que envia um formulário <form action="https://bank.com/pay">com bank.comcampos que iniciam uma transação na conta do hacker.

O navegador envia cookies sempre que você visita o site bank.com, mesmo que o formulário tenha sido enviado de evil.com. Assim, o banco reconhece você e realmente realiza o pagamento.


Esse é o chamado ataque “Cross-Site Request Forgery” (em resumo, XSRF).

Bancos reais estão protegidos disso, é claro. Todos os formulários gerados por bank.compossuem um campo especial, o chamado “token de proteção XSRF”, que uma página maligna não pode gerar ou extrair de uma página remota. Ele pode enviar um formulário lá, mas não pode recuperar os dados. O site bank.comverifica esse token em todas as formas que recebe.

Essa proteção leva tempo para ser implementada. Precisamos garantir que cada formulário tenha o campo de token necessário e também devemos verificar todas as solicitações.

Insira a opção de cookie samesite
A samesiteopção de cookie fornece outra forma de proteção contra tais ataques, que (em teoria) não deveria exigir “tokens de proteção xsrf”.

Tem dois valores possíveis:

samesite=strict(o mesmo que samesitesem valor)
Um cookie com samesite=strictnunca é enviado se o usuário vier de fora do mesmo site.

Em outras palavras, se um usuário segue um link de seu e-mail ou envia um formulário de evil.com, ou faz qualquer operação originada de outro domínio, o cookie não é enviado.

Se os cookies de autenticação tiverem a samesiteopção, um ataque XSRF não terá chances de sucesso, porque um envio de evil.comvem sem cookies. Assim bank.comnão reconhecerá o utilizador e não procederá ao pagamento.

A proteção é bastante confiável. Somente as operações provenientes de bank.comenviarão o samesitecookie, por exemplo, um envio de formulário de outra página em bank.com.

Embora haja um pequeno inconveniente.

Quando um usuário segue um link legítimo para bank.com, como de suas próprias notas, ele ficará surpreso ao bank.comnão reconhecê-lo. De fato, samesite=strictos cookies não são enviados nesse caso.

Poderíamos contornar isso usando dois cookies: um para “reconhecimento geral”, apenas para dizer: “Olá, John”, e outro para operações de alteração de dados com samesite=strict. Então, uma pessoa que vem de fora do site verá um bem-vindo, mas os pagamentos devem ser iniciados no site do banco, para que o segundo cookie seja enviado.

samesite=lax
Uma abordagem mais descontraída que também protege contra XSRF e não prejudica a experiência do usuário.

O modo Lax, assim como o strict, proíbe o navegador de enviar cookies vindos de fora do site, mas adiciona uma exceção.

Um samesite=laxcookie é enviado se ambas as condições forem verdadeiras:

O método HTTP é “seguro” (por exemplo, GET, mas não POST).

A lista completa de métodos HTTP seguros está na especificação RFC7231 . Basicamente, esses são os métodos que devem ser usados ​​para ler, mas não para escrever os dados. Eles não devem executar nenhuma operação de alteração de dados. Seguir um link é sempre GET, o método seguro.

A operação executa uma navegação de nível superior (altera o URL na barra de endereço do navegador).

Isso geralmente é verdade, mas se a navegação for executada em um <iframe>, não será de nível superior. Além disso, os métodos JavaScript para solicitações de rede não executam nenhuma navegação e, portanto, não se encaixam.

Então, o que samesite=laxfunciona é basicamente permitir que a operação mais comum de “ir para a URL” tenha cookies. Por exemplo, abrir um link de site a partir de notas que satisfaçam essas condições.

Mas qualquer coisa mais complicada, como uma solicitação de rede de outro site ou um envio de formulário, perde os cookies.

Se estiver bom para você, adicionar samesite=laxprovavelmente não interromperá a experiência do usuário e adicionará proteção.

No geral, samesiteé uma ótima opção.

Há uma desvantagem:

samesiteé ignorado (não suportado) por navegadores muito antigos, ano de 2017 ou mais.
Portanto, se confiarmos apenas no samesitefornecimento de proteção, os navegadores antigos ficarão vulneráveis.

Mas certamente podemos usar samesitejunto com outras medidas de proteção, como tokens xsrf, para adicionar uma camada adicional de defesa e então, no futuro, quando os navegadores antigos morrerem, provavelmente seremos capazes de descartar tokens xsrf.

httpOnly
Esta opção não tem nada a ver com JavaScript, mas temos que mencioná-la para completar.

O servidor web usa o Set-Cookiecabeçalho para definir um cookie. Além disso, pode definir a httpOnlyopção.

Esta opção proíbe qualquer acesso JavaScript ao cookie. Não podemos ver tal cookie ou manipulá-lo usando document.cookie.

Isso é usado como uma medida de precaução, para proteger de certos ataques quando um hacker injeta seu próprio código JavaScript em uma página e espera que um usuário visite essa página. Isso não deveria ser possível, os hackers não deveriam ser capazes de injetar seu código em nosso site, mas pode haver bugs que os permitem fazer isso.

Normalmente, se isso acontecer e um usuário visitar uma página da Web com o código JavaScript do hacker, esse código será executado e obtido acesso com document.cookiecookies do usuário contendo informações de autenticação. Isso é ruim.

Mas se um cookie é httpOnly, então document.cookienão o vê, então está protegido.

Apêndice: Funções de cookies
Aqui está um pequeno conjunto de funções para trabalhar com cookies, mais conveniente do que uma modificação manual de document.cookie.

Existem muitas bibliotecas de cookies para isso, então elas são para fins de demonstração. Totalmente funcionando embora.

getCookie(nome)
O caminho mais curto para acessar um cookie é usar uma expressão regular .

A função getCookie(name)retorna o cookie com o dado name:

// returns the cookie with the given name,
// or undefined if not found
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
Aqui new RegExpé gerado dinamicamente, para corresponder ; name=<value>.

Observe que um valor de cookie é codificado, então getCookieusa uma função interna decodeURIComponentpara decodificá-lo.

setCookie(nome, valor, opções)
Define o cookie namepara o dado valuepor path=/padrão (pode ser modificado para adicionar outros padrões):

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // add other defaults here if necessary
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// Example of use:
setCookie('user', 'John', {secure: true, 'max-age': 3600});
deleteCookie(nome)
Para excluir um cookie, podemos chamá-lo com uma data de expiração negativa:

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
A atualização ou exclusão deve usar o mesmo caminho e domínio
Observação: quando atualizamos ou excluímos um cookie, devemos usar exatamente as mesmas opções de caminho e domínio de quando o configuramos.

Juntos: cookie.js .

Apêndice: Cookies de terceiros
Um cookie é chamado de “terceiro” se for colocado por um domínio diferente da página que o usuário está visitando.

Por exemplo:

Uma página em site.comcarrega um banner de outro site: <img src="https://ads.com/banner.png">.

Junto com o banner, o servidor remoto em ads.compode definir o Set-Cookiecabeçalho com um cookie como id=1234. Esse cookie é originário do ads.comdomínio e só será visível em ads.com:


Na próxima vez que ads.comfor acessado, o servidor remoto obtém o idcookie e reconhece o usuário:


O que é ainda mais importante é que, quando o usuário passa de site.comum outro site other.com, que também possui um banner, ele ads.comobtém o cookie, pois pertence a ads.com, reconhecendo assim o visitante e rastreando-o enquanto ele se move entre os sites:


Os cookies de terceiros são tradicionalmente usados ​​para serviços de rastreamento e anúncios, devido à sua natureza. Eles estão vinculados ao domínio de origem, portanto, ads.compodem rastrear o mesmo usuário entre sites diferentes, se todos o acessarem.

Naturalmente, algumas pessoas não gostam de ser rastreadas, então os navegadores permitem desabilitar esses cookies.

Além disso, alguns navegadores modernos empregam políticas especiais para esses cookies:

O Safari não permite cookies de terceiros.
O Firefox vem com uma “lista negra” de domínios de terceiros onde bloqueia cookies de terceiros.
Observe:
Se carregarmos um script de um domínio de terceiros, como <script src="https://google-analytics.com/analytics.js">, e esse script usar document.cookiepara definir um cookie, esse cookie não é de terceiros.

Se um script definir um cookie, não importa de onde veio o script – o cookie pertence ao domínio da página da web atual.

Apêndice: GDPR
Este tópico não está relacionado ao JavaScript, apenas algo para se ter em mente ao definir cookies.

Existe uma legislação na Europa chamada GDPR, que impõe um conjunto de regras para que os sites respeitem a privacidade dos usuários. Uma dessas regras é exigir uma permissão explícita para rastrear cookies do usuário.

Observe que isso é apenas sobre rastreamento/identificação/autorização de cookies.

Portanto, se definirmos um cookie que apenas salva algumas informações, mas não rastreia nem identifica o usuário, somos livres para fazê-lo.

Mas se vamos definir um cookie com uma sessão de autenticação ou um ID de rastreamento, o usuário deve permitir isso.

Os sites geralmente têm duas variantes do seguinte GDPR. Você já deve ter visto os dois na web:

Se um site deseja definir cookies de rastreamento apenas para usuários autenticados.

Para isso, o formulário de registro deve ter uma caixa de seleção como “aceitar a política de privacidade” (que descreve como os cookies são usados), o usuário deve marcá-la e o site fica livre para definir cookies de autenticação.

Se um site deseja definir cookies de rastreamento para todos.

Para fazer isso legalmente, um site mostra uma “tela inicial” modal para os recém-chegados e exige que eles concordem com os cookies. Em seguida, o site pode defini-los e permitir que as pessoas vejam o conteúdo. Isso pode ser perturbador para novos visitantes. Ninguém gosta de ver essas telas iniciais modais “obrigatórias” em vez do conteúdo. Mas o GDPR requer um acordo explícito.

O GDPR não é apenas sobre cookies, mas também sobre outras questões relacionadas à privacidade, mas isso está muito além do nosso escopo.

Resumo
document.cookiefornece acesso a cookies.

As operações de gravação modificam apenas os cookies mencionados nela.
O nome/valor deve ser codificado.
Um cookie não pode exceder 4 KB de tamanho. O número de cookies permitidos em um domínio é de cerca de 20+ (varia de acordo com o navegador).
Opções de cookies:

path=/, por padrão, caminho atual, torna o cookie visível apenas nesse caminho.
domain=site.com, por padrão, um cookie é visível apenas no domínio atual. Se o domínio for definido explicitamente, o cookie ficará visível nos subdomínios.
expiresou max-agedefine o tempo de expiração do cookie. Sem eles, o cookie morre quando o navegador é fechado.
securetorna o cookie somente HTTPS.
samesiteproíbe o navegador de enviar o cookie com solicitações vindas de fora do site. Isso ajuda a prevenir ataques XSRF.
Adicionalmente:

Cookies de terceiros podem ser proibidos pelo navegador, por exemplo, o Safari faz isso por padrão.
Ao definir um cookie de rastreamento para cidadãos da UE, o GDPR requer permissão.

*/