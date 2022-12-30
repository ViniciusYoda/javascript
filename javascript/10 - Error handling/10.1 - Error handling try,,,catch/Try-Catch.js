// Reference error
let x;
try {
   x = y + 1
} catch (error) {
   console.log(error.name)
   console.log(error.message)
}

// SyntaxError
try {
   eval("alert('helllo)")
} catch (error) {
   console.log(error.name)
   console.log(error.message)
}

// TypeError
let num = 1;
try {
   num.toUpperCase()
} catch (error) {
   console.log(error.name)
   console.log(error.message)
}

function UserException(message) {
   this.message = message
   this.name = "UserException"
}
try {
   let numero = -6
   if (numero < 0) {
      throw new UserException("O número deve ser positivo")
   }
   console.log('ok')
} catch (error) {
   console.log(error.name)
   console.log(error.message)
}


