function sayHi() {
   alert(this.name);
}
sayHi.test = 5;

let bound = sayHi.bind({
   name: "John"
});

console.log(bound.test)