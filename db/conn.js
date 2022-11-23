const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config({path:"./config.env"});

const DB = process.env.DATABASE 
// const DB = "mongodb://localhost:27017/react-MERN"
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(()=>console.log("DATABASE connected successsfull")).catch((err)=> console.log("error" + err.message))