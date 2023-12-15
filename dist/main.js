/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/homeHandler.js":
/*!****************************!*\
  !*** ./src/homeHandler.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inboxHandler: () => (/* binding */ inboxHandler),
/* harmony export */   initHandler: () => (/* binding */ initHandler)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modal.js");
/* harmony import */ var _projHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projHandler */ "./src/projHandler.js");



function homeHandler() {
  console.log("Entering HomeHandler");

  const sideMenu = document.querySelector(".sideMenu");

  if (sideMenu) {
    sideMenu.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        sideMenu
          .querySelectorAll("button")
          .forEach((b) => b.classList.remove("active"));
        button.classList.add("active");

        const todoBtn = document.querySelector(".todoBtn");
        const modal = document.getElementById("todoModal");

        if (button.id !== "inbox") {
          todoBtn.style.display = "none";

          if (modal) {
            modal.style.display = "none";
          }
        }

        // Check if the clicked button is the project button
        if (button.id === "add-project") {
          // Handle the project button click
          (0,_projHandler__WEBPACK_IMPORTED_MODULE_1__.projectHandler)();
        }

        // Hide all project todo lists
        document.querySelectorAll(".project-todo-list").forEach((list) => {
          list.classList.add("hidden");
        });

        // If the clicked button is not the project button, show the common todo list
        if (button.id !== "add-project") {
          const commonTodoList = document.querySelector(".todoList");
          if (commonTodoList) {
            commonTodoList.classList.remove("hidden");
          }
        }
      });
    });
  }
  console.log("Exiting homeHandler");
}

function activeBtn() {
  console.log("Entering activeBtn");

  const sideMenu = document.querySelector(".sideMenu");

  if (sideMenu) {
    sideMenu.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        sideMenu
          .querySelectorAll("button")
          .forEach((b) => b.classList.remove("active"));
        button.classList.add("active");

        const todoBtn = document.querySelector(".todoBtn");
        const modal = document.getElementById("todoModal");
        const projDiv = document.querySelector(".project-todo-list");

        if (button.id !== "inbox") {
          todoBtn.style.display = "none";

          if (modal) {
            modal.style.display = "none";
          }
        }
      });
    });
  }
  console.log("exiting activeBtn");
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
    inboxBtn.addEventListener("click", function () {
      todoBtn.style.display = "block";
    });

    todoBtn.addEventListener("click", function () {
      const { modal } = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.createModal)();
      content.appendChild(modal);
      closeModal(modal); // Add event listener after appending the modal
      submitTodo();
    });
  }
}

function closeModal(modal) {
  const close = document.querySelector(".close");

  if (close) {
    close.addEventListener("click", function () {
      modal.style.display = "none";
      console.log("Hotdog Clicked");

      modal.remove();
    });
  }
}

function submitTodo() {
  const { modal, alertMessage } = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.createModal)(); // Create modal and alertMessage

  const submitBtn = document.getElementById("submitTodo");
  const todoList = document.querySelector(".todoList");

  // Create a single wrapper div for all todo items
  let todoItemWrapper = document.querySelector(".todo-item-wrapper");

  if (!todoItemWrapper) {
    todoItemWrapper = document.createElement("div");
    todoItemWrapper.classList.add("todo-item-wrapper");
  }

  if (submitBtn && modal && todoList && todoItemWrapper) {
    submitBtn.addEventListener("click", function () {
      // Get values from the modal inputs
      const todoName = document.getElementById("todoName").value.trim();
      const todoDate = document.getElementById("todoDate").value.trim();

      // Check if both todo name and date are filled
      if (todoName && todoDate) {
        // Create a new div to represent the todo item
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item"); // Add the checkbox styles

        // Create a span with the checkmark class
        const checkmarkSpan = document.createElement("span");
        checkmarkSpan.classList.add("checkmark");

        // Create a checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        // Create h3 and p elements for the todo name and date
        const nameElement = document.createElement("h3");
        nameElement.textContent = todoName;

        const dateElement = document.createElement("p");
        dateElement.textContent = todoDate;

        // Append the checkbox to the span, and the span to the todo item
        checkmarkSpan.appendChild(checkbox);
        todoItem.appendChild(checkmarkSpan);
        todoItem.appendChild(nameElement);
        todoItem.appendChild(dateElement);

        // Append the todo item to the common wrapper div
        todoItemWrapper.appendChild(todoItem);

        // Convert the date string to a JavaScript Date object
        const todoDateTime = new Date(todoDate);

        // Sort todo items based on date before appending
        const sortedTodoItems = Array.from(todoItemWrapper.children).sort(
          (a, b) => {
            const dateA = new Date(a.querySelector("p").textContent);
            const dateB = new Date(b.querySelector("p").textContent);
            return dateA - dateB;
          }
        );

        // Clear the existing todo items in the wrapper
        todoItemWrapper.innerHTML = "";

        // Append the sorted todo items to the wrapper div
        sortedTodoItems.forEach((item) => {
          todoItemWrapper.appendChild(item);
        });

        // Append the wrapper div to the todoList div (if not already appended)
        if (!todoItemWrapper.parentElement) {
          todoList.appendChild(todoItemWrapper);
        }

        // Hide and remove the modal
        modal.style.display = "none";
        modal.remove();

        // Add event listener to the checkbox for removal with a small delay
        checkbox.addEventListener("change", function () {
          if (checkbox.checked) {
            setTimeout(() => {
              todoItem.remove();
            }, 200);
          }
        });
        alertMessage.hidden = true;
      } else {
        alertMessage.textContent = "Please enter both task name and date.";
        alertMessage.hidden = false;
      }
    });
  }
}

function initHandler() {
  homeHandler();
  activeBtn();
  inboxHandler();
  closeModal();
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
/* harmony export */   projectHandler: () => (/* binding */ projectHandler)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modal.js");


function projectHandler() {
  console.log("Entering projectHandler");

  const addProjectBtn = document.getElementById('add-project');

  if (addProjectBtn) {
    const projectDiv = document.querySelector('.project');

    const clickHandler = function () {
      console.log("Entering clickHandler");

      if (projectDiv && projectDiv.querySelector('.project-input-container')) {
        console.log("Input field already created. Exiting clickHandler.");
        return;
      }

      const inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.placeholder = 'Enter project name';

      const submitBtn = document.createElement('button');
      submitBtn.textContent = 'Submit';
      submitBtn.classList.add('submit-btn');

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.classList.add('cancel-btn');

      const container = document.createElement('div');
      container.classList.add('project-input-container');
      container.appendChild(inputElement);
      container.appendChild(submitBtn);
      container.appendChild(cancelBtn);

      submitBtn.addEventListener('click', function () {
        console.log("Submit button clicked");

        const projectName = inputElement.value.trim();

        if (projectName) {
          console.log('Project Name:', projectName);

          const projectItem = document.createElement('div');
          projectItem.classList.add('project-item');
          const projectNameBtn = document.createElement('button');
          projectNameBtn.textContent = projectName;
          projectNameBtn.classList.add('projNameBtn');

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'x';
          deleteBtn.classList.add('delete-btn');

          deleteBtn.addEventListener('click', function () {
            projectItem.remove();
            const projectTodoList = document.querySelector(`.project-todo-list[data-project="${projectName}"]`);
            if (projectTodoList) {
              projectTodoList.remove();
            }
          });

          projectItem.appendChild(projectNameBtn);
          projectItem.appendChild(deleteBtn);

          projectDiv.appendChild(projectItem);

          container.remove();

          let projectTodoList = document.createElement('div');
          projectTodoList.classList.add('project-todo-list', 'hidden');
          projectTodoList.dataset.project = projectName;

          const addTodoBtn = document.createElement('button');
          addTodoBtn.textContent = `Add Todo for ${projectName}`;
          addTodoBtn.classList.add('add-todo-btn');

          addTodoBtn.addEventListener('click', function () {
            const modal = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.createModal)();
            document.getElementById('mainContent').appendChild(modal);

            closeModal(modal);
            submitTodoForProject(projectName, modal);
          });

          projectTodoList.appendChild(addTodoBtn);

          // Append the project todo list to the .todoList div
          const todoList = document.querySelector('.todoList');
          if (todoList) {
            todoList.appendChild(projectTodoList);
          }

          // Add event listener to toggle visibility of project todo list
          projectNameBtn.addEventListener('click', function () {
            // Hide all project todo lists
            document.querySelectorAll('.project-todo-list').forEach(list => {
              list.classList.add('hidden');
            });

            // Show the clicked project todo list
            projectTodoList.classList.remove('hidden');
          });

        } else {
          alert('Please enter a project name.');
        }
      });

      cancelBtn.addEventListener('click', function () {
        container.remove();
      });

      if (projectDiv) {
        projectDiv.appendChild(container);
      }

      console.log("Exiting clickHandler");
    };

    addProjectBtn.addEventListener('click', clickHandler);
  }

  console.log("Exiting projectHandler");
}

function closeModal(modal) {
  console.log("Entering closeModal");

  const close = document.querySelector(".close");

  if (close) {
    close.addEventListener("click", function () {
      modal.style.display = "none";
      console.log("Close button clicked");
      modal.remove();
    });
  }

  console.log("Exiting closeModal");
}

function submitTodoForProject(projectName, modal) {
  console.log("Entering submitTodoForProject");

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

    // Append the project-specific todo list to the .todoList div
    const todoList = document.querySelector(".todoList");
    if (todoList) {
      todoList.appendChild(projectTodoItemWrapper);
    }
    projectTodoList.appendChild(projectTodoItemWrapper);
  }

  if (modal && projectTodoItemWrapper) {
    projectTodoList.appendChild(modal);

    const submitBtn = document.getElementById("submitTodo");

    const submitHandler = function () {
      console.log("Submit Todo button clicked");

      const todoName = document.getElementById("todoName").value;
      const todoDate = document.getElementById("todoDate").value;

      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");

      const checkmarkSpan = document.createElement("span");
      checkmarkSpan.classList.add("checkmark");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      const nameElement = document.createElement("h3");
      nameElement.textContent = todoName;

      const dateElement = document.createElement("p");
      dateElement.textContent = todoDate;

      checkmarkSpan.appendChild(checkbox);
      todoItem.appendChild(checkmarkSpan);
      todoItem.appendChild(nameElement);
      todoItem.appendChild(dateElement);

      // Append the todo item to the project-specific todo list
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

      // Hide and remove the modal
      modal.style.display = "none";
      modal.remove();

      // Remove the event listener after submitting
      submitBtn.removeEventListener("click", submitHandler);
    };

    submitBtn.addEventListener("click", submitHandler);

    projectTodoItemWrapper.addEventListener("change", function (event) {
      const targetCheckbox = event.target;
      if (
        targetCheckbox.tagName === "INPUT" &&
        targetCheckbox.type === "checkbox"
      ) {
        // Add a small delay for CSS animation
        setTimeout(() => {
          // Remove the todo item when the checkbox is checked
          const todoItem = targetCheckbox.closest(".todo-item");
          if (todoItem) {
            todoItem.remove();
          }
        }, 200); // You can adjust the delay (in milliseconds) as needed
      }
    });
  }

  console.log("Exiting submitTodoForProject");
}

// Add event listener to load the projectHandler when the window loads
window.addEventListener("load", function () {
  // Call projectHandler when the window loads
  projectHandler();
});




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


function createHeader(){
  const header = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = 'To-Do List';

  header.appendChild(title);
  document.body.appendChild(header);
}

function createFooter() {
  const  footer = document.createElement('footer');
  const footerLink = document.createElement('div');
  footerLink.classList.add('link');

  const copyright = createFooterLink('Copyright <i class="fa-regular fa-copyright"></i> JoshAllen');
  footerLink.appendChild(copyright);
  footer.appendChild(footerLink);
  document.body.appendChild(footer);
}

function createFooterLink(text) {
  const link = document.createElement('h1');
  link.innerHTML = text;
  return link;
}

function createContent() {
  const content = document.createElement('div');
  content.classList.add('content');
  content.setAttribute('id', 'mainContent');
  return content;
}

function createSideMenu(content) {
  const sideMenu = document.createElement('div');
  sideMenu.classList.add('sideMenu');

  function createButton(text, id) {
    const button = document.createElement('button');
    button.textContent = text;
    button.id = id;
    return button;
  }

  const home = document.createElement('div');
  home.classList.add('home');
  home.innerHTML = '<h1>Home</h1>';
  const inboxBtn = createButton('Inbox', 'inbox');
  home.appendChild(inboxBtn);
  home.appendChild(createButton('Today', 'today'));
  home.appendChild(createButton('This Week', 'this-week'));

  const project = document.createElement('div');
  project.classList.add('project');
  project.innerHTML = '<h1>Project</h1>';
  const addProjectBtn = createButton('+ Add Project', 'add-project');
  project.appendChild(addProjectBtn);

  sideMenu.appendChild(home);
  sideMenu.appendChild(project);
  content.appendChild(sideMenu); // Append sideMenu to content
  document.body.appendChild(content); // Append content to the body

}

function createTodoList() {
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todoList'); // New container for the todo list

  const todoBtn = document.createElement('button');
  todoBtn.classList.add('todoBtn');
  todoBtn.textContent = 'Add To-Do List';

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
  (0,_homeHandler__WEBPACK_IMPORTED_MODULE_0__.initHandler)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBLFdBQVc7O0FBRVgsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLFlBQVk7QUFDcEQ7O0FBRUE7QUFDQSxzQ0FBc0MsWUFBWTtBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxRQUFRO0FBQ2pCO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUV5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoUWtCOztBQUU1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxzQ0FBc0M7O0FBRXRDOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkM7O0FBRTNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5Qzs7QUFFekMsd0JBQXdCO0FBQ3hCOzs7QUFHQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLDBDQUEwQztBQUMxQywyQkFBMkI7QUFDM0Isc0NBQXNDO0FBQ3RDLEVBQUUseURBQVc7QUFDYjtBQUNBOzs7O0FBSXNDOzs7Ozs7O1VDOUZ0QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4QyxxREFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2hvbWVIYW5kbGVyLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL21vZGFsLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3Byb2pIYW5kbGVyLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3dlYnNpdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVNb2RhbCB9IGZyb20gXCIuL21vZGFsXCI7XG5pbXBvcnQgeyBwcm9qZWN0SGFuZGxlciB9IGZyb20gXCIuL3Byb2pIYW5kbGVyXCI7XG5cbmZ1bmN0aW9uIGhvbWVIYW5kbGVyKCkge1xuICBjb25zb2xlLmxvZyhcIkVudGVyaW5nIEhvbWVIYW5kbGVyXCIpO1xuXG4gIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlTWVudVwiKTtcblxuICBpZiAoc2lkZU1lbnUpIHtcbiAgICBzaWRlTWVudS5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHNpZGVNZW51XG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIilcbiAgICAgICAgICAuZm9yRWFjaCgoYikgPT4gYi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICAgICAgY29uc3QgdG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb0J0blwiKTtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9Nb2RhbFwiKTtcblxuICAgICAgICBpZiAoYnV0dG9uLmlkICE9PSBcImluYm94XCIpIHtcbiAgICAgICAgICB0b2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgICAgIGlmIChtb2RhbCkge1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjbGlja2VkIGJ1dHRvbiBpcyB0aGUgcHJvamVjdCBidXR0b25cbiAgICAgICAgaWYgKGJ1dHRvbi5pZCA9PT0gXCJhZGQtcHJvamVjdFwiKSB7XG4gICAgICAgICAgLy8gSGFuZGxlIHRoZSBwcm9qZWN0IGJ1dHRvbiBjbGlja1xuICAgICAgICAgIHByb2plY3RIYW5kbGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIaWRlIGFsbCBwcm9qZWN0IHRvZG8gbGlzdHNcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LXRvZG8tbGlzdFwiKS5mb3JFYWNoKChsaXN0KSA9PiB7XG4gICAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJZiB0aGUgY2xpY2tlZCBidXR0b24gaXMgbm90IHRoZSBwcm9qZWN0IGJ1dHRvbiwgc2hvdyB0aGUgY29tbW9uIHRvZG8gbGlzdFxuICAgICAgICBpZiAoYnV0dG9uLmlkICE9PSBcImFkZC1wcm9qZWN0XCIpIHtcbiAgICAgICAgICBjb25zdCBjb21tb25Ub2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb0xpc3RcIik7XG4gICAgICAgICAgaWYgKGNvbW1vblRvZG9MaXN0KSB7XG4gICAgICAgICAgICBjb21tb25Ub2RvTGlzdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgY29uc29sZS5sb2coXCJFeGl0aW5nIGhvbWVIYW5kbGVyXCIpO1xufVxuXG5mdW5jdGlvbiBhY3RpdmVCdG4oKSB7XG4gIGNvbnNvbGUubG9nKFwiRW50ZXJpbmcgYWN0aXZlQnRuXCIpO1xuXG4gIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlTWVudVwiKTtcblxuICBpZiAoc2lkZU1lbnUpIHtcbiAgICBzaWRlTWVudS5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHNpZGVNZW51XG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIilcbiAgICAgICAgICAuZm9yRWFjaCgoYikgPT4gYi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICAgICAgY29uc3QgdG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb0J0blwiKTtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9Nb2RhbFwiKTtcbiAgICAgICAgY29uc3QgcHJvakRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC10b2RvLWxpc3RcIik7XG5cbiAgICAgICAgaWYgKGJ1dHRvbi5pZCAhPT0gXCJpbmJveFwiKSB7XG4gICAgICAgICAgdG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICAgICAgICBpZiAobW9kYWwpIHtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGNvbnNvbGUubG9nKFwiZXhpdGluZyBhY3RpdmVCdG5cIik7XG59XG5cbmZ1bmN0aW9uIGluYm94SGFuZGxlcigpIHtcbiAgY29uc3QgdG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb0J0blwiKTtcbiAgY29uc3QgaW5ib3hCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluYm94XCIpO1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluQ29udGVudFwiKTtcblxuICBpZiAodG9kb0J0biAmJiBpbmJveEJ0bikge1xuICAgIC8vIFNldCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgYnV0dG9uXG4gICAgdG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gaW5ib3hCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpXG4gICAgICA/IFwiYmxvY2tcIlxuICAgICAgOiBcIm5vbmVcIjtcblxuICAgIC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciBmb3Igc3Vic2VxdWVudCBjbGlja3NcbiAgICBpbmJveEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0pO1xuXG4gICAgdG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgeyBtb2RhbCB9ID0gY3JlYXRlTW9kYWwoKTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICAgICAgY2xvc2VNb2RhbChtb2RhbCk7IC8vIEFkZCBldmVudCBsaXN0ZW5lciBhZnRlciBhcHBlbmRpbmcgdGhlIG1vZGFsXG4gICAgICBzdWJtaXRUb2RvKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xuICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2VcIik7XG5cbiAgaWYgKGNsb3NlKSB7XG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwiSG90ZG9nIENsaWNrZWRcIik7XG5cbiAgICAgIG1vZGFsLnJlbW92ZSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN1Ym1pdFRvZG8oKSB7XG4gIGNvbnN0IHsgbW9kYWwsIGFsZXJ0TWVzc2FnZSB9ID0gY3JlYXRlTW9kYWwoKTsgLy8gQ3JlYXRlIG1vZGFsIGFuZCBhbGVydE1lc3NhZ2VcblxuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdFRvZG9cIik7XG4gIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvTGlzdFwiKTtcblxuICAvLyBDcmVhdGUgYSBzaW5nbGUgd3JhcHBlciBkaXYgZm9yIGFsbCB0b2RvIGl0ZW1zXG4gIGxldCB0b2RvSXRlbVdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS13cmFwcGVyXCIpO1xuXG4gIGlmICghdG9kb0l0ZW1XcmFwcGVyKSB7XG4gICAgdG9kb0l0ZW1XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RvSXRlbVdyYXBwZXIuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS13cmFwcGVyXCIpO1xuICB9XG5cbiAgaWYgKHN1Ym1pdEJ0biAmJiBtb2RhbCAmJiB0b2RvTGlzdCAmJiB0b2RvSXRlbVdyYXBwZXIpIHtcbiAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIEdldCB2YWx1ZXMgZnJvbSB0aGUgbW9kYWwgaW5wdXRzXG4gICAgICBjb25zdCB0b2RvTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb05hbWVcIikudmFsdWUudHJpbSgpO1xuICAgICAgY29uc3QgdG9kb0RhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EYXRlXCIpLnZhbHVlLnRyaW0oKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgYm90aCB0b2RvIG5hbWUgYW5kIGRhdGUgYXJlIGZpbGxlZFxuICAgICAgaWYgKHRvZG9OYW1lICYmIHRvZG9EYXRlKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBkaXYgdG8gcmVwcmVzZW50IHRoZSB0b2RvIGl0ZW1cbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpOyAvLyBBZGQgdGhlIGNoZWNrYm94IHN0eWxlc1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIHNwYW4gd2l0aCB0aGUgY2hlY2ttYXJrIGNsYXNzXG4gICAgICAgIGNvbnN0IGNoZWNrbWFya1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgY2hlY2ttYXJrU3Bhbi5jbGFzc0xpc3QuYWRkKFwiY2hlY2ttYXJrXCIpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIGNoZWNrYm94XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xuXG4gICAgICAgIC8vIENyZWF0ZSBoMyBhbmQgcCBlbGVtZW50cyBmb3IgdGhlIHRvZG8gbmFtZSBhbmQgZGF0ZVxuICAgICAgICBjb25zdCBuYW1lRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgbmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0b2RvTmFtZTtcblxuICAgICAgICBjb25zdCBkYXRlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBkYXRlRWxlbWVudC50ZXh0Q29udGVudCA9IHRvZG9EYXRlO1xuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgY2hlY2tib3ggdG8gdGhlIHNwYW4sIGFuZCB0aGUgc3BhbiB0byB0aGUgdG9kbyBpdGVtXG4gICAgICAgIGNoZWNrbWFya1NwYW4uYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChjaGVja21hcmtTcGFuKTtcbiAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQobmFtZUVsZW1lbnQpO1xuICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChkYXRlRWxlbWVudCk7XG5cbiAgICAgICAgLy8gQXBwZW5kIHRoZSB0b2RvIGl0ZW0gdG8gdGhlIGNvbW1vbiB3cmFwcGVyIGRpdlxuICAgICAgICB0b2RvSXRlbVdyYXBwZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuXG4gICAgICAgIC8vIENvbnZlcnQgdGhlIGRhdGUgc3RyaW5nIHRvIGEgSmF2YVNjcmlwdCBEYXRlIG9iamVjdFxuICAgICAgICBjb25zdCB0b2RvRGF0ZVRpbWUgPSBuZXcgRGF0ZSh0b2RvRGF0ZSk7XG5cbiAgICAgICAgLy8gU29ydCB0b2RvIGl0ZW1zIGJhc2VkIG9uIGRhdGUgYmVmb3JlIGFwcGVuZGluZ1xuICAgICAgICBjb25zdCBzb3J0ZWRUb2RvSXRlbXMgPSBBcnJheS5mcm9tKHRvZG9JdGVtV3JhcHBlci5jaGlsZHJlbikuc29ydChcbiAgICAgICAgICAoYSwgYikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShhLnF1ZXJ5U2VsZWN0b3IoXCJwXCIpLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYi5xdWVyeVNlbGVjdG9yKFwicFwiKS50ZXh0Q29udGVudCk7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQ2xlYXIgdGhlIGV4aXN0aW5nIHRvZG8gaXRlbXMgaW4gdGhlIHdyYXBwZXJcbiAgICAgICAgdG9kb0l0ZW1XcmFwcGVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgLy8gQXBwZW5kIHRoZSBzb3J0ZWQgdG9kbyBpdGVtcyB0byB0aGUgd3JhcHBlciBkaXZcbiAgICAgICAgc29ydGVkVG9kb0l0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0b2RvSXRlbVdyYXBwZXIuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgd3JhcHBlciBkaXYgdG8gdGhlIHRvZG9MaXN0IGRpdiAoaWYgbm90IGFscmVhZHkgYXBwZW5kZWQpXG4gICAgICAgIGlmICghdG9kb0l0ZW1XcmFwcGVyLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvSXRlbVdyYXBwZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGlkZSBhbmQgcmVtb3ZlIHRoZSBtb2RhbFxuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIG1vZGFsLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciB0byB0aGUgY2hlY2tib3ggZm9yIHJlbW92YWwgd2l0aCBhIHNtYWxsIGRlbGF5XG4gICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdG9kb0l0ZW0ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFsZXJ0TWVzc2FnZS5oaWRkZW4gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnRNZXNzYWdlLnRleHRDb250ZW50ID0gXCJQbGVhc2UgZW50ZXIgYm90aCB0YXNrIG5hbWUgYW5kIGRhdGUuXCI7XG4gICAgICAgIGFsZXJ0TWVzc2FnZS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0SGFuZGxlcigpIHtcbiAgaG9tZUhhbmRsZXIoKTtcbiAgYWN0aXZlQnRuKCk7XG4gIGluYm94SGFuZGxlcigpO1xuICBjbG9zZU1vZGFsKCk7XG59XG5cbmV4cG9ydCB7IGluaXRIYW5kbGVyLCBpbmJveEhhbmRsZXIgfTtcbiIsImltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcblxuZnVuY3Rpb24gY3JlYXRlTW9kYWwoKSB7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsLmlkID0gJ3RvZG9Nb2RhbCc7XG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG5cbiAgY29uc3QgbW9kYWxDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsQ29udGVudC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250ZW50Jyk7XG5cbiAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XG4gIGNsb3NlQnRuLmlubmVySFRNTCA9ICcmdGltZXM7JztcblxuICBjb25zdCBuYW1lTGFiZWwgPSBjcmVhdGVMYWJlbCgnVGFzayBOYW1lOicsICd0b2RvTmFtZScpO1xuICBjb25zdCBuYW1lSW5wdXQgPSBjcmVhdGVJbnB1dCgndGV4dCcsICd0b2RvTmFtZScsIHRydWUpO1xuXG4gIGNvbnN0IGRhdGVMYWJlbCA9IGNyZWF0ZUxhYmVsKCdEYXRlOicsICd0b2RvRGF0ZScpO1xuICBjb25zdCBkYXRlSW5wdXQgPSBjcmVhdGVJbnB1dCgnZGF0ZScsICd0b2RvRGF0ZScsIHRydWUpO1xuXG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBzdWJtaXRCdG4uaWQgPSAnc3VibWl0VG9kbyc7XG4gIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9ICdTdWJtaXQnO1xuXG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKGRhdGVMYWJlbCk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChkYXRlSW5wdXQpO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoc3VibWl0QnRuKTtcblxuICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpO1xuXG4gIHJldHVybiBtb2RhbDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGFiZWwodGV4dCwgaHRtbEZvcikge1xuICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgaHRtbEZvcik7XG4gIGxhYmVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgcmV0dXJuIGxhYmVsO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbnB1dCh0eXBlLCBpZCwgcmVxdWlyZWQpIHtcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBpbnB1dC50eXBlID0gdHlwZTtcbiAgaW5wdXQuaWQgPSBpZDtcbiAgaW5wdXQucmVxdWlyZWQgPSByZXF1aXJlZDtcbiAgcmV0dXJuIGlucHV0O1xufVxuXG5leHBvcnQgeyBjcmVhdGVNb2RhbCB9O1xuXG4iLCJpbXBvcnQgeyBjcmVhdGVNb2RhbCB9IGZyb20gXCIuL21vZGFsXCI7XG5cbmZ1bmN0aW9uIHByb2plY3RIYW5kbGVyKCkge1xuICBjb25zb2xlLmxvZyhcIkVudGVyaW5nIHByb2plY3RIYW5kbGVyXCIpO1xuXG4gIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QnKTtcblxuICBpZiAoYWRkUHJvamVjdEJ0bikge1xuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdCcpO1xuXG4gICAgY29uc3QgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coXCJFbnRlcmluZyBjbGlja0hhbmRsZXJcIik7XG5cbiAgICAgIGlmIChwcm9qZWN0RGl2ICYmIHByb2plY3REaXYucXVlcnlTZWxlY3RvcignLnByb2plY3QtaW5wdXQtY29udGFpbmVyJykpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJJbnB1dCBmaWVsZCBhbHJlYWR5IGNyZWF0ZWQuIEV4aXRpbmcgY2xpY2tIYW5kbGVyLlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgaW5wdXRFbGVtZW50LnR5cGUgPSAndGV4dCc7XG4gICAgICBpbnB1dEVsZW1lbnQucGxhY2Vob2xkZXIgPSAnRW50ZXIgcHJvamVjdCBuYW1lJztcblxuICAgICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSAnU3VibWl0JztcbiAgICAgIHN1Ym1pdEJ0bi5jbGFzc0xpc3QuYWRkKCdzdWJtaXQtYnRuJyk7XG5cbiAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gICAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZCgnY2FuY2VsLWJ0bicpO1xuXG4gICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWlucHV0LWNvbnRhaW5lcicpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWl0QnRuKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuXG4gICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3VibWl0IGJ1dHRvbiBjbGlja2VkXCIpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gaW5wdXRFbGVtZW50LnZhbHVlLnRyaW0oKTtcblxuICAgICAgICBpZiAocHJvamVjdE5hbWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnUHJvamVjdCBOYW1lOicsIHByb2plY3ROYW1lKTtcblxuICAgICAgICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgcHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1pdGVtJyk7XG4gICAgICAgICAgY29uc3QgcHJvamVjdE5hbWVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICBwcm9qZWN0TmFtZUJ0bi50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuICAgICAgICAgIHByb2plY3ROYW1lQnRuLmNsYXNzTGlzdC5hZGQoJ3Byb2pOYW1lQnRuJyk7XG5cbiAgICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICBkZWxldGVCdG4udGV4dENvbnRlbnQgPSAneCc7XG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1idG4nKTtcblxuICAgICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHByb2plY3RJdGVtLnJlbW92ZSgpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnByb2plY3QtdG9kby1saXN0W2RhdGEtcHJvamVjdD1cIiR7cHJvamVjdE5hbWV9XCJdYCk7XG4gICAgICAgICAgICBpZiAocHJvamVjdFRvZG9MaXN0KSB7XG4gICAgICAgICAgICAgIHByb2plY3RUb2RvTGlzdC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3ROYW1lQnRuKTtcbiAgICAgICAgICBwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gICAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XG5cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlKCk7XG5cbiAgICAgICAgICBsZXQgcHJvamVjdFRvZG9MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgcHJvamVjdFRvZG9MaXN0LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdG9kby1saXN0JywgJ2hpZGRlbicpO1xuICAgICAgICAgIHByb2plY3RUb2RvTGlzdC5kYXRhc2V0LnByb2plY3QgPSBwcm9qZWN0TmFtZTtcblxuICAgICAgICAgIGNvbnN0IGFkZFRvZG9CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICBhZGRUb2RvQnRuLnRleHRDb250ZW50ID0gYEFkZCBUb2RvIGZvciAke3Byb2plY3ROYW1lfWA7XG4gICAgICAgICAgYWRkVG9kb0J0bi5jbGFzc0xpc3QuYWRkKCdhZGQtdG9kby1idG4nKTtcblxuICAgICAgICAgIGFkZFRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBtb2RhbCA9IGNyZWF0ZU1vZGFsKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbkNvbnRlbnQnKS5hcHBlbmRDaGlsZChtb2RhbCk7XG5cbiAgICAgICAgICAgIGNsb3NlTW9kYWwobW9kYWwpO1xuICAgICAgICAgICAgc3VibWl0VG9kb0ZvclByb2plY3QocHJvamVjdE5hbWUsIG1vZGFsKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHByb2plY3RUb2RvTGlzdC5hcHBlbmRDaGlsZChhZGRUb2RvQnRuKTtcblxuICAgICAgICAgIC8vIEFwcGVuZCB0aGUgcHJvamVjdCB0b2RvIGxpc3QgdG8gdGhlIC50b2RvTGlzdCBkaXZcbiAgICAgICAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvTGlzdCcpO1xuICAgICAgICAgIGlmICh0b2RvTGlzdCkge1xuICAgICAgICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdFRvZG9MaXN0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gdG9nZ2xlIHZpc2liaWxpdHkgb2YgcHJvamVjdCB0b2RvIGxpc3RcbiAgICAgICAgICBwcm9qZWN0TmFtZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgYWxsIHByb2plY3QgdG9kbyBsaXN0c1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtdG9kby1saXN0JykuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBTaG93IHRoZSBjbGlja2VkIHByb2plY3QgdG9kbyBsaXN0XG4gICAgICAgICAgICBwcm9qZWN0VG9kb0xpc3QuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGVydCgnUGxlYXNlIGVudGVyIGEgcHJvamVjdCBuYW1lLicpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlKCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHByb2plY3REaXYpIHtcbiAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhcIkV4aXRpbmcgY2xpY2tIYW5kbGVyXCIpO1xuICAgIH07XG5cbiAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKFwiRXhpdGluZyBwcm9qZWN0SGFuZGxlclwiKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xuICBjb25zb2xlLmxvZyhcIkVudGVyaW5nIGNsb3NlTW9kYWxcIik7XG5cbiAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlXCIpO1xuXG4gIGlmIChjbG9zZSkge1xuICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBjb25zb2xlLmxvZyhcIkNsb3NlIGJ1dHRvbiBjbGlja2VkXCIpO1xuICAgICAgbW9kYWwucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zb2xlLmxvZyhcIkV4aXRpbmcgY2xvc2VNb2RhbFwiKTtcbn1cblxuZnVuY3Rpb24gc3VibWl0VG9kb0ZvclByb2plY3QocHJvamVjdE5hbWUsIG1vZGFsKSB7XG4gIGNvbnNvbGUubG9nKFwiRW50ZXJpbmcgc3VibWl0VG9kb0ZvclByb2plY3RcIik7XG5cbiAgY29uc3QgcHJvamVjdFRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgLnByb2plY3QtdG9kby1saXN0W2RhdGEtcHJvamVjdD1cIiR7cHJvamVjdE5hbWV9XCJdYFxuICApO1xuXG4gIGxldCBwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgLnByb2plY3Qtd3JhcHBlcltkYXRhLXByb2plY3Q9XCIke3Byb2plY3ROYW1lfVwiXWBcbiAgKTtcblxuICBpZiAoIXByb2plY3RUb2RvSXRlbVdyYXBwZXIpIHtcbiAgICBwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXdyYXBwZXJcIik7XG4gICAgcHJvamVjdFRvZG9JdGVtV3JhcHBlci5kYXRhc2V0LnByb2plY3QgPSBwcm9qZWN0TmFtZTtcblxuICAgIC8vIEFwcGVuZCB0aGUgcHJvamVjdC1zcGVjaWZpYyB0b2RvIGxpc3QgdG8gdGhlIC50b2RvTGlzdCBkaXZcbiAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb0xpc3RcIik7XG4gICAgaWYgKHRvZG9MaXN0KSB7XG4gICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyKTtcbiAgICB9XG4gICAgcHJvamVjdFRvZG9MaXN0LmFwcGVuZENoaWxkKHByb2plY3RUb2RvSXRlbVdyYXBwZXIpO1xuICB9XG5cbiAgaWYgKG1vZGFsICYmIHByb2plY3RUb2RvSXRlbVdyYXBwZXIpIHtcbiAgICBwcm9qZWN0VG9kb0xpc3QuYXBwZW5kQ2hpbGQobW9kYWwpO1xuXG4gICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRUb2RvXCIpO1xuXG4gICAgY29uc3Qgc3VibWl0SGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU3VibWl0IFRvZG8gYnV0dG9uIGNsaWNrZWRcIik7XG5cbiAgICAgIGNvbnN0IHRvZG9OYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvTmFtZVwiKS52YWx1ZTtcbiAgICAgIGNvbnN0IHRvZG9EYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRGF0ZVwiKS52YWx1ZTtcblxuICAgICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcblxuICAgICAgY29uc3QgY2hlY2ttYXJrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgY2hlY2ttYXJrU3Bhbi5jbGFzc0xpc3QuYWRkKFwiY2hlY2ttYXJrXCIpO1xuXG4gICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cbiAgICAgIGNvbnN0IG5hbWVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgbmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0b2RvTmFtZTtcblxuICAgICAgY29uc3QgZGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIGRhdGVFbGVtZW50LnRleHRDb250ZW50ID0gdG9kb0RhdGU7XG5cbiAgICAgIGNoZWNrbWFya1NwYW4uYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoY2hlY2ttYXJrU3Bhbik7XG4gICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChuYW1lRWxlbWVudCk7XG4gICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChkYXRlRWxlbWVudCk7XG5cbiAgICAgIC8vIEFwcGVuZCB0aGUgdG9kbyBpdGVtIHRvIHRoZSBwcm9qZWN0LXNwZWNpZmljIHRvZG8gbGlzdFxuICAgICAgcHJvamVjdFRvZG9JdGVtV3JhcHBlci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG5cbiAgICAgIGNvbnN0IHNvcnRlZFRvZG9JdGVtcyA9IEFycmF5LmZyb20ocHJvamVjdFRvZG9JdGVtV3JhcHBlci5jaGlsZHJlbikuc29ydChcbiAgICAgICAgKGEsIGIpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRlQSA9IGEucXVlcnlTZWxlY3RvcihcInBcIilcbiAgICAgICAgICAgID8gbmV3IERhdGUoYS5xdWVyeVNlbGVjdG9yKFwicFwiKS50ZXh0Q29udGVudClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICBjb25zdCBkYXRlQiA9IGIucXVlcnlTZWxlY3RvcihcInBcIilcbiAgICAgICAgICAgID8gbmV3IERhdGUoYi5xdWVyeVNlbGVjdG9yKFwicFwiKS50ZXh0Q29udGVudClcbiAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICAgIHJldHVybiBkYXRlQSAtIGRhdGVCO1xuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgIHNvcnRlZFRvZG9JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gSGlkZSBhbmQgcmVtb3ZlIHRoZSBtb2RhbFxuICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgbW9kYWwucmVtb3ZlKCk7XG5cbiAgICAgIC8vIFJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXIgYWZ0ZXIgc3VibWl0dGluZ1xuICAgICAgc3VibWl0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdWJtaXRIYW5kbGVyKTtcbiAgICB9O1xuXG4gICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdWJtaXRIYW5kbGVyKTtcblxuICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGNvbnN0IHRhcmdldENoZWNrYm94ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgaWYgKFxuICAgICAgICB0YXJnZXRDaGVja2JveC50YWdOYW1lID09PSBcIklOUFVUXCIgJiZcbiAgICAgICAgdGFyZ2V0Q2hlY2tib3gudHlwZSA9PT0gXCJjaGVja2JveFwiXG4gICAgICApIHtcbiAgICAgICAgLy8gQWRkIGEgc21hbGwgZGVsYXkgZm9yIENTUyBhbmltYXRpb25cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSB0b2RvIGl0ZW0gd2hlbiB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZFxuICAgICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGFyZ2V0Q2hlY2tib3guY2xvc2VzdChcIi50b2RvLWl0ZW1cIik7XG4gICAgICAgICAgaWYgKHRvZG9JdGVtKSB7XG4gICAgICAgICAgICB0b2RvSXRlbS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMCk7IC8vIFlvdSBjYW4gYWRqdXN0IHRoZSBkZWxheSAoaW4gbWlsbGlzZWNvbmRzKSBhcyBuZWVkZWRcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKFwiRXhpdGluZyBzdWJtaXRUb2RvRm9yUHJvamVjdFwiKTtcbn1cblxuLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIGxvYWQgdGhlIHByb2plY3RIYW5kbGVyIHdoZW4gdGhlIHdpbmRvdyBsb2Fkc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgLy8gQ2FsbCBwcm9qZWN0SGFuZGxlciB3aGVuIHRoZSB3aW5kb3cgbG9hZHNcbiAgcHJvamVjdEhhbmRsZXIoKTtcbn0pO1xuXG5leHBvcnQgeyBwcm9qZWN0SGFuZGxlciB9O1xuIiwiaW1wb3J0IHsgaW5pdEhhbmRsZXIgfSBmcm9tIFwiLi9ob21lSGFuZGxlclwiO1xuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXIoKXtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSAnVG8tRG8gTGlzdCc7XG5cbiAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb290ZXIoKSB7XG4gIGNvbnN0ICBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb290ZXInKTtcbiAgY29uc3QgZm9vdGVyTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBmb290ZXJMaW5rLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcblxuICBjb25zdCBjb3B5cmlnaHQgPSBjcmVhdGVGb290ZXJMaW5rKCdDb3B5cmlnaHQgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWNvcHlyaWdodFwiPjwvaT4gSm9zaEFsbGVuJyk7XG4gIGZvb3RlckxpbmsuYXBwZW5kQ2hpbGQoY29weXJpZ2h0KTtcbiAgZm9vdGVyLmFwcGVuZENoaWxkKGZvb3RlckxpbmspO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlckxpbmsodGV4dCkge1xuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgbGluay5pbm5lckhUTUwgPSB0ZXh0O1xuICByZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udGVudCgpIHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQnKTtcbiAgY29udGVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21haW5Db250ZW50Jyk7XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaWRlTWVudShjb250ZW50KSB7XG4gIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHNpZGVNZW51LmNsYXNzTGlzdC5hZGQoJ3NpZGVNZW51Jyk7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQnV0dG9uKHRleHQsIGlkKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBidXR0b24uaWQgPSBpZDtcbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG5cbiAgY29uc3QgaG9tZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBob21lLmNsYXNzTGlzdC5hZGQoJ2hvbWUnKTtcbiAgaG9tZS5pbm5lckhUTUwgPSAnPGgxPkhvbWU8L2gxPic7XG4gIGNvbnN0IGluYm94QnRuID0gY3JlYXRlQnV0dG9uKCdJbmJveCcsICdpbmJveCcpO1xuICBob21lLmFwcGVuZENoaWxkKGluYm94QnRuKTtcbiAgaG9tZS5hcHBlbmRDaGlsZChjcmVhdGVCdXR0b24oJ1RvZGF5JywgJ3RvZGF5JykpO1xuICBob21lLmFwcGVuZENoaWxkKGNyZWF0ZUJ1dHRvbignVGhpcyBXZWVrJywgJ3RoaXMtd2VlaycpKTtcblxuICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByb2plY3QuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICBwcm9qZWN0LmlubmVySFRNTCA9ICc8aDE+UHJvamVjdDwvaDE+JztcbiAgY29uc3QgYWRkUHJvamVjdEJ0biA9IGNyZWF0ZUJ1dHRvbignKyBBZGQgUHJvamVjdCcsICdhZGQtcHJvamVjdCcpO1xuICBwcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RCdG4pO1xuXG4gIHNpZGVNZW51LmFwcGVuZENoaWxkKGhvbWUpO1xuICBzaWRlTWVudS5hcHBlbmRDaGlsZChwcm9qZWN0KTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChzaWRlTWVudSk7IC8vIEFwcGVuZCBzaWRlTWVudSB0byBjb250ZW50XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGVudCk7IC8vIEFwcGVuZCBjb250ZW50IHRvIHRoZSBib2R5XG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlVG9kb0xpc3QoKSB7XG4gIGNvbnN0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG9kb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b2RvTGlzdCcpOyAvLyBOZXcgY29udGFpbmVyIGZvciB0aGUgdG9kbyBsaXN0XG5cbiAgY29uc3QgdG9kb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICB0b2RvQnRuLmNsYXNzTGlzdC5hZGQoJ3RvZG9CdG4nKTtcbiAgdG9kb0J0bi50ZXh0Q29udGVudCA9ICdBZGQgVG8tRG8gTGlzdCc7XG5cbiAgdG9kb0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvQnRuKTtcbiAgLy8gY29udGVudC5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKTsgLy8gRG9uJ3QgYXBwZW5kIGRpcmVjdGx5IHRvIGNvbnRlbnRcblxuICByZXR1cm4gdG9kb0NvbnRhaW5lcjsgLy8gUmV0dXJuIHRoZSB0b2RvIGNvbnRhaW5lclxufVxuXG5cbmZ1bmN0aW9uIGluaXRXZWJzaXRlKCkge1xuICBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgY29udGVudCA9IGNyZWF0ZUNvbnRlbnQoKTsgLy8gQ3JlYXRlIGNvbnRlbnQgZWxlbWVudFxuICBjb25zdCB0b2RvQ29udGFpbmVyID0gY3JlYXRlVG9kb0xpc3QoKTsgLy8gQ3JlYXRlIHRvZG8gY29udGFpbmVyXG4gIGNyZWF0ZVNpZGVNZW51KGNvbnRlbnQpOyAvLyBQYXNzIGNvbnRlbnQgdG8gY3JlYXRlU2lkZU1lbnVcbiAgY29udGVudC5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKTsgLy8gQXBwZW5kIHRvZG8gY29udGFpbmVyIHRvIGNvbnRlbnRcbiAgaW5pdEhhbmRsZXIoKTtcbiAgY3JlYXRlRm9vdGVyKCk7XG59XG5cblxuXG5leHBvcnQgeyBpbml0V2Vic2l0ZSwgY3JlYXRlQ29udGVudCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpbml0V2Vic2l0ZSB9IGZyb20gXCIuL3dlYnNpdGVcIjtcblxuaW5pdFdlYnNpdGUoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9