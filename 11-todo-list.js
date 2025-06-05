const todoList = [
  {task: 'make dinner',
    dueDate: '2022-11-11'
  },
  {task: 'wash dishes',
    dueDate: '2022-12-22'
  }
];

function renderTodoList() {
  let todoListHTML = ``;

  for (let i=0; i<todoList.length; i++) {
    const todoObject = todoList[i];
    //const task = todoObject.task;
    //const dueDate = todoObject.dueDate;
    const {task, dueDate} = todoObject;
    const html = `
      <div>${task}</div>
      <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${i}, 1);
        renderTodoList();        
      " class="delete-button">Delete</button>
    `;

    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}


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