const botao = document.querySelector('#botao')
botao.addEventListener('click', ()=>{
    const res = document.querySelector('#res')
    const primeiro = Number(document.querySelector('#primeiro').value)
    const razao = Number(document.querySelector('#razao').value)
    const termo = Number(document.querySelector('#termo').value)
    const pa = ''
    for(let i = 1; i <= termo; i++){
        pa += "Termo " + i +" = " + primeiro + "<br />"
            primeiro += razao   
    }
    res.textContent = `${pa}`
})