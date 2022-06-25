function procurar(){
    const a = document.getElementById('a')
    const res = document.getElementById('res')
    let letraA = String(a.value).toUpperCase().trim()
    let idA = 'A'
    res.innerText = `A letra A aparece ${letraA.split('A').length - 1} vezes;
                     A primeira letra A apareceu na posição ${letraA.indexOf('A')+1};
                     A última letra A apareceu na posição ${letraA.lastIndexOf('A')+1}`
}