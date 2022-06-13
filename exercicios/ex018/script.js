var button = document.querySelector('button');

button.onclick = function() {
    var nome = prompt('Qual é o seu nome?');
    alert('Olá ' + nome + ', é um prazer ter ver!');
}

var nome = prompt('Qual é o seu nome?');

if (nome === 'Adão') {
    alert('Olá Adão, é um prazer te ver!');
} else if (nome === 'Alan') {
    alert('Olá Alan, é um prazer te ver!');
} else if (nome === 'Bella') {
    alert('Olá Bella, é um prazer te ver!');
} else if (nome === 'Bianca') {
    alert('Olá Bianca, é um prazer te ver!');
} else if (nome === 'Chris') {
    alert('Olá Chris, é um prazer te ver !');
}