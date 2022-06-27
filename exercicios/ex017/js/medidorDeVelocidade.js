verificarVelocidade(150);

function verificarVelocidade(velocidade) {
    const velocidadeMaxima = 70;
    const KmPorPontos = 5
    if (velocidade <= velocidadeMaxima)
        console.log('Ok')
    else {
        const pontos = ((velocidade - velocidadeMaxima) / KmPorPontos )
        if( pontos >= 12)
            console.log('Carteira Suspensa')
        else
            console.log('Pontos',Math.floor(pontos))
    }
}