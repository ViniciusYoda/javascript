const date = new Date()
const atual = date.getFullYear()
let totmaior = 0
let totmenor = 0
for(let pess = 1; pess <= 7; pess++){
    const div = document.querySelector('div')
    const label = document.createElement('label')
    label.textContent = `Em que ano a ${pess}º nasceu? `
    const nascInput = document.createElement('input')
    nascInput.setAttribute('nascInput', 'number')
    div.appendChild(label)
    div.appendChild(nascInput)
    const nasc = Number(nascInput.value)
    let idade = atual - nasc
    if (idade >= 21){
        totmaior +=1
    }
    if (idade < 21){
        totmenor +=1
    }

const botao = document.querySelector('button')
botao.addEventListener('click', ()=>{
    const res = document.querySelector('#res')
    const para = document.querySelector('#para')
    res.textContent = `Ao todo tivemos ${totmaior} pessoas maiores de idade`
    para.textContent = `E também tivemos ${totmenor} pessoas menores de idade`
}) 
}
