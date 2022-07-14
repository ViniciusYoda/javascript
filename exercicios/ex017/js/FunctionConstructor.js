function Postagem(titulo,mensagem,autor){
    this.titulo=titulo,
    this.mensagem=mensagem,
    this.autor=autor,
    this.vizualizacoes=0,
    this.cometaruos=[],
    this.estaAoVivo = false
}

let postagem = new Postagem('a','b','c')
console.log(postagem);