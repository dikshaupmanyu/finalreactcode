const mongoose = require("mongoose");


const SubSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    sname:{
        type:String,
        required:true
    },
    status:{
        type:String,
    },
    c_id:{
        type:String,
    },
    date:{
        type:Date
    }
});


// create model

const SubCategory = new mongoose.model("subCategory",SubSchema);

module.exports = SubCategory;

