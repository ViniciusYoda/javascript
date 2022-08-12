var usuario = {
    nome: 'Vinícius',
    idade: 18,
    homem: true,
    'ultimo-nome': 'Yoda'
};

console.log(usuario);
console.log(usuario.nome);
console.log(usuario['idade']);
console.log(usuario.homem);
console.log(usuario['ultimo-nome']);

usuario.ano = 2022;

console.log(usuario);

delete.idade;

console.log(usuario);

usuario.hobbies = ['Ler', 'Estudar', 'Criar'];

console.log(usuario);

usuario.competencias = {
    lingguagens: ['html', 'css', 'javascript', 'python']
};

console.log(usuario);

var usuario2 = {
    digaOi(name) {
        return `Olá ${name}`;
    }
};

console.log(usuario2.digaOi('Vinícius'));

var cor = 'azul';
var usuario3 = {
    nome: 'Vinicius',
    cor
};

console.log(usuario3);

var usuario4 = {
    nome: 'Vini',
    idade: 18
};

var extraInfo = {
    país: 'Brasil',
    estado: 'São Paulo'
};

var novoUsuario = Obhect.assign({},usuario4,extraInfo);
console.log(novoUsuario);

function Admin(name){
    this.name = name,
    this.admin = admin
}

let admin = new Admin('Bruno')

console.log(admin.name);

function name() {
    this.name: 'Vinícius'
    return{
        name: 'Mario'
    };
}

console.log(new name().name);