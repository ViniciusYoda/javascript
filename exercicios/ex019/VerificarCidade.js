function ver() {
    const cidade = document.getElementById('cidade')
    const res = document.getElementById('res')
    let city = String(cidade.value).trim()
    res.innerText = `${city.substring(city < 5).toUpperCase() === 'SANTOS'}`
}