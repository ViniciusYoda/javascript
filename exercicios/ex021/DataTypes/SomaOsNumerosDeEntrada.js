function sumInput(){
    let numeros = [];

    while (true) {

        let valor = prompt("Número: ", 0);

        if (valor === "" || valor === null || !isFinite(valor)) break;

        numeros.push(+valor);
    }

    let soma = 0;
    for (let numero of numeros) {
        soma += numero;
    }
    return soma;
}

alert( sumInput() )