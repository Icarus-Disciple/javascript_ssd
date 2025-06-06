const todoList = [
  {task: 'make dinner',
    dueDate: '2022-11-11'
  },
  {task: 'wash dishes',
    dueDate: '2022-12-22'
  }
];

renderTodoList();

function renderTodoList() {
  let todoListHTML = ``;

  todoList.forEach((todoObject, index ) => {
    const {task, dueDate} = todoObject;
    const html = `
      <div>${task}</div>
      <div>${dueDate}</div>
      <button class="delete-button js-delete-button">Delete</button>
    `;

    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
      })});
}


document.querySelector('.js-add-button').addEventListener('click', () => {addTodo()});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const inputDate = document.querySelector('.js-date-input');

  const task = inputElement.value;
  const dueDate = inputDate.value;
  todoList.push({task, dueDate});

  inputElement.value = ""; //resetting the input box so that it shows the original placeholder value
  inputDate.value = "2025-05-05";
  renderTodoList();
}