let num 

do {
    num = prompt('Digite um número maior que 100', 0);
} while (num <= 100 && num);

/*

O loop do..while se repete enquanto ambas as verificações são verdadeiras:

A verificação para num <= 100 – ou seja, o valor inserido ainda não é maior que 100.
A verificação && num é falsa quando num é null ou uma string vazia. Então o while loop também para.
PS If num is null then num <= 100 is true, portanto, sem a segunda verificação, o loop não pararia se o usuário clicar em CANCEL. Ambas as verificações são necessárias.

*/