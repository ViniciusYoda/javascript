const botaoSoma = document.querySelector('#somar')
const resomar = document.querySelector('.resomar')
botaoSoma.addEventListener('click', ()=> {
    const num1 = Number(document.querySelector('#num1').value)
    const num2 = Number(document.querySelector('#num2').value)
    const somar = num1 + num2
    resomar.textContent = `${somar}`
})

const botaoSubtracao = document.querySelector('#subtracao')
const resubtrair = document.querySelector('.resubtrair')
botaoSubtracao.addEventListener('click', ()=> {
    const num3 = Number(document.querySelector('#num3').value)
    const num4 = Number(document.querySelector('#num4').value)
    const subtrair = num3 - num4 
    resubtrair.textContent = `${subtrair}`
})

const botaoMultiplicaco = document.querySelector('#multiplicar')
const resmultiplicar = document.querySelector('.resmultiplicar')
botaoMultiplicaco.addEventListener('click', ()=> {
    const num5 = Number(document.querySelector('#num5').value)
    const num6 = Number(document.querySelector('#num6').value)
    const multiplicar = num5 * num6
    resmultiplicar.textContent = `${multiplicar}`
})

const botaoDivisao = document.querySelector('#dividir')
const resdividir = document.querySelector('.resdividir')
botaoDivisao.addEventListener('click', ()=> {
    const num7 = Number(document.querySelector('#num7').value)
    const num8 = Number(document.querySelector('#num8').value)
    const dividir = num7 / num8
    resdividir.textContent = `${dividir}`
})

const botaoResto = document.querySelector('#sobra')
const resresto = document.querySelector('.resresto')
botaoResto.addEventListener('click', ()=> {
    const num9 = Number(document.querySelector('#num9').value)
    const num10 = Number(document.querySelector('#num10').value)
    const resto = num9 % num10
    resresto.textContent = `${resto}`
})

const botaoExponiente = document.querySelector('#exponiacao')
const resexponiente = document.querySelector('.resexponiente')
botaoExponiente.addEventListener('click', ()=> {
    const num11 = Number(document.querySelector('#num11').value)
    const num12 = Number(document.querySelector('#num12').value)
    const exponiente = num11 ** num12
    resexponiente.textContent = `${exponiente}`
})