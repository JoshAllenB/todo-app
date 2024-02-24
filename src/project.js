import Handler from "./handler";

class Project {
  constructor() {
    this.handler = new Handler();
    this.projects = {};
    this.projectIdCounter = 0;
    this.projectContainer = null;
  }

  /* 
  TODO For the project:
  ! Fix the creating todoItem, it does not create todoItem on different div/container
  ! Create a logic where it checks which container is active for the addBtn in the form.
  * Try the subArray approach for each project created add logic to access that subArray for each project.
  * if above does not work, simplify the code, no need to create todo in the project
  * use inbox input field to create todoItem for the project.
  */

  setProjectContainer(container) {
    this.projectContainer = container;
  }

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
          }

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
          });

          projBtn.appendChild(projectButton);
          projBtn.appendChild(deleteProj);

          formContainer.remove();
        }
      });

      cancel.addEventListener("click", (event) => {
        event.preventDefault();
        formContainer.remove();
      });

      project.appendChild(formContainer);
    }
  }

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

  hideProjectForm() {
    const allTodoForm = document.querySelectorAll(".projectTodoContainer");
    allTodoForm.forEach((form) => {
      form.classList.add("hidden");
    });
  }

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

  createProjectTodo(projectName) {
    const nameInput = document.querySelector(`#${projectName}-input`);
    const dateInput = document.querySelector(`#${projectName}-date-input`);

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
    console.log(this.projects[projectName]);

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
  }

  createProjectTodoItem(todo, projectName) {
    const nameLabel = document.createElement("h5");
    const dateLabel = document.createElement("h5");

    const todoItem = document.createElement("li");
    todoItem.classList.add(`todo-${todo.id}`, "todoItem");

    const checkboxContainer = this.handler.createCheckboxContainer(todo);
    const checkbox = checkboxContainer.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        setTimeout(() => {
          this.removeTodoItem(todo.id, projectName);
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

    const itemContainer = document.getElementById(
      `${projectName}-itemContainer`
    );

    itemContainer.appendChild(todoItem);
    console.log(itemContainer);
    console.log(this.projects);
  }

  removeTodoItem(todoId, projectName) {
    const projectTodos = this.projects[projectName];
    if (projectTodos) {
      const index = projectTodos.findIndex((item) => item.id === todoId);
      if (index !== -1) {
        projectTodos.splice(index, 1);
        this.reorderTodo(projectName);
      }
    }
  }

  togglePriority(todoId, projectName) {
    const projectTodos = this.projects[projectName];
    if (projectTodos) {
      const todo = projectTodos.find((item) => item.id === todoId);
      if (todo) {
        todo.priority = !todo.priority;
        this.reorderTodo(projectName);
        console.log("priority toggled");
      }
    }
  }

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
}

export default Project;
