//CharacterData

// A interface abstrata CharacterData representa um objeto Node que contém caracteres. Esta é uma interface abstrata, o que significa que não há objetos do tipo CharacterData: ela é implementada por outras interfaces como Text, Comment, CDATASection ou ProcessingInstruction, que não são abstratas.

//Propriedades
//Essa interface também herda propriedades de seus pais, Node e EventTarget.

//CharacterData.data
//Uma string representando os dados textuais contidos neste objeto.

//CharacterData.length (Somente leitura)
//Retorna um número que representa o tamanho da string contida no objeto.

//CharacterData.nextElementSibling (Somente leitura)
//Retorna o primeiro Elemento que segue este nó e é um irmão.

//CharacterData.previousElementSibling (Somente leitura)
//Retorna o primeiro Elemento que precede este nó e é um irmão.

//Métodos
//Essa interface também herda métodos de seus pais, Node e EventTarget.

//CharacterData.after()
//Insere um conjunto de objetos Node ou strings na lista de filhos do pai do CharacterData, logo após o objeto CharacterData.

//CharacterData.appendData()
//Acrescenta a string fornecida à string CharacterData.data; quando esse método retorna, os dados contêm a string concatenada.

//CharacterData.before()
//Insere um conjunto de objetos ou strings Node na lista de filhos do pai do CharacterData, logo antes do objeto CharacterData.

//CharacterData.deleteData()
//Remove a quantidade especificada de caracteres, começando no deslocamento especificado, da string CharacterData.data; quando esse método retorna, os dados contêm a string abreviada.

//CharacterData.insertData()
//Insere os caracteres especificados, no deslocamento especificado, na string CharacterData.data; quando esse método retorna, os dados contêm a string modificada.

//CharacterData.remove()
//Remove o objeto de sua lista de filhos pai.

//CharacterData.replaceData()
//Substitui a quantidade especificada de caracteres, começando no deslocamento especificado, pela string especificada; quando esse método retorna, os dados contêm a string modificada.

//CharacterData.replaceWith()
//Substitui os caracteres na lista de filhos de seu pai por um conjunto de objetos ou strings Node.

//CharacterData.substringData()
//Retorna uma string contendo a parte de CharacterData.data do comprimento especificado e começando no deslocamento especificado.