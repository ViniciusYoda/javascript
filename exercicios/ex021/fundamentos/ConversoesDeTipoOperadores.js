"" + 1 + 0 //= "10" // (1)
"" - 1 + 0 //= -1 // (2)
true + false //= 1
6 / "3" //= 2
"2" * "3" //= 6
4 + 5 + "px" //= "9px"
"$" + 4 + 5 //= "$45"
"4" - 2 //= 2
"4px" - 2 //= NaN
" -9 " + 5 //= " -9 5" // (3)
" -9 " - 5 //= -14 // (4)
null + 1 //= 1 // (5)
undefined + 1 //= NaN //(6)
" \t \n " - 2 //= -2 //(7)

// 1, A adição com uma string "" + 1 converte 1 em uma string: "" + 1 = "1", e então temos "1" + 0, a mesma regra é aplicada.
// 2. A subtração -(como a maioria das operações matemáticas) só funciona com números, converte uma string vazia "" em 0.
// 3. A adição com uma string acrescenta o número 5 à string.
// 4, A subtração sempre se converte em números, portanto, cria " -9 " um número -9(ignorando os espaços ao redor).
// 5. null tornse-se 0 após a conversão numérica.
// 6. undefined torn-se NaN após a conversão númerica.
// 7, Caracteres de espaço são cortados no início e no fim da string quando uma string é convertida em número. Aqui toda a string consiste em caracteres de espaço, como \t, \n e um espaço "regular" entre eles. Assim, da mesma forma que uma string vazia, torna-se 0.