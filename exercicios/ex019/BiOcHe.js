function ver(){
    const numero = document.getElementById('numero')
    const number = Number(numero.value)
    const opcao = document.getElementById('opcao')
    const res = document.getElementById('res')
    const binario = number.toString(2)
    const octal = number.toString(8)
    const hexadecimal = number.toString(16)
    const option = [1, 2, 3]
    if (opcao.value === '1')
        res.innerText = `${number} convertido para binário é igual a ${binario}`
    else if (opcao.value === '2')
        res.innerText = `${number} convertido para octal é igual a ${octal}`
    else if (opcao.value === '3')
        res.innerText = `#{number} convertido para hexadecimal é igual a ${hexadecimal}`
    else 
        res.innerText = `Opção inválida`
}