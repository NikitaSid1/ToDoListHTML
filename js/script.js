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

  let newTodo = inputElement.value;

  if (newTodo) {
    const todoList = getTodoList();
    todoList.push(newTodo);
    setTodoList(todoList);
    createTodoList();
  }
  event.target.reset();
});

function сheckInitialTodoList() {
  try {
    const todoList = getTodoList();
    const isInvalidTodoList =
      !todoList || !Array.isArray(todoList) || !todoList.every((elem) => typeof elem === 'string');

    if (isInvalidTodoList) {
      setTodoList([]);
    }
  } catch (e) {
    setTodoList([]);
  }
}

function createTodoList() {
  addNewTodo();
  addDeleteHandlers();
}

function addNewTodo() {
  toDoListHTML.innerHTML = '';
  const todoList = getTodoList();

  todoList.forEach((todo, index) => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const span = document.createElement('span');
    const p = document.createElement('p');
    const btn = document.createElement('button');

    li.classList.add('toDoList__list-item');
    div.classList.add('toDoList__list-div');
    p.classList.add('toDoList__list-p');
    span.classList.add('toDoList__list-span');
    btn.classList.add('delete');

    toDoListHTML.appendChild(li);
    li.appendChild(div);
    li.appendChild(btn);
    div.appendChild(p);
    div.appendChild(span);
    span.innerText = todo;
    p.innerText = `${index + 1})`;
  });
}

function addDeleteHandlers() {
  document.querySelectorAll('.delete').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btn.parentElement.remove();

      const todoList = getTodoList();

      todoList.splice(i, 1);
      setTodoList(todoList);
      createTodoList();
    });
  });
}
