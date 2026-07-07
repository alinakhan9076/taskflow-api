const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },

});

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;

    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.method.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);
    
};

module.exports = mongoose.model("User", userSchema);