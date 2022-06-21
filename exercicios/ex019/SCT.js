function calcular(){
    const angulo = document.querySelector('#angulo')
    const res = document.querySelector('#res')
    let an = Number(angulo.value)
    let seno = Math.sin(an)
    let cosseno = Math.cos(an)
    let tangente = Math.tan(an)
    res.textContent = `O seno de ${an} é ${seno.toFixed(2)}
                       O cosseno de ${an} é ${cosseno.toFixed(2)}
                       A tangente de ${an} é ${tangente.toFixed(2)}`
}