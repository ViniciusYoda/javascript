const botao = document.querySelector('#botao')
botao.addEventListener('click', function(){
    const res = document.querySelector('#res')
    const num = Number(document.querySelector('#num').value)
    for(let i = 1; i <= 10; i++){
        let tabuada = ''
        tabuada += num+" x "+i+" = " + num*i+"<br />"
        // tabuada += `${num} x ${i} = ${num*i}`
        res.innerHTML = tabuada
    }
})