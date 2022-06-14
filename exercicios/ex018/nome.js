var button = document.querySelector('button');

button.onclick = function() {
    var nome = prompt('Qual é o seu nome?');
    alert('Olá ' + nome + ', prazer em conhecê-lo!');
}