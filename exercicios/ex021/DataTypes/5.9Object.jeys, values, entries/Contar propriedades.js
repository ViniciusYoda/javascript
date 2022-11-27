function count(obj) {
    return Object.keys(obj).length
}

let user = {
    name: 'John',
    age: 30
};
  
console.log( count(user) ); // 2