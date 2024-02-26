(function () {
    // Task-related data and DOM elements
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('Working');

    // Function to fetch initial tasks (currently set to an empty array)
    function fetchTodos() {
        tasks = []; // Initialize tasks as an empty array
        renderList();
    }

    // Function to create HTML for a task and append it to the list
    function addTaskToDOM(task) {
        const li = document.createElement('li');

        li.innerHTML = `
            <li>
                <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
                <label for="${task.id}">${task.title}</label>
                <img src="bin.svg" class="delete" data-id="${task.id}" />
            </li>
        `;
        tasksList.append(li);
    }

    // Function to render the entire list of tasks
    function renderList() {
        tasksList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            addTaskToDOM(tasks[i]);
        }

        tasksCounter.innerHTML = tasks.length;
    }

    // Function to toggle the completion status of a task
    function toggleTask(taskId) {
        const newTasks = tasks.filter(function (task) {
            return task.id === Number(taskId);
        });

        if (newTasks.length > 0) {
            const currentTask = newTasks[0];

            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification('Task toggled successfully');
            return;
        }

        showNotification('Could not toggle task');
    }

    // Function to delete a task
    function deleteTask(taskId) {
        const newTasks = tasks.filter(function (task) {
            return task.id !== Number(taskId);
        });
        tasks = newTasks;
        renderList();
        showNotification('Task Deleted');
    }

    // Function to add a new task
    function addTask(task) {
        if (task) {
            tasks.push(task);
            renderList();
            showNotification('Task Added');
            return;
        }
        showNotification('Task cannot be added..!');
    }

    // Function to display a notification (currently using alert)
    function showNotification(text) {
        alert(text);
    }

    // Event handler for key press in the input field
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
                completed: false,
            };

            e.target.value = '';
            addTask(task);
        }
    }

    // Event handler for clicks on the document
    function handleClickListener(e) {
        const target = e.target;

        if (target.className === 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        } else if (target.className === 'custom-checkbox') {
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    }

    // Function to initialize the application
    function initializeApp() {
        addTaskInput.addEventListener('keyup', handleInputKeyPress);
        document.addEventListener('click', handleClickListener);

        // Fetch initial tasks (currently set to an empty array)
        fetchTodos();
    }

    // Initialize the application when the script is loaded
    initializeApp();

})();
