const tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function renderList () {}

function markTaskAsComplete (taskId) {}

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
    if(key === 'Enter'){
        const text = e.target.value;
    }

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

addTaskInput.addEventListener('keyup', handleInputKeyPress);