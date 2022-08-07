function dados(name, age) {
    name: this.name;
    age: this.age;

    return {
        name: "Vinícius",
        age: 18
    }
}

const dados2 = new dados('Mario', 94);

console.log(dados2);