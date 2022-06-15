const person = {
    firstName: 'Vinícius',
    lastName: 'Yoda',
    age: '18',
    hobbies: ["Assistir filmes", "Jogar", "Ler"],
    dog: {
        name: 'Simba',
        age: 4,
    }
};

//const firstName = person.firstName;
//const lastName = person.lastName;
//const age = person.age;
//const hobbies = person.hobbies;


const {firstName: primeroNome, lastName, age, hobbies, dog: { name: dogName}} = person;

console.log(primeroNome);
console.log(lastName);
console.log(age);
console.log(hobbies);

const read = person.hobbies[2];

console.log(read);

console.log(person.dog.age)


