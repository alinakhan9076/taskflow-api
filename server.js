const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("/api/health", (req, res) => {

    res.status(200).json({
        status: "ok",
    });
});


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to mongoDB");
})
.catch((error) => {
    console.log(error);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});