var meuNome;
var minhaIdade;

meuNome = 'Chris';
minhaIdade = 37;

function logNome() {
    console.log(meuNome);
}

logNome();

var meuNome;

var meuNomeArray = ['Chris', 'Bob', 'Jim'];
var meuNumeroArray = [10,15,40];

meuNomeArray[0]; // deve retornar 'Chris'
meuNumeroArray[2]; // deve retornar 40

var cachorro = { nome : 'Totó', raca : 'Dálmata'};

cachorro.nome

var meuNumero = '500'; // opa, isso continua sendo uma string
typeof(meuNumero);
meuNumero = 500; // bem melhor - agora isso é um número
typeof(meuNumero);