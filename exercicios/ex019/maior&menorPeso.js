const botao = document.querySelector('button')
botao.addEventListener('click', ()=>{
    const peso = Number(document.querySelectorAll("input[type='number']").values())
    const maior = 0
    const menor = 0
    for(let i = 1; i < peso; i++){
        if (i === 1){
            maior = peso
            menor = peso
        }else{
            if (peso > maior){
                maior = peso
            }
            if (peso < menor){
            menor = peso
            }
        }
    
    }
    const res = document.querySelector('#res')
    const para = document.querySelector('#para')
    res.textContent = `O maior peso lido foi de ${maior}Kg`
    para.textContent = `O menor peso lido foi de ${menor}Kg`

})