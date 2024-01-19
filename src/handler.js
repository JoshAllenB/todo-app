class Handler {
  constructor() {
    this.todos = [];
    this.todoIdCounter = 0;
  }

  createButton(text, id) {
    const button = document.createElement("button");
    button.textContent = text;
    button.id = id;

    return button;
  }

  createTodoListForm() {
    const existingForm = document.querySelector(".todo-form");
    if (existingForm) {
      return existingForm;
    }

    const form = document.createElement("form");
    form.classList.add("todo-form");

    const nameInput = this.createInput("text", "Todo Name", true);
    const dateInput = this.createInput("date", "", true);

    const addButton = this.createButton("Add Todo", "addBtn");
    addButton.addEventListener("click", (event) => {
      event.preventDefault();

      const name = nameInput.value;
      const date = dateInput.value;

      if (name && date) {
        this.addTodoToInbox(name, date);
        nameInput.value = "";
        dateInput.value = "";
      }
    });

    form.appendChild(nameInput);
    form.appendChild(dateInput);
    form.appendChild(addButton);

    const formContainer = document.querySelector(".form-container");
    formContainer.appendChild(form);

    return form;
  }

  createInput(type, placeholder, required) {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.required = required;

    return input;
  }

  createTodoItem(todo, inboxContainer) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.setAttribute("data-todo-id", todo.id);

    console.log("Creating todo item:", todo);

    const checkboxContainer = this.createCheckboxContainer(todo);

    const nameLabel = document.createElement("span");
    nameLabel.textContent = todo.name;

    const dateLabel = document.createElement("span");
    dateLabel.textContent = todo.date;
    console.log("Date Label Value:", dateLabel.textContent);

    const priorityIcon = this.createPriorityIcon(
      todo,
      todoItem,
      inboxContainer
    );

    todoItem.appendChild(checkboxContainer);
    todoItem.appendChild(nameLabel);
    todoItem.appendChild(dateLabel);
    todoItem.appendChild(priorityIcon);

    console.log("Todo Item created:", todoItem);

    return todoItem;
  }

  createCheckboxContainer(todo) {
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        setTimeout(() => {
          this.removeTodoFromList(todo);
          console.log("checkbox clicked");
        }, 500);
      }
    });

    const checkmarkSpan = document.createElement("span");
    checkmarkSpan.classList.add("checkmark");

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkmarkSpan);

    return checkboxContainer;
  }

  createPriorityIcon(todo, todoItem, inboxContainer) {
    const priorityIcon = document.createElement("i");
    priorityIcon.classList.add(
      "priority-icon",
      todo.isPriority ? "fa-solid" : "fa-regular",
      "fa-star"
    );
    priorityIcon.addEventListener("click", () => {
      todo.isPriority = !todo.isPriority;
      priorityIcon.classList.toggle("fa-regular", !todo.isPriority);
      priorityIcon.classList.toggle("fa-solid", todo.isPriority);
      console.log("priority icon clicked");
      console.log("Updated todo:", todo);

      this.updatePriorityIcon(todo);

      if (todo.isPriority) {
        todoItem.classList.add("priority");
        inboxContainer.prepend(todoItem);
        console.log("Priority!", this.todos);
      }
    });

    return priorityIcon;
  }

  updatePriorityIcon(todo) {
    const otherPages = document.querySelectorAll(
      ".content > div:not(.sideMenu)"
    );

    otherPages.forEach((page) => {
      const todoItem = page.querySelector(
        `.todo-item[data-todo-id="${todo.id}"]`
      );
      if (todoItem) {
        const priorityIcon = todoItem.querySelector(".priority-icon");
        if (priorityIcon) {
          priorityIcon.classList.toggle("fa-regular", !todo.isPriority);
          priorityIcon.classList.toggle("fa-solid", todo.isPriority);
        }
      }
    });
  }

  addTodoToInbox(name, date) {
    const todoItemContainer = document.querySelector(".todo-item-container");

    const todo = {
      id: this.todoIdCounter++,
      name,
      date,
      isPriority: false,
    };

    this.todos.push(todo);

    console.log("Current Todos:", this.todos);

    const todoItem = this.createTodoItem(todo, todoItemContainer);

    if (todo.isPriority) {
      todoItem.classList.add("priority");
    }
    todoItemContainer.appendChild(todoItem);

    this.arrangeInbox(todoItemContainer);
  }

  removeTodoFromList(todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  filterByDueDate(startDate, endDate, includeTime = false) {
    const startOfDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    const endOfDate = endDate
      ? new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
          23,
          59,
          58
        )
      : new Date(
          startOfDate.getFullYear(),
          startOfDate.getMonth(),
          startOfDate.getDate(),
          23,
          59,
          59
        );

    return this.todos.filter((todo) => {
      const todoDueDate = new Date(todo.date);

      if (includeTime) {
        return todoDueDate >= startOfDate && todoDueDate <= endOfDate;
      } else {
        return todoDueDate >= startOfDate && todoDueDate <= endOfDate;
      }
    });
  }

  arrangeInbox(inboxContainer) {
    const todoItems = Array.from(
      inboxContainer.getElementsByClassName("todo-item")
    );

    const regularTodos = todoItems.filter(
      (todoItem) => !todoItem.classList.contains("priority")
    );
    const priorityTodos = todoItems.filter((todoItem) =>
      todoItem.classList.contains("priority")
    );

    const sortDate = (a, b) => {
      const dateA = new Date(a.querySelector("span:nth-child(3)").textContent);
      const dateB = new Date(b.querySelector("span:nth-child(3)").textContent);
      return dateA - dateB;
    };

    priorityTodos.sort((a, b) => {
      const dateA = new Date(a.querySelector("span:nth-child(3)").textContent);
      const dateB = new Date(b.querySelector("span:nth-child(3)").textContent);

      if (dateA.getTime() === dateB.getTime()) {
        const priorityA = a.classList.contains("priority") ? 1 : 0;
        const priorityB = b.classList.contains("priority") ? 1 : 0;
        return priorityB - priorityA;
      }

      return dateA - dateB;
    });

    regularTodos.sort(sortDate);
    inboxContainer.innerHTML = "";

    priorityTodos.forEach((todoItem) => {
      inboxContainer.appendChild(todoItem);
    });

    regularTodos.forEach((todoItem) => {
      inboxContainer.appendChild(todoItem);
    });
  }

  initHandler() {
    this.createTodoListForm();
  }
}

export default Handler;
