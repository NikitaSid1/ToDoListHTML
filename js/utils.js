export const utils = {
  setTodoList: (todoList) => localStorage.setItem('todoList5', JSON.stringify(todoList)),
  getTodoList: () => JSON.parse(localStorage.getItem('todoList2')),
  generateId: () => [...Array(2)].reduce((a) => a + Math.random().toString(36).slice(2), ''),
};

export function checkInitialTodoList() {
  try {
    const todoList = utils.getTodoList();
    const isInvalidTodoList =
      !todoList ||
      !Array.isArray(todoList) ||
      !todoList.every(
        ({ id, content, isDone }) =>
          typeof id === 'string' && typeof content === 'string' && typeof isDone === 'boolean'
      );

    if (isInvalidTodoList) {
      utils.setTodoList([]);
    }
  } catch (e) {
    utils.setTodoList([]);
  }
}
