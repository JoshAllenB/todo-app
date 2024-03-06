import { startOfWeek, endOfWeek, isToday, isWithinInterval } from "date-fns";
import Handler from "./handler";

class Filter {
  constructor() {
    this.handler = new Handler();
    this.loadLocalStorage();
    this.todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    this.projectsData = JSON.parse(localStorage.getItem("projects")) || {};

    console.log("Projects data during initialization:", this.projectsData);
  }

  loadLocalStorage() {
    const todoListData = JSON.parse(localStorage.getItem("todoList")) || [];
    const projectsData = JSON.parse(localStorage.getItem("projects")) || {};
    console.log("projects data structure", projectsData);

    const todoDueToday = this.filterDueToday(todoListData);
    const projectDueToday = this.filterProjectsDueToday(projectsData);
    const dueTodayItems = [...todoDueToday, ...projectDueToday];
    console.log("due today", dueTodayItems);

    const todoDueThisWeek = this.filterDueThisWeek(todoListData);
    const projectDueThisWeek = this.filteredProjectsDueThisWeek(projectsData);

    const dueThisWeekItems = [...todoDueThisWeek, ...projectDueThisWeek];
    console.log("due this week", dueThisWeekItems);
  }

  filterDueToday(todoList) {
    return todoList.filter((item) => isToday(new Date(item.date)));
  }

  filterDueThisWeek(todoList) {
    const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    return todoList.filter((item) => {
      const dueDate = new Date(item.date);
      return (
        !isToday(dueDate) &&
        isWithinInterval(dueDate, {
          start: startOfWeekDate,
          end: endOfWeekDate,
        })
      );
    });
  }

  /**
   * Filters the projects that have items due today.
   *
   * @param {Object} projects - The projects data.
   * @returns {Object} The filtered projects.
   */
  filterProjectsDueToday(projects) {
    const today = new Date();

    const filteredProject = [];

    for (const projectName in projects) {
      const projectItems = projects[projectName];
      const dueTodayItems = projectItems.filter((item) =>
        isToday(new Date(item.date))
      );

      if (dueTodayItems.length > 0) {
        filteredProject.push({
          projectName: projectName,
          todos: dueTodayItems,
        });
      }
    }
    return filteredProject;
  }

  filteredProjectsDueThisWeek(projects) {
    const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    const filteredProject = [];

    for (const projectName in projects) {
      const projectItems = projects[projectName];
      const dueThisWeekItems = projectItems.filter((item) => {
        const dueDate = new Date(item.date);
        return (
          !isToday(dueDate) &&
          isWithinInterval(dueDate, {
            start: startOfWeekDate,
            end: endOfWeekDate,
          })
        );
      });

      if (dueThisWeekItems.length > 0) {
        filteredProject.push({
          projectName: projectName,
          todos: dueThisWeekItems,
        });
      }
    }
    return filteredProject;
  }

  renderFilteredTodoList(filteredTodoItems, container) {
    if (!container) {
      console.error("Container is null.");
      return;
    }

    let itemContainer = container.querySelector(".itemContainer");
    if (!itemContainer) {
      itemContainer = document.createElement("div");
      itemContainer.classList.add("itemContainer");
      container.appendChild(itemContainer);
    } else {
      itemContainer.innerHTML = "";
    }

    filteredTodoItems.forEach((item) => {
      if (item.todos) {
        // This is a project item
        const projectName = document.createElement("h3");
        projectName.textContent = `Project: ${item.projectName}`;
        itemContainer.appendChild(projectName);

        item.todos.forEach((todo) => {
          const nameLabel = document.createElement("h5");
          const dateLabel = document.createElement("h5");

          const todoItem = document.createElement("li");
          todoItem.classList.add(`todo-${todo.id}`, "todoItem");

          const checkboxContainer = this.handler.createCheckboxContainer(todo);
          const checkbox = checkboxContainer.querySelector(
            "input[type='checkbox']"
          );

          // Set ID for the checkbox
          checkbox.id = `${item.projectName}-todo-${todo.id}`;

          checkbox.addEventListener("change", () => {
            console.log("checkbox checked in:", checkbox.id);
            if (checkbox.checked) {
              const projectName = checkbox.id.split("-")[0]; // Extract projectName from checkbox ID
              setTimeout(() => {
                console.log("projects data after checked:", this.projectsData);
                console.log(
                  "removing todo in",
                  checkbox.id,
                  "todo removed:",
                  todo.id,
                  "project name:",
                  projectName
                );
                this.removeTodoFromProject(todo.id, projectName); // Pass projectName to removeTodoItem
              }, 500);
            }
          });

          nameLabel.textContent = todo.name;
          dateLabel.textContent = todo.date;

          const priorityIcon = this.handler.createPriorityIcon(todo, todoItem);
          priorityIcon.addEventListener("click", () => {
            this.togglePriority(todo.id, projectName);
          });

          todoItem.appendChild(checkboxContainer);
          todoItem.appendChild(nameLabel);
          todoItem.appendChild(dateLabel);
          todoItem.appendChild(priorityIcon);

          itemContainer.appendChild(todoItem);
        });
      } else {
        // This is a todo item from todoList
        const nameLabel = document.createElement("h5");
        const dateLabel = document.createElement("h5");

        const todoItem = document.createElement("li");
        todoItem.classList.add(`todo-${item.id}`, "todoItem");

        const checkboxContainer = this.handler.createCheckboxContainer(item);
        const checkbox = checkboxContainer.querySelector(
          "input[type='checkbox']"
        );

        // Set ID for the checkbox
        checkbox.id = `todo-checkbox-${item.id}`;

        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            setTimeout(() => {
              this.removeTodoItem(item.id);
              console.log("item checked", item.id);
            }, 500);
          }
        });

        nameLabel.textContent = item.name;
        dateLabel.textContent = item.date;

        const priorityIcon = this.handler.createPriorityIcon(item, todoItem);
        priorityIcon.addEventListener("click", () => {
          this.togglePriority(item.id);
        });

        todoItem.appendChild(checkboxContainer);
        todoItem.appendChild(nameLabel);
        todoItem.appendChild(dateLabel);
        todoItem.appendChild(priorityIcon);

        itemContainer.appendChild(todoItem);
      }
    });
  }

  // Method to update the DOM with the filtered todo list
  updateTodoListUI(filteredTodoItems, container) {
    container.innerHTML = ""; // Clear the container
    filteredTodoItems.forEach((item) => {
      const todoItem = document.createElement("li");
      todoItem.textContent = item.name;
      container.appendChild(todoItem);
    });
  }

  removeTodoItem(todoId) {
    const todoIndex = this.todoList.findIndex((item) => item.id === todoId);
    if (todoIndex !== -1) {
      this.todoList.splice(todoIndex, 1);
      this.saveTodoList();
      this.reorderTodo();
      console.log(`Todo removed from todoList: ${todoId}`);
    } else {
      console.log(`Todo with ID ${todoId} not found in todoList.`);
    }
  }

  removeTodoFromProject(todoId, projectName) {
    console.log("projects data before removal:", this.projectsData);
    const projectItems = this.projectsData[projectName];
    console.log(`removing todo with ID ${todoId} from project: ${projectName}`);
    if (!projectItems) {
      console.log(`Project ${projectName} not found.`);
      return;
    }

    const todoIndex = projectItems.findIndex((item) => item.id === todoId);
    if (todoIndex !== -1) {
      projectItems.splice(todoIndex, 1);
      this.saveProjectsData();
      this.reorderTodo();
      console.log(`Todo removed from project: ${todoId} in ${projectName}`);
    } else {
      console.log(
        `Todo with ID ${todoId} not found in project ${projectName}.`
      );
    }
    this.renderFilteredTodoList();
  }

  togglePriority(todoId) {
    // Check if the todo is in the todoList
    const todoInTodoList = this.todoList.find((item) => item.id === todoId);
    if (todoInTodoList) {
      // Toggle the priority of the todo in the todoList
      todoInTodoList.priority = !todoInTodoList.priority;
      todoInTodoList.isPriority = todoInTodoList.priority;
      this.saveTodoList();
      return;
    }

    // Check if the todo is in any project
    for (const projectName in this.projectsData) {
      const projectItems = this.projectsData[projectName];
      const todoInProject = projectItems.find((item) => item.id === todoId);
      if (todoInProject) {
        // Toggle the priority of the todo in the project
        todoInProject.priority = !todoInProject.priority;
        todoInProject.isPriority = todoInProject.priority;
        this.saveProjectsData();
        break;
      }
    }
  }

  reorderTodo() {
    // Create a new array to hold all todo items
    const allTodoItems = [];

    // Push all todo items from todoList into the array
    this.todoList.forEach((todo) => allTodoItems.push(todo));

    // Push all todo items from projectsData into the array
    for (const projectName in this.projectsData) {
      const projectItems = this.projectsData[projectName];
      projectItems.forEach((item) => allTodoItems.push(item));
    }

    // Sort the array based on priority and date
    allTodoItems.sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      return new Date(a.date) - new Date(b.date);
    });

    // Clear the existing container
    const itemContainer = document.querySelector(".itemContainer");
    itemContainer.innerHTML = "";

    // Render the sorted todo items
    allTodoItems.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.textContent = todo.name;
      itemContainer.appendChild(todoItem);
    });
  }

  saveTodoList() {
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
  }

  saveProjectsData() {
    localStorage.setItem("projects", JSON.stringify(this.projectsData));
  }
}

export default Filter;
