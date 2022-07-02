const array = [70,70,80];

console.log(mediaDoAluno(array))

function mediaDoAluno(notas){
    const media = calcularMedia(notas)

    if (media < 59) return 'E'
    if (media < 69) return 'D'
    if (media < 79) return 'C'
    if (media < 89) return 'B'
    return 'A'
}

function calcularMedia(array){
    let soma = 0
    for (let valor of array){
        soma += valor
    }
    const media = soma/(array.length)
}