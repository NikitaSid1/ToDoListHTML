const toDoListHTML = document.querySelector('.toDoList__list');
const addForm = document.querySelector('form.add');
const addInput = addForm.querySelector('.adding__input');

const getFilms = () => {
  try {
    return JSON.parse(localStorage.getItem('movies'));
  } catch (error) {
    setFilms([]);
    return [];
  }
};

const setFilms = (movies) => localStorage.setItem('movies', JSON.stringify(movies));

function checkLocalStorage() {
  const movies = getFilms();

  if (!movies && !Array.isArray(movies)) {
    setFilms([]);
  }
}
checkLocalStorage();

createMovieList();

addForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let newMovie = addInput.value;

  if (newMovie) {
    const movies = getFilms();

    if (newMovie.length > 21) {
      newMovie = `${newMovie.substring(0, 22)}...`;
    }

    movies.push(newMovie);
    setFilms(movies);
    createMovieList();
  }
  event.target.reset();
});

function createMovieList() {
  addNewString();
  deleteOneString();
}

function addNewString() {
  toDoListHTML.innerHTML = '';
  const movies = getFilms();

  movies.forEach((film, i) => {
    toDoListHTML.innerHTML += `
          <li class="toDoList__list-item">${i + 1}) ${film}
              <div class="delete"></div>
          </li>
      `;
  });
}

function deleteOneString() {
  document.querySelectorAll('.delete').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btn.parentElement.remove();

      const movies = getFilms();

      movies.splice(i, 1);
      setFilms(movies);
      createMovieList();
    });
  });
}
