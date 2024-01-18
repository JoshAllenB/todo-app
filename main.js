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

    const checkboxContainer = this.createCheckboxContainer(todo);

    const nameLabel = document.createElement("span");
    nameLabel.textContent = todo.name;

    const dateLabel = document.createElement("span");
    dateLabel.textContent = todo.date;

    const priorityIcon = this.createPriorityIcon(
      todo,
      todoItem,
      inboxContainer
    );

    todoItem.appendChild(checkboxContainer);
    todoItem.appendChild(nameLabel);
    todoItem.appendChild(dateLabel);
    todoItem.appendChild(priorityIcon);

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

      if (todo.isPriority) {
        todoItem.classList.add("priority");
        inboxContainer.prepend(todoItem);
        console.log("Priority!", this.todos);
      }
    });

    return priorityIcon;
  }

  addTodoToInbox(name, date) {
    const todoItemContainer = document.querySelector(".todo-item-container");

    const todo = {
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
    this.createButton();
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
      todayBtn.addEventListener("click", () => this.showPage("todayPage"));
      home.appendChild(todayBtn);

      const thisWeekBtn = handler.createButton("This Week", "this-week");
      thisWeekBtn.addEventListener("click", () => this.showPage("weekPage"));
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
      week.appendChild(todoContainer.cloneNode(true))

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbk5TOztBQUVoQztBQUNBO0FBQ0Esd0JBQXdCLGdEQUFPOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7VUMxSXZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOZ0M7O0FBRWhDLHNCQUFzQixnREFBTztBQUM3QiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvd2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRvZG9zID0gW107XG4gIH1cblxuICBjcmVhdGVCdXR0b24odGV4dCwgaWQpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgYnV0dG9uLmlkID0gaWQ7XG5cbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG5cbiAgY3JlYXRlVG9kb0xpc3RGb3JtKCkge1xuICAgIGNvbnN0IGV4aXN0aW5nRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1mb3JtXCIpO1xuICAgIGlmIChleGlzdGluZ0Zvcm0pIHtcbiAgICAgIHJldHVybiBleGlzdGluZ0Zvcm07XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcInRvZG8tZm9ybVwiKTtcblxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IHRoaXMuY3JlYXRlSW5wdXQoXCJ0ZXh0XCIsIFwiVG9kbyBOYW1lXCIsIHRydWUpO1xuICAgIGNvbnN0IGRhdGVJbnB1dCA9IHRoaXMuY3JlYXRlSW5wdXQoXCJkYXRlXCIsIFwiXCIsIHRydWUpO1xuXG4gICAgY29uc3QgYWRkQnV0dG9uID0gdGhpcy5jcmVhdGVCdXR0b24oXCJBZGQgVG9kb1wiLCBcImFkZEJ0blwiKTtcbiAgICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICAgIGNvbnN0IGRhdGUgPSBkYXRlSW5wdXQudmFsdWU7XG5cbiAgICAgIGlmIChuYW1lICYmIGRhdGUpIHtcbiAgICAgICAgdGhpcy5hZGRUb2RvVG9JbmJveChuYW1lLCBkYXRlKTtcbiAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgZGF0ZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRhdGVJbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChhZGRCdXR0b24pO1xuXG4gICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1jb250YWluZXJcIik7XG4gICAgZm9ybUNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgIHJldHVybiBmb3JtO1xuICB9XG5cbiAgY3JlYXRlSW5wdXQodHlwZSwgcGxhY2Vob2xkZXIsIHJlcXVpcmVkKSB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQudHlwZSA9IHR5cGU7XG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICBpbnB1dC5yZXF1aXJlZCA9IHJlcXVpcmVkO1xuXG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG5cbiAgY3JlYXRlVG9kb0l0ZW0odG9kbywgaW5ib3hDb250YWluZXIpIHtcbiAgICBjb25zdCB0b2RvSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcblxuICAgIGNvbnN0IGNoZWNrYm94Q29udGFpbmVyID0gdGhpcy5jcmVhdGVDaGVja2JveENvbnRhaW5lcih0b2RvKTtcblxuICAgIGNvbnN0IG5hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIG5hbWVMYWJlbC50ZXh0Q29udGVudCA9IHRvZG8ubmFtZTtcblxuICAgIGNvbnN0IGRhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGRhdGVMYWJlbC50ZXh0Q29udGVudCA9IHRvZG8uZGF0ZTtcblxuICAgIGNvbnN0IHByaW9yaXR5SWNvbiA9IHRoaXMuY3JlYXRlUHJpb3JpdHlJY29uKFxuICAgICAgdG9kbyxcbiAgICAgIHRvZG9JdGVtLFxuICAgICAgaW5ib3hDb250YWluZXJcbiAgICApO1xuXG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoY2hlY2tib3hDb250YWluZXIpO1xuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKG5hbWVMYWJlbCk7XG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoZGF0ZUxhYmVsKTtcbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChwcmlvcml0eUljb24pO1xuXG4gICAgcmV0dXJuIHRvZG9JdGVtO1xuICB9XG5cbiAgY3JlYXRlQ2hlY2tib3hDb250YWluZXIodG9kbykge1xuICAgIGNvbnN0IGNoZWNrYm94Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjaGVja2JveENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY2hlY2tib3gtY29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlVG9kb0Zyb21MaXN0KHRvZG8pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2tib3ggY2xpY2tlZFwiKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNoZWNrbWFya1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjaGVja21hcmtTcGFuLmNsYXNzTGlzdC5hZGQoXCJjaGVja21hcmtcIik7XG5cbiAgICBjaGVja2JveENvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgY2hlY2tib3hDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2ttYXJrU3Bhbik7XG5cbiAgICByZXR1cm4gY2hlY2tib3hDb250YWluZXI7XG4gIH1cblxuICBjcmVhdGVQcmlvcml0eUljb24odG9kbywgdG9kb0l0ZW0sIGluYm94Q29udGFpbmVyKSB7XG4gICAgY29uc3QgcHJpb3JpdHlJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICBcInByaW9yaXR5LWljb25cIixcbiAgICAgIHRvZG8uaXNQcmlvcml0eSA/IFwiZmEtc29saWRcIiA6IFwiZmEtcmVndWxhclwiLFxuICAgICAgXCJmYS1zdGFyXCJcbiAgICApO1xuICAgIHByaW9yaXR5SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdG9kby5pc1ByaW9yaXR5ID0gIXRvZG8uaXNQcmlvcml0eTtcbiAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtcmVndWxhclwiLCAhdG9kby5pc1ByaW9yaXR5KTtcbiAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtc29saWRcIiwgdG9kby5pc1ByaW9yaXR5KTtcbiAgICAgIGNvbnNvbGUubG9nKFwicHJpb3JpdHkgaWNvbiBjbGlja2VkXCIpO1xuICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIHRvZG86XCIsIHRvZG8pO1xuXG4gICAgICBpZiAodG9kby5pc1ByaW9yaXR5KSB7XG4gICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICAgICAgaW5ib3hDb250YWluZXIucHJlcGVuZCh0b2RvSXRlbSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJpb3JpdHkhXCIsIHRoaXMudG9kb3MpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByaW9yaXR5SWNvbjtcbiAgfVxuXG4gIGFkZFRvZG9Ub0luYm94KG5hbWUsIGRhdGUpIHtcbiAgICBjb25zdCB0b2RvSXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLWNvbnRhaW5lclwiKTtcblxuICAgIGNvbnN0IHRvZG8gPSB7XG4gICAgICBuYW1lLFxuICAgICAgZGF0ZSxcbiAgICAgIGlzUHJpb3JpdHk6IGZhbHNlLFxuICAgIH07XG5cbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cbiAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVG9kb3M6XCIsIHRoaXMudG9kb3MpO1xuXG4gICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmNyZWF0ZVRvZG9JdGVtKHRvZG8sIHRvZG9JdGVtQ29udGFpbmVyKTtcblxuICAgIGlmICh0b2RvLmlzUHJpb3JpdHkpIHtcbiAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICB9XG4gICAgdG9kb0l0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuXG4gICAgdGhpcy5hcnJhbmdlSW5ib3godG9kb0l0ZW1Db250YWluZXIpO1xuICB9XG5cbiAgcmVtb3ZlVG9kb0Zyb21MaXN0KHRvZG8pIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgYXJyYW5nZUluYm94KGluYm94Q29udGFpbmVyKSB7XG4gICAgY29uc3QgdG9kb0l0ZW1zID0gQXJyYXkuZnJvbShcbiAgICAgIGluYm94Q29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0b2RvLWl0ZW1cIilcbiAgICApO1xuXG4gICAgY29uc3QgcmVndWxhclRvZG9zID0gdG9kb0l0ZW1zLmZpbHRlcihcbiAgICAgICh0b2RvSXRlbSkgPT4gIXRvZG9JdGVtLmNsYXNzTGlzdC5jb250YWlucyhcInByaW9yaXR5XCIpXG4gICAgKTtcbiAgICBjb25zdCBwcmlvcml0eVRvZG9zID0gdG9kb0l0ZW1zLmZpbHRlcigodG9kb0l0ZW0pID0+XG4gICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmlvcml0eVwiKVxuICAgICk7XG5cbiAgICBjb25zdCBzb3J0RGF0ZSA9IChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEucXVlcnlTZWxlY3RvcihcInNwYW46bnRoLWNoaWxkKDMpXCIpLnRleHRDb250ZW50KTtcbiAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYi5xdWVyeVNlbGVjdG9yKFwic3BhbjpudGgtY2hpbGQoMylcIikudGV4dENvbnRlbnQpO1xuICAgICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XG4gICAgfTtcblxuICAgIHByaW9yaXR5VG9kb3Muc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShhLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuOm50aC1jaGlsZCgzKVwiKS50ZXh0Q29udGVudCk7XG4gICAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIucXVlcnlTZWxlY3RvcihcInNwYW46bnRoLWNoaWxkKDMpXCIpLnRleHRDb250ZW50KTtcblxuICAgICAgaWYgKGRhdGVBLmdldFRpbWUoKSA9PT0gZGF0ZUIuZ2V0VGltZSgpKSB7XG4gICAgICAgIGNvbnN0IHByaW9yaXR5QSA9IGEuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJpb3JpdHlcIikgPyAxIDogMDtcbiAgICAgICAgY29uc3QgcHJpb3JpdHlCID0gYi5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmlvcml0eVwiKSA/IDEgOiAwO1xuICAgICAgICByZXR1cm4gcHJpb3JpdHlCIC0gcHJpb3JpdHlBO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgICB9KTtcblxuICAgIHJlZ3VsYXJUb2Rvcy5zb3J0KHNvcnREYXRlKTtcbiAgICBpbmJveENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgcHJpb3JpdHlUb2Rvcy5mb3JFYWNoKCh0b2RvSXRlbSkgPT4ge1xuICAgICAgaW5ib3hDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuICAgIH0pO1xuXG4gICAgcmVndWxhclRvZG9zLmZvckVhY2goKHRvZG9JdGVtKSA9PiB7XG4gICAgICBpbmJveENvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0SGFuZGxlcigpIHtcbiAgICB0aGlzLmNyZWF0ZUJ1dHRvbigpO1xuICAgIHRoaXMuY3JlYXRlVG9kb0xpc3RGb3JtKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGFuZGxlcjtcbiIsImltcG9ydCBIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJcIjtcblxuY2xhc3MgV2Vic2l0ZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgSGFuZGxlcigpO1xuXG4gICAgdGhpcy5jcmVhdGVIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiVG8tRG8gTGlzdFwiO1xuXG4gICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZUZvb3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgICBjb25zdCBmb290ZXJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGZvb3RlckxpbmsuY2xhc3NMaXN0LmFkZChcImxpbmtcIik7XG5cbiAgICAgIGNvbnN0IGNvcHlyaWdodCA9IHRoaXMuY3JlYXRlRm9vdGVyTGluayhcbiAgICAgICAgJ0NvcHlyaWdodCA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY29weXJpZ2h0XCI+PC9pPiBKb3NoQWxsZW4nXG4gICAgICApO1xuXG4gICAgICBmb290ZXJMaW5rLmFwcGVuZENoaWxkKGNvcHlyaWdodCk7XG4gICAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZm9vdGVyTGluayk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlRm9vdGVyTGluayA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgbGluay5pbm5lckhUTUwgPSB0ZXh0O1xuXG4gICAgICByZXR1cm4gbGluaztcbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoXCJjb250ZW50XCIpO1xuICAgICAgY29udGVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1haW5Db250ZW50XCIpO1xuXG4gICAgICBjb25zdCBzaWRlTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzaWRlTWVudS5jbGFzc0xpc3QuYWRkKFwic2lkZU1lbnVcIik7XG5cbiAgICAgIGNvbnN0IGhvbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaG9tZS5jbGFzc0xpc3QuYWRkKFwiaG9tZVwiKTtcbiAgICAgIGhvbWUuaW5uZXJIVE1MID0gXCI8aDE+SG9tZTwvaDE+XCI7XG5cbiAgICAgIGNvbnN0IGluYm94QnRuID0gaGFuZGxlci5jcmVhdGVCdXR0b24oXCJJbmJveFwiLCBcImluYm94XCIpO1xuICAgICAgaW5ib3hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFnZShcImluYm94UGFnZVwiKTtcbiAgICAgICAgY29uc3QgdG9kb0Zvcm0gPSBoYW5kbGVyLmNyZWF0ZVRvZG9MaXN0Rm9ybSgpO1xuICAgICAgICBpbmJveC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tY29udGFpbmVyXCIpLmFwcGVuZENoaWxkKHRvZG9Gb3JtKTtcbiAgICAgIH0pO1xuXG4gICAgICBob21lLmFwcGVuZENoaWxkKGluYm94QnRuKTtcblxuICAgICAgY29uc3QgdG9kYXlCdG4gPSBoYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIlRvZGF5XCIsIFwidG9kYXlcIik7XG4gICAgICB0b2RheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5zaG93UGFnZShcInRvZGF5UGFnZVwiKSk7XG4gICAgICBob21lLmFwcGVuZENoaWxkKHRvZGF5QnRuKTtcblxuICAgICAgY29uc3QgdGhpc1dlZWtCdG4gPSBoYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIlRoaXMgV2Vla1wiLCBcInRoaXMtd2Vla1wiKTtcbiAgICAgIHRoaXNXZWVrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLnNob3dQYWdlKFwid2Vla1BhZ2VcIikpO1xuICAgICAgaG9tZS5hcHBlbmRDaGlsZCh0aGlzV2Vla0J0bik7XG5cbiAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcbiAgICAgIHByb2plY3QuaW5uZXJIVE1MID0gXCI8aDE+UHJvamVjdDwvaDE+XCI7XG4gICAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gaGFuZGxlci5jcmVhdGVCdXR0b24oXG4gICAgICAgIFwiKyBBZGQgUHJvamVjdFwiLFxuICAgICAgICBcImFkZC1wcm9qZWN0XCJcbiAgICAgICk7XG4gICAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgICB0aGlzLnNob3dQYWdlKFwicHJvamVjdFBhZ2VcIilcbiAgICAgICk7XG4gICAgICBwcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RCdG4pO1xuXG4gICAgICBzaWRlTWVudS5hcHBlbmRDaGlsZChob21lKTtcbiAgICAgIHNpZGVNZW51LmFwcGVuZENoaWxkKHByb2plY3QpO1xuICAgICAgY29udGVudC5hcHBlbmRDaGlsZChzaWRlTWVudSk7XG5cbiAgICAgIGNvbnN0IGluYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGluYm94LmNsYXNzTGlzdC5hZGQoXCJpbmJveC1wYWdlXCIsIFwiaGlkZGVuXCIpO1xuICAgICAgaW5ib3guc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJpbmJveFBhZ2VcIik7XG5cbiAgICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jb250YWluZXJcIik7XG5cbiAgICAgIGNvbnN0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdG9kb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWNvbnRhaW5lclwiKTtcblxuICAgICAgaW5ib3guYXBwZW5kQ2hpbGQoZm9ybUNvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgaW5ib3guYXBwZW5kQ2hpbGQodG9kb0NvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgICBjb25zdCB0b2RheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0b2RheS5jbGFzc0xpc3QuYWRkKFwidG9kYXktcGFnZVwiLCBcImhpZGRlblwiKTtcbiAgICAgIHRvZGF5LnNldEF0dHJpYnV0ZShcImlkXCIsIFwidG9kYXlQYWdlXCIpO1xuICAgICAgdG9kYXkuYXBwZW5kQ2hpbGQodG9kb0NvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgICBjb25zdCB3ZWVrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHdlZWsuY2xhc3NMaXN0LmFkZChcIndlZWstcGFnZVwiLCBcImhpZGRlblwiKTtcbiAgICAgIHdlZWsuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ3ZWVrUGFnZVwiKTtcbiAgICAgIHdlZWsuYXBwZW5kQ2hpbGQodG9kb0NvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpXG5cbiAgICAgIGNvbnN0IHByb2plY3RQYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHByb2plY3RQYWdlLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXBhZ2VcIiwgXCJoaWRkZW5cIik7XG4gICAgICBwcm9qZWN0UGFnZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3RQYWdlXCIpO1xuICAgICAgcHJvamVjdFBhZ2UuYXBwZW5kQ2hpbGQoZm9ybUNvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgcHJvamVjdFBhZ2UuYXBwZW5kQ2hpbGQodG9kb0NvbnRhaW5lcikuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKGluYm94KTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQodG9kYXkpO1xuICAgICAgY29udGVudC5hcHBlbmRDaGlsZCh3ZWVrKTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQocHJvamVjdFBhZ2UpO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLnNob3dQYWdlID0gZnVuY3Rpb24gKHBhZ2VJZCkge1xuICAgICAgY29uc3QgcGFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbnRlbnQgPiBkaXY6bm90KC5zaWRlTWVudSlcIik7XG4gICAgICBwYWdlcy5mb3JFYWNoKChwYWdlKSA9PiB7XG4gICAgICAgIHBhZ2UuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZWxlY3RlZFBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYWdlSWQpO1xuICAgICAgaWYgKHNlbGVjdGVkUGFnZSkge1xuICAgICAgICBzZWxlY3RlZFBhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5pbml0V2Vic2l0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3JlYXRlSGVhZGVyKCk7XG4gICAgICB0aGlzLmNyZWF0ZUNvbnRlbnQoKTtcbiAgICAgIHRoaXMuY3JlYXRlRm9vdGVyKCk7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJzaXRlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgV2Vic2l0ZSBmcm9tIFwiLi93ZWJzaXRlXCI7XG5cbmNvbnN0IG15V2Vic2l0ZSA9IG5ldyBXZWJzaXRlKCk7XG5teVdlYnNpdGUuaW5pdFdlYnNpdGUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==