function ver(){
    const nome = document.getElementById('nome')
    const res = document.getElementById('res')
    let name = String(nome.value).trim()
    res.innerText = `Seu nome tem Silva? ${name.toUpperCase().includes('SILVA')}`
}