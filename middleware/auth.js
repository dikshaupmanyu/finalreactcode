const jwt = require("jsonwebtoken");

const registerS = require("../model/registerSchema");
const Order =  require("../model/Order") 

const Authenticate = async (req, res, next) => {


  try {
    const token = req.headers.authorization;
    
    const verifytoken = jwt.verify(token,process.env.JWT_SECRET_KEY);
    
    const rootUser = await registerS.findOne({_id:verifytoken._id});
    // const rootOrder = await Order.findOne({email:});
    
    if(!rootUser) {throw new Error("user not found")}

    req.token = token
    req.rootUser = rootUser
    req.userId = rootUser._id
    req.email = rootUser.email

    next();

} catch (error) {
    res.status(401).json({status:401,message:"Unauthorized no token provide"})
}
}

//   try {
 
//     const token = req.cookies.jwtoken;
//     const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);

//     const rootUser = await registerS.findOne({ _id: verifyToken._id, "tokens.token": token});

//     if(!rootUser) {
//       throw new Error('User not found')
//     };

//     req.token = token;
//     req.rootUser = rootUser; 
//     req.userID = rootUser._id;

//     next();

//   } catch (err) {
//     res.status(401).send("Unauthorized: No token provided");
//     console.log(err);
//   }
// };
///////////////////////////////////////////////////////////////////////////////////////
// try {
//   const token = req.cookies.jwtoken;
  
//   const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
  
//   const rootUser = await registerS.findOne({ _id: verifyToken._id, "tokens.token": token});
  
//   if(!rootUser) {throw new Error("user not found")}

//   req.token = token
//   req.rootUser = rootUser
//   req.userId = rootUser._id

//   next();

// } catch (error) {
//   res.status(401).json({status:401,message:"Unauthorized no token provide"})
// }
// }

module.exports = Authenticate;
