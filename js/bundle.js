/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./js/utils.js\");\n\r\n\r\nconst incompletedTodoListElement = document.querySelector('.incompleted');\r\nconst completedTodoListElement = document.querySelector('.completed');\r\nconst formElement = document.querySelector('form.add');\r\nconst inputElement = formElement.querySelector('.adding__input');\r\nconst searchInput = document.querySelector('.search');\r\nconst resetSearchButton = document.querySelector('.reset');\r\n\r\n(0,_utils__WEBPACK_IMPORTED_MODULE_0__.checkInitialTodoList)();\r\ncreateTodoList();\r\n\r\nformElement.addEventListener('submit', (event) => {\r\n  event.preventDefault();\r\n\r\n  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.checkInitialTodoList)();\r\n\r\n  const newTodo = inputElement.value;\r\n\r\n  if (newTodo) {\r\n    const todoList = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.getTodoList();\r\n    todoList.push({ id: _utils__WEBPACK_IMPORTED_MODULE_0__.utils.generateId(), content: newTodo, isDone: false });\r\n    _utils__WEBPACK_IMPORTED_MODULE_0__.utils.setTodoList(todoList);\r\n    createTodoList();\r\n  }\r\n  event.target.reset();\r\n});\r\n\r\nfunction createListElement(todo) {\r\n  const li = document.createElement('li');\r\n  li.classList.add('toDoList__list-item');\r\n  if (todo.isDone) {\r\n    li.classList.add('done');\r\n  }\r\n\r\n  const div = document.createElement('div');\r\n  div.classList.add('toDoList__list-div');\r\n\r\n  const checkbox = document.createElement('input');\r\n  checkbox.setAttribute('type', 'checkbox');\r\n  checkbox.classList.add('toDoList__list-checkbox');\r\n  checkbox.checked = todo.isDone;\r\n  checkbox.addEventListener('change', () => {\r\n    const todoList = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.getTodoList();\r\n    const changedTodoList = todoList.map((elem) =>\r\n      elem.id === todo.id ? { ...elem, isDone: !elem.isDone } : elem\r\n    );\r\n    _utils__WEBPACK_IMPORTED_MODULE_0__.utils.setTodoList(changedTodoList);\r\n    createTodoList();\r\n  });\r\n\r\n  const p = document.createElement('p');\r\n  p.classList.add('toDoList__list-p');\r\n\r\n  const btn = document.createElement('button');\r\n  btn.classList.add('delete');\r\n  btn.addEventListener('click', () => {\r\n    const todoList = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.getTodoList();\r\n\r\n    const changedTodoList = todoList.filter((elem) => elem.id !== todo.id);\r\n    _utils__WEBPACK_IMPORTED_MODULE_0__.utils.setTodoList(changedTodoList);\r\n    createTodoList();\r\n  });\r\n\r\n  div.appendChild(checkbox);\r\n  div.appendChild(p);\r\n  p.innerText = todo.content;\r\n  li.appendChild(div);\r\n  li.appendChild(btn);\r\n\r\n  return li;\r\n}\r\n\r\nsearchInput.addEventListener('input', (e) => {\r\n  const value = e.target.value.toLowerCase();\r\n  createTodoList(value);\r\n});\r\n\r\nresetSearchButton.addEventListener('click', () => {\r\n  searchInput.value = '';\r\n  createTodoList();\r\n});\r\n\r\nfunction createTodoList(searchInputValue) {\r\n  let todoList = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.getTodoList();\r\n  const incompletedTodoList = [];\r\n  const completedTodoList = [];\r\n  incompletedTodoListElement.innerHTML = '';\r\n  completedTodoListElement.innerHTML = '';\r\n\r\n  if (searchInputValue) {\r\n    todoList = todoList.filter((elem) => elem.content.toLowerCase().includes(searchInputValue));\r\n  }\r\n\r\n  todoList.forEach((elem) =>\r\n    elem.isDone ? completedTodoList.push(elem) : incompletedTodoList.push(elem)\r\n  );\r\n\r\n  incompletedTodoList.forEach((todo, index) => {\r\n    const liElement = createListElement(todo, index);\r\n\r\n    incompletedTodoListElement.appendChild(liElement);\r\n  });\r\n\r\n  completedTodoList.forEach((todo, index) => {\r\n    const liElement = createListElement(todo, index);\r\n\r\n    completedTodoListElement.appendChild(liElement);\r\n  });\r\n\r\n  if (completedTodoList.length) {\r\n    completedTodoListElement.classList.remove('hide');\r\n  } else {\r\n    completedTodoListElement.classList.add('hide');\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://todolistjs/./js/script.js?");

/***/ }),

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkInitialTodoList\": () => (/* binding */ checkInitialTodoList),\n/* harmony export */   \"utils\": () => (/* binding */ utils)\n/* harmony export */ });\nconst utils = {\r\n  setTodoList: (todoList) => localStorage.setItem('todoList', JSON.stringify(todoList)),\r\n  getTodoList: () => JSON.parse(localStorage.getItem('todoList')),\r\n  generateId: () => [...Array(2)].reduce((a) => a + Math.random().toString(36).slice(2), ''),\r\n};\r\n\r\nfunction checkInitialTodoList() {\r\n  try {\r\n    const todoList = utils.getTodoList();\r\n\r\n    const isInvalidTodoList =\r\n      !todoList ||\r\n      !Array.isArray(todoList) ||\r\n      !todoList.every(\r\n        ({ id, content, isDone }) =>\r\n          typeof id === 'string' && typeof content === 'string' && typeof isDone === 'boolean'\r\n      );\r\n\r\n    if (isInvalidTodoList) {\r\n      utils.setTodoList([]);\r\n    }\r\n  } catch (e) {\r\n    utils.setTodoList([]);\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://todolistjs/./js/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;