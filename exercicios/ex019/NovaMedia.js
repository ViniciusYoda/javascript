const botao = document.querySelector('#botao')
const res = document.querySelector('#res')
botao.addEventListener('click', ()=>{
    const n1 = Number(document.getElementById('n1').value)
    const n2 = Number(document.getElementById('n2').value)
    const media = (n1 + n2) / 2
    if (media < 5.0){
        res.textContent = `A média de ${n1} e ${n2} é ${media}. O aluno está reprovado`
    } else if (media >= 5.0 && media < 7){
        res.textContent = `A média de ${n1} e ${n2} é ${media}. O aluno está de recuperação`
    } else {
        res.textContent = `A média de ${n1} e ${n2} é ${media}. O aluno está aprovado`
    }
})