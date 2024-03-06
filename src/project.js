import Handler from "./handler";

class Project {
  constructor() {
    this.handler = new Handler();
    this.projects = {};
    this.projectIdCounter = 0;
    this.projectContainer = null;
    document.addEventListener("DOMContentLoaded", () => {
      this.loadProjects();
      this.loadTodos();
    });
  }

  /**
   * Load the projects from local storage and display them in the UI.
   */
  loadProjects() {
    const projectsData = JSON.parse(localStorage.getItem("projects")) || {};
    this.projects = projectsData;

    this.recreateProjectButton();

    for (const projectName in this.projects) {
      if (this.projects.hasOwnProperty(projectName)) {
        /**
         * Get the project data and create the todo form container for the project.
         * @param {string} projectName - The name of the project
         */
        const projectData = this.projects[projectName];
        const todoFormContainer = this.createProjectTodoForm(projectName);
        const itemContainer = todoFormContainer.querySelector(".itemContainer");

        /**
         * Loop through the project data and create a todo item for each todo.
         * @param {Object} todo - The todo object
         * @param {string} projectName - The name of the project
         * @param {HTMLElement} itemContainer - The item container element
         */
        projectData.forEach((todo) => {
          this.createProjectTodoItem(todo, projectName, itemContainer);
        });
      }
    }
  }

  /**
   * Load the todos from local storage and display them in the UI.
   */
  loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || {};

    Object.keys(storedTodos).forEach((projectName) => {
      if (this.projects[projectName]) {
        // Check if the project exists
        this.projects[projectName] = storedTodos[projectName]; // Update project todos
        this.projects[projectName].forEach((todo) => {
          this.createProjectTodoItem(todo, projectName);
        });
      } else {
        this.projects[projectName] = storedTodos[projectName]; // Add project with its todos
      }
    });
  }

  /**
   * Set the project container element
   * @param {HTMLElement} container - The project container element
   */
  setProjectContainer(container) {
    this.projectContainer = container;
  }

  /**
   * Creates a new project name input element
   */
  createProjectName() {
    const project = document.querySelector(".project");
    const projList = document.querySelector(".projectList");

    let formContainer = document.querySelector(".projFormContainer");
    let todoFormCreated = false;

    if (!formContainer) {
      formContainer = document.createElement("div");
      formContainer.classList.add("projFormContainer");

      const projectForm = document.createElement("form");
      projectForm.classList.add("projForm");

      const projName = this.handler.createInput("text", "Project Name");
      projName.classList.add("projName");

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("btnContainer");

      const submit = this.handler.createButton("Submit", "submitProj");

      const cancel = this.handler.createButton("Cancel", "cancelProj");

      projectForm.appendChild(projName);
      btnContainer.appendChild(submit);
      btnContainer.appendChild(cancel);
      formContainer.appendChild(projectForm);
      formContainer.appendChild(btnContainer);

      /**
       * Event listener for the submit button, creates a new project with the given name
       * @param {Event} event - The submit event
       */
      submit.addEventListener("click", (event) => {
        event.preventDefault();
        const projectName = projName.value.trim();
        if (projectName !== "") {
          let projBtn = document.getElementById(projectName);

          if (!projBtn) {
            projBtn = document.createElement("div");
            projBtn.classList.add("projBtn");
            projBtn.id = projectName;

            projBtn.addEventListener("click", () => {
              if (!todoFormCreated) {
                this.showProjectForm(projectName);
                this.createProjectTodoForm(projectName);
                todoFormCreated = true;
                console.log("project btn clicked");
              } else {
                this.hideProjectForm();
                this.showProjectForm(projectName);
              }
            });
            projList.appendChild(projBtn);
            this.saveProject(projectName);
          }

          const projectButton = document.createElement("button");
          projectButton.textContent = projectName;
          projectButton.classList.add("projectBtn");
          projectButton.id = projectName;

          const deleteProj = document.createElement("button");
          deleteProj.textContent = "X";
          deleteProj.classList.add("deleteBtn");
          deleteProj.id = `${projectName}-deleteBtn`;

          /**
           * Event listener for the delete project button, removes the project and its form from the DOM
           * @param {Event} event - The delete project event
           */
          deleteProj.addEventListener("click", (event) => {
            const projectId = deleteProj.id;
            const projectName = projectId.replace("-deleteBtn", "");
            const projBtn = document.getElementById(projectName);

            projBtn.remove();

            const todoFormContainer = document.getElementById(
              `${projectName}-form`
            );

            if (todoFormContainer) {
              todoFormContainer.remove();
            }

            delete this.projects[projectName];
            this.removeProject(projectName);
          });

          projBtn.appendChild(projectButton);
          projBtn.appendChild(deleteProj);

          formContainer.remove();
        }
      });

      /**
       * Event listener for the cancel button, removes the project form from the DOM
       * @param {Event} event - The cancel event
       */
      cancel.addEventListener("click", (event) => {
        event.preventDefault();
        formContainer.remove();
      });

      project.appendChild(formContainer);
      this.recreateProjectButton();
    }
  }

  /**
   * Show the project form for the given project name
   * @param {string} projectName - The name of the project
   */
  showProjectForm(projectName) {
    const allTodoForms = document.querySelectorAll(".projectTodoContainer");
    allTodoForms.forEach((form) => {
      form.classList.add("hidden");
    });

    const todoForm = document.getElementById(`${projectName}-form`);
    if (todoForm) {
      todoForm.classList.remove("hidden");
    }
  }

  /**
   * Hides all the project forms
   */
  hideProjectForm() {
    const allTodoForm = document.querySelectorAll(".projectTodoContainer");
    allTodoForm.forEach((form) => {
      form.classList.add("hidden");
    });
  }

  /**
   * Creates a new project form for the given project name
   * @param {string} projectName - The name of the project
   */
  createProjectTodoForm(projectName) {
    const projectContainer = document.querySelector(".projectContainer");
    const todoFormContainerId = `${projectName}-form`;

    let todoFormContainer = document.getElementById(todoFormContainerId);

    if (!todoFormContainer) {
      todoFormContainer = document.createElement("div");
      todoFormContainer.classList.add("projectTodoContainer");
      todoFormContainer.id = todoFormContainerId;

      const todoContainer = this.handler.createTodoContainer();

      const itemContainer = this.handler.createItemContainer();
      itemContainer.id = `${projectName}-itemContainer`;

      const formContainer = document.createElement("div");
      formContainer.classList.add("formContainer");

      const form = document.createElement("form");
      form.classList.add("todo-form");
      form.id = `${projectName}-form`;

      const nameInput = this.handler.createInput("text", "Todo Name", true);
      nameInput.classList.add("name-input");
      nameInput.id = `${projectName}-input`;

      const dateInput = this.handler.createInput("date", "", true);
      dateInput.classList.add("date-input");
      dateInput.id = `${projectName}-date-input`;

      const addBtn = this.handler.createButton("Add Todo", "addBtn");
      addBtn.classList.add("addBtn");
      addBtn.id = `${projectName}-addBtn`;
      addBtn.addEventListener("click", (event) => {
        event.preventDefault();
        this.reorderTodo();
        this.createProjectTodo(projectName);
        console.log(this.projects[projectName]);
      });

      form.appendChild(nameInput);
      form.appendChild(dateInput);
      form.appendChild(addBtn);
      formContainer.appendChild(form);
      todoContainer.appendChild(formContainer);
      todoContainer.appendChild(itemContainer);

      todoFormContainer.appendChild(todoContainer);

      projectContainer.appendChild(todoFormContainer);
    }

    if (!this.projects[projectName]) {
      this.projects[projectName] = [];
    }

    return todoFormContainer;
  }

  /**
   * Creates a new project todo with the given project name
   * @param {string} projectName - The name of the project
   */
  createProjectTodo(projectName) {
    const nameInput = document.querySelector(`#${projectName}-input`);
    const dateInput = document.querySelector(`#${projectName}-date-input`);

    /**
     * The project todo object
     * @typedef {Object} ProjectTodo
     * @property {number} id - The id of the todo
     * @property {string} name - The name of the todo
     * @property {string} proj - The name of the project
     * @property {string} date - The date of the todo
     */

    /**
     * Creates a new project todo object
     * @param {string} projectName - The name of the project
     * @returns {ProjectTodo} The project todo object
     */
    const projectTodo = {
      id: this.projectIdCounter++,
      name: nameInput.value,
      proj: projectName,
      date: dateInput.value,
    };

    if (!this.projects[projectName]) {
      this.projects[projectName] = [];
    }

    this.projects[projectName].push(projectTodo);
    this.projects[projectName].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    nameInput.value = "";
    dateInput.value = "";

    const itemContainer = document.getElementById(
      `${projectName}-itemContainer`
    );

    if (itemContainer) {
      itemContainer.innerHTML = "";

      this.projects[projectName].forEach((todo) => {
        this.createProjectTodoItem(todo, projectName);
      });
    } else {
      console.error(
        "Item Container with ID ${projectName}-itemContainer not found"
      );
    }
    this.saveProjectTodos();
    return projectTodo;
  }

  /**
   * Creates a new project todo item with the given project name
   * @param {Object} todo - The todo object
   * @param {string} projectName - The name of the project
   */
  createProjectTodoItem(todo, projectName) {
    const nameLabel = document.createElement("h5");
    const dateLabel = document.createElement("h5");

    const todoItem = document.createElement("li");
    todoItem.classList.add(`todo-${todo.id}`, "todoItem");

    /**
     * Creates a new checkbox container for the given todo
     * @param {Object} todo - The todo object
     * @returns {HTMLDivElement} The checkbox container element
     */
    const checkboxContainer = this.handler.createCheckboxContainer(todo);

    /**
     * The checkbox element within the container
     * @type {HTMLInputElement}
     */
    const checkbox = checkboxContainer.querySelector("input[type='checkbox']");

    /**
     * Event listener for the checkbox, removes the todo item if the checkbox is checked
     */
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        setTimeout(() => {
          this.removeTodoItem(todo.id, projectName);
        }, 500);
      }
    });

    nameLabel.textContent = todo.name;
    dateLabel.textContent = todo.date;

    /**
     * Creates a new priority icon for the given todo and todo item
     * @param {Object} todo - The todo object
     * @param {HTMLElement} todoItem - The todo item element
     * @returns {HTMLElement} The priority icon element
     */
    const priorityIcon = this.handler.createPriorityIcon(todo, todoItem);

    /**
     * Event listener for the priority icon, toggles the priority of the todo
     */
    priorityIcon.addEventListener("click", () => {
      this.togglePriority(todo.id, projectName);
    });

    todoItem.appendChild(checkboxContainer);
    todoItem.appendChild(nameLabel);
    todoItem.appendChild(dateLabel);
    todoItem.appendChild(priorityIcon);

    const itemContainer = document.getElementById(
      `${projectName}-itemContainer`
    );

    itemContainer.appendChild(todoItem);
  }

  /**
   * Removes a todo item from the given project
   * @param {number} todoId - The id of the todo item
   * @param {string} projectName - The name of the project
   */
  removeTodoItem(todoId, projectName) {
    const projectTodos = this.projects[projectName];
    if (projectTodos) {
      const index = projectTodos.findIndex((item) => item.id === todoId);
      if (index !== -1) {
        projectTodos.splice(index, 1);
        this.reorderTodo(projectName);
        // Update local storage
        this.saveProjectTodos();
      }
    }
  }

  /**
   * Toggles the priority of a todo with the given id in the given project
   * @param {number} todoId - The id of the todo
   * @param {string} projectName - The name of the project
   */
  togglePriority(todoId, projectName) {
    const projectTodos = this.projects[projectName];
    if (projectTodos) {
      const todo = projectTodos.find((item) => item.id === todoId);
      if (todo) {
        todo.priority = !todo.priority;
        this.reorderTodo(projectName);
        // Update local storage
        this.saveProjectTodos();
      }
    }
  }

  /**
   * Reorders the todo items in the given project based on their priority and date.
   * If two todos have the same priority, the one with the earliest date is moved to the top.
   * @param {string} projectName - The name of the project
   */
  reorderTodo(projectName) {
    if (this.projects[projectName]) {
      this.projects[projectName].sort((a, b) => {
        if (a.priority === b.priority) {
          return new Date(a.date) - new Date(b.date);
        }
        // If only one has priority, prioritize it
        return a.priority ? -1 : 1;
      });

      const itemContainer = document.getElementById(
        `${projectName}-itemContainer`
      );
      itemContainer.innerHTML = "";

      this.projects[projectName].forEach((todo) => {
        this.createProjectTodoItem(todo, projectName);
      });
    }
  }

  /**
   * Saves the project data to local storage
   */
  saveProjectTodos() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  /**
   * Removes a project from the project list
   * @param {string} projectName - The name of the project to remove
   */
  removeProject(projectName) {
    delete this.projects[projectName]; // Remove the project from the projects object
    this.saveProjectTodos(); // Update local storage
  }

  /**
   * Saves the project data to local storage
   */
  saveProjectsToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  /**
   * Saves a project to the list of projects
   * @param {string} projectName - The name of the project to save
   */
  saveProject(projectName) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    if (!Array.isArray(projects)) {
      projects = [];
    }
    if (!projects.includes(projectName)) {
      projects.push(projectName);
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }

  /**
   * Creates a new project button and adds it to the DOM
   */
  recreateProjectButton() {
    const projList = document.querySelector(".projectList");
    let todoFormCreated = false;

    const projectNames = Object.keys(this.projects);

    // Clear existing project buttons
    projList.innerHTML = "";

    for (const projectName of projectNames) {
      const projBtn = document.createElement("div");
      projBtn.classList.add("projBtn");
      projBtn.id = projectName;

      projBtn.addEventListener("click", () => {
        if (!todoFormCreated) {
          this.showProjectForm(projectName);
          this.createProjectTodoForm(projectName);
          todoFormCreated = true;
          console.log("project btn clicked");
        } else {
          this.hideProjectForm();
          this.showProjectForm(projectName);
        }
      });

      projList.appendChild(projBtn);

      const projectButton = document.createElement("button");
      projectButton.textContent = projectName;
      projectButton.classList.add("projectBtn");
      projectButton.id = projectName;

      const deleteProj = this.handler.createButton("X", "deleteBtn");

      deleteProj.addEventListener("click", () => {
        projBtn.remove();

        const todoFormContainer = document.getElementById(
          `${projectName}-form`
        );

        if (todoFormContainer) {
          todoFormContainer.remove();
        }

        delete this.projects[projectName];
        // Remove project name from localStorage
        this.removeProject(projectName);
      });

      projBtn.appendChild(projectButton);
      projBtn.appendChild(deleteProj);
    }

    return true;
  }

  /**
   * Exports the project data as an array of objects, where each object represents a project and contains an array of todos for that project
   * @returns {Object[]} An array of objects, where each object represents a project and contains an array of todos for that project
   */
  exportProjects() {
    return Object.keys(this.projects).map((projectName) => ({
      name: projectName,
      todos: this.projects[projectName],
    }));
  }
}

export default Project;
