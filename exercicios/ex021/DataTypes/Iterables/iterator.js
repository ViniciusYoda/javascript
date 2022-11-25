let num = [5,1,4,2,3]
let it = num[Symbol.iterator]()

for(let i = 0; i < num.length; i++) {
    let v = it.next().value
    v%2 > 0 ? console.log("Impar") : console.log("par")
} 