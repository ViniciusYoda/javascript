const x = '';
//FALSE

console.log(!!x);

if (x) {
    console.log(x)
}

const y = 0;
console.log(!!y);

const a = null;
console.log(!!a);
const b = undefined;
console.log(!!b);

const list = [];
console.log(!!list)
const obj = {};
console.log(!!obj)

if (list.length > 0){
    console.log(list)
}

console.log(!list)