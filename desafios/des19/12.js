function ar(){
    var nota1 = Number.parseFloat(window.prompt("Quanto você tirou na primeira prova?"))
    var nota2 = Number.parseFloat(window.prompt("Quanto você tirou na segunda prova?"))
    var nota3 = Number.parseFloat(window.prompt("Quanto você tirou na terceira prova?"))
    var media =  (nota1 + nota2 + nota3) / 3
    if (media >= 10){
        res.innerHTML = "Aluno aprovado"
    }else if (media >= 6 && media <8) {
        res.innerHTML = "Aluno em recuperação"
    }else{
        res.innerHTML = "Aluno reprovado"
    }
}