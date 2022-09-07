let arr = ["a", "b"];

arr.push(function() {
    console.log(this);
})

arr[2](); 

/*

A chamada arr[2]()é sintaticamente o bom e velho obj[method](), no papel de objtemos arre no papel de methodtemos 2.

Então temos uma chamada da função arr[2]como um método de objeto. Naturalmente, ele recebe thisreferenciando o objeto arre gera o array:

O array tem 3 valores: inicialmente tinha dois, mais a função.

*/