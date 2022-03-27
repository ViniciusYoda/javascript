function verificar() {
    var data = new Date()
    var ano = data.getFullYear()
    var fano = document.getElementById('txtano')
    var res = document.querySelector('div#res')
    if (fano.value.length == 0 || Number(fano.value) > ano) {
        window.alert('[ERRO] Verifique os dados e tente novamente')
    } else {
        var fsex = document.getElementsByName('radsex')
        var idade = ano - Number(fano.value)
        var genero = ''
        var img = document.createElement('img')
        img.setAttribute('id', 'foto')
        if (fsexo[0].checked) {
            genero = 'Homem'
            if (idade >= 0 && idade < 10) {
                img.setAttribute('src', 'img/homemcriança.png')
            } else if (idade < 21) {
                img.setAttribute('src', 'img/homemjovem.png')
            } else if (idade < 50) {
                img.setAttribute('src', 'img/homemadulto.png')
            } else {
                img.setAttribute('src', 'img/homemidoso.png')
            }
        } else if (fsexo[1].checked){
            genero = 'Mulher'
            if (idade >= 0 && idade < 10) {
                img.setAttribute('src', 'img/mulhercriança.png')
            } else if (idade < 21) {
                img.setAttribute('src', 'img/mulherjovem.png')
            } else if (idade < 50) {
                img.setAttribute('src', 'img/mulheradulta.png')
            } else {
                img.setAttribute('src', 'img/mulheridosa.png')  
            }
        }
        res.style.textAlign = 'center'
        res.innerHTML = `Detectamos ${genero} com ${idade} anos.`
        res.appendChild(img)
    }
}
// motivo que possa não está indo: o tamanho das imagens