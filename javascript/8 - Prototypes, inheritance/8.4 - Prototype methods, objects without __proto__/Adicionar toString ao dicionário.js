let dictionary = Object.create(null, {
   toString: { // define toString property
      value() { // the value is a function
         return Object.keys(this).join();
      }
   }
});

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple and __proto__ is in the loop
for (let key in dictionary) {
   console.log(key)
}

console.log(dictionary)