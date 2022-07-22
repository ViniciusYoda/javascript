/*

Comentários
Como sabemos do capítulo Estrutura do código , os comentários podem ser de linha única: começando com //e de várias linhas: /* ... */

/*
Normalmente os usamos para descrever como e por que o código funciona.

À primeira vista, comentar pode ser óbvio, mas os novatos em programação costumam usá-los de forma errada.

Comentários ruins
Novatos tendem a usar comentários para explicar “o que está acontecendo no código”. Assim:

// This code will do this thing (...) and that thing (...)
// ...and who knows what else...
very;
complex;
code;

Mas em um bom código, a quantidade desses comentários “explicativos” deve ser mínima. Sério, o código deve ser fácil de entender sem eles.

Existe uma ótima regra sobre isso: “se o código é tão obscuro que requer um comentário, então talvez devesse ser reescrito”.

Receita: fatorar funções
Às vezes, é benéfico substituir uma parte do código por uma função, como aqui:

*/

function showPrimes(n) {
    nextPrime:
    for (let i = 2; i < n; i++) {
        
        // check if i is a prime number
        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime;
        }

        console.log(i);
    }
}

// A melhor variante, com uma função fatorada isPrime:

function showPrimes(n) {

    for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;

        alert(i)
    }
}

function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }

    return true;
}

/*

Agora podemos entender o código facilmente. A própria função se torna o comentário. Esse código é chamado de autodescritivo .

Receita: criar funções
E se tivermos uma longa “folha de código” como esta:

*/

// here we add whiskey
for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    smell(drop);
    add(drop, glass);
}

// here we add juice
for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    examine(tomato);
    let juice = press(tomato);
    add(juice, glass);
}

// ...

// Então, pode ser uma variante melhor refatorá-lo em funções como:

addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
    for(let i = 0; i < 10; i++) {
        let drop = getWhiskey();
        // ...
    }
}

function addJuice(container) {
    for(let t = 0; t < 3; t++) {
        let tomato = getTomato();
    }
}

/*

Mais uma vez, as próprias funções dizem o que está acontecendo. Não há o que comentar. E também a estrutura do código é melhor quando dividida. Está claro o que cada função faz, o que é necessário e o que retorna.

Na realidade, não podemos evitar totalmente os comentários “explicativos”. Existem algoritmos complexos. E há “ajustes” inteligentes para fins de otimização. Mas geralmente devemos tentar manter o código simples e autodescritivo.

Bons comentários
Então, comentários explicativos costumam ser ruins. Quais comentários são bons?

Descreva a arquitetura
Fornecer uma visão geral de alto nível dos componentes, como eles interagem, qual é o fluxo de controle em várias situações... Resumindo – a visão geral do código. Existe uma linguagem especial UML para construir diagramas de arquitetura de alto nível explicando o código. Com certeza vale a pena estudar.
Parâmetros e uso da função do documento
Existe uma sintaxe especial JSDoc para documentar uma função: uso, parâmetros, valor retornado.
Por exemplo:

*/

/**
 *  Returns x raised to the n-th power.
 * 
 * @param {number} x The number to raise
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function(x, n) {
    ...
}

/*

Tais comentários nos permitem entender o propósito da função e usá-la da maneira correta sem olhar em seu código.

A propósito, muitos editores como o WebStorm também podem entendê-los e usá-los para fornecer autocompletar e algumas verificações automáticas de código.

Além disso, existem ferramentas como JSDoc 3 que podem gerar documentação HTML a partir dos comentários. Você pode ler mais informações sobre JSDoc em https://jsdoc.app .

Por que a tarefa é resolvida dessa maneira?
O que está escrito é importante. Mas o que não está escrito pode ser ainda mais importante para entender o que está acontecendo. Por que a tarefa é resolvida exatamente dessa maneira? O código não responde.

Se existem muitas maneiras de resolver a tarefa, por que esta? Especialmente quando não é o mais óbvio.

Sem tais comentários, a seguinte situação é possível:

Você (ou seu colega) abre o código escrito há algum tempo e vê que está “sub-ótimo”.
Você pensa: “Quão estúpido eu era então, e quanto mais inteligente sou agora”, e reescreve usando a variante “mais óbvia e correta”.
…A vontade de reescrever era boa. Mas no processo você vê que a solução “mais óbvia” está realmente faltando. Você ainda se lembra vagamente do motivo, porque já tentou há muito tempo. Você reverte para a variante correta, mas o tempo foi perdido.
Comentários que explicam a solução são muito importantes. Eles ajudam a continuar o desenvolvimento da maneira certa.

Alguma característica sutil do código? Onde são usados?
Se o código tiver algo sutil e contra-intuitivo, definitivamente vale a pena comentar.

Resumo
Um sinal importante de um bom desenvolvedor são os comentários: sua presença e até sua ausência.

Bons comentários nos permitem manter o código bem, voltar a ele após um atraso e usá-lo de forma mais eficaz.

Comente isto:

Arquitetura geral, visão de alto nível.
Uso da função.
Soluções importantes, especialmente quando não são imediatamente óbvias.
Evite comentários:

Que dizem “como o código funciona” e “o que ele faz”.
Coloque-os apenas se for impossível tornar o código tão simples e autodescritivo que não os exija.
Os comentários também são usados ​​para ferramentas de documentação automática como JSDoc3: eles os lêem e geram documentos HTML (ou documentos em outro formato).

*/