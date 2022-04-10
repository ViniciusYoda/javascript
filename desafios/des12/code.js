function converter() {
    let temperatura = window.prompt('Digite a temperatura em Celsius(C)') 
    let res =  document.getElementById('res')
    res.innerHTML = `A temperatura de ${temperatura}ºC corresponde a:
    <br>
    ${temperatura * 1.8 + 32}ºF 
    <br>
    ${temperatura + 273.15}ºK` 

}