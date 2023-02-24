/*

IndexedDB
IndexedDB é um banco de dados embutido em um navegador, muito mais poderoso que localStorage.

Armazena quase qualquer tipo de valor por chave, vários tipos de chave.
Suporta transações para confiabilidade.
Suporta consultas de intervalo de chave, índices.
Pode armazenar volumes de dados muito maiores do que arquivos localStorage.
Esse poder geralmente é excessivo para aplicativos cliente-servidor tradicionais. IndexedDB destina-se a aplicativos offline, a serem combinados com ServiceWorkers e outras tecnologias.

A interface nativa do IndexedDB, descrita na especificação https://www.w3.org/TR/IndexedDB , é baseada em eventos.

Também podemos usar async/awaitcom a ajuda de um wrapper baseado em promessa, como https://github.com/jakearchibald/idb . Isso é muito conveniente, mas o wrapper não é perfeito, ele não pode substituir eventos para todos os casos. Portanto, começaremos com eventos e, depois de entendermos o IndexedDb, usaremos o wrapper.

Onde estão os dados?
Tecnicamente, os dados geralmente são armazenados no diretório inicial do visitante, junto com as configurações do navegador, extensões, etc.

Diferentes navegadores e usuários no nível do sistema operacional têm, cada um, seu próprio armazenamento independente.

banco de dados aberto
Para começar a trabalhar com IndexedDB, primeiro precisamos open(conectar a) um banco de dados.

A sintaxe:

let openRequest = indexedDB.open(name, version);
name– uma string, o nome do banco de dados.
version– uma versão inteira positiva, por padrão 1(explicada abaixo).
Podemos ter vários bancos de dados com nomes diferentes, mas todos existem dentro da origem atual (domínio/protocolo/porta). Sites diferentes não podem acessar os bancos de dados uns dos outros.

A chamada retorna openRequesto objeto, devemos ouvir os eventos nele:

success: o banco de dados está pronto, existe o “objeto de banco de dados” em openRequest.result, devemos usá-lo para outras chamadas.
error: falha na abertura.
upgradeneeded: banco de dados está pronto, mas sua versão está desatualizada (veja abaixo).
O IndexedDB possui um mecanismo interno de “versão de esquema”, ausente em bancos de dados do lado do servidor.

Ao contrário dos bancos de dados do lado do servidor, o IndexedDB é do lado do cliente, os dados são armazenados no navegador, então nós, desenvolvedores, não temos acesso a ele em tempo integral. Assim, quando tivermos publicado uma nova versão de nosso aplicativo e o usuário visitar nossa página da Web, talvez seja necessário atualizar o banco de dados.

Se a versão do banco de dados local for inferior à especificada em open, um evento especial upgradeneededserá acionado e poderemos comparar as versões e atualizar as estruturas de dados conforme necessário.

O upgradeneededevento também dispara quando o banco de dados ainda não existe (tecnicamente, sua versão é 0), para que possamos realizar a inicialização.

Digamos que publicamos a primeira versão do nosso aplicativo.

Então podemos abrir o banco de dados com a versão 1e realizar a inicialização em um upgradeneededhandler como este:

let openRequest = indexedDB.open("store", 1);

openRequest.onupgradeneeded = function() {
  // triggers if the client had no database
  // ...perform initialization...
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;
  // continue working with database using db object
};
Então, posteriormente, publicamos a 2ª versão.

Podemos abri-lo com a versão 2e realizar a atualização assim:

let openRequest = indexedDB.open("store", 2);

openRequest.onupgradeneeded = function(event) {
  // the existing database version is less than 2 (or it doesn't exist)
  let db = openRequest.result;
  switch(event.oldVersion) { // existing db version
    case 0:
      // version 0 means that the client had no database
      // perform initialization
    case 1:
      // client had version 1
      // update
  }
};
Atenção: como nossa versão atual é 2, o onupgradeneededhandler possui um branch de código para version 0, adequado para usuários que estão acessando pela primeira vez e não possuem banco de dados, e também para version 1, para atualizações.

E então, somente se onupgradeneededo manipulador terminar sem erros, openRequest.onsuccessdisparar e o banco de dados for considerado aberto com sucesso.

Para excluir um banco de dados:

let deleteRequest = indexedDB.deleteDatabase(name)
// deleteRequest.onsuccess/onerror tracks the result
Não podemos abrir um banco de dados usando uma versão de chamada aberta mais antiga
Se o banco de dados do usuário atual tiver uma versão superior à da openchamada, por exemplo, a versão existente do banco de dados é 3, e tentamos open(...2), isso é um erro, openRequest.onerrorgatilhos.

Isso é raro, mas pode acontecer quando um visitante carrega um código JavaScript desatualizado, por exemplo, de um cache de proxy. Portanto, o código é antigo, mas seu banco de dados é novo.

Para proteger contra erros, devemos verificar db.versione sugerir o recarregamento da página. Use cabeçalhos de cache HTTP adequados para evitar o carregamento do código antigo, para que você nunca tenha esses problemas.

Problema de atualização paralela
Como estamos falando sobre controle de versão, vamos abordar um pequeno problema relacionado.

Digamos:

Um visitante abriu nosso site em uma guia do navegador, com a versão do banco de dados 1.
Em seguida, lançamos uma atualização, portanto, nosso código é mais recente.
E então o mesmo visitante abre nosso site em outra aba.
Portanto, há uma guia com uma conexão aberta com a versão do banco de dados 1, enquanto a segunda tenta atualizá-la para a versão 2em seu upgradeneededmanipulador.

O problema é que um banco de dados é compartilhado entre duas abas, pois é o mesmo site, mesma origem. E não pode ser versão 1e 2. Para realizar a atualização para a versão 2, todas as conexões para a versão 1 devem ser fechadas, inclusive a da primeira aba.

Para organizar isso, o versionchangeevento é acionado no objeto de banco de dados “desatualizado”. Devemos ouvi-lo e fechar a conexão com o banco de dados antigo (e provavelmente sugerir um recarregamento de página, para carregar o código atualizado).

Se não ouvirmos o versionchangeevento e não fecharmos a conexão antiga, a segunda conexão nova não será feita. O openRequestobjeto emitirá o blockedevento em vez de success. Portanto, a segunda guia não funcionará.

Aqui está o código para lidar corretamente com a atualização paralela. Ele instala o onversionchangemanipulador, que é acionado se a conexão atual do banco de dados ficar desatualizada (a versão do banco de dados é atualizada em outro lugar) e fecha a conexão.

let openRequest = indexedDB.open("store", 2);

openRequest.onupgradeneeded = ...;
openRequest.onerror = ...;

openRequest.onsuccess = function() {
  let db = openRequest.result;

  db.onversionchange = function() {
    db.close();
    alert("Database is outdated, please reload the page.")
  };

  // ...the db is ready, use it...
};

openRequest.onblocked = function() {
  // this event shouldn't trigger if we handle onversionchange correctly

  // it means that there's another open connection to the same database
  // and it wasn't closed after db.onversionchange triggered for it
};
…Em outras palavras, aqui fazemos duas coisas:

O db.onversionchangeouvinte nos informa sobre uma tentativa de atualização paralela, se a versão atual do banco de dados ficar desatualizada.
O openRequest.onblockedouvinte nos informa sobre a situação oposta: há uma conexão com uma versão desatualizada em outro lugar e ela não fecha, portanto, a conexão mais recente não pode ser feita.
Podemos lidar com as coisas com mais elegância em db.onversionchange, solicitar ao visitante que salve os dados antes que a conexão seja encerrada e assim por diante.

Ou, uma abordagem alternativa seria não fechar o banco de dados em db.onversionchange, mas usar o onblockedmanipulador (na nova guia) para alertar o visitante, dizer a ele que a versão mais recente não pode ser carregada até que feche outras guias.

Essas colisões de atualização acontecem raramente, mas devemos pelo menos ter algum tratamento para elas, pelo menos um onblockedmanipulador, para evitar que nosso script morra silenciosamente.

Armazenamento de objetos
Para armazenar algo no IndexedDB, precisamos de um armazenamento de objeto .

Um armazenamento de objeto é um conceito central do IndexedDB. Contrapartes em outros bancos de dados são chamadas de “tabelas” ou “coleções”. É onde os dados são armazenados. Um banco de dados pode ter várias lojas: uma para usuários, outra para mercadorias, etc.

Apesar de ser chamado de “armazenamento de objetos”, os primitivos também podem ser armazenados.

Podemos armazenar quase qualquer valor, incluindo objetos complexos.

IndexedDB usa o algoritmo de serialização padrão para clonar e armazenar um objeto. É como JSON.stringify, mas mais poderoso, capaz de armazenar muito mais tipos de dados.

Um exemplo de objeto que não pode ser armazenado: um objeto com referências circulares. Esses objetos não são serializáveis. JSON.stringifytambém falha para tais objetos.

Deve haver um exclusivo keypara cada valor na loja.

Uma chave deve ser um destes tipos – número, data, string, binário ou array. É um identificador único, então podemos pesquisar/remover/atualizar valores pela chave.


Como veremos em breve, podemos fornecer uma chave quando adicionamos um valor à loja, semelhante a localStorage. Mas quando armazenamos objetos, IndexedDB permite configurar uma propriedade de objeto como a chave, o que é muito mais conveniente. Ou podemos gerar chaves automaticamente.

Mas precisamos criar um armazenamento de objeto primeiro.

A sintaxe para criar um armazenamento de objeto:

db.createObjectStore(name[, keyOptions]);
Observe que a operação é síncrona, não é awaitnecessária.

nameé o nome da loja, por exemplo, "books"para livros,
keyOptionsé um objeto opcional com uma das duas propriedades:
keyPath– um caminho para uma propriedade de objeto que o IndexedDB usará como chave, por exemplo id.
autoIncrement– se true, então a chave para um objeto recém-armazenado é gerada automaticamente, como um número sempre crescente.
Se não fornecermos keyOptions, precisaremos fornecer uma chave explicitamente mais tarde, ao armazenar um objeto.

Por exemplo, este armazenamento de objeto usa idpropriedade como a chave:

db.createObjectStore('books', {keyPath: 'id'});
Um armazenamento de objeto só pode ser criado/modificado durante a atualização da versão do banco de dados, no upgradeneededmanipulador.

Isso é uma limitação técnica. Fora do manipulador, poderemos adicionar/remover/atualizar os dados, mas os armazenamentos de objetos só podem ser criados/removidos/alterados durante uma atualização de versão.

Para realizar uma atualização de versão do banco de dados, existem duas abordagens principais:

Podemos implementar funções de atualização por versão: de 1 para 2, de 2 para 3, de 3 para 4 etc. Em seguida, upgradeneededpodemos comparar versões (por exemplo, antiga 2, agora 4) e executar atualizações por versão passo a passo, para cada versão intermediária (2 a 3, depois 3 a 4).
Ou podemos apenas examinar o banco de dados: obtenha uma lista de armazenamentos de objetos existentes como arquivos db.objectStoreNames. Esse objeto é um DOMStringList que fornece contains(name)um método para verificar a existência. E então podemos fazer atualizações dependendo do que existe e do que não existe.
Para bancos de dados pequenos, a segunda variante pode ser mais simples.

Aqui está a demonstração da segunda abordagem:

let openRequest = indexedDB.open("db", 2);

// create/upgrade the database without version checks
openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('books')) { // if there's no "books" store
    db.createObjectStore('books', {keyPath: 'id'}); // create it
  }
};
Para excluir um armazenamento de objeto:

db.deleteObjectStore('books')
Transações
O termo “transação” é genérico, usado em muitos tipos de bancos de dados.

Uma transação é um grupo de operações, que devem ser todas bem-sucedidas ou todas falharem.

Por exemplo, quando uma pessoa compra algo, precisamos:

Subtraia o dinheiro da conta deles.
Adicione o item ao inventário.
Seria muito ruim se concluíssemos a 1ª operação e algo desse errado, por exemplo, luzes apagadas, e não conseguíssemos fazer a 2ª. Ambos devem ser bem-sucedidos (compra completa, bom!) Ou ambos falham (pelo menos a pessoa manteve seu dinheiro, para que possa tentar novamente).

As transações podem garantir isso.

Todas as operações de dados devem ser feitas dentro de uma transação no IndexedDB.

Para iniciar uma transação:

db.transaction(store[, type]);
storeé um nome de loja que a transação acessará, por exemplo "books", . Pode ser uma matriz de nomes de lojas se formos acessar várias lojas.
type– um tipo de transação, um dos seguintes:
readonly– só pode ler, o padrão.
readwrite– pode apenas ler e gravar os dados, mas não criar/remover/alterar armazenamentos de objetos.
Há também versionchangeo tipo de transação: essas transações podem fazer tudo, mas não podemos criá-las manualmente. IndexedDB cria automaticamente uma versionchangetransação ao abrir o banco de dados, para upgradeneededo manipulador. É por isso que é um único local onde podemos atualizar a estrutura do banco de dados, criar/remover armazenamentos de objetos.

Por que existem diferentes tipos de transações?
O desempenho é a razão pela qual as transações precisam ser rotuladas como readonlye readwrite.

Muitas readonlytransações podem acessar a mesma loja simultaneamente, mas readwriteas transações não. Uma readwritetransação “bloqueia” o armazenamento para gravação. A próxima transação deve esperar antes que a anterior termine antes de acessar a mesma loja.

Após a criação da transação, podemos adicionar um item à loja, assim:

let transaction = db.transaction("books", "readwrite"); // (1)

// get an object store to operate on it
let books = transaction.objectStore("books"); // (2)

let book = {
  id: 'js',
  price: 10,
  created: new Date()
};

let request = books.add(book); // (3)

request.onsuccess = function() { // (4)
  console.log("Book added to the store", request.result);
};

request.onerror = function() {
  console.log("Error", request.error);
};
Foram basicamente quatro etapas:

Crie uma transação, mencionando todas as lojas que vai acessar, em (1).
Obtenha o objeto store usando transaction.objectStore(name), at (2).
Execute a solicitação para o armazenamento de objetos books.add(book), em (3).
…Trate o sucesso/erro da solicitação (4), então podemos fazer outras solicitações, se necessário, etc.
Os armazenamentos de objetos suportam dois métodos para armazenar um valor:

put(value, [key]) Adiciona o valueao store. O keyé fornecido apenas se o armazenamento de objeto não tiver keyPathuma autoIncrementopção. Caso já exista um valor com a mesma chave, ele será substituído.

add(value, [key]) O mesmo que put, mas se já houver um valor com a mesma chave, a solicitação falhará e um erro com o nome "ConstraintError"será gerado.

Semelhante à abertura de um banco de dados, podemos enviar uma solicitação: books.add(book), e aguardar os success/erroreventos.

O request.resultfor addé a chave do novo objeto.
O erro está em request.error(se houver).
Autocommit das transações
No exemplo acima iniciamos a transação e fizemos adda requisição. Mas, como afirmamos anteriormente, uma transação pode ter várias solicitações associadas, que devem ser todas bem-sucedidas ou todas falharem. Como marcamos a transação como concluída, sem mais solicitações por vir?

A resposta curta é: nós não.

Na próxima versão 3.0 da especificação, provavelmente haverá uma maneira manual de finalizar a transação, mas agora na versão 2.0 não há.

Quando todas as solicitações de transação forem concluídas e a fila de microtarefas estiver vazia, ela será confirmada automaticamente.

Normalmente, podemos supor que uma transação é confirmada quando todas as suas solicitações são concluídas e o código atual é concluído.

Portanto, no exemplo acima, nenhuma chamada especial é necessária para concluir a transação.

O princípio de confirmação automática das transações tem um efeito colateral importante. Não podemos inserir uma operação assíncrona como fetch, setTimeoutno meio de uma transação. IndexedDB não manterá a transação esperando até que isso seja feito.

No código abaixo, request2na linha (*)falha, pois a transação já está confirmada, e não consigo fazer nenhuma requisição nela:

let request1 = books.add(book);

request1.onsuccess = function() {
  fetch('/').then(response => {
    let request2 = books.add(anotherBook); // (*)
    request2.onerror = function() {
      console.log(request2.error.name); // TransactionInactiveError
    };
  });
};
Isso porque fetché uma operação assíncrona, uma macrotarefa. As transações são fechadas antes que o navegador comece a executar macrotarefas.

Os autores da especificação IndexedDB acreditam que as transações devem ser de curta duração. Principalmente por motivos de desempenho.

Notavelmente, readwriteas transações “bloqueiam” as lojas para gravação. Portanto, se uma parte do aplicativo foi iniciada readwriteno booksarmazenamento de objetos, outra parte que deseja fazer o mesmo deve esperar: a nova transação “trava” até que a primeira seja concluída. Isso pode levar a atrasos estranhos se as transações demorarem muito.

Então o que fazer?

No exemplo acima poderíamos fazer um novo db.transactiondireito antes da nova requisição (*).

Mas será ainda melhor se quisermos manter as operações juntas, em uma transação, para separar as transações do IndexedDB e “outras” coisas assíncronas.

Primeiro, faça fetch, prepare os dados se necessário, depois crie uma transação e execute todas as solicitações do banco de dados, funcionará.

Para detectar o momento da conclusão bem-sucedida, podemos ouvir o transaction.oncompleteevento:

let transaction = db.transaction("books", "readwrite");

// ...perform operations...

transaction.oncomplete = function() {
  console.log("Transaction is complete");
};
Apenas completegarante que a transação seja salva como um todo. Solicitações individuais podem ser bem-sucedidas, mas a operação de gravação final pode dar errado (por exemplo, erro de E/S ou algo assim).

Para abortar manualmente a transação, chame:

transaction.abort();
Isso cancela todas as modificações feitas pelas solicitações nele e aciona transaction.onaborto evento.

Manipulação de erros
As solicitações de gravação podem falhar.

Isso é de se esperar, não só por possíveis erros de nossa parte, mas também por motivos alheios à transação em si. Por exemplo, a cota de armazenamento pode ser excedida. Portanto, devemos estar prontos para lidar com esse caso.

Uma solicitação com falha aborta automaticamente a transação, cancelando todas as suas alterações.

Em algumas situações, podemos querer lidar com a falha (por exemplo, tentar outra solicitação), sem cancelar as alterações existentes e continuar a transação. Isso é possível. O request.onerrormanipulador é capaz de impedir que a transação seja abortada chamando event.preventDefault().

No exemplo abaixo, um novo livro é adicionado com a mesma chave ( id) do existente. O store.addmétodo gera um "ConstraintError"nesse caso. Nós lidamos com isso sem cancelar a transação:

let transaction = db.transaction("books", "readwrite");

let book = { id: 'js', price: 10 };

let request = transaction.objectStore("books").add(book);

request.onerror = function(event) {
  // ConstraintError occurs when an object with the same id already exists
  if (request.error.name == "ConstraintError") {
    console.log("Book with such id already exists"); // handle the error
    event.preventDefault(); // don't abort the transaction
    // use another key for the book?
  } else {
    // unexpected error, can't handle it
    // the transaction will abort
  }
};

transaction.onabort = function() {
  console.log("Error", transaction.error);
};
delegação do evento
Precisamos de um erro/onsuccess para cada solicitação? Nem sempre. Em vez disso, podemos usar a delegação de eventos.

Bolha de eventos IndexedDB: request→ transaction→ database.

Todos os eventos são eventos DOM, com captura e bubbling, mas geralmente apenas o estágio bubbling é usado.

Assim, podemos detectar todos os erros usando db.onerroro manipulador, para geração de relatórios ou outros fins:

db.onerror = function(event) {
  let request = event.target; // the request that caused the error

  console.log("Error", request.error);
};
…Mas e se um erro for totalmente tratado? Não queremos denunciá-lo nesse caso.

Podemos parar o borbulhamento e, portanto db.onerror, usando event.stopPropagation()in request.onerror.

request.onerror = function(event) {
  if (request.error.name == "ConstraintError") {
    console.log("Book with such id already exists"); // handle the error
    event.preventDefault(); // don't abort the transaction
    event.stopPropagation(); // don't bubble error up, "chew" it
  } else {
    // do nothing
    // transaction will be aborted
    // we can take care of error in transaction.onabort
  }
};
Procurando
Existem dois tipos principais de pesquisa em um armazenamento de objeto:

Por um valor de chave ou um intervalo de chave. Em nosso armazenamento de “livros”, isso seria um valor ou intervalo de valores de book.id.
Por outro campo de objeto, por exemplo book.price. Isso exigia uma estrutura de dados adicional, denominada “índice”.
Por chave
Primeiramente vamos tratar do primeiro tipo de busca: por chave.

Os métodos de pesquisa suportam valores de chave exatos e os chamados “intervalos de valores” – objetos IDBKeyRange que especificam um “intervalo de chaves” aceitável.

IDBKeyRangeobjetos são criados usando as seguintes chamadas:

IDBKeyRange.lowerBound(lower, [open])significa: ≥lower(ou >lowerse openfor verdadeiro)
IDBKeyRange.upperBound(upper, [open])significa: ≤upper(ou <upperse openfor verdadeiro)
IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen])significa: entre lowere upper. Se os sinalizadores abertos forem verdadeiros, a chave correspondente não será incluída no intervalo.
IDBKeyRange.only(key)– um intervalo que consiste em apenas um key, raramente usado.
Veremos exemplos práticos de como usá-los muito em breve.

Para realizar a pesquisa real, existem os seguintes métodos. Eles aceitam um queryargumento que pode ser uma chave exata ou um intervalo de chaves:

store.get(query)– procure o primeiro valor por uma chave ou um intervalo.
store.getAll([query], [count])– procura todos os valores, limita por countse for dado.
store.getKey(query)– procure a primeira chave que satisfaça a consulta, geralmente um intervalo.
store.getAllKeys([query], [count])– procura todas as chaves que satisfaçam a consulta, geralmente um intervalo, até countse fornecido.
store.count([query])– obtenha a contagem total de chaves que satisfazem a consulta, geralmente um intervalo.
Por exemplo, temos muitos livros em nossa loja. Lembre-se, o idcampo é a chave, então todos esses métodos podem pesquisar por id.

Exemplos de solicitação:

// get one book
books.get('js')

// get books with 'css' <= id <= 'html'
books.getAll(IDBKeyRange.bound('css', 'html'))

// get books with id < 'html'
books.getAll(IDBKeyRange.upperBound('html', true))

// get all books
books.getAll()

// get all keys, where id > 'js'
books.getAllKeys(IDBKeyRange.lowerBound('js', true))
O armazenamento de objetos é sempre classificado
Um armazenamento de objeto classifica os valores por chave internamente.

Portanto, as solicitações que retornam muitos valores sempre os retornam classificados por ordem de chave.

Por um campo usando um índice
Para pesquisar por outros campos do objeto, precisamos criar uma estrutura de dados adicional chamada “índice”.

Um índice é um “complemento” para o armazenamento que rastreia um determinado campo de objeto. Para cada valor desse campo, ele armazena uma lista de chaves para os objetos que possuem esse valor. Haverá uma imagem mais detalhada abaixo.

A sintaxe:

objectStore.createIndex(name, keyPath, [options]);
name– nome do índice,
keyPath– caminho para o campo do objeto que o índice deve rastrear (vamos pesquisar por esse campo),
option– um objeto opcional com propriedades:
unique– se verdadeiro, pode haver apenas um objeto na loja com o valor fornecido no keyPath. O índice aplicará isso gerando um erro se tentarmos adicionar uma duplicata.
multiEntry– usado apenas se o valor on keyPathfor uma matriz. Nesse caso, por padrão, o índice tratará todo o array como a chave. Mas se multiEntryfor verdadeiro, o índice manterá uma lista de objetos de armazenamento para cada valor nesse array. Portanto, os membros da matriz se tornam chaves de índice.
Em nosso exemplo, armazenamos livros codificados por id.

Digamos que queremos pesquisar por price.

Primeiro, precisamos criar um índice. Deve ser feito em upgradeneeded, assim como um object store:

openRequest.onupgradeneeded = function() {
  // we must create the index here, in versionchange transaction
  let books = db.createObjectStore('books', {keyPath: 'id'});
  let index = books.createIndex('price_idx', 'price');
};
O índice rastreará priceo campo.
O preço não é único, pode haver vários livros com o mesmo preço, por isso não definimos uniqueopção.
O preço não é uma matriz, portanto, multiEntryo sinalizador não é aplicável.
Imagine que nosso inventorytenha 4 livros. Aqui está a imagem que mostra exatamente o que indexé:


Como dito, o índice para cada valor de price(segundo argumento) guarda a lista de chaves que possuem aquele preço.

O índice se mantém atualizado automaticamente, não precisamos nos preocupar com isso.

Agora, quando quisermos pesquisar um determinado preço, basta aplicarmos os mesmos métodos de pesquisa ao índice:

let transaction = db.transaction("books"); // readonly
let books = transaction.objectStore("books");
let priceIndex = books.index("price_idx");

let request = priceIndex.getAll(10);

request.onsuccess = function() {
  if (request.result !== undefined) {
    console.log("Books", request.result); // array of books with price=10
  } else {
    console.log("No such books");
  }
};
Também podemos usar IDBKeyRangepara criar intervalos e procurar por livros baratos/caros:

// find books where price <= 5
let request = priceIndex.getAll(IDBKeyRange.upperBound(5));
Os índices são classificados internamente pelo campo do objeto rastreado, priceem nosso caso. Portanto, quando fazemos a pesquisa, os resultados também são classificados por price.

Excluindo da loja
O deletemétodo procura valores para excluir por uma consulta, o formato de chamada é semelhante a getAll:

delete(query)– excluir valores correspondentes por consulta.
Por exemplo:

// delete the book with id='js'
books.delete('js');
Se quisermos excluir livros com base em um preço ou outro campo de objeto, devemos primeiro encontrar a chave no índice e, em seguida, chamar delete:

// find the key where price = 5
let request = priceIndex.getKey(5);

request.onsuccess = function() {
  let id = request.result;
  let deleteRequest = books.delete(id);
};
Para deletar tudo:

books.clear(); // clear the storage.
Cursores
Métodos como getAll/getAllKeysretornam uma matriz de chaves/valores.

Mas o armazenamento de um objeto pode ser enorme, maior que a memória disponível. Em seguida, getAllfalhará ao obter todos os registros como uma matriz.

O que fazer?

Os cursores fornecem os meios para contornar isso.

Um cursor é um objeto especial que percorre o armazenamento de objetos, a partir de uma consulta e retorna uma chave/valor por vez, economizando memória.

Como um armazenamento de objeto é classificado internamente por chave, um cursor percorre o armazenamento na ordem da chave (ascendente por padrão).

A sintaxe:

// like getAll, but with a cursor:
let request = store.openCursor(query, [direction]);

// to get keys, not values (like getAllKeys): store.openKeyCursor
queryé uma chave ou um intervalo de chaves, igual a getAll.
directioné um argumento opcional, qual ordem usar:
"next"– o padrão, o cursor sobe do registro com a tecla mais baixa.
"prev"– a ordem inversa: para baixo do registro com a chave maior.
"nextunique", "prevunique"– o mesmo que acima, mas pule registros com a mesma chave (somente para cursores sobre índices, por exemplo, para vários livros com preço=5, apenas o primeiro será retornado).
A principal diferença do cursor é que request.onsuccessdispara várias vezes: uma vez para cada resultado.

Aqui está um exemplo de como usar um cursor:

let transaction = db.transaction("books");
let books = transaction.objectStore("books");

let request = books.openCursor();

// called for each book found by the cursor
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let key = cursor.key; // book key (id field)
    let value = cursor.value; // book object
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("No more books");
  }
};
Os principais métodos de cursor são:

advance(count)– avançar os counttempos do cursor, saltando valores.
continue([key])– avança o cursor para o próximo valor na correspondência de intervalo (ou imediatamente após, keyse fornecido).
Se há mais valores correspondentes ao cursor ou não - onsuccessé chamado e, em seguida, resultpodemos obter o cursor apontando para o próximo registro ou undefined.

No exemplo acima o cursor foi feito para o armazenamento do objeto.

Mas também podemos fazer um cursor sobre um índice. Como lembramos, os índices permitem pesquisar por um campo de objeto. Cursores sobre índices fazem exatamente o mesmo que sobre armazenamentos de objetos – eles economizam memória retornando um valor por vez.

Para cursores sobre índices, cursor.keyé a chave do índice (por exemplo, preço), e devemos usar cursor.primaryKeya propriedade para a chave do objeto:

let request = priceIdx.openCursor(IDBKeyRange.upperBound(5));

// called for each record
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let primaryKey = cursor.primaryKey; // next object store key (id field)
    let value = cursor.value; // next object store object (book object)
    let key = cursor.key; // next index key (price)
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("No more books");
  }
};
Invólucro de promessa
Adicionar onsuccess/onerrora cada solicitação é uma tarefa bastante complicada. Às vezes, podemos facilitar nossa vida usando delegação de eventos, por exemplo, definir manipuladores em todas as transações, mas async/awaité muito mais conveniente.

Vamos usar um wrapper de promessa fino https://github.com/jakearchibald/idb ainda neste capítulo. Ele cria um idbobjeto global com métodos IndexedDB prometidos .

Então, em vez de onsuccess/onerrorpodemos escrever assim:

let db = await idb.openDB('store', 1, db => {
  if (db.oldVersion == 0) {
    // perform the initialization
    db.createObjectStore('books', {keyPath: 'id'});
  }
});

let transaction = db.transaction('books', 'readwrite');
let books = transaction.objectStore('books');

try {
  await books.add(...);
  await books.add(...);

  await transaction.complete;

  console.log('jsbook saved');
} catch(err) {
  console.log('error', err.message);
}
Portanto, temos todo o doce "código assíncrono simples" e "tentar ... pegar".

Manipulação de erros
Se não detectarmos um erro, ele cairá, até o exterior mais próximo try..catch.

Um erro não detectado torna-se um evento de "rejeição de promessa não tratada" no windowobjeto.

Podemos lidar com erros como este:

window.addEventListener('unhandledrejection', event => {
  let request = event.target; // IndexedDB native request object
  let error = event.reason; //  Unhandled error object, same as request.error
  ...report about the error...
});
Armadilha de “transação inativa”
Como já sabemos, uma transação é confirmada automaticamente assim que o navegador termina com o código atual e as microtarefas. Portanto, se colocarmos uma macrotarefa como fetchno meio de uma transação, a transação não esperará que ela seja concluída. Ele apenas confirma automaticamente. Portanto, a próxima solicitação falharia.

Para um wrapper de promessa e async/awaita situação é a mesma.

Aqui está um exemplo de fetchno meio da transação:

let transaction = db.transaction("inventory", "readwrite");
let inventory = transaction.objectStore("inventory");

await inventory.add({ id: 'js', price: 10, created: new Date() });

await fetch(...); // (*)

await inventory.add({ id: 'js', price: 10, created: new Date() }); // Error
O próximo inventory.adddepois fetch (*)falha com um erro de “transação inativa”, porque a transação já foi confirmada e fechada naquele momento.

A solução alternativa é a mesma de quando se trabalha com IndexedDB nativo: faça uma nova transação ou apenas separe as coisas.

Prepare os dados e busque primeiro tudo o que for necessário.
Em seguida, salve no banco de dados.
Obtendo objetos nativos
Internamente, o wrapper realiza uma requisição nativa de IndexedDB, adicionando onerror/onsuccessa ela, e retorna uma promessa que rejeita/resolve com o resultado.

Isso funciona bem na maioria das vezes. Os exemplos estão na página da lib https://github.com/jakearchibald/idb .

Em alguns casos raros, quando precisamos do requestobjeto original, podemos acessá-lo como promise.requestpropriedade da promessa:

let promise = books.add(book); // get a promise (don't await for its result)

let request = promise.request; // native request object
let transaction = request.transaction; // native transaction object

// ...do some native IndexedDB voodoo...

let result = await promise; // if still needed
Resumo
IndexedDB pode ser pensado como um “localStorage on steroids”. É um banco de dados de valor-chave simples, poderoso o suficiente para aplicativos off-line, mas simples de usar.

O melhor manual é o de especificação, o atual é o 2.0, mas poucos métodos do 3.0 (não é muito diferente) são parcialmente suportados.

O uso básico pode ser descrito com algumas frases:

Obtenha um wrapper de promessa como idb .
Abra um banco de dados:idb.openDb(name, version, onupgradeneeded)
Crie armazenamentos de objetos e índices no onupgradeneededmanipulador ou execute atualização de versão, se necessário.
Para pedidos:
Criar transação db.transaction('books')(readwrite se necessário).
Obtenha o armazenamento de objetos transaction.objectStore('books').
Em seguida, para pesquisar por uma chave, chame métodos diretamente no armazenamento de objetos.
Para pesquisar por um campo de objeto, crie um índice.
Se os dados não couberem na memória, use um cursor.
Aqui está um pequeno aplicativo de demonstração:

Resultadoindex.html
<!doctype html>
<script src="https://cdn.jsdelivr.net/npm/idb@3.0.2/build/idb.min.js"></script>

<button onclick="addBook()">Add a book</button>
<button onclick="clearBooks()">Clear books</button>

<p>Books list:</p>

<ul id="listElem"></ul>

*/