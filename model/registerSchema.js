const mongoose = require("mongoose");


const registerSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    Cpassword: {
        type:String,
        required:true
    },
});


// create model

const register = new mongoose.model("register",registerSchema);

module.exports = register;
