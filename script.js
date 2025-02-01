document.addEventListener("DOMContentLoaded", function () {


    let taskContainer = document.getElementById("task-container");

    let taskInput = document.getElementById("task-name");

    let taskDate = document.getElementById("task-date");

    let taskCategory = document.getElementById("task-category");

    let taskPriority = document.getElementById("task-priority");

    let darkModeToggle = document.getElementById("toggle-dark-mode");

    let filterAll = document.getElementById("filter-all");

    let filterPending = document.getElementById("filter-pending");

    let filterCompleted = document.getElementById("filter-completed");





    let tasks = [];

    function updateTaskList() {

        taskContainer.innerHTML = "";

        tasks.forEach((task, index) => {

            let taskElement = document.createElement("div");

            taskElement.classList.add("task-item");

            if (task.completed) {
                taskElement.classList.add("completed");
            }

            taskElement.innerHTML = `
                <span><strong>${task.name}</strong> - Due: ${task.date || "No Due Date"} | ${task.category} | <strong>${task.priority}</strong></span>
                <button class="complete-btn" data-index="${index}">✔</button>
                <button class="delete-btn" data-index="${index}">❌</button>
            `;


            taskContainer.appendChild(taskElement);


        });

        
        document.querySelectorAll(".complete-btn").forEach(button => {

            button.addEventListener("click", function () {

                let index = this.getAttribute("data-index");
                toggleComplete(index);

            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {

            button.addEventListener("click", function () {

                let index = this.getAttribute("data-index");

                deleteTask(index);
            });
        });

        updateTaskSummary();
    }

    function addTask() {

        if (!taskInput.value) return;

        tasks.push({

            name: taskInput.value,
            date: taskDate.value,
            category: taskCategory.value,
            priority: taskPriority.value,
            completed: false

        });

        taskInput.value = "";
        taskDate.value = "";
        updateTaskList();

    }

    function toggleComplete(index) {

        tasks[index].completed = !tasks[index].completed;
        updateTaskList();

    }

    function deleteTask(index) {

        tasks.splice(index, 1);
        updateTaskList();

    }

    function updateTaskSummary() {


        document.getElementById("pending-count").innerText = tasks.filter(t => !t.completed).length;

        document.getElementById("completed-count").innerText = tasks.filter(t => t.completed).length;

        document.getElementById("total-count").innerText = tasks.length;


    }

    function filterTasks(type) {

        let filteredTasks = tasks.filter(task => 
            type === "all" ? true : type === "pending" ? !task.completed : task.completed

        );
        taskContainer.innerHTML = "";
        filteredTasks.forEach((task, index) => {
            let taskElement = document.createElement("div");
            taskElement.classList.add("task-item");
            if (task.completed) {
                taskElement.classList.add("completed");
            }

            taskElement.innerHTML = `
                <span><strong>${task.name}</strong> - Due: ${task.date || "No Due Date"} | ${task.category} | <strong>${task.priority}</strong></span>
                <button class="complete-btn" data-index="${index}">✔</button>
                <button class="delete-btn" data-index="${index}">❌</button>
            `;
            taskContainer.appendChild(taskElement);
        });
    }

    // 🌙 Dark Mode Toggle Function
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        // Save user preference in local storage
        if (document.body.classList.contains("dark-mode")) {
            
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });

    // 🌟 Load Dark Mode Preference on Page Load
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // Connect event listeners to filters
    filterAll.addEventListener("click", () => filterTasks("all"));

    filterPending.addEventListener("click", () => filterTasks("pending"));


    filterCompleted.addEventListener("click", () => filterTasks("completed"));


    document.querySelector(".add-btn").addEventListener("click", addTask);
    updateTaskList();
});
