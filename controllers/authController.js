const User = require("../models/User");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    try {

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        const user = new User({ email, password, });

        await user.save();

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET,
    {expiresIn: "7d"});

    return res.status(201).json({
        message: "User registered successfully",
        token,
    });

     } catch (error) {
        console.log(error);

    return res.status(500).json({
        message: "Server Error",
    });
}
}