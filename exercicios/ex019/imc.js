const botao = document.querySelector('#botao')
botao.addEventListener('click', ()=>{
    const res = document.querySelector('#res')
    const para = document.querySelector('#para')
    const peso = Number(document.querySelector('#peso').value)
    const altura = Number(document.querySelector('#altura').value)
    const imc = peso / (altura ** 2)
    res.textContent = `O IMC dessa pessoa é de ${imc.toFixed(1)}`
    if (imc <= 18.5){
        para.textContent = `Abaixo do peso`
    } else if (imc <= 25) {
        para.textContent = `Peso ideal`
    } else if (imc <= 30) {
        para.textContent = `Sobrepeso`
    } else if (imc <= 40) {
        para.textContent = `Obesidade`
    } else {
        para.textContent = `Obesidade mórbida`
    }
})