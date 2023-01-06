/*

Importações dinâmicas
As instruções de exportação e importação que abordamos nos capítulos anteriores são chamadas de “estáticas”. A sintaxe é muito simples e estrita.

Primeiro, não podemos gerar dinamicamente nenhum parâmetro de import.

O caminho do módulo deve ser uma string primitiva, não pode ser uma chamada de função. Isso não vai funcionar:

import ... from getModuleName(); // Error, only from "string" is allowed
Em segundo lugar, não podemos importar condicionalmente ou em tempo de execução:

if(...) {
  import ...; // Error, not allowed!
}

{
  import ...; // Error, we can't put import in any block
}
Isso porque importpretendo exportfornecer um backbone para a estrutura do código. Isso é bom, já que a estrutura do código pode ser analisada, os módulos podem ser reunidos e agrupados em um arquivo por ferramentas especiais, as exportações não utilizadas podem ser removidas (“tree-shaken”). Isso só é possível porque a estrutura de importação/exportação é simples e fixa.

Mas como podemos importar um módulo dinamicamente, sob demanda?

A expressão import()
A import(module)expressão carrega o módulo e retorna uma promessa que resolve em um objeto de módulo que contém todas as suas exportações. Ele pode ser chamado de qualquer lugar no código.

Podemos usá-lo dinamicamente em qualquer lugar do código, por exemplo:

let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
Ou poderíamos usar let module = await import(modulePath)if dentro de uma função assíncrona.

Por exemplo, se tivermos o seguinte módulo say.js:

// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
…Então a importação dinâmica pode ser assim:

let {hi, bye} = await import('./say.js');

hi();
bye();
Ou, se say.jstiver a exportação padrão:

// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
…Então, para acessá-lo, podemos usar defaulta propriedade do objeto módulo:

let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');

say();
Aqui está o exemplo completo:

*/

// index.html

/*

<!doctype html>
<script>
  async function load() {
    let say = await import('./say.js');
    say.hi(); // Hello!
    say.bye(); // Bye!
    say.default(); // Module loaded (export default)!
  }
</script>
<button onclick="load()">Click me</button>

*/

// dizer.js

export function hi() {
   alert(`Hello`);
}

export function bye() {
   alert(`Bye`);
}

export default function() {
   alert("Module loaded (export default)!");
}

/*

Observe:
As importações dinâmicas funcionam em scripts regulares, não requerem arquivos script type="module".

Observe:
Embora import()pareça uma chamada de função, é uma sintaxe especial que usa parênteses (semelhante a super()).

Portanto, não podemos copiar importpara uma variável ou usar call/applycom ela. Não é uma função.

*/

