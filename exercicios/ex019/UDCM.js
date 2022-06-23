function ver(){
    const res = document.getElementById('res')
    const num = document.getElementById('num')
    let u = num % 1 % 10
    let d = num % 10 % 10
    let c = num % 100 % 10
    let m = num % 1000 % 10
    res.innerText = `Unidade: ${u}
                     Dezena:  ${d}
                     Centena: ${c}
                     Milhar:  ${m}`
}