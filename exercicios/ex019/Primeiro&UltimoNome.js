function ver(){
    const res = document.getElementById('res')
    const nome = document.getElementById('nome')
    let name = String(nome.value).toUpperCase().trim().split(' ')
    let tamanho = name.length
    res.innerText = `Seu primeiro nome é ${name[0]}
                     Seu último nome é ${name[tamanho-1]}`
}