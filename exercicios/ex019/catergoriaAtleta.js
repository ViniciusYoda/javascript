const botao = document.querySelector('#botao')
botao.addEventListener('click', ()=>{
    const res = document.getElementById('res')
    const para = document.getElementById('para')
    const nasc = Number(document.getElementById('nasc').value)
    const data = new Date()
    const atual = data.getFullYear()
    const idade = atual - nasc
    res.textContent = `O atleta tem ${idade} anos`
    if (idade <= 9){
        para.textContent = `Categoria Mirim`
    } else if (idade <= 14){
        para.textContent = `Categoria Infantil`
    } else if (idade <= 19){
        para.textContent = `Categoria Júnior`
    } else if (idade <= 25){
        para.textContent = `Categoria Sénior`
    } else {
        para.textContent = `Categoria Master`
    }
})