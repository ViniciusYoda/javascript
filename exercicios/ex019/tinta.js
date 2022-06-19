function area(){
    const largura = document.getElementById('la')
    const altura = document.getElementById('al')
    const res = document.getElementById('res')
    let al = Number(altura.value)
    let la = Number(largura.value)
    let area = al * la
    let tinta = area / 2
    res.innerText = `Sua parede tem a dimensão de ${la}x${al}, e sua área é de ${area.toFixed(2)}m².`
    res.innerText = `Para pintar a parede, você precisará de ${tinta.toFixed(2)}l de tinta.`
}