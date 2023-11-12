//iffi design i.e. wrapping everything in a function so varaibles are not accessible globally.
(function () {
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('Working');

    async function fetchTodos() {
        //GET request using fetch promise logic  
        // fetch('https://jsonplaceholder.typicode.com/todos')
        //     .then(function(response){
        //         // console.log(response);
        //         return response.json();
        //     }).then(function(data){
        //         tasks = data.slice(0, 10);
        //         renderList();
        //         // console.log(data);
        //     })
        //     .catch(function(error){
        //         console.log('error',error);
        //     })

        //GET request using async await
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0, 10);
            renderList();
        } catch (error) {
            console.log(error);
        }
    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');

        li.innerHTML = `
    <li>
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class = "custom-checkox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}" />
    </li>
    `;
        tasksList.append(li);
    }

    function renderList() {
        tasksList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            addTaskToDOM(tasks[i]);
        }

        tasksCounter.innerHTML = tasks.length;
    }

    function toggleTask(taskId) {
        const newTasks = tasks.filter(function (task) {
            return task.id === Number(taskId)
        });
        if (taskId.length > 0) {
            const currentTask = task[0];

            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification('Task toggled successfully');
            return;
        }

        showNotification('Could not toggle task');
    }

    function deleteTask(taskId) {
        const newTasks = tasks.filter(function (task) {
            return task.id !== Number(taskId)
        });
        tasks = newTasks;
        renderList();
        showNotification("Task Deleted");
    }

    function addTask(task) {
        if (task) {
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

    function handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            const text = e.target.value;

            if (!text) {
                showNotification('Task text cannot be Empty');
                return;
            }

            const task = {
                title: text,
                id: Date.now(),
                completed: false
            }

            e.target.value = '';
            addTask(task);
        }
    }

    function handleClickListener(e) {
        const target = e.target;

        if (target.className === 'delete') {
            const taskId = target.dataset.id
            deleteTask(taskId);
            return;
        } else if (target.className === 'custom-checkbox') {
            const taskId = target.id
            toggleTask(taskId);
            return;
        }
    }

    function initializeApp() {
        fetchTodos();
        addTaskInput.addEventListener('keyup', handleInputKeyPress);
        document.addEventListener('click', handleClickListener);
    }

    initializeApp();

})()