function ordenar(){
    const n1 = document.querySelector('#n1')
    const n2 = document.querySelector('#n2')
    const n3 = document.querySelector('#n3')
    const n4 = document.querySelector('#n4')
    const res = document.querySelector('#res')
    let p1 = n1.value
    let p2 = n2.value
    let p3 = n3.value
    let p4 = n4.value
    let lista = [p1, p2, p3, p4]
    let sorteio = lista.sort()
    res.textContent = `A ordem de apresentação será: ${sorteio}`
}