const express = require("express");
const router = new express.Router();

require("../db/conn");
const registerS = require("../model/registerSchema");

router.get('/', (req,res) => {
    res.send("hello world from server")
    console.log("hello")
});

router.post('/register', async(req,res) => {
    const {name, email ,  password, Cpassword} = req.body;

    if(!name || !email  || !password || !Cpassword ){
        return res.status(400).json({error:"Plz fill all fields"});
    }

    try{
        // console.log("inside")
        const userExist = await registerS.findOne({email:email});

        if(userExist){
            return res.status(422).json({error:"Email alread exist"})
        };

        if(password !== Cpassword){
            return res.status(420).json({error:"Password and Confirm password are not matching."})
        };


        const user = new registerS({name, email, password, Cpassword});

        await  user.save();
  
        res.status(201).json({message:"message successful"});         

    }catch (err){
        console.log(err)
    }
    console.log(req.body)
});

// USER LOGIN

router.post('/signin', async (req, res) => {
    console.log(req.body)
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Plz fill  email and password"})
        }
        

        const userLogin = await registerS.findOne({email:email});
        const userPassword = await registerS.findOne({password:password});

        if(!userLogin || !userPassword){
            return res.status(422).json({error:"usererror"})
        }else{
            return res.status(420).json({message:"user sign successfully"})
        }
    } catch{
        console.log(err) 
    }
})

module.exports = router;