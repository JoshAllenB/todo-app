class Handler {
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

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Todo Name";
    nameInput.required = true;

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.required = true;

    const addButton = document.createElement("button");
    addButton.classList.add("addBtn");
    addButton.textContent = "Add Todo";

    addButton.addEventListener("click", (event) => {
      event.preventDefault();

      this.addTodoToInbox(nameInput.value, dateInput.value);
      nameInput.value = "";
      dateInput.value = "";
    });

    form.appendChild(nameInput);
    form.appendChild(dateInput);
    form.appendChild(addButton);

    const formContainer = document.querySelector(".form-container");
    formContainer.appendChild(form);

    return form;
  }

  createTodoItem(name, date, isPriority) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    // Checkbox
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        setTimeout(() => {
          todoItem.remove();
          console.log("checkbox clicked");
        }, 500);
      }
    });
    const checkmarkSpan = document.createElement("span");
    checkmarkSpan.classList.add("checkmark");
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkmarkSpan);

    // Name Label
    const nameLabel = document.createElement("span");
    nameLabel.textContent = name;

    // Date Label
    const dateLabel = document.createElement("span");
    dateLabel.textContent = date;

    // Priority Icon
    const priorityIcon = document.createElement("i");
    priorityIcon.classList.add("priority-icon", "fa-star", "fa-regular");

    // Append elements to todoItem
    todoItem.appendChild(checkboxContainer);
    todoItem.appendChild(nameLabel);
    todoItem.appendChild(dateLabel);
    todoItem.appendChild(priorityIcon);

    // Priority icon click event
    priorityIcon.addEventListener("click", () => {
      if (priorityIcon.classList.contains("fa-regular")) {
        priorityIcon.classList.remove("fa-regular");
        priorityIcon.classList.add("fa-solid");
      } else {
        priorityIcon.classList.remove("fa-solid");
        priorityIcon.classList.add("fa-regular");
      }

      console.log("Priority icon clicked");
    });

    return todoItem;
  }

  addTodoToInbox(name, date) {
    const todoItem = this.createTodoItem(name, date, true);
    const todoItemsContainer = document.querySelector(".todo-item-container");
    todoItemsContainer.appendChild(todoItem);

    this.arrangeInbox(todoItemsContainer);
  }

  arrangeInbox(inboxContainer) {
    const todoItems = Array.from(
      inboxContainer.getElementsByClassName("todo-item")
    );

    todoItems.sort((a, b) => {
      const dateA = new Date(a.querySelector("span:nth-child(3)").textContent);
      const dateB = new Date(b.querySelector("span:nth-child(3)").textContent);

      return dateA - dateB;
    });

    inboxContainer.innerHTML = "";
    todoItems.forEach((todoItem) => {
      inboxContainer.appendChild(todoItem);
    });
  }

  initHandler() {
    this.createButton();
    this.createTodoListForm();
  }
}

export default Handler;
