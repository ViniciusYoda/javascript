let a = +prompt('a?', '');

switch (a){
    case 0:
        alert(0);
        break;
    case 1:
        alert(1);
        break;
    case 2:
    case 3:
        alert('2,3');
        break;
}

/*

Por favor, note: o breakna parte inferior não é necessário. Mas nós o colocamos para tornar o código à prova de futuro.

No futuro, existe a possibilidade de adicionarmos mais um case, por exemplo case 4. E se esquecermos de adicionar uma quebra antes dela, no final de case 3, haverá um erro. Então isso é um tipo de auto-seguro.

*/