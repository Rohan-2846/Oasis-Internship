function addTask() {
            const taskInput = document.getElementById("taskInput");
            const task = taskInput.value.trim();

            if (task !== "") {
                const timestamp = new Date().toLocaleString();
                const taskObject = {
                    task,
                    timestamp,
                    completed: false
                };

                const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                tasks.push(taskObject);
                localStorage.setItem("tasks", JSON.stringify(tasks));

                renderTasks();
                taskInput.value = "";
            }
        }

        function deleteTask(index, isCompleted) {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTasks();
        }

        function toggleCompletion(index) {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTasks();
        }

        function renderTasks() {
            const tasksContainer = document.getElementById("tasksContainer");
            const pendingTasksContainer = document.getElementById("pendingTasks");
            const completedTasksContainer = document.getElementById("completedTasks");

            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

            pendingTasksContainer.innerHTML = "";
            completedTasksContainer.innerHTML = "";

            tasks.forEach((task, index) => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");
                if (task.completed) {
                    taskDiv.classList.add("completed");
                    completedTasksContainer.appendChild(taskDiv);
                } else {
                    pendingTasksContainer.appendChild(taskDiv);
                }

                taskDiv.innerHTML = `
                    <span>${task.task} - ${task.timestamp}</span>
                    <span>
                        <span class="editBtn" onclick="editTask(${index})">Edit</span>
                        <span class="deleteBtn" onclick="deleteTask(${index}, ${task.completed})">Delete</span>
                        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleCompletion(${index})">
                    </span>
                `;
            });
        }

        function editTask(index) {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const updatedTask = prompt("Edit task:", tasks[index].task);

            if (updatedTask !== null) {
                tasks[index].task = updatedTask;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            }
        }