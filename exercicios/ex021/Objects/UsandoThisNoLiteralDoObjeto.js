function makeUser() {
    return {
        name: "John",
        ref: this
    };
}

let user = makeUser();

console.log(user.ref.name);

/*

Resposta: um erro.

Isso ocorre porque as regras que definem thisnão analisam a definição do objeto. Apenas o momento da chamada importa.

Aqui o valor de thisinside makeUser()é undefined, porque é chamado como uma função, não como um método com sintaxe de “ponto”.

O valor de thisé um para toda a função, blocos de código e literais de objeto não o afetam.

Então, ref: thisna verdade, leva a corrente thisda função.

Podemos reescrever a função e retornar o mesmo thiscom undefined valor:

*/

function makeUser() {
    return this; // this time there´s no object literal
}

console.log(makeUser().name); // Error: Cannot read property 'name' of undefined

/*

Como você pode ver, o resultado de alert( makeUser().name )é o mesmo que o resultado do alert( user.ref.name )exemplo anterior.

Aqui está o caso oposto:

*/

function makeUser() {
    return {
        name: "John",
        ref() {
            return this;
        }
    };
}

let user2 = makeUser();

console.log(user2.ref().name); // John

// Agora funciona, porque user.ref()é um método. E o valor de thisé definido para o objeto antes de dot ..