// AbortSignal

// A interface AbortSignal  representa o sinal de um objeto que permite a você se comunicar com uma Requisição de DOM (como Fetch) e aborta-la se necessário via um objeto AbortController (en-US)

// Propriedades

// A interface AbortSignal também herda propriedades de sua interface pai, EventTarget.

// AbortSignal.aborted Somente leitura
// Um Boolean (en-US) que indica quando a(s) Request(s) com a qual o sinal está se comunicando está/estão abortadas(true) ou não(false).

// Handlers de Eventos

// AbortSignal.onabort (en-US)
// Invocado quando um abort evento dispara, ex: quando as requests do DOM que o sinal estão se comunicando são/estão abortadas.

// Métodos

// A interface AbortSignal também herda métodos de sua interface pai, EventTarget.

// Example:

var controller = new AbortController();
var signal = controller.signal;

var downloadBtn = document.querySelector('.download');
var abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function() {
    controller.abort();
    console.log('Dowload aborted');
});

function fetchVideo() {
    // ...
    fetch(url, {signal}).then(function(response){
       // ...
    }).catch(function(e){
        reports.textContent = 'Download error: ' + e.message;
    })
}