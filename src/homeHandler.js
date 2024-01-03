import { createModal } from "./modal";
import {
  closeModal,
  filterTodoItems,
  switchSection,
  createTodoItem,
} from "./handler";

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
      switchSection("project");
      todoBtn.style.display = "none";
    } else {
      switchSection("home");
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
    filterTodoItems("inbox");
  }

  function handleTodoButtonClick() {
    const modal = createModal();
    content.appendChild(modal);
    closeModal(modal); // Add event listener after appending the modal
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
        const todoItem = createTodoItem(todoName, todoDate);
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

        filterTodoItems();
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

export { initHome };