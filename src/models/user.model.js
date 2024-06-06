const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique : true,
        minLength : 10,
        lowercase : true
    },
    password: {
        type: String,
        require: true
    },
    UserType:{
        type: String,
        require: true,
    }
});

const User = new mongoose.model("signup_login_forms", userSchema);

module.exports = User;
