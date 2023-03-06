/*

Referências anteriores no padrão: \N e \k<nome>
Podemos usar o conteúdo dos grupos de captura (...)não apenas no resultado ou na string de substituição, mas também no próprio padrão.

Referência anterior por número: \N
Um grupo pode ser referenciado no padrão usando \N, onde Né o número do grupo.

Para deixar claro por que isso é útil, vamos considerar uma tarefa.

Precisamos encontrar strings entre aspas: aspas simples '...'ou aspas duplas "..."– ambas as variantes devem corresponder.

Como encontrá-los?

Podemos colocar os dois tipos de aspas entre colchetes: ['"](.*?)['"], mas encontraria strings com aspas mistas, como "...'e '...". Isso levaria a correspondências incorretas quando uma citação aparece dentro de outras, como na string "She's the one!":

let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

// The result is not what we'd like to have
alert( str.match(regexp) ); // "She'
Como podemos ver, o padrão encontrou uma citação de abertura ", então o texto é consumido até a outra citação ', que fecha a correspondência.

Para garantir que o padrão procure a aspa de fechamento exatamente igual à de abertura, podemos envolvê-la em um grupo de captura e fazer referência a ela: (['"])(.*?)\1.

Aqui está o código correto:

let str = `He said: "She's the one!".`;

let regexp = /(['"])(.*?)\1/g;

alert( str.match(regexp) ); // "She's the one!"
Agora funciona! O mecanismo de expressão regular encontra a primeira citação (['"])e memoriza seu conteúdo. Esse é o primeiro grupo de captura.

Mais adiante no padrão \1significa “encontrar o mesmo texto do primeiro grupo”, exatamente a mesma citação em nosso caso.

Semelhante a isso, \2significaria o conteúdo do segundo grupo, \3– o 3º grupo, e assim por diante.

Observe:
Se usarmos ?:no grupo, não poderemos fazer referência a ele. Os grupos excluídos da captura (?:...)não são memorizados pelo motor.

Não estrague: no padrão \1, na substituição:$1
Na string de substituição, usamos um cifrão: $1, enquanto no padrão – uma barra invertida \1.

Referência anterior por nome:\k<name>
Se um regexp tiver muitos parênteses, é conveniente dar nomes a eles.

Para fazer referência a um grupo nomeado, podemos usar \k<name>.

No exemplo abaixo, o grupo com aspas é nomeado ?<quote>, então a referência inversa é \k<quote>:

let str = `He said: "She's the one!".`;

let regexp = /(?<quote>['"])(.*?)\k<quote>/g;

alert( str.match(regexp) ); // "She's the one!"

*/