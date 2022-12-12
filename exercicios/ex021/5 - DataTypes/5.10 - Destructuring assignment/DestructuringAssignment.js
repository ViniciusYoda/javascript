let idade;

const pessoa = {
    name: "Elton",
    age: 26
};

({ age: idade } = pessoa)

console.log(idade);

const fruits = ["banana", "pera", "uva"]

const [b, ...rest] = fruits

console.log(rest);

function liquidificador({pera}) {
    console.log(pera)
}

const fruits2 = {
    banana: "banana",
    pera: "pera"
}

liquidificador(fruits2)