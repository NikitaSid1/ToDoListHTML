import { utils, checkInitialTodoList } from './utils';

const incompletedTodoListElement = document.querySelector('.incompleted');
const completedTodoListElement = document.querySelector('.completed');
const formElement = document.querySelector('form.add');
const inputElement = formElement.querySelector('.adding__input');
const searchInput = document.querySelector('.search');
const resetSearchButton = document.querySelector('.reset');

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

function createListElement(todo) {
  const li = document.createElement('li');
  li.classList.add('toDoList__list-item');
  if (todo.isDone) {
    li.classList.add('done');
  }

  const div = document.createElement('div');
  div.classList.add('toDoList__list-div');

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

  div.appendChild(checkbox);
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
  let todoList = utils.getTodoList();
  const incompletedTodoList = [];
  const completedTodoList = [];
  incompletedTodoListElement.innerHTML = '';
  completedTodoListElement.innerHTML = '';

  if (searchInputValue) {
    todoList = todoList.filter((elem) => elem.content.toLowerCase().includes(searchInputValue));
  }

  todoList.forEach((elem) =>
    elem.isDone ? completedTodoList.push(elem) : incompletedTodoList.push(elem)
  );

  incompletedTodoList.forEach((todo, index) => {
    const liElement = createListElement(todo, index);

    incompletedTodoListElement.appendChild(liElement);
  });

  completedTodoList.forEach((todo, index) => {
    const liElement = createListElement(todo, index);

    completedTodoListElement.appendChild(liElement);
  });

  if (completedTodoList.length) {
    completedTodoListElement.classList.remove('hide');
  } else {
    completedTodoListElement.classList.add('hide');
  }
}
