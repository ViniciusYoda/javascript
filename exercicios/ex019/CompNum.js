function Comparar() {
    const n1 = Number(document.getElementById("n1").value)
    const n2 = Number(document.getElementById("n2").value)
    const res = document.getElementById("res")
    if (n1 > n2)
        res.innerText = `O primeiro número é maior`
    else if (n1 === n2)
        res.innerText = `Ambos os números são iguais`
    else
        res.innerText = `O segundo número é maior`
}