function calcular(){
    const res = document.querySelector('#res')
    const para = document.getElementById('para')
    const casa = document.getElementById('casa')
    const salario = document.querySelector('#salario')
    const anos = document.getElementById('anos')
    const house = Number(casa.value)
    const salary = Number(salario.value)
    const years = Number(anos.value)
    const prestacao = house / (years * 12)
    const minimo = salary * 30 / 100
    res.innerHTML = `Para pagar uma casa de R$${house.toFixed(2)} em ${years} anos a prestação será de R$${prestacao.toFixed(2)}`
    if (prestacao <= minimo)
        para.innerText = `Empréstimo pode ser concedido`
    else
        para.innerText = `Empréstimo negado!`
}
     
