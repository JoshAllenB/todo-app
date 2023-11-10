import { initHandler } from "./handler";


function createHeader(){
  const header = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = 'To-Do List';

  header.appendChild(title);
  document.body.appendChild(header);
}

function createFooter() {
  const  footer = document.createElement('footer');
  const footerLink = document.createElement('div');
  footerLink.classList.add('link');

  const copyright = createFooterLink('Copyright <i class="fa-regular fa-copyright"></i> JoshAllen');
  footerLink.appendChild(copyright);
  footer.appendChild(footerLink);
  document.body.appendChild(footer);
}

function createFooterLink(text) {
  const link = document.createElement('h1');
  link.innerHTML = text;
  return link;
}

function createContent() {
  const content = document.createElement('div');
  content.classList.add('content');
  content.setAttribute('id', 'mainContent');
  return content;
}

function createSideMenu() {
  const content = createContent(); // Create content element
  const sideMenu = document.createElement('div');
  sideMenu.classList.add('sideMenu');

  function createButton(text, id) {
    const button = document.createElement('button');
    button.textContent = text;
    button.id = id;
    return button;
  }

  const home = document.createElement('div');
  home.classList.add('home');
  home.innerHTML = '<h1>Home</h1>';
  home.appendChild(createButton('Inbox', 'inbox'));
  home.appendChild(createButton('Today', 'today'));
  home.appendChild(createButton('This Week', 'this-week'));
  home.appendChild(createButton('Important', 'important'));

  const project = document.createElement('div');
  project.classList.add('project');
  project.innerHTML = '<h1>Project</h1>';
  project.appendChild(createButton('+ Add Project', 'add-project'));

  sideMenu.appendChild(home);
  sideMenu.appendChild(project);
  content.appendChild(sideMenu); // Append sideMenu to content
  document.body.appendChild(content); // Append content to the body
}


function initWebsite() {
  createHeader();
  createSideMenu();
  initHandler();
  createFooter();
}

export { initWebsite, createContent };
