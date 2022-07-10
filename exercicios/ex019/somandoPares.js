const quantidade = 6
for(i = 0; i <= 6; i++){
    let x = document.getElementById('demo')

    let y = document.createElement("input")
    y.setAttribute("name", `input${i}`)
    y.setAttribute("type", 'number')

    x.appendChild(y)
}