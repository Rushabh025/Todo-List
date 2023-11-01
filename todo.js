const tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
    <li>
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class = "custom-checkox">
        <label for="${task.id}">${task.text}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}" />
    </li>
    `;
}

function renderList () {
    tasksList.innerHTML = '';

    for(let i = 0; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function toggleTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id === taskId
    })
    if(taskId.length > 0){
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }

    showNotification('Could not toggle task');
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId
    })
    tasks = newTasks;
    renderList();
    showNotification("Task Deleted");
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification("Task Added");
        return;
    }
    showNotification("Task cannot be added..!");
}

function showNotification(text) {
    alert(text);
}

function handleInputKeyPress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;

        if(!text){
            showNotification('Task text cannot be Empty');
            return;
        }

        const task = {
            text,
            id : Date.now().toString(),
            done : false
        }

        e.target.value = '';
        addTask(task);
    }
}

addTaskInput.addEventListener('keyup', handleInputKeyPress);