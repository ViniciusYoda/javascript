const names = ["Felipe", "João", "Julia", 10, false];

const joao = names[1];

console.log(joao);

names.push('Pedro');

console.log(names);

names.unshift(20);

console.log(names)

names.pop();

console.log(names)

names[3] = 'Gustavo';



console.log(names.length);

console.log(names.indexOf('Felipe'));

const sortsNames = names.sort();

const namesIsArray = Array.isArray(names)

console.log(sortsNames);

console.log(namesIsArray)


