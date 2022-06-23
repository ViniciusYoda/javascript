const pessoa = {
    nome: 'Vinícius',
    idade: 18
}
//key-value
for(let chave in pessoa){
    console.log(chave,pessoa.idade);
}

const cores = ['Vermelho', 'Azul', 'Verde']
for (let indice in cores){
    console.log(indice,cores[indice])
}