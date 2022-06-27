function revelar(){
    const res = document.getElementById('res')
    const vel = document.getElementById('vel')
    const v = Number(vel.value)
    if (v <= 80)
        res.innerText = `Dirija com segurança, sem ultrapassar a velocidade permitida`
    else 
        res.innerText = `Multado! Você passou da velocidade permitida! Você foi multado em R$${(v-80)*7.00}`
}