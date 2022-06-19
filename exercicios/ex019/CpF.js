function Converter(){
    const celsius = document.getElementById('celsius')
    const res = document.getElementById('res')
    let c = Number(celsius.value)
    let f = c * 1.8 + 32
    res.innerText = `A temperatura de ${c.toFixed(2)}°C corresponde a ${f.toFixed(2)}°F`
}