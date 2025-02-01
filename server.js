const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let tasks = [];

//all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// letting user add a new task
app.post("/tasks", (req, res) => {

    const { text, dueDate, category, priority } = req.body;

    const newTask = { 

        id: Date.now(), 
        text, 
        dueDate: dueDate || "",  
        category: category || "",  
        priority: priority || "",  
        completed: false 

    };

    tasks.push(newTask);

    res.json(newTask);

});

// switch task completion
app.patch("/tasks/:id/toggle", (req, res) => {

    const task = tasks.find(t => t.id == req.params.id);

    if (task) {
        task.completed = !task.completed;
        res.json(task);

    } else {
        res.status(404).send("Task not found");

    }
});

// user can delete a task if they want to
app.delete("/tasks/:id", (req, res) => {

    tasks = tasks.filter(t => t.id != req.params.id);
    res.sendStatus(200);

});

// starts server
app.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
