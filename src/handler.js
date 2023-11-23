import { createModal } from "./modal";

function activeBtn() {
  const sideMenu = document.querySelector('.sideMenu');

  if (sideMenu) {
    sideMenu.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        sideMenu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        const todoBtn = document.querySelector('.todoBtn');
        const modal = document.getElementById('todoModal');

        if (button.id !== 'inbox') {
          todoBtn.style.display = 'none';

          if (modal) {
            modal.style.display = 'none';
          }
        }
      });
    });
  }
}

function inboxHandler() {
  const todoBtn = document.querySelector('.todoBtn');
  const inboxBtn = document.getElementById('inbox');
  const content = document.getElementById('mainContent');

  if (todoBtn && inboxBtn) {
    // Set the initial state of the button
    todoBtn.style.display = inboxBtn.classList.contains('active') ? 'block' : 'none';

    // Add an event listener for subsequent clicks
    inboxBtn.addEventListener('click', function() {
      todoBtn.style.display = 'block';
    });

    todoBtn.addEventListener('click', function() {
      const modal = createModal();
      content.appendChild(modal);
      closeModal(modal); // Add event listener after appending the modal
      submitTodo();
    });
  }
}

function closeModal(modal) {
  const close = document.querySelector('.close');

  if (close) {
    close.addEventListener('click', function() {
      modal.style.display = 'none';
      console.log('Hotdog Clicked')

      modal.remove();
    });
  }
}

function submitTodo() {
  const submitBtn = document.getElementById('submitTodo');
  const modal = document.getElementById('todoModal');
  const todoList = document.querySelector('.todoList');

  if (submitBtn && modal && todoList) {
    submitBtn.addEventListener('click', function() {
      // Get values from the modal inputs
      const todoName = document.getElementById('todoName').value;
      const todoDate = document.getElementById('todoDate').value;

      // Create a new div to represent the todo item
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
      todoItem.innerHTML = `<h3>${todoName}</h3><p>${todoDate}</p>`;

      // Append the todo item to the todoList div
      todoList.appendChild(todoItem);

      // Hide and remove the modal
      modal.style.display = 'none';
      modal.remove();
    });
  }
}

function initHandler() {
  activeBtn();
  inboxHandler();
  closeModal();
  submitTodo();
}

export { initHandler, inboxHandler };