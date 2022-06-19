class Animal {
    constructor(nome) {
        this.name = nome;
    }

    speak(){
        console.log(`${this.name} made some noise`)
    }

    speak(){
        console.log(`Dog ${this.name} barked!`)
    }
}

class Dog extends Animal {
    constructor(nome) {
        super(nome)
    }
}

const animal = new Animal('Simba')
const dog = new Dog('Bob')

animal.speak()
dog.speak()