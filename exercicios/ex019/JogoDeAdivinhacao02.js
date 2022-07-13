const botao = document.querySelector('#botao')
botao.addEventListener('click',()=>{
    let acertou = false
    let palpites = 0
    let computador = Math.floor(10 * Math.random(10))
    const jogador = Number(document.querySelector('#num').value)
    const proc = document.querySelector('#proc')
    const res = document.querySelector('#res')
    while (jogador != acertou){
        palpites++
        if(jogador === computador){
            acertou = true
        }else{
            if (jogador < computador){
                proc.textContent = `Mais alto`
            }else if(jogador > computador){
                proc.textContent = `Menos alto`
            }
        }
    }
    res.textContent = `Acertou com ${palpites} palpites`
})