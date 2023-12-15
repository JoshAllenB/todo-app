import { createModal } from "./modal";

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
            const modal = createModal();
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

export { projectHandler };
