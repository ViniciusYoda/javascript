function skara(){
    var a = window.prompt("Qual é o valor do a?")
    var b = window.prompt("Qual o valor do b?")
    var c = window.prompt("Qual é o valor do c?")
    res.innerHTML = `<br>
    A equação atual é ${a}x² + ${b}x + ${c} = 0 <br><br>
    O cálculo realizando será &#9651; = ${b}² - 4 * ${a} * ${c} <br><br>
    O valor calculado foi &#9651; ${b*b - 4 * a * c}`
}