function calcular(){
    const res = document.getElementById('res')
    const distancia = document.getElementById('distancia')
    const km = Number(distancia.value)
    let preco
    if (km <= 200)
        preco = km * 0.50
    else
        preco = km * 0.45
    res.innerText = `A passagem vai custar R$${preco.toFixed(2)}`

}