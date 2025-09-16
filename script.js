const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener('DOMContentLoaded', () => {
  tasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
  });
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  addTask(input.value.trim());
  input.value = '';
  input.focus();
});

function addTask(text) {
  if (text === '') return;
  
  const textLower = text.toLowerCase();
  if (!tasks.some(task => task.text.toLowerCase() === textLower)) {
    const newTask = { text, completed: false };
    tasks.push(newTask);
    saveTasks();
    addTaskToDOM(text, false);
  }
}

function addTaskToDOM(text, completed) {
  const li = document.createElement('li');
  
  const span = document.createElement('span');
  span.textContent = text;
  if (completed) 
    span.classList.add('completed');
  
  span.addEventListener('click', () => toggleTaskCompletion(span, text));
  
  const delBtn = document.createElement('button');
  delBtn.textContent = 'X';
  delBtn.className = 'btn btn-danger';
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