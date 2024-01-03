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
/* harmony export */   activeBtn: () => (/* binding */ activeBtn),
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   createButton: () => (/* binding */ createButton),
/* harmony export */   createTodoItem: () => (/* binding */ createTodoItem),
/* harmony export */   filterTodoItems: () => (/* binding */ filterTodoItems),
/* harmony export */   initHandler: () => (/* binding */ initHandler),
/* harmony export */   switchSection: () => (/* binding */ switchSection)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modal.js");


function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate
  );
}

function isThisWeek(currentDate, dueDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  const daysDifference = Math.round(Math.abs((dueDate - currentDate) / oneDay));
  return daysDifference < 7 && currentDate.getDay() <= dueDate.getDay();
}

function createButton(text, id, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.id = id;
  if (clickHandler) {
    button.addEventListener("click", clickHandler);
  }
  return button;
}

function filterTodoItems(selectedButton, projectName) {
  const currentDate = new Date();
  const projectTodoItemWrapper = document.querySelector(
    `.project-wrapper[data-project="${projectName}"]`
  );

  // Get all common todo items
  const allCommonTodoItems = document.querySelectorAll(
    ".todo-item-wrapper .todo-item"
  );

  allCommonTodoItems.forEach((item) => {
    const dueDate = new Date(item.querySelector("p").textContent);

    // Check if the item is due today or this week based on the selected button
    const isToday = isSameDay(currentDate, dueDate);
    const thisWeek = isThisWeek(currentDate, dueDate);

    if (selectedButton === "inbox") {
      // Show all common items if "inbox" is selected
      item.classList.remove("hidden");
    } else if (!selectedButton) {
      // Show all common items if no button is selected
      item.classList.remove("hidden");
    } else if (selectedButton === "today" && isToday) {
      item.classList.remove("hidden");
    } else if (selectedButton === "this-week" && thisWeek && !isToday) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });

  if (projectTodoItemWrapper) {
    // Get all project-specific todo items
    const allProjectTodoItems =
      projectTodoItemWrapper.querySelectorAll(".todo-item");

    allProjectTodoItems.forEach((item) => {
      const dueDate = new Date(item.querySelector("p").textContent);

      // Check if the item is due today or this week based on the selected button
      const isToday = isSameDay(currentDate, dueDate);
      const thisWeek = isThisWeek(currentDate, dueDate);

      if (selectedButton === "inbox") {
        // Show all project-specific items if "inbox" is selected
        item.classList.remove("hidden");
      } else if (!selectedButton) {
        // Show all project-specific items if no button is selected
        item.classList.remove("hidden");
      } else if (selectedButton === "today" && isToday) {
        item.classList.remove("hidden");
      } else if (selectedButton === "this-week" && thisWeek && !isToday) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  }
}

function createTodoItem(name, date) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  const checkmarkSpan = document.createElement("span");
  checkmarkSpan.classList.add("checkmark");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const nameElement = document.createElement("h3");
  nameElement.textContent = name;

  const dateElement = document.createElement("p");
  dateElement.textContent = date;

  checkmarkSpan.appendChild(checkbox);
  todoItem.appendChild(checkmarkSpan);
  todoItem.appendChild(nameElement);
  todoItem.appendChild(dateElement);

  return todoItem;
}

function activeBtn() {
  const sideMenu = document.querySelector(".sideMenu");
  let previousButton = null;

  if (sideMenu) {
    sideMenu.removeEventListener("click", handleButtonClick);
    sideMenu.addEventListener("click", handleButtonClick);

    function handleButtonClick(event) {
      event.preventDefault();

      const clickedButton = event.target.closest("button");
      if (clickedButton) {
        // Remove "active" class from the previous button
        if (previousButton) {
          previousButton.classList.remove("active");
        }

        // Add "active" class to the clicked button
        clickedButton.classList.add("active");

        // Update the previousButton reference
        previousButton = clickedButton;
      }
    }
  }
}

function switchSection(section) {
  const commonTodoList = document.querySelector(".todo-item-wrapper");
  const projectTodoLists = document.querySelectorAll(".project-todo-list");
  const todoBtn = document.querySelector(".todoBtn");

  // Hide common todo list and project todo lists
  if (commonTodoList) {
    commonTodoList.classList.add("hidden");
  }

  projectTodoLists.forEach((list) => {
    list.classList.add("hidden");
  });

  if (section === "home") {
    // Show common todo list for home section
    if (commonTodoList) {
      commonTodoList.classList.remove("hidden");
    }

    // Show all project items and project name buttons
    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach((item) => {
      item.classList.remove("hidden");
    });
  } else if (section === "project") {
    todoBtn.style.display = "none";
    // Show project todo lists for project section
    projectTodoLists.forEach((list) => {
      const projectName = list.dataset.project;
      const projectItem = document.getElementById(
        `project-item-${projectName}`
      );
      if (projectItem) {
        projectItem.classList.remove("hidden");
      } else {
      }
    });
  }
}

function closeModal(modal) {
  const close = document.querySelector(".close");
  if (close) {
    close.addEventListener("click", () => {
      modal.style.display = "none";
      modal.remove();
    });
  }
}

function initHandler() {
  createButton();
  filterTodoItems();
  activeBtn();
}




/***/ }),

/***/ "./src/homeHandler.js":
/*!****************************!*\
  !*** ./src/homeHandler.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initHome: () => (/* binding */ initHome)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modal.js");
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handler */ "./src/handler.js");



function homeHandler() {
  const sideMenu = document.querySelector(".sideMenu");

  if (sideMenu) {
    sideMenu.querySelectorAll("button").forEach((button) => {
      button.removeEventListener("click", handleButtonClick);
      button.addEventListener("click", handleButtonClick);
    });
  }

  function handleButtonClick() {
    sideMenu
      .querySelectorAll("button")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    const todoBtn = document.querySelector(".todoBtn");
    const modal = document.getElementById("todoModal");

    if (this.id === "inbox") {
      // Show todoBtn and modal when inbox is clicked
      todoBtn.style.display = "block";

      if (modal) {
        modal.style.display = "block";
      }
    } else {
      // Hide todoBtn and modal for other buttons
      todoBtn.style.display = "none";

      if (modal) {
        modal.style.display = "none";
      }
    }

    if (
      this.id === "add-project" ||
      (this.id.startsWith("project-") || this.id.startsWith("btnName-"))
    ) {
      (0,_handler__WEBPACK_IMPORTED_MODULE_1__.switchSection)("project");
      todoBtn.style.display = "none";
    } else {
      (0,_handler__WEBPACK_IMPORTED_MODULE_1__.switchSection)("home");
    }
  }
}

function inboxHandler() {
  const todoBtn = document.querySelector(".todoBtn");
  const inboxBtn = document.getElementById("inbox");
  const content = document.getElementById("mainContent");

  if (todoBtn && inboxBtn) {
    // Set the initial state of the button
    todoBtn.style.display = inboxBtn.classList.contains("active")
      ? "block"
      : "none";

    // Add an event listener for subsequent clicks
    inboxBtn.removeEventListener("click", handleInboxButtonClick);
    inboxBtn.addEventListener("click", handleInboxButtonClick);

    todoBtn.removeEventListener("click", handleTodoButtonClick);
    todoBtn.addEventListener("click", handleTodoButtonClick);
  }

  function handleInboxButtonClick() {
    todoBtn.style.display = "block";
    (0,_handler__WEBPACK_IMPORTED_MODULE_1__.filterTodoItems)("inbox");
  }

  function handleTodoButtonClick() {
    const modal = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.createModal)();
    content.appendChild(modal);
    (0,_handler__WEBPACK_IMPORTED_MODULE_1__.closeModal)(modal); // Add event listener after appending the modal
    submitTodo();
  }
}

function submitTodo() {
  const submitBtn = document.getElementById("submitTodo");
  const todoList = document.querySelector(".todoList");
  let todoItemWrapper = document.querySelector(".todo-item-wrapper");

  if (!todoItemWrapper) {
    todoItemWrapper = document.createElement("div");
    todoItemWrapper.classList.add("todo-item-wrapper");
    todoList.appendChild(todoItemWrapper);
  }

  if (submitBtn && todoList && todoItemWrapper) {
    submitBtn.addEventListener("click", function () {
      const todoName = document.getElementById("todoName").value.trim();
      const todoDate = document.getElementById("todoDate").value.trim();

      if (todoName && todoDate) {
        const todoItem = (0,_handler__WEBPACK_IMPORTED_MODULE_1__.createTodoItem)(todoName, todoDate);
        todoItemWrapper.appendChild(todoItem);

        const sortedTodoItems = Array.from(todoItemWrapper.children).sort(
          (a, b) => {
            const dataA = new Date(a.querySelector("p").textContent);
            const dataB = new Date(b.querySelector("p").textContent);
            return dataA - dataB;
          }
        );

        todoItemWrapper.innerHTML = "";

        sortedTodoItems.forEach((item) => {
          todoItemWrapper.appendChild(item);
        });

        const modal = document.getElementById("todoModal");
        modal.style.display = "none";
        modal.remove();

        (0,_handler__WEBPACK_IMPORTED_MODULE_1__.filterTodoItems)();
        const checkbox = todoItem.querySelector("input[type='checkbox']");
        if (checkbox) {
          checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
              setTimeout(() => {
                todoItem.remove();
              }, 200);
            }
          });
        }
      }
    });
  }
}

function initHome() {
  homeHandler();
  inboxHandler();
  submitTodo();
}



/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createModal: () => (/* binding */ createModal)
/* harmony export */ });


function createModal() {
  const modal = document.createElement('div');
  modal.id = 'todoModal';
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close');
  closeBtn.innerHTML = '&times;';

  const nameLabel = createLabel('Task Name:', 'todoName');
  const nameInput = createInput('text', 'todoName', true);

  const dateLabel = createLabel('Date:', 'todoDate');
  const dateInput = createInput('date', 'todoDate', true);

  const submitBtn = document.createElement('button');
  submitBtn.id = 'submitTodo';
  submitBtn.textContent = 'Submit';

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(nameLabel);
  modalContent.appendChild(nameInput);
  modalContent.appendChild(dateLabel);
  modalContent.appendChild(dateInput);
  modalContent.appendChild(submitBtn);

  modal.appendChild(modalContent);

  return modal;
}

function createLabel(text, htmlFor) {
  const label = document.createElement('label');
  label.setAttribute('for', htmlFor);
  label.textContent = text;
  return label;
}

function createInput(type, id, required) {
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.required = required;
  return input;
}





/***/ }),

/***/ "./src/projHandler.js":
/*!****************************!*\
  !*** ./src/projHandler.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initProject: () => (/* binding */ initProject)
/* harmony export */ });
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler */ "./src/handler.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./src/modal.js");



// create project todo list and create project button

function projectHandler() {

  const addProjectBtn = document.getElementById("add-project");

  if (addProjectBtn) {
    const projectDiv = document.querySelector(".project");
    const existingProject = [];

    if (addProjectBtn) {
      addProjectBtn.addEventListener("click", clickHandler);
    }

    function clickHandler() {

      if (projectDiv && projectDiv.querySelector(".project-input-container")) {
        return;
      }

      const inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.placeholder = "enter Project Name";

      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Submit";
      submitBtn.classList.add("submit-btn");

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.classList.add("cancel-btn");

      const container = document.createElement("div");
      container.classList.add("project-input-container");
      container.appendChild(inputElement);
      container.appendChild(submitBtn);
      container.appendChild(cancelBtn);

      submitBtn.addEventListener("click", submitButtonClickHandler);

      inputElement.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          submitButtonClickHandler();
        }
      });

      function submitButtonClickHandler() {

        const projectName = inputElement.value.trim();

        if (projectName && !existingProject.includes(projectName)) {
          existingProject.push(projectName);

          const projectItem = createProjectButton(projectName, () => {
            document.querySelectorAll(".project-todo-list").forEach((list) => {
              list.classList.add("hidden");
            });
            const projectTodoList = document.querySelector(
              `.project-todo-list[data-project="${projectName}"]`
            );
            if (projectTodoList) {
              projectTodoList.classList.remove("hidden");
            }
            const commonTodoList = document.querySelector(".todo-item-wrapper");
            if (commonTodoList) {
              commonTodoList.classList.add("hidden");
            }
          });

          projectDiv.appendChild(projectItem);
          container.remove();

          const projectTodoList = createProjectTodoList(projectName);
          (0,_handler__WEBPACK_IMPORTED_MODULE_0__.switchSection)("project");

          const todoList = document.querySelector(".todoList");
          if (todoList) {
            todoList.appendChild(projectTodoList);
          }
        } else if (!projectName) {
          alert("Please enter a project name.");
        } else {
          alert("Project name already exists!");
        }
      }

      cancelBtn.addEventListener("click", cancelButtonClickHandler);

      function cancelButtonClickHandler() {
        container.remove();
      }

      if (projectDiv) {
        projectDiv.appendChild(container);
      }

    }
  }

}

function switchProject(projectName) {
  document.querySelectorAll(".project-todo-list").forEach((list) => {
    list.classList.add("hidden");
  });

  const projectTodoList = document.querySelector(
    `.project-todo-list[data-project="${projectName}"]`
  );
  if (projectTodoList) {
    projectTodoList.classList.add("hidden");
  }

  const commonTodoList = document.querySelector(".todoList");
  if (commonTodoList) {
    commonTodoList.classList.add("hidden");
  }
}

function createProjectButton(projectName, clickHandler) {
  const projectItem = document.createElement("div");
  projectItem.classList.add("project-item");
  projectItem.id = `project-${projectName.toLowerCase().replace(/\s+/g, "-")}`;

  const projectNameBtn = document.createElement("button");
  projectNameBtn.textContent = projectName;
  projectNameBtn.classList.add("projNameBtn");
  projectNameBtn.id = `btnName-${projectName.toLowerCase().replace(/\s+/g, "-")}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.classList.add("delete-btn");

  // Add event listener to project name button
  projectNameBtn.addEventListener("click", () => {
    document.querySelectorAll(".project-todo-list").forEach((list) => {
      list.classList.add("hidden");
    });
    const projectTodoList = document.querySelector(
      `.project-todo-list[data-project="${projectName}"]`
    );
    if (projectTodoList) {
      projectTodoList.classList.remove("hidden");
    }
    const commonTodoList = document.querySelector(".todoList");
    if (commonTodoList) {
      commonTodoList.classList.add("hidden");
    }
    if (clickHandler) {
      clickHandler();
      const todoBtn = document.querySelector(".todoBtn");
      if (todoBtn) {
        todoBtn.style.display = "none";
      }
    }
  });

  deleteBtn.addEventListener("click", () => {
    projectItem.remove();
    const projectTodoList = document.querySelector(
      `.project-todo-list[data-project="${projectName}"]`
    );
    if (projectTodoList) {
      projectTodoList.remove();
    }
  });

  projectItem.appendChild(projectNameBtn);
  projectItem.appendChild(deleteBtn);

  return projectItem;
}

function createProjectTodoList(projectName) {
  const projectTodoList = document.createElement("div");
  projectTodoList.classList.add("project-todo-list", "hidden");
  projectTodoList.dataset.project = projectName;

  const addTodoBtn = (0,_handler__WEBPACK_IMPORTED_MODULE_0__.createButton)(
    `Add Todo for ${projectName}`,
    "add-todo-btn"
  );

  addTodoBtn.addEventListener("click", () => {
    const modal = (0,_modal__WEBPACK_IMPORTED_MODULE_1__.createModal)();
    document.getElementById("mainContent").appendChild(modal);
    (0,_handler__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modal);
    submitTodoForProject(projectName, modal);
  });

  projectTodoList.appendChild(addTodoBtn);

  return projectTodoList;
}

function submitTodoForProject(projectName, modal) {
  const projectTodoList = document.querySelector(
    `.project-todo-list[data-project="${projectName}"]`
  );

  let projectTodoItemWrapper = document.querySelector(
    `.project-wrapper[data-project="${projectName}"]`
  );

  if (!projectTodoItemWrapper) {
    projectTodoItemWrapper = document.createElement("div");
    projectTodoItemWrapper.classList.add("project-wrapper");
    projectTodoItemWrapper.dataset.project = projectName;

    const todoList = document.querySelector(".todoList");
    if (todoList) {
      todoList.appendChild(projectTodoItemWrapper);
    }
    projectTodoList.appendChild(projectTodoItemWrapper);
  }

  if (modal && projectTodoItemWrapper) {
    projectTodoList.appendChild(modal);

    const submitBtn = document.getElementById("submitTodo");

    const submitHandler = () => {
      const todoName = document.getElementById("todoName").value;
      const todoDate = document.getElementById("todoDate").value;

      const todoItem = (0,_handler__WEBPACK_IMPORTED_MODULE_0__.createTodoItem)(todoName, todoDate);

      projectTodoItemWrapper.appendChild(todoItem);

      const sortedTodoItems = Array.from(projectTodoItemWrapper.children).sort(
        (a, b) => {
          const dateA = a.querySelector("p")
            ? new Date(a.querySelector("p").textContent)
            : null;
          const dateB = b.querySelector("p")
            ? new Date(b.querySelector("p").textContent)
            : null;

          return dateA - dateB;
        }
      );

      projectTodoItemWrapper.innerHTML = "";

      sortedTodoItems.forEach((item) => {
        projectTodoItemWrapper.appendChild(item);
      });

      modal.style.display = "none";
      modal.remove();

      submitBtn.removeEventListener("click", submitHandler);
    };

    submitBtn.addEventListener("click", submitHandler);

    projectTodoItemWrapper.addEventListener("change", (event) => {
      const targetCheckbox = event.target;
      if (
        targetCheckbox.tagName === "INPUT" &&
        targetCheckbox.type === "checkbox"
      ) {
        setTimeout(() => {
          const todoItem = targetCheckbox.closest(".todo-item");
          if (todoItem) {
            todoItem.remove();
            (0,_handler__WEBPACK_IMPORTED_MODULE_0__.filterTodoItems)();
          }
        }, 200);
      }
    });
  }
}

function initProject() {
  projectHandler();
}



/***/ }),

/***/ "./src/website.js":
/*!************************!*\
  !*** ./src/website.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContent: () => (/* binding */ createContent),
/* harmony export */   initWebsite: () => (/* binding */ initWebsite)
/* harmony export */ });
/* harmony import */ var _homeHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./homeHandler */ "./src/homeHandler.js");
/* harmony import */ var _projHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projHandler */ "./src/projHandler.js");
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handler */ "./src/handler.js");




function createHeader() {
  const header = document.createElement("header");
  const title = document.createElement("h1");
  title.textContent = "To-Do List";

  header.appendChild(title);
  document.body.appendChild(header);
}

function createFooter() {
  const footer = document.createElement("footer");
  const footerLink = document.createElement("div");
  footerLink.classList.add("link");

  const copyright = createFooterLink(
    'Copyright <i class="fa-regular fa-copyright"></i> JoshAllen'
  );
  footerLink.appendChild(copyright);
  footer.appendChild(footerLink);
  document.body.appendChild(footer);
}

function createFooterLink(text) {
  const link = document.createElement("h1");
  link.innerHTML = text;
  return link;
}

function createContent() {
  const content = document.createElement("div");
  content.classList.add("content");
  content.setAttribute("id", "mainContent");

  return content;
}

function createSideMenu(content) {
  const sideMenu = document.createElement("div");
  sideMenu.classList.add("sideMenu");

  function createButton(text, id) {
    const button = document.createElement("button");
    button.textContent = text;
    button.id = id;
    return button;
  }

  const home = document.createElement("div");
  home.classList.add("home");
  home.innerHTML = "<h1>Home</h1>";
  const inboxBtn = createButton("Inbox", "inbox");
  home.appendChild(inboxBtn);

  const todayBtn = createButton("Today", "today");
  todayBtn.addEventListener("click", () => (0,_handler__WEBPACK_IMPORTED_MODULE_2__.filterTodoItems)("today"));
  home.appendChild(todayBtn);

  const thisWeekBtn = createButton("This Week", "this-week");
  thisWeekBtn.addEventListener("click", () => (0,_handler__WEBPACK_IMPORTED_MODULE_2__.filterTodoItems)("this-week"));
  home.appendChild(thisWeekBtn);

  const project = document.createElement("div");
  project.classList.add("project");
  project.innerHTML = "<h1>Project</h1>";
  const addProjectBtn = createButton("+ Add Project", "add-project");
  project.appendChild(addProjectBtn);

  sideMenu.appendChild(home);
  sideMenu.appendChild(project);
  content.appendChild(sideMenu); // Append sideMenu to content
  document.body.appendChild(content); // Append content to the body
}

function createTodoList() {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todoList"); // New container for the todo list

  const todoBtn = document.createElement("button");
  todoBtn.classList.add("todoBtn");
  todoBtn.textContent = "Add To-Do List";

  todoContainer.appendChild(todoBtn);
  // content.appendChild(todoContainer); // Don't append directly to content

  return todoContainer; // Return the todo container
}

function initWebsite() {
  createHeader();
  const content = createContent(); // Create content element
  const todoContainer = createTodoList(); // Create todo container
  createSideMenu(content); // Pass content to createSideMenu
  content.appendChild(todoContainer); // Append todo container to content
  (0,_homeHandler__WEBPACK_IMPORTED_MODULE_0__.initHome)();
  (0,_projHandler__WEBPACK_IMPORTED_MODULE_1__.initProject)();
  (0,_handler__WEBPACK_IMPORTED_MODULE_2__.initHandler)();
  createFooter();
}




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


(0,_website__WEBPACK_IMPORTED_MODULE_0__.initWebsite)();



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxZQUFZO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBVUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN01vQztBQU1uQjs7QUFFbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSx1REFBYTtBQUNuQjtBQUNBLE1BQU07QUFDTixNQUFNLHVEQUFhO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUkseURBQWU7QUFDbkI7O0FBRUE7QUFDQSxrQkFBa0IsbURBQVc7QUFDN0I7QUFDQSxJQUFJLG9EQUFVLFNBQVM7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsd0RBQWM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBLFFBQVEseURBQWU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakprQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCOztBQUUvQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFdUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDSjtBQUNtQjs7QUFFdEM7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxrREFBa0QsWUFBWTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBOztBQUVBO0FBQ0EsVUFBVSx1REFBYTs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0Esd0NBQXdDLFlBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsK0NBQStDOztBQUU3RTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsK0NBQStDOztBQUVoRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwwQ0FBMEMsWUFBWTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxZQUFZO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHNEQUFZO0FBQ2pDLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsbURBQVc7QUFDN0I7QUFDQSxJQUFJLG9EQUFVO0FBQ2Q7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxZQUFZO0FBQ3BEOztBQUVBO0FBQ0Esc0NBQXNDLFlBQVk7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1Qix3REFBYzs7QUFFckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5REFBZTtBQUMzQjtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5UnlDO0FBQ0c7QUFDYTs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMseURBQWU7QUFDMUQ7O0FBRUE7QUFDQSw4Q0FBOEMseURBQWU7QUFDN0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLHNDQUFzQztBQUN0Qzs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDOztBQUUzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7O0FBRXpDLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLDBDQUEwQztBQUMxQywyQkFBMkI7QUFDM0Isc0NBQXNDO0FBQ3RDLEVBQUUsc0RBQVE7QUFDVixFQUFFLHlEQUFXO0FBQ2IsRUFBRSxxREFBVztBQUNiO0FBQ0E7O0FBRXNDOzs7Ozs7O1VDdkd0QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4QyxxREFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaG9tZUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvcHJvakhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvd2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZU1vZGFsIH0gZnJvbSBcIi4vbW9kYWxcIjtcblxuZnVuY3Rpb24gaXNTYW1lRGF5KGRhdGUxLCBkYXRlMikge1xuICByZXR1cm4gKFxuICAgIGRhdGUxLmdldEZ1bGxZZWFyKCkgPT09IGRhdGUyLmdldEZ1bGxZZWFyKCkgJiZcbiAgICBkYXRlMS5nZXRNb250aCgpID09PSBkYXRlMi5nZXRNb250aCgpICYmXG4gICAgZGF0ZTEuZ2V0RGF0ZSgpID09PSBkYXRlMi5nZXREYXRlXG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzVGhpc1dlZWsoY3VycmVudERhdGUsIGR1ZURhdGUpIHtcbiAgY29uc3Qgb25lRGF5ID0gMjQgKiA2MCAqIDYwICogMTAwMDtcbiAgY29uc3QgZGF5c0RpZmZlcmVuY2UgPSBNYXRoLnJvdW5kKE1hdGguYWJzKChkdWVEYXRlIC0gY3VycmVudERhdGUpIC8gb25lRGF5KSk7XG4gIHJldHVybiBkYXlzRGlmZmVyZW5jZSA8IDcgJiYgY3VycmVudERhdGUuZ2V0RGF5KCkgPD0gZHVlRGF0ZS5nZXREYXkoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnV0dG9uKHRleHQsIGlkLCBjbGlja0hhbmRsZXIpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgYnV0dG9uLmlkID0gaWQ7XG4gIGlmIChjbGlja0hhbmRsZXIpIHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XG4gIH1cbiAgcmV0dXJuIGJ1dHRvbjtcbn1cblxuZnVuY3Rpb24gZmlsdGVyVG9kb0l0ZW1zKHNlbGVjdGVkQnV0dG9uLCBwcm9qZWN0TmFtZSkge1xuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IHByb2plY3RUb2RvSXRlbVdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGAucHJvamVjdC13cmFwcGVyW2RhdGEtcHJvamVjdD1cIiR7cHJvamVjdE5hbWV9XCJdYFxuICApO1xuXG4gIC8vIEdldCBhbGwgY29tbW9uIHRvZG8gaXRlbXNcbiAgY29uc3QgYWxsQ29tbW9uVG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICBcIi50b2RvLWl0ZW0td3JhcHBlciAudG9kby1pdGVtXCJcbiAgKTtcblxuICBhbGxDb21tb25Ub2RvSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGR1ZURhdGUgPSBuZXcgRGF0ZShpdGVtLnF1ZXJ5U2VsZWN0b3IoXCJwXCIpLnRleHRDb250ZW50KTtcblxuICAgIC8vIENoZWNrIGlmIHRoZSBpdGVtIGlzIGR1ZSB0b2RheSBvciB0aGlzIHdlZWsgYmFzZWQgb24gdGhlIHNlbGVjdGVkIGJ1dHRvblxuICAgIGNvbnN0IGlzVG9kYXkgPSBpc1NhbWVEYXkoY3VycmVudERhdGUsIGR1ZURhdGUpO1xuICAgIGNvbnN0IHRoaXNXZWVrID0gaXNUaGlzV2VlayhjdXJyZW50RGF0ZSwgZHVlRGF0ZSk7XG5cbiAgICBpZiAoc2VsZWN0ZWRCdXR0b24gPT09IFwiaW5ib3hcIikge1xuICAgICAgLy8gU2hvdyBhbGwgY29tbW9uIGl0ZW1zIGlmIFwiaW5ib3hcIiBpcyBzZWxlY3RlZFxuICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIH0gZWxzZSBpZiAoIXNlbGVjdGVkQnV0dG9uKSB7XG4gICAgICAvLyBTaG93IGFsbCBjb21tb24gaXRlbXMgaWYgbm8gYnV0dG9uIGlzIHNlbGVjdGVkXG4gICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZEJ1dHRvbiA9PT0gXCJ0b2RheVwiICYmIGlzVG9kYXkpIHtcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGVkQnV0dG9uID09PSBcInRoaXMtd2Vla1wiICYmIHRoaXNXZWVrICYmICFpc1RvZGF5KSB7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyKSB7XG4gICAgLy8gR2V0IGFsbCBwcm9qZWN0LXNwZWNpZmljIHRvZG8gaXRlbXNcbiAgICBjb25zdCBhbGxQcm9qZWN0VG9kb0l0ZW1zID1cbiAgICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWl0ZW1cIik7XG5cbiAgICBhbGxQcm9qZWN0VG9kb0l0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGR1ZURhdGUgPSBuZXcgRGF0ZShpdGVtLnF1ZXJ5U2VsZWN0b3IoXCJwXCIpLnRleHRDb250ZW50KTtcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIGl0ZW0gaXMgZHVlIHRvZGF5IG9yIHRoaXMgd2VlayBiYXNlZCBvbiB0aGUgc2VsZWN0ZWQgYnV0dG9uXG4gICAgICBjb25zdCBpc1RvZGF5ID0gaXNTYW1lRGF5KGN1cnJlbnREYXRlLCBkdWVEYXRlKTtcbiAgICAgIGNvbnN0IHRoaXNXZWVrID0gaXNUaGlzV2VlayhjdXJyZW50RGF0ZSwgZHVlRGF0ZSk7XG5cbiAgICAgIGlmIChzZWxlY3RlZEJ1dHRvbiA9PT0gXCJpbmJveFwiKSB7XG4gICAgICAgIC8vIFNob3cgYWxsIHByb2plY3Qtc3BlY2lmaWMgaXRlbXMgaWYgXCJpbmJveFwiIGlzIHNlbGVjdGVkXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIH0gZWxzZSBpZiAoIXNlbGVjdGVkQnV0dG9uKSB7XG4gICAgICAgIC8vIFNob3cgYWxsIHByb2plY3Qtc3BlY2lmaWMgaXRlbXMgaWYgbm8gYnV0dG9uIGlzIHNlbGVjdGVkXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRCdXR0b24gPT09IFwidG9kYXlcIiAmJiBpc1RvZGF5KSB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRCdXR0b24gPT09IFwidGhpcy13ZWVrXCIgJiYgdGhpc1dlZWsgJiYgIWlzVG9kYXkpIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRvZG9JdGVtKG5hbWUsIGRhdGUpIHtcbiAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xuXG4gIGNvbnN0IGNoZWNrbWFya1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY2hlY2ttYXJrU3Bhbi5jbGFzc0xpc3QuYWRkKFwiY2hlY2ttYXJrXCIpO1xuXG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xuXG4gIGNvbnN0IG5hbWVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBuYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XG5cbiAgY29uc3QgZGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgZGF0ZUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRlO1xuXG4gIGNoZWNrbWFya1NwYW4uYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICB0b2RvSXRlbS5hcHBlbmRDaGlsZChjaGVja21hcmtTcGFuKTtcbiAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQobmFtZUVsZW1lbnQpO1xuICB0b2RvSXRlbS5hcHBlbmRDaGlsZChkYXRlRWxlbWVudCk7XG5cbiAgcmV0dXJuIHRvZG9JdGVtO1xufVxuXG5mdW5jdGlvbiBhY3RpdmVCdG4oKSB7XG4gIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlTWVudVwiKTtcbiAgbGV0IHByZXZpb3VzQnV0dG9uID0gbnVsbDtcblxuICBpZiAoc2lkZU1lbnUpIHtcbiAgICBzaWRlTWVudS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQnV0dG9uQ2xpY2spO1xuICAgIHNpZGVNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVCdXR0b25DbGljayk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVCdXR0b25DbGljayhldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY29uc3QgY2xpY2tlZEJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiYnV0dG9uXCIpO1xuICAgICAgaWYgKGNsaWNrZWRCdXR0b24pIHtcbiAgICAgICAgLy8gUmVtb3ZlIFwiYWN0aXZlXCIgY2xhc3MgZnJvbSB0aGUgcHJldmlvdXMgYnV0dG9uXG4gICAgICAgIGlmIChwcmV2aW91c0J1dHRvbikge1xuICAgICAgICAgIHByZXZpb3VzQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgXCJhY3RpdmVcIiBjbGFzcyB0byB0aGUgY2xpY2tlZCBidXR0b25cbiAgICAgICAgY2xpY2tlZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgcHJldmlvdXNCdXR0b24gcmVmZXJlbmNlXG4gICAgICAgIHByZXZpb3VzQnV0dG9uID0gY2xpY2tlZEJ1dHRvbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc3dpdGNoU2VjdGlvbihzZWN0aW9uKSB7XG4gIGNvbnN0IGNvbW1vblRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0td3JhcHBlclwiKTtcbiAgY29uc3QgcHJvamVjdFRvZG9MaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC10b2RvLWxpc3RcIik7XG4gIGNvbnN0IHRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9CdG5cIik7XG5cbiAgLy8gSGlkZSBjb21tb24gdG9kbyBsaXN0IGFuZCBwcm9qZWN0IHRvZG8gbGlzdHNcbiAgaWYgKGNvbW1vblRvZG9MaXN0KSB7XG4gICAgY29tbW9uVG9kb0xpc3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfVxuXG4gIHByb2plY3RUb2RvTGlzdHMuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgIGxpc3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfSk7XG5cbiAgaWYgKHNlY3Rpb24gPT09IFwiaG9tZVwiKSB7XG4gICAgLy8gU2hvdyBjb21tb24gdG9kbyBsaXN0IGZvciBob21lIHNlY3Rpb25cbiAgICBpZiAoY29tbW9uVG9kb0xpc3QpIHtcbiAgICAgIGNvbW1vblRvZG9MaXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgfVxuXG4gICAgLy8gU2hvdyBhbGwgcHJvamVjdCBpdGVtcyBhbmQgcHJvamVjdCBuYW1lIGJ1dHRvbnNcbiAgICBjb25zdCBwcm9qZWN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtaXRlbVwiKTtcbiAgICBwcm9qZWN0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwicHJvamVjdFwiKSB7XG4gICAgdG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgLy8gU2hvdyBwcm9qZWN0IHRvZG8gbGlzdHMgZm9yIHByb2plY3Qgc2VjdGlvblxuICAgIHByb2plY3RUb2RvTGlzdHMuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBsaXN0LmRhdGFzZXQucHJvamVjdDtcbiAgICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgIGBwcm9qZWN0LWl0ZW0tJHtwcm9qZWN0TmFtZX1gXG4gICAgICApO1xuICAgICAgaWYgKHByb2plY3RJdGVtKSB7XG4gICAgICAgIHByb2plY3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWwpIHtcbiAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlXCIpO1xuICBpZiAoY2xvc2UpIHtcbiAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgbW9kYWwucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdEhhbmRsZXIoKSB7XG4gIGNyZWF0ZUJ1dHRvbigpO1xuICBmaWx0ZXJUb2RvSXRlbXMoKTtcbiAgYWN0aXZlQnRuKCk7XG59XG5cbmV4cG9ydCB7XG4gIGluaXRIYW5kbGVyLFxuICBmaWx0ZXJUb2RvSXRlbXMsXG4gIGFjdGl2ZUJ0bixcbiAgY3JlYXRlQnV0dG9uLFxuICBzd2l0Y2hTZWN0aW9uLFxuICBjbG9zZU1vZGFsLFxuICBjcmVhdGVUb2RvSXRlbSxcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVNb2RhbCB9IGZyb20gXCIuL21vZGFsXCI7XG5pbXBvcnQge1xuICBjbG9zZU1vZGFsLFxuICBmaWx0ZXJUb2RvSXRlbXMsXG4gIHN3aXRjaFNlY3Rpb24sXG4gIGNyZWF0ZVRvZG9JdGVtLFxufSBmcm9tIFwiLi9oYW5kbGVyXCI7XG5cbmZ1bmN0aW9uIGhvbWVIYW5kbGVyKCkge1xuICBjb25zdCBzaWRlTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZU1lbnVcIik7XG5cbiAgaWYgKHNpZGVNZW51KSB7XG4gICAgc2lkZU1lbnUucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQnV0dG9uQ2xpY2spO1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVCdXR0b25DbGljayk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVCdXR0b25DbGljaygpIHtcbiAgICBzaWRlTWVudVxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIilcbiAgICAgIC5mb3JFYWNoKChiKSA9PiBiLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblxuICAgIGNvbnN0IHRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9CdG5cIik7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9Nb2RhbFwiKTtcblxuICAgIGlmICh0aGlzLmlkID09PSBcImluYm94XCIpIHtcbiAgICAgIC8vIFNob3cgdG9kb0J0biBhbmQgbW9kYWwgd2hlbiBpbmJveCBpcyBjbGlja2VkXG4gICAgICB0b2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgIGlmIChtb2RhbCkge1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBIaWRlIHRvZG9CdG4gYW5kIG1vZGFsIGZvciBvdGhlciBidXR0b25zXG4gICAgICB0b2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgaWYgKG1vZGFsKSB7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmlkID09PSBcImFkZC1wcm9qZWN0XCIgfHxcbiAgICAgICh0aGlzLmlkLnN0YXJ0c1dpdGgoXCJwcm9qZWN0LVwiKSB8fCB0aGlzLmlkLnN0YXJ0c1dpdGgoXCJidG5OYW1lLVwiKSlcbiAgICApIHtcbiAgICAgIHN3aXRjaFNlY3Rpb24oXCJwcm9qZWN0XCIpO1xuICAgICAgdG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaFNlY3Rpb24oXCJob21lXCIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbmJveEhhbmRsZXIoKSB7XG4gIGNvbnN0IHRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9CdG5cIik7XG4gIGNvbnN0IGluYm94QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmJveFwiKTtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkNvbnRlbnRcIik7XG5cbiAgaWYgKHRvZG9CdG4gJiYgaW5ib3hCdG4pIHtcbiAgICAvLyBTZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGJ1dHRvblxuICAgIHRvZG9CdG4uc3R5bGUuZGlzcGxheSA9IGluYm94QnRuLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKVxuICAgICAgPyBcImJsb2NrXCJcbiAgICAgIDogXCJub25lXCI7XG5cbiAgICAvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHN1YnNlcXVlbnQgY2xpY2tzXG4gICAgaW5ib3hCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUluYm94QnV0dG9uQ2xpY2spO1xuICAgIGluYm94QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVJbmJveEJ1dHRvbkNsaWNrKTtcblxuICAgIHRvZG9CdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRvZG9CdXR0b25DbGljayk7XG4gICAgdG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlVG9kb0J1dHRvbkNsaWNrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUluYm94QnV0dG9uQ2xpY2soKSB7XG4gICAgdG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGZpbHRlclRvZG9JdGVtcyhcImluYm94XCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlVG9kb0J1dHRvbkNsaWNrKCkge1xuICAgIGNvbnN0IG1vZGFsID0gY3JlYXRlTW9kYWwoKTtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKG1vZGFsKTtcbiAgICBjbG9zZU1vZGFsKG1vZGFsKTsgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGFmdGVyIGFwcGVuZGluZyB0aGUgbW9kYWxcbiAgICBzdWJtaXRUb2RvKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3VibWl0VG9kbygpIHtcbiAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRUb2RvXCIpO1xuICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb0xpc3RcIik7XG4gIGxldCB0b2RvSXRlbVdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS13cmFwcGVyXCIpO1xuXG4gIGlmICghdG9kb0l0ZW1XcmFwcGVyKSB7XG4gICAgdG9kb0l0ZW1XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RvSXRlbVdyYXBwZXIuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS13cmFwcGVyXCIpO1xuICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9JdGVtV3JhcHBlcik7XG4gIH1cblxuICBpZiAoc3VibWl0QnRuICYmIHRvZG9MaXN0ICYmIHRvZG9JdGVtV3JhcHBlcikge1xuICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdG9kb05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9OYW1lXCIpLnZhbHVlLnRyaW0oKTtcbiAgICAgIGNvbnN0IHRvZG9EYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRGF0ZVwiKS52YWx1ZS50cmltKCk7XG5cbiAgICAgIGlmICh0b2RvTmFtZSAmJiB0b2RvRGF0ZSkge1xuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IGNyZWF0ZVRvZG9JdGVtKHRvZG9OYW1lLCB0b2RvRGF0ZSk7XG4gICAgICAgIHRvZG9JdGVtV3JhcHBlci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG5cbiAgICAgICAgY29uc3Qgc29ydGVkVG9kb0l0ZW1zID0gQXJyYXkuZnJvbSh0b2RvSXRlbVdyYXBwZXIuY2hpbGRyZW4pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFBID0gbmV3IERhdGUoYS5xdWVyeVNlbGVjdG9yKFwicFwiKS50ZXh0Q29udGVudCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhQiA9IG5ldyBEYXRlKGIucXVlcnlTZWxlY3RvcihcInBcIikudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFBIC0gZGF0YUI7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRvZG9JdGVtV3JhcHBlci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIHNvcnRlZFRvZG9JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdG9kb0l0ZW1XcmFwcGVyLmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb01vZGFsXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIG1vZGFsLnJlbW92ZSgpO1xuXG4gICAgICAgIGZpbHRlclRvZG9JdGVtcygpO1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IHRvZG9JdGVtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPSdjaGVja2JveCddXCIpO1xuICAgICAgICBpZiAoY2hlY2tib3gpIHtcbiAgICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRvZG9JdGVtLnJlbW92ZSgpO1xuICAgICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdEhvbWUoKSB7XG4gIGhvbWVIYW5kbGVyKCk7XG4gIGluYm94SGFuZGxlcigpO1xuICBzdWJtaXRUb2RvKCk7XG59XG5cbmV4cG9ydCB7IGluaXRIb21lIH07IiwiaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5mdW5jdGlvbiBjcmVhdGVNb2RhbCgpIHtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWwuaWQgPSAndG9kb01vZGFsJztcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcblxuICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWxDb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcblxuICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgY2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgnY2xvc2UnKTtcbiAgY2xvc2VCdG4uaW5uZXJIVE1MID0gJyZ0aW1lczsnO1xuXG4gIGNvbnN0IG5hbWVMYWJlbCA9IGNyZWF0ZUxhYmVsKCdUYXNrIE5hbWU6JywgJ3RvZG9OYW1lJyk7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGNyZWF0ZUlucHV0KCd0ZXh0JywgJ3RvZG9OYW1lJywgdHJ1ZSk7XG5cbiAgY29uc3QgZGF0ZUxhYmVsID0gY3JlYXRlTGFiZWwoJ0RhdGU6JywgJ3RvZG9EYXRlJyk7XG4gIGNvbnN0IGRhdGVJbnB1dCA9IGNyZWF0ZUlucHV0KCdkYXRlJywgJ3RvZG9EYXRlJywgdHJ1ZSk7XG5cbiAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHN1Ym1pdEJ0bi5pZCA9ICdzdWJtaXRUb2RvJztcbiAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gJ1N1Ym1pdCc7XG5cbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG5hbWVMYWJlbCk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoZGF0ZUxhYmVsKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKGRhdGVJbnB1dCk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChzdWJtaXRCdG4pO1xuXG4gIG1vZGFsLmFwcGVuZENoaWxkKG1vZGFsQ29udGVudCk7XG5cbiAgcmV0dXJuIG1vZGFsO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMYWJlbCh0ZXh0LCBodG1sRm9yKSB7XG4gIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgbGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCBodG1sRm9yKTtcbiAgbGFiZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xuICByZXR1cm4gbGFiZWw7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0KHR5cGUsIGlkLCByZXF1aXJlZCkge1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGlucHV0LnR5cGUgPSB0eXBlO1xuICBpbnB1dC5pZCA9IGlkO1xuICBpbnB1dC5yZXF1aXJlZCA9IHJlcXVpcmVkO1xuICByZXR1cm4gaW5wdXQ7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZU1vZGFsIH07XG5cbiIsImltcG9ydCB7XG4gIGFjdGl2ZUJ0bixcbiAgY2xvc2VNb2RhbCxcbiAgY3JlYXRlQnV0dG9uLFxuICBzd2l0Y2hTZWN0aW9uLFxuICBjcmVhdGVUb2RvSXRlbSxcbiAgZmlsdGVyVG9kb0l0ZW1zLFxufSBmcm9tIFwiLi9oYW5kbGVyXCI7XG5pbXBvcnQgeyBjcmVhdGVNb2RhbCB9IGZyb20gXCIuL21vZGFsXCI7XG5cbi8vIGNyZWF0ZSBwcm9qZWN0IHRvZG8gbGlzdCBhbmQgY3JlYXRlIHByb2plY3QgYnV0dG9uXG5cbmZ1bmN0aW9uIHByb2plY3RIYW5kbGVyKCkge1xuXG4gIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0XCIpO1xuXG4gIGlmIChhZGRQcm9qZWN0QnRuKSB7XG4gICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdFwiKTtcbiAgICBjb25zdCBleGlzdGluZ1Byb2plY3QgPSBbXTtcblxuICAgIGlmIChhZGRQcm9qZWN0QnRuKSB7XG4gICAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsaWNrSGFuZGxlcigpIHtcblxuICAgICAgaWYgKHByb2plY3REaXYgJiYgcHJvamVjdERpdi5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtaW5wdXQtY29udGFpbmVyXCIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgaW5wdXRFbGVtZW50LnR5cGUgPSBcInRleHRcIjtcbiAgICAgIGlucHV0RWxlbWVudC5wbGFjZWhvbGRlciA9IFwiZW50ZXIgUHJvamVjdCBOYW1lXCI7XG5cbiAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xuICAgICAgc3VibWl0QnRuLmNsYXNzTGlzdC5hZGQoXCJzdWJtaXQtYnRuXCIpO1xuXG4gICAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gXCJDYW5jZWxcIjtcbiAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwiY2FuY2VsLWJ0blwiKTtcblxuICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1pbnB1dC1jb250YWluZXJcIik7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50KTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJtaXRCdG4pO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cbiAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3VibWl0QnV0dG9uQ2xpY2tIYW5kbGVyKTtcblxuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgc3VibWl0QnV0dG9uQ2xpY2tIYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBzdWJtaXRCdXR0b25DbGlja0hhbmRsZXIoKSB7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBpbnB1dEVsZW1lbnQudmFsdWUudHJpbSgpO1xuXG4gICAgICAgIGlmIChwcm9qZWN0TmFtZSAmJiAhZXhpc3RpbmdQcm9qZWN0LmluY2x1ZGVzKHByb2plY3ROYW1lKSkge1xuICAgICAgICAgIGV4aXN0aW5nUHJvamVjdC5wdXNoKHByb2plY3ROYW1lKTtcblxuICAgICAgICAgIGNvbnN0IHByb2plY3RJdGVtID0gY3JlYXRlUHJvamVjdEJ1dHRvbihwcm9qZWN0TmFtZSwgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LXRvZG8tbGlzdFwiKS5mb3JFYWNoKChsaXN0KSA9PiB7XG4gICAgICAgICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgYC5wcm9qZWN0LXRvZG8tbGlzdFtkYXRhLXByb2plY3Q9XCIke3Byb2plY3ROYW1lfVwiXWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAocHJvamVjdFRvZG9MaXN0KSB7XG4gICAgICAgICAgICAgIHByb2plY3RUb2RvTGlzdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29tbW9uVG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS13cmFwcGVyXCIpO1xuICAgICAgICAgICAgaWYgKGNvbW1vblRvZG9MaXN0KSB7XG4gICAgICAgICAgICAgIGNvbW1vblRvZG9MaXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlKCk7XG5cbiAgICAgICAgICBjb25zdCBwcm9qZWN0VG9kb0xpc3QgPSBjcmVhdGVQcm9qZWN0VG9kb0xpc3QocHJvamVjdE5hbWUpO1xuICAgICAgICAgIHN3aXRjaFNlY3Rpb24oXCJwcm9qZWN0XCIpO1xuXG4gICAgICAgICAgY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9MaXN0XCIpO1xuICAgICAgICAgIGlmICh0b2RvTGlzdCkge1xuICAgICAgICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdFRvZG9MaXN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIXByb2plY3ROYW1lKSB7XG4gICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSBwcm9qZWN0IG5hbWUuXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KFwiUHJvamVjdCBuYW1lIGFscmVhZHkgZXhpc3RzIVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbmNlbEJ1dHRvbkNsaWNrSGFuZGxlcik7XG5cbiAgICAgIGZ1bmN0aW9uIGNhbmNlbEJ1dHRvbkNsaWNrSGFuZGxlcigpIHtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvamVjdERpdikge1xuICAgICAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxufVxuXG5mdW5jdGlvbiBzd2l0Y2hQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC10b2RvLWxpc3RcIikuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgIGxpc3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfSk7XG5cbiAgY29uc3QgcHJvamVjdFRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgLnByb2plY3QtdG9kby1saXN0W2RhdGEtcHJvamVjdD1cIiR7cHJvamVjdE5hbWV9XCJdYFxuICApO1xuICBpZiAocHJvamVjdFRvZG9MaXN0KSB7XG4gICAgcHJvamVjdFRvZG9MaXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIH1cblxuICBjb25zdCBjb21tb25Ub2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb0xpc3RcIik7XG4gIGlmIChjb21tb25Ub2RvTGlzdCkge1xuICAgIGNvbW1vblRvZG9MaXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdEJ1dHRvbihwcm9qZWN0TmFtZSwgY2xpY2tIYW5kbGVyKSB7XG4gIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtaXRlbVwiKTtcbiAgcHJvamVjdEl0ZW0uaWQgPSBgcHJvamVjdC0ke3Byb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIi1cIil9YDtcblxuICBjb25zdCBwcm9qZWN0TmFtZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHByb2plY3ROYW1lQnRuLnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XG4gIHByb2plY3ROYW1lQnRuLmNsYXNzTGlzdC5hZGQoXCJwcm9qTmFtZUJ0blwiKTtcbiAgcHJvamVjdE5hbWVCdG4uaWQgPSBgYnRuTmFtZS0ke3Byb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIi1cIil9YDtcblxuICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBkZWxldGVCdG4udGV4dENvbnRlbnQgPSBcInhcIjtcbiAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtYnRuXCIpO1xuXG4gIC8vIEFkZCBldmVudCBsaXN0ZW5lciB0byBwcm9qZWN0IG5hbWUgYnV0dG9uXG4gIHByb2plY3ROYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LXRvZG8tbGlzdFwiKS5mb3JFYWNoKChsaXN0KSA9PiB7XG4gICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgfSk7XG4gICAgY29uc3QgcHJvamVjdFRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAucHJvamVjdC10b2RvLWxpc3RbZGF0YS1wcm9qZWN0PVwiJHtwcm9qZWN0TmFtZX1cIl1gXG4gICAgKTtcbiAgICBpZiAocHJvamVjdFRvZG9MaXN0KSB7XG4gICAgICBwcm9qZWN0VG9kb0xpc3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICB9XG4gICAgY29uc3QgY29tbW9uVG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9MaXN0XCIpO1xuICAgIGlmIChjb21tb25Ub2RvTGlzdCkge1xuICAgICAgY29tbW9uVG9kb0xpc3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICB9XG4gICAgaWYgKGNsaWNrSGFuZGxlcikge1xuICAgICAgY2xpY2tIYW5kbGVyKCk7XG4gICAgICBjb25zdCB0b2RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvQnRuXCIpO1xuICAgICAgaWYgKHRvZG9CdG4pIHtcbiAgICAgICAgdG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwcm9qZWN0SXRlbS5yZW1vdmUoKTtcbiAgICBjb25zdCBwcm9qZWN0VG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC5wcm9qZWN0LXRvZG8tbGlzdFtkYXRhLXByb2plY3Q9XCIke3Byb2plY3ROYW1lfVwiXWBcbiAgICApO1xuICAgIGlmIChwcm9qZWN0VG9kb0xpc3QpIHtcbiAgICAgIHByb2plY3RUb2RvTGlzdC5yZW1vdmUoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3ROYW1lQnRuKTtcbiAgcHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICByZXR1cm4gcHJvamVjdEl0ZW07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RUb2RvTGlzdChwcm9qZWN0TmFtZSkge1xuICBjb25zdCBwcm9qZWN0VG9kb0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwcm9qZWN0VG9kb0xpc3QuY2xhc3NMaXN0LmFkZChcInByb2plY3QtdG9kby1saXN0XCIsIFwiaGlkZGVuXCIpO1xuICBwcm9qZWN0VG9kb0xpc3QuZGF0YXNldC5wcm9qZWN0ID0gcHJvamVjdE5hbWU7XG5cbiAgY29uc3QgYWRkVG9kb0J0biA9IGNyZWF0ZUJ1dHRvbihcbiAgICBgQWRkIFRvZG8gZm9yICR7cHJvamVjdE5hbWV9YCxcbiAgICBcImFkZC10b2RvLWJ0blwiXG4gICk7XG5cbiAgYWRkVG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gY3JlYXRlTW9kYWwoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5Db250ZW50XCIpLmFwcGVuZENoaWxkKG1vZGFsKTtcbiAgICBjbG9zZU1vZGFsKG1vZGFsKTtcbiAgICBzdWJtaXRUb2RvRm9yUHJvamVjdChwcm9qZWN0TmFtZSwgbW9kYWwpO1xuICB9KTtcblxuICBwcm9qZWN0VG9kb0xpc3QuYXBwZW5kQ2hpbGQoYWRkVG9kb0J0bik7XG5cbiAgcmV0dXJuIHByb2plY3RUb2RvTGlzdDtcbn1cblxuZnVuY3Rpb24gc3VibWl0VG9kb0ZvclByb2plY3QocHJvamVjdE5hbWUsIG1vZGFsKSB7XG4gIGNvbnN0IHByb2plY3RUb2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYC5wcm9qZWN0LXRvZG8tbGlzdFtkYXRhLXByb2plY3Q9XCIke3Byb2plY3ROYW1lfVwiXWBcbiAgKTtcblxuICBsZXQgcHJvamVjdFRvZG9JdGVtV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYC5wcm9qZWN0LXdyYXBwZXJbZGF0YS1wcm9qZWN0PVwiJHtwcm9qZWN0TmFtZX1cIl1gXG4gICk7XG5cbiAgaWYgKCFwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyKSB7XG4gICAgcHJvamVjdFRvZG9JdGVtV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdFRvZG9JdGVtV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC13cmFwcGVyXCIpO1xuICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuZGF0YXNldC5wcm9qZWN0ID0gcHJvamVjdE5hbWU7XG5cbiAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb0xpc3RcIik7XG4gICAgaWYgKHRvZG9MaXN0KSB7XG4gICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyKTtcbiAgICB9XG4gICAgcHJvamVjdFRvZG9MaXN0LmFwcGVuZENoaWxkKHByb2plY3RUb2RvSXRlbVdyYXBwZXIpO1xuICB9XG5cbiAgaWYgKG1vZGFsICYmIHByb2plY3RUb2RvSXRlbVdyYXBwZXIpIHtcbiAgICBwcm9qZWN0VG9kb0xpc3QuYXBwZW5kQ2hpbGQobW9kYWwpO1xuXG4gICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRUb2RvXCIpO1xuXG4gICAgY29uc3Qgc3VibWl0SGFuZGxlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9OYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvTmFtZVwiKS52YWx1ZTtcbiAgICAgIGNvbnN0IHRvZG9EYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRGF0ZVwiKS52YWx1ZTtcblxuICAgICAgY29uc3QgdG9kb0l0ZW0gPSBjcmVhdGVUb2RvSXRlbSh0b2RvTmFtZSwgdG9kb0RhdGUpO1xuXG4gICAgICBwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyLmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcblxuICAgICAgY29uc3Qgc29ydGVkVG9kb0l0ZW1zID0gQXJyYXkuZnJvbShwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyLmNoaWxkcmVuKS5zb3J0KFxuICAgICAgICAoYSwgYikgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGVBID0gYS5xdWVyeVNlbGVjdG9yKFwicFwiKVxuICAgICAgICAgICAgPyBuZXcgRGF0ZShhLnF1ZXJ5U2VsZWN0b3IoXCJwXCIpLnRleHRDb250ZW50KVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgIGNvbnN0IGRhdGVCID0gYi5xdWVyeVNlbGVjdG9yKFwicFwiKVxuICAgICAgICAgICAgPyBuZXcgRGF0ZShiLnF1ZXJ5U2VsZWN0b3IoXCJwXCIpLnRleHRDb250ZW50KVxuICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgc29ydGVkVG9kb0l0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgcHJvamVjdFRvZG9JdGVtV3JhcHBlci5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgIH0pO1xuXG4gICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBtb2RhbC5yZW1vdmUoKTtcblxuICAgICAgc3VibWl0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdWJtaXRIYW5kbGVyKTtcbiAgICB9O1xuXG4gICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdWJtaXRIYW5kbGVyKTtcblxuICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldENoZWNrYm94ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgaWYgKFxuICAgICAgICB0YXJnZXRDaGVja2JveC50YWdOYW1lID09PSBcIklOUFVUXCIgJiZcbiAgICAgICAgdGFyZ2V0Q2hlY2tib3gudHlwZSA9PT0gXCJjaGVja2JveFwiXG4gICAgICApIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB0YXJnZXRDaGVja2JveC5jbG9zZXN0KFwiLnRvZG8taXRlbVwiKTtcbiAgICAgICAgICBpZiAodG9kb0l0ZW0pIHtcbiAgICAgICAgICAgIHRvZG9JdGVtLnJlbW92ZSgpO1xuICAgICAgICAgICAgZmlsdGVyVG9kb0l0ZW1zKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyMDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRQcm9qZWN0KCkge1xuICBwcm9qZWN0SGFuZGxlcigpO1xufVxuXG5leHBvcnQgeyBpbml0UHJvamVjdCB9OyIsImltcG9ydCB7IGluaXRIb21lIH0gZnJvbSBcIi4vaG9tZUhhbmRsZXJcIjtcbmltcG9ydCB7IGluaXRQcm9qZWN0IH0gZnJvbSBcIi4vcHJvakhhbmRsZXJcIjtcbmltcG9ydCB7IGluaXRIYW5kbGVyLCBmaWx0ZXJUb2RvSXRlbXMgfSBmcm9tIFwiLi9oYW5kbGVyXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gXCJUby1EbyBMaXN0XCI7XG5cbiAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb290ZXIoKSB7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gIGNvbnN0IGZvb3RlckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBmb290ZXJMaW5rLmNsYXNzTGlzdC5hZGQoXCJsaW5rXCIpO1xuXG4gIGNvbnN0IGNvcHlyaWdodCA9IGNyZWF0ZUZvb3RlckxpbmsoXG4gICAgJ0NvcHlyaWdodCA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY29weXJpZ2h0XCI+PC9pPiBKb3NoQWxsZW4nXG4gICk7XG4gIGZvb3RlckxpbmsuYXBwZW5kQ2hpbGQoY29weXJpZ2h0KTtcbiAgZm9vdGVyLmFwcGVuZENoaWxkKGZvb3RlckxpbmspO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlckxpbmsodGV4dCkge1xuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBsaW5rLmlubmVySFRNTCA9IHRleHQ7XG4gIHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZW50KCkge1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29udGVudC5jbGFzc0xpc3QuYWRkKFwiY29udGVudFwiKTtcbiAgY29udGVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1haW5Db250ZW50XCIpO1xuXG4gIHJldHVybiBjb250ZW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaWRlTWVudShjb250ZW50KSB7XG4gIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2lkZU1lbnUuY2xhc3NMaXN0LmFkZChcInNpZGVNZW51XCIpO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbih0ZXh0LCBpZCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBidXR0b24uaWQgPSBpZDtcbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG5cbiAgY29uc3QgaG9tZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhvbWUuY2xhc3NMaXN0LmFkZChcImhvbWVcIik7XG4gIGhvbWUuaW5uZXJIVE1MID0gXCI8aDE+SG9tZTwvaDE+XCI7XG4gIGNvbnN0IGluYm94QnRuID0gY3JlYXRlQnV0dG9uKFwiSW5ib3hcIiwgXCJpbmJveFwiKTtcbiAgaG9tZS5hcHBlbmRDaGlsZChpbmJveEJ0bik7XG5cbiAgY29uc3QgdG9kYXlCdG4gPSBjcmVhdGVCdXR0b24oXCJUb2RheVwiLCBcInRvZGF5XCIpO1xuICB0b2RheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZmlsdGVyVG9kb0l0ZW1zKFwidG9kYXlcIikpO1xuICBob21lLmFwcGVuZENoaWxkKHRvZGF5QnRuKTtcblxuICBjb25zdCB0aGlzV2Vla0J0biA9IGNyZWF0ZUJ1dHRvbihcIlRoaXMgV2Vla1wiLCBcInRoaXMtd2Vla1wiKTtcbiAgdGhpc1dlZWtCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGZpbHRlclRvZG9JdGVtcyhcInRoaXMtd2Vla1wiKSk7XG4gIGhvbWUuYXBwZW5kQ2hpbGQodGhpc1dlZWtCdG4pO1xuXG4gIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICBwcm9qZWN0LmlubmVySFRNTCA9IFwiPGgxPlByb2plY3Q8L2gxPlwiO1xuICBjb25zdCBhZGRQcm9qZWN0QnRuID0gY3JlYXRlQnV0dG9uKFwiKyBBZGQgUHJvamVjdFwiLCBcImFkZC1wcm9qZWN0XCIpO1xuICBwcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RCdG4pO1xuXG4gIHNpZGVNZW51LmFwcGVuZENoaWxkKGhvbWUpO1xuICBzaWRlTWVudS5hcHBlbmRDaGlsZChwcm9qZWN0KTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChzaWRlTWVudSk7IC8vIEFwcGVuZCBzaWRlTWVudSB0byBjb250ZW50XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGVudCk7IC8vIEFwcGVuZCBjb250ZW50IHRvIHRoZSBib2R5XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRvZG9MaXN0KCkge1xuICBjb25zdCB0b2RvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdG9kb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidG9kb0xpc3RcIik7IC8vIE5ldyBjb250YWluZXIgZm9yIHRoZSB0b2RvIGxpc3RcblxuICBjb25zdCB0b2RvQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgdG9kb0J0bi5jbGFzc0xpc3QuYWRkKFwidG9kb0J0blwiKTtcbiAgdG9kb0J0bi50ZXh0Q29udGVudCA9IFwiQWRkIFRvLURvIExpc3RcIjtcblxuICB0b2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9CdG4pO1xuICAvLyBjb250ZW50LmFwcGVuZENoaWxkKHRvZG9Db250YWluZXIpOyAvLyBEb24ndCBhcHBlbmQgZGlyZWN0bHkgdG8gY29udGVudFxuXG4gIHJldHVybiB0b2RvQ29udGFpbmVyOyAvLyBSZXR1cm4gdGhlIHRvZG8gY29udGFpbmVyXG59XG5cbmZ1bmN0aW9uIGluaXRXZWJzaXRlKCkge1xuICBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgY29udGVudCA9IGNyZWF0ZUNvbnRlbnQoKTsgLy8gQ3JlYXRlIGNvbnRlbnQgZWxlbWVudFxuICBjb25zdCB0b2RvQ29udGFpbmVyID0gY3JlYXRlVG9kb0xpc3QoKTsgLy8gQ3JlYXRlIHRvZG8gY29udGFpbmVyXG4gIGNyZWF0ZVNpZGVNZW51KGNvbnRlbnQpOyAvLyBQYXNzIGNvbnRlbnQgdG8gY3JlYXRlU2lkZU1lbnVcbiAgY29udGVudC5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKTsgLy8gQXBwZW5kIHRvZG8gY29udGFpbmVyIHRvIGNvbnRlbnRcbiAgaW5pdEhvbWUoKTtcbiAgaW5pdFByb2plY3QoKTtcbiAgaW5pdEhhbmRsZXIoKTtcbiAgY3JlYXRlRm9vdGVyKCk7XG59XG5cbmV4cG9ydCB7IGluaXRXZWJzaXRlLCBjcmVhdGVDb250ZW50IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGluaXRXZWJzaXRlIH0gZnJvbSBcIi4vd2Vic2l0ZVwiO1xuXG5pbml0V2Vic2l0ZSgpO1xuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==