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

  const copyright = createFooterLink ('<i class="fa-regular fa-copyright"></i> To-Do App');
  footerLink.appendChild(copyright);
  footer.appendChild(footerLink);
  document.body.appendChild(footer);
}

function createFooterLink(text) {
  const link = document.createElement('h1');
  link.innerHTML = text;
  return link;
}

function createSideMenu() { 
  const content = document.createElement('div');
  content.classList.add('content');

  const sideMenu = document.createElement('div');
  sideMenu.classList.add('sideMenu');
  const home = document.createElement('div');
  home.classList.add('home');
  const homeTitle = document.createElement('h1');
  homeTitle.textContent = 'Home';

  const allTasks = document.createElement('button');
  allTasks.textContent = 'All Tasks';
  const today = document.createElement('button');
  today.textContent = 'Today';
  const thisWeek = document.createElement('button');
  thisWeek.textContent = 'This Week';
  const important = document.createElement('button');
  important.textContent = 'Important';

  home.appendChild(homeTitle);
  home.appendChild(allTasks);
  home.appendChild(today);
  home.appendChild(thisWeek);
  home.appendChild(important);

  const project = document.createElement('div');
  project.classList.add('project');
  const projectTitle = document.createElement('h1');
  projectTitle.textContent = 'Project';
  const add = document.createElement('button');
  add.textContent = '+'

  project.appendChild(projectTitle);
  project.appendChild(add);

  sideMenu.appendChild(home);
  sideMenu.appendChild(project)
  content.appendChild(sideMenu);
  document.body.appendChild(content);
}

function initWebsite(){
  createHeader();
  createSideMenu();
  createFooter();
}


export {initWebsite};