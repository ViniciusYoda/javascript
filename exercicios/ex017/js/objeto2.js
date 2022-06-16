const todos = [
    {
        id: 1,
        description: 'Estudar programação',
        isCompleted: false,
    },
    {
        id: 2,
        description: 'Ler',
        isCompleted: true,
    },
    {
        id: 3,
        description: 'Treinar',
        isCompleted: true,
    },
];

const descriptionOfLastToDo = todos[2].description;

console.log(descriptionOfLastToDo)

const todosJSON = JSON.stringify(todos);

console.log(todosJSON)
const todosList = JSON.parse(todosJSON);
console.log(todosList)