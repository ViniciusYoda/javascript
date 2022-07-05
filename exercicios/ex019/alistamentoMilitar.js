function calcular(){
    const res = document.getElementById("res")
    const para = document.getElementById("para")
    const aws = document.getElementById("aws")
    const nasc = Number(document.getElementById("ano").value)
    const data = new Date()
    const year = data.getFullYear()
    const idade = year - nasc
    //res.innerText = `Quem nascem em ${nasc} tem ${idade} anos em ${year}`
    if (idade === 18){
        res.innerText = `Quem nascem em ${nasc} tem ${idade} anos em ${year}`
        para.innerText = `Você tem que se alistar imediatamente`
    }
    else if (idade < 18){
        res.innerText = `Quem nascem em ${nasc} tem ${idade} anos em ${year}`
        para.innerText = `Você tem que se alistar imediatamente`
        let saldo1 = 18 - idade
        para.innerText = `Ainda falta ${saldo1} anos para seu alistamento`
    }else if (idade > 18){
        res.innerText = `Quem nascem em ${nasc} tem ${idade} anos em ${year}`
        para.innerText = `Você tem que se alistar imediatamente`
        let saldo = idade - 18
        para.innerText = `Você já deveria ter se alistado há ${saldo} anos`
    }
        
    
}