function adivinhe(){
    const num = document.getElementById('num')
    const proc = document.getElementById('proc')
    const res = document.getElementById('res')
    let n = Number(num.value)
    let computador = Math.floor(5 * Math.random(5))
    proc.innerText = 'Processando...'
    if (n != computador)
        res.innerText = `Ganhei! Eu pensei no número ${computador} e não no ${n}`
    else{
        res.innerText = `Parabéns! Você conseguiu me vencer`
    }
}