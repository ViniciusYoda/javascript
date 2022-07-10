// Att

// A interface Attr representa um dos atributos de um elemento como um objeto. Na maioria das situações, você recuperará diretamente o valor do atributo como uma string (por exemplo, Element.getAttribute()), mas certas funções (por exemplo, Element.getAttributeNode()) ou meios de iteração retornam instâncias Attr.

// A ideia central de um objeto do tipo Attr é a associação entre um nome e um valor. Um atributo também pode fazer parte de um namespace e, nesse caso, também possui um URI que identifica o namespace e um prefixo que é uma abreviação do namespace.

// O nome é considerado local quando ignora o eventual prefixo do namespace e qualificado quando inclui o prefixo do namespace, se houver, separado do nome local por dois pontos (:). Temos três casos: um atributo fora de um namespace, um atributo dentro de um namespace sem um prefixo definido, um atributo dentro de um namespace com um prefixo:

// Nota: Esta interface representa apenas os atributos presentes na representação em árvore do Elemento, seja um elemento SVG, HTML ou MathML. Ele não representa a propriedade de uma interface associada a tal elemento, como HTMLTableElement para um elemento de tabela. (Consulte este artigo para obter mais informações sobre atributos e como eles são refletidos nas propriedades.)

// Propriedades
// Essa interface também herda as propriedades de suas interfaces pai, Node e EventTarget.

//localName (Somente leitura)
//Uma string que representa a parte local do nome qualificado do atributo.

//name (Somente leitura)
//O nome qualificado do atributo. Se o atributo não estiver em um namespace, será o mesmo que a propriedade localName.

//namespaceURI (Somente leitura)
//Uma string representando o URI do namespace do atributo ou null se não houver namespace.

//ownerElement (Somente leitura)
//O Elemento ao qual o atributo pertence.

//prefix (Somente leitura)
//Uma string que representa o prefixo do namespace do atributo ou null se um namespace sem prefixo ou nenhum namespace for especificado.

//specified (Somente leitura) Obsoleto
//Esta propriedade sempre retorna true.

//value
//O valor do atributo, uma string que pode ser configurada e obtida usando esta propriedade.

//Métodos
//Essa interface não possui métodos específicos, mas herda os métodos de suas interfaces pai, Node e EventTarget.