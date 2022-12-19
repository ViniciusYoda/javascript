let hamster = {
   stomach: [],

   eat(food) {
      this.stomach.push(food)
   }
};

let speedy = {
   __proto__: hamster,
   stomach: []
};

let lazy = {
   __proto__: hamster,
   stomach: []
};

// Speedy one found the food
speedy.eat("apple");
console.log( speedy.stomach );

// Lazy one's stomach is empty
console.log( lazy.stomach );