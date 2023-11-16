import { format } from 'date-fns';

function createModal() {
  const modal = document.createElement('div');
  modal.id = 'todoModal';
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close');
  closeBtn.innerHTML = '&times;';

  const nameLabel = createLabel('Name:', 'todoName');
  const nameInput = createInput('text', 'todoName', true);

  const dateLabel = createLabel('Date:', 'todoDate');
  const dateInput = createInput('date', 'todoDate', true);

  const importanceLabel = createLabel('Importance:', 'todoImportance');
  const importanceInput = createInput('text', 'todoImportance', true);

  const submitBtn = document.createElement('button');
  submitBtn.id = 'submitTodo';
  submitBtn.textContent = 'Submit';

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(nameLabel);
  modalContent.appendChild(nameInput);
  modalContent.appendChild(dateLabel);
  modalContent.appendChild(dateInput);
  modalContent.appendChild(importanceLabel);
  modalContent.appendChild(importanceInput);
  modalContent.appendChild(submitBtn);

  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  return modal;
}

function createLabel(text, htmlFor) {
  const label = document.createElement('label');
  label.setAttribute('for', htmlFor);
  label.textContent = text;
  return label;
}

function createInput(type, id, required) {
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.required = required;
  return input;
}

export { createModal };
