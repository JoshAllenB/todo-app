import Handler from "./handler";
import Todo from "./todo";
import Project from "./project";

class Website {
  constructor() {
    this.todo = new Todo();
    this.handler = new Handler();
    this.project = new Project();
    this.formCreated = false;
    this.currentPage = "";
    this.currentVisibleContainer = null;
  }

  createHeader() {
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "To-Do List";

    header.appendChild(title);
    document.body.appendChild(header);
  }

  createContent() {
    const content = document.createElement("div");
    content.classList.add("content");
    content.setAttribute("id", "mainContent");

    const inbox = document.createElement("div");
    inbox.classList.add("inboxContainer", "hidden");

    const today = document.createElement("div");
    today.classList.add("todayContainer", "hidden");

    const week = document.createElement("div");
    week.classList.add("weekContainer", "hidden");

    const projectTodo = document.createElement("div");
    projectTodo.classList.add("projectContainer", "hidden");

    content.appendChild(inbox);
    content.appendChild(today);
    content.appendChild(week);
    content.appendChild(projectTodo);
    document.body.appendChild(content);

    return content;
  }

  showContainer(container) {
    if (this.currentVisibleContainer) {
      this.currentVisibleContainer.classList.add("hidden");
    }
    container.classList.remove("hidden");
    this.currentVisibleContainer = container;

    console.log("using showContainer in website");
  }

  activeButton(button) {
    const buttons = document.querySelectorAll(".sideMenu button");
    buttons.forEach((btn) => {
      if (btn !== button) {
        btn.classList.remove("active");
      }
    });

    button.classList.add("active");
  }

  createSideMenu() {
    const content = this.createContent();

    const sideMenu = document.createElement("div");
    sideMenu.classList.add("sideMenu");

    const home = document.createElement("div");
    home.classList.add("home");
    home.innerHTML = "<h1>Home</h1>";

    const inboxBtn = this.handler.createButton("Inbox", "inbox");
    inboxBtn.addEventListener("click", (event) => {
      const inbox = document.querySelector(".inboxContainer");
      this.showContainer(inbox);
      this.activeButton(event.currentTarget);

      if (!this.formCreated) {
        const container = document.querySelector(".inboxContainer");
        const form = this.todo.createTodoListForm();

        container.appendChild(form);

        this.formCreated = true;
      }
    });

    const todayBtn = this.handler.createButton("Today", "today");
    todayBtn.addEventListener("click", (event) => {
      const today = document.querySelector(".todayContainer");
      this.showContainer(today);
      this.activeButton(event.currentTarget);
    });

    const weekBtn = this.handler.createButton("This Week", "thisWeek");
    weekBtn.addEventListener("click", (event) => {
      const week = document.querySelector(".weekContainer");
      this.showContainer(week);
      this.activeButton(event.currentTarget);
    });

    const project = document.createElement("div");
    project.classList.add("project");
    project.innerHTML = "<h1>Project</h1>";

    const projectList = document.createElement("div");
    projectList.classList.add("projectList");

    const addProject = this.handler.createButton("+ Add Project", "addProj");
    addProject.addEventListener("click", (event) => {
      const projectContainer = document.querySelector(".projectContainer");
      this.showContainer(projectContainer);
      this.project.createProjectName();
    });

    document.addEventListener("click", (event) => {
      const projBtn = event.target.closest(".projBtn");
      if (projBtn) {
        const projectContainer = document.querySelector(".projectContainer");
        this.showContainer(projectContainer);
      }
      const projectBtn = event.target.closest(".projectBtn");
      if (projectBtn) {
        this.activeButton(projectBtn);
      }
    });

    sideMenu.appendChild(home);
    sideMenu.appendChild(inboxBtn);
    sideMenu.appendChild(todayBtn);
    sideMenu.appendChild(weekBtn);
    sideMenu.appendChild(project);
    project.appendChild(addProject);
    project.appendChild(projectList);

    const firstContainer = content.querySelector(":scope > div");
    this.showContainer(firstContainer, "hidden");

    content.insertBefore(sideMenu, content.firstChild);
  }

  createFooter() {
    const footer = document.createElement("footer");
    const footerLink = document.createElement("div");
    footerLink.classList.add("link");

    const copyright = this.createFooterLink(
      'Copyright <i class="fa-regular fa-copyright"></i> JoshAllen'
    );

    footerLink.appendChild(copyright);
    footer.appendChild(footerLink);
    document.body.appendChild(footer);
  }

  createFooterLink(text) {
    const link = document.createElement("h1");
    link.innerHTML = text;

    return link;
  }

  initWebsite() {
    this.createHeader();
    this.createSideMenu();
    this.createFooter();
  }
}

export default Website;
