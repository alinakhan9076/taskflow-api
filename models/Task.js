const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    text : {
        type: String,
        required: true,
        trim: true,
        maxlength: 200

    },

    done:{
        type: Boolean,
        default: false
    },

    category: {
        type: String,
        enum:["Work","Personal","Study","Coding"],
        default:"Study"
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);