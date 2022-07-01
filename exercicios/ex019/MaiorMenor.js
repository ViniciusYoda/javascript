function ver(){
    const res = document.getElementById('res')
    const n1 = document.getElementById('n1')
    const n2 = document.getElementById('n2')
    const n3 = document.getElementById('n3')
    const p = Number(n1.value)
    const s = Number(n2.value)
    const t = Number(n3.value)
    const menor = p
    const maior = p
    if (s<p && s<t)
        menor = s
    if (t<p && t<s)
        menor = t
    if (s>p && s>t)
        maior = s
    if (t>p && t>s)
        maior = t
    res.innerText = `O menor valor digitado foi ${menor}
                     O maior valor digitado foi ${maior}`
    
}