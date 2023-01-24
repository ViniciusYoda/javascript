/*

Rolagem
O scrollevento permite reagir à rolagem de uma página ou elemento. Há algumas coisas boas que podemos fazer aqui.

Por exemplo:

Mostrar/ocultar controles ou informações adicionais, dependendo de onde o usuário está no documento.
Carregue mais dados quando o usuário rolar para baixo até o final da página.
Aqui está uma pequena função para mostrar a rolagem atual:

window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
});
Em ação:

Rolagem atual = 0px

O scrollevento funciona tanto no windowquanto nos elementos roláveis.

Impedir a rolagem
Como tornamos algo impossível de rolar?

Não podemos impedir a rolagem usando event.preventDefault()o onscrollouvinte, porque ele é acionado depois que a rolagem já aconteceu.

Mas podemos impedir a rolagem event.preventDefault()em um evento que causa a rolagem, por exemplo, keydownevento para pageUpe pageDown.

Se adicionarmos um manipulador de eventos a esses eventos e event.preventDefault()nele, a rolagem não será iniciada.

Existem muitas maneiras de iniciar uma rolagem, por isso é mais confiável usar CSS, overflowpropriedade.

Aqui estão algumas tarefas que você pode resolver ou examinar para ver os aplicativos do onscroll.

*/