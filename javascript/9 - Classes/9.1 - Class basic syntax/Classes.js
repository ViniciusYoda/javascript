class Reptile {
   constructor (firstAppearance) {
      this.firstAppearance = firstAppearance
   }

   static getClassName() {
      return this.name
   }

   get firstTimeAppearance () {
      return this.firstAppearance
   }

   set newFirstAppearance (firstAppearance) {
      this.firstAppearance = firstAppearance

   }
}

const smaug = new Reptile('The Hobbit')

smaug.firstAppearance

Reptile.getClassName()

class Dragon extends Reptile {
   constructor (firstAppearance) {
      super(firstAppearance)
   }
}

smaug = new Dragon("The Dragon")


