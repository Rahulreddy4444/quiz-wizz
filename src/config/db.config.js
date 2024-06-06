const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/quiz_app")
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch(() => {
        console.log("DB connection failed");
    });

module.exports = mongoose;
