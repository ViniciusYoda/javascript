function bis() {
    var bis = window.prompt("Qual é o ano que você quer verificar?")
    if (bis / 4 && bis / 100  && bis / 400 ){
        res.innerHTML = "O ano é bissexto"
    } else {
        res.innerHTML = "O ano nãe é bissexto"

    }
}