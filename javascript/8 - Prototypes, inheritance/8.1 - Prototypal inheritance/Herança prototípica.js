const meuObjeto = {
   a: 1, 
   b: 2
}

// meuObjeto. __proto__ --> Object.prototype --> null

const meuArray = [1, 2, 3, 'a', 'b']

// meuArray. __proto__ --> Array.prototype --> Object.prototype --> null

function minhaFuncao() {
   return 1 * 2
}

// minhaFuncao. __proto__ --> Function.prototype --> Object.prototype --> null

const novoObjeto = Object.create(meuObjeto)

novoObjeto.novaPropriedade = 5

console.log(meuObjeto.b + novoObjeto.b)

console.log(meuObjeto.hasOwnProperty('map'))

function SalaAula(alunos) {
   this.alunos = alunos || []
}

SalaAula.prototype = {
   adicionarAluno: function(aluno) {
      this.alunos.push(aluno)
   },
   mostraAlunos: function() {
      return this.alunos
   }
}

function NovaSala() {
   SalaAula.call(this)
}

NovaSala.prototype = Object.create(SalaAula.prototype)

const novaSala = new NovaSala()

const minhaSala = new SalaAula(['João', 'Maria'])

minhaSala.adicionarAluno('Pedro')

novaSala.adicionarAluno('João')

console.log(minhaSala.alunos)

console.log(novaSala.mostraAlunos())