const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
require("dotenv").config();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

app.put("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find((task) => task.id === id
    );

    if(!task) {

        return res.status(404).json({
            error: "Task not found",
        });
    }

    task.text = req.body.text || task.text;
    task.done = req.body.done ?? task.done;
    task.category = req.body.category || task.category;

    res.status(200).json(task);
});

app.delete("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex((task) => task.id === id
    );

    if(index === -1){

        return res.status(404).json({
            error: "Task not found",
        });
    }

    tasks.splice(index, 1);

    res.status(200).json({
        message: "Task deleted successfully",
    });

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