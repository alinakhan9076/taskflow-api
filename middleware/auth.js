const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

    try {

    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            message: "No token, authorization denied"
        });
    }

    const actualToken = token.split(" ") [1];

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded;

    next();

} catch (error) {

    console.log(error);

    return res.status(401).json({
        message: "Invalid token",
    });
}

};