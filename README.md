# Divisão de Grupos

Aplicação web desenvolvida com **HTML, CSS e JavaScript** para dividir pessoas em grupos de forma automática, considerando categorias associadas a cada pessoa.

O projeto foi desenvolvido como prática de **JavaScript, manipulação do DOM, arrays, objetos, eventos e lógica de algoritmos**, com foco em criar uma distribuição equilibrada entre os grupos.

[Divisor de Grupos](https://divisor-de-grupos.web.app/)

## Funcionalidades

* Definição da quantidade de grupos.
* Cadastro de até 12 categorias.
* Seleção de uma ou mais categorias para cada pessoa.
* Cadastro de várias pessoas de uma só vez.
* Visualização da lista de pessoas cadastradas.
* Remoção individual de pessoas.
* Distribuição automática das pessoas entre os grupos.
* Tentativa de equilibrar a quantidade de pessoas por grupo.
* Tentativa de distribuir as categorias de forma equilibrada.
* Embaralhamento aleatório das pessoas antes da distribuição.
* Possibilidade de recalcular a distribuição para obter um novo resultado.
* Navegação entre as etapas da aplicação.

## Como funciona

O usuário começa informando:

* quantidade de grupos;
* categorias que serão utilizadas.

Depois, a aplicação cria botões para cada categoria. Ao cadastrar uma pessoa, o usuário pode selecionar as categorias que estão relacionadas a ela.

Os dados são armazenados internamente seguindo uma estrutura semelhante a:

```js
[
    ["João", "backend", "javascript"],
    ["Maria", "frontend"],
    ["Pedro", "backend", "javascript"]
]
```

O primeiro elemento representa o nome da pessoa e os elementos seguintes representam suas categorias.

Após o cadastro, o algoritmo de distribuição utiliza essas informações para montar os grupos.

## Algoritmo de distribuição

A distribuição é realizada pela função `distribuicao()`.

O processo funciona, de forma simplificada, da seguinte maneira:

1. Os grupos anteriores são resetados.
2. A aplicação contabiliza quantas pessoas pertencem a cada categoria.
3. Quando possível, é calculada uma quantidade-alvo daquela categoria para cada grupo.
4. A lista de pessoas é copiada e embaralhada aleatoriamente.
5. Cada pessoa é analisada individualmente.
6. O algoritmo procura um grupo que ainda não tenha atingido sua quantidade inicial de pessoas e que não ultrapasse a meta das categorias da pessoa.
7. Pessoas que não conseguem ser distribuídas nessa primeira etapa são armazenadas separadamente.
8. Ao final, as pessoas restantes são colocadas nos grupos que possuem menos integrantes.
9. Os grupos são renderizados novamente na interface.

A distribuição utiliza uma abordagem **gulosa (greedy)**: as pessoas são analisadas uma por vez e colocadas no primeiro grupo compatível encontrado.

Por utilizar aleatoriedade no embaralhamento, diferentes execuções podem produzir distribuições diferentes com as mesmas pessoas e categorias.

## Tecnologias utilizadas

* **HTML5** — estrutura da aplicação.
* **CSS3** — estilização e layout.
* **JavaScript** — lógica da aplicação e manipulação do DOM.

## Conceitos praticados

Durante o desenvolvimento, foram utilizados conceitos como:

* `addEventListener()`
* Manipulação do DOM
* `createElement()`
* `appendChild()`
* `insertAdjacentHTML()`
* `innerHTML`
* Arrays e objetos
* `for`, `for...of` e `forEach`
* `map()`
* `push()`, `pop()`, `shift()`, `unshift()` e `splice()`
* `includes()`
* `Object.entries()`
* `Object.values()`
* `sort()`
* Template literals
* Operador spread (`...`)
* `Math.floor()`
* `Math.max()`
* `Math.random()`
* Funções e eventos
* Algoritmos de distribuição e embaralhamento

## Estrutura dos dados

As pessoas são armazenadas em `listaConteudoFinal`:

```js
[
    ["joao", "backend", "javascript"],
    ["maria", "frontend", "design"],
    ["pedro", "backend"]
]
```

Os grupos são armazenados em `objeGrupos`:

```js
{
    grupo1: [
        ["joao", "backend", "javascript"]
    ],
    grupo2: [
        ["maria", "frontend", "design"]
    ],
    grupo3: [
        ["pedro", "backend"]
    ]
}
```

Essa separação permite que os dados utilizados pelo algoritmo sejam independentes da representação visual dos grupos na página.

## Executando o projeto

Por ser uma aplicação front-end, basta abrir o arquivo HTML no navegador.

Também é possível utilizar uma extensão ou servidor local, como o **Live Server**, para executar o projeto durante o desenvolvimento.

## Objetivo do projeto

O projeto foi criado principalmente para praticar JavaScript na construção de uma aplicação que possui uma lógica de distribuição não trivial.

Além da parte visual, o desenvolvimento envolveu a criação de um algoritmo capaz de considerar múltiplos critérios ao dividir as pessoas, tornando o projeto uma prática de **lógica de programação, estruturas de dados e manipulação do DOM**.

## Possíveis melhorias

Algumas ideias para futuras versões:

* Permitir editar uma pessoa já cadastrada.
* Permitir alterar as categorias depois de cadastradas.
* Melhorar o algoritmo para encontrar distribuições ainda mais equilibradas.
* Permitir definir pesos ou prioridades para categorias.
* Salvar os dados no navegador.
* Adicionar opção para exportar os grupos.
* Melhorar a validação dos dados inseridos.
* Tornar a distribuição configurável conforme diferentes critérios.

---

## Autor

Desenvolvido por **Ian Campos** como projeto de estudo e prática de desenvolvimento web.
