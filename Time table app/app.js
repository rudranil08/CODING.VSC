document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const datePicker = document.getElementById('datePicker');
    const timePicker = document.getElementById('timePicker');
    const clearCompletedButton = document.getElementById('clearCompleted');
  
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const taskText = taskInput.value;
      const selectedDate = new Date(datePicker.value + 'T' + timePicker.value);
  
      if (taskText && datePicker.value && timePicker.value) {
        addTask(taskText, selectedDate);
        taskInput.value = '';
        datePicker.value = '';
        timePicker.value = '';
      } else {
        alert('Please enter a task, select a date, and choose a time.');
      }
    });
  
    clearCompletedButton.addEventListener('click', function() {
      const completedTasks = document.querySelectorAll('#taskList input[type="checkbox"]:checked');
      completedTasks.forEach(task => {
        task.closest('li').remove();
      });
    });
  
    function addTask(taskText, date) {
      const taskItem = document.createElement('li');
      taskItem.textContent = `Date & Time: ${date.toLocaleString()} - Task: ${taskText}`;
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
  
      taskItem.prepend(checkbox);
      taskList.appendChild(taskItem);
  
      sortTasks();
    }
  
    function sortTasks() {
      const tasks = document.querySelectorAll('#taskList li');
      const sortedTasks = Array.from(tasks).sort((a, b) => {
        const dateA = new Date(a.textContent.split(' - ')[0].substring(13));
        const dateB = new Date(b.textContent.split(' - ')[0].substring(13));
        return dateA - dateB;
      });
  
      taskList.innerHTML = '';
      sortedTasks.forEach(task => {
        taskList.appendChild(task);
      });
    }
  });
  