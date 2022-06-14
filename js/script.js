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
    if (
      !todoList ||
      !Array.isArray(todoList) ||
      todoList.every((elem) => typeof elem === 'string')
    ) {
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
