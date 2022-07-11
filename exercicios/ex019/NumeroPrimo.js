const botao = document.querySelector('#botao')
const res = document.querySelector('#res')
const fori = document.querySelector('#for')
const para = document.querySelector('#para')
const primo = document.querySelector('#primo')
const num = Number(document.querySelector('#num').value)
botao.addEventListener('click', ()=>{
    let tot = 0
    for(let count=1;count<=num;count++)
        if(num % count === 0)
            tot++

    if(tot===2)
        res.textContent = `É primo`
    else
        res.textContent = `Não é primo`
})