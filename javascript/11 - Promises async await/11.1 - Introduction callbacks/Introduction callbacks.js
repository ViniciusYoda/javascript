/*

Introdução: retornos de chamada
Usamos métodos de navegador em exemplos aqui
Para demonstrar o uso de retornos de chamada, promessas e outros conceitos abstratos, usaremos alguns métodos de navegador: especificamente, carregar scripts e realizar manipulações simples de documentos.

Se você não estiver familiarizado com esses métodos e seu uso nos exemplos for confuso, talvez queira ler alguns capítulos da próxima parte do tutorial.

Embora, vamos tentar deixar as coisas claras de qualquer maneira. Não haverá nada realmente complexo em termos de navegador.

Muitas funções são fornecidas por ambientes de host JavaScript que permitem agendar ações assíncronas . Em outras palavras, ações que iniciamos agora, mas terminam depois.

Por exemplo, uma dessas funções é a setTimeoutfunção.

Existem outros exemplos do mundo real de ações assíncronas, por exemplo, carregamento de scripts e módulos (abordaremos isso em capítulos posteriores).

Dê uma olhada na função loadScript(src), que carrega um script com o dado src:

function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
Ele insere no documento uma nova tag criada dinamicamente <script src="…">com a extensão src. O navegador começa a carregá-lo automaticamente e executa quando concluído.

Podemos usar essa função assim:

// load and execute the script at the given path
loadScript('/my/script.js');
O script é executado de forma “assíncrona”, pois começa a carregar agora, mas roda mais tarde, quando a função já tiver terminado.

Se houver algum código abaixo loadScript(…), ele não espera até que o carregamento do script termine.

loadScript('/my/script.js');
// the code below loadScript
// doesn't wait for the script loading to finish
// ...
Digamos que precisamos usar o novo script assim que ele carregar. Ele declara novas funções e queremos executá-las.

Mas se fizermos isso imediatamente após a loadScript(…)chamada, não funcionaria:

loadScript('/my/script.js'); // the script has "function newFunction() {…}"

newFunction(); // no such function!
Naturalmente, o navegador provavelmente não teve tempo de carregar o script. A partir de agora, a loadScriptfunção não fornece uma maneira de rastrear a conclusão do carregamento. O script é carregado e eventualmente executado, só isso. Mas gostaríamos de saber quando isso acontecer, para usar novas funções e variáveis ​​desse script.

Vamos adicionar uma callbackfunção como segundo argumento loadScriptque deve ser executada quando o script for carregado:

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}

O onloadevento está descrito no artigo Resource loading: onload e onerror , ele basicamente executa uma função após o script ser carregado e executado.

Agora, se quisermos chamar novas funções do script, devemos escrever isso no callback:

loadScript('/my/script.js', function() {
  // the callback runs after the script is loaded
  newFunction(); // so now it works
  ...
});
Essa é a ideia: o segundo argumento é uma função (geralmente anônima) que é executada quando a ação é concluída.

Aqui está um exemplo executável com um script real:

*/

function loadScript(src, callback) {
   let script = document.createElement('script');
   script.src = src;
   script.onload = () => callback(script);
   document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // _ is a function declared in the loaded script
});

/*

Isso é chamado de estilo “baseado em retorno de chamada” de programação assíncrona. Uma função que faz algo de forma assíncrona deve fornecer um callbackargumento onde colocamos a função para executar após sua conclusão.

Aqui fizemos isso em loadScript, mas é claro que é uma abordagem geral.

Retorno de chamada em retorno de chamada
Como podemos carregar dois scripts sequencialmente: o primeiro e o segundo depois dele?

A solução natural seria colocar a segunda loadScriptchamada dentro do callback, assim:

loadScript('/my/script.js', function(script) {

  alert(`Cool, the ${script.src} is loaded, let's load one more`);

  loadScript('/my/script2.js', function(script) {
    alert(`Cool, the second script is loaded`);
  });

});
Após a conclusão do externo loadScript, o retorno de chamada inicia o interno.

E se quisermos mais um script…?

loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

    loadScript('/my/script3.js', function(script) {
      // ...continue after all scripts are loaded
    });

  });

});
Portanto, toda nova ação está dentro de um callback. Isso é bom para poucas ações, mas não para muitas, então veremos outras variantes em breve.

Tratamento de erros
Nos exemplos acima não consideramos erros. E se o carregamento do script falhar? Nosso retorno de chamada deve ser capaz de reagir a isso.

Aqui está uma versão melhorada loadScriptque rastreia erros de carregamento:

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
Ele exige callback(null, script)carregamento bem-sucedido e callback(error)caso contrário.

O uso:

loadScript('/my/script.js', function(error, script) {
  if (error) {
    // handle error
  } else {
    // script loaded successfully
  }
});
Mais uma vez, a receita que usamos loadScripté bastante comum. É chamado de estilo “retorno de chamada com erro primeiro”.

A convenção é:

1. O primeiro argumento do callbacké reservado para um erro se ocorrer. Então callback(err)é chamado.
2. O segundo argumento (e os próximos, se necessário) são para o resultado bem-sucedido. Então callback(null, result1, result2…)é chamado.

Portanto, a callbackfunção única é usada para relatar erros e retornar resultados.

Pirâmide da Perdição
À primeira vista, parece uma abordagem viável para codificação assíncrona. E de fato é. Para uma ou talvez duas chamadas aninhadas, parece bom.

Mas para várias ações assíncronas que seguem uma após a outra, teremos um código como este:

loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...continue after all scripts are loaded (*)
          }
        });

      }
    });
  }
});

No código acima:

1. Carregamos 1.js, então se não houver erro…
2. Carregamos 2.js, então se não houver erro…
3. Nós carregamos 3.js, então se não houver erro - faça outra coisa (*).

À medida que as chamadas se tornam mais aninhadas, o código se torna mais profundo e cada vez mais difícil de gerenciar, especialmente se tivermos um código real em vez de ...incluir mais loops, instruções condicionais e assim por diante.

Isso às vezes é chamado de “inferno de callback” ou “pirâmide da desgraça”.


A “pirâmide” de chamadas aninhadas cresce para a direita a cada ação assíncrona. Logo fica fora de controle.

Portanto, esta forma de codificação não é muito boa.

Podemos tentar aliviar o problema tornando cada ação uma função autônoma, assim:

loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}

Ver? Ele faz a mesma coisa e não há aninhamento profundo agora porque tornamos cada ação uma função separada de nível superior.

Funciona, mas o código parece uma planilha rasgada. É difícil de ler e você provavelmente notou que é preciso pular os olhos entre as peças durante a leitura. Isso é inconveniente, especialmente se o leitor não estiver familiarizado com o código e não souber para onde olhar.

Além disso, as funções nomeadas step*são todas de uso único, criadas apenas para evitar a “pirâmide da destruição”. Ninguém vai reutilizá-los fora da cadeia de ação. Portanto, há um pouco de confusão de namespace aqui.

Gostaríamos de ter algo melhor.

Felizmente, existem outras maneiras de evitar essas pirâmides. Uma das melhores formas é usar “promessas”, descritas no próximo capítulo.

*/