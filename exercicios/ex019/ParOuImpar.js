function descobrir(){
    const res = document.getElementById('res')
    const num = document.getElementById('num')
    const n = Number(num.value)
    if (n % 2 === 0)
        res.innerText = `O número ${n} é par`
    else
        res.innerText = `O número ${n} é ímpar`
}