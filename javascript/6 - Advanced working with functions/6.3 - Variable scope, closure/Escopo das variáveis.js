var comida = "pizza"; // global
function pedirComida() {
   var comida2 = "tacos" // local
   console.log(comida2)
}

pedirComida()
console.log("Eu quero uma " + comida);
console.log("Eu quero uma " + comida2); 