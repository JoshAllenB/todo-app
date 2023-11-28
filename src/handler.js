import { createModal } from "./modal";

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

        // Check if the clicked button is the project button
        if (button.id === 'add-project') {
          // Handle the project button click
          projectHandler();
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
      const modal = createModal();
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
          // Remove the todo item when the checkbox is checked
          todoItem.remove();
        }
      });
    });
  }
}

function projectHandler() {
  const addProjectBtn = document.getElementById('add-project');

  if (addProjectBtn) {
    // Find the project div within the sideMenu
    const projectDiv = document.querySelector('.project');

    const clickHandler = function() {
      // Check if the input field is already created
      if (projectDiv && projectDiv.querySelector('.project-input-container')) {
        return;
      }

      // Create an input element
      const inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.placeholder = 'Enter project name';

      // Create a submit button
      const submitBtn = document.createElement('button');
      submitBtn.textContent = 'Submit';
      submitBtn.classList.add('submit-btn'); // Add a class for styling

      // Create a cancel button
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.classList.add('cancel-btn'); // Add a class for styling

      // Create a container div for the input, submit, and cancel buttons
      const container = document.createElement('div');
      container.classList.add('project-input-container'); // Updated class name
      container.appendChild(inputElement);
      container.appendChild(submitBtn);
      container.appendChild(cancelBtn);

      // Add event listener to the submit button
      submitBtn.addEventListener('click', function() {
        const projectName = inputElement.value.trim(); // Trim leading and trailing whitespaces

        // Check if the project name is not empty
        if (projectName) {
          // Do something with the project name (e.g., display it in console)
          console.log('Project Name:', projectName);

          // Create a new div to represent the project item
          const projectItem = document.createElement('div');
          projectItem.classList.add('project-item'); // Add the same class for styling

          // Create a span with the project name
          const projectNameSpan = document.createElement('span');
          projectNameSpan.textContent = projectName;

          // Create a delete button
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'x';
          deleteBtn.classList.add('delete-btn'); // Add a class for styling

          // Add event listener to the delete button
          deleteBtn.addEventListener('click', function() {
            // Remove the project item when the delete button is clicked
            projectItem.remove();
            checkScrollBar(); // Check if scrollbar is needed after removal
          });

          // Append the span and delete button to the project item
          projectItem.appendChild(projectNameSpan);
          projectItem.appendChild(deleteBtn);

          // Append the project item to the common wrapper div
          projectDiv.appendChild(projectItem);

          // Remove the container from the project div
          container.remove();
          checkScrollBar(); // Check if scrollbar is needed after addition
        } else {
          // Display an alert or some indication to the user that the project name is required
          alert('Please enter a project name.');
        }
      });

      // Add event listener to the cancel button
      cancelBtn.addEventListener('click', function() {
        // Remove the container from the project div without creating a project
        container.remove();
      });

      // Append the container to the project div
      if (projectDiv) {
        projectDiv.appendChild(container);
        checkScrollBar(); // Check if scrollbar is needed after addition
      }
    };

    addProjectBtn.addEventListener('click', clickHandler);
  }

  // Function to check if scrollbar is needed and apply CSS style
  function checkScrollBar() {
    const projectItems = projectDiv.querySelectorAll('.project-item');
    const maxProjectsBeforeScrollBar = 5; // Adjust the number of projects before scrollbar appears

    if (projectItems.length > maxProjectsBeforeScrollBar) {
      projectDiv.style.overflowY = 'scroll';
    } else {
      projectDiv.style.overflowY = 'hidden';
    }
  }
}

function initHandler() {
  activeBtn();
  inboxHandler();
  closeModal();
  submitTodo();
  projectHandler();
}

export { initHandler, inboxHandler, projectHandler };