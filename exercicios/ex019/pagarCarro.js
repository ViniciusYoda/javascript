function calcular(){
    const dias = document.getElementById('dias')
    const Kms = document.getElementById('km')
    const res = document.getElementById('res')
    let d = Number(dias.value)
    let km = Number(Kms.value)
    let pagar = d * 60 + km * 0.15
    res.innerText = `O total a pagar é R$${pagar.toFixed(2)}`
}