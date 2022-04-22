function sal(){
    var nome = window.prompt("Qual é seu nome?")
    var salN = window.prompt(`Qual é o seu salário ${nome}?`)
    var aumento = window.prompt("Qual o percentual de aumento?")
    res.innerHTML = `<br>
   O salário atual era de R$ ${salN}. <br><br>
   Com um aumento de ${aumento}, o salário vai aumentar R$ ${aumento*100}  <br><br>
   
   E a partir dai, ${nome} vai passar ganhar ${salN + (aumento*100)}`
}