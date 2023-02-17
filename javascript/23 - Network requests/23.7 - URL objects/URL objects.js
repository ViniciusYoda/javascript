/*

Objetos de URL
A classe de URL integrada fornece uma interface conveniente para criar e analisar URLs.

Não há métodos de rede que exijam exatamente um URLobjeto, as strings são boas o suficiente. Então, tecnicamente, não precisamos usar URL. Mas às vezes pode ser realmente útil.

Criando um URL
A sintaxe para criar um novo URLobjeto:

new URL(url, [base])
url– o URL completo ou apenas o caminho (se a base estiver definida, veja abaixo),
base– um URL base opcional: se definido e urlo argumento tiver apenas o caminho, o URL será gerado em relação a base.
Por exemplo:

let url = new URL('https://javascript.info/profile/admin');
Essas duas URLs são iguais:

let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
Podemos criar facilmente uma nova URL com base no caminho relativo a uma URL existente:

let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
O URLobjeto nos permite acessar imediatamente seus componentes, então é uma boa maneira de analisar a url, por exemplo:

let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
Aqui está a folha de dicas para componentes de URL:


hrefé o URL completo, igual aurl.toString()
protocoltermina com o caractere de dois pontos:
search– uma string de parâmetros, começa com o ponto de interrogação?
hashcomeça com o caractere hash#
pode haver também usere passwordpropriedades se a autenticação HTTP estiver presente: http://login:password@site.com(não pintado acima, raramente usado).
Podemos passar URLobjetos para métodos de rede (e a maioria dos outros) em vez de uma string
Podemos usar um URLobjeto em fetchou XMLHttpRequest, em quase todos os lugares onde uma string de URL é esperada.

Geralmente, o URLobjeto pode ser passado para qualquer método em vez de uma string, já que a maioria dos métodos realizará a conversão de string, que transforma um URLobjeto em uma string com URL completa.

SearchParams “?…”
Digamos que queremos criar um URL com determinados parâmetros de pesquisa, por exemplo, https://google.com/search?query=JavaScript.

Podemos fornecê-los na string de URL:

new URL('https://google.com/search?query=JavaScript')
…Mas os parâmetros precisam ser codificados se contiverem espaços, letras não latinas, etc. (mais sobre isso abaixo).

Portanto, existe uma propriedade de URL para isso: url.searchParams, um objeto do tipo URLSearchParams .

Ele fornece métodos convenientes para parâmetros de pesquisa:

append(name, value)– adicione o parâmetro por name,
delete(name)– remover o parâmetro por name,
get(name)– obter o parâmetro por name,
getAll(name)– obter todos os parâmetros com o mesmo name(isso é possível, por exemplo ?user=John&user=Pete),
has(name)– verifique a existência do parâmetro por name,
set(name, value)– definir/substituir o parâmetro,
sort()– classificar parâmetros por nome, raramente necessário,
…e também é iterável, semelhante ao Map.
Um exemplo com parâmetros que contêm espaços e sinais de pontuação:

let url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // added parameter with a space and !

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // added parameter with a colon :

// parameters are automatically encoded
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// iterate over search parameters (decoded)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, then tbs=qdr:y
}
Codificação
Existe um padrão RFC3986 que define quais caracteres são permitidos em URLs e quais não são.

Aqueles que não são permitidos devem ser codificados, por exemplo, letras não latinas e espaços – substituídos por seus códigos UTF-8, prefixados por , %como %20(um espaço pode ser codificado por +, por razões históricas, mas isso é uma exceção).

A boa notícia é que URLos objetos lidam com tudo isso automaticamente. Apenas fornecemos todos os parâmetros não codificados e, em seguida, convertemos URLem string:

// using some cyrillic characters for this example

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
Como você pode ver, tanto Тестno caminho da url quanto ъno parâmetro estão codificados.

A URL ficou mais longa, porque cada letra cirílica é representada com dois bytes em UTF-8, então são duas %..entidades.

Codificando strings
Antigamente, antes que URLos objetos aparecessem, as pessoas usavam strings para URLs.

A partir de agora, URLos objetos costumam ser mais convenientes, mas as strings também podem ser usadas. Em muitos casos, usar uma string torna o código mais curto.

Se usarmos uma string, porém, precisamos codificar/decodificar caracteres especiais manualmente.

Existem funções internas para isso:

encodeURI – codifica a URL como um todo.
decodeURI – decodifica-o de volta.
encodeURIComponent – ​​codifica um componente de URL, como um parâmetro de pesquisa, um hash ou um nome de caminho.
decodeURIComponent – ​​decodifica-o de volta.
Uma pergunta natural é: “Qual é a diferença entre encodeURIComponente encodeURI? Quando devemos usar qualquer um?”

Isso é fácil de entender se olharmos para a URL, dividida em componentes na imagem acima:

https://site.com:8080/path/page?p1=v1&p2=v2#hash
Como podemos ver, caracteres como :, ?, =, &, #são permitidos na URL.

…Por outro lado, se observarmos um único componente de URL, como um parâmetro de pesquisa, esses caracteres devem ser codificados para não quebrar a formatação.

encodeURIcodifica apenas caracteres que são totalmente proibidos na URL.
encodeURIComponentcodifica os mesmos caracteres e, além deles, os caracteres #, $, &, +, ,, /, :, ;, =e ?.@
Assim, para uma URL inteira, podemos usar encodeURI:

// using cyrillic characters in url path
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
…enquanto para parâmetros de URL devemos usar encodeURIComponent:

let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
Compare com encodeURI:

let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
Como podemos ver, encodeURInão codifica &, pois este é um caractere legítimo na URL como um todo.

Mas devemos codificar &dentro de um parâmetro de pesquisa, caso contrário, obtemos q=Rock&Roll– isso é, na verdade, q=Rockmais algum parâmetro obscuro Roll. Não como pretendido.

Portanto, devemos usar apenas encodeURIComponentpara cada parâmetro de pesquisa, para inseri-lo corretamente na string da URL. O mais seguro é codificar o nome e o valor, a menos que tenhamos certeza absoluta de que ele só permite caracteres.

Diferença de codificação em comparação comURL
As classes URL e URLSearchParams são baseadas na especificação de URI mais recente: RFC3986 , enquanto encode*as funções são baseadas na versão obsoleta RFC2396 .

Existem algumas diferenças, por exemplo, os endereços IPv6 são codificados de forma diferente:

// valid url with IPv6 address
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
Como podemos ver, encodeURIcolchetes substituídos [...], isso não está correto, o motivo é: urls IPv6 não existiam na época da RFC2396 (agosto de 1998).

Esses casos são raros, encode*as funções funcionam bem na maioria das vezes.

*/