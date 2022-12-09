//const wsTest = new WeakSet([1,2,3,3,4,5,true,false,false,{},{}, "olá","Olá"])

const wsTest = new WeakSet();

let valor1 = {"Valor1":1};
let valor2 = {"Valor":2};
let valor3 = {"Valor3":3};

wsTest.add(valor1);
wsTest.add(valor2);

console.log(wsTest);

console.log(wsTest.has(valor1));
console.log(wsTest.has(valor3));

wsTest.delete(valor2)
console.log(wsTest);

wsTest.add(valor2);
wsTest.add(valor3);

console.log(wsTest);

setInterval(() => console.log(wsTest), 1000)

setTimeout(() => {
    valor1 = null;
    valor2 = null;
    valor3 = null;
}, 5000)

/*const wm = new WeakMap([
    ["Curso","programação JavaScript"],
    ["Professor", "Rodigro Muniz"],
    ["Horas", 1000],
    [null,"nulo"]
])*/

const wm = new WeakMap();
let chave1 = {};
let chave2 = {};
let chave3 = {};

wm.set(chave1,1);
wm.set(chave2,2)

console.log(wm);

console.log(ws.has(chave1));
console.log(ws.has(chave3));

console.log(ws.get(chave1));
console.log(ws.get(chave2));
console.log(ws.get(chave3));

ws.delete(chave2)
console.log(wm);