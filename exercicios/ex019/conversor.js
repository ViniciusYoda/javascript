function converter(){
    let tn1 = document.getElementById("txtn1")
    let res = document.getElementById('res')
    let val = Number(tn1.value)
    let cm = val * 100
    let mm = val * 1000
    res.innerText = `O valor ${val}m em cm é ${cm} e em mm é ${mm}`
}