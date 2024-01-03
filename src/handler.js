import { createModal } from "./modal";

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

export {
  initHandler,
  filterTodoItems,
  activeBtn,
  createButton,
  switchSection,
  closeModal,
  createTodoItem,
};
