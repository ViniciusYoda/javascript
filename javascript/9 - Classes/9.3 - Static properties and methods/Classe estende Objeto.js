class Rabbit extends Object {
   constructor(name) {
      super();
      this.name  = name;
   }
}

let rabbit = new Rabbit("Rab");

console.log( rabbit.hasOwnProperty('name') );