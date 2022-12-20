function User(name) {
   this.name = name;
}
User.prototype = {}; 

let user = new User('John'); 
let user2 = new user.constructor('Pete');

console.log( user2.name ); // undefined

