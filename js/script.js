import { utils, checkInitialTodoList } from './utils';

const incompletedTodoListElement = document.querySelector('.incompleted');
const completedTodoListElement = document.querySelector('.completed');
const formElement = document.querySelector('form.add');
const searchInput = document.querySelector('.search');
const resetSearchButton = document.querySelector('.reset');
const inputElement = formElement.querySelector('.adding__input');

checkInitialTodoList();
createTodoList();

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const newTodo = inputElement.value;
  checkInitialTodoList();

  if (newTodo) {
    const todoList = utils.getTodoList();
    todoList.push({ id: utils.generateId(), content: newTodo, isDone: false });
    utils.setTodoList(todoList);
    createTodoList();
  }
  event.target.reset();
});

searchInput.addEventListener('input', (event) => {
  const value = event.target.value.toLowerCase();
  createTodoList(value);
});

resetSearchButton.addEventListener('click', () => {
  searchInput.value = '';
  createTodoList();
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

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('delete');
  btnDelete.addEventListener('click', () => {
    deleteElement();
  });

  function deleteElement() {
    const todoList = utils.getTodoList();

    const changedTodoList = todoList.filter((elem) => elem.id !== todo.id);
    utils.setTodoList(changedTodoList);
    createTodoList();
  }

  const todoContent = document.createElement('p');
  todoContent.classList.add('toDoList__list-paragraph');
  todoContent.setAttribute('data-edit', 'false');

  function todoContentStyles() {
    todoContent.style.backgroundColor = 'rgba(0, 195, 255, 0.1)';
    todoContent.style.outline = 'none';
    todoContent.style.borderRadius = '5px';
    todoContent.style.border = '2px solid rgba(0, 195, 255, 1)';
  }

  const btnEdit = document.createElement('button');
  btnEdit.classList.add('edit');

  btnEdit.addEventListener('click', () => {
    if (todoContent.dataset.edit === 'false') {
      todoContent.dataset.edit = 'true';
      todoContent.contentEditable = true;

      todoContentStyles();
      todoContent.focus();
    } else {
      todoContent.dataset.edit = 'false';
      todoContent.contentEditable = false;

      if (todo.content === '') {
        return deleteElement();
      }

      const todoList = utils.getTodoList();
      const changedTodoList = todoList.map((elem) =>
        elem.id === todo.id ? { ...elem, content: todoContent.innerText } : elem
      );

      utils.setTodoList(changedTodoList);
      createTodoList();
    }
  });

  div.appendChild(checkbox);
  div.appendChild(todoContent);
  todoContent.innerText = todo.content;
  li.appendChild(div);
  li.appendChild(btnEdit);
  li.appendChild(btnDelete);

  return li;
}

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
    completedTodoListElement.classList.remove('hide22222222');
  } else {
    completedTodoListElement.classList.add('hide22222222');
  }

  if (incompletedTodoList.length) {
    incompletedTodoListElement.classList.remove('hide22222222');
  } else {
    incompletedTodoListElement.classList.add('hide22222222');
  }
}
