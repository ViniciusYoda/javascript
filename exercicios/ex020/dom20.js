// AbortController

// A interface AbortController representa um objeto controlador que permite abortar uma ou mais solicitações da Web como e quando desejado.

// Você pode criar um novo objeto AbortController usando o construtor AbortController(). A comunicação com uma solicitação DOM é feita usando um objeto AbortSignal.

// Constructor

//AbortController()
// Cria uma nova instância do objeto AbortController.

// Properties

//AbortController.signal (Read only)
// Retorna uma instância do objeto AbortSignal, que pode ser usada para se comunicar ou abortar uma solicitação DOM.

//Methods
//AbortController.abort()
// Aborta uma solicitação DOM antes que ela seja concluída. Isso é capaz de abortar solicitações de busca, consumo de qualquer corpo de resposta e fluxos.

//Example:

let controller;
const url = "video.mp4";

const downloadBtn = document.querySelector('.dowload');
const abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function() {
    if (controller) controller.abort();
    console.log('Download aborted');
})

function fetchVideo() {
    controller = new AbortController();
    const signal = controller.signal;
    fetch(url, { signal }).then(function(response) {
        console.log('Dowload complete', reponse);
    }).catch(function(e){
        console.log('Dowload error: ' + e.message);
    });
}