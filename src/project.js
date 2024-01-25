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

      let btnContainerId;

      submitBtn.addEventListener("click", () => {
        const projectName = projInput.value.trim();
        if (projectName !== "") {
          console.log("Project Submitted:", projectName);

          if (!this.projects[projectName]) {
            this.projects[projectName] = [];
          }

          btnContainerId = `${projectName}-btn-container`;
          const btnContainer = document.createElement("div");
          btnContainer.classList.add(`${projectName}`, "btn-container");
          btnContainer.setAttribute("id", btnContainerId);

          const newProjBtn = this.handler.createButton(
            projectName,
            projectName
          );
          newProjBtn.classList.add("projName");

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "x";
          deleteBtn.classList.add("deleteBtn");

          btnContainer.appendChild(newProjBtn);
          btnContainer.appendChild(deleteBtn);

          const projectSection = document.querySelector(".project");
          projectSection.appendChild(btnContainer);

          deleteBtn.addEventListener("click", () => {
            projectSection.removeChild(btnContainer);

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
            this.handler.createTodoListForm(projectName);
            const projectPage = document.getElementById("projectPage");
            const inboxPage = document.getElementById("inboxPage");

            projectPage.classList.remove("hidden");
            inboxPage.classList.add("hidden");
          });

          const inboxBtn = document.getElementById("inbox");
          inboxBtn.addEventListener("click", () => {
            const projectPage = document.getElementById("projectPage");
            const inboxPage = document.getElementById("inboxPage");

            inboxPage.classList.remove("hidden");
            projectPage.classList.add("hidden");
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
    const projContainer = document.createElement("div");
    projContainer.classList.add(`${projectName}`, "project-container");

    const formContainer = document.createElement("div");
    formContainer.classList.add("form-container");

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("project-item-container");

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

    projContainer.appendChild(projectHeader);
    projContainer.appendChild(formContainer);
    projContainer.appendChild(todoContainer);

    return projContainer;
  }

  showProjectPage(projectName) {
    console.log("showing project", projectName);
    const allProjectContainer = document.querySelectorAll(".project-container");
    allProjectContainer.forEach(container => {
      container.classList.add("hidden");
    });

    const selectedProjectContainer = document.querySelector(`.${projectName}.project-container`);
    if (selectedProjectContainer) {
      selectedProjectContainer.classList.remove("hidden");
    } else {
      const projectContainer = this.createProjectPage(projectName);
      const projectPage = document.getElementById("projectPage");
      projectPage.appendChild(projectContainer);
    }
  }
}

export default Project;
