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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDeklTOztBQUVoQztBQUNBO0FBQ0Esd0JBQXdCLGdEQUFPOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7VUMxSXZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOZ0M7O0FBRWhDLHNCQUFzQixnREFBTztBQUM3QiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvd2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEhhbmRsZXIge1xuICBjcmVhdGVCdXR0b24odGV4dCwgaWQpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgYnV0dG9uLmlkID0gaWQ7XG5cbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG5cbiAgY3JlYXRlVG9kb0xpc3RGb3JtKCkge1xuICAgIGNvbnN0IGV4aXN0aW5nRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1mb3JtXCIpO1xuICAgIGlmIChleGlzdGluZ0Zvcm0pIHtcbiAgICAgIHJldHVybiBleGlzdGluZ0Zvcm07XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcInRvZG8tZm9ybVwiKTtcblxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBuYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgIG5hbWVJbnB1dC5wbGFjZWhvbGRlciA9IFwiVG9kbyBOYW1lXCI7XG4gICAgbmFtZUlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBkYXRlSW5wdXQudHlwZSA9IFwiZGF0ZVwiO1xuICAgIGRhdGVJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGFkZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWRkQnRuXCIpO1xuICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQWRkIFRvZG9cIjtcblxuICAgIGFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB0aGlzLmFkZFRvZG9Ub0luYm94KG5hbWVJbnB1dC52YWx1ZSwgZGF0ZUlucHV0LnZhbHVlKTtcbiAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICBkYXRlSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIH0pO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGF0ZUlucHV0KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG5cbiAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLWNvbnRhaW5lclwiKTtcbiAgICBmb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgcmV0dXJuIGZvcm07XG4gIH1cblxuICBjcmVhdGVUb2RvSXRlbShuYW1lLCBkYXRlLCBpc1ByaW9yaXR5KSB7XG4gICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7XG5cbiAgICAvLyBDaGVja2JveFxuICAgIGNvbnN0IGNoZWNrYm94Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjaGVja2JveENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY2hlY2tib3gtY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0b2RvSXRlbS5yZW1vdmUoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImNoZWNrYm94IGNsaWNrZWRcIik7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgY2hlY2ttYXJrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGNoZWNrbWFya1NwYW4uY2xhc3NMaXN0LmFkZChcImNoZWNrbWFya1wiKTtcbiAgICBjaGVja2JveENvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgY2hlY2tib3hDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2ttYXJrU3Bhbik7XG5cbiAgICAvLyBOYW1lIExhYmVsXG4gICAgY29uc3QgbmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgbmFtZUxhYmVsLnRleHRDb250ZW50ID0gbmFtZTtcblxuICAgIC8vIERhdGUgTGFiZWxcbiAgICBjb25zdCBkYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBkYXRlTGFiZWwudGV4dENvbnRlbnQgPSBkYXRlO1xuXG4gICAgLy8gUHJpb3JpdHkgSWNvblxuICAgIGNvbnN0IHByaW9yaXR5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHktaWNvblwiLCBcImZhLXN0YXJcIiwgXCJmYS1yZWd1bGFyXCIpO1xuXG4gICAgLy8gQXBwZW5kIGVsZW1lbnRzIHRvIHRvZG9JdGVtXG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoY2hlY2tib3hDb250YWluZXIpO1xuICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKG5hbWVMYWJlbCk7XG4gICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoZGF0ZUxhYmVsKTtcbiAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChwcmlvcml0eUljb24pO1xuXG4gICAgLy8gUHJpb3JpdHkgaWNvbiBjbGljayBldmVudFxuICAgIHByaW9yaXR5SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKHByaW9yaXR5SWNvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJmYS1yZWd1bGFyXCIpKSB7XG4gICAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtcmVndWxhclwiKTtcbiAgICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtc29saWRcIik7XG4gICAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtcmVndWxhclwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coXCJQcmlvcml0eSBpY29uIGNsaWNrZWRcIik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9kb0l0ZW07XG4gIH1cblxuICBhZGRUb2RvVG9JbmJveChuYW1lLCBkYXRlKSB7XG4gICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmNyZWF0ZVRvZG9JdGVtKG5hbWUsIGRhdGUsIHRydWUpO1xuICAgIGNvbnN0IHRvZG9JdGVtc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLWNvbnRhaW5lclwiKTtcbiAgICB0b2RvSXRlbXNDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuXG4gICAgdGhpcy5hcnJhbmdlSW5ib3godG9kb0l0ZW1zQ29udGFpbmVyKTtcbiAgfVxuXG4gIGFycmFuZ2VJbmJveChpbmJveENvbnRhaW5lcikge1xuICAgIGNvbnN0IHRvZG9JdGVtcyA9IEFycmF5LmZyb20oXG4gICAgICBpbmJveENvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidG9kby1pdGVtXCIpXG4gICAgKTtcblxuICAgIHRvZG9JdGVtcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEucXVlcnlTZWxlY3RvcihcInNwYW46bnRoLWNoaWxkKDMpXCIpLnRleHRDb250ZW50KTtcbiAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYi5xdWVyeVNlbGVjdG9yKFwic3BhbjpudGgtY2hpbGQoMylcIikudGV4dENvbnRlbnQpO1xuXG4gICAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgICB9KTtcblxuICAgIGluYm94Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgdG9kb0l0ZW1zLmZvckVhY2goKHRvZG9JdGVtKSA9PiB7XG4gICAgICBpbmJveENvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0SGFuZGxlcigpIHtcbiAgICB0aGlzLmNyZWF0ZUJ1dHRvbigpO1xuICAgIHRoaXMuY3JlYXRlVG9kb0xpc3RGb3JtKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGFuZGxlcjtcbiIsImltcG9ydCBIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJcIjtcblxuY2xhc3MgV2Vic2l0ZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgSGFuZGxlcigpO1xuXG4gICAgdGhpcy5jcmVhdGVIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiVG8tRG8gTGlzdFwiO1xuXG4gICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZUZvb3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgICBjb25zdCBmb290ZXJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGZvb3RlckxpbmsuY2xhc3NMaXN0LmFkZChcImxpbmtcIik7XG5cbiAgICAgIGNvbnN0IGNvcHlyaWdodCA9IHRoaXMuY3JlYXRlRm9vdGVyTGluayhcbiAgICAgICAgJ0NvcHlyaWdodCA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY29weXJpZ2h0XCI+PC9pPiBKb3NoQWxsZW4nXG4gICAgICApO1xuXG4gICAgICBmb290ZXJMaW5rLmFwcGVuZENoaWxkKGNvcHlyaWdodCk7XG4gICAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZm9vdGVyTGluayk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlRm9vdGVyTGluayA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgbGluay5pbm5lckhUTUwgPSB0ZXh0O1xuXG4gICAgICByZXR1cm4gbGluaztcbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoXCJjb250ZW50XCIpO1xuICAgICAgY29udGVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1haW5Db250ZW50XCIpO1xuXG4gICAgICBjb25zdCBzaWRlTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzaWRlTWVudS5jbGFzc0xpc3QuYWRkKFwic2lkZU1lbnVcIik7XG5cbiAgICAgIGNvbnN0IGhvbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaG9tZS5jbGFzc0xpc3QuYWRkKFwiaG9tZVwiKTtcbiAgICAgIGhvbWUuaW5uZXJIVE1MID0gXCI8aDE+SG9tZTwvaDE+XCI7XG5cbiAgICAgIGNvbnN0IGluYm94QnRuID0gaGFuZGxlci5jcmVhdGVCdXR0b24oXCJJbmJveFwiLCBcImluYm94XCIpO1xuICAgICAgaW5ib3hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFnZShcImluYm94UGFnZVwiKTtcbiAgICAgICAgY29uc3QgdG9kb0Zvcm0gPSBoYW5kbGVyLmNyZWF0ZVRvZG9MaXN0Rm9ybSgpO1xuICAgICAgICBpbmJveC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tY29udGFpbmVyXCIpLmFwcGVuZENoaWxkKHRvZG9Gb3JtKTtcbiAgICAgIH0pO1xuXG4gICAgICBob21lLmFwcGVuZENoaWxkKGluYm94QnRuKTtcblxuICAgICAgY29uc3QgdG9kYXlCdG4gPSBoYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIlRvZGF5XCIsIFwidG9kYXlcIik7XG4gICAgICB0b2RheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5zaG93UGFnZShcInRvZGF5UGFnZVwiKSk7XG4gICAgICBob21lLmFwcGVuZENoaWxkKHRvZGF5QnRuKTtcblxuICAgICAgY29uc3QgdGhpc1dlZWtCdG4gPSBoYW5kbGVyLmNyZWF0ZUJ1dHRvbihcIlRoaXMgV2Vla1wiLCBcInRoaXMtd2Vla1wiKTtcbiAgICAgIHRoaXNXZWVrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLnNob3dQYWdlKFwid2Vla1BhZ2VcIikpO1xuICAgICAgaG9tZS5hcHBlbmRDaGlsZCh0aGlzV2Vla0J0bik7XG5cbiAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcbiAgICAgIHByb2plY3QuaW5uZXJIVE1MID0gXCI8aDE+UHJvamVjdDwvaDE+XCI7XG4gICAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gaGFuZGxlci5jcmVhdGVCdXR0b24oXG4gICAgICAgIFwiKyBBZGQgUHJvamVjdFwiLFxuICAgICAgICBcImFkZC1wcm9qZWN0XCJcbiAgICAgICk7XG4gICAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgICB0aGlzLnNob3dQYWdlKFwicHJvamVjdFBhZ2VcIilcbiAgICAgICk7XG4gICAgICBwcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RCdG4pO1xuXG4gICAgICBzaWRlTWVudS5hcHBlbmRDaGlsZChob21lKTtcbiAgICAgIHNpZGVNZW51LmFwcGVuZENoaWxkKHByb2plY3QpO1xuICAgICAgY29udGVudC5hcHBlbmRDaGlsZChzaWRlTWVudSk7XG5cbiAgICAgIGNvbnN0IGluYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGluYm94LmNsYXNzTGlzdC5hZGQoXCJpbmJveC1wYWdlXCIsIFwiaGlkZGVuXCIpO1xuICAgICAgaW5ib3guc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJpbmJveFBhZ2VcIik7XG5cbiAgICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jb250YWluZXJcIik7XG5cbiAgICAgIGNvbnN0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdG9kb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWNvbnRhaW5lclwiKTtcblxuICAgICAgaW5ib3guYXBwZW5kQ2hpbGQoZm9ybUNvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgaW5ib3guYXBwZW5kQ2hpbGQodG9kb0NvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgICBjb25zdCB0b2RheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0b2RheS5jbGFzc0xpc3QuYWRkKFwidG9kYXktcGFnZVwiLCBcImhpZGRlblwiKTtcbiAgICAgIHRvZGF5LnNldEF0dHJpYnV0ZShcImlkXCIsIFwidG9kYXlQYWdlXCIpO1xuICAgICAgdG9kYXkuYXBwZW5kQ2hpbGQodG9kb0NvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgICBjb25zdCB3ZWVrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHdlZWsuY2xhc3NMaXN0LmFkZChcIndlZWstcGFnZVwiLCBcImhpZGRlblwiKTtcbiAgICAgIHdlZWsuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ3ZWVrUGFnZVwiKTtcbiAgICAgIHdlZWsuYXBwZW5kQ2hpbGQodG9kb0NvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpXG5cbiAgICAgIGNvbnN0IHByb2plY3RQYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHByb2plY3RQYWdlLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXBhZ2VcIiwgXCJoaWRkZW5cIik7XG4gICAgICBwcm9qZWN0UGFnZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3RQYWdlXCIpO1xuICAgICAgcHJvamVjdFBhZ2UuYXBwZW5kQ2hpbGQoZm9ybUNvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgcHJvamVjdFBhZ2UuYXBwZW5kQ2hpbGQodG9kb0NvbnRhaW5lcikuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKGluYm94KTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQodG9kYXkpO1xuICAgICAgY29udGVudC5hcHBlbmRDaGlsZCh3ZWVrKTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQocHJvamVjdFBhZ2UpO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLnNob3dQYWdlID0gZnVuY3Rpb24gKHBhZ2VJZCkge1xuICAgICAgY29uc3QgcGFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbnRlbnQgPiBkaXY6bm90KC5zaWRlTWVudSlcIik7XG4gICAgICBwYWdlcy5mb3JFYWNoKChwYWdlKSA9PiB7XG4gICAgICAgIHBhZ2UuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZWxlY3RlZFBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYWdlSWQpO1xuICAgICAgaWYgKHNlbGVjdGVkUGFnZSkge1xuICAgICAgICBzZWxlY3RlZFBhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5pbml0V2Vic2l0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3JlYXRlSGVhZGVyKCk7XG4gICAgICB0aGlzLmNyZWF0ZUNvbnRlbnQoKTtcbiAgICAgIHRoaXMuY3JlYXRlRm9vdGVyKCk7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJzaXRlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgV2Vic2l0ZSBmcm9tIFwiLi93ZWJzaXRlXCI7XG5cbmNvbnN0IG15V2Vic2l0ZSA9IG5ldyBXZWJzaXRlKCk7XG5teVdlYnNpdGUuaW5pdFdlYnNpdGUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==