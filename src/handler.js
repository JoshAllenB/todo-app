function activeBtn() {
  document.addEventListener("DOMContentLoaded", function() {
    const sideMenu = document.querySelector('.sideMenu');

    if (sideMenu) {
      sideMenu.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
          sideMenu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          button.classList.add('active');
        });
      });
    }
  });
}

function addTodo() {
  const inbox = document.querySelector('#inbox');

  const addTodoBtn = document.createElement('button');
  addTodoBtn.textContent = 'Add Todo'


}

function initHandler() {
  activeBtn();
  addTodo();
}

export { initHandler };
