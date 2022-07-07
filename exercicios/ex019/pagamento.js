const botao = document.querySelector('#botao')
botao.addEventListener('click', ()=>{
    const div = document.querySelector('div')
    const res = document.querySelector('#res')
    const para = document.querySelector('#para')
    const preco = Number(document.querySelector('#preco').value)
    const opcao = Number(document.querySelector('#opcao').value)
    if (opcao === 1){
        let total = preco - (preco * 10 / 100)
        res.textContent = `Sua compra de R$${preco.toFixed(2)} vai custar R$${total.toFixed(2)}`
    } else if (opcao === 2){
        let total = preco - (preco * 5 / 100)
        res.textContent = `Sua compra de R$${preco.toFixed(2)} vai custar R$${total.toFixed(2)}`
    } else if (opcao === 3) {
        let total = preco
        let parcela = total / 2
        res.textContent = `Sua compra será parcelada em 2X de ${parcela} sem juros`
        para.textContent = `Sua compra de R$${preco.toFixed(2)} vai custar R$${total.toFixed(2)}`
    } else if (opcao === 4) {
        const p = document.createElement('p')
        p.textContent = 'Quantas parcelas?'
        const totparc = document.createElement('input')
        const submit = document.createElement('button')
        submit.textContent = `Ver valor`
        div.appendChild(p)
        div.appendChild(totparc)
        div.appendChild(submit)
        submit.addEventListener('click', ()=>{
            let total = preco + (preco * 20 / 100)
            let parcela = total / totparc.value
            res.textContent = `Sua compra será parcelada em ${totparc.value}X de R$${parcela.toFixed(2)}`
            para.textContent = `Sua compra de R$${preco.toFixed(2)} vai custar R$${total.toFixed(2)}`
            div.removeChild(p)
        })
       
    } else {
        res.textContent = `Opção inválida`
    }
    
})