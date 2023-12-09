document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const datePicker = document.getElementById('datePicker');
    const timePicker = document.getElementById('timePicker');
    const clearCompletedButton = document.getElementById('clearCompleted');
    const saveButton = document.getElementById('saveButton');
  
    function addTask(taskText, date) {
      const taskItem = document.createElement('li');
      const taskDateTime = document.createElement('span');
      const taskDescription = document.createElement('span');
  
      taskDateTime.textContent = date.toLocaleString();
      taskDateTime.className = 'task-date-time';
  
      taskDescription.textContent = taskText;
      taskDescription.className = 'task-description';
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
  
      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskDateTime);
      taskItem.appendChild(taskDescription);
      taskList.appendChild(taskItem);
  
      sortTasks();
    }
  
    function sortTasks() {
      const tasks = document.querySelectorAll('#taskList li');
      const sortedTasks = Array.from(tasks).sort((a, b) => {
        const dateA = new Date(a.querySelector('.task-date-time').textContent);
        const dateB = new Date(b.querySelector('.task-date-time').textContent);
        return dateA - dateB;
      });
  
      taskList.innerHTML = '';
      sortedTasks.forEach(task => {
        taskList.appendChild(task);
      });
    }
  
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const taskText = taskInput.value;
      const selectedDate = new Date(datePicker.value + 'T' + timePicker.value);
  
      if (taskText && datePicker.value && timePicker.value && selectedDate > new Date()) {
        addTask(taskText, selectedDate);
        taskInput.value = '';
        datePicker.value = '';
        timePicker.value = '';
      } else {
        alert('Please enter a task, select a future date, and choose a time.');
      }
    });
  
    clearCompletedButton.addEventListener('click', function() {
      const completedTasks = document.querySelectorAll('#taskList input[type="checkbox"]:checked');
      completedTasks.forEach(task => {
        task.closest('li').remove();
      });
    });
  
    saveButton.addEventListener('click', () => {
      saveTasks();
      alert('Tasks saved successfully!');
    });
  
    // Additional functions for loading and saving tasks
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
        addTask(task.taskText, new Date(task.selectedDate));
      });
    };
  
    const saveTasks = () => {
      const tasks = Array.from(taskList.children).map(task => {
        return {
          taskText: task.querySelector('.task-description').textContent,
          selectedDate: task.querySelector('.task-date-time').textContent
        };
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Load tasks when the page loads
    loadTasks();
  });
  