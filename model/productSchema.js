const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    imgpath:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        default:1,
    },
    stock:{
        type:Number,
        
    },
    
    date:{
        type:Date
    }
});


// create model

const users = new mongoose.model("Product",userSchema);

module.exports = users;

