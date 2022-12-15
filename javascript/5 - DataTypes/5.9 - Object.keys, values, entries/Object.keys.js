const person = {
    name:"Roberta",
    age: 27,
    coutry: "Brazil",
    phone: "Iphone"
}

// Chave | Valor
// Object.keys pega a chave do objeto

console.log(Object.keys(person));

const keys = Object.keys(person);

console.log(`A chaves do person: ${keys}`);