class Handler {
  constructor() {
    this.todo = [];
    this.todoIdCounter = 0;
    this.projectName = "";
    this.selectedProject = null;
  }

  createButton(text, id) {
    const button = document.createElement("button");
    button.textContent = text;
    button.id = id;

    return button;
  }

  createInput(type, placeholder, required) {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.required = required;

    return input;
  }

  createTodoContainer() {
    const container = document.createElement("div");
    container.classList.add("todoContainer");

    return container;
  }

  createItemContainer() {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("itemContainer");

    return itemContainer;
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

      if (todo.isPriority && inboxContainer) {
        todoItem.classList.add("priority");
        inboxContainer.prepend(todoItem);
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

  removeTodoFromList(todo) {
    const index = this.todo.indexOf(todo);
    if (index !== -1) {
      this.todo.splice(index, 1);
      const todoItem = document.querySelector(`.todo-id-${todo.id}`);
      if (todoItem) {
        todoItem.remove();
      }
    }
  }

  clearList(container) {
    const itemContainer = container.querySelector(".itemContainer");
    if (itemContainer) {
      while (itemContainer.firstChild) {
        itemContainer.removeChild(itemContainer.firstChild);
      }
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

    return this.todo.filter((todo) => {
      const todoDueDate = new Date(todo.date);

      if (includeTime) {
        return todoDueDate >= startOfDate && todoDueDate <= endOfDate;
      } else {
        return todoDueDate >= startOfDate && todoDueDate <= endOfDate;
      }
    });
  }
}

export default Handler;
