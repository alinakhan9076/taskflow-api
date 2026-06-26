const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const taskRoutes = require("./routes/taskRoutes");

const mongoose = require("mongoose");
const Task = require("./models/Task");
require("dotenv").config();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

let tasks = [
    {
        id: 1,
        text: "Learn React",
        done: false,
        category: "study",
    },
    {
        id: 2,
        text: "Build API",
        done: false,
        category: "coding",
    },
];

app.get("/api/health", (req, res) => {

    res.status(200).json({
        status: "ok",
    });
});

app.get("/api/tasks",(req, res)=>{
    res.status(200).json(tasks);

 });


app.get("/api/tasks/:id", (req,res) => {

    const id = Number(req.params.id);

    const task = tasks.find((task) => task.id === id
    );

    if(!task){

        return res.status(404).json({
            error: "Task not found",
        });
    }

    res.status(200).json(task);

});

app.post("/api/tasks", (req, res) => {

    const {text, category} = req.body;

    if(!text){

        return res.status(400).json({
            error: "Text is required",
        });
    }

    const newTask = {

        id: Date.now(),
        text,
        done: false,
        category: category || "general",
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put("/api/tasks/:id", async (req,res) => {
    try {
        const updatedTask = await
        Task.findByIdAndUpdate (
            req.params.id,
            req.body,
            { new: true}
        );

        res.json(updatedTask);

    } catch (error) {
        res.status(500).json({ message : error.message});
    }
});

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const deletedTask = await
        Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task Deleted",
            task: deletedTask
        });
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to mongoDB")
})
.catch((error) => {
    console.log(error)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});