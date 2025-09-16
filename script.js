const form = document.getElementById('task-form');
const inputText = document.getElementById('task-text');
const inputCategory = document.getElementById('task-category');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener('DOMContentLoaded', () => {
  tasks.forEach(task => {
    addTaskToDOM(task.text, task.category, task.completed);
  });
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  addTask(inputText.value.trim(), inputCategory.value.trim());
  inputText.value = '';
  inputCategory.value = '';
  inputText.focus();
});

function addTask(text, category) {
  if (text === '' || category === '') return;

  const textLower = text.toLowerCase();
  if (!tasks.some(task => task.text.toLowerCase() === textLower)) {
    const newTask = { text, category, completed: false };
    tasks.push(newTask);
    saveTasks();
    addTaskToDOM(text, category, false);
  }
}

function addTaskToDOM(text, category, completed) {
  const li = document.createElement('li');
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  const span = document.createElement('span');
  span.innerHTML = `<strong>${text}</strong> <em class="text-muted">[${category}]</em>`;
  if (completed) span.classList.add('completed');

  span.addEventListener('click', () => toggleTaskCompletion(span, text));

  const delBtn = document.createElement('button');
  delBtn.textContent = 'X';
  delBtn.className = 'btn btn-danger btn-sm';
  delBtn.addEventListener('click', () => deleteTask(li, text));

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function toggleTaskCompletion(span, text) {
  span.classList.toggle('completed');
  const taskIndex = tasks.findIndex(task => task.text === text);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks();
  }
}

function deleteTask(li, text) {
  li.remove();
  tasks = tasks.filter(task => task.text !== text);
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
