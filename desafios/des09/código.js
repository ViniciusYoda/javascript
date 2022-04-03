function num() {
    let num = window.prompt('Digite um número: ')
    let res = document.getElementById('res')

    res.innerHTML = `O número digitado foi ${num}, seu antecessor é ${num-1}, e o seu sucessor ${num+1}. ` //por algum motivo o resultado do sucessor mostra o número 1
}
