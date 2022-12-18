// Bind
function thisBindExemplo() {
   console.log(this)
}

const obj = {exemplo: "exemplo"}

thisBindExemplo = thisBindExemplo.bind(obj)

thisBindExemplo()

// Call

const obj1 = {exemplo1: "exemplo1", mostraThis: function thisCallExemplo() {
   console.log(this)
}}

obj1.mostraThis()

const obj2 = {exemplo2: "exemplo2"}

obj1.mostraThis.call(obj2)

// Apply
obj1.mostraThis.apply(obj2)