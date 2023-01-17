const jwt = require('jsonwebtoken')
const { TokenExpiredError } = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();


const registerSchema = new mongoose.Schema({
    username: {
        type:String,
        // required:true
    },
    fullname: {
        type:String,
        // required:true
    },
    email: {
        type:String,
        // required:true
    },
    phone: {
        type:String,
        // required:true
    },
    address: {
        type:String,
        // required:true
    },
    password: {
        type:String,
        // required:true
    },
    tokens:[
        {
            token:{
                type:String,
                // required:true

            }
        }
    ]
});

// registerSchema.methods.generateAuthToken = async function() {
//     try {
//         let token = jwt.sign({_id:this._id}, process.env.JWT_SECRET_KEY);
//         this.tokens = this.tokens.concat({token: token});
//         await this.save();
//         return token
//     }
//     catch(err){
//         console.log(err)
//     }
// }

// token generate
registerSchema.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        res.status(422).json(error)
    }
}

// create model

const register = new mongoose.model("register",registerSchema);

module.exports = register;
