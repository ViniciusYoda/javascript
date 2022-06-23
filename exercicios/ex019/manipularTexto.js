function ver(){
    const res = document.getElementById('res')
    const name = document.querySelector('#nome')
    let nome = String(name.value)
    let ma = nome.toUpperCase()
    let mi = nome.toLowerCase()
    res.innerText = `Seu nome em maiúsculas é ${ma}
                     Seu nome em minúsculas é ${mi}`
}