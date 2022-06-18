function multiplicar(){
    let num = document.getElementById('nm')
    let res = document.getElementById('res')
    let n = Number(num.value)
    res.innerText = `${n} X  1 = ${n*1}
                     ${n} X  2 = ${n*2}
                     ${n} X  3 = ${n*3}
                     ${n} X  4 = ${n*4}
                     ${n} X  5 = ${n*5}
                     ${n} X  6 = ${n*6}
                     ${n} X  7 = ${n*7}
                     ${n} X  8 = ${n*8}
                     ${n} X  9 = ${n*9}
                     ${n} X 10 = ${n*10} `
    

}