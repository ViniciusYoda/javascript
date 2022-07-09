let soma = 0
let cont = 0
for(let i = 1; i < 501; i+=2){
    if (i % 3 === 0){
        cont += 1
        soma += i
    }
    console.log(`A soma de todos os ${cont} valores solicitados é ${soma}` )
    
}