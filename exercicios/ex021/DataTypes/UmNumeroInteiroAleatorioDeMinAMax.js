//Existem muitas soluções corretas para a tarefa. Uma delas é ajustar as bordas do intervalo. Para garantir os mesmos intervalos, podemos gerar valores de 0.5 to 3.5, adicionando assim as probabilidades necessárias às arestas:

function randomIneger(min, max) {
    // now rand is from (min-0.5) to (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

alert( randomInteger(1, 3) );

// Uma maneira alternativa pode ser usar Math.floorpara um número aleatório de minaté max+1:

function randomInteger(min, max) {
    // here rand is from min to (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
  
alert( randomInteger(1, 3) );

/*

Agora todos os intervalos são mapeados desta forma:

values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
Todos os intervalos têm a mesma duração, tornando a distribuição final uniforme.

*/

