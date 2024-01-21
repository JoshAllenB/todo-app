import Handler from "./handler";

class Website {
  constructor() {
    const handler = new Handler();

    this.createHeader = function () {
      const header = document.createElement("header");
      const title = document.createElement("h1");
      title.textContent = "To-Do List";

      header.appendChild(title);
      document.body.appendChild(header);
    };

    this.createFooter = function () {
      const footer = document.createElement("footer");
      const footerLink = document.createElement("div");
      footerLink.classList.add("link");

      const copyright = this.createFooterLink(
        'Copyright <i class="fa-regular fa-copyright"></i> JoshAllen'
      );

      footerLink.appendChild(copyright);
      footer.appendChild(footerLink);
      document.body.appendChild(footer);
    };

    this.createFooterLink = function (text) {
      const link = document.createElement("h1");
      link.innerHTML = text;

      return link;
    };

    this.createContent = function () {
      const content = document.createElement("div");
      content.classList.add("content");
      content.setAttribute("id", "mainContent");

      const sideMenu = document.createElement("div");
      sideMenu.classList.add("sideMenu");

      const home = document.createElement("div");
      home.classList.add("home");
      home.innerHTML = "<h1>Home</h1>";

      const inboxBtn = handler.createButton("Inbox", "inbox");
      inboxBtn.addEventListener("click", () => {
        this.showPage("inboxPage");
        const todoForm = handler.createTodoListForm();
        inbox.querySelector(".form-container").appendChild(todoForm);
      });

      home.appendChild(inboxBtn);

      const todayBtn = handler.createButton("Today", "today");
      todayBtn.addEventListener("click", () => {
        this.showPage("todayPage");
        const today = new Date();
        const filteredTodos = handler.filterByDueDate(today, null, true);
        this.showFilteredTodos(filteredTodos, "todayPage");
      });
      home.appendChild(todayBtn);

      const thisWeekBtn = handler.createButton("This Week", "this-week");
      thisWeekBtn.addEventListener("click", () => {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);

        this.showPage("weekPage");
        const filteredTodos = handler.filterByDueDate(today, nextWeek);
        this.showFilteredTodos(filteredTodos, "weekPage");
      });
      home.appendChild(thisWeekBtn);

      const project = document.createElement("div");
      project.classList.add("project");
      project.innerHTML = "<h1>Project</h1>";
      const addProjectBtn = handler.createButton(
        "+ Add Project",
        "add-project"
      );

      addProjectBtn.addEventListener("click", () => {
        this.showPage(projectPage);
        handler.createProject.bind();
        console.log("add project clicked");
      });

      project.appendChild(addProjectBtn);

      sideMenu.appendChild(home);
      sideMenu.appendChild(project);
      content.appendChild(sideMenu);

      const inbox = document.createElement("div");
      inbox.classList.add("inbox-page", "hidden");
      inbox.setAttribute("id", "inboxPage");

      const formContainer = document.createElement("div");
      formContainer.classList.add("form-container");

      const todoContainer = document.createElement("div");
      todoContainer.classList.add("todo-item-container");

      inbox.appendChild(formContainer.cloneNode(true));
      inbox.appendChild(todoContainer.cloneNode(true));

      const today = document.createElement("div");
      today.classList.add("today-page", "hidden");
      today.setAttribute("id", "todayPage");
      today.appendChild(todoContainer.cloneNode(true));

      const week = document.createElement("div");
      week.classList.add("week-page", "hidden");
      week.setAttribute("id", "weekPage");
      week.appendChild(todoContainer.cloneNode(true));

      const projectPage = document.createElement("div");
      projectPage.classList.add("project-page", "hidden");
      projectPage.setAttribute("id", "projectPage");
      projectPage.appendChild(formContainer.cloneNode(true));
      projectPage.appendChild(todoContainer).cloneNode(true);

      content.appendChild(inbox);
      content.appendChild(today);
      content.appendChild(week);
      content.appendChild(projectPage);

      document.body.appendChild(content);
    };

    this.filterTodosByDueDate = function (dueDate, pageId) {
      const todoItemContainer = document
        .getElementById(pageId)
        .querySelector(".todo-item-container");
      todoItemContainer.innerHTML = "";

      const filterTodos = handler.filterByDueDate(dueDate);
      filterTodos.forEach((todo) => {
        const todoItem = handler.createTodoItem(todo, todoItemContainer);
        if (todo.isPriority) {
          todoItem.classList.add("priority");
        }
        todoItemContainer.appendChild(todoItem);
      });
    };

    this.showFilteredTodos = function (filterTodos, pageId) {
      const todoItemContainer = document
        .getElementById(pageId)
        .querySelector(".todo-item-container");
      todoItemContainer.innerHTML = "";

      filterTodos.forEach((todo) => {
        const todoItem = handler.createTodoItem(todo, todoItemContainer);
        if (todo.isPriority) {
          todoItem.classList.add("priority");
        }
        todoItemContainer.appendChild(todoItem);
      });
    };

    this.showPage = function (pageId) {
      const pages = document.querySelectorAll(".content > div:not(.sideMenu)");
      pages.forEach((page) => {
        page.classList.add("hidden");

        if (pageId !== "projectPage") {
          const projectSection = document.querySelector(".project");
          const projContainer =
            projectSection.querySelector(".project-container");

          if (projContainer) {
            projectSection.removeChild(projContainer);
            const projectBtn = document.getElementById("add-project");
            projectBtn.disabled = false;
          }
        }
      });

      const selectedPage = document.getElementById(pageId);
      if (selectedPage) {
        selectedPage.classList.remove("hidden");
      }
    };

    this.initWebsite = function () {
      this.createHeader();
      this.createContent();
      handler.createProject();
      this.createFooter();
    };
  }
}

export default Website;
