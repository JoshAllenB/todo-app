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
        const filteredTodos = handler.filterByDueDate(today, null, true); // Pass includeTime as true
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
      addProjectBtn.addEventListener("click", () =>
        this.showPage("projectPage")
      );
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
      });

      const selectedPage = document.getElementById(pageId);
      if (selectedPage) {
        selectedPage.classList.remove("hidden");
      }
    };

    this.initWebsite = function () {
      this.createHeader();
      this.createContent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDblJTOztBQUVoQztBQUNBO0FBQ0Esd0JBQXdCLGdEQUFPOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFO0FBQzFFO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7VUN0THZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOZ0M7O0FBRWhDLHNCQUFzQixnREFBTztBQUM3QiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvd2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRvZG9zID0gW107XG4gICAgdGhpcy50b2RvSWRDb3VudGVyID0gMDtcbiAgfVxuXG4gIGNyZWF0ZUJ1dHRvbih0ZXh0LCBpZCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBidXR0b24uaWQgPSBpZDtcblxuICAgIHJldHVybiBidXR0b247XG4gIH1cblxuICBjcmVhdGVUb2RvTGlzdEZvcm0oKSB7XG4gICAgY29uc3QgZXhpc3RpbmdGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWZvcm1cIik7XG4gICAgaWYgKGV4aXN0aW5nRm9ybSkge1xuICAgICAgcmV0dXJuIGV4aXN0aW5nRm9ybTtcbiAgICB9XG5cbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKFwidG9kby1mb3JtXCIpO1xuXG4gICAgY29uc3QgbmFtZUlucHV0ID0gdGhpcy5jcmVhdGVJbnB1dChcInRleHRcIiwgXCJUb2RvIE5hbWVcIiwgdHJ1ZSk7XG4gICAgY29uc3QgZGF0ZUlucHV0ID0gdGhpcy5jcmVhdGVJbnB1dChcImRhdGVcIiwgXCJcIiwgdHJ1ZSk7XG5cbiAgICBjb25zdCBhZGRCdXR0b24gPSB0aGlzLmNyZWF0ZUJ1dHRvbihcIkFkZCBUb2RvXCIsIFwiYWRkQnRuXCIpO1xuICAgIGFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuICAgICAgY29uc3QgZGF0ZSA9IGRhdGVJbnB1dC52YWx1ZTtcblxuICAgICAgaWYgKG5hbWUgJiYgZGF0ZSkge1xuICAgICAgICB0aGlzLmFkZFRvZG9Ub0luYm94KG5hbWUsIGRhdGUpO1xuICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICBkYXRlSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGF0ZUlucHV0KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG5cbiAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLWNvbnRhaW5lclwiKTtcbiAgICBmb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgcmV0dXJuIGZvcm07XG4gIH1cblxuICBjcmVhdGVJbnB1dCh0eXBlLCBwbGFjZWhvbGRlciwgcmVxdWlyZWQpIHtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC50eXBlID0gdHlwZTtcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIGlucHV0LnJlcXVpcmVkID0gcmVxdWlyZWQ7XG5cbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuICBjcmVhdGVUb2RvSXRlbSh0b2RvLCBpbmJveENvbnRhaW5lcikge1xuICAgIGNvbnN0IHRvZG9JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xuICAgIHRvZG9JdGVtLnNldEF0dHJpYnV0ZShcImRhdGEtdG9kby1pZFwiLCB0b2RvLmlkKTtcblxuICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgdG9kbyBpdGVtOlwiLCB0b2RvKTtcblxuICAgIGNvbnN0IGNoZWNrYm94Q29udGFpbmVyID0gdGhpcy5jcmVhdGVDaGVja2JveENvbnRhaW5lcih0b2RvKTtcblxuICAgIGNvbnN0IG5hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIG5hbWVMYWJlbC50ZXh0Q29udGVudCA9IHRvZG8ubmFtZTtcblxuICAgIGNvbnN0IGRhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGRhdGVMYWJlbC50ZXh0Q29udGVudCA9IHRvZG8uZGF0ZTtcbiAgICBjb25zb2xlLmxvZyhcIkRhdGUgTGFiZWwgVmFsdWU6XCIsIGRhdGVMYWJlbC50ZXh0Q29udGVudCk7XG5cbiAgICBjb25zdCBwcmlvcml0eUljb24gPSB0aGlzLmNyZWF0ZVByaW9yaXR5SWNvbihcbiAgICAgIHRvZG8sXG4gICAgICB0b2RvSXRlbSxcbiAgICAgIGluYm94Q29udGFpbmVyXG4gICAgKTtcblxuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKGNoZWNrYm94Q29udGFpbmVyKTtcbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKGRhdGVMYWJlbCk7XG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQocHJpb3JpdHlJY29uKTtcblxuICAgIGNvbnNvbGUubG9nKFwiVG9kbyBJdGVtIGNyZWF0ZWQ6XCIsIHRvZG9JdGVtKTtcblxuICAgIHJldHVybiB0b2RvSXRlbTtcbiAgfVxuXG4gIGNyZWF0ZUNoZWNrYm94Q29udGFpbmVyKHRvZG8pIHtcbiAgICBjb25zdCBjaGVja2JveENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2hlY2tib3hDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNoZWNrYm94LWNvbnRhaW5lclwiKTtcblxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlbW92ZVRvZG9Gcm9tTGlzdCh0b2RvKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImNoZWNrYm94IGNsaWNrZWRcIik7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjaGVja21hcmtTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgY2hlY2ttYXJrU3Bhbi5jbGFzc0xpc3QuYWRkKFwiY2hlY2ttYXJrXCIpO1xuXG4gICAgY2hlY2tib3hDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgIGNoZWNrYm94Q29udGFpbmVyLmFwcGVuZENoaWxkKGNoZWNrbWFya1NwYW4pO1xuXG4gICAgcmV0dXJuIGNoZWNrYm94Q29udGFpbmVyO1xuICB9XG5cbiAgY3JlYXRlUHJpb3JpdHlJY29uKHRvZG8sIHRvZG9JdGVtLCBpbmJveENvbnRhaW5lcikge1xuICAgIGNvbnN0IHByaW9yaXR5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgXCJwcmlvcml0eS1pY29uXCIsXG4gICAgICB0b2RvLmlzUHJpb3JpdHkgPyBcImZhLXNvbGlkXCIgOiBcImZhLXJlZ3VsYXJcIixcbiAgICAgIFwiZmEtc3RhclwiXG4gICAgKTtcbiAgICBwcmlvcml0eUljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRvZG8uaXNQcmlvcml0eSA9ICF0b2RvLmlzUHJpb3JpdHk7XG4gICAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LnRvZ2dsZShcImZhLXJlZ3VsYXJcIiwgIXRvZG8uaXNQcmlvcml0eSk7XG4gICAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LnRvZ2dsZShcImZhLXNvbGlkXCIsIHRvZG8uaXNQcmlvcml0eSk7XG4gICAgICBjb25zb2xlLmxvZyhcInByaW9yaXR5IGljb24gY2xpY2tlZFwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCB0b2RvOlwiLCB0b2RvKTtcblxuICAgICAgdGhpcy51cGRhdGVQcmlvcml0eUljb24odG9kbyk7XG5cbiAgICAgIGlmICh0b2RvLmlzUHJpb3JpdHkpIHtcbiAgICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZChcInByaW9yaXR5XCIpO1xuICAgICAgICBpbmJveENvbnRhaW5lci5wcmVwZW5kKHRvZG9JdGVtKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJQcmlvcml0eSFcIiwgdGhpcy50b2Rvcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJpb3JpdHlJY29uO1xuICB9XG5cbiAgdXBkYXRlUHJpb3JpdHlJY29uKHRvZG8pIHtcbiAgICBjb25zdCBvdGhlclBhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIFwiLmNvbnRlbnQgPiBkaXY6bm90KC5zaWRlTWVudSlcIlxuICAgICk7XG5cbiAgICBvdGhlclBhZ2VzLmZvckVhY2goKHBhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JdGVtID0gcGFnZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgLnRvZG8taXRlbVtkYXRhLXRvZG8taWQ9XCIke3RvZG8uaWR9XCJdYFxuICAgICAgKTtcbiAgICAgIGlmICh0b2RvSXRlbSkge1xuICAgICAgICBjb25zdCBwcmlvcml0eUljb24gPSB0b2RvSXRlbS5xdWVyeVNlbGVjdG9yKFwiLnByaW9yaXR5LWljb25cIik7XG4gICAgICAgIGlmIChwcmlvcml0eUljb24pIHtcbiAgICAgICAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LnRvZ2dsZShcImZhLXJlZ3VsYXJcIiwgIXRvZG8uaXNQcmlvcml0eSk7XG4gICAgICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1zb2xpZFwiLCB0b2RvLmlzUHJpb3JpdHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhZGRUb2RvVG9JbmJveChuYW1lLCBkYXRlKSB7XG4gICAgY29uc3QgdG9kb0l0ZW1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS1jb250YWluZXJcIik7XG5cbiAgICBjb25zdCB0b2RvID0ge1xuICAgICAgaWQ6IHRoaXMudG9kb0lkQ291bnRlcisrLFxuICAgICAgbmFtZSxcbiAgICAgIGRhdGUsXG4gICAgICBpc1ByaW9yaXR5OiBmYWxzZSxcbiAgICB9O1xuXG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuXG4gICAgY29uc29sZS5sb2coXCJDdXJyZW50IFRvZG9zOlwiLCB0aGlzLnRvZG9zKTtcblxuICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5jcmVhdGVUb2RvSXRlbSh0b2RvLCB0b2RvSXRlbUNvbnRhaW5lcik7XG5cbiAgICBpZiAodG9kby5pc1ByaW9yaXR5KSB7XG4gICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlcIik7XG4gICAgfVxuICAgIHRvZG9JdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcblxuICAgIHRoaXMuYXJyYW5nZUluYm94KHRvZG9JdGVtQ29udGFpbmVyKTtcbiAgfVxuXG4gIHJlbW92ZVRvZG9Gcm9tTGlzdCh0b2RvKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnRvZG9zLmluZGV4T2YodG9kbyk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGZpbHRlckJ5RHVlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIGluY2x1ZGVUaW1lID0gZmFsc2UpIHtcbiAgICBjb25zdCBzdGFydE9mRGF0ZSA9IG5ldyBEYXRlKFxuICAgICAgc3RhcnREYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICBzdGFydERhdGUuZ2V0TW9udGgoKSxcbiAgICAgIHN0YXJ0RGF0ZS5nZXREYXRlKClcbiAgICApO1xuXG4gICAgY29uc3QgZW5kT2ZEYXRlID0gZW5kRGF0ZVxuICAgICAgPyBuZXcgRGF0ZShcbiAgICAgICAgICBlbmREYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgZW5kRGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgIGVuZERhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgIDIzLFxuICAgICAgICAgIDU5LFxuICAgICAgICAgIDU4XG4gICAgICAgIClcbiAgICAgIDogbmV3IERhdGUoXG4gICAgICAgICAgc3RhcnRPZkRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICBzdGFydE9mRGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgIHN0YXJ0T2ZEYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAyMyxcbiAgICAgICAgICA1OSxcbiAgICAgICAgICA1OVxuICAgICAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB7XG4gICAgICBjb25zdCB0b2RvRHVlRGF0ZSA9IG5ldyBEYXRlKHRvZG8uZGF0ZSk7XG5cbiAgICAgIGlmIChpbmNsdWRlVGltZSkge1xuICAgICAgICByZXR1cm4gdG9kb0R1ZURhdGUgPj0gc3RhcnRPZkRhdGUgJiYgdG9kb0R1ZURhdGUgPD0gZW5kT2ZEYXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRvZG9EdWVEYXRlID49IHN0YXJ0T2ZEYXRlICYmIHRvZG9EdWVEYXRlIDw9IGVuZE9mRGF0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFycmFuZ2VJbmJveChpbmJveENvbnRhaW5lcikge1xuICAgIGNvbnN0IHRvZG9JdGVtcyA9IEFycmF5LmZyb20oXG4gICAgICBpbmJveENvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidG9kby1pdGVtXCIpXG4gICAgKTtcblxuICAgIGNvbnN0IHJlZ3VsYXJUb2RvcyA9IHRvZG9JdGVtcy5maWx0ZXIoXG4gICAgICAodG9kb0l0ZW0pID0+ICF0b2RvSXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmlvcml0eVwiKVxuICAgICk7XG4gICAgY29uc3QgcHJpb3JpdHlUb2RvcyA9IHRvZG9JdGVtcy5maWx0ZXIoKHRvZG9JdGVtKSA9PlxuICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJpb3JpdHlcIilcbiAgICApO1xuXG4gICAgY29uc3Qgc29ydERhdGUgPSAoYSwgYikgPT4ge1xuICAgICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShhLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuOm50aC1jaGlsZCgzKVwiKS50ZXh0Q29udGVudCk7XG4gICAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIucXVlcnlTZWxlY3RvcihcInNwYW46bnRoLWNoaWxkKDMpXCIpLnRleHRDb250ZW50KTtcbiAgICAgIHJldHVybiBkYXRlQSAtIGRhdGVCO1xuICAgIH07XG5cbiAgICBwcmlvcml0eVRvZG9zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IGRhdGVBID0gbmV3IERhdGUoYS5xdWVyeVNlbGVjdG9yKFwic3BhbjpudGgtY2hpbGQoMylcIikudGV4dENvbnRlbnQpO1xuICAgICAgY29uc3QgZGF0ZUIgPSBuZXcgRGF0ZShiLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuOm50aC1jaGlsZCgzKVwiKS50ZXh0Q29udGVudCk7XG5cbiAgICAgIGlmIChkYXRlQS5nZXRUaW1lKCkgPT09IGRhdGVCLmdldFRpbWUoKSkge1xuICAgICAgICBjb25zdCBwcmlvcml0eUEgPSBhLmNsYXNzTGlzdC5jb250YWlucyhcInByaW9yaXR5XCIpID8gMSA6IDA7XG4gICAgICAgIGNvbnN0IHByaW9yaXR5QiA9IGIuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJpb3JpdHlcIikgPyAxIDogMDtcbiAgICAgICAgcmV0dXJuIHByaW9yaXR5QiAtIHByaW9yaXR5QTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XG4gICAgfSk7XG5cbiAgICByZWd1bGFyVG9kb3Muc29ydChzb3J0RGF0ZSk7XG4gICAgaW5ib3hDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIHByaW9yaXR5VG9kb3MuZm9yRWFjaCgodG9kb0l0ZW0pID0+IHtcbiAgICAgIGluYm94Q29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcbiAgICB9KTtcblxuICAgIHJlZ3VsYXJUb2Rvcy5mb3JFYWNoKCh0b2RvSXRlbSkgPT4ge1xuICAgICAgaW5ib3hDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdEhhbmRsZXIoKSB7XG4gICAgdGhpcy5jcmVhdGVUb2RvTGlzdEZvcm0oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIYW5kbGVyO1xuIiwiaW1wb3J0IEhhbmRsZXIgZnJvbSBcIi4vaGFuZGxlclwiO1xuXG5jbGFzcyBXZWJzaXRlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBIYW5kbGVyKCk7XG5cbiAgICB0aGlzLmNyZWF0ZUhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJUby1EbyBMaXN0XCI7XG5cbiAgICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlRm9vdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICAgIGNvbnN0IGZvb3RlckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZm9vdGVyTGluay5jbGFzc0xpc3QuYWRkKFwibGlua1wiKTtcblxuICAgICAgY29uc3QgY29weXJpZ2h0ID0gdGhpcy5jcmVhdGVGb290ZXJMaW5rKFxuICAgICAgICAnQ29weXJpZ2h0IDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1jb3B5cmlnaHRcIj48L2k+IEpvc2hBbGxlbidcbiAgICAgICk7XG5cbiAgICAgIGZvb3RlckxpbmsuYXBwZW5kQ2hpbGQoY29weXJpZ2h0KTtcbiAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChmb290ZXJMaW5rKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVGb290ZXJMaW5rID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICBsaW5rLmlubmVySFRNTCA9IHRleHQ7XG5cbiAgICAgIHJldHVybiBsaW5rO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZUNvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImNvbnRlbnRcIik7XG4gICAgICBjb250ZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibWFpbkNvbnRlbnRcIik7XG5cbiAgICAgIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNpZGVNZW51LmNsYXNzTGlzdC5hZGQoXCJzaWRlTWVudVwiKTtcblxuICAgICAgY29uc3QgaG9tZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBob21lLmNsYXNzTGlzdC5hZGQoXCJob21lXCIpO1xuICAgICAgaG9tZS5pbm5lckhUTUwgPSBcIjxoMT5Ib21lPC9oMT5cIjtcblxuICAgICAgY29uc3QgaW5ib3hCdG4gPSBoYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIkluYm94XCIsIFwiaW5ib3hcIik7XG4gICAgICBpbmJveEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dQYWdlKFwiaW5ib3hQYWdlXCIpO1xuICAgICAgICBjb25zdCB0b2RvRm9ybSA9IGhhbmRsZXIuY3JlYXRlVG9kb0xpc3RGb3JtKCk7XG4gICAgICAgIGluYm94LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1jb250YWluZXJcIikuYXBwZW5kQ2hpbGQodG9kb0Zvcm0pO1xuICAgICAgfSk7XG5cbiAgICAgIGhvbWUuYXBwZW5kQ2hpbGQoaW5ib3hCdG4pO1xuXG4gICAgICBjb25zdCB0b2RheUJ0biA9IGhhbmRsZXIuY3JlYXRlQnV0dG9uKFwiVG9kYXlcIiwgXCJ0b2RheVwiKTtcbiAgICAgIHRvZGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd1BhZ2UoXCJ0b2RheVBhZ2VcIik7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRUb2RvcyA9IGhhbmRsZXIuZmlsdGVyQnlEdWVEYXRlKHRvZGF5LCBudWxsLCB0cnVlKTsgLy8gUGFzcyBpbmNsdWRlVGltZSBhcyB0cnVlXG4gICAgICAgIHRoaXMuc2hvd0ZpbHRlcmVkVG9kb3MoZmlsdGVyZWRUb2RvcywgXCJ0b2RheVBhZ2VcIik7XG4gICAgICB9KTtcbiAgICAgIGhvbWUuYXBwZW5kQ2hpbGQodG9kYXlCdG4pO1xuXG4gICAgICBjb25zdCB0aGlzV2Vla0J0biA9IGhhbmRsZXIuY3JlYXRlQnV0dG9uKFwiVGhpcyBXZWVrXCIsIFwidGhpcy13ZWVrXCIpO1xuICAgICAgdGhpc1dlZWtCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBuZXh0V2VlayA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgbmV4dFdlZWsuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA3KTtcblxuICAgICAgICB0aGlzLnNob3dQYWdlKFwid2Vla1BhZ2VcIik7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVG9kb3MgPSBoYW5kbGVyLmZpbHRlckJ5RHVlRGF0ZSh0b2RheSwgbmV4dFdlZWspO1xuICAgICAgICB0aGlzLnNob3dGaWx0ZXJlZFRvZG9zKGZpbHRlcmVkVG9kb3MsIFwid2Vla1BhZ2VcIik7XG4gICAgICB9KTtcbiAgICAgIGhvbWUuYXBwZW5kQ2hpbGQodGhpc1dlZWtCdG4pO1xuXG4gICAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XG4gICAgICBwcm9qZWN0LmlubmVySFRNTCA9IFwiPGgxPlByb2plY3Q8L2gxPlwiO1xuICAgICAgY29uc3QgYWRkUHJvamVjdEJ0biA9IGhhbmRsZXIuY3JlYXRlQnV0dG9uKFxuICAgICAgICBcIisgQWRkIFByb2plY3RcIixcbiAgICAgICAgXCJhZGQtcHJvamVjdFwiXG4gICAgICApO1xuICAgICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgICAgdGhpcy5zaG93UGFnZShcInByb2plY3RQYWdlXCIpXG4gICAgICApO1xuICAgICAgcHJvamVjdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0QnRuKTtcblxuICAgICAgc2lkZU1lbnUuYXBwZW5kQ2hpbGQoaG9tZSk7XG4gICAgICBzaWRlTWVudS5hcHBlbmRDaGlsZChwcm9qZWN0KTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoc2lkZU1lbnUpO1xuXG4gICAgICBjb25zdCBpbmJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBpbmJveC5jbGFzc0xpc3QuYWRkKFwiaW5ib3gtcGFnZVwiLCBcImhpZGRlblwiKTtcbiAgICAgIGluYm94LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiaW5ib3hQYWdlXCIpO1xuXG4gICAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGZvcm1Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImZvcm0tY29udGFpbmVyXCIpO1xuXG4gICAgICBjb25zdCB0b2RvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRvZG9Db250YWluZXIuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jb250YWluZXJcIik7XG5cbiAgICAgIGluYm94LmFwcGVuZENoaWxkKGZvcm1Db250YWluZXIuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgIGluYm94LmFwcGVuZENoaWxkKHRvZG9Db250YWluZXIuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgY29uc3QgdG9kYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdG9kYXkuY2xhc3NMaXN0LmFkZChcInRvZGF5LXBhZ2VcIiwgXCJoaWRkZW5cIik7XG4gICAgICB0b2RheS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRvZGF5UGFnZVwiKTtcbiAgICAgIHRvZGF5LmFwcGVuZENoaWxkKHRvZG9Db250YWluZXIuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgY29uc3Qgd2VlayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB3ZWVrLmNsYXNzTGlzdC5hZGQoXCJ3ZWVrLXBhZ2VcIiwgXCJoaWRkZW5cIik7XG4gICAgICB3ZWVrLnNldEF0dHJpYnV0ZShcImlkXCIsIFwid2Vla1BhZ2VcIik7XG4gICAgICB3ZWVrLmFwcGVuZENoaWxkKHRvZG9Db250YWluZXIuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgY29uc3QgcHJvamVjdFBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgcHJvamVjdFBhZ2UuY2xhc3NMaXN0LmFkZChcInByb2plY3QtcGFnZVwiLCBcImhpZGRlblwiKTtcbiAgICAgIHByb2plY3RQYWdlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicHJvamVjdFBhZ2VcIik7XG4gICAgICBwcm9qZWN0UGFnZS5hcHBlbmRDaGlsZChmb3JtQ29udGFpbmVyLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICBwcm9qZWN0UGFnZS5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaW5ib3gpO1xuICAgICAgY29udGVudC5hcHBlbmRDaGlsZCh0b2RheSk7XG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKHdlZWspO1xuICAgICAgY29udGVudC5hcHBlbmRDaGlsZChwcm9qZWN0UGFnZSk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuZmlsdGVyVG9kb3NCeUR1ZURhdGUgPSBmdW5jdGlvbiAoZHVlRGF0ZSwgcGFnZUlkKSB7XG4gICAgICBjb25zdCB0b2RvSXRlbUNvbnRhaW5lciA9IGRvY3VtZW50XG4gICAgICAgIC5nZXRFbGVtZW50QnlJZChwYWdlSWQpXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS1jb250YWluZXJcIik7XG4gICAgICB0b2RvSXRlbUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICBjb25zdCBmaWx0ZXJUb2RvcyA9IGhhbmRsZXIuZmlsdGVyQnlEdWVEYXRlKGR1ZURhdGUpO1xuICAgICAgZmlsdGVyVG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IGhhbmRsZXIuY3JlYXRlVG9kb0l0ZW0odG9kbywgdG9kb0l0ZW1Db250YWluZXIpO1xuICAgICAgICBpZiAodG9kby5pc1ByaW9yaXR5KSB7XG4gICAgICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZChcInByaW9yaXR5XCIpO1xuICAgICAgICB9XG4gICAgICAgIHRvZG9JdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnNob3dGaWx0ZXJlZFRvZG9zID0gZnVuY3Rpb24gKGZpbHRlclRvZG9zLCBwYWdlSWQpIHtcbiAgICAgIGNvbnN0IHRvZG9JdGVtQ29udGFpbmVyID0gZG9jdW1lbnRcbiAgICAgICAgLmdldEVsZW1lbnRCeUlkKHBhZ2VJZClcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLWNvbnRhaW5lclwiKTtcbiAgICAgIHRvZG9JdGVtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgIGZpbHRlclRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSBoYW5kbGVyLmNyZWF0ZVRvZG9JdGVtKHRvZG8sIHRvZG9JdGVtQ29udGFpbmVyKTtcbiAgICAgICAgaWYgKHRvZG8uaXNQcmlvcml0eSkge1xuICAgICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0b2RvSXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5zaG93UGFnZSA9IGZ1bmN0aW9uIChwYWdlSWQpIHtcbiAgICAgIGNvbnN0IHBhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb250ZW50ID4gZGl2Om5vdCguc2lkZU1lbnUpXCIpO1xuICAgICAgcGFnZXMuZm9yRWFjaCgocGFnZSkgPT4ge1xuICAgICAgICBwYWdlLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2VsZWN0ZWRQYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFnZUlkKTtcbiAgICAgIGlmIChzZWxlY3RlZFBhZ2UpIHtcbiAgICAgICAgc2VsZWN0ZWRQYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdFdlYnNpdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNyZWF0ZUhlYWRlcigpO1xuICAgICAgdGhpcy5jcmVhdGVDb250ZW50KCk7XG4gICAgICB0aGlzLmNyZWF0ZUZvb3RlcigpO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2Vic2l0ZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFdlYnNpdGUgZnJvbSBcIi4vd2Vic2l0ZVwiO1xuXG5jb25zdCBteVdlYnNpdGUgPSBuZXcgV2Vic2l0ZSgpO1xubXlXZWJzaXRlLmluaXRXZWJzaXRlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=