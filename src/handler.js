import { createModal } from "./modal";

function activeBtn() {
  document.addEventListener("DOMContentLoaded", function() {
    const sideMenu = document.querySelector('.sideMenu');

    if (sideMenu) {
      sideMenu.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
          sideMenu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          button.classList.add('active');

          const todoBtn = document.querySelector('.todoBtn');
          if (button.id !== 'inbox') {
            todoBtn.style.display = 'none';
          }
        });
      });
    }
  });
}

function inboxHandler() {
  const todoBtn = document.querySelector('.todoBtn');
  const inboxBtn = document.getElementById('inbox');

  if (todoBtn && inboxBtn) {
    // Set the initial state of the button
    todoBtn.style.display = inboxBtn.classList.contains('active') ? 'block' : 'none';

    // Add an event listener for subsequent clicks
    inboxBtn.addEventListener('click', function() {
      todoBtn.style.display = 'block';
    });

    todoBtn.addEventListener('click', function() {
      createModal();
    });
  }
}

function initHandler() {
  activeBtn();
  inboxHandler();
}import { createModal } from "./modal";

function activeBtn() {
  document.addEventListener("DOMContentLoaded", function() {
    const sideMenu = document.querySelector('.sideMenu');

    if (sideMenu) {
      sideMenu.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
          sideMenu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          button.classList.add('active');

          const todoBtn = document.querySelector('.todoBtn');
          if (button.id !== 'inbox') {
            todoBtn.style.display = 'none';

            const modal = document.getElementById('todoModal');
            if (modal) {
              modal.style.display = 'none';
            }
          }
        });
      });
    }
  });
}

function inboxHandler() {
  const todoBtn = document.querySelector('.todoBtn');
  const inboxBtn = document.getElementById('inbox');

  if (todoBtn && inboxBtn) {
    // Set the initial state of the button
    todoBtn.style.display = inboxBtn.classList.contains('active') ? 'block' : 'none';

    // Add an event listener for subsequent clicks
    inboxBtn.addEventListener('click', function() {
      todoBtn.style.display = 'block';
    });

    todoBtn.addEventListener('click', function() {
      createModal();
    });
  }
}

function initHandler() {
  activeBtn();
  inboxHandler();
}

export { initHandler, inboxHandler };
