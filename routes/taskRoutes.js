const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

const auth = require("../middleware/auth");

router.get("/", auth, async (req,res) => {

    try {

    const tasks = await Task.find({
    userId: req.user.id,

     });

    res.status(200).json(tasks);

} catch(error) {

    res.status(500).json({
        message:error.message
    });

}

});

router.post("/", auth, async(req,res) => {

    try {

        const {text, category} = req.body;

        console.log("CATEGORY RECIEVED", category);

        const task = await Task.create({
            text, category,
            done:false,
            userId: req.user.id,
        });

        res.status(201).json(task);

    } catch(error){

        console.log(error.message);

        res.status(500).json({
            message:error.message
        });
    }
   
});

router.put("/:id", auth, async(req,res) => {

    try {

        const task = await Task.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user.id,
        },

        req.body,
        {
            new: true,
        }
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

router.delete("/:id", auth, async(req,res) => {

    try {

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
    });

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

