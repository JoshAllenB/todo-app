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

  const alertMessage = document.createElement('div');
  alertMessage.id = 'alertMessage';
  alertMessage.classList.add('alert-message');
  alertMessage.hidden = true;

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(nameLabel);
  modalContent.appendChild(nameInput);
  modalContent.appendChild(dateLabel);
  modalContent.appendChild(dateInput);
  modalContent.appendChild(submitBtn);

  modal.appendChild(modalContent);
  modal.appendChild(alertMessage);

  return {modal, alertMessage};
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

  const addProjectBtn = document.getElementById("add-project");

  if (addProjectBtn) {
    const projectDiv = document.querySelector(".project");

    const clickHandler = function () {
      console.log("Entering clickHandler");

      if (projectDiv && projectDiv.querySelector(".project-input-container")) {
        console.log("Input field already created. Exiting clickHandler.");
        return;
      }

      const inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.placeholder = "Enter project name";

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

      submitBtn.addEventListener("click", function () {
        console.log("Submit button clicked");

        const projectName = inputElement.value.trim();

        if (projectName) {
          console.log("Project Name:", projectName);

          const projectItem = document.createElement("div");
          projectItem.classList.add("project-item");
          const projectNameBtn = document.createElement("button");
          projectNameBtn.textContent = projectName;
          projectNameBtn.classList.add("projNameBtn");

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "x";
          deleteBtn.classList.add("delete-btn");

          deleteBtn.addEventListener("click", function () {
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

          projectDiv.appendChild(projectItem);

          container.remove();

          let projectTodoList = document.createElement("div");
          projectTodoList.classList.add("project-todo-list", "hidden");
          projectTodoList.dataset.project = projectName;

          const addTodoBtn = document.createElement("button");
          addTodoBtn.textContent = `Add Todo for ${projectName}`;
          addTodoBtn.classList.add("add-todo-btn");

          addTodoBtn.addEventListener("click", function () {
            const modal = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.createModal)();
            document.getElementById("mainContent").appendChild(modal);

            closeModal(modal);
            submitTodoForProject(projectName, modal);
          });

          projectTodoList.appendChild(addTodoBtn);

          // Append the project todo list to the .todoList div
          const todoList = document.querySelector(".todoList");
          if (todoList) {
            todoList.appendChild(projectTodoList);
          }

          // Add event listener to toggle visibility of project todo list
          projectNameBtn.addEventListener("click", function () {
            // Hide all project todo lists
            document.querySelectorAll(".project-todo-list").forEach((list) => {
              list.classList.add("hidden");
            });

            // Show the clicked project todo list
            projectTodoList.classList.remove("hidden");

            const commonTodoList = document.querySelector(".todoList");
            if (commonTodoList) {
              commonTodoList.classList.add("hidden");
            }
          });
        } else {
          alert("Please enter a project name.");
        }
      });

      cancelBtn.addEventListener("click", function () {
        container.remove();
      });

      if (projectDiv) {
        projectDiv.appendChild(container);
      }

      console.log("Exiting clickHandler");
    };

    addProjectBtn.addEventListener("click", clickHandler);
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

      const todoName = document.getElementById("todoName").value.trim();
      const todoDate = document.getElementById("todoDate").value.trim();

      // Check if both todo name and date are filled
      if (todoName && todoDate) {
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
        alertMessage.hidden = true;
      } else {
        alertMessage.textContent = 'Please enter both task name and date.';
        alertMessage.hidden = false;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzQztBQUNTOztBQUUvQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLDREQUFjO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsY0FBYyxRQUFRLEVBQUUsbURBQVc7QUFDbkM7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLHNCQUFzQixFQUFFLG1EQUFXLElBQUk7O0FBRWpEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDOztBQUU3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFcUM7Ozs7Ozs7Ozs7Ozs7OztBQzlOSDs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCOztBQUUvQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkRzQzs7QUFFdEM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFlBQVk7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbURBQW1ELFlBQVk7QUFDL0Q7O0FBRUE7QUFDQSwwQkFBMEIsbURBQVc7QUFDckM7O0FBRUE7QUFDQTtBQUNBLFdBQVc7O0FBRVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QyxZQUFZO0FBQ3BEOztBQUVBO0FBQ0Esc0NBQXNDLFlBQVk7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFFBQVE7QUFDakI7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRXlCOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdRa0I7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLHNDQUFzQzs7QUFFdEM7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQzs7QUFFM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUNBQXlDOztBQUV6Qyx3QkFBd0I7QUFDeEI7OztBQUdBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMsMENBQTBDO0FBQzFDLDJCQUEyQjtBQUMzQixzQ0FBc0M7QUFDdEMsRUFBRSx5REFBVztBQUNiO0FBQ0E7Ozs7QUFJc0M7Ozs7Ozs7VUM5RnRDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOd0M7O0FBRXhDLHFEQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaG9tZUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvcHJvakhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvd2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZU1vZGFsIH0gZnJvbSBcIi4vbW9kYWxcIjtcbmltcG9ydCB7IHByb2plY3RIYW5kbGVyIH0gZnJvbSBcIi4vcHJvakhhbmRsZXJcIjtcblxuZnVuY3Rpb24gaG9tZUhhbmRsZXIoKSB7XG4gIGNvbnNvbGUubG9nKFwiRW50ZXJpbmcgSG9tZUhhbmRsZXJcIik7XG5cbiAgY29uc3Qgc2lkZU1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGVNZW51XCIpO1xuXG4gIGlmIChzaWRlTWVudSkge1xuICAgIHNpZGVNZW51LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgc2lkZU1lbnVcbiAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKVxuICAgICAgICAgIC5mb3JFYWNoKChiKSA9PiBiLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCB0b2RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvQnRuXCIpO1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb01vZGFsXCIpO1xuXG4gICAgICAgIGlmIChidXR0b24uaWQgIT09IFwiaW5ib3hcIikge1xuICAgICAgICAgIHRvZG9CdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICAgICAgaWYgKG1vZGFsKSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNsaWNrZWQgYnV0dG9uIGlzIHRoZSBwcm9qZWN0IGJ1dHRvblxuICAgICAgICBpZiAoYnV0dG9uLmlkID09PSBcImFkZC1wcm9qZWN0XCIpIHtcbiAgICAgICAgICAvLyBIYW5kbGUgdGhlIHByb2plY3QgYnV0dG9uIGNsaWNrXG4gICAgICAgICAgcHJvamVjdEhhbmRsZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhpZGUgYWxsIHByb2plY3QgdG9kbyBsaXN0c1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtdG9kby1saXN0XCIpLmZvckVhY2goKGxpc3QpID0+IHtcbiAgICAgICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIElmIHRoZSBjbGlja2VkIGJ1dHRvbiBpcyBub3QgdGhlIHByb2plY3QgYnV0dG9uLCBzaG93IHRoZSBjb21tb24gdG9kbyBsaXN0XG4gICAgICAgIGlmIChidXR0b24uaWQgIT09IFwiYWRkLXByb2plY3RcIikge1xuICAgICAgICAgIGNvbnN0IGNvbW1vblRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvTGlzdFwiKTtcbiAgICAgICAgICBpZiAoY29tbW9uVG9kb0xpc3QpIHtcbiAgICAgICAgICAgIGNvbW1vblRvZG9MaXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBjb25zb2xlLmxvZyhcIkV4aXRpbmcgaG9tZUhhbmRsZXJcIik7XG59XG5cbmZ1bmN0aW9uIGFjdGl2ZUJ0bigpIHtcbiAgY29uc29sZS5sb2coXCJFbnRlcmluZyBhY3RpdmVCdG5cIik7XG5cbiAgY29uc3Qgc2lkZU1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGVNZW51XCIpO1xuXG4gIGlmIChzaWRlTWVudSkge1xuICAgIHNpZGVNZW51LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgc2lkZU1lbnVcbiAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKVxuICAgICAgICAgIC5mb3JFYWNoKChiKSA9PiBiLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCB0b2RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvQnRuXCIpO1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb01vZGFsXCIpO1xuICAgICAgICBjb25zdCBwcm9qRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXRvZG8tbGlzdFwiKTtcblxuICAgICAgICBpZiAoYnV0dG9uLmlkICE9PSBcImluYm94XCIpIHtcbiAgICAgICAgICB0b2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgICAgIGlmIChtb2RhbCkge1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgY29uc29sZS5sb2coXCJleGl0aW5nIGFjdGl2ZUJ0blwiKTtcbn1cblxuZnVuY3Rpb24gaW5ib3hIYW5kbGVyKCkge1xuICBjb25zdCB0b2RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvQnRuXCIpO1xuICBjb25zdCBpbmJveEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5ib3hcIik7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5Db250ZW50XCIpO1xuXG4gIGlmICh0b2RvQnRuICYmIGluYm94QnRuKSB7XG4gICAgLy8gU2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBidXR0b25cbiAgICB0b2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBpbmJveEJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIilcbiAgICAgID8gXCJibG9ja1wiXG4gICAgICA6IFwibm9uZVwiO1xuXG4gICAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciBzdWJzZXF1ZW50IGNsaWNrc1xuICAgIGluYm94QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0b2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfSk7XG5cbiAgICB0b2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB7IG1vZGFsIH0gPSBjcmVhdGVNb2RhbCgpO1xuICAgICAgY29udGVudC5hcHBlbmRDaGlsZChtb2RhbCk7XG4gICAgICBjbG9zZU1vZGFsKG1vZGFsKTsgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGFmdGVyIGFwcGVuZGluZyB0aGUgbW9kYWxcbiAgICAgIHN1Ym1pdFRvZG8oKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsKSB7XG4gIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbG9zZVwiKTtcblxuICBpZiAoY2xvc2UpIHtcbiAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgY29uc29sZS5sb2coXCJIb3Rkb2cgQ2xpY2tlZFwiKTtcblxuICAgICAgbW9kYWwucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3VibWl0VG9kbygpIHtcbiAgY29uc3QgeyBtb2RhbCwgYWxlcnRNZXNzYWdlIH0gPSBjcmVhdGVNb2RhbCgpOyAvLyBDcmVhdGUgbW9kYWwgYW5kIGFsZXJ0TWVzc2FnZVxuXG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0VG9kb1wiKTtcbiAgY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9MaXN0XCIpO1xuXG4gIC8vIENyZWF0ZSBhIHNpbmdsZSB3cmFwcGVyIGRpdiBmb3IgYWxsIHRvZG8gaXRlbXNcbiAgbGV0IHRvZG9JdGVtV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXdyYXBwZXJcIik7XG5cbiAgaWYgKCF0b2RvSXRlbVdyYXBwZXIpIHtcbiAgICB0b2RvSXRlbVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRvZG9JdGVtV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLXdyYXBwZXJcIik7XG4gIH1cblxuICBpZiAoc3VibWl0QnRuICYmIG1vZGFsICYmIHRvZG9MaXN0ICYmIHRvZG9JdGVtV3JhcHBlcikge1xuICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gR2V0IHZhbHVlcyBmcm9tIHRoZSBtb2RhbCBpbnB1dHNcbiAgICAgIGNvbnN0IHRvZG9OYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvTmFtZVwiKS52YWx1ZS50cmltKCk7XG4gICAgICBjb25zdCB0b2RvRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb0RhdGVcIikudmFsdWUudHJpbSgpO1xuXG4gICAgICAvLyBDaGVjayBpZiBib3RoIHRvZG8gbmFtZSBhbmQgZGF0ZSBhcmUgZmlsbGVkXG4gICAgICBpZiAodG9kb05hbWUgJiYgdG9kb0RhdGUpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IGRpdiB0byByZXByZXNlbnQgdGhlIHRvZG8gaXRlbVxuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7IC8vIEFkZCB0aGUgY2hlY2tib3ggc3R5bGVzXG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgc3BhbiB3aXRoIHRoZSBjaGVja21hcmsgY2xhc3NcbiAgICAgICAgY29uc3QgY2hlY2ttYXJrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBjaGVja21hcmtTcGFuLmNsYXNzTGlzdC5hZGQoXCJjaGVja21hcmtcIik7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgY2hlY2tib3hcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGgzIGFuZCBwIGVsZW1lbnRzIGZvciB0aGUgdG9kbyBuYW1lIGFuZCBkYXRlXG4gICAgICAgIGNvbnN0IG5hbWVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICBuYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IHRvZG9OYW1lO1xuXG4gICAgICAgIGNvbnN0IGRhdGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGRhdGVFbGVtZW50LnRleHRDb250ZW50ID0gdG9kb0RhdGU7XG5cbiAgICAgICAgLy8gQXBwZW5kIHRoZSBjaGVja2JveCB0byB0aGUgc3BhbiwgYW5kIHRoZSBzcGFuIHRvIHRoZSB0b2RvIGl0ZW1cbiAgICAgICAgY2hlY2ttYXJrU3Bhbi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKGNoZWNrbWFya1NwYW4pO1xuICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChuYW1lRWxlbWVudCk7XG4gICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKGRhdGVFbGVtZW50KTtcblxuICAgICAgICAvLyBBcHBlbmQgdGhlIHRvZG8gaXRlbSB0byB0aGUgY29tbW9uIHdyYXBwZXIgZGl2XG4gICAgICAgIHRvZG9JdGVtV3JhcHBlci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG5cbiAgICAgICAgLy8gQ29udmVydCB0aGUgZGF0ZSBzdHJpbmcgdG8gYSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0XG4gICAgICAgIGNvbnN0IHRvZG9EYXRlVGltZSA9IG5ldyBEYXRlKHRvZG9EYXRlKTtcblxuICAgICAgICAvLyBTb3J0IHRvZG8gaXRlbXMgYmFzZWQgb24gZGF0ZSBiZWZvcmUgYXBwZW5kaW5nXG4gICAgICAgIGNvbnN0IHNvcnRlZFRvZG9JdGVtcyA9IEFycmF5LmZyb20odG9kb0l0ZW1XcmFwcGVyLmNoaWxkcmVuKS5zb3J0KFxuICAgICAgICAgIChhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEucXVlcnlTZWxlY3RvcihcInBcIikudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZUIgPSBuZXcgRGF0ZShiLnF1ZXJ5U2VsZWN0b3IoXCJwXCIpLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlQSAtIGRhdGVCO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICAvLyBDbGVhciB0aGUgZXhpc3RpbmcgdG9kbyBpdGVtcyBpbiB0aGUgd3JhcHBlclxuICAgICAgICB0b2RvSXRlbVdyYXBwZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICAvLyBBcHBlbmQgdGhlIHNvcnRlZCB0b2RvIGl0ZW1zIHRvIHRoZSB3cmFwcGVyIGRpdlxuICAgICAgICBzb3J0ZWRUb2RvSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRvZG9JdGVtV3JhcHBlci5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQXBwZW5kIHRoZSB3cmFwcGVyIGRpdiB0byB0aGUgdG9kb0xpc3QgZGl2IChpZiBub3QgYWxyZWFkeSBhcHBlbmRlZClcbiAgICAgICAgaWYgKCF0b2RvSXRlbVdyYXBwZXIucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9JdGVtV3JhcHBlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIaWRlIGFuZCByZW1vdmUgdGhlIG1vZGFsXG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgbW9kYWwucmVtb3ZlKCk7XG5cbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjaGVja2JveCBmb3IgcmVtb3ZhbCB3aXRoIGEgc21hbGwgZGVsYXlcbiAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0b2RvSXRlbS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWxlcnRNZXNzYWdlLmhpZGRlbiA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydE1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlBsZWFzZSBlbnRlciBib3RoIHRhc2sgbmFtZSBhbmQgZGF0ZS5cIjtcbiAgICAgICAgYWxlcnRNZXNzYWdlLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRIYW5kbGVyKCkge1xuICBob21lSGFuZGxlcigpO1xuICBhY3RpdmVCdG4oKTtcbiAgaW5ib3hIYW5kbGVyKCk7XG4gIGNsb3NlTW9kYWwoKTtcbn1cblxuZXhwb3J0IHsgaW5pdEhhbmRsZXIsIGluYm94SGFuZGxlciB9O1xuIiwiaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5mdW5jdGlvbiBjcmVhdGVNb2RhbCgpIHtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWwuaWQgPSAndG9kb01vZGFsJztcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcblxuICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWxDb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcblxuICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgY2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgnY2xvc2UnKTtcbiAgY2xvc2VCdG4uaW5uZXJIVE1MID0gJyZ0aW1lczsnO1xuXG4gIGNvbnN0IG5hbWVMYWJlbCA9IGNyZWF0ZUxhYmVsKCdUYXNrIE5hbWU6JywgJ3RvZG9OYW1lJyk7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGNyZWF0ZUlucHV0KCd0ZXh0JywgJ3RvZG9OYW1lJywgdHJ1ZSk7XG5cbiAgY29uc3QgZGF0ZUxhYmVsID0gY3JlYXRlTGFiZWwoJ0RhdGU6JywgJ3RvZG9EYXRlJyk7XG4gIGNvbnN0IGRhdGVJbnB1dCA9IGNyZWF0ZUlucHV0KCdkYXRlJywgJ3RvZG9EYXRlJywgdHJ1ZSk7XG5cbiAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHN1Ym1pdEJ0bi5pZCA9ICdzdWJtaXRUb2RvJztcbiAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gJ1N1Ym1pdCc7XG5cbiAgY29uc3QgYWxlcnRNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFsZXJ0TWVzc2FnZS5pZCA9ICdhbGVydE1lc3NhZ2UnO1xuICBhbGVydE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnYWxlcnQtbWVzc2FnZScpO1xuICBhbGVydE1lc3NhZ2UuaGlkZGVuID0gdHJ1ZTtcblxuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoZGF0ZUlucHV0KTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKHN1Ym1pdEJ0bik7XG5cbiAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50KTtcbiAgbW9kYWwuYXBwZW5kQ2hpbGQoYWxlcnRNZXNzYWdlKTtcblxuICByZXR1cm4ge21vZGFsLCBhbGVydE1lc3NhZ2V9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMYWJlbCh0ZXh0LCBodG1sRm9yKSB7XG4gIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgbGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCBodG1sRm9yKTtcbiAgbGFiZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xuICByZXR1cm4gbGFiZWw7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0KHR5cGUsIGlkLCByZXF1aXJlZCkge1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGlucHV0LnR5cGUgPSB0eXBlO1xuICBpbnB1dC5pZCA9IGlkO1xuICBpbnB1dC5yZXF1aXJlZCA9IHJlcXVpcmVkO1xuICByZXR1cm4gaW5wdXQ7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZU1vZGFsIH07IiwiaW1wb3J0IHsgY3JlYXRlTW9kYWwgfSBmcm9tIFwiLi9tb2RhbFwiO1xuXG5mdW5jdGlvbiBwcm9qZWN0SGFuZGxlcigpIHtcbiAgY29uc29sZS5sb2coXCJFbnRlcmluZyBwcm9qZWN0SGFuZGxlclwiKTtcblxuICBjb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdFwiKTtcblxuICBpZiAoYWRkUHJvamVjdEJ0bikge1xuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RcIik7XG5cbiAgICBjb25zdCBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkVudGVyaW5nIGNsaWNrSGFuZGxlclwiKTtcblxuICAgICAgaWYgKHByb2plY3REaXYgJiYgcHJvamVjdERpdi5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtaW5wdXQtY29udGFpbmVyXCIpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5wdXQgZmllbGQgYWxyZWFkeSBjcmVhdGVkLiBFeGl0aW5nIGNsaWNrSGFuZGxlci5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgaW5wdXRFbGVtZW50LnR5cGUgPSBcInRleHRcIjtcbiAgICAgIGlucHV0RWxlbWVudC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgcHJvamVjdCBuYW1lXCI7XG5cbiAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xuICAgICAgc3VibWl0QnRuLmNsYXNzTGlzdC5hZGQoXCJzdWJtaXQtYnRuXCIpO1xuXG4gICAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gXCJDYW5jZWxcIjtcbiAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwiY2FuY2VsLWJ0blwiKTtcblxuICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1pbnB1dC1jb250YWluZXJcIik7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50KTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJtaXRCdG4pO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cbiAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlN1Ym1pdCBidXR0b24gY2xpY2tlZFwiKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGlucHV0RWxlbWVudC52YWx1ZS50cmltKCk7XG5cbiAgICAgICAgaWYgKHByb2plY3ROYW1lKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IE5hbWU6XCIsIHByb2plY3ROYW1lKTtcblxuICAgICAgICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBwcm9qZWN0SXRlbS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1pdGVtXCIpO1xuICAgICAgICAgIGNvbnN0IHByb2plY3ROYW1lQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICBwcm9qZWN0TmFtZUJ0bi50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuICAgICAgICAgIHByb2plY3ROYW1lQnRuLmNsYXNzTGlzdC5hZGQoXCJwcm9qTmFtZUJ0blwiKTtcblxuICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gXCJ4XCI7XG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtYnRuXCIpO1xuXG4gICAgICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwcm9qZWN0SXRlbS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RUb2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgIGAucHJvamVjdC10b2RvLWxpc3RbZGF0YS1wcm9qZWN0PVwiJHtwcm9qZWN0TmFtZX1cIl1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHByb2plY3RUb2RvTGlzdCkge1xuICAgICAgICAgICAgICBwcm9qZWN0VG9kb0xpc3QucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZUJ0bik7XG4gICAgICAgICAgcHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgICAgICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuXG4gICAgICAgICAgbGV0IHByb2plY3RUb2RvTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgcHJvamVjdFRvZG9MaXN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXRvZG8tbGlzdFwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICBwcm9qZWN0VG9kb0xpc3QuZGF0YXNldC5wcm9qZWN0ID0gcHJvamVjdE5hbWU7XG5cbiAgICAgICAgICBjb25zdCBhZGRUb2RvQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICBhZGRUb2RvQnRuLnRleHRDb250ZW50ID0gYEFkZCBUb2RvIGZvciAke3Byb2plY3ROYW1lfWA7XG4gICAgICAgICAgYWRkVG9kb0J0bi5jbGFzc0xpc3QuYWRkKFwiYWRkLXRvZG8tYnRuXCIpO1xuXG4gICAgICAgICAgYWRkVG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBjcmVhdGVNb2RhbCgpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluQ29udGVudFwiKS5hcHBlbmRDaGlsZChtb2RhbCk7XG5cbiAgICAgICAgICAgIGNsb3NlTW9kYWwobW9kYWwpO1xuICAgICAgICAgICAgc3VibWl0VG9kb0ZvclByb2plY3QocHJvamVjdE5hbWUsIG1vZGFsKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHByb2plY3RUb2RvTGlzdC5hcHBlbmRDaGlsZChhZGRUb2RvQnRuKTtcblxuICAgICAgICAgIC8vIEFwcGVuZCB0aGUgcHJvamVjdCB0b2RvIGxpc3QgdG8gdGhlIC50b2RvTGlzdCBkaXZcbiAgICAgICAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb0xpc3RcIik7XG4gICAgICAgICAgaWYgKHRvZG9MaXN0KSB7XG4gICAgICAgICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0VG9kb0xpc3QpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciB0byB0b2dnbGUgdmlzaWJpbGl0eSBvZiBwcm9qZWN0IHRvZG8gbGlzdFxuICAgICAgICAgIHByb2plY3ROYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBIaWRlIGFsbCBwcm9qZWN0IHRvZG8gbGlzdHNcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC10b2RvLWxpc3RcIikuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgICAgICAgICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gU2hvdyB0aGUgY2xpY2tlZCBwcm9qZWN0IHRvZG8gbGlzdFxuICAgICAgICAgICAgcHJvamVjdFRvZG9MaXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbW1vblRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvTGlzdFwiKTtcbiAgICAgICAgICAgIGlmIChjb21tb25Ub2RvTGlzdCkge1xuICAgICAgICAgICAgICBjb21tb25Ub2RvTGlzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIGEgcHJvamVjdCBuYW1lLlwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlKCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHByb2plY3REaXYpIHtcbiAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhcIkV4aXRpbmcgY2xpY2tIYW5kbGVyXCIpO1xuICAgIH07XG5cbiAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgY29uc29sZS5sb2coXCJFeGl0aW5nIHByb2plY3RIYW5kbGVyXCIpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsKSB7XG4gIGNvbnNvbGUubG9nKFwiRW50ZXJpbmcgY2xvc2VNb2RhbFwiKTtcblxuICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2VcIik7XG5cbiAgaWYgKGNsb3NlKSB7XG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwiQ2xvc2UgYnV0dG9uIGNsaWNrZWRcIik7XG4gICAgICBtb2RhbC5yZW1vdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKFwiRXhpdGluZyBjbG9zZU1vZGFsXCIpO1xufVxuXG5mdW5jdGlvbiBzdWJtaXRUb2RvRm9yUHJvamVjdChwcm9qZWN0TmFtZSwgbW9kYWwpIHtcbiAgY29uc29sZS5sb2coXCJFbnRlcmluZyBzdWJtaXRUb2RvRm9yUHJvamVjdFwiKTtcblxuICBjb25zdCBwcm9qZWN0VG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGAucHJvamVjdC10b2RvLWxpc3RbZGF0YS1wcm9qZWN0PVwiJHtwcm9qZWN0TmFtZX1cIl1gXG4gICk7XG5cbiAgbGV0IHByb2plY3RUb2RvSXRlbVdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGAucHJvamVjdC13cmFwcGVyW2RhdGEtcHJvamVjdD1cIiR7cHJvamVjdE5hbWV9XCJdYFxuICApO1xuXG4gIGlmICghcHJvamVjdFRvZG9JdGVtV3JhcHBlcikge1xuICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3Qtd3JhcHBlclwiKTtcbiAgICBwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyLmRhdGFzZXQucHJvamVjdCA9IHByb2plY3ROYW1lO1xuXG4gICAgLy8gQXBwZW5kIHRoZSBwcm9qZWN0LXNwZWNpZmljIHRvZG8gbGlzdCB0byB0aGUgLnRvZG9MaXN0IGRpdlxuICAgIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvTGlzdFwiKTtcbiAgICBpZiAodG9kb0xpc3QpIHtcbiAgICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKHByb2plY3RUb2RvSXRlbVdyYXBwZXIpO1xuICAgIH1cbiAgICBwcm9qZWN0VG9kb0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdFRvZG9JdGVtV3JhcHBlcik7XG4gIH1cblxuICBpZiAobW9kYWwgJiYgcHJvamVjdFRvZG9JdGVtV3JhcHBlcikge1xuICAgIHByb2plY3RUb2RvTGlzdC5hcHBlbmRDaGlsZChtb2RhbCk7XG5cbiAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdFRvZG9cIik7XG5cbiAgICBjb25zdCBzdWJtaXRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coXCJTdWJtaXQgVG9kbyBidXR0b24gY2xpY2tlZFwiKTtcblxuICAgICAgY29uc3QgdG9kb05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9OYW1lXCIpLnZhbHVlLnRyaW0oKTtcbiAgICAgIGNvbnN0IHRvZG9EYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRGF0ZVwiKS52YWx1ZS50cmltKCk7XG5cbiAgICAgIC8vIENoZWNrIGlmIGJvdGggdG9kbyBuYW1lIGFuZCBkYXRlIGFyZSBmaWxsZWRcbiAgICAgIGlmICh0b2RvTmFtZSAmJiB0b2RvRGF0ZSkge1xuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7XG5cbiAgICAgICAgY29uc3QgY2hlY2ttYXJrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBjaGVja21hcmtTcGFuLmNsYXNzTGlzdC5hZGQoXCJjaGVja21hcmtcIik7XG5cbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cbiAgICAgICAgY29uc3QgbmFtZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgIG5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gdG9kb05hbWU7XG5cbiAgICAgICAgY29uc3QgZGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgZGF0ZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0b2RvRGF0ZTtcblxuICAgICAgICBjaGVja21hcmtTcGFuLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoY2hlY2ttYXJrU3Bhbik7XG4gICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKG5hbWVFbGVtZW50KTtcbiAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoZGF0ZUVsZW1lbnQpO1xuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgdG9kbyBpdGVtIHRvIHRoZSBwcm9qZWN0LXNwZWNpZmljIHRvZG8gbGlzdFxuICAgICAgICBwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyLmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcblxuICAgICAgICBjb25zdCBzb3J0ZWRUb2RvSXRlbXMgPSBBcnJheS5mcm9tKHByb2plY3RUb2RvSXRlbVdyYXBwZXIuY2hpbGRyZW4pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVBID0gYS5xdWVyeVNlbGVjdG9yKFwicFwiKVxuICAgICAgICAgICAgICA/IG5ldyBEYXRlKGEucXVlcnlTZWxlY3RvcihcInBcIikudGV4dENvbnRlbnQpXG4gICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVCID0gYi5xdWVyeVNlbGVjdG9yKFwicFwiKVxuICAgICAgICAgICAgICA/IG5ldyBEYXRlKGIucXVlcnlTZWxlY3RvcihcInBcIikudGV4dENvbnRlbnQpXG4gICAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBzb3J0ZWRUb2RvSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEhpZGUgYW5kIHJlbW92ZSB0aGUgbW9kYWxcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBtb2RhbC5yZW1vdmUoKTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyIGFmdGVyIHN1Ym1pdHRpbmdcbiAgICAgICAgc3VibWl0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdWJtaXRIYW5kbGVyKTtcbiAgICAgICAgYWxlcnRNZXNzYWdlLmhpZGRlbiA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydE1lc3NhZ2UudGV4dENvbnRlbnQgPSAnUGxlYXNlIGVudGVyIGJvdGggdGFzayBuYW1lIGFuZCBkYXRlLic7XG4gICAgICAgIGFsZXJ0TWVzc2FnZS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdWJtaXRIYW5kbGVyKTtcblxuICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGNvbnN0IHRhcmdldENoZWNrYm94ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgaWYgKFxuICAgICAgICB0YXJnZXRDaGVja2JveC50YWdOYW1lID09PSBcIklOUFVUXCIgJiZcbiAgICAgICAgdGFyZ2V0Q2hlY2tib3gudHlwZSA9PT0gXCJjaGVja2JveFwiXG4gICAgICApIHtcbiAgICAgICAgLy8gQWRkIGEgc21hbGwgZGVsYXkgZm9yIENTUyBhbmltYXRpb25cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSB0b2RvIGl0ZW0gd2hlbiB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZFxuICAgICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGFyZ2V0Q2hlY2tib3guY2xvc2VzdChcIi50b2RvLWl0ZW1cIik7XG4gICAgICAgICAgaWYgKHRvZG9JdGVtKSB7XG4gICAgICAgICAgICB0b2RvSXRlbS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMCk7IC8vIFlvdSBjYW4gYWRqdXN0IHRoZSBkZWxheSAoaW4gbWlsbGlzZWNvbmRzKSBhcyBuZWVkZWRcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKFwiRXhpdGluZyBzdWJtaXRUb2RvRm9yUHJvamVjdFwiKTtcbn1cblxuLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIGxvYWQgdGhlIHByb2plY3RIYW5kbGVyIHdoZW4gdGhlIHdpbmRvdyBsb2Fkc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgLy8gQ2FsbCBwcm9qZWN0SGFuZGxlciB3aGVuIHRoZSB3aW5kb3cgbG9hZHNcbiAgcHJvamVjdEhhbmRsZXIoKTtcbn0pO1xuXG5leHBvcnQgeyBwcm9qZWN0SGFuZGxlciB9O1xuIiwiaW1wb3J0IHsgaW5pdEhhbmRsZXIgfSBmcm9tIFwiLi9ob21lSGFuZGxlclwiO1xuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXIoKXtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSAnVG8tRG8gTGlzdCc7XG5cbiAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb290ZXIoKSB7XG4gIGNvbnN0ICBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb290ZXInKTtcbiAgY29uc3QgZm9vdGVyTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBmb290ZXJMaW5rLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcblxuICBjb25zdCBjb3B5cmlnaHQgPSBjcmVhdGVGb290ZXJMaW5rKCdDb3B5cmlnaHQgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWNvcHlyaWdodFwiPjwvaT4gSm9zaEFsbGVuJyk7XG4gIGZvb3RlckxpbmsuYXBwZW5kQ2hpbGQoY29weXJpZ2h0KTtcbiAgZm9vdGVyLmFwcGVuZENoaWxkKGZvb3RlckxpbmspO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlckxpbmsodGV4dCkge1xuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgbGluay5pbm5lckhUTUwgPSB0ZXh0O1xuICByZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udGVudCgpIHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQnKTtcbiAgY29udGVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21haW5Db250ZW50Jyk7XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaWRlTWVudShjb250ZW50KSB7XG4gIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHNpZGVNZW51LmNsYXNzTGlzdC5hZGQoJ3NpZGVNZW51Jyk7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQnV0dG9uKHRleHQsIGlkKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBidXR0b24uaWQgPSBpZDtcbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG5cbiAgY29uc3QgaG9tZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBob21lLmNsYXNzTGlzdC5hZGQoJ2hvbWUnKTtcbiAgaG9tZS5pbm5lckhUTUwgPSAnPGgxPkhvbWU8L2gxPic7XG4gIGNvbnN0IGluYm94QnRuID0gY3JlYXRlQnV0dG9uKCdJbmJveCcsICdpbmJveCcpO1xuICBob21lLmFwcGVuZENoaWxkKGluYm94QnRuKTtcbiAgaG9tZS5hcHBlbmRDaGlsZChjcmVhdGVCdXR0b24oJ1RvZGF5JywgJ3RvZGF5JykpO1xuICBob21lLmFwcGVuZENoaWxkKGNyZWF0ZUJ1dHRvbignVGhpcyBXZWVrJywgJ3RoaXMtd2VlaycpKTtcblxuICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByb2plY3QuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICBwcm9qZWN0LmlubmVySFRNTCA9ICc8aDE+UHJvamVjdDwvaDE+JztcbiAgY29uc3QgYWRkUHJvamVjdEJ0biA9IGNyZWF0ZUJ1dHRvbignKyBBZGQgUHJvamVjdCcsICdhZGQtcHJvamVjdCcpO1xuICBwcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RCdG4pO1xuXG4gIHNpZGVNZW51LmFwcGVuZENoaWxkKGhvbWUpO1xuICBzaWRlTWVudS5hcHBlbmRDaGlsZChwcm9qZWN0KTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChzaWRlTWVudSk7IC8vIEFwcGVuZCBzaWRlTWVudSB0byBjb250ZW50XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGVudCk7IC8vIEFwcGVuZCBjb250ZW50IHRvIHRoZSBib2R5XG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlVG9kb0xpc3QoKSB7XG4gIGNvbnN0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG9kb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b2RvTGlzdCcpOyAvLyBOZXcgY29udGFpbmVyIGZvciB0aGUgdG9kbyBsaXN0XG5cbiAgY29uc3QgdG9kb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICB0b2RvQnRuLmNsYXNzTGlzdC5hZGQoJ3RvZG9CdG4nKTtcbiAgdG9kb0J0bi50ZXh0Q29udGVudCA9ICdBZGQgVG8tRG8gTGlzdCc7XG5cbiAgdG9kb0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvQnRuKTtcbiAgLy8gY29udGVudC5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKTsgLy8gRG9uJ3QgYXBwZW5kIGRpcmVjdGx5IHRvIGNvbnRlbnRcblxuICByZXR1cm4gdG9kb0NvbnRhaW5lcjsgLy8gUmV0dXJuIHRoZSB0b2RvIGNvbnRhaW5lclxufVxuXG5cbmZ1bmN0aW9uIGluaXRXZWJzaXRlKCkge1xuICBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgY29udGVudCA9IGNyZWF0ZUNvbnRlbnQoKTsgLy8gQ3JlYXRlIGNvbnRlbnQgZWxlbWVudFxuICBjb25zdCB0b2RvQ29udGFpbmVyID0gY3JlYXRlVG9kb0xpc3QoKTsgLy8gQ3JlYXRlIHRvZG8gY29udGFpbmVyXG4gIGNyZWF0ZVNpZGVNZW51KGNvbnRlbnQpOyAvLyBQYXNzIGNvbnRlbnQgdG8gY3JlYXRlU2lkZU1lbnVcbiAgY29udGVudC5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKTsgLy8gQXBwZW5kIHRvZG8gY29udGFpbmVyIHRvIGNvbnRlbnRcbiAgaW5pdEhhbmRsZXIoKTtcbiAgY3JlYXRlRm9vdGVyKCk7XG59XG5cblxuXG5leHBvcnQgeyBpbml0V2Vic2l0ZSwgY3JlYXRlQ29udGVudCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpbml0V2Vic2l0ZSB9IGZyb20gXCIuL3dlYnNpdGVcIjtcblxuaW5pdFdlYnNpdGUoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9