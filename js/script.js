const toDoListHTML = document.querySelector('.toDoList__list');
const formElement = document.querySelector('form.add');
const inputElement = formElement.querySelector('.adding__input');

const getTodoList = () => JSON.parse(localStorage.getItem('todoList'));

const setTodoList = (todoList) => localStorage.setItem('todoList', JSON.stringify(todoList));

firstCheckOfTodoList();
createTodoList();

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  let newTodo = inputElement.value;

  if (newTodo) {
    const todoList = getTodoList();
    if ((!todoList && !Array.isArray(todoList)) || !Array.isArray(getTodoList())) {
      setTodoList([]);
    } else {
      todoList.push(newTodo);
      setTodoList(todoList);
      createTodoList();
    }
  }
  event.target.reset();
});

function firstCheckOfTodoList() {
  const movies = getTodoList();

  if (!movies && !Array.isArray(movies)) {
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

  todoList.forEach((string, i) => {
    toDoListHTML.innerHTML += `
          <li class="toDoList__list-item">${i + 1}) ${string}
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
