const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:Date
    }
});


// create model

const category = new mongoose.model("Category",categorySchema);

module.exports = category;

