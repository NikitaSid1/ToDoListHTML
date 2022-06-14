const toDoListHTML = document.querySelector('.toDoList__list');
const addForm = document.querySelector('form.add');
const addInput = addForm.querySelector('.adding__input');

const getStrings = () => JSON.parse(localStorage.getItem('list'));

const setStrings = (stringOfList) => localStorage.setItem('list', JSON.stringify(stringOfList));

createToDoList();

addForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let newString = addInput.value;

  if (newString) {
    const stringOfList = getStrings();
    if (
      (!stringOfList && !Array.isArray(stringOfList)) ||
      !Array.isArray(JSON.parse(localStorage.getItem('list')))
    ) {
      setStrings([]);
    } else {
      stringOfList.push(newString);
      setStrings(stringOfList);
      createToDoList();
    }
  }
  event.target.reset();
});

function createToDoList() {
  addNewString();
  deleteOneString();
}

function addNewString() {
  toDoListHTML.innerHTML = '';
  const stringOfList = getStrings();

  stringOfList.forEach((string, i) => {
    toDoListHTML.innerHTML += `
          <li class="toDoList__list-item">${i + 1}) ${string}
              <div class="delete"></div>
          </li>
      `;
  });
}

function deleteOneString() {
  document.querySelectorAll('.delete').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btn.parentElement.remove();

      const stringOfList = getStrings();

      stringOfList.splice(i, 1);
      setStrings(stringOfList);
      createToDoList();
    });
  });
}
