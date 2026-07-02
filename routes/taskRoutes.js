const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

router.get("/", async (req,res) => {

    try {

    const tasks = await Task.find();

    res.status(200).json(tasks);

} catch(error) {

    res.status(500).json({
        message:error.message
    });

}

});

router.post("/", async(req,res) => {

    try {

        const {text, category} = req.body;

        console.log("CATEGORY RECIEVED", category);

        const task = await Task.create({
            text, category,
            done:false
        });

        res.status(201).json(task);

    } catch(error){

        console.log(error.message);

        res.status(500).json({
            message:error.message
        });
    }
   
});

router.put("/:id",async(req,res) => {

    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id, req.body, {returnDocument:"after"}
        );

        if(!task){

            return res.status(404).json({
                message:"Task not found"
            });
        }

        res.status(200).json(task);

    } catch(error){

        res.status(500).json({
            message:error.message
        });
    }

});

router.delete("/:id", async(req,res) => {

    try {

        const task = await Task.findByIdAndDelete(
            req.params.id
        );

        if(!task){

            return res.status(404).json({
                message:"Task not found"
            });

        }

        res.status(200).json({
            message:"Task deleted"
        });
        
     } catch(error){

            res.status(500).json({
                message:error.message
            });
        }
    });



module.exports = router;

