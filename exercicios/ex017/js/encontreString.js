const filme = {
    titulo : 'Vingadores',
    ano: 2018,
    diretor: 'Russo',
    personagem : 'Thor'
}
exibirPropriedades(filme);
function exibirPropriedades(obj){
    for (prop in obj)
        if(typeof obj[prop] === 'string')
            console.log(prop,obj[prop])
}