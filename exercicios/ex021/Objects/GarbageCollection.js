/*

Coleta de lixo
O gerenciamento de memória em JavaScript é realizado de forma automática e invisível para nós. Criamos primitivas, objetos, funções… Tudo isso leva memória.

O que acontece quando algo não é mais necessário? Como o mecanismo JavaScript o descobre e o limpa?

Coleta de lixo
O gerenciamento de memória em JavaScript é realizado de forma automática e invisível para nós. Criamos primitivas, objetos, funções… Tudo isso leva memória.

O que acontece quando algo não é mais necessário? Como o mecanismo JavaScript o descobre e o limpa?

1. Há um conjunto básico de valores inerentemente alcançáveis, que não podem ser excluídos por motivos óbvios.

Por exemplo:

A função atualmente em execução, suas variáveis ​​locais e parâmetros.
Outras funções na cadeia atual de chamadas aninhadas, suas variáveis ​​e parâmetros locais.
Variáveis ​​globais.
(há alguns outros internos também)

Esses valores são chamados de raízes .

2. Qualquer outro valor é considerado alcançável se for alcançável a partir de uma raiz por uma referência ou por uma cadeia de referências.

Por exemplo, se houver um objeto em uma variável global e esse objeto tiver uma propriedade que faz referência a outro objeto, esse objeto será considerado alcançável. E aqueles que ele referencia também são alcançáveis. Exemplos detalhados a seguir.

Há um processo em segundo plano no mecanismo JavaScript que é chamado de coletor de lixo . Ele monitora todos os objetos e remove aqueles que se tornaram inacessíveis.

Um exemplo simples

Aqui está o exemplo mais simples:

*/

// user has a reference to the object
let user = {
    name: "John"
};

/*


Aqui a seta representa uma referência de objeto. A variável global "user"faz referência ao objeto {name: "John"}(chamaremos de John para abreviar). A "name"propriedade de John armazena uma primitiva, então ela é pintada dentro do objeto.

Se o valor de user for substituído, a referência será perdida:

*/

user = null;

/*


Agora John se torna inacessível. Não há como acessá-lo, não há referências a ele. O coletor de lixo descartará os dados e liberará a memória.

Duas referências
Agora vamos imaginar que copiamos a referência de userto admin:

*/

// user has a reference to the object
let user = {
    name: "John"
};

let admin = user;

// Agora se fizermos o mesmo:

user = null;

/*

…Então o objeto ainda é alcançável via adminvariável global, então ele deve ficar na memória. Se substituirmos admintambém, ele poderá ser removido.

Objetos interligados
Agora um exemplo mais complexo. A família:

*/

function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;

    return {
        father: man,
        mother: woman
    }
}

let family = marry({
    name: "John"
}, {
    name: "Ann"
});

/*

A função marry“casa” dois objetos dando-lhes referências um ao outro e retorna um novo objeto que contém ambos.

A estrutura de memória resultante:


A partir de agora, todos os objetos são alcançáveis.

Agora vamos remover duas referências:

*/

delete family.father;
delete family.mother.husband;

/*

Não é suficiente excluir apenas uma dessas duas referências, pois todos os objetos ainda seriam alcançáveis.

Mas se excluirmos ambos, podemos ver que John não tem mais referência de entrada:

Referências de saída não importam. Apenas os que chegam podem tornar um objeto alcançável. Assim, John agora está inacessível e será removido da memória com todos os seus dados que também ficaram inacessíveis.

Após a coleta de lixo:

Ilha inacessível
É possível que toda a ilha de objetos interligados se torne inalcançável e seja removida da memória.

O objeto de origem é o mesmo acima. Então:

*/

family = null;

/*

A imagem na memória torna-se:


Este exemplo demonstra a importância do conceito de acessibilidade.

É óbvio que John e Ann ainda estão ligados, ambos têm referências recebidas. Mas isso não é suficiente.

O antigo "family"objeto foi desvinculado da raiz, não há mais referência a ele, então toda a ilha se torna inacessível e será removida.

Algoritmos internos
O algoritmo básico de coleta de lixo é chamado de “marcar e varrer”.

As seguintes etapas de “coleta de lixo” são realizadas regularmente:

O coletor de lixo cria raízes e as “marca” (lembra).
Em seguida, ele visita e “marca” todas as referências deles.
Em seguida, visita objetos marcados e marca suas referências. Todos os objetos visitados são lembrados, para não visitar o mesmo objeto duas vezes no futuro.
…E assim sucessivamente até que todas as referências alcançáveis ​​(das raízes) sejam visitadas.
Todos os objetos, exceto os marcados, são removidos.
Por exemplo, deixe nossa estrutura de objeto ficar assim:

Podemos ver claramente uma “ilha inalcançável” do lado direito. Agora vamos ver como o coletor de lixo “marca-e-varre” lida com isso.

O primeiro passo marca as raízes:

Em seguida, seguimos suas referências e marcamos os objetos referenciados:

…E continue a seguir outras referências, enquanto possível:

Agora os objetos que não puderam ser visitados no processo são considerados inacessíveis e serão removidos:

Também podemos imaginar o processo como o derramamento de um enorme balde de tinta desde as raízes, que flui por todas as referências e marca todos os objetos alcançáveis. Os não marcados são então removidos.

Esse é o conceito de como a coleta de lixo funciona. Os mecanismos JavaScript aplicam muitas otimizações para torná-lo mais rápido e não introduzir atrasos na execução do código.

Algumas das otimizações:

Coleção geracional – os objetos são divididos em dois conjuntos: “novos” e “antigos”. No código típico, muitos objetos têm uma vida útil curta: eles aparecem, fazem seu trabalho e morrem rapidamente, então faz sentido rastrear novos objetos e limpar a memória deles, se for o caso. Aqueles que sobrevivem por tempo suficiente, tornam-se “velhos” e são examinados com menos frequência.
Coleta incremental – se houver muitos objetos, e tentarmos caminhar e marcar todo o conjunto de objetos de uma só vez, pode levar algum tempo e introduzir atrasos visíveis na execução. Assim, o mecanismo divide todo o conjunto de objetos existentes em várias partes. E então limpe essas partes uma após a outra. Existem muitas pequenas coletas de lixo em vez de uma total. Isso requer alguma contabilidade extra entre eles para acompanhar as mudanças, mas temos muitos pequenos atrasos em vez de grandes.
Coleta em tempo ocioso – o coletor de lixo tenta executar apenas enquanto a CPU está ociosa, para reduzir o possível efeito na execução.
Existem outras otimizações e sabores de algoritmos de coleta de lixo. Por mais que eu gostaria de descrevê-los aqui, eu tenho que adiar, porque diferentes motores implementam diferentes ajustes e técnicas. E, o que é ainda mais importante, as coisas mudam à medida que os motores se desenvolvem, então estudar mais “com antecedência”, sem uma necessidade real, provavelmente não vale a pena. A menos, é claro, que seja uma questão de puro interesse, haverá alguns links para você abaixo.

Resumo
As principais coisas a saber:

A coleta de lixo é realizada automaticamente. Não podemos forçá-lo ou impedi-lo.
Os objetos são retidos na memória enquanto estão acessíveis.
Ser referenciado não é o mesmo que ser alcançável (a partir de uma raiz): um pacote de objetos interligados pode se tornar inacessível como um todo, como vimos no exemplo acima.
Os mecanismos modernos implementam algoritmos avançados de coleta de lixo.

Um livro geral “The Garbage Collection Handbook: The Art of Automatic Memory Management” (R. Jones et al) cobre alguns deles.

Se você estiver familiarizado com a programação de baixo nível, informações mais detalhadas sobre o coletor de lixo do V8 estão no artigo Um tour do V8: Coleta de lixo .

O blog V8 também publica artigos sobre mudanças no gerenciamento de memória de tempos em tempos. Naturalmente, para aprender mais sobre coleta de lixo, é melhor você se preparar aprendendo sobre os componentes internos do V8 em geral e ler o blog de Vyacheslav Egorov , que trabalhou como um dos engenheiros do V8. Estou dizendo: “V8”, porque é melhor coberto por artigos na internet. Para outros mecanismos, muitas abordagens são semelhantes, mas a coleta de lixo difere em muitos aspectos.

O conhecimento aprofundado dos mecanismos é bom quando você precisa de otimizações de baixo nível. Seria sensato planejar isso como o próximo passo depois que você estiver familiarizado com o idioma.

*/