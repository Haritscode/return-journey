require("dotenv").config(process.env.NODE_ENV==='development'?{path:'.env.dev'}:{path:'.env.prod'});

const mongoose=require("mongoose");
const db=mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.rbqlfnn.mongodb.net/?retryWrites=true&w=majority`).then(()=>console.log('db connected')).catch(err=>console.log(err));
module.exports=db;