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

    // Filter type (all, completed, not completed)
    let filterType = 'all';

     // Function to render the list based on the current filter
     function renderList() {
        tasksList.innerHTML = '';

        // Filter tasks based on the selected filter type
        let filteredTasks = tasks;
        if (filterType === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filterType === 'not-completed') {
            filteredTasks = tasks.filter(task => !task.completed);
        }

        // Display filtered tasks
        for (let i = 0; i < filteredTasks.length; i++) {
            addTaskToDOM(filteredTasks[i]);
        }

        tasksCounter.innerHTML = filteredTasks.length;
    }

    // Event handler for changing the filter type
    function handleFilterChange(type) {
        filterType = type;
        renderList();
    }

    // Function to remove all completed tasks
    function clearCompletedTasks() {
        const newTasks = tasks.filter(task => !task.completed);
        tasks = newTasks;
        renderList();
        showNotification('Completed tasks cleared');
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

        // Add event listeners for filter buttons or checkboxes
        const allTasksButton = document.getElementById('all-tasks');
        const completedTasksButton = document.getElementById('completed-tasks');
        const notCompletedTasksButton = document.getElementById('not-completed-tasks');

        allTasksButton.addEventListener('click', () => handleFilterChange('all'));
        completedTasksButton.addEventListener('click', () => handleFilterChange('completed'));
        notCompletedTasksButton.addEventListener('click', () => handleFilterChange('not-completed'));
        
        // Add event listener for the "Clear Completed" button
        const clearCompletedButton = document.getElementById('clear-completed');
        clearCompletedButton.addEventListener('click', clearCompletedTasks);

        // Fetch initial tasks (currently set to an empty array)
        fetchTodos();
    }

    // Initialize the application when the script is loaded
    initializeApp();

})();
