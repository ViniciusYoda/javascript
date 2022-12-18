(function() {
   
   this.valor = 10
   const modulo = {
      valor: 20,
      getValor: function() {
         return this.valor
      }
   }
   console.log(modulo.getValor())

   const getValor = modulo.getValor.bind(modulo)
   console.log(getValor())

   function func1(param1, param2) {
      console.log(param1, param2)
   }
   const func2 = func1.bind(null, 'param1Fixo')
   func2('param2')
})()