/*

Iteráveis
Objetos iteráveis ​​são uma generalização de arrays. Esse é um conceito que nos permite tornar qualquer objeto utilizável em um for..ofloop.

Claro, Arrays são iteráveis. Mas existem muitos outros objetos internos, que também são iteráveis. Por exemplo, strings também são iteráveis.

Se um objeto não é tecnicamente um array, mas representa uma coleção (lista, conjunto) de algo, então for..ofé uma ótima sintaxe para fazer um loop sobre ele, então vamos ver como fazê-lo funcionar.

Símbolo.iterador
Podemos facilmente compreender o conceito de iteráveis ​​fazendo um dos nossos.

Por exemplo, temos um objeto que não é um array, mas parece adequado para for..of.

Como um rangeobjeto que representa um intervalo de números:

*/

let range = {
    from: 1,
    to: 5
};

// We want the for..of to work:
// for (let num of range) ... num=1,2,3,4,5

/*

Para tornar o rangeobjeto iterável (e assim deixar for..offuncionar), precisamos adicionar um método ao objeto nomeado Symbol.iterator(um símbolo embutido especial apenas para isso).

1. Quando for..ofinicia, ele chama esse método uma vez (ou erros se não forem encontrados). O método deve retornar um iterador – um objeto com o método next.
2. Em diante , for..offunciona apenas com esse objeto retornado .
3. Quando for..ofquer o próximo valor, ele chama next()esse objeto.
4. O resultado de next()deve ter a forma {done: Boolean, value: any}, onde done=truesignifica que o loop foi finalizado, caso contrário valueé o próximo valor.

Aqui está a implementação completa para rangecom observações

*/

let range = {
    from: 1,
    to: 5
};

// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {

    // ...it returns the iterator object
    // 2. Onward, for..of works only with the iterator object below, asking it for next values
    return {
        current: this.from,
        last: this.to,

        // 3. next() is called on each iteration by the for..of loop
        next() {
            // 4. it should return the value as an object {done:.., value :...} 
            if (this.current <= this.last) {
                return { done: false, value: this.current++};
            } else {
                return { done: true };
            }
        }
    }
};

// now it works!
for (let num of range) {
    alert(num);  // 1, then 2, 3, 4, 5
}

/*

Observe o recurso principal dos iteráveis: separação de interesses.

O rangepróprio não tem o next()método.
Em vez disso, outro objeto, o chamado “iterador”, é criado pela chamada para range[Symbol.iterator]()e next()gera valores para a iteração.
Portanto, o objeto iterador é separado do objeto sobre o qual ele itera.

Tecnicamente, podemos mesclá-los e usar rangea si mesmo como o iterador para tornar o código mais simples.

Assim:

*/

let range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ };
        } else {
            return { done: true };
        }
    }
};

for (let num of range) {
    alert(num); // 1, then 2, 3, 4, 5
}

/*

Agora range[Symbol.iterator]()retorna o rangepróprio objeto: ele tem o next()método necessário e lembra o progresso da iteração atual em this.current. Mais curta? Sim. E às vezes tudo bem também.

A desvantagem é que agora é impossível ter dois for..ofloops rodando sobre o objeto simultaneamente: eles compartilharão o estado de iteração, porque há apenas um iterador – o próprio objeto. Mas dois for-ofs paralelos são uma coisa rara, mesmo em cenários assíncronos.

Iteradores infinitos
Iteradores infinitos também são possíveis. Por exemplo, o rangetorna-se infinito para range.to = Infinity. Ou podemos fazer um objeto iterável que gera uma sequência infinita de números pseudoaleatórios. Também pode ser útil.

Não há limitações em next, ele pode retornar mais e mais valores, isso é normal.

Claro, o for..ofloop sobre tal iterável seria interminável. Mas sempre podemos pará-lo usando break.

A string é iterável
Arrays e strings são os iteráveis ​​internos mais usados.

Para uma string, faz um for..ofloop sobre seus caracteres:

*/

for (let char of "test") {
    // triggers 4 times: once for each character
    alert( char ); // t, then e, then, s, then t
}

// E funciona corretamente com pares substitutos!

let str = '𝒳😂';
for (let char of str){
    alert(char); // 𝒳, and then 😂
}