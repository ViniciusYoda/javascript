const sexo = String(document.querySelector('#sexo').value)
sexo.trim().toUpperCase()[0]
const res = document.querySelector('#res')
const botao = document.querySelector('#botao')
botao.addEventListener('click',()=>{
    while (sexo != 'MmFf'){
        res.textContent = `Informação digitada errada`
        
    }
    res.textContent = `Sexo ${sexo} registrado com suceso`
})