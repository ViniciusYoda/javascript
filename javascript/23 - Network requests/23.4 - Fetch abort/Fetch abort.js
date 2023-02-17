/*

Buscar: Abortar
Como sabemos, fetchretorna uma promessa. E o JavaScript geralmente não tem o conceito de “abortar” uma promessa. Então, como podemos cancelar um curso fetch? Por exemplo, se as ações do usuário em nosso site indicarem que o fetchnão é mais necessário.

Existe um objeto embutido especial para tais propósitos: AbortController. Ele pode ser usado para abortar não apenas fetch, mas também outras tarefas assíncronas.

O uso é bem direto:

O objeto AbortController
Crie um controlador:

let controller = new AbortController();
Um controlador é um objeto extremamente simples.

Possui um único método abort(),
E uma única propriedade signalque permite definir ouvintes de eventos nele.
Quando abort()é chamado:

controller.signalemite o "abort"evento.
controller.signal.abortedpropriedade torna-se true.
Geralmente, temos duas partes no processo:

Aquele que realiza uma operação cancelável, ativa um listener controller.signal.
A que cancela: liga controller.abort()quando precisa.
Aqui está o exemplo completo (sem fetchainda):

let controller = new AbortController();
let signal = controller.signal;

// The party that performs a cancelable operation
// gets the "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));

// The other party, that cancels (at any point later):
controller.abort(); // abort!

// The event triggers and signal.aborted becomes true
alert(signal.aborted); // true
Como podemos ver, AbortControlleré apenas um meio de passar aborteventos quando abort()é chamado.

Poderíamos implementar o mesmo tipo de escuta de evento em nosso código por conta própria, sem o AbortControllerobjeto.

Mas o que vale é fetchsaber trabalhar com o AbortControllerobjeto. Está integrado nele.

Usando com busca
Para poder cancelar fetch, passe a signalpropriedade de um AbortControllercomo fetchopção:

let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
O fetchmétodo sabe como trabalhar com AbortController. Ele escutará os aborteventos em signal.

Agora, para abortar, chame controller.abort():

controller.abort();
Terminamos: fetchobtém o evento signale aborta a solicitação.

Quando uma busca é abortada, sua promessa é rejeitada com um erro AbortError, então devemos tratá-la, por exemplo, em try..catch.

Aqui está o exemplo completo com fetchabortado após 1 segundo:

// abort in 1 second
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // handle abort()
    alert("Aborted!");
  } else {
    throw err;
  }
}
AbortController é escalável
AbortControlleré escalável. Ele permite cancelar várias buscas de uma só vez.

Aqui está um esboço de código que busca muitos urlsem paralelo e usa um único controlador para anular todos eles:

let urls = [...]; // a list of urls to fetch in parallel

let controller = new AbortController();

// an array of fetch promises
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// if controller.abort() is called from anywhere,
// it aborts all fetches
Se tivermos nossas próprias tarefas assíncronas, diferentes de fetch, podemos usar uma única AbortControllerpara interrompê-las, junto com as buscas.

Só precisamos ouvir seu abortevento em nossas tarefas:

let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // our task
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// Wait for fetches and our task in parallel
let results = await Promise.all([...fetchJobs, ourJob]);

// if controller.abort() is called from anywhere,
// it aborts all fetches and ourJob
Resumo
AbortControlleré um objeto simples que gera um abortevento em sua signalpropriedade quando o abort()método é chamado (e também definido signal.abortedcomo true).
fetchintegra com ele: passamos a signalpropriedade como opção, e depois fetcha escutamos, então é possível abortar o fetch.
Podemos usar AbortControllerem nosso código. A interação "ligar abort()" → “ouvir abortevento” é simples e universal. Podemos usá-lo mesmo sem fetch.

*/