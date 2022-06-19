const toDoListHTML = document.querySelector('.toDoList__list');
const formElement = document.querySelector('form.add');
const inputElement = formElement.querySelector('.adding__input');
const searchInput = document.querySelector('.search');
const resetSearchButton = document.querySelector('.reset');

const utils = {
  setTodoList: (todoList) => localStorage.setItem('todoList', JSON.stringify(todoList)),
  getTodoList: () => JSON.parse(localStorage.getItem('todoList')),
  generateId: () => [...Array(2)].reduce((a) => a + Math.random().toString(36).slice(2), ''),
};

checkInitialTodoList();
createTodoList();

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  checkInitialTodoList();

  const newTodo = inputElement.value;

  if (newTodo) {
    const todoList = utils.getTodoList();
    todoList.push({ id: utils.generateId(), content: newTodo, isDone: false });
    utils.setTodoList(todoList);
    createTodoList();
  }
  event.target.reset();
});

function checkInitialTodoList() {
  try {
    const todoList = utils.getTodoList();

    const isInvalidTodoList =
      !todoList ||
      !Array.isArray(todoList) ||
      !todoList.every(
        ({ id, content, isDone }) =>
          typeof id === 'string' && typeof content === 'string' && typeof isDone === 'boolean'
      );

    if (isInvalidTodoList) {
      utils.setTodoList([]);
    }
  } catch (e) {
    utils.setTodoList([]);
  }
}

function createListElement(todo) {
  const li = document.createElement('li');
  li.classList.add('toDoList__list-item');
  if (todo.isDone) {
    li.classList.add('done');
  }

  const div = document.createElement('div');
  div.classList.add('toDoList__list-div');

  const form = document.createElement('form');
  form.classList.add('toDoList__list-form');

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('toDoList__list-checkbox');
  checkbox.checked = todo.isDone;
  checkbox.addEventListener('change', () => {
    const todoList = utils.getTodoList();
    const changedTodoList = todoList.map((elem) =>
      elem.id === todo.id ? { ...elem, isDone: !elem.isDone } : elem
    );
    utils.setTodoList(changedTodoList);
    createTodoList();
  });

  const p = document.createElement('p');
  p.classList.add('toDoList__list-p');

  const btn = document.createElement('button');
  btn.classList.add('delete');
  btn.addEventListener('click', () => {
    const todoList = utils.getTodoList();

    const changedTodoList = todoList.filter((elem) => elem.id !== todo.id);
    utils.setTodoList(changedTodoList);
    createTodoList();
  });

  form.appendChild(checkbox);
  div.appendChild(form);
  div.appendChild(p);
  p.innerText = todo.content;
  li.appendChild(div);
  li.appendChild(btn);

  return li;
}

searchInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();
  createTodoList(value);
});

resetSearchButton.addEventListener('click', () => {
  searchInput.value = '';
  createTodoList();
});

function createTodoList(searchInputValue) {
  toDoListHTML.innerHTML = '';
  let todoList = utils.getTodoList();

  if (searchInputValue) {
    todoList = todoList.filter((elem) => elem.content.toLowerCase().includes(searchInputValue));
  }

  todoList.forEach((todo, index) => {
    const liElement = createListElement(todo, index);

    toDoListHTML.appendChild(liElement);
  });
}
