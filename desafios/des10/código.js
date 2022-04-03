function troco() {
    let prod = window.prompt('Qual o nome do produto?')
    let preco = window.prompt(`Qual é o valor do ${prod} que você está comprando?`)
    let dinheiro = window.prompt(`Qual foi o valor que você deu pelo ${prod}?`)
    let res = document.getElementById('res')
    res.innerHTML = `Você comprou um ${prod}, que custa  R$${preco}, você deu R$${dinheiro}, você receberá R$${dinheiro-preco} de troco`
}
    