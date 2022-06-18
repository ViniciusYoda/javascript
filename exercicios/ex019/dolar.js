function converter(){
    let real = document.getElementById('dolar')
    let res = document.getElementById('res')
    let dolar = Number(real.value)
    let troco = dolar / 5.15
    res.innerText = `Você pode comprar R$ ${troco.toFixed(2)} doláres`
}