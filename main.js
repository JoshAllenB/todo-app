/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/filter.js":
/*!***********************!*\
  !*** ./src/filter.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isToday.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/startOfWeek.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/endOfWeek.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isWithinInterval.mjs");
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler */ "./src/handler.js");



class Filter {
  constructor() {
    this.handler = new _handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.loadLocalStorage();
    this.todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    this.projectsData = JSON.parse(localStorage.getItem("projects")) || {};

    console.log("Projects data during initialization:", this.projectsData);
  }

  loadLocalStorage() {
    const todoListData = JSON.parse(localStorage.getItem("todoList")) || [];
    const projectsData = JSON.parse(localStorage.getItem("projects")) || {};
    console.log("projects data structure", projectsData);

    const todoDueToday = this.filterDueToday(todoListData);
    const projectDueToday = this.filterProjectsDueToday(projectsData);
    const dueTodayItems = [...todoDueToday, ...projectDueToday];
    console.log("due today", dueTodayItems);

    const todoDueThisWeek = this.filterDueThisWeek(todoListData);
    const projectDueThisWeek = this.filteredProjectsDueThisWeek(projectsData);

    const dueThisWeekItems = [...todoDueThisWeek, ...projectDueThisWeek];
    console.log("due this week", dueThisWeekItems);
  }

  filterDueToday(todoList) {
    return todoList.filter((item) => (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.isToday)(new Date(item.date)));
  }

  filterDueThisWeek(todoList) {
    const startOfWeekDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.startOfWeek)(new Date(), { weekStartsOn: 1 });
    const endOfWeekDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_3__.endOfWeek)(new Date(), { weekStartsOn: 1 });

    return todoList.filter((item) => {
      const dueDate = new Date(item.date);
      return (
        !(0,date_fns__WEBPACK_IMPORTED_MODULE_1__.isToday)(dueDate) &&
        (0,date_fns__WEBPACK_IMPORTED_MODULE_4__.isWithinInterval)(dueDate, {
          start: startOfWeekDate,
          end: endOfWeekDate,
        })
      );
    });
  }

  /**
   * Filters the projects that have items due today.
   *
   * @param {Object} projects - The projects data.
   * @returns {Object} The filtered projects.
   */
  filterProjectsDueToday(projects) {
    const today = new Date();

    const filteredProject = [];

    for (const projectName in projects) {
      const projectItems = projects[projectName];
      const dueTodayItems = projectItems.filter((item) =>
        (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.isToday)(new Date(item.date))
      );

      if (dueTodayItems.length > 0) {
        filteredProject.push({
          projectName: projectName,
          todos: dueTodayItems,
        });
      }
    }
    return filteredProject;
  }

  filteredProjectsDueThisWeek(projects) {
    const startOfWeekDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.startOfWeek)(new Date(), { weekStartsOn: 1 });
    const endOfWeekDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_3__.endOfWeek)(new Date(), { weekStartsOn: 1 });

    const filteredProject = [];

    for (const projectName in projects) {
      const projectItems = projects[projectName];
      const dueThisWeekItems = projectItems.filter((item) => {
        const dueDate = new Date(item.date);
        return (
          !(0,date_fns__WEBPACK_IMPORTED_MODULE_1__.isToday)(dueDate) &&
          (0,date_fns__WEBPACK_IMPORTED_MODULE_4__.isWithinInterval)(dueDate, {
            start: startOfWeekDate,
            end: endOfWeekDate,
          })
        );
      });

      if (dueThisWeekItems.length > 0) {
        filteredProject.push({
          projectName: projectName,
          todos: dueThisWeekItems,
        });
      }
    }
    return filteredProject;
  }

  renderFilteredTodoList(filteredTodoItems, container) {
    if (!container) {
      console.error("Container is null.");
      return;
    }

    let itemContainer = container.querySelector(".itemContainer");
    if (!itemContainer) {
      itemContainer = document.createElement("div");
      itemContainer.classList.add("itemContainer");
      container.appendChild(itemContainer);
    } else {
      itemContainer.innerHTML = "";
    }

    filteredTodoItems.forEach((item) => {
      if (item.todos) {
        // This is a project item
        const projectName = document.createElement("h3");
        projectName.textContent = `Project: ${item.projectName}`;
        itemContainer.appendChild(projectName);

        item.todos.forEach((todo) => {
          const nameLabel = document.createElement("h5");
          const dateLabel = document.createElement("h5");

          const todoItem = document.createElement("li");
          todoItem.classList.add(`todo-${todo.id}`, "todoItem");

          const checkboxContainer = this.handler.createCheckboxContainer(todo);
          const checkbox = checkboxContainer.querySelector(
            "input[type='checkbox']"
          );

          // Set ID for the checkbox
          checkbox.id = `${item.projectName}-todo-${todo.id}`;

          checkbox.addEventListener("change", () => {
            console.log("checkbox checked in:", checkbox.id);
            if (checkbox.checked) {
              const projectName = checkbox.id.split("-")[0]; // Extract projectName from checkbox ID
              setTimeout(() => {
                console.log("projects data after checked:", this.projectsData);
                console.log(
                  "removing todo in",
                  checkbox.id,
                  "todo removed:",
                  todo.id,
                  "project name:",
                  projectName
                );
                this.removeTodoFromProject(todo.id, projectName); // Pass projectName to removeTodoItem
              }, 500);
            }
          });

          nameLabel.textContent = todo.name;
          dateLabel.textContent = todo.date;

          const priorityIcon = this.handler.createPriorityIcon(todo, todoItem);
          priorityIcon.addEventListener("click", () => {
            this.togglePriority(todo.id, projectName);
          });

          todoItem.appendChild(checkboxContainer);
          todoItem.appendChild(nameLabel);
          todoItem.appendChild(dateLabel);
          todoItem.appendChild(priorityIcon);

          itemContainer.appendChild(todoItem);
        });
      } else {
        // This is a todo item from todoList
        const nameLabel = document.createElement("h5");
        const dateLabel = document.createElement("h5");

        const todoItem = document.createElement("li");
        todoItem.classList.add(`todo-${item.id}`, "todoItem");

        const checkboxContainer = this.handler.createCheckboxContainer(item);
        const checkbox = checkboxContainer.querySelector(
          "input[type='checkbox']"
        );

        // Set ID for the checkbox
        checkbox.id = `todo-checkbox-${item.id}`;

        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            setTimeout(() => {
              this.removeTodoItem(item.id);
              console.log("item checked", item.id);
            }, 500);
          }
        });

        nameLabel.textContent = item.name;
        dateLabel.textContent = item.date;

        const priorityIcon = this.handler.createPriorityIcon(item, todoItem);
        priorityIcon.addEventListener("click", () => {
          this.togglePriority(item.id);
        });

        todoItem.appendChild(checkboxContainer);
        todoItem.appendChild(nameLabel);
        todoItem.appendChild(dateLabel);
        todoItem.appendChild(priorityIcon);

        itemContainer.appendChild(todoItem);
      }
    });
  }

  // Method to update the DOM with the filtered todo list
  updateTodoListUI(filteredTodoItems, container) {
    container.innerHTML = ""; // Clear the container
    filteredTodoItems.forEach((item) => {
      const todoItem = document.createElement("li");
      todoItem.textContent = item.name;
      container.appendChild(todoItem);
    });
  }

  removeTodoItem(todoId) {
    const todoIndex = this.todoList.findIndex((item) => item.id === todoId);
    if (todoIndex !== -1) {
      this.todoList.splice(todoIndex, 1);
      this.saveTodoList();
      this.reorderTodo();
      console.log(`Todo removed from todoList: ${todoId}`);
    } else {
      console.log(`Todo with ID ${todoId} not found in todoList.`);
    }
  }

  removeTodoFromProject(todoId, projectName) {
    console.log("projects data before removal:", this.projectsData);
    const projectItems = this.projectsData[projectName];
    console.log(`removing todo with ID ${todoId} from project: ${projectName}`);
    if (!projectItems) {
      console.log(`Project ${projectName} not found.`);
      return;
    }

    const todoIndex = projectItems.findIndex((item) => item.id === todoId);
    if (todoIndex !== -1) {
      projectItems.splice(todoIndex, 1);
      this.saveProjectsData();
      this.reorderTodo();
      console.log(`Todo removed from project: ${todoId} in ${projectName}`);
    } else {
      console.log(
        `Todo with ID ${todoId} not found in project ${projectName}.`
      );
    }
    this.renderFilteredTodoList();
  }

  togglePriority(todoId) {
    // Check if the todo is in the todoList
    const todoInTodoList = this.todoList.find((item) => item.id === todoId);
    if (todoInTodoList) {
      // Toggle the priority of the todo in the todoList
      todoInTodoList.priority = !todoInTodoList.priority;
      todoInTodoList.isPriority = todoInTodoList.priority;
      this.saveTodoList();
      return;
    }

    // Check if the todo is in any project
    for (const projectName in this.projectsData) {
      const projectItems = this.projectsData[projectName];
      const todoInProject = projectItems.find((item) => item.id === todoId);
      if (todoInProject) {
        // Toggle the priority of the todo in the project
        todoInProject.priority = !todoInProject.priority;
        todoInProject.isPriority = todoInProject.priority;
        this.saveProjectsData();
        break;
      }
    }
  }

  reorderTodo() {
    // Create a new array to hold all todo items
    const allTodoItems = [];

    // Push all todo items from todoList into the array
    this.todoList.forEach((todo) => allTodoItems.push(todo));

    // Push all todo items from projectsData into the array
    for (const projectName in this.projectsData) {
      const projectItems = this.projectsData[projectName];
      projectItems.forEach((item) => allTodoItems.push(item));
    }

    // Sort the array based on priority and date
    allTodoItems.sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      return new Date(a.date) - new Date(b.date);
    });

    // Clear the existing container
    const itemContainer = document.querySelector(".itemContainer");
    itemContainer.innerHTML = "";

    // Render the sorted todo items
    allTodoItems.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.textContent = todo.name;
      itemContainer.appendChild(todoItem);
    });
  }

  saveTodoList() {
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
  }

  saveProjectsData() {
    localStorage.setItem("projects", JSON.stringify(this.projectsData));
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Filter);


/***/ }),

/***/ "./src/handler.js":
/*!************************!*\
  !*** ./src/handler.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

  createFilteredContainer() {
    const filteredTodo = document.createElement("div");
    filteredTodo.classList.add("filteredContainer");

    return filteredTodo;
  }

  createCheckboxContainer(todo) {
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Handler);


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler */ "./src/handler.js");


class Project {
  constructor() {
    this.handler = new _handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.projects = {};
    this.projectIdCounter = 0;
    this.projectContainer = null;
    document.addEventListener("DOMContentLoaded", () => {
      this.loadProjects();
      this.loadTodos();
    });
  }

  /**
   * Load the projects from local storage and display them in the UI.
   */
  loadProjects() {
    const projectsData = JSON.parse(localStorage.getItem("projects")) || {};
    this.projects = projectsData;

    this.recreateProjectButton();

    for (const projectName in this.projects) {
      if (this.projects.hasOwnProperty(projectName)) {
        /**
         * Get the project data and create the todo form container for the project.
         * @param {string} projectName - The name of the project
         */
        const projectData = this.projects[projectName];
        const todoFormContainer = this.createProjectTodoForm(projectName);
        const itemContainer = todoFormContainer.querySelector(".itemContainer");

        /**
         * Loop through the project data and create a todo item for each todo.
         * @param {Object} todo - The todo object
         * @param {string} projectName - The name of the project
         * @param {HTMLElement} itemContainer - The item container element
         */
        projectData.forEach((todo) => {
          this.createProjectTodoItem(todo, projectName, itemContainer);
        });
      }
    }
  }

  /**
   * Load the todos from local storage and display them in the UI.
   */
  loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || {};

    Object.keys(storedTodos).forEach((projectName) => {
      if (this.projects[projectName]) {
        // Check if the project exists
        this.projects[projectName] = storedTodos[projectName]; // Update project todos
        this.projects[projectName].forEach((todo) => {
          this.createProjectTodoItem(todo, projectName);
        });
      } else {
        this.projects[projectName] = storedTodos[projectName]; // Add project with its todos
      }
    });
  }

  /**
   * Set the project container element
   * @param {HTMLElement} container - The project container element
   */
  setProjectContainer(container) {
    this.projectContainer = container;
  }

  /**
   * Creates a new project name input element
   */
  createProjectName() {
    const project = document.querySelector(".project");
    const projList = document.querySelector(".projectList");

    let formContainer = document.querySelector(".projFormContainer");
    let todoFormCreated = false;

    if (!formContainer) {
      formContainer = document.createElement("div");
      formContainer.classList.add("projFormContainer");

      const projectForm = document.createElement("form");
      projectForm.classList.add("projForm");

      const projName = this.handler.createInput("text", "Project Name");
      projName.classList.add("projName");

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("btnContainer");

      const submit = this.handler.createButton("Submit", "submitProj");

      const cancel = this.handler.createButton("Cancel", "cancelProj");

      projectForm.appendChild(projName);
      btnContainer.appendChild(submit);
      btnContainer.appendChild(cancel);
      formContainer.appendChild(projectForm);
      formContainer.appendChild(btnContainer);

      /**
       * Event listener for the submit button, creates a new project with the given name
       * @param {Event} event - The submit event
       */
      submit.addEventListener("click", (event) => {
        event.preventDefault();
        const projectName = projName.value.trim();
        if (projectName !== "") {
          let projBtn = document.getElementById(projectName);

          if (!projBtn) {
            projBtn = document.createElement("div");
            projBtn.classList.add("projBtn");
            projBtn.id = projectName;

            projBtn.addEventListener("click", () => {
              if (!todoFormCreated) {
                this.showProjectForm(projectName);
                this.createProjectTodoForm(projectName);
                todoFormCreated = true;
                console.log("project btn clicked");
              } else {
                this.hideProjectForm();
                this.showProjectForm(projectName);
              }
            });
            projList.appendChild(projBtn);
            this.saveProject(projectName);
          }

          const projectButton = document.createElement("button");
          projectButton.textContent = projectName;
          projectButton.classList.add("projectBtn");
          projectButton.id = projectName;

          const deleteProj = document.createElement("button");
          deleteProj.textContent = "X";
          deleteProj.classList.add("deleteBtn");
          deleteProj.id = `${projectName}-deleteBtn`;

          /**
           * Event listener for the delete project button, removes the project and its form from the DOM
           * @param {Event} event - The delete project event
           */
          deleteProj.addEventListener("click", (event) => {
            const projectId = deleteProj.id;
            const projectName = projectId.replace("-deleteBtn", "");
            const projBtn = document.getElementById(projectName);

            projBtn.remove();

            const todoFormContainer = document.getElementById(
              `${projectName}-form`
            );

            if (todoFormContainer) {
              todoFormContainer.remove();
            }

            delete this.projects[projectName];
            this.removeProject(projectName);
          });

          projBtn.appendChild(projectButton);
          projBtn.appendChild(deleteProj);

          formContainer.remove();
        }
      });

      /**
       * Event listener for the cancel button, removes the project form from the DOM
       * @param {Event} event - The cancel event
       */
      cancel.addEventListener("click", (event) => {
        event.preventDefault();
        formContainer.remove();
      });

      project.appendChild(formContainer);
      this.recreateProjectButton();
    }
  }

  /**
   * Show the project form for the given project name
   * @param {string} projectName - The name of the project
   */
  showProjectForm(projectName) {
    const allTodoForms = document.querySelectorAll(".projectTodoContainer");
    allTodoForms.forEach((form) => {
      form.classList.add("hidden");
    });

    const todoForm = document.getElementById(`${projectName}-form`);
    if (todoForm) {
      todoForm.classList.remove("hidden");
    }
  }

  /**
   * Hides all the project forms
   */
  hideProjectForm() {
    const allTodoForm = document.querySelectorAll(".projectTodoContainer");
    allTodoForm.forEach((form) => {
      form.classList.add("hidden");
    });
  }

  /**
   * Creates a new project form for the given project name
   * @param {string} projectName - The name of the project
   */
  createProjectTodoForm(projectName) {
    const projectContainer = document.querySelector(".projectContainer");
    const todoFormContainerId = `${projectName}-form`;

    let todoFormContainer = document.getElementById(todoFormContainerId);

    if (!todoFormContainer) {
      todoFormContainer = document.createElement("div");
      todoFormContainer.classList.add("projectTodoContainer");
      todoFormContainer.id = todoFormContainerId;

      const todoContainer = this.handler.createTodoContainer();

      const itemContainer = this.handler.createItemContainer();
      itemContainer.id = `${projectName}-itemContainer`;

      const formContainer = document.createElement("div");
      formContainer.classList.add("formContainer");

      const form = document.createElement("form");
      form.classList.add("todo-form");
      form.id = `${projectName}-form`;

      const nameInput = this.handler.createInput("text", "Todo Name", true);
      nameInput.classList.add("name-input");
      nameInput.id = `${projectName}-input`;

      const dateInput = this.handler.createInput("date", "", true);
      dateInput.classList.add("date-input");
      dateInput.id = `${projectName}-date-input`;

      const addBtn = this.handler.createButton("Add Todo", "addBtn");
      addBtn.classList.add("addBtn");
      addBtn.id = `${projectName}-addBtn`;
      addBtn.addEventListener("click", (event) => {
        event.preventDefault();
        this.reorderTodo();
        this.createProjectTodo(projectName);
        console.log(this.projects[projectName]);
      });

      form.appendChild(nameInput);
      form.appendChild(dateInput);
      form.appendChild(addBtn);
      formContainer.appendChild(form);
      todoContainer.appendChild(formContainer);
      todoContainer.appendChild(itemContainer);

      todoFormContainer.appendChild(todoContainer);

      projectContainer.appendChild(todoFormContainer);
    }

    if (!this.projects[projectName]) {
      this.projects[projectName] = [];
    }

    return todoFormContainer;
  }

  /**
   * Creates a new project todo with the given project name
   * @param {string} projectName - The name of the project
   */
  createProjectTodo(projectName) {
    const nameInput = document.querySelector(`#${projectName}-input`);
    const dateInput = document.querySelector(`#${projectName}-date-input`);

    /**
     * The project todo object
     * @typedef {Object} ProjectTodo
     * @property {number} id - The id of the todo
     * @property {string} name - The name of the todo
     * @property {string} proj - The name of the project
     * @property {string} date - The date of the todo
     */

    /**
     * Creates a new project todo object
     * @param {string} projectName - The name of the project
     * @returns {ProjectTodo} The project todo object
     */
    const projectTodo = {
      id: this.projectIdCounter++,
      name: nameInput.value,
      proj: projectName,
      date: dateInput.value,
    };

    if (!this.projects[projectName]) {
      this.projects[projectName] = [];
    }

    this.projects[projectName].push(projectTodo);
    this.projects[projectName].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    nameInput.value = "";
    dateInput.value = "";

    const itemContainer = document.getElementById(
      `${projectName}-itemContainer`
    );

    if (itemContainer) {
      itemContainer.innerHTML = "";

      this.projects[projectName].forEach((todo) => {
        this.createProjectTodoItem(todo, projectName);
      });
    } else {
      console.error(
        "Item Container with ID ${projectName}-itemContainer not found"
      );
    }
    this.saveProjectTodos();
    return projectTodo;
  }

  /**
   * Creates a new project todo item with the given project name
   * @param {Object} todo - The todo object
   * @param {string} projectName - The name of the project
   */
  createProjectTodoItem(todo, projectName) {
    const nameLabel = document.createElement("h5");
    const dateLabel = document.createElement("h5");

    const todoItem = document.createElement("li");
    todoItem.classList.add(`todo-${todo.id}`, "todoItem");

    /**
     * Creates a new checkbox container for the given todo
     * @param {Object} todo - The todo object
     * @returns {HTMLDivElement} The checkbox container element
     */
    const checkboxContainer = this.handler.createCheckboxContainer(todo);

    /**
     * The checkbox element within the container
     * @type {HTMLInputElement}
     */
    const checkbox = checkboxContainer.querySelector("input[type='checkbox']");

    /**
     * Event listener for the checkbox, removes the todo item if the checkbox is checked
     */
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        setTimeout(() => {
          this.removeTodoItem(todo.id, projectName);
        }, 500);
      }
    });

    nameLabel.textContent = todo.name;
    dateLabel.textContent = todo.date;

    /**
     * Creates a new priority icon for the given todo and todo item
     * @param {Object} todo - The todo object
     * @param {HTMLElement} todoItem - The todo item element
     * @returns {HTMLElement} The priority icon element
     */
    const priorityIcon = this.handler.createPriorityIcon(todo, todoItem);

    /**
     * Event listener for the priority icon, toggles the priority of the todo
     */
    priorityIcon.addEventListener("click", () => {
      this.togglePriority(todo.id, projectName);
    });

    todoItem.appendChild(checkboxContainer);
    todoItem.appendChild(nameLabel);
    todoItem.appendChild(dateLabel);
    todoItem.appendChild(priorityIcon);

    const itemContainer = document.getElementById(
      `${projectName}-itemContainer`
    );

    itemContainer.appendChild(todoItem);
  }

  /**
   * Removes a todo item from the given project
   * @param {number} todoId - The id of the todo item
   * @param {string} projectName - The name of the project
   */
  removeTodoItem(todoId, projectName) {
    const projectTodos = this.projects[projectName];
    if (projectTodos) {
      const index = projectTodos.findIndex((item) => item.id === todoId);
      if (index !== -1) {
        projectTodos.splice(index, 1);
        this.reorderTodo(projectName);
        // Update local storage
        this.saveProjectTodos();
      }
    }
  }

  /**
   * Toggles the priority of a todo with the given id in the given project
   * @param {number} todoId - The id of the todo
   * @param {string} projectName - The name of the project
   */
  togglePriority(todoId, projectName) {
    const projectTodos = this.projects[projectName];
    if (projectTodos) {
      const todo = projectTodos.find((item) => item.id === todoId);
      if (todo) {
        todo.priority = !todo.priority;
        this.reorderTodo(projectName);
        // Update local storage
        this.saveProjectTodos();
      }
    }
  }

  /**
   * Reorders the todo items in the given project based on their priority and date.
   * If two todos have the same priority, the one with the earliest date is moved to the top.
   * @param {string} projectName - The name of the project
   */
  reorderTodo(projectName) {
    if (this.projects[projectName]) {
      this.projects[projectName].sort((a, b) => {
        if (a.priority === b.priority) {
          return new Date(a.date) - new Date(b.date);
        }
        // If only one has priority, prioritize it
        return a.priority ? -1 : 1;
      });

      const itemContainer = document.getElementById(
        `${projectName}-itemContainer`
      );
      itemContainer.innerHTML = "";

      this.projects[projectName].forEach((todo) => {
        this.createProjectTodoItem(todo, projectName);
      });
    }
  }

  /**
   * Saves the project data to local storage
   */
  saveProjectTodos() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  /**
   * Removes a project from the project list
   * @param {string} projectName - The name of the project to remove
   */
  removeProject(projectName) {
    delete this.projects[projectName]; // Remove the project from the projects object
    this.saveProjectTodos(); // Update local storage
  }

  /**
   * Saves the project data to local storage
   */
  saveProjectsToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  /**
   * Saves a project to the list of projects
   * @param {string} projectName - The name of the project to save
   */
  saveProject(projectName) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    if (!Array.isArray(projects)) {
      projects = [];
    }
    if (!projects.includes(projectName)) {
      projects.push(projectName);
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }

  /**
   * Creates a new project button and adds it to the DOM
   */
  recreateProjectButton() {
    const projList = document.querySelector(".projectList");
    let todoFormCreated = false;

    const projectNames = Object.keys(this.projects);

    // Clear existing project buttons
    projList.innerHTML = "";

    for (const projectName of projectNames) {
      const projBtn = document.createElement("div");
      projBtn.classList.add("projBtn");
      projBtn.id = projectName;

      projBtn.addEventListener("click", () => {
        if (!todoFormCreated) {
          this.showProjectForm(projectName);
          this.createProjectTodoForm(projectName);
          todoFormCreated = true;
          console.log("project btn clicked");
        } else {
          this.hideProjectForm();
          this.showProjectForm(projectName);
        }
      });

      projList.appendChild(projBtn);

      const projectButton = document.createElement("button");
      projectButton.textContent = projectName;
      projectButton.classList.add("projectBtn");
      projectButton.id = projectName;

      const deleteProj = this.handler.createButton("X", "deleteBtn");

      deleteProj.addEventListener("click", () => {
        projBtn.remove();

        const todoFormContainer = document.getElementById(
          `${projectName}-form`
        );

        if (todoFormContainer) {
          todoFormContainer.remove();
        }

        delete this.projects[projectName];
        // Remove project name from localStorage
        this.removeProject(projectName);
      });

      projBtn.appendChild(projectButton);
      projBtn.appendChild(deleteProj);
    }

    return true;
  }

  /**
   * Exports the project data as an array of objects, where each object represents a project and contains an array of todos for that project
   * @returns {Object[]} An array of objects, where each object represents a project and contains an array of todos for that project
   */
  exportProjects() {
    return Object.keys(this.projects).map((projectName) => ({
      name: projectName,
      todos: this.projects[projectName],
    }));
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);


/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler */ "./src/handler.js");


class Todo {
  constructor() {
    this.handler = new _handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todo);


/***/ }),

/***/ "./src/website.js":
/*!************************!*\
  !*** ./src/website.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler */ "./src/handler.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filter */ "./src/filter.js");





class Website {
  constructor() {
    this.todo = new _todo__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.handler = new _handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.project = new _project__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.filter = new _filter__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.formCreated = false;
    this.currentPage = "";
    this.currentVisibleContainer = null;
  }

  createHeader() {
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "To-Do List";

    header.appendChild(title);
    document.body.appendChild(header);
  }

  createContent() {
    const content = document.createElement("div");
    content.classList.add("content");
    content.setAttribute("id", "mainContent");

    const inbox = document.createElement("div");
    inbox.classList.add("inboxContainer", "hidden");

    const today = document.createElement("div");
    today.classList.add("todayContainer", "hidden");

    const week = document.createElement("div");
    week.classList.add("weekContainer", "hidden");

    const projectTodo = document.createElement("div");
    projectTodo.classList.add("projectContainer", "hidden");

    content.appendChild(inbox);
    content.appendChild(today);
    content.appendChild(week);
    content.appendChild(projectTodo);
    document.body.appendChild(content);

    return content;
  }

  showContainer(container) {
    if (this.currentVisibleContainer) {
      this.currentVisibleContainer.classList.add("hidden");
    }
    container.classList.remove("hidden");
    this.currentVisibleContainer = container;
  }

  activeButton(button) {
    const buttons = document.querySelectorAll(".sideMenu button");
    buttons.forEach((btn) => {
      if (btn !== button) {
        btn.classList.remove("active");
      }
    });

    button.classList.add("active");
  }

  createSideMenu() {
    const content = this.createContent();

    const sideMenu = document.createElement("div");
    sideMenu.classList.add("sideMenu");

    const home = document.createElement("div");
    home.classList.add("home");
    home.innerHTML = "<h1>Home</h1>";

    const inboxBtn = this.handler.createButton("Inbox", "inbox");
    inboxBtn.addEventListener("click", (event) => {
      if (!this.todo) {
        console.error("todo object is not instantiated.");
        return;
      }

      const inbox = document.querySelector(".inboxContainer");
      this.showContainer(inbox);
      this.activeButton(event.currentTarget);

      if (!this.formCreated) {
        const container = document.querySelector(".inboxContainer");
        const form = this.todo.createTodoListForm();

        container.appendChild(form);

        this.formCreated = true;
      }

      this.todo.renderTodoList();
    });

    const todayBtn = this.handler.createButton("Today", "today");
    todayBtn.addEventListener("click", (event) => {
      if (event.currentTarget.classList.contains("active")) {
        return;
      }

      const todoListData = JSON.parse(localStorage.getItem("todoList")) || [];
      const projectsData = JSON.parse(localStorage.getItem("projects")) || {};
      console.log("todoListData in todayBtn:", todoListData);
      console.log("projectsData in todayBtn:", projectsData);

      const todayContainer = document.querySelector(".todayContainer");
      this.showContainer(todayContainer);
      this.activeButton(event.currentTarget);

      let todoContainer = document.querySelector(".todoContainer.today");
      if (!todoContainer) {
        todoContainer = this.handler.createTodoContainer();
        todoContainer.classList.add("today"); // Add a class to identify the container
        todayContainer.appendChild(todoContainer);
      }

      todoContainer.innerHTML = "";

      const todoDueToday = this.filter.filterDueToday(todoListData);
      const projectDueToday = this.filter.filterProjectsDueToday(projectsData);
      const dueTodayItems = [...todoDueToday, ...projectDueToday];

      todoContainer.innerHTML = "";
      this.filter.renderFilteredTodoList(dueTodayItems, todoContainer);
    });

    const weekBtn = this.handler.createButton("This Week", "thisWeek");
    weekBtn.addEventListener("click", (event) => {
      if (event.currentTarget.classList.contains("active")) {
        return;
      }

      const todoListData = JSON.parse(localStorage.getItem("todoList")) || [];
      const projectsData = JSON.parse(localStorage.getItem("projects")) || {};
      console.log("todoListData in weekBtn:", todoListData);
      console.log("projectsData in weekBtn:", projectsData);

      const weekContainer = document.querySelector(".weekContainer");
      console.log("week container:", weekContainer);
      this.showContainer(weekContainer);
      this.activeButton(event.currentTarget);

      let todoContainer = document.querySelector(".todoContainer.week");
      console.log("existing todo container", todoContainer);
      if (!todoContainer) {
        todoContainer = this.handler.createTodoContainer();
        todoContainer.classList.add("week");
        weekContainer.appendChild(todoContainer);
      }

      const todoDueThisWeek = this.filter.filterDueThisWeek(todoListData);
      const projectDueThisWeek =
        this.filter.filteredProjectsDueThisWeek(projectsData);
      const dueThisWeekItems = [...todoDueThisWeek, ...projectDueThisWeek];
      console.log("due this week", dueThisWeekItems);

      console.log("todoContainer", todoContainer);
      todoContainer.innerHTML = "";
      this.filter.renderFilteredTodoList(dueThisWeekItems, todoContainer);
    });

    const project = document.createElement("div");
    project.classList.add("project");
    project.innerHTML = "<h1>Project</h1>";

    const projectList = document.createElement("div");
    projectList.classList.add("projectList");

    const addProject = this.handler.createButton("+ Add Project", "addProj");
    addProject.addEventListener("click", (event) => {
      const projectContainer = document.querySelector(".projectContainer");
      this.showContainer(projectContainer);
      this.project.createProjectName();
    });

    document.addEventListener("click", (event) => {
      const projBtn = event.target.closest(".projBtn");
      if (projBtn) {
        const projectContainer = document.querySelector(".projectContainer");
        this.showContainer(projectContainer);
      }
      const projectBtn = event.target.closest(".projectBtn");
      if (projectBtn) {
        this.activeButton(projectBtn);
      }
    });

    sideMenu.appendChild(home);
    sideMenu.appendChild(inboxBtn);
    sideMenu.appendChild(todayBtn);
    sideMenu.appendChild(weekBtn);
    sideMenu.appendChild(project);
    project.appendChild(addProject);
    project.appendChild(projectList);

    const firstContainer = content.querySelector(":scope > div");
    this.showContainer(firstContainer, "hidden");

    content.insertBefore(sideMenu, content.firstChild);

    this.project.recreateProjectButton();
  }

  createFooter() {
    const footer = document.createElement("footer");
    const footerLink = document.createElement("div");
    footerLink.classList.add("link");

    const copyright = this.createFooterLink(
      'Copyright <i class="fa-regular fa-copyright"></i> JoshAllen'
    );

    footerLink.appendChild(copyright);
    footer.appendChild(footerLink);
    document.body.appendChild(footer);
  }

  createFooterLink(text) {
    const link = document.createElement("h1");
    link.innerHTML = text;

    return link;
  }

  initWebsite() {
    this.createHeader();
    this.createSideMenu();
    this.createFooter();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Website);


/***/ }),

/***/ "./node_modules/date-fns/_lib/defaultOptions.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultOptions.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfWeek.mjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/endOfWeek.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   endOfWeek: () => (/* binding */ endOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ "./node_modules/date-fns/_lib/defaultOptions.mjs");



/**
 * The {@link endOfWeek} function options.
 */

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (endOfWeek);


/***/ }),

/***/ "./node_modules/date-fns/isSameDay.mjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isSameDay.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isSameDay: () => (/* binding */ isSameDay)
/* harmony export */ });
/* harmony import */ var _startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startOfDay.mjs */ "./node_modules/date-fns/startOfDay.mjs");


/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check

 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(dateLeft, dateRight) {
  const dateLeftStartOfDay = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateLeft);
  const dateRightStartOfDay = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateRight);

  return +dateLeftStartOfDay === +dateRightStartOfDay;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSameDay);


/***/ }),

/***/ "./node_modules/date-fns/isToday.mjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isToday.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isToday: () => (/* binding */ isToday)
/* harmony export */ });
/* harmony import */ var _isSameDay_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSameDay.mjs */ "./node_modules/date-fns/isSameDay.mjs");


/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to check
 *
 * @returns The date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(date) {
  return (0,_isSameDay_mjs__WEBPACK_IMPORTED_MODULE_0__.isSameDay)(date, Date.now());
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isToday);


/***/ }),

/***/ "./node_modules/date-fns/isWithinInterval.mjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/isWithinInterval.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isWithinInterval: () => (/* binding */ isWithinInterval)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");


/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to check
 * @param interval - The interval to check
 *
 * @returns The date is within the interval
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> false
 *
 * @example
 * // For date equal to interval start:
 * isWithinInterval(date, { start, end: date })
 * // => true
 *
 * @example
 * // For date equal to interval end:
 * isWithinInterval(date, { start: date, end })
 * // => true
 */
function isWithinInterval(date, interval) {
  const time = +(0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const [startTime, endTime] = [
    +(0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(interval.start),
    +(0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(interval.end),
  ].sort((a, b) => a - b);

  return time >= startTime && time <= endTime;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isWithinInterval);


/***/ }),

/***/ "./node_modules/date-fns/startOfDay.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfDay.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfDay: () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfDay);


/***/ }),

/***/ "./node_modules/date-fns/startOfWeek.mjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfWeek.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfWeek: () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ "./node_modules/date-fns/_lib/defaultOptions.mjs");



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfWeek);


/***/ }),

/***/ "./node_modules/date-fns/toDate.mjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/toDate.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === "object" && argStr === "[object Date]")
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new argument.constructor(+argument);
  } else if (
    typeof argument === "number" ||
    argStr === "[object Number]" ||
    typeof argument === "string" ||
    argStr === "[object String]"
  ) {
    // TODO: Can we get rid of as?
    return new Date(argument);
  } else {
    // TODO: Can we get rid of as?
    return new Date(NaN);
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toDate);


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _website__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./website */ "./src/website.js");


const myWebsite = new _website__WEBPACK_IMPORTED_MODULE_0__["default"]();
myWebsite.initWebsite();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hQdkI7O0FBRU87QUFDUDtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7O1VDekR0QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmdDOztBQUVoQyxzQkFBc0IsZ0RBQU87QUFDN0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaGFuZGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvd2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2RlZmF1bHRPcHRpb25zLm1qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lbmRPZldlZWsubWpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzU2FtZURheS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNUb2RheS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNXaXRoaW5JbnRlcnZhbC5tanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZkRheS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZldlZWsubWpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3RvRGF0ZS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdGFydE9mV2VlaywgZW5kT2ZXZWVrLCBpc1RvZGF5LCBpc1dpdGhpbkludGVydmFsIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5pbXBvcnQgSGFuZGxlciBmcm9tIFwiLi9oYW5kbGVyXCI7XG5cbmNsYXNzIEZpbHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlciA9IG5ldyBIYW5kbGVyKCk7XG4gICAgdGhpcy5sb2FkTG9jYWxTdG9yYWdlKCk7XG4gICAgdGhpcy50b2RvTGlzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvTGlzdFwiKSkgfHwgW107XG4gICAgdGhpcy5wcm9qZWN0c0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IHt9O1xuXG4gICAgY29uc29sZS5sb2coXCJQcm9qZWN0cyBkYXRhIGR1cmluZyBpbml0aWFsaXphdGlvbjpcIiwgdGhpcy5wcm9qZWN0c0RhdGEpO1xuICB9XG5cbiAgbG9hZExvY2FsU3RvcmFnZSgpIHtcbiAgICBjb25zdCB0b2RvTGlzdERhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9kb0xpc3RcIikpIHx8IFtdO1xuICAgIGNvbnN0IHByb2plY3RzRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwge307XG4gICAgY29uc29sZS5sb2coXCJwcm9qZWN0cyBkYXRhIHN0cnVjdHVyZVwiLCBwcm9qZWN0c0RhdGEpO1xuXG4gICAgY29uc3QgdG9kb0R1ZVRvZGF5ID0gdGhpcy5maWx0ZXJEdWVUb2RheSh0b2RvTGlzdERhdGEpO1xuICAgIGNvbnN0IHByb2plY3REdWVUb2RheSA9IHRoaXMuZmlsdGVyUHJvamVjdHNEdWVUb2RheShwcm9qZWN0c0RhdGEpO1xuICAgIGNvbnN0IGR1ZVRvZGF5SXRlbXMgPSBbLi4udG9kb0R1ZVRvZGF5LCAuLi5wcm9qZWN0RHVlVG9kYXldO1xuICAgIGNvbnNvbGUubG9nKFwiZHVlIHRvZGF5XCIsIGR1ZVRvZGF5SXRlbXMpO1xuXG4gICAgY29uc3QgdG9kb0R1ZVRoaXNXZWVrID0gdGhpcy5maWx0ZXJEdWVUaGlzV2Vlayh0b2RvTGlzdERhdGEpO1xuICAgIGNvbnN0IHByb2plY3REdWVUaGlzV2VlayA9IHRoaXMuZmlsdGVyZWRQcm9qZWN0c0R1ZVRoaXNXZWVrKHByb2plY3RzRGF0YSk7XG5cbiAgICBjb25zdCBkdWVUaGlzV2Vla0l0ZW1zID0gWy4uLnRvZG9EdWVUaGlzV2VlaywgLi4ucHJvamVjdER1ZVRoaXNXZWVrXTtcbiAgICBjb25zb2xlLmxvZyhcImR1ZSB0aGlzIHdlZWtcIiwgZHVlVGhpc1dlZWtJdGVtcyk7XG4gIH1cblxuICBmaWx0ZXJEdWVUb2RheSh0b2RvTGlzdCkge1xuICAgIHJldHVybiB0b2RvTGlzdC5maWx0ZXIoKGl0ZW0pID0+IGlzVG9kYXkobmV3IERhdGUoaXRlbS5kYXRlKSkpO1xuICB9XG5cbiAgZmlsdGVyRHVlVGhpc1dlZWsodG9kb0xpc3QpIHtcbiAgICBjb25zdCBzdGFydE9mV2Vla0RhdGUgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgpLCB7IHdlZWtTdGFydHNPbjogMSB9KTtcbiAgICBjb25zdCBlbmRPZldlZWtEYXRlID0gZW5kT2ZXZWVrKG5ldyBEYXRlKCksIHsgd2Vla1N0YXJ0c09uOiAxIH0pO1xuXG4gICAgcmV0dXJuIHRvZG9MaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZHVlRGF0ZSA9IG5ldyBEYXRlKGl0ZW0uZGF0ZSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAhaXNUb2RheShkdWVEYXRlKSAmJlxuICAgICAgICBpc1dpdGhpbkludGVydmFsKGR1ZURhdGUsIHtcbiAgICAgICAgICBzdGFydDogc3RhcnRPZldlZWtEYXRlLFxuICAgICAgICAgIGVuZDogZW5kT2ZXZWVrRGF0ZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVycyB0aGUgcHJvamVjdHMgdGhhdCBoYXZlIGl0ZW1zIGR1ZSB0b2RheS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb2plY3RzIC0gVGhlIHByb2plY3RzIGRhdGEuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBmaWx0ZXJlZCBwcm9qZWN0cy5cbiAgICovXG4gIGZpbHRlclByb2plY3RzRHVlVG9kYXkocHJvamVjdHMpIHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBmaWx0ZXJlZFByb2plY3QgPSBbXTtcblxuICAgIGZvciAoY29uc3QgcHJvamVjdE5hbWUgaW4gcHJvamVjdHMpIHtcbiAgICAgIGNvbnN0IHByb2plY3RJdGVtcyA9IHByb2plY3RzW3Byb2plY3ROYW1lXTtcbiAgICAgIGNvbnN0IGR1ZVRvZGF5SXRlbXMgPSBwcm9qZWN0SXRlbXMuZmlsdGVyKChpdGVtKSA9PlxuICAgICAgICBpc1RvZGF5KG5ldyBEYXRlKGl0ZW0uZGF0ZSkpXG4gICAgICApO1xuXG4gICAgICBpZiAoZHVlVG9kYXlJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZpbHRlcmVkUHJvamVjdC5wdXNoKHtcbiAgICAgICAgICBwcm9qZWN0TmFtZTogcHJvamVjdE5hbWUsXG4gICAgICAgICAgdG9kb3M6IGR1ZVRvZGF5SXRlbXMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyZWRQcm9qZWN0O1xuICB9XG5cbiAgZmlsdGVyZWRQcm9qZWN0c0R1ZVRoaXNXZWVrKHByb2plY3RzKSB7XG4gICAgY29uc3Qgc3RhcnRPZldlZWtEYXRlID0gc3RhcnRPZldlZWsobmV3IERhdGUoKSwgeyB3ZWVrU3RhcnRzT246IDEgfSk7XG4gICAgY29uc3QgZW5kT2ZXZWVrRGF0ZSA9IGVuZE9mV2VlayhuZXcgRGF0ZSgpLCB7IHdlZWtTdGFydHNPbjogMSB9KTtcblxuICAgIGNvbnN0IGZpbHRlcmVkUHJvamVjdCA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBwcm9qZWN0TmFtZSBpbiBwcm9qZWN0cykge1xuICAgICAgY29uc3QgcHJvamVjdEl0ZW1zID0gcHJvamVjdHNbcHJvamVjdE5hbWVdO1xuICAgICAgY29uc3QgZHVlVGhpc1dlZWtJdGVtcyA9IHByb2plY3RJdGVtcy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IG5ldyBEYXRlKGl0ZW0uZGF0ZSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgIWlzVG9kYXkoZHVlRGF0ZSkgJiZcbiAgICAgICAgICBpc1dpdGhpbkludGVydmFsKGR1ZURhdGUsIHtcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydE9mV2Vla0RhdGUsXG4gICAgICAgICAgICBlbmQ6IGVuZE9mV2Vla0RhdGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZHVlVGhpc1dlZWtJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZpbHRlcmVkUHJvamVjdC5wdXNoKHtcbiAgICAgICAgICBwcm9qZWN0TmFtZTogcHJvamVjdE5hbWUsXG4gICAgICAgICAgdG9kb3M6IGR1ZVRoaXNXZWVrSXRlbXMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyZWRQcm9qZWN0O1xuICB9XG5cbiAgcmVuZGVyRmlsdGVyZWRUb2RvTGlzdChmaWx0ZXJlZFRvZG9JdGVtcywgY29udGFpbmVyKSB7XG4gICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb250YWluZXIgaXMgbnVsbC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGl0ZW1Db250YWluZXIgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5pdGVtQ29udGFpbmVyXCIpO1xuICAgIGlmICghaXRlbUNvbnRhaW5lcikge1xuICAgICAgaXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBpdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJpdGVtQ29udGFpbmVyXCIpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGl0ZW1Db250YWluZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgfVxuXG4gICAgZmlsdGVyZWRUb2RvSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0udG9kb3MpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhIHByb2plY3QgaXRlbVxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgcHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSBgUHJvamVjdDogJHtpdGVtLnByb2plY3ROYW1lfWA7XG4gICAgICAgIGl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuXG4gICAgICAgIGl0ZW0udG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICAgIGNvbnN0IG5hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNVwiKTtcbiAgICAgICAgICBjb25zdCBkYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDVcIik7XG5cbiAgICAgICAgICBjb25zdCB0b2RvSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKGB0b2RvLSR7dG9kby5pZH1gLCBcInRvZG9JdGVtXCIpO1xuXG4gICAgICAgICAgY29uc3QgY2hlY2tib3hDb250YWluZXIgPSB0aGlzLmhhbmRsZXIuY3JlYXRlQ2hlY2tib3hDb250YWluZXIodG9kbyk7XG4gICAgICAgICAgY29uc3QgY2hlY2tib3ggPSBjaGVja2JveENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgXCJpbnB1dFt0eXBlPSdjaGVja2JveCddXCJcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8gU2V0IElEIGZvciB0aGUgY2hlY2tib3hcbiAgICAgICAgICBjaGVja2JveC5pZCA9IGAke2l0ZW0ucHJvamVjdE5hbWV9LXRvZG8tJHt0b2RvLmlkfWA7XG5cbiAgICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2tib3ggY2hlY2tlZCBpbjpcIiwgY2hlY2tib3guaWQpO1xuICAgICAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBjaGVja2JveC5pZC5zcGxpdChcIi1cIilbMF07IC8vIEV4dHJhY3QgcHJvamVjdE5hbWUgZnJvbSBjaGVja2JveCBJRFxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInByb2plY3RzIGRhdGEgYWZ0ZXIgY2hlY2tlZDpcIiwgdGhpcy5wcm9qZWN0c0RhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgXCJyZW1vdmluZyB0b2RvIGluXCIsXG4gICAgICAgICAgICAgICAgICBjaGVja2JveC5pZCxcbiAgICAgICAgICAgICAgICAgIFwidG9kbyByZW1vdmVkOlwiLFxuICAgICAgICAgICAgICAgICAgdG9kby5pZCxcbiAgICAgICAgICAgICAgICAgIFwicHJvamVjdCBuYW1lOlwiLFxuICAgICAgICAgICAgICAgICAgcHJvamVjdE5hbWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9kb0Zyb21Qcm9qZWN0KHRvZG8uaWQsIHByb2plY3ROYW1lKTsgLy8gUGFzcyBwcm9qZWN0TmFtZSB0byByZW1vdmVUb2RvSXRlbVxuICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgbmFtZUxhYmVsLnRleHRDb250ZW50ID0gdG9kby5uYW1lO1xuICAgICAgICAgIGRhdGVMYWJlbC50ZXh0Q29udGVudCA9IHRvZG8uZGF0ZTtcblxuICAgICAgICAgIGNvbnN0IHByaW9yaXR5SWNvbiA9IHRoaXMuaGFuZGxlci5jcmVhdGVQcmlvcml0eUljb24odG9kbywgdG9kb0l0ZW0pO1xuICAgICAgICAgIHByaW9yaXR5SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVQcmlvcml0eSh0b2RvLmlkLCBwcm9qZWN0TmFtZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChjaGVja2JveENvbnRhaW5lcik7XG4gICAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xuICAgICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHByaW9yaXR5SWNvbik7XG5cbiAgICAgICAgICBpdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGlzIGlzIGEgdG9kbyBpdGVtIGZyb20gdG9kb0xpc3RcbiAgICAgICAgY29uc3QgbmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuICAgICAgICBjb25zdCBkYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDVcIik7XG5cbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoYHRvZG8tJHtpdGVtLmlkfWAsIFwidG9kb0l0ZW1cIik7XG5cbiAgICAgICAgY29uc3QgY2hlY2tib3hDb250YWluZXIgPSB0aGlzLmhhbmRsZXIuY3JlYXRlQ2hlY2tib3hDb250YWluZXIoaXRlbSk7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gY2hlY2tib3hDb250YWluZXIucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBcImlucHV0W3R5cGU9J2NoZWNrYm94J11cIlxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFNldCBJRCBmb3IgdGhlIGNoZWNrYm94XG4gICAgICAgIGNoZWNrYm94LmlkID0gYHRvZG8tY2hlY2tib3gtJHtpdGVtLmlkfWA7XG5cbiAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRvZG9JdGVtKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW0gY2hlY2tlZFwiLCBpdGVtLmlkKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBuYW1lTGFiZWwudGV4dENvbnRlbnQgPSBpdGVtLm5hbWU7XG4gICAgICAgIGRhdGVMYWJlbC50ZXh0Q29udGVudCA9IGl0ZW0uZGF0ZTtcblxuICAgICAgICBjb25zdCBwcmlvcml0eUljb24gPSB0aGlzLmhhbmRsZXIuY3JlYXRlUHJpb3JpdHlJY29uKGl0ZW0sIHRvZG9JdGVtKTtcbiAgICAgICAgcHJpb3JpdHlJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy50b2dnbGVQcmlvcml0eShpdGVtLmlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoY2hlY2tib3hDb250YWluZXIpO1xuICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xuICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChwcmlvcml0eUljb24pO1xuXG4gICAgICAgIGl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gTWV0aG9kIHRvIHVwZGF0ZSB0aGUgRE9NIHdpdGggdGhlIGZpbHRlcmVkIHRvZG8gbGlzdFxuICB1cGRhdGVUb2RvTGlzdFVJKGZpbHRlcmVkVG9kb0l0ZW1zLCBjb250YWluZXIpIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjsgLy8gQ2xlYXIgdGhlIGNvbnRhaW5lclxuICAgIGZpbHRlcmVkVG9kb0l0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgdG9kb0l0ZW0udGV4dENvbnRlbnQgPSBpdGVtLm5hbWU7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlVG9kb0l0ZW0odG9kb0lkKSB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gdGhpcy50b2RvTGlzdC5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRvZG9JZCk7XG4gICAgaWYgKHRvZG9JbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMudG9kb0xpc3Quc3BsaWNlKHRvZG9JbmRleCwgMSk7XG4gICAgICB0aGlzLnNhdmVUb2RvTGlzdCgpO1xuICAgICAgdGhpcy5yZW9yZGVyVG9kbygpO1xuICAgICAgY29uc29sZS5sb2coYFRvZG8gcmVtb3ZlZCBmcm9tIHRvZG9MaXN0OiAke3RvZG9JZH1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coYFRvZG8gd2l0aCBJRCAke3RvZG9JZH0gbm90IGZvdW5kIGluIHRvZG9MaXN0LmApO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVRvZG9Gcm9tUHJvamVjdCh0b2RvSWQsIHByb2plY3ROYW1lKSB7XG4gICAgY29uc29sZS5sb2coXCJwcm9qZWN0cyBkYXRhIGJlZm9yZSByZW1vdmFsOlwiLCB0aGlzLnByb2plY3RzRGF0YSk7XG4gICAgY29uc3QgcHJvamVjdEl0ZW1zID0gdGhpcy5wcm9qZWN0c0RhdGFbcHJvamVjdE5hbWVdO1xuICAgIGNvbnNvbGUubG9nKGByZW1vdmluZyB0b2RvIHdpdGggSUQgJHt0b2RvSWR9IGZyb20gcHJvamVjdDogJHtwcm9qZWN0TmFtZX1gKTtcbiAgICBpZiAoIXByb2plY3RJdGVtcykge1xuICAgICAgY29uc29sZS5sb2coYFByb2plY3QgJHtwcm9qZWN0TmFtZX0gbm90IGZvdW5kLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRvZG9JbmRleCA9IHByb2plY3RJdGVtcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRvZG9JZCk7XG4gICAgaWYgKHRvZG9JbmRleCAhPT0gLTEpIHtcbiAgICAgIHByb2plY3RJdGVtcy5zcGxpY2UodG9kb0luZGV4LCAxKTtcbiAgICAgIHRoaXMuc2F2ZVByb2plY3RzRGF0YSgpO1xuICAgICAgdGhpcy5yZW9yZGVyVG9kbygpO1xuICAgICAgY29uc29sZS5sb2coYFRvZG8gcmVtb3ZlZCBmcm9tIHByb2plY3Q6ICR7dG9kb0lkfSBpbiAke3Byb2plY3ROYW1lfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYFRvZG8gd2l0aCBJRCAke3RvZG9JZH0gbm90IGZvdW5kIGluIHByb2plY3QgJHtwcm9qZWN0TmFtZX0uYFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJGaWx0ZXJlZFRvZG9MaXN0KCk7XG4gIH1cblxuICB0b2dnbGVQcmlvcml0eSh0b2RvSWQpIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgdG9kbyBpcyBpbiB0aGUgdG9kb0xpc3RcbiAgICBjb25zdCB0b2RvSW5Ub2RvTGlzdCA9IHRoaXMudG9kb0xpc3QuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gdG9kb0lkKTtcbiAgICBpZiAodG9kb0luVG9kb0xpc3QpIHtcbiAgICAgIC8vIFRvZ2dsZSB0aGUgcHJpb3JpdHkgb2YgdGhlIHRvZG8gaW4gdGhlIHRvZG9MaXN0XG4gICAgICB0b2RvSW5Ub2RvTGlzdC5wcmlvcml0eSA9ICF0b2RvSW5Ub2RvTGlzdC5wcmlvcml0eTtcbiAgICAgIHRvZG9JblRvZG9MaXN0LmlzUHJpb3JpdHkgPSB0b2RvSW5Ub2RvTGlzdC5wcmlvcml0eTtcbiAgICAgIHRoaXMuc2F2ZVRvZG9MaXN0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIHRvZG8gaXMgaW4gYW55IHByb2plY3RcbiAgICBmb3IgKGNvbnN0IHByb2plY3ROYW1lIGluIHRoaXMucHJvamVjdHNEYXRhKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SXRlbXMgPSB0aGlzLnByb2plY3RzRGF0YVtwcm9qZWN0TmFtZV07XG4gICAgICBjb25zdCB0b2RvSW5Qcm9qZWN0ID0gcHJvamVjdEl0ZW1zLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRvZG9JZCk7XG4gICAgICBpZiAodG9kb0luUHJvamVjdCkge1xuICAgICAgICAvLyBUb2dnbGUgdGhlIHByaW9yaXR5IG9mIHRoZSB0b2RvIGluIHRoZSBwcm9qZWN0XG4gICAgICAgIHRvZG9JblByb2plY3QucHJpb3JpdHkgPSAhdG9kb0luUHJvamVjdC5wcmlvcml0eTtcbiAgICAgICAgdG9kb0luUHJvamVjdC5pc1ByaW9yaXR5ID0gdG9kb0luUHJvamVjdC5wcmlvcml0eTtcbiAgICAgICAgdGhpcy5zYXZlUHJvamVjdHNEYXRhKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlb3JkZXJUb2RvKCkge1xuICAgIC8vIENyZWF0ZSBhIG5ldyBhcnJheSB0byBob2xkIGFsbCB0b2RvIGl0ZW1zXG4gICAgY29uc3QgYWxsVG9kb0l0ZW1zID0gW107XG5cbiAgICAvLyBQdXNoIGFsbCB0b2RvIGl0ZW1zIGZyb20gdG9kb0xpc3QgaW50byB0aGUgYXJyYXlcbiAgICB0aGlzLnRvZG9MaXN0LmZvckVhY2goKHRvZG8pID0+IGFsbFRvZG9JdGVtcy5wdXNoKHRvZG8pKTtcblxuICAgIC8vIFB1c2ggYWxsIHRvZG8gaXRlbXMgZnJvbSBwcm9qZWN0c0RhdGEgaW50byB0aGUgYXJyYXlcbiAgICBmb3IgKGNvbnN0IHByb2plY3ROYW1lIGluIHRoaXMucHJvamVjdHNEYXRhKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SXRlbXMgPSB0aGlzLnByb2plY3RzRGF0YVtwcm9qZWN0TmFtZV07XG4gICAgICBwcm9qZWN0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gYWxsVG9kb0l0ZW1zLnB1c2goaXRlbSkpO1xuICAgIH1cblxuICAgIC8vIFNvcnQgdGhlIGFycmF5IGJhc2VkIG9uIHByaW9yaXR5IGFuZCBkYXRlXG4gICAgYWxsVG9kb0l0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLnByaW9yaXR5ICYmICFiLnByaW9yaXR5KSByZXR1cm4gLTE7XG4gICAgICBpZiAoIWEucHJpb3JpdHkgJiYgYi5wcmlvcml0eSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gbmV3IERhdGUoYS5kYXRlKSAtIG5ldyBEYXRlKGIuZGF0ZSk7XG4gICAgfSk7XG5cbiAgICAvLyBDbGVhciB0aGUgZXhpc3RpbmcgY29udGFpbmVyXG4gICAgY29uc3QgaXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaXRlbUNvbnRhaW5lclwiKTtcbiAgICBpdGVtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAvLyBSZW5kZXIgdGhlIHNvcnRlZCB0b2RvIGl0ZW1zXG4gICAgYWxsVG9kb0l0ZW1zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgdG9kb0l0ZW0udGV4dENvbnRlbnQgPSB0b2RvLm5hbWU7XG4gICAgICBpdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVUb2RvTGlzdCgpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRvZG9MaXN0XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb0xpc3QpKTtcbiAgfVxuXG4gIHNhdmVQcm9qZWN0c0RhdGEoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnByb2plY3RzRGF0YSkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbHRlcjtcbiIsImNsYXNzIEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRvZG8gPSBbXTtcbiAgICB0aGlzLnRvZG9JZENvdW50ZXIgPSAwO1xuICAgIHRoaXMucHJvamVjdE5hbWUgPSBcIlwiO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0gbnVsbDtcbiAgfVxuXG4gIGNyZWF0ZUJ1dHRvbih0ZXh0LCBpZCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBidXR0b24uaWQgPSBpZDtcblxuICAgIHJldHVybiBidXR0b247XG4gIH1cblxuICBjcmVhdGVJbnB1dCh0eXBlLCBwbGFjZWhvbGRlciwgcmVxdWlyZWQpIHtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC50eXBlID0gdHlwZTtcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIGlucHV0LnJlcXVpcmVkID0gcmVxdWlyZWQ7XG5cbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuICBjcmVhdGVUb2RvQ29udGFpbmVyKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvQ29udGFpbmVyXCIpO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgfVxuXG4gIGNyZWF0ZUl0ZW1Db250YWluZXIoKSB7XG4gICAgY29uc3QgaXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaXRlbUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaXRlbUNvbnRhaW5lclwiKTtcblxuICAgIHJldHVybiBpdGVtQ29udGFpbmVyO1xuICB9XG5cbiAgY3JlYXRlRmlsdGVyZWRDb250YWluZXIoKSB7XG4gICAgY29uc3QgZmlsdGVyZWRUb2RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmaWx0ZXJlZFRvZG8uY2xhc3NMaXN0LmFkZChcImZpbHRlcmVkQ29udGFpbmVyXCIpO1xuXG4gICAgcmV0dXJuIGZpbHRlcmVkVG9kbztcbiAgfVxuXG4gIGNyZWF0ZUNoZWNrYm94Q29udGFpbmVyKHRvZG8pIHtcbiAgICBjb25zdCBjaGVja2JveENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2hlY2tib3hDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNoZWNrYm94LWNvbnRhaW5lclwiKTtcblxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cbiAgICBjb25zdCBjaGVja21hcmtTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgY2hlY2ttYXJrU3Bhbi5jbGFzc0xpc3QuYWRkKFwiY2hlY2ttYXJrXCIpO1xuXG4gICAgY2hlY2tib3hDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgIGNoZWNrYm94Q29udGFpbmVyLmFwcGVuZENoaWxkKGNoZWNrbWFya1NwYW4pO1xuXG4gICAgcmV0dXJuIGNoZWNrYm94Q29udGFpbmVyO1xuICB9XG5cbiAgY3JlYXRlUHJpb3JpdHlJY29uKHRvZG8sIHRvZG9JdGVtLCBpbmJveENvbnRhaW5lcikge1xuICAgIGNvbnN0IHByaW9yaXR5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgXCJwcmlvcml0eS1pY29uXCIsXG4gICAgICB0b2RvLmlzUHJpb3JpdHkgPyBcImZhLXNvbGlkXCIgOiBcImZhLXJlZ3VsYXJcIixcbiAgICAgIFwiZmEtc3RhclwiXG4gICAgKTtcbiAgICBwcmlvcml0eUljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRvZG8uaXNQcmlvcml0eSA9ICF0b2RvLmlzUHJpb3JpdHk7XG4gICAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LnRvZ2dsZShcImZhLXJlZ3VsYXJcIiwgIXRvZG8uaXNQcmlvcml0eSk7XG4gICAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LnRvZ2dsZShcImZhLXNvbGlkXCIsIHRvZG8uaXNQcmlvcml0eSk7XG5cbiAgICAgIHRoaXMudXBkYXRlUHJpb3JpdHlJY29uKHRvZG8pO1xuXG4gICAgICBpZiAodG9kby5pc1ByaW9yaXR5ICYmIGluYm94Q29udGFpbmVyKSB7XG4gICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICAgICAgaW5ib3hDb250YWluZXIucHJlcGVuZCh0b2RvSXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJpb3JpdHlJY29uO1xuICB9XG5cbiAgdXBkYXRlUHJpb3JpdHlJY29uKHRvZG8pIHtcbiAgICBjb25zdCBvdGhlclBhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIFwiLmNvbnRlbnQgPiBkaXY6bm90KC5zaWRlTWVudSlcIlxuICAgICk7XG5cbiAgICBvdGhlclBhZ2VzLmZvckVhY2goKHBhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JdGVtID0gcGFnZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgLnRvZG8taXRlbVtkYXRhLXRvZG8taWQ9XCIke3RvZG8uaWR9XCJdYFxuICAgICAgKTtcbiAgICAgIGlmICh0b2RvSXRlbSkge1xuICAgICAgICBjb25zdCBwcmlvcml0eUljb24gPSB0b2RvSXRlbS5xdWVyeVNlbGVjdG9yKFwiLnByaW9yaXR5LWljb25cIik7XG4gICAgICAgIGlmIChwcmlvcml0eUljb24pIHtcbiAgICAgICAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LnRvZ2dsZShcImZhLXJlZ3VsYXJcIiwgIXRvZG8uaXNQcmlvcml0eSk7XG4gICAgICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1zb2xpZFwiLCB0b2RvLmlzUHJpb3JpdHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGFuZGxlcjtcbiIsImltcG9ydCBIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJcIjtcblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlciA9IG5ldyBIYW5kbGVyKCk7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHt9O1xuICAgIHRoaXMucHJvamVjdElkQ291bnRlciA9IDA7XG4gICAgdGhpcy5wcm9qZWN0Q29udGFpbmVyID0gbnVsbDtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmxvYWRQcm9qZWN0cygpO1xuICAgICAgdGhpcy5sb2FkVG9kb3MoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIHRoZSBwcm9qZWN0cyBmcm9tIGxvY2FsIHN0b3JhZ2UgYW5kIGRpc3BsYXkgdGhlbSBpbiB0aGUgVUkuXG4gICAqL1xuICBsb2FkUHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHNEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKSB8fCB7fTtcbiAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHNEYXRhO1xuXG4gICAgdGhpcy5yZWNyZWF0ZVByb2plY3RCdXR0b24oKTtcblxuICAgIGZvciAoY29uc3QgcHJvamVjdE5hbWUgaW4gdGhpcy5wcm9qZWN0cykge1xuICAgICAgaWYgKHRoaXMucHJvamVjdHMuaGFzT3duUHJvcGVydHkocHJvamVjdE5hbWUpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIHByb2plY3QgZGF0YSBhbmQgY3JlYXRlIHRoZSB0b2RvIGZvcm0gY29udGFpbmVyIGZvciB0aGUgcHJvamVjdC5cbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3ROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb2plY3RcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IHByb2plY3REYXRhID0gdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV07XG4gICAgICAgIGNvbnN0IHRvZG9Gb3JtQ29udGFpbmVyID0gdGhpcy5jcmVhdGVQcm9qZWN0VG9kb0Zvcm0ocHJvamVjdE5hbWUpO1xuICAgICAgICBjb25zdCBpdGVtQ29udGFpbmVyID0gdG9kb0Zvcm1Db250YWluZXIucXVlcnlTZWxlY3RvcihcIi5pdGVtQ29udGFpbmVyXCIpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb29wIHRocm91Z2ggdGhlIHByb2plY3QgZGF0YSBhbmQgY3JlYXRlIGEgdG9kbyBpdGVtIGZvciBlYWNoIHRvZG8uXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0b2RvIC0gVGhlIHRvZG8gb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0XG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGl0ZW1Db250YWluZXIgLSBUaGUgaXRlbSBjb250YWluZXIgZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgcHJvamVjdERhdGEuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICAgIHRoaXMuY3JlYXRlUHJvamVjdFRvZG9JdGVtKHRvZG8sIHByb2plY3ROYW1lLCBpdGVtQ29udGFpbmVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgdGhlIHRvZG9zIGZyb20gbG9jYWwgc3RvcmFnZSBhbmQgZGlzcGxheSB0aGVtIGluIHRoZSBVSS5cbiAgICovXG4gIGxvYWRUb2RvcygpIHtcbiAgICBjb25zdCBzdG9yZWRUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2Rvc1wiKSkgfHwge307XG5cbiAgICBPYmplY3Qua2V5cyhzdG9yZWRUb2RvcykuZm9yRWFjaCgocHJvamVjdE5hbWUpID0+IHtcbiAgICAgIGlmICh0aGlzLnByb2plY3RzW3Byb2plY3ROYW1lXSkge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcHJvamVjdCBleGlzdHNcbiAgICAgICAgdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV0gPSBzdG9yZWRUb2Rvc1twcm9qZWN0TmFtZV07IC8vIFVwZGF0ZSBwcm9qZWN0IHRvZG9zXG4gICAgICAgIHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgICAgICB0aGlzLmNyZWF0ZVByb2plY3RUb2RvSXRlbSh0b2RvLCBwcm9qZWN0TmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV0gPSBzdG9yZWRUb2Rvc1twcm9qZWN0TmFtZV07IC8vIEFkZCBwcm9qZWN0IHdpdGggaXRzIHRvZG9zXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBwcm9qZWN0IGNvbnRhaW5lciBlbGVtZW50XG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciAtIFRoZSBwcm9qZWN0IGNvbnRhaW5lciBlbGVtZW50XG4gICAqL1xuICBzZXRQcm9qZWN0Q29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMucHJvamVjdENvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHByb2plY3QgbmFtZSBpbnB1dCBlbGVtZW50XG4gICAqL1xuICBjcmVhdGVQcm9qZWN0TmFtZSgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0XCIpO1xuICAgIGNvbnN0IHByb2pMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0TGlzdFwiKTtcblxuICAgIGxldCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qRm9ybUNvbnRhaW5lclwiKTtcbiAgICBsZXQgdG9kb0Zvcm1DcmVhdGVkID0gZmFsc2U7XG5cbiAgICBpZiAoIWZvcm1Db250YWluZXIpIHtcbiAgICAgIGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicHJvakZvcm1Db250YWluZXJcIik7XG5cbiAgICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QuYWRkKFwicHJvakZvcm1cIik7XG5cbiAgICAgIGNvbnN0IHByb2pOYW1lID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUlucHV0KFwidGV4dFwiLCBcIlByb2plY3QgTmFtZVwiKTtcbiAgICAgIHByb2pOYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qTmFtZVwiKTtcblxuICAgICAgY29uc3QgYnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJ0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYnRuQ29udGFpbmVyXCIpO1xuXG4gICAgICBjb25zdCBzdWJtaXQgPSB0aGlzLmhhbmRsZXIuY3JlYXRlQnV0dG9uKFwiU3VibWl0XCIsIFwic3VibWl0UHJvalwiKTtcblxuICAgICAgY29uc3QgY2FuY2VsID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIkNhbmNlbFwiLCBcImNhbmNlbFByb2pcIik7XG5cbiAgICAgIHByb2plY3RGb3JtLmFwcGVuZENoaWxkKHByb2pOYW1lKTtcbiAgICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJtaXQpO1xuICAgICAgYnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmNlbCk7XG4gICAgICBmb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RGb3JtKTtcbiAgICAgIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBFdmVudCBsaXN0ZW5lciBmb3IgdGhlIHN1Ym1pdCBidXR0b24sIGNyZWF0ZXMgYSBuZXcgcHJvamVjdCB3aXRoIHRoZSBnaXZlbiBuYW1lXG4gICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRoZSBzdWJtaXQgZXZlbnRcbiAgICAgICAqL1xuICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qTmFtZS52YWx1ZS50cmltKCk7XG4gICAgICAgIGlmIChwcm9qZWN0TmFtZSAhPT0gXCJcIikge1xuICAgICAgICAgIGxldCBwcm9qQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvamVjdE5hbWUpO1xuXG4gICAgICAgICAgaWYgKCFwcm9qQnRuKSB7XG4gICAgICAgICAgICBwcm9qQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHByb2pCdG4uY2xhc3NMaXN0LmFkZChcInByb2pCdG5cIik7XG4gICAgICAgICAgICBwcm9qQnRuLmlkID0gcHJvamVjdE5hbWU7XG5cbiAgICAgICAgICAgIHByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCF0b2RvRm9ybUNyZWF0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQcm9qZWN0Rm9ybShwcm9qZWN0TmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQcm9qZWN0VG9kb0Zvcm0ocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgICAgIHRvZG9Gb3JtQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcm9qZWN0IGJ0biBjbGlja2VkXCIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2plY3RGb3JtKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvamVjdEZvcm0ocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByb2pMaXN0LmFwcGVuZENoaWxkKHByb2pCdG4pO1xuICAgICAgICAgICAgdGhpcy5zYXZlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgcHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuICAgICAgICAgIHByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZChcInByb2plY3RCdG5cIik7XG4gICAgICAgICAgcHJvamVjdEJ1dHRvbi5pZCA9IHByb2plY3ROYW1lO1xuXG4gICAgICAgICAgY29uc3QgZGVsZXRlUHJvaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgZGVsZXRlUHJvai50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIGRlbGV0ZVByb2ouY2xhc3NMaXN0LmFkZChcImRlbGV0ZUJ0blwiKTtcbiAgICAgICAgICBkZWxldGVQcm9qLmlkID0gYCR7cHJvamVjdE5hbWV9LWRlbGV0ZUJ0bmA7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBFdmVudCBsaXN0ZW5lciBmb3IgdGhlIGRlbGV0ZSBwcm9qZWN0IGJ1dHRvbiwgcmVtb3ZlcyB0aGUgcHJvamVjdCBhbmQgaXRzIGZvcm0gZnJvbSB0aGUgRE9NXG4gICAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUaGUgZGVsZXRlIHByb2plY3QgZXZlbnRcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBkZWxldGVQcm9qLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJZCA9IGRlbGV0ZVByb2ouaWQ7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3RJZC5yZXBsYWNlKFwiLWRlbGV0ZUJ0blwiLCBcIlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2pCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9qZWN0TmFtZSk7XG5cbiAgICAgICAgICAgIHByb2pCdG4ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRvZG9Gb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgIGAke3Byb2plY3ROYW1lfS1mb3JtYFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKHRvZG9Gb3JtQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgIHRvZG9Gb3JtQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV07XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcHJvakJ0bi5hcHBlbmRDaGlsZChwcm9qZWN0QnV0dG9uKTtcbiAgICAgICAgICBwcm9qQnRuLmFwcGVuZENoaWxkKGRlbGV0ZVByb2opO1xuXG4gICAgICAgICAgZm9ybUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8qKlxuICAgICAgICogRXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBjYW5jZWwgYnV0dG9uLCByZW1vdmVzIHRoZSBwcm9qZWN0IGZvcm0gZnJvbSB0aGUgRE9NXG4gICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRoZSBjYW5jZWwgZXZlbnRcbiAgICAgICAqL1xuICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZm9ybUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9qZWN0LmFwcGVuZENoaWxkKGZvcm1Db250YWluZXIpO1xuICAgICAgdGhpcy5yZWNyZWF0ZVByb2plY3RCdXR0b24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGUgcHJvamVjdCBmb3JtIGZvciB0aGUgZ2l2ZW4gcHJvamVjdCBuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0XG4gICAqL1xuICBzaG93UHJvamVjdEZvcm0ocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBhbGxUb2RvRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RUb2RvQ29udGFpbmVyXCIpO1xuICAgIGFsbFRvZG9Gb3Jtcy5mb3JFYWNoKChmb3JtKSA9PiB7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2RvRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Byb2plY3ROYW1lfS1mb3JtYCk7XG4gICAgaWYgKHRvZG9Gb3JtKSB7XG4gICAgICB0b2RvRm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyBhbGwgdGhlIHByb2plY3QgZm9ybXNcbiAgICovXG4gIGhpZGVQcm9qZWN0Rm9ybSgpIHtcbiAgICBjb25zdCBhbGxUb2RvRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFRvZG9Db250YWluZXJcIik7XG4gICAgYWxsVG9kb0Zvcm0uZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgcHJvamVjdCBmb3JtIGZvciB0aGUgZ2l2ZW4gcHJvamVjdCBuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0XG4gICAqL1xuICBjcmVhdGVQcm9qZWN0VG9kb0Zvcm0ocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0Q29udGFpbmVyXCIpO1xuICAgIGNvbnN0IHRvZG9Gb3JtQ29udGFpbmVySWQgPSBgJHtwcm9qZWN0TmFtZX0tZm9ybWA7XG5cbiAgICBsZXQgdG9kb0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0b2RvRm9ybUNvbnRhaW5lcklkKTtcblxuICAgIGlmICghdG9kb0Zvcm1Db250YWluZXIpIHtcbiAgICAgIHRvZG9Gb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRvZG9Gb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0VG9kb0NvbnRhaW5lclwiKTtcbiAgICAgIHRvZG9Gb3JtQ29udGFpbmVyLmlkID0gdG9kb0Zvcm1Db250YWluZXJJZDtcblxuICAgICAgY29uc3QgdG9kb0NvbnRhaW5lciA9IHRoaXMuaGFuZGxlci5jcmVhdGVUb2RvQ29udGFpbmVyKCk7XG5cbiAgICAgIGNvbnN0IGl0ZW1Db250YWluZXIgPSB0aGlzLmhhbmRsZXIuY3JlYXRlSXRlbUNvbnRhaW5lcigpO1xuICAgICAgaXRlbUNvbnRhaW5lci5pZCA9IGAke3Byb2plY3ROYW1lfS1pdGVtQ29udGFpbmVyYDtcblxuICAgICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmb3JtQ29udGFpbmVyXCIpO1xuXG4gICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWZvcm1cIik7XG4gICAgICBmb3JtLmlkID0gYCR7cHJvamVjdE5hbWV9LWZvcm1gO1xuXG4gICAgICBjb25zdCBuYW1lSW5wdXQgPSB0aGlzLmhhbmRsZXIuY3JlYXRlSW5wdXQoXCJ0ZXh0XCIsIFwiVG9kbyBOYW1lXCIsIHRydWUpO1xuICAgICAgbmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJuYW1lLWlucHV0XCIpO1xuICAgICAgbmFtZUlucHV0LmlkID0gYCR7cHJvamVjdE5hbWV9LWlucHV0YDtcblxuICAgICAgY29uc3QgZGF0ZUlucHV0ID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUlucHV0KFwiZGF0ZVwiLCBcIlwiLCB0cnVlKTtcbiAgICAgIGRhdGVJbnB1dC5jbGFzc0xpc3QuYWRkKFwiZGF0ZS1pbnB1dFwiKTtcbiAgICAgIGRhdGVJbnB1dC5pZCA9IGAke3Byb2plY3ROYW1lfS1kYXRlLWlucHV0YDtcblxuICAgICAgY29uc3QgYWRkQnRuID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIkFkZCBUb2RvXCIsIFwiYWRkQnRuXCIpO1xuICAgICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoXCJhZGRCdG5cIik7XG4gICAgICBhZGRCdG4uaWQgPSBgJHtwcm9qZWN0TmFtZX0tYWRkQnRuYDtcbiAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMucmVvcmRlclRvZG8oKTtcbiAgICAgICAgdGhpcy5jcmVhdGVQcm9qZWN0VG9kbyhwcm9qZWN0TmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdKTtcbiAgICAgIH0pO1xuXG4gICAgICBmb3JtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgICBmb3JtLmFwcGVuZENoaWxkKGRhdGVJbnB1dCk7XG4gICAgICBmb3JtLmFwcGVuZENoaWxkKGFkZEJ0bik7XG4gICAgICBmb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xuICAgICAgdG9kb0NvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtQ29udGFpbmVyKTtcbiAgICAgIHRvZG9Db250YWluZXIuYXBwZW5kQ2hpbGQoaXRlbUNvbnRhaW5lcik7XG5cbiAgICAgIHRvZG9Gb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9Db250YWluZXIpO1xuXG4gICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9Gb3JtQ29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdKSB7XG4gICAgICB0aGlzLnByb2plY3RzW3Byb2plY3ROYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIHJldHVybiB0b2RvRm9ybUNvbnRhaW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHByb2plY3QgdG9kbyB3aXRoIHRoZSBnaXZlbiBwcm9qZWN0IG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3ROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb2plY3RcbiAgICovXG4gIGNyZWF0ZVByb2plY3RUb2RvKHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7cHJvamVjdE5hbWV9LWlucHV0YCk7XG4gICAgY29uc3QgZGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7cHJvamVjdE5hbWV9LWRhdGUtaW5wdXRgKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBwcm9qZWN0IHRvZG8gb2JqZWN0XG4gICAgICogQHR5cGVkZWYge09iamVjdH0gUHJvamVjdFRvZG9cbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gaWQgLSBUaGUgaWQgb2YgdGhlIHRvZG9cbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSB0b2RvXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IHByb2ogLSBUaGUgbmFtZSBvZiB0aGUgcHJvamVjdFxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkYXRlIC0gVGhlIGRhdGUgb2YgdGhlIHRvZG9cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgcHJvamVjdCB0b2RvIG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMge1Byb2plY3RUb2RvfSBUaGUgcHJvamVjdCB0b2RvIG9iamVjdFxuICAgICAqL1xuICAgIGNvbnN0IHByb2plY3RUb2RvID0ge1xuICAgICAgaWQ6IHRoaXMucHJvamVjdElkQ291bnRlcisrLFxuICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgcHJvajogcHJvamVjdE5hbWUsXG4gICAgICBkYXRlOiBkYXRlSW5wdXQudmFsdWUsXG4gICAgfTtcblxuICAgIGlmICghdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV0pIHtcbiAgICAgIHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV0ucHVzaChwcm9qZWN0VG9kbyk7XG4gICAgdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV0uc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKGEuZGF0ZSkgLSBuZXcgRGF0ZShiLmRhdGUpO1xuICAgIH0pO1xuXG4gICAgbmFtZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICBkYXRlSW5wdXQudmFsdWUgPSBcIlwiO1xuXG4gICAgY29uc3QgaXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgYCR7cHJvamVjdE5hbWV9LWl0ZW1Db250YWluZXJgXG4gICAgKTtcblxuICAgIGlmIChpdGVtQ29udGFpbmVyKSB7XG4gICAgICBpdGVtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgIHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVQcm9qZWN0VG9kb0l0ZW0odG9kbywgcHJvamVjdE5hbWUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgIFwiSXRlbSBDb250YWluZXIgd2l0aCBJRCAke3Byb2plY3ROYW1lfS1pdGVtQ29udGFpbmVyIG5vdCBmb3VuZFwiXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLnNhdmVQcm9qZWN0VG9kb3MoKTtcbiAgICByZXR1cm4gcHJvamVjdFRvZG87XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBwcm9qZWN0IHRvZG8gaXRlbSB3aXRoIHRoZSBnaXZlbiBwcm9qZWN0IG5hbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IHRvZG8gLSBUaGUgdG9kbyBvYmplY3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3ROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb2plY3RcbiAgICovXG4gIGNyZWF0ZVByb2plY3RUb2RvSXRlbSh0b2RvLCBwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IG5hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNVwiKTtcbiAgICBjb25zdCBkYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDVcIik7XG5cbiAgICBjb25zdCB0b2RvSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKGB0b2RvLSR7dG9kby5pZH1gLCBcInRvZG9JdGVtXCIpO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjaGVja2JveCBjb250YWluZXIgZm9yIHRoZSBnaXZlbiB0b2RvXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRvZG8gLSBUaGUgdG9kbyBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7SFRNTERpdkVsZW1lbnR9IFRoZSBjaGVja2JveCBjb250YWluZXIgZWxlbWVudFxuICAgICAqL1xuICAgIGNvbnN0IGNoZWNrYm94Q29udGFpbmVyID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUNoZWNrYm94Q29udGFpbmVyKHRvZG8pO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNoZWNrYm94IGVsZW1lbnQgd2l0aGluIHRoZSBjb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudH1cbiAgICAgKi9cbiAgICBjb25zdCBjaGVja2JveCA9IGNoZWNrYm94Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPSdjaGVja2JveCddXCIpO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBjaGVja2JveCwgcmVtb3ZlcyB0aGUgdG9kbyBpdGVtIGlmIHRoZSBjaGVja2JveCBpcyBjaGVja2VkXG4gICAgICovXG4gICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlbW92ZVRvZG9JdGVtKHRvZG8uaWQsIHByb2plY3ROYW1lKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG5hbWVMYWJlbC50ZXh0Q29udGVudCA9IHRvZG8ubmFtZTtcbiAgICBkYXRlTGFiZWwudGV4dENvbnRlbnQgPSB0b2RvLmRhdGU7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHByaW9yaXR5IGljb24gZm9yIHRoZSBnaXZlbiB0b2RvIGFuZCB0b2RvIGl0ZW1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdG9kbyAtIFRoZSB0b2RvIG9iamVjdFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvZG9JdGVtIC0gVGhlIHRvZG8gaXRlbSBlbGVtZW50XG4gICAgICogQHJldHVybnMge0hUTUxFbGVtZW50fSBUaGUgcHJpb3JpdHkgaWNvbiBlbGVtZW50XG4gICAgICovXG4gICAgY29uc3QgcHJpb3JpdHlJY29uID0gdGhpcy5oYW5kbGVyLmNyZWF0ZVByaW9yaXR5SWNvbih0b2RvLCB0b2RvSXRlbSk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBsaXN0ZW5lciBmb3IgdGhlIHByaW9yaXR5IGljb24sIHRvZ2dsZXMgdGhlIHByaW9yaXR5IG9mIHRoZSB0b2RvXG4gICAgICovXG4gICAgcHJpb3JpdHlJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLnRvZ2dsZVByaW9yaXR5KHRvZG8uaWQsIHByb2plY3ROYW1lKTtcbiAgICB9KTtcblxuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKGNoZWNrYm94Q29udGFpbmVyKTtcbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKGRhdGVMYWJlbCk7XG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQocHJpb3JpdHlJY29uKTtcblxuICAgIGNvbnN0IGl0ZW1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIGAke3Byb2plY3ROYW1lfS1pdGVtQ29udGFpbmVyYFxuICAgICk7XG5cbiAgICBpdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgdG9kbyBpdGVtIGZyb20gdGhlIGdpdmVuIHByb2plY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRvZG9JZCAtIFRoZSBpZCBvZiB0aGUgdG9kbyBpdGVtXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0XG4gICAqL1xuICByZW1vdmVUb2RvSXRlbSh0b2RvSWQsIHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgcHJvamVjdFRvZG9zID0gdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV07XG4gICAgaWYgKHByb2plY3RUb2Rvcykge1xuICAgICAgY29uc3QgaW5kZXggPSBwcm9qZWN0VG9kb3MuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSB0b2RvSWQpO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBwcm9qZWN0VG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5yZW9yZGVyVG9kbyhwcm9qZWN0TmFtZSk7XG4gICAgICAgIC8vIFVwZGF0ZSBsb2NhbCBzdG9yYWdlXG4gICAgICAgIHRoaXMuc2F2ZVByb2plY3RUb2RvcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBwcmlvcml0eSBvZiBhIHRvZG8gd2l0aCB0aGUgZ2l2ZW4gaWQgaW4gdGhlIGdpdmVuIHByb2plY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRvZG9JZCAtIFRoZSBpZCBvZiB0aGUgdG9kb1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvamVjdFxuICAgKi9cbiAgdG9nZ2xlUHJpb3JpdHkodG9kb0lkLCBwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IHByb2plY3RUb2RvcyA9IHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdO1xuICAgIGlmIChwcm9qZWN0VG9kb3MpIHtcbiAgICAgIGNvbnN0IHRvZG8gPSBwcm9qZWN0VG9kb3MuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gdG9kb0lkKTtcbiAgICAgIGlmICh0b2RvKSB7XG4gICAgICAgIHRvZG8ucHJpb3JpdHkgPSAhdG9kby5wcmlvcml0eTtcbiAgICAgICAgdGhpcy5yZW9yZGVyVG9kbyhwcm9qZWN0TmFtZSk7XG4gICAgICAgIC8vIFVwZGF0ZSBsb2NhbCBzdG9yYWdlXG4gICAgICAgIHRoaXMuc2F2ZVByb2plY3RUb2RvcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW9yZGVycyB0aGUgdG9kbyBpdGVtcyBpbiB0aGUgZ2l2ZW4gcHJvamVjdCBiYXNlZCBvbiB0aGVpciBwcmlvcml0eSBhbmQgZGF0ZS5cbiAgICogSWYgdHdvIHRvZG9zIGhhdmUgdGhlIHNhbWUgcHJpb3JpdHksIHRoZSBvbmUgd2l0aCB0aGUgZWFybGllc3QgZGF0ZSBpcyBtb3ZlZCB0byB0aGUgdG9wLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvamVjdFxuICAgKi9cbiAgcmVvcmRlclRvZG8ocHJvamVjdE5hbWUpIHtcbiAgICBpZiAodGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV0pIHtcbiAgICAgIHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEucHJpb3JpdHkgPT09IGIucHJpb3JpdHkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IERhdGUoYS5kYXRlKSAtIG5ldyBEYXRlKGIuZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgb25seSBvbmUgaGFzIHByaW9yaXR5LCBwcmlvcml0aXplIGl0XG4gICAgICAgIHJldHVybiBhLnByaW9yaXR5ID8gLTEgOiAxO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGl0ZW1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgYCR7cHJvamVjdE5hbWV9LWl0ZW1Db250YWluZXJgXG4gICAgICApO1xuICAgICAgaXRlbUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICB0aGlzLnByb2plY3RzW3Byb2plY3ROYW1lXS5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICAgIHRoaXMuY3JlYXRlUHJvamVjdFRvZG9JdGVtKHRvZG8sIHByb2plY3ROYW1lKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlcyB0aGUgcHJvamVjdCBkYXRhIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICovXG4gIHNhdmVQcm9qZWN0VG9kb3MoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnByb2plY3RzKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIHByb2plY3QgZnJvbSB0aGUgcHJvamVjdCBsaXN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0IHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnByb2plY3RzW3Byb2plY3ROYW1lXTsgLy8gUmVtb3ZlIHRoZSBwcm9qZWN0IGZyb20gdGhlIHByb2plY3RzIG9iamVjdFxuICAgIHRoaXMuc2F2ZVByb2plY3RUb2RvcygpOyAvLyBVcGRhdGUgbG9jYWwgc3RvcmFnZVxuICB9XG5cbiAgLyoqXG4gICAqIFNhdmVzIHRoZSBwcm9qZWN0IGRhdGEgdG8gbG9jYWwgc3RvcmFnZVxuICAgKi9cbiAgc2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnByb2plY3RzKSk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZXMgYSBwcm9qZWN0IHRvIHRoZSBsaXN0IG9mIHByb2plY3RzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0IHRvIHNhdmVcbiAgICovXG4gIHNhdmVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgbGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvamVjdHMpKSB7XG4gICAgICBwcm9qZWN0cyA9IFtdO1xuICAgIH1cbiAgICBpZiAoIXByb2plY3RzLmluY2x1ZGVzKHByb2plY3ROYW1lKSkge1xuICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0TmFtZSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgcHJvamVjdCBidXR0b24gYW5kIGFkZHMgaXQgdG8gdGhlIERPTVxuICAgKi9cbiAgcmVjcmVhdGVQcm9qZWN0QnV0dG9uKCkge1xuICAgIGNvbnN0IHByb2pMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0TGlzdFwiKTtcbiAgICBsZXQgdG9kb0Zvcm1DcmVhdGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBwcm9qZWN0TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnByb2plY3RzKTtcblxuICAgIC8vIENsZWFyIGV4aXN0aW5nIHByb2plY3QgYnV0dG9uc1xuICAgIHByb2pMaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IHByb2plY3ROYW1lIG9mIHByb2plY3ROYW1lcykge1xuICAgICAgY29uc3QgcHJvakJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBwcm9qQnRuLmNsYXNzTGlzdC5hZGQoXCJwcm9qQnRuXCIpO1xuICAgICAgcHJvakJ0bi5pZCA9IHByb2plY3ROYW1lO1xuXG4gICAgICBwcm9qQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmICghdG9kb0Zvcm1DcmVhdGVkKSB7XG4gICAgICAgICAgdGhpcy5zaG93UHJvamVjdEZvcm0ocHJvamVjdE5hbWUpO1xuICAgICAgICAgIHRoaXMuY3JlYXRlUHJvamVjdFRvZG9Gb3JtKHByb2plY3ROYW1lKTtcbiAgICAgICAgICB0b2RvRm9ybUNyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJvamVjdCBidG4gY2xpY2tlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhpZGVQcm9qZWN0Rm9ybSgpO1xuICAgICAgICAgIHRoaXMuc2hvd1Byb2plY3RGb3JtKHByb2plY3ROYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHByb2pMaXN0LmFwcGVuZENoaWxkKHByb2pCdG4pO1xuXG4gICAgICBjb25zdCBwcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIHByb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcbiAgICAgIHByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZChcInByb2plY3RCdG5cIik7XG4gICAgICBwcm9qZWN0QnV0dG9uLmlkID0gcHJvamVjdE5hbWU7XG5cbiAgICAgIGNvbnN0IGRlbGV0ZVByb2ogPSB0aGlzLmhhbmRsZXIuY3JlYXRlQnV0dG9uKFwiWFwiLCBcImRlbGV0ZUJ0blwiKTtcblxuICAgICAgZGVsZXRlUHJvai5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBwcm9qQnRuLnJlbW92ZSgpO1xuXG4gICAgICAgIGNvbnN0IHRvZG9Gb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgYCR7cHJvamVjdE5hbWV9LWZvcm1gXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRvZG9Gb3JtQ29udGFpbmVyKSB7XG4gICAgICAgICAgdG9kb0Zvcm1Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV07XG4gICAgICAgIC8vIFJlbW92ZSBwcm9qZWN0IG5hbWUgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgdGhpcy5yZW1vdmVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9qQnRuLmFwcGVuZENoaWxkKHByb2plY3RCdXR0b24pO1xuICAgICAgcHJvakJ0bi5hcHBlbmRDaGlsZChkZWxldGVQcm9qKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnRzIHRoZSBwcm9qZWN0IGRhdGEgYXMgYW4gYXJyYXkgb2Ygb2JqZWN0cywgd2hlcmUgZWFjaCBvYmplY3QgcmVwcmVzZW50cyBhIHByb2plY3QgYW5kIGNvbnRhaW5zIGFuIGFycmF5IG9mIHRvZG9zIGZvciB0aGF0IHByb2plY3RcbiAgICogQHJldHVybnMge09iamVjdFtdfSBBbiBhcnJheSBvZiBvYmplY3RzLCB3aGVyZSBlYWNoIG9iamVjdCByZXByZXNlbnRzIGEgcHJvamVjdCBhbmQgY29udGFpbnMgYW4gYXJyYXkgb2YgdG9kb3MgZm9yIHRoYXQgcHJvamVjdFxuICAgKi9cbiAgZXhwb3J0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucHJvamVjdHMpLm1hcCgocHJvamVjdE5hbWUpID0+ICh7XG4gICAgICBuYW1lOiBwcm9qZWN0TmFtZSxcbiAgICAgIHRvZG9zOiB0aGlzLnByb2plY3RzW3Byb2plY3ROYW1lXSxcbiAgICB9KSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDtcbiIsImltcG9ydCBIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJcIjtcblxuY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlciA9IG5ldyBIYW5kbGVyKCk7XG4gICAgdGhpcy50b2RvID0gW107XG4gICAgdGhpcy50b2RvSWRDb3VudGVyID0gMDtcbiAgICB0aGlzLnRvZG9Db250YWluZXIgPSBudWxsO1xuICAgIHRoaXMubG9hZFRvZG9MaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgdGhhdCBjb250YWlucyB0aGUgdG9kbyBsaXN0XG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciAtIFRoZSBET00gZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSB0b2RvIGxpc3RcbiAgICovXG4gIHNldFRvZG9Db250YWluZXIoY29udGFpbmVyKSB7XG4gICAgdGhpcy50b2RvQ29udGFpbmVyID0gY29udGFpbmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGZvcm0gZm9yIGFkZGluZyBuZXcgdG9kb3NcbiAgICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fSBUaGUgZm9ybSBlbGVtZW50XG4gICAqL1xuICBjcmVhdGVUb2RvTGlzdEZvcm0oKSB7XG4gICAgY29uc3QgdG9kb0NvbnRhaW5lciA9IHRoaXMuaGFuZGxlci5jcmVhdGVUb2RvQ29udGFpbmVyKCk7XG4gICAgY29uc3QgaXRlbUNvbnRhaW5lciA9IHRoaXMuaGFuZGxlci5jcmVhdGVJdGVtQ29udGFpbmVyKCk7XG5cbiAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmb3JtQ29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcInRvZG8tZm9ybVwiKTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5wdXQgZWxlbWVudCB3aXRoIHRoZSBzcGVjaWZpZWQgdHlwZSBhbmQgcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSBpbnB1dCB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyIC0gVGhlIGlucHV0IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSByZXF1aXJlZCAtIFdoZXRoZXIgdGhlIGlucHV0IGlzIHJlcXVpcmVkXG4gICAgICogQHJldHVybnMge0hUTUxJbnB1dEVsZW1lbnR9IFRoZSBpbnB1dCBlbGVtZW50XG4gICAgICovXG4gICAgY29uc3QgY3JlYXRlSW5wdXQgPSAodHlwZSwgcGxhY2Vob2xkZXIsIHJlcXVpcmVkKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgdHlwZSk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBwbGFjZWhvbGRlcik7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCByZXF1aXJlZCk7XG4gICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBidXR0b24gd2l0aCB0aGUgc3BlY2lmaWVkIHRleHQgYW5kIGNsYXNzIG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIFRoZSBidXR0b24gdGV4dFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgYnV0dG9uIGNsYXNzIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7SFRNTEJ1dHRvbkVsZW1lbnR9IFRoZSBidXR0b24gZWxlbWVudFxuICAgICAqL1xuICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbiA9ICh0ZXh0LCBjbGFzc05hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgIHJldHVybiBidXR0b247XG4gICAgfTtcblxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGNyZWF0ZUlucHV0KFwidGV4dFwiLCBcIlRvZG8gTmFtZVwiLCB0cnVlKTtcbiAgICBuYW1lSW5wdXQuY2xhc3NMaXN0LmFkZChcIm5hbWUtaW5wdXRcIik7XG5cbiAgICBjb25zdCBkYXRlSW5wdXQgPSBjcmVhdGVJbnB1dChcImRhdGVcIiwgXCJcIiwgdHJ1ZSk7XG4gICAgZGF0ZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJkYXRlLWlucHV0XCIpO1xuXG4gICAgY29uc3QgYWRkQnRuID0gY3JlYXRlQnV0dG9uKFwiQWRkIFRvZG9cIiwgXCJhZGRCdG5cIik7XG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNyZWF0ZVRvZG8oKTtcblxuICAgICAgXG4gICAgfSk7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkYXRlSW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoYWRkQnRuKTtcbiAgICBmb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIHRvZG9Db250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybUNvbnRhaW5lcik7XG4gICAgdG9kb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpdGVtQ29udGFpbmVyKTtcblxuICAgIHJldHVybiB0b2RvQ29udGFpbmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgdG9kbyBpdGVtXG4gICAqL1xuICBjcmVhdGVUb2RvKCkge1xuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dFwiKTtcbiAgICBjb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGUtaW5wdXRcIik7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7eyBpZDogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGRhdGU6IHN0cmluZywgcHJpb3JpdHk6IGJvb2xlYW4gfVtdfVxuICAgICAqL1xuICAgIGNvbnN0IHRvZG8gPSB7XG4gICAgICBpZDogdGhpcy50b2RvSWRDb3VudGVyKyssXG4gICAgICBuYW1lOiBuYW1lSW5wdXQudmFsdWUsXG4gICAgICBkYXRlOiBkYXRlSW5wdXQudmFsdWUsXG4gICAgICBwcmlvcml0eTogZmFsc2UsXG4gICAgfTtcblxuICAgIHRoaXMudG9kby5wdXNoKHRvZG8pO1xuICAgIHRoaXMudG9kby5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoYS5kYXRlKSAtIG5ldyBEYXRlKGIuZGF0ZSk7XG4gICAgfSk7XG5cbiAgICBuYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIGRhdGVJbnB1dC52YWx1ZSA9IFwiXCI7XG5cbiAgICB0aGlzLnNhdmVUb2RvTGlzdCgpO1xuXG4gICAgY29uc3QgaXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaXRlbUNvbnRhaW5lclwiKTtcbiAgICBpdGVtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICB0aGlzLnRvZG8uZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgdGhpcy5jcmVhdGVUb2RvSXRlbSh0b2RvKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudG9kbyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyB0b2RvIGl0ZW1cbiAgICogQHBhcmFtIHtvYmplY3R9IHRvZG8gLSBUaGUgdG9kbyBvYmplY3RcbiAgICovXG4gIGNyZWF0ZVRvZG9JdGVtKHRvZG8pIHtcbiAgICBjb25zdCBuYW1lTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDVcIik7XG4gICAgY29uc3QgZGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuXG4gICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZChgdG9kby0ke3RvZG8uaWR9YCwgXCJ0b2RvSXRlbVwiKTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGNoZWNrYm94IGNvbnRhaW5lciBmb3IgdGhlIHRvZG8gaXRlbVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0b2RvIC0gVGhlIHRvZG8gb2JqZWN0XG4gICAgICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fSBUaGUgY2hlY2tib3ggY29udGFpbmVyIGVsZW1lbnRcbiAgICAgKi9cbiAgICBjb25zdCBjaGVja2JveENvbnRhaW5lciA9IHRoaXMuaGFuZGxlci5jcmVhdGVDaGVja2JveENvbnRhaW5lcih0b2RvKTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNoZWNrYm94IGVsZW1lbnQgZnJvbSB0aGUgY2hlY2tib3ggY29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9XG4gICAgICovXG4gICAgY29uc3QgY2hlY2tib3ggPSBjaGVja2JveENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbdHlwZT0nY2hlY2tib3gnXVwiKTtcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlVG9kb0l0ZW0odG9kby5pZCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBuYW1lTGFiZWwudGV4dENvbnRlbnQgPSB0b2RvLm5hbWU7XG4gICAgZGF0ZUxhYmVsLnRleHRDb250ZW50ID0gdG9kby5kYXRlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgcHJpb3JpdHkgaWNvbiBmb3IgdGhlIHRvZG8gaXRlbVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0b2RvIC0gVGhlIHRvZG8gb2JqZWN0XG4gICAgICogQHBhcmFtIHtIVE1MTElFbGVtZW50fSB0b2RvSXRlbSAtIFRoZSB0b2RvIGl0ZW0gZWxlbWVudFxuICAgICAqIEByZXR1cm5zIHtIVE1MU3BhbkVsZW1lbnR9IFRoZSBwcmlvcml0eSBpY29uIGVsZW1lbnRcbiAgICAgKi9cbiAgICBjb25zdCBwcmlvcml0eUljb24gPSB0aGlzLmhhbmRsZXIuY3JlYXRlUHJpb3JpdHlJY29uKHRvZG8sIHRvZG9JdGVtKTtcbiAgICBwcmlvcml0eUljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMudG9nZ2xlUHJpb3JpdHkodG9kby5pZCk7XG4gICAgfSk7XG5cbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChjaGVja2JveENvbnRhaW5lcik7XG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHByaW9yaXR5SWNvbik7XG5cbiAgICBjb25zdCBpdGVtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pdGVtQ29udGFpbmVyXCIpO1xuXG4gICAgaXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIHRvZG8gaXRlbSBmcm9tIHRoZSBsaXN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0b2RvSWQgLSBUaGUgaWQgb2YgdGhlIHRvZG8gaXRlbSB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZVRvZG9JdGVtKHRvZG9JZCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy50b2RvLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gdG9kb0lkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLnRvZG8uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMucmVvcmRlclRvZG8oKTtcbiAgICB9XG4gICAgdGhpcy5zYXZlVG9kb0xpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBwcmlvcml0eSBvZiBhIHRvZG8gaXRlbVxuICAgKiBAcGFyYW0ge251bWJlcn0gdG9kb0lkIC0gVGhlIGlkIG9mIHRoZSB0b2RvIGl0ZW0gdG8gdG9nZ2xlIHRoZSBwcmlvcml0eSBvZlxuICAgKi9cbiAgdG9nZ2xlUHJpb3JpdHkodG9kb0lkKSB7XG4gICAgY29uc3QgdG9kbyA9IHRoaXMudG9kby5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSB0b2RvSWQpO1xuICAgIGlmICh0b2RvKSB7XG4gICAgICB0b2RvLnByaW9yaXR5ID0gIXRvZG8ucHJpb3JpdHk7XG4gICAgICB0aGlzLnJlb3JkZXJUb2RvKCk7XG4gICAgfVxuICAgIHRoaXMuc2F2ZVRvZG9MaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogUmVvcmRlcnMgdGhlIHRvZG8gbGlzdCBiYXNlZCBvbiB0aGUgcHJpb3JpdHkgYW5kIGRhdGVcbiAgICovXG4gIHJlb3JkZXJUb2RvKCkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHt7IGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZywgZGF0ZTogc3RyaW5nLCBwcmlvcml0eTogYm9vbGVhbiB9W119XG4gICAgICovXG4gICAgY29uc3QgdG9kbyA9IHRoaXMudG9kbztcblxuICAgIHRvZG8uc29ydCgoYSwgYikgPT4ge1xuICAgICAgaWYgKGEucHJpb3JpdHkgJiYgIWIucHJpb3JpdHkpIHJldHVybiAtMTtcbiAgICAgIGlmICghYS5wcmlvcml0eSAmJiBiLnByaW9yaXR5KSByZXR1cm4gMTtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShhLmRhdGUpIC0gbmV3IERhdGUoYi5kYXRlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGl0ZW1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLml0ZW1Db250YWluZXJcIik7XG4gICAgaXRlbUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgdG9kby5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICB0aGlzLmNyZWF0ZVRvZG9JdGVtKHRvZG8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmVzIHRoZSB0b2RvIGxpc3QgdG8gbG9jYWwgc3RvcmFnZVxuICAgKi9cbiAgc2F2ZVRvZG9MaXN0KCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kb0xpc3RcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy50b2RvKSk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgdGhlIHRvZG8gbGlzdCBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgICovXG4gIGxvYWRUb2RvTGlzdCgpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7eyBpZDogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGRhdGU6IHN0cmluZywgcHJpb3JpdHk6IGJvb2xlYW4gfVtdfVxuICAgICAqL1xuICAgIGNvbnN0IHRvZG9MaXN0RGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvTGlzdFwiKSkgfHwgW107XG4gICAgdGhpcy50b2RvID0gdG9kb0xpc3REYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIHRvZG8gbGlzdFxuICAgKi9cbiAgcmVuZGVyVG9kb0xpc3QoKSB7XG4gICAgY29uc3QgaXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaXRlbUNvbnRhaW5lclwiKTtcbiAgICBpdGVtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICB0aGlzLnRvZG8uZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgY29uc3QgbmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuICAgICAgY29uc3QgZGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuXG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBuZXcgaDUgZWxlbWVudCB3aXRoIHRoZSBzcGVjaWZpZWQgdGV4dCBjb250ZW50XG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIFRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIGg1IGVsZW1lbnRcbiAgICAgICAqIEByZXR1cm5zIHtIVE1MSGVhZGluZ0VsZW1lbnR9IFRoZSBoNSBlbGVtZW50XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGNyZWF0ZUxhYmVsID0gKHRleHQpID0+IHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDVcIik7XG4gICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKGB0b2RvLSR7dG9kby5pZH1gLCBcInRvZG9JdGVtXCIpO1xuXG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgdGhlIGNoZWNrYm94IGNvbnRhaW5lciBmb3IgdGhlIHRvZG8gaXRlbVxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRvZG8gLSBUaGUgdG9kbyBvYmplY3RcbiAgICAgICAqIEByZXR1cm5zIHtIVE1MRGl2RWxlbWVudH0gVGhlIGNoZWNrYm94IGNvbnRhaW5lciBlbGVtZW50XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGNoZWNrYm94Q29udGFpbmVyID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUNoZWNrYm94Q29udGFpbmVyKHRvZG8pO1xuXG4gICAgICAvKipcbiAgICAgICAqIEdldHMgdGhlIGNoZWNrYm94IGVsZW1lbnQgZnJvbSB0aGUgY2hlY2tib3ggY29udGFpbmVyXG4gICAgICAgKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudH1cbiAgICAgICAqL1xuICAgICAgY29uc3QgY2hlY2tib3ggPSBjaGVja2JveENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcImlucHV0W3R5cGU9J2NoZWNrYm94J11cIlxuICAgICAgKTtcbiAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2RvSXRlbSh0b2RvLmlkKTtcbiAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgbmFtZUxhYmVsLnRleHRDb250ZW50ID0gdG9kby5uYW1lO1xuICAgICAgZGF0ZUxhYmVsLnRleHRDb250ZW50ID0gdG9kby5kYXRlO1xuXG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgdGhlIHByaW9yaXR5IGljb24gZm9yIHRoZSB0b2RvIGl0ZW1cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0b2RvIC0gVGhlIHRvZG8gb2JqZWN0XG4gICAgICAgKiBAcGFyYW0ge0hUTUxMSUVsZW1lbnR9IHRvZG9JdGVtIC0gVGhlIHRvZG8gaXRlbSBlbGVtZW50XG4gICAgICAgKiBAcmV0dXJucyB7SFRNTFNwYW5FbGVtZW50fSBUaGUgcHJpb3JpdHkgaWNvbiBlbGVtZW50XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHByaW9yaXR5SWNvbiA9IHRoaXMuaGFuZGxlci5jcmVhdGVQcmlvcml0eUljb24odG9kbywgdG9kb0l0ZW0pO1xuICAgICAgcHJpb3JpdHlJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlUHJpb3JpdHkodG9kby5pZCk7XG4gICAgICB9KTtcblxuICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoY2hlY2tib3hDb250YWluZXIpO1xuICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoY3JlYXRlTGFiZWwodG9kby5uYW1lKSk7XG4gICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChjcmVhdGVMYWJlbCh0b2RvLmRhdGUpKTtcbiAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHByaW9yaXR5SWNvbik7XG5cbiAgICAgIGl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIHRvZG8gbGlzdCBhcyBhIEpTT04gc3RyaW5nXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0b2RvIGxpc3QgYXMgYSBKU09OIHN0cmluZ1xuICAgKi9cbiAgZXhwb3J0VG9kbygpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b2RvKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVG9kbztcbiIsImltcG9ydCBIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJcIjtcbmltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG9cIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCBGaWx0ZXIgZnJvbSBcIi4vZmlsdGVyXCI7XG5cbmNsYXNzIFdlYnNpdGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRvZG8gPSBuZXcgVG9kbygpO1xuICAgIHRoaXMuaGFuZGxlciA9IG5ldyBIYW5kbGVyKCk7XG4gICAgdGhpcy5wcm9qZWN0ID0gbmV3IFByb2plY3QoKTtcbiAgICB0aGlzLmZpbHRlciA9IG5ldyBGaWx0ZXIoKTtcbiAgICB0aGlzLmZvcm1DcmVhdGVkID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IFwiXCI7XG4gICAgdGhpcy5jdXJyZW50VmlzaWJsZUNvbnRhaW5lciA9IG51bGw7XG4gIH1cblxuICBjcmVhdGVIZWFkZXIoKSB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiVG8tRG8gTGlzdFwiO1xuXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIH1cblxuICBjcmVhdGVDb250ZW50KCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImNvbnRlbnRcIik7XG4gICAgY29udGVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1haW5Db250ZW50XCIpO1xuXG4gICAgY29uc3QgaW5ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGluYm94LmNsYXNzTGlzdC5hZGQoXCJpbmJveENvbnRhaW5lclwiLCBcImhpZGRlblwiKTtcblxuICAgIGNvbnN0IHRvZGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RheS5jbGFzc0xpc3QuYWRkKFwidG9kYXlDb250YWluZXJcIiwgXCJoaWRkZW5cIik7XG5cbiAgICBjb25zdCB3ZWVrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB3ZWVrLmNsYXNzTGlzdC5hZGQoXCJ3ZWVrQ29udGFpbmVyXCIsIFwiaGlkZGVuXCIpO1xuXG4gICAgY29uc3QgcHJvamVjdFRvZG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RUb2RvLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0Q29udGFpbmVyXCIsIFwiaGlkZGVuXCIpO1xuXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChpbmJveCk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZCh0b2RheSk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZCh3ZWVrKTtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKHByb2plY3RUb2RvKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBzaG93Q29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIGlmICh0aGlzLmN1cnJlbnRWaXNpYmxlQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLmN1cnJlbnRWaXNpYmxlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgfVxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIHRoaXMuY3VycmVudFZpc2libGVDb250YWluZXIgPSBjb250YWluZXI7XG4gIH1cblxuICBhY3RpdmVCdXR0b24oYnV0dG9uKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2lkZU1lbnUgYnV0dG9uXCIpO1xuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgICBpZiAoYnRuICE9PSBidXR0b24pIHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIGNyZWF0ZVNpZGVNZW51KCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnQoKTtcblxuICAgIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaWRlTWVudS5jbGFzc0xpc3QuYWRkKFwic2lkZU1lbnVcIik7XG5cbiAgICBjb25zdCBob21lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBob21lLmNsYXNzTGlzdC5hZGQoXCJob21lXCIpO1xuICAgIGhvbWUuaW5uZXJIVE1MID0gXCI8aDE+SG9tZTwvaDE+XCI7XG5cbiAgICBjb25zdCBpbmJveEJ0biA9IHRoaXMuaGFuZGxlci5jcmVhdGVCdXR0b24oXCJJbmJveFwiLCBcImluYm94XCIpO1xuICAgIGluYm94QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghdGhpcy50b2RvKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0b2RvIG9iamVjdCBpcyBub3QgaW5zdGFudGlhdGVkLlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbmJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ib3hDb250YWluZXJcIik7XG4gICAgICB0aGlzLnNob3dDb250YWluZXIoaW5ib3gpO1xuICAgICAgdGhpcy5hY3RpdmVCdXR0b24oZXZlbnQuY3VycmVudFRhcmdldCk7XG5cbiAgICAgIGlmICghdGhpcy5mb3JtQ3JlYXRlZCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluYm94Q29udGFpbmVyXCIpO1xuICAgICAgICBjb25zdCBmb3JtID0gdGhpcy50b2RvLmNyZWF0ZVRvZG9MaXN0Rm9ybSgpO1xuXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgICAgICB0aGlzLmZvcm1DcmVhdGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2RvLnJlbmRlclRvZG9MaXN0KCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2RheUJ0biA9IHRoaXMuaGFuZGxlci5jcmVhdGVCdXR0b24oXCJUb2RheVwiLCBcInRvZGF5XCIpO1xuICAgIHRvZGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvZG9MaXN0RGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvTGlzdFwiKSkgfHwgW107XG4gICAgICBjb25zdCBwcm9qZWN0c0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IHt9O1xuICAgICAgY29uc29sZS5sb2coXCJ0b2RvTGlzdERhdGEgaW4gdG9kYXlCdG46XCIsIHRvZG9MaXN0RGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyhcInByb2plY3RzRGF0YSBpbiB0b2RheUJ0bjpcIiwgcHJvamVjdHNEYXRhKTtcblxuICAgICAgY29uc3QgdG9kYXlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZGF5Q29udGFpbmVyXCIpO1xuICAgICAgdGhpcy5zaG93Q29udGFpbmVyKHRvZGF5Q29udGFpbmVyKTtcbiAgICAgIHRoaXMuYWN0aXZlQnV0dG9uKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICBsZXQgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb0NvbnRhaW5lci50b2RheVwiKTtcbiAgICAgIGlmICghdG9kb0NvbnRhaW5lcikge1xuICAgICAgICB0b2RvQ29udGFpbmVyID0gdGhpcy5oYW5kbGVyLmNyZWF0ZVRvZG9Db250YWluZXIoKTtcbiAgICAgICAgdG9kb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidG9kYXlcIik7IC8vIEFkZCBhIGNsYXNzIHRvIGlkZW50aWZ5IHRoZSBjb250YWluZXJcbiAgICAgICAgdG9kYXlDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0NvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIHRvZG9Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgY29uc3QgdG9kb0R1ZVRvZGF5ID0gdGhpcy5maWx0ZXIuZmlsdGVyRHVlVG9kYXkodG9kb0xpc3REYXRhKTtcbiAgICAgIGNvbnN0IHByb2plY3REdWVUb2RheSA9IHRoaXMuZmlsdGVyLmZpbHRlclByb2plY3RzRHVlVG9kYXkocHJvamVjdHNEYXRhKTtcbiAgICAgIGNvbnN0IGR1ZVRvZGF5SXRlbXMgPSBbLi4udG9kb0R1ZVRvZGF5LCAuLi5wcm9qZWN0RHVlVG9kYXldO1xuXG4gICAgICB0b2RvQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICB0aGlzLmZpbHRlci5yZW5kZXJGaWx0ZXJlZFRvZG9MaXN0KGR1ZVRvZGF5SXRlbXMsIHRvZG9Db250YWluZXIpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgd2Vla0J0biA9IHRoaXMuaGFuZGxlci5jcmVhdGVCdXR0b24oXCJUaGlzIFdlZWtcIiwgXCJ0aGlzV2Vla1wiKTtcbiAgICB3ZWVrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvZG9MaXN0RGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvTGlzdFwiKSkgfHwgW107XG4gICAgICBjb25zdCBwcm9qZWN0c0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IHt9O1xuICAgICAgY29uc29sZS5sb2coXCJ0b2RvTGlzdERhdGEgaW4gd2Vla0J0bjpcIiwgdG9kb0xpc3REYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKFwicHJvamVjdHNEYXRhIGluIHdlZWtCdG46XCIsIHByb2plY3RzRGF0YSk7XG5cbiAgICAgIGNvbnN0IHdlZWtDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWtDb250YWluZXJcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIndlZWsgY29udGFpbmVyOlwiLCB3ZWVrQ29udGFpbmVyKTtcbiAgICAgIHRoaXMuc2hvd0NvbnRhaW5lcih3ZWVrQ29udGFpbmVyKTtcbiAgICAgIHRoaXMuYWN0aXZlQnV0dG9uKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICBsZXQgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb0NvbnRhaW5lci53ZWVrXCIpO1xuICAgICAgY29uc29sZS5sb2coXCJleGlzdGluZyB0b2RvIGNvbnRhaW5lclwiLCB0b2RvQ29udGFpbmVyKTtcbiAgICAgIGlmICghdG9kb0NvbnRhaW5lcikge1xuICAgICAgICB0b2RvQ29udGFpbmVyID0gdGhpcy5oYW5kbGVyLmNyZWF0ZVRvZG9Db250YWluZXIoKTtcbiAgICAgICAgdG9kb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwid2Vla1wiKTtcbiAgICAgICAgd2Vla0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdG9kb0R1ZVRoaXNXZWVrID0gdGhpcy5maWx0ZXIuZmlsdGVyRHVlVGhpc1dlZWsodG9kb0xpc3REYXRhKTtcbiAgICAgIGNvbnN0IHByb2plY3REdWVUaGlzV2VlayA9XG4gICAgICAgIHRoaXMuZmlsdGVyLmZpbHRlcmVkUHJvamVjdHNEdWVUaGlzV2Vlayhwcm9qZWN0c0RhdGEpO1xuICAgICAgY29uc3QgZHVlVGhpc1dlZWtJdGVtcyA9IFsuLi50b2RvRHVlVGhpc1dlZWssIC4uLnByb2plY3REdWVUaGlzV2Vla107XG4gICAgICBjb25zb2xlLmxvZyhcImR1ZSB0aGlzIHdlZWtcIiwgZHVlVGhpc1dlZWtJdGVtcyk7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwidG9kb0NvbnRhaW5lclwiLCB0b2RvQ29udGFpbmVyKTtcbiAgICAgIHRvZG9Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIHRoaXMuZmlsdGVyLnJlbmRlckZpbHRlcmVkVG9kb0xpc3QoZHVlVGhpc1dlZWtJdGVtcywgdG9kb0NvbnRhaW5lcik7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgIHByb2plY3QuaW5uZXJIVE1MID0gXCI8aDE+UHJvamVjdDwvaDE+XCI7XG5cbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdExpc3QuY2xhc3NMaXN0LmFkZChcInByb2plY3RMaXN0XCIpO1xuXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IHRoaXMuaGFuZGxlci5jcmVhdGVCdXR0b24oXCIrIEFkZCBQcm9qZWN0XCIsIFwiYWRkUHJvalwiKTtcbiAgICBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RDb250YWluZXJcIik7XG4gICAgICB0aGlzLnNob3dDb250YWluZXIocHJvamVjdENvbnRhaW5lcik7XG4gICAgICB0aGlzLnByb2plY3QuY3JlYXRlUHJvamVjdE5hbWUoKTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHByb2pCdG4gPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5wcm9qQnRuXCIpO1xuICAgICAgaWYgKHByb2pCdG4pIHtcbiAgICAgICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdENvbnRhaW5lclwiKTtcbiAgICAgICAgdGhpcy5zaG93Q29udGFpbmVyKHByb2plY3RDb250YWluZXIpO1xuICAgICAgfVxuICAgICAgY29uc3QgcHJvamVjdEJ0biA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByb2plY3RCdG5cIik7XG4gICAgICBpZiAocHJvamVjdEJ0bikge1xuICAgICAgICB0aGlzLmFjdGl2ZUJ1dHRvbihwcm9qZWN0QnRuKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHNpZGVNZW51LmFwcGVuZENoaWxkKGhvbWUpO1xuICAgIHNpZGVNZW51LmFwcGVuZENoaWxkKGluYm94QnRuKTtcbiAgICBzaWRlTWVudS5hcHBlbmRDaGlsZCh0b2RheUJ0bik7XG4gICAgc2lkZU1lbnUuYXBwZW5kQ2hpbGQod2Vla0J0bik7XG4gICAgc2lkZU1lbnUuYXBwZW5kQ2hpbGQocHJvamVjdCk7XG4gICAgcHJvamVjdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0KTtcbiAgICBwcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3RMaXN0KTtcblxuICAgIGNvbnN0IGZpcnN0Q29udGFpbmVyID0gY29udGVudC5xdWVyeVNlbGVjdG9yKFwiOnNjb3BlID4gZGl2XCIpO1xuICAgIHRoaXMuc2hvd0NvbnRhaW5lcihmaXJzdENvbnRhaW5lciwgXCJoaWRkZW5cIik7XG5cbiAgICBjb250ZW50Lmluc2VydEJlZm9yZShzaWRlTWVudSwgY29udGVudC5maXJzdENoaWxkKTtcblxuICAgIHRoaXMucHJvamVjdC5yZWNyZWF0ZVByb2plY3RCdXR0b24oKTtcbiAgfVxuXG4gIGNyZWF0ZUZvb3RlcigpIHtcbiAgICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICAgIGNvbnN0IGZvb3RlckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvb3RlckxpbmsuY2xhc3NMaXN0LmFkZChcImxpbmtcIik7XG5cbiAgICBjb25zdCBjb3B5cmlnaHQgPSB0aGlzLmNyZWF0ZUZvb3RlckxpbmsoXG4gICAgICAnQ29weXJpZ2h0IDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1jb3B5cmlnaHRcIj48L2k+IEpvc2hBbGxlbidcbiAgICApO1xuXG4gICAgZm9vdGVyTGluay5hcHBlbmRDaGlsZChjb3B5cmlnaHQpO1xuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChmb290ZXJMaW5rKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG4gIH1cblxuICBjcmVhdGVGb290ZXJMaW5rKHRleHQpIHtcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIGxpbmsuaW5uZXJIVE1MID0gdGV4dDtcblxuICAgIHJldHVybiBsaW5rO1xuICB9XG5cbiAgaW5pdFdlYnNpdGUoKSB7XG4gICAgdGhpcy5jcmVhdGVIZWFkZXIoKTtcbiAgICB0aGlzLmNyZWF0ZVNpZGVNZW51KCk7XG4gICAgdGhpcy5jcmVhdGVGb290ZXIoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJzaXRlO1xuIiwibGV0IGRlZmF1bHRPcHRpb25zID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgcmV0dXJuIGRlZmF1bHRPcHRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdE9wdGlvbnMobmV3T3B0aW9ucykge1xuICBkZWZhdWx0T3B0aW9ucyA9IG5ld09wdGlvbnM7XG59XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBlbmRPZldlZWt9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBlbmRPZldlZWtcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgZW5kIG9mIGEgd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IGVuZE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBTYXQgU2VwIDA2IDIwMTQgMjM6NTk6NTkuOTk5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRoZSB3ZWVrIHN0YXJ0cyBvbiBNb25kYXksIHRoZSBlbmQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBlbmRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSwgeyB3ZWVrU3RhcnRzT246IDEgfSlcbiAqIC8vPT4gU3VuIFNlcCAwNyAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5kT2ZXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCB3ZWVrU3RhcnRzT24gPVxuICAgIG9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICAwO1xuXG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkYXkgPSBfZGF0ZS5nZXREYXkoKTtcbiAgY29uc3QgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyAtNyA6IDApICsgNiAtIChkYXkgLSB3ZWVrU3RhcnRzT24pO1xuXG4gIF9kYXRlLnNldERhdGUoX2RhdGUuZ2V0RGF0ZSgpICsgZGlmZik7XG4gIF9kYXRlLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBlbmRPZldlZWs7XG4iLCJpbXBvcnQgeyBzdGFydE9mRGF5IH0gZnJvbSBcIi4vc3RhcnRPZkRheS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBpc1NhbWVEYXlcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSBkYXkgKGFuZCB5ZWFyIGFuZCBtb250aCk/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIGRheSAoYW5kIHllYXIgYW5kIG1vbnRoKT9cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZUxlZnQgLSBUaGUgZmlyc3QgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIGRhdGVSaWdodCAtIFRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuXG4gKiBAcmV0dXJucyBUaGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIGRheSAoYW5kIHllYXIgYW5kIG1vbnRoKVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgNCBTZXB0ZW1iZXIgMDY6MDA6MDAgYW5kIDQgU2VwdGVtYmVyIDE4OjAwOjAwIGluIHRoZSBzYW1lIGRheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzU2FtZURheShuZXcgRGF0ZSgyMDE0LCA4LCA0LCA2LCAwKSwgbmV3IERhdGUoMjAxNCwgOCwgNCwgMTgsIDApKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSA0IFNlcHRlbWJlciBhbmQgNCBPY3RvYmVyIGluIHRoZSBzYW1lIGRheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzU2FtZURheShuZXcgRGF0ZSgyMDE0LCA4LCA0KSwgbmV3IERhdGUoMjAxNCwgOSwgNCkpXG4gKiAvLz0+IGZhbHNlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSA0IFNlcHRlbWJlciwgMjAxNCBhbmQgNCBTZXB0ZW1iZXIsIDIwMTUgaW4gdGhlIHNhbWUgZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDQpLCBuZXcgRGF0ZSgyMDE1LCA4LCA0KSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZURheShkYXRlTGVmdCwgZGF0ZVJpZ2h0KSB7XG4gIGNvbnN0IGRhdGVMZWZ0U3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkoZGF0ZUxlZnQpO1xuICBjb25zdCBkYXRlUmlnaHRTdGFydE9mRGF5ID0gc3RhcnRPZkRheShkYXRlUmlnaHQpO1xuXG4gIHJldHVybiArZGF0ZUxlZnRTdGFydE9mRGF5ID09PSArZGF0ZVJpZ2h0U3RhcnRPZkRheTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc1NhbWVEYXk7XG4iLCJpbXBvcnQgeyBpc1NhbWVEYXkgfSBmcm9tIFwiLi9pc1NhbWVEYXkubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgaXNUb2RheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB0b2RheT9cbiAqIEBwdXJlIGZhbHNlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSB0b2RheT9cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBkYXRlIHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMgVGhlIGRhdGUgaXMgdG9kYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQsIGlzIDYgT2N0b2JlciAxNDowMDowMCB0b2RheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzVG9kYXkobmV3IERhdGUoMjAxNCwgOSwgNiwgMTQsIDApKVxuICogLy89PiB0cnVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1RvZGF5KGRhdGUpIHtcbiAgcmV0dXJuIGlzU2FtZURheShkYXRlLCBEYXRlLm5vdygpKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc1RvZGF5O1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGlzV2l0aGluSW50ZXJ2YWxcbiAqIEBjYXRlZ29yeSBJbnRlcnZhbCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB3aXRoaW4gdGhlIGludGVydmFsP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgd2l0aGluIHRoZSBpbnRlcnZhbD8gKEluY2x1ZGluZyBzdGFydCBhbmQgZW5kLilcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gaW50ZXJ2YWwgLSBUaGUgaW50ZXJ2YWwgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF0ZSBpcyB3aXRoaW4gdGhlIGludGVydmFsXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgZGF0ZSB3aXRoaW4gdGhlIGludGVydmFsOlxuICogaXNXaXRoaW5JbnRlcnZhbChuZXcgRGF0ZSgyMDE0LCAwLCAzKSwge1xuICogICBzdGFydDogbmV3IERhdGUoMjAxNCwgMCwgMSksXG4gKiAgIGVuZDogbmV3IERhdGUoMjAxNCwgMCwgNylcbiAqIH0pXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSBkYXRlIG91dHNpZGUgb2YgdGhlIGludGVydmFsOlxuICogaXNXaXRoaW5JbnRlcnZhbChuZXcgRGF0ZSgyMDE0LCAwLCAxMCksIHtcbiAqICAgc3RhcnQ6IG5ldyBEYXRlKDIwMTQsIDAsIDEpLFxuICogICBlbmQ6IG5ldyBEYXRlKDIwMTQsIDAsIDcpXG4gKiB9KVxuICogLy89PiBmYWxzZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgZGF0ZSBlcXVhbCB0byBpbnRlcnZhbCBzdGFydDpcbiAqIGlzV2l0aGluSW50ZXJ2YWwoZGF0ZSwgeyBzdGFydCwgZW5kOiBkYXRlIH0pXG4gKiAvLyA9PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBkYXRlIGVxdWFsIHRvIGludGVydmFsIGVuZDpcbiAqIGlzV2l0aGluSW50ZXJ2YWwoZGF0ZSwgeyBzdGFydDogZGF0ZSwgZW5kIH0pXG4gKiAvLyA9PiB0cnVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1dpdGhpbkludGVydmFsKGRhdGUsIGludGVydmFsKSB7XG4gIGNvbnN0IHRpbWUgPSArdG9EYXRlKGRhdGUpO1xuICBjb25zdCBbc3RhcnRUaW1lLCBlbmRUaW1lXSA9IFtcbiAgICArdG9EYXRlKGludGVydmFsLnN0YXJ0KSxcbiAgICArdG9EYXRlKGludGVydmFsLmVuZCksXG4gIF0uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuXG4gIHJldHVybiB0aW1lID49IHN0YXJ0VGltZSAmJiB0aW1lIDw9IGVuZFRpbWU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgaXNXaXRoaW5JbnRlcnZhbDtcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSBkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgZGF5IGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZEYXkoZGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mRGF5O1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi9fbGliL2RlZmF1bHRPcHRpb25zLm1qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgc3RhcnRPZldlZWt9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBTdW4gQXVnIDMxIDIwMTQgMDA6MDA6MDBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdGhlIHdlZWsgc3RhcnRzIG9uIE1vbmRheSwgdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSwgeyB3ZWVrU3RhcnRzT246IDEgfSlcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mV2VlayhkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3Qgd2Vla1N0YXJ0c09uID1cbiAgICBvcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgMDtcblxuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgZGF5ID0gX2RhdGUuZ2V0RGF5KCk7XG4gIGNvbnN0IGRpZmYgPSAoZGF5IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gd2Vla1N0YXJ0c09uO1xuXG4gIF9kYXRlLnNldERhdGUoX2RhdGUuZ2V0RGF0ZSgpIC0gZGlmZik7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZldlZWs7XG4iLCIvKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gYXJndW1lbnQgLSBUaGUgdmFsdWUgdG8gY29udmVydFxuICpcbiAqIEByZXR1cm5zIFRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIGNvbnN0IGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7XG5cbiAgLy8gQ2xvbmUgdGhlIGRhdGVcbiAgaWYgKFxuICAgIGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgICh0eXBlb2YgYXJndW1lbnQgPT09IFwib2JqZWN0XCIgJiYgYXJnU3RyID09PSBcIltvYmplY3QgRGF0ZV1cIilcbiAgKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBhcmd1bWVudC5jb25zdHJ1Y3RvcigrYXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKFxuICAgIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJudW1iZXJcIiB8fFxuICAgIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IE51bWJlcl1cIiB8fFxuICAgIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJzdHJpbmdcIiB8fFxuICAgIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IFN0cmluZ11cIlxuICApIHtcbiAgICAvLyBUT0RPOiBDYW4gd2UgZ2V0IHJpZCBvZiBhcz9cbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRPRE86IENhbiB3ZSBnZXQgcmlkIG9mIGFzP1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgdG9EYXRlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgV2Vic2l0ZSBmcm9tIFwiLi93ZWJzaXRlXCI7XG5cbmNvbnN0IG15V2Vic2l0ZSA9IG5ldyBXZWJzaXRlKCk7XG5teVdlYnNpdGUuaW5pdFdlYnNpdGUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==