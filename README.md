# Estudos de JavaScript

Repositório de estudos e exercícios práticos de JavaScript, HTML e CSS. O conteúdo cobre desde os fundamentos da linguagem até APIs do navegador, requisições de rede, componentes web e expressões regulares.

Este não é um aplicativo único: cada arquivo ou pasta representa uma explicação, demonstração ou exercício independente. Não há dependências de projeto, etapa de build ou suíte de testes automatizados.

## Conteúdo

O repositório está dividido em duas trilhas principais:

| Diretório | Conteúdo | Formato |
| --- | --- | --- |
| [`info/`](info/) | Material organizado como uma referência progressiva da linguagem e das APIs web | Exemplos e anotações em JavaScript, páginas HTML e alguns estilos CSS |
| [`curso_em_video/`](curso_em_video/) | Aulas e exercícios práticos do curso de JavaScript do Curso em Vídeo | Páginas HTML, scripts, estilos e imagens |

### Referência por tópicos (`info/`)

O material segue três grandes blocos:

1. **A linguagem JavaScript**
   - introdução e fundamentos;
   - qualidade de código;
   - objetos e tipos de dados;
   - funções avançadas;
   - propriedades, protótipos e classes;
   - tratamento de erros;
   - promises, `async`/`await`;
   - generators, módulos e tópicos diversos.
2. **Navegador, documento, eventos e interfaces**
   - DOM e manipulação de documentos;
   - eventos de interface, teclado e ponteiro;
   - formulários e controles;
   - carregamento de páginas e recursos;
   - MutationObserver, Selection, Range e event loop.
3. **Artigos adicionais**
   - janelas, frames e comunicação entre páginas;
   - dados binários e arquivos;
   - Fetch, XMLHttpRequest, WebSocket e Server-Sent Events;
   - cookies, Local Storage e IndexedDB;
   - animações;
   - Web Components e Shadow DOM;
   - expressões regulares.

Os diretórios e arquivos possuem prefixos numéricos. Eles indicam a ordem sugerida de leitura, por exemplo:

```text
info/
└── 1-The JavaScript language/
    └── 5-Data types/
        └── 5.5/
            ├── 5.5-Array methods.js
            └── 5.5-Classificar usuários por idade.js
```

Em geral, o arquivo com o nome do tópico contém a explicação principal e os demais arquivos da mesma pasta contêm exercícios relacionados.

### Curso em Vídeo (`curso_em_video/`)

As pastas `aulaXX` guardam exemplos das aulas. As pastas `ex014` a `ex018` são pequenos projetos para navegador:

| Exercício | Tema principal |
| --- | --- |
| `ex014` | Relógio que adapta a página ao período do dia |
| `ex015` | Verificador de idade e sexo com imagem dinâmica |
| `ex016` | Contador com início, fim e passo |
| `ex017` | Gerador de tabuada |
| `ex018` | Analisador de uma lista de números |

## Como executar

### Pré-requisitos

- um navegador moderno, como Firefox, Chrome ou Edge;
- opcionalmente, Node.js para exemplos que usam somente a linguagem;
- opcionalmente, Python 3 ou outra ferramenta de servidor HTTP local para exemplos web.

Não é necessário executar `npm install`.

### Exemplos HTML

Páginas simples podem ser abertas diretamente no navegador. Para os exemplos que carregam módulos, fazem requisições ou dependem das regras de origem do navegador, inicie um servidor na raiz do repositório:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000/` e navegue até o arquivo desejado. Por exemplo:

```text
http://localhost:8000/curso_em_video/ex018/
```

Como vários caminhos contêm espaços, prefira navegar pela listagem do servidor ou use a URL codificada com `%20`.

### Exemplos JavaScript

Antes de executar um arquivo `.js` isoladamente, observe seu conteúdo:

- scripts que usam `document`, `window`, `alert`, `prompt`, elementos HTML ou eventos devem ser executados no navegador, normalmente por meio da página HTML associada;
- scripts compostos apenas por JavaScript podem ser experimentados no console do navegador ou, quando não dependem de APIs web, com Node.js:

```bash
node "caminho/para/o/exemplo.js"
```

Alguns arquivos são anotações escritas como comentários, trechos parciais ou soluções didáticas. Portanto, nem todo `.js` foi criado para produzir uma saída quando executado diretamente.

## Como estudar este repositório

Uma sequência recomendada é:

1. começar por `curso_em_video/aula04` e avançar pelas aulas em ordem numérica;
2. praticar com os projetos `ex014` a `ex018`;
3. usar `info/1-The JavaScript language` para aprofundar os conceitos da linguagem;
4. seguir para `info/2-BrowserDocumentEventsInterfaces` ao estudar DOM e eventos;
5. consultar `info/3-Additional articles` para APIs e assuntos avançados.

Ao estudar um exemplo, abra também o console de desenvolvimento do navegador (`F12` ou `Ctrl+Shift+I`), pois muitos scripts exibem seu resultado com `console.log`.

## Características e limitações

- Os exemplos preservam estilos e abordagens didáticas diferentes, incluindo nomes em português e inglês.
- Alguns exercícios usam APIs externas e podem depender de conexão com a internet, CORS ou disponibilidade do serviço consultado.
- Exemplos sobre cookies, armazenamento, módulos e rede funcionam melhor quando servidos por HTTP em vez de abertos via `file://`.
- Há arquivos com extensão `.JS` em maiúsculas; em sistemas Linux, `.js` e `.JS` são nomes distintos.
- Não existe uma automação global para validar todos os arquivos, pois parte do conteúdo demonstra erros intencionais ou depende de elementos específicos do navegador.

## Estrutura resumida

```text
.
├── curso_em_video/   # aulas e exercícios práticos
├── info/             # referência organizada por assunto
│   ├── 1-The JavaScript language/
│   ├── 2-BrowserDocumentEventsInterfaces/
│   └── 3-Additional articles/
└── README.md
```

## Contribuição

Ao adicionar conteúdo:

1. mantenha o exemplo dentro do tópico ou da aula correspondente;
2. preserve a numeração usada nos diretórios;
3. mantenha juntos os arquivos HTML, JavaScript, CSS e imagens que pertencem ao mesmo exemplo;
4. use caminhos relativos para recursos locais;
5. teste páginas web por meio de um servidor HTTP local e confira o console do navegador.

## Créditos

O diretório `curso_em_video/` reúne exercícios desenvolvidos durante o curso de JavaScript do **Curso em Vídeo**. O diretório `info/` organiza estudos por uma sequência de assuntos equivalente à estrutura do tutorial **JavaScript.info**. Consulte os materiais originais para explicações atualizadas e contexto adicional.
