function calcular(){
    const res = document.getElementById('res')
    const n1 = Number(document.getElementById('n1').value)
    const n2 = Number(document.getElementById('n2').value)
    const n3 = Number(document.getElementById('n3').value)
    if (n1 < n2 + n3 && n2 < n1 + n3 && n3 < n1 + n2)
        res.innerText = `Os segmentos acima podem formar um triângulo`
    else
        res.innerText = `Os segmentos acima não pode formar um triângulo`
}