import Handler from "./handler";

class Todo {
  constructor() {
    this.handler = new Handler();
    this.todo = [];
    this.todoIdCounter = 0;
    // this.handler.setTodoList(this.todo);
    this.todoContainer = null;
  }

  setTodoContainer(container) {
    this.todoContainer = container;
  }

  createTodoListForm() {
    const todoContainer = this.handler.createTodoContainer();
    const itemContainer = this.handler.createItemContainer();

    const formContainer = document.createElement("div");
    formContainer.classList.add("formContainer");

    const form = document.createElement("form");
    form.classList.add("todo-form");

    const nameInput = this.handler.createInput("text", "Todo Name", true);
    nameInput.classList.add("name-input");

    const dateInput = this.handler.createInput("date", "", true);
    dateInput.classList.add("date-input");

    const addBtn = this.handler.createButton("Add Todo", "addBtn");
    addBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.createTodo();
    });

    form.appendChild(nameInput);
    form.appendChild(dateInput);
    form.appendChild(addBtn);
    formContainer.appendChild(form);
    todoContainer.appendChild(formContainer);
    todoContainer.appendChild(itemContainer);

    return todoContainer;
  }

  createTodo() {
    const nameInput = document.querySelector(".name-input");
    const dateInput = document.querySelector(".date-input");

    const todo = {
      id: this.todoIdCounter++,
      name: nameInput.value,
      date: dateInput.value,
    };

    this.todo.push(todo);
    this.todo.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    nameInput.value = "";
    dateInput.value = "";

    const itemContainer = document.querySelector(".itemContainer");
    itemContainer.innerHTML = "";

    this.todo.forEach((todo) => {
      this.createTodoItem(todo);
      console.log(this.todo);
    });
  }

  createTodoItem(todo) {
    const nameLabel = document.createElement("h5");
    const dateLabel = document.createElement("h5");

    const todoItem = document.createElement("li");
    todoItem.classList.add(`todo-${todo.id}`, "todoItem");

    const checkboxContainer = this.handler.createCheckboxContainer(todo);
    const checkbox = checkboxContainer.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        setTimeout(() => {
          this.removeTodoItem(todo.id);
        }, 500);
      }
    });

    nameLabel.textContent = todo.name;
    dateLabel.textContent = todo.date;

    const priorityIcon = this.handler.createPriorityIcon(todo, todoItem);
    priorityIcon.addEventListener("click", () => {
      this.togglePriority(todo.id);
    });

    todoItem.appendChild(checkboxContainer);
    todoItem.appendChild(nameLabel);
    todoItem.appendChild(dateLabel);
    todoItem.appendChild(priorityIcon);

    const itemContainer = document.querySelector(".itemContainer");

    itemContainer.appendChild(todoItem);
  }

  removeTodoItem(todoId) {
    const index = this.todo.findIndex((item) => item.id === todoId);
    if (index !== -1) {
      this.todo.splice(index, 1);
      this.reorderTodo();
    }
  }

  togglePriority(todoId) {
    const todo = this.todo.find((item) => item.id === todoId);
    if (todo) {
      todo.priority = !todo.priority;
      this.reorderTodo();
    }
  }

  reorderTodo() {
    this.todo.sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      // If both have priority or neither, sort by date
      return new Date(a.date) - new Date(b.date);
    });

    const itemContainer = document.querySelector(".itemContainer");
    itemContainer.innerHTML = "";

    this.todo.forEach((todo) => {
      this.createTodoItem(todo);
    });
  }
}
export default Todo;
