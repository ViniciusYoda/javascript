const botao = document.querySelector('#botao')
botao.addEventListener('click', ()=>{
    const res = document.querySelector('#res')
    const para = document.querySelector('#para')
    const frase = String(document.querySelector('#frase').toUpperCase().trim())
    const palavras = frase.split()
    const junto = ''.join(palavras)
    const inverso = ''
    for(let letra = 1; letra <= junto.length; i--)
        inverso += junto[letra]
    res.textContent = `O inverso de ${junto} é {inverso}`
    if (inverso === junto)
        para.textContent = `Temos um palíndromo!`
    else
        para.textContent = `A frase digitada não é um palíndromo`
})

let re = /[^A-Za-z0-9]/g
frase = frase.toLowerCase().replace(re, '')
let len = frase.length
for(let i = 0; i < len/2; i++){
    if(frase[i] !== frase[len - 1 - i]){
        para.textContent = `A frase digitada não é um palíndromo`
    }
}
para.textContent = `Temos um palíndromo`