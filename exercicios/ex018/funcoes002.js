function draw(){
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    for (var i = 0; i < 100; i++){
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,0,0,0.5)';
        ctx.arc(random(WIDTH), random(HEIGHT), random(50), 0, 2 * Math.PI);
        ctx.fill();
    }
}

function random(number){
    return Math.floor(Math.random()*number);
}

function myFunction() {
    console.log('hello');
}

myFunction()

var myButton = document.querySelector('button');

myButton.onclick = function(){
    alert('hello');
}