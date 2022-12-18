(a, b) => {
   return a + b;
}

(a, b) => a + b;

let a = 5;
let b = 10;

let c = (a, b) => a + b;

console.log(c(a, b))

let d = (x, y) => {

   let op;

   if(x > 5) {
      op = x * y;
   } else {
      op = x / y;
   }

   return op;

}

console.log(d(a, b))

let frase = "amazon.com.br"

let fraseArray = (frase) => frase.split(' ');

console.log(fraseArray(frase))

let semArg = () => console.log("Não tem")

semArg()

