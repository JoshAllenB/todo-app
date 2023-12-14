import { createModal } from "./modal";
import { projectHandler } from "./projHandler";

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
          projectHandler();
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
      const { modal } = createModal();
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
  const { modal, alertMessage } = createModal(); // Create modal and alertMessage

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

export { initHandler, inboxHandler };
