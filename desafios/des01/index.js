function calcular(){
    var txtv = window.document.querySelector('input#txtvel')
    var res = window.document.querySelector('div#res')
    var vel = Number(txtv.value)
    res.innerHTML = `<p>Sua velocidade atual é de <strong>${vel}Km/h</p></strong>`
    if (vel > 60) {
        res.innerHTML += `<p>Você está <strong>MULTADO</strong> por excesso de velocidade </p>`
    } else {
        res.innerHTML += `<p>Você está na velocidade permitida</p>`
    }
    res.innerHTML += `<p>Dirija sempre com cinto de segurança!</p>`
}