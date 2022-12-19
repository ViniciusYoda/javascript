let animal = {
   jumps: null
};
let rabbit = {
   __proto__: animal,
   jumps: true
};

console.log(rabbit.jumps); // (1) true, retirado de rabbit.

delete rabbit.jumps;

console.log(rabbit.jumps); // (2) null, retirado de animal.

delete animal.jumps;

console.log(rabbit.jumps); // (3) ndefined, não existe mais essa propriedade.