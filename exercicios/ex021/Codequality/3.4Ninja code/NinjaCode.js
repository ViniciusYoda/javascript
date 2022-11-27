/*

Código ninja

Aprender sem pensar é trabalho perdido; pensar sem aprender é perigoso.

Confúcio (Analectos)

Os programadores ninjas do passado usavam esses truques para aguçar a mente dos mantenedores de código.

Os gurus de revisão de código os procuram em tarefas de teste.

Desenvolvedores iniciantes às vezes os usam ainda melhor do que ninjas programadores.

Leia-os com atenção e descubra quem você é – um ninja, um novato ou talvez um revisor de código?

Ironia detectada
Muitos tentam seguir caminhos ninja. Poucos conseguem.

Brevidade é a alma da sagacidade
Faça o código o mais curto possível. Mostre o quão inteligente você é.

Deixe os recursos de linguagem sutis guiá-lo.

Por exemplo, dê uma olhada neste operador ternário '?':

*/

// taken from a well-known javascript library
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

/*

Legal certo? Se você escrever assim, um desenvolvedor que se deparar com essa linha e tentar entender qual é o valor de ise divertirá. Então venha até você, buscando uma resposta.

Diga-lhes que mais curto é sempre melhor. Iniciá-los nos caminhos do ninja.

Variáveis ​​de uma letra
O Dao se esconde no silêncio. Apenas o Dao está bem iniciado e bem concluído.

Laozi (Tao Te Ching)
Outra maneira de codificar mais curto é usar nomes de variáveis ​​de uma única letra em todos os lugares. Como a, bou c.

Uma variável curta desaparece no código como um verdadeiro ninja na floresta. Ninguém poderá encontrá-lo usando a “pesquisa” do editor. E mesmo que alguém o faça, não será capaz de “decifrar” o que o nome aou bsignifica.

…Mas há uma exceção. Um ninja de verdade nunca usará icomo contador em um "for"loop. Em qualquer lugar, mas não aqui. Olhe ao redor, há muitas outras letras exóticas. Por exemplo, xou y.

Uma variável exótica como contador de loop é especialmente legal se o corpo do loop levar de 1 a 2 páginas (torne-o mais longo, se puder). Então, se alguém olhar profundamente dentro do loop, eles não serão capazes de descobrir rapidamente que a variável nomeada x é o contador de loop.

Variáveis ​​de uma letra
O Dao se esconde no silêncio. Apenas o Dao está bem iniciado e bem concluído.

Laozi (Tao Te Ching)
Outra maneira de codificar mais curto é usar nomes de variáveis ​​de uma única letra em todos os lugares. Como a, bou c.

Uma variável curta desaparece no código como um verdadeiro ninja na floresta. Ninguém poderá encontrá-lo usando a “pesquisa” do editor. E mesmo que alguém o faça, não será capaz de “decifrar” o que o nome aou bsignifica.

…Mas há uma exceção. Um ninja de verdade nunca usará icomo contador em um "for"loop. Em qualquer lugar, mas não aqui. Olhe ao redor, há muitas outras letras exóticas. Por exemplo, xou y.

Uma variável exótica como contador de loop é especialmente legal se o corpo do loop levar de 1 a 2 páginas (torne-o mais longo, se puder). Então, se alguém olhar profundamente dentro do loop, eles não serão capazes de descobrir rapidamente que a variável nomeada xé o contador de loop.

Voe alto. Seja abstrato.
A grande praça não tem cantos
O grande vaso é o último completo,
A grande nota é som rarefeito,
A grande imagem não tem forma.

Laozi (Tao Te Ching)
Ao escolher um nome, tente usar a palavra mais abstrata. Como obj, data, value, item, eleme assim por diante.

O nome ideal para uma variável é data. Use-o em todos os lugares que puder. De fato, toda variável contém data , certo?

…Mas o que fazer se datajá estiver tomado? Experimente value, também é universal. Afinal, uma variável eventualmente recebe um valor .

Nomeie uma variável pelo seu tipo: str, num…

Dê-lhes uma tentativa. Um jovem iniciado pode se perguntar – esses nomes são realmente úteis para um ninja? De fato, eles são!

Claro, o nome da variável ainda significa alguma coisa. Ele diz o que está dentro da variável: uma string, um número ou outra coisa. Mas quando alguém de fora tentar entender o código, ficará surpreso ao ver que, na verdade, não há nenhuma informação! E acabará por não alterar o seu código bem pensado.

O tipo de valor é fácil de descobrir por depuração. Mas qual é o significado da variável? Qual string/número ele armazena?

Não há como descobrir sem uma boa meditação!

…Mas e se não houver mais esses nomes? Basta adicionar um número: data1, item2, elem5…

Teste de atenção
Somente um programador realmente atento deve ser capaz de entender seu código. Mas como verificar isso?

Uma das maneiras – use nomes de variáveis ​​semelhantes, como datee data.

Misture-os onde puder.

Uma leitura rápida de tal código torna-se impossível. E quando há um erro de digitação… Ummm… Estamos presos por muito tempo, tempo para beber chá.

Sinônimos inteligentes
O Tao que pode ser contado não é o Tao eterno. O nome que pode ser nomeado não é o nome eterno.

Laozi (Tao Te Ching)
Usar nomes semelhantes para as mesmas coisas torna a vida mais interessante e mostra sua criatividade ao público.

Por exemplo, considere prefixos de função. Se uma função mostrar uma mensagem na tela – inicie-a com display…, como displayMessage. E então, se outra função mostrar na tela outra coisa, como um nome de usuário, inicie-a com show…(como showName).

Insinuar que há uma diferença sutil entre essas funções, enquanto não há nenhuma.

Faça um pacto com os outros ninjas da equipe: se John começar a “mostrar” funções display...em seu código, então Peter poderia usar render.., e Ann –paint... . Observe como o código se tornou muito mais interessante e diversificado.

…E agora o hat-trick!

Para duas funções com diferenças importantes – use o mesmo prefixo!

Por exemplo, a função printPage(page)usará uma impressora. E a função printText(text)colocará o texto na tela. Deixe um leitor desconhecido pensar bem sobre a função de nome semelhante printMessage: “Onde ele coloca a mensagem? Para uma impressora ou na tela?”. Para torná-lo realmente brilhante, printMessage(message)deve exibi-lo na nova janela!

Reutilizar nomes
Uma vez que o todo é dividido, as partes
precisam de nomes.
Já existem nomes suficientes.
É preciso saber quando parar.

Laozi (Tao Te Ching)
Adicione uma nova variável somente quando for absolutamente necessário.

Em vez disso, reutilize os nomes existentes. Basta escrever novos valores neles.

Em uma função tente usar apenas variáveis ​​passadas como parâmetros.

Isso tornaria muito difícil identificar o que está exatamente na variável agora . E também de onde vem. O objetivo é desenvolver a intuição e a memória de uma pessoa que lê o código. Uma pessoa com intuição fraca teria que analisar o código linha por linha e rastrear as mudanças em cada ramificação do código.

Uma variante avançada da abordagem é substituir secretamente (!) o valor por algo semelhante no meio de um loop ou de uma função.

Por exemplo:

*/

function ninjaFunction(elem) {
    // 20 lines of code working with elem

    elem = clone(elem);

    // 20 more lines, now working with the clone of the elem!
}

/*

Um colega programador que quer trabalhar comelem na segunda metade da função ficará surpreso... Somente durante a depuração, após examinar o código, ele descobrirá que está trabalhando com um clone!

Visto no código regularmente. Eficaz mortal mesmo contra um ninja experiente.

Sublinhados para diversão
Coloque sublinhados _e __antes de nomes de variáveis. Como _nameou __value. Seria ótimo se você soubesse o significado delas. Ou, melhor, adicioná-los apenas por diversão, sem nenhum significado particular. Ou significados diferentes em lugares diferentes.

Você mata dois coelhos com um tiro. Primeiro, o código se torna mais longo e menos legível e, segundo, um colega desenvolvedor pode passar muito tempo tentando descobrir o que os sublinhados significam.

Um ninja inteligente coloca sublinhados em um ponto do código e os evita em outros lugares. Isso torna o código ainda mais frágil e aumenta a probabilidade de erros futuros.

Mostra o teu amor
Que todos vejam como suas entidades são magníficas! Nomes como superElement, megaFramee niceItemdefinitivamente iluminarão um leitor.

De fato, por um lado, algo está escrito: super.., mega.., nice..Mas por outro lado – isso não traz detalhes. Um leitor pode decidir procurar um significado oculto e meditar por uma ou duas horas de seu tempo de trabalho remunerado.

Variáveis ​​externas sobrepostas
Quando na luz, não pode ver nada na escuridão.
Quando na escuridão, pode ver tudo na luz.

Guan Yin Zi
Use os mesmos nomes para variáveis ​​dentro e fora de uma função. Tão simples. Nenhum esforço para inventar novos nomes.

*/

let user = authenticateUser();

function render() {
    let user = anotherValue();
    ...
    ...many lines...
    ...
    ... // <-- a programmer wants to work with user here and...
    ...
}

/*

Um programador que pular dentro do renderprovavelmente não perceberá que existe umuser sombreando o externo.

Então eles vão tentar trabalhar userassumindo que é a variável externa, o resultado de authenticateUser()... A armadilha está pronta! Olá, depurador...

Efeitos colaterais em todos os lugares!
Existem funções que parecem não mudar nada. Como isReady(), checkPermission(), findTags()… Eles são assumidos para realizar cálculos, encontrar e retornar os dados, sem alterar nada fora deles. Em outras palavras, sem “efeitos colaterais”.

Um truque muito bonito é adicionar uma ação “útil” a eles, além da tarefa principal.

Uma expressão de surpresa atordoada no rosto de seu colega quando ele vê uma função chamada is.., check..ou find...alterando algo – definitivamente ampliará seus limites de razão.

Outra maneira de surpreender é retornar um resultado fora do padrão.

Mostre seu pensamento original! Deixe a chamada de checkPermissionretorno não true/false, mas um objeto complexo com os resultados da verificação.

Os desenvolvedores que tentarem escrever if (checkPermission(..)), vão se perguntar por que não funciona. Diga-lhes: “Leia os documentos!”. E dê este artigo.

Funções poderosas!
O grande Tao flui por toda parte,
tanto para a esquerda quanto para a direita.

Laozi (Tao Te Ching)
Não limite a função pelo que está escrito em seu nome. Seja mais amplo.

Por exemplo, uma funçãovalidateEmail(email) pode (além de verificar se o e-mail está correto) mostrar uma mensagem de erro e solicitar a reinserção do e-mail.

Ações adicionais não devem ser óbvias a partir do nome da função. Um verdadeiro codificador ninja também não os tornará óbvios no código.

Unir várias ações em uma protege seu código da reutilização.

Imagine que outro desenvolvedor queira apenas verificar o e-mail e não enviar nenhuma mensagem. Sua função validateEmail(email)que faz as duas coisas não será adequada para eles. Então eles não vão quebrar sua meditação perguntando nada sobre isso.

Resumo
Todos os “conselhos” acima são do código real… Às vezes, escritos por desenvolvedores experientes. Talvez até mais experiente do que você ;)

Siga alguns deles e seu código ficará cheio de surpresas.
Siga muitos deles, e seu código se tornará verdadeiramente seu, ninguém gostaria de alterá-lo.
Siga tudo e seu código se tornará uma lição valiosa para jovens desenvolvedores que buscam esclarecimento.

*/