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
    todoList.push({ id: generateId(), content: newTodo, done: false });
    setTodoList(todoList);
    createTodoList();
  }
  event.target.reset();
});

function сheckInitialTodoList() {
  try {
    const todoList = getTodoList();
    const isInvalidTodoList = !todoList || !Array.isArray(todoList);

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
  if (todo.done === true) {
    li.classList.toggle('done');
  }

  const div = document.createElement('div');
  div.classList.add('toDoList__list-div');

  const checkbox = document.createElement('button');
  checkbox.classList.add('toDoList__list-checkbox');
  if (todo.done === true) {
    checkbox.style.backgroundImage = 'url(../icons/true.png)';
  } else {
    checkbox.style.backgroundImage = 'url(../icons/false.png)';
  }
  checkbox.addEventListener('click', () => {
    const todoList = getTodoList();

    const toggle = todoList.map((elem) => {
      if (elem.id === todo.id && elem.done === false) {
        elem.done = true;
      } else if (elem.id === todo.id && elem.done === true) {
        elem.done = false;
      }
      return elem;
    });

    setTodoList(toggle);
    createTodoList();
  });

  const p = document.createElement('p');
  p.classList.add('toDoList__list-p');

  const btn = document.createElement('button');
  btn.classList.add('delete');
  btn.addEventListener('click', () => {
    const todoList = getTodoList();

    const todoListChanged = todoList.filter((elem) => elem.id !== todo.id);
    console.log(todoListChanged);
    setTodoList(todoListChanged);
    createTodoList();
  });

  div.appendChild(checkbox);
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
