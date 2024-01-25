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
    this.todos = [];
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

  createTodoListForm(todoContainer) {
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
        const todo = {
          id: this.todoIdCounter++,
          name,
          date,
          isPriority: false,
        };

        const todoItem = this.createTodoItem(todo, todoContainer);

        if (todo.isPriority) {
          todoItem.classList.add("priority");
        }

        if (todoContainer) {
          todoContainer.appendChild(todoItem);
        }

        nameInput.value = "";
        dateInput.value = "";
      }
    });

    form.appendChild(nameInput);
    form.appendChild(dateInput);
    form.appendChild(addButton);

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
    this.projects = {};
    this.selectedProject = null;
    this.handler = new _handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  createProject() {
    const projectBtn = document.getElementById("add-project");
    const sideMenu = document.querySelector(".sideMenu");

    const existingContainer = sideMenu.querySelector(".input-container");
    if (existingContainer) {
      return;
    }

    projectBtn.addEventListener("click", () => {
      const projInputContainer = document.createElement("div");
      projInputContainer.classList.add("input-container");

      const projInput = document.createElement("input");
      projInput.type = "text";
      projInput.placeholder = "Enter Project Name";
      projInput.classList.add("project-input");

      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Submit";
      submitBtn.classList.add("submitBtn");

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.classList.add("cancelBtn");

      projInputContainer.appendChild(projInput);
      projInputContainer.appendChild(submitBtn);
      projInputContainer.appendChild(cancelBtn);

      const projectSection = sideMenu.querySelector(".project");
      projectSection.appendChild(projInputContainer);

      projectSection.insertBefore(
        projInputContainer,
        projectSection.childNodes[2]
      );

      cancelBtn.addEventListener("click", () => {
        projectSection.removeChild(projInputContainer);
        projectBtn.disabled = false;
      });

      let btnContainerId;

      submitBtn.addEventListener("click", () => {
        const projectName = projInput.value.trim();
        if (projectName !== "") {
          console.log("Project Submitted:", projectName);

          if (!this.projects[projectName]) {
            this.projects[projectName] = [];
          }

          btnContainerId = `${projectName}-btn-container`;
          const btnContainer = document.createElement("div");
          btnContainer.classList.add(`${projectName}`, "btn-container");
          btnContainer.setAttribute("id", btnContainerId);

          const newProjBtn = this.handler.createButton(
            projectName,
            projectName
          );
          newProjBtn.classList.add("projName");

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "x";
          deleteBtn.classList.add("deleteBtn");

          btnContainer.appendChild(newProjBtn);
          btnContainer.appendChild(deleteBtn);

          const projectSection = document.querySelector(".project");
          projectSection.appendChild(btnContainer);

          deleteBtn.addEventListener("click", () => {
            projectSection.removeChild(btnContainer);

            delete this.projects[projectName];
            const projectRemove = document.querySelector(
              `.${projectName}.project-container`
            );
            if (projectRemove) {
              console.log("removing project container:", projectRemove);
              projectRemove.remove();
            } else {
              console.log("No matching project container", projectName);
            }
          });

          this.selectedProject = projectName;

          newProjBtn.addEventListener("click", () => {
            this.showProjectPage(projectName);
            this.handler.createTodoListForm(projectName);
            const projectPage = document.getElementById("projectPage");
            const inboxPage = document.getElementById("inboxPage");

            projectPage.classList.remove("hidden");
            inboxPage.classList.add("hidden");
          });

          const inboxBtn = document.getElementById("inbox");
          inboxBtn.addEventListener("click", () => {
            const projectPage = document.getElementById("projectPage");
            const inboxPage = document.getElementById("inboxPage");

            inboxPage.classList.remove("hidden");
            projectPage.classList.add("hidden");
          });
        } else {
          alert("Please Enter a Project Name.");
        }
        projectSection.removeChild(projInputContainer);
        projectBtn.disabled = false;
      });
      projectBtn.disabled = true;
    });
  }

  createProjectPage(projectName) {
    const projContainer = document.createElement("div");
    projContainer.classList.add(`${projectName}`, "project-container");

    const formContainer = document.createElement("div");
    formContainer.classList.add("form-container");

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("project-item-container");

    const projectHeader = document.createElement("h3");
    projectHeader.textContent = projectName;
    formContainer.appendChild(projectHeader);

    const todoItems = this.projects[projectName] || [];

    todoItems.forEach((todo) => {
      const todoItem = this.handler.createTodoItem(todo);
      todoContainer.appendChild(todoItem);
    });

    const todoForm = this.handler.createTodoListForm(todoContainer);
    if (todoForm) {
      formContainer.appendChild(todoForm);
    }

    projContainer.appendChild(projectHeader);
    projContainer.appendChild(formContainer);
    projContainer.appendChild(todoContainer);

    return projContainer;
  }

  showProjectPage(projectName) {
    console.log("showing project", projectName);
    const allProjectContainer = document.querySelectorAll(".project-container");
    allProjectContainer.forEach(container => {
      container.classList.add("hidden");
    });

    const selectedProjectContainer = document.querySelector(`.${projectName}.project-container`);
    if (selectedProjectContainer) {
      selectedProjectContainer.classList.remove("hidden");
    } else {
      const projectContainer = this.createProjectPage(projectName);
      const projectPage = document.getElementById("projectPage");
      projectPage.appendChild(projectContainer);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);


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
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");



class Website {
  constructor() {
    const handler = new _handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
    const projHandler = new _project__WEBPACK_IMPORTED_MODULE_1__["default"]();

    this.createHeader = function () {
      const header = document.createElement("header");
      const title = document.createElement("h1");
      title.textContent = "To-Do List";

      header.appendChild(title);
      document.body.appendChild(header);
    };

    this.createFooter = function () {
      const footer = document.createElement("footer");
      const footerLink = document.createElement("div");
      footerLink.classList.add("link");

      const copyright = this.createFooterLink(
        'Copyright <i class="fa-regular fa-copyright"></i> JoshAllen'
      );

      footerLink.appendChild(copyright);
      footer.appendChild(footerLink);
      document.body.appendChild(footer);
    };

    this.createFooterLink = function (text) {
      const link = document.createElement("h1");
      link.innerHTML = text;

      return link;
    };

    this.createContent = function () {
      const content = document.createElement("div");
      content.classList.add("content");
      content.setAttribute("id", "mainContent");

      const sideMenu = document.createElement("div");
      sideMenu.classList.add("sideMenu");

      const home = document.createElement("div");
      home.classList.add("home");
      home.innerHTML = "<h1>Home</h1>";

      const inboxBtn = handler.createButton("Inbox", "inbox");
      inboxBtn.addEventListener("click", () => {
        this.showPage("inboxPage");
        const formContainer = inbox.querySelector(".form-container");
        if (!formContainer.querySelector(".todo-form")) {
          const todoForm = handler.createTodoListForm();
          formContainer.appendChild(todoForm);
          console.log("Inbox Btn showing form");
        } else console.log("form already created");
      });

      home.appendChild(inboxBtn);

      const todayBtn = handler.createButton("Today", "today");
      todayBtn.addEventListener("click", () => {
        this.showPage("todayPage");
        const today = new Date();
        const filteredTodos = handler.filterByDueDate(today, null, true);
        this.showFilteredTodos(filteredTodos, "todayPage");
      });
      home.appendChild(todayBtn);

      const thisWeekBtn = handler.createButton("This Week", "this-week");
      thisWeekBtn.addEventListener("click", () => {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);

        this.showPage("weekPage");
        const filteredTodos = handler.filterByDueDate(today, nextWeek);
        this.showFilteredTodos(filteredTodos, "weekPage");
      });
      home.appendChild(thisWeekBtn);

      const project = document.createElement("div");
      project.classList.add("project");
      project.innerHTML = "<h1>Project</h1>";
      const addProjectBtn = handler.createButton(
        "+ Add Project",
        "add-project"
      );

      addProjectBtn.addEventListener("click", () => {
        this.showPage(projectPage);
        console.log("add project clicked");
      });

      project.appendChild(addProjectBtn);

      sideMenu.appendChild(home);
      sideMenu.appendChild(project);
      content.appendChild(sideMenu);

      const inbox = document.createElement("div");
      inbox.classList.add("inbox-page", "hidden");
      inbox.setAttribute("id", "inboxPage");

      const formContainer = document.createElement("div");
      formContainer.classList.add("form-container");

      const todoContainer = document.createElement("div");
      todoContainer.classList.add("todo-item-container");

      inbox.appendChild(formContainer.cloneNode(true));
      inbox.appendChild(todoContainer.cloneNode(true));

      const today = document.createElement("div");
      today.classList.add("today-page", "hidden");
      today.setAttribute("id", "todayPage");
      today.appendChild(todoContainer.cloneNode(true));

      const week = document.createElement("div");
      week.classList.add("week-page", "hidden");
      week.setAttribute("id", "weekPage");
      week.appendChild(todoContainer.cloneNode(true));

      const projectPage = document.createElement("div");
      projectPage.classList.add("project-page", "hidden");
      projectPage.setAttribute("id", "projectPage");

      content.appendChild(inbox);
      content.appendChild(today);
      content.appendChild(week);
      content.appendChild(projectPage);

      document.body.appendChild(content);
    };

    this.filterTodosByDueDate = function (dueDate, pageId) {
      const todoItemContainer = document
        .getElementById(pageId)
        .querySelector(".todo-item-container");
      todoItemContainer.innerHTML = "";

      const filterTodos = handler.filterByDueDate(dueDate);
      filterTodos.forEach((todo) => {
        const todoItem = handler.createTodoItem(todo, todoItemContainer);
        if (todo.isPriority) {
          todoItem.classList.add("priority");
        }
        todoItemContainer.appendChild(todoItem);
      });
    };

    this.showFilteredTodos = function (filterTodos, pageId) {
      const todoItemContainer = document
        .getElementById(pageId)
        .querySelector(".todo-item-container");
      todoItemContainer.innerHTML = "";

      filterTodos.forEach((todo) => {
        const todoItem = handler.createTodoItem(todo, todoItemContainer);
        if (todo.isPriority) {
          todoItem.classList.add("priority");
        }
        todoItemContainer.appendChild(todoItem);
      });
    };

    this.showPage = function (pageId) {
      const pages = document.querySelectorAll(".content > div:not(.sideMenu)");
      pages.forEach((page) => {
        page.classList.add("hidden");

        if (pageId !== "projectPage") {
          const projectSection = document.querySelector(".project");
          const projContainer =
            projectSection.querySelector(".project-container");

          if (projContainer) {
            projectSection.removeChild(projContainer);
            const projectBtn = document.getElementById("add-project");
            projectBtn.disabled = false;
          }
        }
      });

      const selectedPage = document.getElementById(pageId);
      if (selectedPage) {
        selectedPage.classList.remove("hidden");
      }
    };

    this.initWebsite = function () {
      this.createHeader();
      this.createContent();
      projHandler.createProject();
      this.createFooter();
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7OztVQzFNdkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05nQzs7QUFFaEMsc0JBQXNCLGdEQUFPO0FBQzdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaGFuZGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3dlYnNpdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50b2RvcyA9IFtdO1xuICAgIHRoaXMudG9kb0lkQ291bnRlciA9IDA7XG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IFwiXCI7XG4gICAgdGhpcy5zZWxlY3RlZFByb2plY3QgPSBudWxsO1xuICB9XG5cbiAgY3JlYXRlQnV0dG9uKHRleHQsIGlkKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGJ1dHRvbi5pZCA9IGlkO1xuXG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIGNyZWF0ZVRvZG9MaXN0Rm9ybSh0b2RvQ29udGFpbmVyKSB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcInRvZG8tZm9ybVwiKTtcblxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IHRoaXMuY3JlYXRlSW5wdXQoXCJ0ZXh0XCIsIFwiVG9kbyBOYW1lXCIsIHRydWUpO1xuICAgIGNvbnN0IGRhdGVJbnB1dCA9IHRoaXMuY3JlYXRlSW5wdXQoXCJkYXRlXCIsIFwiXCIsIHRydWUpO1xuXG4gICAgY29uc3QgYWRkQnV0dG9uID0gdGhpcy5jcmVhdGVCdXR0b24oXCJBZGQgVG9kb1wiLCBcImFkZEJ0blwiKTtcbiAgICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICAgIGNvbnN0IGRhdGUgPSBkYXRlSW5wdXQudmFsdWU7XG5cbiAgICAgIGlmIChuYW1lICYmIGRhdGUpIHtcbiAgICAgICAgdGhpcy5hZGRUb2RvVG9JbmJveChuYW1lLCBkYXRlKTtcbiAgICAgICAgY29uc3QgdG9kbyA9IHtcbiAgICAgICAgICBpZDogdGhpcy50b2RvSWRDb3VudGVyKyssXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIGlzUHJpb3JpdHk6IGZhbHNlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5jcmVhdGVUb2RvSXRlbSh0b2RvLCB0b2RvQ29udGFpbmVyKTtcblxuICAgICAgICBpZiAodG9kby5pc1ByaW9yaXR5KSB7XG4gICAgICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZChcInByaW9yaXR5XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvZG9Db250YWluZXIpIHtcbiAgICAgICAgICB0b2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIGRhdGVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkYXRlSW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcblxuICAgIHJldHVybiBmb3JtO1xuICB9XG5cbiAgY3JlYXRlSW5wdXQodHlwZSwgcGxhY2Vob2xkZXIsIHJlcXVpcmVkKSB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQudHlwZSA9IHR5cGU7XG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICBpbnB1dC5yZXF1aXJlZCA9IHJlcXVpcmVkO1xuXG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG5cbiAgY3JlYXRlVG9kb0l0ZW0odG9kbywgaW5ib3hDb250YWluZXIpIHtcbiAgICBjb25zdCB0b2RvSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcbiAgICB0b2RvSXRlbS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRvZG8taWRcIiwgdG9kby5pZCk7XG5cbiAgICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIHRvZG8gaXRlbTpcIiwgdG9kbyk7XG5cbiAgICBjb25zdCBjaGVja2JveENvbnRhaW5lciA9IHRoaXMuY3JlYXRlQ2hlY2tib3hDb250YWluZXIodG9kbyk7XG5cbiAgICBjb25zdCBuYW1lTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBuYW1lTGFiZWwudGV4dENvbnRlbnQgPSB0b2RvLm5hbWU7XG5cbiAgICBjb25zdCBkYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBkYXRlTGFiZWwudGV4dENvbnRlbnQgPSB0b2RvLmRhdGU7XG4gICAgY29uc29sZS5sb2coXCJEYXRlIExhYmVsIFZhbHVlOlwiLCBkYXRlTGFiZWwudGV4dENvbnRlbnQpO1xuXG4gICAgY29uc3QgcHJpb3JpdHlJY29uID0gdGhpcy5jcmVhdGVQcmlvcml0eUljb24oXG4gICAgICB0b2RvLFxuICAgICAgdG9kb0l0ZW0sXG4gICAgICBpbmJveENvbnRhaW5lclxuICAgICk7XG5cbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChjaGVja2JveENvbnRhaW5lcik7XG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHByaW9yaXR5SWNvbik7XG5cbiAgICBjb25zb2xlLmxvZyhcIlRvZG8gSXRlbSBjcmVhdGVkOlwiLCB0b2RvSXRlbSk7XG5cbiAgICByZXR1cm4gdG9kb0l0ZW07XG4gIH1cblxuICBjcmVhdGVDaGVja2JveENvbnRhaW5lcih0b2RvKSB7XG4gICAgY29uc3QgY2hlY2tib3hDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNoZWNrYm94Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveC1jb250YWluZXJcIik7XG5cbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVUb2RvRnJvbUxpc3QodG9kbyk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJjaGVja2JveCBjbGlja2VkXCIpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2hlY2ttYXJrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGNoZWNrbWFya1NwYW4uY2xhc3NMaXN0LmFkZChcImNoZWNrbWFya1wiKTtcblxuICAgIGNoZWNrYm94Q29udGFpbmVyLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICBjaGVja2JveENvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja21hcmtTcGFuKTtcblxuICAgIHJldHVybiBjaGVja2JveENvbnRhaW5lcjtcbiAgfVxuXG4gIGNyZWF0ZVByaW9yaXR5SWNvbih0b2RvLCB0b2RvSXRlbSwgaW5ib3hDb250YWluZXIpIHtcbiAgICBjb25zdCBwcmlvcml0eUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgIFwicHJpb3JpdHktaWNvblwiLFxuICAgICAgdG9kby5pc1ByaW9yaXR5ID8gXCJmYS1zb2xpZFwiIDogXCJmYS1yZWd1bGFyXCIsXG4gICAgICBcImZhLXN0YXJcIlxuICAgICk7XG4gICAgcHJpb3JpdHlJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0b2RvLmlzUHJpb3JpdHkgPSAhdG9kby5pc1ByaW9yaXR5O1xuICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1yZWd1bGFyXCIsICF0b2RvLmlzUHJpb3JpdHkpO1xuICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1zb2xpZFwiLCB0b2RvLmlzUHJpb3JpdHkpO1xuICAgICAgY29uc29sZS5sb2coXCJwcmlvcml0eSBpY29uIGNsaWNrZWRcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgdG9kbzpcIiwgdG9kbyk7XG5cbiAgICAgIHRoaXMudXBkYXRlUHJpb3JpdHlJY29uKHRvZG8pO1xuXG4gICAgICBpZiAodG9kby5pc1ByaW9yaXR5KSB7XG4gICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICAgICAgaW5ib3hDb250YWluZXIucHJlcGVuZCh0b2RvSXRlbSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJpb3JpdHkhXCIsIHRoaXMudG9kb3MpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByaW9yaXR5SWNvbjtcbiAgfVxuXG4gIHVwZGF0ZVByaW9yaXR5SWNvbih0b2RvKSB7XG4gICAgY29uc3Qgb3RoZXJQYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBcIi5jb250ZW50ID4gZGl2Om5vdCguc2lkZU1lbnUpXCJcbiAgICApO1xuXG4gICAgb3RoZXJQYWdlcy5mb3JFYWNoKChwYWdlKSA9PiB7XG4gICAgICBjb25zdCB0b2RvSXRlbSA9IHBhZ2UucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYC50b2RvLWl0ZW1bZGF0YS10b2RvLWlkPVwiJHt0b2RvLmlkfVwiXWBcbiAgICAgICk7XG4gICAgICBpZiAodG9kb0l0ZW0pIHtcbiAgICAgICAgY29uc3QgcHJpb3JpdHlJY29uID0gdG9kb0l0ZW0ucXVlcnlTZWxlY3RvcihcIi5wcmlvcml0eS1pY29uXCIpO1xuICAgICAgICBpZiAocHJpb3JpdHlJY29uKSB7XG4gICAgICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1yZWd1bGFyXCIsICF0b2RvLmlzUHJpb3JpdHkpO1xuICAgICAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtc29saWRcIiwgdG9kby5pc1ByaW9yaXR5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkVG9kb1RvSW5ib3gobmFtZSwgZGF0ZSkge1xuICAgIGNvbnN0IHRvZG9JdGVtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tY29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgdG9kbyA9IHtcbiAgICAgIGlkOiB0aGlzLnRvZG9JZENvdW50ZXIrKyxcbiAgICAgIG5hbWUsXG4gICAgICBkYXRlLFxuICAgICAgaXNQcmlvcml0eTogZmFsc2UsXG4gICAgfTtcblxuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcblxuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBUb2RvczpcIiwgdGhpcy50b2Rvcyk7XG5cbiAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMuY3JlYXRlVG9kb0l0ZW0odG9kbywgdG9kb0l0ZW1Db250YWluZXIpO1xuXG4gICAgaWYgKHRvZG8uaXNQcmlvcml0eSkge1xuICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZChcInByaW9yaXR5XCIpO1xuICAgIH1cbiAgICB0b2RvSXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG5cbiAgICB0aGlzLmFycmFuZ2VJbmJveCh0b2RvSXRlbUNvbnRhaW5lcik7XG4gIH1cblxuICByZW1vdmVUb2RvRnJvbUxpc3QodG9kbykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBmaWx0ZXJCeUR1ZURhdGUoc3RhcnREYXRlLCBlbmREYXRlLCBpbmNsdWRlVGltZSA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc3RhcnRPZkRhdGUgPSBuZXcgRGF0ZShcbiAgICAgIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgc3RhcnREYXRlLmdldE1vbnRoKCksXG4gICAgICBzdGFydERhdGUuZ2V0RGF0ZSgpXG4gICAgKTtcblxuICAgIGNvbnN0IGVuZE9mRGF0ZSA9IGVuZERhdGVcbiAgICAgID8gbmV3IERhdGUoXG4gICAgICAgICAgZW5kRGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgIGVuZERhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICBlbmREYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAyMyxcbiAgICAgICAgICA1OSxcbiAgICAgICAgICA1OFxuICAgICAgICApXG4gICAgICA6IG5ldyBEYXRlKFxuICAgICAgICAgIHN0YXJ0T2ZEYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgc3RhcnRPZkRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICBzdGFydE9mRGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgMjMsXG4gICAgICAgICAgNTksXG4gICAgICAgICAgNTlcbiAgICAgICAgKTtcblxuICAgIHJldHVybiB0aGlzLnRvZG9zLmZpbHRlcigodG9kbykgPT4ge1xuICAgICAgY29uc3QgdG9kb0R1ZURhdGUgPSBuZXcgRGF0ZSh0b2RvLmRhdGUpO1xuXG4gICAgICBpZiAoaW5jbHVkZVRpbWUpIHtcbiAgICAgICAgcmV0dXJuIHRvZG9EdWVEYXRlID49IHN0YXJ0T2ZEYXRlICYmIHRvZG9EdWVEYXRlIDw9IGVuZE9mRGF0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0b2RvRHVlRGF0ZSA+PSBzdGFydE9mRGF0ZSAmJiB0b2RvRHVlRGF0ZSA8PSBlbmRPZkRhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhcnJhbmdlSW5ib3goaW5ib3hDb250YWluZXIpIHtcbiAgICBjb25zdCB0b2RvSXRlbXMgPSBBcnJheS5mcm9tKFxuICAgICAgaW5ib3hDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRvZG8taXRlbVwiKVxuICAgICk7XG5cbiAgICBjb25zdCByZWd1bGFyVG9kb3MgPSB0b2RvSXRlbXMuZmlsdGVyKFxuICAgICAgKHRvZG9JdGVtKSA9PiAhdG9kb0l0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJpb3JpdHlcIilcbiAgICApO1xuICAgIGNvbnN0IHByaW9yaXR5VG9kb3MgPSB0b2RvSXRlbXMuZmlsdGVyKCh0b2RvSXRlbSkgPT5cbiAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5jb250YWlucyhcInByaW9yaXR5XCIpXG4gICAgKTtcblxuICAgIGNvbnN0IHNvcnREYXRlID0gKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IGRhdGVBID0gbmV3IERhdGUoYS5xdWVyeVNlbGVjdG9yKFwic3BhbjpudGgtY2hpbGQoMylcIikudGV4dENvbnRlbnQpO1xuICAgICAgY29uc3QgZGF0ZUIgPSBuZXcgRGF0ZShiLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuOm50aC1jaGlsZCgzKVwiKS50ZXh0Q29udGVudCk7XG4gICAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgICB9O1xuXG4gICAgcHJpb3JpdHlUb2Rvcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEucXVlcnlTZWxlY3RvcihcInNwYW46bnRoLWNoaWxkKDMpXCIpLnRleHRDb250ZW50KTtcbiAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYi5xdWVyeVNlbGVjdG9yKFwic3BhbjpudGgtY2hpbGQoMylcIikudGV4dENvbnRlbnQpO1xuXG4gICAgICBpZiAoZGF0ZUEuZ2V0VGltZSgpID09PSBkYXRlQi5nZXRUaW1lKCkpIHtcbiAgICAgICAgY29uc3QgcHJpb3JpdHlBID0gYS5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmlvcml0eVwiKSA/IDEgOiAwO1xuICAgICAgICBjb25zdCBwcmlvcml0eUIgPSBiLmNsYXNzTGlzdC5jb250YWlucyhcInByaW9yaXR5XCIpID8gMSA6IDA7XG4gICAgICAgIHJldHVybiBwcmlvcml0eUIgLSBwcmlvcml0eUE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRlQSAtIGRhdGVCO1xuICAgIH0pO1xuXG4gICAgcmVndWxhclRvZG9zLnNvcnQoc29ydERhdGUpO1xuICAgIGluYm94Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBwcmlvcml0eVRvZG9zLmZvckVhY2goKHRvZG9JdGVtKSA9PiB7XG4gICAgICBpbmJveENvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gICAgfSk7XG5cbiAgICByZWd1bGFyVG9kb3MuZm9yRWFjaCgodG9kb0l0ZW0pID0+IHtcbiAgICAgIGluYm94Q29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIYW5kbGVyO1xuIiwiaW1wb3J0IEhhbmRsZXIgZnJvbSBcIi4vaGFuZGxlclwiO1xuXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHt9O1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0gbnVsbDtcbiAgICB0aGlzLmhhbmRsZXIgPSBuZXcgSGFuZGxlcigpO1xuICB9XG5cbiAgY3JlYXRlUHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdFwiKTtcbiAgICBjb25zdCBzaWRlTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZU1lbnVcIik7XG5cbiAgICBjb25zdCBleGlzdGluZ0NvbnRhaW5lciA9IHNpZGVNZW51LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXQtY29udGFpbmVyXCIpO1xuICAgIGlmIChleGlzdGluZ0NvbnRhaW5lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHByb2pJbnB1dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBwcm9qSW5wdXRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImlucHV0LWNvbnRhaW5lclwiKTtcblxuICAgICAgY29uc3QgcHJvaklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgcHJvaklucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgIHByb2pJbnB1dC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgUHJvamVjdCBOYW1lXCI7XG4gICAgICBwcm9qSW5wdXQuY2xhc3NMaXN0LmFkZChcInByb2plY3QtaW5wdXRcIik7XG5cbiAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xuICAgICAgc3VibWl0QnRuLmNsYXNzTGlzdC5hZGQoXCJzdWJtaXRCdG5cIik7XG5cbiAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSBcIkNhbmNlbFwiO1xuICAgICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJjYW5jZWxCdG5cIik7XG5cbiAgICAgIHByb2pJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qSW5wdXQpO1xuICAgICAgcHJvaklucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKHN1Ym1pdEJ0bik7XG4gICAgICBwcm9qSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcblxuICAgICAgY29uc3QgcHJvamVjdFNlY3Rpb24gPSBzaWRlTWVudS5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RcIik7XG4gICAgICBwcm9qZWN0U2VjdGlvbi5hcHBlbmRDaGlsZChwcm9qSW5wdXRDb250YWluZXIpO1xuXG4gICAgICBwcm9qZWN0U2VjdGlvbi5pbnNlcnRCZWZvcmUoXG4gICAgICAgIHByb2pJbnB1dENvbnRhaW5lcixcbiAgICAgICAgcHJvamVjdFNlY3Rpb24uY2hpbGROb2Rlc1syXVxuICAgICAgKTtcblxuICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHByb2plY3RTZWN0aW9uLnJlbW92ZUNoaWxkKHByb2pJbnB1dENvbnRhaW5lcik7XG4gICAgICAgIHByb2plY3RCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgYnRuQ29udGFpbmVySWQ7XG5cbiAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2pJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgIGlmIChwcm9qZWN0TmFtZSAhPT0gXCJcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBTdWJtaXR0ZWQ6XCIsIHByb2plY3ROYW1lKTtcblxuICAgICAgICAgIGlmICghdGhpcy5wcm9qZWN0c1twcm9qZWN0TmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdID0gW107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnRuQ29udGFpbmVySWQgPSBgJHtwcm9qZWN0TmFtZX0tYnRuLWNvbnRhaW5lcmA7XG4gICAgICAgICAgY29uc3QgYnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBidG5Db250YWluZXIuY2xhc3NMaXN0LmFkZChgJHtwcm9qZWN0TmFtZX1gLCBcImJ0bi1jb250YWluZXJcIik7XG4gICAgICAgICAgYnRuQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIGJ0bkNvbnRhaW5lcklkKTtcblxuICAgICAgICAgIGNvbnN0IG5ld1Byb2pCdG4gPSB0aGlzLmhhbmRsZXIuY3JlYXRlQnV0dG9uKFxuICAgICAgICAgICAgcHJvamVjdE5hbWUsXG4gICAgICAgICAgICBwcm9qZWN0TmFtZVxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV3UHJvakJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvak5hbWVcIik7XG5cbiAgICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgIGRlbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwieFwiO1xuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlQnRuXCIpO1xuXG4gICAgICAgICAgYnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld1Byb2pCdG4pO1xuICAgICAgICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gICAgICAgICAgY29uc3QgcHJvamVjdFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RcIik7XG4gICAgICAgICAgcHJvamVjdFNlY3Rpb24uYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyKTtcblxuICAgICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgcHJvamVjdFNlY3Rpb24ucmVtb3ZlQ2hpbGQoYnRuQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgZGVsZXRlIHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFJlbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgIGAuJHtwcm9qZWN0TmFtZX0ucHJvamVjdC1jb250YWluZXJgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHByb2plY3RSZW1vdmUpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZW1vdmluZyBwcm9qZWN0IGNvbnRhaW5lcjpcIiwgcHJvamVjdFJlbW92ZSk7XG4gICAgICAgICAgICAgIHByb2plY3RSZW1vdmUucmVtb3ZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIG1hdGNoaW5nIHByb2plY3QgY29udGFpbmVyXCIsIHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdE5hbWU7XG5cbiAgICAgICAgICBuZXdQcm9qQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dQcm9qZWN0UGFnZShwcm9qZWN0TmFtZSk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXIuY3JlYXRlVG9kb0xpc3RGb3JtKHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RQYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0UGFnZVwiKTtcbiAgICAgICAgICAgIGNvbnN0IGluYm94UGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5ib3hQYWdlXCIpO1xuXG4gICAgICAgICAgICBwcm9qZWN0UGFnZS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgaW5ib3hQYWdlLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBpbmJveEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5ib3hcIik7XG4gICAgICAgICAgaW5ib3hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RQYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0UGFnZVwiKTtcbiAgICAgICAgICAgIGNvbnN0IGluYm94UGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5ib3hQYWdlXCIpO1xuXG4gICAgICAgICAgICBpbmJveFBhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICAgIHByb2plY3RQYWdlLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoXCJQbGVhc2UgRW50ZXIgYSBQcm9qZWN0IE5hbWUuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHByb2plY3RTZWN0aW9uLnJlbW92ZUNoaWxkKHByb2pJbnB1dENvbnRhaW5lcik7XG4gICAgICAgIHByb2plY3RCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcHJvamVjdEJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVQcm9qZWN0UGFnZShwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IHByb2pDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2pDb250YWluZXIuY2xhc3NMaXN0LmFkZChgJHtwcm9qZWN0TmFtZX1gLCBcInByb2plY3QtY29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jb250YWluZXJcIik7XG5cbiAgICBjb25zdCB0b2RvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWl0ZW0tY29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgcHJvamVjdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICBwcm9qZWN0SGVhZGVyLnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XG4gICAgZm9ybUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGVyKTtcblxuICAgIGNvbnN0IHRvZG9JdGVtcyA9IHRoaXMucHJvamVjdHNbcHJvamVjdE5hbWVdIHx8IFtdO1xuXG4gICAgdG9kb0l0ZW1zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5oYW5kbGVyLmNyZWF0ZVRvZG9JdGVtKHRvZG8pO1xuICAgICAgdG9kb0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2RvRm9ybSA9IHRoaXMuaGFuZGxlci5jcmVhdGVUb2RvTGlzdEZvcm0odG9kb0NvbnRhaW5lcik7XG4gICAgaWYgKHRvZG9Gb3JtKSB7XG4gICAgICBmb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9Gb3JtKTtcbiAgICB9XG5cbiAgICBwcm9qQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXIpO1xuICAgIHByb2pDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybUNvbnRhaW5lcik7XG4gICAgcHJvakNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKTtcblxuICAgIHJldHVybiBwcm9qQ29udGFpbmVyO1xuICB9XG5cbiAgc2hvd1Byb2plY3RQYWdlKHByb2plY3ROYW1lKSB7XG4gICAgY29uc29sZS5sb2coXCJzaG93aW5nIHByb2plY3RcIiwgcHJvamVjdE5hbWUpO1xuICAgIGNvbnN0IGFsbFByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtY29udGFpbmVyXCIpO1xuICAgIGFsbFByb2plY3RDb250YWluZXIuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RlZFByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwcm9qZWN0TmFtZX0ucHJvamVjdC1jb250YWluZXJgKTtcbiAgICBpZiAoc2VsZWN0ZWRQcm9qZWN0Q29udGFpbmVyKSB7XG4gICAgICBzZWxlY3RlZFByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IHRoaXMuY3JlYXRlUHJvamVjdFBhZ2UocHJvamVjdE5hbWUpO1xuICAgICAgY29uc3QgcHJvamVjdFBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RQYWdlXCIpO1xuICAgICAgcHJvamVjdFBhZ2UuYXBwZW5kQ2hpbGQocHJvamVjdENvbnRhaW5lcik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7XG4iLCJpbXBvcnQgSGFuZGxlciBmcm9tIFwiLi9oYW5kbGVyXCI7XG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5cbmNsYXNzIFdlYnNpdGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IEhhbmRsZXIoKTtcbiAgICBjb25zdCBwcm9qSGFuZGxlciA9IG5ldyBQcm9qZWN0KCk7XG5cbiAgICB0aGlzLmNyZWF0ZUhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJUby1EbyBMaXN0XCI7XG5cbiAgICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlRm9vdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICAgIGNvbnN0IGZvb3RlckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZm9vdGVyTGluay5jbGFzc0xpc3QuYWRkKFwibGlua1wiKTtcblxuICAgICAgY29uc3QgY29weXJpZ2h0ID0gdGhpcy5jcmVhdGVGb290ZXJMaW5rKFxuICAgICAgICAnQ29weXJpZ2h0IDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1jb3B5cmlnaHRcIj48L2k+IEpvc2hBbGxlbidcbiAgICAgICk7XG5cbiAgICAgIGZvb3RlckxpbmsuYXBwZW5kQ2hpbGQoY29weXJpZ2h0KTtcbiAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChmb290ZXJMaW5rKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVGb290ZXJMaW5rID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICBsaW5rLmlubmVySFRNTCA9IHRleHQ7XG5cbiAgICAgIHJldHVybiBsaW5rO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZUNvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImNvbnRlbnRcIik7XG4gICAgICBjb250ZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibWFpbkNvbnRlbnRcIik7XG5cbiAgICAgIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNpZGVNZW51LmNsYXNzTGlzdC5hZGQoXCJzaWRlTWVudVwiKTtcblxuICAgICAgY29uc3QgaG9tZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBob21lLmNsYXNzTGlzdC5hZGQoXCJob21lXCIpO1xuICAgICAgaG9tZS5pbm5lckhUTUwgPSBcIjxoMT5Ib21lPC9oMT5cIjtcblxuICAgICAgY29uc3QgaW5ib3hCdG4gPSBoYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIkluYm94XCIsIFwiaW5ib3hcIik7XG4gICAgICBpbmJveEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dQYWdlKFwiaW5ib3hQYWdlXCIpO1xuICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gaW5ib3gucXVlcnlTZWxlY3RvcihcIi5mb3JtLWNvbnRhaW5lclwiKTtcbiAgICAgICAgaWYgKCFmb3JtQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1mb3JtXCIpKSB7XG4gICAgICAgICAgY29uc3QgdG9kb0Zvcm0gPSBoYW5kbGVyLmNyZWF0ZVRvZG9MaXN0Rm9ybSgpO1xuICAgICAgICAgIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0Zvcm0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW5ib3ggQnRuIHNob3dpbmcgZm9ybVwiKTtcbiAgICAgICAgfSBlbHNlIGNvbnNvbGUubG9nKFwiZm9ybSBhbHJlYWR5IGNyZWF0ZWRcIik7XG4gICAgICB9KTtcblxuICAgICAgaG9tZS5hcHBlbmRDaGlsZChpbmJveEJ0bik7XG5cbiAgICAgIGNvbnN0IHRvZGF5QnRuID0gaGFuZGxlci5jcmVhdGVCdXR0b24oXCJUb2RheVwiLCBcInRvZGF5XCIpO1xuICAgICAgdG9kYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFnZShcInRvZGF5UGFnZVwiKTtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFRvZG9zID0gaGFuZGxlci5maWx0ZXJCeUR1ZURhdGUodG9kYXksIG51bGwsIHRydWUpO1xuICAgICAgICB0aGlzLnNob3dGaWx0ZXJlZFRvZG9zKGZpbHRlcmVkVG9kb3MsIFwidG9kYXlQYWdlXCIpO1xuICAgICAgfSk7XG4gICAgICBob21lLmFwcGVuZENoaWxkKHRvZGF5QnRuKTtcblxuICAgICAgY29uc3QgdGhpc1dlZWtCdG4gPSBoYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIlRoaXMgV2Vla1wiLCBcInRoaXMtd2Vla1wiKTtcbiAgICAgIHRoaXNXZWVrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgbmV4dFdlZWsgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICAgIG5leHRXZWVrLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNyk7XG5cbiAgICAgICAgdGhpcy5zaG93UGFnZShcIndlZWtQYWdlXCIpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFRvZG9zID0gaGFuZGxlci5maWx0ZXJCeUR1ZURhdGUodG9kYXksIG5leHRXZWVrKTtcbiAgICAgICAgdGhpcy5zaG93RmlsdGVyZWRUb2RvcyhmaWx0ZXJlZFRvZG9zLCBcIndlZWtQYWdlXCIpO1xuICAgICAgfSk7XG4gICAgICBob21lLmFwcGVuZENoaWxkKHRoaXNXZWVrQnRuKTtcblxuICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgICAgcHJvamVjdC5pbm5lckhUTUwgPSBcIjxoMT5Qcm9qZWN0PC9oMT5cIjtcbiAgICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBoYW5kbGVyLmNyZWF0ZUJ1dHRvbihcbiAgICAgICAgXCIrIEFkZCBQcm9qZWN0XCIsXG4gICAgICAgIFwiYWRkLXByb2plY3RcIlxuICAgICAgKTtcblxuICAgICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dQYWdlKHByb2plY3RQYWdlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJhZGQgcHJvamVjdCBjbGlja2VkXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIHByb2plY3QuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdEJ0bik7XG5cbiAgICAgIHNpZGVNZW51LmFwcGVuZENoaWxkKGhvbWUpO1xuICAgICAgc2lkZU1lbnUuYXBwZW5kQ2hpbGQocHJvamVjdCk7XG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKHNpZGVNZW51KTtcblxuICAgICAgY29uc3QgaW5ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaW5ib3guY2xhc3NMaXN0LmFkZChcImluYm94LXBhZ2VcIiwgXCJoaWRkZW5cIik7XG4gICAgICBpbmJveC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImluYm94UGFnZVwiKTtcblxuICAgICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRhaW5lclwiKTtcblxuICAgICAgY29uc3QgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0b2RvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY29udGFpbmVyXCIpO1xuXG4gICAgICBpbmJveC5hcHBlbmRDaGlsZChmb3JtQ29udGFpbmVyLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICBpbmJveC5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRvZGF5LmNsYXNzTGlzdC5hZGQoXCJ0b2RheS1wYWdlXCIsIFwiaGlkZGVuXCIpO1xuICAgICAgdG9kYXkuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0b2RheVBhZ2VcIik7XG4gICAgICB0b2RheS5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgIGNvbnN0IHdlZWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgd2Vlay5jbGFzc0xpc3QuYWRkKFwid2Vlay1wYWdlXCIsIFwiaGlkZGVuXCIpO1xuICAgICAgd2Vlay5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIndlZWtQYWdlXCIpO1xuICAgICAgd2Vlay5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgIGNvbnN0IHByb2plY3RQYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHByb2plY3RQYWdlLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXBhZ2VcIiwgXCJoaWRkZW5cIik7XG4gICAgICBwcm9qZWN0UGFnZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3RQYWdlXCIpO1xuXG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKGluYm94KTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQodG9kYXkpO1xuICAgICAgY29udGVudC5hcHBlbmRDaGlsZCh3ZWVrKTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQocHJvamVjdFBhZ2UpO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLmZpbHRlclRvZG9zQnlEdWVEYXRlID0gZnVuY3Rpb24gKGR1ZURhdGUsIHBhZ2VJZCkge1xuICAgICAgY29uc3QgdG9kb0l0ZW1Db250YWluZXIgPSBkb2N1bWVudFxuICAgICAgICAuZ2V0RWxlbWVudEJ5SWQocGFnZUlkKVxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tY29udGFpbmVyXCIpO1xuICAgICAgdG9kb0l0ZW1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgY29uc3QgZmlsdGVyVG9kb3MgPSBoYW5kbGVyLmZpbHRlckJ5RHVlRGF0ZShkdWVEYXRlKTtcbiAgICAgIGZpbHRlclRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSBoYW5kbGVyLmNyZWF0ZVRvZG9JdGVtKHRvZG8sIHRvZG9JdGVtQ29udGFpbmVyKTtcbiAgICAgICAgaWYgKHRvZG8uaXNQcmlvcml0eSkge1xuICAgICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0b2RvSXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5zaG93RmlsdGVyZWRUb2RvcyA9IGZ1bmN0aW9uIChmaWx0ZXJUb2RvcywgcGFnZUlkKSB7XG4gICAgICBjb25zdCB0b2RvSXRlbUNvbnRhaW5lciA9IGRvY3VtZW50XG4gICAgICAgIC5nZXRFbGVtZW50QnlJZChwYWdlSWQpXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS1jb250YWluZXJcIik7XG4gICAgICB0b2RvSXRlbUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICBmaWx0ZXJUb2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gaGFuZGxlci5jcmVhdGVUb2RvSXRlbSh0b2RvLCB0b2RvSXRlbUNvbnRhaW5lcik7XG4gICAgICAgIGlmICh0b2RvLmlzUHJpb3JpdHkpIHtcbiAgICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlcIik7XG4gICAgICAgIH1cbiAgICAgICAgdG9kb0l0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2hvd1BhZ2UgPSBmdW5jdGlvbiAocGFnZUlkKSB7XG4gICAgICBjb25zdCBwYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29udGVudCA+IGRpdjpub3QoLnNpZGVNZW51KVwiKTtcbiAgICAgIHBhZ2VzLmZvckVhY2goKHBhZ2UpID0+IHtcbiAgICAgICAgcGFnZS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuXG4gICAgICAgIGlmIChwYWdlSWQgIT09IFwicHJvamVjdFBhZ2VcIikge1xuICAgICAgICAgIGNvbnN0IHByb2plY3RTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0XCIpO1xuICAgICAgICAgIGNvbnN0IHByb2pDb250YWluZXIgPVxuICAgICAgICAgICAgcHJvamVjdFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWNvbnRhaW5lclwiKTtcblxuICAgICAgICAgIGlmIChwcm9qQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBwcm9qZWN0U2VjdGlvbi5yZW1vdmVDaGlsZChwcm9qQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0XCIpO1xuICAgICAgICAgICAgcHJvamVjdEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNlbGVjdGVkUGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhZ2VJZCk7XG4gICAgICBpZiAoc2VsZWN0ZWRQYWdlKSB7XG4gICAgICAgIHNlbGVjdGVkUGFnZS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmluaXRXZWJzaXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jcmVhdGVIZWFkZXIoKTtcbiAgICAgIHRoaXMuY3JlYXRlQ29udGVudCgpO1xuICAgICAgcHJvakhhbmRsZXIuY3JlYXRlUHJvamVjdCgpO1xuICAgICAgdGhpcy5jcmVhdGVGb290ZXIoKTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYnNpdGU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBXZWJzaXRlIGZyb20gXCIuL3dlYnNpdGVcIjtcblxuY29uc3QgbXlXZWJzaXRlID0gbmV3IFdlYnNpdGUoKTtcbm15V2Vic2l0ZS5pbml0V2Vic2l0ZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9