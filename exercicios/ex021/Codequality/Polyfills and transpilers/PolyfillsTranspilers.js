/*

Polyfills e transpiladores

A linguagem JavaScript evolui constantemente. Novas propostas para a linguagem aparecem regularmente, são analisadas e, se consideradas dignas, são anexadas à lista em https://tc39.github.io/ecma262/ e depois avançam para a especificação .

As equipes por trás dos mecanismos JavaScript têm suas próprias ideias sobre o que implementar primeiro. Eles podem decidir implementar propostas que estão em rascunho e adiar coisas que já estão na especificação, porque são menos interessantes ou apenas mais difíceis de fazer.

Portanto, é bastante comum que um mecanismo implemente apenas parte do padrão.

Uma boa página para ver o estado atual do suporte para recursos de linguagem é https://kangax.github.io/compat-table/es6/ (é grande, temos muito o que estudar ainda).

Como programadores, gostaríamos de usar os recursos mais recentes. Quanto mais coisas boas – melhor!

Por outro lado, como fazer nosso código moderno funcionar em mecanismos mais antigos que ainda não entendem recursos recentes?

Existem duas ferramentas para isso:

1. Transpiladores.
2. Polipreenchimentos.

Aqui, neste capítulo, nosso objetivo é obter a essência de como eles funcionam e seu lugar no desenvolvimento web.

Transpiladores
Um transpilador é um software especial que traduz o código-fonte para outro código-fonte. Ele pode analisar (“ler e entender”) código moderno e reescrevê-lo usando construções de sintaxe mais antigas, para que também funcione em mecanismos desatualizados.

Por exemplo, JavaScript antes do ano 2020 não tinha o “operador de coalescência nulo” ??. Portanto, se um visitante usa um navegador desatualizado, pode não entender o código como height = height ?? 100.

Um transpilador analisaria nosso código e reescreveria height ?? 100em (height !== undefined && height !== null) ? height : 100.

*/

// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;

/*

Agora, o código reescrito é adequado para mecanismos JavaScript mais antigos.

Normalmente, um desenvolvedor executa o transpilador em seu próprio computador e, em seguida, implanta o código transpilado no servidor.

Falando em nomes, Babel é um dos transpiladores mais proeminentes por aí.

Os sistemas modernos de compilação de projetos, como o webpack , fornecem um meio de executar um transpilador automaticamente em cada alteração de código, por isso é muito fácil integrá-lo ao processo de desenvolvimento.

Polyfills
Os novos recursos de linguagem podem incluir não apenas construções e operadores de sintaxe, mas também funções internas.

Por exemplo, Math.trunc(n)é uma função que “corta” a parte decimal de um número, por exemplo, Math.trunc(1.23)retorna 1.

Em alguns mecanismos JavaScript (muito desatualizados), não há Math.trunc, portanto, esse código falhará.

Como estamos falando de novas funções, não de mudanças de sintaxe, não há necessidade de transpilar nada aqui. Só precisamos declarar a função ausente.

Um script que atualiza/adiciona novas funções é chamado de “polyfill”. Ele “preenche” a lacuna e adiciona implementações ausentes.

Para este caso em particular, o polyfill for Math.truncé um script que o implementa, assim:

*/

if (!Math.trunc) { // if no such function
    // implement it
    Math.trunc = function(number) {
        // Math.ceil and Math.floor exist in ancient JavaScript engines
        // they are covered later in the tutorial
        return number < 0 ? Math.ceil(number) : Math.floor(number);
    };
}

/*

JavaScript é uma linguagem altamente dinâmica. Os scripts podem adicionar/modificar qualquer função, mesmo as já incorporadas.

Duas bibliotecas polyfill interessantes são:

core js que suporta muito, permite incluir apenas os recursos necessários.
serviço polyfill.io que fornece um script com polyfills, dependendo dos recursos e do navegador do usuário.

Resumo
Neste capítulo, gostaríamos de motivá-lo a estudar recursos de linguagem modernos e até mesmo “de ponta”, mesmo que ainda não sejam bem suportados por mecanismos JavaScript.

Só não se esqueça de usar um transpilador (se estiver usando sintaxe ou operadores modernos) e polyfills (para adicionar funções que podem estar faltando). Eles vão garantir que o código funcione.

Por exemplo, mais tarde, quando você estiver familiarizado com JavaScript, poderá configurar um sistema de compilação de código baseado em webpack com o plug-in babel-loader .

Bons recursos que mostram o estado atual do suporte para vários recursos:

https://kangax.github.io/compat-table/es6/ – para JavaScript puro.
https://caniuse.com/ – para funções relacionadas ao navegador.
PS O Google Chrome é geralmente o mais atualizado com os recursos de idioma, experimente se uma demonstração do tutorial falhar. A maioria das demonstrações de tutoriais funciona com qualquer navegador moderno.

*/