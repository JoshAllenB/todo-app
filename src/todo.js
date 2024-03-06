import Handler from "./handler";

class Todo {
  constructor() {
    this.handler = new Handler();
    this.todo = [];
    this.todoIdCounter = 0;
    this.todoContainer = null;
    this.loadTodoList();
  }

  /**
   * Sets the DOM element that contains the todo list
   * @param {HTMLElement} container - The DOM element that contains the todo list
   */
  setTodoContainer(container) {
    this.todoContainer = container;
  }

  /**
   * Creates the form for adding new todos
   * @returns {HTMLDivElement} The form element
   */
  createTodoListForm() {
    const todoContainer = this.handler.createTodoContainer();
    const itemContainer = this.handler.createItemContainer();

    const formContainer = document.createElement("div");
    formContainer.classList.add("formContainer");

    const form = document.createElement("form");
    form.classList.add("todo-form");

    /**
     * Creates an input element with the specified type and placeholder
     * @param {string} type - The input type
     * @param {string} placeholder - The input placeholder
     * @param {boolean} required - Whether the input is required
     * @returns {HTMLInputElement} The input element
     */
    const createInput = (type, placeholder, required) => {
      const input = document.createElement("input");
      input.setAttribute("type", type);
      input.setAttribute("placeholder", placeholder);
      input.setAttribute("required", required);
      return input;
    };

    /**
     * Creates a button with the specified text and class name
     * @param {string} text - The button text
     * @param {string} className - The button class name
     * @returns {HTMLButtonElement} The button element
     */
    const createButton = (text, className) => {
      const button = document.createElement("button");
      button.textContent = text;
      button.classList.add(className);
      return button;
    };

    const nameInput = createInput("text", "Todo Name", true);
    nameInput.classList.add("name-input");

    const dateInput = createInput("date", "", true);
    dateInput.classList.add("date-input");

    const addBtn = createButton("Add Todo", "addBtn");
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

  /**
   * Creates a new todo item
   */
  createTodo() {
    const nameInput = document.querySelector(".name-input");
    const dateInput = document.querySelector(".date-input");

    /**
     * @type {{ id: number, name: string, date: string, priority: boolean }[]}
     */
    const todo = {
      id: this.todoIdCounter++,
      name: nameInput.value,
      date: dateInput.value,
      priority: false,
    };

    this.todo.push(todo);
    this.todo.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    nameInput.value = "";
    dateInput.value = "";

    this.saveTodoList();

    const itemContainer = document.querySelector(".itemContainer");
    itemContainer.innerHTML = "";

    this.todo.forEach((todo) => {
      this.createTodoItem(todo);
      console.log(this.todo);
    });
  }

  /**
   * Creates a new todo item
   * @param {object} todo - The todo object
   */
  createTodoItem(todo) {
    const nameLabel = document.createElement("h5");
    const dateLabel = document.createElement("h5");

    const todoItem = document.createElement("li");
    todoItem.classList.add(`todo-${todo.id}`, "todoItem");

    /**
     * Creates the checkbox container for the todo item
     * @param {object} todo - The todo object
     * @returns {HTMLDivElement} The checkbox container element
     */
    const checkboxContainer = this.handler.createCheckboxContainer(todo);

    /**
     * Gets the checkbox element from the checkbox container
     * @type {HTMLInputElement}
     */
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

    /**
     * Creates the priority icon for the todo item
     * @param {object} todo - The todo object
     * @param {HTMLLIElement} todoItem - The todo item element
     * @returns {HTMLSpanElement} The priority icon element
     */
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

  /**
   * Removes a todo item from the list
   * @param {number} todoId - The id of the todo item to remove
   */
  removeTodoItem(todoId) {
    const index = this.todo.findIndex((item) => item.id === todoId);
    if (index !== -1) {
      this.todo.splice(index, 1);
      this.reorderTodo();
    }
    this.saveTodoList();
  }

  /**
   * Toggles the priority of a todo item
   * @param {number} todoId - The id of the todo item to toggle the priority of
   */
  togglePriority(todoId) {
    const todo = this.todo.find((item) => item.id === todoId);
    if (todo) {
      todo.priority = !todo.priority;
      this.reorderTodo();
    }
    this.saveTodoList();
  }

  /**
   * Reorders the todo list based on the priority and date
   */
  reorderTodo() {
    /**
     * @type {{ id: number, name: string, date: string, priority: boolean }[]}
     */
    const todo = this.todo;

    todo.sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      return new Date(a.date) - new Date(b.date);
    });

    const itemContainer = document.querySelector(".itemContainer");
    itemContainer.innerHTML = "";

    todo.forEach((todo) => {
      this.createTodoItem(todo);
    });
  }

  /**
   * Saves the todo list to local storage
   */
  saveTodoList() {
    localStorage.setItem("todoList", JSON.stringify(this.todo));
  }

  /**
   * Loads the todo list from local storage
   */
  loadTodoList() {
    /**
     * @type {{ id: number, name: string, date: string, priority: boolean }[]}
     */
    const todoListData = JSON.parse(localStorage.getItem("todoList")) || [];
    this.todo = todoListData;
  }

  /**
   * Renders the todo list
   */
  renderTodoList() {
    const itemContainer = document.querySelector(".itemContainer");
    itemContainer.innerHTML = "";

    this.todo.forEach((todo) => {
      const nameLabel = document.createElement("h5");
      const dateLabel = document.createElement("h5");

      /**
       * Creates a new h5 element with the specified text content
       * @param {string} text - The text content of the h5 element
       * @returns {HTMLHeadingElement} The h5 element
       */
      const createLabel = (text) => {
        const label = document.createElement("h5");
        label.textContent = text;
        return label;
      };

      const todoItem = document.createElement("li");
      todoItem.classList.add(`todo-${todo.id}`, "todoItem");

      /**
       * Creates the checkbox container for the todo item
       * @param {object} todo - The todo object
       * @returns {HTMLDivElement} The checkbox container element
       */
      const checkboxContainer = this.handler.createCheckboxContainer(todo);

      /**
       * Gets the checkbox element from the checkbox container
       * @type {HTMLInputElement}
       */
      const checkbox = checkboxContainer.querySelector(
        "input[type='checkbox']"
      );
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          setTimeout(() => {
            this.removeTodoItem(todo.id);
          }, 500);
        }
      });

      nameLabel.textContent = todo.name;
      dateLabel.textContent = todo.date;

      /**
       * Creates the priority icon for the todo item
       * @param {object} todo - The todo object
       * @param {HTMLLIElement} todoItem - The todo item element
       * @returns {HTMLSpanElement} The priority icon element
       */
      const priorityIcon = this.handler.createPriorityIcon(todo, todoItem);
      priorityIcon.addEventListener("click", () => {
        this.togglePriority(todo.id);
      });

      todoItem.appendChild(checkboxContainer);
      todoItem.appendChild(createLabel(todo.name));
      todoItem.appendChild(createLabel(todo.date));
      todoItem.appendChild(priorityIcon);

      itemContainer.appendChild(todoItem);
    });
  }

  /**
   * Exports the todo list as a JSON string
   * @returns {string} The todo list as a JSON string
   */
  exportTodo() {
    return JSON.stringify(this.todo);
  }
}
export default Todo;
