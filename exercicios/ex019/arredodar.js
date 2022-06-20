function converter(){
    const nF = document.querySelector('#nF')
    const res = document.querySelector('#res')
    let float = Number(nF.value)
    res.innerHTML = `O número digitado foi ${float}, e sua porção inteira é ${Math.round(float)}`

}