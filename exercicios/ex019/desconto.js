function descontar(){
    const preco = document.getElementById('dinheiro')
    const res = document.getElementById('res')
    let real = Number(preco.value)
    let desconto = real - (real*(5/100))
    res.innerText = `O produto que custava R$${real}, na promoção com desconto de 5% vao custar R$${desconto.toFixed(2)}.`
}