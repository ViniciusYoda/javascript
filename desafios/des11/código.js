function converter() {
    let medida = window.prompt('Digite uma distância em metro(m)')
    let res =  document.getElementById('res')
    res.innerHTML = `A distância de ${medida} corresponde a: <br> ${medida/1000} quilômetros (Km) <br> ${medida/1000} hectômetros (Hm) <br> ${medida/10} decâmetros (Dam) <br> (${medida*10}) decímetros (dm) <br> ${medida*100} centrímetros (cm) <br> ${medida*1000} milímetros (mm)`
    
}