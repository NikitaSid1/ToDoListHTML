const toDoListHTML = document.querySelector('.toDoList__list');
const formElement = document.querySelector('form.add');
const inputElement = formElement.querySelector('.adding__input');

const getTodoList = () => JSON.parse(localStorage.getItem('todoList'));

const setTodoList = (todoList) => localStorage.setItem('todoList', JSON.stringify(todoList));

сheckInitialTodoList();
createTodoList();

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  сheckInitialTodoList();

  const generateId = () =>
    [...Array(1)].reduce((a, b) => a + Math.random().toString(36).slice(2), '');

  let newTodo = inputElement.value;

  if (newTodo) {
    const todoList = getTodoList();
    todoList.push(`{ id: ${generateId()}, content: ${newTodo} }`);
    setTodoList(todoList);
    createTodoList();
  }
  event.target.reset();
});

function сheckInitialTodoList() {
  try {
    const todoList = getTodoList();
    const isInvalidTodoList =
      !todoList ||
      !Array.isArray(todoList); /* || !todoList.every((elem) => typeof elem === 'string') */

    if (isInvalidTodoList) {
      setTodoList([]);
    }
  } catch (e) {
    setTodoList([]);
  }
}

function createListElement(todo, index) {
  const li = document.createElement('li');
  li.classList.add('toDoList__list-item');

  const div = document.createElement('div');
  div.classList.add('toDoList__list-div');

  const span = document.createElement('span');
  span.classList.add('toDoList__list-span');

  const p = document.createElement('p');
  p.classList.add('toDoList__list-p');

  const btn = document.createElement('button');
  btn.classList.add('delete');
  btn.addEventListener('click', () => {
    const todoList = getTodoList();

    todoList.splice(index, 1);
    setTodoList(todoList);
    createTodoList();
  });

  div.appendChild(p);
  p.innerText = `${index + 1})`;
  div.appendChild(span);
  span.innerText = todo;
  console.log(todo);
  li.appendChild(div);
  li.appendChild(btn);

  return li;
}

function createTodoList() {
  toDoListHTML.innerHTML = '';
  const todoList = getTodoList();
  todoList.forEach((todo, index) => {
    const liElement = createListElement(todo, index);

    toDoListHTML.appendChild(liElement);
  });
}
