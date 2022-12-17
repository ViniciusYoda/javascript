/* EVENTOS DE TEMPO COM JAVASCRIPT

OS EVENTOS DE TEMPO PERMITEM A EXECUÇÃO DO CÓDIGO EM INTERVALOS DE TEMPO ESPECIFICADOS. ESSES INTERVALOS DE TEMPO SÃO CHAMADSO DE EVENTOS DE CRONOMETRAGEM.

OS DOIS MÉTODOS-CHAVE PARA USAR COM JAVASCRIPT SÃO:

setTimeout(function, tempo em milisegundos)
-> Executa uma função, depois de esperar um número especificado de milissegundos.

setInterval(function, milliseconds) 
-> É o mesmo que setTimeout(), mas repete a execução da função continuamente.

*/

function ativarContagem() {
   //document.getElementById('tempo').innerHTML = "Começou a contar!"
   // ativa a função apenas uma vez quando der o tempo especificado
  // tempo = setTimeout(function(){
   //   document.getElementById('tempo').innerHTML = "Executou o setTimeout"
  // }, 5000)
   tempo = setInterval(function() {
      var cronometro = document.getElementById('tempo').innerHTML;
      var soma = parseInt(cronometro) + 1
      document.getElementById('tempo').innerHTML = soma
   }, 1000)
}

function pararContagem() {
  //clearTimeout(tempo)
   // document.getElementById('tempo').innerHTML = "Parou a contagem"
   clearInterval(tempo)
}