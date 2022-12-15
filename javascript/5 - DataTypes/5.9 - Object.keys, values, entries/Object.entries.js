const obj = {
    a: 1,
    b: 2,
    c: 3
}

Object.entries(obj).forEach(([key, values]) => {
    console.log(`A chave: ${key} e o valor: ${values}`);
})