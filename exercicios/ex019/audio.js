const audio = new Audio('audio.mp3');
let tocar = document.querySelector('button')
tocar = audio.addEventListener('click', function(){
    audio.play();
})