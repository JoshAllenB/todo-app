/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  }

  /* 
  TODO For the project:
  ! Fix the creating todoItem, it does not create todoItem on different div/container
  ! Create a logic where it checks which container is active for the addBtn in the form.
  * Try the subArray approach for each project created add logic to access that subArray for each project.
  * if above does not work, simplify the code, no need to create todo in the project
  * use inbox input field to create todoItem for the project.
  */

  setProjectContainer(container) {
    this.projectContainer = container;
  }

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
          }

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
          });

          projBtn.appendChild(projectButton);
          projBtn.appendChild(deleteProj);

          formContainer.remove();
        }
      });

      cancel.addEventListener("click", (event) => {
        event.preventDefault();
        formContainer.remove();
      });

      project.appendChild(formContainer);
    }
  }

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

  hideProjectForm() {
    const allTodoForm = document.querySelectorAll(".projectTodoContainer");
    allTodoForm.forEach((form) => {
      form.classList.add("hidden");
    });
  }

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

  createProjectTodo(projectName) {
    const nameInput = document.querySelector(`#${projectName}-input`);
    const dateInput = document.querySelector(`#${projectName}-date-input`);

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
    console.log(this.projects[projectName]);

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
  }

  createProjectTodoItem(todo, projectName) {
    const nameLabel = document.createElement("h5");
    const dateLabel = document.createElement("h5");

    const todoItem = document.createElement("li");
    todoItem.classList.add(`todo-${todo.id}`, "todoItem");

    const checkboxContainer = this.handler.createCheckboxContainer(todo);
    const checkbox = checkboxContainer.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        setTimeout(() => {
          this.removeTodoItem(todo.id, projectName);
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

    const itemContainer = document.getElementById(
      `${projectName}-itemContainer`
    );

    itemContainer.appendChild(todoItem);
    console.log(itemContainer);
    console.log(this.projects);
  }

  removeTodoItem(todoId, projectName) {
    const projectTodos = this.projects[projectName];
    if (projectTodos) {
      const index = projectTodos.findIndex((item) => item.id === todoId);
      if (index !== -1) {
        projectTodos.splice(index, 1);
        this.reorderTodo(projectName);
      }
    }
  }

  togglePriority(todoId, projectName) {
    const projectTodos = this.projects[projectName];
    if (projectTodos) {
      const todo = projectTodos.find((item) => item.id === todoId);
      if (todo) {
        todo.priority = !todo.priority;
        this.reorderTodo(projectName);
        console.log("priority toggled");
      }
    }
  }

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




class Website {
  constructor() {
    this.todo = new _todo__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.handler = new _handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.project = new _project__WEBPACK_IMPORTED_MODULE_2__["default"]();
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
      const inbox = document.querySelector(".inboxContainer");
      this.showContainer(inbox);
      this.activeButton(event.currentTarget);

      if (!this.formCreated) {
        const container = document.querySelector(".inboxContainer");
        const form = this.todo.createTodoListForm();

        container.appendChild(form);

        this.formCreated = true;
      }
    });

    const todayBtn = this.handler.createButton("Today", "today");
    todayBtn.addEventListener("click", (event) => {
      const today = document.querySelector(".todayContainer");
      this.showContainer(today);
      this.activeButton(event.currentTarget);
    });

    const weekBtn = this.handler.createButton("This Week", "thisWeek");
    weekBtn.addEventListener("click", (event) => {
      const week = document.querySelector(".weekContainer");
      this.showContainer(week);
      this.activeButton(event.currentTarget);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7O1VDakx2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmdDOztBQUVoQyxzQkFBc0IsZ0RBQU87QUFDN0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9oYW5kbGVyLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy93ZWJzaXRlLmpzIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgSGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudG9kbyA9IFtdO1xuICAgIHRoaXMudG9kb0lkQ291bnRlciA9IDA7XG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IFwiXCI7XG4gICAgdGhpcy5zZWxlY3RlZFByb2plY3QgPSBudWxsO1xuICB9XG5cbiAgY3JlYXRlQnV0dG9uKHRleHQsIGlkKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGJ1dHRvbi5pZCA9IGlkO1xuXG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIGNyZWF0ZUlucHV0KHR5cGUsIHBsYWNlaG9sZGVyLCByZXF1aXJlZCkge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnR5cGUgPSB0eXBlO1xuICAgIGlucHV0LnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgaW5wdXQucmVxdWlyZWQgPSByZXF1aXJlZDtcblxuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuXG4gIGNyZWF0ZVRvZG9Db250YWluZXIoKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRvZG9Db250YWluZXJcIik7XG5cbiAgICByZXR1cm4gY29udGFpbmVyO1xuICB9XG5cbiAgY3JlYXRlSXRlbUNvbnRhaW5lcigpIHtcbiAgICBjb25zdCBpdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJpdGVtQ29udGFpbmVyXCIpO1xuXG4gICAgcmV0dXJuIGl0ZW1Db250YWluZXI7XG4gIH1cblxuICBjcmVhdGVDaGVja2JveENvbnRhaW5lcih0b2RvKSB7XG4gICAgY29uc3QgY2hlY2tib3hDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNoZWNrYm94Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveC1jb250YWluZXJcIik7XG5cbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVUb2RvRnJvbUxpc3QodG9kbyk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJjaGVja2JveCBjbGlja2VkXCIpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2hlY2ttYXJrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGNoZWNrbWFya1NwYW4uY2xhc3NMaXN0LmFkZChcImNoZWNrbWFya1wiKTtcblxuICAgIGNoZWNrYm94Q29udGFpbmVyLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICBjaGVja2JveENvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja21hcmtTcGFuKTtcblxuICAgIHJldHVybiBjaGVja2JveENvbnRhaW5lcjtcbiAgfVxuXG4gIGNyZWF0ZVByaW9yaXR5SWNvbih0b2RvLCB0b2RvSXRlbSwgaW5ib3hDb250YWluZXIpIHtcbiAgICBjb25zdCBwcmlvcml0eUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgIFwicHJpb3JpdHktaWNvblwiLFxuICAgICAgdG9kby5pc1ByaW9yaXR5ID8gXCJmYS1zb2xpZFwiIDogXCJmYS1yZWd1bGFyXCIsXG4gICAgICBcImZhLXN0YXJcIlxuICAgICk7XG4gICAgcHJpb3JpdHlJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0b2RvLmlzUHJpb3JpdHkgPSAhdG9kby5pc1ByaW9yaXR5O1xuICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1yZWd1bGFyXCIsICF0b2RvLmlzUHJpb3JpdHkpO1xuICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1zb2xpZFwiLCB0b2RvLmlzUHJpb3JpdHkpO1xuXG4gICAgICB0aGlzLnVwZGF0ZVByaW9yaXR5SWNvbih0b2RvKTtcblxuICAgICAgaWYgKHRvZG8uaXNQcmlvcml0eSAmJiBpbmJveENvbnRhaW5lcikge1xuICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlcIik7XG4gICAgICAgIGluYm94Q29udGFpbmVyLnByZXBlbmQodG9kb0l0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByaW9yaXR5SWNvbjtcbiAgfVxuXG4gIHVwZGF0ZVByaW9yaXR5SWNvbih0b2RvKSB7XG4gICAgY29uc3Qgb3RoZXJQYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBcIi5jb250ZW50ID4gZGl2Om5vdCguc2lkZU1lbnUpXCJcbiAgICApO1xuXG4gICAgb3RoZXJQYWdlcy5mb3JFYWNoKChwYWdlKSA9PiB7XG4gICAgICBjb25zdCB0b2RvSXRlbSA9IHBhZ2UucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYC50b2RvLWl0ZW1bZGF0YS10b2RvLWlkPVwiJHt0b2RvLmlkfVwiXWBcbiAgICAgICk7XG4gICAgICBpZiAodG9kb0l0ZW0pIHtcbiAgICAgICAgY29uc3QgcHJpb3JpdHlJY29uID0gdG9kb0l0ZW0ucXVlcnlTZWxlY3RvcihcIi5wcmlvcml0eS1pY29uXCIpO1xuICAgICAgICBpZiAocHJpb3JpdHlJY29uKSB7XG4gICAgICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1yZWd1bGFyXCIsICF0b2RvLmlzUHJpb3JpdHkpO1xuICAgICAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtc29saWRcIiwgdG9kby5pc1ByaW9yaXR5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlVG9kb0Zyb21MaXN0KHRvZG8pIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudG9kby5pbmRleE9mKHRvZG8pO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMudG9kby5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudG9kby1pZC0ke3RvZG8uaWR9YCk7XG4gICAgICBpZiAodG9kb0l0ZW0pIHtcbiAgICAgICAgdG9kb0l0ZW0ucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xlYXJMaXN0KGNvbnRhaW5lcikge1xuICAgIGNvbnN0IGl0ZW1Db250YWluZXIgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5pdGVtQ29udGFpbmVyXCIpO1xuICAgIGlmIChpdGVtQ29udGFpbmVyKSB7XG4gICAgICB3aGlsZSAoaXRlbUNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgIGl0ZW1Db250YWluZXIucmVtb3ZlQ2hpbGQoaXRlbUNvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaWx0ZXJCeUR1ZURhdGUoc3RhcnREYXRlLCBlbmREYXRlLCBpbmNsdWRlVGltZSA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc3RhcnRPZkRhdGUgPSBuZXcgRGF0ZShcbiAgICAgIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgc3RhcnREYXRlLmdldE1vbnRoKCksXG4gICAgICBzdGFydERhdGUuZ2V0RGF0ZSgpXG4gICAgKTtcblxuICAgIGNvbnN0IGVuZE9mRGF0ZSA9IGVuZERhdGVcbiAgICAgID8gbmV3IERhdGUoXG4gICAgICAgICAgZW5kRGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgIGVuZERhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICBlbmREYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAyMyxcbiAgICAgICAgICA1OSxcbiAgICAgICAgICA1OFxuICAgICAgICApXG4gICAgICA6IG5ldyBEYXRlKFxuICAgICAgICAgIHN0YXJ0T2ZEYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgc3RhcnRPZkRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICBzdGFydE9mRGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgMjMsXG4gICAgICAgICAgNTksXG4gICAgICAgICAgNTlcbiAgICAgICAgKTtcblxuICAgIHJldHVybiB0aGlzLnRvZG8uZmlsdGVyKCh0b2RvKSA9PiB7XG4gICAgICBjb25zdCB0b2RvRHVlRGF0ZSA9IG5ldyBEYXRlKHRvZG8uZGF0ZSk7XG5cbiAgICAgIGlmIChpbmNsdWRlVGltZSkge1xuICAgICAgICByZXR1cm4gdG9kb0R1ZURhdGUgPj0gc3RhcnRPZkRhdGUgJiYgdG9kb0R1ZURhdGUgPD0gZW5kT2ZEYXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRvZG9EdWVEYXRlID49IHN0YXJ0T2ZEYXRlICYmIHRvZG9EdWVEYXRlIDw9IGVuZE9mRGF0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIYW5kbGVyO1xuIiwiaW1wb3J0IEhhbmRsZXIgZnJvbSBcIi4vaGFuZGxlclwiO1xuXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oYW5kbGVyID0gbmV3IEhhbmRsZXIoKTtcbiAgICB0aGlzLnByb2plY3RzID0ge307XG4gICAgdGhpcy5wcm9qZWN0SWRDb3VudGVyID0gMDtcbiAgICB0aGlzLnByb2plY3RDb250YWluZXIgPSBudWxsO1xuICB9XG5cbiAgLyogXG4gIFRPRE8gRm9yIHRoZSBwcm9qZWN0OlxuICAhIEZpeCB0aGUgY3JlYXRpbmcgdG9kb0l0ZW0sIGl0IGRvZXMgbm90IGNyZWF0ZSB0b2RvSXRlbSBvbiBkaWZmZXJlbnQgZGl2L2NvbnRhaW5lclxuICAhIENyZWF0ZSBhIGxvZ2ljIHdoZXJlIGl0IGNoZWNrcyB3aGljaCBjb250YWluZXIgaXMgYWN0aXZlIGZvciB0aGUgYWRkQnRuIGluIHRoZSBmb3JtLlxuICAqIFRyeSB0aGUgc3ViQXJyYXkgYXBwcm9hY2ggZm9yIGVhY2ggcHJvamVjdCBjcmVhdGVkIGFkZCBsb2dpYyB0byBhY2Nlc3MgdGhhdCBzdWJBcnJheSBmb3IgZWFjaCBwcm9qZWN0LlxuICAqIGlmIGFib3ZlIGRvZXMgbm90IHdvcmssIHNpbXBsaWZ5IHRoZSBjb2RlLCBubyBuZWVkIHRvIGNyZWF0ZSB0b2RvIGluIHRoZSBwcm9qZWN0XG4gICogdXNlIGluYm94IGlucHV0IGZpZWxkIHRvIGNyZWF0ZSB0b2RvSXRlbSBmb3IgdGhlIHByb2plY3QuXG4gICovXG5cbiAgc2V0UHJvamVjdENvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICB0aGlzLnByb2plY3RDb250YWluZXIgPSBjb250YWluZXI7XG4gIH1cblxuICBjcmVhdGVQcm9qZWN0TmFtZSgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0XCIpO1xuICAgIGNvbnN0IHByb2pMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0TGlzdFwiKTtcblxuICAgIGxldCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qRm9ybUNvbnRhaW5lclwiKTtcbiAgICBsZXQgdG9kb0Zvcm1DcmVhdGVkID0gZmFsc2U7XG5cbiAgICBpZiAoIWZvcm1Db250YWluZXIpIHtcbiAgICAgIGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicHJvakZvcm1Db250YWluZXJcIik7XG5cbiAgICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QuYWRkKFwicHJvakZvcm1cIik7XG5cbiAgICAgIGNvbnN0IHByb2pOYW1lID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUlucHV0KFwidGV4dFwiLCBcIlByb2plY3QgTmFtZVwiKTtcbiAgICAgIHByb2pOYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qTmFtZVwiKTtcblxuICAgICAgY29uc3QgYnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJ0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYnRuQ29udGFpbmVyXCIpO1xuXG4gICAgICBjb25zdCBzdWJtaXQgPSB0aGlzLmhhbmRsZXIuY3JlYXRlQnV0dG9uKFwiU3VibWl0XCIsIFwic3VibWl0UHJvalwiKTtcblxuICAgICAgY29uc3QgY2FuY2VsID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIkNhbmNlbFwiLCBcImNhbmNlbFByb2pcIik7XG5cbiAgICAgIHByb2plY3RGb3JtLmFwcGVuZENoaWxkKHByb2pOYW1lKTtcbiAgICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJtaXQpO1xuICAgICAgYnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmNlbCk7XG4gICAgICBmb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RGb3JtKTtcbiAgICAgIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyKTtcblxuICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qTmFtZS52YWx1ZS50cmltKCk7XG4gICAgICAgIGlmIChwcm9qZWN0TmFtZSAhPT0gXCJcIikge1xuICAgICAgICAgIGxldCBwcm9qQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvamVjdE5hbWUpO1xuXG4gICAgICAgICAgaWYgKCFwcm9qQnRuKSB7XG4gICAgICAgICAgICBwcm9qQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHByb2pCdG4uY2xhc3NMaXN0LmFkZChcInByb2pCdG5cIik7XG4gICAgICAgICAgICBwcm9qQnRuLmlkID0gcHJvamVjdE5hbWU7XG5cbiAgICAgICAgICAgIHByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCF0b2RvRm9ybUNyZWF0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQcm9qZWN0Rm9ybShwcm9qZWN0TmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQcm9qZWN0VG9kb0Zvcm0ocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgICAgIHRvZG9Gb3JtQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcm9qZWN0IGJ0biBjbGlja2VkXCIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2plY3RGb3JtKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvamVjdEZvcm0ocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByb2pMaXN0LmFwcGVuZENoaWxkKHByb2pCdG4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgIHByb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcbiAgICAgICAgICBwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0QnRuXCIpO1xuICAgICAgICAgIHByb2plY3RCdXR0b24uaWQgPSBwcm9qZWN0TmFtZTtcblxuICAgICAgICAgIGNvbnN0IGRlbGV0ZVByb2ogPSB0aGlzLmhhbmRsZXIuY3JlYXRlQnV0dG9uKFwiWFwiLCBcImRlbGV0ZUJ0blwiKTtcblxuICAgICAgICAgIGRlbGV0ZVByb2ouYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHByb2pCdG4ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRvZG9Gb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgIGAke3Byb2plY3ROYW1lfS1mb3JtYFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKHRvZG9Gb3JtQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgIHRvZG9Gb3JtQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV07XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwcm9qQnRuLmFwcGVuZENoaWxkKHByb2plY3RCdXR0b24pO1xuICAgICAgICAgIHByb2pCdG4uYXBwZW5kQ2hpbGQoZGVsZXRlUHJvaik7XG5cbiAgICAgICAgICBmb3JtQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZm9ybUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9qZWN0LmFwcGVuZENoaWxkKGZvcm1Db250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIHNob3dQcm9qZWN0Rm9ybShwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IGFsbFRvZG9Gb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFRvZG9Db250YWluZXJcIik7XG4gICAgYWxsVG9kb0Zvcm1zLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRvZG9Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cHJvamVjdE5hbWV9LWZvcm1gKTtcbiAgICBpZiAodG9kb0Zvcm0pIHtcbiAgICAgIHRvZG9Gb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgfVxuICB9XG5cbiAgaGlkZVByb2plY3RGb3JtKCkge1xuICAgIGNvbnN0IGFsbFRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0VG9kb0NvbnRhaW5lclwiKTtcbiAgICBhbGxUb2RvRm9ybS5mb3JFYWNoKChmb3JtKSA9PiB7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVQcm9qZWN0VG9kb0Zvcm0ocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0Q29udGFpbmVyXCIpO1xuICAgIGNvbnN0IHRvZG9Gb3JtQ29udGFpbmVySWQgPSBgJHtwcm9qZWN0TmFtZX0tZm9ybWA7XG5cbiAgICBsZXQgdG9kb0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0b2RvRm9ybUNvbnRhaW5lcklkKTtcblxuICAgIGlmICghdG9kb0Zvcm1Db250YWluZXIpIHtcbiAgICAgIHRvZG9Gb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRvZG9Gb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0VG9kb0NvbnRhaW5lclwiKTtcbiAgICAgIHRvZG9Gb3JtQ29udGFpbmVyLmlkID0gdG9kb0Zvcm1Db250YWluZXJJZDtcblxuICAgICAgY29uc3QgdG9kb0NvbnRhaW5lciA9IHRoaXMuaGFuZGxlci5jcmVhdGVUb2RvQ29udGFpbmVyKCk7XG5cbiAgICAgIGNvbnN0IGl0ZW1Db250YWluZXIgPSB0aGlzLmhhbmRsZXIuY3JlYXRlSXRlbUNvbnRhaW5lcigpO1xuICAgICAgaXRlbUNvbnRhaW5lci5pZCA9IGAke3Byb2plY3ROYW1lfS1pdGVtQ29udGFpbmVyYDtcblxuICAgICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmb3JtQ29udGFpbmVyXCIpO1xuXG4gICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWZvcm1cIik7XG4gICAgICBmb3JtLmlkID0gYCR7cHJvamVjdE5hbWV9LWZvcm1gO1xuXG4gICAgICBjb25zdCBuYW1lSW5wdXQgPSB0aGlzLmhhbmRsZXIuY3JlYXRlSW5wdXQoXCJ0ZXh0XCIsIFwiVG9kbyBOYW1lXCIsIHRydWUpO1xuICAgICAgbmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJuYW1lLWlucHV0XCIpO1xuICAgICAgbmFtZUlucHV0LmlkID0gYCR7cHJvamVjdE5hbWV9LWlucHV0YDtcblxuICAgICAgY29uc3QgZGF0ZUlucHV0ID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUlucHV0KFwiZGF0ZVwiLCBcIlwiLCB0cnVlKTtcbiAgICAgIGRhdGVJbnB1dC5jbGFzc0xpc3QuYWRkKFwiZGF0ZS1pbnB1dFwiKTtcbiAgICAgIGRhdGVJbnB1dC5pZCA9IGAke3Byb2plY3ROYW1lfS1kYXRlLWlucHV0YDtcblxuICAgICAgY29uc3QgYWRkQnRuID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIkFkZCBUb2RvXCIsIFwiYWRkQnRuXCIpO1xuICAgICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoXCJhZGRCdG5cIik7XG4gICAgICBhZGRCdG4uaWQgPSBgJHtwcm9qZWN0TmFtZX0tYWRkQnRuYDtcbiAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY3JlYXRlUHJvamVjdFRvZG8ocHJvamVjdE5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb2plY3RzW3Byb2plY3ROYW1lXSk7XG4gICAgICB9KTtcblxuICAgICAgZm9ybS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuICAgICAgZm9ybS5hcHBlbmRDaGlsZChkYXRlSW5wdXQpO1xuICAgICAgZm9ybS5hcHBlbmRDaGlsZChhZGRCdG4pO1xuICAgICAgZm9ybUNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICAgIHRvZG9Db250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybUNvbnRhaW5lcik7XG4gICAgICB0b2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKGl0ZW1Db250YWluZXIpO1xuXG4gICAgICB0b2RvRm9ybUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKTtcblxuICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvRm9ybUNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnByb2plY3RzW3Byb2plY3ROYW1lXSkge1xuICAgICAgdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV0gPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9kb0Zvcm1Db250YWluZXI7XG4gIH1cblxuICBjcmVhdGVQcm9qZWN0VG9kbyhwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3Byb2plY3ROYW1lfS1pbnB1dGApO1xuICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3Byb2plY3ROYW1lfS1kYXRlLWlucHV0YCk7XG5cbiAgICBjb25zdCBwcm9qZWN0VG9kbyA9IHtcbiAgICAgIGlkOiB0aGlzLnByb2plY3RJZENvdW50ZXIrKyxcbiAgICAgIG5hbWU6IG5hbWVJbnB1dC52YWx1ZSxcbiAgICAgIHByb2o6IHByb2plY3ROYW1lLFxuICAgICAgZGF0ZTogZGF0ZUlucHV0LnZhbHVlLFxuICAgIH07XG5cbiAgICBpZiAoIXRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdKSB7XG4gICAgICB0aGlzLnByb2plY3RzW3Byb2plY3ROYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdLnB1c2gocHJvamVjdFRvZG8pO1xuICAgIHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShhLmRhdGUpIC0gbmV3IERhdGUoYi5kYXRlKTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb2plY3RzW3Byb2plY3ROYW1lXSk7XG5cbiAgICBuYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIGRhdGVJbnB1dC52YWx1ZSA9IFwiXCI7XG5cbiAgICBjb25zdCBpdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBgJHtwcm9qZWN0TmFtZX0taXRlbUNvbnRhaW5lcmBcbiAgICApO1xuXG4gICAgaWYgKGl0ZW1Db250YWluZXIpIHtcbiAgICAgIGl0ZW1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV0uZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICB0aGlzLmNyZWF0ZVByb2plY3RUb2RvSXRlbSh0b2RvLCBwcm9qZWN0TmFtZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgXCJJdGVtIENvbnRhaW5lciB3aXRoIElEICR7cHJvamVjdE5hbWV9LWl0ZW1Db250YWluZXIgbm90IGZvdW5kXCJcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUHJvamVjdFRvZG9JdGVtKHRvZG8sIHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgbmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuICAgIGNvbnN0IGRhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNVwiKTtcblxuICAgIGNvbnN0IHRvZG9JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoYHRvZG8tJHt0b2RvLmlkfWAsIFwidG9kb0l0ZW1cIik7XG5cbiAgICBjb25zdCBjaGVja2JveENvbnRhaW5lciA9IHRoaXMuaGFuZGxlci5jcmVhdGVDaGVja2JveENvbnRhaW5lcih0b2RvKTtcbiAgICBjb25zdCBjaGVja2JveCA9IGNoZWNrYm94Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPSdjaGVja2JveCddXCIpO1xuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVUb2RvSXRlbSh0b2RvLmlkLCBwcm9qZWN0TmFtZSk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBuYW1lTGFiZWwudGV4dENvbnRlbnQgPSB0b2RvLm5hbWU7XG4gICAgZGF0ZUxhYmVsLnRleHRDb250ZW50ID0gdG9kby5kYXRlO1xuXG4gICAgY29uc3QgcHJpb3JpdHlJY29uID0gdGhpcy5oYW5kbGVyLmNyZWF0ZVByaW9yaXR5SWNvbih0b2RvLCB0b2RvSXRlbSk7XG4gICAgcHJpb3JpdHlJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLnRvZ2dsZVByaW9yaXR5KHRvZG8uaWQsIHByb2plY3ROYW1lKTtcbiAgICB9KTtcblxuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKGNoZWNrYm94Q29udGFpbmVyKTtcbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKGRhdGVMYWJlbCk7XG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQocHJpb3JpdHlJY29uKTtcblxuICAgIGNvbnN0IGl0ZW1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIGAke3Byb2plY3ROYW1lfS1pdGVtQ29udGFpbmVyYFxuICAgICk7XG5cbiAgICBpdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcbiAgICBjb25zb2xlLmxvZyhpdGVtQ29udGFpbmVyKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb2plY3RzKTtcbiAgfVxuXG4gIHJlbW92ZVRvZG9JdGVtKHRvZG9JZCwgcHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBwcm9qZWN0VG9kb3MgPSB0aGlzLnByb2plY3RzW3Byb2plY3ROYW1lXTtcbiAgICBpZiAocHJvamVjdFRvZG9zKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHByb2plY3RUb2Rvcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRvZG9JZCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHByb2plY3RUb2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLnJlb3JkZXJUb2RvKHByb2plY3ROYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGVQcmlvcml0eSh0b2RvSWQsIHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgcHJvamVjdFRvZG9zID0gdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV07XG4gICAgaWYgKHByb2plY3RUb2Rvcykge1xuICAgICAgY29uc3QgdG9kbyA9IHByb2plY3RUb2Rvcy5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSB0b2RvSWQpO1xuICAgICAgaWYgKHRvZG8pIHtcbiAgICAgICAgdG9kby5wcmlvcml0eSA9ICF0b2RvLnByaW9yaXR5O1xuICAgICAgICB0aGlzLnJlb3JkZXJUb2RvKHByb2plY3ROYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJwcmlvcml0eSB0b2dnbGVkXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlb3JkZXJUb2RvKHByb2plY3ROYW1lKSB7XG4gICAgaWYgKHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdKSB7XG4gICAgICB0aGlzLnByb2plY3RzW3Byb2plY3ROYW1lXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhLnByaW9yaXR5ID09PSBiLnByaW9yaXR5KSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGEuZGF0ZSkgLSBuZXcgRGF0ZShiLmRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIG9ubHkgb25lIGhhcyBwcmlvcml0eSwgcHJpb3JpdGl6ZSBpdFxuICAgICAgICByZXR1cm4gYS5wcmlvcml0eSA/IC0xIDogMTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBpdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgIGAke3Byb2plY3ROYW1lfS1pdGVtQ29udGFpbmVyYFxuICAgICAgKTtcbiAgICAgIGl0ZW1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV0uZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICB0aGlzLmNyZWF0ZVByb2plY3RUb2RvSXRlbSh0b2RvLCBwcm9qZWN0TmFtZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDtcbiIsImltcG9ydCBIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJcIjtcblxuY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlciA9IG5ldyBIYW5kbGVyKCk7XG4gICAgdGhpcy50b2RvID0gW107XG4gICAgdGhpcy50b2RvSWRDb3VudGVyID0gMDtcbiAgICAvLyB0aGlzLmhhbmRsZXIuc2V0VG9kb0xpc3QodGhpcy50b2RvKTtcbiAgICB0aGlzLnRvZG9Db250YWluZXIgPSBudWxsO1xuICB9XG5cbiAgc2V0VG9kb0NvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICB0aGlzLnRvZG9Db250YWluZXIgPSBjb250YWluZXI7XG4gIH1cblxuICBjcmVhdGVUb2RvTGlzdEZvcm0oKSB7XG4gICAgY29uc3QgdG9kb0NvbnRhaW5lciA9IHRoaXMuaGFuZGxlci5jcmVhdGVUb2RvQ29udGFpbmVyKCk7XG4gICAgY29uc3QgaXRlbUNvbnRhaW5lciA9IHRoaXMuaGFuZGxlci5jcmVhdGVJdGVtQ29udGFpbmVyKCk7XG5cbiAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmb3JtQ29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcInRvZG8tZm9ybVwiKTtcblxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IHRoaXMuaGFuZGxlci5jcmVhdGVJbnB1dChcInRleHRcIiwgXCJUb2RvIE5hbWVcIiwgdHJ1ZSk7XG4gICAgbmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJuYW1lLWlucHV0XCIpO1xuXG4gICAgY29uc3QgZGF0ZUlucHV0ID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUlucHV0KFwiZGF0ZVwiLCBcIlwiLCB0cnVlKTtcbiAgICBkYXRlSW5wdXQuY2xhc3NMaXN0LmFkZChcImRhdGUtaW5wdXRcIik7XG5cbiAgICBjb25zdCBhZGRCdG4gPSB0aGlzLmhhbmRsZXIuY3JlYXRlQnV0dG9uKFwiQWRkIFRvZG9cIiwgXCJhZGRCdG5cIik7XG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNyZWF0ZVRvZG8oKTtcbiAgICB9KTtcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRhdGVJbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChhZGRCdG4pO1xuICAgIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgdG9kb0NvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtQ29udGFpbmVyKTtcbiAgICB0b2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKGl0ZW1Db250YWluZXIpO1xuXG4gICAgcmV0dXJuIHRvZG9Db250YWluZXI7XG4gIH1cblxuICBjcmVhdGVUb2RvKCkge1xuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dFwiKTtcbiAgICBjb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGUtaW5wdXRcIik7XG5cbiAgICBjb25zdCB0b2RvID0ge1xuICAgICAgaWQ6IHRoaXMudG9kb0lkQ291bnRlcisrLFxuICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgZGF0ZTogZGF0ZUlucHV0LnZhbHVlLFxuICAgIH07XG5cbiAgICB0aGlzLnRvZG8ucHVzaCh0b2RvKTtcbiAgICB0aGlzLnRvZG8uc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKGEuZGF0ZSkgLSBuZXcgRGF0ZShiLmRhdGUpO1xuICAgIH0pO1xuXG4gICAgbmFtZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICBkYXRlSW5wdXQudmFsdWUgPSBcIlwiO1xuXG4gICAgY29uc3QgaXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaXRlbUNvbnRhaW5lclwiKTtcbiAgICBpdGVtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICB0aGlzLnRvZG8uZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgdGhpcy5jcmVhdGVUb2RvSXRlbSh0b2RvKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudG9kbyk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVUb2RvSXRlbSh0b2RvKSB7XG4gICAgY29uc3QgbmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuICAgIGNvbnN0IGRhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNVwiKTtcblxuICAgIGNvbnN0IHRvZG9JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoYHRvZG8tJHt0b2RvLmlkfWAsIFwidG9kb0l0ZW1cIik7XG5cbiAgICBjb25zdCBjaGVja2JveENvbnRhaW5lciA9IHRoaXMuaGFuZGxlci5jcmVhdGVDaGVja2JveENvbnRhaW5lcih0b2RvKTtcbiAgICBjb25zdCBjaGVja2JveCA9IGNoZWNrYm94Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPSdjaGVja2JveCddXCIpO1xuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVUb2RvSXRlbSh0b2RvLmlkKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG5hbWVMYWJlbC50ZXh0Q29udGVudCA9IHRvZG8ubmFtZTtcbiAgICBkYXRlTGFiZWwudGV4dENvbnRlbnQgPSB0b2RvLmRhdGU7XG5cbiAgICBjb25zdCBwcmlvcml0eUljb24gPSB0aGlzLmhhbmRsZXIuY3JlYXRlUHJpb3JpdHlJY29uKHRvZG8sIHRvZG9JdGVtKTtcbiAgICBwcmlvcml0eUljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMudG9nZ2xlUHJpb3JpdHkodG9kby5pZCk7XG4gICAgfSk7XG5cbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChjaGVja2JveENvbnRhaW5lcik7XG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHByaW9yaXR5SWNvbik7XG5cbiAgICBjb25zdCBpdGVtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pdGVtQ29udGFpbmVyXCIpO1xuXG4gICAgaXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gIH1cblxuICByZW1vdmVUb2RvSXRlbSh0b2RvSWQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudG9kby5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRvZG9JZCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy50b2RvLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLnJlb3JkZXJUb2RvKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUHJpb3JpdHkodG9kb0lkKSB7XG4gICAgY29uc3QgdG9kbyA9IHRoaXMudG9kby5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSB0b2RvSWQpO1xuICAgIGlmICh0b2RvKSB7XG4gICAgICB0b2RvLnByaW9yaXR5ID0gIXRvZG8ucHJpb3JpdHk7XG4gICAgICB0aGlzLnJlb3JkZXJUb2RvKCk7XG4gICAgfVxuICB9XG5cbiAgcmVvcmRlclRvZG8oKSB7XG4gICAgdGhpcy50b2RvLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLnByaW9yaXR5ICYmICFiLnByaW9yaXR5KSByZXR1cm4gLTE7XG4gICAgICBpZiAoIWEucHJpb3JpdHkgJiYgYi5wcmlvcml0eSkgcmV0dXJuIDE7XG4gICAgICAvLyBJZiBib3RoIGhhdmUgcHJpb3JpdHkgb3IgbmVpdGhlciwgc29ydCBieSBkYXRlXG4gICAgICByZXR1cm4gbmV3IERhdGUoYS5kYXRlKSAtIG5ldyBEYXRlKGIuZGF0ZSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBpdGVtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pdGVtQ29udGFpbmVyXCIpO1xuICAgIGl0ZW1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIHRoaXMudG9kby5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICB0aGlzLmNyZWF0ZVRvZG9JdGVtKHRvZG8pO1xuICAgIH0pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBUb2RvO1xuIiwiaW1wb3J0IEhhbmRsZXIgZnJvbSBcIi4vaGFuZGxlclwiO1xuaW1wb3J0IFRvZG8gZnJvbSBcIi4vdG9kb1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuXG5jbGFzcyBXZWJzaXRlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50b2RvID0gbmV3IFRvZG8oKTtcbiAgICB0aGlzLmhhbmRsZXIgPSBuZXcgSGFuZGxlcigpO1xuICAgIHRoaXMucHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG4gICAgdGhpcy5mb3JtQ3JlYXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBcIlwiO1xuICAgIHRoaXMuY3VycmVudFZpc2libGVDb250YWluZXIgPSBudWxsO1xuICB9XG5cbiAgY3JlYXRlSGVhZGVyKCkge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlRvLURvIExpc3RcIjtcblxuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICB9XG5cbiAgY3JlYXRlQ29udGVudCgpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoXCJjb250ZW50XCIpO1xuICAgIGNvbnRlbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtYWluQ29udGVudFwiKTtcblxuICAgIGNvbnN0IGluYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpbmJveC5jbGFzc0xpc3QuYWRkKFwiaW5ib3hDb250YWluZXJcIiwgXCJoaWRkZW5cIik7XG5cbiAgICBjb25zdCB0b2RheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG9kYXkuY2xhc3NMaXN0LmFkZChcInRvZGF5Q29udGFpbmVyXCIsIFwiaGlkZGVuXCIpO1xuXG4gICAgY29uc3Qgd2VlayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgd2Vlay5jbGFzc0xpc3QuYWRkKFwid2Vla0NvbnRhaW5lclwiLCBcImhpZGRlblwiKTtcblxuICAgIGNvbnN0IHByb2plY3RUb2RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0VG9kby5jbGFzc0xpc3QuYWRkKFwicHJvamVjdENvbnRhaW5lclwiLCBcImhpZGRlblwiKTtcblxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaW5ib3gpO1xuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQodG9kYXkpO1xuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQod2Vlayk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZChwcm9qZWN0VG9kbyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgc2hvd0NvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50VmlzaWJsZUNvbnRhaW5lcikge1xuICAgICAgdGhpcy5jdXJyZW50VmlzaWJsZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICB0aGlzLmN1cnJlbnRWaXNpYmxlQ29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gIH1cblxuICBhY3RpdmVCdXR0b24oYnV0dG9uKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2lkZU1lbnUgYnV0dG9uXCIpO1xuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgICBpZiAoYnRuICE9PSBidXR0b24pIHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIGNyZWF0ZVNpZGVNZW51KCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnQoKTtcblxuICAgIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaWRlTWVudS5jbGFzc0xpc3QuYWRkKFwic2lkZU1lbnVcIik7XG5cbiAgICBjb25zdCBob21lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBob21lLmNsYXNzTGlzdC5hZGQoXCJob21lXCIpO1xuICAgIGhvbWUuaW5uZXJIVE1MID0gXCI8aDE+SG9tZTwvaDE+XCI7XG5cbiAgICBjb25zdCBpbmJveEJ0biA9IHRoaXMuaGFuZGxlci5jcmVhdGVCdXR0b24oXCJJbmJveFwiLCBcImluYm94XCIpO1xuICAgIGluYm94QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGluYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmJveENvbnRhaW5lclwiKTtcbiAgICAgIHRoaXMuc2hvd0NvbnRhaW5lcihpbmJveCk7XG4gICAgICB0aGlzLmFjdGl2ZUJ1dHRvbihldmVudC5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgaWYgKCF0aGlzLmZvcm1DcmVhdGVkKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ib3hDb250YWluZXJcIik7XG4gICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLnRvZG8uY3JlYXRlVG9kb0xpc3RGb3JtKCk7XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgdG9kYXlCdG4gPSB0aGlzLmhhbmRsZXIuY3JlYXRlQnV0dG9uKFwiVG9kYXlcIiwgXCJ0b2RheVwiKTtcbiAgICB0b2RheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kYXlDb250YWluZXJcIik7XG4gICAgICB0aGlzLnNob3dDb250YWluZXIodG9kYXkpO1xuICAgICAgdGhpcy5hY3RpdmVCdXR0b24oZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB3ZWVrQnRuID0gdGhpcy5oYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIlRoaXMgV2Vla1wiLCBcInRoaXNXZWVrXCIpO1xuICAgIHdlZWtCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgY29uc3Qgd2VlayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2Vla0NvbnRhaW5lclwiKTtcbiAgICAgIHRoaXMuc2hvd0NvbnRhaW5lcih3ZWVrKTtcbiAgICAgIHRoaXMuYWN0aXZlQnV0dG9uKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcbiAgICBwcm9qZWN0LmlubmVySFRNTCA9IFwiPGgxPlByb2plY3Q8L2gxPlwiO1xuXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RMaXN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0TGlzdFwiKTtcblxuICAgIGNvbnN0IGFkZFByb2plY3QgPSB0aGlzLmhhbmRsZXIuY3JlYXRlQnV0dG9uKFwiKyBBZGQgUHJvamVjdFwiLCBcImFkZFByb2pcIik7XG4gICAgYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0Q29udGFpbmVyXCIpO1xuICAgICAgdGhpcy5zaG93Q29udGFpbmVyKHByb2plY3RDb250YWluZXIpO1xuICAgICAgdGhpcy5wcm9qZWN0LmNyZWF0ZVByb2plY3ROYW1lKCk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBwcm9qQnRuID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIucHJvakJ0blwiKTtcbiAgICAgIGlmIChwcm9qQnRuKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RDb250YWluZXJcIik7XG4gICAgICAgIHRoaXMuc2hvd0NvbnRhaW5lcihwcm9qZWN0Q29udGFpbmVyKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb2plY3RCdG4gPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5wcm9qZWN0QnRuXCIpO1xuICAgICAgaWYgKHByb2plY3RCdG4pIHtcbiAgICAgICAgdGhpcy5hY3RpdmVCdXR0b24ocHJvamVjdEJ0bik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzaWRlTWVudS5hcHBlbmRDaGlsZChob21lKTtcbiAgICBzaWRlTWVudS5hcHBlbmRDaGlsZChpbmJveEJ0bik7XG4gICAgc2lkZU1lbnUuYXBwZW5kQ2hpbGQodG9kYXlCdG4pO1xuICAgIHNpZGVNZW51LmFwcGVuZENoaWxkKHdlZWtCdG4pO1xuICAgIHNpZGVNZW51LmFwcGVuZENoaWxkKHByb2plY3QpO1xuICAgIHByb2plY3QuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdCk7XG4gICAgcHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0TGlzdCk7XG5cbiAgICBjb25zdCBmaXJzdENvbnRhaW5lciA9IGNvbnRlbnQucXVlcnlTZWxlY3RvcihcIjpzY29wZSA+IGRpdlwiKTtcbiAgICB0aGlzLnNob3dDb250YWluZXIoZmlyc3RDb250YWluZXIsIFwiaGlkZGVuXCIpO1xuXG4gICAgY29udGVudC5pbnNlcnRCZWZvcmUoc2lkZU1lbnUsIGNvbnRlbnQuZmlyc3RDaGlsZCk7XG4gIH1cblxuICBjcmVhdGVGb290ZXIoKSB7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICBjb25zdCBmb290ZXJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb290ZXJMaW5rLmNsYXNzTGlzdC5hZGQoXCJsaW5rXCIpO1xuXG4gICAgY29uc3QgY29weXJpZ2h0ID0gdGhpcy5jcmVhdGVGb290ZXJMaW5rKFxuICAgICAgJ0NvcHlyaWdodCA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY29weXJpZ2h0XCI+PC9pPiBKb3NoQWxsZW4nXG4gICAgKTtcblxuICAgIGZvb3RlckxpbmsuYXBwZW5kQ2hpbGQoY29weXJpZ2h0KTtcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZm9vdGVyTGluayk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xuICB9XG5cbiAgY3JlYXRlRm9vdGVyTGluayh0ZXh0KSB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBsaW5rLmlubmVySFRNTCA9IHRleHQ7XG5cbiAgICByZXR1cm4gbGluaztcbiAgfVxuXG4gIGluaXRXZWJzaXRlKCkge1xuICAgIHRoaXMuY3JlYXRlSGVhZGVyKCk7XG4gICAgdGhpcy5jcmVhdGVTaWRlTWVudSgpO1xuICAgIHRoaXMuY3JlYXRlRm9vdGVyKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2Vic2l0ZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFdlYnNpdGUgZnJvbSBcIi4vd2Vic2l0ZVwiO1xuXG5jb25zdCBteVdlYnNpdGUgPSBuZXcgV2Vic2l0ZSgpO1xubXlXZWJzaXRlLmluaXRXZWJzaXRlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=