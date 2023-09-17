require("dotenv").config();
const express=require("express");
const app=express();
require("./src/config/mongdb.config");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const errorHandler = require("./src/middleware/errorHandler.middleware");
const port=process.env.PORT || 4001;
app.use(cors({
    origin:['0.0.0.0:3000'],
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/users',require("./src/routes/users.routes"));
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server created at: ${port}`);
});