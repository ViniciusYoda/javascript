const botao = document.querySelector('button')
botao.addEventListener('click', ()=>{
    const somaidade = 0
    const mediaidade = 0
    const maioridadehomem = 0
    const nomevelho = `` 
    const totmulher20 = 0
    const nomes = String(document.querySelectorAll('#nome1','#nome2','#nome3','#nome4')).split()
    const idades = Number(document.querySelectorAll('#idade1','#idade2','#idade3','#idade4').value)
    const sexo = String(document.querySelectorAll('#sexo1','#sexo2','#sexo3','#sexo4')).split()
    somaidade += idades
    for(let p = 1; p <= 4; p++){
        if (p===1 && sexo in 'Mm'){
            maioridadehomem = idades[0,1,2,3]
            nomevelho = nomes[0,1,2,3]
        }
        if (sexo in 'Mm' && idades > maioridadehomem){
            maioridadehomem = idades[0,1,2,3]
            nomevelho = nomes[0,1,2,3]
        }
        if (sexo in 'Ff' && idades < 20){
            totmulher20 += 1
        }
    }
    mediaidade = somaidade / 4
    const res = document.querySelector('#res')
    const homem = document.querySelector('#homem')
    const mulher = document.querySelector('#mulher')
    res.textContent = `A média de idade do grupo é de ${mediaidade} anos`
    homem.textContent = `O homem mais velhor tem ${maioridadehomem} anos e se chama ${nomevelho}`
    mulher.textContent = `Ao todo são ${totmulher20} mulheres com menos de 20 anos`

})