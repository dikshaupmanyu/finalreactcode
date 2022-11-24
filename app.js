const express = require("express");
const app = express();
const router = require("./routes/routes");
const dotenv = require('dotenv')
require("./db/conn");

app.use(express.json());

dotenv.config({path:"./config.env"});
const PORT = process.env.PORT || 5000;

// Middleware
const middleware = (req, res, next) => {
    console.log("hello middleware")
    next();
}

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static("client/build"));
    // app.get("*", (req, res) => {
    // res.sendFile(path.join(__dirname1 + "/client/build/index.html"));
    // });
   }

app.use(router);
app.use("/uploads",express.static("./uploads"));

app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})