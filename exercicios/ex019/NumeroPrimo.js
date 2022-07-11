const botao = document.querySelector('#botao')
const res = document.querySelector('#res')
const for = document.querySelector('#for')
const para = document.querySelector('#para')
const primo = document.querySelector('#primo')
const num = Number(document.querySelector('#num').value)
botao.addEventListener('click', ()=>{
    let tot = 0
    for(let i = 1; i <= num; i++)
        if (num % i === 0)
            for.textContent = 
            tot +=1
        else
            for.textContent = 
        res.textContent = `${i}`
    para.textContent = `O número ${num} foi divísivel ${tot} vezes`
    if (tot == 2)
        primo.textContent = `E por isso ele é primo`
    else
        primo.textContent = `E por isso ele não é primo`

})