function aumentar(){
    const salario = document.getElementById('salario')
    const res = document.getElementById('res')
    let dinheiro = Number(salario.value)
    let novoSalario = dinheiro + (dinheiro*(15/100))
    res.innerText = `O novo salario do funcionário é de R${novoSalario.toFixed(2)}`
}