import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

mongoose.connect(process.env.MONGO)
    .then(()=>{console.log("connected")})



const app = express();

app.get("/",(req,res)=>{
    res.send("working")
})

app.listen(3000, (err) => {
    if(err) throw err;
    console.log("The server is running on port 3000")
})
