/*

Depuração no navegador

Antes de escrever um código mais complexo, vamos falar sobre depuração.

Depuração é o processo de localizar e corrigir erros em um script. Todos os navegadores modernos e a maioria dos outros ambientes suportam ferramentas de depuração – uma interface de usuário especial nas ferramentas de desenvolvedor que facilita muito a depuração. Também permite rastrear o código passo a passo para ver exatamente o que está acontecendo.

Estaremos usando o Chrome aqui, porque ele tem recursos suficientes, a maioria dos outros navegadores tem um processo semelhante.

O painel “Fontes”

Sua versão do Chrome pode parecer um pouco diferente, mas ainda deve ser óbvio o que está lá.

. Abra a página de exemplo no Chrome.
. Ative as ferramentas do desenvolvedor com F12(Mac: ).Cmd+Opt+I
. Selecione o Sources painel.

Console
Se pressionarmos Esc, um console será aberto abaixo. Podemos digitar comandos lá e pressionar Enterpara executar.

Depois que uma instrução é executada, seu resultado é mostrado abaixo.

Por exemplo, aqui 1+2resulta em 3, enquanto a chamada de função hello("debugger")não retorna nada, então o resultado é undefined:

Pontos de interrupção
Vamos examinar o que está acontecendo no código da página de exemplo . Em hello.js, clique no número da linha 4. Sim, bem no 4dígito, não no código.

Parabéns! Você definiu um ponto de interrupção. Por favor, clique também no número da linha 8.

Deve ficar assim (azul é onde você deve clicar):

Um ponto de interrupção é um ponto de código em que o depurador pausará automaticamente a execução do JavaScript.

Enquanto o código está pausado, podemos examinar as variáveis ​​atuais, executar comandos no console etc. Em outras palavras, podemos depurá-lo.

Sempre podemos encontrar uma lista de pontos de interrupção no painel direito. Isso é útil quando temos muitos pontos de interrupção em vários arquivos. Ela nos permite:

. Pule rapidamente para o ponto de interrupção no código (clicando nele no painel direito).
. Desative temporariamente o ponto de interrupção desmarcando-o.
. Remova o ponto de interrupção clicando com o botão direito do mouse e selecionando Remover.
…E assim por diante.

Pontos de interrupção condicionais
Clique com o botão direito do mouse no número da linha para criar um ponto de interrupção condicional . Ele só é acionado quando a expressão fornecida, que você deve fornecer ao criá-la, for verdadeira.

Isso é útil quando precisamos parar apenas para um determinado valor de variável ou para determinados parâmetros de função.

O comando “depurador”
Também podemos pausar o código usando o debuggercomando nele, assim:

*/

function hello(name) {
    let phrase = `Hello, ${name}!`;

    debugger; // <-- the debugger stops here

    say(phrase);
}

/*

Tal comando funciona apenas quando as ferramentas de desenvolvimento estão abertas, caso contrário o navegador o ignora.

Faça uma pausa e olhe ao redor
Em nosso exemplo, hello()é chamado durante o carregamento da página, portanto, a maneira mais fácil de ativar o depurador (depois de definir os pontos de interrupção) é recarregar a página. Então vamos pressionar F5(Windows, Linux) ou (Mac).Cmd+R

À medida que o ponto de interrupção é definido, a execução é pausada na 4ª linha:

Abra os menus suspensos informativos à direita (marcados com setas). Eles permitem que você examine o estado atual do código:

1. Watch– mostra os valores atuais para quaisquer expressões.

Você pode clicar no sinal de mais +e inserir uma expressão. O depurador mostrará seu valor, recalculando-o automaticamente no processo de execução.

2. Call Stack– mostra a cadeia de chamadas aninhadas.

No momento atual o depurador está dentro da hello()chamada, chamado por um script in index.html(sem função lá, então é chamado de “anônimo”).

Se você clicar em um item da pilha (por exemplo, “anônimo”), o depurador pula para o código correspondente e todas as suas variáveis ​​também podem ser examinadas.

3. Scope– variáveis ​​atuais.

Localmostra variáveis ​​de função local. Você também pode ver seus valores destacados logo acima da fonte.

Globaltem variáveis ​​globais (fora de qualquer função).

Há também uma thispalavra-chave que ainda não estudamos, mas faremos isso em breve.

Rastreando a execução
Agora é hora de rastrear o script.

Existem botões para isso na parte superior do painel direito. Vamos envolvê-los.

– “Resume”: continua a execução, hotkey F8.
Reinicia a execução. Se não houver pontos de interrupção adicionais, a execução continuará e o depurador perderá o controle.

Aqui está o que podemos ver depois de um clique nele:

A execução foi retomada, atingiu outro ponto de interrupção say()e parou lá. Dê uma olhada no “Call Stack” à direita. Ele aumentou em mais uma chamada. Estamos dentro say()agora.

– “Passo”: execute o próximo comando, tecla de atalho F9.
Execute a próxima instrução. Se clicarmos nele agora, alertserá mostrado.

Clicar nele repetidamente passará por todas as instruções de script uma a uma.

– “Passar por cima”: execute o próximo comando, mas não entre em uma função , tecla de atalho F10.
Semelhante ao comando “Step” anterior, mas se comporta de maneira diferente se a próxima instrução for uma chamada de função (não uma função interna, como alert, mas uma função nossa).

Se os compararmos, o comando “Step” entra em uma chamada de função aninhada e pausa a execução em sua primeira linha, enquanto “Step over” executa a chamada de função aninhada de forma invisível para nós, pulando as funções internas.

A execução é então pausada imediatamente após essa chamada de função.

Isso é bom se não estivermos interessados ​​em ver o que acontece dentro da chamada da função.

– “Entrar”, tecla de atalho F11.
Isso é semelhante ao “Step”, mas se comporta de maneira diferente no caso de chamadas de função assíncronas. Se você está apenas começando a aprender JavaScript, pode ignorar a diferença, pois ainda não temos chamadas assíncronas.

Para o futuro, apenas observe que o comando “Step” ignora ações assíncronas, como setTimeout(chamada de função agendada), que são executadas posteriormente. O “Step into” entra em seu código, esperando por eles, se necessário. Consulte o manual do DevTools para obter mais detalhes.

– “Step out”: continua a execução até o final da função atual, hotkey .Shift+F11
Continue a execução e pare na última linha da função atual. Isso é útil quando inserimos acidentalmente uma chamada aninhada usando, mas não nos interessa, e queremos continuar até o seu fim o mais rápido possível.

– habilitar/desabilitar todos os pontos de interrupção.
Esse botão não move a execução. Apenas uma massa liga / desliga para pontos de interrupção.

– habilitar/desabilitar a pausa automática em caso de erro.
Quando ativado, se as ferramentas do desenvolvedor estiverem abertas, um erro durante a execução do script o pausará automaticamente. Então podemos analisar variáveis ​​no depurador para ver o que deu errado. Então, se nosso script morrer com um erro, podemos abrir o depurador, habilitar esta opção e recarregar a página para ver onde ele morre e qual é o contexto naquele momento.

Continuar aqui
Clique com o botão direito do mouse em uma linha de código para abrir o menu de contexto com uma ótima opção chamada “Continuar até aqui”.

Isso é útil quando queremos avançar várias etapas para a linha, mas estamos com preguiça de definir um ponto de interrupção.

Exploração madeireira
Para enviar algo para o console do nosso código, há console.logfunction.

Por exemplo, isso gera valores de 0to 4para console:

*/

// open console to see
for(let i = 0; i < 5; i++){
    console.log("value,", i);
}

/*

Usuários comuns não veem essa saída, ela está no console. Para vê-lo, abra o painel Console das ferramentas do desenvolvedor ou pressione Escenquanto estiver em outro painel: isso abre o console na parte inferior.

Se tivermos logs suficientes em nosso código, poderemos ver o que está acontecendo nos registros, sem o depurador.

Resumo
Como podemos ver, existem três maneiras principais de pausar um script:

1. Um ponto de interrupção.
2. As debuggerdeclarações.
3. Um erro (se as ferramentas de desenvolvimento estiverem abertas e o botãoestá “ligado”).
Quando pausado, podemos depurar: examinar variáveis ​​e rastrear o código para ver onde a execução está errada.

Há muito mais opções em ferramentas de desenvolvedor do que as abordadas aqui. O manual completo está em https://developers.google.com/web/tools/chrome-devtools .

As informações deste capítulo são suficientes para começar a depurar, mas mais tarde, especialmente se você faz muitas coisas de navegador, vá até lá e veja os recursos mais avançados das ferramentas de desenvolvedor.

Ah, e você também pode clicar em vários locais de ferramentas de desenvolvimento e ver o que está aparecendo. Esse é provavelmente o caminho mais rápido para aprender ferramentas de desenvolvimento. Não se esqueça dos menus de contexto e clique com o botão direito!