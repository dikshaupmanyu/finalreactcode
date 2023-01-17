const express = require("express");
const app = express();
const router = require("./routes/routes");
const dotenv = require('dotenv')
// const passport  = require('./passportAuth');
// const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require('express-session')
require("./db/conn");
// require("./passport")(passport)

app.use(express.json());

dotenv.config({path:"./config.env"});
const PORT = process.env.PORT || 5000;

// Middleware
const middleware = (req, res, next) => {
    console.log("hello middleware")
    next();
}

// Sessions
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.MONGO_SECRET,
//     store: MongoStore.create({
//       mongoUrl: process.env.DATABASE,
//       ttl: 12 * 60 * 60,
//     }),
//   })
// );
  
//   // Passport middleware
//   app.use(passport.initialize())
//   app.use(passport.session())
  

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static("client/build"));
    // app.get("*", (req, res) => {
    // res.sendFile(path.join(__dirname1 + "/client/build/index.html"));
    // });
   }


app.use(router);
// app.use('/auth', router);
// app.use(stripe);
app.use("/uploads",express.static("./uploads"));

app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})