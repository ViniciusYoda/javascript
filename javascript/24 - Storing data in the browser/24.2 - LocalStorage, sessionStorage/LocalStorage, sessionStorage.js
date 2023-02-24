/*

LocalStorage, sessionStorage
Objetos de armazenamento da Web localStoragee sessionStoragepermitem salvar pares chave/valor no navegador.

O que é interessante sobre eles é que os dados sobrevivem a uma atualização de página (para sessionStorage) e até mesmo a uma reinicialização completa do navegador (para localStorage). Veremos isso muito em breve.

Já temos biscoitos. Por que objetos adicionais?

Ao contrário dos cookies, os objetos de armazenamento da web não são enviados ao servidor com cada solicitação. Por causa disso, podemos armazenar muito mais. A maioria dos navegadores modernos permite pelo menos 5 megabytes de dados (ou mais) e possui configurações para configurar isso.
Também ao contrário dos cookies, o servidor não pode manipular objetos de armazenamento por meio de cabeçalhos HTTP. Tudo é feito em JavaScript.
O armazenamento é vinculado à origem (domínio/protocolo/triplo de porta). Ou seja, diferentes protocolos ou subdomínios inferem diferentes objetos de armazenamento, eles não podem acessar dados uns dos outros.
Ambos os objetos de armazenamento fornecem os mesmos métodos e propriedades:

setItem(key, value)– armazena o par chave/valor.
getItem(key)– obter o valor por chave.
removeItem(key)– remova a chave com seu valor.
clear()– apague tudo.
key(index)– obter a chave em uma determinada posição.
length– o número de itens armazenados.
Como você pode ver, é como uma Mapcoleção ( setItem/getItem/removeItem), mas também permite acesso por índice com key(index).

Vamos ver como isso funciona.

demonstração de armazenamento local
As principais características de localStoragesão:

Compartilhado entre todas as guias e janelas da mesma origem.
Os dados não expiram. Ele permanece após a reinicialização do navegador e até mesmo a reinicialização do sistema operacional.
Por exemplo, se você executar este código…

localStorage.setItem('test', 1);
…E feche/abra o navegador ou apenas abra a mesma página em uma janela diferente, então você pode obter assim:

alert( localStorage.getItem('test') ); // 1
Só temos que estar na mesma origem (domínio/porta/protocolo), o caminho da url pode ser diferente.

O localStorageé compartilhado entre todas as janelas com a mesma origem, portanto, se definirmos os dados em uma janela, a alteração será visível em outra.

Acesso semelhante a objeto
Também podemos usar uma forma simples de obter/configurar chaves, assim:

// set key
localStorage.test = 2;

// get key
alert( localStorage.test ); // 2

// remove key
delete localStorage.test;
Isso é permitido por razões históricas e geralmente funciona, mas geralmente não é recomendado, porque:

Se a chave for gerada pelo usuário, pode ser qualquer coisa, como lengthou toString, ou outro método interno de localStorage. Nesse caso getItem/setItem, funciona bem, enquanto o acesso semelhante a objeto falha:

let key = 'length';
localStorage[key] = 5; // Error, can't assign length
Há um storageevento, ele é acionado quando modificamos os dados. Esse evento não ocorre para acesso semelhante a objeto. Veremos isso mais adiante neste capítulo.

Percorrendo as teclas
Como vimos, os métodos fornecem a funcionalidade “obter/definir/remover por chave”. Mas como obter todos os valores ou chaves salvos?

Infelizmente, os objetos de armazenamento não são iteráveis.

Uma maneira é fazer um loop sobre eles como se fosse um array:

for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
Outra maneira é usar for key in localStorageloop, assim como fazemos com objetos regulares.

Ele itera sobre as chaves, mas também gera alguns campos internos que não precisamos:

// bad try
for(let key in localStorage) {
  alert(key); // shows getItem, setItem and other built-in stuff
}
…Portanto, precisamos filtrar os campos do protótipo com hasOwnPropertycheck:

for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // skip keys like "setItem", "getItem" etc
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
…Ou apenas pegue as chaves “próprias” Object.keyse, em seguida, faça um loop sobre elas, se necessário:

let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
Este último funciona, pois Object.keyssó retorna as chaves que pertencem ao objeto, ignorando o protótipo.

Somente strings
Observe que a chave e o valor devem ser strings.

Se fossem de qualquer outro tipo, como um número ou um objeto, seriam convertidos em uma string automaticamente:

localStorage.user = {name: "John"};
alert(localStorage.user); // [object Object]
Podemos usar JSONpara armazenar objetos:

localStorage.user = JSON.stringify({name: "John"});

// sometime later
let user = JSON.parse( localStorage.user );
alert( user.name ); // John
Também é possível restringir todo o objeto de armazenamento, por exemplo, para fins de depuração:

// added formatting options to JSON.stringify to make the object look nicer
alert( JSON.stringify(localStorage, null, 2) );
sessãoArmazenamento
O sessionStorageobjeto é usado com muito menos frequência do que localStorage.

Propriedades e métodos são os mesmos, mas muito mais limitados:

O sessionStorageexiste apenas na guia atual do navegador.
Outra guia com a mesma página terá um armazenamento diferente.
Mas é compartilhado entre iframes na mesma aba (supondo que sejam da mesma origem).
Os dados sobrevivem à atualização da página, mas não fecham/abrem a guia.
Vamos ver isso em ação.

Execute este código…

sessionStorage.setItem('test', 1);
…Em seguida, atualize a página. Agora você ainda pode obter os dados:

alert( sessionStorage.getItem('test') ); // after refresh: 1
…Mas se você abrir a mesma página em outra aba, e tentar novamente lá, o código acima retorna null, significando “nada encontrado”.

Isso porque sessionStorageestá vinculado não só à origem, mas também à aba do navegador. Por esse motivo, sessionStorageé usado com moderação.

Evento de armazenamento
Quando os dados são atualizados em localStorageou sessionStorage, os eventos de armazenamento são acionados, com propriedades:

key– a chave que foi alterada ( nullse .clear()for chamada).
oldValue– o valor antigo ( nullse a chave foi adicionada recentemente).
newValue– o novo valor ( nullse a chave for removida).
url– a url do documento onde ocorreu a atualização.
storageArea– ou localStorageou sessionStorageobjeto onde a atualização ocorreu.
O importante é: o evento dispara em todos windowos objetos onde o armazenamento está acessível, exceto aquele que o causou.

Vamos elaborar.

Imagine, você tem duas janelas com o mesmo site em cada uma. Então localStorageé compartilhado entre eles.

Talvez você queira abrir esta página em duas janelas do navegador para testar o código abaixo.

Se ambas as janelas estiverem aguardando window.onstorage, cada uma reagirá às atualizações que ocorreram na outra.

// triggers on updates made to the same storage from other documents
window.onstorage = event => { // can also use window.addEventListener('storage', event => {
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
Observe que o evento também contém: event.url– a url do documento onde os dados foram atualizados.

Além disso, event.storageAreacontém o objeto de armazenamento – o evento é o mesmo para ambos sessionStoragee localStorage, então event.storageAreafaz referência ao que foi modificado. Podemos até querer colocar algo de volta nele, para “responder” a uma mudança.

Isso permite que diferentes janelas da mesma origem troquem mensagens.

Os navegadores modernos também oferecem suporte à API de canal de transmissão , a API especial para comunicação entre janelas da mesma origem, com mais recursos, mas com menos suporte. Existem bibliotecas que polipreenchem essa API, com base em localStorage, que a disponibilizam em todos os lugares.

Resumo
Objetos de armazenamento da Web localStoragee sessionStoragepermitem armazenar pares chave/valor no navegador.

Ambos keye valuedevem ser strings.
O limite é 5mb+, depende do navegador.
Eles não expiram.
Os dados são vinculados à origem (domínio/porta/protocolo).
localStorage	sessionStorage
Compartilhado entre todas as guias e janelas com a mesma origem	Visível em uma guia do navegador, incluindo iframes da mesma origem
Sobrevive ao reinício do navegador	Sobrevive à atualização da página (mas não ao fechamento da guia)
API:

setItem(key, value)– armazena o par chave/valor.
getItem(key)– obter o valor por chave.
removeItem(key)– remova a chave com seu valor.
clear()– apague tudo.
key(index)– obter o número da chave index.
length– o número de itens armazenados.
Use Object.keyspara obter todas as chaves.
Acessamos as chaves como propriedades do objeto, nesse caso storageo evento não é acionado.
Evento de armazenamento:

Aciona setItem, removeItem, clearchamadas.
Contém todos os dados sobre a operação ( key/oldValue/newValue), o documento urle o objeto de armazenamento storageArea.
Aciona todos windowos objetos que têm acesso ao armazenamento, exceto aquele que o gerou (dentro de uma guia para sessionStorage, globalmente para localStorage).

*/