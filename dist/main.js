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

  // ** Project Section ** //

  createProject() {
    const existingContainer = document.querySelector(".project-container");

    if (existingContainer) {
      return;
    }

    const projectBtn = document.getElementById("add-project");
    const sideMenu = document.querySelector(".sideMenu");
    projectBtn.addEventListener("click", () => {
      const projContainer = document.createElement("div");
      projContainer.classList.add("project-container");

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

      projContainer.appendChild(projInput);
      projContainer.appendChild(submitBtn);
      projContainer.appendChild(cancelBtn);

      const projectSection = sideMenu.querySelector(".project");
      projectSection.appendChild(projContainer);

      projectSection.insertBefore(projContainer, projectSection.childNodes[2]);

      cancelBtn.addEventListener("click", () => {
        projectSection.removeChild(projContainer);
        projectBtn.disabled = false;
      });

      submitBtn.addEventListener("click", () => {
        const projectName = projInput.value.trim();
        if (projectName !== "") {
          console.log("Project Submitted:", projectName);

          const newProjBtn = this.createButton(projectName, projectName);
          newProjBtn.classList.add("projName");

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "x";
          deleteBtn.classList.add("deleteBtn");

          newProjBtn.appendChild(deleteBtn);

          const projectSection = document.querySelector(".project");
          projectSection.insertBefore(newProjBtn, projectSection.childNodes[2]);

          deleteBtn.addEventListener("click", () => {
            projectSection.removeChild(newProjBtn);
          })
        } else {
          alert("Please Enter a project name.");
        }
        projectSection.removeChild(projContainer);
        projectBtn.disabled = false;
      });
      projectBtn.disabled = true;
    });
  }

  initHandler() {
    this.createTodoListForm();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Handler);


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


class Website {
  constructor() {
    const handler = new _handler__WEBPACK_IMPORTED_MODULE_0__["default"]();

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
        const todoForm = handler.createTodoListForm();
        inbox.querySelector(".form-container").appendChild(todoForm);
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
        handler.createProject.bind();
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
      projectPage.appendChild(formContainer.cloneNode(true));
      projectPage.appendChild(todoContainer).cloneNode(true);

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
      handler.createProject();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzVlM7O0FBRWhDO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQU87O0FBRS9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7OztVQ3ZNdkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05nQzs7QUFFaEMsc0JBQXNCLGdEQUFPO0FBQzdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaGFuZGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy93ZWJzaXRlLmpzIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgSGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudG9kb3MgPSBbXTtcbiAgICB0aGlzLnRvZG9JZENvdW50ZXIgPSAwO1xuICB9XG5cbiAgY3JlYXRlQnV0dG9uKHRleHQsIGlkKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGJ1dHRvbi5pZCA9IGlkO1xuXG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIGNyZWF0ZVRvZG9MaXN0Rm9ybSgpIHtcbiAgICBjb25zdCBleGlzdGluZ0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tZm9ybVwiKTtcbiAgICBpZiAoZXhpc3RpbmdGb3JtKSB7XG4gICAgICByZXR1cm4gZXhpc3RpbmdGb3JtO1xuICAgIH1cblxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWZvcm1cIik7XG5cbiAgICBjb25zdCBuYW1lSW5wdXQgPSB0aGlzLmNyZWF0ZUlucHV0KFwidGV4dFwiLCBcIlRvZG8gTmFtZVwiLCB0cnVlKTtcbiAgICBjb25zdCBkYXRlSW5wdXQgPSB0aGlzLmNyZWF0ZUlucHV0KFwiZGF0ZVwiLCBcIlwiLCB0cnVlKTtcblxuICAgIGNvbnN0IGFkZEJ1dHRvbiA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiQWRkIFRvZG9cIiwgXCJhZGRCdG5cIik7XG4gICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGNvbnN0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWU7XG4gICAgICBjb25zdCBkYXRlID0gZGF0ZUlucHV0LnZhbHVlO1xuXG4gICAgICBpZiAobmFtZSAmJiBkYXRlKSB7XG4gICAgICAgIHRoaXMuYWRkVG9kb1RvSW5ib3gobmFtZSwgZGF0ZSk7XG4gICAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIGRhdGVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkYXRlSW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcblxuICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tY29udGFpbmVyXCIpO1xuICAgIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICByZXR1cm4gZm9ybTtcbiAgfVxuXG4gIGNyZWF0ZUlucHV0KHR5cGUsIHBsYWNlaG9sZGVyLCByZXF1aXJlZCkge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnR5cGUgPSB0eXBlO1xuICAgIGlucHV0LnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgaW5wdXQucmVxdWlyZWQgPSByZXF1aXJlZDtcblxuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuXG4gIGNyZWF0ZVRvZG9JdGVtKHRvZG8sIGluYm94Q29udGFpbmVyKSB7XG4gICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7XG4gICAgdG9kb0l0ZW0uc2V0QXR0cmlidXRlKFwiZGF0YS10b2RvLWlkXCIsIHRvZG8uaWQpO1xuXG4gICAgY29uc29sZS5sb2coXCJDcmVhdGluZyB0b2RvIGl0ZW06XCIsIHRvZG8pO1xuXG4gICAgY29uc3QgY2hlY2tib3hDb250YWluZXIgPSB0aGlzLmNyZWF0ZUNoZWNrYm94Q29udGFpbmVyKHRvZG8pO1xuXG4gICAgY29uc3QgbmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgbmFtZUxhYmVsLnRleHRDb250ZW50ID0gdG9kby5uYW1lO1xuXG4gICAgY29uc3QgZGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgZGF0ZUxhYmVsLnRleHRDb250ZW50ID0gdG9kby5kYXRlO1xuICAgIGNvbnNvbGUubG9nKFwiRGF0ZSBMYWJlbCBWYWx1ZTpcIiwgZGF0ZUxhYmVsLnRleHRDb250ZW50KTtcblxuICAgIGNvbnN0IHByaW9yaXR5SWNvbiA9IHRoaXMuY3JlYXRlUHJpb3JpdHlJY29uKFxuICAgICAgdG9kbyxcbiAgICAgIHRvZG9JdGVtLFxuICAgICAgaW5ib3hDb250YWluZXJcbiAgICApO1xuXG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoY2hlY2tib3hDb250YWluZXIpO1xuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKG5hbWVMYWJlbCk7XG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoZGF0ZUxhYmVsKTtcbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChwcmlvcml0eUljb24pO1xuXG4gICAgY29uc29sZS5sb2coXCJUb2RvIEl0ZW0gY3JlYXRlZDpcIiwgdG9kb0l0ZW0pO1xuXG4gICAgcmV0dXJuIHRvZG9JdGVtO1xuICB9XG5cbiAgY3JlYXRlQ2hlY2tib3hDb250YWluZXIodG9kbykge1xuICAgIGNvbnN0IGNoZWNrYm94Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjaGVja2JveENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY2hlY2tib3gtY29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlVG9kb0Zyb21MaXN0KHRvZG8pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2tib3ggY2xpY2tlZFwiKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNoZWNrbWFya1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjaGVja21hcmtTcGFuLmNsYXNzTGlzdC5hZGQoXCJjaGVja21hcmtcIik7XG5cbiAgICBjaGVja2JveENvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgY2hlY2tib3hDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2ttYXJrU3Bhbik7XG5cbiAgICByZXR1cm4gY2hlY2tib3hDb250YWluZXI7XG4gIH1cblxuICBjcmVhdGVQcmlvcml0eUljb24odG9kbywgdG9kb0l0ZW0sIGluYm94Q29udGFpbmVyKSB7XG4gICAgY29uc3QgcHJpb3JpdHlJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICBcInByaW9yaXR5LWljb25cIixcbiAgICAgIHRvZG8uaXNQcmlvcml0eSA/IFwiZmEtc29saWRcIiA6IFwiZmEtcmVndWxhclwiLFxuICAgICAgXCJmYS1zdGFyXCJcbiAgICApO1xuICAgIHByaW9yaXR5SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdG9kby5pc1ByaW9yaXR5ID0gIXRvZG8uaXNQcmlvcml0eTtcbiAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtcmVndWxhclwiLCAhdG9kby5pc1ByaW9yaXR5KTtcbiAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtc29saWRcIiwgdG9kby5pc1ByaW9yaXR5KTtcbiAgICAgIGNvbnNvbGUubG9nKFwicHJpb3JpdHkgaWNvbiBjbGlja2VkXCIpO1xuICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIHRvZG86XCIsIHRvZG8pO1xuXG4gICAgICB0aGlzLnVwZGF0ZVByaW9yaXR5SWNvbih0b2RvKTtcblxuICAgICAgaWYgKHRvZG8uaXNQcmlvcml0eSkge1xuICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlcIik7XG4gICAgICAgIGluYm94Q29udGFpbmVyLnByZXBlbmQodG9kb0l0ZW0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlByaW9yaXR5IVwiLCB0aGlzLnRvZG9zKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwcmlvcml0eUljb247XG4gIH1cblxuICB1cGRhdGVQcmlvcml0eUljb24odG9kbykge1xuICAgIGNvbnN0IG90aGVyUGFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgXCIuY29udGVudCA+IGRpdjpub3QoLnNpZGVNZW51KVwiXG4gICAgKTtcblxuICAgIG90aGVyUGFnZXMuZm9yRWFjaCgocGFnZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0l0ZW0gPSBwYWdlLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAudG9kby1pdGVtW2RhdGEtdG9kby1pZD1cIiR7dG9kby5pZH1cIl1gXG4gICAgICApO1xuICAgICAgaWYgKHRvZG9JdGVtKSB7XG4gICAgICAgIGNvbnN0IHByaW9yaXR5SWNvbiA9IHRvZG9JdGVtLnF1ZXJ5U2VsZWN0b3IoXCIucHJpb3JpdHktaWNvblwiKTtcbiAgICAgICAgaWYgKHByaW9yaXR5SWNvbikge1xuICAgICAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtcmVndWxhclwiLCAhdG9kby5pc1ByaW9yaXR5KTtcbiAgICAgICAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LnRvZ2dsZShcImZhLXNvbGlkXCIsIHRvZG8uaXNQcmlvcml0eSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZFRvZG9Ub0luYm94KG5hbWUsIGRhdGUpIHtcbiAgICBjb25zdCB0b2RvSXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLWNvbnRhaW5lclwiKTtcblxuICAgIGNvbnN0IHRvZG8gPSB7XG4gICAgICBpZDogdGhpcy50b2RvSWRDb3VudGVyKyssXG4gICAgICBuYW1lLFxuICAgICAgZGF0ZSxcbiAgICAgIGlzUHJpb3JpdHk6IGZhbHNlLFxuICAgIH07XG5cbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cbiAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVG9kb3M6XCIsIHRoaXMudG9kb3MpO1xuXG4gICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmNyZWF0ZVRvZG9JdGVtKHRvZG8sIHRvZG9JdGVtQ29udGFpbmVyKTtcblxuICAgIGlmICh0b2RvLmlzUHJpb3JpdHkpIHtcbiAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICB9XG4gICAgdG9kb0l0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuXG4gICAgdGhpcy5hcnJhbmdlSW5ib3godG9kb0l0ZW1Db250YWluZXIpO1xuICB9XG5cbiAgcmVtb3ZlVG9kb0Zyb21MaXN0KHRvZG8pIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyQnlEdWVEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgaW5jbHVkZVRpbWUgPSBmYWxzZSkge1xuICAgIGNvbnN0IHN0YXJ0T2ZEYXRlID0gbmV3IERhdGUoXG4gICAgICBzdGFydERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgIHN0YXJ0RGF0ZS5nZXRNb250aCgpLFxuICAgICAgc3RhcnREYXRlLmdldERhdGUoKVxuICAgICk7XG5cbiAgICBjb25zdCBlbmRPZkRhdGUgPSBlbmREYXRlXG4gICAgICA/IG5ldyBEYXRlKFxuICAgICAgICAgIGVuZERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICBlbmREYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgZW5kRGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgMjMsXG4gICAgICAgICAgNTksXG4gICAgICAgICAgNThcbiAgICAgICAgKVxuICAgICAgOiBuZXcgRGF0ZShcbiAgICAgICAgICBzdGFydE9mRGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgIHN0YXJ0T2ZEYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgc3RhcnRPZkRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgIDIzLFxuICAgICAgICAgIDU5LFxuICAgICAgICAgIDU5XG4gICAgICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy50b2Rvcy5maWx0ZXIoKHRvZG8pID0+IHtcbiAgICAgIGNvbnN0IHRvZG9EdWVEYXRlID0gbmV3IERhdGUodG9kby5kYXRlKTtcblxuICAgICAgaWYgKGluY2x1ZGVUaW1lKSB7XG4gICAgICAgIHJldHVybiB0b2RvRHVlRGF0ZSA+PSBzdGFydE9mRGF0ZSAmJiB0b2RvRHVlRGF0ZSA8PSBlbmRPZkRhdGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdG9kb0R1ZURhdGUgPj0gc3RhcnRPZkRhdGUgJiYgdG9kb0R1ZURhdGUgPD0gZW5kT2ZEYXRlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXJyYW5nZUluYm94KGluYm94Q29udGFpbmVyKSB7XG4gICAgY29uc3QgdG9kb0l0ZW1zID0gQXJyYXkuZnJvbShcbiAgICAgIGluYm94Q29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0b2RvLWl0ZW1cIilcbiAgICApO1xuXG4gICAgY29uc3QgcmVndWxhclRvZG9zID0gdG9kb0l0ZW1zLmZpbHRlcihcbiAgICAgICh0b2RvSXRlbSkgPT4gIXRvZG9JdGVtLmNsYXNzTGlzdC5jb250YWlucyhcInByaW9yaXR5XCIpXG4gICAgKTtcbiAgICBjb25zdCBwcmlvcml0eVRvZG9zID0gdG9kb0l0ZW1zLmZpbHRlcigodG9kb0l0ZW0pID0+XG4gICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmlvcml0eVwiKVxuICAgICk7XG5cbiAgICBjb25zdCBzb3J0RGF0ZSA9IChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEucXVlcnlTZWxlY3RvcihcInNwYW46bnRoLWNoaWxkKDMpXCIpLnRleHRDb250ZW50KTtcbiAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYi5xdWVyeVNlbGVjdG9yKFwic3BhbjpudGgtY2hpbGQoMylcIikudGV4dENvbnRlbnQpO1xuICAgICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XG4gICAgfTtcblxuICAgIHByaW9yaXR5VG9kb3Muc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShhLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuOm50aC1jaGlsZCgzKVwiKS50ZXh0Q29udGVudCk7XG4gICAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIucXVlcnlTZWxlY3RvcihcInNwYW46bnRoLWNoaWxkKDMpXCIpLnRleHRDb250ZW50KTtcblxuICAgICAgaWYgKGRhdGVBLmdldFRpbWUoKSA9PT0gZGF0ZUIuZ2V0VGltZSgpKSB7XG4gICAgICAgIGNvbnN0IHByaW9yaXR5QSA9IGEuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJpb3JpdHlcIikgPyAxIDogMDtcbiAgICAgICAgY29uc3QgcHJpb3JpdHlCID0gYi5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmlvcml0eVwiKSA/IDEgOiAwO1xuICAgICAgICByZXR1cm4gcHJpb3JpdHlCIC0gcHJpb3JpdHlBO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgICB9KTtcblxuICAgIHJlZ3VsYXJUb2Rvcy5zb3J0KHNvcnREYXRlKTtcbiAgICBpbmJveENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgcHJpb3JpdHlUb2Rvcy5mb3JFYWNoKCh0b2RvSXRlbSkgPT4ge1xuICAgICAgaW5ib3hDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuICAgIH0pO1xuXG4gICAgcmVndWxhclRvZG9zLmZvckVhY2goKHRvZG9JdGVtKSA9PiB7XG4gICAgICBpbmJveENvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyAqKiBQcm9qZWN0IFNlY3Rpb24gKiogLy9cblxuICBjcmVhdGVQcm9qZWN0KCkge1xuICAgIGNvbnN0IGV4aXN0aW5nQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWNvbnRhaW5lclwiKTtcblxuICAgIGlmIChleGlzdGluZ0NvbnRhaW5lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0XCIpO1xuICAgIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlTWVudVwiKTtcbiAgICBwcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBwcm9qQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHByb2pDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3QtY29udGFpbmVyXCIpO1xuXG4gICAgICBjb25zdCBwcm9qSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBwcm9qSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgcHJvaklucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBQcm9qZWN0IE5hbWVcIjtcbiAgICAgIHByb2pJbnB1dC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1pbnB1dFwiKTtcblxuICAgICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XG4gICAgICBzdWJtaXRCdG4uY2xhc3NMaXN0LmFkZChcInN1Ym1pdEJ0blwiKTtcblxuICAgICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNhbmNlbEJ0bi50ZXh0Q29udGVudCA9IFwiQ2FuY2VsXCI7XG4gICAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcImNhbmNlbEJ0blwiKTtcblxuICAgICAgcHJvakNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qSW5wdXQpO1xuICAgICAgcHJvakNvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJtaXRCdG4pO1xuICAgICAgcHJvakNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuXG4gICAgICBjb25zdCBwcm9qZWN0U2VjdGlvbiA9IHNpZGVNZW51LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdFwiKTtcbiAgICAgIHByb2plY3RTZWN0aW9uLmFwcGVuZENoaWxkKHByb2pDb250YWluZXIpO1xuXG4gICAgICBwcm9qZWN0U2VjdGlvbi5pbnNlcnRCZWZvcmUocHJvakNvbnRhaW5lciwgcHJvamVjdFNlY3Rpb24uY2hpbGROb2Rlc1syXSk7XG5cbiAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBwcm9qZWN0U2VjdGlvbi5yZW1vdmVDaGlsZChwcm9qQ29udGFpbmVyKTtcbiAgICAgICAgcHJvamVjdEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2pJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgIGlmIChwcm9qZWN0TmFtZSAhPT0gXCJcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBTdWJtaXR0ZWQ6XCIsIHByb2plY3ROYW1lKTtcblxuICAgICAgICAgIGNvbnN0IG5ld1Byb2pCdG4gPSB0aGlzLmNyZWF0ZUJ1dHRvbihwcm9qZWN0TmFtZSwgcHJvamVjdE5hbWUpO1xuICAgICAgICAgIG5ld1Byb2pCdG4uY2xhc3NMaXN0LmFkZChcInByb2pOYW1lXCIpO1xuXG4gICAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICBkZWxldGVCdG4udGV4dENvbnRlbnQgPSBcInhcIjtcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZUJ0blwiKTtcblxuICAgICAgICAgIG5ld1Byb2pCdG4uYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgICAgICAgIGNvbnN0IHByb2plY3RTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0XCIpO1xuICAgICAgICAgIHByb2plY3RTZWN0aW9uLmluc2VydEJlZm9yZShuZXdQcm9qQnRuLCBwcm9qZWN0U2VjdGlvbi5jaGlsZE5vZGVzWzJdKTtcblxuICAgICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgcHJvamVjdFNlY3Rpb24ucmVtb3ZlQ2hpbGQobmV3UHJvakJ0bik7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGVydChcIlBsZWFzZSBFbnRlciBhIHByb2plY3QgbmFtZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvamVjdFNlY3Rpb24ucmVtb3ZlQ2hpbGQocHJvakNvbnRhaW5lcik7XG4gICAgICAgIHByb2plY3RCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcHJvamVjdEJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBpbml0SGFuZGxlcigpIHtcbiAgICB0aGlzLmNyZWF0ZVRvZG9MaXN0Rm9ybSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhhbmRsZXI7XG4iLCJpbXBvcnQgSGFuZGxlciBmcm9tIFwiLi9oYW5kbGVyXCI7XG5cbmNsYXNzIFdlYnNpdGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IEhhbmRsZXIoKTtcblxuICAgIHRoaXMuY3JlYXRlSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlRvLURvIExpc3RcIjtcblxuICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVGb290ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICAgICAgY29uc3QgZm9vdGVyTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBmb290ZXJMaW5rLmNsYXNzTGlzdC5hZGQoXCJsaW5rXCIpO1xuXG4gICAgICBjb25zdCBjb3B5cmlnaHQgPSB0aGlzLmNyZWF0ZUZvb3RlckxpbmsoXG4gICAgICAgICdDb3B5cmlnaHQgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWNvcHlyaWdodFwiPjwvaT4gSm9zaEFsbGVuJ1xuICAgICAgKTtcblxuICAgICAgZm9vdGVyTGluay5hcHBlbmRDaGlsZChjb3B5cmlnaHQpO1xuICAgICAgZm9vdGVyLmFwcGVuZENoaWxkKGZvb3RlckxpbmspO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZUZvb3RlckxpbmsgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgIGxpbmsuaW5uZXJIVE1MID0gdGV4dDtcblxuICAgICAgcmV0dXJuIGxpbms7XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKFwiY29udGVudFwiKTtcbiAgICAgIGNvbnRlbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtYWluQ29udGVudFwiKTtcblxuICAgICAgY29uc3Qgc2lkZU1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc2lkZU1lbnUuY2xhc3NMaXN0LmFkZChcInNpZGVNZW51XCIpO1xuXG4gICAgICBjb25zdCBob21lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGhvbWUuY2xhc3NMaXN0LmFkZChcImhvbWVcIik7XG4gICAgICBob21lLmlubmVySFRNTCA9IFwiPGgxPkhvbWU8L2gxPlwiO1xuXG4gICAgICBjb25zdCBpbmJveEJ0biA9IGhhbmRsZXIuY3JlYXRlQnV0dG9uKFwiSW5ib3hcIiwgXCJpbmJveFwiKTtcbiAgICAgIGluYm94QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd1BhZ2UoXCJpbmJveFBhZ2VcIik7XG4gICAgICAgIGNvbnN0IHRvZG9Gb3JtID0gaGFuZGxlci5jcmVhdGVUb2RvTGlzdEZvcm0oKTtcbiAgICAgICAgaW5ib3gucXVlcnlTZWxlY3RvcihcIi5mb3JtLWNvbnRhaW5lclwiKS5hcHBlbmRDaGlsZCh0b2RvRm9ybSk7XG4gICAgICB9KTtcblxuICAgICAgaG9tZS5hcHBlbmRDaGlsZChpbmJveEJ0bik7XG5cbiAgICAgIGNvbnN0IHRvZGF5QnRuID0gaGFuZGxlci5jcmVhdGVCdXR0b24oXCJUb2RheVwiLCBcInRvZGF5XCIpO1xuICAgICAgdG9kYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFnZShcInRvZGF5UGFnZVwiKTtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFRvZG9zID0gaGFuZGxlci5maWx0ZXJCeUR1ZURhdGUodG9kYXksIG51bGwsIHRydWUpO1xuICAgICAgICB0aGlzLnNob3dGaWx0ZXJlZFRvZG9zKGZpbHRlcmVkVG9kb3MsIFwidG9kYXlQYWdlXCIpO1xuICAgICAgfSk7XG4gICAgICBob21lLmFwcGVuZENoaWxkKHRvZGF5QnRuKTtcblxuICAgICAgY29uc3QgdGhpc1dlZWtCdG4gPSBoYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIlRoaXMgV2Vla1wiLCBcInRoaXMtd2Vla1wiKTtcbiAgICAgIHRoaXNXZWVrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgbmV4dFdlZWsgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICAgIG5leHRXZWVrLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNyk7XG5cbiAgICAgICAgdGhpcy5zaG93UGFnZShcIndlZWtQYWdlXCIpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFRvZG9zID0gaGFuZGxlci5maWx0ZXJCeUR1ZURhdGUodG9kYXksIG5leHRXZWVrKTtcbiAgICAgICAgdGhpcy5zaG93RmlsdGVyZWRUb2RvcyhmaWx0ZXJlZFRvZG9zLCBcIndlZWtQYWdlXCIpO1xuICAgICAgfSk7XG4gICAgICBob21lLmFwcGVuZENoaWxkKHRoaXNXZWVrQnRuKTtcblxuICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgICAgcHJvamVjdC5pbm5lckhUTUwgPSBcIjxoMT5Qcm9qZWN0PC9oMT5cIjtcbiAgICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBoYW5kbGVyLmNyZWF0ZUJ1dHRvbihcbiAgICAgICAgXCIrIEFkZCBQcm9qZWN0XCIsXG4gICAgICAgIFwiYWRkLXByb2plY3RcIlxuICAgICAgKTtcblxuICAgICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dQYWdlKHByb2plY3RQYWdlKTtcbiAgICAgICAgaGFuZGxlci5jcmVhdGVQcm9qZWN0LmJpbmQoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJhZGQgcHJvamVjdCBjbGlja2VkXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIHByb2plY3QuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdEJ0bik7XG5cbiAgICAgIHNpZGVNZW51LmFwcGVuZENoaWxkKGhvbWUpO1xuICAgICAgc2lkZU1lbnUuYXBwZW5kQ2hpbGQocHJvamVjdCk7XG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKHNpZGVNZW51KTtcblxuICAgICAgY29uc3QgaW5ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaW5ib3guY2xhc3NMaXN0LmFkZChcImluYm94LXBhZ2VcIiwgXCJoaWRkZW5cIik7XG4gICAgICBpbmJveC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImluYm94UGFnZVwiKTtcblxuICAgICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRhaW5lclwiKTtcblxuICAgICAgY29uc3QgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0b2RvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY29udGFpbmVyXCIpO1xuXG4gICAgICBpbmJveC5hcHBlbmRDaGlsZChmb3JtQ29udGFpbmVyLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICBpbmJveC5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRvZGF5LmNsYXNzTGlzdC5hZGQoXCJ0b2RheS1wYWdlXCIsIFwiaGlkZGVuXCIpO1xuICAgICAgdG9kYXkuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0b2RheVBhZ2VcIik7XG4gICAgICB0b2RheS5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgIGNvbnN0IHdlZWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgd2Vlay5jbGFzc0xpc3QuYWRkKFwid2Vlay1wYWdlXCIsIFwiaGlkZGVuXCIpO1xuICAgICAgd2Vlay5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIndlZWtQYWdlXCIpO1xuICAgICAgd2Vlay5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgIGNvbnN0IHByb2plY3RQYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHByb2plY3RQYWdlLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXBhZ2VcIiwgXCJoaWRkZW5cIik7XG4gICAgICBwcm9qZWN0UGFnZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3RQYWdlXCIpO1xuICAgICAgcHJvamVjdFBhZ2UuYXBwZW5kQ2hpbGQoZm9ybUNvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgcHJvamVjdFBhZ2UuYXBwZW5kQ2hpbGQodG9kb0NvbnRhaW5lcikuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKGluYm94KTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQodG9kYXkpO1xuICAgICAgY29udGVudC5hcHBlbmRDaGlsZCh3ZWVrKTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQocHJvamVjdFBhZ2UpO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLmZpbHRlclRvZG9zQnlEdWVEYXRlID0gZnVuY3Rpb24gKGR1ZURhdGUsIHBhZ2VJZCkge1xuICAgICAgY29uc3QgdG9kb0l0ZW1Db250YWluZXIgPSBkb2N1bWVudFxuICAgICAgICAuZ2V0RWxlbWVudEJ5SWQocGFnZUlkKVxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tY29udGFpbmVyXCIpO1xuICAgICAgdG9kb0l0ZW1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgY29uc3QgZmlsdGVyVG9kb3MgPSBoYW5kbGVyLmZpbHRlckJ5RHVlRGF0ZShkdWVEYXRlKTtcbiAgICAgIGZpbHRlclRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSBoYW5kbGVyLmNyZWF0ZVRvZG9JdGVtKHRvZG8sIHRvZG9JdGVtQ29udGFpbmVyKTtcbiAgICAgICAgaWYgKHRvZG8uaXNQcmlvcml0eSkge1xuICAgICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0b2RvSXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5zaG93RmlsdGVyZWRUb2RvcyA9IGZ1bmN0aW9uIChmaWx0ZXJUb2RvcywgcGFnZUlkKSB7XG4gICAgICBjb25zdCB0b2RvSXRlbUNvbnRhaW5lciA9IGRvY3VtZW50XG4gICAgICAgIC5nZXRFbGVtZW50QnlJZChwYWdlSWQpXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS1jb250YWluZXJcIik7XG4gICAgICB0b2RvSXRlbUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICBmaWx0ZXJUb2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gaGFuZGxlci5jcmVhdGVUb2RvSXRlbSh0b2RvLCB0b2RvSXRlbUNvbnRhaW5lcik7XG4gICAgICAgIGlmICh0b2RvLmlzUHJpb3JpdHkpIHtcbiAgICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlcIik7XG4gICAgICAgIH1cbiAgICAgICAgdG9kb0l0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2hvd1BhZ2UgPSBmdW5jdGlvbiAocGFnZUlkKSB7XG4gICAgICBjb25zdCBwYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29udGVudCA+IGRpdjpub3QoLnNpZGVNZW51KVwiKTtcbiAgICAgIHBhZ2VzLmZvckVhY2goKHBhZ2UpID0+IHtcbiAgICAgICAgcGFnZS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuXG4gICAgICAgIGlmIChwYWdlSWQgIT09IFwicHJvamVjdFBhZ2VcIikge1xuICAgICAgICAgIGNvbnN0IHByb2plY3RTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0XCIpO1xuICAgICAgICAgIGNvbnN0IHByb2pDb250YWluZXIgPVxuICAgICAgICAgICAgcHJvamVjdFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWNvbnRhaW5lclwiKTtcblxuICAgICAgICAgIGlmIChwcm9qQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBwcm9qZWN0U2VjdGlvbi5yZW1vdmVDaGlsZChwcm9qQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0XCIpO1xuICAgICAgICAgICAgcHJvamVjdEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNlbGVjdGVkUGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhZ2VJZCk7XG4gICAgICBpZiAoc2VsZWN0ZWRQYWdlKSB7XG4gICAgICAgIHNlbGVjdGVkUGFnZS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmluaXRXZWJzaXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jcmVhdGVIZWFkZXIoKTtcbiAgICAgIHRoaXMuY3JlYXRlQ29udGVudCgpO1xuICAgICAgaGFuZGxlci5jcmVhdGVQcm9qZWN0KCk7XG4gICAgICB0aGlzLmNyZWF0ZUZvb3RlcigpO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2Vic2l0ZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFdlYnNpdGUgZnJvbSBcIi4vd2Vic2l0ZVwiO1xuXG5jb25zdCBteVdlYnNpdGUgPSBuZXcgV2Vic2l0ZSgpO1xubXlXZWJzaXRlLmluaXRXZWJzaXRlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=