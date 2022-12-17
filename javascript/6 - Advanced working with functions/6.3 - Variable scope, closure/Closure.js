/* Closure é quando uma função "lembra"
   seu escopo léxico, mesmo quando a função
   é executada fora desse escopo léxico
*/

let x = 50

function fora() {
   let x = 1005
   function somarXMais3() {
      return x + 3
   }
   return somarXMais3
}


module.exports = fora()