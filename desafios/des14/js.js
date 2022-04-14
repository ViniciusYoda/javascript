function descontar(){
    let produto = window.prompt("Qual o nome do produto que você comprou?")
    let preco = window.prompt(`Qual o valor do ${produto} ?`)
    res.innerHTML = `O ${produto}  custa ${preco}, mas aqui você receberá um desconto de 10%.
    <br>
    O valor final do produto é ${preco - (10/100)}`
}