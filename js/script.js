const toDoListHTML = document.querySelector('.toDoList__list');
const formElement = document.querySelector('form.add');
const inputElement = formElement.querySelector('.adding__input');

const getTodoList = () => JSON.parse(localStorage.getItem('todoList'));

const setTodoList = (todoList) => localStorage.setItem('todoList', JSON.stringify(todoList));

checkInitialTodoList();
createTodoList();

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  checkInitialTodoList();

  const generateId = () =>
    [...Array(2)].reduce((a, b) => a + Math.random().toString(36).slice(2), '');

  let newTodo = inputElement.value;

  if (newTodo) {
    const todoList = getTodoList();
    todoList.push({ id: generateId(), content: newTodo, isDone: false });
    setTodoList(todoList);
    createTodoList();
  }
  event.target.reset();
});

function checkInitialTodoList() {
  try {
    const todoList = getTodoList();
    const isInvalidTodoList =
      !todoList ||
      !Array.isArray(todoList) ||
      !todoList.every((elem) => typeof elem.content === 'string');

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
  if (todo.isDone) {
    li.classList.add('done');
  }

  const div = document.createElement('div');
  div.classList.add('toDoList__list-div');

  const label = document.createElement('label');
  label.classList.add('toDoList__list-label');

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('toDoList__list-checkbox');
  checkbox.addEventListener('change', () => {
    const todoList = getTodoList();
    const changedTodoList = todoList.map((elem) =>
      elem.id === todo.id ? { ...elem, isDone: !elem.isDone } : elem
    );
    setTodoList(changedTodoList);
    createTodoList();
  });

  const img = document.createElement('img');
  img.classList.add('toDoList__list-img');
  const tickImg = 'url(../icons/tick.svg)';
  const crossImg = 'url(../icons/cross.svg)';
  img.style.backgroundImage = todo.isDone ? tickImg : crossImg;

  const p = document.createElement('p');
  p.classList.add('toDoList__list-p');

  const btn = document.createElement('button');
  btn.classList.add('delete');
  btn.addEventListener('click', () => {
    const todoList = getTodoList();

    const changedTodoList = todoList.filter((elem) => elem.id !== todo.id);
    setTodoList(changedTodoList);
    createTodoList();
  });

  label.appendChild(img);
  label.appendChild(checkbox);
  div.appendChild(label);
  div.appendChild(p);
  p.innerText = todo.content;
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
