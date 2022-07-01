function descobrir(){
    const res = document.getElementById('res')
    const ano = document.getElementById('ano')
    const year = Number(ano.value)
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 !== 0)
        res.innerText = `O ano ${year} é bissexto`
    else
        res.innerText = `O ano ${year} não é bissexto`
}