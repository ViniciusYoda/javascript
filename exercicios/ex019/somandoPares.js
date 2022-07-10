const soma = 0
const cont = 0
for(i = 0; i <= 6; i++){
    let x = document.getElementById('demo')
    let y = document.createElement("input")
    y.setAttribute("name", `input${i}`)
    y.setAttribute("type", 'number')
    x.appendChild(y)
    const botao = document.querySelector('#botao')
    botao.addEventListener('click', ()=>{
    const num = Number(document.querySelectorAll('input').value)
    const res = document.querySelector('#res')
    if (num % 2 === 0){
        soma += num
        cont += 1
    }
    res.textContent = `Você informou ${cont} números pares e a soma foi ${soma}`
    })
}

