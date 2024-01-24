import Handler from "./handler";

class Project {
  constructor() {
    this.projects = {};
    this.selectedProject = null;
    this.handler = new Handler();
  }

  createProject() {
    const projectBtn = document.getElementById("add-project");
    const sideMenu = document.querySelector(".sideMenu");

    const existingContainer = sideMenu.querySelector(".input-container");
    if (existingContainer) {
      return;
    }

    projectBtn.addEventListener("click", () => {
      const projInputContainer = document.createElement("div");
      projInputContainer.classList.add("input-container");

      const projInput = document.createElement("input");
      projInput.type = "text";
      projInput.placeholder = "Enter Project Name";
      projInput.classList.add("project-input");

      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Submit";
      submitBtn.classList.add("submitBtn");

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.classList.add("cancelBtn");

      projInputContainer.appendChild(projInput);
      projInputContainer.appendChild(submitBtn);
      projInputContainer.appendChild(cancelBtn);

      const projectSection = sideMenu.querySelector(".project");
      projectSection.appendChild(projInputContainer);

      projectSection.insertBefore(
        projInputContainer,
        projectSection.childNodes[2]
      );

      cancelBtn.addEventListener("click", () => {
        projectSection.removeChild(projInputContainer);
        projectBtn.disabled = false;
      });

      submitBtn.addEventListener("click", () => {
        const projectName = projInput.value.trim();
        if (projectName !== "") {
          console.log("Project Submitted:", projectName);

          if (!this.projects[projectName]) {
            this.projects[projectName] = [];
          }
          const newProjBtn = this.handler.createButton(
            projectName,
            projectName
          );
          newProjBtn.classList.add("projName");

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "x";
          deleteBtn.classList.add("deleteBtn");

          newProjBtn.appendChild(deleteBtn);

          const projectSection = document.querySelector(".project");
          projectSection.insertBefore(newProjBtn, projectSection.childNodes[2]);

          deleteBtn.addEventListener("click", () => {
            projectSection.removeChild(newProjBtn);

            delete this.projects[projectName];
            const projectRemove = document.querySelector(
              `.${projectName}.project-container`
            );
            if (projectRemove) {
              console.log("removing project container:", projectRemove);
              projectRemove.remove();
            } else {
              console.log("No matching project container", projectName);
            }
          });

          this.selectedProject = projectName;

          newProjBtn.addEventListener("click", () => {
            this.showProjectPage(projectName);
            const projectPage = document.getElementById("projectPage");
            projectPage.classList.remove("hidden");
            console.log("project page hidden");
          });
        } else {
          alert("Please Enter a Project Name.");
        }
        projectSection.removeChild(projInputContainer);
        projectBtn.disabled = false;
      });
      projectBtn.disabled = true;
    });
  }

  createProjectPage(projectName) {
    const existingForm = document.getElementById("form-container");

    if (existingForm) {
      return existingForm;
    }

    const projectPage = document.getElementById("projectPage");
    projectPage.innerHTML = "";

    const projContainer = document.createElement("div");
    projContainer.classList.add(`${projectName}`, "project-container");

    const formContainer = document.createElement("div");
    formContainer.classList.add("form-container");

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-item-container");

    const projectHeader = document.createElement("h3");
    projectHeader.textContent = projectName;
    formContainer.appendChild(projectHeader);

    const todoItems = this.projects[projectName] || [];

    todoItems.forEach((todo) => {
      const todoItem = this.handler.createTodoItem(todo);
      todoContainer.appendChild(todoItem);
    });

    const todoForm = this.handler.createTodoListForm(todoContainer);
    if (todoForm) {
      formContainer.appendChild(todoForm);
    }

    projectPage.appendChild(projContainer);
    projContainer.appendChild(projectHeader);
    projContainer.appendChild(formContainer);
    projContainer.appendChild(todoContainer);
  }

  showProjectPage(projectName) {
    console.log("showing project", projectName);
    this.createProjectPage(projectName);
  }
}

export default Project;
