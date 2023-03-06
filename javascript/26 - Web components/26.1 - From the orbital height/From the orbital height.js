/*

Da altura orbital
Esta seção descreve um conjunto de padrões modernos para “componentes da web”.

A partir de agora, esses padrões estão em desenvolvimento. Alguns recursos são bem suportados e integrados ao padrão HTML/DOM moderno, enquanto outros ainda estão em fase de rascunho. Você pode tentar exemplos em qualquer navegador, o Google Chrome é provavelmente o mais atualizado com esses recursos. Acho que é porque os colegas do Google estão por trás de muitas das especificações relacionadas.

O que há de comum entre…
A ideia do componente como um todo não é novidade. É usado em muitos frameworks e em outros lugares.

Antes de passarmos aos detalhes da implementação, dê uma olhada nesta grande conquista da humanidade:


Essa é a Estação Espacial Internacional (ISS).

E é assim que é feito por dentro (aproximadamente):


A Estação Espacial Internacional:

Consiste em muitos componentes.
Cada componente, por sua vez, possui muitos detalhes menores em seu interior.
Os componentes são muito complexos, muito mais complicados do que a maioria dos sites.
Os componentes são desenvolvidos internacionalmente, por equipes de diferentes países, falando diferentes idiomas.
…E essa coisa voa, mantém os humanos vivos no espaço!

Como esses dispositivos complexos são criados?

Quais princípios poderíamos tomar emprestado para tornar nosso desenvolvimento confiável e escalável no mesmo nível? Ou, pelo menos, perto disso?

Arquitetura de componentes
A regra bem conhecida para o desenvolvimento de software complexo é: não faça software complexo.

Se algo se tornar complexo – divida-o em partes mais simples e conecte-o da maneira mais óbvia.

Um bom arquiteto é aquele que consegue simplificar o complexo.

Podemos dividir a interface do usuário em componentes visuais: cada um deles tem um lugar próprio na página, pode “executar” uma tarefa bem descrita e é separado dos demais.

Vamos dar uma olhada em um site, por exemplo, o Twitter.

Ele se divide naturalmente em componentes:


Navegação superior.
Informação de usuário.
Siga as sugestões.
Enviar formulário.
(e também 6, 7) – mensagens.
Os componentes podem ter subcomponentes, por exemplo, as mensagens podem ser partes de um componente de “lista de mensagens” de nível superior. A própria imagem clicável do usuário pode ser um componente e assim por diante.

Como decidimos o que é um componente? Isso vem da intuição, da experiência e do bom senso. Geralmente é uma entidade visual separada que podemos descrever em termos do que faz e como interage com a página. No caso acima, a página possui blocos, cada um deles faz sua função, é lógico fazer esses componentes.

Um componente possui:

Sua própria classe JavaScript.
estrutura DOM, gerenciada apenas por sua classe, código externo não a acessa (princípio do “encapsulamento”).
Estilos CSS, aplicados ao componente.
API: eventos, métodos de classe etc, para interagir com outros componentes.
Mais uma vez, toda essa coisa de “componente” não é nada especial.

Existem muitos frameworks e metodologias de desenvolvimento para construí-los, cada um com seus próprios sinos e assobios. Normalmente, classes e convenções CSS especiais são usadas para fornecer “sensação de componente” – escopo CSS e encapsulamento DOM.

Os “componentes da Web” fornecem recursos de navegador integrados para isso, portanto, não precisamos mais emulá-los.

Elementos personalizados – para definir elementos HTML personalizados.
Shadow DOM – para criar um DOM interno para o componente, escondido dos demais.
Escopo CSS – para declarar estilos que se aplicam apenas dentro do Shadow DOM do componente.
Redirecionamento de eventos e outras coisas menores para tornar os componentes personalizados mais adequados ao desenvolvimento.
No próximo capítulo, entraremos em detalhes sobre “Elementos personalizados” – o recurso fundamental e bem suportado dos componentes da Web, bom por conta própria.

*/