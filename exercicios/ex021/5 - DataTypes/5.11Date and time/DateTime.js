let dt = new Date()

let ndt = new Date();

ndt.setDate(dt.getDate()-10)

let dia = dt.getDate()
let mes = dt.getMonth()
let ano = dt.getFullYear()
let diasem = ndt.getDay()
let horas = dt.getHours()
let minutos = dt.getMinutes()
let segundos = dt.getSeconds()

let meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro")

let semanas = new Array("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado")

console.log(semanas[diasem] + ", " + dia + " de " + meses[mes] + " de " + ano)
console.log(horas + ":" + minutos + ":"  + segundos)