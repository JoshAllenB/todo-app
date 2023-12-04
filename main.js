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
const sideMenu = document.querySelector('.sideMenu');

  if (sideMenu) {
    sideMenu.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        sideMenu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        const todoBtn = document.querySelector('.todoBtn');
        const modal = document.getElementById('todoModal');

        if (button.id !== 'inbox') {
          todoBtn.style.display = 'none';

          if (modal) {
            modal.style.display = 'none';
          }
        }

        // Check if the clicked button is the project button
        if (button.id === 'add-project') {
          // Handle the project button click
          (0,_projHandler__WEBPACK_IMPORTED_MODULE_1__.projectHandler)();
        }
      });
    });
  }
}

function activeBtn() {
  const sideMenu = document.querySelector('.sideMenu');

  if (sideMenu) {
    sideMenu.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        sideMenu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        const todoBtn = document.querySelector('.todoBtn');
        const modal = document.getElementById('todoModal');

        if (button.id !== 'inbox') {
          todoBtn.style.display = 'none';

          if (modal) {
            modal.style.display = 'none';
          }
        }


      });
    });
  }
}

function inboxHandler() {
  const todoBtn = document.querySelector('.todoBtn');
  const inboxBtn = document.getElementById('inbox');
  const content = document.getElementById('mainContent');

  if (todoBtn && inboxBtn) {
    // Set the initial state of the button
    todoBtn.style.display = inboxBtn.classList.contains('active') ? 'block' : 'none';

    // Add an event listener for subsequent clicks
    inboxBtn.addEventListener('click', function() {
      todoBtn.style.display = 'block';
    });

    todoBtn.addEventListener('click', function() {
      const modal = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.createModal)();
      content.appendChild(modal);
      closeModal(modal); // Add event listener after appending the modal
      submitTodo();
    });
  }
}

  function closeModal(modal) {
    const close = document.querySelector('.close');

    if (close) {
      close.addEventListener('click', function() {
        modal.style.display = 'none';
        console.log('Hotdog Clicked')

        modal.remove();
      });
    }
  }

function submitTodo() {
  const submitBtn = document.getElementById('submitTodo');
  const modal = document.getElementById('todoModal');
  const todoList = document.querySelector('.todoList');

  // Create a single wrapper div for all todo items
  let todoItemWrapper = document.querySelector('.todo-item-wrapper');

  if (!todoItemWrapper) {
    todoItemWrapper = document.createElement('div');
    todoItemWrapper.classList.add('todo-item-wrapper');
  }

  if (submitBtn && modal && todoList && todoItemWrapper) {
    submitBtn.addEventListener('click', function () {
      // Get values from the modal inputs
      const todoName = document.getElementById('todoName').value;
      const todoDate = document.getElementById('todoDate').value;

      // Create a new div to represent the todo item
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item'); // Add the checkbox styles

      // Create a span with the checkmark class
      const checkmarkSpan = document.createElement('span');
      checkmarkSpan.classList.add('checkmark');

      // Create a checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      // Create h3 and p elements for the todo name and date
      const nameElement = document.createElement('h3');
      nameElement.textContent = todoName;

      const dateElement = document.createElement('p');
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
      const sortedTodoItems = Array.from(todoItemWrapper.children).sort((a, b) => {
        const dateA = new Date(a.querySelector('p').textContent);
        const dateB = new Date(b.querySelector('p').textContent);
        return dateA - dateB;
      });

      // Clear the existing todo items in the wrapper
      todoItemWrapper.innerHTML = '';

      // Append the sorted todo items to the wrapper div
      sortedTodoItems.forEach(item => {
        todoItemWrapper.appendChild(item);
      });

      // Append the wrapper div to the todoList div (if not already appended)
      if (!todoItemWrapper.parentElement) {
        todoList.appendChild(todoItemWrapper);
      }

      // Hide and remove the modal
      modal.style.display = 'none';
      modal.remove();

      // Add event listener to the checkbox for removal
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          setTimeout(() => {
            todoItem.remove();
          }, 200);
        }
      });
    });
  }
}

  function initHandler() {
    activeBtn();
    inboxHandler();
    closeModal();
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
/* harmony export */   projectHandler: () => (/* binding */ projectHandler)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modal.js");


function projectHandler() {
  console.log("Entering projectHandler");

  const addProjectBtn = document.getElementById('add-project');

  if (addProjectBtn) {
    const projectDiv = document.querySelector('.project');

    const clickHandler = function() {
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

      submitBtn.addEventListener('click', function() {
        console.log("Submit button clicked");

        const projectName = inputElement.value.trim();

        if (projectName) {
          console.log('Project Name:', projectName);

          const projectItem = document.createElement('div');
          projectItem.classList.add('project-item');
          const projectNameSpan = document.createElement('span');
          projectNameSpan.textContent = projectName;

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'x';
          deleteBtn.classList.add('delete-btn');

          deleteBtn.addEventListener('click', function() {
            projectItem.remove();
            const projectTodoList = document.querySelector(`.project-todo-list[data-project="${projectName}"]`);
            if (projectTodoList) {
              projectTodoList.remove();
            }
          });

          projectItem.appendChild(projectNameSpan);
          projectItem.appendChild(deleteBtn);

          projectDiv.appendChild(projectItem);

          container.remove();

          const projectTodoList = document.createElement('div');
          projectTodoList.classList.add('project-todo-list');
          projectTodoList.dataset.project = projectName;

          const todoList = document.querySelector('.todoList');
          if (todoList) {
            todoList.appendChild(projectTodoList);
          }

          const addTodoBtn = document.createElement('button');
          addTodoBtn.textContent = `Add Todo for ${projectName}`;
          addTodoBtn.classList.add('add-todo-btn');

          addTodoBtn.addEventListener('click', function() {
            const modal = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.createModal)();
            document.getElementById('mainContent').appendChild(modal);

            closeModal(modal);
            submitTodoForProject(projectName, modal);
          });

          projectTodoList.appendChild(addTodoBtn);
        } else {
          alert('Please enter a project name.');
        }
      });

      cancelBtn.addEventListener('click', function() {
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

  const close = document.querySelector('.close');

  if (close) {
    close.addEventListener('click', function() {
      modal.style.display = 'none';
      console.log('Close button clicked');
      modal.remove();
    });
  }

  console.log("Exiting closeModal");
}

function submitTodoForProject(projectName, modal) {
  console.log("Entering submitTodoForProject");

  const projectTodoList = document.querySelector(`.project-todo-list[data-project="${projectName}"]`);

  let projectTodoItemWrapper = document.querySelector(`.project-wrapper[data-project="${projectName}"]`);

  if (!projectTodoItemWrapper) {
    projectTodoItemWrapper = document.createElement('div');
    projectTodoItemWrapper.classList.add('project-wrapper');
    projectTodoItemWrapper.dataset.project = projectName;

    // Append the project-specific todo list to the .todoList div
    const todoList = document.querySelector('.todoList');
    if (todoList) {
      todoList.appendChild(projectTodoItemWrapper);
    }
    projectTodoList.appendChild(projectTodoItemWrapper);
  }

  if (modal && projectTodoItemWrapper) {
    projectTodoList.appendChild(modal);

    const submitBtn = document.getElementById('submitTodo');

    const submitHandler = function () {
      console.log("Submit Todo button clicked");

      const todoName = document.getElementById('todoName').value;
      const todoDate = document.getElementById('todoDate').value;

      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');

      const checkmarkSpan = document.createElement('span');
      checkmarkSpan.classList.add('checkmark');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      const nameElement = document.createElement('h3');
      nameElement.textContent = todoName;

      const dateElement = document.createElement('p');
      dateElement.textContent = todoDate;

      checkmarkSpan.appendChild(checkbox);
      todoItem.appendChild(checkmarkSpan);
      todoItem.appendChild(nameElement);
      todoItem.appendChild(dateElement);

      // Append the todo item to the project-specific todo list
      projectTodoItemWrapper.appendChild(todoItem);

      const sortedTodoItems = Array.from(projectTodoItemWrapper.children).sort((a, b) => {
        const dateA = a.querySelector('p') ? new Date(a.querySelector('p').textContent) : null;
        const dateB = b.querySelector('p') ? new Date(b.querySelector('p').textContent) : null;

        return dateA - dateB;
      });

      projectTodoItemWrapper.innerHTML = '';

      sortedTodoItems.forEach(item => {
        projectTodoItemWrapper.appendChild(item);
      });

      // Hide and remove the modal
      modal.style.display = 'none';
      modal.remove();

      // Remove the event listener after submitting
      submitBtn.removeEventListener('click', submitHandler);
    };

    submitBtn.addEventListener('click', submitHandler);

    projectTodoItemWrapper.addEventListener('change', function (event) {
      const targetCheckbox = event.target;
      if (targetCheckbox.tagName === 'INPUT' && targetCheckbox.type === 'checkbox') {
        // Add a small delay for CSS animation
        setTimeout(() => {
          // Remove the todo item when the checkbox is checked
          const todoItem = targetCheckbox.closest('.todo-item');
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
window.addEventListener('load', function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3RDLEVBQUUseURBQVc7QUFDYjtBQUNBOzs7O0FBSXNDOzs7Ozs7O1VDOUZ0QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4QyxxREFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2hvbWVIYW5kbGVyLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL21vZGFsLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3Byb2pIYW5kbGVyLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3dlYnNpdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVNb2RhbCB9IGZyb20gXCIuL21vZGFsXCI7XG5pbXBvcnQgeyBwcm9qZWN0SGFuZGxlciB9IGZyb20gXCIuL3Byb2pIYW5kbGVyXCI7XG5cbmZ1bmN0aW9uIGhvbWVIYW5kbGVyKCkge1xuY29uc3Qgc2lkZU1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZU1lbnUnKTtcblxuICBpZiAoc2lkZU1lbnUpIHtcbiAgICBzaWRlTWVudS5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHNpZGVNZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpLmZvckVhY2goYiA9PiBiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgICAgIGNvbnN0IHRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb0J0bicpO1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvTW9kYWwnKTtcblxuICAgICAgICBpZiAoYnV0dG9uLmlkICE9PSAnaW5ib3gnKSB7XG4gICAgICAgICAgdG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgICAgaWYgKG1vZGFsKSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjbGlja2VkIGJ1dHRvbiBpcyB0aGUgcHJvamVjdCBidXR0b25cbiAgICAgICAgaWYgKGJ1dHRvbi5pZCA9PT0gJ2FkZC1wcm9qZWN0Jykge1xuICAgICAgICAgIC8vIEhhbmRsZSB0aGUgcHJvamVjdCBidXR0b24gY2xpY2tcbiAgICAgICAgICBwcm9qZWN0SGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhY3RpdmVCdG4oKSB7XG4gIGNvbnN0IHNpZGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGVNZW51Jyk7XG5cbiAgaWYgKHNpZGVNZW51KSB7XG4gICAgc2lkZU1lbnUucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzaWRlTWVudS5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKS5mb3JFYWNoKGIgPT4gYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICBjb25zdCB0b2RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9CdG4nKTtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kb01vZGFsJyk7XG5cbiAgICAgICAgaWYgKGJ1dHRvbi5pZCAhPT0gJ2luYm94Jykge1xuICAgICAgICAgIHRvZG9CdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICAgIGlmIChtb2RhbCkge1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbmJveEhhbmRsZXIoKSB7XG4gIGNvbnN0IHRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb0J0bicpO1xuICBjb25zdCBpbmJveEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmJveCcpO1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW5Db250ZW50Jyk7XG5cbiAgaWYgKHRvZG9CdG4gJiYgaW5ib3hCdG4pIHtcbiAgICAvLyBTZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGJ1dHRvblxuICAgIHRvZG9CdG4uc3R5bGUuZGlzcGxheSA9IGluYm94QnRuLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykgPyAnYmxvY2snIDogJ25vbmUnO1xuXG4gICAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciBzdWJzZXF1ZW50IGNsaWNrc1xuICAgIGluYm94QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICB0b2RvQnRuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pO1xuXG4gICAgdG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgbW9kYWwgPSBjcmVhdGVNb2RhbCgpO1xuICAgICAgY29udGVudC5hcHBlbmRDaGlsZChtb2RhbCk7XG4gICAgICBjbG9zZU1vZGFsKG1vZGFsKTsgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGFmdGVyIGFwcGVuZGluZyB0aGUgbW9kYWxcbiAgICAgIHN1Ym1pdFRvZG8oKTtcbiAgICB9KTtcbiAgfVxufVxuXG4gIGZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWwpIHtcbiAgICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpO1xuXG4gICAgaWYgKGNsb3NlKSB7XG4gICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBjb25zb2xlLmxvZygnSG90ZG9nIENsaWNrZWQnKVxuXG4gICAgICAgIG1vZGFsLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbmZ1bmN0aW9uIHN1Ym1pdFRvZG8oKSB7XG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRUb2RvJyk7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG9Nb2RhbCcpO1xuICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvTGlzdCcpO1xuXG4gIC8vIENyZWF0ZSBhIHNpbmdsZSB3cmFwcGVyIGRpdiBmb3IgYWxsIHRvZG8gaXRlbXNcbiAgbGV0IHRvZG9JdGVtV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWl0ZW0td3JhcHBlcicpO1xuXG4gIGlmICghdG9kb0l0ZW1XcmFwcGVyKSB7XG4gICAgdG9kb0l0ZW1XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb0l0ZW1XcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS13cmFwcGVyJyk7XG4gIH1cblxuICBpZiAoc3VibWl0QnRuICYmIG1vZGFsICYmIHRvZG9MaXN0ICYmIHRvZG9JdGVtV3JhcHBlcikge1xuICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIEdldCB2YWx1ZXMgZnJvbSB0aGUgbW9kYWwgaW5wdXRzXG4gICAgICBjb25zdCB0b2RvTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvTmFtZScpLnZhbHVlO1xuICAgICAgY29uc3QgdG9kb0RhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kb0RhdGUnKS52YWx1ZTtcblxuICAgICAgLy8gQ3JlYXRlIGEgbmV3IGRpdiB0byByZXByZXNlbnQgdGhlIHRvZG8gaXRlbVxuICAgICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbScpOyAvLyBBZGQgdGhlIGNoZWNrYm94IHN0eWxlc1xuXG4gICAgICAvLyBDcmVhdGUgYSBzcGFuIHdpdGggdGhlIGNoZWNrbWFyayBjbGFzc1xuICAgICAgY29uc3QgY2hlY2ttYXJrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGNoZWNrbWFya1NwYW4uY2xhc3NMaXN0LmFkZCgnY2hlY2ttYXJrJyk7XG5cbiAgICAgIC8vIENyZWF0ZSBhIGNoZWNrYm94XG4gICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcblxuICAgICAgLy8gQ3JlYXRlIGgzIGFuZCBwIGVsZW1lbnRzIGZvciB0aGUgdG9kbyBuYW1lIGFuZCBkYXRlXG4gICAgICBjb25zdCBuYW1lRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICBuYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IHRvZG9OYW1lO1xuXG4gICAgICBjb25zdCBkYXRlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIGRhdGVFbGVtZW50LnRleHRDb250ZW50ID0gdG9kb0RhdGU7XG5cbiAgICAgIC8vIEFwcGVuZCB0aGUgY2hlY2tib3ggdG8gdGhlIHNwYW4sIGFuZCB0aGUgc3BhbiB0byB0aGUgdG9kbyBpdGVtXG4gICAgICBjaGVja21hcmtTcGFuLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKGNoZWNrbWFya1NwYW4pO1xuICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQobmFtZUVsZW1lbnQpO1xuICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoZGF0ZUVsZW1lbnQpO1xuXG4gICAgICAvLyBBcHBlbmQgdGhlIHRvZG8gaXRlbSB0byB0aGUgY29tbW9uIHdyYXBwZXIgZGl2XG4gICAgICB0b2RvSXRlbVdyYXBwZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuXG4gICAgICAvLyBDb252ZXJ0IHRoZSBkYXRlIHN0cmluZyB0byBhIEphdmFTY3JpcHQgRGF0ZSBvYmplY3RcbiAgICAgIGNvbnN0IHRvZG9EYXRlVGltZSA9IG5ldyBEYXRlKHRvZG9EYXRlKTtcblxuICAgICAgLy8gU29ydCB0b2RvIGl0ZW1zIGJhc2VkIG9uIGRhdGUgYmVmb3JlIGFwcGVuZGluZ1xuICAgICAgY29uc3Qgc29ydGVkVG9kb0l0ZW1zID0gQXJyYXkuZnJvbSh0b2RvSXRlbVdyYXBwZXIuY2hpbGRyZW4pLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShhLnF1ZXJ5U2VsZWN0b3IoJ3AnKS50ZXh0Q29udGVudCk7XG4gICAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYi5xdWVyeVNlbGVjdG9yKCdwJykudGV4dENvbnRlbnQpO1xuICAgICAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDbGVhciB0aGUgZXhpc3RpbmcgdG9kbyBpdGVtcyBpbiB0aGUgd3JhcHBlclxuICAgICAgdG9kb0l0ZW1XcmFwcGVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAvLyBBcHBlbmQgdGhlIHNvcnRlZCB0b2RvIGl0ZW1zIHRvIHRoZSB3cmFwcGVyIGRpdlxuICAgICAgc29ydGVkVG9kb0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIHRvZG9JdGVtV3JhcHBlci5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBBcHBlbmQgdGhlIHdyYXBwZXIgZGl2IHRvIHRoZSB0b2RvTGlzdCBkaXYgKGlmIG5vdCBhbHJlYWR5IGFwcGVuZGVkKVxuICAgICAgaWYgKCF0b2RvSXRlbVdyYXBwZXIucGFyZW50RWxlbWVudCkge1xuICAgICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvSXRlbVdyYXBwZXIpO1xuICAgICAgfVxuXG4gICAgICAvLyBIaWRlIGFuZCByZW1vdmUgdGhlIG1vZGFsXG4gICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgbW9kYWwucmVtb3ZlKCk7XG5cbiAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciB0byB0aGUgY2hlY2tib3ggZm9yIHJlbW92YWxcbiAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRvZG9JdGVtLnJlbW92ZSgpO1xuICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbiAgZnVuY3Rpb24gaW5pdEhhbmRsZXIoKSB7XG4gICAgYWN0aXZlQnRuKCk7XG4gICAgaW5ib3hIYW5kbGVyKCk7XG4gICAgY2xvc2VNb2RhbCgpO1xuICAgIHN1Ym1pdFRvZG8oKTtcbiAgfVxuXG4gIGV4cG9ydCB7IGluaXRIYW5kbGVyLCBpbmJveEhhbmRsZXIgfTsiLCJpbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZGFsKCkge1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtb2RhbC5pZCA9ICd0b2RvTW9kYWwnO1xuICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbCcpO1xuXG4gIGNvbnN0IG1vZGFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuXG4gIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBjbG9zZUJ0bi5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xuICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAnJnRpbWVzOyc7XG5cbiAgY29uc3QgbmFtZUxhYmVsID0gY3JlYXRlTGFiZWwoJ1Rhc2sgTmFtZTonLCAndG9kb05hbWUnKTtcbiAgY29uc3QgbmFtZUlucHV0ID0gY3JlYXRlSW5wdXQoJ3RleHQnLCAndG9kb05hbWUnLCB0cnVlKTtcblxuICBjb25zdCBkYXRlTGFiZWwgPSBjcmVhdGVMYWJlbCgnRGF0ZTonLCAndG9kb0RhdGUnKTtcbiAgY29uc3QgZGF0ZUlucHV0ID0gY3JlYXRlSW5wdXQoJ2RhdGUnLCAndG9kb0RhdGUnLCB0cnVlKTtcblxuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgc3VibWl0QnRuLmlkID0gJ3N1Ym1pdFRvZG8nO1xuICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSAnU3VibWl0JztcblxuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoZGF0ZUlucHV0KTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKHN1Ym1pdEJ0bik7XG5cbiAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50KTtcblxuICByZXR1cm4gbW9kYWw7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxhYmVsKHRleHQsIGh0bWxGb3IpIHtcbiAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsIGh0bWxGb3IpO1xuICBsYWJlbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gIHJldHVybiBsYWJlbDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5wdXQodHlwZSwgaWQsIHJlcXVpcmVkKSB7XG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgaW5wdXQudHlwZSA9IHR5cGU7XG4gIGlucHV0LmlkID0gaWQ7XG4gIGlucHV0LnJlcXVpcmVkID0gcmVxdWlyZWQ7XG4gIHJldHVybiBpbnB1dDtcbn1cblxuZXhwb3J0IHsgY3JlYXRlTW9kYWwgfTtcbiIsImltcG9ydCB7IGNyZWF0ZU1vZGFsIH0gZnJvbSBcIi4vbW9kYWxcIjtcblxuZnVuY3Rpb24gcHJvamVjdEhhbmRsZXIoKSB7XG4gIGNvbnNvbGUubG9nKFwiRW50ZXJpbmcgcHJvamVjdEhhbmRsZXJcIik7XG5cbiAgY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvamVjdCcpO1xuXG4gIGlmIChhZGRQcm9qZWN0QnRuKSB7XG4gICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0Jyk7XG5cbiAgICBjb25zdCBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRW50ZXJpbmcgY2xpY2tIYW5kbGVyXCIpO1xuXG4gICAgICBpZiAocHJvamVjdERpdiAmJiBwcm9qZWN0RGl2LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWlucHV0LWNvbnRhaW5lcicpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5wdXQgZmllbGQgYWxyZWFkeSBjcmVhdGVkLiBFeGl0aW5nIGNsaWNrSGFuZGxlci5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGlucHV0RWxlbWVudC50eXBlID0gJ3RleHQnO1xuICAgICAgaW5wdXRFbGVtZW50LnBsYWNlaG9sZGVyID0gJ0VudGVyIHByb2plY3QgbmFtZSc7XG5cbiAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gJ1N1Ym1pdCc7XG4gICAgICBzdWJtaXRCdG4uY2xhc3NMaXN0LmFkZCgnc3VibWl0LWJ0bicpO1xuXG4gICAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIGNhbmNlbEJ0bi50ZXh0Q29udGVudCA9ICdDYW5jZWwnO1xuICAgICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ2NhbmNlbC1idG4nKTtcblxuICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1pbnB1dC1jb250YWluZXInKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnQpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN1Ym1pdEJ0bik7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcblxuICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3VibWl0IGJ1dHRvbiBjbGlja2VkXCIpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gaW5wdXRFbGVtZW50LnZhbHVlLnRyaW0oKTtcblxuICAgICAgICBpZiAocHJvamVjdE5hbWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnUHJvamVjdCBOYW1lOicsIHByb2plY3ROYW1lKTtcblxuICAgICAgICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgcHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1pdGVtJyk7XG4gICAgICAgICAgY29uc3QgcHJvamVjdE5hbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgIHByb2plY3ROYW1lU3Bhbi50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuXG4gICAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gJ3gnO1xuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdkZWxldGUtYnRuJyk7XG5cbiAgICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHByb2plY3RJdGVtLnJlbW92ZSgpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnByb2plY3QtdG9kby1saXN0W2RhdGEtcHJvamVjdD1cIiR7cHJvamVjdE5hbWV9XCJdYCk7XG4gICAgICAgICAgICBpZiAocHJvamVjdFRvZG9MaXN0KSB7XG4gICAgICAgICAgICAgIHByb2plY3RUb2RvTGlzdC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3ROYW1lU3Bhbik7XG4gICAgICAgICAgcHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgICAgICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuXG4gICAgICAgICAgY29uc3QgcHJvamVjdFRvZG9MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgcHJvamVjdFRvZG9MaXN0LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdG9kby1saXN0Jyk7XG4gICAgICAgICAgcHJvamVjdFRvZG9MaXN0LmRhdGFzZXQucHJvamVjdCA9IHByb2plY3ROYW1lO1xuXG4gICAgICAgICAgY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb0xpc3QnKTtcbiAgICAgICAgICBpZiAodG9kb0xpc3QpIHtcbiAgICAgICAgICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKHByb2plY3RUb2RvTGlzdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgYWRkVG9kb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgIGFkZFRvZG9CdG4udGV4dENvbnRlbnQgPSBgQWRkIFRvZG8gZm9yICR7cHJvamVjdE5hbWV9YDtcbiAgICAgICAgICBhZGRUb2RvQnRuLmNsYXNzTGlzdC5hZGQoJ2FkZC10b2RvLWJ0bicpO1xuXG4gICAgICAgICAgYWRkVG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBjcmVhdGVNb2RhbCgpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW5Db250ZW50JykuYXBwZW5kQ2hpbGQobW9kYWwpO1xuXG4gICAgICAgICAgICBjbG9zZU1vZGFsKG1vZGFsKTtcbiAgICAgICAgICAgIHN1Ym1pdFRvZG9Gb3JQcm9qZWN0KHByb2plY3ROYW1lLCBtb2RhbCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwcm9qZWN0VG9kb0xpc3QuYXBwZW5kQ2hpbGQoYWRkVG9kb0J0bik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBhIHByb2plY3QgbmFtZS4nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlKCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHByb2plY3REaXYpIHtcbiAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhcIkV4aXRpbmcgY2xpY2tIYW5kbGVyXCIpO1xuICAgIH07XG5cbiAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKFwiRXhpdGluZyBwcm9qZWN0SGFuZGxlclwiKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xuICBjb25zb2xlLmxvZyhcIkVudGVyaW5nIGNsb3NlTW9kYWxcIik7XG5cbiAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKTtcblxuICBpZiAoY2xvc2UpIHtcbiAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGNvbnNvbGUubG9nKCdDbG9zZSBidXR0b24gY2xpY2tlZCcpO1xuICAgICAgbW9kYWwucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zb2xlLmxvZyhcIkV4aXRpbmcgY2xvc2VNb2RhbFwiKTtcbn1cblxuZnVuY3Rpb24gc3VibWl0VG9kb0ZvclByb2plY3QocHJvamVjdE5hbWUsIG1vZGFsKSB7XG4gIGNvbnNvbGUubG9nKFwiRW50ZXJpbmcgc3VibWl0VG9kb0ZvclByb2plY3RcIik7XG5cbiAgY29uc3QgcHJvamVjdFRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnByb2plY3QtdG9kby1saXN0W2RhdGEtcHJvamVjdD1cIiR7cHJvamVjdE5hbWV9XCJdYCk7XG5cbiAgbGV0IHByb2plY3RUb2RvSXRlbVdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucHJvamVjdC13cmFwcGVyW2RhdGEtcHJvamVjdD1cIiR7cHJvamVjdE5hbWV9XCJdYCk7XG5cbiAgaWYgKCFwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyKSB7XG4gICAgcHJvamVjdFRvZG9JdGVtV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdC13cmFwcGVyJyk7XG4gICAgcHJvamVjdFRvZG9JdGVtV3JhcHBlci5kYXRhc2V0LnByb2plY3QgPSBwcm9qZWN0TmFtZTtcblxuICAgIC8vIEFwcGVuZCB0aGUgcHJvamVjdC1zcGVjaWZpYyB0b2RvIGxpc3QgdG8gdGhlIC50b2RvTGlzdCBkaXZcbiAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvTGlzdCcpO1xuICAgIGlmICh0b2RvTGlzdCkge1xuICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdFRvZG9JdGVtV3JhcHBlcik7XG4gICAgfVxuICAgIHByb2plY3RUb2RvTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyKTtcbiAgfVxuXG4gIGlmIChtb2RhbCAmJiBwcm9qZWN0VG9kb0l0ZW1XcmFwcGVyKSB7XG4gICAgcHJvamVjdFRvZG9MaXN0LmFwcGVuZENoaWxkKG1vZGFsKTtcblxuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRUb2RvJyk7XG5cbiAgICBjb25zdCBzdWJtaXRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coXCJTdWJtaXQgVG9kbyBidXR0b24gY2xpY2tlZFwiKTtcblxuICAgICAgY29uc3QgdG9kb05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kb05hbWUnKS52YWx1ZTtcbiAgICAgIGNvbnN0IHRvZG9EYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG9EYXRlJykudmFsdWU7XG5cbiAgICAgIGNvbnN0IHRvZG9JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0nKTtcblxuICAgICAgY29uc3QgY2hlY2ttYXJrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGNoZWNrbWFya1NwYW4uY2xhc3NMaXN0LmFkZCgnY2hlY2ttYXJrJyk7XG5cbiAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuXG4gICAgICBjb25zdCBuYW1lRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICBuYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IHRvZG9OYW1lO1xuXG4gICAgICBjb25zdCBkYXRlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIGRhdGVFbGVtZW50LnRleHRDb250ZW50ID0gdG9kb0RhdGU7XG5cbiAgICAgIGNoZWNrbWFya1NwYW4uYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQoY2hlY2ttYXJrU3Bhbik7XG4gICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChuYW1lRWxlbWVudCk7XG4gICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZChkYXRlRWxlbWVudCk7XG5cbiAgICAgIC8vIEFwcGVuZCB0aGUgdG9kbyBpdGVtIHRvIHRoZSBwcm9qZWN0LXNwZWNpZmljIHRvZG8gbGlzdFxuICAgICAgcHJvamVjdFRvZG9JdGVtV3JhcHBlci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG5cbiAgICAgIGNvbnN0IHNvcnRlZFRvZG9JdGVtcyA9IEFycmF5LmZyb20ocHJvamVjdFRvZG9JdGVtV3JhcHBlci5jaGlsZHJlbikuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBkYXRlQSA9IGEucXVlcnlTZWxlY3RvcigncCcpID8gbmV3IERhdGUoYS5xdWVyeVNlbGVjdG9yKCdwJykudGV4dENvbnRlbnQpIDogbnVsbDtcbiAgICAgICAgY29uc3QgZGF0ZUIgPSBiLnF1ZXJ5U2VsZWN0b3IoJ3AnKSA/IG5ldyBEYXRlKGIucXVlcnlTZWxlY3RvcigncCcpLnRleHRDb250ZW50KSA6IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XG4gICAgICB9KTtcblxuICAgICAgcHJvamVjdFRvZG9JdGVtV3JhcHBlci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgc29ydGVkVG9kb0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gSGlkZSBhbmQgcmVtb3ZlIHRoZSBtb2RhbFxuICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIG1vZGFsLnJlbW92ZSgpO1xuXG4gICAgICAvLyBSZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyIGFmdGVyIHN1Ym1pdHRpbmdcbiAgICAgIHN1Ym1pdEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdEhhbmRsZXIpO1xuICAgIH07XG5cbiAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdWJtaXRIYW5kbGVyKTtcblxuICAgIHByb2plY3RUb2RvSXRlbVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRDaGVja2JveCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGlmICh0YXJnZXRDaGVja2JveC50YWdOYW1lID09PSAnSU5QVVQnICYmIHRhcmdldENoZWNrYm94LnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgLy8gQWRkIGEgc21hbGwgZGVsYXkgZm9yIENTUyBhbmltYXRpb25cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSB0b2RvIGl0ZW0gd2hlbiB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZFxuICAgICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGFyZ2V0Q2hlY2tib3guY2xvc2VzdCgnLnRvZG8taXRlbScpO1xuICAgICAgICAgIGlmICh0b2RvSXRlbSkge1xuICAgICAgICAgICAgdG9kb0l0ZW0ucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyMDApOyAvLyBZb3UgY2FuIGFkanVzdCB0aGUgZGVsYXkgKGluIG1pbGxpc2Vjb25kcykgYXMgbmVlZGVkXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zb2xlLmxvZyhcIkV4aXRpbmcgc3VibWl0VG9kb0ZvclByb2plY3RcIik7XG59XG5cbi8vIEFkZCBldmVudCBsaXN0ZW5lciB0byBsb2FkIHRoZSBwcm9qZWN0SGFuZGxlciB3aGVuIHRoZSB3aW5kb3cgbG9hZHNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAvLyBDYWxsIHByb2plY3RIYW5kbGVyIHdoZW4gdGhlIHdpbmRvdyBsb2Fkc1xuICBwcm9qZWN0SGFuZGxlcigpO1xufSk7XG5cbmV4cG9ydCB7IHByb2plY3RIYW5kbGVyIH07XG4iLCJpbXBvcnQgeyBpbml0SGFuZGxlciB9IGZyb20gXCIuL2hvbWVIYW5kbGVyXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpe1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9ICdUby1EbyBMaXN0JztcblxuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlcigpIHtcbiAgY29uc3QgIGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xuICBjb25zdCBmb290ZXJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGZvb3RlckxpbmsuY2xhc3NMaXN0LmFkZCgnbGluaycpO1xuXG4gIGNvbnN0IGNvcHlyaWdodCA9IGNyZWF0ZUZvb3RlckxpbmsoJ0NvcHlyaWdodCA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY29weXJpZ2h0XCI+PC9pPiBKb3NoQWxsZW4nKTtcbiAgZm9vdGVyTGluay5hcHBlbmRDaGlsZChjb3B5cmlnaHQpO1xuICBmb290ZXIuYXBwZW5kQ2hpbGQoZm9vdGVyTGluayk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9vdGVyTGluayh0ZXh0KSB7XG4gIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICBsaW5rLmlubmVySFRNTCA9IHRleHQ7XG4gIHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZW50KCkge1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29udGVudCcpO1xuICBjb250ZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnbWFpbkNvbnRlbnQnKTtcbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNpZGVNZW51KGNvbnRlbnQpIHtcbiAgY29uc3Qgc2lkZU1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc2lkZU1lbnUuY2xhc3NMaXN0LmFkZCgnc2lkZU1lbnUnKTtcblxuICBmdW5jdGlvbiBjcmVhdGVCdXR0b24odGV4dCwgaWQpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGJ1dHRvbi5pZCA9IGlkO1xuICAgIHJldHVybiBidXR0b247XG4gIH1cblxuICBjb25zdCBob21lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGhvbWUuY2xhc3NMaXN0LmFkZCgnaG9tZScpO1xuICBob21lLmlubmVySFRNTCA9ICc8aDE+SG9tZTwvaDE+JztcbiAgY29uc3QgaW5ib3hCdG4gPSBjcmVhdGVCdXR0b24oJ0luYm94JywgJ2luYm94Jyk7XG4gIGhvbWUuYXBwZW5kQ2hpbGQoaW5ib3hCdG4pO1xuICBob21lLmFwcGVuZENoaWxkKGNyZWF0ZUJ1dHRvbignVG9kYXknLCAndG9kYXknKSk7XG4gIGhvbWUuYXBwZW5kQ2hpbGQoY3JlYXRlQnV0dG9uKCdUaGlzIFdlZWsnLCAndGhpcy13ZWVrJykpO1xuXG4gIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XG4gIHByb2plY3QuaW5uZXJIVE1MID0gJzxoMT5Qcm9qZWN0PC9oMT4nO1xuICBjb25zdCBhZGRQcm9qZWN0QnRuID0gY3JlYXRlQnV0dG9uKCcrIEFkZCBQcm9qZWN0JywgJ2FkZC1wcm9qZWN0Jyk7XG4gIHByb2plY3QuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdEJ0bik7XG5cbiAgc2lkZU1lbnUuYXBwZW5kQ2hpbGQoaG9tZSk7XG4gIHNpZGVNZW51LmFwcGVuZENoaWxkKHByb2plY3QpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKHNpZGVNZW51KTsgLy8gQXBwZW5kIHNpZGVNZW51IHRvIGNvbnRlbnRcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250ZW50KTsgLy8gQXBwZW5kIGNvbnRlbnQgdG8gdGhlIGJvZHlcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVUb2RvTGlzdCgpIHtcbiAgY29uc3QgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0b2RvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RvZG9MaXN0Jyk7IC8vIE5ldyBjb250YWluZXIgZm9yIHRoZSB0b2RvIGxpc3RcblxuICBjb25zdCB0b2RvQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHRvZG9CdG4uY2xhc3NMaXN0LmFkZCgndG9kb0J0bicpO1xuICB0b2RvQnRuLnRleHRDb250ZW50ID0gJ0FkZCBUby1EbyBMaXN0JztcblxuICB0b2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9CdG4pO1xuICAvLyBjb250ZW50LmFwcGVuZENoaWxkKHRvZG9Db250YWluZXIpOyAvLyBEb24ndCBhcHBlbmQgZGlyZWN0bHkgdG8gY29udGVudFxuXG4gIHJldHVybiB0b2RvQ29udGFpbmVyOyAvLyBSZXR1cm4gdGhlIHRvZG8gY29udGFpbmVyXG59XG5cblxuZnVuY3Rpb24gaW5pdFdlYnNpdGUoKSB7XG4gIGNyZWF0ZUhlYWRlcigpO1xuICBjb25zdCBjb250ZW50ID0gY3JlYXRlQ29udGVudCgpOyAvLyBDcmVhdGUgY29udGVudCBlbGVtZW50XG4gIGNvbnN0IHRvZG9Db250YWluZXIgPSBjcmVhdGVUb2RvTGlzdCgpOyAvLyBDcmVhdGUgdG9kbyBjb250YWluZXJcbiAgY3JlYXRlU2lkZU1lbnUoY29udGVudCk7IC8vIFBhc3MgY29udGVudCB0byBjcmVhdGVTaWRlTWVudVxuICBjb250ZW50LmFwcGVuZENoaWxkKHRvZG9Db250YWluZXIpOyAvLyBBcHBlbmQgdG9kbyBjb250YWluZXIgdG8gY29udGVudFxuICBpbml0SGFuZGxlcigpO1xuICBjcmVhdGVGb290ZXIoKTtcbn1cblxuXG5cbmV4cG9ydCB7IGluaXRXZWJzaXRlLCBjcmVhdGVDb250ZW50IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGluaXRXZWJzaXRlIH0gZnJvbSBcIi4vd2Vic2l0ZVwiO1xuXG5pbml0V2Vic2l0ZSgpO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=