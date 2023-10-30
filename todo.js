const tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function renderList () {}

function markTaskAsComplete (taskId) {}

function deleteTask (taskId) {}

function addTask (task) {}

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