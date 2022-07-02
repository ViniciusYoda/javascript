function calcular(){
    const salario = document.getElementById('salario')
    const res = document.getElementById('res')
    const valor = Number(salario.value)
    let aumento = valor + (valor*(10/100))
    let up = valor + (valor*(15/100))
    if (valor > 1250.00)
        res.innerText = `Seu novo salário é de R$${aumento.toFixed(2)}`
    else
        res.innerText = `Seu novo salário é de R$${up.toFixed(2)}`
}