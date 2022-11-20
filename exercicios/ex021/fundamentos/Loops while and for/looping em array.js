// for

const bolsavanessa = [
    'cartão de crédito',
    'chaves',
    'dinheiro',
    'escova de cabelo',
    'lenço de papel',
    'perfume',
    'alcool gel'
]

for (let index = 0; index < bolsavanessa.length; index++) {
    console.log(`${index+1} : ${bolsavanessa[index]}`);
    if (bolsavanessa[index] == 'dinheiro') break;
}

for (let index = 0; index < bolsavanessa.length; index++) {
    if (bolsavanessa[index] == 'dinheiro') continue;
    console.log(`${index+1} : ${bolsavanessa[index]}`);
}

// for in

const familia = [
    {
        nome: 'Gabriel',
        papel: 'pai'
    },
    {
        nome: 'Vanessa',
        papel: 'mae'
    },
    {
        nome: 'Felipe',
        papel: 'filho'
    },
]

for (let pessoa in familia) {
    console.log(familia[pessoa]);
    
}

// while

let index =  0;
while (index < bolsavanessa.length) {
    console.log(`${index+1} : ${bolsavanessa[index]}`);
    index++
}

// forEach

bolsavanessa.forEach((value, index) => {
    console.log(`${index + 1} : ${value}`)
})

// map

const temperaturaCelsius = [0, 22, 31, 40, 45, 12, 3]
const toFahrenheit = value => ((value * 9) / 5) + 32
const temperaturaFahrenheit = temperaturaCelsius.map(toFahrenheit)
console.log(temperaturaCelsius);
console.log(temperaturaFahrenheit);

// filter

const numeros = [12, 24, 56, 34, 2, 567, 2, 6, 88, 3, 6, 7, 754]
const par = n => n % 2 === 0
const numeroPar = numeros.filter(par)

console.log(`Array com numeros pares: ${numeroPar}`);

const videoResolutions = [
    ['QVGA', '320x240', '4:3'],
    ['VGA', '640x480', '16:9'],
    ['VGA', '720x480', '4:3'],
    ['SVGA', '800x600', '16:9'],
]

const resolution16_9 = videoResolutions.filter((value) => {
    if (value[2] == '16:9') return value
})

console.log(resolution16_9)

// reduce

const videos = [
    {
        id: 'hegwEGW',
        title: 'gfhgerwh',
        view: 37200,
        like: 1000
    },
    {
        id: 'htjrheW',
        title: 'gfjwth',
        view: 22510,
        like: 1000
    },
    {
        id: 'rwtwgGW',
        title: 'qrmnbsrwh',
        view: 34732,
        like: 1000
    },
]

const totalView = videos.reduce((sum, video) => {
    sum.view += video.view
    sum.like += video.like
    return sum
}, {views:0,likes:0})

console.log(totalView)

// every

const idadeFamilia = [
    {
        nome: 'Vanessa',
        idade: 39
    },
    {
        nome: 'Gabriel',
        idade: 39
    },
    {
        nome: 'Bielzinho',
        idade: 11
    }, 
    {
        nome: 'Felipe',
        idade: 3
    }
]

const ehAdulto = valor => valor.idade >= 18
const somenteAdulto = idadeFamilia.every(ehAdulto)
console.log(somenteAdulto);

// some

const temAdulto = idadeFamilia.some(ehAdulto)
console.log(temAdulto);

// For Of

for (item of bolsavanessa) {
    console.log(item)
}

for (item of videos) {
    console.log(item.title)
}

const canal = "Codigo Fonte TV"

for (letra of canal) {
    console.log(letra)
}

// Find

const sobremesas = [
    {
        nome: 'pudim',
        diet: false,
    },
    {
        nome: 'gelatina',
        diet: true,
    },
    {
        nome: 'bolo de chocolate',
        diet: true,
    },
    {
        nome: 'pavê',
        diet: false
    },
]

const idDiet = item => item.diet
const sobremesa = sobremesas.find(idDiet)
console.log(sobremesa)

// Do while

let index1 = 0
do {
    console.log(`${index1 + 1} ${bolsavanessa[index1]}`)
    index1++
} while (index1 < bolsavanessa.length)