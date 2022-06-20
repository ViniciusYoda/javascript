function calcular(){
    const co = document.querySelector('#co')
    const ca = document.querySelector('#ca')
    const res = document.querySelector('#res')
    let cOpo = Number(co.value)
    let cAdj = Number(ca.value)
    res.innerHTML = `O valor da hipotenusa é ${Math.hypot(cOpo, cAdj).toFixed(2)}`
}