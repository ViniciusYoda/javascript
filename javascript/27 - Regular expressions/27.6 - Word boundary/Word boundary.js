/*

Limite da palavra: \b
Um limite de palavra \bé um teste, assim como ^e $.

Quando o mecanismo regexp (módulo de programa que implementa a busca por regexps) encontra \b, ele verifica se a posição na string é um limite de palavra.

Existem três posições diferentes que se qualificam como limites de palavras:

No início da string, se o primeiro caractere da string for um caractere de palavra \w.
Entre dois caracteres na string, onde um é um caractere de palavra \we o outro não.
No final da string, se o último caractere da string for um caractere de palavra \w.
Por exemplo, regexp \bJava\bserá encontrado em Hello, Java!, onde Javaé uma palavra autônoma, mas não em Hello, JavaScript!.

alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
Na string, Hello, Java!as seguintes posições correspondem a \b:


Portanto, ele corresponde ao padrão \bHello\b, porque:

No início da string corresponde ao primeiro teste \b.
Em seguida, corresponde à palavra Hello.
Em seguida, o teste \bcorresponde novamente, pois estamos entre oe uma vírgula.
Portanto, o padrão \bHello\bcorresponderia, mas não \bHell\b(porque não há limite de palavra após l) e não Java!\b(porque o sinal de exclamação não é um caractere de palavra \w, portanto, não há limite de palavra após ele).

alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
Podemos usar \bnão apenas com palavras, mas também com dígitos.

Por exemplo, o padrão \b\d\d\bprocura números independentes de 2 dígitos. Em outras palavras, ele procura números de 2 dígitos cercados por caracteres diferentes de \w, como espaços ou pontuação (ou início/fim do texto).

alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
O limite da palavra \bnão funciona para alfabetos não latinos
O teste de limite de palavras \bverifica se deve haver \wde um lado da posição e "não \w" – do outro lado.

Mas \wsignifica uma letra latina a-z(ou um dígito ou sublinhado), então o teste não funciona para outros caracteres, por exemplo, letras cirílicas ou hieróglifos.

*/