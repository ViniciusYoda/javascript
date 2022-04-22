function ad(){
    var valor = window.prompt("Qual era o valor do produto?")
    var newvalor = window.prompt("Qual é o valor atualmente?")
    res.innerHTML = `O produto custava R$ ${valor} reais, agora custa R$ ${newvalor} reais`
    if (newvalor > valor){
        res.innerHTML = `Hoje o produto está mais caro, que antes. <br><br>
        O preço subiu R$ ${newvalor - valor} reais`
    }else{
        if(newvalor < valor){
        res.innterHTML = `Hoje o produto está mais barato, que antes. <br><br>
        O preço caiu R$ ${newvalor - valor} reais`
        }
    }
}

