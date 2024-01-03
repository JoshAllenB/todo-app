import {
  activeBtn,
  closeModal,
  createButton,
  switchSection,
  createTodoItem,
  filterTodoItems,
} from "./handler";
import { createModal } from "./modal";

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
          switchSection("project");

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

  const addTodoBtn = createButton(
    `Add Todo for ${projectName}`,
    "add-todo-btn"
  );

  addTodoBtn.addEventListener("click", () => {
    const modal = createModal();
    document.getElementById("mainContent").appendChild(modal);
    closeModal(modal);
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

      const todoItem = createTodoItem(todoName, todoDate);

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
            filterTodoItems();
          }
        }, 200);
      }
    });
  }
}

function initProject() {
  projectHandler();
}

export { initProject };