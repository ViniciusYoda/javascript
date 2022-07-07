const celular = {
    marcaCelular : 'ASUS',
    tamanhoTela: {
        vertical: 155,
        horizontal: 75
    },
    ligar: function() {
        console.log('Fazendo ligação')
    }
}

const novoObjeto = Object.assign({
    bateria: 5000
},celular);
console.log(novoObjeto);

const objeto2 = {...celular};
console.log(objeto2)