const mongoose = require("mongoose");


const FeaturePSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imgpath:{
        type:String,
        required:true
    },
    
    date:{
        type:Date
    }
});


// create model

const Fproduct = new mongoose.model("featureProduct",FeaturePSchema);

module.exports = Fproduct;

