const toDoListHTML = document.querySelector('.toDoList__list');
const formElement = document.querySelector('form.add');
const inputElement = formElement.querySelector('.adding__input');

const getTodoList = () => JSON.parse(localStorage.getItem('todoList'));

const setTodoList = (todoList) => localStorage.setItem('todoList', JSON.stringify(todoList));

initialCheckOfTodoList();
createTodoList();

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  let newTodo = inputElement.value;

  if (newTodo) {
    const todoList = getTodoList();
    todoList.push(newTodo);
    setTodoList(todoList);
    createTodoList();

    try {
      todoList.every((element) => String(element));
    } catch (e) {
      console.error(e);
    }
  }
  event.target.reset();
});

function initialCheckOfTodoList() {
  const todoList = getTodoList();

  try {
    todoList.every((element) => String(element));
  } catch (e) {
    console.error(e);
  }

  if (!todoList || !Array.isArray(todoList)) {
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

  todoList.forEach((element, index) => {
    toDoListHTML.innerHTML += `
          <li class="toDoList__list-item">${index + 1}) ${element}
              <div class="delete"></div>
          </li>
      `;
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
